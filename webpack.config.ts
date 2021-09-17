import { Configuration } from 'webpack';
import * as path from 'path';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

const mode = process.env.NODE_ENV as Configuration['mode'];
const isProd = mode === 'production';

const config: Configuration = {
  mode,
  entry: './src/boss.ts',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
  stats: {
    chunks: false
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  plugins: [
    new CleanWebpackPlugin(),
  ].filter(Boolean)
};

export default config;
