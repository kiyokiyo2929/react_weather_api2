--------------------------
React (react hooks) + API
--------------------------

feiertage-api (Public holiday data in Germany)
https://feiertage-api.de/

openweathermap (Weather forecast data)
https://openweathermap.org/

mapbox (Map data)
https://www.mapbox.com/

=================================================================================================
If you you this code, you need token from openweathermap and mapbox.
On ".env file", you add "REACT_APP_API_KEY" for openweathermap and "REACT_APP_MAP_KEY" for mapbox.
=================================================================================================

((data process))

input city name (1) ->  (openweathermap) (2) -> Geo and Lat and Lon Data (3) -> (openweathermap) with Lat and Lon data (4) -> Weather forecast data (5)

                                                                 -> (feiertage-api) with Geo data  (4) ->  Public holiday data, but only german city(5)

                                                                 
                                                                 -> (mapbox) with Lat and Lon data   (4)  -> Map data (5)
                                                                 

============================================================================================================================
(example display1)
![weather_holiday_01](https://user-images.githubusercontent.com/59493506/155118822-83610e52-12b2-4922-b6c7-4517ae14d48e.jpg)


(example display2)
![weather_holiday_02](https://user-images.githubusercontent.com/59493506/155118856-5d6dcb1d-e44d-4e95-8f8f-513a01817231.jpg)


(example display3)
![weather_holiday_03](https://user-images.githubusercontent.com/59493506/155118887-65ff4ade-4d95-4bd3-ab23-9482451c21eb.jpg)


(top)
![weather_holiday_04](https://user-images.githubusercontent.com/59493506/155118909-2cc4c0f6-4a32-4a14-a805-94f5e0c5a08e.jpg)
