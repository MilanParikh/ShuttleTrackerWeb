import React, {Component} from 'react';
import './App.css';
import DrawerList from "./constants/DrawerList";
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Route } from 'react-router-dom';
import Home from './components/main';
import Stops from './components/stops';

const drawerWidth = 240;

const styles = theme => ({
    root: {
        flexGrow: 1,
        zIndex: 1,
        position: 'absolute',
        display: 'flex',
    },
    appBar: {
        position: 'fixed',
        width: '100%',
        zIndex: theme.zIndex.drawer + 1,
    },
    navIconHide: {
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
        marginLeft: -12,
        marginRight: 20,
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
        [theme.breakpoints.up('md')]: {
            position: 'absolute',
        },
    },
    rightIcon: {
      marginLeft: 'auto',
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        width: 'calc(100vw)'
    },
});

class App extends Component {
    state = {
        mobileOpen: false,
    };

    handleDrawerToggle = () => {
        this.setState({ mobileOpen: !this.state.mobileOpen});
    };

    handleDrawerClose = () => {
        this.setState({mobileOpen: false});
    };

    componentDidMount() {
    }

    render() {
        const { classes, theme } = this.props;
        const drawer = (
            <div>
                <div className={classes.toolbar} />
                <Divider/>
                <List><DrawerList closeFunction={this.handleDrawerClose.bind(this)}/></List>
            </div>
        );

        return (
            <div className={classes.root}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.handleDrawerToggle}
                            className={classes.navIconHide}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="title" color="inherit" noWrap>
                            BU Shuttle Tracker
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Hidden mdUp>
                    <Drawer
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={this.state.mobileOpen}
                        onClose={this.handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden smDown implementation="css">
                    <Drawer
                        variant="permanent"
                        open
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Route exact path='/' render={() => <Home/>}/>
                    <Route exact path='/stops' render={() => <Stops/>}/>
                </main>
            </div>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(App);
