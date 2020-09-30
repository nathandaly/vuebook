<template>
  <q-card flat square class="full-width">
    <q-item>
      <q-item-section class="flex-wide">
        <q-avatar v-if="authenticateUser.loading">
          <q-spinner-puff color="primary" />
        </q-avatar>
        <q-avatar v-if="!authenticateUser.loading">
          <img
            @click="handleSetActiveProfileClick"
            :src="authenticateUser.payload && authenticateUser.payload.avatar || 'statics/no-avatar.jpg'"
          >
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-btn
          flat
          color="white"
          class="write-post"
          text-color="teal"
          :label="$t('whatsOnMind')"
          @click="openCreatePostDialog"
        ></q-btn>
      </q-item-section>

<!--      <q-btn @click="$root.$emit('OPEN_GLOBAL_SETTINGS')" :v-ripple="false" color="primary" flat dense icon="more_vert" />-->
    </q-item>

    <q-separator />

    <q-card-actions align="around">
      <q-btn unelevated color="white" class="flex-btn" icon="fal fa-edit" text-color="blue" @click="openCreatePostDialog" />
<!--      <q-btn unelevated color="white" class="flex-btn" icon="fal fa-camera-alt" text-color="blue" @click="uploadImage" />-->
<!--      <q-btn unelevated color="white" class="flex-btn" icon="fal fa-video" text-color="deep-purple-6" />-->
<!--      <q-btn unelevated color="white" class="flex-btn" icon="fal fa-poll" text-color="accent" />-->
    </q-card-actions>
  </q-card>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'CreateAPost.vue',
  data () {
    return {
      dialog: false
    }
  },
  created () {
    const self = this
    this.$root.$on(
      'SAVE_POST',
      post => self.newPost(post)
    )
  },
  computed: {
    ...mapState('user', [
      'authenticateUser'
    ]),

    Mallcomm () {
      return window.Mallcomm || {}
    }
  },
  methods: {
    ...mapActions('user', [
      'setActiveProfile'
    ]),
    ...mapActions('post', [
      'uploadImage',
      'savePost',
      'clearSharePost'
    ]),

    setImage () {
      alert('SETTING IMAGE...')
    },

    handleSetActiveProfileClick () {
      this.setActiveProfile(this.authenticateUser.payload)
      this.$router.push('/user/profile')
    },

    openCreatePostDialog () {
      this.clearSharePost()
      this.$root.$emit('OPEN_DIALOG:CREATE_POST')
    },

    async newPost (post) {
      await this.savePost(post)
    }
  }
}
</script>

<style scoped>

</style>
