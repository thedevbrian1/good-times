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
            <div className='bg-transparent h-16 flex justify-between items-center'>
                <MenuIcon className='h-7 w-7 ml-8 text-white' onClick={handleDrawerOpen} />
                {/* {isOpen ?
                    <XIcon className='h-8 w-8 ml-8' onClick={handleDrawerOpen} />:
                    <MenuIcon className='h-7 w-7 ml-8' onClick={handleDrawerOpen} />
                } */}
                <div className='justify-self-center'>
                    <img
                        src="./vercel.svg"
                        alt="The Good Times logo"
                        height='80'
                        width="80"
                        className="pt-5" />
                </div>
            </div>
            <Drawer open={isOpen} handleDrawer={handleDrawerOpen} />
        </>
    )
}

function DesktopNav() {
    return (
        <div className='bg-transparent h-16 p-4 flex justify-between items-center'>
            <div className='flex items-center'>
                <img 
                    src="./vercel.svg"
                    alt="The Good Times logo"
                    width="80"
                    height="80"
                    className='pt-5'
                 />
            </div>
            <div className='flex'>
                {navLinks.map((item, index) => (
                    <div className='h-16 w-auto mx-1 p-1 flex items-center justify-center' key={index}>
                        <Link href={item.path}>
                            <a className='text-black mr-3 hover:text-red-500'>
                                {item.name}
                            </a>
                        </Link>
                    </div>
                ))}
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