<template>
  <raiden-dialog :visible="dialogVisible" :hide-close="true">
    <v-card-title>
      {{ $t('home.connection-pending-dialog.title') }}
    </v-card-title>

    <v-card-text>
      <spinner :size="60" class="my-4" />
      {{ $t('home.connection-pending-dialog.text') }}
    </v-card-text>

    <v-card-actions>
      <action-button
        :text="$t('home.connection-pending-dialog.button')"
        :enabled="true"
        @click="resetConnection"
      />
    </v-card-actions>
  </raiden-dialog>
</template>

<script lang="ts">
import { Component, Emit, Vue } from 'vue-property-decorator';

import ActionButton from '@/components/ActionButton.vue';
import RaidenDialog from '@/components/dialogs/RaidenDialog.vue';
import Spinner from '@/components/icons/Spinner.vue';

const SHOW_DIALOG_TIMEOUT = 7000;

/*
  Please note that because the underlying dialog component by Vuetify, it is not
  possible to implement the delayed rendering with a Vue transition or pure CSS
  effect. Therefore this alternative approach of using the life-cycle hook and
  a timer is necessary.
*/
@Component({ components: { ActionButton, RaidenDialog, Spinner } })
export default class ConnectionPendingDialog extends Vue {
  dialogVisible = false;

  @Emit('reset-connection')
  resetConnection(): void {
    // pass
  }

  mounted() {
    this.delayVisibilityOfDialog();
  }

  delayVisibilityOfDialog(): void {
    setTimeout(this.showDialog, SHOW_DIALOG_TIMEOUT);
  }

  showDialog(): void {
    this.dialogVisible = true;
  }
}
</script>
