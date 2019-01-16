const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
  entry: './src/app.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: 'js/app.js'
  },
  resolve : {
    alias : {
      page : path.resolve(__dirname,'src/page'),
      components : path.resolve(__dirname,'src/components')
    }

  },
  module: {
    rules: [
      //react处理
      {
        test: /\.jsx$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env','react']
          }
        }
      },
      //css文件的处理
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      //sass文件的处理
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      }, 
      //图片的配置
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name :'resource/[name].[ext]'
            }
          }
        ]
      },
      //字体和图标
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name :'resource/[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    //处理HTMl文件
    new HtmlWebpackPlugin({
          template: './src/index.html',
          favicon : './favicon.ico'
    
  }),
  //独立css文件
  new ExtractTextPlugin("css/[name].css"),
  //提出公共模块
  new webpack.optimize.CommonsChunkPlugin({
    name : 'common',
    filename :'js/base.js'
  })

],
devServer: {
  port : 8086,
  historyApiFallback:{
    index : '/dist/index.html'
  }
}
};