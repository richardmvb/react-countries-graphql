import React, { useEffect, Fragment, useState } from 'react'
import { useLazyQuery, useApolloClient } from '@apollo/client'
import { GET_COUNTRIES } from './countries.graphql'
import CountryList  from '../countries/list'
import Loading from '../../components/Loading'

const Countries = (props) => {
    const apolloClient = useApolloClient()
    const [ isDataFetch, setIsDataFetch ] = useState(false)
    const [
        getCountries, 
        { loading, error, data }
    ] = useLazyQuery(GET_COUNTRIES)

    useEffect(() => {
        const cacheData = apolloClient.readQuery({ query: GET_COUNTRIES })
        if (!cacheData) {
            getCountries()
        } else {
            setIsDataFetch(true)
        }
    }, [apolloClient, getCountries])

    useEffect(() => {
        if (data && data.Country) {
            setIsDataFetch(true)
        }
    }, [data])

    if (loading) return (<Loading />)
    if (error) return (<p>Error on fetch Countries...</p>)

    return (
        <Fragment>
            { isDataFetch && (<CountryList {...props} />) }
        </Fragment>
    )
}

export default Countries