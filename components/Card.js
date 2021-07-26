import Image from 'next/image'
import { ArrowRightIcon, StarIcon, ClockIcon } from '@heroicons/react/solid'
export default function Card() {
    return (
        <div className='pb-10'>
            <Image
                src='/images/hero.jpg'
                alt='man diving into the ocean'
                width={350}
                height={200}
                className='rounded-lg shadow-md'
            />

            <div className='w-72   relative px-4 -mt-16'>
                <div className='bg-white p-6  h-52 rounded-lg shadow-lg'>
                    <h4 className='mt-1 text-xl font-semibold uppercase leading-tight'>
                        Maasai Mara
                    </h4>
                    <div className='flex mt-1'>
                        <ClockIcon className='h-5 w-5 text-gray-500' />
                        <span className='text-gray-500 text-sm ml-1'>2 days</span>
                    </div>
                    <div className='flex h-8 pt-2 items-center'>
                        <StarIcon className='h-5 w-5 text-yellow-500' />
                        <span className='text-gray-500'>5.0</span>
                    </div>
                    <h6 className='mt-3 text-black text-lg text-blue-500 text-xl'>
                        Ksh 5,000
                    </h6>
                    {/* <button className='bg-blue-500 py-3 px-8 mt-4 rounded text-white font-semibold hover:bg-blue-400'>
                        View More
                    </button> */}
                    <div className='flex mt-3 ml-10 h-7 w-32 border-solid border-red-500 border-2 justify-center hover:text-blue-500'>
                        <span className='text-base hover:cursor-pointer'>View More</span>
                        <ArrowRightIcon className='h-6 w-6 ml-2' />
                    </div>
                </div>
            </div>
        </div>
    )
}