<template>
  <blurred-overlay :show="visible" fullscreen>
    <v-dialog
      :value="visible"
      :width="width"
      hide-overlay
      dark
      :persistent="hideClose"
      @click:outside="close()"
    >
      <v-card data-cy="raiden_dialog" class="raiden-dialog">
        <v-btn v-if="!hideClose" icon class="raiden-dialog__close" @click="close()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <slot />
      </v-card>
    </v-dialog>
  </blurred-overlay>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';

import BlurredOverlay from '@/components/overlays/BlurredOverlay.vue';

@Component({ components: { BlurredOverlay } })
export default class RaidenDialog extends Vue {
  @Prop({ required: true, default: false, type: Boolean })
  visible!: boolean;
  @Prop({ required: false, default: false, type: Boolean })
  hideClose!: boolean;
  @Prop({ required: false, default: '350', type: String })
  width!: string;

  @Emit()
  close(): boolean {
    return true;
  }
}
</script>

<style scoped lang="scss">
@import '@/scss/colors';
@import '@/scss/fonts';

::v-deep {
  .v-dialog {
    border-radius: 10px !important;
  }
}

.raiden-dialog {
  background-color: $card-background;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 25px;

  ::v-deep {
    .v-card {
      &__title {
        color: $color-white;
        font-family: $main-font;
        font-size: 20px;
        font-weight: 700;
        line-height: 28px;
        justify-content: center;
        text-align: center;
        word-break: normal;
      }

      &__actions {
        margin: 20px 0 20px 0;
      }

      &__text {
        padding-top: 10px;
        text-align: center;
        color: $color-white;
      }
    }
  }

  &__close {
    position: absolute;
    right: 15px;
    top: 15px;
  }
}
</style>
