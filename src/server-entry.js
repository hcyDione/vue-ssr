import createApp from './create-app'

export default context => {
    return new Promise((resolve, reject) => {
        const { app, router } = createApp()

        // 客户端访问入口path:'/', 从路由寻找对应的vue文件
        console.log('context', context.url)
        router.push(context.url)

        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents()
            if (!matchedComponents.length) {
                return reject(new Error('no component matched'))
            }
            resolve(app)
        })
    })
}