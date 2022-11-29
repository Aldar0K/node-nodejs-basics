import fs from 'fs';
import fsp from 'fs/promises';
import { readFile } from 'fs/promises';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const rename = async () => {
    const _filename = fileURLToPath(import.meta.url);
    const _dirname = dirname(_filename);
    const errorMessage = 'FS operation failed';

    const wrongFileName = 'wrongFilename.txt';
    const wrongFilePath = path.join(_dirname, 'files', wrongFileName);
    const properFilename = 'properFilename.md';
    const properFilePath = path.join(_dirname, 'files', properFilename);

    if (!fs.existsSync(wrongFilePath) || fs.existsSync(properFilePath)) {
        throw new Error(errorMessage);
    }

    await fsp.rename(wrongFilePath, properFilePath);
    console.log('File renamed!');
};

await rename();