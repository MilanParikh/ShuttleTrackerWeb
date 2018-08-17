import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Map, InfoWindow, Marker,Polyline, GoogleApiWrapper} from 'google-maps-react';
import getRoute from '../utils/getRoute';
import getBusses from '../utils/getBusses';
import getStops from '../utils/getStops';

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
        this.getBusses = getBusses.bind(this);
        this.getStops = getStops.bind(this);
        this.state = {
          route: "caloop",
          routeMarkers: [],
          busMarkers: [],
        };
    }

    componentDidMount() {
      this.getBusses();
      this.getStops(this.state.route);
      var _this = this;
      setInterval(function() {
        _this.getBusses();
      }, 3000)
    }

    render() {
      return(
        <Map
          google={this.props.google}
          zoom={15}
          style={styles.maps}
          initialCenter={{
            lat: 42.350498,
            lng: -71.105400
          }}>
          <Polyline
            path={getRoute(this.state.route)}
            strokeColor="#FF0000"
            strokeOpacity={0.8}
            strokeWeight={2}
          />
          {this.state.busMarkers}
          {this.state.routeMarkers}
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
