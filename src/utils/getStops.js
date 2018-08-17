import React from 'react';
import {Map, InfoWindow, Marker,Polyline, GoogleApiWrapper} from 'google-maps-react';

export default function getStops(route) {
  var service_id = '';
  switch(route) {
    case "caloop":
      service_id = 'caloop';
      break;
    case "night":
      service_id = 'lnw1';
      break;
    case "day":
      service_id = 'fall';
      break;
  }
  return fetch(`https://www.bu.edu/bumobile/rpc/bus/stops.json.php?service_id=${service_id}`)
    .then((response) => response.json())
    .then((responsejson) => {
      const stopData = responsejson.ResultSet.Result;
      const routeMarkers = stopData.map(stop => (
        <Marker
          key={stop.stop_id}
          name={stop.stop_name}
          title={stop.stop_desc}
          icon={{
            url: "/images/bus_stop_icon.png",
            anchor: new this.props.google.maps.Point(16,16),
            scaledSize: new this.props.google.maps.Size(16,16)
          }}
          position={{lat: stop.stop_lat, lng: stop.stop_lon}} />
      ))
      this.setState({
        routeMarkers: routeMarkers,
      })
    })
    .catch((error) => {
      console.error(error);
    })
}
