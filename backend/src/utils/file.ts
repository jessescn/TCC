import fs from 'node:fs/promises'
import path from 'node:path'

export const removeFile = async (filePath: string) => {
  await fs.unlink(path.resolve('/usr/app/', filePath))
}
