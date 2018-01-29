const fs = require('fs');
const path = require('path');

const PATH_TO_LOGS = path.join(__dirname, '..', '..', 'nodejs/nodejs_logs');
const CHUNKS_LIMIT = 10;

let temporaryContainer = [];
let outFile = `${ new Date().toISOString() }`;
let i = 0;
let file_count = 0;

// const createFolderAnd

fs.createReadStream(PATH_TO_LOGS + '__forever.log')
    .on('error', error => {
        console.error(error);
    })
    .on('data', chunk => {
        if (temporaryContainer.length < CHUNKS_LIMIT) temporaryContainer.push(chunk);
        else {
            const file = path.resolve(PATH_TO_LOGS, `${outFile}-${file_count++}.log`);
            const writeStream = fs.createWriteStream(file, {
                'flags': 'a+',
                'defaultEncoding': 'utf8',
            })
                .on('error', error => { console.error(error) });
            temporaryContainer = [];
            temporaryContainer.push(chunk);
        }
        i++;
    })
    .on('end', () => {
        console.log(outFile)
        console.log(i + ' chunks')
    })
