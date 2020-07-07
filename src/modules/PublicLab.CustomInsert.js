 module.exports = function CustomInsert(_module, wysiwyg) {
 	function Syntax(tag ,Option1, Option2) {
 		if(Option2 == "List") {
 			if(Option1 == "Notes") {
 				var syn = "[notes:" + tag + "]";
 			}
 			if(Option1 == "Wikis") {
 				var syn = "[wikis:" + tag + "]";
 			}
 			if(Option1 == "Nodes(Wikis + Notes)") {
 				var syn = "[nodes:" + tag + "]";
 			}
 			if(Option1 == "Activity") {
 				var syn = "[activity:" + tag + "]";
 			}
 			if(Option1 == "Questions") {
 				var syn = "[questions" + tag + "]";
 			}
 		}
 		if(Option2 == "Grid") {
 			if(Option1 == "Notes") {
 				var syn = "[notes:grid" + tag + "]";
 			}
 			if(Option1 == "Wikis") {
 				var syn = "[wikis:grid" + tag + "]";
 			}
 			if(Option1 == "Nodes(Wikis + Notes)") {
 				var syn = "[nodes:grid" + tag + "]";
 			}
 			if(Option1 == "Activity") {
 				var syn = "[activity:grid" + tag + "]";
 			}
 			if(Option1 == "Questions") {
 				var syn = "[questions:grid" + tag + "]";
 			}
 		}
 		return syn;
 	}

 $('.wk-commands').append('<a class="woofmark-command-insert btn btn-default" data-toggle="Insert" title="Custom Insert"><i class="glyphicon glyphicon-plus"></i></a>');

    var builder  = '<div class="dropdown" style="margin-bottom: 20px;">';
    	builder += '<button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true" style="min-width: 150px;" >'
    	builder += '<span id= "selected">What Do you want to insert?</span>';
    	builder += '<span class="caret"></span>';
    	builder += '</button>';
    	builder += '<ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1" id="menu">';
    	builder += '<li role="presentation"><a role="menuitem" tabindex="-1" id="Notes">Notes</a></li>';
    	builder += '<li role="presentation"><a role="menuitem" tabindex="-1" id="Wikis">Wikis</a></li>';
    	builder += '<li role="presentation"><a role="menuitem" tabindex="-1" id="Nodes">Nodes(Wikis + Notes)</a></li>';    	
    	builder += '<li role="presentation"><a role="menuitem" tabindex="-1" id="Activity">Activity</a></li>';
    	builder += '<li role="presentation"><a role="menuitem" tabindex="-1" id="Questions">Questions</a></li>';    	    	
    	builder += '</ul>';
    	builder += '</div>'
    	builder += '<div class="dropdown" style="margin-bottom: 20px;">';
    	builder += '<button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true" style="min-width: 150px;">'
    	builder += '<span id="selected2">Insert as a</span>';
    	builder += '<span class="caret"></span>';
    	builder += '</button>';
    	builder += '<ul class="dropdown-menu" role ="menu" aria-labelledby="dropdownMenu2" id="menu2">';
    	builder += '<li role="presentation"><a role="menuitem" tabindex="-1" id="List">List</a></li>';
    	builder += '<li role="presentation"><a role="menuitem" tabindex="-1" id="Grid">Grid</a></li>';   	    	
    	builder += '</ul>'; 
    	builder += '</div>'; 
    	builder += '<div class="input-group">';
      	builder += '<input type="text" class="form-control" placeholder="Search for..." id="inputText" style="min-width: 150px;">';
        builder += '<span class="input-group-btn">';
        builder += '<button class="btn btn-default" type="button" id ="go1">Go!</button>';
      	builder += '</span>';
    	builder += '</div>';
    	
    var Option1 = "Notes"; 
    var Option2 = "List";
	$('.woofmark-command-insert').attr('data-content', builder);
	$('.woofmark-command-insert').popover({ html : true,sanitize: false});
    $('.wk-commands .woofmark-command-insert').click(function() {
    $("#menu a").click(function(){
    	Option1 = $(this).text();
        $("#selected").text($(this).text());
    });
	})
    $('.wk-commands .woofmark-command-insert').click(function() {
    	$("#menu2 a").click(function(){
    		Option2 = $(this).text();
        	$("#selected2").text($(this).text());
    	});  
	})
	$('.wk-commands .woofmark-command-insert').click(function() {
		$('#go1').click(function(){
			wysiwyg.runCommand(function(chunks, mode){
				var syntax = Syntax($('#inputText')[0].value,Option1, Option2);
				if (mode === 'markdown') chunks.before += syntax;
        		else {
          			chunks.before += _module.wysiwyg.parseMarkdown(syntax);
          		} 
          	})
		})
    })
}
