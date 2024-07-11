import mongoose from 'mongoose';

const SignUpSchema = new mongoose.Schema({
    PhoneNumber:{
        type: Number,
        required: true,
        unique: true,
        min: 12,
    }
});

const UserSignup = mongoose.model("UserSignup", SignUpSchema);

export default UserSignup