import Link from 'next/link'
import { XIcon } from '@heroicons/react/outline'
import navLinks from '../navLinks'
import classnames from 'classnames'

export default function Drawer( {open, handleDrawer} ) {
    return (
        <div className={classnames(" top-0 w-60 h-screen bg-white absolute transition duration-500 ease-in-out", {
            "left-0": open === true,
            "-left-60": open === false
        })}> 
            <div className=''>
                <XIcon className='h-8 w-8 ml-8 mt-5' onClick={handleDrawer}/>
            </div>
            <ul className='pt-10'>
                {navLinks.map((item, index) => (
                    <li key={index} className='ml-10 mt-3 hover:text-red-500'>
                        <Link href={item.path}>
                            <a>{item.name}</a>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}