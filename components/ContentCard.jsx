import Link from 'next/link'
import { PencilIcon, TrashIcon } from "@heroicons/react/outline"
import Modal from "./Modal"
import axios from 'axios'
import { useRouter } from 'next/router';

export default function ContentCard({ individualObj, showModal, toggleModal, contentType, setDeletePath, setName }) {

    const router = useRouter();

    //console.log('Individual: ',individualObj)
    // async function handleDelete() {
    //     try {
    //         // const response = await axios.delete(`${process.env.NEXT_PUBLIC_HEROKU_URL}/${contentType}/${individualObj.id}`);
    //         // console.log(response);
    //         //toggleModal();
    //         // console.log(e.target);
    //         // console.log(`${process.env.NEXT_PUBLIC_HEROKU_URL}/${contentType}/${individualObj.id}`);
            
    //     }catch(error) {
    //         console.log(error);
    //     }
        
        
    // }

    const path = `${contentType}/${individualObj.id}`;
    function openModal() {
        setDeletePath(path);
        setName(individualObj.name)
        toggleModal();
    }
    function handleClick() {
        //router.push(`${process.env.NEXT_PUBLIC_API_URL}/about`)
    }

    return (
        <div>
            <div className=' w-full md:w-1/2 flex justify-end '>
                {/* <Link href={'/'}>
                    <a>
                        
                    </a>
                </Link> */}
                <PencilIcon className='h-4 lg:h-5 w-4 lg:w-5 hover:text-gray-700' onClick={handleClick}/>
                <TrashIcon className='h-4 lg:h-5 w-4 lg:w-5 ml-5 text-red-500 hover:text-red-400' onClick={openModal} />
            </div>
            <div className='w-full md:w-1/2 h-16  shadow-md flex justify-center items-center'>
                <p className='text-lg'>{individualObj.name}</p>
            </div>
        </div>
    )
}