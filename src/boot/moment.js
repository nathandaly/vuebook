import moment from 'moment'
import locale2 from 'locale2'

export default async ({ Vue }) => {
  Vue.prototype.$moment = moment
  Vue.prototype.$moment.locale(locale2.toLowerCase())
}
