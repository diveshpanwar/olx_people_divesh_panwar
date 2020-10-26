import { withStyles } from '@material-ui/core';
import React from 'react';

const ContinentsStyles = theme => ({
    title: {
        color: '#000',
        fontWeight: 'bolder',
        fontFamily: 'Open Sans',
        fontSize: '2rem'
    }
});

class ContinentsComponent extends React.Component {

    render() {
        const { classes } = this.props;
        return (
            <div className="row">
                <div className="col-12 text-center">
                    <h5 className={classes.title}>
                        CONTINENTS
                    </h5>
                </div>
            </div>
        );
    }
}

export default withStyles(ContinentsStyles)(ContinentsComponent);