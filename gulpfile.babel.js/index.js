/*
 * @title gulpfile.babel.js
 * @description A directory file loader to include all the gulp tasks
 */

// Tasks
import { build } from './tasks/build';
import { watch } from './tasks/watch';
import { dev } from './tasks/dev';

exports.build = build;
exports.watch = watch;
exports.default = dev;

// exports.default = () => {
//     console.log('working')
// }