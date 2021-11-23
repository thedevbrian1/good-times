import Image from 'next/image'

export default function TaskSuccessful({ text }) {
    return (
        <div className='flex justify-center'>
            <span className='text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-100'>
                {text}
            </span>
            {/* <Image src='/checked.svg' alt='Checked icon' height={20} width={20}/> */}
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </div>
    )
}