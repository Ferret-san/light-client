import type { Wrapper } from '@vue/test-utils';
import { mount } from '@vue/test-utils';
import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuetify from 'vuetify';
import Vuex from 'vuex';

import NoTokens from '@/components/NoTokens.vue';
import { RouteNames } from '@/router/route-names';
import store from '@/store/index';

jest.mock('vue-router');
import Mocked = jest.Mocked;

Vue.use(Vuex);
Vue.use(Vuetify);

describe('NoTokens.vue', () => {
  let wrapper: Wrapper<NoTokens>;
  let vuetify: Vuetify;
  let router: Mocked<VueRouter>;

  beforeEach(() => {
    vuetify = new Vuetify();
    router = new VueRouter() as Mocked<VueRouter>;
    router.push = jest.fn();
    wrapper = mount(NoTokens, {
      vuetify,
      store,
      mocks: {
        $router: router,
        $t: (msg: string) => msg,
      },
    });
  });

  test('navigates to SelectToken view when new token button is clicked', async () => {
    const newTokenButton = wrapper.find('button');
    newTokenButton.trigger('click');

    expect(router.push).toHaveBeenCalledTimes(1);
    expect(router.push).toHaveBeenCalledWith(
      expect.objectContaining({
        name: RouteNames.SELECT_TOKEN,
      }),
    );
  });
});
