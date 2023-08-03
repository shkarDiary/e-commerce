import { NextRequest, NextResponse } from "next/server";
import {connect} from '@/dbConfig/dbConfig'
import model from '@/models/user'
import jwt from 'jsonwebtoken'
import bcryptjs from 'bcrypt'

connect()


export async function POST(request:NextRequest){
    const {email, password} = await request.json()

    console.log(email+ password)

    const user = await model.findOne({email})

    console.log(user)

    if(!user){
        return NextResponse.json({error: "User does not exist"}, {status: 400})
    }
    const validPassword = await bcryptjs.compare(password, user.password)
    if(!validPassword){
        return NextResponse.json({error: "Invalid password"}, {status: 400})
    }
    const tokenData = {
        id: user._id,
        name: user.name,
        email: user.email
    }
    //create token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"})

    const response = NextResponse.json({
        message: "Login successful",
        success: true,
    })
    response.cookies.set("token", token, {
        httpOnly: true, 
        
    })
    return response;


}