import { Configuration } from 'webpack';
import * as path from 'path';
// import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import 'webpack-dev-server';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import EslintWebpackPlugin from 'eslint-webpack-plugin';

const mode = process.env.NODE_ENV as Configuration['mode'];
const isProd = mode === 'production';

const config: Configuration = {
  mode,
  entry: './src/boss.ts',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
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
        test: /.html$/,
        include: /src/,
        type: 'asset/source'
      },
      {
        test: /\.(s?css|sass)$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              attributes: {
                'attr-type': 'kylin-basic'
              }
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        type: 'asset/inline' // 转成 base64 url
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.json']
  },
  devtool: isProd ? undefined : 'source-map',
  devServer: {
    port: 8000, // 指定端口
    open: true, // 自启浏览器
    hot: true, // 局部热更新
    historyApiFallback: true, // 支持 history 模式路由
    client: {
      logging: 'none'
    }
  },
  experiments: {
    topLevelAwait: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html'
    }),
    new EslintWebpackPlugin({
      extensions: ['js', 'ts']
    })
  ].filter(Boolean)
};

export default config;
