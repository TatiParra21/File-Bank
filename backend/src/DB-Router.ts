
import express from  'express'
import type { Request,Response, Router } from "express"
import crypto from "crypto";
import bcrypt from 'bcrypt'
import { prisma } from './db';
import { sendVerificationEmail } from './node-mailer';
import { hashPassword } from './hashPassword'
import jwt from 'jsonwebtoken'
export const router : Router = express.Router()
import dotenv from "dotenv";
dotenv.config();

router.post("/sign-up",async(req:Request,res:Response)=>{
    console.log("worked???")
    console.log(process.env.DATABASE_URL, "DATABASE URL")
    const {email, password} = req.body
    const hashedPassword = await hashPassword(password)
    console.log(hashedPassword, "hass")
    const verificationToken = crypto.randomBytes(32).toString("hex");
    try{
        await prisma.users.create({
  data: {
    email: email,
    password_hash: hashedPassword,
    verified: false,
    verification_code: verificationToken
  }
})
console.log("was it here", verificationToken)
sendVerificationEmail(email,verificationToken)
        
    }catch(err){
        console.error(err, "ERROR WAS HERE")
       return res.status(400).json({message: err,})
    }




     res.status(200).json({ message:"recived"})
})

router.post("/log-in",async(req:Request,res:Response)=>{   
    const {email, password} = req.body
    const user = await prisma.users.findUnique({where:{email:email, verified: true}})
    if(!user) return res.status(400).json({message: "No user found"})
        const passwordCompare = bcrypt.compare(password, user.password_hash)
    if(!passwordCompare) res.status(400).json({message: "incorrect email or password"})
    const token = jwt.sign({userId:user.id,email:user.email},process.env.JWT_SECRET!, {expiresIn:"1d"})
     res.cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: false, // true in production (https)
  })
     res.status(200).json({authorized:true})
})