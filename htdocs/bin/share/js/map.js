function initialize() {
	var latlng = new google.maps.LatLng(35.917359, 139.795382);
	var myOptions = {
		zoom: 16,/*拡大比率*/
		center: latlng,/*表示枠内の中心点*/
		scrollwheel: false, //マウスホイールでの拡大縮小
		mapTypeControlOptions: { mapTypeIds: ['sample', google.maps.MapTypeId.ROADMAP] }/*表示タイプの指定*/
	};
	var map = new google.maps.Map(document.getElementById('map-canvas'), myOptions);
	/*アイコン設定*/
/*	var icon = new google.maps.MarkerImage('ico.png',
		new google.maps.Size(55,72),//アイコンサイズ設定
		new google.maps.Point(0,0)//アイコン位置設定
	);*/
	var markerOptions = {
		position: latlng,
		map: map,
		title: 'バイリンガルキッズハウス越谷'
		//icon: icon,
	};
	var marker = new google.maps.Marker(markerOptions);
	/*取得スタイルの貼り付け*/
	var styleOptions = [
		{
			"stylers": [
				{ "saturation": -66 },
				{ "visibility": "simplified" },
				{ "lightness": 22 }
			]
		}
	];
var styledMapOptions = { name: 'バイリンガルキッズハウス越谷' }
var mapType = new google.maps.StyledMapType(styleOptions, styledMapOptions);
	map.mapTypes.set('sample', mapType);
	map.setMapTypeId('sample');
}
google.maps.event.addDomListener(window, 'load', initialize);
