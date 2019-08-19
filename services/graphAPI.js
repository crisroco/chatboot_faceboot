require('dotenv').config();
const request = require('request');

exports.callSendAPI = (requestBody) => {
    const url = "https://graph.facebook.com/v3.3/me/messages";
    request(
        {
            uri:url,
            qs:{
                access_token:process.env.ACCESS_TOKEN,
            },
            method:'POST',
            json: requestBody
        },(error, body) => {
            // if(!error){
            //     console.log("Peticion ok",body);
            // }else{
            //     console.error("Peticion fail",error);
            // }
        }
    );
}

exports.getProfile = (senderID) => {
    const url = 'https://graph.facebook.com/v3.3/'+senderID ;
    request(
        {
            uri:url,
            qs:{
                access_token:process.env.ACCESS_TOKEN,
                fields: "first_name,last_name,gender,locale,timezone",
            },
            method:"GET",
        },(error,_res,body)=>{
            let response = JSON.parse(body);
            //console.log(response);
            console.log('Nombre: '+response.first_name+' Apellido: '+response.last_name);
        }
    );
}