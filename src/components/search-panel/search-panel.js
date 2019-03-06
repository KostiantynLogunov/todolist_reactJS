import React, {Component} from "react";


export default class SearchPanel extends Component{
    state = {
        term : '',
    };

    searchBy = (e) => {
        const term = e.target.value;
        this.setState({ term });
        this.props.onSearch(term);
    };

    render() {
        return (
            <input type="text" placeholder="lokking for..."
                   className="form-control search-input"
                   onChange={this.searchBy}
                   value={this.state.term}
            />
        );
    }
};


