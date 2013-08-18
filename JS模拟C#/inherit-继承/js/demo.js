/*
	模拟继承
*/

/*
	方式一
*/
function Class1(){
	this.name = '2';
	this.getItem = function(){
		console.log(this.name);
	}
}
Class1.prototype.setItem = function(){

}
function Class2(){
	Class1.call(this);
	/*
		复制到this上 通过下面两个打印可以看出
	*/
	console.log(this)
	console.log(Class2.prototype)
}
var h = new Class2();
console.log(h)
h.getItem();

/*
	方式二
*/
function Class3(){
	this.name = '3';
}
Class3.prototype.getItem = function(){
	console.log(this.name);
}
function Class4(){
	/*
		通过这里的打印，我们可以看出，prototype的继承，会对类的this，prototype两项上都继承了。
	*/
	console.log(this);
	console.log(Class4.prototype)
}
Class4.prototype = new Class3;
var g = new Class4();
g.getItem()

/*
	方式三
*/

var Class5 = (function(){
	var init = {
		name:'5',
		getItem:function(){
			console.log(init.name);
		}
	}
	return init;
})();
function Class6(){
	/*
		这种方式，在Class5中，最好不要用this了。因为实例Class6后，Class5的this就切到Class6上了。
		把你需要继承的Class5，在Class6内部引用。
	*/
	var _class = Class5;
	console.log(_class);
	this.getItem = _class.getItem;
}
var k = new Class6();
console.log(k);
k.getItem();
