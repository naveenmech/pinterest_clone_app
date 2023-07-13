"use client"
import { useEffect, useState } from "react"

import app from "@/utils/firebaseConfig";



import UserInfo from "@/components/userInfoPage/UserInfo";
import PinList from "@/components/pinListPage/PinList";
import { useSession,} from "next-auth/react"

import { collection, getDocs, getFirestore, query, where, doc, getDoc } from 'firebase/firestore'





const  profile = ({params}) => {

  const {data:session}=useSession()

const db = getFirestore(app);

const [userInfo, setUserInfo]=useState();
const [listOfPins,setListOfPins]=useState([]);

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


// 

// const db=getFirestore(app); 

useEffect(()=>{
    if(session?.user){
        getUserPins();

    }
},[userInfo])



    const getUserPins=async()=>{
        const q = query(collection(db, "pinterest-post"), where("userEmail", "==", session?.user?.email));

const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots

  setListOfPins(listOfPins=>[...listOfPins,doc.data()])
});

    }
 

  return (
    <>


{userInfo?
(
  <div>
 <UserInfo userInfo={userInfo} />
<PinList listOfPins={listOfPins}/>


  </div>
): null} 
    </>
  )
}

export default profile
