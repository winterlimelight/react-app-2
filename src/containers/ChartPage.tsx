import * as React from "react";
import { connect } from "react-redux";
import { IFlight, IChartFilter, Requestable, FetchStatus } from "../schema";
import * as actions from "../state/actions";
import { PassengerCountChart } from "../components/PassengerCountChart";
import { ChartFilter } from "../components/ChartFilter";

export interface IFlightChartPage {
    filteredFlights: IFlight[];
    filter: IChartFilter;
    initialized: boolean;
}

interface P {
    flights: Requestable<IFlight[]>,
    chartFilter: IChartFilter,
    actions: any;
}

class ChartPage extends React.Component<P, IFlightChartPage> {

    constructor(props:any) {
        super(props);
        this.state = { initialized: false, filteredFlights: [], filter: this.props.chartFilter }
    }

    componentDidMount() {
        if(!this.props.flights || this.props.flights.fetchStatus != FetchStatus.Success)
            this.props.actions.getFlights();
    }

    public componentWillReceiveProps(nextProps: P) {
        console.log("componentWillReceiveProps " + JSON.stringify(this.state) + JSON.stringify(nextProps));

        if(!this.state.initialized && nextProps.flights && nextProps.flights.items)
            this.setState({ initialized: true, filteredFlights: [...nextProps.flights.items] });
    }

    render() {
        if (!this.props.flights)
            return <div />
            if (this.props.flights.fetchStatus == FetchStatus.NotStarted || this.props.flights.fetchStatus == FetchStatus.Fetching)
            return <div>Loading...</div>;
        
        return (
            <div>
                <PassengerCountChart flights={this.state.filteredFlights} />
                <ChartFilter flights={this.props.flights.items} onFilterChange={(ev:IChartFilter) => this.onFilterChange(ev)} />
            </div>
        );
    }

    private onFilterChange(filter: IChartFilter) {
        console.log("ChartPage.onFilterChange = " + JSON.stringify(filter));

        let flights = this.props.flights.items;
        if (filter.origin)
            flights = flights.filter(f => f.from == filter.origin);
        this.setState({ filteredFlights: flights, filter: filter });
        this.props.actions.setFilter(filter);
    }
}

const mapStateToProps = (state: any) => {
    return {
        flights: state.flights,
        chartFilter: state.chartFilter
    };
}

const mapActionToProps = (dispatch: any) => {
    return {
        actions: {
            getFlights: () => dispatch(actions.getFlights()),
            setFilter: (filter:IChartFilter) => dispatch(actions.setChartFilter(filter))
        }
    }
}

export default connect(mapStateToProps, mapActionToProps)(ChartPage)
