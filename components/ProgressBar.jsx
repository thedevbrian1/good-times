export default function ProgressBar({ percent }) {
    return (
        <div className='relative pt-2 border-2 border-red-500 border-solid w-64'>
            <div className='flex mb-2 items-center justify-between'>
                <div>
                    <span className='text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-purple-600 bg-purple-200'>
                        Uploading
                    </span>
                </div>
                <div className='text-right'>
                    <span className='text-xs font-semibold inline-block text-purple-600'>
                        {percent}%
                    </span>
                </div>
            </div>
            <div className='overflow-hidden h-2 mb-4 text-xs flex rounded bg-purple-200'>
                <div style={{width: `${percent}%`}} className='shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-500'>

                </div>
            </div>
        </div>
    )
}