import {
  CLEAR_ACTIVE_PROFILE,
  SET_ACTIVE_PROFILE,
  AUTHENTICATE_USER_STARTED,
  AUTHENTICATE_USER_FINISHED,
  CACHE_AVATAR_URL
} from './mutation-types'
import { initialState } from './state'

export default {
  [AUTHENTICATE_USER_STARTED] (state) {
    state.authenticateUser = {
      ...initialState,
      loading: true
    }
  },
  [AUTHENTICATE_USER_FINISHED] (state, user) {
    state.authenticateUser = {
      ...state.authenticateUser,
      ...user
    }
  },
  [SET_ACTIVE_PROFILE] (state, profile) {
    state.activeProfile = profile
  },
  [CLEAR_ACTIVE_PROFILE] (state) {
    state.activeProfile = null
  },
  [CACHE_AVATAR_URL] (state, { key, url }) {
    const assigned = Object.assign({}, state.avatars)
    assigned[key] = url

    state.avatars = {
      ...state.avatars,
      ...assigned
    }
  }
}
