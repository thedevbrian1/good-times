import Image from 'next/image'
export default function DestinationImg() {
    return (
        <div className='relative mb-6 md:mb-0'>
            <Image src="/images/hero.jpg" alt="" height="287" width="240" />
            <div className="bg-black bg-opacity-50 hover:bg-opacity-70 h-72 w-60 absolute top-0 flex justify-center items-center">
                <h6 className='text-white text-2xl'>Nakuru</h6>
            </div>
        </div>
    )
}