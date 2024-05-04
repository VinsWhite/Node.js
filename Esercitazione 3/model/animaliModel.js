const mongoose = require('mongoose');

const animaliSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: [true, 'Il nome è obbligatorio'],
        unique: true
    },
    descrizione: {
        type: String,
        required: [true, 'La descrizione è obbligatoria']
    },
    eta: {
        type: Number,
        required: [true, "L'eta è obbligatoria"]
    },
    specie: {
        type: String,
        required: [true, "La specie è obbligatoria"]
    }
});

const Animali = mongoose.model('Animali', animaliSchema);

module.exports = Animali;