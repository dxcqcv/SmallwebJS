/*
*	模拟重载
	主要是利用了函数覆盖的思想，来重载你所需要的东西。假设，在函数内部已经添加了change事件。
	定义了一个在外部可以调用的方法，来提供覆盖在函数内部的change事件
*/
function ChangeSelect(){
	var arg = [];
	var action = {};
	for(var i = 0,len = arguments.length;i<len;i++){
		arg.push(arguments[i])
	}
	var module = {
		cont:null,
		select:null
	};
	var _init = {
		_create:function(){
			if(typeof arg[0] === 'string'){
				module.cont = document.getElementById(arg[0]);
			}
			var str = '';
				str += '<select id="sel_'+arg[0]+'">',
				str += '<option value="你好">你好</option><option value="我好">我好</option>',
				str += '</select>';
			module.cont.innerHTML = str;
			var _id = 'sel_'+arg[0];
			module.select = document.getElementById(_id);
		}
	}
	_init._create();
	this._module = module;
	module.select.onchange = function(){
		console.log('a')
	}
}
ChangeSelect.prototype.overLoadingChangeEvent = function(fn){
	if(typeof fn === 'function'){
		fn.call(this,this._module);
	}
}
