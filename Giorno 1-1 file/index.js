const fs = require('fs');

fs.readFile('./txt/prova.txt', 'utf-8', (err, data) => {
    console.log(data);
    if (err) {
        console.err(err);
    }
})

const message = 'ciao';

fs.writeFile('./txt/prova2.txt', message, err => {
    console.log('File scritto con successo!')
})

const message2 = 'sono arcangelo'

fs.writeFile('./txt/prova3.txt', message2, err => {
    console.log('File 2 scritto con successo!')
})