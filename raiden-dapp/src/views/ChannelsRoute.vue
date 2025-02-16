<template>
  <div class="channels">
    <v-row class="ml-5 mr-5" no-gutters>
      <v-col>
        <span class="font-weight-light mr-1">
          {{ $t('channels.title') }}
        </span>
        <v-tooltip top>
          <template #activator="{ on }">
            <span class="font-weight-medium" v-on="on">
              {{
                $t('channels.token-info', {
                  name: truncate(token.name, 22),
                  symbol: truncate(token.symbol, 8),
                })
              }}
            </span>
          </template>
          <span> {{ token.address }} </span>
        </v-tooltip>
      </v-col>
    </v-row>
    <list-header
      v-if="open.length > 0"
      :header="$t('channels.open.header')"
      class="channels__header"
    />
    <div class="channels__wrapper">
      <channel-list
        v-if="open.length > 0"
        :token="token"
        :channels="open"
        :selected-channel="selectedChannel"
        :busy="busy"
        @action="onAction"
      />
      <list-header
        v-if="closed.length > 0"
        :header="$t('channels.closed.header')"
        class="channels__header"
      />
      <channel-list
        v-if="closed.length > 0"
        :token="token"
        :channels="closed"
        :selected-channel="selectedChannel"
        :busy="busy"
        @action="onAction"
      />
      <list-header
        v-if="settleable.length > 0"
        :header="$t('channels.settleable.header')"
        class="channels__header"
      />
      <channel-list
        v-if="settleable.length > 0"
        :token="token"
        :channels="settleable"
        :selected-channel="selectedChannel"
        :busy="busy"
        @action="onAction"
      />
    </div>
    <v-snackbar v-model="snackbar" :multi-line="true" :timeout="3000" bottom>
      {{ message }}
      <v-btn color="primary" text @click="snackbar = false">
        {{ $t('channels.snackbar-close') }}
      </v-btn>
    </v-snackbar>
    <channel-dialogs
      v-if="selectedChannel && action"
      :action="action"
      :channel="selectedChannel"
      @dismiss="
        action = null;
        selectedChannel = null;
      "
      @message="showMessage($event)"
      @busy="setBusyState($event)"
    />
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

import type { RaidenChannel } from 'raiden-ts';
import { ChannelState } from 'raiden-ts';

import ChannelDialogs from '@/components/channels/ChannelDialogs.vue';
import ChannelList from '@/components/channels/ChannelList.vue';
import ListHeader from '@/components/ListHeader.vue';
import Filters from '@/filters';
import NavigationMixin from '@/mixins/navigation-mixin';
import type { Token } from '@/model/types';
import type { ChannelAction } from '@/types';
import AddressUtils from '@/utils/address-utils';

@Component({
  components: { ChannelDialogs, ListHeader, ChannelList },
  computed: {
    ...mapGetters(['channels']),
  },
})
export default class ChannelsRoute extends Mixins(NavigationMixin) {
  message = '';
  snackbar = false;
  channels!: (address: string) => RaidenChannel[];

  selectedChannel: RaidenChannel | null = null;
  action: ChannelAction | null = null;
  busy: { [key: number]: boolean } = {};

  truncate = Filters.truncate;

  setBusyState([state, id]: [boolean, number]) {
    this.busy[id] = state;
  }

  onAction([action, channel]: [ChannelAction, RaidenChannel]) {
    this.selectedChannel = channel;
    this.action = action;
  }

  get open(): RaidenChannel[] {
    return this.channels(this.$route.params.token).filter(
      (channel) => channel.state === ChannelState.open,
    );
  }

  get closed(): RaidenChannel[] {
    return this.channels(this.$route.params.token).filter(
      (channel) => channel.state === ChannelState.closed || channel.state === ChannelState.closing,
    );
  }

  get settleable(): RaidenChannel[] {
    return this.channels(this.$route.params.token).filter(
      (channel) =>
        channel.state === ChannelState.settling || channel.state === ChannelState.settleable,
    );
  }

  get token(): Token {
    const { token: address } = this.$route.params;
    return this.$store.state.tokens[address] || ({ address } as Token);
  }

  async created() {
    const { token: address } = this.$route.params;
    if (!AddressUtils.checkAddressChecksum(address)) {
      this.navigateToHome();
      return;
    }

    await this.$raiden.fetchAndUpdateTokenData([address]);

    if (typeof this.token.decimals !== 'number') {
      this.navigateToHome();
    }
  }

  showMessage(message: string) {
    this.message = message;
    this.snackbar = true;
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/dimensions';
@import '@/scss/scroll';

.channels {
  width: 100%;
  height: 100%;

  &:first-child {
    padding-top: 40px;
  }

  &__overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(30, 30, 30, 0.75);
    z-index: 10;
  }

  &__wrapper {
    height: calc(100% - 60px);
    width: 100%;
    overflow-y: auto;
    @extend .themed-scrollbar;
  }

  &__header {
    padding-top: $list-header-padding-top;
  }
}
</style>
