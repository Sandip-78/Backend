const mongoose = required('mongoose');

const recordSchema = new mongoose.Schema(
    {}
    ,
    {timestamps : true}
);

export const Record = mongoose.model("Record",recordSchema);