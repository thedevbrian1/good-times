import { useState } from 'react'
import axios from 'axios'
import UploadForm from './UploadForm';

export default function AddPackage({ showPackage, togglePackage }) {
    const [modifiedData, setModifiedData] = useState({
        name: '',
        description: '',
        price: '',
        duration: '',
        // image: '',
        slug: ''
    });

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [duration, setDuration] = useState('');
    const [uploading, setUploading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [percent, setPercent] = useState(100);
    const [errorPackages, setErrorPackages] = useState(null);

    function handleChange({target: { name, value }}) {
        setModifiedData(prev => ({
            ...prev,
            [name]: value,
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:1337/packages', modifiedData);
            console.log(response);
            togglePackage();
        } catch (error) {
            setErrorPackages(error);
        }
    }
    return (
        <div>
            <h1>Add Package</h1>
            <UploadForm 
                items = {['Name', 'Description', 'Price', 'Duration']}
                submitPath = '/packages'
                // name={name}
                // setName={setName}
                // description={description}
                // setDescription={setDescription}
                // price={price}
                // setPrice={setPrice}
                // duration={duration}
                // setDuration={setDuration}
                percent={percent}
                submitted={submitted}
                setSubmitted={setSubmitted}
                setUploading={setUploading}
                setPercent={setPercent}
                
             />
        </div>
    )
}