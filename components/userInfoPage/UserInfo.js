"use client"
import Image from 'next/image';
import React, { useEffect } from 'react'

const UserInfo = ({userInfo}) => {

  // console.log(userInfo);
  return (
    <div className='flex flex-col items-center'>
  <Image src={userInfo.userImage} alt="userInfo" width={100} height={100} className='rounded-full'/>

  <h2 className='text-[30px] font-semibold'>{userInfo.userName}</h2>
<h2 className="text-gray-300">{userInfo.userEmail}</h2>

<button className='bg-gray-300 font-semibold p-2 px-4 rounded-full mt-5'>Share</button>

    </div>
  )
}

export default UserInfo
