export default function TestimonialCard(){
    return (
        <div className='flex w-96 h-64 border-solid border-red-500 border-2'>
            <img src="/images/hero.jpg" alt="" width='150' height='100' />
            <div className='flex flex-col justify-between'>
                <img src="/left-quote.svg" alt="Left quotation mark" height='20' width='20' className='mx-3 mt-2 text-gray-500' />
                <p className='px-4 py-1'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos earum voluptates molestias animi 
                </p>
                <div className='px-4 pb-2'>
                    <h6 className='font-bold'>John Doe</h6>
                    <p className='text-gray-500 text-sm'>Chief Marketing Officer</p>
                </div>
            </div>
        </div>
    )
}