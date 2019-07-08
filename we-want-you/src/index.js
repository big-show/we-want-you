import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { BrowserRouter, Route, Link } from "react-router-dom";
import reducer from './reducer';
import './config'
import Login from './component/login/login';
import AuthRoute from './component/authroute/authroute';
import Register from './component/register/register';
import './index.css'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk));
const store = createStore(reducer, enhancer);
function Boss()
{
    return (
        <h2>Boss</h2>
    )
}
ReactDom.render(
    (
        <Provider store={store}>
            <BrowserRouter>
                <div>
                    <Route path='/boss' component={Boss}/>
                    <AuthRoute></AuthRoute>
                    <Route path='/login' component={Login} />
                    <Route path='/register' component={Register} />
                </div>
            </BrowserRouter>
        </Provider>
    ),
    document.getElementById("root")
);