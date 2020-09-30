import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: `${process.env.API}/api`,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json'
  },
  responseType: 'json'
})

export default async ({ Vue }) => {
  Vue.prototype.$axios = axiosInstance
}
