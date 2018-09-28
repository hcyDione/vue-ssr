const Router = require('koa-router')
const send = require('koa-send')

// 只处理'/dist'开头的文件
const staticRouter = new Router({ prefix: '/dist' })

staticRouter.get('/*', async ctx => {
    await send(ctx, ctx.path)
})

module.exports = staticRouter