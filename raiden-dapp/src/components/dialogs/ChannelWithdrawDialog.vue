<template>
  <raiden-dialog
    data-cy="channel_withdraw"
    class="channel-withdraw"
    :visible="visible"
    @close="cancel"
  >
    <v-card-title>
      <v-row align="center" justify="center">
        <v-col>
          <span v-if="loading">
            {{ $t('channel-withdraw.dialog.title') }}
          </span>
          <span v-else-if="done">
            {{ $t('channel-withdraw.done.title') }}
          </span>
          <span v-else>
            {{ $t('channel-withdraw.dialog.label') }}
          </span>
        </v-col>
      </v-row>
    </v-card-title>

    <v-card-actions>
      <v-row v-if="loading">
        <spinner />
      </v-row>
      <v-row v-else-if="done" align="center" justify="center">
        <v-col cols="6">
          <v-img class="channel-withdraw__done" :src="require('@/assets/done.svg')" />
        </v-col>
      </v-row>
      <v-row v-else align="center" justify="center">
        <v-col>
          <v-form v-model="valid" @submit.prevent="withdrawTokens()">
            <amount-input
              v-model="withdraw"
              data-cy="channel_withdraw_input"
              class="channel-withdraw__input"
              :token="token"
              :max="channel.ownWithdrawable"
              limit
            />
            <div data-cy="channel_withdraw_button" class="channel-withdraw__button">
              <action-button
                :id="`confirm-${identifier}`"
                :enabled="valid"
                :text="$t('channel-withdraw.buttons.confirm')"
                full-width
              />
            </div>
          </v-form>
        </v-col>
      </v-row>
    </v-card-actions>

    <v-card-text>
      <v-row align="center" justify="center">
        <span v-if="loading">
          {{ $t('channel-withdraw.dialog.description') }}
        </span>
        <span v-else-if="done">
          {{ $t('channel-withdraw.done.description') }}
        </span>
      </v-row>
    </v-card-text>
  </raiden-dialog>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from 'vue-property-decorator';

import type { RaidenChannel } from 'raiden-ts';

import ActionButton from '@/components/ActionButton.vue';
import AmountInput from '@/components/AmountInput.vue';
import RaidenDialog from '@/components/dialogs/RaidenDialog.vue';
import Spinner from '@/components/icons/Spinner.vue';
import type { Token } from '@/model/types';
import { BalanceUtils } from '@/utils/balance-utils';

@Component({
  components: {
    AmountInput,
    ActionButton,
    RaidenDialog,
    Spinner,
  },
})
export default class ChannelWithdrawDialog extends Vue {
  @Prop({ required: true })
  identifier!: number;
  @Prop({ required: true, type: Boolean, default: false })
  visible!: boolean;
  @Prop({ required: true })
  token!: Token;
  @Prop({ required: true })
  channel!: RaidenChannel;
  @Prop({ required: true })
  loading!: boolean;
  @Prop({ required: false, default: false })
  done?: boolean;

  withdraw = '';
  valid = false;

  @Watch('visible')
  onVisibilityChanged(visible: boolean) {
    if (!visible) {
      return;
    }
    this.updateWithdraw();
  }

  mounted() {
    this.updateWithdraw();
  }

  private async updateWithdraw() {
    this.withdraw = (this.token.decimals ?? 18) === 0 ? '0' : '0.0';
    await this.$raiden.fetchAndUpdateTokenData([this.token.address]);
  }

  @Emit()
  cancel(): boolean {
    return true;
  }

  withdrawTokens() {
    const withdraw = BalanceUtils.parse(this.withdraw, this.token.decimals!);
    if (!withdraw.isZero()) {
      this.$emit('withdraw-tokens', withdraw);
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/scss/colors';

.channel-withdraw {
  &__button {
    margin-top: 45px;
  }

  &__done {
    height: 110px;
    margin: 0 auto;
    width: 110px;
  }
}
</style>
