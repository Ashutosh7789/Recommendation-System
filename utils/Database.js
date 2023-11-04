import mongoose from "mongoose";

let isConnected = false; //track the connection

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log('MongoDB is already connected');
        return;
    }

    try {
        await mongoose.connect(process.env.DATABASE_URL, {
            useNewURLParser: true,
            useUnifiedTopology: true,
        })
        isConnected = true;
        console.log('MongoDB connection established');
    } catch (error) {
        console.log('MongoDB connection error');
    }
}