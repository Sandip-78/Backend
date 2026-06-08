const mongoose = required('mongoose');

const doctorSchema = new mongoose.Schema(
    {
        name : {
            type : String,
            required : true
        },
        salary : {
            type : Number,
            required : true
        },
        qualification : {
            type : String,
            requried : true,
        },
        experience : {
            type : Number,
            default : 0,
        },
        workInHospitals: {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Hospital'
        }
    }
    ,
    {timestamps : true}
);

export const Doctor = mongoose.model("Doctor",doctorSchema);