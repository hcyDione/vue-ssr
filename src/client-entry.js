import createApp from './create-app'

const { app, router, store } = createApp()

//路由完成初始导航时调用, 意味着可以解析所有的异步进入钩子和路由初始化相关联的异步组件
router.onReady(() => {
    app.$mount('#root')
})