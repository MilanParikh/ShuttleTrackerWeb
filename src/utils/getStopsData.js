export default function getStopsData(route) {
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
    default:
      service_id = 'caloop';
      break;
  }
  return fetch(`https://www.bu.edu/bumobile/rpc/bus/stops.json.php?service_id=${service_id}`)
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
