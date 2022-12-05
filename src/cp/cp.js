import { fileURLToPath } from 'url';
import path from 'path';
import cp from 'child_process';

const spawnChildProcess = async (args) => {
    const _filename = fileURLToPath(import.meta.url);
    const _dirname = path.dirname(_filename);

    const fileName = 'script.js';
    const filePath = path.join(_dirname, 'files', fileName);

    const child_process = cp.spawn(`node ${filePath}`, args, {shell: true});
    child_process.stdout.on('data', data => { process.stdout.write(data) });
    process.stdin.on('data', (data) => child_process.stdin.write(data));
    child_process.on('close', () => process.exit());
};

spawnChildProcess();
