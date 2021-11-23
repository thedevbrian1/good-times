import Image from 'next/image'

export default function TestimonialCard({ testimonial }){
    return (
        // <div className='flex w-full lg:w-96 h-64 bg-gray-100 rounded-lg  border-2 border-solid border-red-500'>
        //     <div className='relative w-1/2  '>
        //         <Image 
        //             src={testimonial.image[0].url}
        //             alt='Picture of a person'
        //             // width={400}
        //             // height={100}
        //             layout='fill'
        //             // className='object-contain relative w-full'
        //             objectFit='cover'
        //         />
        //     </div>
            
        //     <div className='flex flex-col justify-between'>
        //         <img src="/left-quote.svg" alt="Left quotation mark" height='20' width='20' className='mx-3 mt-4 text-gray-500' />
        //         <p className='font-display px-4 py-1'>
        //             {testimonial.details} 
        //         </p>
        //         <div className='px-4 pb-2'>
        //             <p className='font-display font-bold'>{testimonial.name}</p>
        //             <p className='font-display text-gray-500 text-sm'>{testimonial.title}</p>
        //         </div>
        //     </div>
        // </div>

        
        <div className="flex items-center justify-center px-5 py-5">
            <div className="w-full mx-auto max-w-xl rounded-lg bg-white dark:bg-gray-800 shadow-lg px-5 pt-5 pb-10 text-gray-800 dark:text-gray-50">
                <div className="w-full pt-1 text-center pb-5  mx-auto">
                    {/* <img alt="profil" src="/images/hero.jpg" className="mx-auto object-cover rounded-full h-20 w-20 " /> */}
                    <Image 
                        src={testimonial.image[0].url}
                        alt='Picture of a person'
                        width={70}
                        height={70}
                        objectFit='cover'
                        className='rounded-full'
                    />
                </div>
                <div className="w-full mb-10">
                    <div className="text-3xl text-brown text-left leading-tight h-3">
                        “
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-100 text-center px-5">
                        {testimonial.details}
                    </p>
                    <div className="text-3xl text-brown text-right leading-tight h-3 -mt-3">
                        ”
                    </div>
                </div>
                <div className="w-full">
                    <p className="text-md bg-clip-text bg-gradient-to-r from-brown to-red-500 font-bold text-center">
                        {testimonial.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-300 text-center">
                        {testimonial.title}
                    </p>
                </div>
            </div>
        </div>



    )
}