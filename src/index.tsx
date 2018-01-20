import * as React from "react";
import * as ReactDOM from "react-dom";

import { ChartPage } from "./components/ChartPage";

ReactDOM.render(
    <div>
        <h1>Flight Passenger Totals</h1>
        <ChartPage />
    </div>,
    document.getElementById("example")
);
