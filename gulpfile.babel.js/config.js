/*
 * @title Config
 */

// Paths
export const paths = {
    src: './src',
    dest: './dist',
    deploy: './dist/**/*',
    styles: {
      src: 'src/styles/styles.scss',
      watch: 'src/styles/**/*.scss',
      modules: 'src/modules/**/*.scss',
      dest: 'dist/css',
      lint: 'src/styles/**/*.s+(a|c)ss'
    },
    scripts: {
      src: './src/scripts/app.js',
      watch: 'src/scripts/**/*.js',
      modules: 'src/modules/**/*.js',
      dest: 'dist/js',
    },
    templates: {
      src: 'src/templates/pages/*.{twig,html}',
      watch: 'src/templates/**/*.{twig,html}',
      modules: 'src/modules/**/*.{twig,html}',
      dest: 'dist/'
    },
    assets: {
      src: ['src/assets/**/*'],
      dest: 'dist/assets'
    },
    images: {
      src: ['src/images/**/*'],
      dest: 'dist/images'
    },
    fonts: {
      src: ['src/fonts/**/*'],
      dest: 'dist/fonts'
    },
    plugins: {
      src: 'src/plugins/**/*',
      dest: 'dist/plugins'
    },
    copy: {
      src: 'src/robots.txt',
      dest: 'dist/'
    }
  };
  