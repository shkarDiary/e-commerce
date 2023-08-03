import { NextRequest, NextResponse } from "next/server";
import {connect} from '@/dbConfig/dbConfig'
import model from '@/models/user'
import jwt from 'jsonwebtoken'
import bcryptjs from 'bcrypt'

connect()


export async function POST(request:NextRequest){
    const {name, email, password} = await request.json()

    console.log(name+ email+ password)

     //hash password
     const salt = await bcryptjs.genSalt(10)
     const hashedPassword = await bcryptjs.hash(password, salt)

     const newUser = new model({
         name,
         email,
         password: hashedPassword
     })

     const savedUser = await newUser.save()
     console.log(savedUser);

     //send verification email

     return NextResponse.json({
         message: "User created successfully",
         success: true,
         savedUser
     })
     
     

    


}