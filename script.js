var main = function() {

	// makes pictures in carousel clickable links
	$(".item").click(function() {
		window.location = $(this).find("a").attr("href");
	});

	// makes cursor change to pointer when hovering over carousel pictures
	$(".item").hover(function() {
		$(this).css('cursor', 'pointer');
	}, function() {
		$(this).css('cursor', 'auto');
	});

	// makes icons at bottom animate when hovered over
	$(".icon").hover(function() {
		$(this).animate({
			opacity : '1.0'
		}, 200);
	}, function() {
		$(this).animate({
			opacity : '0.7'
		});
	});

	$(".thumbnail").hover(function() {
		$(this).find('.caption').slideDown(200); 
	}, function() {
		$(this).find('.caption').slideUp(200);
	});

};

$(document).ready(main);