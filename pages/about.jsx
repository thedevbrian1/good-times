import TeamMember from "../components/TeamMember";
import axios from 'axios';
import Link from "next/link";
import Head from 'next/head';
import SectionTitle from "../components/SectionTitle";

function About ({ members }) {
    //console.log(members);
    return (
        
        <>
            <Head>
                <title>About &#124; The Good Times</title>
                <meta name="description" content="Learn more about our company"/>

            </Head>
            <div className='w-full h-screen relative bg-about bg-cover bg-center'>
                <div className='w-full h-full bg-black bg-opacity-50 flex justify-center items-center md:px-24'>
                    <h1 className='font-display font-bold text-white text-2xl md:text-5xl text-center'>About Us</h1>
                </div>
            </div>

            <div className='mt-20 lg:mt-36 pb-20 px-10 md:px-32'>
                <SectionTitle title='Our Mission' />
                <p className='font-display text-gray-500 text-xl text-center'>
                    To satisfy tourism and travel needs with a professional touch and excellent customer service.
                </p>
            </div>
            
            <div className='pt-4 pb-20 px-10 md:px-32'>
                <SectionTitle title='Our Vision' />
                <p className='font-display text-gray-500 text-xl text-center'>
                    To bring out the beauty of life with amazing world and wild travel experiences.
                </p>
            </div>

            <div className='flex flex-col items-center bg-gray-100 w-full  pt-10 pb-20 px-10 md:px-32'>
                <div>
                    <SectionTitle title='Our People' />
                    <p className='font-display text-gray-500 text-xl text-center'>
                        Meet the team that is making your wishes come true
                    </p>
                </div>
                <div className='lg:mt-8 md:w-2/3 flex flex-col md:h-auto pt-10 lg:pt-0 justify-evenly md:flex-row md:justify-evenly'>
                    {
                        members.map(member => (
                            <TeamMember member={member} key={member.id} />
                        ))
                    }
                </div>
            </div>

            <div className='bg-white w-full h-44 flex flex-col md:flex-row justify-center items-center'>
                <div className='font-display w-full md:w-1/2 flex flex-col md:flex-row items-center md:justify-evenly '>
                    <p className='my-4 md:my-0 md:inline text-xl text-black'>Book with us your next getaway</p>
                    <Link href='/#contact-us'>
                        <a>
                            <div className='flex justify-center items-center bg-gradient-to-r from-brown to-red-500 text-white w-36 h-10 rounded-lg'>
                                Book with us
                            </div>
                        </a>
                    </Link>
                </div>
                
            </div>
        </>
        
    )
}

export async function getStaticProps(context) {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_HEROKU_URL}/members`);
        const members = res.data;
        return {
            props: { members }
        };
    }catch(error) {
        console.log(error, 'Cannot retrieve members');
        throw error;
    }
}

export default About;