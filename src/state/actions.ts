import { IFlight, IChartFilter } from "../schema";

export const ADD_FLIGHT = "ADD_FLIGHT";
export const REQUEST_FLIGHTS = "REQUEST_FLIGHTS";
export const RECEIVED_FLIGHTS = "RECEIVED_FLIGHTS";
export const CHANGE_CHART_FILTER = "CHANGE_CHART_FILTER";


// action creators
export const addFlight = (flight: IFlight) => {
    return { type: ADD_FLIGHT, flight: flight }
}

export const getFlights = () => {
    return (dispatch:any) => {
        dispatch(requestFlights());
        fetch("http://localhost:8080/fakedata/flights.json")
            .then(resp => resp.json())
            .then(json => dispatch(receivedFlights(json)))
            .catch(e => dispatch(receivedFlights(null)));
    }
}

const requestFlights = () => {
    return { type: REQUEST_FLIGHTS }
}

const receivedFlights = (flights: IFlight[]) => {
    return { type: RECEIVED_FLIGHTS, flights: flights }
}

export const setChartFilter = (chartFilter: IChartFilter) => {
    return { type: CHANGE_CHART_FILTER, chartFilter: chartFilter }
}
