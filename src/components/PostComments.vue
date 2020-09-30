<template>
  <div>
    <div v-if="activePost && comments.payload && comments.payload.length" class="post-comments">
      <div v-for="comment in comments.payload" :key="comment.id">
        <q-chat-message
          :name="$root.fullName(comment.profile)"
          :text="[comment.body]"
          :stamp="$moment.utc(comment.modifieddate).fromNow()"
          bg-color="grey-4"
          style="max-width: 90%; float: left;"
        >
          <q-avatar class="q-mr-sm" slot="avatar" @click="handleSetActiveProfileClick(comment.profile)">
            <img :src="comment.profile.avatar || 'statics/no-avatar.jpg'">
          </q-avatar>
        </q-chat-message>

        <q-btn :v-ripple="false" color="grey" flat dense icon="far fa-ellipsis-v" style="float: right; margin-top: 20px;">
          <q-menu
            transition-show="jump-down"
            transition-hide="jump-up"
          >
            <q-list style="min-width: 150px">
              <q-item @click="handleReportCommentClick(comment.id)" clickable v-ripple v-close-popup>
                <q-item-section>{{ $t('reportComment') }}</q-item-section>
                <q-item-section avatar>
                  <q-icon color="warning" name="fas fa-comment-alt-exclamation" />
                </q-item-section>
              </q-item>
              <div v-show="comment.profile.id === authenticateUser.payload.id">
                <q-separator />
                <q-item @click="handleDeleteCommentClick(comment.id)" clickable v-ripple v-close-popup>
                  <q-item-section>{{ $t('deleteComment') }}</q-item-section>
                  <q-item-section avatar>
                    <q-icon color="negative" name="fas fa-trash-alt" />
                  </q-item-section>
                </q-item>
              </div>
            </q-list>
          </q-menu>
        </q-btn>
        <div style="clear: both;"></div>
      </div>

    </div>
    <div class="row new-comment" style="width: 100%; max-width: 400px">
      <q-chat-message
        v-if="newComment.loading"
        :name="$root.fullName(newComment.payload.comment.profile)"
        :avatar="newComment.payload.comment.profile.avatar"
        bg-color="grey-4"
      >
        <q-avatar class="q-mr-sm" slot="avatar" @click="handleSetActiveProfileClick(newComment.payload.comment.profile)">
          <img :src="newComment.payload.comment.profile.avatar || 'statics/no-avatar.jpg'">
        </q-avatar>
        <p>{{ newComment.payload.comment.body }}</p>
        <div class="new-comment__loading--wrapper">
          <q-inner-loading class="new-comment--loading" :showing="true">
            <div class="loading-message">
              <span>posting</span>
              <q-spinner-dots />
            </div>
          </q-inner-loading>
        </div>
      </q-chat-message>
    </div>
    <q-dialog v-model="commentReported">
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
import { mapState, mapActions } from 'vuex'
export default {
  name: 'PostComments',
  async created () {
    /* eslint-disable */
    if (typeof Mallcomm === 'object' && typeof Mallcomm.clearHistory === 'function') {
      Mallcomm.clearHistory()
    }
    /* eslint-enable */
    await this.fetchComments(this.activePost.id)
  },
  data () {
    return {
      commentReported: false
    }
  },
  computed: {
    ...mapState('global', [
      'centre'
    ]),
    ...mapState('user', [
      'authenticateUser'
    ]),
    ...mapState('post', [
      'comments',
      'activePost',
      'newComment'
    ])
  },
  methods: {
    ...mapActions('post', [
      'fetchComments',
      'reportComment',
      'deleteComment',
      'clearActivePost',
      'clearSharePost',
      'clearNewComment'
    ]),
    ...mapActions('user', [
      'setActiveProfile',
      'fetchAvatar'
    ]),

    handleSetActiveProfileClick (profile) {
      this.clearActivePost()
      this.clearSharePost()
      this.clearNewComment()
      this.setActiveProfile(profile)
      this.$router.push('/user/profile')
    },

    handleReportCommentClick (commentId) {
      this.commentReported = !this.commentReported
      this.reportComment({
        userId: this.authenticateUser.payload.id,
        postId: this.activePost.id,
        commentId: commentId
      })
    },

    handleDeleteCommentClick (commentId) {
      this.deleteComment({
        postId: this.activePost.id,
        commentId: commentId
      })
    }
  }
}
</script>

<style>
.post-comments .q-message-text:last-child:before {
  content: none;
}

.new-comment--loading .loading-message {
  padding: 0 0 10px 10px;
  position: absolute;
  bottom: 0;
  left: 0;
}

.new-comment--loading .loading-message span {
  font-weight: lighter;
  font-size: 12px;
  padding: 0 5px 0 0;
}

.new-comment--loading .loading-message svg {
  padding: 0 5px 0 0;
}

.q-message-received .q-message-text:last-child:before {
  right: 0;
}
</style>
