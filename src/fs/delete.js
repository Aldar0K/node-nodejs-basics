import fs from 'fs';
import fsp from 'fs/promises';
import { readFile } from 'fs/promises';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const remove = async () => {
    const _filename = fileURLToPath(import.meta.url);
    const _dirname = dirname(_filename);
    const errorMessage = 'FS operation failed';
    
    const fileName = 'fileToRemove.txt';
    const filePath = path.join(_dirname, 'files', fileName);

    if (!fs.existsSync(filePath)) {
        throw new Error(errorMessage);
    }

    await fsp.rm(filePath);
    console.log('File deleted!');
};

await remove();