import {NextResponse } from "next/server";
import { connectToDB } from "@/utils/Database";
import { User, ResetPassword } from "@/models/Schemas";
import SendEmail from "@/utils/SendEmail";
import bcrypt from "bcrypt";

const handler = async (req) => {

    try {
        const { email, sendEmail , password , text } = await req.json();
        if (sendEmail) {          
            await connectToDB();
            const existingUser = await User.findOne({ email: email });
            
            if (!existingUser) {
                console.log("user Does not exist")
                return NextResponse.json({ message: 'User Does not Exist' }, { status: 302 })
            }
    
            let OTP = String(Math.floor(100000 + Math.random() * 900000));
            let ResetUser = await ResetPassword.findOne({ email: email });
            
            if (ResetUser) {
                ResetUser = await ResetPassword.findOneAndUpdate({ email: email }, { OTP: OTP }, { new: true })
                }
            else {
                ResetUser = await ResetPassword.create({
                        email:email,
                        OTP: OTP,
                });   
                }
            
                const message = `The OTP for Resetting the password is ${OTP}`
    

            try {         
                await SendEmail({
                       email: email,
                       subject: "Reset Password Email",
                       message: message
                   });
            } catch (error) {
                OTP = undefined;
                ResetUser = await ResetPassword.findOneAndUpdate({ email: email }, { OTP: OTP }, { new: true })
                return NextResponse.json({ message: "Cannot send email try after some time" }, { status: 500 })
            }
    
            return NextResponse.json({ ResetUser: ResetUser }, { status: 200 })
        }
        else {
            await connectToDB();
            const existingUser = await User.findOne({ email: email });
            
            if (!existingUser) {
                console.log("user Does not exist")
                return NextResponse.json({ message: 'User Does not Exist' }, { status: 302 })
            } 

            const hashedPassword = await bcrypt.hash(password, 10);
            const UpdatedUser = await User.findOneAndUpdate({ email: email }, { hashedPassword: hashedPassword }, { new: true });

            return NextResponse.json({ User: UpdatedUser }, { status: 200 })
            
        }
    } catch (error) {
        return NextResponse.json({error}, { status: 500 })
    }


  
}

export {handler as GET, handler as POST , handler as PATCH}