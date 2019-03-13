module.exports = {
    devServer: {
        host: "192.168.43.171",
        port: 8888,
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                pathRewrite:{
                    '^/api':'/api'
                }
            }
        }
    }
};