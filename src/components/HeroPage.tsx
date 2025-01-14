'use client'

import Image from 'next/image'
import heroImage from '@/images/banner.png';
import CategoryCard from "@/components/categoryCard";

const HeroPage = () => {

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
