import Image from 'next/image'

export default function DestinationImg({ destination }) {

    // const myLoader = ({ src }) => {
    //     return `${process.env.NEXT_PUBLIC_DOMAIN}${src}`;
    // };

    // console.log(process.env.NEXT_PUBLIC_DOMAIN);
    return (
        <div className='relative mb-6 md:mb-0'>
            <Image 
                //loader={myLoader}
                src={destination.image[0].url}
                alt={destination.image[0].alternativeText} 
                height="287" 
                width="240"
             />
            <div className="bg-black bg-opacity-50 hover:bg-opacity-70 h-72 w-60 absolute top-0 flex justify-center items-center">
                <span className='font-display text-white text-2xl'>{destination.name}</span>
            </div>
        </div>
    )
}