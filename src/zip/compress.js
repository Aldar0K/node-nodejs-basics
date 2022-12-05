import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import zlib from 'zlib';
import { pipeline } from 'stream/promises';
import { createReadStream, createWriteStream } from 'fs';

export const compress = async () => {
    const _filename = fileURLToPath(import.meta.url);
    const _dirname = dirname(_filename);
    const errorMessage = 'Stream operation failed';

    const fileToZipName = 'fileToCompress.txt';
    const fileToZipPath = path.join(_dirname, 'files', fileToZipName);

    const zippedFileName = 'archive.gz';
    const zippedFilePath = path.join(_dirname, zippedFileName);

    if (!fs.existsSync(fileToZipPath)) throw new Error(errorMessage);

    const readStream = createReadStream(fileToZipPath);

    const writeStream = createWriteStream(zippedFilePath);

    const gzip = zlib.createGzip();

    try {
        await pipeline(
        readStream, 
        gzip, 
        writeStream
        );
    } catch (err) {
        console.error(err);
    }
};

compress();
