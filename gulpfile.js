// pull in Node Modules needed for gulp tasks
var gulp = require('gulp');
var stylus = require('gulp-stylus');
var browserSync = require('browser-sync').create();
// pull in plugins used by stylus
var jeet = require('jeet');
var rupture = require('rupture');
var nib = require('nib');
var typographic = require('typographic');
// module to clean build dir
var del = require('del');
// helper module for default gulp task
var runSequence = require('run-sequence');

// move html to build dir
gulp.task('html', function(){
  return gulp.src('**/*.html')
  .pipe(gulp.dest('./build'));
});

// compile stylus files to css
gulp.task('styles', function(){
  return gulp.src('stylus/styles.styl')
    .pipe(stylus(
      {
        // change the compress value to 'true' to minify css output
        compress: false,
        // the 'use' option makes the following plugins available
        use: [jeet(), rupture(), nib(), typographic()]
      }
    ))
    .pipe(gulp.dest('./build/css'));
});

// initialize browser-sync server
gulp.task('serve', function() {
  browserSync.init({
    server : {
      baseDir : './build'
    }
  });
});

// clean build dir
gulp.task('clean', function(cb) {
  del(['./build/**/*'], cb);
});

// watch files for changes
gulp.task('watch', function() {
  gulp.watch('stylus/**/*.styl', ['styles']);
  gulp.watch('**/*.html', ['html']);
  gulp.watch('build/**/*', browserSync.reload);
});

// default gulp task
gulp.task('default', function(cb) {
  runSequence('clean', 'html', 'styles', 'serve', 'watch');
});
