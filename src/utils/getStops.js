import React from 'react';
import {Map, InfoWindow, Marker,Polyline, GoogleApiWrapper} from 'google-maps-react';

export default function getStops(route) {
  switch(route) {
    case "caloop":
      return this.state.caloopRouteMarkers;
    case "night":
      return this.state.nightRouteMarkers;
    case "day":
      return this.state.dayRouteMarkers;
  }
}
