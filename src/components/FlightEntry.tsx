import * as React from "react";
import * as _ from "lodash";
import { IFlight, IChartFilter } from "../schema";
import { isFlightValid } from "../validation";
import { ChangeEvent } from "react";
import { DateField } from "./DateField";

type P = { flight: IFlight, onUpdate: Function, isNew: boolean };
interface S extends IFlight {
    isDirty: boolean
}

export class FlightEntry extends React.Component<P, S> {

    constructor(props: P) {
        super(props);
        this.state = { ...props.flight, isDirty: props.isNew };
    }

    public render() {
        let isValid = isFlightValid(this.state);
        let className = !isValid ? "invalid" : this.state.isDirty ? "dirty" : "";
        return (
            <tr className={className}>
                <td>
                    <input type="text" name="FlightNumber" value={this.state.FlightNumber} onChange={this.onInputChange}></input>
                </td>
                <td>
                    <input type="text" name="From" value={this.state.From} onChange={this.onInputChange}></input>
                </td>
                <td>
                    <input type="text" name="To" value={this.state.To} onChange={this.onInputChange}></input>
                </td>
                <td>
                    <input type="text" name="Aircraft" value={this.state.Aircraft} onChange={this.onInputChange}></input>
                </td>
                <td>
                    <input type="number" value={this.state.Passengers} onChange={this.onPassengersChange}></input>
                </td>
                <td>
                    <DateField date={this.state.On} format="yyyyLLdd" onChange={this.onOnChange} />
                </td>
                <td>
                    <button type="button" onClick={this.handleAccept}>&#x2713;</button>
                </td>
            </tr>
        );
    }

    private onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target;
        const name = target.name;

        let newState = {
            [name]: target.value,
            isDirty: true,
        } as any;

        this.setState(newState);
    }

    private onPassengersChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        let pax = parseInt(ev.target.value);
        pax = isNaN(pax) ? 0 : pax;
        this.setState({ Passengers: pax, isDirty: true });
    }

    private onOnChange = (newDate: string) => {
        this.setState({ On: newDate, isDirty: true });
    }

    private handleAccept = (event: React.MouseEvent<HTMLButtonElement>) => {
        if(!isFlightValid(this.state)) {
            this.setState({ isDirty: false });
            return;
        }

        this.props.onUpdate(_.omit(this.state, 'isDirty'));
        this.setState({ isDirty: false });
        event.preventDefault();
    }

    
}
