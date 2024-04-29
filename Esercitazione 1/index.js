const fs = require('fs'); // importiamo i moduli per leggere i file e avviare il server
const http = require('http');

const readStream = fs.createReadStream(`${__dirname}/file/dog.json`, 'utf-8'); // lettura del file json con lo stream
let dogData = ''; // inizializziamo i dati

readStream.on('data', chunk => { // flusso di lettura
    dogData += chunk;
});

readStream.on('end', () => {
    const dog = JSON.parse(dogData);

    const server = http.createServer((req, res) => {
        if (req.method === 'POST' && req.url === '/dog') {
            // converti l'oggetto JSON in una stringa JSON
            const dogJSON = JSON.stringify(dog);
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(dogJSON);
        } else {
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('Pagina non trovata');
        }
    });

    // Avvia il server
    const port = 8000;
    const address = '127.0.0.1';

    server.listen(port, address, () => {
        console.log('Server in ascolto...');
    });
});
