$(function(){
	$(".type-register a").eq(0).click(function(){
		$(".type-register a").eq(1).removeClass("active").addClass("btn-origin");
		$(this).removeClass("btn-origin").addClass("active");
		$(".phone-register").css("display","block");
		$(".mail-register").css("display","none");
	});
 
	$(".type-register a").eq(1).click(function(){
		$(".type-register a").eq(0).removeClass("active").addClass("btn-origin");
		$(this).removeClass("btn-origin").addClass("active");
		$(".phone-register").css("display","none");
		$(".mail-register").css("display","block");
	})

	$(".vercode-container img").click(function(){
		$(this).attr({"src":"http://www.anta.cn/api.php?s=passport/code.html"});
	})

	$("#phone-register-btn").click(function(){
		$(".phone-register").find(".dis-box").css("display","block").html("请切换注册方式");
		$(".phone-register").find("#phone-num").css({"border":"1px solid red"});
		$("#phone-register-btn").css("background","gray");
	})

	$("#mail").click(
		function(){
			$(".reg-user").html("");
		}
	)


	//调用接口
	var flag=false;
	$("#mail").change(
		function(){
			$.get(				//判断用户名是否重复
				"http://47.104.244.134:8080/username.do",
	
				{
					"username":$("#mail").val()
				},
		
				function(data){
					console.log(data);
					console.log("0 用户名已存在");
					console.log("1 用户名不存在");
					if(data["code"]==1){
						$(".reg-user").html("用户名可以使用");
						flag=true;
					}else{
						$(".reg-user").html("用户名已存在，请换用户名");
						flag=false;
					}
				}
			)
		}
	)


	$("#register-btn").click(function(){
		//执行注册
		if(flag){
			$.post(
				"http://47.104.244.134:8080/usersave.do",
				{
					"username":$("#mail").val(),
					"password":$("#mail-password").val(),
					"email":"null@null.com",
					"sex":"no"
				},

				function(data){
					console.log(data);
					alert(data["msg"]);
					window.location.href="login.html";
				}
			)
		}

		
	})











})