import Image from 'next/image'
import { HiOutlineSearch,HiOutlineBell,HiChatAlt2 } from "react-icons/hi";
import { useSession, signIn, signOut } from "next-auth/react"
import { getFirestore,doc, setDoc } from "firebase/firestore";
import app from '@/utils/firebaseConfig';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Header = () => {

// next auth session

const { data: session } = useSession()

// router

const router= useRouter();

// console.log(session);

const db = getFirestore(app);
useEffect(()=>{
  saveUserInfo();
},[session])

const saveUserInfo=async()=>{
if(session?.user){
  await setDoc(doc(db, "users", session.user.email), {
    userName: session.user.name,
    email: session.user.email,
    Image: session.user.image,
  });
  


}

}

  return (
    <>
        <div className='flex   items-center p-6 gap-3'>
      <Image src="/pinterest-logo.png"  alt='logo' width={60}  height={60} className=' p-2 hover:bg-gray-300 rounded-full cursor-pointer'  />
      <button className='bg-black text-white rounded-full px-4   p-2'>Home</button>
      <button className='rounded-full  px-4   p-2 font-semibold border-gray-200 border-2'>Create</button>

      {/* add search input */}

<div className=' flex gap-3 bg-slate-300 items-center rounded-full p-2 w-full'>


<HiOutlineSearch className='text-gray-700 text-[25px]'/>
<input type='text' placeholder='search' className='bg-transparent outline-none'/>


</div>


<HiOutlineBell className='text-[40px] text-gray-900'/>
<HiChatAlt2 className='text-[40px] text-gray-900'/>


{ session?. user? <Image src={session?.user?.image}
onClick={()=>router.push("/" + session.user.email)}
alt='/profile' width={60}  height={60} className=' hover:bg-gray-300 rounded-full p-2 cursor-pointer' />:



<button onClick={() => signIn()} className='rounded-full  px-4   p-2 font-semibold border-gray-200 border-2'>Login</button> }



    </div>
    </>
  )
}

export default Header
