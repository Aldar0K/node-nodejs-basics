import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import zlib from 'zlib';
import { pipeline } from 'stream/promises';
import { createReadStream, createWriteStream } from 'fs';

export const decompress = async () => {
    const _filename = fileURLToPath(import.meta.url);
    const _dirname = dirname(_filename);
    const errorMessage = 'Stream operation failed';

    const fileToUnzipName = 'archive.gz';
    const fileToUnzipPath = path.join(_dirname, fileToUnzipName);

    const unzippedFileName = 'fileToCompress.txt';
    const unzippedFilePath = path.join(_dirname, unzippedFileName);

    if (!fs.existsSync(fileToUnzipPath)) throw new Error(errorMessage);

    const readStream = createReadStream(fileToUnzipPath);

    const writeStream = createWriteStream(unzippedFilePath);

    const gunzip = zlib.createGunzip();

    try {
    await pipeline(
      readStream, 
      gunzip, 
      writeStream
    );
  } catch (err) {
    console.error(err);
  }
};

decompress();