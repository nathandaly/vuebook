import { axiosInstance } from '../../boot/axios'
import { numericHash } from '../../boot/data-string'
import {
  SET_ACTIVE_PROFILE,
  CLEAR_ACTIVE_PROFILE,
  AUTHENTICATE_USER_STARTED,
  AUTHENTICATE_USER_FINISHED,
  AUTHENTICATE_USER_CLEAR
} from './mutation-types'
import AuthenticatedUser from '../../models/AuthenticatedUser'
import { handleActionBadResponse } from '../../boot/error-handler'

export async function authenticateUser ({ commit }) {
  commit(AUTHENTICATE_USER_STARTED)
  let authenticatedUser

  try {
    authenticatedUser = await AuthenticatedUser.first()
    commit(AUTHENTICATE_USER_FINISHED, {
      payload: authenticatedUser,
      loading: false,
      error: false,
      meta: null
    })
  } catch (reason) {
    commit(
      AUTHENTICATE_USER_FINISHED,
      handleActionBadResponse(
        authenticateUser,
        reason,
        'Error trying to authenticate.'
      )
    )
    return false
  }

  return authenticatedUser
}

export async function fetchAvatar ({ commit, state }, payload) {
  let avatarUrl = 'statics/no-avatar.jpg'
  const { ownerId, profileId } = payload
  const hashKey = numericHash(`${ownerId}_${profileId}`)

  try {
    // Fetch avatar from cache (local storage) if it exists.
    if (state.avatars[hashKey]) {
      return state.avatars[hashKey]
    }

    // Avatar not found in cache.
    avatarUrl = await axiosInstance.get(`/profile/avatar/${ownerId}/${profileId}?data=` + window.dataString)

    if (avatarUrl.status === 200) {
      avatarUrl = avatarUrl.data
      // commit('CACHE_AVATAR_URL', {
      //   key: hashKey,
      //   url: avatarUrl
      // })
    }
  } catch (error) {}

  return avatarUrl
}

export function clearAuthenticatedUser ({ commit }) {
  commit(AUTHENTICATE_USER_CLEAR)
}

export function setActiveProfile ({ commit }, profile) {
  commit(SET_ACTIVE_PROFILE, profile)
}

export function clearActiveProfile ({ commit }) {
  commit(CLEAR_ACTIVE_PROFILE)
}

export function getAvatarImage (CentreAndProfile) {
}
