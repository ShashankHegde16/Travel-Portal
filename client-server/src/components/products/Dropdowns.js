import React, { Component } from 'react';
import { connect } from 'react-redux';


const sortOptions = [{
    'name': 'Destination',
    'key': 'destination',
    'value': 'destination'
}, {
    'name': 'Price',
    'key': 'price',
    'value': 'price'
}, {
    'name': 'Booking Count',
    'key': 'total_booking_count',
    'value': 'total_booking_count'
}];



const priceRange = [{
    'name': '500-1000',
    'key': 'price',
    'value': '500-1000'
}, {
    'name': '100-250',
    'key': 'price',
    'value': '100-250'
}]

class DropDown extends Component {
    renderSortOptions(options) {
        return options.map(({ name, value }, index) => {
            return <option value={value} key={index}>{name}</option>
        })
    }

    render() {
        const { sortBy, product_title, price, handleChange } = this.props;
        return (
            <div className="row">
                <div className="col">
                    <label htmlFor="sortOption" className="form-label">Select Sort Option</label>
                    <select id="sortOption" className="form-select" value={sortBy} onChange={(event) => handleChange(event, 'sort')}>
                        {this.renderSortOptions(sortOptions)}
                    </select>
                </div>
                <div className="col">
                    <label htmlFor="productName" className="form-label">Select Product Title</label>
                    <select id="productName" className="form-select" value={product_title} onChange={(event) => handleChange(event, 'product')} >
                        {this.renderSortOptions(this.props.products)}
                    </select>
                </div>
                <div className="col">
                    <label htmlFor="productName" className="form-label">Select Price Range</label>
                    <select id="productName" className="form-select" value={price} onChange={(event) => handleChange(event, 'price')} >
                        {this.renderSortOptions(priceRange)}
                    </select>
                </div>
            </div>
        )

    }
}

function mapStatetoProps({ products }) {
    return { products };
}

export default connect(mapStatetoProps)(DropDown);