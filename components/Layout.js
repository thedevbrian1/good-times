import { useEffect, useState } from "react";
import Image from 'next/image';
import Link from 'next/link';
import NavBar from "./Nav";
import Drawer from "./Drawer";

export default function Layout({ children }) {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const setResponsiveness = () => {
            return window.innerWidth < 900
                ?setIsMobile(true)
                :setIsMobile(false);
        };
        setResponsiveness();
        window.addEventListener('resize', () => setResponsiveness());

        return function cleanupListener() {
            window.removeEventListener('resize', () => setResponsiveness())
        }
    });
    return (
        <>
            <header className='relative z-10 w-full'>
                <NavBar mobileView={isMobile} />
            </header>
            <main>
                {children}
            </main>
            <footer>
                <div className='bg-footer flex flex-col md:flex-row text-white md:justify-evenly md:py-10'>
                    <Image src='/vercel.svg' alt='The Good Times logo' height={16} width={72} className='my-5' />
                    <ul className='ml-8 mt-8 md:mt-0 md:ml-0'>
                        <li className='mb-3'>
                            <Link href='/'>
                                <a>Home</a>
                            </Link>
                        </li>
                        <li className='mb-3'>
                            <Link href='/about'>
                                <a>About</a>
                            </Link>
                        </li>
                        <li className='mb-3'>
                            <Link href='/'>
                                <a>Contact Us</a>
                            </Link>
                        </li>
                    </ul>
                    <ul className='ml-8 md:ml-0'>
                        <li className='mb-3'>
                            <Link href='/packages'>
                                <a>Packages</a>
                            </Link>
                        </li>
                        <li className='mb-3'>
                            <Link href='/'>
                                <a>Services</a>
                            </Link>
                        </li>
                        <li className='mb-8'>
                            <Link href='/'>
                                <a>Special offers</a>
                            </Link>
                        </li>
                    </ul>
                    
                </div>
                <div className='bg-social h-10 flex justify-center'>
                    <div className='w-1/3 flex justify-evenly'>
                        <Image src='/facebook.svg' alt='Facebook icon' height={20} width={20} />
                        <Image src='/instagram.svg' alt='Instagram icon' height={20} width={20} />
                        <Image src='/twitter.svg' alt='Twitter icon' height={20} width={20} />
                    </div>
                </div>
            </footer>
        </>
    )
}