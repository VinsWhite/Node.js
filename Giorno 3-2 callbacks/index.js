const fs = require('fs');
const superagent = require('superagent')

// First solution --  functions use callbacks to handle the result of their operations
/* fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
    console.log(`Into our txt file --> ${data}`)

    superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
    .end((err,res) => {
        if (err) return console.log(err.message);
        const message = res.body.message;
        console.log(message)

        fs.writeFile('dog-image.txt', message, err => {
            console.log('Random dog image file')
        })
    })
}); */

// Best solution
// this promise method will impact our app
fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
    console.log(`Into our txt file --> ${data}`)

    superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
    .then( res => {
        /* if (err) return console.log(err.message); */
        const message = res.body.message;
        console.log(message)

        fs.writeFile('dog-image.txt', message, err => {
            console.log('Random dog image file')
        })
    }).catch (err => {
        console.log(err.message)
    })
});

// the second solution using promises is considered cleaner, more modern, and easier to maintain compared to the first solution using callbacks