import React, { useEffect, useState, useRef } from 'react';
import { colorcode } from '../app/scripts/colors';
import { setLocation } from '../app/reducers/appSettingReducer';
import { useDispatch } from 'react-redux';

const Weather = () => {
    const dispatch = useDispatch();
    const [weather, setWeather] = useState();
    const hasFetchedWeather = useRef(false);

    const weatherColorSelector = (temperature) => {
        if (Number(temperature)) {
            // console.log(temperature);

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
            try {
                const latAndlonfetch = await fetch('https://freeipapi.com/api/json')
                const latAndlondata = await latAndlonfetch.json();
                if (latAndlondata.latitude) {
                    dispatch(setLocation({ country: latAndlondata.countryName, timezone: latAndlondata.timeZones[0], regionName: latAndlondata.regionName, countryCode: latAndlondata.countryCode }))
                    let { latitude, longitude } = latAndlondata;
                    const data = await fetch(`https://api.weatherapi.com/v1/current.json?key=3d1c17ce26b6459cada53111222506&q=${latitude},${longitude}&aqi=no`);
                    const res = await data.json();
                    setWeather(res);
                }
            } catch (err) {
                hasFetchedWeather.current = false
            }

            // console.log(res);
        };

        if (!hasFetchedWeather.current) {
            fetchWeather();
            hasFetchedWeather.current = true;
        }
    }, [dispatch]);

    if (weather?.current)
        return (
            <div className='w-full md:max-w-[340px] lg:max-w-[400px] md:p-1 rounded-full flex gap-3 items-center justify-between md:justify-end'>
                <h3 className='text-xl font-bold bg-slate-100 bg-opacity-70 dark:bg-slate-700 dark:bg-opacity-70 h-12 flex items-center px-3 rounded-full'>{weather?.current?.temp_c} °C</h3>
                <div>
                    <p className='max-w-[150px] lg:max-w-[280px] block truncate'>{weather?.current?.condition?.text}</p>
                    <small className='max-w-[150px] lg:max-w-[280px] block truncate'>{weather?.location?.name} , {weather?.location?.region} , {weather?.location?.country}</small>
                </div>
                <div className='min-w-12 max-w-12 h-12 flex justify-center items-center' style={{ clipPath: 'polygon(50.6% 0%, 82.8% 12%, 100% 43%, 92.8% 78%, 68.3% 100%, 31.7% 100%, 7.2% 78%, 0% 43%, 17.2% 12%)', background: weatherColorSelector(weather?.current.temp_c) }}>
                    <img className='w-[85%] -mt-1' src={weather?.current?.condition?.icon} alt='' />
                </div>
            </div>
        );

    return ''
};

export default Weather;
