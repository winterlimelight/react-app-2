import * as React from "react";
import * as _ from "lodash";
import { IFlight } from "../schema";
import { ChangeEvent } from "react";

type P = { flights: IFlight[], onFilterChange: Function};

export interface IFilterState {
    origin: string;
}

const noFilter = { origin: "" };

export class Filters extends React.Component<P, IFilterState> {

    constructor(props: P) {
        super(props);
        this.state = noFilter;
    }

    onOriginChange(ev: React.FormEvent<HTMLSelectElement>) {
        console.log("onOriginChange");
        this.setState({ origin: (ev.target as HTMLSelectElement).value });
    }

    onFilter(ev: React.FormEvent<HTMLFormElement>) {
        console.log("onFilter");
        this.props.onFilterChange(this.state);
        ev.preventDefault();
    }

    onClear(ev: React.MouseEvent<HTMLButtonElement>) {
        console.log("onClear");
        this.props.onFilterChange(noFilter);
        this.setState(noFilter);
    }

    render() {
        return (
            <div>
                <h2>Filters</h2>
                <button onClick={ev => this.onClear(ev)}>Clear</button>
                <form onSubmit={ev => this.onFilter(ev)}>
                    <label>
                        Origin:
                        <select value={this.state.origin} onChange={ev => this.onOriginChange(ev)}>
                            {this.createSelectItems()}
                        </select>
                    </label>
                    <input type="submit" value="Apply" />
                </form>
            </div>
        );
    }

    private createSelectItems() {
        let origins = [""].concat(_.uniq(this.props.flights.map(f => f.From)));
        return origins.map(f => <option key={f} value={f}>{f}</option>)
    } 
}
