import moment from 'moment';
import React, { useEffect, useState } from 'react';

const News = () => {
    const [newsdata, setnewsdata] = useState([]);
    useEffect(() => {
        const sessionnewsdata = sessionStorage.getItem(btoa('newsdata'))
        if (sessionnewsdata) {
            setnewsdata(JSON.parse(sessionnewsdata))
            return
        }
        const fetchnewsData = async () => {
            //alternate key d5d28d52b0bb46c6ad00604982c11c1c
            const newsData = await fetch("https://newsdata.io/api/1/news?apikey=pub_473389f15a890a0ce83a56ef0464a1761ca69&country=in&language=en")
            const jsondata = await newsData.json()
            console.log(jsondata);
            if (jsondata.status === 'success') {
                setnewsdata(jsondata.results)
                sessionStorage.setItem(btoa('newsdata'), JSON.stringify(jsondata.results))
            } else {
                setnewsdata([])
            }
        }

        fetchnewsData()
    }, [])
    return (
        <div className='mt-4'>
            <p className='px-1'><small>News</small></p>
            <div className='flex flex-wrap z-0 mt-1'>
                {newsdata.length > 0 ? newsdata.map((news, index) => {
                    if (news.image_url) {
                        return (
                            <div key={index} className='w-full sm:w-1/2 pb-3 sm:p-1'>
                                <div className="card bg-base-100 image-full w-full h-full shadow-xl aspect-video">
                                    <figure>
                                        <img className='aspect-video'
                                            src={news.image_url}
                                            alt="" />
                                    </figure>
                                    <div className="card-body relative">
                                        <h2 className="card-title line-clamp-3">{news.title}</h2>
                                        {/* <p>If a dog chews shoes whose shoes does he choose?</p> */}
                                        <div className="card-actions justify-between items-center mt-3 absolute w-[80%] left-[10%] bottom-5">
                                            <small>{moment(news.pubDate).fromNow()}</small>
                                            <a href={news.link}>
                                                <button className="p-2 rounded-md text-sm bg-[#ffffff66] text-slate-200">Read More</button>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    } else {
                        return ''
                    }
                }) : (<div className='w-full bg-slate-100 dark:bg-slate-800 flex justify-center items-center min-h-[100px] rounded-2xl mt-2'>
                    <span className="loading loading-ring loading-md"></span>
                </div>)}
            </div>
        </div>
    );
}

export default News;
