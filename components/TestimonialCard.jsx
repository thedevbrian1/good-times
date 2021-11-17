import Image from 'next/image'

export default function TestimonialCard({ testimonial }){
    return (
        <div className='flex w-96 h-64 bg-gray-100 rounded-lg  '>
            <Image 
                src={testimonial.image[0].url}
                alt='Picture of a person'
                width={400}
                height={100}
            />
            <div className='flex flex-col justify-between'>
                <img src="/left-quote.svg" alt="Left quotation mark" height='20' width='20' className='mx-3 mt-4 text-gray-500' />
                <p className='font-display px-4 py-1'>
                    {testimonial.details} 
                </p>
                <div className='px-4 pb-2'>
                    <p className='font-display font-bold'>{testimonial.name}</p>
                    <p className='font-display text-gray-500 text-sm'>{testimonial.title}</p>
                </div>
            </div>
        </div>
    )
}