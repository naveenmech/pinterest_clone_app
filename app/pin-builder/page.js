"use client"
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import app from "@/utils/firebaseConfig";

const PinBuilder = () => {
  const {data:session}=useSession();
  const [title,setTitle]=useState();
  const [desc,setDesc]=useState();
  const [link,setLink]=useState();
  const [file,setFile]=useState();
  const [selectedFile,setSelectedFile]=useState();


// upload from firebase
  const storage = getStorage(app);

  const onSave =()=>{
    console.log("Title",title,"Desc",desc,"Link",link,"File",file);
    uploadFile();
  }

  const uploadFile=()=>{
    const storageRef =ref(storage,"pinterest/"+file.name);
    uploadBytes(storageRef, file).then((snapshot) => {
      console.log(' File Uploaded');
    });
  }

  return (
    <>

<div

className="hero min-h-screen bg-base-200">
  
  <div 
 
  className="hero-content flex-col lg:flex-row">
      <div>
    <img src={session?.user.image} alt='userImage' height={200} width={200} className="max-w-sm rounded-full shadow-2xl " />
    <h2  className='mt-2'>{session?.user.email}</h2>
  </div>

    <div className='flex flex-col gap-2'>
      
      <input 
      onChange={(e)=>setTitle(e.target.value)} type="text" placeholder="Add your title" 
      className="input input-bordered input-warning w-full max-w-xs text-xl font-bold" />
     

      <textarea
      onChange={(e)=>setDesc(e.target.value)} 
      placeholder="tell everyone whats your pin is about" className="h-[8rem] input input-bordered input-warning w-full max-w-xs text-[16px] font-medium" ></textarea>


      <input
      onChange={(e)=>setLink(e.target.value)} 
      type="text"
      placeholder="add a destination link" 
      className="input input-bordered input-warning w-full max-w-xs text-[16px] font-medium" />


      <input 
    
      type="file" 
      className="file-input file-input-bordered file-input-warning w-full max-w-xs"  
       onChange={(e)=>{setFile(e.target.files[0]);
        setSelectedFile(e.target.files[0])} }/>

      <div className='ml-[8rem]'> 

      <button 
       onClick={()=>onSave()}
      className="btn btn-primary w-[12rem]">Get Started</button>

      </div>

    </div>
  </div>
  </div>

      
    </>
  )
}

export default PinBuilder
