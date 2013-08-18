/*
		接口名：Cominterface
		接口方法：add
		接口方法：addition
		接口方法：ache
*/
(function(){
	//存储已知道的接口名字与方法
	var pass = new interface.Inter('Cominterface',['add','addition','ache']);
	//adds类
	function adds(){
		//实现接口
		var _interface = new interface.Cominterface()
		_interface.add = function(){
			console.log('a')
		}
		_interface.addition = function(){

		}
		_interface.ache = function(){

		}
		//检查接口实现
		interface.Inter.Implements(_interface,pass,'adds');
	}
	var h = new adds()
	//kill类
	function  kill(){
		var _interface = new interface.Cominterface()
		_interface.add = function(){
			//console.log('b')
		}
		_interface.addition = function(){

		}
		_interface.ache = function(){

		}
		this.d = _interface.add;
		interface.Inter.Implements(_interface,pass,'kill');
	}
	var j = new kill()
	j.d()
})()