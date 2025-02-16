import type { Wrapper } from '@vue/test-utils';
import { mount } from '@vue/test-utils';
import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuetify from 'vuetify';

import ActionButton from '@/components/ActionButton.vue';
import NoChannelsDialog from '@/components/dialogs/NoChannelsDialog.vue';
import { RouteNames } from '@/router/route-names';

jest.mock('vue-router');
import Mocked = jest.Mocked;

Vue.use(Vuetify);

describe('NoChannelsDialog.vue', () => {
  const vuetify = new Vuetify();
  const router = new VueRouter() as Mocked<VueRouter>;

  const wrapper: Wrapper<NoChannelsDialog> = mount(NoChannelsDialog, {
    vuetify,
    propsData: {
      visible: true,
    },
    stubs: ['raiden-dialog'],
    mocks: {
      $router: router,
      $t: (msg: string) => msg,
    },
  });

  test('clicking dialog button redirects to token select screen', async () => {
    const connectNewTokenButton = wrapper.findComponent(ActionButton).find('button');
    connectNewTokenButton.trigger('click');
    await wrapper.vm.$nextTick();

    expect(router.push).toHaveBeenCalledTimes(1);
    expect(router.push).toHaveBeenCalledWith(
      expect.objectContaining({ name: RouteNames.SELECT_TOKEN }),
    );
  });
});
