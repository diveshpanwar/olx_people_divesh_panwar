import React from 'react';
import { Fab, makeStyles } from '@material-ui/core';
import LoaderComponent from '../../common/loader.component';
import ErrorComponent from '../../common/error.common';
import { useQuery, gql } from '@apollo/client';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import VisibilityIcon from '@material-ui/icons//Visibility';
import BootstrapToolTip from '../../common/bootstraptooltip.common';
import { useHistory } from "react-router-dom";


const ContinentsStyles = makeStyles({
    continentDivs: {
        maxWidth: '32%important',
    },
    hr: {
        border: '1px solid #000',
        background: 'black',
        width: '75px'
    },
    title: {
        color: '#000',
        fontWeight: 'bolder',
        fontFamily: 'Open Sans',
        fontSize: '1.4rem',
        letterSpacing: '0.3rem',
    },
    viewButton: {
        color: 'white',
        backgroundColor: '#000',
        outline: 'none!important',
    }
});

const GetContinents = gql`
query {
    continents {
        code
        name
    }
}
`;

/**
 * Continents Component to render the Continents
 */
function ContinentsComponent() {
    const history = useHistory();
    const { loading, error, data } = useQuery(GetContinents);
    const classes = ContinentsStyles();

    /**
     * Open details component for a continent
     * @param {*} code 
     */
    const goToDetails = (code) => {
        history.push(`/continent/${code}`);
    }

    /**
     * Render continents
     * @param {*} continents 
     */
    const renderContinents = (continents) => {
        const continentsArray = [];
        continents.forEach(continent => {
            continentsArray.push(
                <div className="col-10 col-md-4 ml-auto mr-auto" key={continent.code}>
                    <Card className={"ml-auto mr-auto mt-3 mb-3"} elevation={4} style={{ margin: "5px" }}>
                        <CardContent style={{ paddingBottom: "5px" }}>
                            <h6 className="text-center mt-2 font-weight-bold" style={{ fontSize: '1.2rem', letterSpacing: '3px' }}>
                                {continent.name.toUpperCase()}
                            </h6>
                            <h6 className="text-center mt-2" style={{ fontSize: '0.9rem' }}>
                                CODE : {continent.code}
                            </h6>
                        </CardContent>
                        <CardActions className="text-center mb-3" style={{ display: 'block' }}>
                            <BootstrapToolTip title="View Details">
                                <Fab className={classes.viewButton} size="small" onClick={() => { goToDetails(continent.code) }}>
                                    <VisibilityIcon />
                                </Fab>
                            </BootstrapToolTip>
                        </CardActions>
                    </Card>
                </div>
            );
        });

        return continentsArray;
    }

    // if Data is received
    if (data) {
        if (data.continents && data.continents.length > 0) {
            return (
                <div>
                    <div className="row">
                        <div className="col-12 text-center mt-3">
                            <h5 className={classes.title}>
                                CONTINENTS
                                </h5>
                            <hr className={classes.hr} />
                        </div>
                        {renderContinents(data.continents)}
                    </div>
                    <div style={{ height: "150px" }}></div>
                </div>

            );
        } else {
            <div className="row">
                <div className="col-12 text-center mt-3">
                    <h5 className={classes.title}>
                        CONTINENTS
                    </h5>
                    <hr className={classes.hr} />
                </div>
                <div className="col-12 text-center mt-3">
                    <h5 className="text-center">
                        NO CONTINENTS FOUND.
                    </h5>
                </div>
            </div>
        }
    }

    // if data is still loading
    if (loading) {
        return <LoaderComponent text="LOADING CONTINENTS" />
    }

    // If an error occured
    if (error) {
        return (
            <ErrorComponent />
        );
    }
}

export default ContinentsComponent;