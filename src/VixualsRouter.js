import React from 'react';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';
import Vixuals from 'Vixuals'

const DEFAULT_PARAM = "__DEFAULT_APP__"

class VixualsRouter extends React.Component {

    render() {
        return (
            <div className="VixualsRouter">
                <BrowserRouter>
                    <Switch>
                        <Route path="/:app">
                            <Vixuals
                                defaultParam={DEFAULT_PARAM}/>
                        </Route>
                        <Route path="/">
                            <Redirect to={`/${DEFAULT_PARAM}`}/>
                        </Route>
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default VixualsRouter;