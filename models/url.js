import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: [true, 'Please enter OriginalUrl.'],
    },
    shortCode: {
        type: String,
        required: [true, 'Please enter Todo Body.'],
        unique: true,
        index:true,
    },
    noOfHits: {
        type: Number,
        default:0,
    }
});

const Urls = mongoose.model('Urls', urlSchema);

export default Urls;