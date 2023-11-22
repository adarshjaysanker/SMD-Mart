var mongoose = require('mongoose');

const allProductsSchema = new mongoose.Schema({

    productTitle : {
        type : String
    },

    brandName : {
        type : String
    },

    description : {
        type : String
    },

    category : {
        type : String
    },

    subCategory : {
        type : String
    },

    cost : {
        type : String
    },

    image : {
        type : String
    }
});

const allProducts = mongoose.model('allProducts',allProductsSchema);
module.exports = allProducts;