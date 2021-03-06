// Build automation
// Require sudo npm install -g gulp
// For dev, initiate watch by executing either `gulp` or `gulp watch`

var gulp = require('gulp'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    uglify = require('gulp-uglify'),
    shell = require('gulp-shell'),
    rename = require('gulp-rename'),
    exec = require('child_process').exec;

var path = {
  mainJs: './src/main/js/main_html5.js',
  flashJs: './src/osmf/js/osmf_flash.js'
};

var main_html5_fn = function() {
  uglify_fn(path.mainJs);
}

var osmf_fn = function() {
  uglify_fn(path.flashJs);
}

var uglify_fn = function(srcFile) {
  var b = browserify({
    entries: srcFile,
    debug: false,
  });

  b.bundle()
    .pipe(source(getFileNameFromPath(srcFile)))
    .pipe(buffer())
    .pipe(gulp.dest('./build/'))
    .pipe(uglify())
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(gulp.dest('./build/'));
}

var getFileNameFromPath = function(path) {
  var start = path.lastIndexOf('/') + 1;
  return path.substring(start);
}

// Dependency task
gulp.task('init_module', function(callback) {
  exec("git submodule update --init && cd html5-common && npm install && cd ..", function(err) {
    if (err) return callback(err);
    callback();
  });
});

gulp.task('build_flash', function(callback) {
  exec("ant -file build_flash.xml", function(err) {
    if (err) console.log("Error occured in building osmf plugin : " + err);
    else osmf_fn();
    callback();
  });
});

gulp.task('build', ['init_module', 'build_flash'], function() {
  main_html5_fn();
});

gulp.task('test', shell.task(['jest --verbose']));

// Initiate a watch
gulp.task('watch', function() {
  gulp.watch("src/**/*", ['build']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['build']);

// Generate documentation
gulp.task("docs", shell.task("./node_modules/.bin/jsdoc -c ./jsdoc_conf.json"));

