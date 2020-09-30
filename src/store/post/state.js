export const initialState = {
  loading: false,
  payload: null,
  error: false,
  meta: null
}

export default {
  newPost: initialState,
  posts: initialState,
  postsCollection: [],
  activePost: null,
  newComment: initialState,
  comments: initialState,
  report: {
    ...initialState,
    payload: false
  },
  reportComment: {
    ...initialState,
    payload: false
  },
  like: {
    ...initialState,
    payload: false
  },
  unlike: {
    ...initialState,
    payload: false
  },
  share: {
    ...initialState,
    payload: false
  }
}
