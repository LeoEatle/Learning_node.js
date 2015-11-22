


//node.js 处理GET/POST请求
//需要url模块
var http = require("http");
var url = require("url");
var util = require("util");
var fs = require("fs");


http.createServer(function(req,res)
{
	// res.writeHead(200, {'Content-Type':'text/plain'});
	// res.end(util.inspect(url.parse(req.url, true)));
	//解析请求，包括请求的文件名
	var pathname = url.parse(req.url).pathname;
	
	console.log("Request for "+ pathname +" received");
	//从文件系统中读取请求的文件内容
	fs.readFile(pathname.substr(1), function(err, data)
	{
		if(err){
			console.log(err);
			
			res.writeHead(404, {'Content-Type':'text/html'});
			
		}else{
			//http状态码200表示OK
			res.writeHead(200, {'Content-Type': 'text/html'});
			//开始响应文件内容
			res.write(data.toString());
			
			
		}
		//发送响应数据
		res.end();
	});
	
	
}).listen(3000);//3000端口监听

console.log("Server running at port 3000");


