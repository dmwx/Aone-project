/**
 *  @file: aone.config.js is a <js> file
 *  @date: File created 2020-06-09 18:21
 *  @author:  shangwenhe
 */

'use strict'

const { name, version } = require('./package.json');

let fullPath = `${name.replace(/\@/ig, '')}/${version}`;
module.exports = {
  module: '@aone/',
  library: ['Learning','math'],
  fullPath: fullPath,
  externals: {
    vue: {
      global: 'Vue',
      assets: [
        'https://cdn.bootcss.com/vue/2.5.15/vue.min.js'
      ]
    },
    Learning: {
      global: 'Learning',
      assets: [
        'http://localhost:8080/aone/vue-components/0.1.0/js/base-vendors.js',
        'http://localhost:8080/aone/vue-components/0.1.0/js/math.js',
        'http://localhost:8080/aone/vue-components/0.1.0/css/math.css'
      ]
    }
  }
}