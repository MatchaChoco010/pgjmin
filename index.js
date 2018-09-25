#!/usr/bin/env node

const program = require('commander')
const fs = require('fs')
const path = require('path')

const pkg = require('./package.json')

const pgjmin = require('./pgjmin.js')

program
  .version(pkg.version)
  .usage('[options] <file...>')
  .option('-o, --out-dir <dir>', 'Output directory')
  .option('-w, --width <width>', 'Resize width')
  .option('-h, --height <height>', 'Resize height')
  .option('--pngquant-quality <min-max>', 'pngquant quality')
  .option('--pngquant-posterize <0..4>', 'pngquant posterize')
  .option('--mozjpeg-quality <0..100>', 'mozjpeg quality')
  .option('--gifsicle-optimize <1..3>', 'gifsicle optimize')
  .option('--gifsicle-colors <2..256>', 'gifsicle colors')

program.on('--help', () => {
  console.log('')
  console.log('Examples:')
  console.log('')
  console.log('  $ pgjmin -o out/ "*.jpg"')
  console.log('  $ pgjmin -o out/ "*.{png,jpg}"')
  console.log('  $ pgjmin -o out/ -w 300 "*.gif"')
  console.log('  $ pgjmin -o out/ -h 300 "*.jpeg"')
  console.log('  $ pgjmin -o out/ -w 300 -h 300 "*.gif" "*.png"')
  console.log(
    '  $ pgjmin -o out/ --pngquant-quality 65-80 --pngquant-posterize 4 "*.png"'
  )
  console.log(
    '  $ pgjmin -o out --mozjpeg-quality 0 --pngquant-posterize 4 --gifsicle--colors 64 --gifsicle-optimize 3 *.png *.gif *.jpg'
  )
})

program.parse(process.argv)

const patterns = program.args

if (patterns.length < 1) {
  console.error('file path is required')
  process.exit(1)
}

const outdir = path.join(process.cwd(), program.outDir)

if (outdir === undefined) {
  console.error('output directory is required')
  process.exit(1)
}

if (!fs.existsSync(outdir)) {
  console.error("output directory doesn't exist")
  process.exit(1)
}

if (!fs.statSync(outdir).isDirectory()) {
  console.error('given output directory path is not a directory')
  process.exit(1)
}

let width
if (program.width) {
  width = parseInt(program.width)
  if (isNaN(width)) {
    console.error('width must be integer')
    process.exit(1)
  }
}

let height
if (program.height) {
  height = parseInt(program.height)
  if (isNaN(height)) {
    console.error('height must be integer')
    process.exit(1)
  }
}

const options = {}
options.quantpngQuality = program.pngquantQuality
options.pngquantPosterize = program.pngquantPosterize
options.mozjpegQuality = program.mozjpegQuality
options.gifsicleOptimize = program.gifsicleOptimize
options.gifsicleColors = program.gitsicleColors

pgjmin(patterns, outdir, width, height, options)
