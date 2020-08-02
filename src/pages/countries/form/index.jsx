import React, { useEffect, useState, Fragment } from 'react'
import { makeStyles, Container, Button, Typography, Grid } from '@material-ui/core'
import { useApolloClient } from '@apollo/client'
import { Form, Field } from 'react-final-form'
import { TextField } from 'final-form-material-ui'
import { GET_COUNTRIES } from '../countries.graphql'

const useStyles = makeStyles(theme => ({
    countryHeader: {
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(8, 0, 2),
        marginBottom: theme.spacing(2)
    }
}))

const CountryForm = (props) => {
    const classes = useStyles()
    const apolloClient = useApolloClient()
    const [country, setCountry] = useState()

    const onSubmit = (dataFromForm) => {
        const fragmentResult = apolloClient.cache.modify({
            id: apolloClient.cache.identify(country),
            fields: {
                name() { return dataFromForm.name },
                capital() { return dataFromForm.capital },
                population() { return dataFromForm.population },
                area() { return dataFromForm.area }
            }
        })
        
        if (fragmentResult)
            props.history.push(`/country/${country._id}/view`)
    }

    const validate = form => {
        const errors = {}
        if (!form.name) errors.name = 'Name is required!'
        if (!form.capital) errors.capital = 'Capital is required!'
        if (!form.population) errors.population = 'Population is required!'
        if (!form.area) errors.area = 'Area is required!'
        return errors
    }

    useEffect(() => {
        const { id } = props.match.params
        const cacheCountries = apolloClient.readQuery({ query: GET_COUNTRIES })
        if (cacheCountries) {
            const findCountry = cacheCountries.Country.find(country => country._id === id)
            setCountry(findCountry)
        } else {
            props.history.push('/')
        }
    }, [apolloClient, props.history, props.match.params]);

    return (
        <Fragment>
        {country && (
            <Fragment>
                <div className={classes.countryHeader}>
                    <Container maxWidth="sm">
                        <Typography variant="h5" align="center" color="textSecondary">
                            <b>Editing:</b> { country.name }
                        </Typography>
                    </Container>
                </div>

                <Container component="main" maxWidth="md">
                    <Form
                        onSubmit={onSubmit}
                        initialValues={country}
                        validate={validate}
                        render={({ handleSubmit, submitting, errors }) => (
                            <form autoComplete="off" noValidate onSubmit={handleSubmit}>
                                <Grid container alignItems="flex-start" spacing={2}>
                                    <Grid item xs={12} md={6} lg={3}>
                                        <Field
                                            fullWidth
                                            required
                                            component={TextField}
                                            type="text"
                                            name="name"
                                            label="Name"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={3}>
                                        <Field
                                            fullWidth
                                            required
                                            component={TextField}
                                            type="text"
                                            name="capital"
                                            label="Capital"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={3}>
                                        <Field
                                            fullWidth
                                            required
                                            component={TextField}
                                            type="number"
                                            name="population"
                                            label="Population"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={3}>
                                        <Field
                                            fullWidth
                                            required
                                            component={TextField}
                                            type="number"
                                            name="area"
                                            label="Area"
                                        />
                                    </Grid>

                                    <Grid item style={{ marginTop: 16 }}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            type="submit"
                                            disabled={submitting || Object.entries(errors).length !== 0}
                                        >
                                            Save
                                        </Button>
                                    </Grid>
                                    <Grid item style={{ marginTop: 16 }}>
                                        <Button
                                            type="button"
                                            variant="contained"
                                            onClick={() => props.history.push(`/country/${country._id}/view`)}
                                        >
                                            Cancel
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        )}
                    />
                </Container>
            </Fragment>
        )}
        </Fragment>
    )
}

export default CountryForm