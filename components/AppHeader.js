import React from 'react' ;
import { Appbar , Badge  } from 'react-native-paper' ;
import { StyleSheet,View  } from 'react-native' ;
import MICON from 'react-native-vector-icons/MaterialIcons'
import RootReducer from './rootReducer/RootReducer'
import { TouchableOpacity } from 'react-native-gesture-handler';
import {useDispatch , useSelector} from 'react-redux';


// react-native link 'react-native-vector-icons'

export default function AppHeader(props) {
    var cartitems = useSelector((state)=> state.cart);
    var length = Object.keys(cartitems).length

    const getBack =()=>{
        props.navigation.goBack();
    }

    return(
        <Appbar.Header style={{backgroundColor:'#008ECC'}}>
            <Appbar.BackAction onPress={getBack}  />
            <Appbar.Content title={"Ecom"} subtitle={"beta version"}  />
             {/* <Appbar.Action icon="cart"  onPress={()=>alert('actions called')} /> */}
            {/* <MICON name="shopping-cart" size={25} style={{margin:10}} color="#fff" onPress={()=>alert('actions called')}  />  */}
            <View>
                <MICON name="shopping-cart" size={30} color="#fff" onPress={()=>props.navigation.navigate("ShowCart")}/>

                <Badge  style={{ position: 'absolute', top: -10, left:-20 , fontWeight:'bold',fontSize:14,padding:1}}> {length} </Badge>

           </View>
        </Appbar.Header>
    )
}