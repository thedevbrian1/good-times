import { useState } from 'react'
import { checkStatus, parseJSON, headers } from './index';
import AdminCard from "../components/AdminCard";
import AddPackage from '../components/AddPackage'
import AddDestination from '../components/AddDestination';
import AddMember from '../components/AddMember'

// const headers = {
//     'Content-Type': 'application/json',
// };
function Admin({ packages, popularDestinations, members }) {
    const [showAddPackage, setShowAddPackage] = useState(false);
    const [showAddDestination, setShowAddDestination] = useState(false);
    const [showAddMember, setShowAddMember] = useState(false);

    console.log(packages);
    console.log(popularDestinations);
    console.log(members);

    function toggleAddPackage() {
        setShowAddPackage(!showAddPackage);
    }

    function toggleAddDestination() {
        setShowAddDestination(!showAddDestination);
    }

    function toggleAddMember() {
        setShowAddMember(!showAddMember);
    }

    return (
        <div className='px-10'>
            <h1 className='font-semibold text-2xl md:text-4xl '>Manage your packages,destinations and members</h1>
            <div className='flex flex-col divide-y-2 divide-gray-300'>
                <div className='border-solid border-2 border-red-500 mb-10'>
                    <div className='pt-4 flex'>
                        <h6 className='font-semibold text-lg md:text-2xl'>
                            Packages
                        </h6>
                        <p className='inline text-md md:text-lg mt-1 ml-14 text-blue-500 hover:text-blue-400 cursor-default' onClick={toggleAddPackage}>+ Add package</p>
                        {
                            showAddPackage && (
                                <div className='mt-10'>
                                    <AddPackage showPackage={showAddPackage} togglePackage={toggleAddPackage} />
                                </div>
                            )
                        }
                    </div>
                    {packages.map((individualPackage) => (
                        <div key={individualPackage.id} className='mb-8'>
                            <AdminCard individualObj={individualPackage} />
                        </div>
                        
                    ))}
                </div>

                <div className='mb-10'>
                    <div className='pt-4 flex'>
                        <h6 className='font-semibold text-lg md:text-2xl'>
                            Destinations
                        </h6>
                        <p className='inline text-md md:text-lg mt-1 ml-14 text-blue-500 hover:text-blue-400 cursor-default' onClick={toggleAddDestination}>+ Add destination</p>
                        {
                            showAddDestination && (
                                <div className='mt-10'>
                                    <AddDestination />
                                </div>
                            )
                        }
                    </div>
                    {popularDestinations.map(destination => (
                        <div key={destination.id} className='mb-8'>
                            <AdminCard individualObj={destination} />
                        </div>
                        
                    ))}
                </div>

                <div className='mb-10'>
                    <div className='pt-4 flex'>
                        <h6 className='font-semibold text-lg md:text-2xl'>
                            Members
                        </h6>
                        <p className='inline text-md md:text-lg mt-1 ml-14 text-blue-500 hover:text-blue-400 cursor-default' onClick={toggleAddMember}>+ Add member</p>
                        {
                            showAddMember && (
                                <div className='mt-10'>
                                    <AddMember />
                                </div>
                            )
                        }
                    </div>
                    {members.map(member => (
                        <div key={member.id} className='mb-8'>
                            <AdminCard  individualObj={member} />
                        </div>
                        
                    ))}
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
                    <AdminCard />
                </div> */}
            </div>
            
            
        </div>
    )
}

export async function getStaticProps() {
    try {
        const [packages, popularDestinations, members] = await Promise.all([
            fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/packages`, {
                method: 'GET',
                headers
            })
                .then(checkStatus)
                .then(parseJSON),
            fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/popular-destinations`, {
                method: 'GET',
                headers
            })
                .then(checkStatus)
                .then(parseJSON),
            fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/members`, {
                method: 'GET',
                headers
            })
                .then(checkStatus)
                .then(parseJSON)
        ]);
        return {
            props: {packages, popularDestinations, members}
        };
    }catch(err) {
        console.log(err, 'Cannot retrieve data for admin page');
        throw err;
    }
}
export default Admin;