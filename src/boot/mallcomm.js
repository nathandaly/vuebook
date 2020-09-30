import { mapActions } from 'vuex'

export default async ({ Vue }) => {
  Vue.prototype.$mallcomm = window.Mallcomm || {}
  Vue.mixin({
    methods: {
      ...mapActions('global', [
        'setImageFromDevice'
      ]),
      setImage: function () {
        alert('setImage')
      },
      selectImage: function () {

      },
      fullName: function (profile) {
        return `${profile.firstname} ${profile.lastname}`
      },
      profileRole (profile) {
        return profile.roles && profile.roles.length && profile.roles[0].name
      }
    }
  })
  window.setImage = new Vue().setImage
}
