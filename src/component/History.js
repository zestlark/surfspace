import React from 'react';
import { useSelector } from 'react-redux';
// import { addAppHistory } from '../app/reducers/appHistoryReducer';

const History = ({ addHistoryToSearch }) => {
    //const dispatch = useDispatch()
    const apphistory = useSelector(state => state.appHistory.history)

    return (
        <div className='mt-4 md:mt-8'>
            <p className='px-1'><small>History</small></p>
            <div className='flex justify-start items-start flex-wrap gap-2 mt-2'>
                {apphistory.slice(0, 5).map(history => (
                    <span onClick={() => { addHistoryToSearch(history.search) }} className='border border-gray-500 backdrop-blur-md px-3 inline-flex items-center gap-2 py-1 rounded-full text-sm max-w-full cursor-pointer' key={history.id}><p className='truncate'>{history.search}</p> <i className="ri-arrow-left-up-line text-xl opacity-80"></i></span>
                ))}
                {/* <span onClick={() => { dispatch(addAppHistory('helllo')) }}>Add new</span> */}
            </div>
        </div>
    );
}

export default History;
