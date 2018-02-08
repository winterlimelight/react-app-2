import * as React from "react";
import { connect } from "react-redux";
import * as Autosuggest from 'react-autosuggest';
import { IAirport, Requestable, FetchStatus } from "../schema";
import * as actions from "../state/actions";

type P = { value: string, onChange: Function, airports: Requestable<IAirport[]>, actions: any }
type S = { value: string, suggestions: IAirport[], hasSuggestions: boolean }

class AirportDropdown extends React.Component<P, S> {
    constructor(props: P) {
        super(props);
        this.state = {
            value: props.value,
            hasSuggestions: null,
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
        this.props.onChange(change.newValue);
    };

    // Autosuggest will call this function every time you need to update suggestions.
    onSuggestionsFetchRequested = (request: Autosuggest.SuggestionsFetchRequestedParams) => {
        const val = request.value.trim().toLowerCase();
        let airports = this.props.airports.items.filter(a => a.code.toLowerCase().indexOf(val) >= 0 || a.name.toLowerCase().indexOf(val) >= 0);

        console.log("AirportDropdown.onSuggestionsFetchRequested() request=" + JSON.stringify(request) + " filtered=" + JSON.stringify(airports));

        this.setState({
            hasSuggestions: airports.length > 0,
            suggestions: airports
        });
    };

    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    private getSuggestionValue = (suggestion: IAirport) => suggestion.code;
    private renderSuggestion = (suggestion: IAirport) => <div>{suggestion.name}</div>

    render() {
        console.log("AirportDropdown.render()");
        const { value, suggestions } = this.state;

        const inputProps = {
            onChange: this.onChange,
            placeholder: 'Airport',
            value: value
        };

        let noSuggestionsContainer = null;
        if (this.state.hasSuggestions === false)
            noSuggestionsContainer = <div className="no-suggestions-container">No suggestions</div>;

        return (
            <div className="airport-dropdown">
                <Autosuggest
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested.bind(this)}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested.bind(this)}
                    getSuggestionValue={this.getSuggestionValue.bind(this)}
                    renderSuggestion={this.renderSuggestion.bind(this)}
                    inputProps={inputProps}
                />
                {noSuggestionsContainer}
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
