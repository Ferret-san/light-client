/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Wrapper } from '@vue/test-utils';
import { mount } from '@vue/test-utils';
import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuetify from 'vuetify';
import Vuex from 'vuex';

import AccountContent from '@/components/account/AccountContent.vue';
import { RouteNames } from '@/router/route-names';

jest.mock('vue-router');
import Mocked = jest.Mocked;

Vue.use(Vuetify);
Vue.use(Vuex);

const $router = new VueRouter() as Mocked<VueRouter>;

async function createWrapper(
  defaultAccount = '0xAccount',
  accountBalance = '0',
  usingRaidenAccount = false,
  raidenAccountBalance = '0',
  isConnected = true,
  useSubkey = false,
): Promise<Wrapper<AccountContent>> {
  const vuetify = new Vuetify();
  const state = {
    isConnected,
    defaultAccount,
    accountBalance,
    raidenAccountBalance,
  };

  const getters = {
    usingRaidenAccount: () => usingRaidenAccount,
  };

  const store = new Vuex.Store({ state, getters });

  const $raiden = {
    usingSubkey: useSubkey,
    getAccount: jest.fn(() => (useSubkey ? '0xAccount' : undefined)),
  };

  const wrapper = mount(AccountContent, {
    vuetify,
    store,
    mocks: {
      $router,
      $raiden,
      $t: (msg: string) => msg,
    },
  });

  // Else some components are not rendered correctly.
  await wrapper.vm.$nextTick();
  return wrapper;
}

const getDisconnectButton = (wrapper: Wrapper<AccountContent>): Wrapper<AccountContent> => {
  return wrapper.find('.account-content__disconnect__button');
};

describe('AccountContent.vue', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('displays address', async () => {
    const wrapper = await createWrapper('0x31aA9D3E2bd38d22CA3Ae9be7aae1D518fe46043');
    const addressTitle = wrapper.findAll('.account-content__account-details__address').at(0);
    const addressDesktop = wrapper.find('.account-content__account-details__address__desktop');
    const addressMobile = wrapper.find('.account-content__account-details__address__mobile');

    expect(addressTitle.text()).toBe('account-content.address');
    expect(addressDesktop.text()).toBe('0x31aA9D3E2bd38d22CA3Ae9be7aae1D518fe46043');
    expect(addressMobile.text()).toBe('0x31...6043');
  });

  test('displays balance for main account only if not using raiden account', async () => {
    const wrapper = await createWrapper(undefined, '12.0', false);

    const accountDetails = wrapper.findAll('.account-content__account-details__eth');
    expect(accountDetails.length).toBe(1);

    const mainAccountDetails = accountDetails.at(0);
    const title = mainAccountDetails.find('.account-content__account-details__eth__account');
    const balance = mainAccountDetails.find('.account-content__account-details__eth__balance');

    expect(title.text()).toBe('account-content.account.main');
    expect(balance.text()).toBe('12.000');
  });

  test('displays balance for main and raiden account if using raiden account', async () => {
    const wrapper = await createWrapper(undefined, undefined, true, '13.0');

    const accountDetails = wrapper.findAll('.account-content__account-details__eth');
    expect(accountDetails.length).toBe(2);

    const raidenAccountDetails = accountDetails.at(1);
    const title = raidenAccountDetails.find('.account-content__account-details__eth__account');
    const balance = raidenAccountDetails.find('.account-content__account-details__eth__balance');

    expect(title.text()).toBe('account-content.account.raiden');
    expect(balance.text()).toBe('13.000');
  });

  test('displays one menu item', async () => {
    const wrapper = await createWrapper();
    const menuItems = wrapper.findAll('.account-content__menu');

    expect(menuItems.length).toBe(1);
  });

  test('backup state menu item', async () => {
    const wrapper = await createWrapper();
    const backupStateMenuItem = wrapper.findAll('.account-content__menu__list-items').at(1);
    const backupStateTitle = backupStateMenuItem.find('.v-list-item__title');
    const backupStateSubtitle = backupStateMenuItem.find('.v-list-item__subtitle');

    backupStateMenuItem.trigger('click');

    expect(backupStateTitle.text()).toEqual('account-content.menu-items.backup-state.title');
    expect(backupStateSubtitle.text()).toEqual('account-content.menu-items.backup-state.subtitle');
    expect($router.push).toHaveBeenCalledTimes(1);
    expect($router.push).toHaveBeenCalledWith(
      expect.objectContaining({
        name: RouteNames.ACCOUNT_BACKUP,
      }),
    );
  });

  test('report bugs menu item', async () => {
    const wrapper = await createWrapper();
    const reportBugsMenuItem = wrapper.findAll('.account-content__menu__list-items').at(2);
    const reportBugsTitle = reportBugsMenuItem.find('.v-list-item__title');
    const reportBugsSubtitle = reportBugsMenuItem.find('.v-list-item__subtitle');

    expect(reportBugsTitle.text()).toEqual('account-content.menu-items.report-bugs.title');
    expect(reportBugsSubtitle.text()).toBe('account-content.menu-items.report-bugs.subtitle');
  });

  test('udc menu item', async () => {
    const wrapper = await createWrapper();
    const udcMenuItem = wrapper.findAll('.account-content__menu__list-items').at(0);
    const udcMenuTitle = udcMenuItem.find('.v-list-item__title');
    const udcMenuSubtitle = udcMenuItem.find('.v-list-item__subtitle');

    expect(udcMenuTitle.text()).toEqual('account-content.menu-items.udc.title');
    expect(udcMenuSubtitle.text()).toBe('account-content.menu-items.udc.subtitle');

    udcMenuItem.trigger('click');

    expect($router.push).toHaveBeenCalledTimes(1);
    expect($router.push).toHaveBeenCalledWith(
      expect.objectContaining({
        name: RouteNames.ACCOUNT_UDC,
      }),
    );
  });

  test('show raiden account menu item, if connected via sub key', async () => {
    const wrapper = await createWrapper(
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      true,
    );
    expect(wrapper.vm.$data.menuItems[0].title).toEqual(
      'account-content.menu-items.raiden-account.title',
    );
  });

  test('calls method for downloading logs', async () => {
    const wrapper = await createWrapper();
    (wrapper.vm as any).downloadLogs = jest.fn();
    const reportBugsMenuItem = wrapper.findAll('.account-content__menu__list-items').at(2);

    reportBugsMenuItem.trigger('click');
    await wrapper.vm.$nextTick();

    expect((wrapper.vm as any).downloadLogs).toBeCalled();
  });

  test('settings menu item when disconnected', async () => {
    const wrapper = await createWrapper(undefined, undefined, undefined, undefined, false);

    const settingsMenuItem = wrapper.findAll('.account-content__menu__list-items').at(0);
    const settingsMenuTitle = settingsMenuItem.find('.v-list-item__title');
    const settingsMenuSubtitle = settingsMenuItem.find('.v-list-item__subtitle');
    settingsMenuItem.trigger('click');

    expect(settingsMenuTitle.text()).toEqual('account-content.menu-items.settings.title');
    expect(settingsMenuSubtitle.text()).toEqual('account-content.menu-items.settings.subtitle');
    expect($router.push).toHaveBeenCalledTimes(1);
    expect($router.push).toHaveBeenCalledWith(
      expect.objectContaining({
        name: RouteNames.ACCOUNT_SETTINGS,
      }),
    );
  });

  test('does not display "Disconnect" button when not connected', async () => {
    const wrapper = await createWrapper(
      undefined,
      undefined,
      undefined,
      undefined,
      false,
      undefined,
    );
    const disconnectButton = getDisconnectButton(wrapper);

    expect(disconnectButton.exists()).toBe(false);
  });

  test('displays "Disconnect" button when connected', async () => {
    const wrapper = await createWrapper(
      undefined,
      undefined,
      undefined,
      undefined,
      true,
      undefined,
    );
    const disconnectButton = getDisconnectButton(wrapper);

    expect(disconnectButton.exists()).toBe(true);
  });

  test('Clicking "Disconnect" button triggers disconnect method', async () => {
    const wrapper = await createWrapper();
    (wrapper.vm as any).disconnect = jest.fn();
    const disconnectButton = getDisconnectButton(wrapper);

    disconnectButton.trigger('click');
    await wrapper.vm.$nextTick();

    expect((wrapper.vm as any).disconnect).toHaveBeenCalled();
  });
});
