import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import { makeStyles } from '@material-ui/core';

const FooterStyles = makeStyles({
    root: {
        backgroundColor: '#000',
        color:  '#fff',
        marginLeft: '0px!important',
        marginRight: '0px',
        position: 'fixed',
        bottom: 0,
        width: '100%',
    },
    row: {
        marginLeft: '0!important',
        marginRight: '0!important',
    },
    typo1: {
        fontSize: "1rem",
        fontFamily: "Open Sans",
        marginTop: "20px"
    },
    typo2: {
        fontSize: "0.8rem",
        fontFamily: "Open Sans",
        fontStyle: "italic",
        marginTop: "10px",
        marginBottom: "10px"
    },
    typo3: {
        fontSize: "0.8rem",
        fontFamily: "Open Sans",
        fontStyle: "italic",
        marginTop: "10px",
        marginBottom: "20px"
    },
    a: {
        color: "inherit",
        '&:hover': {
            color: "inherit"
        },
        '&:visited': {
            color: "inherit"
        }
    },
});

/**
 * Footer Component
 * @param {*} props 
 */
function FooterComponent(props) {
    const classes = FooterStyles(props);
    return (
        <div className={classes.root + " row mt-3"} style={{marginLeft: 0, marginRight: 0}}>
            <Paper elevation={4} variant="elevation" className={classes.root + " col-12 text-center"}>
                <Typography variant="h5" className={classes.typo1}>
                    &copy; Divesh Panwar {String.fromCodePoint('0x1F525')}
                </Typography>
                <Typography variant="h5" className={classes.typo2}>
                    {String.fromCodePoint('0x1F496')} CREATED WITH LOVE {String.fromCodePoint('0x1F496')}
                </Typography>
                <Typography className={classes.typo3}>
                    <a className={classes.a} target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/divesh-panwar-44272685/"><LinkedInIcon /></a>
                    &nbsp;
                    <a className={classes.a} target="_blank" rel="noopener noreferrer" href="https://github.com/diveshpanwar"><GitHubIcon /></a>
                    &nbsp;
                    <a className={classes.a} target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/ahamMrityuAsmi/"><InstagramIcon /></a>
                    &nbsp;
                    <a className={classes.a} target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/aham_mrityu_asmi/"><FacebookIcon /></a>
                </Typography>
            </Paper>
        </div>
    );
}

export default FooterComponent;