const paths = require('./paths');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  // This is unnecessary in Webpack 5, because it's the default.
  // However, react-refresh-webpack-plugin can't find the entry without it.
  entry: "./src/index.js",

  output: {
    filename: '[name].[contenthash].js',
    // output path is required for `clean-webpack-plugin`
    path: paths.build,
    // this places all images processed in an image folder
    assetModuleFilename: "images/[hash][ext][query]",
    // completely wipes /dist at every build
    clean: true
  },

  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        /**
         * The `type` setting replaces the need for "url-loader"
         * and "file-loader" in Webpack 5.
         *
         * setting `type` to "asset" will automatically pick between
         * outputing images to a file, or inlining them in the bundle as base64
         * with a default max inline size of 8kb
         */
        type: "asset",

        /**
         * If you want to inline larger images, you can set
         * a custom `maxSize` for inline like so:
         */
        // parser: {
        //   dataUrlCondition: {
        //     maxSize: 30 * 1024,
        //   },
        // },
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          // without additional settings, this will reference .babelrc
          loader: "babel-loader",
          options: {
            /**
             * From the docs: When set, the given directory will be used
             * to cache the results of the loader. Future webpack builds
             * will attempt to read from the cache to avoid needing to run
             * the potentially expensive Babel recompilation process on each run.
             */
            cacheDirectory: true,
          },
        },
      },
    ],
  },

  plugins: [
    new FaviconsWebpackPlugin({
      logo: paths.public + '/icon.svg',
      mode: 'auto',
      cache: true,
      favicons: {
        icons: {
          android: false,              
          appleIcon: false,             
          appleStartup: false,         
          coast: false,                
          favicons: true,             
          firefox: false,              
          windows: false,
          yandex: false 
        }
      }
    }), // it will generate the right icon
    new HtmlWebpackPlugin({
      title: 'Webpack React config',
      template: paths.src + '/template.html', // template file
      filename: 'index.html', // output file
    }),
    // Copies files from target to destination folder
    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.public,
          to: 'assets',
          globOptions: {
            ignore: ['*.DS_Store', '**/*icon.svg'],
          },
          noErrorOnMissing: true,
        },
      ],
    }),
  ],

  resolve: {
    extensions: [".js", ".jsx"],
  },
};
