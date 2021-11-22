module.exports = {
  productionSourceMap: false,
  chainWebpack: config => {
    config.plugins.delete('demo.html')
  }
}
