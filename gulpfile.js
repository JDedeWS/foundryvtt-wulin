const gulp = require("gulp");
const prefix = require("gulp-autoprefixer");
const sass = require("gulp-sass")(require('sass'));
const browserSync = require("browser-sync");
var rename = require('gulp-rename');

/* ----------------------------------------- */
/*  Compile SCSS
/* ----------------------------------------- */

const SYSTEM_SCSS = ["styles/scss/bundle.scss"];

function buildStyles() {
    let options = {
        outputStyle: "compressed",
    };
    return gulp.src(SYSTEM_SCSS)
        .pipe(sass(options).on('error', sass.logError))
        .pipe(rename('wulin.css'))
        .pipe(gulp.dest("styles"));

};
const css = gulp.series(buildStyles);

/* ----------------------------------------- */
/*  Watch Updates
/* ----------------------------------------- */

function watchUpdates() {      
    gulp.watch('styles/**/*.scss').on('change', async () => await buildStyles());
}

/* ----------------------------------------- */
/*  BrowserSync
/* ----------------------------------------- */

function bSync() {
  browserSync({
      server: {
          baseDir: "styles",
      },
  });
}

/* ----------------------------------------- */
/*  Export Tasks
/* ----------------------------------------- */

exports.default = gulp.series(buildStyles, watchUpdates, bSync);
exports.css = css;

