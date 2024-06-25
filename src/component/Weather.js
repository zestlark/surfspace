import React, { useEffect, useState, useRef } from 'react';
import { colorcode } from '../app/scripts/colors';

const Weather = () => {
    const [weather, setWeather] = useState();
    const hasFetchedWeather = useRef(false);

    const weatherColorSelector = (temperature) => {
        if (Number(temperature)) {
            console.log(temperature);

            if (temperature > 35) {
                return colorcode[2] + '99';
            } else if (temperature < 35 && temperature > 25) {
                return colorcode[1] + '99';
            } else if (temperature < 25) {
                return colorcode[0] + '99';
            } else {
                return '#fafafa99';
            }
        }
    };

    useEffect(() => {
        const fetchWeather = async () => {
            const data = await fetch('https://api.weatherapi.com/v1/current.json?key=3d1c17ce26b6459cada53111222506&q=malad,india&aqi=no');
            const res = await data.json();
            setWeather(res);
            console.log(res);
        };

        if (!hasFetchedWeather.current) {
            fetchWeather();
            hasFetchedWeather.current = true;
        }
    }, []);

    if (weather?.current)
        return (
            <div className='w-full md:max-w-[340px] p-1 rounded-full flex gap-3 items-center justify-between md:justify-end'>
                <h3 className='text-xl font-bold bg-slate-100 dark:bg-slate-700 h-12 flex items-center px-3 rounded-full'>{weather?.current.temp_c} °C</h3>
                <div>
                    <p className='truncate'>{weather?.current?.condition.text}</p>
                    <small className='max-w-[200px] block truncate'>{weather?.location.name} , {weather?.location.region} , {weather?.location.country}</small>
                </div>
                <div className='min-w-12 max-w-12 h-12 flex justify-center items-center' style={{ clipPath: 'polygon(50.6% 0%, 82.8% 12%, 100% 43%, 92.8% 78%, 68.3% 100%, 31.7% 100%, 7.2% 78%, 0% 43%, 17.2% 12%)', background: weatherColorSelector(weather?.current.temp_c) }}>
                    <img className='w-[85%] -mt-1' src={weather?.current.condition.icon} alt='' />
                </div>
            </div>
        );

    return ''
};

export default Weather;
