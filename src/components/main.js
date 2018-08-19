import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Map, Polyline, GoogleApiWrapper} from 'google-maps-react';
import getRoute from '../utils/getRoute';
import getBusses from '../utils/getBusses';
import getStops from '../utils/getStops';
import getAllStops from '../utils/getAllStops';
import Button from '@material-ui/core/Button';
import NavigationIcon from '@material-ui/icons/Navigation';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
    root: {
        display: 'flex',
        flexGrow: 1,
        height: '100vh',
    },
    maps: {
      //width: '100%',
      //height: '100%'
    },
    fab: {
      position: 'fixed',
      right: theme.spacing.unit * 2,
      bottom: theme.spacing.unit * 2,
    },
    extendedIcon: {
      marginRight: theme.spacing.unit,
    },
});

export class Home extends React.Component {
    constructor(props) {
        super(props);
        this.getBusses = getBusses.bind(this);
        this.getStops = getStops.bind(this);
        this.getAllStops = getAllStops.bind(this);
        this.state = {
          route: "day",
          routeMarkers: [],
          busMarkers: [],
          anchorEl: null,
        };
        this.intervalID = null;
    }

    componentDidMount() {
      this.getBusses();
      this.getAllStops();
      var _this = this;
      this.intervalID = setInterval(function() {
        _this.getBusses();
      }, 5000)
    }

    componentWillUnmount() {
      clearInterval(this.intervalID);
    }

    handleClick = event => {
      this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = (value) => {
      if(typeof value === "string") {
        this.setState({
          anchorEl: null,
          route: value
        })
      } else {
        this.setState({
          anchorEl: null,
        });
      }

    };

    render() {
      const { classes, theme } = this.props;
      const { anchorEl } = this.state;
      return(
        <div className={classes.root}>
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
            {this.getStops(this.state.route)}
          </Map>
          <Button className={classes.fab} variant="extendedFab" aria-label="Route" color="primary" onClick={this.handleClick}>
            <NavigationIcon className={classes.extendedIcon} />
              Route
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={this.handleClose}>
            <MenuItem onClick={this.handleClose.bind(this, 'caloop')}>Comm Ave Loop</MenuItem>
            <MenuItem onClick={this.handleClose.bind(this, 'night')}>Night/Weekend</MenuItem>
            <MenuItem onClick={this.handleClose.bind(this, 'day')}>Weekday</MenuItem>
          </Menu>
        </div>
      )
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default GoogleApiWrapper({
  apiKey: `${process.env.REACT_APP_GMAPS_API_KEY}`
})(withStyles(styles)(Home))
