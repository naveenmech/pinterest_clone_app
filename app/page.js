"use client"
import PinList from "@/components/pinListPage/PinList";
import app from "@/utils/firebaseConfig";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";


export default function Home() {
const db=getFirestore(app)
const [listOfPins,setListOfPins]=useState([])

useEffect(()=>{
  getAllPins();
},[])
const getAllPins =async()=>{
  const querySnapshot = await getDocs(collection(db, "pinterest-post"));
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, " => ", doc.data());
    setListOfPins((prev)=>[...prev,doc.data()]);
  });
}
 
  return (
    <>
    <PinList listOfPins={listOfPins}/>

    
    </>
  )
}
