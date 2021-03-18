import React, { useState } from 'react';
import { connect } from 'react-redux';
import { getChartData } from '../../actions';
import Plot from './Barchart';
import Select from 'react-select';
import Loader from '../loader'
const opt = [
    {
        'label': 'Price',
        'value': 'price'
    },
    {
        'label': 'Booking Count',
        'value': 'total_booking_count'
    }
];


const Dashboard = (props) => {
    const [plot, setPlot] = useState([]);





    return (
        <div className="container" style={{ margin: '2em' }}>
            <Loader> </Loader>

            <div className="row">
                <div className="col-sm-3">
                    <Select
                        isMulti={true}
                        value={plot}
                        onChange={setPlot}
                        options={opt}
                    />
                </div>
            </div>
            <hr></hr>
            <Plot plot={plot}  ></Plot>
        </div>);

}


export default connect(null, { getChartData })(Dashboard);