import express from 'express'
const backend = express();
import cors from 'cors'
import Razorpay from 'razorpay';
import crypto from 'crypto';
import mongoose from 'mongoose';

import UserSignup from './models/SignUpSchema.js'
import UserDetails from './models/userDetailSchema.js'
import WhatsAppNumber from './models/whatsAppSchema.js'
import PaymentDetails from './models/paymentSchema.js';
import Admin from './models/AdminSchema.js';

const mongo_URL = "mongodb://127.0.0.1:27017/prowork";
const u = process.env.MONGO_ATLAS_URL_CLOUD;
let updatedDetails;
let User, UserInfo, UserSignupObjectID;


backend.use(cors())
backend.use(express.json());
backend.use(express.urlencoded({extended: true}))

backend.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin: https://prowork.live'); // Allow requests from any origin
  res.setHeader('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE'); // Allow specific HTTP methods
  res.setHeader('Access-Control-Allow-Headers: Content-Type, Authorization'); // Allow specific headers
  next();
});

const razorpay = new Razorpay( { key_id: 'rzp_test_YlsIMKyGXhS3ih', key_secret: 'IJM0eHFmjmdOLpxaT3e1S7Vi' } );
main()
.then(() =>{
    console.log("connection successful");
})
.catch((err) =>{
    console.log(err);
});

async function main(){
    await mongoose.connect(mongo_URL);
}


backend.listen(3000, () =>{ console.log("The server is running on Port number 3000") });

backend.post("/payment/checkout", async (req, res) =>{
    const {name, amount} = req.body;
    const order = await razorpay.orders.create( { amount: amount, currency: "INR" } )
    await PaymentDetails.create( { order_id: order.id, name: name, amount: amount } )
    res.json({order})
})
backend.post("/payment/payment-verification", async (req, res) =>{
    const {razorpay_payment_id, razorpay_order_id, razorpay_signature} = req.body;
    const body_data = razorpay_order_id  + "|" + razorpay_payment_id
    const verified = crypto.createHmac('sha256', 'IJM0eHFmjmdOLpxaT3e1S7Vi')
    .update(body_data).digest('hex')
    const doneVerified = verified == razorpay_signature
    if(doneVerified){
        await PaymentDetails.findOneAndUpdate({order_id:razorpay_order_id},{razorpay_payment_id:razorpay_payment_id, razorpay_order_id:razorpay_order_id,razorpay_signature:razorpay_signature});
        res.redirect(`http://localhost:5000/prowork/payment_success?payment_id=${razorpay_payment_id}`);
    }else{
        res.redirect(`http://localhost:5000/prowork/payment_Failed?payment_id=${razorpay_payment_id}`);
    }
})


backend.post("/prowork/Founder", async (req, res) =>{
    const newUser = new Admin(req.body);
    UserInfo = await newUser.save();
})
backend.get("/prowork/Founder", async (req, res) =>{
    const All_Payment_Data = await Admin.find({});
    res.send(All_Payment_Data)
})


backend.post("/prowork/signup", async (req, res) =>{
    User = await UserSignup.find({PhoneNumber: req.body.PhoneNumber});

    if(User[0] == undefined){
        const newUser = new UserSignup(req.body);
        UserInfo = await newUser.save();
        UserSignupObjectID = UserInfo._id;
        console.log("User Signed Up Successfully");
        res.json(UserInfo)
    }else{
        UserSignupObjectID = User[0]._id;
        console.log("User Logged In Successfully");
        res.json(User[0])
    }
});
backend.get("/prowork/signup", async (req, res) =>{
if(User[0] == undefined){
    const x = await UserSignup.find({PhoneNumber: UserInfo.PhoneNumber});
    res.json(x)
}else{
    const x = await UserSignup.find({PhoneNumber: User[0].PhoneNumber});
    res.json(x)
}
})

backend.post("/prowork/userdetails",async (req, res) =>{
    const newNumber = new UserDetails({...req.body.data, UserSignupObjectID });
    updatedDetails = await newNumber.save();
    res.send(updatedDetails)
});
backend.get("/prowork/userdetails", async (req, res) =>{
    const WorkerSignupDate = await UserDetails.find({UserSignupObjectID:UserSignupObjectID});
    res.json(WorkerSignupDate);
})


backend.post("/prowork/register", async (req, res) =>{
    const newWhatappNumber = new WhatsAppNumber(req.body);
    const savedWhatappNumber = await newWhatappNumber.save();
    res.send(savedWhatappNumber)
});
