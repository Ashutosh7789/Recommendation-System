import bcrypt from "bcrypt";
import {NextResponse } from "next/server";
import { connectToDB } from "@/utils/Database";
import { User } from "@/models/Schemas";

export const POST = async (req) => {
    
    if (req.method !== "POST") {
        return NextResponse.json({ status: 405 })
    }

    try {

        const {email , username , password} = await req.json();
        await connectToDB();
        const existingUser = await User.findOne({ email: email });
        
        if (existingUser) {
            console.log("user already exist")
            return NextResponse.json({ message: 'User Already Exist' }, { status: 302 })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
                email:email,
                username:username,
                hashedPassword: hashedPassword,
                image: '',
        });
        return NextResponse.json({ user }, { status: 200 })
    } catch (error) {
        return NextResponse.json({error}, { status: 500 })
    }
}