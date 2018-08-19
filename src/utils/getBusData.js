export default function getBusData() {
  return fetch(`https://www.bu.edu/bumobile/rpc/bus/livebus.json.php`)
    .then((response) => response.json())
    .then((responsejson) => {
      const livebus = responsejson.ResultSet.Result;
      this.setState({
        busData: livebus
      });
    })
    .catch((error) => {
      console.error(error);
    })
}
