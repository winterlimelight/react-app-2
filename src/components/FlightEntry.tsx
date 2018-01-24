import * as React from "react";
import * as _ from "lodash";
import { IFlight, IChartFilter } from "../schema";
import { ChangeEvent } from "react";

type P = { flight: IFlight, onUpdate: Function };
interface S extends IFlight {
    isDirty: boolean
}

export class FlightEntry extends React.Component<P, S> {

    constructor(props: P) {
        super(props);
        this.state = { ...props.flight, isDirty: false };
    }

    public render() {
        let className = this.state.isDirty ? "dirty" : "";
        // TODO date - separate display format from storage format
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
                    <input type="text" name="On" value={this.state.On} onChange={this.onInputChange}></input>
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
            isDirty: true
        } as any;

        this.setState(newState);
    }

    private onPassengersChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        let pax = parseInt(ev.target.value);
        pax = isNaN(pax) ? 0 : pax;
        this.setState({ Passengers: pax, isDirty: true });
    }

    private handleAccept = (event: React.MouseEvent<HTMLButtonElement>) => {
        this.props.onUpdate(_.omit(this.state, 'isDirty'));
        this.setState({ isDirty: false });
        event.preventDefault();
    }
}
