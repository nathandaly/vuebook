import Model from './Model'
import Profile from './Profile'
import Comment from './Comment'

export default class Post extends Model {
  get mutations () {
    return {
      profile: Profile,
      comments: Comment
    }
  }

  comments () {
    this.hasMany(Comment)
  }

  /**
   * @returns {string}
   */
  resource () {
    return 'posts'
  }
}
