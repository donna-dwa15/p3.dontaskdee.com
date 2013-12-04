/*-------------------------------------------------------------------------------------------------
Setup Tabbed Tools Menu For Comic Strip Creation
-------------------------------------------------------------------------------------------------*/
$( "#menu" ).tabs();

//set the default height of the content panels for tab menu
$( "#menu" ).tabs( "option", "heightStyle", "auto" );
//set the title tab to be the default active tab
$( "#menu" ).tabs( "option", "active", 0 );

/*-------------------------------------------------------------------------------------------------
Initialize Event Handling for Various Tools
-------------------------------------------------------------------------------------------------*/

/*-------------------------------------------------------------------------------------------------
Title Tab menu events
-------------------------------------------------------------------------------------------------*/
//Detect changes and update comic strip Title
$('#title-text').keyup(function(){
	$('#title').html($(this).val());
});

//Detect changes and update comic strip author info
$('#author-text').keyup(function(){
	$('#author').html($(this).val());
});

/*-------------------------------------------------------------------------------------------------
Background Tab menu events
-------------------------------------------------------------------------------------------------*/
//Update comic strip panels based on which "panels" radio button is selected and which background was clicked
$('.backgrounds').click(function(){
	var chosen_background = $(this).css('background-image');
	var selected_panel = $('input:radio[name="panels"]:checked').val();
	$('#'+selected_panel).css('background-image', chosen_background);
});

/*-------------------------------------------------------------------------------------------------
Character Tab menu events
-------------------------------------------------------------------------------------------------*/
//make characters draggable
$( ".characters" ).draggable(
	{ revert: true },
	{ helper: "clone" }
);

//Allow comic strip panels to accept characters and text balloons to be dragged over.
//Also copy the character/balloon that are also draggable within the panel
$(".comic-panels").droppable(
	{ accept: '.characters, .bubble-preview-span'}, 
	{drop: function(event,ui) { 
		var new_clone = ui.draggable.clone();
		if(new_clone.hasClass('characters'))
			new_clone.removeClass('characters').addClass('characters-clone').appendTo($(this));
		if(new_clone.hasClass('bubble-preview-span'))
			new_clone.removeClass('bubble-preview-span').addClass('bubble-clone').appendTo($(this));
		new_clone.draggable( {opacity:0.35} );
		}
	}
);

//NOT IMPLEMENTED YET - flip character horizontally
$('#flip-character').click(function(){

});

/*-------------------------------------------------------------------------------------------------
Text Tab menu events
Note: panel droppable code is above in the "Character Tab menu events" section
-------------------------------------------------------------------------------------------------*/
//make thought/speech/caption balloons draggable
$( ".bubble-preview-span" ).draggable(
	{ revert: true },
	{ helper: "clone" }
);

//Add click event to selectable text balloons.  On click, the selected balloon will display in the preview area
$('.balloons').click(function(){
	var chosen_balloon = $(this).attr("id");
	var preview_balloon = "";
	
	// Balloon type is the same as current, so do nothing
	if(chosen_balloon == "thought_icon" && $('#bubble-preview').hasClass('thought-bubble'))
		return;
	if(chosen_balloon == "speech-icon" && $('#bubble-preview').hasClass('bubble'))
		return;
	if(chosen_balloon == "caption-icon" && $('#bubble-preview').hasClass('caption-box'))
		return;
	
	// Figure out which new balloon style should be used
	if(chosen_balloon == "thought-icon")
		preview_balloon = "thought-bubble";
	else if(chosen_balloon == "speech-icon")
		preview_balloon = "bubble";
	else if(chosen_balloon == "caption-icon")
		preview_balloon = "caption-box";
		
	// Reset any current text in the preview box - both textarea and balloon
	$('#caption').val("");
	$('#q1').html("");
	
	$('#preview-area').show();
	$('#q1').removeClass();
	$('#bubble-preview').removeClass().addClass(preview_balloon);
});

//Flip Text Balloon horizontally
$('#flip-bubble').click(function(){
	if($('#bubble-preview').hasClass('flip')){
		$('#bubble-preview').removeClass('flip');
		$('#q1').removeClass('flip');
	}
	else {
		$('#bubble-preview').addClass('flip');
		$('#q1').addClass('flip');
	}
});

//Update text in chosen text ballon in preview area
$('#caption').keyup(function(){
	$('#q1').html($(this).val());
});

/*-------------------------------------------------------------------------------------------------
Print Tab menu event
-------------------------------------------------------------------------------------------------*/
$('#print-btn').click(function() {
    // Make a copy of the current comic strip to prepare for the new printable browser tab
    var canvas_clone = $('#comic-strip').clone();        
    var canvas = canvas_clone.prop('outerHTML');
    
    // For the new tab, reconstruct all the pieces we need for any HTML page starting with a start <html> tag.
    var new_tab_contents  = '<html>';
    
    // Append the rest of the contents including current stylings and font
    new_tab_contents += '<head>';
	new_tab_contents += '<title>The Cat\'s Meow Comic Creator</title>';
    new_tab_contents += '<link rel="stylesheet" href="css/main.css" type="text/css">';
    new_tab_contents += '<link rel="stylesheet" href="css/features.css" type="text/css">';
	new_tab_contents += '<link href="http://fonts.googleapis.com/css?family=Walter+Turncoat" rel="stylesheet" type="text/css">';
    new_tab_contents += '</head>';
    new_tab_contents += '<body>'; 
    new_tab_contents += canvas;
    new_tab_contents += '</body></html>';
    
    // Open the new tab
    var new_tab =  window.open();
    new_tab.document.open();
    new_tab.document.write(new_tab_contents);  
    // Close the tab
    new_tab.document.close();		
});
