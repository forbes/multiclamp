const path = require('path');

module.exports = [
	{
		mode: 'production',
		entry: './src/multiclamp.js',
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
];
