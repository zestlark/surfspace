import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appAuthResendMail } from '../app/reducers/appAuthReducer';
import { auth } from '../app/firebase/config';

const EmailVerify = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [resendMessage, setResendMessage] = useState('');
    const { resendMailStatus, resendMailError } = useSelector(state => state.appAuth);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setEmail(user.email);
            }
        });
        return () => unsubscribe();
    }, []);

    const handleResendEmail = () => {
        dispatch(appAuthResendMail())
            .unwrap()
            .then(() => {
                setResendMessage('Verification email sent successfully!');
            })
            .catch((error) => {
                setResendMessage('Error sending verification email: ' + error);
            });
    };

    return (
        <div className='fixed w-screen h-screen top-0 left-0 backdrop-blur-3xl z-30 flex justify-center items-center'>
            <div className='slide-top text-center max-h-[500px] bg-slate-100 border border-black dark:border-slate-600 dark:bg-slate-800 w-[350px] rounded-lg p-5'>
                <img className='block mx-auto w-[140px] my-6' src='https://ouch-cdn2.icons8.com/hFUIb0gpM_1K4guRec4BrriN7v5ekdt1kkya_urlVNg/rs:fit:368:228/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvNjUz/L2FkYmM1YTI1LTU5/MjMtNGNhYy04N2Fm/LTE0NWE4MjU1Njg1/Yy5zdmc.png' alt='' />
                <h1 className='text-xl font-medium'>Email Verification!</h1>
                <p className="text-sm text-gray-600 mb-4 mt-3">
                    A verification email has been sent to your email address <span className='text-blue-700'>{email}</span>. <br /> Please check your inbox and verify your email.
                </p>
                {resendMessage && <p className="text-sm mt-2 mb-4">{resendMessage}</p>}
                <button
                    onClick={handleResendEmail}
                    className='btn btn-neutral w-full mt-2'
                    disabled={resendMailStatus === 'sending'}
                >
                    {resendMailStatus === 'sending' ? 'Sending...' : 'Resend Verification Email'}
                </button>
                {resendMailError && <p className="text-sm text-red-500 mt-2">{resendMailError}</p>}
            </div>
        </div>
    );
};

export default EmailVerify;
