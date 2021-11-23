import { useState, useEffect } from 'react'
import axios from 'axios'
import Router from 'next/router'
import getConfig from 'next/config'
import { checkStatus, parseJSON, headers } from './index';
import ContentCard from "../components/ContentCard";
import AddContent from '../components/AddContent';
import Modal from '../components/Modal';

// const headers = {
//     'Content-Type': 'application/json',
// };

const { publicRuntimeConfig } = getConfig();
function redirectUser(ctx, location) {
    if (ctx.req) {
        ctx.res.writeHead(302, { Location: location });
        ctx.res.end();
    } else {
        Router.push(location);
    }
}

function Admin({ packages, popularDestinations, members }) {
    const [showAddPackage, setShowAddPackage] = useState(false);
    const [showAddDestination, setShowAddDestination] = useState(false);
    const [showAddMember, setShowAddMember] = useState(false);
    const [showModal, setShowModal] = useState(false);
    // const [packages, setPackages] = useState([]);
    // const [popularDestinations, setPopularDestinations] = useState([]);
    // const [members, setMembers] = useState([]);
    const [deletePath, setDeletePath] = useState('');
    const [name, setName] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [successfulDelete, setSuccessfulDelete] = useState(false);
    const [showPackages, setShowPackages] = useState(false);
    const [showDestinations, setShowDestinations] = useState(false);
    const [showMembers, setShowMembers] = useState(false);

    console.log(packages);
    console.log(popularDestinations);
    console.log(members);
    console.log(deletePath);
    function toggleAddPackage() {
        setShowAddPackage(!showAddPackage);
    }

    function toggleAddDestination() {
        setShowAddDestination(!showAddDestination);
    }

    function toggleAddMember() {
        setShowAddMember(!showAddMember);
    }

    function toggleModal() {
        setShowModal(!showModal);
    }

    function toggleShowPackages() {
        setShowPackages(!showPackages);
    }

    function toggleShowDestinations() {
        setShowDestinations(!showDestinations);
    }

    function toggleShowMembers() {
        setShowMembers(!showMembers);
    }

    async function handleDelete() {
        console.log(`Delete ${process.env.NEXT_PUBLIC_HEROKU_URL}/${deletePath}`);
        const response = await axios.delete(`${process.env.NEXT_PUBLIC_HEROKU_URL}/${deletePath}`)
        console.log(response);
        setSuccessfulDelete(true);
        setTimeout(() => {
            setSuccessfulDelete(false); 
            setShowModal(false);}
            , 2000);
    }

    // useEffect(async () => {
    //     try {
    //         const loginInfo = {
    //             identifier: process.env.NEXT_PUBLIC_GOODTIMES_LOGIN_EMAIL,
    //             password: process.env.NEXT_PUBLIC_GOODTIMES_LOGIN_PASSWORD
    //         }

    //         const login = await fetch(`${process.env.NEXT_PUBLIC_HEROKU_URL}/auth/local`, {
    //             method: 'POST',
    //             headers: {
    //                 'Accept': 'application/json',
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(loginInfo)

    //         });
    //         const loginResponse = await login.json();
    //         console.log(loginResponse);
            
    //         const [fetchedPackages, fetchedPopularDestinations, fetchedMembers] = await Promise.all([
    //             fetch(`${process.env.NEXT_PUBLIC_HEROKU_URL}/packages`, {
    //                 method: 'GET',
    //                 headers
    //             })
    //                 .then(checkStatus)
    //                 .then(parseJSON),
    //             fetch(`${process.env.NEXT_PUBLIC_HEROKU_URL}/popular-destinations`, {
    //                 method: 'GET',
    //                 headers
    //             })
    //                 .then(checkStatus)
    //                 .then(parseJSON),
    //             fetch(`${process.env.NEXT_PUBLIC_HEROKU_URL}/members`, {
    //                 method: 'GET',
    //                 headers: {
    //                     Authorization: `Bearer ${loginResponse.jwt}`,
    //                     'Accept': 'application/json',
    //                     'Content-Type': 'application/json'
    //                 }
    //             })
    //                 .then(checkStatus)
    //                 .then(parseJSON)
    //         ]);
    //         setPackages(fetchedPackages);
    //         setPopularDestinations(fetchedPopularDestinations);
    //         setMembers(fetchedMembers);
    //     }catch(error) {
    //         console.log(error);
    //         throw error;
    //     }
    // }, [successfulDelete, submitted]);

    return (
        <div className='px-10 pt-24'>
            <Modal 
                name={name} 
                showModal={showModal} 
                toggleModal={toggleModal} 
                handleDelete={handleDelete} 
                successfulDelete={successfulDelete} 
            />
            <h1 className='font-semibold text-2xl lg:text-4xl '>Manage your packages,destinations and members</h1>
            <div className='flex flex-col divide-y-2 divide-gray-300'>
                <div className='mt-5 mb-10'>
                    <div className='pt-4 flex'>
                        <h6 className='font-semibold text-lg lg:text-2xl'>
                            Packages
                        </h6>
                        <p className='inline text-md lg:text-lg mt-1 ml-14 text-blue-500 hover:text-blue-400 cursor-default' onClick={toggleAddPackage}>+ Add package</p>
                        <p className='inline text-md lg:text-lg mt-1 ml-14 text-blue-500 hover:text-blue-400 cursor-default' onClick={toggleShowPackages}>{showPackages === true ? 'Hide': 'Show '} packages</p>
                     </div>
                        {
                            showAddPackage && (
                                <div className='pl-1 flex justify-start mt-5'>
                                    <AddContent
                                         title='Add Package'
                                         items={['Name', 'Description', 'Price', 'Duration']}
                                         submitted={submitted}
                                         setSubmitted={setSubmitted}
                                         submitPath='/packages'
                                         successText='Package added successfully'
                                    />
                                </div>
                            )
                        }
                    
                    <div className='mt-3'>
                        {showPackages && packages.map((individualPackage) => (
                            <div key={individualPackage.id} className='mb-8'>
                                <ContentCard 
                                    individualObj={individualPackage}
                                    toggleModal={toggleModal} 
                                    showModal={showModal} 
                                    contentType={'packages'}
                                    setDeletePath={setDeletePath}
                                    setName={setName}
                                />
                            </div>
                            
                        ))}
                    </div>
                    
                </div>

                <div className='mb-10'>
                    <div className='pt-4 flex'>
                        <h6 className='font-semibold text-lg lg:text-2xl'>
                            Destinations
                        </h6>
                        <p className='inline text-md lg:text-lg mt-1 ml-10 lg:ml-14 text-blue-500 hover:text-blue-400 cursor-default' onClick={toggleAddDestination}>+ Add destination</p>
                        <p className='inline text-md lg:text-lg mt-1 ml-14 text-blue-500 hover:text-blue-400 cursor-default' onClick={toggleShowDestinations}>{showDestinations === true ? 'Hide' : 'Show'} destinations</p>
                    </div>
                        {
                            showAddDestination && (
                                <div className='mt-5 pl-1 flex justify-start'>
                                    <AddContent
                                        title='Add Popular Destination'
                                        items={['Name']}
                                        submitted={submitted}
                                        setSubmitted={setSubmitted}
                                        submitPath='/popular-destinations'
                                        successText='Destination added successfully'
                                    />
                                </div>
                            )
                        }
                    
                    <div className='mt-3'>
                        {showDestinations && popularDestinations.map(destination => (
                            <div key={destination.id} className='mb-8'>
                                <ContentCard 
                                    individualObj={destination} 
                                    showModal={showModal} 
                                    toggleModal={toggleModal}
                                    contentType={'popular-destinations'}
                                    setDeletePath={setDeletePath}
                                    setName={setName}
                                />
                            </div>
                            
                        ))}
                    </div>
                    
                </div>

                <div className='mb-10'>
                    <div className='pt-4 flex'>
                        <h6 className='font-semibold text-lg lg:text-2xl'>
                            Members
                        </h6>
                        <p className='inline text-md lg:text-lg mt-1 ml-14 text-blue-500 hover:text-blue-400 cursor-default' onClick={toggleAddMember}>+ Add member</p>
                        <p className='inline text-md lg:text-lg mt-1 ml-14 text-blue-500 hover:text-blue-400 cursor-default' onClick={toggleShowMembers}>{showMembers === true ? 'Hide' : 'Show'} members</p>
                    </div>
                        {
                            showAddMember && (
                                <div className='mt-5 pl-1 flex justify-start'>
                                    <AddContent
                                        title='Add Member'
                                        items={['Name', 'Title']}
                                        submitted={submitted}
                                        setSubmitted={setSubmitted}
                                        submitPath='/members'
                                        successText='Member added successfully'
                                    />
                                </div>
                            )
                        }
                    
                    <div className='mt-3'>
                        {showMembers && members.map(member => (
                            <div key={member.id} className='mb-8'>
                                <ContentCard 
                                    individualObj={member} 
                                    showModal={showModal}
                                    toggleModal={toggleModal} 
                                    contentType={'members'}
                                    setDeletePath={setDeletePath}
                                    setName={setName}
                                />
                            </div>
                            
                        ))}
                    </div>
                    
                </div>

                {/* <div className='mb-10'>
                    <div className='pt-4 flex'>
                        <h6 className='font-semibold text-lg md:text-2xl'>
                            Destinations
                        </h6>
                        <p className='inline text-md md:text-lg mt-1 ml-14 text-blue-500 hover:text-blue-400 cursor-default' onClick={revealPackage}>+ Add destination</p>
                        {
                            showPackage && (
                                <div className='mt-10'>
                                    <AddPackage showPackage={showPackage} revealPackage={revealPackage} />
                                </div>
                            )
                        }
                    </div>
                    <ContentCard />
                </div> */}
            </div>
            
            
        </div>
    )
}

export async function getServerSideProps(ctx) {
    // const isAuthenticated = false;

    // if(!isAuthenticated) {
    //     return (
    //         redirect: {
    //             destination: '/login',
    //             permenent: false
    //         }
    //     )
    // }
    const loginInfo = {
        identifier: process.env.NEXT_PUBLIC_GOODTIMES_LOGIN_EMAIL,
        password: process.env.NEXT_PUBLIC_GOODTIMES_LOGIN_PASSWORD
    };
    const jwt = false;

    try {
        const login = await fetch(`${process.env.NEXT_PUBLIC_HEROKU_URL}/auth/local`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginInfo)
        });
        const loginResponse = await login.json();
        console.log(loginResponse);
        const [packages, popularDestinations, members] = await Promise.all([
            fetch(`${process.env.NEXT_PUBLIC_HEROKU_URL}/packages`, {
                method: 'GET',
                headers
            })
                .then(checkStatus)
                .then(parseJSON),
            fetch(`${process.env.NEXT_PUBLIC_HEROKU_URL}/popular-destinations`, {
                method: 'GET',
                headers
            })
                .then(checkStatus)
                .then(parseJSON),
            fetch(`${process.env.NEXT_PUBLIC_HEROKU_URL}/members`, {
                method: 'GET',
                headers: {
                     Authorization: `Bearer ${loginResponse.jwt}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(checkStatus)
                .then(parseJSON)
        ]);
        if (!jwt) {
            if (ctx.pathname === "/admin") {
                redirectUser(ctx, "/login")
            }
        }
        return {
            props: {packages, popularDestinations, members}
        };
    }catch(err) {
        console.log(err, 'Cannot retrieve data for admin page');
        throw err;
    }
}
export default Admin;