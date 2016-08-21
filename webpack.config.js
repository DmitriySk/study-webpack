const NODE_ENV = process.env.NODE_ENV || "development";
const webpack = require('webpack');

const rimraf = require('rimraf');

let ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	context: __dirname + "\\src",

	entry: {
		home: "./js/home",
		common: ["./js/helpers", "expose?$!expose?jQuery!jquery"],
		react_main: "./react/entrys/main",
		ang_main: "./angular/entrys/index",
	},

	output: {
		path: __dirname + "/public/js",
		publicPath: "js/",
		filename: "[name].js",
		chunkFilename: "[name]_[id].js",
		//library: "$[name]"
	},

	watch: NODE_ENV == "development",

	devtool: NODE_ENV == "development" ? "source-map" : null,

	plugins: [
		{
			apply: compiler => {
				rimraf.sync(compiler.options.output.path);
			}
		},
		new webpack.NoErrorsPlugin(),
		new webpack.DefinePlugin({
			NODE_ENV:JSON.stringify(NODE_ENV)
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: "common",
			chunks: ["home"]
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: "react",
			chunks: ["react_main"]
		}),
		/*new webpack.optimize.CommonsChunkPlugin({
			name: "angular",
			chunks: ["ang_main"]
		}),*/
		new ExtractTextPlugin('../css/[name].css', {allChunks: true, disable: !(NODE_ENV == "development") })
	],

	resolve: {
		alias: {
			component: 	__dirname + "/src/react/components",
			route: 		__dirname + "/src/react/routes",
			module: 	__dirname + "/src/react/modules",
			helper: 	__dirname + "/src/react/helpers",
			layout: 	__dirname + "/src/react/layouts"
		},
		modulesDirectories: ["node_modules"],
		extensions: ["", ".js", ".es6", ".jsx", ".ts", ".json"]
	},

	module: {
		loaders: [
			{
				test: /\.es6$/,
				exclude: /(node_modules|bower_components)/,
				loader: "babel",
				query: {
					presets: ['es2015'],
					plugins: ['transform-runtime']
				}
			},
			{
				test: /\.jsx$/,
				exclude: /(node_modules|bower_components)/,
				loader: "babel",
				query: {
					cacheDirectory: true,
					presets: ['es2015', "react", "stage-0"],
					plugins: ['transform-runtime'],
					env: {
						development: {
							plugins: [
								['react-transform', {
									transforms: [{
										transform: 'react-transform-hmr',
										imports: ['react'],
										locals: ['module']
									}]
								}]
							]
						}
					}
				}
			},
			{
				test: /\.ts$/,
				loaders: ['awesome-typescript', 'angular2-template'],
				exclude: [/\.(spec|e2e)\.ts$/]
			},
			{
				test: /\.json$/,
				loader: 'json-loader'
			},
			{
				test   : /\.css$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'style!css!resolve-url'
			},
			{
				test   : /\.scss$/,
				exclude: /(node_modules|bower_components)/,
				loader: ExtractTextPlugin.extract('style', 'css!resolve-url!sass?sourceMap')
			}
		]
	}
};

if (NODE_ENV == "production") {
	console.log("include uglify");
	module.exports.plugins.push(
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
				drop_console: true,
				unsafe: true
			}
		})
	);
}

if (NODE_ENV == "development") {
	console.log("include dev server");
	module.exports.devServer = {
		host: "localhost",
		port: 8080,
		contentBase: __dirname + "\\public",
		proxy: [{
			path: "/react",
			target: "http://localhost:8080",
			secure: false,
			rewrite: function(req) {
				if (req.url == "/react")
					req.url = "/react.html";
			}
		},{
			path: "/angular",
			target: "http://localhost:8080",
			secure: false,
			rewrite: function(req) {
				if (req.url == "/angular")
					req.url = "angular.html";
			}
		}],
	};
}

