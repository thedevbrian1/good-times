import axios from "axios";
import image from "next/image";
import { useState, useEffect } from "react";
import Dropzone from "react-dropzone";
import { useForm } from 'react-hook-form';

function calculatePercent(value, total) {
    return Math.round(value / total * 100);
}

function stringToSlug(str) {
    str = str.replace(/^\s+|\s+$/g, '');
    str = str.toLowerCase();

    const from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
    const to   = "aaaaeeeeiiiioooouuuunc------";

    for (let i = 0, l = from.length; i < l; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-');

    return str;
}

export default function UploadForm(props) {
    const { register, handleSubmit, formState: { errors }, reset} = useForm();

    // const [name, setName] = useState('Brian');
    // const [description, setDescription] = useState('');
    // const [price, setPrice] = useState('20000');
    // const [duration, setDuration] = useState('');
    // const [title, setTitle] = useState('CTO');
    const [files, setFiles] = useState([]);

    // const statesArray = [name, description, price, duration, title];

    // console.log('States: ', props.states); 

    //Set state dynamically according to the state parameters passed
    
    // function handleChange(e) {
    //     switch (e.target.getAttribute('name')) {
    //         case 'name':
    //             props.setName(e.target.value);
    //             console.log(props.name);
    //             break;
    //         case 'description': 
    //             props.setDescription(e.target.value);
    //             break;
    //         case 'price': 
    //             props.setPrice(e.target.value);
    //             break;
    //         case 'duration': 
    //             props.setDuration(e.target.value);
    //             break;
    //         case 'title': 
    //             props.setTitle(e.target.value);
    //             break;
    //     }
    // }

    // function createUploadObject() {
    //     // e.preventDefault();

    //     let initialObject = {
    //         name,
    //         description,
    //         price,
    //         duration,
    //         title,
    //     };

    //     let uploadObject = {};

    //     for (const key in initialObject) {
    //         if (initialObject[key] !== '') {
    //             uploadObject[key] = initialObject[key];
    //             // console.log(`${key}:  ${initialObject[key]}`);
    //         }
    //     }

    //     //  console.log('Upload object:', uploadObject);
        
    //     return uploadObject;
    // }

    // function handleReset() {
    //     Array.from(document.querySelectorAll('input')).forEach(input => input.value = '');
    //     setName('');
    //     setTitle('');
    //     setFiles([]);
    // }
    // function handleSubmitted() {
    //     props.setSubmitted(true);
    // }

    // function completeUpload() {
    //     props.setUploading(false)
    // }

    async function onSubmitForm(values){
        props.setUploading(true);
        //props.setSubmitted(true);
        values.slug = stringToSlug(values.name);
        console.log(values);

        const data = new FormData();
        data.append('files', files[0]);

        const config = {
            onUploadProgress: progressEvent => props.setPercent(calculatePercent(progressEvent.loaded, progressEvent.total))
        }

        try {
            const imgResponse = await axios.post(`${process.env.NEXT_PUBLIC_HEROKU_URL}/upload`, data);
            const imageId = imgResponse.data[0].id;
            // Create object that contains data to upload next
            // const dataObj = createUploadObject();
            // const uploadObj = {image: imageId, ...props.uploadObject};
            
            values.image = imageId;

            console.log(values);

            const uploadResponse = await axios.post(`${process.env.NEXT_PUBLIC_HEROKU_URL}${props.submitPath}`, values, config);

            // if (props.percent === 100) {
            //      props.setUploading(false);
            //      console.log('Setting uploading false');
            //     // completeUpload();
            // }

            if (uploadResponse.status === 200) {
                if (!props.submitted) {
                    props.setSubmitted(true);
                    console.log('Setting submitted true');
                }
                 
                // handleSubmitted();
            }

            if (props.submitted === true) {
                props.setUploading(false);
            }
            
            console.log(uploadResponse);
        } catch(error) {
            console.log(error);
        }
        props.submitted && reset();
        setTimeout(() => props.setSubmitted(false), 4000)
        
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
        <form onSubmit={handleSubmit(onSubmitForm)}>
            {props.items.map((item, index) => (
                <div key={index} className='mb-4'>
                    <label htmlFor={item.toLowerCase()}>{item}</label>
                    <input 
                        type='text'
                        id={item.toLowerCase()}
                        name={item.toLowerCase()}
                        // onChange={handleChange}
                        {...register(item.toLowerCase())}
                        //required
                        className='px-6 w-full rounded-md py-2 text-gray-700 focus:outline-none'
                        />
                </div>
            ))}
            <label htmlFor='image'>Image</label>
            <Dropzone
                onDrop={acceptedFiles => {
                   setFiles(acceptedFiles.map(file => Object.assign(file, {
                       preview: URL.createObjectURL(file)
                   })));
                }}
                accept='image/jpg, image/jpeg, image/png'
                >
            {({getRootProps, getInputProps}) => (
                <section className='border-2 border-dashed border-gray-500p-8'>
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
            <button className='bg-blue-500 hover:bg-blue-400 text-white w-24 h-10 mt-4 rounded-md'>Done</button>
            <button className='bg-red-500 text-white focus:bg-red-400 w-24 h-10 mt-4  ml-10 rounded-md' type='reset'>Reset</button>
        </form>
    )
}