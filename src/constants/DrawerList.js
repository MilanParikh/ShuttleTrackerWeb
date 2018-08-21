import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {Link, withRouter } from 'react-router-dom';
import PinDropIcon from '@material-ui/icons/PinDrop'
import MapIcon from '@material-ui/icons/Map';
import FavoriteIcon from '@material-ui/icons/Favorite';

class DrawerList extends React.Component {

    render() {
        const { closeFunction, location } = this.props;

        return (
            <div>
                <ListItem disabled={location.pathname === '/ShuttleTrackerWeb'} onClick={closeFunction} button component={Link} to='/ShuttleTrackerWeb'>
                    <ListItemIcon>
                        <MapIcon/>
                    </ListItemIcon>
                    <ListItemText primary='Map'/>
                </ListItem>
                <ListItem disabled={location.pathname === '/ShuttleTrackerWeb/stops'} onClick={closeFunction} button component={Link} to='/ShuttleTrackerWeb/stops'>
                    <ListItemIcon>
                        <PinDropIcon/>
                    </ListItemIcon>
                    <ListItemText primary='Stops'/>
                </ListItem>
                <ListItem disabled={location.pathname === '/ShuttleTrackerWeb/favorites'} onClick={closeFunction} button component={Link} to='/ShuttleTrackerWeb/favorites'>
                    <ListItemIcon>
                        <FavoriteIcon/>
                    </ListItemIcon>
                    <ListItemText primary='Favorites'/>
                </ListItem>
            </div>
        );
    }
}

export default withRouter(DrawerList);
