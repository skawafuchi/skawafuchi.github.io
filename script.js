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
};

function loadProject(projectName) {
	$("#template").load("projectTemplate.html",function(){
		$.ajax({
			url : "projects.xml",
			dataType : "xml",
			success : function(xml){
				var projectData = $(xml).find('project[name="' + projectName + '"]');
				$("#name").text(projectData.find("name").text());
				if (projectData.find("time_frame").length){
					var start_date = projectData.find("start_date");
					var end_date =  projectData.find("end_date");
					var time_period = start_date.find("month").text() + " " + start_date.find("year").text() + " - " + end_date.find("month").text() + " " + end_date.find("year").text();
					$("#time_period").text(time_period);
				}												
	
				$("#project_description").text(projectData.find("full_description").text());

				projectData.find("member").each(function(){
					$("#team_members").append('<div style="font-size:18px;">' + $(this).text() + "</div>");
					
					if (typeof $(this).attr("role") !== typeof undefined && $(this).attr("role") !== false){
						$("#team_members").append('<div style="padding-left: 15px;">' +  $(this).attr("role")  + '</div>');
					}
				});
				
				if (projectData.find("note").length){
					$("#note").html('<div class="alert alert-danger" role="alert">' + projectData.find("note").text()+'</div>');
				}
				
				if (projectData.find("github_url").length){
					$("#links").append('<a href="' + projectData.find("github_url").text() + '" class="label label-info"><span class="glyphicon glyphicon-pencil"></span>Code on Github</a>');
				}
				if (projectData.find("download_url").length){
					$("#links").append('<a href="' + projectData.find("download_url").text() + '" class="label label-info"><span class="glyphicon glyphicon-download"></span>Download Project</a>');
				}
				if (projectData.find("play_url").length){
					$("#links").append('<a href="' + projectData.find("play_url").text() + '" class="label label-info"><span class="glyphicon glyphicon-screenshot"></span>Play Online!</a>');
				}

				projectData.find('tag[type="technology"]').each(function(){
					$("#technologies").append($(this).text() + "<br>");
				});
				
				if(projectData.find("youtube_url").length){
					$("#media").append('<iframe width="100%" height="315" src="http://www.youtube.com/embed/' +projectData.find("youtube_url").text()  + '" style="margin-top:20px;"></iframe><br>');
				}else{
					$("#media").append('<img class="project-image" src="' +projectData.find("urls").find("thumbnail_url").text()+ '" style="margin-top:20px; width:100%; height: 315px;">');
				}

			}
		});
	});
		
}


$(document).ready(main);