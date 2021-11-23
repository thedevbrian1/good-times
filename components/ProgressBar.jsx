export default function ProgressBar({ percent }) {
    return (
        <div className='relative pt-2 w-64'>
            <div className='flex mb-2 items-center justify-between'>
                <div>
                    <span className='text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200'>
                        Uploading
                    </span>
                </div>
                <div className='text-right'>
                    <span className='text-xs font-semibold inline-block text-blue-600'>
                        {percent}%
                    </span>
                </div>
            </div>
            <div className='overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200'>
                <div style={{width: `${percent}%`}} className='shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500'>

                </div>
            </div>
        </div>
    )
}