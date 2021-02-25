import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Input } from 'react-native-elements'
import { FontAwesome } from '@expo/vector-icons';
import {provider, Provider} from 'react-redux';
import {createStore, combineReducers} from 'redux'

import image from './reducers/url.reducer';

import Home from './components/Home'
import Gallery from './components/Gallery'
import Picture from './components/Picture'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const store = createStore(combineReducers( {image}) )

function TabButton() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;
          if (route.name === 'Gallery') {
            iconName = 'picture-o';
          } else if (route.name === 'Picture') {
            iconName = 'camera';
          } 
        return <FontAwesome name={iconName} size={25} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: '#14978A',
      inactiveTintColor: 'white',
      style: {
        backgroundColor: '#111323',
      }
    }}
    >
      <Tab.Screen name="Gallery" component={Gallery} />
      <Tab.Screen name="Picture" component={Picture} />
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer style={styles.container}>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="TabButton" component={TabButton} />
        </Stack.Navigator>
      </NavigationContainer>
     </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
