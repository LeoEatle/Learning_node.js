var express = require("express")

var app = express();

app.get('/',function(req,res)
{
	console.log("GET request");
	res.send('You must GET ');
	
})

app.post('/', function(req,res)
{
	console.log("POST request");
	res.send('You must POST');
})

app.delete('/del',function(req,res)
{
	console.log("/del request DELETE");
	res.send('删除页面');
})

app.get('/list_user', function(req,res)
{
	console.log("/list_user GET request");
	res.send("用户列表界面");
})

app.get('/ab*cd', function(req,res)
{
	console.log("/ab*cd GET request");
	res.send("正则匹配");
})

//加载静态文件
app.use(express.static('public'));


app.get('/index.html', function(req,res)
{
	res.sendFile(__dirname + "/" + "index.html");
})
//设置GET路由
app.get("/process_get", function(req,res)
{
	//输出JSON格式
	var response = {
		first_name:req.query.YOU,
		last_name:req.query.MUCH
	};
	console.log(response);
	res.end(JSON.stringify(response));
})

//设置POST路由
//需要bodyParser和编码解析
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({extended: false})


//!!注意这里一定要用app.post
app.post("/process_post", urlencodedParser, function(req,res)
{
	//print JSON format
	var response = {
		first_name:req.body.B,
		last_name:req.body.CHEAP//注意这里的query变成了body
		
	};
	console.log(response);
	res.end(JSON.stringify(response));
	
})

//设置上传文件路由
var fs = require('fs');
var multer = require("multer");

app.use(bodyParser.urlencoded({extended:false}));
app.use(multer({dest:'/tmp/'}).array('image'));

app.post('/file_upload', function(req,res)
{
	console.log(req.files[0]);//上传文件信息
	
	var des_file = __dirname + "/" +req.files[0].originalname;
	fs.readFile(req.files[0].path, function(err, data)
	{
		fs.writeFile(des_file, data, function(err)
		{
			if(err)
			{
				console.log(err);
			}
			else{
				var response= {
					message:'File uploaded successfully',
					filename:req.files[0].originalname
				};
				
			}
			console.log(response);
			res.end(JSON.stringify(response));
		})
	})
	 
})







var server = app.listen(8081, function()
{
	var host = server.address().address;
	var port = server.address().port;
	console.log("The address which is request is %s %s", host, port);
});




