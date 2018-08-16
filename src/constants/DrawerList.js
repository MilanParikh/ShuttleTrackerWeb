import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {Link, withRouter } from 'react-router-dom';
import RestaurantIcon from '@material-ui/icons/Restaurant'
import MapIcon from '@material-ui/icons/Map';
import HomeIcon from '@material-ui/icons/Home';
import LocalActivityIcon from '@material-ui/icons/LocalActivity';

class DrawerList extends React.Component {

    render() {
        const { closeFunction, location } = this.props;

        return (
            <div>
                <ListItem disabled={location.pathname === '/'} onClick={closeFunction} button component={Link} to='/'>
                    <ListItemIcon>
                        <MapIcon/>
                    </ListItemIcon>
                    <ListItemText primary='Home'/>
                </ListItem>
                <ListItem disabled={location.pathname === '/favorites'} onClick={closeFunction} button component={Link} to='/favorites'>
                    <ListItemIcon>
                        <RestaurantIcon/>
                    </ListItemIcon>
                    <ListItemText primary='Favorites'/>
                </ListItem>
                <ListItem disabled={location.pathname === '/other'} onClick={closeFunction} button component={Link} to='/other'>
                    <ListItemIcon>
                        <LocalActivityIcon/>
                    </ListItemIcon>
                    <ListItemText primary='Other'/>
                </ListItem>
            </div>
        );
    }
}

export default withRouter(DrawerList);
