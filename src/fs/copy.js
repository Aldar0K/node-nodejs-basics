import fs from 'fs';
import fsp from 'fs/promises';
import { readFile } from 'fs/promises';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const copy = async () => {
    const _filename = fileURLToPath(import.meta.url);
    const _dirname = dirname(_filename);

    const fromFolder = path.join(_dirname, '/files');
    const destFolder = path.join(_dirname, '/files_copy');
    const errorMessage = 'FS operation failed';

    if (!fs.existsSync(fromFolder) || fs.existsSync(destFolder)) {
        throw new Error(errorMessage);
    }

    await fsp.mkdir(destFolder);

    const fileNames = await fsp.readdir(fromFolder);
    fileNames.forEach(async (fileName) => {
        const filePath = path.join(fromFolder, fileName);
        const newFilePath = path.join(destFolder, fileName);
        const fileBuffer = await readFile(filePath);
        await fsp.writeFile(newFilePath, fileBuffer);
    });
    console.log('Folder copied!');
};

copy();