// Dependencies
import { src, dest } from 'gulp';
import plumber from 'gulp-plumber';
import npmMainfiles from "gulp-npm-mainfiles";
// import gulpIf from 'gulp-if';
// import concat from 'gulp-concat';
import errorHandler from '../util/errorHandler.js';
// import { isProd } from '../util/env';

// Config
import { paths } from "../config";

// Task
export function pluginFiles() {
  return src(npmMainfiles(), { base: "./node_modules" })
    .pipe(plumber({errorHandler}))
    // .pipe(gulpIf(isProd, concat('plugins.js')))
    .pipe(dest(paths.plugins.dest));
}
