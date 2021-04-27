const merge = require('webpack-merge'); // if version >= 5 use name export
const common = require('./webpack.common.js');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = merge(common, {
	mode: 'development',
	devtool: 'inline-source-map',
	// Spin up a server for quick development
	devServer: {
		historyApiFallback: true,
		contentBase: './dist',
		hot: true,
		port: 8080,
	},
	plugins: process.env.SERVE ? [new ReactRefreshWebpackPlugin()] : [],
	target: 'web',
	module: {
		rules: [
			{
				test: /\.(s[ac]|c)ss$/i,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: { sourceMap: true },
					},
					'postcss-loader',
					// according to the docs, sass-loader should be at the bottom, which
					// loads it first to avoid prefixes in your sourcemaps and other issues.
					'sass-loader',
				],
			},
		],
	},
});