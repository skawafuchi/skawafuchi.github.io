var main = function(){
	
	//makes pictures in carousel clickable links 
	$(".item").click(function(){
		window.location = $(this).find("a").attr("href");		
	});
	
	//makes cursor change to pointer when hovering over carousel pictures
	$(".item").hover(function() {
	    $(this).css('cursor','pointer');
	}, function() {
	    $(this).css('cursor','auto');
		
	});
};

$(document).ready(main);