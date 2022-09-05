import React, {useEffect, useState, useRef} from 'react';
import {
  Dimensions,
  View,
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Pressable,
  StatusBar,
} from 'react-native';
import MapView, {
  enableLatestRenderer,
  PROVIDER_GOOGLE,
} from 'react-native-maps';

enableLatestRenderer();
const {height, width} = Dimensions.get('screen');
const Maps = props => {
  return (
    <SafeAreaView>
      <StatusBar translucent backgroundColor="#023866" />
      {/* <Text style={{marginTop: 78}}> hii</Text> */}
      <View style={styles.container}>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}></MapView>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  View1: {alignSelf: 'center', width: '95%', marginVertical: 10},
  Text1: {fontWeight: 'bold'},
  hiddenCodeInput: {
    position: 'absolute',
    height: 0,
    width: 0,
    opacity: 0,
  },
  inputsContainer: {
    // backgroundColor: '#F00',
    width: '60%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  inputContainer: {
    borderColor: '#cccccc',
    borderBottomWidth: 2,
    borderRadius: 4,
    padding: 12,
  },
  inputText: {
    fontSize: 24,
    fontFamily: 'Menlo-Regular',
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    height: height * 0.9,
    marginTop: 35,
    width: width,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
export default Maps;
