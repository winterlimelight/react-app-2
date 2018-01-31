import { DateTime } from "luxon";
import { IFlight } from "./schema";

export function isFlightValid(flight: IFlight):boolean {
    return flight.flightNumber && flight.flightNumber.length
        && flight.from && flight.from.length
        && flight.to && flight.to.length
        && flight.aircraft && flight.aircraft.length
        && flight.passengers >= 0
        && flight.on && DateTime.fromISO(flight.on).isValid;
}
