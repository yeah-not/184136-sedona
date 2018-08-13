"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var rename = require("gulp-rename");
var sequence = require('gulp-sequence');
var clean = require('gulp-clean');

var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var mqpacker = require("css-mqpacker");
var inlinesvg = require("postcss-inline-svg");
var cssnano = require('gulp-cssnano');

var svgmin = require('gulp-svgmin');
var svgstore = require('gulp-svgstore');
var imagemin = require('gulp-imagemin');

var ghpages = require('gh-pages');
var server = require("browser-sync").create();

gulp.task("css", function() {
  gulp.src("sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      inlinesvg(),
      autoprefixer({browsers: [
        "last 2 versions",
      ]}),
      mqpacker({
        sort: true,
      })
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(cssnano())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("svg-min", function() {
  return gulp.src("build/img/**/*.svg")
    .pipe(svgmin())
    .pipe(gulp.dest("build/img"));
});

gulp.task("svg-sprite", function() {
  return gulp.src("build/img/svg-sprite/*.svg")
    .pipe(svgstore())
    .pipe(gulp.dest("build/img"));
});

gulp.task("images", function() {
  return gulp.src("build/img/**/*.{jpg,gif,png}")
    .pipe(imagemin({
      progressive: true,
    }))
    .pipe(gulp.dest("build/img"));
});

gulp.task("clean", function () {
  return gulp.src('build', {read: false})
    .pipe(clean());
});

gulp.task("copy", function() {
  return gulp.src([
    "fonts/**/*.{woff,woff2}",
    "img/**",
    "js/**",
    "*.html",
  ], {
    base: "."
  })
    .pipe(gulp.dest("build"));
});

gulp.task("html:copy", function() {
  return gulp.src("*.html")
    .pipe(gulp.dest("build"));
});

gulp.task("html:update", ["html:copy"], function(done) {
  server.reload();
  done();
});

gulp.task("deploy", function (fn) {
  ghpages.publish("build", fn);
});

gulp.task("build", function(fn) {
  sequence(
    "clean",
    "copy",
    "css",
    "svg-min",
    "svg-sprite",
    "images",
    fn
  );
});

gulp.task("serve", function() {
  server.init({
    server: "./build/",
    // notify: false,
    // open: true,
    // cors: true,
    // ui: false
  });

  gulp.watch("sass/**/*.{scss,sass}", ["css"]);
  gulp.watch("*.html", ["html:update"]);
});
