import Image from 'next/image'
import { ArrowRightIcon } from '@heroicons/react/solid'
export default function DestinationCard() {
    return (
        <div className='bg-white shadow-md w-72 mb-8 md:mb-0'>
            <Image src='/images/hero.jpg' alt='' width={300} height={200} />
            <div className='px-4 pt-2 pb-4 flex flex-col items-start'>
                <h6 className='text-lg'>Maasai Mara</h6>
                <p className='text-blue-500 font-semibold text-lg'>Ksh 5,000</p>
                <div className='flex mt-3 cursor-default'>
                    <span className='text-base text-gray-500 hover:text-brown'>View More</span>
                    <ArrowRightIcon className='h-5 w-5 ml-2 mt-1 text-gray-500 hover:text-gray-700' />
                </div>
            </div>
            
        </div>
    )
}