export enum FetchStatus { NotStarted, Fetching, Success, Error }

export class Requestable<T> {
    public fetchStatus: FetchStatus;
    public items: T;
}

export interface IFlight {
    "Id": number;
    "FlightNumber": string;
    "From": string;
    "To": string;
    "Aircraft": string;
    "Passengers": number;
    "On": string;
}

export interface IChartFilter {
    origin: string;
}

export interface IApplicationState {
    flights: Requestable<IFlight[]>;
    chartFilter: IChartFilter;
}
