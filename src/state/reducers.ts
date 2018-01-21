import { combineReducers, AnyAction, Reducer } from "redux";
import { Requestable, IFlight, IChartFilter, IApplicationState } from "../schema";
import * as ACTIONS from "./actions";

function flights(state: Requestable<IFlight[]>, action: AnyAction): Requestable<IFlight[]> {
    switch (action.type) {
        case ACTIONS.ADD_FLIGHT:
            return { isFetching: state.isFetching, items: [...state.items, action.flight] }
        case ACTIONS.REQUEST_FLIGHTS:
            return { isFetching: true, items: null };
        case ACTIONS.RECEIVED_FLIGHTS:
            return { isFetching: false, items: action.flights };
    }
    return state || { isFetching: false, items: null };
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
