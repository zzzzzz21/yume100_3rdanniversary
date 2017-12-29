$(function () {
	var $window = $('window'),
		$html = $('html'),
		$body = $('body'),
		break_point_sp = 768,
		windowH = $(window).height(),
		windowW = $(window).width(),
		siteTitle =$('.siteTitle__navi__item--contact'),
		header = $('#data-header'),
		headerH = $(header).outerHeight(),
		headerPos = $(header).offset().top,
		contents = $('#data-contents'),
		contentsH = $(contents).height();
		$gNavBtn = $('#data-gNavi-title'),
		$gNavItem = $('.gNavi__item a'),
		$gNavBody = $('#data-gNavi-body');
		
		
	$(window).resize(function(){
		var windowW = $(window).width();
		console.log(windowW);
	});
	
	
// -------------------------------------------------------------------
// スムーズスクロール
// -------------------------------------------------------------------
 $('a[href^=#]').on('click touchend',function() {
	var speed = 500; // ミリ秒
	var href = $(this).attr('href');
	var target = $(href == '#' || href == '' ? 'html' : href);
	if (windowW < break_point_sp) {
		var position = target.offset().top - 60;
	} else {
		var position = target.offset().top - 100;
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

// -------------------------------------------------
//	fixed header
// -------------------------------------------------
$(window).on('scroll', function() {
	var value = $(this).scrollTop(),
		fixedClass = 'is--fixed';
	if ( value > headerPos ) {
		siteTitle.fadeIn();
		$('#data-siteTitle').addClass(fixedClass);
		header.addClass(fixedClass);
//		$('#data-contents').css('margin-top', headerH);
	} else {
		$('#data-siteTitle').removeClass(fixedClass);
		header.removeClass(fixedClass);
//		$('#data-contents').css('margin-top', '0');
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
// go to top
// -------------------------------------------------------------------
$(document).ready(function(){
	var toTopButton = $('.gotoTop');
	toTopButton.hide();
	$(window).scroll(function () {
		if ($(this).scrollTop() > 780) {
			toTopButton.fadeIn();
		} else {
			toTopButton.fadeOut();
		}
	});
});


// -------------------------------------------------------------------
// colorbox
// -------------------------------------------------------------------
$(document).ready(function(){
	//Examples of how to assign the Colorbox event to elements
	$(".colorbox").colorbox({
		maxWidth: "90%",
		maxHeight: "90%",
		opacity: 0.9,
		transition: "fade"
	});
	$(".group1").colorbox({rel: 'group1'});
	$(".group2").colorbox({rel: 'group2'});
	$(".group3").colorbox({rel: 'group3'});
	$(".group4").colorbox({rel: 'group4'});
	$(".group5").colorbox({rel: 'group5'});
	$(".group6").colorbox({rel: 'group6'});
	$(".group7").colorbox({rel: 'group7'});
	$(".group8").colorbox({rel: 'group8'});
	$(".group9").colorbox({rel: 'group9'});
	$(".group10").colorbox({rel: 'group10'});
	$(".group11").colorbox({rel: 'group11'});

	$(".ajax").colorbox();
	$(".youtube").colorbox({iframe:true, innerWidth:640, innerHeight:390});
	$(".vimeo").colorbox({iframe:true, innerWidth:500, innerHeight:409});
	$(".iframe").colorbox({iframe:true, width:"80%", height:"80%"});
	$(".inline").colorbox({inline:true, width:"50%"});
	$(".callbacks").colorbox({
		onOpen:function(){ alert('onOpen: colorbox is about to open'); },
		onLoad:function(){ alert('onLoad: colorbox has started to load the targeted content'); },
		onComplete:function(){ alert('onComplete: colorbox has displayed the loaded content'); },
		onCleanup:function(){ alert('onCleanup: colorbox has begun the close process'); },
		onClosed:function(){ alert('onClosed: colorbox has completely closed'); }
	});

	$('.non-retina').colorbox({rel:'group5', transition:'none'})
	$('.retina').colorbox({rel:'group5', transition:'none', retinaImage:true, retinaUrl:true});

	//Example of preserving a JavaScript event for inline calls.
	$("#click").click(function(){ 
		$('#click').css({"background-color":"#f00", "color":"#fff", "cursor":"inherit"}).text("Open this window again and this message will still be here.");
		return false;
	});
});

	
	
	
});
