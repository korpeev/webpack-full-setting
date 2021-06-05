const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin') 
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

const isProd = process.env.NODE_ENV === "production";
const isDev = !isProd;
let target = "web";

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: "all"
        }
    }
    if(isProd) {
        config.minimizer = [new TerserWebpackPlugin()]
    }

    return config
}

const plugins = [new HtmlWebpackPlugin(
    {template: './src/index.html', minify: isProd ? true : false }), 
new MiniCssExtractPlugin({
    filename: './styles/[name].css'
}), new CleanWebpackPlugin()]



if (isProd) {
    // mode = "production";
    // Temporary workaround for 'browserslist' bug that is being patched in the near future
    target = "browserslist";
  }

if (process.env.SERVE) {
    // We only want React Hot Reloading in serve mode
    plugins.push(new ReactRefreshWebpackPlugin());
  }

module.exports = {
    mode: 'development',
    entry: {
        index: path.resolve(__dirname, 'src/index.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "js/[name].bundle.js",
        assetModuleFilename: "images/[hash][ext][query]"
    },
    plugins: plugins,

    module: {
        rules: [
            {
            test: /\.(scss|css)$/,
            use: [{
                loader: MiniCssExtractPlugin.loader
            }, 'css-loader', 'postcss-loader', 'sass-loader']
            },
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
                exclude: /node_modules/
            }, 
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: 'asset'
            }
        ]
    },
    devServer: {
        hot: true,
        contentBase: '/dist',
        open: true
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    target: target,
    devtool: isDev ? 'source-map' : false,
    optimization: optimization()
}