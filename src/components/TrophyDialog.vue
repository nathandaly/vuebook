<template>
  <q-dialog
    class='trophy-dialog'
    v-model='visible'
    @hide='hideDialog'
    v-if="data"
  >
    <q-card style='width: 250px; padding: 10px;'>
      <q-item>
        <q-item-section class='text-center'>
          <div class='text-h6'>{{ data.title }}</div>
        </q-item-section>
      </q-item>
      <q-item class='center'>
        <q-item-section>
          <img ref="trophyImage" class='trophy__image' :src='`statics/trophies/${data.image}.png`'>
        </q-item-section>
      </q-item>

      <q-card-section class='text-justify'>
        <div class='text-subtitle2 trophy__description'>{{ data.description }}</div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
// import { confetti } from 'dom-confetti'
export default {
  name: 'TrophyDialog',
  props: {
    open: Boolean,
    data: Object
  },
  data () {
    return {
      visible: false
    }
  },
  mounted () {
  },
  methods: {
    showDialog () {
      this.visible = true
      this.$emit('TrophyDialog:opened')
    },
    hideDialog () {
      this.visible = false
      this.$emit('TrophyDialog:closed')
    }
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

<style>
  .trophy__image {
    width: 150px;
    margin-left: auto;
    margin-right: auto;
    display: block;
  }

  .trophy__description {
    font-weight: normal;
  }
</style>
