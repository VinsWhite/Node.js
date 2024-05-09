const mongoose = require('mongoose');

const animaliSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: [true, 'Il nome è obbligatorio'],
        unique: true,
        maxlength: [30, "Il nome dell'animale deve avere massimo 30 caratteri"],
        minlength: [2, "Il nome dell'animale deve avere minimo 2 caratteri"],
    },
    descrizione: {
        type: String,
        required: [true, 'La descrizione è obbligatoria'],
        maxlength: [250, "La descrizione dell'animale deve avere massimo 250 caratteri"],
        minlength: [20, "La descrizione dell'animale deve avere minimo 20 caratteri"]
    },
    eta: {
        type: Number,
        required: [true, "L'eta è obbligatoria"],
        min: [1, "L\'età dell'animale deve essere maggiore o uguale a 1 anno"],
        max: [200, "L\'età dell'animale deve essere massimo di 200 anni"]
    },
    specie: {
        type: String,
        required: [true, "La specie è obbligatoria"],
        enum: {
            values: ['terrestre', 'acquatico', 'mammifero', 'reptili', 'anfibi'],
            message: ['La specie inserita non è valida']
        }
    }
}, 
{
    toJSON: { virtuals: true },
    toOBJECT: { virtuals: true }
});

const Animali = mongoose.model('Animali', animaliSchema);

module.exports = Animali;