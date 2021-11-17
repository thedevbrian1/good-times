import { useState, useEffect } from 'react'
import Image from 'next/image'
import axios from 'axios'
import ProgressBar from './ProgressBar';
import TaskSuccessful from './TaskSuccessful';
import UploadForm from './UploadForm';

function calculatePercent(value, total) {
    return Math.round(value / total * 100);
}

function displayCompletedTask() {
    
}
export default function AddMember() {
    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [image, setImage] = useState({});
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [percent, setPercent] = useState(100);
    const [errorMembers, setErrorMembers] = useState(null);

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleTitleChange(e) {
        setTitle(e.target.value);
    }

    function handleReset() {
       Array.from(document.querySelectorAll('input')).forEach(input => input.value = '');
       setName('');
       setTitle('');
       setFiles([]);
    }
    
    // function handleImageChange(e) {
    //     console.log(`Submitting files: ${e.target.files[0]}`);
    //     setImage(e.target.files[0]);
    // }
    async function handleSubmit(e) {
        e.preventDefault();

        setUploading(true);

        const data = new FormData();
        data.append('files', files[0]);
        data.append('ref', 'Members');

        const config = {
            onUploadProgress: progressEvent => setPercent(calculatePercent(progressEvent.loaded, progressEvent.total))
        }
        //if (name.length !== 0 && title.length !== 0) {
            try {
                const imgResponse = await axios.post('http://localhost:1337/upload', data);
                const imageId = imgResponse.data[0].id;
                console.log(imgResponse);
                const members = {
                    name,
                    title,
                    image:imageId
                };
                const memberResponse = await axios.post('http://localhost:1337/members', members, config);

                if (memberResponse.status === 200) {
                    setSubmitted(true);
                }

                if (percent === 100) {
                    setUploading(false);
                }

                console.log(memberResponse);

                setTimeout(() => setSubmitted(false), 2000);
                handleReset();
    
            } catch (error) {
                setErrorMembers(error);
            }
        // } else {
        //     console.log('Fields cannot be empty');
        // }
        
    }

    async function uploadImage(e) {
        e.preventDefault();

        //setSubmitted(true);
        setUploading(true);

        const data = new FormData();
        //let id = null;
        data.append('files', files[0]);
        //data.append('refId', id);
        data.append('ref', 'Members');

        const config = {
            onUploadProgress: progressEvent => setPercent(calculatePercent(progressEvent.loaded, progressEvent.total))
        }

        try {
            const response = await axios.post('http://localhost:1337/upload', data, config);
            if (response.status === 200) {
                setSubmitted(true);
            }
            if (percent === 100) {
                setUploading(false);
            }
            console.log(`Uploading: ${percent}`);
            console.log(response);
            setTimeout(() => setSubmitted(false), 2000);
        } catch(error) {
            console.log(error);
        }
        
    }

    const thumbs = files.map(file => (
        <div className='inline-flex border-gray-300 border-2 mb-4 mr-8 w-20 h-20 p-1 box-border' key={file.name}>
            <div className='flex overflow-hidden min-w-0'>
                <img src={file.preview} alt="Thumbnail" className='block w-auto h-full' />
            </div>
        </div>
    ))

    useEffect(() => {
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);
    return (
        <div>
            <h1>Add Member</h1>
            <UploadForm 
                items={['Name', 'Title']}
                submitPath={'/members'}
                percent={percent}
                setPercent={setPercent}
                setUploading={setUploading}
                setSubmitted={setSubmitted}
                // states={[setName, setTitle]}
            />
            {/* <form className='w-3/4' onSubmit={handleSubmit}>
                <div className='flex flex-col md:flex-row'>
                    <div className='mr-4'>
                        <label htmlFor="name">Name</label>
                        <input 
                            type="text"
                            id='name'
                            name='name'
                            onChange={handleNameChange}
                            required
                            className='px-6 w-full rounded-md py-2 text-gray-700 focus:outline-none'
                        />
                    </div>
                    <div className='ml-4'>
                        <label htmlFor="title">Title</label>
                        <input 
                            type="text"
                            id='title'
                            name='title'
                            onChange={handleTitleChange}
                            required
                            className='px-6 w-full rounded-md py-2 text-gray-700 focus:outline-none'
                        />
                    </div>
                </div>

                <div className=''>
                    <label htmlFor="image">Image</label>
                    
                    <Dropzone 
                        onDrop={acceptedFiles => {
                            setFiles(acceptedFiles.map(file => Object.assign(file, {
                                preview: URL.createObjectURL(file)
                            })));
                        }}
                        accept='image/jpg, image/jpeg, image/png'
                    >
                        {({getRootProps, getInputProps}) => (
                            <section className=''>
                                <div {...getRootProps({ className: 'dropzone border-2 border-dashed border-gray-500 bg-gray-100 p-20'})}>
                                    <input {...getInputProps()} />
                                    <p className='text-gray-500'>Drag 'n' drop somefiles here, or click to select files</p>
                                </div>
                                <aside className='flex flex-row flex-wrap mt-4'>
                                    {thumbs}
                                </aside>
                            </section>
                        )}
                    </Dropzone>
                </div>
                <button className='bg-blue-500 hover:bg-blue-400 text-white w-24 h-10 mt-4 rounded-md'>Done</button>
            </form> */}
            <div className='flex flex-col items-start'>
                {
                    uploading && (
                        <ProgressBar percent={percent} />
                    )
                }
                {
                    submitted && (
                        <TaskSuccessful text='Member added successfully' />
                    )
                }
            </div>
            
            
        </div>
    )
}