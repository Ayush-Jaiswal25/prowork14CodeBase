import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema({
    name:{
        type: String
    },
    amount:{
        type: String
    },
    order_id:{
        type: String
    },
    razorpay_payment_id:{
        type:String,
        default: null
    },
    razorpay_order_id:{
        type:String,
        default: null
    },
    razorpay_signature:{
        type:String,
        default: null
    }

});

const PaymentDetails = mongoose.model("PaymentDetails", PaymentSchema);

export default PaymentDetails