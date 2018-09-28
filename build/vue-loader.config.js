module.exports = (isDev) => {
    return {
        // 处理空白
        preserveWhitepace: true,
        // 开发环境不分离CSS, 生产环境分离CSS
        extractCSS: !isDev,
        cssModules: {
            // 驼峰式的命名规则
            camelCase: true
        }
    }
}