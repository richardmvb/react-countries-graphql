import React, { useEffect, useState, Fragment } from 'react'
import { makeStyles, Container, Typography, Grid, Button, IconButton, Tooltip } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { useApolloClient } from '@apollo/client'
import { GET_COUNTRIES } from '../countries.graphql'
import InfoCard from '../../../components/InfoCard'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'

const useStyles = makeStyles(theme => ({
    countryHeader: {
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(8, 0, 2),
    },
    flag: {
        padding: theme.spacing(2),
        height: 150
    },
    editButton: {
        margin: 10,
        padding: 5
    },
    cardGrid: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    }
}))

const CountryDetail = (props) => {
    const classes = useStyles()
    const apolloClient = useApolloClient()
    const [country, setCountry] = useState()
    const [viewport, setViewport] = useState({    
        width: '100%',
        height: '600px',
        zoom: 4
    })
    const [markers, setMarkers] = useState([])
    const [selectedCountry, setSelectedCountry] = useState(null)

    const findFiveNearLocationsFromMainCountry = () => {
        const cacheCountries = apolloClient.readQuery({ query: GET_COUNTRIES })
        const countryNearMarkers = []
        
        country.distanceToOtherCountries.forEach(distanceCountry => {
            const completeCountryInformation = cacheCountries.Country.find(c => c.name === distanceCountry.countryName)
            countryNearMarkers.push(completeCountryInformation)
        })
        setMarkers(countryNearMarkers)

        const viewportConfig = {
            ...viewport,
            latitude: country.location.latitude,
            longitude: country.location.longitude
        }
        setViewport(viewportConfig)
    }

    const getDistanceFromMainCountry = () => {
        const distance = country.distanceToOtherCountries.find(distance => distance.countryName === selectedCountry.name)
        return distance.distanceInKm;
    }

    const handleMapPopup = (e, country) => {
        e.preventDefault();
        setSelectedCountry(country)
    }
    
    useEffect(() => {
        const { id } = props.match.params
        const cacheCountries = apolloClient.readQuery({ query: GET_COUNTRIES })
        if (cacheCountries) {
            const foundCountry = cacheCountries.Country.find(country => country._id === id)
            setCountry(foundCountry)
        } else {
            props.history.push('/')
        }
    }, [apolloClient, props.history, props.match.params]);

    useEffect(() => {
        if (country) findFiveNearLocationsFromMainCountry()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [country])

    return (
        <Fragment>
        {country && (
            <Fragment>
                <div className={classes.countryHeader}>
                    <Container maxWidth="sm">
                        <Button 
                            variant="outlined"
                            size="small"
                            color="default"
                            startIcon={<KeyboardBackspaceIcon />}
                            onClick={() => props.history.push('/')}
                        >
                            Back to Countries
                        </Button>
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                            { country.name }
                            
                            <Tooltip title="Edit Country" placement="top">
                                <IconButton
                                    color="primary"
                                    size="small"
                                    className={classes.editButton}
                                    onClick={() => props.history.push(`/country/${country._id}/edit`)}
                                >
                                    <EditIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                        </Typography>
                        
                        <Typography variant="h5" align="center" color="textSecondary" paragraph>
                            <img className={classes.flag} src={country.flag.svgFile} alt={`Flag form ${country.name}`} />
                        </Typography>
                    </Container>
                </div>

                <Container className={classes.cardGrid} maxWidth="lg">
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                            <InfoCard title="Capital" info={country.capital} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                            <InfoCard title="Population" info={country.population} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                            <InfoCard title="Area" info={country.area} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                            <InfoCard title="Currency" info={country.currencies.map(currency => `${currency.name} (${currency.symbol})`).join(', ')} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                            <InfoCard title="Top-level domain" info={country.topLevelDomains.map(topLevel => topLevel.name).join(', ')} />
                        </Grid>
                    </Grid>
                </Container>

                <Container className={classes.cardGrid} maxWidth="xl">
                    <ReactMapGL
                        {...viewport}
                        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                        mapStyle={process.env.REACT_APP_MAPBOX_STYLE}
                        onViewportChange={(viewport) => setViewport(viewport)}
                    >
                        <Marker
                            latitude={country.location.latitude}
                            longitude={country.location.longitude}
                        >
                            <button className="marker main-country-marker" onClick={(e) => handleMapPopup(e, country)}>
                                <img src={country.flag.svgFile} alt={`Flag form ${country.name}`} />
                            </button>
                        </Marker>
                        {markers.map(marker => (
                            <Marker
                                key={marker._id}
                                latitude={marker.location.latitude}
                                longitude={marker.location.longitude}
                            >
                                <button className="marker near-country-marker" onClick={(e) => handleMapPopup(e, marker)}>
                                    <img src={marker.flag.svgFile} alt={`Flag form ${marker.name}`} />
                                </button>
                            </Marker>
                        ))}

                        {selectedCountry ? (
                            <Popup
                                longitude={selectedCountry.location.longitude}
                                latitude={selectedCountry.location.latitude}
                                onClose={() => setSelectedCountry(null)}
                            >
                                <div>
                                    {(selectedCountry._id !== country._id) ? (
                                        <div>
                                            <h3>{selectedCountry.name}</h3>
                                            <p>This country is far <b>{getDistanceFromMainCountry()} Km</b> from <b>{country.name}</b></p>
                                        </div>
                                    ) : (
                                        <div>
                                            <h3>{selectedCountry.name}</h3>
                                            <p>That's the Country that you selected to see the details</p>
                                        </div>
                                    )}                                    
                                </div>
                            </Popup>
                        ) : ('')}
                    </ReactMapGL>
                </Container>
            </Fragment>
        )}
        </Fragment>
    )
}

export default CountryDetail