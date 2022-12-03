import { Transform, pipeline } from 'stream';

const transform = async () => {
    const input = process.stdin;
    const output  = process.stdout;

    const transform = new Transform({
        transform(chunk, enc, cb) {
            const chunkStringified = chunk.toString().trim();

            const reverseChunk = chunkStringified.split('').reverse().join('');

            cb(null, `${reverseChunk} \n`);
        }
    })

    process.stdout.write('Hello! Please enter the text you want to be reversed\n');
    process.stdout.write('(To exit, press the key combination: "ctrl + C"):\n');

    pipeline(
        input,
        transform,
        output,
        error => {
            console.log(`Error: ${error.message}`);
        }
    )
};

await transform();
