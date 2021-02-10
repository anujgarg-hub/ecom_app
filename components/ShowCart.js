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
import { Divider } from 'react-native-paper';
import {getData,postData,ServerURL} from './FetchNodeSevices';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {useDispatch , useSelector} from 'react-redux';
import InputSpinner from "react-native-input-spinner"



const {width , height } = Dimensions.get('window');

export default function ShowCart (props){

    var cart = useSelector(state=>state.cart)
    var length = Object.keys(cart).length
    var cartitems = Object.values(cart)

  // const [getList , setList] = useState(cartitems) ;

  const [refresh,setrefresh] = useState(false)

  const dispatch = useDispatch();
 

  var total = cartitems.reduce(totaling , 0) ;

  function totaling(a , b){
    var price = b.offerprice==0 ? (b.price*b.qtydemand) : (b.offerprice*b.qtydemand);
    return a + price ;
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

    const handleQtyChange=(value)=>{
      if(value==0){

       item['qtydemand'] = value ;
       dispatch({type:'Remove_item',payload:[item.productid , item]})
       setrefresh(!refresh)
       props.navigation.setParams({x:''});

      }
      else
      {
        item['qtydemand'] = value ;
        dispatch({type:'Add_Data',payload:[item.productid , item]})
        setrefresh(!refresh)
        props.navigation.setParams({x:''});
      } 
    }

   
    return(
      <TouchableOpacity  >
   
      <View style={{display:'flex' ,flexDirection:'row',justifyContent:'space-between',backgroundColor:'#fff',padding:20,width:width}}>   
       
       <Image
        style={styles.imageView}
        source={{ 
          uri: ServerURL+'/images/'+item.picture ,
        }}
      />

<View >
       
        <Text style={{fontSize:24 }}>
          {item.productname}
          </Text>
          

           <Text style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid',padding:1}}>
             &#8377; {item.price}
            </Text>

            <Text>
            &#8377; {actualPrice}
            </Text>

            <Text style={{color:'green',fontWeight:'bold',padding:1}}>
               You Save &#8377; {save}
            </Text>
            <View >
            {item.stock==0 ? <Text style={{fontSize:18 ,color:'green',padding:5}}>Not Available ({item.stock})</Text> : item.stock>=1 && item.stock<=3 ? <Text style={{fontSize:18 ,color:'green'}}>Limited Stock ({item.stock})</Text> : <Text style={{fontSize:18 ,color:'green'}}>Stock Available ({item.stock})</Text>}
          </View>

          <Text style={{alignSelf:'center',marginVertical:20}}>
      <InputSpinner
	                 max={10}
                   min={0}
                   step={1}
                 	colorMax={"#40c5f4"}
                  colorMin={"#40c5f4"}
                  color={'#40c5f4'}               
                	value={item.qtydemand}
                	onChange={(num) =>  handleQtyChange(num)} 
            />
            </Text>


  </View> 

     </View>
     <Divider />

   </TouchableOpacity>    
  )}

  return (   
   <>

      <View>
          <Text style={{fontSize:20,padding:8}}>Subtotal({length} items):  <Text style={{color:'red',fontSize:20}}>&#8733;{total}</Text></Text>           
     </View>

      <TouchableOpacity >
          <View
            style={{width:width*0.98,
                    backgroundColor:'#f39c12',
                    padding:20,
                    alignSelf:'center',
                    borderWidth:0.5,
                    borderColor:'#000',
                    borderRadius:5,
                    margin:10
                    }}
          >            
           <Text style={{textAlign:'center',
           fontSize:24,color:'#fff',
           fontWeight:'bold',
          }}
           > Proceed To Pay
            </Text>
          </View>
      </TouchableOpacity>

    <View style={styles.root}>    
    <FlatList
        data={cartitems}
        renderItem={renderItem}
        keyExtractor={item => item.productid.toString()}
        
      />
      </View>   
   </>
  );
}; 

const styles = StyleSheet.create({

  root : {
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    marginTop:10,
    // backgroundColor:'#fff'

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


