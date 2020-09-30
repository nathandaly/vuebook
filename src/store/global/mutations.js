import {
  FETCH_CENTRE_STARTED,
  FETCH_CENTRE_FINISHED,
  FETCH_SETTINGS_STARTED,
  FETCH_SETTINGS_FINISHED
} from './mutation-types'

export default {
  [FETCH_SETTINGS_STARTED] (state) {
    state.settings = {
      ...state.settings,
      loading: true
    }
  },
  [FETCH_SETTINGS_FINISHED] (state, action) {
    state.settings = {
      ...state.settings,
      ...action
    }
  },
  [FETCH_CENTRE_STARTED] (state) {
    state.centre = {
      ...state.centre,
      loading: true
    }
  },
  [FETCH_CENTRE_FINISHED] (state, action) {
    state.centre = {
      ...state.centre,
      ...action
    }
  }
}
