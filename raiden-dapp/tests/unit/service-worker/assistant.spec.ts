// estlint-disable @typescript-eslint/no-explicit-any
import 'isomorphic-fetch'; // Solve ReferenceError undefined Response

import flushPromises from 'flush-promises';
import type { CommitOptions } from 'vuex';
import { Store } from 'vuex';

import ServiceWorkerAssistant from '@/service-worker/assistant';
import { ServiceWorkerAssistantMessages, ServiceWorkerMessages } from '@/service-worker/messages';
import type { CombinedStoreState } from '@/store/index';

jest.mock('vuex');

interface SimplifiedResponse {
  json: () => Promise<unknown>;
}

class ServiceWorkerContainer extends EventTarget {
  private listeners!: unknown; // TODO: Why is the implementation not visible here?

  public controller = {
    postMessage: jest.fn(),
  };

  constructor() {
    super();
  }

  public clear(): void {
    this.listeners! = {};
  }
}

const serviceWorkerContainer = new ServiceWorkerContainer();
const store = new Store({}) as jest.Mocked<Store<CombinedStoreState>> & {
  commit: jest.Mock<void, [string, unknown?, CommitOptions?]>;
};

async function sleep(duration: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, duration));
}

async function respondWithServerVersion(this: string | null): Promise<SimplifiedResponse> {
  const parseJson = () =>
    new Promise((resolve, reject) => {
      if (this === null) {
        reject('Failed to parse json');
      } else {
        const data = { version: { version: this } };
        resolve(data);
      }
    });

  return { json: parseJson };
}

function sendMessage(message: ServiceWorkerMessages): void {
  const event = new MessageEvent('message', { data: message });
  serviceWorkerContainer.dispatchEvent(event);
}

async function createAssistant(
  serviceWorkerIsSupported = true,
  availableVersionOnServer: string | null = '1.0.0',
  updateAvailableVersionInterval?: number,
  verifyCacheValidityInverval?: number,
): Promise<ServiceWorkerAssistant> {
  Object.defineProperty(global.navigator, 'serviceWorker', {
    value: serviceWorkerIsSupported ? serviceWorkerContainer : undefined,
  });

  Object.defineProperty(global, 'fetch', {
    value: respondWithServerVersion.bind(availableVersionOnServer),
  });

  const assistant = new ServiceWorkerAssistant(
    store,
    updateAvailableVersionInterval,
    verifyCacheValidityInverval,
  );

  await flushPromises();
  return assistant;
}

describe('ServiceWorkerAssistant', () => {
  let intervalIds: Array<number>;
  let windowReloadSpy: jest.SpyInstance;
  let consoleWarnSpy: jest.SpyInstance;

  beforeAll(() => {
    // Make sure we can set these non-writable properties for each test case.
    Object.defineProperty(global.navigator, 'serviceWorker', { writable: true });
    Object.defineProperty(global, 'fetch', { writable: true });

    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation((_message) => undefined);
    windowReloadSpy = jest.spyOn(window.location, 'reload').mockImplementation(() => undefined);

    const originalSetInterval = global.setInterval;

    jest.spyOn(global, 'setInterval').mockImplementation((handler, timeout) => {
      const id = originalSetInterval(handler, timeout);
      intervalIds.push(id);
      return id;
    });
  });

  afterAll(() => {
    jest.resetAllMocks(); // Better safe than sorry.
  });

  beforeEach(() => {
    intervalIds = [];
    jest.clearAllMocks();
    serviceWorkerContainer.clear();
  });

  afterEach(() => {
    intervalIds.forEach((id) => clearInterval(id));
  });

  test('update available version once upon creation', async () => {
    await createAssistant(true, '1.0.0');

    expect(store.commit).toHaveBeenCalledTimes(1);
    expect(store.commit).toHaveBeenCalledWith('setAvailableVersion', '1.0.0');
  });

  test('update available version once per set interval', async () => {
    await createAssistant(true, undefined, 300);

    await sleep(650); // Add a small padding to let all triggered interval handler finish

    expect(store.commit).toHaveBeenCalledTimes(3); // Remind the inial update.
  });

  test('send verify cache message once per set interval', async () => {
    await createAssistant(true, undefined, undefined, 200);

    await sleep(450); // Add a small padding to let all triggered interval handler finish

    expect(serviceWorkerContainer.controller.postMessage).toHaveBeenCalledTimes(2);
    expect(serviceWorkerContainer.controller.postMessage).toHaveBeenCalledWith(
      ServiceWorkerAssistantMessages.VERIFY_CACHE,
    );
  });

  test('do not check for version update if service worker not supported', async () => {
    await createAssistant(false);

    expect(store.commit).toHaveBeenCalledTimes(0);
  });

  test('reloads window when receiving reload message', async () => {
    await createAssistant();

    sendMessage(ServiceWorkerMessages.RELOAD_WINDOW);

    expect(windowReloadSpy).toHaveBeenCalledTimes(1);
  });

  test('set update is mandatory when receiving installation error message', async () => {
    await createAssistant();
    store.commit.mockClear(); // Get rid of the intial available version update.

    sendMessage(ServiceWorkerMessages.INSTALLATION_ERROR);

    expect(store.commit).toHaveBeenCalledTimes(1);
    expect(store.commit).toHaveBeenCalledWith('setUpdateIsMandatory');
  });

  test('set update is mandatory when receiving cache is invalid message', async () => {
    await createAssistant();
    store.commit.mockClear(); // Get rid of the intial available version update.

    sendMessage(ServiceWorkerMessages.CACHE_IS_INVALID);

    expect(store.commit).toHaveBeenCalledTimes(1);
    expect(store.commit).toHaveBeenCalledWith('setUpdateIsMandatory');
  });

  test('trigger update sends update message to service worker', async () => {
    const assistant = await createAssistant();

    assistant.update();

    expect(serviceWorkerContainer.controller.postMessage).toHaveBeenCalledTimes(1);
    expect(serviceWorkerContainer.controller.postMessage).toHaveBeenCalledWith(
      ServiceWorkerAssistantMessages.UPDATE,
    );
  });

  test('do not update available version in store if version is invalid', async () => {
    await createAssistant(true, 'version-1.2');

    expect(store.commit).not.toHaveBeenCalled();
    expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
  });

  test('do not update available version in store if parsing fails', async () => {
    await createAssistant(true, null);

    expect(store.commit).not.toHaveBeenCalled();
    expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
  });
});
