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
    KmlLayer,
} from "react-google-maps";
import DrawingManager from 'react-google-maps/lib/drawing/DrawingManager'


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
const filterPolygon = function () {

}
const PopUpInfoWindowExampleGoogleMap = withGoogleMap(props => (

    <GoogleMap
        defaultZoom={9}
        center={props.center}
        mapTypeId={google.maps.MapTypeId.SATELLITE}
    >
        {props.markers.map((marker, index) => (
            <Marker
                key={index}
                position={{ lat: parseFloat(marker.lat), lng: parseFloat(marker.lng) }}
                onClick={() => props.onMarkerClick(marker)}
                icon={pinIcon}
            >
                {marker.showInfo && (
                    <InfoWindow onCloseClick={() => props.onMarkerClose(marker)}>
                        <div>{marker.infoContent}</div>
                    </InfoWindow>
                )}
            </Marker>
        ))}

        <Marker
            key="ActivePicture"
            position={{ lat: parseFloat(props.activePhoto.latitud), lng: parseFloat(props.activePhoto.longitud) }}
            icon={activeIcon}
            zIndex={99999999}
        />
        <KmlLayer
            url="https://www.aguanacaste.ac.cr/maps/acg-kml/area-marina.kml"
            options={{preserveViewport: true}}
        />
        <DrawingManager
            defaultDrawingMode={google.maps.drawing.OverlayType.RECTANGLE}
            defaultOptions={{
                drawingControl: true,
                editable:true,
                drawingControlOptions: {
                    position: google.maps.ControlPosition.TOP_CENTER,
                    drawingModes: [
                    //    google.maps.drawing.OverlayType.CIRCLE,
                    //    google.maps.drawing.OverlayType.POLYGON,
                        google.maps.drawing.OverlayType.RECTANGLE,
                    ],
                },
                circleOptions: {
                    fillColor: `#ffff00`,
                    fillOpacity: 0.3,
                    strokeWeight: 1,
                    clickable: false,
                    editable: true,
                    zIndex: 1,
                },
            }}
            onOverlayComplete={props.overlayComplete}
        />
    </GoogleMap>
));

export default class PhotoMap extends Component {

    state = {
        center: {
            lat: 10.89035,
            lng: -85.497969,
        },
        activePhoto:this.props.activePhoto,
        showPolygon:false,
        // array of objects of markers
        markers :this.props.photos.map((marker, index) =>{
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
        year : this.props.year,
        geoSearch: this.props.geoSearch,

    };

    handleMarkerClick = this.handleMarkerClick.bind(this);
    handleMarkerClose = this.handleMarkerClose.bind(this);
    handleOverlayComplete = this.handleOverlayComplete.bind(this);
    handleGeoSearch=this.handleGeoSearch.bind(this);
    handleYearSearch=this.handleYearSearch.bind(this);

    handleGeoSearch(bounds){
        this.props.handleGeoSearch(bounds);
    }

    handleYearSearch(year){
        this.props.handleYearSearch(year);
    }


    handleOverlayComplete(e) {
        console.log(e.overlay);
        var overlay = e.overlay;

        this.setState({event, e})
        //this.state.event = e;
        //console.log(e.overlay.getPath().getArray());
        //console.log(e.overlay.map);
        if (e.type !== google.maps.drawing.OverlayType.MARKER) {
            // Switch back to non-drawing mode after drawing a shape.
            // drawingManager.setDrawingMode(null); @todo: ver esto

            // Add an event listener that selects the newly-drawn shape when the user
            // mouses down on it.
            /* var newShape = e.overlay;
             newShape.type = e.type;
             google.maps.event.addListener(newShape, 'click', function() {
             setSelection(newShape);
             });

             setSelection(newShape);*/
            if ((e.type === google.maps.drawing.OverlayType.POLYLINE) ||
                (e.type === google.maps.drawing.OverlayType.POLYGON)
            ) {
                var locations = e.overlay.getPath().getArray()
                console.log("POLY:" + locations.toString());
                //alert(locations.toString() + " 1st instace");
            } else if (e.type === google.maps.drawing.OverlayType.CIRCLE) {
                console.log("CIRCLE center=" + e.overlay.getCenter().toUrlValue(6) + " radius=" + e.overlay.getRadius());

            } else if (e.type === google.maps.drawing.OverlayType.RECTANGLE) {
                //get lat/lng bounds of the current shape
                var nelng = overlay.getBounds().b.b;
                var nelat = overlay.getBounds().f.b;
                var swlng = overlay.getBounds().b.b;
                var swlat = overlay.getBounds().f.b;

                var bounds = {
                    nelng: nelng,
                    nelat: nelat,
                    swlng: swlng,
                    swlat: swlat
                };
                console.log(bounds);
                this.setState({geoSearch: bounds});
                //var center = bounds.getCenter();
                console.log(bounds);
                this.props.handleGeoSearch(bounds);
                // alert(bounds.toString() + " 2nd instance");
            }
        }
    }

    componentWillReceiveProps= function(nextProps) {
        var markers = nextProps.photos.map(function(marker, index) {
            return {
                key: index,
                title: marker.titulo,
                lat:marker.latitud,
                lng:marker.longitud,
                position: new google.maps.LatLng(parseFloat(marker.latitud), parseFloat(marker.longitud)),
                showInfo: false,
                infoContent: (
                    <div >{marker.titulo}</div>
                ),
                photo:marker, //toda la foto, por si se tienen que pasar como activa
            }
        });//.bind(this)
        this.setState({ markers: markers,activePhoto:nextProps.activePhoto });

    }

    // Toggle to 'true' to show InfoWindow and re-renders component
    handleMarkerClick(targetMarker) {
        this.props.onNewActive(targetMarker.photo); //El nuevo activo se pasa al estado generl por props, este viene binded en eel APP
        this.setState({
            activePhoto:targetMarker.photo,
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
      //  console.log(this.state.markers);
        return (
            <div>
            <PopUpInfoWindowExampleGoogleMap
                containerElement={
                    <div style={{ height: `300px` }} />
                }
                mapElement={
                    <div style={{ height: `300px` }} />
                }
                center={this.state.center}
                markers={this.state.markers}
                onMarkerClick={this.handleMarkerClick.bind(this)}
                onMarkerClose={this.handleMarkerClose}
                activePhoto={this.props.activePhoto}
                showPolygon={this.state.showPolygon}
                overlayComplete={this.handleOverlayComplete}
            />
                <div className="">
                    <button value=""
                            className="btn btn-primary"

                            onClick={filterPolygon}> Filtrar por localización</button>
                </div>
            </div>
        );
    }
}