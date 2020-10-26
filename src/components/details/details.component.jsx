import React from 'react';
import { makeStyles } from '@material-ui/core';
import LoaderComponent from '../../common/loader.component';
import ErrorComponent from '../../common/error.common';
import { useQuery, gql } from '@apollo/client';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';

const DetailStyles = makeStyles({
    capital: {
        position: 'absolute',
        right: '10%',
        fontWeight: 'normal',
        fontStyle: 'italic'
    },
    chip: {
        fontSize: '0.8rem',
        margin: '3px',
        fontWeight: 'bold',
        fontStyle: 'italic'
    },
    heading: {
        fontSize: 'rem',
        fontWeight: 'bold',
        fontFamily: 'Open Sans'
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
});

function DetailsComponent(props) {
    const classes = DetailStyles();
    const [expanded, setExpanded] = React.useState(false);
    const code = props.match.params.continent;


    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const { loading, error, data } = useQuery(gql`
    {
        continent(code: "${code}") {
          name,
          countries {
            capital
            name
            languages{name}
            states {
              name
            }
          }
        }
      }
    `);

    const renderCountries = (countries) => {
        const countriesArray = [];
        countries.forEach(country => {
            countriesArray.push(
                <Accordion key={country.name} expanded={expanded === country.name} onChange={handleChange(country.name)}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={classes.heading}>
                            {country.name}
                            <span className={classes.capital}>
                                {country.capital}
                            </span>
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails style={{ display: "block" }}>
                        <h6 className="text-center" style={{ fontSize: "1.1rem", fontWeight: "bold" }}>
                            STATES
                        </h6>

                        {country.states && country.states.length > 0 && (
                            renderStates(country)
                        )}

                        {(!country.states || country.states.length === 0) && (
                            <h6 className="text-center" style={{ fontSize: "0.9rem" }}>
                                NO STATES FOUND
                            </h6>
                        )}
                        <hr className={classes.hr} />
                        <h6 className="text-center" style={{ fontSize: "1.1rem", fontWeight: "bold" }}>
                            LANGUAGES
                        </h6>
                        {country.languages && country.languages.length > 0 && (
                            renderLanguages(country)
                        )}

                        {(!country.languages || country.languages.length === 0) && (
                            <h6 className="text-center" style={{ fontSize: "0.9rem" }}>
                                NO LANGUAGES FOUND
                            </h6>
                        )}
                        <Typography>

                        </Typography>
                    </AccordionDetails>
                </Accordion>
            );
        });

        return countriesArray;
    }

    const renderStates = (country) => {
        const statesArray = [];

        if (country.states) {
            country.states.forEach(state => {
                statesArray.push(
                    <Chip size="medium" label=
                        {
                            state.name
                        } key={state.name + Math.floor(Math.random() * 100).toString()} variant="outlined" className={classes.chip} />
                );
            })
        }
        return statesArray;
    }


    const renderLanguages = (country) => {
        const languagesArray = [];

        if (country.languages) {
            country.languages.forEach(language => {
                languagesArray.push(
                    <Chip size="medium" label=
                        {
                            language.name
                        } key={language.name + Math.floor(Math.random() * 100).toString()} variant="outlined" className={classes.chip} />
                );
            })
        }
        return languagesArray;
    }
    if (data) {
        if (data.continent) {
            return (
                <div className="col-11 ml-auto mr-auto mt-3 ">
                    <Card elevation={4}>
                        <CardContent>
                            <h5 className={classes.title + " text-center mt-3"}>
                                COUNTRIES IN {data.continent.name.toUpperCase()}
                                <hr className={classes.hr} />
                            </h5>
                            {renderCountries(data.continent.countries)}
                        </CardContent>
                    </Card>
                    <div style={{ height: "150px" }}></div>
                </div>
            );
        }
        else {
            return (
                <div className="row">
                    <div className="col-12 text-center mt-3">
                        <h5 className="text-center mt-3">
                            DETAILS NOT FOUND.
                        </h5>
                    </div>
                </div>
            );
        }
    }

    if (loading) {
        return <LoaderComponent text="LOADING DETAILS" />
    }

    if (error) {
        return (
            <ErrorComponent />
        );
    }

}

export default DetailsComponent;