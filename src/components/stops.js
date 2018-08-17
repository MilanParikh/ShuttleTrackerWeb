import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import getStopsData from '../utils/getStopsData';
import getBusData from '../utils/getBusData';
import StopCard from '../constants/StopCard';

const styles = theme => ({
    root: {
      flexGrow: 1,
      padding: theme.spacing.unit * 2,
      background: theme.palette.background.default
    },
    card: {
      margin: theme.spacing.unit * 2,
      width: '100%',
    }
});

export class Stops extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          stopsData: [],
          busData: [],
        };
        this.getStopsData = getStopsData.bind(this);
        this.getBusData = getBusData.bind(this);
    }

    componentDidMount() {
      this.getStopsData();
      this.getBusData();
    }

    render() {
      const { classes, theme } = this.props;
      const StopCards = this.state.stopsData.map(stop => (
        (this.state.busData.length > 0) &&
        <StopCard
          key={stop.transloc_stop_id}
          data={this.state.busData}
          title={stop.stop_name} />
      ))
      return(
        <div className={classes.root}>
        <Grid container direction="row" wrap="wrap" spacing={16}>
          {StopCards}
        </Grid>
        </div>
      )
    }
}

Stops.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Stops);
