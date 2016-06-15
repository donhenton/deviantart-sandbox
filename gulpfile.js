/**
 * 
 * @type Module gulp|Module gulp
 * 
 * 
 * gulp dev --production
 * gulp release --production
 * will contingently minify js, no flag leaves js assembled.
 * 
 */


var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var streamify = require('gulp-streamify');
var uglifycss = require('gulp-uglifycss');
var del = require('del');
var reactify = require('reactify');
var babelify = require('babelify');
var browserify = require('browserify');
var watch = require('gulp-watch');
var tap = require('gulp-tap');
var gutil = require('gulp-util');
var server = require('gulp-server-livereload');
var livereload = require('gulp-livereload');
var gulpsync = require('gulp-sync')(gulp);
var gulpif = require("gulp-if");
var argv = require('yargs').argv;
var rename = require("gulp-rename");


var notify = require("./src/build_utils/build_utils").notify;
var targetLocation = './target/';
/* livereload loads this page you only get one  
 * 
 * the chrome livereload plugin needs to be installed
 * 
 */
var pageURL = 'http://localhost:8080';

var SASS_FILES = './src/sass/**/*.scss';
//var WATCH_JS = ['./src/html/js/**/*.js']; //used to watch non react js source
var WATCH_REACT_JS = ['./src/react/**/*.js']; //used to watch non react js source
var MAIN_HTML_FILE = ['./src/html/index.html','./src/html/cssdemo.html'];

function Bundle() {

    var Bundler = browserify({
        entries: './src/react/app.js',
        transform: [["babelify", {"presets": ["es2015","react"]}]],
        extensions: ['.js'],
        debug: true,
        cache: {},
        packageCache: {},
        fullPaths: true
    }); 
    return Bundler
            .bundle()
            .on('error', notify);
}

//gulp.task('copy-my-js', function () {
////copy other non reactg js files that may be modified
//    return gulp.src(WATCH_JS).pipe(gulp.dest(targetLocation+"js"))
// 
//
//});

gulp.task('copy-html', function () {

    //copy the main html file
    // base allows to copy the folders above the file
    // return gulp.src(MAIN_HTML_FILE,{'cwd': './src/html','base':'./..'} )
    return gulp.src(MAIN_HTML_FILE).pipe(gulp.dest(targetLocation))
           
 

});

gulp.task('clean', function (  ) {

    del(['target']);

});

gulp.task('build', function () {
    Bundle()
            .pipe(source('bundle.js'))
            .pipe(gulpif(argv.production, streamify(uglify())))
       //     .pipe(gulpif(argv.production, rename({suffix: '.min'})))
            .pipe(gulp.dest(targetLocation+'js'))
             
    ;
});
var sassProcess =
        function () {

            return gulp.src(SASS_FILES)
                    .pipe(sass().on('error', sass.logError))
                    .pipe(concat('style.css'))
                  //  .pipe(uglifycss())
                    .pipe(gulp.dest(targetLocation+'css'));
        };

gulp.task('sass', function () {
    sassProcess();

});

gulp.task('copy-assets', function () {
    
      gulp.src(['./src/html/css/**/*','./src/html/css/*.css'] )
              .pipe(gulp.dest(targetLocation+'/css'));

      gulp.src(['./src/html/bower_components/jquery/dist/jquery.min.js',
      './src/html/bower_components/jquery-ui/jquery-ui.min.js'] )
              .pipe(gulp.dest(targetLocation+'/js'));        
 
    
    
});


gulp.task('watch', function () {

    watch(SASS_FILES, function (events, done) {

        sassProcess()
                .on('finish', function ( ) {
                    gutil.log("processing change in css");
                    livereload.reload(pageURL);
                });

    });

//    watch(WATCH_JS, function (events, done) {
//
//        gulp.start('copy-my-js').on('finish', function ( ) {
//                gutil.log("processing change in my css");
//                livereload.reload(pageURL);
//               // cb();
//            });;
//    });
    
    watch(WATCH_REACT_JS, function (events, done) {

        gulp.start('build')
            .on('finish', function ( ) {
                gutil.log("processing change in my build");
                livereload.reload(pageURL);
               // cb();
            });;
    });


    watch(MAIN_HTML_FILE, function (events, done) {
        gutil.log("starting html change");
        gulp.start('copy-html')
            .on('finish', function ( ) {
                gutil.log("processing change in my html");
                livereload.reload(pageURL);
               // cb();
            });;
    });

});

 
gulp.task('serve', function (done) {
    livereload.listen();
    gulp.src('target')
            .pipe(server({
                livereload: {
                    enable: true
                },
                host: '127.0.0.1',
                port: 8080,
                defaultFile: 'index.html',
                directoryListing: false,
                open: true
            }));
});
gulp.task('release', gulpsync.sync(['clean','build', 'sass']));
gulp.task('dev',     gulpsync.sync(['clean','build', 'sass','copy-assets', 'copy-html', 'watch', 'serve']));