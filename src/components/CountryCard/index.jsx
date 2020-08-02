import React from 'react'
import { 
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    Typography,
    CardActions,
    Button,
    makeStyles
} from '@material-ui/core'

const useStyles = makeStyles({
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    }
})

const CountryCard = (props) => {
    const { country, history } = props
    const classes = useStyles()

    const countryDetails = (countryId) => {
        history.push(`/country/${countryId}/view`)
    }

    return (
        <Card className={classes.card}>
            <CardActionArea onClick={() => countryDetails(country._id)}>
                <CardMedia
                    className={classes.cardMedia}
                    image={country.flag.svgFile}
                    title={country.name}
                />
                <CardContent className={classes.cardContent}>
                    <Typography  gutterBottom variant="h5" component="h2">
                        { country.name }
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        <strong>Capital:</strong> { country.capital }
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button
                    size="small"
                    color="primary"
                    onClick={() => countryDetails(country._id)}
                >
                    Details
                </Button>
            </CardActions>
        </Card>
    )
}

export default CountryCard