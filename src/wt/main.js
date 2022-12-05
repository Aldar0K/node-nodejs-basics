import { fileURLToPath } from 'url';
import path from 'path';
import { Worker } from 'worker_threads';
import os from 'os';

const START_VALUE = 10;

export const performCalculations = async () => {
    const _filename = fileURLToPath(import.meta.url);
    const _dirname = path.dirname(_filename);

    const workerName = 'worker.js';
    const workerPath = path.join(_dirname, workerName);
    const cpus = os.cpus();
    const resultArr = [];

    const runWorker = (workerData) => {
        return new Promise((resolve) => {
            const worker = new Worker(workerPath, { workerData });
    
            worker.on("message", result => {
                resolve({
                    'status': 'resolved',
                    'data': result
                });
            });

            worker.on("error", error => {
                console.log(error);
            });

            worker.on("exit", exitCode => {
                if (exitCode !== 0) {
                    resolve({
                        'status': 'error',
                        'data': null,
                    });
                }
            });
            
        });
    }

    for (let i = 0; i < cpus.length; i++ ) {
        resultArr[i] = runWorker(START_VALUE + i);
    }

    const resultArray = (await Promise.allSettled(resultArr)).map((item =>{
        return item.value;
    }))

    console.log(resultArray);
};

await performCalculations();
