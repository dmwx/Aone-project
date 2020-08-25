/**
 *  @file: vue.config.js is a <js> file
 *  @date: File created 2020-06-05 17:29
 *  @author:  shangwenhe
 */

'use strict'

const path = require('path');
let { fullPath, externals } = require('./aone.config.js')
const jsonFormat = require("json-format")
const fs = require('fs-extra')

module.exports = {
  publicPath: (process.env.NODE_ENV === 'production' )? `//s.vipkidstatic.com/beeschool/${fullPath}`: '/' ,
  outputDir: path.resolve(__dirname, 'dist'),
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        let parameters = args[0]['templateParameters'];
        function getAsset (compilation, assets, pluginOptions){
          let filePath = config.output.store.get('path')
          fs.exists(filePath, function(ex){
            fs.mkdir(filePath, { recursive: true }, (err) => {
              fs.writeFile(filePath + '/depends.map.json', jsonFormat(assets, { type: 'space', size: 2 }), function (error, data) {
                if(error){
                  console.log(error)
                  process.exit(1);
                }
              })
            });
          });
          return parameters(compilation, assets, pluginOptions);
        }
        args[0]['templateParameters'] = getAsset;
        return args
      });
  },
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
