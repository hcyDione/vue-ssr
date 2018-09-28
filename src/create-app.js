import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

import App from './app.vue'
import createRouter from './router/index'
import createStore from './store/index'

import './assets/styles/global.styl'

Vue.use(VueRouter)
Vue.use(Vuex)

export default () => {
    const router = createRouter()
    const store = createStore()

    const app = new Vue({
        router,
        store ,
        render: (h) => h(App)
    })

    return { app, router, store }
}