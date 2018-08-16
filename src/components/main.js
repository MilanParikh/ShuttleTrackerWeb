import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Map, InfoWindow, Marker,Polyline, GoogleApiWrapper} from 'google-maps-react';
import { commRouteCoords } from '../constants/coords'

const styles = theme => ({
    root: {
        display: 'flex',
    },
    maps: {
      width: '100%',
      height: '100%'
    }
});

export class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          commRouteData: {},
          commRouteMarkers: [],
        };
    }

    componentDidMount() {
      this.getCommRoute();
    }

    getCommRoute() {
      return fetch(`https://www.bu.edu/bumobile/rpc/bus/stops.json.php?service_id=caloop`)
        .then((response) => response.json())
        .then((responsejson) => {
          this.setState({
            commRouteData: responsejson
          })
          const routeMarkers = this.state.commRouteData.ResultSet.Result.map(stop => (
            <Marker
              key={stop.stop_id}
              name={stop.stop_name}
              title={stop.stop_desc}
              position={{lat: stop.stop_lat, lng: stop.stop_lon}} />
          ))
          this.setState({
            commRouteMarkers: routeMarkers,
          })
        })
        .catch((error) => {
          console.error(error);
        })
    }

    render() {
      const busarray = this.props.livebus.ResultSet.Result;
      const busMarkers = busarray.map(bus => (
        <Marker
          key={bus.call_name}
          name={bus.call_name}
          title={bus.route}
          icon={{
            url: "/images/bus_icon.svg",
            anchor: new this.props.google.maps.Point(32,32),
            scaledSize: new this.props.google.maps.Size(32,32)
          }}
          position={{lat: bus.lat, lng: bus.lng}} />
      ));
      return(
        <Map
          google={this.props.google}
          zoom={14}
          style={styles.maps}
          initialCenter={{
            lat: 42.350498,
            lng: -71.105400
          }}>
          <Polyline
            path={commRouteCoords}
            strokeColor="#FF0000"
            strokeOpacity={0.8}
            strokeWeight={2}
          />
        {busMarkers}
        {this.state.commRouteMarkers}
        </Map>
      )
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default GoogleApiWrapper({
  apiKey: ("AIzaSyBQF9HMfqUvDciH8o6gMIv9xCFVNbsl0Y0")
})(withStyles(styles)(Home))
// export default withStyles(styles)(Home);
