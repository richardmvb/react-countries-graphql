import { gql } from '@apollo/client';

export const GET_COUNTRIES = gql`
{
    Country {
        _id
        name
        numericCode
        nativeName
        area
        population
        capital
        location {
            latitude
            longitude
        }
        distanceToOtherCountries(first: 5) {
            countryName
            distanceInKm
        }
        currencies {
            name
            symbol
        }
        flag {
            svgFile
        }
        topLevelDomains {
            name
        }
    }
}
`;