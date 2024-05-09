import { FileSystem } from './types';

export function createFileSystem(fs?: any): FileSystem {

  let requireFsError = ''

  if (!fs) {
    try {
      // eslint-disable-next-line
      fs = eval("require('fs')"); // Use eval to trick the linter
    } catch (err) {
      requireFsError = (err as Error).toString()
    }
  }

  const readFile = fs
    ? function(filePath: string) {
      return new Promise<Buffer>((res, rej) => {
        fs.readFile(filePath, function(err: any, buffer: Buffer) {
          return err ? rej(err) : res(buffer)
        })
      })
    }
    : function() {
      throw new Error(`readFile - failed to require fs in nodejs environment with error: ${requireFsError}`)
    }

  return {
    readFile
  }
}