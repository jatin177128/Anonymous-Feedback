import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import {z} from 'zod';
import { usernameValidation } from "@/schemas/signUpSchema";

const usernameQuerySchema = z.object({
    username: usernameValidation
})
export async function GET(request: Request) {
    //TODO: use this in all other routes
    if(request.method !== 'GET'){
        return Response.json({
            success: false, 
            message: 'Method Not Allowed'

        },{status:405})
    }
    await dbConnect();
    try {
        const {searchParams} = new URL(request.url); 
        const queryParam = {
            username: searchParams.get('username')
        }
        // validate with zod
        const result = usernameQuerySchema.safeParse(queryParam); 
        console.log("result ", result);
        if(!result.success){
            const usernameError = result.error.format().username?._errors[0] || []
            return Response.json({
                success: false, 
                message:"Invalid username"
            },{status:400}
            ) 

        } 
        const {username} = result.data;
        const existingVerifiedUser = await UserModel.findOne({username,isVerified:true}) 
        if(existingVerifiedUser){
            return Response.json({
                success: false, 
                message:"Username already exists"
            },{status:400}
            ) 
        }
        return Response.json({
            success: true, 
            message:"Username available"
        },{status:200}
        )   
    } catch (error) {
        console.error("error checking username ",   error);
        return Response.json({
            success: false, 
            message:"Error checking username"
        },{status:500}
        ) 
    }
}

