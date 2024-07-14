import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeAuthPage, validate, appAuthSignup, appAuthLogin } from '../app/reducers/appAuthReducer';
import avatarimage from '../app/scripts/avatar'

const Auth = () => {
    const dispatch = useDispatch();
    const authPage = useSelector(state => state.appAuth.authPage);
    const validationError = useSelector(state => state.appAuth.validationError);
    const signupStatus = useSelector(state => state.appAuth.signupStatus);
    const loginStatus = useSelector(state => state.appAuth.loginStatus);
    const signupError = useSelector(state => state.appAuth.signupError);
    const loginError = useSelector(state => state.appAuth.loginError);

    const [currentPage, setCurrentPage] = useState('signup');
    const [signupData, setSignupData] = useState({
        profilePic: avatarimage[0],
        name: '',
        email: '',
        password: ''
    });
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    useEffect(() => {
        if (signupStatus === 'succeeded') {
            setSignupData({ name: '', email: '', password: '' });
        }
        if (loginStatus === 'succeeded') {
            setLoginData({ email: '', password: '' });
        }
    }, [signupStatus, loginStatus]);

    const handleCloseAuthPage = () => {
        dispatch(closeAuthPage());
    };

    const handleFormOnClick = (e) => {
        e.stopPropagation();
    };

    const handleSignupSubmit = (e) => {
        e.preventDefault();
        if (signupData.name !== '' && signupData.email !== '' && signupData.password !== '') {
            dispatch(validate(signupData));
            if (!validationError) {
                dispatch(appAuthSignup({ name: signupData.name, photoURL: signupData.profilePic, email: signupData.email, password: signupData.password }));
            }
        }
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        if (loginData.email !== '' && loginData.password !== '') {
            dispatch(appAuthLogin({ email: loginData.email, password: loginData.password }));
        }
    };

    const [ProfilePicClass, setProfilePicClass] = useState();
    const handleProfilePicChange = (avatar) => {
        setProfilePicClass('slide-in');
        setSignupData({ ...signupData, profilePic: avatar });
        setTimeout(() => {
            setProfilePicClass('');
        }, 300);
    };

    return (
        <>
            {authPage &&
                <div className='fixed w-screen h-screen top-0 left-0 backdrop-blur-3xl z-30 flex justify-center items-center' onClick={handleCloseAuthPage}>
                    <div className='slide-top max-h-[550px] bg-slate-100 border border-black dark:border-slate-600 dark:bg-slate-800 w-[350px] rounded-lg p-5' onClick={handleFormOnClick}>
                        {currentPage === 'signup' ? (
                            <>
                                <h1 className='text-xl font-medium'>Join Our Community</h1>
                                <p className="text-sm text-gray-600 dark:text-slate-400 mb-4 mt-1">
                                    Sign up today and save your favorite tabs, take notes, read the latest blogs and news
                                </p>
                                <form onSubmit={handleSignupSubmit}>

                                    <div className='flex items-center w-full overflow-scroll no-scrollbar gap-2'>
                                        <div className='min-w-[100px] min-h-[100px] sticky left-0 bg-slate-100 dark:bg-slate-800 rounded-r-full'>
                                            <img src={signupData.profilePic} className={`w-24 bg-slate-200 dark:bg-slate-600 rounded-full border-2 border-black dark:border-white ${ProfilePicClass}`} alt='' />
                                        </div>
                                        {avatarimage.filter(avatar => avatar !== signupData.profilePic).map((avatar, index) =>
                                            <img key={index} onClick={() => { handleProfilePicChange(avatar) }} className='w-20 bg-slate-200 dark:bg-slate-600 rounded-full' src={avatar} alt='' />
                                        )}
                                    </div>

                                    <label className="input bg-transparent border border-black dark:border-slate-600 focus:outline-none focus-within:outline-none flex items-center gap-2 mb-2 mt-6">
                                        <input
                                            type="text"
                                            className="grow"
                                            placeholder="Full name"
                                            value={signupData.name}
                                            onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                                        />
                                    </label>
                                    <label className="input bg-transparent border border-black dark:border-slate-600 focus:outline-none focus-within:outline-none flex items-center gap-2 mb-2">
                                        <input
                                            type="email"
                                            className="grow"
                                            placeholder="Email"
                                            value={signupData.email}
                                            onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                                        />
                                    </label>
                                    <label className="input bg-transparent border border-black dark:border-slate-600 focus:outline-none focus-within:outline-none flex items-center gap-2">
                                        <input
                                            type="password"
                                            className="grow"
                                            placeholder="Password"
                                            value={signupData.password}
                                            onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                                        />
                                    </label>
                                    {validationError &&
                                        <p className='text-center text-red-500 mt-2'><small>{validationError}</small></p>
                                    }
                                    {signupError &&
                                        <p className='text-center text-red-500 mt-2'><small>{signupError}</small></p>
                                    }
                                    {signupStatus === 'loading' ? (
                                        <button className="btn btn-neutral w-full mt-2" disabled>
                                            <span>Signing up...</span>
                                        </button>
                                    ) : (
                                        <button className="btn btn-neutral dark:bg-slate-600 w-full mt-4" type="submit">
                                            <span>Signup</span>
                                        </button>
                                    )}
                                </form>
                                <p className='text-center text-sm mt-4'>Already have an Account? <span onClick={() => { setCurrentPage('login') }} className='text-blue-700 cursor-pointer'>Login</span></p>
                            </>
                        ) : (
                            <>
                                <h1 className='text-xl font-medium'>Welcome Back</h1>
                                <p className="text-sm text-gray-600 dark:text-slate-400 mb-4 mt-1">
                                    Log in to continue where you left off and explore more.
                                </p>
                                <form onSubmit={handleLoginSubmit}>
                                    <label className="input bg-transparent border border-black dark:border-slate-600 focus:outline-none focus-within:outline-none flex items-center gap-2 mb-2 mt-6">
                                        <input
                                            type="email"
                                            className="grow"
                                            placeholder="Email"
                                            value={loginData.email}
                                            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                                        />
                                    </label>
                                    <label className="input bg-transparent border border-black dark:border-slate-600 focus:outline-none focus-within:outline-none flex items-center gap-2">
                                        <input
                                            type="password"
                                            className="grow"
                                            placeholder="Password"
                                            value={loginData.password}
                                            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                        />
                                    </label>
                                    {loginError &&
                                        <p className='text-center text-red-500 mt-2'><small>{loginError}</small></p>
                                    }
                                    {loginStatus === 'loading' ? (
                                        <button className="btn btn-neutral w-full mt-4" disabled>
                                            <span>Logging in...</span>
                                        </button>
                                    ) : (
                                        <button className="btn btn-neutral dark:bg-slate-600 w-full mt-4" type="submit">
                                            <span>Login</span>
                                        </button>
                                    )}
                                </form>
                                <p className='text-center text-sm mt-4'>Don't have an Account? <span onClick={() => { setCurrentPage('signup') }} className='text-blue-700 cursor-pointer'>Signup</span></p>
                            </>
                        )}
                    </div>
                </div>
            }
        </>
    );
};

export default Auth;
