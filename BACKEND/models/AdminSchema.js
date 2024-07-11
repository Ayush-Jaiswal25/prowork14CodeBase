import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema({
    paymentData:{
        type: Number
    },
})

const Admin = mongoose.model("Admin", AdminSchema);

export default Admin