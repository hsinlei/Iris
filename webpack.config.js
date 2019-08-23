const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'development',
	context: path.resolve(__dirname, 'src'),
	entry: {
		main: './index.js',
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'index.js',
		publicPath: '/',
	},
	devServer: {
	  historyApiFallback: true,
	},
	module: {
		rules: [
		  {
			  test: /\.jsx?$/,
			  loader: 'babel-loader',
			  exclude: /node_modules/,
		  },
		  {
			  test: /\.css$/,
			  loader: 'style-loader!css-loader',
		  }
		]
	},
	node: {
		fs: 'empty',
		net: 'empty',
		tls: 'empty',
		dns: 'empty'
	  },
	plugins: [
	  new HtmlWebpackPlugin({
		template: '../index.html'
	  })
	]
};
