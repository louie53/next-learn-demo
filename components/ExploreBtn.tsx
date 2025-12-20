'use client'
import Image from 'next/image'
const ExploreBtn = () => {
  return (
    <a href="#event" id="explore-btn" className='mt-7 mx-auto flex items-center'>
      Explore Events
      <Image width={24} height={24} src="/icons/arrow-down.svg" alt="arrow down" />
    </a>
  )
}

export default ExploreBtn
