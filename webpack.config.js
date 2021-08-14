// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
  target: 'node12',
  mode: 'production',
  externals: {
    express: 'express',
  },
  entry: {
    server: './src/server.ts',
  },
  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};
