import { parentPort, workerData } from "worker_threads";

export const nthFibonacci = (n) => n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

export const sendResult = (workerData) => {
    const result = nthFibonacci(workerData);

    return result;
};

parentPort.postMessage(sendResult(workerData));
