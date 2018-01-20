import * as React from "react";
import { IFlight } from "../schema";
import { PassengerCountChart } from "./PassengerCountChart";

export interface IFlightChartPage extends IFlight {
    flights: IFlight[];
    isLoaded: boolean;
    error: Error;
}

export class ChartPage extends React.Component<{}, IFlightChartPage> {

    constructor(props: any) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            flights: []
        } as Readonly<IFlightChartPage>;
    }

    async componentDidMount() {
        try {
            let resp = await fetch("http://localhost:8080/fakedata/flights.json");
            let json = await resp.json();
            this.setState({ isLoaded: true, flights: json });
        } catch (e) {
            this.setState({ isLoaded: true, error: e });
        }
    }

    render() {
        const { error, isLoaded, flights } = this.state;
        if (error)
            return <div>Unable to load data. Error: {error.message}</div>;
        if (!isLoaded)
            return <div>Loading...</div>;

        return (
            <div>
                <PassengerCountChart flights={this.state.flights} />
            </div>
        );
    }
}
