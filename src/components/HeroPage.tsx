'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import heroImage from '@/images/banner.png';
import heroImage2 from '@/images/banner2.png';
import CategoryCard from "@/components/categoryCard";


const HeroPage = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = [heroImage, heroImage2];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); // Change image every 3 seconds
        return () => clearInterval(interval);
    }, [])

    return (
        <div className='container w-screen flex items-center flex-col justify-center'>
            <Image
                src={heroImage}
                alt="Hero Image"
                className=' my-10'
            />
            <CategoryCard />
        </div>
    )
}

export default HeroPage
