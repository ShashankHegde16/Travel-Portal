import React, { Component } from 'react';
import { MapContainer, CircleMarker, TileLayer, Tooltip } from "react-leaflet";
import { connect } from 'react-redux';
import "leaflet/dist/leaflet.css";
import { getCoordinates } from '../../actions';

const LatLng = {
    "minLatLng": {
        "lat": -0.3039178,
        "lng": 100.38347899999997
    },
    "maxLatLng": {
        "lat": 9.984927299999999,
        "lng": 118.96357890000002
    }
}
class BubbleMap extends Component {

    componentDidMount() {
        this.props.getCoordinates();
    }

    renderBubble() {
        if (this.props.coordinates && this.props.coordinates.length > 0) {
            return (this.props.coordinates.map((cords) => {
                if (cords.lat && cords.lng) {
                    return (
                        <CircleMarker
                            center={[Number(cords.lat), Number(cords.lng)]}
                            radius={20 * Math.log((cords["amount"] || 1000000) / 10000000)}

                            fillOpacity={0.5}
                            stroke={false} >
                            <Tooltip direction="right" offset={[-8, -2]} opacity={1}>
                                <span>{cords.amount ? ("Aggregated Value" + ": " + cords.amount) : ''}</span>
                            </Tooltip>
                        </CircleMarker >);
                }
            }));
        }
    }






    render() {

        const centerLat = (LatLng['minLatLng']['lat'] + LatLng['maxLatLng']['lat']) / 2;
        const distanceLat = LatLng['maxLatLng']['lat'] - LatLng['minLatLng']['lat'];
        const bufferLat = distanceLat * 0.05;
        const centerLong = (LatLng['minLatLng']['lng'] + LatLng['maxLatLng']['lng']) / 2;
        const distanceLong = LatLng['minLatLng']['lng'] - LatLng['maxLatLng']['lng'];
        const bufferLong = distanceLong * 0.05;
        return (
            <div className='container'>
                <MapContainer
                    style={{ height: "400px", width: "100%" }}
                    zoom={1}
                    center={[centerLat, centerLong]}
                    bounds={[
                        [LatLng['minLatLng']['lat'] - bufferLat, LatLng['minLatLng']['lng'] - bufferLong],
                        [LatLng['maxLatLng']['lat'] + bufferLat, LatLng['maxLatLng'] + bufferLong]
                    ]}>
                    <TileLayer url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    {this.renderBubble()}
                </MapContainer>

            </div>
        );
    }
}


const mapStatetoProps = (({ coordinates }) => {
    return { coordinates };
})

export default connect(mapStatetoProps, { getCoordinates })(BubbleMap);