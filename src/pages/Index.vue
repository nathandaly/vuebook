<template>
  <q-page ref="timeline" class="bg-grey-6 q-pt-xs">
    <div class="q-mb-sm">
      <q-banner v-show="postsCollection.length === 0 && !posts.loading && !newPost.loading" class="text-center text-pink-14 bg-white">
        {{ $t('noPostsYetBeTheFirst') }}
      </q-banner>
      <q-linear-progress v-if="newPost.loading" color="primary" indeterminate style="height: 5px; background-color: #fff;" />
      <q-infinite-scroll @load="onLoadMain" :offset="500" ref="infiniteScroll">
        <Post v-for="post in filterPostsByGroup" v-bind:key="post.id" :post="post"></Post>
        <template v-slot:loading>
          <div class="row justify-center">
            <q-spinner-dots color="primary" size="40px" />
          </div>
        </template>

      </q-infinite-scroll>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Post from '../components/Post'

export default {
  components: {
    Post
  },
  data () {
    return {
      left: true,
      right: true,
      showEmojis: false,
      showCreatePostDialog: false,
      postData: [],
      noPostHover: false,
      clientHeight: 500
    }
  },

  async beforeMount () {
    this.clearPostCollection()
  },

  mounted () {
    this.$nextTick(() => {
      this.clientHeight = this.$el.clientHeight
    })
  },

  computed: {
    ...mapState('user', [
      'authenticateUser'
    ]),

    ...mapState('post', [
      'postsCollection',
      'posts',
      'newPost'
    ]),

    filterPostsByGroup () {
      return this.postsCollection.filter(post => {
        return 2
      })
    }
  },

  methods: {
    ...mapActions('post', [
      'clearPostCollection',
      'clearActivePost'
    ]),

    async onLoadMain (index, done) {
      if (this.authenticateUser.payload === null) {
        return false
      }
      // console.info('LOAD_POST_START', index)
      /* eslint-disable */
      if (typeof Mallcomm === 'object' && typeof Mallcomm.clearHistory === 'function') {
        Mallcomm.clearHistory()
      }
      /* eslint-enable */
      const params = {
        page: index,
        limit: 10,
        user: null,
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

    beforeDestroy () {
      this.$q.loading.hide()
    }
  }
}
</script>
<style>
  .q-btn--fab {
    height: auto;
    width: auto;
  }

  .q-header {
    padding: 0;
  }

  .action-wrapper {
    display: flex;
    flex-flow: row;
    width: 100%;
  }

  .action-wrapper button {
    margin: 1px;
  }

  .btn-icon-left {
    float: left;
  }

  .flex-btn {
    flex: 0 0 15%;
  }

  .flex-wide {
    flex: auto;
  }

  button.q-btn.write-post div.q-btn__content {
    text-transform: initial;
    justify-content: left;
  }

  .q-pa-sm {
    padding: 4px 6px;
  }

  .timeline-header {
    border-bottom: 1px solid #bdbdbd;
  }

  /*POST CARD*/
  .q-card__section {
    display: flex;
    flex-flow: column;
    height: calc(100% - 50px) !important;
  }
  .create-post {
    display: flex;
    flex-flow: column;
    justify-content: space-between;
  }

  .create-post__area {
    flex: auto;
    display: flex;
    flex-flow: column;
  }
  .post-input-wrapper {
    background-color: #fff;
  }

  .post-input-wrapper.q-field--filled .q-field__control:before {
    background-color: #fff;
  }

  .post-input-wrapper.q-field--focused.q-field--filled .q-field__control:before {
    background-color: #fff;
  }

  .post-input {
    background-color: #fff;
  }
</style>
