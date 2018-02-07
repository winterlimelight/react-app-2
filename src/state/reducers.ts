import { combineReducers, AnyAction, Reducer } from "redux";
import { Requestable, IFlight, IChartFilter, IApplicationState, FetchStatus, IAirport } from "../schema";
import * as ACTIONS from "./actions";
import * as _ from "lodash";

function airports(state: Requestable<IAirport[]>, action: AnyAction): Requestable<IAirport[]> {
    switch (action.type) {
        case ACTIONS.REQUEST_AIRPORTS:
            return { fetchStatus: FetchStatus.Fetching, items: null };

        case ACTIONS.RECEIVED_AIRPORTS:
            return { fetchStatus: FetchStatus.Success, items: action.json };
    }
    return state || { fetchStatus: FetchStatus.NotStarted, items: null };
}

function flights(state: Requestable<IFlight[]>, action: AnyAction): Requestable<IFlight[]> {
    switch (action.type) {
        case ACTIONS.SET_FLIGHT:
            let items = [...state.items];
            let inx = _.findIndex(items, f => f.id == action.flight.id);
            if(inx >= 0)
                items.splice(inx, 1, action.flight);
            else
                items.push(action.flight);
            return { fetchStatus: state.fetchStatus, items: items }

        case ACTIONS.REQUEST_FLIGHTS:
            return { fetchStatus: FetchStatus.Fetching, items: null };

        case ACTIONS.RECEIVED_FLIGHTS:
            return { fetchStatus: FetchStatus.Success, items: action.json };
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
    airports: airports,
    flights: flights,
    chartFilter: chartFilter,
})

export default reducer;
