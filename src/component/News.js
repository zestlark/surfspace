import moment from 'moment';
import React, { useEffect, useState } from 'react';

const News = () => {
    const [newsdata, setnewsdata] = useState([]);
    useEffect(() => {
        const sessionnewsdata = sessionStorage.getItem(btoa('newsdata'))
        if (sessionnewsdata) {
            setnewsdata(JSON.parse(sessionnewsdata))
            console.log(sessionnewsdata);
            return
        }
        const fetchnewsData = async () => {
            const newsData = await fetch('https://newsapi.org/v2/top-headlines?apiKey=866b4fb339b0407ea72e70ba9d333b01&country=in')
            const jsondata = await newsData.json()
            console.log(jsondata.articles);
            if (jsondata.status === 'ok') {
                setnewsdata(jsondata.articles)
                sessionStorage.setItem(btoa('newsdata'), JSON.stringify(jsondata.articles))
            } else {
                setnewsdata([])
            }
        }

        fetchnewsData()
    }, [])
    return (
        <div className='mt-4'>
            <p className='px-1'><small>News</small></p>
            <div className='flex flex-wrap z-0 mt-2'>
                {newsdata.length > 0 ? newsdata.map((news, index) => {
                    if (news.urlToImage) {
                        return (
                            <div key={index} className='w-full sm:w-1/2 pb-3 sm:p-2'>
                                <div className="card bg-base-100 image-full w-full h-full shadow-xl aspect-video">
                                    <figure>
                                        <img className='aspect-video'
                                            src={news.urlToImage}
                                            alt="" />
                                    </figure>
                                    <div className="card-body relative">
                                        <h2 className="card-title line-clamp-3">{news.title}</h2>
                                        {/* <p>If a dog chews shoes whose shoes does he choose?</p> */}
                                        <div className="card-actions justify-between items-center mt-3 absolute w-[80%] left-[10%] bottom-5">
                                            <small>{moment(news.publishedAt).fromNow()}</small>
                                            <a href={news.url}>
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
                }) : ''}
            </div>
        </div>
    );
}

export default News;
