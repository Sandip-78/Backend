const mongoose = require('mongoose');

const subTodoSchema = new mongoose.Schema(
    {
        content : {
            type : String,
            required : true
        },
        completed : {
            type : Boolean,
            required : true,
        },
        createdBy : {
            type : mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    },{timestamps : true}
);


export const SubTodo = mongoose.model("SubTodo", subTodoSchema);