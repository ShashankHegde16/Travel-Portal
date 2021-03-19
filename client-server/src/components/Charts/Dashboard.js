import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Popup, Container, Grid, Icon, Divider } from 'semantic-ui-react';
import { getChartData, deleteChartData } from '../../actions';
import Plot from './Barchart';
import { amountOptions } from '../../config/options';
import Select from '../Dropdowns';


const options = {
    chart: {
        id: "basic-bar"
    },
    xaxis: {
        categories: []
    }
};

const Dashboard = ({ plots, getChartData, deleteChartData }) => {
    const [plot, setPlot] = useState([]);

    useEffect(() => {
        if (plot && plot.length > 0) {
            getChartData(plot[plot.length - 1]);
        }
        deleteChartData(plot);
    }, [plot]);


    function getXAxisData() {
        console.log(plots)
        if (plots && Object.keys(plots).length > 0 && plot.length > 0) {
            const [key] = plot;
            options.xaxis.categories = plots[key].data;
            return options;
        }
        return options;
    }

    function getSeriesData() {
        let series = [];

        if (plot && plot.length > 0) {
            Object.keys(plots).forEach((keys, index) => {
                const current = plots[keys];
                series = [...series, current.series];
            })
        }
        return series;
    }

    return (
        <Container>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={8}>
                        <Select
                            options={amountOptions}
                            multiple={true}
                            value={plot}
                            color={"orange"}
                            label={"Choose Plot Value"}
                            handleChange={(e, v) => { setPlot(v.value) }} ></Select>
                    </Grid.Column>
                    <Grid.Column width={8} style={{ marginTop: "2em" }}>
                        <Popup content='Select plot type of your choice to plot!' trigger={<Icon name="info circle" size="big"></Icon>} />
                    </Grid.Column>
                </Grid.Row>
                <Divider></Divider>
                <Grid.Row>
                    <Grid.Column width={16} >
                        <Plot data={getXAxisData()} series={getSeriesData()}></Plot>

                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    );

}
function mapStatetoProps(state) {
    return {
        plots: state.plots
    }
}

export default connect(mapStatetoProps, { getChartData, deleteChartData })(Dashboard);