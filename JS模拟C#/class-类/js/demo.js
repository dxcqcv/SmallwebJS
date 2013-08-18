/*
	模拟类，遵守一个约定，首字母大写
*/

//这些定义，都是可以公共访问的，在实例后。
function Class1(){
	//可以这样定义属性
	this.name = '的';
}
//可以这样定义方法
Class1.prototype.getItem = function(){
	console.log(this.name);
}
//静态的方法，不管实例不是实例，任何地方都可以访问它。包括属性，也是一样。
Class1.setItem = function(){

}
Class1.Names = '2';

//这些定义都是局限在此类中才能访问的属性和方法，统称为私有属性和方法
function Class2(){
	//定义私有的属性和方法，只能在这个类中访问
	var CreatePri = (function(){
		var POOP = {
			NAME:'2'
		}
		var init = {
			getItem:function(name){
				return  POOP[name]
			}
		}
		return init;
	})();

	var _init = CreatePri;
	console.log(_init.getItem('NAME'));

	//当然，也可以定义一些特权方法，所谓特权方法，就是可以在外部访问你定义的私有属性或方法，可以设置一个权限问题。
	//现在设置一个getItem来供外部访问私有的方法getItem。
	this.getItem = _init.getItem;
}
var h = new Class2();
var _n = h.getItem('NAME');
console.log(_n);

//尝试一下第三种定义，JS独有的prototype原型链来模拟类
function Class3(){
	//constructor属性，是很有用的，能正确的把指引，指向正确的类中。当然如果这样名字太长了，可以使用下call之类的吧。
	this.constructor = Class3;

	//公共的属性
	this.name = '4';
}
Class3.prototype.CreatePri = {
	NAME:'4',
	SEEUI:'6'
}
//不仅实例出了，在g的prototype中也添加了这些属性，一直链下去。
var g = new Class3();
console.log(g);