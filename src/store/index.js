// import Vue from 'vue'
import Vuex from 'vuex'

import defaultState from './state'
import mutations from './mutations'

// Vue.use(Vuex)

// const store = new Vuex.Store({
//     state: defaultState,
//     mutations
// })

// 返回的直接是个对象
// export default store;

export default () => {
    const store = new Vuex.Store({
        state: defaultState,
        mutations
    })
    return store
}