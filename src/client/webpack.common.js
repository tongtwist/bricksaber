const path = require('path');

module.exports = {
	entry: "./src/client/client.ts",
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: "ts-loader",
				exclude: "/node_modules/"
			},
			{
				test: /\.(glsl|vs|fs|vert|frag)$/,
				type: "asset/source",
				generator: {
					filename: "assets/shaders/[hash][ext]"
				}
			}
		]
	},
	resolve: {
		extensions: [ ".tsx", ".ts", ".js" ]
	},
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "../../dist/client")
	}
};