import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeAuthPage } from '../app/reducers/appAuthReducer';
const Auth = () => {
    const dispatch = useDispatch()
    const authpage = useSelector(state => state.appAuth.authPage)
    const [currentpage, setcurrentpage] = useState('signup')

    const handlecloseAuthPage = () => {
        dispatch(closeAuthPage())
    }

    const handleformonclick = (e) => {
        e.stopPropagation();
    }
    if (authpage)
        return (
            <div className='fixed w-screen h-screen top-0 left-0 backdrop-blur-3xl z-30 flex justify-center items-center' onClick={handlecloseAuthPage}>
                {currentpage === 'signup' ?
                    //signup
                    <div className='slide-top max-h-[500px] bg-slate-100 border border-black dark:bg-slate-800 w-[350px] rounded-lg p-5' onClick={handleformonclick}>
                        <h1 className='text-xl font-medium'>Join Our Community</h1>
                        <p className="text-sm text-gray-600 mb-4 mt-1">
                            Sign up today and Save your favorite tabs, take notes, read the latest blogs and news
                        </p>
                        <form>
                            <label className="input bg-transparent border border-black focus:outline-none focus-within:outline-none flex items-center gap-2 mb-2 mt-6">
                                <input type="text" className="grow" placeholder="Username" />
                            </label>
                            <label className="input bg-transparent border border-black focus:outline-none focus-within:outline-none flex items-center gap-2 mb-2">
                                <input type="Email" className="grow" placeholder="Email" />
                            </label>
                            <label className="input bg-transparent border border-black focus:outline-none focus-within:outline-none flex items-center gap-2">
                                <input type="Password" className="grow" placeholder='Password' />
                            </label>

                            <button className="btn btn-neutral w-full mt-4">Signup</button>
                        </form>

                        <p className='text-center text-sm mt-4'>Already have an Account? <span onClick={() => { setcurrentpage('login') }} className='text-blue-700 cursor-pointer'>Login</span></p>
                    </div>
                    :
                    //login
                    <div className='slide-top max-h-[500px] bg-slate-100 border border-black dark:bg-slate-800 w-[350px] rounded-lg p-5' onClick={handleformonclick}>
                        <h1 className='text-xl font-medium'>Welcome Back</h1>
                        <p className="text-sm text-gray-600 mb-4 mt-1">
                            Log in to continue where you left off and explore more.
                        </p>
                        <form>
                            <label className="input bg-transparent border border-black focus:outline-none focus-within:outline-none flex items-center gap-2 mb-2 mt-6">
                                <input type="Email" className="grow" placeholder="Email" />
                            </label>
                            <label className="input bg-transparent border border-black focus:outline-none focus-within:outline-none flex items-center gap-2">
                                <input type="Password" className="grow" placeholder='Password' />
                            </label>

                            <button className="btn btn-neutral w-full mt-4">Login</button>
                        </form>
                        <p className='text-center text-sm mt-4'>Dont't have an Account? <span onClick={() => { setcurrentpage('signup') }} className='text-blue-700 cursor-pointer'>Signup</span></p>
                    </div>
                }
            </div>
        );
}

export default Auth;
