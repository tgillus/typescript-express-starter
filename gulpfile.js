/* eslint-disable @typescript-eslint/no-var-requires */
const gulp = require('gulp');
const zip = require('gulp-zip');
const execa = require('execa');
const path = require('path');
const package = require('./package.json');

function getTmpPath() {
  return path.join(__dirname, '.tmp-build');
}

function artifactPath() {
  return path.join(__dirname, 'deploy');
}

async function clean() {
  await execa('rm', ['-rf', getTmpPath()]);
  await execa('rm', ['-rf', artifactPath()]);
}

async function mkTmp() {
  await execa('mkdir', [getTmpPath()]);
}

async function clone() {
  const { url: repoUrl } = package.repository;
  await execa('git', ['clone', repoUrl, getTmpPath()]);
}

async function installAllDependencies() {
  process.chdir(getTmpPath());
  await execa('npm', ['install']);
}

async function build() {
  process.chdir(getTmpPath());
  await execa('npm', ['run', 'build']);
}

async function cleanDependencies() {
  process.chdir(getTmpPath());
  await execa('rm', ['-rf', 'node_modules']);
}

async function installProductionDependencies() {
  process.chdir(getTmpPath());
  await execa('npm', ['install', '--production']);
}

async function buildArtifact() {
  process.chdir(getTmpPath());
  const artifactName = `${package.name}-${package.version}.zip`;
  gulp
    .src(['build/**', 'node_modules/**'], { base: '.' })
    .pipe(zip(artifactName))
    .pipe(gulp.dest(artifactPath()));
}

module.exports = {
  default: gulp.series(
    clean,
    mkTmp,
    clone,
    installAllDependencies,
    build,
    cleanDependencies,
    installProductionDependencies,
    buildArtifact
  ),
  clean,
};
