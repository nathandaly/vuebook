import axios from 'axios'
import { Model } from 'vue-api-query'

Model.$http = axios

// "async" is optional
export default async ({ Vue }) => {
  Vue.prototype.$Model = Model
}
