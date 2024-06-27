import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { appalertclose } from '../app/reducers/overpagesReducer';

const Alert = () => {
    const message = useSelector(state => state.overpages.alertPageMesage)
    const alertPageView = useSelector(state => state.overpages.alertPageView)

    const dispatch = useDispatch()

    const handleClsoeButton = () => {
        dispatch(appalertclose())
    }
    if (alertPageView)
        return (
            <div className=" flex justify-center items-center z-30 h-screen w-screen fixed top-0 left-0 backdrop-blur-sm">
                <div className="rounded-lg bg-gray-50 dark:bg-gray-800 p-4 px-5 w-[300px] text-neutral-content shadow-sm">
                    <div className="items-center text-center text-black dark:text-white">
                        <h2 className="font-bold text-xl text-center">Alert <i className="ri-alert-fill text-red-500"></i></h2>
                        <p className='my-3'>{message}</p>
                        <div className="card-actions justify-end mt-2 w-full">
                            <button onClick={handleClsoeButton} className="btn w-full btn-primary">Accept</button>
                        </div>
                    </div>
                </div>
            </div>
        );
}

export default Alert;

// to call the custom alert box call the appalert()
