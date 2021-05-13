module.exports = [{
      plugin: require('../node_modules/gatsby-remark-images/gatsby-browser.js'),
      options: {"plugins":[],"maxWidth":960,"withWebp":true,"linkImagesToOriginal":true,"showCaptions":false,"markdownCaptions":false,"sizeByPixelDensity":false,"backgroundColor":"white","quality":50,"tracedSVG":false,"loading":"lazy","disableBgImageOnAlpha":false,"disableBgImage":false},
    },{
      plugin: require('../node_modules/gatsby-remark-autolink-headers/gatsby-browser.js'),
      options: {"plugins":[],"offsetY":0,"className":"anchor"},
    },{
      plugin: require('../node_modules/gatsby-plugin-netlify-cms/gatsby-browser.js'),
      options: {"plugins":[],"modulePath":"/Users/joel.foo.xj/blog/joelfooxj.github.io/src/cms/index.js"},
    },{
      plugin: require('../node_modules/gatsby-plugin-google-gtag/gatsby-browser.js'),
      options: {"plugins":[],"trackingIds":[""],"pluginConfig":{"head":true}},
    },{
      plugin: require('../node_modules/gatsby-plugin-manifest/gatsby-browser.js'),
      options: {"plugins":[],"name":"Joel's Brain Repo","short_name":"Joel's Brain Repo","start_url":"/","background_color":"#FFF","theme_color":"#F7A046","display":"standalone","icon":"static/jfxjlogo.png","legacy":true,"theme_color_in_head":true,"cache_busting_mode":"query","crossOrigin":"anonymous","include_favicon":true,"cacheDigest":"55521b6707f6a7b44f73386a34e76049"},
    },{
      plugin: require('../node_modules/gatsby-plugin-offline/gatsby-browser.js'),
      options: {"plugins":[],"workboxConfig":{"runtimeCaching":[{"urlPattern":{},"handler":"CacheFirst"},{"urlPattern":{},"handler":"StaleWhileRevalidate"},{"urlPattern":{},"handler":"StaleWhileRevalidate"},{"urlPattern":{},"handler":"StaleWhileRevalidate"}]}},
    },{
      plugin: require('../node_modules/gatsby-plugin-catch-links/gatsby-browser.js'),
      options: {"plugins":[]},
    },{
      plugin: require('../node_modules/@sentry/gatsby/gatsby-browser.js'),
      options: {"plugins":[],"tracesSampleRate":1},
    },{
      plugin: require('../gatsby-browser.js'),
      options: {"plugins":[]},
    }]
