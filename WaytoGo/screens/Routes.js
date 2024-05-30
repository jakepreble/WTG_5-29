import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions, StatusBar, Animated, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';


const { width, height } = Dimensions.get('window');

function RouteScreen(props){

  const [school, setSchool] = useState('');
  const [time, setTime] = useState('');
  const [route, setRoute] = useState(null);
  const [schoolOpen, setSchoolOpen] = useState(false);
  const [timeOpen, setTimeOpen] = useState(false);
  const [routeOpen, setRouteOpen] = useState(false);
  const [schoolItems, setSchoolItems] = useState([
    { label: 'WOS', value: 'WOS' },
    { label: 'CLE', value: 'CLE' },
    { label: 'SOMS', value: 'SOMS' },
    { label: 'TZHS', value: 'TZHS' },
  ]);
  const [routeItems, setRouteItems] = useState([
    { label: 'Orangeburg', value: 'Orangeburg' },
    { label: 'Blauvelt', value: 'Blauvelt' },
    { label: 'Tappan', value: 'Tappan' },
    { label: 'Sparkill', value: 'Sparkill' },
  ]);

  const navigation = useNavigation();

  const toggleTime = (selectedTime) => {
    setTime(time === selectedTime ? '' : selectedTime);
  };

  const allSelected = school && time && route;

  useEffect(() => {
    StatusBar.setBackgroundColor('#6750a4');
    StatusBar.setBarStyle('light-content');
  }, []);

  // Animation values
  const morningScaleAnim = useRef(new Animated.Value(1)).current;
  const afternoonScaleAnim = useRef(new Animated.Value(1)).current;

  const animateButtonPress = (scaleAnim) => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#6750a4" barStyle="light-content" />
      <View style={[styles.topbox, styles.timeBox, { zIndex: 3000 }]}>
        <Text style={styles.title}>Select time</Text>
        <View style={styles.buttonContainer}>
          <Pressable 
            style={[styles.schoolButton, time === 'Morning' && styles.selectedButton]} 
            onPress={() => {
              animateButtonPress(morningScaleAnim);
              toggleTime('Morning');
            }}
          >
            <Animated.View style={{ transform: [{ scale: morningScaleAnim }] }}>
              <Text style={styles.buttonText}>Morning</Text>
            </Animated.View>
          </Pressable>
          <Pressable 
            style={[styles.schoolButton, time === 'Afternoon' && styles.selectedButton]} 
            onPress={() => {
              animateButtonPress(afternoonScaleAnim);
              toggleTime('Afternoon');
            }}
          >
            <Animated.View style={{ transform: [{ scale: afternoonScaleAnim }] }}>
              <Text style={styles.buttonText}>Afternoon</Text>
            </Animated.View>
          </Pressable>
        </View>
      </View>

      <View style={[styles.topbox, styles.schoolBox, { zIndex: 2000 }]}>
        <Text style={styles.title}>Select your school</Text>
        <DropDownPicker
          open={schoolOpen}
          value={school}
          items={schoolItems}
          setOpen={setSchoolOpen}
          setValue={setSchool}
          setItems={setSchoolItems}
          style={[styles.dropdown, school ? styles.selectedDropdown : styles.unselectedDropdown]}
          dropDownContainerStyle={styles.dropdownContainer}
        />
      </View>

      <View style={[styles.topbox, styles.routeBox, { zIndex: 1000 }]}>
        <Text style={styles.title}>Select route</Text>
        <DropDownPicker
          open={routeOpen}
          value={route}
          items={routeItems}
          setOpen={setRouteOpen}
          setValue={setRoute}
          setItems={setRouteItems}
          style={[styles.dropdown, route ? styles.selectedDropdown : styles.unselectedDropdown]}
          dropDownContainerStyle={styles.dropdownContainer}
        />
      </View>

      <View style={styles.textContainer}>
        {allSelected ? (
          <View style={styles.squareContainer}>
            <View style={styles.textRow}>
              <View style={styles.textBlock}>
                <Image source={require('../assets/images/student icon.png')} style={styles.icon} />
                <Text style={styles.bodyText}>11/25</Text>
              </View>
              <View style={styles.textBlock}>
                <Image source={require('../assets/images/distance.png')} style={styles.icon} />
                <Text style={styles.bodyText}>6.3 miles</Text>
              </View>
            </View>
            <View style={styles.textRow}>
              <View style={styles.textBlock}>
                <Text style={styles.headingText}>Start</Text>
                <Text style={styles.bodyText}>7:26AM</Text>
              </View>
              <View style={styles.textBlock}>
                <Text style={styles.headingText}>Arrival</Text>
                <Text style={styles.bodyText}>8:07 AM</Text>
              </View>
            </View>
          </View>
        ) : (
          <Text style={styles.promptText}>Select a school, time, and route to view details.</Text>
        )}
      </View>

      <Pressable 
        style={styles.button} 
        onPress={() => navigation.navigate('Map')}
      >
        <Text style={styles.Btext}>Navigate</Text>
      </Pressable>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',

  },
  topbox: {
    width: width,
    top: 0,
    paddingVertical: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#86CCEB',

  },
  schoolBox: {
    
  },
  timeBox: {
    top: 0,
    
  },
  routeBox: {
    
    paddingBottom: 30,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15
  },
  title: {
    fontFamily: 'Helvetica',
    fontSize: 20,
    marginBottom: 8,
    fontWeight: 'bold',
    padding: 10,
    color: 'white',
    alignSelf: 'left',
    left: 20

  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  schoolButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderColor: '#54697A'
  },
  selectedButton: {
    backgroundColor: '#E2E2E2',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2b2b2b',
  },
  button: {
    position: 'absolute',
    bottom: 25,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 30,
    elevation: 3,
    width: 275,
    height: 50,
    backgroundColor: '#54697A',
  },
  Btext: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  textContainer: {
    width: '90%',
    marginTop: 20,
    alignItems: 'center',
    
  },
  promptText: {
    fontSize: 18,
    color: '#2b2b2b',
    textAlign: 'center',
  },
  squareContainer: {
    width: '100%',
    height: 250,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: 'space-between', // Distribute space between rows
  },
  textRow: {
    top: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,

    flex: 1, // Make rows take up equal space
  },
  textBlock: {
    alignItems: 'center',
    flex: 1, // Make blocks take up equal space
  },
  headingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2b2b2b',
  },
  bodyText: {
    fontSize: 20,
    top: 10,
    color: '#2b2b2b',
  },
  dropdown: {
    width: '90%',
    marginBottom: 20,
    left: 20,
    borderWidth: 0.5,
    borderColor: '#54697A'
  },
  selectedDropdown: {
    backgroundColor: '#E2E2E2'
  },
  unselectedDropdown: {
    backgroundColor: 'white'
  },
  dropdownContainer: {
    width: '90%',
    left: 20,
    borderWidth: 0.5,
    borderColor: '#54697A'
  },
  icon: {
    width: 50,
    height: 50,
    top: 5
  },
});

export default RouteScreen;
