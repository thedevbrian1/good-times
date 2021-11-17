import Image from 'next/image'
import Link from 'next/link'
import { ArrowRightIcon } from '@heroicons/react/solid'

export default function DestinationCard({ destination }) {

    // const myLoader = ({ src }) => {
    //     return `${process.env.NEXT_PUBLIC_DOMAIN}${src}`;
    // };

    function stringToSlug(str) {
        str = str.replace(/^\s+|\s+$/g, '');
        str = str.toLowerCase();
    
        const from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
        const to   = "aaaaeeeeiiiioooouuuunc------";
    
        for (let i = 0, l = from.length; i < l; i++) {
            str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
        }
    
        str = str.replace(/[^a-z0-9 -]/g, '')
              .replace(/\s+/g, '-')
              .replace(/-+/g, '-');
    
        return str;
    }
    return (
        <div className='bg-white shadow-md w-64 lg:w-72 mb-8 lg:mb-0'>
            <Image 
                //loader={myLoader}
                src={destination.image[0].url} 
                alt={destination.image[0].alternativeText}
                width={300} 
                height={200} 
            />
            <div className='font-display px-4 pt-2 pb-4 flex flex-col items-start'>
                <p className='text-lg'>{destination.name}</p>
                <p className='text-blue-500 font-semibold text-lg'>Ksh {destination.price}</p>
                <Link href={`/packages/${destination.slug}`}>
                    <a>
                        <div className='flex mt-3 cursor-default hover:text-brown'>
                            <span className='underline text-base text-gray-500 hover:text-brown'>Explore Package</span>
                            <ArrowRightIcon className='h-5 w-5 ml-2 mt-1 text-gray-500 hover:text-brown' />
                        </div>
                    </a>
                </Link>
                
            </div>
            
        </div>
    )
};