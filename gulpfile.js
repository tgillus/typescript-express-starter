/* eslint-disable @typescript-eslint/no-var-requires */
const gulp = require('gulp');
const zip = require('gulp-zip');
const execa = require('execa');
const path = require('path');
const package = require('./package.json');
const deploy = require('./deploy.config');

function getTmpBuildPath() {
  return path.join(__dirname, '.tmp-build');
}

function buildArtifactPath() {
  return path.join(__dirname, 'deploy');
}

async function clean() {
  await execa('rm', ['-rf', getTmpBuildPath()]);
  await execa('rm', ['-rf', buildArtifactPath()]);
}

async function mkTmpBuildDir() {
  await execa('mkdir', ['-p', getTmpBuildPath()]);
}

async function cwdTmpBuildDir() {
  process.chdir(getTmpBuildPath());
}

async function clone() {
  const { url } = package.repository;
  await execa('git', ['clone', url, '-b', deploy.branch(), getTmpBuildPath()]);
}

async function installAllDependencies() {
  await execa('npm', ['install']);
}

async function build() {
  await execa('npm', ['run', 'build']);
}

async function cleanDependencies() {
  await execa('rm', ['-rf', 'node_modules']);
}

async function installProductionDependencies() {
  await execa('npm', ['install', '--production']);
}

async function buildDeployArtifact() {
  const artifactName = `${package.name}-${package.version}.zip`;
  gulp
    .src(['build/**', 'node_modules/**'], { base: '.' })
    .pipe(zip(artifactName))
    .pipe(gulp.dest(buildArtifactPath()));
}

gulp.task('clean', clean);
gulp.task(
  'build',
  gulp.series(
    gulp.task('clean'),
    mkTmpBuildDir,
    cwdTmpBuildDir,
    clone,
    installAllDependencies,
    build,
    cleanDependencies,
    installProductionDependencies,
    buildDeployArtifact
  )
);
gulp.task('default', gulp.task('build'));
