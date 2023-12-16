import React, { useState } from 'react';
import "./Weather.css"
import searchIcon from "../imgs/search.png";
import cloudIcon from "../imgs/cloud.png";
import clearIcon from "../imgs/clear.png";
import snowIcon from "../imgs/snow.png";
import drizzleIcon from "../imgs/drizzle.png";
import humidityIcon from "../imgs/humidity.png";
import rainIcon from "../imgs/rain.png";
import windIcon from "../imgs/wind.png";


const Weather = () => {
    const [location, setLocation] = useState('');    
    const [wicon,setWicon] = useState(cloudIcon)
    const [errmsg , setErrmsg]=useState(false);
    const witherImage = document.querySelector(".weather-image img");
    const weatherLocation = document.querySelector(".weather-Location");
    const cityName = document.querySelector(".name");
    const weather = document.querySelector(".Actuallyweather");
    const weatherTemp = document.querySelector(".weather-temp");
    const humidityPercent = document.querySelector(".humidity-percent"); 
    const windSpeed = document.querySelector(".wind-speed"); 
    const windSection = document.querySelector(".element1");
    const humintySection = document.querySelector(".element2");


    const search= async(Thelocation)=>{
        
        if(location === "" && weatherTemp.style.display==="block"
        &&weatherLocation.style.display==="block" &&windSection.style.display ==="block" &&humintySection.style.display==="block"
        &&witherImage.style.display==="block")
        {
            setErrmsg(true)
            weatherTemp.style.display="none";
            weatherLocation.style.display="none";
            windSection.style.display ="none";
            humintySection.style.display="none";
            witherImage.style.display="none";
        }
        else if(location === "" )
        {
            setErrmsg(true)
        }
        else{
            setErrmsg(false)
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${Thelocation}&units=Metric&appid=a1fdc361ea5424e1ffea654b790f28af`;
            const resp = await fetch(url);
            const data = await resp.json();
            setErrmsg(false);
            
            if(data.message==="city not found"){
                setErrmsg(true)
            weatherTemp.style.display="none";
            weatherLocation.style.display="none";
            windSection.style.display ="none";
            humintySection.style.display="none";
            witherImage.style.display="none";
            }
            else{
            setErrmsg(false);
            cityName.innerHTML = data.name+" ";
            weatherTemp.style.display="block";
            weatherLocation.style.display="block";
            windSection.style.display ="block";
            humintySection.style.display="block";
            weather.innerHTML = data.weather[0].main;
            weatherTemp.innerHTML = data.main.temp+" °C";
            humidityPercent.innerHTML = data.main.humidity + " %";
            windSpeed.innerHTML = data.wind.speed + " Km/h"
            if(data.weather[0].icon === "04d"){
                setWicon(cloudIcon);
                witherImage.style.display="block";
            }
            else if(data.weather[0].icon === "01d" || data.weather[0].icon === "01n"){
                setWicon(clearIcon);
                witherImage.style.display="block";
            }
            else if(data.weather[0].icon === "02d" || data.weather[0].icon === "02n"){
                setWicon(cloudIcon);
                witherImage.style.display="block";
            }
            else if(data.weather[0].icon === "03d" || data.weather[0].icon === "03n"){
                setWicon(drizzleIcon);
                witherImage.style.display="block";
            }
            else if(data.weather[0].icon === "04d" || data.weather[0].icon === "04n"){
                setWicon(drizzleIcon);
                witherImage.style.display="block";
            }
            else if(data.weather[0].icon === "09d" || data.weather[0].icon === "09n"){
                setWicon(rainIcon);witherImage.style.display="block";
            }
            else if(data.weather[0].icon === "13d" || data.weather[0].icon === "13n"){
                setWicon(snowIcon);
                witherImage.style.display="block";
            }
            else
            {
                setWicon(clearIcon);
                witherImage.style.display="block";
            }
            }
        }
    }
    return (
    <div className='weather'>
        <div className='container text-center'>
            <h1 className='pt-4 '>Global Weather App</h1>
            <div className='top-bar '> 
                <input
        type='text'
        placeholder=' Enter City or Country'
        value={location}
        onChange={(e) => {
        setLocation(e.target.value);
        }}
    />
        <div className='search-icon' onClick={()=>search(location)}>  
        <img src={searchIcon} alt="search-icon" />
        </div>
        </div>
        {errmsg?<div className='errMsg'>
                <h4>Please Enter Valid City or Country </h4>
            </div>:<></>}
            <div className='weather-image'>
                <img src={wicon} alt="cloudIcon"  className="weatherImage"/>
            </div>  
            
        <div className='weather-Location '>
            <span className='identical'>
                <span className='fw-bold name text-white'>City </span>
                : Weather is</span> <span className='Actuallyweather weather'
                >cloudy</span>
        </div> 



            
            <div className='weather-temp'>24°C</div>
            <div className='data-container'>
                <div className='element1'>
                <div className='data-container-icon'>
                <img src={humidityIcon} alt="" className='icon'/>
                <div className='data'>
                    <div className='humidity-percent'>64 %</div>
                    <div className='text'>Humidity</div>
                </div>
                </div>
                </div>
                <div className='element2'>
                    <div className='data-container-icon'>
                    <img src={windIcon} alt="" className='icon'/>
                    <div className='data'>
                        <div className='wind-speed'>18 Km/h</div>
                        <div className='text '>Wind Speed</div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Weather;
