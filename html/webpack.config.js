module.exports = {
	//mode: 'production',
	mode: 'development',
	entry: './script.js',
	output: { filename: 'bundle.js'},
	module:{
		rules:[
			{
				test: /\.js$/,
	            exclude: /node_modules/,
	            use: {
	                loader: "babel-loader"
	            }
			}
		]
	}
}