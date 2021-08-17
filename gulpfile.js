/* eslint-disable @typescript-eslint/no-var-requires */
const gulp = require('gulp');
const zip = require('gulp-zip');
const execa = require('execa');
const path = require('path');
const package = require('./package.json');
const deploy = require('./deploy.config');

function tmpBuildPath() {
  return path.join(__dirname, '.tmp-build');
}

function artifactBuildPath() {
  return path.join(__dirname, 'deploy');
}

async function rmTmpBuildPath() {
  await execa('rimraf', [tmpBuildPath()]);
}

async function rmArtifactBuildPath() {
  await execa('rimraf', [artifactBuildPath()]);
}

async function mkTmpBuildDir() {
  await execa('mkdir', ['-p', tmpBuildPath()]);
}

async function cwdTmpBuildDir() {
  process.chdir(tmpBuildPath());
}

async function clone() {
  const { url } = package.repository;
  await execa('git', ['clone', url, '-b', deploy.branch(), tmpBuildPath()]);
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

async function buildDeploymentArtifact() {
  const artifactName = `${package.name}-${package.version}.zip`;
  gulp
    .src(['build/**', 'node_modules/**'], { base: '.' })
    .pipe(zip(artifactName))
    .pipe(gulp.dest(artifactBuildPath()));
}

gulp.task('clean', gulp.parallel(rmTmpBuildPath, rmArtifactBuildPath));
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
    buildDeploymentArtifact
  )
);
gulp.task('default', gulp.task('build'));
