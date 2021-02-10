/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState,useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native'
import Listproducts from './components/Listproducts'
import ProjectStack from './components/ProjectStack'

import {createStore} from 'redux'
import {Provider} from 'react-redux'
import RootReducer from './components/rootReducer/RootReducer'

import {
  View, 
} from 'react-native';

const store = createStore(RootReducer)

export default function App (){
  
  return (   
    <Provider store={store}>
    <NavigationContainer>    

      <ProjectStack />
     
    </NavigationContainer>  
    </Provider> 
  );
}; 



