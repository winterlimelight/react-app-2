import * as React from "react";
import * as c3 from "c3";
import * as _ from "lodash";
import { IFlight } from "../schema";

type P = { flights: IFlight[] }

export class PassengerCountChart extends React.Component<P, {}> {
    private el: HTMLDivElement;
    private chart: c3.ChartAPI;

    constructor(props: P) {
        super(props);
    }

    public render() {
        return <div ref={el => this.el = el} />;
    }

    public componentDidMount() {
        this.setChart();
    }

    public componentWillUnmount() {
        if (this.chart) {
            this.chart.destroy();
            this.chart = null;
        }
    }

    public componentDidUpdate(prevProps: P, prevState: P) {
        console.log("componentDidUpdate props " + JSON.stringify(this.props));
        this.setChart();
    }

    private setChart() {
        if (!this.chart) {
            this.chart = c3.generate({
                bindto: this.el,
                data: { x: 'destinations', columns: [] },
                grid: { y: { lines: [{ value: 0 }] } },
                legend: { position: 'right' },
                axis: { x: { type: 'category', label: { text: 'Destination', position: 'outer-center' } } }
            });
        }

        // destinations
        let destinations = _.uniq(_.map(this.props.flights, f => f.to));
        // assembly columns by aircraft types
        let byAircraft = _.groupBy(this.props.flights, f => f.aircraft);
        // aggregate each group by destination
        let dataCols = _.map(byAircraft, (flights, aircraft) => {
            let col = [aircraft];
            for (let dest of destinations) {
                let paxToDest = flights
                    .filter(f => f.to == dest)
                    .reduce((acc, val) => acc + val.passengers, 0);
                col.push(paxToDest.toString());
            }
            return col;
        });

        this.chart.load({
            unload: true,
            type: 'bar',
            columns: [['destinations'].concat(destinations)].concat(dataCols)
        });
        this.chart.groups([Object.keys(byAircraft)]);
    }
}
