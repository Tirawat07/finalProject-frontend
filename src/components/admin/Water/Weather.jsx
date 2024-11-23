import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Weather = () => {
    const [search, setSearch] = useState('')
    const [weatherData, setWeatherData] = useState([])

    useEffect(() => {

        SearchPress()
    }, [])

    const api = {
        key: '2b74d16fdc0fecf793c35ce92e18b0a9',
        base: 'https://api.openweathermap.org/data/2.5/'
    }




    const SearchPress = async () => {
        fetch(`${api.base}/weather?q=${search}&units=metric&APPID=${api.key}`)
            .then(res => res.json())
            .then((result) => {
                setWeatherData(result)
            })
        console.log(weatherData)
    }


    return (

        <div className='text-red-400 bg-orange-200 w-full  h-full rounded-xl px-3 py-4 gap-4 flex flex-col'>
            

            <h1 className="text-4xl font-bold text-center text-purple-200 bg-lime-500 p-1 rounded-md">Search Weather</h1>
 
            <div className='flex gap-2 mb-6'>
                <input
                    type="text"
                    placeholder='Search...'
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1  rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all "
                />
                <button
                    onClick={SearchPress}
                    className=" bg-red-400 text-white rounded-lg hover:bg-red-500 transition-colors duration-200 "
                >
                    Search
                </button>
            </div>

            {typeof weatherData.main != "undefined" ? (
                <div className='flex flex-col justify-between gap-2'>
                    <div className="space-y-4 bg-white rounded-lg p-6 shadow-lg">
                        <h1 className="text-2xl font-semibold">{weatherData.name}</h1>
                        <h1 className="text-4xl font-bold">{weatherData.main.temp}°C</h1>
                        <h1 className="text-xl">{weatherData.weather[0].main}</h1>
                        

                    </div>
                    <div className="space-y-4 bg-white rounded-lg p-6 shadow-lg">
                        <h1 className="text-4xl font-bold">Wind</h1>
                        <h1 className="text-red-400">Deg:{weatherData.wind.deg}</h1>
                        <h1 className="text-red-400">gust:{weatherData.wind.gust}</h1>
                        <h1 className="text-red-400">speed:{weatherData.wind.speed}</h1>
                    </div>
                </div>


            ) : (
                ''
            )}
        </div>
    )
}

export default Weather