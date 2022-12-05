const parseArgs = () => {
    const errorMessage = 'There is on command line arguments';
    const args = process.argv;
    let result = [];

    for (let i = 0; i < args.length; i++) {
        if (args[i].includes('--')) {
            result.push(`${args[i]} is ${args[i + 1]}`);
            i++;
        }
    }

    result = result.join(', ') || errorMessage;
    console.log(result);
};

parseArgs();
