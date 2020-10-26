import { withStyles } from '@material-ui/core';
import React from 'react';
import { getContinents } from '../../services/continent.service';
import LoaderComponent from '../../common/loader.component';

const ContinentsStyles = theme => ({
    title: {
        color: '#000',
        fontWeight: 'bolder',
        fontFamily: 'Open Sans',
        fontSize: '1.4rem',
        letterSpacing: '0.3rem',
    },
    hr: {
        border: '1px solid #000',
        background: 'black',
        width: '75px'
    }
});

class ContinentsComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { continents: {}, loading: true, error: true }
    }

    componentDidMount() {
        console.log('The component is mounted');
        getContinents().then(res => {
            console.log(res.data.data.continents);
            this.setState({ continents: res.data.data.continents, loading: false, error: false });
        }, err => {
            console.log(err);
            this.setState({ loading: false, error: true });
        })
    }

    render() {
        const { classes } = this.props;
        if (!this.state.loading && !this.state.error) {
            return (
                <div className="row">
                    <div className="col-12 text-center mt-3">
                        <h5 className={classes.title}>
                            CONTINENTS
                        </h5>
                        <hr className={classes.hr} />
                    </div>
                </div>
            );
        }
        else if (this.state.loading) {
            return <LoaderComponent text="LOADING CONTINENTS" />
        }
        else {
            return (
                <div className="text-danger">
                    <h6 className="text-center">
                        Something Wrong Happened.
                    </h6>
                </div>
            );
        }
    }
}

export default withStyles(ContinentsStyles)(ContinentsComponent);