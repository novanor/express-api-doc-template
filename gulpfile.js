/* global __dirname: true*/
'use strict';
const gulp = require('gulp');
const mainBowerFiles = require('main-bower-files');
const fs = require('fs');
const babel = require('gulp-babel');
const watch = require('gulp-watch');
const logger = require('gulp-logger');
const _ = require('lodash');
const twigCompile = require('twig-compile');
const rename = require('gulp-rename');
const rjs = require('gulp-requirejs-optimize');
const concat = require('gulp-concat');
const modifyFile = require('gulp-modify-file');
const uglify = require('gulp-uglify');


const config = {
  js:    {
    paths:     {
      'frontend/**/*.js':             '',
      'app/entryPoint/enrtyPoint.js': '',
    },
    DEST_PATH: './public',
  },
  views: {
    paths:     './templates/**/*.twig',
    DEST_PATH: './public/templates',
  },
  html:  {
    paths:     './templates/**/*.html',
    DEST_PATH: './public/templates',
  },
  cp:    {
    files: {
      'node_modules/twig/twig.min.js': 'twig',
    },
  },
  css:   {
    paths:     {
      './bower_components/bootstrap/dist/css/bootstrap.css': '',
    },
    DEST_PATH: './public/css',
  },
  build: {
    rjs:    {
      entryPoint: './public/enrtyPoint.js',
      options:    {
        mainConfigFile: './public/config/requirejs.js',
        out:            'optimized-main.js',
      },
      DEST_PATH:  './public',
    },
    concat: {
      files:     [
        './public/require.js',
        './public/config/requirejs.js',
        './public/optimized-main.js',
      ],
      name:      'main.js',
      options:   {newLine: ';\n'},
      DEST_PATH: './public',
    },
  },
};

// Tasks for watch
gulp.task('watch:js', () =>
  _.each(config.js.paths, (folder, wildcard) => {
    watch(wildcard, {ignoreInitial: false})
      .pipe(babel())
      .pipe(logger({showChange: true}))
      .pipe(gulp.dest(`${config.js.DEST_PATH}/${folder}`));
  })
);

gulp.task('watch:twig', () =>
  watch(config.views.paths)
    .pipe(logger({showChange: true}))
    .pipe(twigCompile({
      module: 'amd',
      twig:   'twig',
    }))
    .pipe(gulp.dest(config.views.DEST_PATH)));

gulp.task('watch:html', () =>
  watch(config.html.paths)
    .pipe(logger({showChange: true}))
    .pipe(gulp.dest(config.html.DEST_PATH)));

// Tasks for default. Also ran on build.
gulp.task('bower', () =>
  gulp.src(mainBowerFiles())
    .pipe(gulp.dest('./public')));

gulp.task('babel', () =>
  _.each(config.js.paths, (folder, wildcard) => {
    gulp.src(wildcard)
      .pipe(babel())
      .pipe(gulp.dest(`${config.js.DEST_PATH}/${folder}`));
  })
);

gulp.task('views', () =>
  gulp.src(config.views.paths)
    .pipe(twigCompile({
      module: 'amd',
      twig:   'twig',
    }))
    .pipe(gulp.dest(config.views.DEST_PATH)));

gulp.task('html', () =>
  gulp.src(config.html.paths)
    .pipe(gulp.dest(config.html.DEST_PATH)));

gulp.task('css', () =>
  _.each(config.css.paths, (folder, wildcard) => {
    gulp.src(wildcard)
      .pipe(gulp.dest(`${config.css.DEST_PATH}/${folder}`));
  })
);

gulp.task('cp', () =>
  _.each(config.cp.files, (name, path) =>
    gulp.src(path)
      .pipe(logger({showChange: true}))
      .pipe(rename((f) => (f.basename = name)))
      .pipe(gulp.dest(config.js.DEST_PATH))
  )
);

// Tasks for build
gulp.task('build:rjs', ['default'], () =>
  gulp.src(config.build.rjs.entryPoint)
    .pipe(rjs(config.build.rjs.options))
    .pipe(gulp.dest(config.build.rjs.DEST_PATH))
);

gulp.task('build:concat', ['build:rjs'], () =>
  gulp.src(config.build.concat.files)
    .pipe(uglify())
    .pipe(concat(config.build.concat.name))
    .pipe(gulp.dest(config.build.concat.DEST_PATH))
);

gulp.task('build:html', ['build:concat'], () => {
  const mainJs = fs.readFileSync('./public/main.js');
  const bootstrapCss = fs.readFileSync('./bower_components/bootstrap/dist/css/bootstrap.min.css');
  return gulp.src('./public/templates/template.html')
    .pipe(modifyFile((content) =>
       content
        .replace("'{{MAIN_SCRIPT}}'", mainJs.toString())
        .replace("'{{BOOTSTRAP}}'", bootstrapCss.toString())
    ))
    .pipe(gulp.dest('./compiled'));
});

gulp.task('watch', ['watch:js', 'watch:twig', 'watch:html']);
gulp.task('default', ['bower', 'babel', 'views', 'html', 'css', 'cp']);
gulp.task('build', ['build:html']);
