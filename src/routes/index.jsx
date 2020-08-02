import React from 'react'
import { Switch, Route } from 'react-router-dom';
import Countries from '../pages/countries';
import CountryForm from '../pages/countries/form';
import CountryDetail from '../pages/countries/detail';

const Routes = () => (
    <Switch>
        <Route exact path="/" component={Countries} />
        <Route exact path="/country/:id/edit" component={CountryForm} />
        <Route exact path="/country/:id/view" component={CountryDetail} />
    </Switch>
)

export default Routes;