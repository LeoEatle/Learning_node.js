
var events = require('events');
var eventEmitter = new events.EventEmitter();
//建立一个事件分发器
eventEmitter.on("someevent",function()
{
	console.log("someevent happened");
})

eventEmitter.on("sayhello",function()
{
	console.log("Hello World!");
})


eventEmitter.on("printfilename",function()
{
	setInterval(printfilename,2000);//注意这里的函数不能有括号，因为函数名被作为参数进行传递
	console.trace();
}) 

// eventEmitter.emit("someevent");
// eventEmitter.emit("sayhello");
eventEmitter.emit("printfilename");

//evnetEmitter.emit("sayhello");
function printfilename()
{
	console.log(__filename);//这里__filename是全局变量，输出文件绝对路径
}

//下面是学习js的原型复制
//js中不是普通的继承，他需要原型来定义可以继承的函数

var util = require('util'); 
function Base() { 
	this.name = 'base'; 
	this.base = 1991; 
	this.sayHello = function() { 
	console.log('Hello ' + this.name); 
	}; 
} 
Base.prototype.showName = function() { //这里就是用原型来定义需要继承的函数
	console.log(this.name);
}; 
function Sub() { 
	this.name = 'sub'; 
} 
util.inherits(Sub, Base); 
var objBase = new Base(); 
objBase.showName(); 
objBase.sayHello(); 
console.log(objBase); 
var objSub = new Sub(); 
objSub.showName(); //这个是通过原型定义的函数，就会被继承
//objSub.sayHello(); 
console.log(objSub); //这里只有name属性，其他在Base构造函数里定义的都没有

console.log(util.inspect(objSub,true));


//node.js文件系统
var filesystem = require("fs");

fs.readfile('input.txt', function(err, data)
{
	if(err){
		return console.log(err);
	}
	console.log("异步读取："+ data.toString());
})

console.log("文件读取完毕");





