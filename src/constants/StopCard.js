import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames'
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Popover from '@material-ui/core/Popover';

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
    state = {

     };

    render() {
        const { classes } = this.props;
        let { title } = this.props;
        return (
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <Card className={classes.card}>
                    <CardHeader className={classes.header}
                        title={title}
                    />
                </Card>
            </Grid>
        );
    }
}

StopCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StopCard);
