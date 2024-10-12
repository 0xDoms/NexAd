import mongoose from "mongoose";

const advertsSchema = new mongoose.Schema({
    name:{ // Advert Name.
        type: String,
        required: true,
        unique: true,
    },
    description:{ // Description of advert.
        type: String,
        required: true,
        unique: true,
    },
    url:{ // Custom Url for an image
        type: String,
        required: true,
        unique: true,
    },
    payout:{ // Payout per viewer
        type: Number,
        required: true,
        unique: true,
    },
    viewers:{ // Desired amount of viewers
        type: Number,
        required: true,
        unique: true,
    },
    currentPayout:{ // current amount paid
        type: Number,
        required: true,
        unique: true,
    },
    time:{ // How long a viewer must stay on the ad
        type: Number,
        required: true,
        unique: true,
    },
    ownerid:{
        type: String,
        required: true,
        unique: true,
    }
},{timestamps: true});


export const Advert = mongoose.model('Advert', advertsSchema);