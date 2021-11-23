import { useState } from "react";
import Link from "next/link";
import Image from 'next/image';
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import Drawer from './Drawer';
import navLinks from "../navLinks";

function MobileNav() {
    const [isOpen, setIsopen] = useState(false);

    const handleDrawerOpen = () => {
        setIsopen(!isOpen);
    }
    return (
        <>
            <div className='bg-blue-200 bg-opacity-50 backdrop-filter backdrop-blur-sm h-16 flex justify-between items-center'>
                <MenuIcon className='h-7 w-7 ml-8 text-white' onClick={handleDrawerOpen} />
                <div className='justify-self-center mt-4'>
                    <Image 
                        width={100}
                        height={100}
                        src="/goodtimes-logo.png"
                        alt="The Good Times logo"
                    />
                </div>
            </div>
            <Drawer open={isOpen} handleDrawer={handleDrawerOpen} />
        </>
    )
}

function DesktopNav() {
    return (
        <div className='bg-blue-200 bg-opacity-50 backdrop-filter backdrop-blur-sm h-16 p-4 flex justify-between items-center'>
            <div className='flex items-center mt-5'>
                <Image
                     width={160}
                     height={160}
                     src="/goodtimes-logo.png"
                     alt="The Good Times logo"
                />
                 
            </div>
            <div className=''>
                <ul>
                {navLinks.map((item, index) => (
                    <li className='inline-block px-6' key={index}>
                        <Link href={item.path}>
                            <a className='font-display text-white hover:text-brown text-lg uppercase font-bold transition duration-300 ease-in-out'>{item.name}</a>
                        </Link>
                    </li>
                ))}
                </ul>
                
            </div>
        </div>
    )
}

export default function NavBar({ mobileView }) {
    if (mobileView === true) {
        return <MobileNav />;
    } else {
        return <DesktopNav />;
    }
}