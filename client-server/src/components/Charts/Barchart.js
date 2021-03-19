import React from 'react';
import Chart from "react-apexcharts";
import _ from 'lodash';
import { Card } from 'semantic-ui-react';

const Plot = ({ data, series }) => {

    function renderNoContent() {
        return null


    }
    if (series.length == 0) {
        return renderNoContent();
    }
    return (

        <Card className="width-100" color='red'>
            <Chart
                options={data}
                series={series}
                type="bar"
                width="100%"
                height="100%"
            />
        </Card>

    )

}



export default Plot;