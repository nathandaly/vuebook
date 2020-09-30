import Model from './Model'
import Profile from './Profile'

export default class Comment extends Model {
  get mutations () {
    return {
      profile: Profile
    }
  }

  /**
   * @returns {string}
   */
  resource () {
    return 'comments'
  }
}
