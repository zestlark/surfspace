import React from 'react';
import { searchEngine } from '../app/scripts/searchEngine';
import { useDispatch, useSelector } from 'react-redux';
import { changeSearchEngine } from '../app/reducers/appSearchEngineReducer';
import { changeSelectedBackgroundImageStyleName } from '../app/reducers/appSettingReducer';
import Theme from './Theme';

const Setting = () => {
    const dispatch = useDispatch()
    const selectedEngine = useSelector(state => state.appSearchEngine.selectedEngine)
    const location = useSelector(state => state.appsetting.location)
    const backgroundImages = useSelector(state => state.appsetting.background)
    const selectedBackgroundImageStyleName = useSelector(state => state.appsetting.selectedBackgroundImageStyleName)

    const handleSearchEngineChange = (e) => {
        dispatch(changeSearchEngine(e.target.value))
    }

    return (
        <div onClick={(e) => e.stopPropagation()} className='w-[100%] md:w-[350px] bg-white dark:bg-slate-800 min-h-[350px] max-h-[90%] md:max-h-[500px] overflow-scroll p-3 rounded-2xl pb-5 no-scrollbar slide-top'>
            <p>Setting</p>
            <div>
                <div className='flex items-center justify-between mt-4 mb-2'>
                    <div className='flex items-center justify-start gap-2'>
                        <img className='w-16 rounded-full border-2 border-red-400 p-[2px]' src='https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?size=338&ext=jpg&ga=GA1.1.2116175301.1719360000&semt=ais_user' alt='' />
                        <div className='leading-5'>
                            <p>John Wick</p>
                            <p><small>johnwicl1234@gmail.com</small></p>
                        </div>
                    </div>
                    <i className="ri-arrow-right-s-line text-xl"></i>
                </div>

                <div className='bg-slate-50 dark:bg-slate-900 px-3 py-3 pb-2 mt-6 rounded-lg flex flex-col gap-4'>
                    <div className='flex justify-between items-center '><p className='text-[14px]'>Theme</p> <span className='opacity-70 text-[14px]'><Theme /></span></div>
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

                <div className='bg-slate-50 dark:bg-slate-900 px-3 py-3 mt-3 rounded-lg flex flex-col gap-4'>
                    <div className='flex justify-between items-center '><p className='text-[14px]'>Country</p> <span className='opacity-70 text-[14px]'>{location.country}</span></div>
                    <div className='flex justify-between items-center '><p className='text-[14px]'>Timezone</p> <span className='opacity-70 text-[14px]'>{location.timezone}</span></div>
                </div>

                <div className='bg-slate-50 dark:bg-slate-900 px-3 py-3 mt-3 rounded-lg flex flex-col gap-4'>
                    <p><small>Background</small></p>
                    <div className='flex overflow-scroll gap-2 no-scrollbar'>
                        <div onClick={() => { dispatch(changeSelectedBackgroundImageStyleName('none')) }} className={`min-w-28 cursor-pointer h-full rounded-md aspect-video bg-slate-500 flex justify-center items-center ${selectedBackgroundImageStyleName === 'none' ? 'border-2 p-[0px] border-red-500' : ''}`}><i className="ri-prohibited-2-line text-2xl"></i></div>
                        {Object.entries(backgroundImages).map(([key, background]) => {
                            return (
                                <img onClick={() => { dispatch(changeSelectedBackgroundImageStyleName(key)) }} className={`min-w-28 cursor-pointer h-full rounded-md aspect-video flex justify-center items-center ${selectedBackgroundImageStyleName === key ? 'border-2 p-[0px] border-red-500' : ''}`} key={key} src={background.BodyImageUrl} alt='' />
                            )
                        })}
                    </div>
                </div>

            </div>
        </div >
    );
}

export default Setting;
