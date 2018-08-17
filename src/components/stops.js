import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        display: 'flex',
    },
});

export class Stops extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
      const { classes, theme } = this.props;
      return(
        <div className={classes.root}>
          Stops page will go here
        </div>
      )
    }
}

Stops.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Stops);
