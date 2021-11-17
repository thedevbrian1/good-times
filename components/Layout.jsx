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
            <header className='absolute z-10 w-full'>
                {/* <Link href="/#main-content">
                    <a>Skip to main content</a>
                </Link> */}
                <NavBar mobileView={isMobile} />
            </header>
            <main id="main-content">
                {children}
            </main>
            <footer className='relative bottom-0'>
                <div className='bg-footer flex flex-col lg:flex-row text-white md:justify-evenly md:py-10'>
                    <Image src='/logo.svg' alt='The Good Times logo' height={110} width={110} className='' />
                    <ul className='font-display ml-8 mt-8 lg:mt-0 lg:ml-0'>
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
                            <Link href='/#contact-us'>
                                <a>Contact Us</a>
                            </Link>
                        </li>
                    </ul>
                    <ul className='font-display ml-8 lg:ml-0'>
                        <li className='mb-3'>
                            <Link href='/packages'>
                                <a>Packages</a>
                            </Link>
                        </li>
                        <li className='mb-3'>
                            <Link href='/#services'>
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
                <div className='bg-social h-12 flex justify-center'>
                    <div className='w-1/3 flex justify-evenly mt-4'>
                        <a href="https://facebook.com/goodtimeske">
                            <Image src='/facebook.svg' alt='Facebook icon' height={20} width={20} />
                        </a>
                        <a href="https://instagram.com/_goodtimeske">
                            <Image src='/instagram.svg' alt='Instagram icon' height={20} width={20} />
                        </a>
                        <a href="https://twitter.com/_goodtymeske">
                            <Image src='/twitter.svg' alt='Twitter icon' height={20} width={20} />
                        </a>
                    </div>
                </div>
            </footer>
        </>
    )
}