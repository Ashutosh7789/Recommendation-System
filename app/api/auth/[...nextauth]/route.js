import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDB } from '@/utils/Database';
import { User } from "@/models/Schemas"
import bcrypt from "bcrypt"



export const authOptions ={
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {},
            async authorize(credentials) {
                const { email, password } = credentials;
                try {
                    await connectToDB();
                    const user = await User.findOne({ email })
                    if (!user) {
                        return null
                    }

                    const passwordMatch = await bcrypt.compare(password, user.hashedPassword);
                    console.log(passwordMatch)
                    if (!passwordMatch) { 
                        return null
                    }
                    return user

                } catch (error) {
                    console.error("Error:",error);
                }
            },
        }),
    ],
    callbacks: {
        async session({ session }) {
            const sessionUser = await User.findOne({
                email: session.user.email
            })
            if (!sessionUser) {
                return session;
            }
            session.user = sessionUser;
            return session;
            
//  WORKS ONLY WHEN DATABASE HAVE USER DETAILS

        // async session({session}) {
        //     const sessionUser = await User.findOne({
        //         email: session.user.email
        //     })
        //     session.user = sessionUser;
        //     return session;
        // },
            
        },
    },
    cookies: {
        sessionToken: {
            name: "sessionToken", //Default "next-auth.session-token"
            options: {
                httpOnly: true,
                sameSite: 'lax',
                path: '/',
                secure: true
            }
        },
    },
    pages: {
        signIn:'/login'
    },

};
const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}