import React, { Component } from 'react';
import { connect } from 'react-redux';




class TravelList extends Component {

    renderContent() {
        const { list } = this.props;
        return list.map((trans) => {
            return (
                <tr key={trans._id}>
                    <td>{trans.product_title}</td>
                    <td>{trans.destination}</td>
                    <td>{new Date(trans.created_at).toDateString()}</td>
                    <td>{trans.price}</td>
                    <td>{trans.currency}</td>
                    <td>{trans.total_booking_count}</td>
                </tr>
            )
        })
    }
    render() {
        return (
            <div>
                <table className="table table-hover table-striped table-bordered ">
                    <thead className="table-light">
                        <tr>
                            <th >Product Title</th>
                            <th >Destination</th>
                            <th>Transaction Date</th>
                            <th >Price</th>
                            <th>Currency</th>
                            <th >Booking Count</th>
                        </tr>
                    </thead>
                    <tbody >
                        {this.renderContent()}
                    </tbody>
                </table>
            </div>
        );
    }
}
const mapStatetoProps = ({ transactions: { totalRecords, list } }) => {
    return {
        count: totalRecords,
        list
    };
}

export default connect(mapStatetoProps)(TravelList);