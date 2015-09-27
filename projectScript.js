//TODO add filters

var main = function() {
	loadProjects();

	$(".thumbnail").hover(function() {
		$(this).find('.caption').slideDown(200); 
	}, function() {
		$(this).find('.caption').slideUp(200);
	});
	
	//Phone transitions
	$(".thumbnail").on("tap",function() {
		$(this).find('.caption').slideDown(200); 

	});
	
	$(".caption").on("tap",function() {
		$(this).slideUp(200); 
	});
};



function printErrorMsg(XMLHttpRequest, errorMessage, errorThrown) {
	alert("LOAD FAILED!: " + errorMessage + ":" + errorThrown);
}


function insertProjects(data) {
	var newHTML = "<div class =\"row\">";
	var project = $(data).find("project");
	for (i = 0; i < project.length; i++){
		console.log(project.eq(i).find("name").text());
		if (i%3 == 0 && i != 0){
			newHTML += "</div><div class =\"row\">";
		}
		newHTML += "<div class=\"col-md-4\">";
		newHTML += "<h3>" + project.eq(i).find("name").text() + "</h3>";
		newHTML += "<div class=\"thumbnail\">";
		newHTML += "<div class=\"caption\" style=\"display: none;\">";
		newHTML += "<p>" + project.eq(i).find("short_description").text() + "<br><br> <a href=\"" + project.eq(i).find("urls").find("project_url").text() + "\" class=\"label label-info\" style=\"font-size: 20px;\">Visit Page</a></p>";
		newHTML += "</div>";//END CAPTION
		newHTML += "<img class=\"project-image\" src=\"" +project.eq(i).find("urls").find("thumbnail_url").text()+ "\">";
		newHTML += "</div></div>"; //END THUMBNAIL && END COL		
	}
	$("#projects").append(newHTML);
	console.log("finished inserting projects");
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