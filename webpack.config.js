var path = require('path');

module.exports = [{
        mode: 'production',
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js'
        },
        devServer:{
            contentBase: './'
        },
        module: {
            rules: [
            {
                test: /\.js$/,
                exclude: [/node_modules/, /dist/],
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['babel-preset-env']
                    }
                }
            }
            ]
        },
    },
    {
        mode: 'development',
        entry: './demo/demo.js',
        output: {
            path: path.resolve(__dirname, 'demo'),
            filename: 'demo.bundle.js'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: [/node_modules/, /dist/],
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['babel-preset-env']
                        }
                    }
                }
            ]
        }
}];
