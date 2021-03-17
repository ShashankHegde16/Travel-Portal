import React from 'react';
import Aggregator from './Aggregator';
import BubbleMap from './BubbleMap';


const Geo = () => {
    return (
        <div>
            <Aggregator></Aggregator>
            <h3>Bubble Map</h3>
            <BubbleMap></BubbleMap>
        </div>

    )
}

export default Geo;