import mongoose from 'mongoose';

const BankSchema = new mongoose.Schema({
    AccountHolderName:{
        type: String,
    },
    BankName:{
        type: String,
    },
    AccountNumber:{
        type: Number,
    },
    AccountIFSC_code:{
        type: String,
    }
})

const BankDetails = mongoose.model("BankDetails", BankSchema);

export default BankDetails