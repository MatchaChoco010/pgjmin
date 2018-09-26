# pgjmin

a cli tool for minify png gif and jpg

## Install

```
$ npm install -g git://github.com/MatchaChoco010/pgjmin.git
```

## Usage

```
$ pgjmin [options] <files>
```

```
$ pgjmin -o out/ "*.jpg"
$ pgjmin -o out/ "*.{png,jpg}"
$ pgjmin -o out/ -w 300 -h 300 "*.gif" "*.png"
$ pgjmin -o out/ --pngquant-quality 65-80 --pngquant-posterize 4 "*.png"
$ pgjmin -o out --mozjpeg-quality 0 --pngquant-posterize 4 --gifsicle--colors 64 --gifsicle-optimize 3 *.png *.gif *.jpg
```

### Option

- -o, --out-dir

[required]

output directory path.

- -w, --width

max width

- -h, --height

max height

- --pngquant-quality

> Instructs pngquant to use the least amount of colors required to meet or exceed the max quality. If conversion results in quality below the min quality the image won't be saved.

> Min and max are numbers in range 0 (worst) to 100 (perfect), similar to JPEG.

- --pngquant-posterize

> Reduce precision of the palette by number of bits. Use when the image will be displayed on low-depth screens (e.g. 16-bit displays or compressed textures).

- --gifsicle-optimize

> Select an optimization level between 1 and 3.
>
> > The optimization level determines how much optimization is done; higher levels take longer, but may have better results.
>
> 1. Stores only the changed portion of each image.
> 2. Also uses transparency to shrink the file further.
> 3. Try several optimization methods (usually slower, sometimes better results)

- --gifsicle-colors

> Reduce the number of distinct colors in each output GIF to num or less. Num must be between 2 and 256.

- --mozjpeg-quality

> Compression quality, in range 0 (worst) to 100 (perfect).
