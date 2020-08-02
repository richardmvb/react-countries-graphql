import React from 'react'
import { Typography, Container, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    footer: {
      position: 'fixed',
      bottom: 0,
      width: '100vw',
      padding: theme.spacing(1, 1),
      margin: 'auto',
      textAlign: 'center',
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
    }
  }))

const Header = ({ author }) => {
    const classes = useStyles()
    
    return (
        <footer className={classes.footer}>
            <Container maxWidth="sm">
                <Typography data-testid="body2tag" variant="body2" color="textSecondary">
                    {`© ${author} | `}
                    {new Date().getFullYear()}
                </Typography>
            </Container>
        </footer>
    )
}

export default Header