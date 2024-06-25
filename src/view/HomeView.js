import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { appalert } from '../app/reducers/overpagesReducer';
import { zestlarkApps } from '../app/scripts/zestlark';
import Theme from '../component/Theme';
import Notes from '../component/Notes';
import Weather from '../component/Weather';
import History from '../component/History';
import Tabs from '../component/Tabs';
import { swipeEventUpDown } from '../app/scripts/swipeEvent';
import { searchPreProcess } from '../app/reducers/appSearchEngineReducer';
import { addAppHistory } from '../app/reducers/appHistoryReducer';
import NoteShowBig from '../overpages/NoteShowBig';

const HomeView = () => {
    const dispatch = useDispatch()
    const searchBox = useRef()

    const selectedSearchEngine = useSelector(state => state.appSearchEngine.selectedEngine)

    const [noteSection, setnoteSection] = useState(false)

    const handleAddHistoryToSearch = (search) => {
        searchBox.current.value = search
    }

    const searchToData = async () => {
        if (searchBox.current.value.length !== 0) {
            dispatch(addAppHistory(searchBox.current.value))
            dispatch(searchPreProcess(searchBox.current.value))
        }
    }

    const handleenterSearch = (e) => {
        if (e.keyCode === 13) {
            searchToData()
        }
    }

    useEffect(() => {
        swipeEventUpDown('#notesBox', () => { document.getElementById('notesBox').style.height = '100dvh' }, () => { document.getElementById('notesBox').style.height = '90%'; setnoteSection(false) })
    }, [])

    return (
        <div className='max-w-[1200px] mx-auto px-3 md:flex gap-5'>
            <div className='w-full'>
                <header className='py-5 flex justify-between items-center'>
                    <h1 className='text-xl font-sans '>SurfSpace</h1>
                    <span className='flex items-center gap-3'>
                        <i className={`text-2xl md:hidden ${noteSection ? 'ri-sticky-note-fill' : 'ri-sticky-note-line'}`}
                            onClick={() => setnoteSection(!noteSection)}></i>

                        <Theme />
                    </span>
                </header>

                <h1 className='text-3xl mt-6 md:mt-12 font-medium'>Customize, Organize and Simplify</h1>

                <div className='flex justify-between items-center mt-6 flex-wrap gap-5'>
                    <div className='flex justify-start items-center gap-2 flex-wrap'>
                        {zestlarkApps.map(app => (
                            <a key={app.name} className="flex items-center justify-start gap-2 p-2 px-2 pr-4 w-auto rounded-3xl" style={{ backgroundColor: app.color }} href={app.url}><img className='w-6' src={app.icon} alt='' /><li className='list-none text-black text-sm opacity-80'>{app.name}</li></a>
                        ))}
                    </div>
                    <Weather />
                </div>

                <div className='bg-gray-100 dark:bg-gray-800 rounded-full p-1 pl-2 mt-5 md:mt-10 flex justify-center items-center'>
                    <img className='w-10' src={selectedSearchEngine.image} alt='' />
                    <input ref={searchBox} onKeyDown={handleenterSearch} className='p-3 pl-4 bg-transparent outline-none w-full dark:text-white dark:placeholder-gray-400' placeholder='Search' />
                    <i onClick={() => { searchToData() }} className="ri-search-line w-10 text-xl"></i>
                </div>

                <History addHistoryToSearch={handleAddHistoryToSearch} />

                <Tabs />

            </div>

            <div id='notesBox' className={`pb-4 pt-2 px-4 md:px-3 md:pt-2 mt-5 md:mt-0 fixed left-0 w-full md:static md:w-auto md:min-w-[350px] md:max-w-[350px] bg-gray-50 dark:bg-slate-700 md:bg-transparent dark:md:bg-transparent h-[90%] md:h-auto rounded-t-2xl ${noteSection ? 'block bottom-0 slide-top md:slide-none' : 'md:block transition-all slide-bottom md:slide-none'}`}>
                <div className='h-[5px] bg-slate-200 dark:bg-slate-500 w-[40%] mx-auto mb-3 rounded-md md:hidden'></div>
                <Notes />
            </div>

            <NoteShowBig />

        </div >
    );
}

// https://newsapi.org/v2/everything?q=india&from=2024-05-23&sortBy=publishedAt&apiKey=866b4fb339b0407ea72e70ba9d333b01
// https://api.weatherapi.com/v1/current.json?key=3d1c17ce26b6459cada53111222506&q=malad&aqi=no

export default HomeView;
