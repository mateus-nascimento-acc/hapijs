import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now()
    },
    lastLoginDate: {
        type: Date,
        default: Date.now()
    },
    lastupdateDate: {
        type: Date,
        default: Date.now()
    }
})

userSchema.pre('save', async function (next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
})

module.exports = mongoose.model('User', userSchema);
