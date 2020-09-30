import Vue from 'vue'
import {
  FETCH_POSTS_STARTED,
  FETCH_POSTS_FINISHED,
  CLEAR_POST_COLLECTION,

  FETCH_COMMENTS_STARTED,

  POST_COMMENT_STARTED,
  FETCH_COMMENTS_FINISHED,
  POST_COMMENT_FINISHED,
  CLEAR_NEW_COMMENT,

  LIKE_POST_STARTED,
  LIKE_POST_FINISHED,
  UNLIKE_POST_STARTED,
  UNLIKE_POST_FINISHED,

  SHARE_POST_STARTED,
  SHARE_POST_FINISHED,

  SET_ACTIVE_POST,
  CLEAR_ACTIVE_POST,

  SET_SHARE_POST,
  CLEAR_SHARE_POST,

  SAVE_POST_STARTED,
  SAVE_POST_FINISHED,

  REPORT_POST_STARTED,
  REPORT_POST_FINISHED,

  REPORT_COMMENT_STARTED,
  REPORT_COMMENT_FINISHED,

  DELETE_POST_STARTED,
  DELETE_POST_FINISHED,

  DELETE_COMMENT_STARTED,
  DELETE_COMMENT_FINISHED
} from './mutation-types'
import { initialState } from './state'

export default {
  [FETCH_POSTS_STARTED] (state) {
    Vue.set(state, 'posts', {
      ...initialState,
      loading: true
    })
  },
  [FETCH_POSTS_FINISHED] (state, postData) {
    state.postsCollection = [
      ...state.postsCollection,
      ...postData.payload.data || []
    ]
    state.posts = {
      ...state.posts,
      ...postData,
      ...{
        payload: {
          ...postData.payload,
          data: state.postsCollection
        }
      },
      loading: false
    }
  },

  [SET_ACTIVE_POST] (state, post) {
    state.activePost = post
  },
  [CLEAR_ACTIVE_POST] (state) {
    state.activePost = null
  },

  [SET_SHARE_POST] (state, post) {
    state.sharePost = post
  },
  [CLEAR_SHARE_POST] (state) {
    state.sharePost = null
  },

  [FETCH_COMMENTS_STARTED] (state, action) {
    Vue.set(state, 'comments', {
      ...initialState,
      loading: true
    })
  },
  [FETCH_COMMENTS_FINISHED] (state, action) {
    Vue.set(state, 'comments', {
      ...initialState,
      payload: action.payload,
      loading: false
    })
  },
  [POST_COMMENT_STARTED] (state, action) {
    Vue.set(state, 'newComment', {
      ...initialState,
      payload: action.payload,
      loading: true
    })
  },
  [POST_COMMENT_FINISHED] (state, action) {
    const { post, comment } = action.payload
    post.comments.unshift(comment)
    state.activePost = post
    const { payload } = state.posts
    const foundIndex = payload.data.findIndex(item => item.id === post.id)
    payload[foundIndex] = post
    state.posts.payload = payload
    state.newComment = initialState
  },
  [CLEAR_NEW_COMMENT] (state, action) {
    state.newComment = initialState
  },

  [REPORT_POST_STARTED] (state) {
    state.report = {
      ...state.report,
      loading: true
    }
  },
  [REPORT_POST_FINISHED] (state, action) {
    state.report = {
      ...initialState,
      payload: action.payload,
      loading: false
    }
  },

  [REPORT_COMMENT_STARTED] (state) {
    state.reportComment = {
      ...state.reportComment,
      loading: true
    }
  },
  [REPORT_COMMENT_FINISHED] (state, action) {
    state.reportComment = {
      ...initialState,
      payload: action.payload,
      loading: false
    }
  },

  [LIKE_POST_STARTED] (state) {
    state.like = {
      ...state.like,
      loading: true
    }
  },
  [LIKE_POST_FINISHED] (state, action) {
    state.like = {
      ...initialState,
      loading: false
    }
  },

  [UNLIKE_POST_STARTED] (state) {
    state.unlike = {
      ...state.unlike,
      loading: true
    }
  },
  [UNLIKE_POST_FINISHED] (state, action) {
    state.unlike = {
      ...initialState,
      loading: false
    }
  },

  [SHARE_POST_STARTED] (state) {
    state.share = {
      ...state.share,
      loading: true
    }
  },
  [SHARE_POST_FINISHED] (state, action) {
    state.share = {
      ...initialState,
      payload: action.payload,
      loading: false
    }
  },

  [DELETE_POST_STARTED] (state) {
    state.delete = {
      ...state.delete,
      loading: true
    }
  },
  [DELETE_POST_FINISHED] (state, action) {
    state.delete = {
      ...initialState,
      payload: action.payload,
      loading: false
    }
    const postData = state.posts.payload.data || []
    var postDataIndex = postData.map(function (post) { return post.id }).indexOf(action.payload.id)
    postData.splice(postDataIndex, 1)
  },

  [DELETE_COMMENT_STARTED] (state) {
    state.deleteComment = {
      ...state.deleteComment,
      loading: true
    }
  },
  [DELETE_COMMENT_FINISHED] (state, action) {
    state.deleteComment = {
      ...initialState,
      payload: action.payload,
      loading: false
    }
    const commentData = state.comments.payload
    var commentDataIndex = commentData.map(function (comment) { return comment.id }).indexOf(action.payload.comment.id)
    commentData.splice(commentDataIndex, 1)
  },

  [SAVE_POST_STARTED] (state, action) {
    state.newPost = {
      ...initialState,
      loading: true,
      payload: action.payload
    }
  },
  [SAVE_POST_FINISHED] (state, post) {
    state.newPost = {
      ...initialState
    }
    const postData = state.posts.payload.data || []
    if (state.sharePost) {
      post.payload['share_post_id'] = state.sharePost.id
      post.payload['share_post'] = state.sharePost
    }
    postData.unshift(post.payload)
  },
  [CLEAR_POST_COLLECTION] (state) {
    state.postsCollection = []
    state.posts.payload = null
  }
}
