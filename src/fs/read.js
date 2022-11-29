import fs from 'fs';
import fsp from 'fs/promises';
import { readFile } from 'fs/promises';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const read = async () => {
    const _filename = fileURLToPath(import.meta.url);
    const _dirname = dirname(_filename);
    const errorMessage = 'FS operation failed';

    const fileName = 'fileToRead.txt';
    const filePath = path.join(_dirname, 'files', fileName);

    if (!fs.existsSync(filePath)) {
        throw new Error(errorMessage);
    }

    const fileContent = await fsp.readFile(filePath, 'utf-8');
    console.log(fileContent);
    console.log('The file has been read!')
};

await read();