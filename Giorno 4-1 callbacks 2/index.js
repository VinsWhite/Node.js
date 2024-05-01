const fs = require('fs');
const superagent = require('superagent');

const getDogPic = async () => {
    try {
        const dog = await fs.promises.readFile(`${__dirname}/dog.txt`, 'utf-8'); // memorizziamo il contenuto di dog.txt
        console.log('Breed: ', dog);

        const response = await superagent.get(`https://dog.ceo/api/breed/${dog}/images/random`);
        console.log(response.body.message);

        await fs.promises.writeFile(`${__dirname}/dog-img.txt`, response.body.message);

        return 'Messaggio salvato con successo!';
    } catch (error) {
        console.error(error);
        
        throw error;
    }
}

// i due console log vengono richiamati prima delle chiamate asincrone 
/* console.log('Funzione prima di getDogPic');
getDogPic()
    .then( x => {
        console.log(x);
        console.log('Fatto!')
    })
    .catch(error => {
        console.log('ERROR!!');
    })
console.log('Funzione dopo di getDogPic'); */

// in questo modo invece, il console log dopo la funzione viene eseguito esattamente dopo
( async () => {
    try {
        console.log('Funzione prima di getDogPic');
        const x = await getDogPic();
        console.log(x)
        console.log('Funzione dopo di getDogPic');
    } catch (error) {
        console.log('ERROR!!');
    }
})();


// MULTIPLE PROMISES SIMULTANEOUSLY 

const getMultipleDog = async () => {
    
    try {
        const dog = await fs.promises.readFile(`${__dirname}/dog.txt`, 'utf-8'); 
        console.log('Breed: ', dog);

        const response1 = superagent.get(`https://dog.ceo/api/breed/${dog}/images/random`);
        const response2 = superagent.get(`https://dog.ceo/api/breed/${dog}/images/random`);
        const response3 = superagent.get(`https://dog.ceo/api/breed/${dog}/images/random`);

        const allResponses = await Promise.all([response1, response2, response3])
        const imgs = allResponses.map(el => el.body.message);

        await fs.promises.writeFile('multipleDog-img.txt', imgs.join('\n'))

        return 'Messaggio 2 salvato con successo!';
    } catch (error) {
        
    }
}

( async () => {
    try {
        console.log('Funzione prima di getMultipleDog');
        const x = await getMultipleDog();
        console.log(x)
        console.log('Funzione dopo di getMultipleDog');
    } catch (error) {
        console.log('ERROR!!');
    }
})();
