import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Container, Grid } from 'semantic-ui-react';
import { getAggregatedAmt } from '../../actions'
import { amountOptions, aggrOptions } from '../../config/options';
import Select from '../Dropdowns';


const Aggregator = (props) => {
    const [key, setKey] = useState('total_booking_count');
    const [type, setType] = useState('max');


    useEffect(() => {
        // trigger api only when there is change in both option
        if (key && type) {
            props.getAggregatedAmt(key, type);
        }
    }, [key, type])


    return (
        <Container>
            <Grid container verticalAlign textAlign >
                <Grid.Row>
                    <Grid.Column width={8}>
                        <Select
                            options={amountOptions}
                            value={key}
                            color={"green"}
                            label={"Select Variant"}
                            handleChange={(e, v) => setKey(v.value)}
                            multiple={false} />

                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={8}>
                        <Select
                            options={aggrOptions}
                            value={type}
                            color={"black"}
                            label={"Select Aggregator"}
                            handleChange={(e, v) => { setType(v.value) }}
                            multiple={false}>
                        </Select>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    )


}


export default connect(null, { getAggregatedAmt })(Aggregator);