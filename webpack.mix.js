const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('.quasar/app.js', 'public/js');

if (mix.inProduction()) {

    mix.version();

    mix.webpackConfig({
        module: {
            rules: [
                {
                    test: /\.js?$/,
                    exclude: /(node_modules)/,
                    use: [{
                        loader: 'babel-loader',
                        options: mix.config.babel()
                    }]
                }
            ]
        }
    });
}
