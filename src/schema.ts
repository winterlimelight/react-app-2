export enum FetchStatus { NotStarted, Fetching, Success, Error }

export class Requestable<T> {
    public fetchStatus: FetchStatus;
    public items: T;
}

export interface IFlight {
    id: number;
    flightNumber: string;
    from: string;
    to: string;
    aircraft: string;
    passengers: number;
    on: string;
}

export interface IAirport {
    code: string;
    name: string;
}

export interface IChartFilter {
    origin: string;
}

export interface IApplicationState {
    flights: Requestable<IFlight[]>;
    chartFilter: IChartFilter;
}
