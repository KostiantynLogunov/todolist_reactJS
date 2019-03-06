import React, {Component} from 'react';

export default class ItemStatusFilter extends Component {

    render() {
        return (
            <div className="btn-group">
                <button type="button"
                        className={this.props.filter==='all' ? "btn btn-info" : "btn-outline-secondary"}
                        onClick={()=>this.props.onFilter('all')}
                >All</button>
                <button type="button"
                        className={this.props.filter==='active' ? "btn btn-info" : "btn-outline-secondary"}
                        onClick={()=>this.props.onFilter('active')}
                >Active</button>
                <button type="button"
                        className={this.props.filter==='done' ? "btn btn-info" : "btn-outline-secondary"}
                        onClick={()=>this.props.onFilter('done')}
                >Done</button>
            </div>
        );
    };
}
