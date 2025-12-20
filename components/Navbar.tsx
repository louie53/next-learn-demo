import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
const Navbar = () => {
  return (
    <header>
        <nav>
            <Link href={'/'} className='logo'>
                <Image width={24} height={24} src="/icons/logo.png" alt= "logo"></Image>
                <p>DevEvent</p>
            </Link>

            <ul>
                <Link href={'/'}>Home</Link>
                <Link href={'/events'}>Events</Link>
                <Link href={'/about'}>Create Event</Link>
            </ul>
        </nav>
    </header>
  )
}

export default Navbar
