module.exports = {
    entry: [
      './src/index.js',
      './src/index.scss'
    ],
    output: {
      path: __dirname,
      publicPath: '/',
      filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/, 
          use: {
              loader: 'babel-loader' 
          } 
        },
        {  
          test: /\.scss$/,  
          use: ['style-loader', 'css-loader', 'sass-loader']  
        },
        {  
          test: /\.(png|jpg)$/,  
          use: {  
            loader: 'file-loader',  
            options: {  
              name: '[name].[ext]',  
              outputPath: 'images/'  
            }  
          }  
        }
      ]
    }
  };