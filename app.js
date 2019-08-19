const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const actions = require("./services/actions");
const handle = require("./services/handleMessages");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.set('port', process.env.PORT);

app.listen(app.get('port'),()=>{
	console.log('servidor iniciado en el puerto ' + process.env.PORT);
});

/**	
 * Metodo para conexion con FB
 */
app.get('/webhook',(req,res)=>{

	//valores que se tomaran cuando FB llame a nuestra API
	const mode = req.query['hub.mode'];
	const challenge = req.query['hub.challenge'];
	const token = req.query['hub.verify_token'];
	// console.log(mode);
	// console.log(challenge);
	// console.log(token);
	res.status(200).send(challenge);
	if(mode && token){
		if(mode == 'subscribe' && toke == process.env.VERIFYTOKEN){
			console.log('coneccion con fb ok');
			res.status(200).send(challenge);
		}else{
			res.status(403);
		}
	}

});

/**	
 * Recibir los mensajes enviados desde FB
 */
app.post('/webhook',(req,res)=>{
	const body = req.body;
	if(body.object === 'page'){
		res.status(200).send('EVENT_RECEIVED');
		body.entry.forEach(function(entry){
			let webhookEvent = entry.messaging[0];
			//console.log(JSON.stringify(webhookEvent));
			handle.handleMessage(webhookEvent);			
		});
	}else{
		res.sendStatus(404);
	}

});
app.get('/',(req,res)=>{
	res.send('Server up');
});