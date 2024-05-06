const Animali = require('../model/animaliModel');


exports.getSingleAnimale = async (req, res) => {

    try {
        const animale = await Animali.findById(req.params.id);

        if(!animale) {
            res.status(404).json ({
                status: 'fail',
                message: 'animale non trovato'
            })
        }

        res.status(200).json ({
            status: 'success',
            data: animale
        })

    } catch (err) {
        res.status(500).json ({
            status: 'success',
            message: err.message
        })
    }

}

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
        res.status(404).json({
            status: 'fail',
            message: err.message
        });
    }
}

exports.createAnimale = async (req, res) => {

    // console.log('ciao');
    try {

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

exports.updateAnimali = async (req, res) => {
    
    try {

        const updateAnimali = await Animali.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        res.status(200).json ({
            status: 'success',
            data: {
                animali: updateAnimali
            }
        })

    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err.message
        })
    }

};

exports.deleteAnimale = async (req, res) => {

    try {

        await Animali.findByIdAndDelete(req.params.id);

        res.status(204).json ({
            status: 'success',
            data: null
        })

    } catch (err) {

        res.status(404).json ({
            status: 'fail',
            message: err.message
        })
        
    }

}