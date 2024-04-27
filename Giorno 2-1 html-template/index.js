const http = require('http'); // modulo per la creazione di un server 
const fs = require('fs'); // modulo per la lettura e la scrittura dei file
const url = require('url'); // modulo per formattare l'url
const slugify = require('slugify') // modulo per dare uno slug all'url del sito
const replaceTemplate = require('./assets/modules/replaceTemplate'); // importiamo un template esterno

const port = process.env.PORT || 8000;
const data = fs.readFileSync(`${__dirname}/assets/json/data.json`, 'utf-8'); // dobbiamo sempre specificare utf-8 per farci tornare il contenuto reale del file
const tempCard = fs.readFileSync(`${__dirname}/assets/templates/template-card.html`, 'utf-8');
const tempOverview = fs.readFileSync(`${__dirname}/assets/templates/template-overview.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/assets/templates/template-product.html`, 'utf-8');

const dataObj = JSON.parse(data);
const slugs = dataObj.map(el => slugify(el.productName, { lower: true }));

const server = http.createServer((req, res) => {

    const { query, pathname } = url.parse(req.url, true);

    // Overview Page
    if (pathname === '/' || pathname === '/overview') {
        res.writeHead(200, { 'Content-type': 'text/html' });

        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
        res.end(output);

        // Product page
    } else if (pathname === '/product') {
        res.writeHead(200, { 'Content-type': 'text/html' });
        const product = dataObj[query.id];
        const output = replaceTemplate(tempProduct, product);
        res.end(output);

        // API
    } else if (pathname === '/api') {
        res.writeHead(200, { 'Content-type': 'application/json' });
        res.end(data);

        // Not found
    } else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello-world'
        });
        res.end('<h1>Page not found!</h1>');
    }
});

server.listen(port, () => {
    console.log(`Listening to requests on port ${port}`);
});