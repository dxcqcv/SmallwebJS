/*
	模拟常量，即不可改变其值的变量
*/
/*
	@方式一
*/
function Const(){
	//定义不可改变的变量
	var constVar = {
		NUMBERO:1,
		NUMBERT:2
	}
	//定义取值的方法
	this.getItem = function(name){
		return constVar[name];
	}
}
var h = new Const();
console.log(h)
console.log(h.getItem('NUMBERO'));
console.log(h.getItem('NUMBERT'));

/*
	@方式二
*/
var Const_T = (function(){
	var Const = {
		NUMBERO:1,
		NUMBERT:2
	}
	var init = {
		getItem:function(name){
			return Const[name];
		}
	}
	return init;
})(); 
console.log(Const_T.getItem('NUMBERO'));
console.log(Const_T.getItem('NUMBERT'));