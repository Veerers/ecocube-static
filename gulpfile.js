var gulp = require('gulp');
var bower = require('bower');
var minifyCss = require('gulp-minify-css');
var nib = require('nib');
var stylus = require('gulp-stylus');
var rename = require('gulp-rename');

gulp.task('bower', function (next) {
    bower.commands.install([], {}, {
            cwd: './static'
        })
        .on('end', function (data) {
            console.dir(data);
            next();
        });
});

gulp.task('css', ['bower'], function () {
    return gulp.src('static/styles/index.styl')
        .pipe(stylus({
            errors: true,
            use: [nib()]
        }))
        .pipe(rename('build.css'))
        .pipe(minifyCss({
            processImport: true,
            keepSpecialComments: 0
        }))
        .pipe(gulp.dest('static'));
});

gulp.task('static', [
    'css',
    'bower'
]);

gulp.task('watch', ['static'], function () {
    gulp.watch('static/styles/**', ['css']);
});

gulp.task('default', ['watch']);
