// .eleventy.images.js   (ESM)

import { resolve, parse, sep } from 'node:path'
import fs from 'node:fs/promises'
import Image from '@11ty/eleventy-img'

const unsupportedFormats = ['.gif']
const outputDir = './_site/img/'

/* ------------------------------------------------------------ */
/*  Main export — Eleventy will `import` this and call it       */
/* ------------------------------------------------------------ */
export default function (eleventyConfig) {
  /* helper: convert projects/foo/bar.jpg → /img/foo/bar.jpg */
  function relativeToImgPath(relativeFilePath) {
    const [, folder, ...rest] = relativeFilePath.split('/')
    return `/img/${folder}/${rest.join('/')}`
  }

  /* core shortcode */
  async function imageShortcode(inputPath, src, alt, sizes, klass) {
    const file = resolve(inputPath, src)
    const { ext } = parse(src)

    if (unsupportedFormats.includes(ext)) {
      if (alt === undefined) {
        throw new Error(
          `Missing \`alt\` attribute on eleventy-img shortcode from: ${src}`
        )
      }

      const newFile = src.split('/').slice(1).join('/')
      await fs.copyFile(file, `${outputDir}${newFile}`)
      return `<img src="/img/${newFile}" alt="${alt}" class="${klass}" />`
    }

    const metadata = await Image(file, {
      widths: [750, 1300, 1900, 2400, 2700, 3300],
      formats: ['avif', 'jpeg'],
      outputDir
    })

    const imageAttributes = {
      class: klass,
      alt,
      sizes,
      loading: 'lazy',
      decoding: 'async'
    }

    return Image.generateHTML(metadata, imageAttributes)
  }

  /* paired shortcode: {% imagepaired %}{ "thumb": "...", "imgPath": "..." }{% endimagepaired %} */
  eleventyConfig.addPairedShortcode(
    'imagepaired',
    async function (content, alt, sizes, klass) {
      const { thumb: src, imgPath } = JSON.parse(content.trim())
      return imageShortcode(imgPath, src, alt, sizes, klass)
    }
  )

  /* inline shortcode: {% image "foo.jpg", "Alt text" %} */
  eleventyConfig.addShortcode(
    'image',
    async function (src, alt, sizes, klass) {
      const inputPath = this.page.inputPath
        .split('/')
        .slice(0, -1)
        .join(sep)
      return imageShortcode(inputPath, src, alt, sizes, klass)
    }
  )
}
