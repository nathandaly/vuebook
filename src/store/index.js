import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import global from './global'
import post from './post'
import user from './user'

// import example from './module-example'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

/* eslint-disable */
function actionLoggerPlugin(store) {
  store.subscribeAction(({ type, payload }, state) => {
    // console.log(`Before dispatching "${type}" with ${JSON.stringify(payload)}`)
  })
}
/* eslint-enable */

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      global,
      post,
      user
    },

    plugins: [vuexLocal.plugin, actionLoggerPlugin],

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  if (process.env.DEV && module.hot) {
    module.hot.accept(['./post', './user'], () => {
      const post = require('./post').default
      const user = require('./user').default
      Store.hotUpdate({ modules: { post, user } })
    })
  }

  Store.initialState = {
    loading: false,
    payload: null,
    error: false,
    meta: null
  }

  return Store
}
