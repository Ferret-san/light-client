import type { Wrapper } from '@vue/test-utils';
import { mount } from '@vue/test-utils';
import { Component, Mixins } from 'vue-property-decorator';
import VueRouter from 'vue-router';

import NavigationMixin from '@/mixins/navigation-mixin';
import { RouteNames } from '@/router/route-names';

import { TestData } from '../../data/mock-data';

jest.mock('vue-router');
import Mocked = jest.Mocked;

describe('NavigationMixin', () => {
  let wrapper: Wrapper<NavigationMixin>;
  let router: Mocked<VueRouter>;

  beforeEach(async () => {
    router = new VueRouter() as Mocked<VueRouter>;
    router.push = jest.fn().mockResolvedValue(null);

    @Component({ template: '<div></div>' })
    class MyComponent extends Mixins(NavigationMixin) {}

    wrapper = mount(MyComponent, {
      mocks: {
        $router: router,
        $route: TestData.mockRoute(),
      },
    });
  });

  test('navigate to select hub', () => {
    wrapper.vm.navigateToSelectHub('0xtoken');

    expect(router.push).toHaveBeenCalledTimes(1);
    expect(router.push).toHaveBeenCalledWith(
      expect.objectContaining({
        name: RouteNames.SELECT_HUB,
        params: {
          token: '0xtoken',
        },
      }),
    );
  });

  test('navigate to home', () => {
    wrapper.vm.navigateToHome();

    expect(router.push).toHaveBeenCalledTimes(1);
    expect(router.push).toHaveBeenCalledWith(
      expect.objectContaining({
        name: RouteNames.HOME,
      }),
    );
  });

  test('navigate to open-channel', () => {
    wrapper.vm.navigateToOpenChannel('0xtoken', '0xpartner');

    expect(router.push).toHaveBeenCalledTimes(1);
    expect(router.push).toHaveBeenCalledWith(
      expect.objectContaining({
        name: RouteNames.OPEN_CHANNEL,
        params: {
          token: '0xtoken',
          partner: '0xpartner',
        },
      }),
    );
  });

  test('navigate to token select', () => {
    wrapper.vm.navigateToTokenSelect();

    expect(router.push).toHaveBeenCalledTimes(1);
    expect(router.push).toHaveBeenCalledWith(
      expect.objectContaining({
        name: RouteNames.SELECT_TOKEN,
      }),
    );
  });

  test('navigate to payment target', () => {
    wrapper.vm.navigateToSelectTransferTarget('0xtoken');

    expect(router.push).toHaveBeenCalledTimes(1);
    expect(router.push).toHaveBeenCalledWith(
      expect.objectContaining({
        name: RouteNames.TRANSFER,
        params: {
          token: '0xtoken',
        },
      }),
    );
  });

  test('navigate to transfer steps', () => {
    wrapper.vm.navigateToTransferSteps('0xtoken', '0xtarget', '100');

    expect(router.push).toHaveBeenCalledTimes(1);
    expect(router.push).toHaveBeenCalledWith(
      expect.objectContaining({
        name: RouteNames.TRANSFER_STEPS,
        params: {
          token: '0xtoken',
          target: '0xtarget',
        },
        query: {
          amount: '100',
        },
      }),
    );
  });

  test('navigate to account', () => {
    wrapper.vm.navigateToAccount();

    expect(router.push).toHaveBeenCalledTimes(1);
    expect(router.push).toHaveBeenCalledWith(
      expect.objectContaining({
        name: RouteNames.ACCOUNT_ROOT,
      }),
    );
  });

  test('navigate to backup state', () => {
    wrapper.vm.navigateToBackupState();

    expect(router.push).toHaveBeenCalledTimes(1);
    expect(router.push).toHaveBeenCalledWith(
      expect.objectContaining({
        name: RouteNames.ACCOUNT_BACKUP,
      }),
    );
  });

  test('navigate to raiden account', () => {
    wrapper.vm.navigateToRaidenAccountTransfer();

    expect(router.push).toHaveBeenCalledTimes(1);
    expect(router.push).toHaveBeenCalledWith(
      expect.objectContaining({
        name: RouteNames.ACCOUNT_RAIDEN,
      }),
    );
  });

  test('general modal back navigation', () => {
    wrapper.vm.$route.name = RouteNames.TRANSFER;
    wrapper.vm.navigateToAccount();
    wrapper.vm.onModalBackClicked();

    expect(router.push).toHaveBeenCalledTimes(1);
    expect(router.go).toHaveBeenCalledTimes(1);
    expect(router.go).toHaveBeenCalledWith(-1);
    expect(wrapper.vm.$route.name).toBe(RouteNames.TRANSFER);
  });

  describe('back navigation', () => {
    test('from select token', async () => {
      wrapper.vm.$route.name = RouteNames.SELECT_TOKEN;
      wrapper.vm.onBackClicked();

      expect(router.go).toHaveBeenCalledTimes(1);
      expect(router.go).toHaveBeenCalledWith(-1);
    });

    test('from select hub', async () => {
      wrapper.vm.$route.name = RouteNames.SELECT_HUB;
      wrapper.vm.onBackClicked();

      expect(router.go).toHaveBeenCalledTimes(1);
      expect(router.go).toHaveBeenCalledWith(-1);
    });

    test('from channels', async () => {
      wrapper.vm.$route.name = RouteNames.CHANNELS;
      wrapper.vm.$route.params = {
        token: '0xtoken',
      };
      wrapper.vm.onBackClicked();

      expect(router.push).toHaveBeenCalledTimes(1);
      expect(router.push).toHaveBeenCalledWith(
        expect.objectContaining({
          name: RouteNames.TRANSFER,
          params: {
            token: '0xtoken',
          },
        }),
      );
    });

    test('from open-channel', async () => {
      wrapper.vm.$route.name = RouteNames.OPEN_CHANNEL;
      wrapper.vm.$route.params = {
        token: '0xtoken',
      };
      wrapper.vm.onBackClicked();

      expect(router.go).toHaveBeenCalledTimes(1);
      expect(router.go).toHaveBeenCalledWith(-1);
    });

    test('from transfer steps', async () => {
      wrapper.vm.$route.name = RouteNames.TRANSFER_STEPS;
      wrapper.vm.$route.params = {
        token: '0xtoken',
        target: '0xtarget',
        amount: '100',
      };
      wrapper.vm.onBackClicked();

      expect(router.push).toHaveBeenCalledTimes(1);
      expect(router.push).toHaveBeenCalledWith(
        expect.objectContaining({
          name: RouteNames.TRANSFER,
          params: {
            token: '0xtoken',
          },
          query: {
            target: '0xtarget',
            amount: '100',
          },
        }),
      );
    });
  });
});
