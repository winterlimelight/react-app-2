import { combineReducers, AnyAction, Reducer } from "redux";
import { Requestable, IFlight, IChartFilter, IApplicationState, FetchStatus } from "../schema";
import * as ACTIONS from "./actions";
import * as _ from "lodash";

function flights(state: Requestable<IFlight[]>, action: AnyAction): Requestable<IFlight[]> {
    switch (action.type) {
        case ACTIONS.SET_FLIGHT:
            let items = [...state.items];
            let inx = _.findIndex(items, f => f.Id == action.flight.Id);
            if(inx > 0)
                items.splice(inx, 1, action.flight);
            else
                state.items.push(action.flight);
            return { fetchStatus: state.fetchStatus, items: items }

        case ACTIONS.REQUEST_FLIGHTS:
            return { fetchStatus: FetchStatus.Fetching, items: null };

        case ACTIONS.RECEIVED_FLIGHTS:
            return { fetchStatus: FetchStatus.Success, items: action.flights };
    }
    return state || { fetchStatus: FetchStatus.NotStarted, items: null };
}

function chartFilter(state: IChartFilter, action: AnyAction) {
    switch (action.type) {
        case ACTIONS.CHANGE_CHART_FILTER:
            return action.chartFilter;
    }
    return state || { origin: "" };
}

const reducer:Reducer<IApplicationState> = combineReducers({
    flights: flights,
    chartFilter: chartFilter,
})

export default reducer;
