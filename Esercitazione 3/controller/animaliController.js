const Animali = require('../model/animaliModel');


exports.getAllAnimali = async (req, res) => {

    try {
        const animali = await Animali.find();
        res.status(200).json({
            status: 'success',
            data: {
                animali: animali
            }
        });

    } catch(err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
}

exports.createAnimale = async (req, res) => {

    // console.log('ciao');
    try {

        // const newAnimal = {
        //     "nome": "Orso polare",
        //     "descrizione": "Orsone felicione",
        //     "eta": 64,
        //     "specie": "Cazzo ne so"
        // }

      const newAnimali = await Animali.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                animali: newAnimali
            }
        });

    } catch(err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};