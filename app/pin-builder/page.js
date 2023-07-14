"use client"
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useSession } from 'next-auth/react'
import  { useState } from 'react'
import app from "@/utils/firebaseConfig";
import { doc, getFirestore, setDoc } from "firebase/firestore";
// import Image from "next/image";
import { useRouter } from "next/navigation";


const PinBuilder = () => {


const router=useRouter();

  const {data:session}=useSession();
  const [title,setTitle]=useState();
  const [desc,setDesc]=useState();
  const [link,setLink]=useState();
  const [file,setFile]=useState();
  const [selectedFile,setSelectedFile]=useState();
  const [loading,setLoading]=useState(false);


// upload from firebase
  const storage = getStorage(app);
  const db=getFirestore(app);
  const postId=Date.now().toString();

  const onSave =()=>{
    setLoading(true);
    uploadFile();
  }

  const uploadFile=()=>{
    const storageRef =ref(storage,"pinterest/"+file.name);
    uploadBytes(storageRef, file).then((snapshot) => {
      console.log(' File Uploaded');

    }).then(resp=>{getDownloadURL(storageRef).then( async (url)=>{
      console.log("DownloadUrl",url);

const postData={
  title : title ,
  desc : desc,
  link : link, 
  image : url,
  userName: session.user.name,
  userEmail: session.user.email,
  userImage: session.user.image,
  id:postId,

}
await setDoc (doc(db, "pinterest-post",postId),postData).then(resp=>{
  console.log(`Post added `);
  setLoading(true);
  router.push("/"+session.user.email)
})
    })

    })
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
      className="btn btn-primary w-[12rem]"> 
      {loading?
      <span className="loading loading-bars loading-lg"></span>:
      <span>  Save</span>
    
      }
     


      </button>

      </div>

    </div>
  </div>

  </div>

      
    </>
  )
}

export default PinBuilder
