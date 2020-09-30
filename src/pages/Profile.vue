<template>
    <q-page :style-fn="pageTweak">
      <q-tabs
        v-model="tab"
        dense
        active-color="primary"
        align="justify"
        indicator-color="white"
        narrow-indicator
      >
        <q-tab name="about" class="text-capitalize" label="About" />
        <q-tab name="posts" class="text-capitalize" label="Posts" @click="clearPosts" />
        <q-tab name="photos" class="text-capitalize" label="Photos" @click="clearPhotos" />
        <!--<q-tab name="trophies" class="text-capitalize" label="Trophies" />-->
      </q-tabs>

      <q-separator></q-separator>

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel class="q-pa-none" name="about">
          <q-card flat>
            <q-card-section>
              <q-list class="text-subtitle1">
                <q-item-label v-for="local in activeProfile.locals" :key="local.id" class="text-grey-10">
                  <q-icon color="grey-8" name="fas fa-briefcase" /> {{ local.role.name }}, <span class="text-weight-bold">{{ local.name }}</span>
                </q-item-label>
                <q-item-label v-if="activeProfile.email" class="text-grey-10">
                  <q-icon color="grey-8" name="fas fa-envelope" /> {{ activeProfile.email }}
                </q-item-label>
                <q-item-label v-if="activeProfile.phone" class="text-grey-10">
                  <q-icon color="grey-8" name="fas fa-phone-alt" />  {{ activeProfile.phone }}
                </q-item-label>
              </q-list>
            </q-card-section>
          </q-card>
        </q-tab-panel>
        <q-tab-panel class="q-pa-none" name="posts">
          <q-banner v-show="postsCollection.length === 0 && !posts.loading" class="text-center text-pink-14 bg-white">
            There are no posts.
          </q-banner>
          <q-infinite-scroll @load="onLoadPosts" :offset="500" ref="infiniteScroll">
            <Post v-for="post in filterPostsByGroup" v-bind:key="post.id" :post="post"></Post>
            <template v-slot:loading>
              <div class="row justify-center">
                <q-spinner-dots color="primary" size="40px" />
              </div>
            </template>
          </q-infinite-scroll>
        </q-tab-panel>
        <q-tab-panel class="q-pa-none" name="photos">
          <q-banner v-show="postsCollection.length === 0 && !posts.loading" class="text-center text-pink-14 bg-white">
            There are no photos.
          </q-banner>
          <q-infinite-scroll @load="onLoadPhotos" :offset="500" ref="infiniteScroll">
            <Post v-for="post in filterPostsByGroup" v-bind:key="post.id" :post="post"></Post>
            <template v-slot:loading>
              <div class="row justify-center">
                <q-spinner-dots color="primary" size="40px" />
              </div>
            </template>
          </q-infinite-scroll>
        </q-tab-panel>
        <q-tab-panel name="trophies">
          <h2>Trophies</h2>
        </q-tab-panel>
      </q-tab-panels>
    </q-page>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Post from '../components/Post'

export default {
  components: {
    Post
  },

  name: 'profile',

  data () {
    return {
      tab: 'about',
      postData: []
    }
  },

  computed: {
    ...mapState('user', [
      'activeProfile'
    ]),

    ...mapState('post', [
      'postsCollection',
      'posts'
    ]),

    filterPostsByGroup () {
      return this.postsCollection.filter(post => {
        return 2
      })
    }
  },

  methods: {
    pageTweak (offset) {
      // "offset" is a Number (pixels) that refers to the total
      // height of header + footer that occupies on screen,
      // based on the QLayout "view" prop configuration

      // this is actually what the default style-fn does in Quasar
      return { minHeight: 'initial' }
    },

    ...mapActions('post', [
      'clearPostCollection',
      'clearActivePost'
    ]),

    clearPosts () {
      if (this.tab !== 'posts') {
        this.tab = 'posts'
        this.clearPostCollection()
      }
    },

    clearPhotos () {
      if (this.tab !== 'photos') {
        this.tab = 'photos'
        this.clearPostCollection()
      }
    },

    async onLoadPosts (index, done) {
      // console.info('LOAD_POST_START', index)
      /* eslint-disable */
      if (typeof Mallcomm === 'object' && typeof Mallcomm.clearHistory === 'function') {
        Mallcomm.clearHistory()
      }
      /* eslint-enable */
      const params = {
        page: index,
        limit: 10,
        user: this.activeProfile.id,
        media: null
      }
      await this.$store.dispatch('post/fetchPosts', params)
        .then(response => {
          this.actionErrorHandler(response)
          if (response.current_page === response.last_page && this.$refs.infiniteScroll) {
            this.$refs.infiniteScroll.stop()
          }
          done()
          // console.info('LOAD_POST_FINISHED', response)
        })
    },

    async onLoadPhotos (index, done) {
      // console.info('LOAD_POST_START', index)
      /* eslint-disable */
      if (typeof Mallcomm === 'object' && typeof Mallcomm.clearHistory === 'function') {
        Mallcomm.clearHistory()
      }
      /* eslint-enable */
      const params = {
        page: index,
        limit: 10,
        user: this.activeProfile.id,
        media: 1
      }
      await this.$store.dispatch('post/fetchPosts', params)
        .then(response => {
          this.actionErrorHandler(response)
          if (response.current_page === response.last_page && this.$refs.infiniteScroll) {
            this.$refs.infiniteScroll.stop()
          }
          done()
          // console.info('LOAD_POST_FINISHED', response)
        })
    }
  }

}
</script>

<style>
  .q-img {
    flex: 1 1 33.33%;
    margin: 0;
  }

  .q-img__image {
    margin: 2px;
  }
</style>
