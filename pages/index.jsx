import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import Card from '../components/Card'
import TestimonialCard from '../components/TestimonialCard'
import DestinationImg from '../components/DestinationImg'
import SectionTitle from '../components/SectionTitle'
import TaskSuccessful from '../components/TaskSuccessful'

export const parseJSON = resp => (resp.json ? resp.json() : resp);

export const checkStatus = resp => {
  if (resp.status >= 200 && resp.status < 300) {
      return resp;
  }

  return parseJSON(resp).then(resp => {
      throw resp;
  });
};

export const headers = {
  'Content-Type': 'application/json',
};

function Home({ popularPackages, popularDestinations, testimonials }) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [submitted, setSubmitted] = useState(false);

  async function onSubmitForm(values) {
    // console.log(values);
    let config = {
      method: 'post',
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/contact`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: values,
    };

    try {
      const response = await axios(config);
      if (response.status === 200) {
        setSubmitted(true);
        console.log('Success');
      }
      console.log(response);
    } catch(err) {
      console.error(err);
    }
    
  }
  
  const responsive = {
    largeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
      slidesToSlide: 4,
      partialVisibilityGutter: 40
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
      slidesToSlide: 2,
      partialVisibilityGutter: 30,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2,
      partialVisibilityGutter: 30,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
      partialVisibilityGutter: 30,
    }
  };

  useEffect(() => {
    console.log(`Screen width: ${window.screen.width}, Screen height: ${window.screen.height}`);
  }, []);
  
  // console.log(popularPackages);
  // console.log(popularDestinations);
  // console.log(testimonials);
  

  return (
    <div className='overflow-x-hidden'>
      <Head>
        <title>Tours and travel &#124; The Good Times</title>
        <meta name="description" content="Book your travel destination with ease" />
      </Head>
          <div className='w-full h-screen  relative  bg-hero bg-cover bg-center'>
            <div className='w-full lg:w-1/2 h-full bg-black bg-opacity-50 flex items-center'>
              <div className='flex flex-col items-center lg:items-start'>
                <h1 className='font-display text-center lg:text-left text-white text-2xl lg:text-5xl font-bold px-4 lg:px-6'>
                  Enjoy beautiful sights and awesome experiences
                </h1>
                <h2 className='font-display text-center lg:text-left text-white text-lg lg:text-xl px-6 py-4 lg:py-8 opacity-80'>
                  Whether it's a one day, weekend-long, or holiday adventure, we've got you covered.
                </h2>
                <div className='w-3/4 lg:w-96 mx-4 lg:pl-2'>
                  <ul className='flex justify-evenly lg:justify-between'>
                    <li>
                      <Link href='#contact-us'>
                          <a>
                            <div className='flex justify-center items-center font-display bg-blue-500 hover:bg-blue-400 text-white w-36 h-10 rounded-lg'>
                              Contact Us
                            </div>
                          </a>
                      </Link>
                    </li>
                    <li>
                      <Link href='/packages'>
                        <a>
                          <div className='flex justify-center items-center bg-transparent hover:bg-blue-500 border-blue-500 border-solid border-2 text-white font-display w-36 h-10 rounded-lg'>
                            View Packages
                          </div>
                        </a>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <section className='mt-20 lg:mt-36 p-4 max-w-screen-2xl'>
            <SectionTitle title='Most Popular Packages' />
            <div className='w-full flex flex-col lg:flex-row lg:flex-wrap items-center  justify-between lg:justify-evenly px-4 lg:px-16 py-8'>
              {
                popularPackages.map(destination => (
                  <Card destination={destination} key={destination.id} />
                ))
              }
            </div>
            
          </section>

          <div className='bg-purple-500 w-full '>
            <div className='mx-10 md:mx-20 py-10' id="services">
              <h2 className='font-display font-bold text-white py-5 text-2xl md:text-4xl text-center'>Our Services Include</h2>
              <div className='flex flex-col md:flex-row items-center md:justify-between mt-6 md:mt-8'>
                <div className='flex flex-col items-center'>
                  <Image src="/accomodation.svg" alt="Icon of a bed" width={160} height={160} />
                  <p className='font-display text-white text-lg mt-4'>Accomodation</p>
                </div>
                
                <div className='flex flex-col items-center mt-7 md:mt-0'>
                  <Image src="/car.svg" alt="Icon of a car" width={160} height={160} />
                  <p className='font-display text-white text-lg mt-4'>Car Hire</p>
                </div>

                <div className='flex flex-col items-center mt-7 md:mt-0'>
                  <Image src="/guide.svg" alt="Icon of a tour guide" width={160} height={160} />
                  <p className='font-display text-white text-lg mt-4'>Tour Guide</p>
                </div>

                <div className='flex flex-col items-center mt-7 md:mt-0'>
                  <Image src="/meal.svg" alt="Icon of a fork and knife" width={160} height={160} />
                  <p className='font-display text-white text-lg mt-4'>Meals</p>
                </div>
                
              </div>
              
            </div>
          </div>

          <div className='mt-20 lg:mt-36 p-8'>
            <SectionTitle title='Popular Destinations' />
            <div className='p-2 md:p-10 flex flex-col md:flex-row items-center md:justify-evenly'>
              {
                popularDestinations.map(popularDestination => (
                  <DestinationImg destination={popularDestination} key={popularDestination.id} />
                ))
              }
            </div>
            
          </div>

          <div className='flex flex-col items-center mt-16 lg:mt-28 px-5'>
            <SectionTitle title='What Our Clients Say' />
            <div className='p-10 w-full lg:w-3/4'>
              <Carousel
                swipeable={true}
                draggable={true}
                showDots={true}
                responsive={responsive}
                ssr={true}
                infinite={true}
                //partialVisbile={true}
                //autoPlay={this.props.deviceType !== "mobile" ? true : false}
                // autoPlaySpeed={1000}
                keyBoardControl={true}
                customTransition="all .5"
                transitionDuration={500}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                renderButtonGroupOutside={true}
                renderDotsOutside={true}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
              >
                {testimonials.map(testimonial => (
                  <TestimonialCard testimonial={testimonial} key={testimonial.id}/>
                ))}
              </Carousel>
            </div>
          </div>

          <div className='relative flex flex-col lg:flex-row w-full   mt-16 lg:mt-32 '>

            <div className='py-8 lg:py-0 px-2 bg-black w-full lg:w-1/2 flex flex-col justify-center items-center'>
              <h2 className='font-display text-white text-2xl lg:text-5xl font-bold mt-12'>We'd love to hear from you</h2>
              <Image src='/contact-us.svg' alt='svg illustration consisting of call, text and location orange icons' width={280} height={280} />
            </div>

            <div className='bg-gray-100 w-full lg:w-1/2 flex flex-col justify-center items-center pb-12'>
              <div className='w-2/3'>
                <h2 className='font-display font-bold lg:pt-28 text-black text-2xl lg:text-4xl mt-12 mb-5 text-center'>Contact Us</h2>
                <form className='' id='contact-us' onSubmit={handleSubmit(onSubmitForm)}>
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
                    className={`font-display px-6 w-full rounded-md py-2 bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 ${errors.name ? 'ring-2 ring-red-500' : null}` }
                    //onChange={handleFullNameChange}
                  />
                  <span className='text-red-700 text-sm py-2'>{errors ?.name ?.message}</span>
                </div>
                
                <div className='mb-4'>
                  <label htmlFor="email">Email</label>
                  <input 
                    type="email" 
                    id='email' 
                    name='email'
                    {...register('email', {
                      required: {
                        value: true,
                        message: 'Email cannot be empty'
                      },
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    placeholder='johndoe@gmail.com' 
                    className={`font-display px-6 w-full rounded-md py-2 bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 ${errors.email ? 'ring-2 ring-red-500' : null}`} 
                  />
                  <span className="text-red-700 text-sm py-2">{errors?.email?.message}</span>
                </div>
                
                <div className='mb-4'>
                  <label htmlFor="phone">Phone</label>
                  <input 
                    type="text" 
                    id='phone' 
                    name='phone'
                    {...register('phone', {
                      pattern: {
                        value: /(\+254|^){1}[ ]?[7]{1}([0-3]{1}[0-9]{1})[ ]?[0-9]{3}[ ]?[0-9]{3}\z/i,
                        message: 'Invalid phone number format'
                      }
                    })}
                    placeholder='0712 345 678' 
                    className='font-display px-6 w-full rounded-md py-2 bg-gray-100 text-gray-700 focus:outline-none' 
                  />
                  <span className="text-red-700 text-sm py-2">{errors?.phone?.message}</span>
                </div>
                
                <div className='mb-4'>
                  <label htmlFor="message">Message</label>
                  <input 
                    type="text" 
                    id='message' 
                    name='message'
                    {...register('message', {
                      required: {
                        value: true,
                        message: 'Message cannot be empty'
                      }

                    })}
                    placeholder='Your message' 
                    className='font-display px-6 w-full h-12 rounded-md py-2 bg-gray-100 text-gray-700 focus:outline-none'
                  />
                  <span className='text-red-700 text-sm py-2'>{errors?.message?.message}</span>
                </div>
                
                <button type='submit' className='font-display w-full mt-6 py-2 rounded-md bg-blue-500 text-gray-100 hover:bg-blue-600 focus:outline-none'>Submit</button>
              </form>
               {
                 submitted && (
                   <TaskSuccessful text='Email sent successfully' />
                 )
               } 
            </div>
            </div>
          </div>
      
      
    </div>
  )
}

export async function getStaticProps(context) {
  //Make several fetch requests for packages and popular destinations
  try {
    const [popularPackages, popularDestinations, testimonials] = await Promise.all([
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
      fetch(`${process.env.NEXT_PUBLIC_HEROKU_URL}/testimonials`, {
        method: 'GET',
        headers
      })
        .then(checkStatus)
        .then(parseJSON)
    ]);
    return {
      props: {popularPackages, popularDestinations, testimonials}
    };
  }catch(error) {
    console.log(error, "Fetching static props failed");
    throw error;
    //console.log(error)
  }
  
}

export default Home;