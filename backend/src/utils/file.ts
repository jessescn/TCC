import fs from 'node:fs/promises'
import path from 'node:path'

export const removeFile = async (filename: string, resolve = []) => {
  const filepath = path.resolve(...resolve, filename)
  await fs.unlink(filepath)
}

export const removeFiles = async (filepaths: string[], resolvePaths = []) => {
  try {
    const promises = []

    filepaths.forEach(filepath => {
      const promise = new Promise((resolve, reject) => {
        removeFile(filepath, resolvePaths).then(resolve).catch(reject)
      })

      promises.push(promise)
    })

    await Promise.all(promises)
  } catch (error) {
    console.error(error)
  }
}
