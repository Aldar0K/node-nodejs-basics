import fs from 'fs';
import fsp from 'fs/promises';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const calculateHash = async () => {
    const _filename = fileURLToPath(import.meta.url);
    const _dirname = dirname(_filename);
    const errorMessage = 'FS operation failed';

    const fileName = 'fileToCalculateHashFor.txt';
    const filePath = path.join(_dirname, 'files', fileName);

    if (!fs.existsSync(filePath)) throw new Error(errorMessage);

    const fileContent = await fsp.readFile(filePath, 'utf8');

    const hash = crypto.createHash('sha256');
    hash.update(fileContent);

    const hexHash = hash.digest('hex');
    console.log(`Hash: ${hexHash}`);
};

await calculateHash();
