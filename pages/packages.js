import DestinationCard from "../components/DestinationCard";
import Layout from "../components/Layout";

export default function Packages() {
    return (
        <Layout>
            <div className='w-full h-screen relative -top-16 bg-hero bg-cover bg-center'>
                <div className='w-full h-screen bg-black bg-opacity-50 flex justify-center items-center md:px-24'>
                    <h1 className='text-white text-2xl md:text-5xl text-center'>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</h1>
                </div>
            </div>

            <div className='w-full pb-5 px-5 flex flex-col items-center'>
                <h1 className='text-brown text-2xl md:text-4xl text-center mt-2 mb-5'>
                    One Day Packages
                </h1>
                <div className='mt-7 md:w-3/4 flex flex-col justify-evenly md:flex-row md:justify-evenly border-solid border-red-500 border-2'>
                    <DestinationCard />
                    <DestinationCard />
                    <DestinationCard />
                </div>
            </div>

            <div className='w-full mt-5 bg-gray-100 pb-5 px-5 flex flex-col items-center border-2 border-red-500 border-solid'>
                <h1 className='text-brown text-2xl md:text-4xl text-center mt-16 mb-5'>
                    Weekend Packages
                </h1>
                <div className='mt-5 mb-14 md:w-3/4 flex flex-col justify-evenly md:flex-row md:justify-evenly border-solid border-red-500 border-2'>
                    <DestinationCard />
                    <DestinationCard />
                    <DestinationCard />
                </div>
            </div>
        </Layout>
    )
    
}