<template>
  <raiden-dialog :visible="visible" @close="cancel">
    <v-card-title v-if="!error">
      <div>
        {{ $t('udc-deposit-dialog.title') }}
      </div>
      <div class="udc-deposit-dialog__balance">
        {{
          $t('udc-deposit-dialog.available-utility-token', {
            utilityTokenSymbol: udcToken.symbol,
            utilityTokenBalance: utilityTokenBalance,
          })
        }}
      </div>
    </v-card-title>
    <v-card-text>
      <v-row v-if="!loading && !error" justify="center" no-gutters>
        <amount-input
          v-model="defaultUtilityTokenAmount"
          :token="udcToken"
          :placeholder="$t('transfer.amount-placeholder')"
        />
      </v-row>
      <v-row v-else-if="error">
        <error-message :error="error" />
      </v-row>
      <v-row v-else class="udc-deposit-dialog--progress">
        <v-col cols="12">
          <v-row>
            <spinner />
          </v-row>
          <v-row no-gutters align="center" justify="center">
            <span v-if="step === 'mint'">
              {{
                $t('udc-deposit-dialog.progress.mint', {
                  currency: udcToken.symbol,
                })
              }}
            </span>
            <span v-else-if="step === 'approve'">
              {{
                $t('udc-deposit-dialog.progress.approve', {
                  currency: udcToken.symbol,
                })
              }}
            </span>
            <span v-else-if="step === 'deposit'">
              {{
                $t('udc-deposit-dialog.progress.deposit', {
                  currency: udcToken.symbol,
                })
              }}
            </span>
          </v-row>
        </v-col>
      </v-row>
      <v-row v-if="mainnet && !loading && !error" no-gutters justify="center">
        <a class="udc-deposit-dialog--uniswap-url" :href="uniswapURL" target="_blank">
          {{ $t('udc-deposit-dialog.uniswap-url-title') }}
        </a>
      </v-row>
    </v-card-text>
    <v-card-actions v-if="!error">
      <action-button
        arrow
        full-width
        :enabled="valid && !loading"
        :text="$t(mainnet ? 'udc-deposit-dialog.button-main' : 'udc-deposit-dialog.button')"
        data-cy="udc_deposit_dialog_action"
        class="udc-deposit-dialog__action"
        @click="udcDeposit()"
      />
    </v-card-actions>
  </raiden-dialog>
</template>

<script lang="ts">
import type { BigNumber } from 'ethers';
import { constants, utils } from 'ethers';
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
import { mapGetters, mapState } from 'vuex';

import type { RaidenError } from 'raiden-ts';

import ActionButton from '@/components/ActionButton.vue';
import AmountInput from '@/components/AmountInput.vue';
import RaidenDialog from '@/components/dialogs/RaidenDialog.vue';
import ErrorMessage from '@/components/ErrorMessage.vue';
import Spinner from '@/components/icons/Spinner.vue';
import Filters from '@/filters';
import type { Token } from '@/model/types';
import { BalanceUtils } from '@/utils/balance-utils';

@Component({
  components: {
    ActionButton,
    RaidenDialog,
    ErrorMessage,
    Spinner,
    AmountInput,
  },
  computed: {
    ...mapState('userDepositContract', { udcToken: 'token' }),
    ...mapGetters(['mainnet']),
  },
})
export default class UdcDepositDialog extends Vue {
  mainnet!: boolean;
  uniswapURL = '';
  udcToken!: Token;
  defaultUtilityTokenAmount = '';
  step: 'mint' | 'approve' | 'deposit' | '' = '';
  loading = false;
  error: Error | RaidenError | null = null;

  @Prop({ required: true, type: Boolean })
  visible!: boolean;

  @Emit()
  cancel() {
    this.error = null;
  }

  get utilityTokenBalance(): string {
    return Filters.displayFormat(this.udcToken.balance as BigNumber, this.udcToken.decimals);
  }

  get valid(): boolean {
    let utilityTokenAmount: BigNumber;

    try {
      utilityTokenAmount = utils.parseUnits(
        this.defaultUtilityTokenAmount,
        this.udcToken.decimals,
      );
    } catch (err) {
      return false;
    }

    if (this.mainnet) {
      return (
        utilityTokenAmount.lte(this.udcToken.balance as BigNumber) &&
        utilityTokenAmount.gt(constants.Zero)
      );
    } else {
      return utilityTokenAmount.gt(constants.Zero);
    }
  }

  mounted() {
    const mainAccountAddress = this.$raiden.getMainAccount() ?? this.$raiden.getAccount();

    this.uniswapURL = `https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=${this.udcToken.address}&exactAmount=10&exactField=outPUT&recipient=${mainAccountAddress}`;

    this.mainnet
      ? (this.defaultUtilityTokenAmount = this.utilityTokenBalance)
      : (this.defaultUtilityTokenAmount = '10');
  }

  async udcDeposit() {
    this.error = null;
    this.loading = true;
    const token = this.udcToken;
    const depositAmount = BalanceUtils.parse(this.defaultUtilityTokenAmount, token.decimals!);

    try {
      if (!this.mainnet && depositAmount.gt(token.balance!)) {
        this.step = 'mint';
        await this.$raiden.mint(token.address, depositAmount);
      }

      this.step = 'approve';
      await this.$raiden.depositToUDC(depositAmount, () => {
        this.step = 'deposit';
      });
      this.$emit('done');
    } catch (e) {
      this.error = e;
    }

    this.step = '';
    this.loading = false;
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/colors';

.udc-deposit-dialog {
  background-color: #141414;
  border-radius: 10px !important;
  padding: 20px 20px 55px 20px;

  &__balance {
    font-size: 14px;
    width: 100%;
  }

  &--progress {
    margin-top: 20px;
    span {
      margin-top: 22px;
    }
  }

  &--uniswap-url {
    text-decoration: none;
  }

  &__close {
    position: absolute;
    right: 15px;
    top: 15px;
  }
}
</style>
