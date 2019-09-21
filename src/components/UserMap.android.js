/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from "react";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import { StyleSheet, PermissionsAndroid, View, Text } from "react-native";
import Geolocation from "react-native-geolocation-service";
import Icon from "react-native-vector-icons/FontAwesome5";

const _askForLocationServices = () => {
  PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    {
      title: "question",
      message:
        "Please, permit the application to get your location while you are using it."
    }
  ).then(() => {});
};

const UserMap = ({ navigation }) => {
  let [locationState, setLocationState] = useState({
    position: {
      coords: {
        latitude: 0,
        longitude: 0
      }
    },
    isPositionLoaded: false
  });

  let [parkingsState] = useState({
    isParkingsLoaded: true,
    parkings: [
      {
        coords: { latitude: 33.430918, longitude: -5.996483 },
        name: "Stade Parking"
      },
      {
        coords: { latitude: 33.4297, longitude: -6.003732 },
        name: "Hospital Parking"
      },
      {
        coords: { latitude: 33.436348, longitude: -6.003845 },
        name: "Weekly Market Parking"
      }
    ]
  });

  useEffect(() => {
    _askForLocationServices();
    let watchId = Geolocation.watchPosition(
      pos => {
        setLocationState({ position: pos, isPositionLoaded: true });
      },
      () => {},
      {
        enableHighAccuracy: true,
        timeout: 5000
      }
    );

    return () => {
      Geolocation.clearWatch(watchId);
    };
  }, []);

  return (
    <View style={styles.container}>
      {locationState.isPositionLoaded === true ? (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitude: locationState.position.coords.latitude,
            longitude: locationState.position.coords.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121
          }}
        >
          {parkingsState.isParkingsLoaded &&
            parkingsState.parkings.map(park => (
              <Marker
                coordinate={park.coords}
                key={park.name}
                title={park.name}
              >
                <Icon size={30} name="parking" color="blue" />
                <Callout onPress={() => navigation.navigate("Parking")}>
                  <View style={{ width: 150 }}>
                    <Text>Airport Parking</Text>
                    <Text>Available Lots : 5</Text>
                    <Text>Occupied Lots : 3</Text>
                    <Text>CLick Me</Text>
                  </View>
                </Callout>
              </Marker>
            ))}

          {
            <Marker
              coordinate={locationState.position.coords}
              key="position"
              title="Your Position"
            />
          }
        </MapView>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});

export default UserMap;
