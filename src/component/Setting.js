import React from 'react';
import { searchEngine } from '../app/scripts/searchEngine';
import { useDispatch, useSelector } from 'react-redux';
import { changeSearchEngine } from '../app/reducers/appSearchEngineReducer';
import { changeSelectedBackgroundImageStyleName } from '../app/reducers/appSettingReducer';
import Theme from './Theme';
import { auth } from '../app/firebase/config';
import avatarimage from '../app/scripts/avatar';
import { setSettingData } from '../app/reducers/appSettingReducer';
import { saveSearchEngine } from '../app/reducers/appSearchEngineReducer';
import { appAuthLogout } from '../app/reducers/appAuthReducer'
import moment from 'moment';
import { deleteAppHistoryThunk } from '../app/reducers/appHistoryReducer';

const Setting = ({ closeSettingPage }) => {
    const dispatch = useDispatch()
    const selectedEngine = useSelector(state => state.appSearchEngine.selectedEngine)
    const location = useSelector(state => state.appSetting.location)
    const backgroundImages = useSelector(state => state.appSetting.background)
    const selectedBackgroundImageStyleName = useSelector(state => state.appSetting.selectedBackgroundImageStyleName)

    const apphistory = useSelector(state => state.appHistory.history).slice().reverse()

    // const user = useSelector(state => state.appAuth.user)

    const handleSearchEngineChange = (e) => {
        dispatch(changeSearchEngine(e.target.value))
        dispatch(saveSearchEngine())
    }

    const handleBackgroundChange = (key) => {
        dispatch(changeSelectedBackgroundImageStyleName(key))
        dispatch(setSettingData())
    }

    const handleappauhlogout = () => {
        dispatch(appAuthLogout())
    }

    const handleAllHisstoryDeleteAsync = () => {
        apphistory.forEach(element => {
            dispatch(deleteAppHistoryThunk(element.id))
        })
    }

    return (
        <div onClick={(e) => e.stopPropagation()} className='w-[100%] md:w-[350px] bg-white dark:bg-slate-800 min-h-[350px] max-h-[100%] md:max-h-[550px] overflow-scroll md:rounded-2xl  no-scrollbar slide-top'>
            <p className='p-3 bg-white dark:bg-slate-800 sticky top-0 flex justify-start items-center gap-3 z-20'><i onClick={closeSettingPage} className="ri-arrow-left-s-line text-2xl bg-slate-100 dark:bg-slate-900 w-9 h-9 flex justify-center items-center rounded-full"></i> Setting</p>
            <div className='p-3 pb-5'>
                <div className='flex items-center justify-between mt-0 mb-2'>
                    <div className='flex items-center justify-start gap-2'>
                        <img className='w-16 bg-slate-200 dark:bg-slate-600 rounded-full border-2 border-black dark:border-white p-[2px]' src={auth?.currentUser?.photoURL || avatarimage[5]} alt='' />
                        <div className='leading-5'>
                            <p>{auth?.currentUser?.displayName}</p>
                            <p><small>{auth?.currentUser?.email}</small></p>
                        </div>
                    </div>
                    <i className="ri-arrow-right-s-line text-xl"></i>
                </div>

                <div className='setting-box'>
                    <div className='bg-slate-50 dark:bg-slate-900 px-3 py-3 pb-2 mt-6 rounded-lg flex flex-col gap-4'>
                        <div className='flex justify-between items-center '><p className='text-[14px] -mt-1'>Theme</p> <span className='opacity-70 text-[14px]'><Theme /></span></div>
                    </div>

                    <div className='bg-slate-50 dark:bg-slate-900 px-3 py-2 pt-1 mt-3 rounded-lg'>
                        <p><small>Search Engine</small></p>
                        {Object.values(searchEngine).map(engine => (
                            <div key={engine.name} className='flex justify-between items-center'>
                                <div className='flex justify-start items-center gap-2 capitalize my-2'>
                                    <img className='w-9 rounded-full bg-slate-50 dark:bg-slate-800 p-[2px]' src={engine.image} alt={engine.name} />
                                    <p className='text-[14px]'>{engine.name}</p>
                                </div>
                                <input
                                    value={engine.name}
                                    onChange={handleSearchEngineChange}
                                    type="radio"
                                    name="SearchEngine"
                                    className="radio"
                                    defaultChecked={selectedEngine.name === engine.name}
                                />
                            </div>
                        ))}
                    </div>

                    <div className='bg-slate-50 dark:bg-slate-900 px-3 py-3 pb-4 mt-3 rounded-lg flex flex-col gap-4'>
                        <p><small>Background</small></p>
                        <div className='flex overflow-scroll gap-2 no-scrollbar'>
                            <div onClick={() => { handleBackgroundChange('none') }} className={`min-w-28 cursor-pointer h-full rounded-md aspect-video bg-slate-100 dark:bg-slate-500 flex justify-center items-center ${selectedBackgroundImageStyleName === 'none' ? 'border-2 p-[0px] border-red-500' : ''}`}><i className="ri-prohibited-2-line text-2xl"></i></div>
                            {Object.entries(backgroundImages).map(([key, background]) => {
                                return (
                                    <img onClick={() => { handleBackgroundChange(key) }} className={`min-w-28 cursor-pointer h-full rounded-md aspect-video flex justify-center items-center ${selectedBackgroundImageStyleName === key ? 'border-2 p-[0px] border-red-500' : ''}`} key={key} src={background.BodyImageUrl} alt='' />
                                )
                            })}
                        </div>
                    </div>

                    {/* <div className='bg-slate-50 dark:bg-slate-900 px-3 py-2 pt-1 mt-3 rounded-lg'>
                        <p><small>History</small></p> */}

                    <div className="collapse mb-1 bg-slate-50 dark:bg-slate-900 mt-3 rounded-lg">
                        <input type="checkbox" className='m-0 p-0 collapse-checkbox' />
                        <div className="collapse-title px-3 flex justify-between items-center text-[14px]"><p>History</p><i className="ri-arrow-right-s-line arrow-icon transition-all"></i></div>
                        <div className="collapse-content px-3">
                            <p className='flex justify-between items-center mb-2 dark:bg-slate-700 bg-slate-200 p-3 -mx-3'><small>{apphistory.length} Results</small><button onClick={handleAllHisstoryDeleteAsync} className='bg-red-400 bg-opacity-20 text-red-500 px-2 py-1 pt-0.5 rounded-md'><small>Clear all</small></button></p>
                            {apphistory.map(history => (
                                <div key={history.id}>
                                    <div className='flex justify-between items-center gap-2 mt-2 relative'>
                                        <p className='text-[13px] flex justify-between'>{history.search}</p>
                                        <span className='text-[11px] opacity-70 absolute left-[50%] -translate-x-[50%]'>{moment(history.time).fromNow()}</span>
                                        <i className="ri-close-line text-red-400 cursor-pointer" onClick={() => { dispatch(deleteAppHistoryThunk(history.id)) }}></i>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* </div> */}

                    <div className='bg-slate-50 dark:bg-slate-900 px-3 py-3 mt-3 rounded-lg flex flex-col gap-4'>
                        <div className='flex justify-between items-center '><p className='text-[14px]'>Country</p> <span className='opacity-70 text-[14px]'>{location.country}</span></div>
                        <div className='flex justify-between items-center '><p className='text-[14px]'>Timezone</p> <span className='opacity-70 text-[14px]'>{location.timezone}</span></div>
                    </div>

                    <div className='border bg-[#ff000022] border-red-400 cursor-pointer text-red-400  px-3 py-2 mt-3 rounded-lg flex flex-col gap-4'>
                        <div onClick={handleappauhlogout} className='flex justify-between items-center '><p className='text-[14px]'>Logout</p> <span className='opacity-70 text-[18px]'><i className="ri-logout-circle-r-line"></i></span></div>
                    </div>
                </div>

            </div>
        </div >
    );
}

export default Setting;
