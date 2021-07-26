import { useEffect, useState } from "react";
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
    }, [isMobile]);
    return (
        <>
            <header className='relative z-10 w-full'>
                <NavBar mobileView={isMobile} />
            </header>
            <main>
                {children}
            </main>
            <footer>
                <h1>Footer</h1>
            </footer>
        </>
    )
}