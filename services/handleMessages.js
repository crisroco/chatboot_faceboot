const actions = require("./actions");
/**
 * validar el tipo de mensaje que envia el usuario
 */
exports.handleMessage = (webhookEvent) =>{
    if(webhookEvent.message){
        let mensaje = webhookEvent.message;        
        if (mensaje.quick_reply) {
            handleQuickReplies(webhookEvent);
        }else if(mensaje.attachments){
            actions.stores(webhookEvent);
            //console.log('envio un adjunto');
        }else if(mensaje.text){
            //console.log('envio un texto');
            //actions.sendTextMessage('Has enviado texto', webhookEvent);
            handleNLP(webhookEvent);
        }
    }else if(webhookEvent.postback){
        handlePostback(webhookEvent);
    }    

}

/** 
 * captura los clic en las ipciones del menú
 */
handlePostback = (webhookEvent) =>{
    let evento = webhookEvent.postback.payload;
    
    switch (evento) {
        case 'encuestas':
            console.log("oprimio encuestas");
            actions.quickReplies(webhookEvent);
            break;
        
        case 'sucursales':                
            handleLocation(webhookEvent);
            break;    
        
        case 'inicio':
            actions.sendTextMessage("Bienvenido al chatboot",webhookEvent);
            break;    

        default:
            break;
    }
}

/**
 * captura los clic en las respuestas de la encuesta
 */
handleQuickReplies = (webhookEvent) => {
    let reply = webhookEvent.message.quick_reply.payload;

    const response = {
        texto:"¿Nos recomendarias?",
        replies: [
            {
                content_type:"text",
                title:"Sí",
                payload:"si_recomienda"
            },
            {
                content_type:"text",
                title:"No",
                payload:"no_recomienda"
            },
        ]        
    }

    if (reply == 'rapidez' || reply == 'rapidez' || reply == 'servicio') {
        actions.quickReplies(webhookEvent,response);
    }else{
        actions.sendTextMessage("Gracias por responde", webhookEvent);
    }
}

handleLocation = (webhookEvent) => {
    const replyLocation = {
        texto: "Por favor compartenos tu ubicacion",
        replies: [
            {
                content_type:"user_phone_number"
            }
        ]
    };

    actions.quickReplies(webhookEvent,replyLocation);
}

/**
 * Manejar la respuesta de wit.ai para responder
 */
handleNLP = (webhookEvent) =>{
    let nlp = webhookEvent.message.nlp;
    console.log(nlp.entities.mensaje);
     if(nlp.entities.mensaje){
         if (nlp.entities.mensaje[0].value === "pagos") {
             actions.sendTextMessage("Puedes realizar los pagos en los bancos BCP, scotiabank o por l aplicacion LUCIA.",webhookEvent);
         }else{
            actions.sendTextMessage("No entiendo tu pregunta :(",webhookEvent);
         }
     }
};