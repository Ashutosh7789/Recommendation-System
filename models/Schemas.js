import { Schema, model, models } from "mongoose";
import mongoose from "mongoose";

const UserSchema = new Schema({
    email: {
        type: 'string',
        unique: [true, 'Email already exist!'],
        required: [true, 'Email required!'],
    },
    username: {
        type: 'string',
        required: [true, 'Username required!'],
    },
    hashedPassword: {
        type: 'string',
        required: [true, 'Password required!'],
    },
    image: {
        type: 'string',
    }
});

const ResetSchema = new Schema({
        email: {
        type: 'string',
        unique: [true, 'Email already exist!'],
        required: [true, 'Email required!'],
    },
        OTP: {
        type: 'string',
    },
})

const historySchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  searchTerm: { type: String, required: true },
  searchDate: { type: Date, default: Date.now },
});




// Create User and History models
const User = models.User || model('User', UserSchema);
const History = models.History || model('History', historySchema);
const ResetPassword = models.ResetPassword || model('ResetPassword', ResetSchema);

export {
    User, History , ResetPassword
}