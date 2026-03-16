
import express from  'express'
import type { Request,Response, Router } from "express"
import crypto from "crypto";
import bcrypt from 'bcrypt'
import { prisma } from './db';
import { sendVerificationEmail } from './node-mailer';
import { hashPassword } from './hashPassword'
import jwt from 'jsonwebtoken'
export const router : Router = express.Router()


router.post("/sign-up",async(req:Request,res:Response)=>{
    console.log("worked???")
    const {email, password} = req.body
    const hashedPassword = await hashPassword(password)
    const verificationToken = crypto.randomBytes(32).toString("hex");
await prisma.users.create({
  data: {
    email: email,
    password_hash: hashedPassword,
    verified: false,
    verification_code: verificationToken
  }
})
sendVerificationEmail(email,verificationToken)

     res.status(200).json({email, password, message:"recived"})
})

router.post("/log-in",async(req:Request,res:Response)=>{   
    const {email, password} = req.body
    const user = await prisma.users.findUnique({where:{email:email, verified: true}})
    if(!user) res.status(400).json({message: "No user found"})
        const passwordCompare = bcrypt.compare(password, user.password)
    if(!passwordCompare) res.status(400).json({message: "incorrect email or password"})
    const token = jwt.sign({userId:user.id,email:user.email},process.env.JWT_SECRET!, {expiresIn:"1d"})
     res.cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: false, // true in production (https)
  })
     res.status(200).json({authorized:true})
})