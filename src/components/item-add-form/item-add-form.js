import React, {Component} from 'react';

import './item-add-form.css';

export default class ItemAddForm extends Component{
    state = {
        label: ''
    };

    onLabelChange = (e) => {
        this.setState({label: e.target.value});
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.addNewItem(this.state.label);
        this.setState({label: ''});
    };

    render() {
        return (
            <form className="item-add-form d-flex" onSubmit={this.onSubmit}>
                <input type="text"
                       value={this.state.label}
                       className="form-control"
                       onChange={this.onLabelChange}
                       placeholder="Whats needs to be done"
                />
                <button type="submit" className="btn btn-outline-success">Add Item</button>
            </form>

        )
    }
}
