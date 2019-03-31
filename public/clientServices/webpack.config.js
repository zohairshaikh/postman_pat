const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = () => {
    return {
        entry: {
            main: ['babel-polyfill','./App.jsx']
        },
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: '[name].bundle.js',
            publicPath: '/clientServices/build/',
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    loader: "babel-loader",
                    query:
                        {
                            presets: ['@babel/react']
                        }
                },
                {
                    test: /\.css$/,
                    loaders: ['style-loader', 'css-loader',"sass-loader"]
                },
                {
                    test: /\.scss$/,
                    use: [
                        {
                            loader: 'style-loader'
                        },
                        {
                            loader: 'css-loader'
                        },
                        {
                            loader: 'resolve-url-loader'
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                                sourceMapContents: false
                            }
                        }
                    ]
                },
                {
                    test: /\.(png|woff|woff2|eot|ttf|svg|gif)$/, loader: 'url-loader?limit=100000'
                }
            ]
        },
        plugins: [
            new ExtractTextPlugin({filename: 'style.css'})
        ]
    };
};
