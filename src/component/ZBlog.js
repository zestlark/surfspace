import moment from 'moment';
import React, { useEffect, useState } from 'react';

const ZBlog = () => {
    const [zblogData, setzblogData] = useState([]);

    const htmltotext = (html) => {
        const div = document.createElement('div');
        div.innerHTML = html;
        const text = div.textContent
        return text
    }
    useEffect(() => {
        const sessionzblogData = sessionStorage.getItem(btoa('zblogData'))
        if (sessionzblogData) {
            setzblogData(JSON.parse(sessionzblogData))
            // console.log(sessionzblogData);
            return
        }
        const fetchzblogData = async () => {
            try {
                const zblogData = await fetch('https://z-blog-4h05.onrender.com/blog')
                const jsondata = await zblogData.json()
                // console.log(jsondata);
                setzblogData(jsondata.reverse())
                sessionStorage.setItem(btoa('zblogData'), JSON.stringify(jsondata))

            } catch (e) {
                setzblogData([])
            }
        }

        fetchzblogData()
    }, [])
    return (
        <div className='mt-4 md:mt-0 md:p-2 pt-0'>
            <p className='px-1'><small>Blogs</small></p>
            <div className='z-0 mt-2'>
                {zblogData.length > 0 ? zblogData.slice(0, 8).map((blog, index) => {
                    return (

                        <div key={index} className="flex bg-slate-100 bg-opacity-70 backdrop-blur-sm dark:bg-slate-800 dark:bg-opacity-70 rounded-xl overflow-hidden items-stretch mb-3">
                            <img
                                src={blog.imageUrl}
                                alt=""
                                className='w-[30%] min-w-[140px] aspect-video min-h-full object-cover' />
                            <div className="p-3">
                                <h2 className="font-medium line-clamp-2 overflow-hidden">{htmltotext(blog.title)}</h2>
                                <p className='line-clamp-1 mb-2 max-w-[150px] text-sm'>{htmltotext(blog.body)}</p>
                                <div className="card-actions justify-between items-center mt-3">
                                    <small>{moment(blog.createdAt).fromNow()}</small>
                                    <a href={`https://zblogs-0.web.app/blog/${blog.title}`}>
                                        <button className="p-2 rounded-md text-sm bg-[#00000022]">Read More</button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    )
                }) : (<div className='w-full bg-slate-100 dark:bg-slate-800 flex justify-center items-center min-h-[100px] rounded-2xl mt-2'>
                    <span className="loading loading-ring loading-md"></span>
                </div>)}

            </div>
        </div>
    );
}

export default ZBlog;
