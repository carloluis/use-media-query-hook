const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const PATHS = {
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname, './dist'),
  root: path.join(__dirname, '..')
};

module.exports = env => {
  const PRODUCTION = env.NODE_ENV === 'production';

  return {
    context: __dirname,
    mode: PRODUCTION ? 'production' : 'development',
    output: {
      path: PATHS.dist,
      filename: '[name].[hash].js',
      publicPath: PRODUCTION ? './' : '/'
    },
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            enforce: true,
            chunks: 'all'
          }
        }
      }
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        'use-media-query-hook-local': path.join(PATHS.root, 'index.js')
      }
    },
    devtool: PRODUCTION ? 'sourcemap' : 'eval-sourcemap',
    module: {
      rules: [
        {
          test: /.css$/,
          use: [
            {
              loader: PRODUCTION ? MiniCssExtractPlugin.loader : 'style-loader'
            },
            {
              loader: 'css-loader',
              options: {
                modules: true,
                camelCase: 'dashes',
                localIdentName: '[path][name]__[local]'
              }
            }
          ]
        },
        {
          test: /.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(PATHS.src, 'index.html'),
        inject: true
      }),
      new MiniCssExtractPlugin({
        filename: '[name].[chunkhash].css'
      })
    ],
    devServer: {
      contentBase: PATHS.dist,
      compress: true,
      open: false,
      overlay: {
        warnings: true,
        errors: true
      },
      port: 3000
    },
    stats: {
      children: false
    }
  };
};
