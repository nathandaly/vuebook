export const initialState = {
  loading: false,
  payload: null,
  error: false,
  meta: null
}

export default {
  settings: {
    ...initialState,
    payload: {
      reactions: []
    }
  },

  centre: {
    loading: false,
    payload: null,
    error: false,
    meta: null
  }
}
