<template>
  <div class="account-content">
    <div v-if="isConnected">
      <v-row class="account-content__account-details" dense>
        <v-col cols="3">
          <span class="account-content__account-details__address">
            {{ $t('account-content.address') }}
          </span>
        </v-col>
        <v-col cols="9">
          <span class="account-content__account-details__address">
            <address-display
              class="account-content__account-details__address__desktop"
              :address="defaultAccount"
              full-address
            />
            <address-display
              class="account-content__account-details__address__mobile"
              :address="defaultAccount"
            />
          </span>
        </v-col>
      </v-row>
      <v-row class="account-content__account-details__eth" dense>
        <v-col cols="3">
          <span class="account-content__account-details__eth__account">
            {{ $t('account-content.account.main') }}
          </span>
        </v-col>
        <v-col cols="9">
          <span class="account-content__account-details__eth__balance">
            {{ accountBalance | decimals }}
          </span>
        </v-col>
      </v-row>
      <v-row v-if="usingRaidenAccount" class="account-content__account-details__eth" dense>
        <v-col cols="3">
          <span class="account-content__account-details__eth__account">
            {{ $t('account-content.account.raiden') }}
          </span>
        </v-col>
        <v-col cols="9">
          <span class="account-content__account-details__eth__balance">
            {{ raidenAccountBalance | decimals }}
          </span>
        </v-col>
      </v-row>
    </div>
    <v-list two-line class="account-content__menu">
      <v-list-item
        v-for="(menuItem, index) in menuItems"
        :key="index"
        class="account-content__menu__list-items"
        data-cy="account_content_menu_list_items"
        :ripple="false"
        @click="menuItem.route"
      >
        <div class="account-content__menu__list-items__icon">
          <v-img
            :src="require(`@/assets/account-menu/${menuItem.icon}`)"
            max-width="40px"
            height="36px"
            contain
          />
        </div>
        <v-list-item-content>
          <v-list-item-title class="account-content__menu__list-items__title">
            {{ menuItem.title }}
          </v-list-item-title>
          <v-list-item-subtitle>{{ menuItem.subtitle }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-icon class="account-content__menu__list-items__arrow">
          mdi-chevron-right mdi-36px
        </v-icon>
      </v-list-item>
    </v-list>
    <div v-if="isConnected" class="account-content__disconnect">
      <span class="account-content__disconnect__button" @click="disconnect()">
        {{ $t('account-content.disconnect-button') }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { mapGetters, mapState } from 'vuex';

import AddressDisplay from '@/components/AddressDisplay.vue';
import NavigationMixin from '@/mixins/navigation-mixin';
import { getLogsFromStore } from '@/utils/logstore';

interface MenuItem {
  icon: string;
  title: string;
  subtitle: string;
  route: () => void;
}

@Component({
  components: {
    AddressDisplay,
  },
  computed: {
    ...mapState(['isConnected', 'defaultAccount', 'accountBalance', 'raidenAccountBalance']),
    ...mapGetters(['usingRaidenAccount']),
  },
})
export default class AccountContent extends Mixins(NavigationMixin) {
  menuItems: MenuItem[] = [];
  defaultAccount!: string;
  accountBalance!: string;
  raidenAccountBalance!: string;
  isConnected!: boolean;

  async disconnect() {
    await this.$raiden.disconnect();
    localStorage.removeItem('walletconnect');
    this.$store.commit('setDisconnected');
    this.$store.commit('reset');
  }

  mounted() {
    this.menuItems = [
      {
        icon: 'account_state.svg',
        title: this.$t('account-content.menu-items.backup-state.title') as string,
        subtitle: this.$t('account-content.menu-items.backup-state.subtitle') as string,
        route: () => {
          this.navigateToBackupState();
        },
      },
      {
        icon: 'account_bug.svg',
        title: this.$t('account-content.menu-items.report-bugs.title') as string,
        subtitle: this.$t('account-content.menu-items.report-bugs.subtitle') as string,
        route: () => {
          this.downloadLogs();
        },
      },
    ];

    if (this.isConnected) {
      // add UDC item
      this.menuItems.unshift({
        icon: 'account_udc.svg',
        title: this.$t('account-content.menu-items.udc.title') as string,
        subtitle: this.$t('account-content.menu-items.udc.subtitle') as string,
        route: () => {
          this.navigateToUDC();
        },
      });

      if (this.$raiden.usingSubkey) {
        const raidenAccount = {
          icon: 'account_eth.svg',
          title: this.$t('account-content.menu-items.raiden-account.title') as string,
          subtitle: this.$t('account-content.menu-items.raiden-account.subtitle') as string,
          route: () => {
            this.navigateToRaidenAccountTransfer();
          },
        };

        const withdrawal = {
          icon: 'account_withdrawal.svg',
          title: this.$t('account-content.menu-items.withdrawal.title') as string,
          subtitle: this.$t('account-content.menu-items.withdrawal.subtitle') as string,
          route: () => {
            this.navigateToWithdrawal();
          },
        };
        this.menuItems.unshift(withdrawal);
        this.menuItems.unshift(raidenAccount);
      }
    }

    // if not connected we display the settings menu item
    // to toggle between sub and main key
    // this check should probably be removed once we get
    // more settings
    if (!this.isConnected) {
      this.menuItems.unshift({
        icon: 'gear.svg',
        title: this.$t('account-content.menu-items.settings.title') as string,
        subtitle: this.$t('account-content.menu-items.settings.subtitle') as string,
        route: () => {
          this.navigateToSettings();
        },
      });
    }
  }

  /* istanbul ignore next */
  async downloadLogs() {
    const [lastTime, content] = await getLogsFromStore();
    let account = '';
    try {
      account = `${this.$raiden.getAccount()}_`;
    } catch (err) {}
    const filename = `raiden_${account}${new Date(lastTime).toISOString()}.log`;
    const file = new File([content], filename, { type: 'text/plain' });
    const url = URL.createObjectURL(file);
    const el = document.createElement('a');
    el.href = url;
    el.download = filename;
    el.style.display = 'none';
    document.body.appendChild(el);
    el.click();
    setTimeout(() => {
      URL.revokeObjectURL(url);
      document.body.removeChild(el);
    }, 0);
  }
}
</script>

<style scoped lang="scss">
@import '@/scss/mixins';
@import '@/scss/colors';

.account-content {
  margin: 0 64px 0 64px;

  @include respond-to(handhelds) {
    margin: 0 30px 0 30px;
  }

  &__account-details {
    margin-top: 20px;

    &__title {
      font-size: 16px;
      font-weight: 500;
      padding-bottom: 15px;
    }

    &__address {
      font-size: 16px;

      &__desktop {
        margin-top: 2px;
        @include respond-to(handhelds) {
          display: none;
        }
      }

      &__mobile {
        display: none;
        margin-top: 2px;
        @include respond-to(handhelds) {
          display: flex;
          margin-left: 30px;
        }
      }
    }

    &__eth {
      &__balance {
        @include respond-to(handhelds) {
          margin-left: 30px;
        }
      }

      &__account,
      &__balance {
        color: rgba($color-white, 0.7);
        font-size: 14px;
      }
    }
  }

  &__menu {
    background-color: transparent;
    margin-top: 25px;

    ::v-deep {
      ::before {
        background-color: transparent;
      }
    }

    &__list-items {
      background-color: $account-menu-bg;
      border-radius: 15px;
      margin-top: -2px;
      height: 74px;
      margin-bottom: 10px;

      &:hover {
        background-color: $account-menu-fg;
      }

      &__title {
        color: $primary-color;
        font-weight: 500;
      }

      &__icon {
        padding-right: 20px;
        width: 50px;
      }

      &__arrow {
        color: $primary-color;
      }

      &:nth-of-type(3) {
        margin-bottom: 40px;
      }
    }
  }

  &__disconnect {
    height: 42px;
    text-align: center;
    &__button {
      color: $primary-color;
      cursor: pointer;
    }
  }
}
</style>
