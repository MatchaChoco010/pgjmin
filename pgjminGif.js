const path = require('path')
const util = require('util')
const execFile = util.promisify(require('child_process').execFile)
const gifsicle = require('gifsicle')

module.exports = async function(file, outdir, width, height, options = {}) {
  const { optimize = 3, colors } = options

  const outpath = path.join(outdir, path.basename(file))

  const args = []
  args.push('--output', outpath)

  args.push(`--optimize=${optimize}`)

  if (colors) {
    args.push(`--colors=${colors}`)
  }

  if (width !== undefined && height !== undefined) {
    args.push(`--resize-fit=${width}x${height}`)
  } else if (width !== undefined) {
    args.push(`--resize-fit-width=${width}`)
  } else if (height !== undefined) {
    args.push(`--resize-fit-height=${height}`)
  }

  args.push(file)

  await execFile(gifsicle, args)
}
