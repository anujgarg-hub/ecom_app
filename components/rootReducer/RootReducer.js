initialState={
    cart:{}
}


export default function RootReducer(state=initialState , action)
{
    switch(action.type)
    {
        case 'Add_Data' :
         state.cart[action.payload[0]] = action.payload[1]   
        //  console.log('add',state.cart)
         return {cart :state.cart}

         case 'Remove_item' :
           delete state.cart[action.payload[0]]   
            // console.log('delete',state.cart)
            return {cart :state.cart}
   

         default:
            return state
    }
}