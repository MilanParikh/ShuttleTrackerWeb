import React from 'react';
import {Marker} from 'google-maps-react';

export default function getBusses() {
  return fetch(`https://www.bu.edu/bumobile/rpc/bus/livebus.json.php`)
    .then((response) => response.json())
    .then((responsejson) => {
      const busdata = responsejson.ResultSet.Result;
      const busMarkers = busdata.map(bus => (
        <Marker
          key={bus.call_name}
          name={bus.call_name}
          title={bus.route}
          icon={{
            url: "/images/bus_icon.png",
            anchor: new this.props.google.maps.Point(32,32),
            scaledSize: new this.props.google.maps.Size(32,32)
          }}
          position={{lat: bus.lat, lng: bus.lng}} />
      ));
      this.setState({
        busMarkers: busMarkers
      });
    })
    .catch((error) => {
      console.error(error);
    })
}
