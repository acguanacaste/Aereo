/* global google */
import {
    default as React,
    Component,
} from "react";

import {
    withGoogleMap,
    GoogleMap,
    InfoWindow,
    Marker,
} from "react-google-maps";
const activeIcon = new google.maps.MarkerImage(
    "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|FFFF00",
    null, /* size is determined at runtime */
    null, /* origin is 0,0 */
    null, /* anchor is bottom center of the scaled image */
    new google.maps.Size(16, 28)
);
const pinIcon = new google.maps.MarkerImage(
    "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|f7544c",
    null, /* size is determined at runtime */
    null, /* origin is 0,0 */
    null, /* anchor is bottom center of the scaled image */
    new google.maps.Size(16, 28)
);

const PopUpInfoWindowExampleGoogleMap = withGoogleMap(props => (

    <GoogleMap
        defaultZoom={9}
        center={props.center}
    >

        {props.markers.map((marker, index) => (
            <Marker
                key={index}
                position={{ lat: parseFloat(marker.lat), lng: parseFloat(marker.lng) }}
                onClick={() => props.onMarkerClick(marker)}
                icon={pinIcon}
            >
                {/*
                 Show info window only if the 'showInfo' key of the marker is true.
                 That is, when the Marker pin has been clicked and 'onCloseClick' has been
                 Successfully fired.
                 */}
                {marker.showInfo && (
                    <InfoWindow onCloseClick={() => props.onMarkerClose(marker)}>
                        <div>{marker.infoContent}</div>
                    </InfoWindow>
                )}
            </Marker>
        ))}

        <Marker
            key="ActivePicture"
            position={{ lat: parseFloat(props.markers[0].lat), lng: parseFloat(props.markers[0].lng) }}
            icon={activeIcon}
            zIndex={99999999}
        />
    </GoogleMap>
));

/*
 *
 *  Add <script src="https://maps.googleapis.com/maps/api/js"></script>
 *  to your HTML to provide google.maps reference
 *
 *  @author: @chiwoojo
 */
export default class PhotoMap extends Component {

    state = {
        center: {
            lat: 10.89035,
            lng: -85.497969,
        },

        activePhoto:this.props.activePhoto,

        // array of objects of markers


        markers :this.props.photos.map((marker, index) =>{
            let rows = [];

            rows.push({
                key: index,
                title: marker.titulo,
                lat:marker.latitud,
                lng:marker.longitud,
                position: new google.maps.LatLng(parseFloat(marker.latitud), parseFloat(marker.longitud)),
                showInfo: false,
                infoContent:
                    (<div >{marker.titulo} </div>)

            });

            return {
                key: index,
                icon: pinIcon,
                title: marker.titulo,
                lat:marker.latitud,
                lng:marker.longitud,
                position: new google.maps.LatLng(parseFloat(marker.latitud), parseFloat(marker.longitud)),
                showInfo: false,
                infoContent: (
                    <div >{marker.titulo}</div>
                )

            };

        }),

    };



    handleMarkerClick = this.handleMarkerClick.bind(this);
    handleMarkerClose = this.handleMarkerClose.bind(this);

    componentWillReceiveProps= function(nextProps) {
        var markers = nextProps.photos.map(function(marker, index) {
            return {
                key: index,
                /* icon: {

                 path: "M25 0c-8.284 0-15 6.656-15 14.866 0 8.211 15 35.135 15 35.135s15-26.924 15-35.135c0-8.21-6.716-14.866-15-14.866zm-.049 19.312c-2.557 0-4.629-2.055-4.629-4.588 0-2.535 2.072-4.589 4.629-4.589 2.559 0 4.631 2.054 4.631 4.589 0 2.533-2.072 4.588-4.631 4.588z",
                 fillColor: '#FF0000',
                 fillOpacity: .6,
                 strokeWeight: 0,
                 scale: 0.5

                 },*/
                title: marker.titulo,
                lat:marker.latitud,
                lng:marker.longitud,
                position: new google.maps.LatLng(parseFloat(marker.latitud), parseFloat(marker.longitud)),
                showInfo: false,
                infoContent: (
                    <div >{marker.titulo}</div>
                )
            }
        });//.bind(this)
        this.setState({ markers: markers });

    }

    // Toggle to 'true' to show InfoWindow and re-renders component
    handleMarkerClick(targetMarker) {
        this.setState({
            markers: this.state.markers.map(marker => {
                if (marker === targetMarker) {
                    return {
                        ...marker,
                        showInfo: true,
                    };
                }
                return marker;
            }),
        });
    }

    handleMarkerClose(targetMarker) {
        this.setState({
            markers: this.state.markers.map(marker => {
                if (marker === targetMarker) {
                    return {
                        ...marker,
                        showInfo: false,
                    };
                }
                return marker;
            }),
        });
    }

    render() {
        console.log(this.state.markers);
        return (
            <PopUpInfoWindowExampleGoogleMap
                containerElement={
                    <div style={{ height: `300px` }} />
                }
                mapElement={
                    <div style={{ height: `300px` }} />
                }
                center={this.state.center}
                markers={this.state.markers}
                onMarkerClick={this.handleMarkerClick}
                onMarkerClose={this.handleMarkerClose}
                activePhoto={this.props.activePhoto}
            />
        );
    }
}