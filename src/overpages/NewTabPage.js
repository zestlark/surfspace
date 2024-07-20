import React, { useState } from 'react';
import { colorcode } from '../app/scripts/colors';
import { useSelector, useDispatch } from 'react-redux';
import { addTab, closenewtabpage } from '../app/reducers/appTabsReducer';

function NewTabPage() {
    const dispatch = useDispatch();  // Fixed useDispatch initialization
    const [taburl, settaburl] = useState('');  // Initialized with an empty string
    const [tabSavingProcess, settabSavingProcess] = useState(false);
    const [tabimage, settabimage] = useState('https://i.gifer.com/ZKZg.gif');
    const [tabtitle, settabtitle] = useState('Not Available');
    const tabs = useSelector(state => state.appTabs.tabs);
    const tabOpenStatus = useSelector(state => state.appTabs.newtabpage)

    const fetchUrlTitle = async (url) => {
        try {
            const response = await fetch(`https://z-blog-4h05.onrender.com/zestlark/service/title?url=` + encodeURIComponent(url));
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            return data?.title || 'unknown';
        } catch (error) {
            console.error('Failed to fetch URL title:', error);
            return 'unknown';
        }
    };

    const checkImageUrlExists = (url, title) => {
        const randomcolor = colorcode[Math.floor(Math.random() * colorcode.length)].split('#')[1];
        const alertnateImage = `https://ui-avatars.com/api/?name=${title}&background=${randomcolor}`;
        return new Promise((resolve) => {
            const imageapiurl = `https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${url}&size=256`;
            const img = new Image();

            img.onload = () => {
                const originalHeight = img.naturalHeight;
                const originalWidth = img.naturalWidth;

                if (originalHeight === 16 && originalWidth === 16) {
                    resolve(alertnateImage);
                } else {
                    resolve(imageapiurl);
                }
            };
            img.onerror = () => resolve(alertnateImage);
            img.src = imageapiurl;
        });
    };

    const handleNewTab = async () => {
        if (taburl.length > 0) {
            if (tabs.find(e => e.url === taburl)) return;

            settabSavingProcess(true);  // Start saving process
            console.log('started');

            const title = await fetchUrlTitle(taburl);
            settabtitle(title);

            const icon = await checkImageUrlExists(taburl, title);
            settabimage(icon);

            dispatch(addTab({ url: taburl, title: title, icon: icon }));

            setTimeout(() => {
                settabSavingProcess(false);
                settaburl('')
                dispatch(closenewtabpage())
            }, 1000)
        }
    };

    if (tabOpenStatus)
        return (
            <div id={`tab-box-new`} className='tab-box w-1/4 sm:w-1/5 md:w-[1/6] lg:w-[12.5%] p-[2px] mb-1 active' onClick={() => { dispatch(closenewtabpage()) }}>
                <div onClick={(e) => { e.stopPropagation() }} className='tab-card bg-slate-50 dark:bg-slate-800 p-2 rounded-lg shadow-sm min-h-[90px]'>
                    <img className='w-[65%] mt-1 max-w-[100px] aspect-square mx-auto rounded-lg pointer-events-none' src={tabimage} alt='' />
                    <p className='pointer-events-none'><small className='text-center block truncate mt-2'>{tabtitle}</small></p>

                    <div className='details' onClick={e => { e.stopPropagation() }}>
                        <input
                            id={`tab-input-new`}
                            value={taburl}
                            onChange={e => settaburl(e.target.value)}
                            className='bg-transparent outline-none mx-auto block mt-3 p-1 w-[100%] border-b-2 mb-3'
                            placeholder='Enter your URL'
                        />
                        <span className='flex gap-1 mt-5 justify-between'>
                            <button className="btn btn-outline w-[49%]" onClick={() => { dispatch(closenewtabpage()) }}>
                                <i className="ri-close-line"></i> Close
                            </button>
                            <button
                                className="btn w-[49%] btn-primary"
                                disabled={tabSavingProcess}
                                onClick={handleNewTab}
                            >
                                {tabSavingProcess ? <span className="loading loading-spinner loading-md"></span> : 'Save'}
                            </button>
                        </span>
                    </div>
                </div>
            </div>
        );
}

export default NewTabPage;
