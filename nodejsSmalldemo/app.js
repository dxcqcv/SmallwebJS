//服务器模块
var server = require('./server/server');
//路由模块
var router = require('./router/router');
//启动HTTP服务器
server.start(router.rout);