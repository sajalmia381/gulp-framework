/*
 * @title Assets
 * @description A task to copy assets.
 */

// Dependencies
import { src, dest } from 'gulp';
import plumber from 'gulp-plumber';
import changed from "gulp-changed";
import errorHandler from '../util/errorHandler.js';

// Config
import { paths } from "../config";

// Task
export function assets() {
  return src(paths.assets.src)
    .pipe(plumber({errorHandler}))
    .pipe(changed(paths.assets.dest))
    .pipe(dest(paths.assets.dest));
}


export function images() {
  return src(paths.images.src)
    .pipe(plumber({errorHandler}))
    .pipe(changed(paths.images.dest))
    .pipe(dest(paths.images.dest));
}

export function fonts() {
  return src(paths.fonts.src)
    .pipe(plumber({errorHandler}))
    .pipe(changed(paths.fonts.dest))
    .pipe(dest(paths.fonts.dest));
}