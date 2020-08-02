import React from 'react'
import { AppBar, Toolbar, Typography } from '@material-ui/core'

const Header = ({ title }) => {
    return (
        <AppBar position="fixed">
            <Toolbar>
                <Typography data-testid="h6tag" variant="h6" color="inherit" noWrap>
                    { title }
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Header