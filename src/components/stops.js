import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import getStopsData from '../utils/getStopsData';
import getBusData from '../utils/getBusData';
import StopCard from '../constants/StopCard';
import Button from '@material-ui/core/Button';
import NavigationIcon from '@material-ui/icons/Navigation';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const styles = theme => ({
    root: {
      display: 'flex',
      flexGrow: 1,
      padding: theme.spacing.unit * 2,
      background: theme.palette.background.default,
      width: 'calc(100vw - 240)',
      [theme.breakpoints.up('md')]: {
          paddingLeft: 240 + theme.spacing.unit * 2
      },
    },
    grid: {
      //width: '100%'
    },
    fab: {
      position: 'fixed',
      right: theme.spacing.unit * 2,
      bottom: theme.spacing.unit * 2,
    },
    extendedIcon: {
      marginRight: theme.spacing.unit,
    },
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing.unit * 2,
    },
});

export class Stops extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          stopsData: [],
          busData: [],
          anchorEl: null,
          route: 'day',
          stop: '',
        };
        this.getStopsData = getStopsData.bind(this);
        this.getBusData = getBusData.bind(this);
    }

    componentDidMount() {
      this.getStopsData(this.state.route);
      this.getBusData();
    }

    handleClick = event => {
      this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = (value) => {
      if(typeof value === "string") {
        this.setState({
          anchorEl: null,
          route: value,
          stop: '',
        })
        this.getStopsData(value);
      } else {
        this.setState({
          anchorEl: null,
        });
      }

    };

    handleChange = name => event => {
      this.setState({ [name]: event.target.value });
    };

    render() {
      const { classes, theme } = this.props;
      const { anchorEl } = this.state;
      const StopCards = this.state.stopsData.map(stop => (
        (this.state.stop === ''|| this.state.stop === stop.transloc_stop_id + stop.stop_id) &&
        <StopCard
          key={stop.transloc_stop_id + stop.stop_id}
          stopData={stop}
          busData={this.state.busData}
          direction={stop.direction_id}
          title={stop.stop_name} />
      ))
      const stopOptions = this.state.stopsData.map(stop => (
        <option
          key={stop.transloc_stop_id + stop.stop_id}
          value={stop.transloc_stop_id + stop.stop_id}>
            {stop.stop_name}
        </option>
      ))
      return(
        <div className={classes.root}>
        <Grid className={classes.grid} container direction="row" wrap="wrap" spacing={16}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
              <FormControl className={classes.formControl}>
                <NativeSelect
                  className={classes.selectEmpty}
                  value={this.state.stop}
                  name="stop"
                  onChange={this.handleChange('stop')}
                >
                  <option value="" disabled>
                    All Stops
                  </option>
                  {stopOptions}
                </NativeSelect>
                <FormHelperText>Pick a Stop</FormHelperText>
              </FormControl>
              </CardContent>
            </Card>
          </Grid>
          {StopCards}
        </Grid>
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

Stops.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Stops);
