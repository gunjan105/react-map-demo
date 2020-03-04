import React, { Component } from "react"
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps"
const { compose, withProps, lifecycle } = require("recompose");
const {
    StandaloneSearchBox
  } = require("react-google-maps/lib/components/places/StandaloneSearchBox");

const MapWithAMarker = compose(withScriptjs, withGoogleMap)(props => {
//    componentWillReceiveProps({someProp}) {
//      this.setState({...this.state,someProp});
//    }
//  }

  return (
      <>
    <GoogleMap defaultZoom={12} defaultCenter={{ lat: props.lat, lng: props.lng }}>
      {props.markers.map(marker => {
        const onClick = props.onClick.bind(this, marker)
        return (
          <Marker 
            onClick={onClick}
            position={marker.LatLng[0]}
            icon={marker.icon}
          >
            {props.selectedMarker === marker &&
              <InfoWindow>
                <div>
                  {marker.placeName}
                </div>
              </InfoWindow>}
            
          </Marker>
        );
      })}
    </GoogleMap>
   
    </>
  )
})


export default class ShelterMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shelters: [],
      selectedMarker: false
    }
  }

  // componentWillReceiveProps({lat,lng}) {
  //   this.setState({...this.state,lat,lng})
  // }

  componentDidMount() {
    // fetch("https://api.harveyneeds.org/api/v1/shelters?limit=20")
    //   .then(r => r.json())
    //   .then(data => {
    //     this.setState({ shelters: data.shelters })
    //   })
    var iconBase =
    'https://developers.google.com/maps/documentation/javascript/examples/full/images/';


var markersOnMap = [{
        placeName: "Australia (Uluru)",
        LatLng: [{
            lat: -25.344,
            lng: 131.036
        }],
        icon : iconBase + 'parking_lot_maps.png'
    },
    {
        placeName: "Australia (Melbourne)",
        LatLng: [{
            lat: -37.852086,
            lng: 504.985963
        }]
    },
    {
        placeName: "Australia (Canberra)",
        LatLng: [{
            lat: -35.299085,
            lng: 509.109615
        }],
         icon : iconBase + 'parking_lot_maps.png'
    },
    {
        placeName: "Australia (Gold Coast)",
        LatLng: [{
            lat: -28.013044,
            lng: 513.425586
        }]
    },
    {
        placeName: "Australia (Perth)",
        LatLng: [{
            lat: -31.951994,
            lng: 475.858081
        }]
    }
];

    this.setState({ shelters: markersOnMap });

  }
  handleClick = (marker, event) => {
    // console.log({ marker })

    this.setState({ selectedMarker: marker })
  }

  render() {
    return (
    <React.Fragment>
     
        <br></br>
      <MapWithAMarker
        selectedMarker={this.state.selectedMarker}
        markers={this.state.shelters}
        onClick={this.handleClick}
        lat = {this.props.lat}
        lng = {this.props.lng}
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyAeWwZ3gDRU13z6jiQRTuhFkA3ugQG_Q7Q&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />} 
      /> 
    </React.Fragment>
    )
  }
}