import AuthenticatedUser from '../../models/AuthenticatedUser'

export const initialState = {
  loading: false,
  payload: null,
  error: false,
  meta: null
}

export default {
  authenticateUser: {
    ...initialState,
    payload: AuthenticatedUser
  },
  activeProfile: null,
  avatars: {}
}
