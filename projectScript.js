//TODO add filters
var options = [ "Website", "Game" ];
var main = function() {
	loadProjects();
	addInteractions();
	$('.dropdown-menu a').on(
			'click',
			function(event) {

				var $target = $(event.currentTarget), val = $target
						.attr('data-value'), $inp = $target.find('input'), idx;

				if ((idx = options.indexOf(val)) > -1) {
					options.splice(idx, 1);
					setTimeout(function() {
						$inp.prop('checked', false)
					}, 0);
				} else {
					options.push(val);
					setTimeout(function() {
						$inp.prop('checked', true)
					}, 0);
				}

				$(event.target).blur();
				console.log(options);
				console.log("Game is in the array is: "+ ($.inArray("Game", options) === -1? "false":"true"));
				console.log("Website is in the array is: "+ ($.inArray("Website", options) === -1?"false":"true"));
				loadProjects();
				addInteractions();
				return false;
			});
};

function addInteractions(){
	

	$(".thumbnail").hover(function() {
		$(this).find('.caption').slideDown(200);
	}, function() {
		$(this).find('.caption').slideUp(200);
	});	
}

function printErrorMsg(XMLHttpRequest, errorMessage, errorThrown) {
	alert("LOAD FAILED!: " + errorMessage + ":" + errorThrown);
}

function insertProjects(data) {
	var newHTML = "<div class =\"row\"><div class=\"container\">";
	var project = $(data).find("project");
	var projectsAdded = 0;
	for (i = 0; i < project.length; i++) {
		if (($.inArray("Game", options) !== -1 && project.eq(i).find('tag[type="filter"]').find('value').text() === "Game") ||
				($.inArray("Website", options) !== -1 && project.eq(i).find('tag[type="filter"]').find('value').text() === "Website")) {
			if (projectsAdded % 3 == 0 && i != 0) {
				newHTML += '</div></div><div class ="row"><div class="container">';
			}
			newHTML += '<div class="col-md-4">';
			newHTML += '<h3>' + project.eq(i).find("name").text() + '</h3>';
			newHTML += '<div class="thumbnail">';
			newHTML += '<div class="caption" style="display: none;">';
			newHTML += '<p>'
					+ project.eq(i).find("short_description").text()
					+ '<br><br> <a href="'
					+ project.eq(i).find("urls").find("project_url").text()
					+ '" class="label label-info" style="font-size: 20px;">Visit Page</a></p>';
			newHTML += '</div>';// END CAPTION
			newHTML += '<img class="project-image" src="'
					+ project.eq(i).find("urls").find("thumbnail_url").text()
					+ '">';
			newHTML += '</div></div>'; // END THUMBNAIL && END COL
			projectsAdded++;
		}
	}
	$("#projects").html(newHTML);
}

function loadProjects() {
	$.ajax({
		url : "projects.xml",
		dataType : "xml",
		async : false,
		success : insertProjects,
		error : printErrorMsg
	});
}

$(document).ready(main);