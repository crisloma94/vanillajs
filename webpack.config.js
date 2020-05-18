/** @format */

const path = require('path');

// webpack.config.js
module.exports = {
	entry: [ '@babel/polyfill', 'isomorphic-fetch', './src/index.js' ],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.scss$/,
				use: [ 'style-loader', 'css-loader', 'postcss-loader', 'sass-loader' ],
			},
			{
				test: /\.(png|jpe?g|gif)$/i,
				loader: 'file-loader',
				options: {
					outputPath: 'images',
				},
			},
		],
	},
};
