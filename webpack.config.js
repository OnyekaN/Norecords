const webpack = require('webpack');
const path = require('path');
const PROD = (process.env.NODE_ENV === 'production');

module.exports = {
	context: path.join(__dirname, 'app'),
	devtool: "source-map",
	entry: [
		'./app.js',
	],
	output: {
		path: path.join(__dirname, 'app/assets'),
		filename: PROD ? 'bundle.min.js': 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					'babel-loader',
				],
			},
		],
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true,
			output: {
				comments: false,
			},
		}),
	],
	resolve: {
		modules: [
			path.join(__dirname, 'node_modules'),
		],
	},
};
