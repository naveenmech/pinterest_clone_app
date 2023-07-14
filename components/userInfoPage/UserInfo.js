"use client"
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const UserInfo = ({userInfo}) => {
const router = useRouter();
const {data:session}=useSession()

if(session == null){
  router.push('/')
}

const onLogoutClick=()=>{
signOut();
console.log("signout");
router.push("/");


  }

  // console.log(userInfo);
  return (
 <div className='flex flex-col items-center'>
  <Image src={userInfo.userImage} alt="userInfo" width={100} height={100} className='rounded-full'/>

  <h2 className='text-[30px] font-semibold'>{userInfo.userName}</h2>
<h2 className="text-gray-300">{userInfo.userEmail}</h2>

<div className='flex gap-2'> 

<button className='bg-gray-300 font-semibold p-2 px-4 rounded-full mt-5'>Share</button>



<button 
onClick={()=>onLogoutClick()}
className='bg-gray-300 font-semibold p-2 px-4 rounded-full mt-5  text-red-500'>Logout</button> 

</div>

    </div>
  )
}

export default UserInfo
