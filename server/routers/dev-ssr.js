const Router = require('koa-router')
const axios = require('axios')
const path = require('path')
const fs = require('fs')
const MemoryFs = require('memory-fs')
const webpack = require('webpack')

const VueServerRenderer = require('vue-server-renderer')

const serverRender = require('./server-render')

const serverConfig = require('../../build/webpack.config.server')

const serverCompiler = webpack(serverConfig) // 类似于执行了npm run build:server这个节点

const mfs = new MemoryFs()
serverCompiler.outputFileSystem = mfs

let bundle

// 模拟npm run build:server的过程
serverCompiler.watch({}, (err, stats) => {
    if (err) throw err
    stats = stats.toJson()
    stats.errors.forEach(err => console.log(err))
    stats.warnings.forEach(warn => console.log(warn))

    const bundlePath = path.join(
        serverConfig.output.path,
        'vue-ssr-server-bundle.json'
    )

    bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))
    console.log('new boundle packaged') //服务端打出来的包,也就是build完之后生成的json文件
})

const handleSSR = async(ctx) => {
    // 如果一旦有请求来了, 但是server端的bundle还没生成,就给个页面提示
    if (!bundle) {
        ctx.body = "稍等会..."
        return
    }

    const clientManifestResp = await axios.get(
        'http://127.0.0.1:8000/vue-ssr-client-manifest.json'
    )

    const clientManifest = clientManifestResp.data

    const template = fs.readFileSync(
        path.join(__dirname, '../server-temp.ejs'),
        'utf-8'
    )

    const renderer = VueServerRenderer
        .createBundleRenderer(bundle, {
            inject: false,
            clientManifest
        })
    // 去生成html了
    await serverRender(ctx, renderer, template)
}

// 服务端请求路由
const router = new Router()
router.get('*', handleSSR)

module.exports = router


