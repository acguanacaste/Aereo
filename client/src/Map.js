import {
    default as React,
    Component,
} from "react";

import {
    withGoogleMap,
    GoogleMap,
    Marker
} from 'react-google-maps';
import MarkerClusterer from "react-google-maps/lib/addons/MarkerClusterer";
/*
 * Sample From: https://developers.google.com/maps/documentation/javascript/examples/map-simple
 */


/*
*
*
    Esto va dentro del GoogleMap para ponerlo
 <MarkerClusterer
 averageCenter
 enableRetinaIcons
 gridSize={60}
 >
 {props.markers.map(marker => (
 <Marker
 position={{ lat: parseFloat(marker.latitud), lng: parseFloat(marker.longitud) }}
 key={marker.idfoto}
 />
 ))}
 </MarkerClusterer>

* */

const SimpleMapExampleGoogleMap = withGoogleMap(props => (
    <GoogleMap
        defaultZoom={9}
        defaultCenter={{ lat: 10.89035, lng: -85.497969 }}
    />

));


const MarkerClustererExampleGoogleMap = withGoogleMap(props => (

    <GoogleMap
        defaultZoom={9}
        defaultCenter={{ lat: 10.89035, lng: -85.497969 }}
    >


        {props.markers.map(marker => (
        <Marker
            position={{ lat: parseFloat(marker.latitud), lng: parseFloat(marker.longitud) }}
            key={marker.idfoto}
        />
        ))}



    </GoogleMap>
));
/*
 * Add <script src="https://maps.googleapis.com/maps/api/js"></script> to your HTML to provide google.maps reference
 */
export default class PhotoMap extends Component {

    constructor(props) {
        super(props);
        // Manually bind this method to the component instance...
        //this.handleClick = this.handleClick.bind(this);

    }

    render() {

        return (
            <MarkerClustererExampleGoogleMap

                containerElement={
                    <div style={{ height: `300px` }} />
                }
                mapElement={
                    <div style={{ height: `300px` }} />
                }
                markers = {this.props.photos}
            />
        );
    }
}

