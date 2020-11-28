/*
 * @title Build
 * @description A task to compile production code.
 */

// Dependencies
import { series, parallel } from 'gulp';

// Tasks
import { clean } from './clean';
import { pluginFiles } from './pluginFiles';
import { styles } from './styles';
import { scripts } from './scripts';
import { templates } from './templates';
import { images, fonts } from './assets';
import { copy } from './copy';

export const build = series(
  clean,
  pluginFiles,
  parallel(styles, scripts, templates, fonts, images, copy)
);