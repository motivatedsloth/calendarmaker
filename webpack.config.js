const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: {
        calendarmaker: './src/calendarmaker.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        library: "CalendarMaker"
    },
    mode: "development",
    module: {
        rules: [
            { 
                test: /\.css$/, 
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader' 
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ]
};
