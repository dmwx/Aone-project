/**
 *  @file: vue.config.js is a <js> file
 *  @date: File created 2020-06-05 17:29
 *  @author:  shangwenhe
 */

'use strict'

const path = require('path');
let { fullPath, externals } = require('./aone.config.js')

module.exports = {
  publicPath: (process.env.NODE_ENV === 'production' )? `//s.vipkidstatic.com/beeschool/${fullPath}`: '/' ,
  outputDir: path.resolve(__dirname, 'dist'),
  pluginOptions: {
    externals: {
      common: Object.entries(externals).map(([key, item])=>{
        let { global, assets } = item;
        return {
          id: key,
          assets: assets.map(asset=>{
            let suffix = asset.match(/\w+\.(\w+$)/g)
            return {
              path: asset,
              type: (suffix && suffix.length == 2) ? suffix[1] : 'css'
            }
          }),
          global
        }
      })
    }
  }
}
