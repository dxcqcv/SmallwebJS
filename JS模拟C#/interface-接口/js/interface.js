/*
		接口名：Cominterface
		接口方法：add {function}
		接口方法：addition {function}
		接口方法：ache {function}
*/
(function(window,undefined){
	if(!window.interface){
		window.interface = {
			Cominterface:function(){
				this.add = null;
				this.addition = null;
				this.ache = null;
			}
		}
	}
	interface.Inter = function(name,methods){
		if(arguments.length !== 2){
			console.log('抛出一个错误：参数传入的大于2')
		}
		this.name = name;
		this.methods = [];
		for(var i = 0,len = methods.length;i<len;i++){
			if(typeof methods[i] !== 'string'){
				console.log('抛出一个错误：需要string类型')
			}
			this.methods.push(methods[i])
		}
	}
	interface.Inter.Implements  = function(object,interface,name){
		var _objetc = [];
		var _attr = []
		var _name = '';
		for(var h in object){
			_objetc.push(object[h])
			_attr.push(h)
		}
		for(var i = 0,len = interface.methods.length;i<len;i++){
			if(_attr.length > interface.methods.length && _attr[_attr.length-1] !== interface.methods[interface.methods.length-1]){
				throw new Error('实现的方法定义多了');
			}
			if(typeof _objetc[i] !== 'function'){
				if(_name !== undefined){
					_name = name + '类中的';
				}
				throw new Error(_name+interface.methods[i]+'方法没有实现');
			}
			
		}
	}
})(window)