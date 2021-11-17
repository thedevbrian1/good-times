import { PencilIcon, TrashIcon } from "@heroicons/react/outline"

export default function AdminCard({ individualObj }) {
    //console.log('Individual: ',individualObj)
    return (
        <div>
            <div className=' w-full md:w-1/2 flex justify-end '>
                <PencilIcon className='h-5 w-5 hover:text-gray-700' />
                <TrashIcon className='h-5 w-5 ml-5 text-red-500 hover:text-red-400' />
            </div>
            <div className='w-full md:w-1/2 h-16  shadow-md flex justify-center items-center'>
                <p className='text-lg'>{individualObj.name}</p>
            </div>
        </div>
    )
}