export default function getEstimates(stop, busData) {
  const stopID = stop.transloc_stop_id;
  busData.map((bus) => {
    if('arrival_estimates' in bus) {
      bus.arrival_estimates.map((estimate) => {
        if(estimate.stop_id === stopID) {
          var currentEstimate = new Date(estimate.arrival_at);
          var storedEstimate = this.state.newestEstimate;
          if (storedEstimate == null || storedEstimate < new Date() || storedEstimate > currentEstimate){
            this.setState({
              newestEstimate: currentEstimate
            });
          }
        }
        return null;
      })
    }
    return null;
  })
}
