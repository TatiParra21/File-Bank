
import {create} from "zustand"

export type UserInfo ={
    id: number | null,
    email:string,

}

export type UserInfoStoreType = UserInfo & {
resetUserInfo: ()=> void,
setUserInfo: (id:number, email:string)=>void

}
export const userInfoStore = create<UserInfoStoreType>((set,get)=>({
    id: null,
    email:"",
    resetUserInfo: ()=> set({id:null,email:""}),
    setUserInfo: (id:number,email:string) => set({id:id, email:email})
}))