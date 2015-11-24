var express = require("express");
var app = express();
var fs = require("fs");


//获得用户列表路由器设置
app.get("/listUsers", function(req,res)
{
	fs.readFile(
		__dirname + "/" + "user.json", "utf-8",function(err,data)
		{
			console.log(data);
			res.end(data);
		}
	)
})

//新用户
var user = {
	"user4" : {
		"name" : "newuser",
		"password" : "password4",
		"profession" : "teacher",
		"id" : 4
	}
}


//添加新用户数据
app.get("/addUser", function(req,res)
{
	//读取已经存在的用户列表
	fs.readFile(__dirname + "/" + 'user.json', "utf-8", function(err, data)
	{
		data = JSON.parse(data);
		data["user4"] = user["user4"];
		console.log("Now we add: " + data["user4"]);
		res.end(JSON.stringify(data));
		
		
		
	}
	)
})

//显示用户详情
app.get("/search:id" , function(req,res)
{
	fs.readFile(__dirname + '/' +'user.json', 'utf-8', function(err,data)
	{
		data = JSON.parse(data);
		var user = data["user" + req.params.id];
		console.log("Now we search: " + data["user" + req.params.id]);
		res.end(JSON.stringify(user));
	})
})


//删除用户信息
app.get("/deleteUsern:id", function(req,res)
{
	fs.readFile(__dirname + '/' + 'user.json', 'utf-8', function(err,data)
	{
		data = JSON.parse(data);
		delete data("user" + req.params.id);
		console.log("已删除"+req.params.id+"号用户，他的信息是"+data["user"]+req.params.id);
		req.end(JSON.stringify(data));
	})
})

//服务器设置
var server = app.listen(8081, function()
{
	var host = server.address().address;
	var port = server.address().port;
	console.log(host);
	
	
	console.log("这个是restful学生list查询服务器已开启，在2333端口,访问网址为 %s:%s",host,port);
});

