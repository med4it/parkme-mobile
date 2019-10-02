/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from "react";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import { StyleSheet, View, Text } from "react-native";
import Geolocation from "react-native-geolocation-service";
import Icon from "react-native-vector-icons/FontAwesome5";
import { ParkingsContext } from "../../providers/ParkingsProvider";

const UserMap = ({ navigation }) => {
  // Get parkings data
  const parkings = React.useContext(ParkingsContext);
  let [toolbarState, setToolbarState] = useState({ bottom: 1 });
  let [firstPosition, setFirstPosition] = useState();

  let [locationState, setLocationState] = useState({
    position: {
      coords: {
        latitude: 0,
        longitude: 0
      }
    },
    isPositionLoaded: false
  });

  useEffect(() => {
    let watchId = Geolocation.watchPosition(
      pos => {
        if (!firstPosition) setFirstPosition(pos);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toolbarHack = () => {
    if (toolbarState.bottom === 1) {
      setToolbarState({ bottom: 0 });
    }
  };

  return (
    <View style={styles.container}>
      {locationState.isPositionLoaded === true && firstPosition ? (
        <MapView
          showsMyLocationButton={true}
          minZoomLevel={15}
          zoomControlEnabled={true}
          toolbarEnabled={true}
          provider={PROVIDER_GOOGLE}
          style={[styles.map, { bottom: toolbarState.bottom }]}
          region={{
            latitude: firstPosition.coords.latitude,
            longitude: firstPosition.coords.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121
          }}
        >
          {parkings.map(park => {
            let { latitude, longitude } = park.geoPoint;
            return (
              <Marker
                onPress={() => toolbarHack()}
                coordinate={{ latitude, longitude }}
                key={park.name + park.available + park.occupied}
              >
                <Icon size={30} name="parking" color="blue" />
                <Callout
                  onPress={() =>
                    navigation.navigate("Parking", {
                      id: park.id,
                      name: park.name
                    })
                  }
                >
                  <View style={{ width: 150 }}>
                    <Text>{park.name}</Text>
                    <Text>{`Available Lots : ${park.available}`}</Text>
                    <Text>{`Occupied Lots : ${park.occupied}`}</Text>
                    <Text>Reserve Now</Text>
                  </View>
                </Callout>
              </Marker>
            );
          })}

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
      <View style={styles.spacefor} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 500,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    flex: 2
  },
  spacefor: {
    height: 200
  }
});

export default UserMap;
