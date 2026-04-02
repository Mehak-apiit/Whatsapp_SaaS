import mongoose, { Schema } from 'mongoose';

const ContactSchema = new mongoose.Schema({
    channelId: { type: Schema.Types.ObjectId, required: true, ref: 'Channel' },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: String,
    groups: { type: [String], default: [] },
    tags: { type: [Schema.Types.Mixed], default: [] },
    status: { type: String, default: 'active' },
    source: String,
    lastContact: Date,
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', default: '' },
},
    {
        timestamps: true
    }
);

const Contact = mongoose.model('Contact', ContactSchema);

export default Contact;