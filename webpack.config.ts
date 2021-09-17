import { Configuration } from 'webpack';
import * as path from 'path';
// import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import 'webpack-dev-server';
import HtmlWebpackPlugin from 'html-webpack-plugin';
const EslintWebpackPlugin = require('eslint-webpack-plugin');

const mode = process.env.NODE_ENV as Configuration['mode'];
const isProd = mode === 'production';

const config: Configuration = {
  mode,
  entry: './src/boss.ts',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
    assetModuleFilename: 'images/[name][contenthash][ext][query]', // 图片路径
    clean: true // 代替 'clean-webpack-plugin'
  },
  stats: 'minimal',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(s?css|sass)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        type: 'asset/resource'
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.json']
  },
  devtool: 'source-map',
  devServer: {
    port: 8000, // 指定端口
    open: false, // 自启浏览器
    hot: true, // 局部热更新
    historyApiFallback: true, // 支持 history 模式路由
    client: {
      logging: 'none'
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html'
    }),
    new EslintWebpackPlugin({
      extensions: ['js', 'ts']
    })
  ]
};

export default config;
