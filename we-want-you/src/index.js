import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { BrowserRouter, Route, Link ,Switch} from "react-router-dom";
import reducer from './reducer';
import './config'
import Login from './component/login/login';
import AuthRoute from './component/authroute/authroute';
import Register from './component/register/register';
import './index.css'
import Bossinfo from './container/bossinfo/bossinfo';
import Geniusinfo from './container/geniusinfo/geniusinfo';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk));
const store = createStore(reducer, enhancer);
ReactDom.render(
    (
        <Provider store={store}>
            <BrowserRouter>
                <div>
                    <AuthRoute></AuthRoute>
                    <Switch>
                    <Route path='/geniusinfo' component={Geniusinfo}/>
                    <Route path='/bossinfo' component={Bossinfo}/>
                    <Route path='/login' component={Login} />
                    <Route path='/register' component={Register} />
                    </Switch>
                </div>
            </BrowserRouter>
        </Provider>
    ),
    document.getElementById("root")
);