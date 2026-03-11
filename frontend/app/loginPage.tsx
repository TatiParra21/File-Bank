import { JSX } from "react"

export const LoginPage =():JSX.Element=>{
    return(
         <section className="flex flex-col bg-[#E7F1EF] align-center h-[100svh] justify-center">
            <form className="flex flex-col align-center content-center items-center">
              
                <label className="flex flex-col text-[#173631]" htmlFor="email">Email:
                <input className="border border-solid border-2px border-black" id='email' name="email" type="email"></input>
                </label>
                <label className="flex flex-col text-[#173631]" htmlFor="password">Password:
                <input className="border border-solid border-2px border-black" id='password' name="password" type="password"></input>
                </label>
                
                <button className="px-4 py-2 mt-2 rounded-md bg-[#173631] text-[#FEEA16]">Submit</button>
            </form>
    </section>

    )
   
}