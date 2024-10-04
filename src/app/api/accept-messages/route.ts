import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import {User} from "next-auth";
import { get } from "http";

export async function POST(request: Request) {
    await dbConnect();
    const session = await getServerSession(authOptions)
    const user :User = session?.user as User
    if(!session || !session.user){
        return Response.json({
            success: false,
            message:"Unauthorized"
        },{status:401})
    }
    const userId = user._id;
    const {acceptMesseges} = await request.json();
    try {
        const updtedUser = await UserModel.findByIdAndUpdate(
            userId,
            {isAcceptingMessages:acceptMesseges},
            {new: true}
        )
        if(!updtedUser){
            return Response.json({
                success: false,
                message:"User not found"
            },{status:404})
        }else{
            return Response.json({
                success: true,
                message:"User status updated successfully",
                updtedUser
            },{status:200})
        }
    } catch (error) {
        console.log("failed to update user status to accept messages")
        return Response.json({
            success: false,
            message:"Failed to update user status to accept messages"
        },{status:500})
    }
}
export async function GET(request: Request) {
    await dbConnect();
    const session = await getServerSession(authOptions)
    const user :User = session?.user as User
    if(!session || !session.user){
        return Response.json({
            success: false,
            message:"Unauthorized"
        },{status:401})
    }
    const userId = user._id;
   try {
    const foundUser = await UserModel.findById(userId)
    if(!foundUser){
        return Response.json({
            success: false,
            message:"User not found"
        },{status:404})
    }else{
        return Response.json({
            success: true,
            isAcceptingMessages:foundUser.isAcceptingMessage
        },{status:200})
    }
   } catch (error) {
         console.log("failed to get user status to accept messages")
         return Response.json({
              success: false,
              message:"error in getting message acceptance status "
         },{status:500})
   }
}