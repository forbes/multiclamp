const path = require('path');

module.exports = [
	{
		mode: 'production',
		entry: './src/index.js',
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: 'multiclamp.min.js',
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: [/node_modules/, /dist/, /demo/],
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['babel-preset-env'],
						},
					},
				},
			],
		},
	},
	{
		mode: 'development',
		devtool: 'inline-sourcemap',
		entry: './demo/index.js',
		output: {
			path: path.resolve(__dirname, 'demo/dist'),
			filename: 'demo.js',
		},
		devServer: {
			contentBase: './demo',
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: [/node_modules/, /dist/],
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['babel-preset-env'],
						},
					},
				},
			],
		},
	},
];
