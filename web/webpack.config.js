const webpack =require("webpack");
const htmlWebpackPlugin =require("html-webpack-plugin");
const extractTextPlugin=require("extract-text-webpack-plugin");
module.exports={
	entry:{
		main:"./src/js/main.js",
		a:"./src/js/a.js",
		b:"./src/js/b.js",
		c:"./src/js/c.js"
	},
	output:{
		path:"/webpack0730/web/dist",
		filename:"js/[name]-bundle.js"
		,
		publicPath:"http://127.0.0.1:8020/webpack/web/dist/"
	},
	module:{
		rules:[
//			{test:/\.css$/,use:['style-loader','css-loader',{
//				loader:"postcss-loader",
//				options:{
//					minimize:true,
//					plugins:function(){
//						return [require("autoprefixer")]
//					}
//				}
//			}]},
			{test:/\.css$/,use:extractTextPlugin.extract({
		          fallback: "style-loader",
		          use:[{
		          	loader:'css-loader',
		          	options:{
		          		minimize:true,  //css压缩 必须放在css-loader中
		          	}
		          },{
						loader:"postcss-loader",    //对postcss处理
						options:{
			          		importLoaders:1       //处理@import 引进来的css文件 必须放在postcss-loader中
			          		,
							plugins:function(){
								return [require("autoprefixer")]
							}
						}
					}]
		        })
			}
			,
			{
				test:/\.(png|jpg|svg|gif)$/,    
				use:[ 
					{
						loader:"url-loader"   
						,       //加query就是正常url  不加就是base64
						query:{
							limit:8192,
							name:"img/[name]-[hash:5].[ext]"
						}
					}
				]
				
			}

//			,
//			{test:/\.(png|jpg|svg|gif)$/,use:"url-loader"}  //base64
//			{test:/\.(png|jpg|svg|gif)$/,use:"file-loader"}  //正常url
		]
	},

	devtool:"inline-source-map",
	plugins:[
		new htmlWebpackPlugin({
			filename:"index.html",
			template:"index.html",
			inject:"head",
			chunks:["main"],
//			minify:{
//				removeComments:true,
//				collapseWhitespace:true
//			},
			title:"success",
			data:new Date()
		})

//		,
//		new htmlWebpackPlugin({
//			filename:"main.html",
//			template:"index.html",
//			inject:"head",
//			chunks:["a","b","main"],
//			title:"main",
//			data:new Date()
//		}),
//		new htmlWebpackPlugin({
//			filename:"c.html",
//			template:"index.html",
//			inject:"head",
//			chunks:["c","main"],
//			title:"cccc",
//			data:new Date()
//		}),
//		new htmlWebpackPlugin({
//			filename:"b.html",
//			template:"index.html",
//			inject:"head",
//			chunks:["b","main"],
//			title:"bbb",
//			data:new Date()
//		})
		,
//		new webpack.optimize.OccurenceOrderPlugin(),
// 		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin(),
		new extractTextPlugin("style.css")
	]
}
