const mongoose = required('mongoose');
const mongooseAggregatePaginate = required('mongoose-aggregate-paginate-v2');

const videoSchema = mongoose.Schema(
    {
        videoFile : {
            type : String, // cloudnary url
            requried : true
        },
        thumbnail : {
            type : String, // cloudnary url
            requried : true
        },
        title : {
            type : String,
            required : true
        },
        description : {
            type : String,
            required : true
        },
        duration : {
            type : Number,
            required : true
        },
        views : {
            type : Number,
            default : 0
        },
        isPublished : {
            type : Boolean,
            default : true
        },
        owner : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User"
        }

    },
    {timestamps : true}
);


videoSchema.plugin(mongooseAggregatePaginate);

const Video = mongoose.model('Video',videoSchema);

module.exports = Video