"use client"
import React, { useContext, useEffect, useState } from 'react'
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineFacebook } from "react-icons/md";
import Image from 'next/image'
import Link from 'next/link';
import CartContext from '../CartContext';


function Header() {
  let [category, setcategory]=useState([])
    const [user, setUser] = useState(null);
  let {state, dispatch}=useContext(CartContext)
  useEffect(()=>{
    fetch(`/api/categories`).then(a=>a.json()).then(b=>setcategory(b))
const loggedUser = localStorage.getItem("user");
    if (loggedUser) setUser(JSON.parse(loggedUser));
    console.log("happy",state.cart)
  },[])
 const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/userlogin");
  };
  return (
    < >
      <section className='py-4 bg-red-700 text-white'>
        <div className="container mx-auto flex justify-between">
            <ul className='flex gap-3'>
              <li className='flex gap-3 items-center'><FaPhoneAlt /> 9851228383</li>

              <li>sajankafle9841@gmail.com</li>
            </ul>
             <ul className='flex gap-3'>
              <li><MdOutlineFacebook /></li>
            </ul>
        </div>
      </section>
      <section className='py-5'>
        <div className="container mx-auto flex  justify-between">
          <Image
      src="/logo.png"
      alt="Picture of the author"
      width={130}
      height={50}
    />
          <h3><Link href="/cart">Cart  {state.cart.length} </Link></h3>
           <div>
            {user ? (
              <>
                <span className="mr-4">Hello, {user.username}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link href="/userlogin" className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                Login
              </Link>
            )}
          </div>
        </div>
      </section>
      <nav className='bg-gray-700 text-white py-5'>
        <div className="container mx-auto">
            <ul className='flex gap-6'>
              <li><Link href="/">Home</Link></li>
              {category.map(a=>(
                <li key={a._id}><Link href={`/category/${a._id}`}>{a.name}</Link></li>
              ))}
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
            </ul>
        </div>
      </nav>
    </ >
  )
}

export default Header
