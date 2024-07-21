import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { appalert } from '../app/reducers/overpagesReducer';
import { zestlarkApps } from '../app/scripts/zestlark';
import Theme from '../component/Theme';
import Notes from '../component/Notes';
import Weather from '../component/Weather';
import History from '../component/History';
import Tabs from '../component/Tabs';
import News from '../component/News';
import ZBlog from '../component/ZBlog';
import Setting from '../component/Setting';
import EmailVerify from '../overpages/EmailVerify';
import NewTabPage from '../overpages/NewTabPage';
// import { swipeEventUpDown } from '../app/scripts/swipeEvent';
import { searchPreProcess } from '../app/reducers/appSearchEngineReducer';
import { saveAppHistory, getAllHistory } from '../app/reducers/appHistoryReducer';
import NoteShowBig from '../overpages/NoteShowBig';
import SearchSuggestion from '../component/SearchSuggestion';
import { openAuthPage } from '../app/reducers/appAuthReducer';
import { auth } from '../app/firebase/config';
import { appsetUser } from '../app/reducers/appAuthReducer';
import { getSettingData } from '../app/reducers/appSettingReducer';
import { getSearchEngine } from '../app/reducers/appSearchEngineReducer';
import { getAllNotes } from '../app/reducers/appNotesReducer.js'
import { getAllTabs } from '../app/reducers/appTabsReducer.js'
import Loading from '../overpages/Loading.js';

const HomeView = () => {
    const dispatch = useDispatch()

    const [loadingstages, setloadingstages] = useState({ loading: false, loadingmessage: 'tabs' });

    const [emailVerifyPage, setemailVerifyPage] = useState(false)

    const [SearchValue, setSearchValue] = useState('')

    const selectedSearchEngine = useSelector(state => state.appSearchEngine.selectedEngine)
    //const appAuthReducerUser = useSelector(state => state.appAuth.user)


    const [noteSection, setnoteSection] = useState(false)
    const [settingSection, setsettingSection] = useState(false)

    const handleAddHistoryToSearch = (search) => {
        setSearchValue(search)
    }

    const searchToData = async () => {
        if (SearchValue.length !== 0) {
            dispatch(saveAppHistory(SearchValue))
            dispatch(searchPreProcess(SearchValue))
        }
    }

    const handleenterSearch = (e) => {
        if (e.keyCode === 13) {
            searchToData()
        } else if (e.keyCode === 40) {
            document.getElementById('search-suggestion').firstChild.focus()
        }
    }

    const handleInpputFocus = (e) => {
        window.location.href = '#search'
    }

    const handleSearchSuggestion = (data) => {
        if (data.toLowerCase() === SearchValue.toLowerCase()) {
            searchToData()
        }
        setSearchValue(data)
    }



    useEffect(() => {
        const fetchData = async () => {
            setloadingstages({ loading: true, loadingmessage: 'profile' });

            const unsubscribe = auth.onAuthStateChanged(async (user) => {
                if (!user) {
                    dispatch(openAuthPage());
                    setloadingstages({ loading: false, loadingmessage: 'profile' });
                } else if (!user.emailVerified) {
                    setemailVerifyPage(true);
                    // setloadingstages({ loading: false, loadingmessage: 'profile' })
                } else {
                    const { email, uid, photoURL, displayName, emailVerified, accessToken } = user;
                    setloadingstages({ loading: true, loadingmessage: 'profile' });
                    await dispatch(appsetUser({ email, uid, photoURL, displayName, emailVerified, accessToken }));

                    setemailVerifyPage(false);

                    // Database calls
                    setloadingstages({ loading: true, loadingmessage: 'searchengine' });
                    await dispatch(getSettingData());
                    await dispatch(getSearchEngine());

                    setloadingstages({ loading: true, loadingmessage: 'notes' });
                    await dispatch(getAllNotes());

                    setloadingstages({ loading: true, loadingmessage: 'history' });
                    await dispatch(getAllHistory());

                    setloadingstages({ loading: true, loadingmessage: 'tabs' });
                    await dispatch(getAllTabs());

                    setloadingstages({ loading: false, loadingmessage: 'tabs' });
                }
            });

            return () => unsubscribe();
        };

        fetchData();
    }, [dispatch]);

    return (
        <>
            <div className='max-w-[1200px] mx-auto px-3 md:flex gap-5'>
                <div className='w-full'>
                    <header className='py-5 flex justify-between items-center'>
                        <h1 className='text-xl'>Surf Space</h1>
                        <span className='flex items-center gap-2'>

                            <Theme />

                            <label className="swap swap-rotate text-xl bg-slate-100 dark:bg-slate-700 w-8 h-8 rounded-full  md:hidden">
                                <i className={`${noteSection ? 'ri-sticky-note-fill' : 'ri-sticky-note-line'}`}
                                    onClick={() => setnoteSection(!noteSection)}></i>
                            </label>

                            <label className="swap swap-rotate text-xl bg-slate-100 dark:bg-slate-700 w-8 h-8 rounded-full">
                                <i className="ri-settings-line"></i>
                                <i className={`${settingSection ? 'ri-settings-fill' : 'ri-settings-line'}`}
                                    onClick={() => setsettingSection(!settingSection)}></i>
                            </label>

                        </span>
                    </header>

                    <h1 className='text-3xl mt-6 md:mt-12 font-medium'>Customize, Organize and Simplify</h1>

                    <div className='flex justify-between items-center mt-6 flex-wrap lg:flex-nowrap gap-5'>
                        <div className='flex justify-start items-center gap-2 flex-wrap lg:flex-nowrap lg:w-full'>
                            {zestlarkApps.map(app => (
                                <a key={app.name} className="flex items-center justify-start gap-2 p-2 px-2 pr-4 w-auto rounded-3xl" style={{ backgroundColor: app.color }} href={app.url}><img className='w-6' src={app.icon} alt='' /><li className='list-none text-black text-sm opacity-80'>{app.name}</li></a>
                            ))}
                        </div>
                        <Weather />
                    </div>

                    <div className='SearchBox bg-gray-100 bg-opacity-70 backdrop-blur-sm dark:bg-gray-800 dark:bg-opacity-70 rounded-full p-1 pl-2 mt-5 md:mt-10 flex justify-center items-center sticky top-2 z-30'>
                        <img onClick={() => { setsettingSection(true) }} className='w-10 cursor-pointer rounded-full' src={selectedSearchEngine?.image} alt='' />
                        <input id='search' autoComplete="off" onFocus={handleInpputFocus} onChange={e => setSearchValue(e.target.value)} value={SearchValue} onKeyDown={handleenterSearch} className='p-3 pl-3 lg:pl-4 bg-transparent outline-none w-full dark:text-white dark:placeholder-gray-400' placeholder='Search' />
                        <i onClick={() => { searchToData() }} className="ri-search-line w-10 text-xl"></i>
                    </div>

                    <div className={`bg-slate-50 dark:bg-slate-800 mt-2 sticky top-[70px] z-30 rounded-3xl overflow-hidden ${SearchValue.length === 0 ? 'hidden' : ''}`}>
                        <SearchSuggestion searchValue={SearchValue} handleSearchSuggestion={handleSearchSuggestion} />
                    </div>

                    <History addHistoryToSearch={handleAddHistoryToSearch} />

                    <Tabs />

                    <News />

                </div>

                <div className='w-full md:w-auto md:min-w-[350px] md:max-w-[350px]'>
                    <div id='notesBox' className={`z-30 pb-4 pt-2 px-4 md:px-3 md:pt-2 mt-5 md:mt-0 fixed left-0 w-full md:static md:w-auto md:min-w-[350px] md:max-w-[350px] bg-white dark:bg-slate-800 md:bg-transparent dark:md:bg-transparent h-[100%] md:h-auto md:rounded-t-2xl ${noteSection ? 'block bottom-0 slide-top md:slide-none' : 'md:block transition-all slide-bottom md:slide-none'}`}>
                        <Notes closeNotesPage={() => { setnoteSection(false) }} />
                    </div>

                    <ZBlog />
                </div>

                {settingSection ? <div className='fixed top-0 left-0  w-screen h-[100dvh] z-30 flex justify-center items-end md:items-center md:backdrop-blur-md' onClick={() => { setsettingSection(false) }}>
                    <Setting closeSettingPage={() => { setsettingSection(false) }} />
                </div> : ''}

                <NoteShowBig />
                <NewTabPage />

                {emailVerifyPage ? <EmailVerify /> : ''}

                {loadingstages.loading ?
                    <Loading elem={loadingstages} />
                    : ''
                }
            </div >
        </>
    );
}

// https://newsapi.org/v2/everything?q=india&from=2024-05-23&sortBy=publishedAt&apiKey=866b4fb339b0407ea72e70ba9d333b01
// https://api.weatherapi.com/v1/current.json?key=3d1c17ce26b6459cada53111222506&q=malad&aqi=no

export default HomeView;
