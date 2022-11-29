import fsp from 'fs/promises';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const create = async () => {
    const _filename = fileURLToPath(import.meta.url);
    const _dirname = dirname(_filename);

    const fileName = 'fresh.txt';
    const filePath = path.join(_dirname, '/files', fileName);
    const content = 'I am fresh and young';
    const errorMessage = 'FS operation failed';

    try {
        await fsp.writeFile(filePath, content, { flag: 'wx' });
        console.log('File created!');
    } catch (err) {
        throw new Error(errorMessage);
    }
};

await create();
