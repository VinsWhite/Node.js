const http = require('http');
const EventEmitter = require('events');

class Sales extends EventEmitter {
    constructor() {
        super();
    }
}

const myEmitter = new Sales();

myEmitter.on('newSale', () => {
    console.log('There was a new sale!');
})

myEmitter.on('newSale', () => {
    console.log('Another Sale');
})

myEmitter.emit('newSale');

const server = http.createServer();
const port = 8000;

server.on('request',(req, res) => {
    res.end('Ciao');
})

server.listen (port, '127.0.0.1', () => {
    console.log('In attesa di richiesta')
}) 