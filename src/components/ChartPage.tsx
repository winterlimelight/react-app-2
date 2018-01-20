import * as React from "react";

export interface IFlight {
    "FlightNumber": string,
    "From": string,
    "To": string,
    "Aircraft": string,
    "Passengers": number,
    "On": string
}

export interface IFlightChartPage extends IFlight {
    flights: IFlight[];
    isLoaded: boolean;
    error: Error;
}

export class ChartPage extends React.Component<{}, IFlightChartPage> {

    constructor(props:any) {
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
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>TODO</div>
            );
        }
    }
}
