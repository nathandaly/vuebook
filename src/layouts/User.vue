<template>
  <q-layout view="hHh LpR fFr">
    <div v-html="formattedPluginStyles"></div>
    <q-header class="bg-white">
      <q-toolbar class="text-primary">
        <q-btn
          @click="handleGoBackClick"
          flat
          color="black"
          icon="fas fa-chevron-left"
          size="sm"
        />
        <q-toolbar-title class="text-grey-10">{{ $root.fullName(activeProfile) }}</q-toolbar-title>
        <!--<q-chip v-if="activeProfile.influencer" outline color="yellow-10" icon-right="fas fa-stars">
          Influencer
        </q-chip>-->
        <!--<q-btn @click="profileSettings = !profileSettings" flat round dense icon="more_vert" />-->
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-card flat>
        <q-item>
          <q-item-section side>
            <q-avatar size="150px">
              <img :src="activeProfile.avatar || 'statics/no-avatar.jpg'">
              <!--<q-badge class="q-pa-xs online-badge" floating color="white">
                <q-btn size="xs" round color="positive" />
              </q-badge>-->
            </q-avatar>
          </q-item-section>

          <!--<q-item-section>
            <q-item>
              <div class="q-gutter-sm">
                <q-btn unelevated round glossy color="warning" icon="fas fa-star" />
                <q-btn unelevated round glossy color="accent" icon="fas fa-envelope" />
                <q-btn unelevated round glossy color="primary" icon="fas fa-comment-dots" />
              </div>
            </q-item>
          </q-item-section>-->
        </q-item>
        <!--<q-card-actions align="around">
          <q-btn flat icon="fas fa-star" stack color="warning">
            <span class="text-grey-10 text-subtitle2 text-capitalize">{{ activeProfile.followers }}</span>
            <span class="text-grey-10 text-capitalize text-caption">Followers</span>
          </q-btn>
          <q-btn flat icon="fas fa-bookmark" stack color="secondary">
            <span class="text-grey-10 text-subtitle2 text-capitalize">{{ activeProfile.following }}</span>
            <span class="text-grey-10 text-capitalize text-caption">Following</span>
          </q-btn>
          <q-btn flat icon="fas fa-trophy" stack color="primary">
            <span class="text-grey-10 text-subtitle2 text-capitalize">{{ activeProfile.following }}</span>
            <span class="text-grey-10 text-capitalize text-caption">Trophies</span>
          </q-btn>
        </q-card-actions>-->
      </q-card>
      <q-separator></q-separator>
      <transition
        name="fade"
        mode="out-in"
      >
        <keep-alive>
          <router-view />
        </keep-alive>
      </transition>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
  name: 'User',
  data () {
    return {
      profileSettings: true,
      formattedPluginStyles: '<style>' + this.getPluginStyles() + '</style>'
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.prevRoute = from
    })
  },
  mounted () {
    /* eslint-disable */
    if (typeof Mallcomm === 'object' && typeof Mallcomm.clearHistory === 'function') {
      Mallcomm.clearHistory()
    }
    /* eslint-enable */

    if (!this.activeProfile && !this.activePost) {
      this.$router.push('/')
    } else if (this.activePost) {
      this.$router.push('/post')
    }
  },
  computed: {
    ...mapState('user', [
      'activeProfile'
    ]),
    ...mapState('post', [
      'activePost'
    ])
  },
  methods: {
    ...mapGetters('global', [
      'getPluginStyles'
    ]),
    ...mapActions('post', [
      'clearActivePost',
      'clearSharePost',
      'clearNewComment'
    ]),
    ...mapActions('user', [
      'clearActiveProfile'
    ]),
    handleGoBackClick () {
      this.clearActiveProfile()
      this.clearActivePost()
      this.clearSharePost()
      this.clearNewComment()
      this.$router.push('/')
    }
  }
}
</script>

<style>
  .online-badge {
    border-radius: 50%;
    margin-right: 5px;
    top: 110px;
  }
</style>
