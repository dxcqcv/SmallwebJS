/*
	模拟命名空间
	在游览器环境下，全局是window对象，所以，为了模拟到命名空间的概念，必须要使用window对象
	// (function(window,undefined){
	// 		window.System = {};
	// })(window);
*/

(function(window,undefined){
	if(window.System){
		//检测一下，如果有冲突，抛出一个错误信息
		throw new Error('命名空间有冲突');
	}
	if(!window.System){
		window.System = {}
	}
	var Sys = window.System;
	Sys.Web = {

	}
	Sys.Object = {

	}
	console.log(Sys);
	//这样就能在window对象下，看见System这个‘全局命名空间’了
})(window);

