/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Button,
  StatusBar,
} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {DrawerContent} from './DrawerContent';
//import { FontFamily } from '../config/FontFamily';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FAIcon from 'react-native-vector-icons/FontAwesome';
const Drawer = createDrawerNavigator();
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  HBoxes: {
    backgroundColor: '#FFF',
    shadowColor: '#000',
    elevation: 8,
    padding: 10,
  },
});
/*
function DrawerContent() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Drawer content</Text>,
    </View>
  );
}
*/
function HomeScreen(navigation) {
  try {
    console.log(navigation.route.params.item, 'homePageeeeeeeeeeeeeeeeeeeeeee');
  } catch (e) {
    console.log('error', e);
  }
  return (
    <View>
      {/* <StatusBar translucent backgroundColor="transparent" /> */}

      <View
        style={{
          ...styles.HBoxes,
          flexDirection: 'row',
          paddingTop: StatusBar.currentHeight,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.openDrawer();
          }}>
          <Icon name={'menu'} size={24} color="#000" />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 24,
            textAlign: 'center',
            color: '#000',
            //fontFamily: FontFamily.regular,
          }}>
          Dashboard
        </Text>
        <TouchableOpacity
          onPress={() => {
            alert('You Notification!');
          }}>
          <FAIcon style={{color: '#000'}} name="bell" size={24} />
        </TouchableOpacity>
      </View>

      <View
        style={{
          marginTop: 300,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('Article')}>
          <Text>Home Screen</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
function Article({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

export const RootNavigator = (props) => {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Article" component={Article} />
    </Drawer.Navigator>
  );
};
