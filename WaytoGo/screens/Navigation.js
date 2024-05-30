import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, Animated, PanResponder, Image, Pressable } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ProgressBar, MD3Colors } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

var students = "7/16";
var startTime = "06:48 PM";
var distance = "5.47 mi";
var time = "18 min";

const stops = [
  { latitude: 41.149112, longitude: -73.953970, title: "49 Oakland Pl", description: "2 students", time: "06:59 pm", distance: "5.47 mi" },
  { latitude: 41.159112, longitude: -73.963970, title: "142-248 Western Hwy N", description: "1 student", time: "07:11 pm", distance: "5.10 mi" },
  { latitude: 41.169112, longitude: -73.973970, title: "1-35 Colony Dr", description: "3 students", time: "07:17 pm", distance: "1.43 mi" },
  // Add more stops as needed
];

function NavigationScreen() {
  const [location, setLocation] = useState({});
  const [currentStop, setCurrentStop] = useState(1);
  const navigation = useNavigation();

  const panY = useState(new Animated.Value(height - 80))[0];

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderRelease: (e, gestureState) => {
      if (gestureState.dy < -100) {
        Animated.spring(panY, {
          toValue: (height - (height * 0.6)),
          useNativeDriver: false,
        }).start();
      } else {
        Animated.spring(panY, {
          toValue: (height - 80),
          useNativeDriver: false,
        }).start();
      }
    },
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
      }
    })();
  }, []);

  let lat = location.latitude;
  let lon = location.longitude;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.headerBox}>
          <Text style={styles.headerTitle}>Navigation Title</Text>
          <Text style={styles.headerSubtitle}>Subtitle goes here</Text>
        </View>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 41.049112,
            longitude: -73.953970,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {stops.map((stop, index) => (
            <Marker
              key={index}
              coordinate={{ latitude: stop.latitude, longitude: stop.longitude }}
            >
              <View style={[
                styles.customMarker,
                { backgroundColor: index + 1 === currentStop ? 'green' : 'red' }
              ]}>
                <Text style={styles.markerText}>{index + 1}</Text>
              </View>
              <Callout>
                <View style={styles.callout}>
                  <Text>{stop.title}</Text>
                  <Text>{stop.description}</Text>
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.navigate('Routes')}
        >
          <Image source={require('../assets/images/back_arrow.png')} style={styles.backButtonImage} />
        </Pressable>
        <View style={styles.infoBox}>
          <Image source={require('../assets//images/arrows.png')} style={styles.largeIcon} />
          <View>
            <Text style={styles.infoTitle}>{stops[currentStop].title}</Text>
            <Text style={styles.infoSubtitle}>{stops[currentStop].distance}</Text>
          </View>
        </View>
        <Animated.View
          style={[styles.drawer, { transform: [{ translateY: panY }] }]}
          {...panResponder.panHandlers}
        >
          <View style={styles.drawerHandle} />
          <ScrollView>
            <View style={styles.topDrawer}>
              <Text style={styles.drawerSubtitle}>{distance}</Text>
              <Text style={styles.drawerTitle}>{students} Stops</Text>
              <Text style={styles.drawerSubtitle}>{time}</Text>
            </View>
            <ProgressBar progress={currentStop / stops.length} color={MD3Colors.primary} style={styles.progressBar} />
            {stops.map((stop, index) => (
              <View key={index} style={styles.drawerItem}>
                <View style={styles.stopHeader}>
                  <Text style={styles.stopNumber}>{index + 1}</Text>
                  <View style={styles.stopInfo}>
                    <Text style={styles.stopTitle}>{stop.title}</Text>
                    <Text style={[styles.stopDescription]}>{stop.description}</Text>
                  </View>
                </View>
                <View style={styles.stopDetails}>
                  <Text style={styles.stopTime}>{stop.time}</Text>
                  <Text style={styles.stopDistance}>{stop.distance}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </Animated.View>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerBox: {
    padding: 10,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  customMarker: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
  },
  markerText: {
    color: 'white',
    fontWeight: 'bold',
  },
  callout: {
    width: 125,
    padding: 5,
  },
  header: {
    position: 'absolute',
    top: 0,
    width: width,
    height: 60,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  drawer: {
    position: 'absolute',
    bottom: 0,
    width: width,
    height: height + 30, 
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  drawerHandle: {
    width: 100,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 2.5,
    alignSelf: 'center',
    marginVertical: 10,
    marginBottom: 0
  },
  topDrawer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  drawerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  drawerSubtitle: {
    fontSize: 18,
    color: '#666',
    paddingHorizontal: 15,
  },
  drawerItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  stopHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stopNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 10,
    color: '#E54F6D'
  },
  stopInfo: {
    flex: 1,
  },
  stopTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  stopDescription: {
    fontSize: 14,
    color: '#666',
  },
  stopDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  stopTime: {
    fontSize: 14,
    color: '#666',
  },
  stopDistance: {
    fontSize: 14,
    color: '#666',
  },
  progressBar: {
    height: 15,
    color: '#FE4A49',
    marginVertical: 10,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    top: -70,
    height: 140,
    paddingLeft: 15,
    paddingTop: 50,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
  },
  largeIcon: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoSubtitle: {
    fontSize: 16,
    color: '#666',
  },
  backButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  bottom: 120,
    left: 10,
  },
  backButtonImage: {
    width: 30,
    height: 30,
  },
});

export default NavigationScreen;
