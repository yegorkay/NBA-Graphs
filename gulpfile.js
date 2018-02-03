var gulp = require('gulp');
var sass = require('gulp-sass');
var debug = require('gulp-debug');
var rename = require('gulp-rename');
var strip = require('gulp-strip-comments');
var browserSync = require('browser-sync').create();
// JS
var uglify = require('gulp-uglifyjs');
var concat = require('gulp-concat');

// CSS
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

var vendorCssFiles = [
    'node_modules/normalize.css/normalize.css'
];
var vendorScriptFiles = [
    'node_modules/d3/build/d3.js',
    'node_modules/d3-axis/build/d3-axis.js'
];

gulp.task('vendorStyles', function() {
    return gulp.src(vendorCssFiles)
        .pipe(debug({
            title: 'vendorCss'
        }))
        .pipe(concat('_vendor.scss'))
        .pipe(gulp.dest('scss/vendor'));
});

// Compiles SCSS into browser readable CSS
gulp.task('sass', function(){
  return gulp.src('scss/**/*.scss')
    .pipe(debug())
    .pipe(sourcemaps.init())
    .pipe(sass()
        .on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: [ 'last 2 versions' ],
        cascade: false
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('css'))
    // This below is so Browser Sync can inject new CSS styles into the browser whenever the sass task is ran
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('vendorScripts', function() {

    gulp.src(vendorScriptFiles)
        .pipe(debug())
        .pipe(sourcemaps.init())
        .pipe(concat('nba-graphs-vendor.js'))
        .pipe(strip())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('js'));
});

gulp.task('js', function() {
    return gulp.src('scripts/*.js')
        .pipe(debug())
        .pipe(sourcemaps.init())
        .pipe(strip())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('js'));
});

// BrowserSync to auto refresh your browser on file modification
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            // baseDir is the directory that BrowserSync will read from, in this case the root directory
            baseDir: './'
        }
    })
})

// Watch task to watch you files for changes
// Anything in the [_] will be completed before the 'watch' task is run
gulp.task('watch', ['browser-sync', 'vendorStyles', 'sass', 'vendorScripts', 'js'], function (){
    gulp.watch('scss/**/*.scss', ['sass']);
    // Reloads the browser whenever HTML or JS files change
    gulp.watch('scripts/**/*.js', ['js', browserSync.reload]);
    gulp.watch('*.html', browserSync.reload);
});