import bycrypt from 'bcrypt'



export const hashPassword = async(password:string)=>{
    const saltRounds = 10 
    const hashedPass = bycrypt.hash(password, saltRounds, (error,hash)=>{
        if (error) throw error
        else return hash
    })
    return hashedPass
}