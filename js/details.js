$(function () {
	$(".into-cart").click(
		function () {

			$.ajax(
				{
					url:"http://47.104.244.134:8080/cartsave.do",
					type:"get",
					async:false,
					data:{
						gid:68,
						token:$.cookie("token")
					},
					success: function(data) {
					}
				}
			)

			$.ajax(
				{
					url:"http://47.104.244.134:8080/cartlist.do",
					type:"get",
					async:false,
					data:{
						token:$.cookie("token")
					},
					success: function(data) {
						obj=data;
						val=$(".sumbox .number").val();

						if(val==1){
							return 0;
						}else if(val==0){
							val=0;
						}else{
							val-=1;
						}
						$.ajax(
							{
								url: "http://47.104.244.134:8080/cartupdate.do",
								type: "get",
								async:false,
								data: {
									id: obj[0]["id"],
									gid: obj[0]['gid'],
									num: val,
									token: $.cookie("token")
								},
								success: function (data) {
									if (!data["code"]) {
										alert("加入购物车成功")
									}else{
										alert("加入购物车失败,请检查数量(#^.^#)")
									}
			
								}
							}
			
						)
					}
					
			})
			

		}
	)























})