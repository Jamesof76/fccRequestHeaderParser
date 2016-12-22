var express = require('express');
const os = require('os');
const dns = require('dns');
const socket = require('net');
var router = express.Router();
var http = require('http');


var acceptLanguage = require('accept-language'); //https://www.npmjs.com/package/accept-language


var theIP = "";
http.get({'host': 'api.ipify.org', 'port': 80, 'path': '/'}, function(res) {
	res.on('data', function(ip){
		theIP = ip;
	});
}); // https://www.ipify.org/

/* GET home page. */
router.get('/', function(req, res, next) {
  //theIP = req.header('x-forwarded-for') || req.connection.remoteAddress;
  var reOS1 = req.headers['user-agent']; //http://stackoverflow.com/questions/6163350/server-side-browser-detection-node-js
  reOS2 = reOS1.substring(reOS1.indexOf("(") + 1, reOS1.indexOf(")")); 
  res.render('index', { title: 'Request Header Parser', ip: theIP, language: retLang(), os: reOS2});
});


var retLang = function(){
	acceptLanguage.languages(['en-US', 'zh-CN']);
	return acceptLanguage.get();
	
}

var retOS = function(){
	var netInt = os.networkInterfaces();
	return os.type().toString() + " " + os.release().toString() + "; " + os.platform().toString() + "; " + Object.keys(Object.keys(netInt)[1][0][0][0]).toString(); //nodejs.org
}




var retIP = function(){
	
	var thisIp = dns.getServers();
	return thisIp[1].toString();
}

module.exports = router;

