export class Requestable<T> {
    public isFetching: boolean;
    public items: T;
}

export interface IFlight {
    "FlightNumber": string,
    "From": string,
    "To": string,
    "Aircraft": string,
    "Passengers": number,
    "On": string
}

export interface IChartFilter {
    origin: string;
}

export interface IApplicationState {
    flights: Requestable<IFlight[]>,
    chartFilter: IChartFilter
}
