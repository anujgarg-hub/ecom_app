import React, { useState,useEffect } from 'react';
import {
    StyleSheet, View,Text , Dimensions , Image , Button
}from 'react-native'
import {getData,postData,ServerURL} from './FetchNodeSevices';
import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
  } from 'react-native/Libraries/NewAppScreen';
import Carousel,{ Pagination } from 'react-native-snap-carousel' 
import InputSpinner from "react-native-input-spinner"
import { TouchableOpacity } from 'react-native-gesture-handler';
import {useDispatch , useSelector} from 'react-redux';
  

const {width , height } = Dimensions.get('window');


export default function Showproduct(props){
        // console.log(props.route.params)
        const dispatch = useDispatch();

        var item = props.route.params.item ;

        const [qty,setQty] = useState(1)

        const [getProductPictureList,setProductPictureList] = useState([])
        const [activeslide , setslide] = useState(0);

        useEffect(function(){
          fetchProductPictures();
        },[])

        const fetchProductPictures=async()=>{

          let body = {'productid' :item.productid}
          var list = await postData('productpicture/displaybyproductid',body)
          setProductPictureList(list)
        }




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

        const addToCartItems=()=>{
               item['qtydemand'] =qty ;
               dispatch({type:'Add_Data',payload:[item.productid , item]})
               props.navigation.setParams({x:''});  //// it updates navigation(project stack).
        }

        const renderItem=({item , index})=>{
          return(
            <View
              style={{
                display:'flex',
                alignItems:'center',
                justifyContent:'center'
              }}
            >

                <Image
                  // source={{uri:`${ServerURL}images/${item.productpicture}`}}
                  source={{
                    uri:ServerURL+'/images/'+item.productpicture
                  }}

                  style={{
                    marginTop:15,
                    width:width*0.35,
                    height:height*0.15,
                    resizeMode:'contain'
                  }}
                />

            </View>
          )
        }


    return(
       <View style={styles.root}>
              <View style={{display:'flex' ,flexDirection:'column',justifyContent:'space-between',backgroundColor:'#fff',margin:1,padding:10,width:width,height:'auto'}}>   
       <Text>
      <View style={{display:'flex',alignItems:'center',justifyContent:'center',borderWidth:0.5}}> 
       
        {/* <Image
        style={styles.imageView}
        source={{ 
          uri: ServerURL+'/images/'+item.picture ,
        }}
      />  */}

       <Carousel
                layout={"default"}
                data={getProductPictureList}
                sliderWidth={width*1}
                itemWidth={width*0.9}
                renderItem={renderItem}
                onSnapToItem={(index)=>setslide(index)}
                autoplay={true}
                loop={true}

                />

                  <Pagination
                  dotsLength={getProductPictureList.length}
                  activeDotIndex={activeslide}
                  dotStyle={{
                    width:15,
                    height:15,
                    borderRadius:7.5,
                   }}

                   inactiveDotStyle={{
                     // Defines styles for inactiive dots here..
                   }}

                   inactivateDotOpacity={0.2}
                   inactiveDotScale={0.5}
                   />
       
      </View>
      </Text>

<View> 
        <Text style={{marginTop:20,fontWeight:'bold',fontSize:24}}>
             {item.productname}
        </Text>

    <View style={{display:'flex',flexDirection:'row',padding:5}}>
           <Text style={{fontSize:20,padding:5}}>
             M.R.P. 
            </Text>
            <Text style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid',fontSize:20,padding:5}}>
             &nbsp; &#8377; {item.price}
            </Text>

            <Text style={{fontSize:20,padding:5}}>
              &nbsp;   Price &#8377; {actualPrice}
            </Text>
    </View>
           <View style={{display:'flex' , flexDirection:'row',padding:5}}>
               <Text style={{color:'green',fontWeight:'bold',fontSize:18,padding:5}}>
                 You Save &#8377; {save}
              </Text>
               <Text style={{fontSize:18,padding:5}} numberOfLines={1}>
                &nbsp; &nbsp; &nbsp;&nbsp; inclusive of all taxes
               </Text>
           </View>

          <View style={{ padding:5}}>
            {item.stock==0 ? <Text style={{fontSize:18 ,color:'green',padding:5}}>Not Available ({item.stock})</Text> : item.stock>=1 && item.stock<=3 ? <Text style={{fontSize:18 ,color:'green',padding:5}}>Limited Stock ({item.stock})</Text> : <Text style={{fontSize:18 ,color:'green',padding:5}}>Stock Available ({item.stock})</Text>}
          </View>
          
          <Text style={{alignSelf:'center',marginVertical:20}}>
      <InputSpinner
	                 max={10}
                   min={1}
                   step={1}
                 	colorMax={"#40c5f4"}
                  colorMin={"#40c5f4"}
                  color={'#40c5f4'}               
                	value={qty}
                	onChange={(num) =>setQty(num)}
            />
            </Text>

          
      </View> 

    </View>       
           <View
                style={{
                  position:'absolute',
                  bottom:0,
                  width,                  
                }}
              >
                  <TouchableOpacity
                    style={{backgroundColor:'#B53471',padding:20}}
                    onPress={()=>addToCartItems()}
                  >

                    <Text style={{color:"#fff",fontSize:16,fontWeight:'bold',textAlign:'center'}}>
                      Add To Cart
                    </Text>

                 </TouchableOpacity>
                                 
            </View>
  </View>
    )
}

const styles = StyleSheet.create({

    root : {
      flex:1,
      backgroundColor:'#fff'
      // alignItems:'center',
      // justifyContent:'center'
  
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
      // display:'flex',
      alignItems:'center',
      padding:15,width:width*0.97,
      // height:height*0.16,
      margin:5,backgroundColor:'#FFF',
      borderColor:'grey'
    },
  
    allView:{
      flex:1,
      flexDirection:'row'
    },
  
    imageView:{
      width:width*0.40,
      height:height*0.25,
      resizeMode:'contain' /// jo size diya hai ,usi me image adjust ho jayegi.
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
  