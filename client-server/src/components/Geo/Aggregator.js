import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAggregatedAmt } from '../../actions'

const options = [
    {
        'name': 'Price',
        'value': 'price'
    },
    {
        'name': 'Booking Count',
        'value': 'total_booking_count'
    }
]
const aggrOptions = [
    {
        'name': 'Sum',
        'value': 'sum'
    },
    {
        'name': 'Average',
        'value': 'avg'
    },
    {
        'name': 'Min',
        'value': 'min'
    },
    {
        'name': 'Max',
        'value': 'max'
    }
];


class Aggregator extends Component {
    state = { key: '', type: '' };


    componentDidMount() {
        this.props.getAggregatedAmt(this.state.key, this.state.type);
    }

    componentDidUpdate() {
        this.props.getAggregatedAmt(this.state.key, this.state.type);
    }


    renderOptions(options) {
        return options.map(({ name, value }) => {
            return <option value={value} key={name}>{name}</option>
        })
    }

    render() {
        return (
            <div className="row">
                <div className="col">
                    <label htmlFor="options" className="form-label">Select Option</label>
                    <select id="options"
                        className="form-select"
                        value={this.state.key}
                        onChange={(event) => this.setState({ key: event.target.value })}>
                        {this.renderOptions(options)}
                    </select>
                </div>
                <div className="col">
                    <label htmlFor="aggregator" className="form-label">Select Aggregator</label>
                    <select
                        id="aggregator"
                        className="form-select"
                        value={this.state.type}
                        onChange={(event) => this.setState({ type: event.target.value })} >
                        {this.renderOptions(aggrOptions)}
                    </select>
                </div>
            </div>
        )
    }
}


export default connect(null, { getAggregatedAmt })(Aggregator);