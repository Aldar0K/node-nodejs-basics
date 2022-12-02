import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const write = async () => {
    const _filename = fileURLToPath(import.meta.url);
    const _dirname = dirname(_filename);
    const errorMessage = 'Stream operation failed';

    const fileName = 'fileToWrite.txt';
    const filePath = path.join(_dirname, 'files', fileName);

    if (!fs.existsSync(filePath)) throw new Error(errorMessage);

    const output = fs.createWriteStream(filePath);

    process.stdout.write('Hello! Please enter the text you want to write to the file\n');
    process.stdout.write('(To exit, press the key combination: "ctrl + C"):\n');

    process.stdin.on('data', chunk => output.write(chunk, 'utf-8'));
};

await write();
