import React from 'react';
import {Map, InfoWindow, Marker,Polyline, GoogleApiWrapper} from 'google-maps-react';

export default async function getAllStops() {
  const service_ids = ['caloop', 'lnw1', 'fall'];
  const routes = ['caloop', 'night', 'day'];
  for (var i = 0; i < service_ids.length; i++) {
    const response = await fetch(`https://www.bu.edu/bumobile/rpc/bus/stops.json.php?service_id=${service_ids[i]}`)
    const responsejson = await response.json();
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
      [(routes[i]) + 'RouteMarkers']: routeMarkers,
    })
  }
}
