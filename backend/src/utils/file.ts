import fs from 'node:fs/promises'
import path from 'node:path'

export const removeFile = async (filename: string, resolve = []) => {
  await fs.unlink(path.resolve(...resolve, filename))
}

export const removeFiles = async (filepaths: string[], resolvePaths = []) => {
  const promises = []

  filepaths.forEach(filepath => {
    const promise = new Promise((resolve, reject) => {
      removeFile(filepath, resolvePaths).then(resolve).catch(reject)
    })

    promises.push(promise)
  })

  await Promise.all(promises)
}
