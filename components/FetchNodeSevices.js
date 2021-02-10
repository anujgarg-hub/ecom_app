// var axios = require('axios');
const ServerURL = "http://192.168.1.4:5000" 

const getData = async(url)=>{
    try{
    const response = await fetch(`${ServerURL}/${url}`)
    const result = await response.json();

    if(result=='Session Expired Pls Login Again')
    {
        alert(result)
        return([])
    }
    else
    { 
    return result ;
    }
}

    catch(err){
        console.log(err)
        return null 
    }

}




//  post Data

const postData = async(url,body)=>{
    try{
    const response = await fetch(`${ServerURL}/${url}` ,
    {method: "POST" , mode : "cors" ,
    headers : {"Content-Type":"application/json;charset=utf-8"},
    body : JSON.stringify(body)

})
    const result = await response.json()
    if(result=='Session Expired Pls Login Again')
    {
       alert(result)
       return([])
    }

    else
    {
    return result ;
    }
}

catch(err){
    console.log(err)
    return null

}
}


// post data and image

// const postDataAndImage =    async(url,formData,config)=>{
// try{
//       var response=await axios.post(`${ServerURL}/${url}`,formData,config)    
//       if(response.data=='Session Expired Pls Login Again')
//       {
//         alert(response.data)
//         return(false)
//       }

//       else
//       {
//          const result =await response.data.RESULT  // RESULT Is variable name, which will be sent from node 
//          return result 
//       }

// }
// catch(e){
//     console.log(e)
//     return null

// }

// }

export {getData , postData, ServerURL}



