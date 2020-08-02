import React, { useState, Fragment, useEffect } from 'react'
import { Grid, makeStyles, Container, Typography, InputBase, Paper } from '@material-ui/core'
import CountryCard from '../../../components/CountryCard'
import { useApolloClient } from '@apollo/client'
import { GET_COUNTRIES } from '../countries.graphql'

const useStyles = makeStyles(theme => ({
    listHeader: {
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(8, 0, 4)
    },
    cardGrid: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(8)
    },
    search: {
        margin: theme.spacing(4),
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center'
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1
    },
}))

const CountryList = (props) => {
    const classes = useStyles()
    const apolloClient = useApolloClient()
    const [countries, setCountries] = useState([])

    const handleSearch = (e) => {
        const query = e.target.value;
        if (query && query.length > 0) {
            setCountries(countries.filter(c => c.name.toLowerCase().indexOf(query.toLowerCase()) !== -1))
        } else {
            const cacheCountries = apolloClient.readQuery({ query: GET_COUNTRIES })
            setCountries(cacheCountries.Country)
        }
    }
    
    useEffect(() => {
        const cacheCountries = apolloClient.readQuery({ query: GET_COUNTRIES })
        setCountries(cacheCountries.Country)
    }, [apolloClient])

    return (
        <Fragment>
            <div className={classes.listHeader}>
                <Container maxWidth="sm">
                    <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                        Countries
                    </Typography>
                    <Typography variant="h5" align="center" color="textSecondary" paragraph>
                        Down below, as you can see, there a list of countries and their capitals and flags, 
                        you also can view more details of each Country click in <b>Details</b>.
                    </Typography>
                </Container>
            </div>
            
            <Container className={classes.cardGrid} maxWidth="lg">
                <Paper elevation={3} className={classes.search}>
                    <InputBase
                        className={classes.input}
                        placeholder="Search for a Country..."
                        inputProps={{ 'aria-label': 'search' }}
                        onInput={handleSearch}
                    />
                    {/* TODO: Try to implement input debounce to improve search performance */}
                </Paper>
                {countries && countries.length > 0 ? (
                    <Grid container spacing={4}>
                        {countries.map((country, i) => (
                        <Grid item key={i} xs={12} sm={6} md={4} lg={3} xl={3}>
                            <CountryCard country={country} {...props} />
                        </Grid>
                        ))}
                    </Grid>
                ) : (
                    <p>No Country found...</p>
                )}
            </Container>            
            
        </Fragment>
    )
}

export default CountryList