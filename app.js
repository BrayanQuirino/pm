var d3= require('d3')
var fs = require('fs');
const https =require('https');
const path = require('path');
let express = require('express'),
  port = 443,
  app = express();
const httpsOptions ={
	cert:fs.readFileSync("/etc/letsencrypt/live/cndiserv.cultura.gob.mx/fullchain.pem"),
	key:fs.readFileSync("/etc/letsencrypt/live/cndiserv.cultura.gob.mx/privkey.pem")
}
app.use('/public', express.static('public'));
//app.use('/mapprueba', express.static('public'))
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname+'/public/map/index.html'));
});
app.listen(8180);
https.createServer(httpsOptions,app).listen(port,function(){
	console.log(`Serving the client directory at https:vmonet:${port}`);	
})
console.log('Server ready on port ' + port);
