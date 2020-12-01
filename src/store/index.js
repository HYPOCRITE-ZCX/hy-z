import Vue from 'vue'
import Vuex from 'vuex'


import module from './mymodule'

Vue.use(Vuex)

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      module
    },

    strict: process.env.DEBUGGING
  })

  return Store
}
