$(function () {
	/* headjs */
	$("#header").load("../html/head.html", function () {
		$(".all-kinds").hover(
			function () {
				$(".all-kinds-tab").removeClass("hide")
			},
			function () {
				$(".all-kinds-tab").addClass("hide");
			})
			.find("li").hover(
				function () {
					$(this).css("background", "#d6211a")
				},
				function () {
					$(this).css("background", "0")
				}
			)
			.find("a:not(:first)").hover(
				function () {
					$(this).css("text-decoration", "underline");
					// console.log(this)
				},
				function () {
					$(this).css("text-decoration", "none");
				}
			)
			.end().end().find("li").hover(
				function () {
					$(this).find(".style-tab-content").removeClass("hide");
				},
				function () {
					$(this).find(".style-tab-content").addClass("hide");
				}
			).find("li").hover(
				function () {
					$(this).css("background", 0);
				}
			).find("a").css({ "color": "#999" }).hover(
				function () {
					$(this).css({ "text-decoration": "none", "color": "#dd0000" });
				},
				function () {
					$(this).css("color", "#999");
				}
			)

		//购物车数量
		$.ajax(
			{
				url:"http://47.104.244.134:8080/cartlist.do",
				type:"get",
				async:true,
				data:{
					token:$.cookie("token")
				},
				success: function(data) {
					var sum=0;
					for(var i in data){
						sum+=data[i]["count"];
					}
					$(".cart-num").html(sum);
				}
				
		})


		//middle-nav
		$(".middle-nav>ul>li>a").css("background", "#231f20 url(../img/navBg.gif) no-repeat right 15px").last().css({ "width": "120px", "height": "33px" }).parent().parent().find("a").eq(0).css("background", "#000").parent().siblings().find("a:first-child").hover(
			function () {
				$(this).css("background", "#000 url(../img/navBg.gif) no-repeat right 15px");
				$(".item-box").find("a").css("background", "fff");
			},
			function () {
				$(this).css("background", "#231f20 url(../img/navBg.gif) no-repeat right 15px");
				$(".item-box").find("a").css("background", "fff");
			}
		).parent().hover(
			function () {
				$(this).find("div").toggleClass("hide");
			},
			function () {
				$(this).find("div").toggleClass("hide");
			}
		).find("ul>li").find("h4 a:not(.newGoods,.discount)").hover(
			function () {
				$(this).css({ "color": "#dd0000", "text-decoration": "underline" })
			},
			function () {
				$(this).css({ "color": "#333", "text-decoration": "none" })
			}
		)
		
		//middle-nav item-box
		$(".item-box").find("li>a").addBack("p>a").hover(
			function () {
				$(this).css({ "color": "#dd0000", "text-decoration": "underline" })
			},
			function () {
				$(this).css({ "color": "#333", "text-decoration": "none" })
			}
		);

		//move-nav移动
		$(window).scroll(
			function () {
				var scrollTop = $(document).scrollTop();
				if (scrollTop > 89 && $("#move-nav").css("position") != "fixed") {
					$("#move-nav").css({ "top": -40 + "px" }).css({ "position": "fixed" }).delay(150).animate({ "top": 0 }, 600);
				} else if (scrollTop < 89) {
					$("#move-nav").css({ "position": "relative", "top": 0 + "px" });
				}
			}
		)

		//检测登录
		if($.cookie("token")!=undefined){
			$(".logo-box").html("您好，"+$.cookie("token"));
		}
	});


	/* 侧边js */
	$("#right-bar").load("../html/rightbar.html",function(){
		$(".item-service").css("background","#dd0000");
		$(".sidebar-pic").hover(
			function(){
				$(this).parent().css("background","#dd0000");
			},
			function(){
				$(this).parent().css("background","#000");
				$(".item-service").css("background","#dd0000");
			}
		).parent().parent().find(".item-cart").hover(
			function(){
				$(this).css("background","#dd0000");
			},
			function(){
				$(this).css("background","#000");
			}
		)

		$(window).scroll(function(){
			var scrollTop = $(document).scrollTop();
			if (scrollTop > 89 /* && $("#side-bar-container").css("position") != "fixed" */) {
				$("#side-bar-container").stop().animate({ "top":"36px"},600).css({ "position": "fixed" });
				$(".go-top").fadeIn();
			}
			if (scrollTop < 89) {
				$("#side-bar-container").stop().animate({"top":"89px"});
				$(".go-top").show().fadeOut().click(function(){
					$(window).scrollTop(0);
				});
			} 
				
		})
	})

	
	// footer 
	$("#footer").load("../html/foot.html",function(){
		$(".serverbox a").hover(
			function(){
				$(this).css({"color":"#dd0000"});
			},
			function(){
				$(this).css({"color":"#333"})
			}
		)
		$(".company-info a").hover(
			function(){
				$(this).css({"color":"#dd0000"});
			},
			function(){
				$(this).css({"color":"#fff"})
			}
		)
	})
});

