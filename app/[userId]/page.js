"use client"
import { useEffect, useState } from "react"

import app from "@/utils/firebaseConfig";

import { doc, getDoc,getFirestore } from "firebase/firestore";

import UserInfo from "@/components/userInfoPage/userInfo";





const  profile = ({params}) => {


const db = getFirestore(app);

const [userInfo, setUserInfo]=useState();

useEffect(()=>{
console.log(params.userId.replace("%40","@"));
if(params){
    getUserInfo(params.userId.replace("%40","@"))
}
},[params])

const getUserInfo=async(email)=>{
    const docRef = doc(db, "users", email);
const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        
        setUserInfo(docSnap.data())
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
}

  return (
    <>
 {userInfo?  
 <UserInfo userInfo={userInfo} />
 :null
} 
    </>
  )
}

export default profile
