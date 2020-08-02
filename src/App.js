import React, { Fragment } from 'react'
import Routes from './routes'
import { makeStyles } from '@material-ui/core'
import Header from './components/Header'
import Footer from './components/Footer'

const useStyles = makeStyles(theme => ({
  container: {
      offset: theme.mixins.toolbar,
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
  }
}))

const App = () => {
  const classes = useStyles()

  return (
    <Fragment>
      <Header title="React Countries App with GraphQL" />
      <main>
        <div className={classes.container}>
            <Routes />
        </div>
      </main>
      <Footer author="Richard Matheus Vilas Boas" />
    </Fragment>
  )
}

export default App
