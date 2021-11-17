import Image from 'next/image'

export default function TaskSuccessful({ text }) {
    return (
        <div className='flex justify-center'>
            <span className='text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200'>
                {text}
            </span>
            <Image src='/checked.svg' alt='Checked icon' height={20} width={20}/>
        </div>
    )
}