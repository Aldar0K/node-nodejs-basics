import fs from 'fs';
import fsp from 'fs/promises';
import { readFile } from 'fs/promises';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const list = async () => {
    const _filename = fileURLToPath(import.meta.url);
    const _dirname = dirname(_filename);
    const errorMessage = 'FS operation failed';

    const dirName = 'files';
    const dirPath = path.join(_dirname, dirName);

    if (!fs.existsSync(dirPath)) {
        throw new Error(errorMessage);
    }

    const fileNames = await fsp.readdir(dirPath);
    if (fileNames.length > 0) {
        fileNames.forEach(fileName => console.log(fileName));
        console.log('File names are printed!');
    } else{
        console.log('Folder is empty!');
    }
};

await list();