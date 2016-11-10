var gulp = require('gulp');
var concat = require('gulp-concat');
var del = require('del');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var runSequence = require('run-sequence');
var plumber = require('gulp-plumber');
var util = require('gulp-util');

var src = 'src';
var dest = 'dist';
var bower = 'bower_components';

var myPlumber = function() {
    return plumber({
        errorHandler: function(error) {
            util.log(util.colors.red('Unhandled error:\n'), error.toString());
            return this.emit('end');
        }
    });
};

gulp.task('clean:raw', function() {
    return del(dest + "/cookie-banner.js");
});

gulp.task('raw', ['clean:raw'], function() {
    return gulp.src([
        src + '/cookie-banner.js'
    ], {
        base: '.'
    }).pipe(concat('cookie-banner.js'))
      .pipe(gulp.dest(dest));
});

gulp.task('clean:minify', function() {
    del(dest + "/cookie-banner.min.js");
    return del(dest + "/cookie-banner.min.js.map");
});

gulp.task('minify', ['clean:minify'], function() {
    return gulp.src([
        src + '/cookie-banner.js'
    ], {
        base: '.'
    }).pipe(myPlumber())
        .pipe(sourcemaps.init())
        .pipe(concat('cookie-banner.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dest));
});

gulp.task('clean:package', function() {
    del(dest + "/cookie-banner.pkgd.min.js");
    return del(dest + "/cookie-banner.pkgd.min.js.map");
});

gulp.task('package', ['clean:package'], function() {
    return gulp.src([
        bower + '/jquery/dist/jquery.slim.min.js',
        bower + '/js-cookie/src/js.cookie.js',
        src + '/cookie-banner.js'
    ], {
        base: '.'
    }).pipe(myPlumber())
        .pipe(sourcemaps.init())
        .pipe(concat('cookie-banner.pkgd.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dest));
});

gulp.task('clean', ['clean:raw', 'clean:minify', 'clean:package']);

gulp.task('build', ['raw', 'minify', 'package']);

gulp.task('watch', function() {
    return gulp.watch(src + '/**', ['raw', 'minify', 'package']);
});

gulp.task('default', function (cb) {
    return runSequence('build', 'watch', cb);
});
