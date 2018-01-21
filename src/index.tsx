
import * as React from "react";
import * as ReactDOM from "react-dom";
import { HashRouter, Route, NavLink } from "react-router-dom"

import { ChartPage } from "./components/ChartPage";
import "normalize.css"
import "./css/global.scss";

const homePage = () => 
    <div>
        <h1>React-App-2</h1>
        Welcome. Please select a page from the navigation menu above.
    </div>

const dataPage = () =>
    <div>
        <h1>Data Entry</h1>
        TODO
    </div>

const chartPage = () => 
    <div>
        <h1>Flight Passenger Totals</h1>
        <ChartPage />
    </div>


ReactDOM.render(
    <HashRouter>
        <div>
            <nav>
                <NavLink exact to="/">Home</NavLink>
                <NavLink to="/data">Data</NavLink>
                <NavLink to="/charts">Charts</NavLink>
            </nav>

            <Route exact path="/" component={homePage} />
            <Route path="/data" component={dataPage} />
            <Route path="/charts" component={chartPage} />
        </div>
    </HashRouter>,
    document.getElementById("example")
);
