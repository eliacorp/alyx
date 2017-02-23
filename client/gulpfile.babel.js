import gulp from "gulp";
import browserify from "browserify";
import source from "vinyl-source-stream";
import sass from "gulp-ruby-sass";
import buffer from 'vinyl-buffer';
import uglify from 'gulp-uglify';
import cleanCSS from 'gulp-clean-css';
import concat from 'gulp-concat';


gulp.task('connect', function () {
	connect.server({
		root: 'public',
		port: 9000
	})
})


gulp.task("default", ["transpile"]);

gulp.task("transpile", () => {

  return browserify("src/app.js")
    .transform("babelify")
    .bundle()
    .on("error", function(error){
      console.error( "\nError: ", error.message, "\n");
      this.emit("end");
    })
    .pipe(source("bundle.min.js"))
		.pipe(buffer())
		.pipe(uglify())
    .pipe(gulp.dest("dist"));

});

gulp.task("sass", function() {
	return sass('sass/*.scss')
	.pipe(cleanCSS({compatibility: 'ie8'}))
	.pipe(concat('style.min.css')) // this is what was missing
  .pipe(gulp.dest('dist'))
})



gulp.task("watch", ["transpile"], () => {
  gulp.watch("src/**/*", ["transpile"]);
  gulp.watch('sass/**/*', ['sass'])
});
