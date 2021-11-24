import { useState, useEffect } from 'react'
import Image from 'next/image'
import Head from 'next/head'
import axios from "axios";
import { useForm } from 'react-hook-form';
import SectionTitle from "../../components/SectionTitle";
import TaskSuccessful from '../../components/TaskSuccessful';

function Dest({ destination }) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    // const myLoader = ({ src }) => {
    //     return `${process.env.NEXT_PUBLIC_DOMAIN}${src}`;
    // };

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

    // console.log(stringToSlug(destination.name));

    function clearSuccessMessage() {
        setTimeout(() => setSubmitted(false), 5000);
    }
    
    async function onSubmitForm(values) {
        setSubmitting(true);
        values.currentPackage = destination.name;
        // console.log(values);
        let config = {
            method: 'POST',
            url: `${process.env.NEXT_PUBLIC_API_URL}/api/book`,
            headers: {
                'Content-Type': 'application/json',
            },
            data: values,
        };

        try {
            const response = await axios(config);
            if (response.status === 200) {
                setSubmitting(false);
                setSubmitted(true);
                console.log('Success');
                reset();
            }
            console.log(response);
        }catch(err) {
            console.error(err);
        }
        clearSuccessMessage();
    }
      //console.log(destination);
    return (
        <>
            <Head>
                <title>{destination.name} &#124; The Good Times</title>
            </Head>
            <div className='w-full h-screen relative -top-16'>
                <Image  
                    // loader={myLoader}
                    layout='fill'
                    src={destination.image[0].url}
                    alt={destination.image[0].alternativeText}
                />
                <div className="w-full h-full bg-black bg-opacity-50 flex justify-center items-center md:px-24 relative inset-0">
                    
                    <h1 className="text-white text-2xl md:text-5xl text-center">
                        {destination.name}
                    </h1>
                </div>
            </div>
            <div className='pt-5 pb-16 px-10 md:px-32'>
                <SectionTitle title='Description' />
                <p className='text-gray-500 text-center mt-5 px-4'>
                    {destination.details}
                </p>
            </div>
            <div className='pt-5 pb-20 px-10 md:px-32'>
                <SectionTitle title='Book This Package' />
                <div className='flex justify-center mt-5 px-5 lg:px-0'>
                    <form className='w-full md:w-1/2' onSubmit={handleSubmit(onSubmitForm)}>
                        <div className='mb-4'>
                            <label htmlFor="name">Full Name</label>
                            <input 
                                type="text" 
                                id='name' 
                                name='name'
                                {...register('name', {
                                    required: {
                                        value: true,
                                        message: 'Name cannot be empty'
                                    }
                                })}
                                placeholder='John Doe' 
                                className='px-4 mt-1 w-full rounded-md py-2 text-gray-700 focus:outline-none'
                             />
                             <span className="text-red-500 text-sm py-2">{errors?.name?.message}</span>
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="phone">Phone</label>
                            <input 
                                type="text" 
                                id='phone'
                                name='phone' 
                                {...register('phone', {
                                    required: {
                                        value: true,
                                        message: 'Phone cannot be empty'
                                    }
                                })}
                                placeholder='0712 345 678' 
                                className='px-4 mt-1 w-full rounded-md py-2 text-gray-700 focus:outline-none'
                             />
                             <span className="text-red-500 text-sm py-2">{errors?.phone?.message}</span>
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="date">Choose your preferred day</label>
                            <input 
                                type="date" 
                                id='date'
                                name='date'
                                {...register('date')}
                                className='w-full mt-1 rounded-md text-gray-700 focus:outline-none'
                             />
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="capacity">Number of people</label>
                            <input 
                            type="number"
                            id='capacity'
                            name='capacity' 
                            {...register('capacity')}
                            className='w-full mt-1 px-4  rounded-md text-gray-700 focus:outline-none' 
                            placeholder='1' 
                        />
                        </div>
                        <button type='submit' className='w-full mt-6 py-2 rounded-md bg-gradient-to-r from-brown to-red-500 text-gray-100 focus:outline-none'>Submit</button>
                    </form>
                </div>
                <div className='mt-5 flex justify-center'>
                    <div>
                        {
                            submitting && (
                                <span className='text-black'>Submitting...</span>
                            )
                        }
                    </div>
                    <div>
                        {
                            submitted && (
                                <TaskSuccessful text='Booking successful' />
                            )
                        }
                    </div>
                    
                </div>
                
            </div>
        </>
        
    )
}

export async function getStaticPaths() {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_HEROKU_URL}/packages`);
        const destinations = res.data;
        const paths = destinations.map(destination => {
            return {
                params: { slug: destination.slug }
            }
        });
        return {
            paths,
            fallback: false
        };
    }catch(error) {
        console.log(error, 'Cannot retrieve packages');
        throw error;
    }
    
}

export async function getStaticProps(context) {
    try {
        const slug = context.params.slug;
        const res = await axios.get(`${process.env.NEXT_PUBLIC_HEROKU_URL}/packages?slug=${slug}`);
        const destination = res.data;
        return {
            props: { destination: destination[0] }
        };
    }catch(error) {
        console.log(error, 'Cannot retrieve dynamic page content');
        throw error;
    }
}

export default Dest;