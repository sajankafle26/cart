"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

function page() {
    const router=useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e)=>{
      e.preventDefault()
      console.log(username, password)
      
      if(username === 'admin' && password === 'admin'){
        const token = localStorage.setItem('token', "vaid")
        router.push('/dashboard')
      }else{
        alert("invalid data")
      }
  }

  
  return (
    <div className="flex justify-center align-middle items-center mt-[70px] ">
   <form action="" onSubmit={handleSubmit}>
     <div className='bg-white shadow border  w-[500px] p-4 space-y-3 text-black'>
        <label htmlFor="">Username</label>
        <br />
      <input type="text" className='w-full border' name='username' onChange={(e)=> setUsername(e.target.value)}/>
      <br />
      <label htmlFor="">Password</label>
      <br />
      <input type="password" className='w-full border' name='password' onChange={(e)=> setPassword(e.target.value)}/>
      <br />
      <button className='bg-blue-500 text-white p-2  w-full'>Login</button>
    </div>
   </form>
    </div>
  )
}

export default page
