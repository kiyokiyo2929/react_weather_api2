import React, {useState} from 'react';
import axios from 'axios';
// import ReactMapGl, {Marker, Popup} from 'react-map-gl';
// import 'mapbox-gl/dist/mapbox-gl.css';

const token = process.env.REACT_APP_MAP_KEY;

const Search = ()=>{
    // const [viewport, setViewport] = useState({
    //     width: '42.5vw',
    //     height:'25vh',
    //     latitude:52.519334503212846,
    //     longitude:13.415270749959939, 
    //     zoom:10
    // });


    return (
        <div> hello
                {token}
                {/* <ReactMapGl
                {...viewport}
                onViewportChange={nextViewport => setViewport(nextViewport)}
                mapboxApiAccessToken={token} 
                ></ReactMapGl> */}
        </div>
    )
}

export default Search;

