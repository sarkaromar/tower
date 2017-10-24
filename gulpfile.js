// main require var
var gulp = require('gulp');
// others require plugins
var sass          = require('gulp-sass'),
    watch         = require('gulp-watch'),
    browserSync   = require('browser-sync').create(),
    useref        = require('gulp-useref'),
    uglify        = require('gulp-uglify'),
    plumber       = require('gulp-plumber'),
    autoprefixer  = require('gulp-autoprefixer'),
    cssmin       = require('gulp-cssmin'),
    rename       = require('gulp-rename'),
    gulpIf        = require('gulp-if');


    // task start

    gulp.task('browserSync', function() {
      browserSync.init({
        server: {
          baseDir: 'dist'
        },
      })
    });

    gulp.task('sass', function(){
      return gulp.src('app/sass/*.scss')
        .pipe(sass())
        .pipe(plumber())
        .pipe(autoprefixer({
          browsers: ['Android >= 2.1',
                     'Chrome >= 21',
                     'Edge >= 12',
                     'Explorer >= 7',
                     'Firefox >= 17',
                     'Opera >= 12.1',
                     'Safari >= 6.0'],
          cascade: false}))
        .pipe(gulp.dest('app/css'))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({
          stream: true
        }))
    });

    gulp.task('watch:sass', function () {
      gulp.watch('app/sass/*.scss', ['sass']); 
    });

    // Watch
    // gulp.task('watch', function(){
    //   gulp.watch("app/*.html")
    //   .pipe(browserSync.reload({
    //     stream: true
    //   }));
    // });

    gulp.task('vendors', function() {
      // bootstrap
      gulp.src('node_modules/bootstrap/dist/**/*.min.css')
      .pipe(gulp.dest('dist/vendors'));
      gulp.src('node_modules/bootstrap/dist/**/*.min.js')
      .pipe(gulp.dest('dist/vendors'));
      //jquery
      gulp.src('node_modules/jquery/dist/*.min.js')
      .pipe(gulp.dest('dist/vendors/jquery'));
      //jquery
      gulp.src('app/js/*.js')
      .pipe(gulp.dest('dist/js'));
      //vendor css
      gulp.src('app/css/vendor/*.css')
      .pipe(gulp.dest('dist/css'));

    });
// default task
gulp.task('default', ['sass', 'watch:sass', 'vendors', 'browserSync']);
