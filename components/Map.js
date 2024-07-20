import { StyleSheet, View, SafeAreaView, Dimensions } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import MapView, { Marker, Polyline } from 'react-native-maps';
import tw from 'tailwind-react-native-classnames';
import { useDispatch, useSelector } from 'react-redux';
import { selectDestination, selectOrigin, setTravelTimeInformation } from '../slices/navSlice';
import MapViewDirections from 'react-native-maps-directions';

// Function to fetch directions from OSRM
const fetchDirections = async (origin, destination) => {
  try {
    const url = `https://router.project-osrm.org/route/v1/driving/${origin.longitude},${origin.latitude};${destination.longitude},${destination.latitude}?overview=full&geometries=geojson`;
    const response = await fetch(url);
    const data = await response.json();
    return data.routes[0];
  } catch (error) {
    console.error('Error fetching directions:', error);
    return null; // Return null instead of an empty array
  }
};

const calculateCost = (distance) => {
  const baseFare = 2; 
  const costPerKm = 1.5; 
  const distanceInKm = distance / 1000; 
  return baseFare + distanceInKm * costPerKm;
};

const Map = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const mapReference = useRef(null);
  const dispatch = useDispatch();
  const [rideCost, setRideCost] = useState(null);

  useEffect(() => {
    if (origin && destination) {
      const getDirections = async () => {
        const route = await fetchDirections(origin, destination);
        if (route) {
          const coordinates = route.geometry.coordinates.map(([lon, lat]) => ({ latitude: lat, longitude: lon }));
          setRouteCoordinates(coordinates);

          // Calculate and set travel time and cost
          const distance = route.distance;
          const duration = route.duration;
          const cost = calculateCost(distance);

          setRideCost(cost);
          dispatch(setTravelTimeInformation({
            distance,
            duration,
            cost
          }));

          // Zoom to fit the markers
          setTimeout(() => {
            mapReference.current.fitToSuppliedMarkers(['origin', 'destination'], {
              edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
            });
          }, 500);
        }
      };
      getDirections();
    }
  }, [origin, destination, dispatch]);

  return (
    <MapView
      ref={mapReference}
      style={tw`flex-1`}
      mapType='mutedStandard'
      initialRegion={{
        latitude: origin ? origin.latitude : 37.78825,
        longitude: origin ? origin.longitude : -122.4324,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}
    >
      {origin && (
        <Marker
          coordinate={{
            latitude: origin.latitude,
            longitude: origin.longitude,
          }}
          title='Origin'
          description='Current location'
          identifier='origin'
        />
      )}
      {destination && (
        <Marker
          coordinate={{
            latitude: destination.latitude,
            longitude: destination.longitude,
          }}
          title='Destination'
          description='Destination location'
          identifier='destination'
        />
      )}
      {routeCoordinates.length > 0 && destination && (
        <Polyline
          coordinates={routeCoordinates}
          strokeWidth={3}
          strokeColor="black"
        />
      )}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({});
