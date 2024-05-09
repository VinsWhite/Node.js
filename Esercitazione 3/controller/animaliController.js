const Animali = require('../model/animaliModel');

class APIAnimali {
    constructor(query, queryString) {
        this.query = query,
        this.queryString = queryString
    }

    filter () {
        const queryBody = {...this.queryString};
        const excludeFields = ['page', 'sort', 'limit', 'fields'];
        excludeFields.forEach(el => delete(queryBody[el]));

        let queryString = JSON.stringify(queryBody);
        queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, match => `$${match}`); // le query hanno bisogno dei dollari e così risolviamo il problema

        this.query.find(JSON.parse(queryString));

        return this;
    }

    sort () {
        if(this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort('-createdAt');
        }

        return this;
    }

    limit () {
        if(this.queryString.fields) {

            const fields = this.queryString.fields.split(',').join(' ');
            this.query = this.query.select(fields);

        } else {
            this.query = this.query.select('-__v');
        }

        return this;
    }

    paginate () {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 100;
        const skip = (page - 1) * limit;

        this.query = this.query.skip(skip).limit(limit);

        if(this.queryString.page) {
            const numAnimali = Animali.countDocuments();
            if(skip >= numAnimali) throw Error('Questa pagina non esiste');
        }

        return this;
    }


}

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
        /* const animali = await Animali.find(); */
        const istanza = new APIAnimali(Animali.find(), req.query)
                        .filter()
                        .sort()
                        .limit()
                        .paginate();

        const animali = await istanza.query;

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