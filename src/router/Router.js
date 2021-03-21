import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import SalesComponent from '../components/SalesComponent';
import BuyComponent from '../components/BuyComponent';
import {Image} from 'react-native';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const RooterComponent = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: '#E09224',
          style: {
            backgroundColor: '#461AAE',
          },
        }}>
        <Tab.Screen
          options={{
            tabBarLabel: 'Satış',
            tabBarIcon: () => (
              <Image
                style={{width: 18, height: 18, tintColor: '#000'}}
                source={require('../assets/S.png')}
                size={16}
              />
            ),
          }}
          name="Sales"
          component={SalesComponent}
        />

        <Tab.Screen
          options={{
            tabBarLabel: 'Alış',

            tabBarIcon: () => (
              <Image
                style={{width: 18, height: 18, tintColor: '#000'}}
                source={require('../assets/A.png')}
                size={16}
              />
            ),
          }}
          name="Buy"
          component={BuyComponent}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default RooterComponent;
