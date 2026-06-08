const mongoose = required('mongoose');

const patienceSchema = new mongoose.Schema(
    {
        name : {
            type : String,
            required : true,
        },
        diagonsedWith : {
            type : String,
            required : true,
        },
        age : {
            type : Number,
            required : true,
        },
        bloodGroup : {
            type : String,
            required : true,
        },
        gender : {
            type : String,
            enum : ["M","F","O"],
            required : true
        },
        address : {
            type : String,
            required : true,
        },
        admittedIn : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Hospital'
        }
    },
    {timestamps : true}
);

export const Patience = mongoose.model("Patience",patienceSchema);