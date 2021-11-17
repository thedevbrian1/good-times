import { useState, useEffect } from 'react'
import axios from 'axios'
import UploadForm from './UploadForm';
export default function AddDestination() {

    const [name, setName] = useState('');
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [percent, setPercent] = useState(100);
    const [errorDestinations, setErrorDestinations] = useState(null);

    function handleNameChange(e) {
        setName(e.target.value);
    }  

    const thumbs = files.map(file => (
        <div className='inline-flex border-gray-300 border-2 mb-4 mr-8 w-20 h-20 p-1 box-border' key={file.name}>
            <div className='flex overflow-hidden min-w-0'>
                <img src={file.preview} alt="Thumbnail" className='block w-auto h-full' />
            </div>
        </div>
    ));

    const uploadObject = {
        name,
    };
    
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:1337/popular-destinations', modifiedData);
            console.log(response);
        } catch (error) {
            setErrorDestinations(error);
        }
    }

    useEffect(() => {
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);
    return (
        <div>
            <h1>Add Popular Destination</h1>
            <UploadForm 
                items={['Name']}
                submitPath='/popular-destinations'
                percent={percent}
                setPercent={setPercent}
                setUploading={setUploading}
                setSubmitted={setSubmitted}
                // uploadObject={uploadObject}
                // name={name}
                // setName={setName}
            />
        </div>
    )
}