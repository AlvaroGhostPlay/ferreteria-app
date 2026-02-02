const { src, dest, watch } = require("gulp");
const sassCompiler = require("sass");
const sass = require("gulp-sass")(sassCompiler);

function styles() {
  return src("src/scss/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(dest("src/css/"));
}

function dev() {
  watch("src/scss/**/*.scss", styles);
}

exports.styles = styles;
exports.dev = dev;