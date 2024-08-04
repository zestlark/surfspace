import React, { useState, useEffect, useMemo } from 'react';

function Loading({ elem }) {
    const [dot, setdot] = useState('.');

    useEffect(() => {
        const interval = setInterval(() => {
            setdot(prevDot => prevDot.length < 3 ? prevDot + '.' : '.');
        }, 300);
        return () => clearInterval(interval);
    }, []);

    const stage = useMemo(() => ({
        tabs: 'https://img.icons8.com/?size=48&id=kJr8od2fGcmF&format=png',
        history: 'https://img.icons8.com/?size=48&id=RIpJzV1wZ66a&format=png',
        notes: 'https://img.icons8.com/?size=48&id=t6y1uEYgxej6&format=png',
        profile: 'https://img.icons8.com/?size=48&id=19329&format=png',
        searchengine: 'https://img.icons8.com/?size=48&id=13118&format=png'
    }), []);


    return (
        <div className='fixed w-screen h-screen top-0 left-0 backdrop-blur-3xl z-30 flex justify-center items-center'>
            <div className='slide-top text-center max-h-[80px] bg-slate-100 border border-black dark:border-slate-600 dark:bg-slate-800 w-auto gap-2 rounded-lg p-5 flex items-center justify-start'>
                <div className='relative w-[40px] h-[40px] mx-auto my-6 overflow-hidden'>
                    {Object.keys(stage).map((key, i) => (
                        <img
                            className={`w-full h-full slide-top-fast`}
                            style={{ display: elem.loadingmessage === key ? 'block' : 'none' }}
                            src={stage[key]}
                            key={i}
                            alt=''
                        />
                    ))}

                </div>
                <p className="text-sm text-gray-600 mb-4 mt-3">
                    <span className='capitalize'>{elem.loadingmessage}</span> Loading {dot}
                </p>
            </div>
        </div>
    );
}

export default Loading;
