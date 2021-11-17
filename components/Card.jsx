import Image from 'next/image'
import { ArrowRightIcon, StarIcon, ClockIcon } from '@heroicons/react/solid'
import Link from 'next/link'

export default function Card({ destination }) {

    // const myLoader = ({ src }) => {
    //     return `${process.env.NEXT_PUBLIC_DOMAIN}${src}`;
    // };

    return (
        <div className='pb-10 w-64 lg:w-80'>
            <Image
                //loader={myLoader}
                src={destination.image[0].url}
                alt={destination.image[0].alternativeText}
                width={350}
                height={200}
                className='rounded-lg shadow-md'
            />

            <div className='w-60 lg:w-72   relative px-4 -mt-16'>
                <div className='bg-white p-6   rounded-lg shadow-lg'>
                    <h3 className='mt-1 text-base lg:text-xl font-display font-bold uppercase leading-tight'>
                        {destination.name}
                    </h3>
                    <div className='flex mt-1'>
                        <ClockIcon className='h-4 lg:h-5 w-4 lg:w-5 text-gray-500' />
                        <span className='text-gray-500 text-sm ml-1'>{destination.duration}</span>
                    </div>
                    <div className='flex h-8 pt-2 items-center'>
                        <StarIcon className='h-5 w-5 text-yellow-500' />
                        <span className='text-gray-500'>5.0</span>
                    </div>
                    <p className='font-display mt-3  text-blue-500 text-xl'>
                        Ksh {destination.price}
                    </p>
                    <Link href={`/packages/${destination.slug}`}>
                        <a>
                            <div className='flex mt-3  w-44 cursor-default justify-start hover:text-brown '>
                                <span className='font-display underline text-sm lg:text-base text-gray-500 hover:text-brown'>Explore Package</span>
                                <ArrowRightIcon className='h-5 lg:h-6 w-5 lg:w-6 ml-2 pt-1 lg:pt-0' />
                            </div>
                        </a>
                    </Link>
                    
                </div>
            </div>
        </div>
    )
}