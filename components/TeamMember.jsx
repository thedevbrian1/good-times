import Image from 'next/image'

export default function TeamMember({ member }) {

    // const myLoader = ({ src }) => {
    //     return `${process.env.NEXT_PUBLIC_DOMAIN}${src}`;
    // };

    return (
        <div>
            <Image 
                //loader={myLoader}
                src={member.image[0].url} 
                width={150} 
                height={150} 
                alt={`Picture of ${member.name}`} 
                className='rounded-lg'
             />
            <p className='font-display text-lg'>
                {member.name}
            </p>
            <p className='font-display text-gray-500 text-sm mt-1'>{member.title}</p>
        </div>
    )
}