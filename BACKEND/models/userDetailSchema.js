import mongoose from 'mongoose';

const UserDetailSchema = new mongoose.Schema({
    Name:{
        type: String,
        required: true,
    },
    Email:{
        type: String,
        required: true,
    },
    houseNo:{
        type: String,
        required: true,
    },
    streetaddre:{
        type: String,
        required: true,
    },
    pinCode:{
        type: Number,
        required: true,
    },
    UserSignupObjectID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserSignup",
    },
});

const UserDetails = mongoose.model("UserDetails", UserDetailSchema);

export default UserDetails