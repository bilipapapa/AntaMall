$(function(){

	$("#username").click(
		function(){
			$(".reg-user").html("");
		}
	)
	
	var flag=false;
	$("#username").change(
		function(){
			$.get(  //验证用户名是否存在
				"http://47.104.244.134:8080/username.do",

				{
					"username":$("#username").val()
				},

				function(data){
					console.log(data);
					console.log("0 用户名已存在");
					console.log("1 用户名不存在");
					if(data["code"]==0){
						$(".reg-user").html("用户名存在，请登录");
						flag=true;
					}else{
						$(".reg-user").html("用户名不存在");
						flag=false;
					}
				}
			)
		}
	)


	$("#login-button").click(function(){
		if(flag){
			$.post(  //登录
				"http://47.104.244.134:8080/userlogin.do",
	
				{
					"name":$("#username").val(),
					"password":$("#password").val()
				},
	
				function(data){
					console.log(data);
					alert(data["msg"]);
					console.log("登录成功");

					$.cookie("token",data["data"]["token"],{path:"/"});
					window.location.href="/index.html";
				}
			)
		}
		
	})








})