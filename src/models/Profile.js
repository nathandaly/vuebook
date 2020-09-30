import Model from './Model'
import Post from './Post'

export default class Profile extends Model {
  /**
   * @returns {string}
   */
  resource () {
    return 'profile'
  }

  posts () {
    return this.hasMany(Post)
  }

  /**
   *
   * @returns {*}
   */
  get local () {
    return this.locals[0]
  }

  /**
   *
   * @returns {*}
   */
  get role () {
    return this.roles[0]
  }

  get fullname () {
    return `${this.firstname} ${this.lastname}`
  }
}
