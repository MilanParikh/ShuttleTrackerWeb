import React from 'react';

export default function getStopsData() {
  return fetch(`https://www.bu.edu/bumobile/rpc/bus/stops.json.php?service_id=caloop`)
    .then((response) => response.json())
    .then((responsejson) => {
      const stops = responsejson.ResultSet.Result;
      this.setState({
        stopsData: stops
      });
    })
    .catch((error) => {
      console.error(error);
    })
}
