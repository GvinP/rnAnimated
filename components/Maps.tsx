import React, { useEffect } from "react";
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import * as Location from "expo-location";

const Maps = () => {
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }
    })();
  }, []);
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 56.838938,
          longitude: 60.603195,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{
            latitude: 56.838938,
            longitude: 60.603195,
          }}
          pinColor={"green"}
        >
          <Callout>
            <View
              style={{
                width: 200,
                height: 150,
                borderRadius: 20,
                backgroundColor: "#cecece",
                margin: 0,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text>PROVIDER_GOOGLE</Text>
            </View>
          </Callout>
        </Marker>
      </MapView>
    </View>
  );
};

export default Maps;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
