"use strict";
var gulp = require("gulp");
var del = require("del");
var ts = require("gulp-typescript");
var sourcemaps = require('gulp-sourcemaps');

/**
 * Remove build directory.
 */
gulp.task('clean', function (cb) {
    return del(["build"], cb);
});

/**
 * Copy all resources that are not TypeScript files into build directory.
 */
gulp.task("resources", ["server", "app", "assets", "images"], function () {
    console.log("Building resources...");
});

/* copy the app core files to the build folder */
gulp.task("app", ['index', 'typescript'], function(){
    return gulp.src(["app/**", "!app/**/*.ts"])
        .pipe(gulp.dest("build/app"));
});
gulp.task('typescript', function() {
	var tsProject = ts.createProject("tsconfig.json");

	return tsProject.src().pipe(tsProject())
		.js.pipe(gulp.dest("app"));
});
/* get the index file to the root of the build */
gulp.task("index", function(){
    return gulp.src(["index.html", "systemjs.config.js"])
        .pipe(gulp.dest("build"));
});
/* copy node server to build folder */
gulp.task("server", function () {
    return gulp.src(["index.js", "package.json"], { cwd: "server/**" })
        .pipe(gulp.dest("build"));
});
/* styles and other assets */
gulp.task("assets", function(){
    return gulp.src(["styles.css"])
        .pipe(gulp.dest("build"));
});
gulp.task("images", function(){
	return gulp.src(["images/**"])
		.pipe(gulp.dest("build/images"));
});
/**
 * Copy all required libraries into build directory.
 */
gulp.task("libs", function () {
    return gulp.src([
        'systemjs/dist/system-polyfills.js',
        '@angular/core/bundles/core.umd.js',
        '@angular/common/bundles/common.umd.js',
		'@angular/compiler/bundles/compiler.umd.js',
		'@angular/platform-browser/bundles/platform-browser.umd.js',
		'@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
		'@angular/http/bundles/http.umd.js',
		'@angular/router/bundles/router.umd.js',
		'@angular/forms/bundles/forms.umd.js',
		'angular-in-memory-web-api/*.js',
        'systemjs/dist/system.src.js',
        'rxjs/**/*.js',
		'client/shim.min.js',
		'zone.js/dist/zone.js',
		'reflect-metadata/Reflect.js',
		'bootstrap/dist/**/*',
		'jquery/dist/jquery.min.js'
    ], { cwd: "node_modules/**" }) /* Glob required here. */
        .pipe(gulp.dest("build/node_modules"));
});
/**
 * Build the project.
 */
gulp.task("default", ['resources', 'libs'], function () {
    console.log("Building the project ...");
});

