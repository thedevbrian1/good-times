import axios from 'axios'
import Head from 'next/head'
import DestinationCard from '../../components/DestinationCard'
import SectionTitle from '../../components/SectionTitle'

function Packages({ destinations, error }) {
    //console.log(destinations);

    if (error) {
        return (
            <div>
                An error occured retrieving packages
            </div>    
        )
    }
    return (
        <>
            <Head>
                <title>One day &amp; weekend destinations &#124; The Good Times </title>
                <meta name="description" content="Affordable and ideal destinations packages to suit your needs" />
            </Head>
            <div className='w-full h-screen relative bg-packages bg-cover bg-center'>
                <div className='w-full h-full bg-black bg-opacity-50 flex justify-center items-center px-10 lg:px-24'>
                    <h1 className='font-display font-bold text-white text-2xl md:text-5xl text-center'>Explore our tailored packages</h1>
                    
                </div>
            </div>

            <div className='w-full mt-20 lg:mt-36 pb-5 px-5 flex flex-col items-center'>
                <SectionTitle title='One Day Packages' />
                <div className='mt-7 py-8 md:w-3/4 flex flex-col justify-evenly md:flex-row md:justify-evenly md:flex-wrap '>
                    {
                        destinations
                            .filter(destination => destination.duration === '1 day')
                            .map(destination => (
                                <DestinationCard 
                                    destination={destination} 
                                    key={destination.id} 
                                />
                        ))
                    }
                </div>
            </div>

            <div className='w-full mt-5 bg-gray-100 pb-5 px-5 pt-16 flex flex-col items-center'>
                <SectionTitle title='Weekend Packages' />
                <div className='mt-8 lg:mt-12 mb-14 md:w-3/4 flex flex-col justify-evenly md:flex-row md:justify-evenly md:flex-wrap'>
                    {destinations.filter(destination => destination.duration === '2 days').map(destination => (
                        <DestinationCard destination={destination} key={destination.id} />
                    ))}
                </div>
            </div>
        </>
    )
    
};

export async function getStaticProps() {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_HEROKU_URL}/packages`);
        const destinations = res.data;
        return {
            props: { destinations },
            revalidate: 345600,
        };
    }catch(error) {
        console.log(error, 'Cannot retrieve packages');
        throw error;
    }
}
export default Packages;