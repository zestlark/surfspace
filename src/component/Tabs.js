import React, { useState } from 'react';
import { colorcode } from '../app/scripts/colors';
import { useDispatch, useSelector } from 'react-redux';
import { addTab, updateTab } from '../app/reducers/appTabsReducer';
import { searchPreProcess } from '../app/reducers/appSearchEngineReducer';

const Tabs = () => {
    const dispatch = useDispatch()
    const tabs = useSelector(state => state.appTabs.tabs)
    const [tabSavingProcess, settabSavingProcess] = useState(false);

    const handleContext = (e) => {
        e.preventDefault();
        e.target.parentNode.classList.add('active')
    }

    const handleTabBoxclick = (e) => {
        if (e.target.classList.contains('active')) {
            e.target.classList.remove('active')
        }
    }

    const handleTabCardClick = (e, url) => {
        e.stopPropagation();
        // console.log(e.target.parentNode);

        if (e.target.parentNode.classList.contains('active')) {
        } else {
            dispatch(searchPreProcess(url))
        }
    }

    const fetchUrlTitle = async (url) => {
        if (url.length > 0) {
            const response = await fetch(`https://z-blog-4h05.onrender.com/zestlark/service/title?url=` + url);
            const data = await response.json();
            // console.log(data);
            return data?.title || 'unknown'
        }
    }

    const checkImageUrlExists = (url, title) => {
        const randomcolor = colorcode[Math.floor(Math.random() * colorcode.length)].split('#')[1]
        const alertnateImage = `https://ui-avatars.com/api/?name=${title}&background=${randomcolor} `
        return new Promise((resolve) => {
            const imageapiurl = `https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${url}&size=256`;
            const img = new Image();

            img.onload = () => {
                const originalHeight = img.naturalHeight;
                const originalWidth = img.naturalWidth;

                if (originalHeight === 16 && originalWidth === 16) {
                    // console.log(`Original Width: ${originalWidth}, Original Height: ${originalHeight}`);
                    resolve(alertnateImage)
                } else {
                    resolve(imageapiurl)
                }
            };
            img.onerror = () => resolve(alertnateImage);
            img.src = imageapiurl;
        });
    };

    const handleNewTab = async () => {
        const url = prompt('Enter url')

        if (tabs.find(e => e.url === url)) return

        const title = await fetchUrlTitle(url)
        const icon = await checkImageUrlExists(url, title)
        // console.log(icon);
        dispatch(addTab({ url: url, title: title, icon: icon }))
    }

    const handleTabUpdate = async (index) => {
        settabSavingProcess(true)
        let elem = document.getElementById(`tab-input-${index}`)
        const url = elem.value
        const title = await fetchUrlTitle(url)
        const icon = await checkImageUrlExists(url, title)
        dispatch(updateTab({ url: url, title: title, icon: icon, id: index }))
        // console.log('tab update');
        settabSavingProcess(false)
        //document.getElementById(`tab-box-${index}`).click()
    }

    return (
        <div className='mt-4'>
            <p className='px-1'><small>Tabs</small></p>
            <div className='p-[2px] mt-1 flex flex-wrap items-stretch'>

                <div className='w-1/4 sm:w-1/5 md:w-[1/6] lg:w-[12.5%] p-[2px] mb-1' onClick={handleNewTab}>
                    <div className='w-full border-2 dark:border-slate-500 border-slate-300 flex justify-center items-center min-h-[90px] rounded-md'>
                        <i className="ri-add-large-line"></i>
                    </div>
                </div>

                {tabs.map((tab, index) => {

                    return (
                        <div key={tab.url} id={`tab-box-${index}`} onClick={handleTabBoxclick} className='tab-box w-1/4 sm:w-1/5 md:w-[1/6] lg:w-[12.5%] p-[2px] mb-1'>
                            <div onContextMenu={handleContext} onClick={(e) => { handleTabCardClick(e, tab.url) }} className='tab-card bg-slate-50 dark:bg-slate-800 p-2 rounded-lg shadow-sm min-h-[90px]'>
                                <img className='w-[65%] mt-1 max-w-[100px] aspect-square mx-auto rounded-lg pointer-events-none' src={tab.icon} alt='' />
                                <p className='pointer-events-none'><small className='text-center block truncate mt-2'>{tab.title || 'untitled'}</small></p>

                                <div className='details' onClick={e => { e.stopPropagation() }}>
                                    <input id={`tab-input-${index}`} className='bg-transparent outline-none mx-auto block mt-3 p-1 w-[100%] border-b-2 mb-3' placeholder='Enter your url' defaultValue={tab.url} />
                                    <span className='flex gap-1 justify-between'>
                                        <button className="btn  btn-outline w-[49%] btn-error"><i className="ri-delete-bin-line text-lg"></i> Delete</button>
                                        <button className="btn w-[49%] btn-primary" disabled={tabSavingProcess ? 'disabled' : ''} onClick={() => { handleTabUpdate(index) }}>{tabSavingProcess ? <span className="loading loading-spinner loading-md"></span> : 'Save'}</button>
                                    </span>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div >
    );
}

export default Tabs;
