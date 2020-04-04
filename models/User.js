const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    roles: [
        {
            type: String,
            required: true 
        }
    ],
    contributor: {
        type: Schema.Types.ObjectId,
        ref: 'contributors'
    }
});

module.exports = mongoose.model('user', UserSchema);