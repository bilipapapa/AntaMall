$(function () {

	var str = "";
	var str1 = '<li class="pro-list"> <div class="pic-box"> <a href="/html/details.html"> <img src="" alt="" class="pro-list-pic"> </a> </div> <p class="price-box"> <span>￥</span> <span class="price"></span> </p> <div class="pro-name-box"> <a href="" class="pro-name"></a> </div> <div class="btn-buy"> <div class="buy-now"> <a href="">立即购买</a> </div> <div class="into-cart"> <a >加入购物车</a> </div> </div> </li>';

	var page_l = '<a class="prev">上一页</a>';
	var page_r = '<a class="next">下一页</a>';
	var page_center = "";
	var page_repeat = '<a class="page"></a>';
	const limit = 30;

	var obj = {};

	$.ajax({
		url: "http://47.104.244.134:8080/goodsbytid.do",
		type: "get",
		async: false,
		data: {
			"tid": 13,
			"page": 1,
			"limit": limit
		},
		success: function (data) {
			obj = data;
			console.log(obj);
			page_num = Math.ceil(obj["count"] / obj["data"].length);
			for (var i = 0; i < obj["data"].length; i++) {
				str += str1;
				$(".ul-list").html(str);
			}

			for (var i = 0; i < 10; i++) {
				page_center += page_repeat;
				$(".page-num").html(page_l + page_center + page_r);
			}
		}
	})

	for (var i = 0; i < page_num; i++) {
		$(".page").eq(i).html(i + 1);
	}

	proload(1);
	$(".page").eq(0).addClass("current");

	//页码点击功能
	var index = 1;
	$(".page").click(
		function () {
			index = $(this).html();
			proload(index);
			$(".page").removeClass("current");
			$(this).addClass("current");

			var k = 0;
			if ($(this).html() == 1) {
				$(".prev").css("visibility", "hidden");
			} else {
				$(".prev").css("visibility", "visible");
			}

			if (index != 1 && index != 43) {
				$(".next").css("visibility", "visible");
			}

			if (index >= 43) {
				$(".next").css("visibility", "hidden");
			}

			for (var i = 0; i < 10; i++) {
				if ($(".page").eq(i).html() < 43) {
					$(".page").eq(i).css("visibility", "visible");
				}
			}
		})

	//上一页功能
	$(".next").click(
		function () {
			var pos = $(".current").index() - 1;
			index++;
			pos++;
			$(".page").removeClass("current");
			if (pos > 9) {
				pos = 0;
				for (var i = 0; i < 10; i++) {
					$(".page").eq(i).html(index + i);
					if ($(".page").eq(i).html() > 43) {
						$(".page").eq(i).css("visibility", "hidden");
					}
				}
			}
			$(".page").eq(pos).addClass("current");
			proload(index);
			if ($(".current").eq(0).html() >= 43) {
				$(".next").css("visibility", "hidden");
			} else {
				$(".next").css("visibility", "visible");
			}
			if (index != 1) {
				$(".prev").css("visibility", "visible");
			}
		}
	)

	//下一页功能
	$(".prev").click(
		function () {
			var pos = $(".current").index() - 1;
			index--;
			pos--;
			$(".page").removeClass("current");
			if (pos - 1 < -1) {
				pos = 9;
				for (var i = 0; i < 10; i++) {
					$(".page").eq(i).html(index + i - 9);
				}
			}
			$(".page").eq(pos).addClass("current");
			proload(index);
			if ($(".current").eq(0).html() <= 1) {
				$(this).css("visibility", "hidden");
			} else {
				$(this).css("visibility", "visible");
			}
			if (index != 1) {
				$(".next").css("visibility", "visible");
			}
			for (var i = 0; i < 10; i++) {
				if ($(".page").eq(i).html() < 43) {
					$(".page").eq(i).css("visibility", "visible");
				}
			}
		}
	)

	//加载指定页数
	function proload(page) {
		$.ajax({
			url: "http://47.104.244.134:8080/goodsbytid.do",
			type: "get",
			async: false,
			data: {
				"tid": 13,
				"page": page,
				"limit": limit
			},
			success: function (data) {
				for (var i = 0; i < limit; i++) {
					//设置内容
					$(".pro-list-pic").eq(i).attr({ "src": data["data"][i]["picurl"] });
					$(".price").eq(i).html((data["data"][i]["price"] / 100).toFixed(2));
					$(".pro-name").eq(i).html(data["data"][i]["name"]);
					$(".into-cart").eq(i).attr("data-id", data["data"][i]['id']);
				}

			}
		})
	}


	$(".into-cart").click(
		function () {
			$.ajax(
				{
					url: "http://47.104.244.134:8080/cartsave.do",
					type: "get",
					data: {
						gid: $(this).attr("data-id"),
						token: $.cookie("token")
					},
					success: function (data) {
						console.log(data);
					}
				}
			)

			$.ajax(
				{
					url: "http://47.104.244.134:8080/cartlist.do",
					type: "get",
					async: false,
					data: {
						token: $.cookie("token")
					},
					success: function (data) {
						var sum = 0;
						for (var i in data) {
							sum += data[i]["count"];
						}
						$(".cart-num").html(sum);
					}

				})




		}
	)


})