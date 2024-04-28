const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {

    // Solution 1 --> è una buona soluzione solo per piccoli file
    /* fs.readFile('file.txt', (err, data) => {
        if(err) console.log(err);
        res.end(data);
    }) */

    // Solution 2: streams --> piece by piece (chunk by chunk)
    /* const readable = fs.createReadStream('file.txt');
    readable.on('data', chunk => {
        res.write(chunk)
    })

    readable.on('end', () => {
        res.end();
    })

    readable.on('error', err => {
        console.log(err);
        res.statusCode = 500;
        res.end('File not found')
    }) */

    // Solution 3 - pipe solution che gestisce tutto
    const readable = fs.createReadStream('file.txt');
    readable.pipe(res);
})

server.listen(8000, '127.0.0.1', () => {
    console.log('In ascolto...')
})