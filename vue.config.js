module.exports = {
  devServer: {
    open: true
  },

  css: {
    loaderOptions: {
      css: {},
      // postcss: {
      //   plugins: [
      //     function (css, result) {
      //       var oldCssText = css.toString()
      //       var px2remIns = new Px2rem(options)
      //       var newCssText = px2remIns.generateRem(oldCssText)
      //       var newCssObj = postcss.parse(newCssText)
      //       result.root = newCssObj
      //     }
      //   ]
      // },
      stylus: {
        'resolve url': true,
        import: [
          './src/theme'
        ]
      }
    }
  },

  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  }
}
