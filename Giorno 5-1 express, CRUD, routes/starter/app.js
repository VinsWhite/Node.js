const fs = require('fs');
const express = require ('express');

const app = express();

app.use(express.json()); // middleware 

/* app.get('/', (req, res) => { */
    /* res.status(200).send('Hello from the server side!'); */
    /* res.status(200)
    .json({ message: 'Hello from the server side!', app: 'Natours'});
}) */

/* app.post('/', (req, res) => {
    res.send('You can post to this endpoint...');
}) */

const tours = JSON.parse( fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))

// to organize the code better
const getAllTours = (req, res) => {
    res.status(200).json ({
        status: 'success',
        results: tours.length,
        data: {
            tours
        }
    })
}

const getSingleTour = (req, res) => { // with :id? it's optional

    console.log(req.params);

    const id = req.params.id * 1;

    if( id > tours.length) {
        return res.status(404).json ({
            status: 'failed',
            message: 'Invalid ID'
        })
    }
    const tour = tours.find(el => el.id === id)

    res.status(200).json({
        status: 'success',
        /* results: tours.length, */ // because it's an array, so it's easier to calculate the results
        data: {
            tour
        }
    })
}

const createNewTour = (req, res) => {
    /* console.log(req.body); */

    const newId = tours[tours.length - 1].id + 1; // 'cause we don't have a database, we might include the ID in this way
    const newTour = Object.assign({id: newId}, req.body);

    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({ // 201 means created
            status: "success",
            data: {
                tour: newTour
            }
        })
    }) 
    // we are into a loop event (callbacks) so we shouldn't never block it, so DON'T use writeFileSync

    /* res.send('Done') */ 
}

const updateTour = (req, res) => {

    if( req.params.id * 1 > tours.length) {
        return res.status(404).json ({
            status: 'failed',
            message: 'Invalid ID'
        })
    }

    res.status(200).json ({
        status: 'success',
        data: {
            tour: '<Updated tour here>'
        }
    })
}

const deleteTour = (req, res) => {

    if( req.params.id * 1 > tours.length) {
        return res.status(404).json ({
            status: 'failed',
            message: 'Invalid ID'
        })
    }

    res.status(204).json ({
        status: 'success',
        data: null
    })
}

/* app.get('/api/v1/tours', getAllTours);
app.get('/api/v1/tours/:id', getSingleTour);
app.post('/api/v1/tours', createNewTour);
app.patch('/api/v1/tours/:id', updateTour);
app.delete('/api/v1/tours/:id', deleteTour); */

// create a Route
app
    .route('/api/v1/tours')
    .get(getAllTours)
    .post(createNewTour);

app
    .route('/api/v1/tours/:id')
    .get(getSingleTour)
    .patch(updateTour)
    .delete(deleteTour)

const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`)
});