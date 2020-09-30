<template >
  <div>
    <q-dialog full-width v-model="showGroups">
      <q-card>
        <q-card-section>
          <div class="text-h6">{{ $t('whoCanSeeThis') }}</div>
        </q-card-section>

        <q-card-section>
          <div class="q-gutter-no">
            <q-chip v-for="group in post.groups" v-bind:key="group.id" dense outline color="primary" text-color="white">{{ group.name }}</q-chip>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-linear-progress v-if="ajaxLoader" color="primary" indeterminate style="height: 5px; background-color: #fff;" />

    <q-card v-if="post && post.profile" flat square class="flex-card q-mb-sm" v-bind:class="approved">

    <q-toolbar v-if="activePost" class="text-primary">
      <q-btn
        flat
        color="black"
        icon="fas fa-chevron-left"
        size="sm"
        @click="handleGoBackClick"
      />
      <q-item-section avatar>
        <q-avatar>
          <img @click="handleSetActiveProfileClick(post.profile)" :src="post.profile.avatar || 'statics/no-avatar.jpg'">
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label @click="handleSetActiveProfileClick(post.profile)" class="text-primary">{{ $root.fullName(post.profile) }}</q-item-label>
        <q-item-label
          style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; letter-spacing: normal; color: #525252;"
          caption>
          {{ post.role.name }}, {{ post.local.name }}
        </q-item-label>
        <q-item-label
          style="letter-spacing: normal; color: #525252; font-size: 0.68rem;"
          caption>
          {{ $moment.utc(post.modifieddate).fromNow() }}
          <span v-if="!post.approved"> ({{ $t('pendingApproval') }})</span>
        </q-item-label>
      </q-item-section>
      <q-btn :v-ripple="false" color="black" flat dense icon="far fa-ellipsis-v">
        <q-menu
          transition-show="jump-down"
          transition-hide="jump-up"
        >
          <q-list style="min-width: 150px">
<!--            <q-item v-show="post.profile.id !== authenticateUser.payload.id" clickable v-ripple v-close-popup>-->
<!--              <q-item-section>Save post</q-item-section>-->
<!--              <q-item-section avatar>-->
<!--                <q-icon color="red" name="fas fa-heart-square" />-->
<!--              </q-item-section>-->
<!--            </q-item>-->
<!--            <q-item v-show="post.profile.id !== authenticateUser.payload.id" clickable v-ripple v-close-popup>-->
<!--              <q-item-section  @click="handleSetActiveProfileClick(post.profile)">Unfollow {{ $root.fullName(post.profile) }}</q-item-section>-->
<!--              <q-item-section avatar>-->
<!--                <q-icon color="teal" name="fas fa-bookmark" />-->
<!--              </q-item-section>-->
<!--            </q-item>-->
            <q-item @click="handleReportClick()" clickable v-ripple v-close-popup>
              <q-item-section>{{ $t('reportPost') }}</q-item-section>
              <q-item-section avatar>
                <q-icon color="warning" name="fas fa-comment-alt-exclamation" />
              </q-item-section>
            </q-item>
            <div v-show="post.profile.id === authenticateUser.payload.id">
              <q-separator />
              <q-item @click="handleDeleteClick()" clickable v-ripple v-close-popup>
                <q-item-section>{{ $t('deletePost') }}</q-item-section>
                <q-item-section avatar>
                  <q-icon color="negative" name="fas fa-trash-alt" />
                </q-item-section>
              </q-item>
              <q-separator />
              <q-item @click="showGroups = true" clickable>
                <q-item-section>{{ $t('whoCanSeeThis') }}</q-item-section>
                <q-item-section avatar>
                  <q-icon color="info" name="fas fa-eye" />
                </q-item-section>
              </q-item>
            </div>
          </q-list>
        </q-menu>
      </q-btn>
    </q-toolbar>

    <q-item v-if="!activePost">
      <q-item-section avatar>
        <q-avatar>
          <img @click="handleSetActiveProfileClick(post.profile)" :src="post.profile.avatar || 'statics/no-avatar.jpg'">
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label @click="handleSetActiveProfileClick(post.profile)" class="text-primary">{{ $root.fullName(post.profile) }}</q-item-label>
          <q-item-label
            style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; letter-spacing: normal; color: #525252;"
            caption>
            <span v-if="post.role">{{ post.role.name }}, {{ post.local.name }}</span>
            <span v-else>{{ post.profile.roles[0].name }}, {{ post.profile.locals[0].name }}</span>
          </q-item-label>
        <q-item-label
          style="letter-spacing: normal; color: #525252; font-size: 0.68rem;"
          caption>
          {{ $moment.utc(post.modifieddate).fromNow() }}
          <span v-if="!post.approved"> ({{ $t('pendingApproval') }})</span>
        </q-item-label>
      </q-item-section>
      <q-btn :v-ripple="false" color="black" flat dense icon="far fa-ellipsis-h">
        <q-menu
          transition-show="jump-down"
          transition-hide="jump-up"
        >
          <q-list style="min-width: 150px">
<!--            <q-item v-show="post.profile.id !== authenticateUser.payload.id" clickable v-ripple v-close-popup>-->
<!--              <q-item-section>Save post</q-item-section>-->
<!--              <q-item-section avatar>-->
<!--                <q-icon color="red" name="fas fa-heart-square" />-->
<!--              </q-item-section>-->
<!--            </q-item>-->
<!--            <q-item v-show="post.profile.id !== authenticateUser.payload.id" clickable v-ripple v-close-popup>-->
<!--              <q-item-section>Unfollow {{ $root.fullName(post.profile) }}</q-item-section>-->
<!--              <q-item-section avatar>-->
<!--                <q-icon color="teal" name="fas fa-bookmark" />-->
<!--              </q-item-section>-->
<!--            </q-item>-->
            <q-item @click="handleReportClick()" clickable v-ripple v-close-popup>
              <q-item-section>{{ $t('reportPost') }}</q-item-section>
              <q-item-section avatar>
                <q-icon color="warning" name="fas fa-comment-alt-exclamation" />
              </q-item-section>
            </q-item>
            <div v-show="post.profile.id === authenticateUser.payload.id">
              <q-separator />
              <q-item @click="handleDeleteClick()" clickable v-ripple v-close-popup>
                <q-item-section>{{ $t('deletePost') }}</q-item-section>
                <q-item-section avatar>
                  <q-icon color="negative" name="fas fa-trash-alt" />
                </q-item-section>
              </q-item>
              <q-separator />
              <q-item @click="showGroups = true" clickable>
                <q-item-section>{{ $t('whoCanSeeThis') }}</q-item-section>
                <q-item-section avatar>
                  <q-icon color="info" name="fas fa-eye" />
                </q-item-section>
              </q-item>
            </div>
          </q-list>
        </q-menu>
      </q-btn>
    </q-item>

    <q-card-section style="padding: 10px 18px;">
      <p v-html="post.body"></p>
    </q-card-section>

    <div class="row">
      <q-img
        v-for="(image, index) in post.postmedia"
        :key="index"
        :src="image.url"
        :style="image.style"
      >
      </q-img>
    </div>

    <q-card-section v-if="post.share_post_id > 0" style="padding: 10px 18px;">
      <q-card style="padding: 20px;">
        <q-item-section>
          <q-item-label @click="handleSetActiveProfileClick(post.share_post.profile)" class="text-primary">{{ $root.fullName(post.share_post.profile) }}</q-item-label>
            <q-item-label
              style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; letter-spacing: normal; color: #525252;"
              caption>
              <span v-if="post.share_post.role">{{ post.share_post.role.name }}, {{ post.share_post.local.name }}</span>
              <span v-else>{{ post.share_post.profile.roles[0].name }}, {{ post.share_post.profile.locals[0].name }}</span>
            </q-item-label>
          <q-item-label
            style="letter-spacing: normal; color: #525252; font-size: 0.68rem;"
            caption>
            {{ $moment.utc(post.share_post.modifieddate).fromNow() }}
            <span v-if="!post.share_post.approved"> ({{ $t('pendingApproval') }})</span>
          </q-item-label>
        </q-item-section>
        <div v-html="post.share_post.body" style="margin-top: 10px;"></div>

        <div class="row" style="padding-top: 10px;">
          <q-img
            v-for="(image, index) in post.share_post.postmedia"
            :key="index"
            :src="image.url"
            :style="image.style"
          >
          </q-img>
        </div>

      </q-card>
    </q-card-section>

    <q-card-section v-if="post.share_post_id == -1" style="padding: 10px 18px;">
      <q-card style="padding: 20px;">
        <div style="margin-top: 10px;">
          <p>Content currently not available.</p>
        </div>
      </q-card>
    </q-card-section>
    <q-separator></q-separator>
    <q-card-actions key=1 :class="`card-${post.id}-action`" class="card-post-actions" align="around">
      <q-btn
        key="emoji-btn"
        flat
        round
        color="red"
        :icon="liked ? 'fas fa-heart' : 'fal fa-heart'"
        @click="handleLikeClick"
      />
      <q-btn
        key="comment-btn"
        flat
        round
        color="teal"
        :icon="post.comment_count > 0 ? 'fas fa-comment-alt-lines' : 'fal fa-comment-alt-lines'"
        @click="handlePostPageRouteClick(post)"
      />
      <q-btn
        key="share-btn"
        flat
        round
        color=primary
        :icon="shared ? 'fas fa-share' : 'fal fa-share'"
        @click="handleShareClick(post)"
        v-if="!this.currentPath.includes('user/profile')"
      />
    </q-card-actions>
      <q-card-actions align="around" @click="handlePostPageRouteClick(post)">
        <div>{{ favoriteCount }}</div>
        <div>{{ commentCount }}</div>
        <div v-if="!this.currentPath.includes('user/profile')">{{ shareCount }}</div>
      </q-card-actions>

    <q-card-section class="comment-input__wrapper" v-if="activePost && this.currentPath.includes('post')">
      <q-item style="padding: 0;">
        <q-item-section class="q-pt-sm q-pb-sm comment-avatar" avatar>
          <q-avatar>
            <img @click="handleSetActiveProfileClick(authenticateUser.payload)" :src="authenticateUser.payload.avatar || 'statics/no-avatar.jpg'">
          </q-avatar>
        </q-item-section>

        <div class="flex comment-form q-pt-sm q-pb-sm ">
          <q-item-section class="comment-input">
            <q-input
              v-model="commentText"
              dense
              outlined
              :placeholder="$t('commentDotDotDot')"
              :type="commentInputType"
              ref="commentInput"
            />
          </q-item-section>
          <q-item-section class="comment-button">
            <q-btn
              :disable="!commentText.length"
              :loading="newComment.loading"
              @click="handlePostCommentClick(post)"
              outlined color="accent"
              style="top: 2px;"
              :label="$t('post')">
              <template v-slot:loading>
                <q-spinner color="white" size="1em" />
              </template>
            </q-btn>
          </q-item-section>
        </div>
      </q-item>
    </q-card-section>

    <q-separator></q-separator>
    <q-card-section v-if="activePost && this.currentPath.includes('post')">
      <post-comments :comments="post.comments"></post-comments>
    </q-card-section>
    <q-inner-loading :showing="ajaxLoader">
      <q-spinner size="0px" color="primary" />
    </q-inner-loading>
  </q-card>
  <q-dialog v-model="postReported">
    <q-card>
      <q-card-section>
        <div class="text-h6">{{ $t('reported') }}</div>
      </q-card-section>

      <q-card-section>
        <p>{{ $t('reportSent') }}</p>

        <p>{{ $t('reportThank') }}</p>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat :label="$t('ok')" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import PostComments from './PostComments'
import Comment from '../models/Comment'

export default {
  name: 'Post',
  components: {
    PostComments
  },
  props: {
    post: Object,
    sharedPost: Object,
    ajaxLoader: Boolean
  },
  created () {
    this.currentPath = this.$route.path.slice(1, this.$route.length)

    if (this.activePost && !this.currentPath.includes('post')) {
      this.clearActivePost()
      this.clearSharePost()
    }

    if (this.activePost && this.currentPath.includes('post')) {
      this.clearSharePost()
    }

    if (!(this.post || this.activePost)) {
      this.$router.push('/')
    }
  },
  data () {
    return {
      showEmojis: false,
      openEmojiFab: false,
      fabShowing: false,
      loading: false,
      commentText: '',
      commentInputType: 'input',
      showGroups: false,
      liked: false,
      shared: false,
      postReported: false,
      favoriteCount: 0,
      commentCount: 0,
      shareCount: 0,
      currentPath: null
    }
  },
  mounted () {
    this.liked = this.post.liked
    this.shared = this.post.shared
    this.favoriteCount = this.post.favorite_count
    this.commentCount = this.post.comment_count
    this.shareCount = this.post.share_count
  },
  computed: {
    ...mapState('user', [
      'authenticateUser',
      'activeProfile'
    ]),

    ...mapState('post', [
      'activePost',
      'newComment'
    ]),

    ...mapState('global', {
      settings: 'settings',
      centre: 'centre'
    }),
    approved: function () {
      return this.post.approved ? 'approved' : 'unapproved'
    }
  },
  methods: {
    ...mapActions('post', [
      'reportPost',
      'deletePost',
      'likePost',
      'unlikePost',
      'setActivePost',
      'clearActivePost',
      'setSharePost',
      'clearSharePost',
      'clearNewComment',
      'postComment'
    ]),

    ...mapActions('user', [
      'setActiveProfile',
      'fetchAvatar'
    ]),

    postOwner () {
      // console.info('Post owner: ', this.post.profile.id === this.authenticateUser.payload.id)
      return this.post.profile.id === this.authenticateUser.payload.id
    },

    extractSrcFromImage (shortName) {
      const image = this.$joypixels.shortnameToImage(shortName)
      const regex = /src\s*=\s*"(.+?)"/

      return regex.exec(image)[1]
    },

    handleSetActiveProfileClick (profile) {
      if (this.$router.currentRoute.path !== '/user/profile') {
        this.clearActivePost()
        this.clearSharePost()
        this.clearNewComment()
        this.setActiveProfile(profile)
        this.$router.push('/user/profile')
      }
    },

    handlePostCommentClick (post) {
      let comment = new Comment({
        body: this.commentText,
        profile: this.authenticateUser.payload
      })
      this.postComment({ post, comment })
      ++this.commentCount
      this.commentText = ''
    },

    handleGoBackClick () {
      this.clearActivePost()
      this.clearSharePost()
      this.clearNewComment()
      this.$root.$off('SAVE_POST')
      if (!this.activeProfile) {
        this.$router.push('/')
      } else {
        this.$router.push('/user/profile')
      }
    },

    handlePostPageRouteClick (post) {
      this.setActivePost(post)
      this.$router.push('/post')
    },

    handleReportClick () {
      this.postReported = !this.postReported
      this.reportPost({
        userId: this.authenticateUser.payload.id,
        postId: this.post.id
      })
    },

    handleDeleteClick () {
      this.deletePost({
        postId: this.post.id
      })
    },

    handleLikeClick () {
      if (!this.liked) {
        this.liked = true
        ++this.favoriteCount
        this.likePost({
          userId: this.authenticateUser.payload.id,
          postId: this.post.id
        })
      } else {
        this.liked = false
        --this.favoriteCount
        this.unlikePost({
          userId: this.authenticateUser.payload.id,
          postId: this.post.id
        })
      }
    },

    handleShareClick (post) {
      if (post.share_post_id) {
        this.setSharePost(post.share_post)
      } else {
        this.setSharePost(post)
      }
      this.$root.$emit('OPEN_DIALOG:CREATE_POST')
    }
  }
}
</script>

<style scoped>
  .q-card.flex-card {
    width: 100%;
  }

  main {
    background: #fff;
  }

  .comment-form {
    width: 100%;
    flex-flow: column;
  }

  .comment-avatar {
    flex: 1;
    display: flex;
    justify-content: flex-start;
  }

  .comment-input__wrapper .q-item__section--avatar {
    min-width: 48px;
  }

  .comment-input {
    flex: 3;
    display: flex;
    justify-content: flex-start;
  }

  .q-fab__actions {
    box-shadow: 0 1px 5px rgba(0,0,0,0.2), 0 2px 2px rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12);
    border-radius: 50px;
  }

  .q-fab__actions .q-btn {
    margin: 0;
  }

  .comment-button {
    flex: 1;
    display: flex;
    justify-content: flex-start;
    margin-left: 0;
  }

  .q-card__actions {
    padding: 0;
  }

  .q-card__actions .q-btn {
    padding: 0;
  }

  .card-post-actions {
    padding: 0 3px;
  }
  .unapproved {
    background: #eee;
  }
</style>
