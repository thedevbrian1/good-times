import Layout from "../components/Layout";
import TeamMember from "../components/TeamMember";

export default function About () {
    return (
        <Layout>
            <div className='w-full h-screen relative -top-16 bg-hero bg-cover bg-center'>
                <div className='w-full h-screen bg-black bg-opacity-50 flex justify-center items-center md:px-24'>
                    <h1 className='text-white text-2xl md:text-5xl text-center'>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</h1>
                </div>
            </div>

            <div className='pt-10 pb-20 px-10 md:px-32'>
                <h1 className='text-brown text-2xl md:text-4xl text-center mb-5'>
                    Our Mission
                </h1>
                <p className='text-gray-500 text-xl text-center'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias amet illum sed debitis sit incidunt reiciendis consequuntur veniam aut blanditiis.
                </p>
            </div>

            <div className='flex flex-col items-center bg-gray-100 w-full  pt-10 pb-20 px-10 md:px-32'>
                <div>
                    <h1 className='text-brown text-2xl md:text-4xl text-center mb-5'>
                        Our People
                    </h1>
                    <p className='text-gray-500 text-xl text-center'>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugit harum cupiditate, perspiciatis eius provident nemo?
                    </p>
                </div>
                <div className='mt-8 md:w-2/3 flex flex-col h-screen md:h-auto justify-evenly md:flex-row md:justify-evenly border-solid border-red-500 border-2'>
                    <TeamMember />
                    <TeamMember />
                    <TeamMember />
                </div>
            </div>

            <div className='bg-purple-400 w-full h-44 flex flex-col md:flex-row justify-center items-center'>
                <div className='w-full md:w-1/2 flex flex-col md:flex-row items-center md:justify-evenly '>
                    <p className='my-4 md:my-0 md:inline text-xl text-white'>Book with us your next getaway</p>
                    <button className='bg-blue-500 hover:bg-blue-400 text-white w-36 h-10 rounded-lg'>
                        Book with us
                    </button>
                </div>
                
            </div>
        </Layout>
    )
}