import * as React from "react";
import { connect } from "react-redux";
import { IFlight, IChartFilter, Requestable, FetchStatus } from "../schema";
import * as actions from "../state/actions";
import { PassengerCountChart } from "../components/PassengerCountChart";
import { ChartFilter } from "../components/ChartFilter";
import { FlightEntry } from "../components/FlightEntry";

let nextId = -1;

interface P {
    flights: Requestable<IFlight[]>,
    actions: any;
}

interface S {
    initialized: boolean;
    newFlights: IFlight[];
}

class DataEntryPage extends React.Component<P, S> {

    constructor(props: any) {
        super(props);
        this.state = { initialized: false, newFlights: [] }
    }

    public componentDidMount() {
        if (!this.props.flights || this.props.flights.fetchStatus != FetchStatus.Success)
            this.props.actions.getFlights();
    }

    public componentWillReceiveProps(nextProps: any) {
        console.log("DataEntryPage.componentWillReceiveProps = " + JSON.stringify(nextProps));
    }

    public render() {
        if (!this.props.flights)
            return <div />
        if (this.props.flights.fetchStatus == FetchStatus.NotStarted || this.props.flights.fetchStatus == FetchStatus.Fetching)
            return <div>Loading...</div>;

        let savedFlightRows = this.props.flights.items.map(f => <FlightEntry key={f.Id} flight={f} isNew={false} onUpdate={this.onEntryUpdate} />)
        let newFlightRows = this.state.newFlights.map(f => <FlightEntry key={f.Id} flight={f} isNew={true} onUpdate={this.onEntryUpdate} />)

        return <div>
            <table>
                <thead>
                    <tr>
                        <th>Flight No.</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Aircraft</th>
                        <th>Pax</th>
                        <th>On</th>
                    </tr>
                </thead>
                <tbody>
                    {savedFlightRows}
                    {newFlightRows}
                </tbody>
            </table>
            <button onClick={this.addFlight}>Add Flight</button>
        </div>
    }

    private addFlight = () => {
        let flight = { Id: nextId--, Passengers: 0,  On: "" } as IFlight
        console.log("addFlight " + JSON.stringify(flight));
        this.setState({ newFlights: this.state.newFlights.concat([flight]) });
    }

    private onEntryUpdate = (flight: IFlight) => {
        console.log("onEntryUpdate " + JSON.stringify(flight));
        // ensure flight is removed from newFlights if it was just created
        this.setState({ newFlights: this.state.newFlights.filter(f => f.Id != flight.Id)});

        this.props.actions.updateFlight(flight);
    }
}

const mapStateToProps = (state: any) => {
    return {
        flights: state.flights
    };
}

const mapActionToProps = (dispatch: any) => {
    return {
        actions: {
            getFlights: () => dispatch(actions.getFlights()),
            updateFlight: (flight: IFlight) => dispatch(actions.setFlight(flight)),
            setFilter: (filter: IChartFilter) => dispatch(actions.setChartFilter(filter))
        }
    }
}

export default connect(mapStateToProps, mapActionToProps)(DataEntryPage)
