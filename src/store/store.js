import Vuex from 'vuex'

import { userStore } from './modules/user-module.js'
import { stayStore } from './modules/stay-module.js'
import { orderStore } from './modules/order-module.js'

export const store = Vuex.createStore({
  strict: true,
  modules: {
    userStore,
    stayStore,
    orderStore
  },
  state: {
  },
  mutations: {
  },
  actions: {
  }
})
