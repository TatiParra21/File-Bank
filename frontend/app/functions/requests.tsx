


export const signUp =async(email :string, password:string)=>{
    const data = {email, password}
    try{
         const res = await fetch(`http://localhost:400/file-bank/sign-up`,{method:"POST",
        headers:{
            "Content-type": 'application/json'
        },body: JSON.stringify(data)
    })
    const response = await res.json()
    console.log(response, "HEW")

    }catch(err){
        console.log(err, "err")
    }
   
}

export const logIn =async(email :string, password:string)=>{
    const data = {email,password}
    const res = await fetch(`http://localhost:400/file-bank/log-in`,{method:"POST",
        headers:{
            "Content-type": 'application/json'
        },body: JSON.stringify(data)
    })
    const response = await res.json()
    console.log(response, "HEW")
}

const verifyUserNow =async()=>{
   const  res = await fetch(`http://localhost:400/me`)
   const response = res.json()
   console.log(response, "respons")
}