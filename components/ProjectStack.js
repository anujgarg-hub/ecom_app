import React, { useState,useEffect } from 'react';
import {View} from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import Listproducts from './Listproducts'
import Showproduct from './Showproduct'
import AppHeader from './AppHeader'
import ShowCart from './ShowCart'
import Home from './Home'


export default function ProjectStack (props){

    const StackNav = createStackNavigator();

return(  
   

    <StackNav.Navigator  initialRouteName="Listproducts">
    
        <StackNav.Screen name="Listproducts" component={Listproducts} options={{header:AppHeader}} />
        <StackNav.Screen name="Showproduct" component={Showproduct} options={{header:AppHeader}} />
        <StackNav.Screen name="ShowCart" component={ShowCart} options={{header:AppHeader}} />
        <StackNav.Screen name="Home" component={Home} />
    
    </StackNav.Navigator>

   
)
}