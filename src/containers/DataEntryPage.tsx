import * as React from "react";
import { connect } from "react-redux";
import { IFlight, IChartFilter, Requestable, FetchStatus } from "../schema";
import * as actions from "../state/actions";
import { PassengerCountChart } from "../components/PassengerCountChart";
import { ChartFilter } from "../components/ChartFilter";
import { FlightEntry } from "../components/FlightEntry";

export interface IDataEntryPage {
    initialized: boolean;
}

interface P {
    flights: Requestable<IFlight[]>,
    actions: any;
}

class DataEntryPage extends React.Component<P, IDataEntryPage> {

    constructor(props: any) {
        super(props);
        this.state = { initialized: false }
    }

    public componentDidMount() {
        if (!this.props.flights || this.props.flights.fetchStatus != FetchStatus.Success)
            this.props.actions.getFlights();
    }

    public render() {
        if (!this.props.flights)
            return <div />
        if (this.props.flights.fetchStatus == FetchStatus.NotStarted || this.props.flights.fetchStatus == FetchStatus.Fetching)
            return <div>Loading...</div>;

        let flightRows = this.props.flights.items.map(f => <FlightEntry flight={f} onUpdate={(ev: IFlight) => this.onEntryUpdate(ev)} />);

        return <table>
            <tr>
                <th>Flight No.</th>
                <th>From</th>
                <th>To</th>
                <th>Aircraft</th>
                <th>Pax</th>
                <th>On</th>
            </tr>
            {flightRows}
        </table>

        // TODO add row (set action with Id = -1)
    }

    private onEntryUpdate(flight: IFlight) {
        console.log("onEntryUpdate " + JSON.stringify(flight));
        this.props.actions.updateFlight(flight);
    }
}

const mapStateToProps = (state: any) => {
    return {
        flights: state.flights
    };
}

const mapActionToProps = (dispatch: any) => {
    // TODO try: import {bindActionCreators} from 'redux'; later
    return {
        actions: {
            getFlights: () => dispatch(actions.getFlights()),
            updateFlight: (flight: IFlight) => dispatch(actions.setFlight(flight)),
            setFilter: (filter: IChartFilter) => dispatch(actions.setChartFilter(filter))
        }
    }
}

export default connect(mapStateToProps, mapActionToProps)(DataEntryPage)
