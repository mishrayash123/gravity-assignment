import React from 'react';
import logo from '../images/logo.jpg'
import Map from './Map'
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import Distance from './Distance';
import Source from '../images/Source.jpg'
import Destination from '../images/Destination.png'
import Stop from '../images/Stop.png'
import { useState,useRef } from 'react';

function Homepage() {

const [visible,setVisible]=useState(false);
const [direction, setdirection] = useState("");
const [waypoint, setWaypoint] = useState([{ location: "" }]);
const [distance, setDistance] = useState("");

const originref = useRef();
  const stopref = useRef();
  const destinationref = useRef();


  async function calculate() {
    if (originref.current.value === "" || destinationref.current.value === "") {
      return;
    }
    
        // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    if (waypoint[0].location != "") {
      var results = await directionsService.route({
        origin: originref.current.value,
        destination: destinationref.current.value,
        waypoints: waypoint,

        // eslint-disable-next-line no-undef
        travelMode: google.maps.TravelMode.DRIVING,
      });
      
    }
    else {
      var results = await directionsService.route({
        origin: originref.current.value,
        destination: destinationref.current.value,

        // eslint-disable-next-line no-undef
        travelMode: google.maps.TravelMode.DRIVING,
      });
    }
    setdirection(results);
    setDistance(results.routes[0].legs[0].distance.text);

    // For displaying DISTANCE text
    setVisible(true);

  
  
  
  
  
  }



   const {isLoaded} = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAzKIHyFNbBxYXjDxIhv_sp57Bxbi37v0g",
    libraries: ["places"],
  });
  if (!isLoaded) {
    return <h1>Loading...</h1>;

   }
  return (
    <>
    <div className="main">
      <div className="main-logo">
        <img src ={logo} alt="graviti"></img>
      </div>
      <div className="main-body-col">
        <div className="main-body">
        <div className="main-head">
        <p>Let's calculate <strong>distance</strong> from Google maps</p>
        </div>
        <div className="main-body-content">
          <div className="main-form">
              <div className="input-field">
              <label>Origin</label>
              <img src={Source} className="input-img"></img>
            <Autocomplete>
            <input  className="input-box"  ref={originref}>
</input>
            </Autocomplete>
            </div>
            <div className="input-field">
            <label>Stop</label>
            <img src={Stop} className="input-img"></img>
            <Autocomplete>
            <input  className="input-box" ref={stopref} inputName="location"   setInput={setWaypoint}
                    input={waypoint}></input>
            </Autocomplete> 
            </div>
            <div className="input-field">
            <label>Destination</label>
            <img src={Destination} className="input-img"></img>
            <Autocomplete>
            <input  className="input-box" ref={destinationref}></input>
            </Autocomplete>
            </div> 
            <div className="main-btn">
          <button className="input-box btn" onclick={calculate}>Calculate</button>
           </div>
          </div>
          <div className="map">
            <Map direction={direction}></Map>
          </div>
        </div>
      </div>
       {visible ? ( 
          <Distance
            distance={distance}
            origin={originref.current.value}
            destination={destinationref.current.value}
          />
       ) : null} 
      </div>
    </div>
  </>
  );
}

export default Homepage;
