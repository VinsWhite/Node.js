const Pet = require('../model/petModel');

exports.getAllPet = async (req, res) => {

    try {
        const pet = await Pet.find();
        res.status(200).json({
            status: 'success',
            data: {
                pet
            }
        });
    } catch (err) {
        res.status(404).json ({
            status: 'fail',
            message: err.message
        })
    }

}

exports.createAPet = async (req, res) => {
    
    try {

        const pet = await Pet.create(req.body);

        res.status(201).json ({
            status: 'success',
            data: {
                pet
            }
        })

    } catch (err) {
        res.status(404).json ({
            status: 'fail',
            message: err.message
        })
    }

}