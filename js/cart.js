$(function(){
	$("footer").load("../html/foot.html",function(){
		if($.cookie("token")!=undefined){
			$(".ul-1").html('<li>你好，欢迎来到安踏官方商城！</li> <li> <a>'+$.cookie("token")+'</a>');
		}
	});

	/* $(".exit").click(function(){
		$.removeCookie("token",{path:"/"});
		// $.removeCookie("token");
		// window.reload();
	}) */
	var str='';
	var str1='<tr class="prod-tr"> <td class="p-id"></td> <td class="p-pic"> <img src="" alt=""> </td> <td class="p-info"></td> <td class="p-price"></td> <td class="p-num"></td> <td class="p-del"> <a class="btn-del">删除</a> </tr> </td> </tr>';
	var str2='<thead> <tr class="head-tr"> <td class="id" width="80">商品编号</td> <td class="pic" width="120">商品图片</td> <td class="info" style="text-align:left">商品信息</td> <td class="price" width="150">单价</td> <td class="num" width="200">商品数量</td> <td class="del" width="80">删除商品</td></thead>';

	var obj=[];
	$.ajax(
		{
			url:"http://47.104.244.134:8080/cartlist.do",
			type:"get",
			async:false,
			data:{
				token:$.cookie("token")
			},
			success: function(data) {
				console.log((data));
				obj=data;
				for(var i=0;i<data.length;i++){
					str+=str1;
				}
				$(".cart").html(str2+str);
			}
			
	})

	for(var i in obj){
		// console.log(i)
		$(".p-id").eq(i).html(obj[i]["id"]);
		$(".prod-tr img").eq(i).attr({"src":obj[i]["goods"]["picurl"]});
		$(".p-info").eq(i).html(obj[i]["goods"]["name"]);
		$(".p-price").eq(i).html(obj[i]["goods"]["price"]);
		$(".p-num").eq(i).html(obj[i]["count"]);
		$(".btn-del").eq(i).attr({
			"data-id":obj[i]["id"],
			"data-gid":obj[i]["gid"]
		})
	}

	$(".btn-del").click(
		function(){
			$(this).parent().parent().remove();

			$.ajax({
				url:"http://47.104.244.134:8080/cartupdate.do",
				type: "get",
				data:{
					id:$(this).attr("data-id"),
					gid:$(this).attr("data-gid"),
					num:0,
					token:$.cookie("token")
				},
				success:function(data){
					console.log($(this).attr("data-gid"));
				}
			})
		}
	)
})