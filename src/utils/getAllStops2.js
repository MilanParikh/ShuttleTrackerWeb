//Get all stops
//Get all current bus positions and estimates
//Map estimates to stops in both directions

import React from 'react';

export default async function getAllStops2() {
  const stopsresponse = await fetch(`https://www.bu.edu/bumobile/rpc/bus/stops.json.php?service_id=fall`)
  const stopsresponsejson = await stopsresponse.json();
  const stopData = stopsresponsejson.ResultSet.Result;
  var routeids = [];
  var stopsArray = [];
  stopData.map(stop => {
    if(!routeids.includes(stop.transloc_stop_id)){
      routeids.push(stop.transloc_stop_id);
      var stop = {
        id: stop.transloc_stop_id,
        name: stop.stop_name,
        desc: stop.stop_desc,
        lat: stop.stop_lat,
        long: stop.stop_lon,
        estimate: null
      }
      stopsArray.push(stop);
    }
  });
  this.setState({
    allstops: stopsArray,
  });
}
