<template>
  <div id="q-app">
    <q-dialog persistent v-model="errorDialog" :position="edPosition">
      <q-card class="error-dialog bg-red">
        <q-linear-progress :value="1" color="red-12" />

        <q-item-section class="application-error">
          <div class="text-weight-bold text-white">{{ edTitle }}</div>
          <div class="text-white">{{ edHumanMessage }}</div>
        </q-item-section>
        <q-item-section v-show="errorInfo" class="bg-white error-info text-red">
          <div><strong>Error code:</strong> {{ edErrorCode }}</div>
          <div>{{ edMachineMessage }}</div>
        </q-item-section>
        <q-card-actions align="right">
          <q-btn flat round color="white" icon="fal fa-info-circle" @click="errorInfo = !errorInfo" />
          <q-btn flat round color="white" icon="fal fa-times" @click="errorDialog = !errorDialog" />
        </q-card-actions>

      </q-card>
    </q-dialog>
    <TrophyDialog :open="showTrophy" :data="trophyData" @TrophyDialog:closed="showTrophy = false" />
    <router-view />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import TrophyDialog from './components/TrophyDialog'

export default {
  name: 'App',
  components: {
    TrophyDialog
  },
  data () {
    return {
      showTrophy: false,
      trophyData: null,
      emotionPicker: false,
      errorDialog: false,
      edPosition: 'top',
      edTitle: 'Application Error',
      edHumanMessage: 'An unhandled error has occurred.',
      errorInfo: false,
      edMachineMessage: 'Unavailable',
      edErrorCode: 0
    }
  },
  async beforeCreate () {
    this.$router.push('/loading')
    await this.$store.dispatch('user/authenticateUser').then(async result => {
      if (result) {
        // let authenticateUserResult = result
        await this.$store.dispatch('global/fetchCentreDetails').then(async result => {
          if (result) {
            await this.$store.dispatch('global/settings').then(async result => {
              if (result) {
                this.$router.push('/')
                /*
                if (authenticateUserResult.pushData === null) {
                  this.$router.push('/')
                } else {
                  const params = {
                    postId: authenticateUserResult.pushData.postId
                  }
                  let response = await this.$store.dispatch('post/fetchPost', params)
                  this.setActivePost(response)
                  this.$router.push('/post')
                }
                */
              }
            })
          }
        })
      }
    })
  },
  created () {
    this.$root.$on('TROPHY:WON', data => {
      this.trophyData = data
      this.showTrophy = true
    })
    this.$root.$on('OPEN_EMOTION_PICKER', () => { this.emotionPicker = true })
    this.$root.$on('APPLICATION_ERROR', ({ position, title, code, humanMessage, machineMessage }) => {
      this.errorDialog = true
      this.edPosition = position || this.edPosition
      this.edTitle = title || this.edTitle
      this.edHumanMessage = humanMessage || this.edHumanMessage
      this.edMachineMessage = machineMessage || this.edMachineMessage
      this.edErrorCode = code || this.edErrorCode
    })
  },
  computed: {
    ...mapState('post', [
      'activePost'
    ])
  },
  methods: {
    ...mapActions('post', [
      'setActivePost'
    ])
  },
  beforeDestroy () {
    // Don't forget to turn the listener off before your component is destroyed
    this.$root.$off('TROPHY:WON')
    this.$root.$off('OPEN_EMOTION_PICKER')
  }
}
</script>

<style scoped>
  .q-item__section.application-error {
    padding: 10px 16px;
  }
  .q-item__section.error-info {
    margin: 0;
    padding: 10px 16px;
  }
  .error-dialog .q-card__actions {
    padding: 0 16px;
  }
</style>
