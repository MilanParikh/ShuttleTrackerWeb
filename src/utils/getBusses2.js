import React from 'react';

export default function getAllStops2() {
  return fetch(`https://www.bu.edu/bumobile/rpc/bus/livebus.json.php`)
  .then((response) => response.json())
  .then((responsejson) => {
    const busData = responsejson.ResultSet.Result;
    var stopsArray = this.state.allstops;
    var busArray = [];
    busData.map(bus => {
      var businfo = {
        id: bus.call_name,
        route: bus.route,
        lat: bus.lat,
        long: bus.lng,
        estimates: bus.arrival_estimates
      };
      if(typeof bus.arrival_estimates != 'undefined'){
        bus.arrival_estimates.map(estimate => {
          var stopInd = stopsArray.findIndex(stop => stop.id == estimate.stop_id);
          if(typeof stopsArray[stopInd] != 'undefined') {
            stopsArray[stopInd].estimate = estimate;
          };
        });
      }
      busArray.push(businfo);
    });
    this.setState({
      allbusses: busArray,
      allstops2: stopsArray,
    });
  })
}
