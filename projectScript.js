var main = function() {
	loadProjects();
	//loadProjectsNoAjax();
};

function printErrorMsg(XMLHttpRequest, errorMessage, errorThrown) {
	alert("LOAD FAILED!: " + errorMessage + ":" + errorThrown);
}


function insertProjects(data) {
	console.log($(data).find("project").length);
	var newHTML = "<div class =\"row\">";
	var project = $(data).find("project");
	for (i = 0; i < project.length; i++){
		console.log(project.eq(i).find("name").text());
		if (i%3 == 0){
			newHTML += "</div><div class =\"row\">"
		}
	}
	
	
	
//	$(data).find("project").each(function() {
//		var newHTML = "<div class=\"row\">";
//
//		// newHTML += "<div class=\"col-md-2\">";
//		// newHTML += "Title: " + $(this).find("title").text() + "<br>";
//		// newHTML += "Published: " + $(this).find("pubDate").text()
//		// + "<br>";
//		// newHTML += "Latitude: " + $(this).find("geo\\:lat,lat").text()
//		// + "<br>";
//		// newHTML += "Longitude: "
//		// + $(this).find("geo\\:long,long").text();
//		// newHTML += "</div>";
//		//
//		// newHTML += "<div class=\"col-md-2\">";
//		// newHTML += $(this).find("description").text();
//		// newHTML += "</div>";
//		//
//		newHTML += "HI WAT UP</div>";
//		$("#projects").append(newHTML);
//	});
}

function loadProjects() {
	$.ajax({
		url : "projects.xml",
		dataType : "xml",
		success : insertProjects,
		error : printErrorMsg
	});
}

$(document).ready(main);