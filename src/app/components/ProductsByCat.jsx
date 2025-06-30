"use client"
import React, { useEffect, useState } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay,Pagination } from 'swiper/modules';


function ProductsByCat(props) {
    
   let [productsByCat, setProductsBycat]=useState([])
   useEffect(()=>{
  fetch(`/api/products?category=${props.catId}`).then(a=>a.json()).then(b=>setProductsBycat(b))
   },[])
   console.log("setProductsBycat",productsByCat)
  return (
    < >
       <section className='py-5'>
        <div className="container mx-auto">
            <h3 className='font-bold py-3 text-3xl'>Product By {props.catName}</h3>
             <Swiper
        slidesPerView={4}
        spaceBetween={30}
         autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination,Autoplay]}
        className="mySwiper"
      >
        {productsByCat.map(a=>(
 <SwiperSlide key={a._id}><img src={a.image} alt="" />
 <p className='py-4 font-bold'>{a.title}</p>
 <button className='bg-red-400 text-white p-2'>Add to Cart</button>
 </SwiperSlide>
        ))}
       
         
        
      </Swiper>
        </div>
       </section>
    </ >
  )
}

export default ProductsByCat
