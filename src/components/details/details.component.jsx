import React from 'react';
import LoaderComponent from '../../common/loader.component';
import ErrorComponent from '../../common/error.common';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core';
import { useQuery, gql } from '@apollo/client';

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

/**
 * Details Component: To render the component details
 * @param {*} props 
 */
function DetailsComponent(props) {
    const classes = DetailStyles();
    const [expanded, setExpanded] = React.useState(false);
    const code = props.match.params.continent;

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

    /**
     * Toggle the Accordions
     * @param {*} panel 
     */
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    /**
     * Render the country Acordions
     * @param {*} countries 
     */
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

    /**
     * Render State Chips of a country
     * @param {*} country 
     */
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

    /**
     * Render Language Chips of a country
     * @param {*} country 
     */
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
    // If Data is received
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
    // If the content is still loading
    if (loading) {
        return <LoaderComponent text="LOADING DETAILS" />
    }
    // If an error occured
    if (error) {
        return (
            <ErrorComponent />
        );
    }

}

export default DetailsComponent;