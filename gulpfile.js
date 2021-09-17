/** If I change the commonJS to ESModule, the terminal shows 'Cannot use import statement outside a module', idk how to fix it */
const { task, src, dest, watch, series, parallel } = require('gulp');
const plugins = require('gulp-load-plugins')();
const mode = process.env.mode;
const tsconfig = {
  module: 'esnext',
  target: 'es5'
};

/** remove dist */
function clean() {
  return src('./dist', { allowEmpty: true }).pipe(plugins.clean());
}

/** Compile ts under pages*/
function compilingKylin() {
  return src('./src/**/*.ts')
    .pipe(plugins.newer('./dist'))
    .pipe(plugins.typescript(tsconfig))
    .pipe(plugins.if(mode === 'production', plugins.uglify()))
    .pipe(dest('./dist'));
}

function showMessage(type) {
  return function message(cb) {
    // Use timer ensure console shows in the end
    switch (type) {
      case 'development':
        setTimeout(() => console.log('\033[42;30m DONE \033[40;32m Compiled successfully, enjoy coding~\033[0m'));
        break;
      case 'production':
        setTimeout(() => console.log('\033[42;30m DONE \033[40;32m Build successfully, enjoy deploying~\033[0m'));
        break;
      case 'watch':
        setTimeout(() => console.log('\033[42;30m DONE \033[40;32m Compiled successfully, keep coding~\033[0m'));
        break;
    }
    cb();
  };
}

function watcher(cb) {
  if (mode === 'development') {
    watch('./src/**/*.ts', series(compilingKylin, showMessage('watch')));
  }
  cb();
}

task(
  'default',
  series(
    clean,
    parallel(compilingKylin),
    watcher,
    showMessage(mode)
  )
);
