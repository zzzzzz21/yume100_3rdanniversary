$(function () {
	var $window = $('window'),
		$html = $('html'),
		$body = $('body'),
		break_point_sp = 768,
		windowH = $(window).height(),
		windowW = $(window).width(),
		widnowS = $window.scrollTop(),
		$page = $('.page'),
		siteTitle =$('.siteTitle__navi__item--contact'),
		header = $('#data-header'),
		headerH = $(header).outerHeight(),
		headerPos = $(header).offset().top,
		main = $('.mainImage'),
		mainH = $(main).outerHeight(),
//		mainPos = $(main).offset().top,
		contents = $('#data-contents'),
		contentsH = $(contents).height();
		$gNavBtn = $('#data-gNavi-title'),
		$gNavItem = $('.gNavi__item a, .gNavi__item span'),
		$gNavBody = $('#data-gNavi-body');
		
		
//	$(window).resize(function(){
//		var windowW = $(window).width();
//		console.log(windowW);
//	});


// -------------------------------------------------------------------
// go to top
// -------------------------------------------------------------------
$(document).ready(function(){
	var toTopButton = $('.gotoTop');
	toTopButton.hide();
	$(window).scroll(function () {
		if ($(this).scrollTop() > windowH / 3) {
			toTopButton.fadeIn();
		} else {
			toTopButton.fadeOut();
		}
	});
});


// -------------------------------------------------------------------
// スムーズスクロール
// -------------------------------------------------------------------
 $('a[href^=#]').on('click touchend',function() {
	var speed = 800; // ミリ秒
	var href = $(this).attr('href');
	var target = $(href == '#' || href == '' ? 'html' : href);
	if (windowW < break_point_sp) {
		var position = target.offset().top - headerH;
	} else {
		var position = target.offset().top - headerH;
	}
	$('body, html').animate({ scrollTop: position }, speed, 'swing');
	return false;
});


// -------------------------------------------------------------------
// gNav
// -------------------------------------------------------------------
var state = false;
var scrollpos;
$gNavBtn.on('click', function(){
	if ($(this).hasClass('is-close')) {
	} else {
	}

	if(state == false) {
		scrollpos = $(window).scrollTop();
		$(this).addClass('is-close');
		$body.addClass('is-open').addClass('body--active').css({'top': -scrollpos});
		$gNavBody.fadeIn();
		state = true;
	} else {
		$(this).removeClass('is-close');
		$body.removeClass('is-open').css({'top': 0});
		$gNavBody.fadeOut();
		window.scrollTo( 0 , scrollpos );
		state = false;
	}
});
$gNavBody.on('click', function(){
	if(state == true){
		$gNavBtn.removeClass('is-close');
		$body.removeClass('is-open').css({'top': 0});
		$gNavBody.fadeOut();
		window.scrollTo( 0 , scrollpos );
		state = false;
	}
});
$gNavItem.on('click', function(){
	if(state == true){
		$gNavBtn.removeClass('is-close');
		$body.removeClass('is-open').css({'top': 0});
		$gNavBody.fadeOut();
		window.scrollTo( 0 , scrollpos );
		state = false;
	}
});

// -------------------------------------------------
//	fixed header
// -------------------------------------------------
$(window).on('scroll', function() {
	var value = $(this).scrollTop(),
		fixedClass = 'is--fixed';
	if ( $body.hasClass('siteIndex') ) {
		if ( value > mainH - headerH ) {
			siteTitle.fadeIn();
			$('#data-siteTitle').addClass(fixedClass);
			header.addClass(fixedClass);
			//		$('#data-contents').css('margin-top', headerH);
		} else {
			$('#data-siteTitle').removeClass(fixedClass);
			header.removeClass(fixedClass);
			//		$('#data-contents').css('margin-top', '0');
		}
	}
});


// -------------------------------------------------
//	画像入れ替え
// -------------------------------------------------
$(".data-switch").each(function(){
	var $this = jQuery(this);
	var PC_IMG_SUFFIX = '_pc';
	var SP_IMG_SUFFIX = '_sp';
	var SP_WIDTH = 767;
	function imgSize(){
		var windowWidth = jQuery(window).width();
		if(windowWidth >= SP_WIDTH + 1) {
			$this.attr('src',$this.attr('src').replace(SP_IMG_SUFFIX,PC_IMG_SUFFIX)).css({visibility:'visible'});
			} else if(windowWidth < SP_WIDTH + 1) {
			$this.attr('src',$this.attr('src').replace(PC_IMG_SUFFIX,SP_IMG_SUFFIX)).css({visibility:'visible'});
		}
	}
	$(window).resize(function(){imgSize();});
	imgSize();
});


// -------------------------------------------------------------------
// PC表示時にリンク無効化：電話番号リンク
// -------------------------------------------------------------------
$('a.data-link-sp').on('click',function(){
	if(windowW > break_point_sp) return false;
});


// -------------------------------------------------------------------
// matchHeight
// -------------------------------------------------------------------
$(window).on('load', function(){
	if(windowW > break_point_sp) {
		$('.special-article').matchHeight();
	}
});
	
	
	
});


// -------------------------------------------------------------------
// loading -> opening
// -------------------------------------------------------------------
/*
var $body = $('body'),
	$page = $('.page');
$(function(){
	$page.hide();
	$('a[href ^= "http://www.yume-100.com/3rdevent/"]' + 'a[target != "_blank"]').click(function(){
		var url = $(this).attr('href');
		$('#js-loader').fadeIn(600);
		setTimeout(function(){ location.href = url; }, 1200);
		return false;
	});
});

$(window).load(function(){
	$('#js-loader').delay(300).fadeOut(400);
	$body.addClass('js-loaded');
	$page.fadeIn();
	setTimeout(function(){
		$body.removeClass('js-loaded');
	}, 12000);
	return false;
});

$(function(){ setTimeout('stopload()', 10000); });
function stopload(){
	$('#js-loader').delay(300).fadeOut(400);
	$page.fadeIn();
}
*/
