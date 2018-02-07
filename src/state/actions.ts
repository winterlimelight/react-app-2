import { IFlight, IChartFilter, IApplicationState, FetchStatus } from "../schema";

export const SET_FLIGHT = "SET_FLIGHT";
export const REQUEST_FLIGHTS = "REQUEST_FLIGHTS";
export const RECEIVED_FLIGHTS = "RECEIVED_FLIGHTS";

export const REQUEST_AIRPORTS = "REQUEST_AIRPORTS";
export const RECEIVED_AIRPORTS = "RECEIVED_AIRPORTS";

export const CHANGE_CHART_FILTER = "CHANGE_CHART_FILTER";

const getAsync = (dispatch: any, url: string, requestDispatchType: string, receiveDispatchType: string) => {
    dispatch({ type: requestDispatchType });
    fetch("http://localhost:8080/fakedata/" + url)
        // TODO deliberately add delay via setTimeout to test handling of data not arrived
        .then(resp => resp.json())
        .then(json => dispatch({ type: receiveDispatchType, json: json }))
        .catch(e => dispatch({ type: receiveDispatchType, json: null, error: e }));
}

export const getFlights = () => {
    return (dispatch: any) => {
        getAsync(dispatch, "flights.json", REQUEST_FLIGHTS, RECEIVED_FLIGHTS)
    }
}

export const getAirports = (force: boolean = false) => {
    return (dispatch: any, getState: () => IApplicationState) => {
        let state = getState();
        if (force || state.airports.fetchStatus == FetchStatus.NotStarted)
            getAsync(dispatch, "airports.json", REQUEST_AIRPORTS, RECEIVED_AIRPORTS);
    }
}


export const setFlight = (flight: IFlight) => {
    return { type: SET_FLIGHT, flight: flight }
}

export const setChartFilter = (chartFilter: IChartFilter) => {
    return { type: CHANGE_CHART_FILTER, chartFilter: chartFilter }
}
