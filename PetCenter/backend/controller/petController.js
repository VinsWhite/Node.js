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

exports.deleteAPet = async (req, res) => {
    try {

        const pet = await Pet.findByIdAndDelete (req.params.id);
        
        if (!pet) {
            return res.status(404).json({
                status: 'fail',
                message: 'Pet not found'
            });
        }

        res.status(201).json ({
            status: 'success'
        })

    } catch (err) {
        res.status(404).json ({
            status: 'fail',
            message: err.message
        })
    }
}