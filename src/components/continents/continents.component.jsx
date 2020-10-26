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
    },
    continentDivs: {
        maxWidth: '32%important',
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

function ContinentsComponent() {
    const history = useHistory();
    const { loading, error, data } = useQuery(GetContinents);
    const classes = ContinentsStyles();

    const goToDetails = (code) => {
        history.push(`/continent/${code}`);
    }

    const renderContinents = (continents) => {
        const continentsArray = [];
        continents.forEach(continent => {
            continentsArray.push(
                <div className="col-10 col-md-4"  key={continent.code}>
                    <Card className={"ml-auto mr-auto mt-1 mb-1"} elevation={4} style={{ margin: "5px" }}>
                        <CardContent>
                            <h6 className="text-center mt-2 font-weight-bold">
                                {continent.name.toUpperCase()}
                            </h6>
                            <h6 className="text-center mt-2" style={{ fontSize: '0.8rem' }}>
                                CODE : {continent.code}
                            </h6>
                        </CardContent>
                        <CardActions className="text-center mb-3" style={{ display: 'block' }}>
                            <BootstrapToolTip title="View Details">
                                <Fab className={classes.viewButton} size="small" onClick= {() => {goToDetails(continent.code)}}>
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
                    <div style={{ height: "200px" }}></div>
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

    if (loading) {
        return <LoaderComponent text="LOADING CONTINENTS" />
    }

    if (error) {
        return (
            <ErrorComponent/>
        );
    }
}

export default ContinentsComponent;