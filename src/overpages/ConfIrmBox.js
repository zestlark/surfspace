import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appconfirmclose } from '../app/reducers/overpagesReducer';

const ConfIrmBox = () => {
    const message = useSelector(state => state.overpages.confirmPageMesage)
    const confirmPageView = useSelector(state => state.overpages.confirmPageView)
    const confirmButtonClickFunction = useSelector(state => state.overpages.confirmButtonClickFunction)

    const dispatch = useDispatch()

    if (confirmPageView)
        return (
            <div className=" flex justify-center items-center z-30 h-screen w-screen fixed top-0 left-0 backdrop-blur-sm">
                <div className="rounded-lg bg-gray-50 dark:bg-gray-800 p-4 px-5 w-[300px] text-neutral-content shadow-sm">
                    <div className="items-center text-center text-black dark:text-white">
                        <h2 className="font-bold text-xl text-center">Confirm Your Action <i className="ri-alert-fill text-yellow-500"></i></h2>
                        <p className='my-3'>{message}</p>
                        <div className=" mt-2 w-full">
                            <span className='flex gap-1 justify-between'>
                                <button onClick={() => { dispatch(appconfirmclose()) }} className="btn  btn-outline w-[49%] btn-error">Cancel</button>
                                <button onClick={() => { confirmButtonClickFunction(); dispatch(appconfirmclose()) }} id='confirmBoxAcceptButton' className="btn w-[49%] btn-primary">Accept</button>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
}

export default ConfIrmBox;
