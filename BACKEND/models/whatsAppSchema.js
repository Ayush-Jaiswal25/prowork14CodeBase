import mongoose from 'mongoose';

const WhatsAppSchema = new mongoose.Schema({
    WhatsAppNumber: Number,
});

const WhatsAppNumber = mongoose.model("WhatsAppNumber", WhatsAppSchema);

export default WhatsAppNumber