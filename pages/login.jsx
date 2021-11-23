import { useForm } from 'react-hook-form'
export default function Login() {
    const {register, handleSubmit, formState: { errors }, reset } = useForm();
    function onSubmitForm(values) {
        console.log('Submitting', values);
    }
    return (
        <div className='h-screen flex flex-col justify-center items-center'>
            <h2 className='text-2xl font-bold'>Login to The Good Times</h2>
        
        <div className="w-full lg:w-96 bg-gray-100 max-w-xs mt-4 p-4">
            <form 
                onSubmit={handleSubmit(onSubmitForm)}
                className="  rounded px-8 pt-6 pb-8 mb-4"
                >
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                         id="email" 
                         type="email" 
                         name="email"
                         {...register('email')} 
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                        id="password" 
                        type="password" 
                        name="password"
                        {...register('password')} 
                    />
                    {/* <p className="text-red-500 text-xs italic">Please choose a password.</p> */}
                </div>
                <div className="flex items-center justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Log In
                    </button>
                    <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                        Forgot Password?
                    </a>
                </div>
            </form>
            <p className="text-center text-gray-500 text-xs">
                ©2021 The Good Times. All rights reserved.
            </p>
        </div>
        </div>
    )
}