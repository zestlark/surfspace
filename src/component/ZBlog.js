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
            <div className='z-0 mt-1'>
                {zblogData.length > 0 ? zblogData.slice(0, 4).map((blog, index) => {
                    return (
                        <div key={index} className='w-full pb-3 sm:p-1'>
                            <div className="card bg-slate-50 dark:bg-slate-800 max-w-[full] w-full h-full aspect-video">
                                <figure>
                                    <img className='aspect-video object-cover'
                                        src={blog.imageUrl}
                                        alt="" />
                                </figure>
                                <div className="p-3">
                                    <h2 className="card-title line-clamp-1">{blog.title}</h2>
                                    <p className='line-clamp-2'>{htmltotext(blog.body)}</p>
                                    <div className="card-actions justify-between items-center mt-3">
                                        <small>{moment(blog.createdAt).fromNow()}</small>
                                        <a href={`https://blog-zestlark-0.web.app/blog/${blog.title}`}>
                                            <button className="p-2 rounded-md text-sm bg-[#00000022]">Read More</button>
                                        </a>
                                    </div>
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
