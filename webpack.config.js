const path = require('path')
const webpackSpriteSmith = require('webpack-spritesmith')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: path.join(__dirname, './src/app.js'),
  output: {
    filename: '[name]-[hash:8].js',
    path: path.join(__dirname, './dist')
  },
  devServer: {
    port: 9090,
    compress: true,
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.png$/,
        loader: 'file-loader',
        include: /src/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.styl$/,
        use: ['style-loader', 'css-loader', 'stylus-loader'],
        include: /src/
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      title: '测试雪碧图'
    }),
    new webpackSpriteSmith({
      src: {
        cwd: path.resolve(__dirname, 'src/assets'),
        glob: '*.png'
      },
      target: {
        image: path.resolve(__dirname, 'src/assets/icons/sprite.png'),
        css: path.resolve(__dirname, 'src/styles/icons.styl')
      },
      apiOptions: {
        cssImageRef: path.resolve(__dirname, './src/assets/icons/sprite.png')
      }
    })
  ]
}
