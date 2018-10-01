export default function getStops(route) {
  switch(route) {
    case "caloop":
      return this.state.caloopRouteMarkers;
    case "night":
      return this.state.nightRouteMarkers;
    case "day":
      return this.state.dayRouteMarkers;
    case "fen":
      return this.state.fenRouteMarkers;
    default:
      return this.state.caloopRouteMarkers;
  }
}
