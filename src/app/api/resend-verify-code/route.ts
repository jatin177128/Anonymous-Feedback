import dbConnect from "@/lib/dbConnect";
import UserModel, { User } from "@/model/User";

import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

import { authOptions } from "../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export async function POST(request:Request){
    await dbConnect();
    const {username} = await request.json()
    const decodedUsername = decodeURIComponent(username);
    const verifyCode = Math.floor(100000+Math.random()*900000).toString()
    const user = await UserModel.findOne({username:decodedUsername});
    if(!user){
        return Response.json({
            success: false, 
            message:"User not found"
        },{status:404}
        )
    } 
    const email = user.email;
        const emailResponse = await sendVerificationEmail(
            email,
            username,
            verifyCode
        )
        if(!emailResponse.success){
            return Response.json({
                success: false,
                message: emailResponse.message
            },{status:500})
        }
        return Response.json({
            success: true,
            message: "Email sent successfully"
        },{status:201})
} 
