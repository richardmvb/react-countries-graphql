import React from 'react'
import { 
    Card,
    CardContent,
    Typography,
    makeStyles
} from '@material-ui/core'

const useStyles = makeStyles({
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardContent: {
        flexGrow: 1,
    }
})

const InfoCard = (props) => {
    const { title, info } = props
    const classes = useStyles()
    return (
        <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
                <Typography  gutterBottom variant="h5" component="h2">
                    { title }
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                     { info }
                </Typography>
            </CardContent>
        </Card>
    )
}

export default InfoCard