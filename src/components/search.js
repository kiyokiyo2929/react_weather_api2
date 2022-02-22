import React, {useState} from 'react';
import axios from 'axios';
import ReactMapGl, {Marker, Popup} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const token = process.env.REACT_APP_MAP_KEY;
let year;


const get_time = (unix_timestamp)=>{
    let date = new Date(unix_timestamp * 1000);
    let newDate = date.toString().substr(3, 8)
    
    return newDate
}
const get_day_hour_time = (unix_timestamp)=>{
    let date = new Date(unix_timestamp * 1000);
    let newDate = date.toString().substr(4, 6)
    let date_houres = ("0"+(date.getHours())).substr(-2);
    let date_minutes = ("0"+(date.getMinutes())).substr(-2);

    return newDate + ", " + date_houres+":"+ date_minutes
}
const get_local_day_hour = (unix_timestamp, localtime)=>{
    let date = new Date((unix_timestamp + localtime) * 1000);
    let newhour = date.toGMTString().substr(17, 5)
    return newhour
}

const get_hour_time = (unix_timestamp)=>{
    let date = new Date(unix_timestamp * 1000);
    let date_houres = ("0"+(date.getHours())).substr(-2);
    let date_minutes = ("0"+(date.getMinutes())).substr(-2);
    return date_houres+":"+ date_minutes 
}


const get_year = () =>{
    let new_Date = new Date();
    let year = new_Date.getFullYear();
    return year;
}

const get_day_of_week = (unix_timestamp)=> {
    let date = new Date(unix_timestamp * 1000);
    let day_of_week = date.toString().substr(0, 3);
    return day_of_week;
}

const holiday_edit = (holday_data)=>{
    let holiday_m = holday_data.substr(5, 2);
    let holiday_month;
    switch(holiday_m){
        case ("01"):
            holiday_month="Jan";
            break;
        case ("02"):
            holiday_month="Feb";
            break;
        case ("03"):
            holiday_month="Mar";
            break;
        case ("04"):
            holiday_month="Apr";
            break;
        case ("05"):
            holiday_month="May";
            break;
        case ("06"):
            holiday_month="Jun";
            break;
        case ("07"):
            holiday_month="Jul";
            break;
        case ("08"):
            holiday_month="Aug";
            break;
        case ("09"):
            holiday_month="Sep";
            break;
        case ("10"):
            holiday_month="Oct";
            break;
        case ("11"):
            holiday_month="Nov";
            break;
        case ("12"):
            holiday_month="Dec";
            break;
    }

    let holiday_d = holday_data.substr(-2);
    let holiday_day = [];
    let degi = holiday_d.split("");
    if(degi[0] !== "0"){
        holiday_day.push(degi[0])
    }
    holiday_day.push(degi[1]);
    let holiday_day_ = holiday_day.join("");
    return holiday_month + " " + holiday_day_

}


const Search =()=>{
    const [search, setSearch] = useState("");
    const [result, setResult] = useState("");
    const [holiday, setHoliday]= useState("");
    const [data, seData] = useState("");
    const [day, setDay] = useState("");
    const [weather, setWeather]=useState("");
    const [today_weather, setToday_weather]=useState("");
    const [states, setStates] = useState("");
    const [aleart, setAleart] = useState("");
    const [city, setCity] = useState("");
    const [aleart_long, setAleart_long]=useState(false);
    const [city_name, setCity_name]= useState("Berlin");
    const [city_name_long, setCity_name_long] = useState(false);
    const [city_name_so_long, setCity_name_so_long] = useState(false);
    const [timezone, setTimeZone]= useState("");
    const [year, setYear]=useState("");
    const [init, setInit] = useState(true);

    const [viewport, setViewport] = useState({
        width: '42.5vw',
        height:'25vh',
        latitude:52.519334503212846,
        longitude:13.415270749959939, 
        zoom:10
    });

    let dayArray=[];
    let objectSet = [];
    let key = process.env.REACT_APP_API_KEY;
 
    const handleInputChange = (e) => {
        setSearch(e.target.value);
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        setResult(search);
        setInit(false);
        let geo_url=`http://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=${key}`
        let state_code;
        let states;
        let country;
     

        //geo_search// & //weather_search//
        axios.get(geo_url)
        .then(response=>{
            if(response.data[0]){
                console.log(response.data[0].name.length)
              
                console.log(response.data)

                let country_pick=[]
                 response.data.forEach((el,idx)=>{
                   (el.country=="DE")?country_pick.push(idx):console.log('')
                });
                console.log(country_pick);

                let german_city_position;
                    (country_pick[0])?german_city_position = country_pick[0]:german_city_position = 0;               

                let city_data_in_germany = response.data[german_city_position];
                console.log(city_data_in_germany);
                
                if(city_data_in_germany.name.length > 11){
                    setCity_name_so_long(true);
                    setCity_name_long(false);
                    setCity_name(false);
                } else if(city_data_in_germany.name.length > 5 ){
                    setCity_name_so_long(false);
                    setCity_name_long(true);
                    setCity_name(false);
                } else if(city_data_in_germany.name.length <= 5){
                    setCity_name_so_long(false);
                    setCity_name_long(false);
                    setCity_name(true);
                }

                let forecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${city_data_in_germany.lat}&lon=${city_data_in_germany.lon}&exclude=current,minutely,hourly&units=metric&appid=${key}`; 
                states = (city_data_in_germany.state);
                country=city_data_in_germany.country;
                setStates(states);
                setCity(city_data_in_germany.name)

         
                setViewport({
                    width: '42.5vw',
                    height:'25vh',
                    latitude:response.data[0].lat,
                    longitude:response.data[0].lon,
                    zoom:10
                })

                axios.get(forecast)
                .then(response=>{                
                    (response.data.alerts)? 
                    (response.data.alerts.length>5)?setAleart_long(true):setAleart_long(false)
                    :setAleart_long(false);
                    

                    let forecast_data = response.data.daily;
                    setTimeZone(response.data.timezone_offset);
                    console.log(response.data)
                    
                    let today_forcast = forecast_data.shift();
                    setAleart(response.data.alerts)
                    setToday_weather(today_forcast);
                    setWeather(forecast_data)

                    if(country=="DE"){
                    switch(states){
                        case "Brandenburg":
                             state_code = "BB";
                             break;

                        case "Berlin":
                             state_code ="BE";
                             break;

                        case "Bavaria":
                              state_code = "BY";
                              break;

                        case "Baden-Württemberg":
                              state_code = "BW";
                              break;

                        case  "Free Hanseatic City of Bremen":
                               state_code = "HB";
                               break;

                        case "Hesse":
                              state_code = "HE";
                              break;

                        case "Hamburg":
                              state_code = "HH";
                              break;
                        
                        case  "Mecklenburg-Vorpommern":
                               state_code="MV";
                               break;
                        
                        case  "Lower Saxony":
                               state_code = "NI"
                               break;

                        case "North Rhine-Westphalia":
                               state_code = "NW";
                               break;

                        case  "Rhineland-Palatinate":
                               state_code = "RP";
                               break;

                        case  "Schleswig-Holstein":
                               state_code = "SH";
                               break;
                        
                        case  "Saarland":
                               state_code = "SL";
                               break;
                        
                        case  "Saxony":
                               state_code  = "SN";
                               break;
                        
                        case  "Saxony-Anhalt":
                               state_code = "ST";
                               break;
                        
                        case   "Thuringia":
                               state_code = "TH";
                               break
                    }
                    let year_data_api = get_year();
                    setYear(year_data_api)
                    let url =`https://feiertage-api.de/api/?jahr=${year_data_api}&nur_land=${state_code}`;
                    axios.get(url)
                    .then(response=>{
                        dayArray = Object.keys(response.data);
                        objectSet = Object.values(response.data)
                        objectSet.forEach((el, idx)=>{
                            el.name = dayArray[idx]
                        })
                        setDay(objectSet) 
                    })
                    .catch(err=>{
                        console.log(err)
                    })
                } else {
                    setStates("");
                    setDay(false);
                }
                

                })
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }

    return(
        <div>
            <header><p>Neu-Gier</p></header>
            
            <section id="top_section">
                
                <div>
                    <div id="top_title"><p>Weather and Holiday</p></div>
                    <form onSubmit={handleSubmit} id="top_form">
                            <input type="text" name="search" value={search}  onChange={handleInputChange} id="top_input"/>
                            <input type="submit" value="Search" id="top_input_btn"/>
                    </form>
                </div>

                <ReactMapGl
                {...viewport}
                onViewportChange={nextViewport => setViewport(nextViewport)}
                mapboxApiAccessToken={token} 
                ></ReactMapGl>

            </section>

            <section id="weather_section">
                <div id="weather_left">
                    <div id={(city)?"city_name_wrapper":""}>
                    
                        {(city_name_so_long)?<h2 id="city_name_so_long">{city}</h2>:""}
                        {(city_name_long)?<h2 id="city_name_long">{city}</h2>:""}
                        {(city_name)?<h2 id="city_name">{city}</h2>:""}
                        <p id="states_color">{states}</p>
                    </div>
            
                    <div>
                    {(today_weather)?
                        <div id="today_weather">
                            <h2>{get_time(today_weather.dt)}/ {get_day_of_week(today_weather.dt)}</h2>
                            <p className="sun_time">Sunrise : {get_local_day_hour (today_weather.sunrise, timezone)}</p>
                            <p className="sun_time">Sunset : {get_local_day_hour (today_weather.sunset, timezone)}</p>
                            <p id="today_weather_space">{today_weather.weather[0].main} / {today_weather.weather[0].description}</p>
                            <img src={`${process.env.PUBLIC_URL}/${today_weather.weather[0].main}.svg`}/>
                            <p id="today_tmp">{Math.floor(today_weather.temp.max)}° /  {Math.floor(today_weather.temp.min)}°</p>
                        </div>
                    :""} 
                    </div>
                </div>
                <div id="weather_right">
                    {(weather)?
                        <ul className="list_flex" id="weather_flex">
                            {weather.map((info)=>
                            <li key={info.sunrise}>
                                <h3>{ get_time(info.dt) }</h3>
                                <p>{info.weather[0].main} </p>
                                <img src={`${process.env.PUBLIC_URL}/${info.weather[0].main}.svg`} id="weather_img"/>
                                <p> { Math.floor(info.temp.max)}° /  { Math.floor(info.temp.min)}°</p>
                            </li>
                            )}
                        </ul>
                    :""}

                    {(aleart)?
                        <div id="aleart_part">
                            <div id="aleart_title">
                              <h2>Weather Alerts</h2>
                            </div>
                            <ul className="list_flex" id ="aleart_wrapper" className={(aleart_long)? "alert_long" :"alert_normal"} >
                                {aleart.map((info)=>
                                <li key={`${info.event}+${info.start}+${info.end}`} id="aleart_li_wrapper">
                                    <h3>{info.event}</h3>
                                    <p>{ get_day_hour_time(info.start, timezone) }</p>
                                    <p id="between">&nbsp;&nbsp;&nbsp;- </p>
                                    <p>{ get_day_hour_time(info.end, timezone) }</p>
                                </li>
                                )}
                            </ul>
                        </div>
                    :""}
                </div>        
            </section>

        {(day)?
            <div id="public_holiday_part">
                <div id="holiday_title">
                    <h3>Public Holiday in {states} in {year}</h3>
                </div>
                <ul className="list_flex" id="day_flex">
                    {day.map((info)=>
                    <li key={info.datum}>
                        <p id="holiday_name">{info.name}</p>
                        <p id="holiday_date">{holiday_edit(info.datum)}</p>
                    </li>
                    )}
                </ul>
            </div>
        :
        ""
        }

        {(init)?
        <div id="init"><p>You Can find public holidays in Geramny ( search with german city )</p></div>
        :
        ""
        }
        
        </div>
    )
}

export default Search;