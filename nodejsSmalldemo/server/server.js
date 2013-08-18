/*
	服务器模块
*/
var http = require('http');
var url = require('url');
var start = function(rout){
	var onRequest = function(request,response){
		var pathName = url.parse(request.url).pathname;
		rout(pathName);
		response.writeHead(200, {"Content-Type": "text/plain"});
		response.write('Hello World');
		response.end();
	}
	http.createServer(onRequest).listen(8083);
}
exports.start = start;