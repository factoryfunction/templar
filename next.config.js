require('dotenv').config()
const withCSS = require('@zeit/next-css')

module.exports = withCSS({
  env: {
    GOOGLE_FONTS_API_KEY: 'AIzaSyDBHh83Oo73v894HyDUS1Ik_hSxS01Ymw4',
    GOOGLE_AUTH_CLIENT_ID:
      '824088426017-lp2ljemlhbn64n9172un7eqlh8gc0pc7.apps.googleusercontent.com',
    GOOGLE_AUTH_CLIENT_SECRET: '_UpeSktQqZFFNLA6PmQH-EuV',
    GOOGLE_SHEETS_API_KEY: 'AIzaSyBOVPyZk5hxaodNruXc5_KsOCueAGSoe3U',
  },

  webpack: function(config) {
    config.externals = config.externals || {}
    config.externals['styletron-server'] = 'styletron-server'
    return config
  },
})
