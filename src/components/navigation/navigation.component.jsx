import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const NavigationStyles = makeStyles((theme) => ({
    link: {
        textDecoration: 'none',
        color: 'inherit',
        '&:hover': {
            textDecoration: 'none',
            color: 'inherit',
        }
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    root: {
        flexGrow: 1,
        backgroundColor: '#000',
        color: 'white',
        position: "sticky",
        top: 0,
    },
    title: {
        flexGrow: 1,
    },
}));

function NavigationComponent(props) {
    const classes = NavigationStyles(props);
    return (
        <AppBar position="static" className={classes.root}>
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    <img src="/images/olx_people_logo.svg" alt="OLX LOGO" style={{ height: '32px', width: '105px' }} />
                </Typography>
                <Link to='/' color="inherit" className={classes.link + " font-weight-bold"}>CONTINENTS</Link >
            </Toolbar>
        </AppBar>
    );
}

export default NavigationComponent;