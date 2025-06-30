"use client"
import Link from 'next/link'
import React from 'react'
import { useRouter } from "next/navigation";


function DashboardLayout({children}) {
  const router = useRouter();
    const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  
  return (
    <div>
      <div className="container mx-auto flex ">
        <div className='w-[20%] bg-sky-500 h-full '>
            <aside className='flex'>
        <nav>
            <ul className='flex flex-col space-y-3 p-4'>
                <li><Link href='/dashboard'>Dashboard</Link></li>
                <li><Link href='/dashboard/categories'>Category</Link></li>
                <li><Link href='/dashboard/products'>Product</Link></li>
                 <li><Link href='/dashboard/orders'>Order</Link></li>
                <button className='bg-red-800 p-3 text-white' onClick={handleLogout}>Logout</button>
            </ul>
        </nav>
      </aside>
        </div>
        <div className='bg-red-400 w-[80%] p-5' >
            <h1>Welcome to Dashboard</h1>
            {children}
            </div>     
      </div>
    </div>
  )
}

export default DashboardLayout
