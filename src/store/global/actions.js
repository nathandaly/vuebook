import {
  FETCH_CENTRE_STARTED,
  FETCH_CENTRE_FINISHED,
  FETCH_SETTINGS_STARTED,
  FETCH_SETTINGS_FINISHED
} from './mutation-types'
import { handleActionBadResponse } from '../../boot/error-handler'
import Centre from '../../models/Centre'
import Settings from '../../models/Settings'

export async function settings ({ commit }) {
  commit(FETCH_SETTINGS_STARTED)
  let settings

  try {
    settings = await Settings.first()
    commit(FETCH_SETTINGS_FINISHED, {
      payload: settings,
      loading: false,
      error: false,
      meta: null
    })
  } catch (reason) {
    commit(FETCH_CENTRE_FINISHED, handleActionBadResponse(settings, reason))
    return false
  }

  return settings
}

export async function fetchCentreDetails ({ commit }) {
  commit(FETCH_CENTRE_STARTED)
  let centre

  try {
    centre = await Centre.first()
    commit(FETCH_CENTRE_FINISHED, {
      payload: centre,
      loading: false,
      error: false,
      meta: null
    })
  } catch (reason) {
    commit(FETCH_CENTRE_FINISHED, handleActionBadResponse(fetchCentreDetails, reason))
  }

  return centre
}
