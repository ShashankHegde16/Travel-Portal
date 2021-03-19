import React from 'react';
import Aggregator from './Aggregator';
import BubbleMap from './BubbleMap';
import { Container, Grid } from 'semantic-ui-react';


const Geo = () => {
    return (
        <Container>
            <Grid>
                <Grid.Row >
                    <Grid.Column width={8}>
                        <BubbleMap></BubbleMap>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <Aggregator></Aggregator>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>);
}

export default Geo;