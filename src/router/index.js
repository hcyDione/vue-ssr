// import Vue from 'vue'
import Router from 'vue-router'

import routes from './routers'

// Vue.use(Router)

// const router = new Router({
//     routes: routes
// })

// 返回的直接是个对象
// export default router

export default () => {
    return new Router({
        routes: routes
    })
}