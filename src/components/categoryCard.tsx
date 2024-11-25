import Image from 'next/image'
import React from 'react'
import categoryImg1 from '@/images/categoryCartImg1.png'
import categoryImg2 from '@/images/categoryCartImg2.png'
import categoryImg3 from '@/images/categoryCartImg3.png'

const categoryCard = () => {

  return (
    <div className='hidden md:flex items-center justify-center gap-10 '>
      <Image
      src={categoryImg1}
      alt="Category1"
      className=' w-auto h-52'
    />
      <Image
      src={categoryImg2}
      alt="Category2"
      className=' w-auto h-52'
    />
      <Image
      src={categoryImg3}
      alt="Category3"
      className=' w-auto h-52'
    />

    </div>
  )
}

export default categoryCard
