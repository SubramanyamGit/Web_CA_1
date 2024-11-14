const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './index.js',  // Specify an entry file if you have JavaScript as well
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',  // This can be changed or removed if you have no JS
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html', // Path to your main HTML file
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ['html-loader']
      }
    ]
  }
};
