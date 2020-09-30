<template>
  <q-dialog
    v-model="visible"
    persistent
    :maximized="true"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card
      v-touch-swipe.mouse.down="handleSwipe"
      class="bg-white text-grey-10 full-height">
      <q-toolbar class="bg-grey-3">
        <slot name="t-dialog-left">
          <q-btn dense flat class="text-blue" @click="hideDialog">{{ $t('cancel') }}</q-btn>
        </slot>
        <q-toolbar-title class="text-center">
          <slot name="t-dialog-title">
            TDialog
          </slot>
        </q-toolbar-title>
        <slot name="t-dialog-right">
          <q-btn dense flat class="text-blue" @click="submit">
            <slot name="t-dialog-rightBtn-name">
              Submit
            </slot>
          </q-btn>
        </slot>
      </q-toolbar>

      <q-card-section class="no-padding full-height">
        <slot name="t-dialog-content"></slot>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import {
  QDialog,
  QCard,
  QCardSection,
  QToolbar,
  QToolbarTitle,
  QBtn,
  TouchSwipe
} from 'quasar'

export default {
  name: 'TDialog',
  extends: QDialog,
  components: {
    QDialog,
    QCard,
    QCardSection,
    QToolbar,
    QToolbarTitle,
    QBtn
  },
  directives: {
    TouchSwipe
  },
  data () {
    return {
      visible: false
    }
  },
  methods: {
    showDialog () {
      this.visible = true
      this.$emit('TDialog:opened')
    },
    hideDialog () {
      this.visible = false
      this.$emit('TDialog:closed')
    },
    submit () {
      this.$emit('TDialog:submit')
    },
    handleSwipe () {
      // this.hideDialog()
    }
  },
  props: {
    open: Boolean
  },
  watch: {
    open () {
      if (this.open && !this.visible) {
        this.showDialog()
      } else if (!this.open && this.visible) {
        this.hideDialog()
      }
    }
  }
}
</script>

<style scoped>
  .q-toolbar__title {
    font-size: 16px;
  }

  .q-btn {
    font-weight: normal;
    font-size: 16px;
    text-transform: capitalize !important;
  }
</style>
