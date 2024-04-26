const fs = require('fs');

fs.readFile('./txt/prova.txt', 'utf-8', (err, data) => {
    console.log(data);
})

const message = 'ciao';

fs.writeFile('./txt/prova2.txt', message, err => {
    console.log('File scritto con successo!')
})