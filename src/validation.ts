import { DateTime } from "luxon";
import { IFlight } from "./schema";

export function isFlightValid(flight: IFlight):boolean {
    return flight.FlightNumber && flight.FlightNumber.length
        && flight.From && flight.From.length
        && flight.To && flight.To.length
        && flight.Aircraft && flight.Aircraft.length
        && flight.Passengers >= 0
        && flight.On && DateTime.fromISO(flight.On).isValid;
}
