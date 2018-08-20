import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import getEstimates from '../utils/getEstimates';
var moment = require('moment');

const styles = theme => ({
    card: {
        display: 'flex',
        height: '100%',
        flexDirection: 'column',
    },
    header: {

    },
});

class StopCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          newestEstimate: null,
          stopData: this.props.stopData,
          busData: this.props.busData,
          time: 'Loading...'
        };
        this.getEstimates = getEstimates.bind(this);
        this.intervalID = null;
        this.timeIntervalID = null;
    }

    static getDerivedStateFromProps(nextProps, prevState) {
      if(nextProps.busData!==prevState.busData){
        return { busData: nextProps.busData }
      }else return null
    }

    componentDidUpdate(prevProps, prevState) {

    }

    componentDidMount() {
       this.getEstimates(this.props.stopData, this.props.busData);
       var _this = this;
       this.intervalID = setInterval(function() {
         _this.getEstimates(_this.props.stopData, _this.props.busData);
       }, 5000);
       this.timeIntervalID = setInterval(function() {
         _this.convertTime()
       }, 5000)
     }

     componentWillUnmount() {
       clearInterval(this.intervalID);
     }

     convertTime() {
       if(this.state.newestEstimate == null) {
         this.setState({
           time: "No Estimate Available"
         })
       } else {
         const estimate = moment(this.state.newestEstimate);
         const now = moment();
         const timeString = "Arrives " + estimate.fromNow();
         this.setState({
           time: timeString
         })
       }
     }

    render() {
        const { classes } = this.props;
        let { title } = this.props;
        return (
            <Grid item xs={12} sm={6} lg={4}>
                <Card className={classes.card}>
                    <CardHeader className={classes.header}
                        title={title}
                    />
                    <CardContent>
                    <Typography>
                      {this.state.time}
                    </Typography>
                    </CardContent>
                </Card>
            </Grid>
        );
    }
}

StopCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StopCard);
