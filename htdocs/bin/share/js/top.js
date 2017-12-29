$(function() {
	var windowWidth = $(window).width(),
		break_point_sp = 1080;
	if (windowWidth < break_point_sp) {
		$('#slider').slick({
			arrows: false,
			dots:true,
			autoplay:true,
			infinite: true,
			autoplaySpeed: 6000
		});
	} else {
		$('#slider').carouFredSel({
			width: '100%',
			items: {
				visible: 3,
				start: -1
			},
			scroll: {
				items: 1,
				duration: 1000,
				timeoutDuration: 6000
			},
			prev: '.slider__prev',
			next: '.slider__next',
			pagination: {
				container: '.slider__pager',
				deviation: 1
			}
		});
	}
});
