const path = require('path');

module.exports = [
	{
		mode: 'production',
		entry: './src/index.js',
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: 'index.js',
			library: 'multiclamp',
			libraryTarget: 'umd',
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
];
