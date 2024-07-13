import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeAuthPage, validate, appAuthSignup, appAuthLogin } from '../app/reducers/appAuthReducer';

const Auth = () => {
    const dispatch = useDispatch();
    const authpage = useSelector(state => state.appAuth.authPage);
    const validationError = useSelector(state => state.appAuth.validationError);
    const signupStatus = useSelector(state => state.appAuth.signupStatus);
    const loginStatus = useSelector(state => state.appAuth.loginStatus);
    const signupError = useSelector(state => state.appAuth.signupError);
    const loginError = useSelector(state => state.appAuth.loginError);

    const [currentpage, setcurrentpage] = useState('signup');
    const [signupdata, setsignupdata] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [logindata, setlogindata] = useState({
        email: '',
        password: ''
    });

    const handlecloseAuthPage = () => {
        dispatch(closeAuthPage());
    };

    const handleformonclick = (e) => {
        e.stopPropagation();
    };

    const handleSignupSubmit = (e) => {
        e.preventDefault();
        dispatch(validate(signupdata));
        if (validationError === null) {
            dispatch(appAuthSignup({ name: signupdata.name, email: signupdata.email, password: signupdata.password }));
        }
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        dispatch(appAuthLogin({ email: logindata.email, password: logindata.password }));
    };

    return (
        <>
            {authpage &&
                <div className='fixed w-screen h-screen top-0 left-0 backdrop-blur-3xl z-30 flex justify-center items-center' onClick={handlecloseAuthPage}>
                    {currentpage === 'signup' ?
                        // Signup Form
                        <div className='slide-top max-h-[500px] bg-slate-100 border border-black dark:border-white dark:bg-slate-800 w-[350px] rounded-lg p-5' onClick={handleformonclick}>
                            <h1 className='text-xl font-medium'>Join Our Community</h1>
                            <p className="text-sm text-gray-600 mb-4 mt-1">
                                Sign up today and save your favorite tabs, take notes, read the latest blogs and news
                            </p>
                            <form onSubmit={handleSignupSubmit}>
                                <label className="input bg-transparent border border-black dark:border-white focus:outline-none focus-within:outline-none flex items-center gap-2 mb-2 mt-6">
                                    <input
                                        type="text"
                                        className="grow"
                                        placeholder="Full name"
                                        value={signupdata.name}
                                        onChange={(e) => setsignupdata({ ...signupdata, name: e.target.value })}
                                    />
                                </label>
                                <label className="input bg-transparent border border-black dark:border-white focus:outline-none focus-within:outline-none flex items-center gap-2 mb-2">
                                    <input
                                        type="email"
                                        className="grow"
                                        placeholder="Email"
                                        value={signupdata.email}
                                        onChange={(e) => setsignupdata({ ...signupdata, email: e.target.value })}
                                    />
                                </label>
                                <label className="input bg-transparent border border-black dark:border-white focus:outline-none focus-within:outline-none flex items-center gap-2">
                                    <input
                                        type="password"
                                        className="grow"
                                        placeholder="Password"
                                        value={signupdata.password}
                                        onChange={(e) => setsignupdata({ ...signupdata, password: e.target.value })}
                                    />
                                </label>
                                {validationError &&
                                    <p className='text-center text-red-500 mt-2'><small>{validationError}</small></p>
                                }
                                {signupError &&
                                    <p className='text-center text-red-500 mt-2'><small>{signupError}</small></p>
                                }
                                {signupStatus === 'loading' ?
                                    <button className="btn btn-neutral w-full mt-2" disabled>
                                        <span>Signing up...</span>
                                    </button>
                                    :
                                    <button className="btn btn-neutral w-full mt-2" type="submit">
                                        <span>Signup</span>
                                    </button>
                                }
                            </form>

                            <p className='text-center text-sm mt-4'>Already have an Account? <span onClick={() => { setcurrentpage('login') }} className='text-blue-700 cursor-pointer'>Login</span></p>
                        </div>
                        :
                        // Login Form
                        <div className='slide-top max-h-[500px] bg-slate-100 border border-black dark:border-white dark:bg-slate-800 w-[350px] rounded-lg p-5' onClick={handleformonclick}>
                            <h1 className='text-xl font-medium'>Welcome Back</h1>
                            <p className="text-sm text-gray-600 mb-4 mt-1">
                                Log in to continue where you left off and explore more.
                            </p>
                            <form onSubmit={handleLoginSubmit}>
                                <label className="input bg-transparent border border-black dark:border-white focus:outline-none focus-within:outline-none flex items-center gap-2 mb-2 mt-6">
                                    <input
                                        type="email"
                                        className="grow"
                                        placeholder="Email"
                                        value={logindata.email}
                                        onChange={(e) => setlogindata({ ...logindata, email: e.target.value })}
                                    />
                                </label>
                                <label className="input bg-transparent border border-black dark:border-white focus:outline-none focus-within:outline-none flex items-center gap-2">
                                    <input
                                        type="password"
                                        className="grow"
                                        placeholder="Password"
                                        value={logindata.password}
                                        onChange={(e) => setlogindata({ ...logindata, password: e.target.value })}
                                    />
                                </label>
                                {loginError &&
                                    <p className='text-center text-red-500 mt-2'><small>{loginError}</small></p>
                                }
                                {loginStatus === 'loading' ?
                                    <button className="btn btn-neutral w-full mt-4" disabled>
                                        <span>Logging in...</span>
                                    </button>
                                    :
                                    <button className="btn btn-neutral w-full mt-4" type="submit">
                                        <span>Login</span>
                                    </button>
                                }
                            </form>
                            <p className='text-center text-sm mt-4'>Don't have an Account? <span onClick={() => { setcurrentpage('signup') }} className='text-blue-700 cursor-pointer'>Signup</span></p>
                        </div>
                    }
                </div>
            }
        </>
    );
}

export default Auth;
