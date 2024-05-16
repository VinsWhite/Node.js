import mongoose from "mongoose";

const productSchema = new mongoose.Schema ({

    name: {
        type: String,
        require: [true, "it's required"],
        trim: true, // toglie gli spazi alla fine della stringa
        minLength: [2, 'min 2 char'],
        maxLength: [40, 'max 40 char']
    },

    description: {
        type: String,
        require: [true, "it's required"],
        trim: true, 
        minLength: [20, 'min 20 char'],
        maxLength: [255, 'max 255 char']
    },

    price: {
        type: Number,
        require: [true, "it's required"],
        trim: true, 
        min: [1, 'min 1'],
        max: [10.000, 'max 10.000']
    },

    category: {
        type: String,
        require: [true, "it's required"],
        trim: true, 
        minLength: [2, 'min 2 char'],
        maxLength: [20, 'max 20 char'] 
    },

    image: {
        type: String,
        /* require: [true, "it's required"] */
    }

})

const Product = mongoose.model('Product', productSchema);

export {Product}