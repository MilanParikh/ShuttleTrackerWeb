import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import getEstimates from '../utils/getEstimates';

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
        };
        this.getEstimates = getEstimates.bind(this);
        this.intervalID = null
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
       }, 5000)
     }

     componentWillUnmount() {
       clearInterval(this.intervalID);
     }

     convertTime(time) {
       //TODO: Need to fully write this... still has to get difference from estimated arrival to now and count down
       var estimate = new Date(time);
       var timeString = String(estimate.getHours() + ':' + estimate.getMinutes() + ':' + estimate.getSeconds());
       return timeString
     }

    render() {
        const { classes } = this.props;
        let { title } = this.props;
        const estimate = String(this.state.newestEstimate);
        return (
            <Grid item xs={12} sm={6} lg={4}>
                <Card className={classes.card}>
                    <CardHeader className={classes.header}
                        title={title}
                    />
                    <CardContent>
                    <Typography>
                      {this.state.newestEstimate ? estimate : "No estimate available"}
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
