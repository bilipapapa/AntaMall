$(function () {
	//大轮播数据↓↓
	var alist = $(".ul-list li");
	var perWidth = alist[0].offsetWidth;
	$(".ul-list").get(0).style.width = perWidth * alist.length + "px";

	//小轮播数据↓↓
	var aalist = $(".slider-box").eq(0).find("li");
	var aaalist = $(".slider-box").eq(1).find("li");

	//大轮播
	function move() {
		i++;
		if (i == alist.length) {
			$(".ul-list").get(0).style.left = 0;
			i = 1;
		}

		if (i == -1) {
			$(".ul-list").get(0).style.left = -perWidth * (alist.length - 1) + "px";
			i = alist.length - 2;
		}

		$(".ul-list").animate({ "left": -perWidth * i + "px" }, 600);

		$(".biao").css("background", "#4d4d4d").eq(i - 3).css("background", "#e74d4d");
	}
	//大
	var i = 0;
	var i2 = 0;
	var timer = setInterval(() => {
		move();
	}, 5000);

	$(".banner").hover(
		function () {
			clearInterval(timer);
		},
		function () {
			timer = setInterval(function () {
				move();
			}, 5000)
		}
	);

	$(".btn-left").click(function () {
		i -= 2;
		move();
	})

	$(".btn-right").click(function () {
		move();
	})

	$("jio .biao").click(function () {
		$("jio .biao").css("background", "#4d4d4d");
		$(this).css("background", "#e74d4d");
	})

	$(".biao").click(function () {
		i = $(this).index() - 1;
		move();
	})

	$(".big-show li").hover(
		function () {
			$(this).find(".overburden").css({ "display": "block" }).find("a");
		},
		function () {
			$(this).find(".overburden").css({ "display": "none" });
		}
	)

	//小轮播2
	function move2() {
		i2++;
		if (i2 == aalist.length) {
			i2 = 1;
		}
		if (i2 == -1) {
			i2 = aalist.length - 2;
		}

		$(".slider-box").eq(0).find("li").css({ "opacity": 0 });;
		$(".slider-box").eq(0).find("li").eq(i2).animate({ "opacity": 1 }, 500)

		$(".slider-box").eq(0).find("section span").css("background", "#222").eq(i2 - 3).css("background", "#eee");

		if (i2 == 1) {
			$(".slider-box").eq(0).find("p").eq(0).html("星环气垫跑鞋");
			$(".slider-box").eq(0).find("p").eq(1).html("新款SEEED全掌气垫星环跑鞋潮运动鞋");
		} else if (i2 == 2) {
			$(".slider-box").eq(0).find("p").eq(0).html("国潮鞋复古休闲");
			$(".slider-box").eq(0).find("p").eq(1).html("老爹鞋国潮鞋复古运动男鞋");
		} else {
			$(".slider-box").eq(0).find("p").eq(0).html("KT篮球鞋");
			$(".slider-box").eq(0).find("p").eq(1).html("2019新款KT篮球鞋");
		}
	}

	var i2 = 0;
	var timer2 = setInterval(() => {
		move2();
	}, 5000);

	//小轮播3
	function move3() {
		i3++;
		if (i3 == aaalist.length) {
			i3 = 1;
		}
		if (i3 == -1) {
			i3 = aaalist.length - 2;
		}

		$(".slider-box").eq(1).find("li").css({ "opacity": 0 });;
		$(".slider-box").eq(1).find("li").eq(i3).animate({ "opacity": 1 }, 500);

		$(".slider-box").eq(1).find("section span").css("background", "#222").eq(i3 - 3).css("background", "#eee");

		if (i3 == 1) {
			$(".slider-box").eq(1).find("p").eq(0).html("星环气垫跑鞋");
			$(".slider-box").eq(1).find("p").eq(1).html("新款SEEED全掌气垫星环跑鞋潮运动鞋");
		} else if (i3 == 2) {
			$(".slider-box").eq(1).find("p").eq(0).html("国潮鞋复古休闲");
			$(".slider-box").eq(1).find("p").eq(1).html("老爹鞋国潮鞋复古运动男鞋");
		} else {
			$(".slider-box").eq(1).find("p").eq(0).html("KT篮球鞋");
			$(".slider-box").eq(1).find("p").eq(1).html("2019新款KT篮球鞋");
		}

	}

	var i3 = 0;
	var timer3 = setInterval(() => {
		move3();
	}, 5000);

	/* 轮播over */

	//小轮播功能
	$(".slider-box").eq(0).hover(
		function () {
			clearInterval(timer2);
			$(this).find("div").stop().show().fadeIn();
		},
		function () {
			$(this).find("div").stop().fadeOut();
			timer2 = setInterval(() => {
				move2();
			}, 5000);
		}
	)

	$(".slider-box").eq(1).hover(
		function () {
			$(this).find("div").stop().show().fadeIn();
			clearInterval(timer3);
		},
		function () {
			$(this).find("div").stop().fadeOut();
			timer3 = setInterval(() => {
				move3();
			}, 5000);
		}
	)

	$(".slider-box").eq(0).find(".btn2-left").stop().click(function () {
		i2 -= 2;
		move2();
	})
	$(".slider-box").eq(0).find(".btn2-right").stop().click(function () {
		move2();
	})

	$(".slider-box").eq(1).find(".btn2-left").click(function () {
		i3 -= 2;
		move3();
	})
	$(".slider-box").eq(1).find(".btn2-right").click(function () {
		move3();
	})

	//角标点击2
	$(".slider-box").eq(0).find("section span").click(function () {
		i2 = $(this).index() - 1;
		move2();
	})

	//角标点击3
	$(".slider-box").eq(1).find("section span").click(function () {
		i3 = $(this).index() - 1;
		move3();
	})


	//首页商品列表
	$("aside .div-ibox").load("../html/index-list.html", function () {
		$(".ibox .S-ul").css("height", "0");
		$(".ibox").hover(
			function () {
				$(this).css("z-index",999);
				$(this).find(".S-ul").stop().animate({"height":"32px"},200);
				$(this).find("p").show().stop().fadeIn();
				$(this).css({ "box-shadow": "0 50px 200px gray" }, 500);
			},
			function () {
				// $(this).find(".S-ul").fadeOut(300);
				$(this).find(".S-ul").stop().animate({"height":"0"},100);
				$(this).find("p").stop().fadeOut(300);
				$(this).css({ "box-shadow": "none" }, 500);
				$(this).css("z-index",0);
			}
		)



	})

})



