<template>
  <q-layout v-if="authenticateUser.payload" view="hHh lpR fFf" ref="layout">
    <div v-html="formattedPluginStyles"></div>
    <q-header v-if="!activePost" reveal class="timeline-header bg-white">
      <CreatePost></CreatePost>
    </q-header>

    <!--<q-drawer
      v-model="globalSettingsDrawer"
      side="right"
      behavior="mobile"
      :width="200"
      :breakpoint="500"
      elevated>
      <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
        <q-list padding>
          <q-item clickable v-ripple:red>
            <q-item-section avatar>
              <q-icon color="red" name="far fa-bell">
                <q-badge color="red" floating>4</q-badge>
              </q-icon>
            </q-item-section>

            <q-item-section>
              Notifications
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple:primary>
            <q-item-section avatar>
              <q-icon color="primary" name="far fa-comment-dots">
                <q-badge color="primary" floating>4</q-badge>
              </q-icon>
            </q-item-section>

            <q-item-section>
              Chat
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple:accent>
            <q-item-section avatar>
              <q-icon color="accent" name="fas fa-user-edit" />
            </q-item-section>

            <q-item-section>
              Edit Profile
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple:teal>
            <q-item-section avatar>
              <q-icon color="teal" name="fas fa-sliders-h" />
            </q-item-section>

            <q-item-section>
              Settings
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img :src="authenticateUser.avatar">
          </q-avatar>
          <div class="text-weight-bold">{{ authenticateUser.name }}</div>
          <div>@rstoenescu</div>
        </div>
      </q-img>
    </q-drawer>-->

    <q-page-container>
      <router-view />
    </q-page-container>

    <CreateAPostDialog />

  </q-layout>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import CreatePost from '../components/CreateAPost'
import CreateAPostDialog from '../components/CreateAPostDialog'

export default {
  name: 'Timeline',
  components: {
    CreatePost,
    CreateAPostDialog
  },
  mounted () {
    this.$root.$on('OPEN_GLOBAL_SETTINGS', this.openGlobalSettingsDrawer)
  },
  data () {
    return {
      globalSettingsDrawer: false,
      formattedPluginStyles: '<style>' + this.getPluginStyles() + '</style>'
    }
  },
  computed: {
    ...mapState('post', [
      'activePost'
    ]),
    ...mapState('user', [
      'authenticateUser'
    ])
  },
  methods: {
    ...mapGetters('global', [
      'getPluginStyles'
    ]),
    openGlobalSettingsDrawer () {
      this.globalSettingsDrawer = true
    }
  }
}
</script>
<style>
.pageScrape {
  display: block;
  border: 1px solid #eee;
  border-radius: 5px;
  padding: 10px;
  text-decoration: none;
}
</style>
