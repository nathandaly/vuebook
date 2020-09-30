import Profile from './Profile'

export default class AuthenticatedUser extends Profile {
  /**
   * @returns {*|null}
   */
  get local () {
    return this.locals[0] || null
  }

  /**
   * @returns {*|null}
   */
  get role () {
    return this.roles[0] || null
  }

  /**
   * @returns {string}
   */
  resource () {
    return 'login'
  }
}
