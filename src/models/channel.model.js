import mongoose from 'mongoose';

const ChannelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    phoneNumberId: { type: String, required: true },
    accessToken: { type: String, required: true },
    whatsappBusinessAccountId: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    appId: { type: String, required: true },
    isActive: {
        type: Boolean,
        default: true
    },
    isCoexistenceEnabled: {
        type: Boolean,
        default: false
    },
    healthStatus: { type: String, default: 'unknown' },
    lastHealthCheck: Date,
    healthDetails: { type: Schema.Types.Mixed, default: {} },
    createdBy: String,
},
    {
        timestamps: true
    }
);

const Channel = mongoose.model('Channel', ChannelSchema);

export default Channel;