// Main JS to control jquery elements

var fadeMenuY = 150;
var fadeTime = 1000;

$(document).foundation({
	"magellan-expedition" : {
	  destination_threshold: 200
	}
});

$(document).scroll(function () {
	var y = $(this).scrollTop();
	if (y > fadeMenuY) {
		$('ul.side-menu li a span').fadeOut(fadeTime);
	} else {
		$('ul.side-menu li a span').fadeIn();
	}
});

$( "ul.side-menu li" ).hover(
	function() {
		$('ul.side-menu li a span').fadeIn();
	},
	function() {
		var y = $(document).scrollTop();
		if (y > fadeMenuY) {
			$('ul.side-menu li a span').fadeOut(fadeTime);
		}
	}
);

$(document).ready(function() {
	var owl = $("#owl-slider");
	
	owl.owlCarousel({
		items : 4,
		itemsCustom : [
			[0, 1],   // 0-768 px 1 slide only
			[768, 3], // 768-1024 px 3 slides only
			[1024, 4] // 1024+ px 4 slides
		],
		pagination: false,
		autoPlay: 3000,
		addClassActive: true,
	});

	// Custom Navigation Events
	$(".next").click(function(){
	  owl.trigger('owl.next');
	});
	
	$(".prev").click(function(){
	  owl.trigger('owl.prev');
	});
	
 });