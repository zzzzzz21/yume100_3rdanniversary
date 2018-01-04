$(function () {
	function t() {}

	function o() {
		var t = 2e3;
		setTimeout(function () {
			$bg3_2.addClass("flash")
		}, t), setTimeout(function () {
			$bg3_2.removeClass("flash"), o()
		}, t + 1500)
	}
	$win = $(window);
	$bg = $(".top-bg"), $bg2 = $(".top-bg2"), $bg3 = $(".top-bg3"), $bg3_2 = $(".top-bg3_2"), $catch = $(".txt-catch"), $side = $(".box-side"), $openMenu = $(".btn-menu"), $closeMenu = $(".btn-close"), $footer = $(".footer"), $main = $(".main");
	var s = 0,
		e = !1;
	$win.load(function () {
		function n() {
			$catch.addClass("hide"), $bg2.addClass("flash"), $bg3.addClass("show"), $bg3_2.addClass("show"), setTimeout(function () {}, 1e3), s++, t(), $(".btn-skip").fadeOut()
		}

		function a() {
			$bg.removeClass("move"), $(".box-top-text").show(), $(".top-catch2").show(), $(".nav-side-right").show(), $(".nav-side-left").show(), setTimeout(function () {
				$(".top-logo").addClass("show"), $(".top-catch2").addClass("show"), $(".nav-side-right").addClass("show"), $(".nav-side-left").addClass("show"), o()
			}, 10)
		}
		$bg.addClass("show"), t(), setTimeout(function () {
			$catch.addClass("show")
		}, 1e3), setTimeout(function () {
			e || n()
		}, 7e3), setTimeout(function () {
			e || a()
		}, 1e4), $(".btn-skip").click(function () {
			e = !0, n(), setTimeout(function () {
				a()
			}, 3e3)
		}), $(".box-top-text").show()
	}), $win.resize(t)
});
//# sourceMappingURL=top-pc.js.map