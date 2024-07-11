import mongoose from 'mongoose';

const myBookingSchema = new mongoose.Schema({
    Booking_Category:{
        type: String
    },
    Paid_Amount:{
        type: String
    },
    Booking_Time:{
        type:String,
        // new ISODate()
    }
})

const BookingDetails = mongoose.model("BookingDetails", myBookingSchema);

export default BookingDetails