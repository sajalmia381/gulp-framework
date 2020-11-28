// Dependencies
import { src, dest } from 'gulp';
import plumber from 'gulp-plumber';
import errorHandler from '../util/errorHandler.js';
import beautify from 'gulp-jsbeautifier';
import twig from 'gulp-twig';
// import inject from 'gulp-inject';
// import fs from 'fs';

// Config
import { paths } from "../config";
import { data } from '../data'

// Task
export function templates() {
  // 'dist/plugins/jquery/**/*.js', 'dist/plugins/bootstrap/**/*.js','dist/plugins/**/*.js', 'dist/plugins/bootstrap/**/*.css', 'dist/plugins/**/*.css'
  // var sources = src(['./dist/plugins/bootstrap/dist/css/bootstrap.min.css', './dist/plugins/**/*.js'], { read: false, addRootSlash: false, ignorePath: 'dist/'});
  // var injectOptions = {
  //     addRootSlash: false,
  //     ignorePath: 'dist/'
  // };
  return src(paths.templates.src)
    // .pipe(inject(sources, injectOptions))
    .pipe(plumber({errorHandler}))
    .pipe(twig({data}))
    .pipe(beautify({ indent_size: 2 }))
    .pipe(dest(paths.templates.dest))
}
