const path = require('path');

module.exports = [
	{
		mode: 'development',
		entry: {
			'multiclamp.min': './src/multiclamp.js',
			index: './src/index.js',
		},
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: '[name].js',
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
