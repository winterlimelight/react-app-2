import * as React from "react";
import { DateTime } from "luxon";
import { IFlight, IChartFilter } from "../schema";
import { ChangeEvent } from "react";

type P = { date: string, format: string, onChange: (date: string) => void };
type S = { value: string }

export class DateField extends React.Component<P, S> {
    constructor(props: P) {
        super(props);
        this.state = { value: DateTime.fromFormat(this.props.date, this.props.format).toISODate() }
    }

    public render() {
        return <input type="string" value={this.state.value} onChange={this.onChange}></input>;
    }

    private onChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        let dt = DateTime.fromISO(ev.target.value);
        if(dt.isValid) {
            this.props.onChange(dt.toFormat(this.props.format));
            this.setState({ value: dt.toISODate() });
        }
        else
            this.setState({ value: ev.target.value || "" });
    }
}
