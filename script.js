var main = function() {
	addFunctionality();
};

function addFunctionality(){
	

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
		}, 100);
	}, function() {
		$(this).animate({
			opacity : '0.7'
		},100);
	});
}

function showMore(){
	$('#directions').toggle();
	if ($('#show_more_button').text() === "See more"){
		$('#show_more_button').html("See less");
	}else{
		$('#show_more_button').html("See more");
	}
	
	
}

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
				
				
				if (projectData.find("directions").length){
						$("#project_description").append('<button type="button" id="show_more_button" class="btn btn-link" onclick="showMore()">See more</button>');
						if (projectData.find("setup").length){
							$("#directions").append('<h3>Setup</h3><p>' + projectData.find("setup").text() + '</p>');
						}
						if (projectData.find("objective").length){
							$("#directions").append('<h3>Objective</h3><p>' + projectData.find("objective").text() + '</p>');
						}
						if (projectData.find("how_to_play").length){
							$("#directions").append('<h3>How To Play</h3><p>' + projectData.find("how_to_play").text() + '</p>');
						}
						if (projectData.find("hotkeys").length){
							$("#directions").append('<h3>Hotkeys</h3><p><table class="table" id="hotkey_table"><thead><tr><th>Hotkey</th><th>Description</th></tr></thead><tbody id="hotkey_rows"></tbody></table>');
							var temp = "";
							projectData.find('hotkey').each(function(){
								$("#hotkey_rows").append('<tr><td>' + $(this).find("value").text() + '</td><td>' + $(this).find("description").text() + '</td></tr>');
							});
							
						}
				}

				projectData.find("member").each(function(){
					$("#team_members").append('<div style="font-size:18px;">' + $(this).text() + "</div>");
					
					if (typeof $(this).attr("role") !== typeof undefined && $(this).attr("role") !== false){
						$("#team_members").append('<div style="padding-left: 15px;">' +  $(this).attr("role")  + '</div>');
					}
				});
				
				if (projectData.find("note").length){
					console.log($(this).attr("type"));
					if ($(this).attr("type") == 'warning'){
						$("#note").html('<div class="alert alert-danger" role="alert">' + projectData.find("note").text()+'</div>');
					}else if ($(this).attr("type") == 'alert'){
						console
						$("#note").html('<div class="alert alert-success" role="alert">' + projectData.find("note").text()+'</div>');
					}
				}
				
				
				if(projectData.find("youtube_url").length){
					$("#media").append('<iframe width="100%" height="315" src="http://www.youtube.com/embed/' +projectData.find("youtube_url").text()  + '" style="margin-top:20px; margin-bottom:10px;"></iframe><br>');
				}else{
					$("#media").append('<img class="project-image" src="' +projectData.find("urls").find("thumbnail_url").text()+ '" style="margin-top:20px; margin-bottom:10px; width:100%; height: 315px;">');
				}
				
				if (projectData.find("github_url").length){
					$("#links").append('<a href="' + projectData.find("github_url").text() + '" class="label label-info"><span class="glyphicon glyphicon-pencil"></span>Code on Github</a>');
				}
				if (projectData.find("download_url").length){
					$("#links").append('<a href="' + projectData.find("download_url").text() + '" class="label label-info"><span class="glyphicon glyphicon-download"></span>Download Project</a>');
				}
				if (projectData.find("play_url").length){
					$("#links").append('<a href="' + projectData.find("play_url").text() + '" class="label label-info"><span class="glyphicon glyphicon-screenshot"></span>View Online!</a>');
				}

				projectData.find('tag[type="technology"]').each(function(){
					$("#technologies").append('<a href="' + $(this).find('wiki_link').text()+ '"><img src="images/icons/Wikipedia Icon.png"> </a> <a href="' +
							$(this).find('direct_link').text() + '">' + $(this).find('value').text()+ '</a><br>');
				});
				
				if(projectData.find("design").length){
					projectData.find("level").each(function(){
						$("#design").append('<div class="row"><div class="col-md-5"><a href="'+$(this).find("level_image").text()+'"><img class="level-image" src="' +$(this).find("level_image").text()+ '" style="margin-top:20px; margin-bottom:10px; width:100%; height: 315px;"></a></div>' + 
						'<div class="col-md-7"><h3>' + $(this).find("level_title").text() + '</h3>' + 
						'<p>' + $(this).find("level_description").text() + '</p>' + 
						'<h3>Level Notes</h3>' + 
						'<p>' + $(this).find("level_notes").text() + '</p></div></div>');
					});					
				}

			}
		});
		addFunctionality();});

}


$(document).ready(main);