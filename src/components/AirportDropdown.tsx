import * as React from "react";
import { connect } from "react-redux";
import * as Autosuggest from 'react-autosuggest';
import { IAirport, Requestable } from "../schema";
import * as actions from "../state/actions";

type P = { value: string, onChange: Function, airports: Requestable<IAirport[]>, actions: any }
type S = { value: string, suggestions: IAirport[] }

class AirportDropdown extends React.Component<P, S> {
    constructor(props: P) {
        super(props);
        this.state = {
            value: props.value,
            suggestions: []
        };
    }

    public componentDidMount() {
        this.props.actions.getAirports();
    }

    public onChange = (event: React.FormEvent<any>, change: Autosuggest.ChangeEvent) => {
        console.log("AirportDropdown.onChange() " + JSON.stringify(change));
        this.setState({
            value: change.newValue
        });
    };

    // Autosuggest will call this function every time you need to update suggestions.
    onSuggestionsFetchRequested = (request: Autosuggest.SuggestionsFetchRequestedParams) => {
        const val = request.value.trim().toLowerCase();
        let airports = this.props.airports.items.filter(a => a.code.toLowerCase().indexOf(val) >= 0 || a.name.toLowerCase().indexOf(val) >= 0);

        console.log("AirportDropdown.onSuggestionsFetchRequested() request=" + JSON.stringify(request) + " filtered=" + JSON.stringify(airports));

        this.setState({
            suggestions: airports
        });
    };

    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    private getSuggestionValue = (suggestion: IAirport) => suggestion.name;

    // TODO figure out what to do if airports haven't been received (i.e. draw a spinner)
    private renderSuggestion = (suggestion: IAirport) => (
        <div>
            {suggestion.name}
        </div>
    );

    render() {
        console.log("AirportDropdown.render()");
        const { value, suggestions } = this.state;

        // Autosuggest will pass through all these props to the input.
        const inputProps = {
            onChange: this.onChange,
            placeholder: 'Airport',
            value: value  // TODO this is code - lookup display value (if available - async...)
        };

        // Finally, render it!
        return (
            <div>
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested.bind(this)}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested.bind(this)}
                getSuggestionValue={this.getSuggestionValue.bind(this)}
                renderSuggestion={this.renderSuggestion.bind(this)}
                inputProps={inputProps}
            />{
                /* TODO this prob needs its own variable....
                !suggestions.length &&
                  <div className="no-suggestions">
                    No suggestions
                  </div>*/
              }
            </div>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        airports: state.airports
    };
}

const mapActionToProps = (dispatch: any) => {
    return {
        actions: {
            getAirports: () => dispatch(actions.getAirports())
        }
    }
}

export default connect(mapStateToProps, mapActionToProps)(AirportDropdown)
