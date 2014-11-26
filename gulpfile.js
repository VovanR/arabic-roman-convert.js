// See: http://gulpjs.com/

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var mochaPhantomJS = require('gulp-mocha-phantomjs');

gulp.task('lint', function () {
    return gulp
        .src(['./index.js', './test/index-test.js', './gulpfile.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jscs());
});

gulp.task('test', function () {
    return gulp
        .src('./test/index-test.html')
        .pipe(mochaPhantomJS({
            reporter: 'spec',
        }));
});

gulp.task('default', ['lint', 'test']);
