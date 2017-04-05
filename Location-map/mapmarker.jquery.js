(function($) {
	var map = null;
	var geocoder　 = null;
	$.fn.mapmarker = function(options) {
		var opts = $.extend({}, $.fn.mapmarker.defaults, options);

		return this.each(function() {
			var map_element = this;
			addMapMarker(map_element, opts.zoom, opts.center, opts.markers);
		});
	};

	var defaultMarkers = {
		"listing1": []
	};

	$.fn.mapmarker.defaults = {
		zoom: 8,
		center: 'Vancouver',
		listing1: defaultMarkers
	}

	function addMapMarker(map_element, zoom, center, markers) {

		var infowindow = null;
		var baloon_text = "";
		var myOptions = {
			zoom: zoom,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		}
		if(map == null && 　geocoder == null) {
			map = new google.maps.Map(map_element, myOptions);
			geocoder = new google.maps.Geocoder();
		}
		google.maps.event.addListener(map, 'dragend', function() {
			//console.log("============================dragend ============" + map.getCenter())
			map.setCenter(map.getCenter());
		});
		geocoder.geocode({ 'address': center }, function(results, status) {
			if(status == google.maps.GeocoderStatus.OK) {
				map.setCenter(results[0].geometry.location);
			} else {
				console.log("Geocode was not successful for the following reason: " + status);
			}
		});
		$.each(markers.listing1, function(i, the_marker) {
			var label = the_marker.price;
			var address = the_marker.listingname;
			var durl = the_marker.detail_url;
//			console.log("___" + i + "____当前地址：-----" + address + "======" + durl + "====当前价格----" + label);
			var geocoder = new google.maps.Geocoder();
			geocoder.geocode({ "address": address }, function(results, status) {
				if(status == 'OK') {
					//在回调函数中跟地址获取经纬度坐标，实现marker的创建
					var marker = new google.maps.Marker({
						map: map,
						position: new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng()), //new google.maps.Geocoder().geocode({ "address": "32 Saint-Charles Ouest, Longueuil, Qc, Canada"},this._locationFound.bind(this)),
						animation: google.maps.Animation.DROP,
						icon: {
							url: "img/combined.png",
						},
						label: {
							fontFamily: 'STKaiti',
							fontSize: '16px',
							color: '#FFFFFF',
							fontWeight: 'normal',
							text: label
						}
					});
					google.maps.event.addListener(marker, 'click', function() {
						$(".house_detail").show().fadeIn(500);
//						$('#detailID').setAttribute("src","http://www.baidu.com")
						$.get(durl, function(data) {});
					});
				}

			});

		});
	}

})(jQuery);