<template>
  <raiden-dialog class="error-dialog" :visible="showDialog" @close="dismiss">
    <v-card-text>
      <v-row align="center" justify="center">
        <error-message :error="error" />
      </v-row>
    </v-card-text>
  </raiden-dialog>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';

import type { RaidenError } from 'raiden-ts';

import RaidenDialog from '@/components/dialogs/RaidenDialog.vue';
import ErrorMessage from '@/components/ErrorMessage.vue';

@Component({
  components: { RaidenDialog, ErrorMessage },
})
export default class ErrorDialog extends Vue {
  @Prop({ required: true })
  error!: Error | RaidenError | null;

  @Emit()
  dismiss(): boolean {
    return true;
  }

  get showDialog() {
    return this.error !== null;
  }
}
</script>

<style scoped lang="scss">
.error-dialog {
  &__image {
    height: 110px;
    margin: 0 auto;
    width: 110px;
  }
}
</style>
