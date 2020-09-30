import { Platform } from 'quasar'
import { axiosInstance } from '../../boot/axios'
import { emit } from '../../boot/event-bus'
import Post from '../../models/Post'
import Comment from '../../models/Comment'
import {
  // FETCH_POST_STARTED,
  // FETCH_POST_FINISHED,
  CLEAR_POST_COLLECTION,

  FETCH_POSTS_STARTED,
  FETCH_POSTS_FINISHED,

  POST_COMMENT_STARTED,
  POST_COMMENT_FINISHED,
  CLEAR_NEW_COMMENT,

  FETCH_COMMENTS_STARTED,
  FETCH_COMMENTS_FINISHED,

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

  SAVE_POST_FINISHED,
  SAVE_POST_STARTED,

  REPORT_POST_STARTED,
  REPORT_POST_FINISHED,

  REPORT_COMMENT_STARTED,
  REPORT_COMMENT_FINISHED,

  DELETE_POST_STARTED,
  DELETE_POST_FINISHED,

  DELETE_COMMENT_STARTED,
  DELETE_COMMENT_FINISHED
} from './mutation-types'
import { handleActionBadResponse } from '../../boot/error-handler'

export async function fetchPosts ({ commit }, params) {
  commit(FETCH_POSTS_STARTED)
  let posts

  try {
    posts = await Post
      .where('user', params.user)
      .where('media', params.media)
      .page(params.page || 1)
      .limit(params.limit || 10)
      .get()

    commit(FETCH_POSTS_FINISHED, {
      payload: posts,
      loading: false,
      error: false,
      meta: null
    })
  } catch (reason) {
    const { response } = reason
    commit(FETCH_POSTS_FINISHED, handleActionBadResponse(fetchPosts, reason))
    return response
  }

  return posts
}

export async function reportPost ({ commit }, action) {
  commit(REPORT_POST_STARTED)
  try {
    await axiosInstance.post(`posts/${action.postId}/report/${action.userId}?data=` + window.dataString)

    commit(REPORT_POST_FINISHED, {
      payload: true,
      loading: false,
      error: false,
      meta: null
    })
  } catch (reason) {
    commit(REPORT_POST_FINISHED, handleActionBadResponse(reportPost, reason))
    return false
  }

  return true
}

export async function deletePost ({ commit }, action) {
  commit(DELETE_POST_STARTED)
  try {
    await axiosInstance.post(`posts/${action.postId}/delete?data=` + window.dataString)
    const post = new Post({
      id: action.postId
    })

    commit(DELETE_POST_FINISHED, {
      payload: post,
      loading: false,
      error: false,
      meta: null
    })
  } catch (reason) {
    commit(DELETE_POST_FINISHED, handleActionBadResponse(deletePost, reason))
    return false
  }

  return true
}

export async function reportComment ({ commit }, action) {
  commit(REPORT_COMMENT_STARTED)
  try {
    await axiosInstance.post(`posts/${action.postId}/reportComment/${action.commentId}/${action.userId}?data=` + window.dataString)

    commit(REPORT_COMMENT_FINISHED, {
      payload: true,
      loading: false,
      error: false,
      meta: null
    })
  } catch (reason) {
    commit(REPORT_COMMENT_FINISHED, handleActionBadResponse(reportComment, reason))
    return false
  }

  return true
}

export async function deleteComment ({ commit }, action) {
  commit(DELETE_COMMENT_STARTED)
  try {
    await axiosInstance.post(`posts/${action.postId}/deleteComment/${action.commentId}?data=` + window.dataString)
    const post = new Comment({
      id: action.postId
    })
    const comment = new Comment({
      id: action.commentId
    })

    commit(DELETE_COMMENT_FINISHED, {
      payload: {
        post,
        comment
      },
      loading: false,
      error: false,
      meta: null
    })
  } catch (reason) {
    commit(DELETE_COMMENT_FINISHED, handleActionBadResponse(deleteComment, reason))
    return false
  }

  return true
}

export async function likePost ({ commit }, action) {
  commit(LIKE_POST_STARTED)
  try {
    await axiosInstance.post(`posts/${action.postId}/like/${action.userId}?data=` + window.dataString)

    commit(LIKE_POST_FINISHED, {
      payload: true,
      loading: false,
      error: false,
      meta: null
    })
  } catch (reason) {
    commit(LIKE_POST_FINISHED, handleActionBadResponse(likePost, reason))
    return false
  }

  return true
}

export async function unlikePost ({ commit }, action) {
  commit(UNLIKE_POST_STARTED)
  try {
    await axiosInstance.post(`posts/${action.postId}/unlike/${action.userId}?data=` + window.dataString)

    commit(UNLIKE_POST_FINISHED, {
      payload: true,
      loading: false,
      error: false,
      meta: null
    })
  } catch (reason) {
    commit(UNLIKE_POST_FINISHED, handleActionBadResponse(likePost, reason))
    return false
  }

  return true
}

export async function sharePost ({ commit }, action) {
  commit(SHARE_POST_STARTED)
  try {
    await axiosInstance.post(`posts/${action.postId}/share/${action.userId}?data=` + window.dataString)

    commit(SHARE_POST_FINISHED, {
      payload: true,
      loading: false,
      error: false,
      meta: null
    })
  } catch (reason) {
    commit(SHARE_POST_FINISHED, handleActionBadResponse(sharePost, reason))
    return false
  }

  return true
}

export function setActivePost ({ commit }, post) {
  commit(SET_ACTIVE_POST, post)
}

export function clearActivePost ({ commit }) {
  commit(CLEAR_ACTIVE_POST)
}

export function setSharePost ({ commit }, post) {
  commit(SET_SHARE_POST, post)
}

export function clearSharePost ({ commit }) {
  commit(CLEAR_SHARE_POST)
}

export function clearPostCollection ({ commit }) {
  commit(CLEAR_POST_COLLECTION)
}

export function clearNewComment ({ commit }) {
  commit(CLEAR_NEW_COMMENT)
}

/**
 * Fetch comments for a given post.
 *
 * Needs to be dynamic as the post would already be displayed and immutable
 * but the comments need to be live at some point with sockets.
 *
 * @param commits
 * @param postId
 */
export async function fetchComments ({ commit }, postId) {
  commit(FETCH_COMMENTS_STARTED)
  let comments

  try {
    const post = new Post({
      id: postId
    })
    const comment = new Comment({})
    comments = await Post.custom(post, comment).get()

    commit(FETCH_COMMENTS_FINISHED, {
      payload: comments,
      loading: false,
      error: false,
      meta: null
    })
  } catch (reason) {
    const { response } = reason
    commit(FETCH_COMMENTS_FINISHED, handleActionBadResponse(fetchComments, reason))
    return response
  }

  return comments
}

export async function postComment ({ commit, state, dispatch }, payload) {
  const { post, comment } = payload
  commit(POST_COMMENT_STARTED, {
    payload: {
      post,
      comment
    }
  })
  try {
    const postModel = new Post({
      id: post.id
    })
    const commentModel = new Comment({
      body: comment.body
    }).for(postModel)
    const result = await commentModel.save()

    commit(POST_COMMENT_FINISHED, {
      payload: {
        post,
        comment: result
      },
      loading: true,
      error: false,
      meta: null
    })

    dispatch('fetchComments', post.id)
  } catch (error) {
    commit(POST_COMMENT_FINISHED, {
      payload: error,
      loading: false,
      error: true,
      meta: null
    })
  }
}

export function uploadImage () {
  if (Platform.is.mobile && typeof Mallcomm !== 'undefined') {
    selectImageMobile()
  } else if (Platform.is.desktop) {
    selectImageDesktop()
  }
}

export function selectImageMobile () {
  if (Platform.is.ios) {
    this.Mallcomm.chooseImage(960, 70)
  } else if (Platform.is.andoird) {
    this.Mallcomm.openImage(600, 60)
  }
}

export function selectImageDesktop () {
  alert('Desktop upload not yet implemented.')
}

/**
 * Sends a post object to the API for creation.
 *
 * @param commit
 * @param payload
 */
export async function savePost ({ commit }, postData) {
  commit(SAVE_POST_STARTED, {
    payload: null,
    loading: true,
    error: false,
    meta: null
  })

  try {
    let post = new Post(postData)
    await post.save()
    post.files = []

    commit(SAVE_POST_FINISHED, {
      payload: post,
      loading: false,
      error: false,
      meta: null
    })

    if (post.first_post) {
      emit('TROPHY:WON', {
        title: 'First Post',
        image: '006-podium',
        description: 'Yay! You have just posted for the first time. There are many hidden trophies which you can earn.'
      })
    }
  } catch (error) {
    commit(SAVE_POST_FINISHED, {
      payload: error,
      loading: false,
      error: true,
      meta: null
    })
  }
}
