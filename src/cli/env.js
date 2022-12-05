const parseEnv = () => {
    const errorMessage = 'There is on environment variables with prefix \'RSS_\'';
    const envFields = process.env;
    let result = [];

    for (const fieldName in envFields) {
        if (fieldName.includes('RSS_')) {
            result.push(`RSS_name${result.length + 1}=${fieldName}`);
        }
    }

    result = result.join('; ') || errorMessage;
    console.log(result);
};

parseEnv();
