const fs = require('fs').promises
const path = require('path')
const Jimp = require('jimp')
const imagemin = require('imagemin')
const imageminPngquant = require('imagemin-pngquant')

module.exports = async function(file, outdir, width, height, options = {}) {
  const { quality = '65-80', posterize = 0 } = options

  const outpath = path.join(outdir, path.basename(file))

  const img = await Jimp.read(file)

  if (
    width !== undefined &&
    width < img.bitmap.width &&
    height !== undefined &&
    height < img.bitmap.height
  ) {
    img.scaleToFit(width, height)
  } else if (width !== undefined && width < img.bitmap.width) {
    img.resize(width, Jimp.AUTO)
  } else if (height !== undefined && height < img.bitmap.height) {
    img.resize(Jimp.AUTO, height)
  }

  const resizedBuffer = await img.getBufferAsync(Jimp.MIME_PNG)

  const optimizedBuffer = await imagemin.buffer(resizedBuffer, {
    plugins: [imageminPngquant({ quality, posterize })]
  })

  await fs.writeFile(outpath, optimizedBuffer)
}
