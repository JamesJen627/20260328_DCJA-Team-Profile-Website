import { readdir, stat } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const ROOT_DIR = process.cwd()
const INPUT_DIR = path.join(ROOT_DIR, 'public', 'images')
const QUALITY = 78
const SUPPORTED_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp'])

async function collectImageFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const results = []

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      const children = await collectImageFiles(fullPath)
      results.push(...children)
      continue
    }

    const ext = path.extname(entry.name).toLowerCase()
    if (!SUPPORTED_EXTENSIONS.has(ext)) continue
    if (entry.name.endsWith('.optimized.webp')) continue

    results.push(fullPath)
  }

  return results
}

async function optimizeToWebp(filePath) {
  const parsed = path.parse(filePath)
  const outputPath = path.join(parsed.dir, `${parsed.name}.optimized.webp`)
  const before = (await stat(filePath)).size

  await sharp(filePath).rotate().webp({ quality: QUALITY }).toFile(outputPath)

  const after = (await stat(outputPath)).size
  const saved = before - after
  const savedPercent = before === 0 ? 0 : ((saved / before) * 100).toFixed(2)

  return {
    filePath,
    outputPath,
    before,
    after,
    saved,
    savedPercent,
  }
}

async function main() {
  try {
    const inputInfo = await stat(INPUT_DIR).catch(() => null)
    if (!inputInfo || !inputInfo.isDirectory()) {
      console.log(`[optimize-images] Skipped: "${INPUT_DIR}" does not exist.`)
      console.log('[optimize-images] Create public/images and add source files first.')
      return
    }

    const files = await collectImageFiles(INPUT_DIR)
    if (files.length === 0) {
      console.log('[optimize-images] No jpg/jpeg/png/webp files found.')
      return
    }

    console.log(`[optimize-images] Found ${files.length} image(s).`)
    let totalBefore = 0
    let totalAfter = 0

    for (const file of files) {
      const result = await optimizeToWebp(file)
      totalBefore += result.before
      totalAfter += result.after

      const relInput = path.relative(ROOT_DIR, result.filePath)
      const relOutput = path.relative(ROOT_DIR, result.outputPath)
      console.log(`[ok] ${relInput} -> ${relOutput} (${result.savedPercent}% smaller)`)
    }

    const totalSaved = totalBefore - totalAfter
    const totalSavedPercent = totalBefore === 0 ? 0 : ((totalSaved / totalBefore) * 100).toFixed(2)
    console.log(
      `[done] Reduced ${totalSavedPercent}% in total (${Math.round(totalSaved / 1024)} KB saved).`,
    )
    console.log('[hint] Review .optimized.webp files, then rename if you want to replace originals.')
  } catch (error) {
    console.error('[optimize-images] Failed:', error)
    process.exitCode = 1
  }
}

main()

