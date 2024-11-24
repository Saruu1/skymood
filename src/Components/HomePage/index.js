import React, {useState} from 'react';
import "./homepage.css";
import Loader from '../Loader';
const HomePage = () => {
    const API_KEY = "a696cddf1d9b113b4a43f1aee8e3fb9a"; 
    const [City, setCity] = useState("");
    const [errormsg, seterrormsg] = useState("")
    const [SearchedCity, setSearchedCity] = useState("");
    const [Temperature, setTemperature] = useState("");
    const [Description, setDescription] = useState("");
    const [IconLink, setIconLink] = useState("");
    const [isLoading, setisLoading] = useState(false);
    const handleChange = (e) =>{
        setCity(e.target.value);
    }
    // funtion to capitalise the first alphabet of city and weather discription
    const Capitalise = (str) => {
       return (
        str.charAt(0).toUpperCase().concat(str.slice(1))
    )
} 
     // main function to fetch the data from api
    async function fectchWeather () {
        setisLoading(true);
        const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${City}&units=metric&appid=${API_KEY}`;
        try {
            const response = await fetch(API_URL);
            if(!response.ok){
             throw new Error("Failed to fetch weather data");
            }
            const data = await response.json();
            //Extracting the individual information
            const Temperature = data.main.temp;
            const Description = data.weather[0].description;
            const icon = data.weather[0].icon;
            setTemperature(Temperature);
            setDescription(Description);
            setSearchedCity(City)
            setIconLink(`https://openweathermap.org/img/wn/${icon}@2x.png`)
            seterrormsg("");
        } catch (error) { 
            seterrormsg("City not found!\nPlease try with the correct one.")
            setSearchedCity("")
        }
        setisLoading(false);
    }
  return (
    <div className="main">
    <div className="box">
      <div className="heading">SkyMood</div>
      <p className="description1">Look at the sky to change your mood!</p>
      <div className="search-bar">
        <input type="text" value={City} placeholder='Search your city'onChange={handleChange} />
        <button className="button" disabled={City.length===0} onClick={fectchWeather}>Search</button>
      </div>
      {/* displaying error msg on conditions */}
      {errormsg && !isLoading && <div className="errmsg">{errormsg}</div>}
      {!SearchedCity && !errormsg && !City && <div className="displaymsg">Enter the city to get weather data.</div>}
      {isLoading? (<Loader/>): (SearchedCity && !errormsg && <div className="lowerInfo">
            <div className="city">{Capitalise(SearchedCity)}</div>
        <img src={IconLink} alt="" />
        <div className="temperature">{Temperature} °C</div>
        <div className="description2">{Capitalise(Description)}</div>
        </div>)} 
    </div>
  </div>
  )
}

export default HomePage