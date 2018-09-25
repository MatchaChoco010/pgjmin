const path = require('path')
const util = require('util')
const glob = util.promisify(require('glob'))
const flat = require('array.prototype.flat')

const png = require('./pgjminPng.js')
const gif = require('./pgjminGif.js')
const jpg = require('./pgjminJpg.js')

module.exports = async function(patterns, outdir, width, height, options) {
  const paths = flat(await Promise.all(patterns.map(pattern => glob(pattern))))

  const pngFiles = paths.filter(p => path.extname(p) === '.png').map(file =>
    png(file, outdir, width, height, {
      quality: options.pngquantQuality,
      posterize: options.pngquantPosterize
    })
  )

  const gifFiles = paths.filter(p => path.extname(p) === '.gif').map(file =>
    gif(file, outdir, width, height, {
      optimize: options.gifsicleOptimize,
      colors: options.gifsicleColors
    })
  )

  const jpgFiles = paths
    .filter(p => /\.(jpeg)|(jpg)/.test(path.extname(p)))
    .map(file =>
      jpg(file, outdir, width, height, {
        quality: options.mozjpegQuality
      })
    )

  await Promise.all([...pngFiles, ...gifFiles, ...jpgFiles])

  console.log('Complete!')
}
