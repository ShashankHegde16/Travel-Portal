import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Chart from "react-apexcharts";
import { getChartData } from '../../actions';

import _ from 'lodash';


const Plot = ({ plots, plot, getChartData }) => {

    function getDays() {
        const arr = [];
        for (let i = 1; i < 31; i++) {
            arr.push(i.toString().padStart(2, '0'));
        }
        return arr;
    }

    const [options, setOptions] = useState({
        chart: {
            id: "basic-bar"
        },
        xaxis: {
            categories: getDays()
        }
    });
    const [series, setSeries] = useState([]);

    useEffect(() => {
        const key = plot.map(({ value }) => value);
        if (key && key.length > 0)
            getChartData(key[key.length - 1]);
        const uniqEle = _.uniqBy(plots, 'name');
        setSeries(uniqEle);
    }, [plot]);






    return (
        <div>
            <h2>Price/Booking Plot</h2>
            <Chart
                options={options}
                series={series}
                type="bar"
                width="70%"
            />
        </div>
    );

}


function mapStatetoProps(state) {
    return {
        plots: state.plots
    }
}

export default connect(mapStatetoProps, { getChartData })(Plot);