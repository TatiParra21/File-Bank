import express from 'express'
import cors from 'cors'
import { router } from './DB-Router'
import { prisma } from './db'
import cookieParser from "cookie-parser"
const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.use("/file-bank",router)

const PORT = 400
app.get("/verify",async(req,res)=>{
    const token = req.query.token as string
    const user = await prisma.users.findFirst({
  where: {
    verification_code: token
  }
})
    if (!user) {
    return res.status(400).send("Invalid verification token")
    }
    await prisma.user.update({
        where:{id:user.id},
        data:{
            verified:true,
            verification_code: null
        }
    })
  ///const jwtToken =  jwt.sign({userId:user.id,email:user.email, },process.env.JWT_SECRET!,{expiresIn:"1d"})
  //res.status(200).json({token:jwtToken})
  res.redirect('http://localhost:3000')
}),


app.listen(PORT,()=>{console.log(`Server running at http://localhost:${PORT}`)})