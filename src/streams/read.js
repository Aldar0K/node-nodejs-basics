import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const read = async () => {
    const _filename = fileURLToPath(import.meta.url);
    const _dirname = dirname(_filename);
    const errorMessage = 'Stream operation failed';

    const fileName = 'fileToRead.txt';
    const filePath = path.join(_dirname, 'files', fileName);

    if (!fs.existsSync(filePath)) throw new Error(errorMessage);

    const input = fs.createReadStream(filePath, 'utf-8');

    let data = '';

    input.on('data', chunk => data += chunk);

    input.on('end', () => process.stdout.write(`Data: ${data}`));

    input.on('error', error => console.log(`Error: ${error.message}`));
};

await read();
