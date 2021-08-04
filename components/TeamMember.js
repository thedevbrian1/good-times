import Image from 'next/image'

export default function TeamMember() {
    return (
        <div>
            <Image src='/images/hero.jpg' width={200} height={150} alt='Picture of a person' className='rounded-lg' />
            <h6 className='text-lg'>
                John Doe
            </h6>
            <p className='text-gray-500 text-sm mt-1'>CEO</p>
        </div>
    )
}