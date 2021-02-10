/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState,useEffect } from 'react';
import {
  
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,FlatList,Image,Dimensions, TouchableOpacity
} from 'react-native';
import {getData,postData,ServerURL} from './FetchNodeSevices';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const {width , height } = Dimensions.get('window');

export default function Listproducts (props){

  const [getList , setList] = useState([]) ;

  useEffect(()=>{ 
   fetchData()
  //  alert(getList.productname)
  },[])


  const fetchData=async()=>{
   var result = await getData('product/displayAll')
    setList(result)
  }
 

  const renderItem = ({item}) => {
    var actualPrice = ""
    var save = ""
    var price = ""

    if(item.offerprice==0){
      actualPrice = item.price
      save = 0
      price = item.price
    }

    else
    {
      actualPrice = item.offerprice
      save = item.price - item.offerprice
    }



    return(
      <TouchableOpacity onPress={()=>props.navigation.navigate("Showproduct" , {item:item})} >
   
      <View style={{display:'flex' ,flexDirection:'row',justifyContent:'space-between',backgroundColor:'#fff',margin:10,padding:20,width:width*0.95,height:height*0.25,borderWidth:0.5}}>   
       
       <Image
        style={styles.imageView}
        source={{ 
          uri: ServerURL+'/images/'+item.picture ,
        }}
      />

<View>
        <Text>{item.productname}</Text>

           <Text style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid'}}>
              {item.price}
            </Text>

            <Text>
              {actualPrice}
            </Text>

            <Text style={{color:'green',fontWeight:'bold'}}>
               You Save &#8377; {save}
            </Text>
  </View>
     </View>
   </TouchableOpacity>    
  )}

  return (   
    <View style={styles.root}>
     
    <FlatList
        data={getList}
        renderItem={renderItem}
        keyExtractor={item => item.productid.toString()}
        
      />
      </View>   
  );
}; 

const styles = StyleSheet.create({

  root : {
    display:'flex',
    alignItems:'center',
    justifyContent:'center'

  },

  mainView :{    
    display : 'flex',
    alignItems:'center',
    margin:10,
    backgroundColor:'#1abc9c',
    padding:20
  },

  productView : {
    fontWeight:'bold',
    fontSize:30,
    color:'#e74c3c',
    fontStyle:'italic'
  },

  itemView : {
    display:'flex',alignItems:'center',
    padding:15,width:width*0.97,
    height:height*0.16,margin:5,backgroundColor:'#FFF',
    borderColor:'grey'
  },

  allView:{
    flex:1,
    flexDirection:'row'
  },

  imageView:{
    width:width*0.25,
    height:height*0.15,
    resizeMode:'contain'
    // marginRight:70,
    // marginLeft:0
  },


  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});


