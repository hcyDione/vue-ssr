# About
这是慕课网上[Vue+Webpack打造todo应用](https://www.imooc.com/learn/935)课程的源码

# 使用方法
```
git clone https://github.com/Jokcy/vue-todo-tech.git
```
进入项目目录，运行
```
npm install
```
然后执行
```
npm run dev
```
开始开发项目
# About
这是慕课网上[Vue+Webpack打造todo应用](https://www.imooc.com/learn/935)课程的源码

# 使用方法

正常打包的时候：
在development情况下：
css不分离打包 vue里面内嵌的还是styl都不分离打包, 和js会生成bundle.js文件 引入之后会自动生成script,css等
在production情况下：
css打包的时候是会extraCSS的,把vue里面的css也会分离出来和styl共同打包成一个styles.[hash].css的文件
![avatar]()
服务端渲染要特别注意的是：
开发环境下:
"build:client": "cross-env NODE_ENV=development webpack --config build/webpack.config.client.js",
和
"dev:client": "cross-env NODE_ENV=development webpack-dev-server --config build/webpack.config.client.js",
和
"dev:server": "cross-env NODE_ENV=development nodemon server/server.js",
这三个是配套使用的
生产环境的时候
"build:client": "cross-env NODE_ENV=production webpack --config build/webpack.config.client.js",
和
"build:server": "cross-env NODE_ENV=production webpack --config build/webpack.config.server.js",
和
"start": "cross-env NODE_ENV=production node server/server.js"
这三个是配套使用的
一定要注意分析区别
```
npm i webpack-merge -D
访问到的是一个目录结构,而不是一个页面
vue-loader默认没有style-loader(热更替),若是想有 npm i vue-style-loader -D 然后把webpack.config.client.js里面的style-loader换成
vue-style-loader
npm i rimraf -D 打包之前删除dist目录


npm i eslint eslint-config-standard eslint-plugin-standard eslint-plugin-promise
eslint-plugin-import eslint-plugin-node -D
npm i eslint-plugin-html
npm i eslint-loader babel-eslint -D


建立editorconfig 编码格式规范用编辑器规范编码格式

git提交之前的代码控制
先git init 之后在安装githusky的工具
npm i husky -D


runtime-only: 不能编译template的代码
npm i webpack@^3.0.0 -D
下去查看doc-loader的代码


npm i vue-router -S

修改hash路由

异步加载路由的时候需要用到import关键字
支持import关键字需要安装npm i babel-plugin-syntax-dynamic-import -D 然后需要修改.bebelrc文件
然后重启服务


npm i vuex -S

.babelrc在env的情况下不支持语法展开运算符的形式
需要安装npm i babel-preset-stage-1 -D 在.babelrc里面配置"stage-1"

给VueX加热更替的功能

如何写好的代码 一个function只做一个事情,function只是管道

npm i vue -S 是装在package.json里面的dependencies里面
npm i vue - 是装在package.json里面的devDependencies里面 //工具性的东西,应用跑起来的时候是不需要的,只是打包的时候需要的


server端渲染
npm i vue-server-renderer -S vue服务端渲染必须有的一个包

写node
npm i koa -S

要处理服务端渲染,需要安装koa的中间件
npm i koa-router -S

npm i axios -S
npm i memory-fs -D

安装中间件 npm i ejs -S

打包出现error: Vue packages version mismatch
                 - vue@2.5.13
                 - vue-server-renderer@2.5.17
This may cause things to work incorrectly. Make sure to use the same version for both
错误原因 常见于在已经配置好的webpack vue项目中更新了vue依赖时出现,附加规则是vue和vue-server-renderer二者的版本必须是一一对应的
因为vue-loader的版本是大于10的
npm update vue-server-renderer (也可以通过npm list去检查npm的依赖)
如果还是不行 npm install vue-server-renderer@2.5.13 -S 则运行正常


npm i koa-send -S //服务端渲染能很好的发送一些静态文件

npm i nodemon -D  //server端的热更新并配置nodemon.json文件

npm i concurrently -D //同时启动client和server的服务

npm i vue-meta -S  //动态的设置页面meta-title的包

koa去做了一个简单的nodeserver 开发环境需要一个webpackServerCompiler帮我们编译出
server bundle 当用户请求的时候server-entry里面区分应该返回的东西通过ejs的模板引擎
渲染到html当中

正式环境逻辑相对比较简单

服务端渲染逻辑:
Vue.js构建客户端应用程序时, 默认情况下是在浏览器中输出Vue组件,生成Dom
和操作Dom, 而使用SSR可以将同一个组件渲染为服务器端的html字符串,然后将他们直接发送
到浏览器,最后静态标记"混合"为客户端上完全交互的应用程序
浏览器渲染： 指的是用JS去生成HTML,如Vue的路由
服务器渲染： 指的是用后端语言通过一些模板引擎生成的html,将数据与视图整理输出为完整的html文档发送给浏览器

SSR是一份代码运行在两个环境里面(服务端, 客户端) 服务端先运行好之后,把模板渲染成html页面,然后返回给前端,前端在载入js文件
