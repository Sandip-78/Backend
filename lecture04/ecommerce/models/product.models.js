import { Category } from './category.models';

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema (
    {
        name : {
            type : String,
            required : true
        },
        description : {
            type : String,
            required : true
        },
        productImage : {
            type : String
        },
        price : {
            type : Number,
            default : 0
        },
        stocks : {
            type : Number,
            default : 0
        },
        Category : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Category",
            required : true
        },
        owner : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User"
        }
    },{timestamps : true}
);

export const Product = mongoose.model("Prodcut",productSchema);