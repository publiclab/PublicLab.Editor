 module.exports = function CustomInsert(_module, wysiwyg) {

 $('.wk-commands').append('<a class="woofmark-command-insert btn btn-default" data-toggle="Insert" title="Custom Insert"><i class="fa fa-table"></i></a>');

    var builder  = '<div class="dropdown" style="margin-bottom: 20px;">';
    	builder += '<button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true" >'
    	builder += '<span id= "selected">What Do you want to insert?</span>';
    	builder += '<span class="caret"></span>';
    	builder += '</button>';
    	builder += '<ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1" id="menu">';
    	builder += '<li role="presentation"><a role="menuitem" tabindex="-1">Notes</a></li>';
    	builder += '<li role="presentation"><a role="menuitem" tabindex="-1">Wikis</a></li>';
    	builder += '<li role="presentation"><a role="menuitem" tabindex="-1">Nodes(Wikis + Notes)</a></li>';    	
    	builder += '<li role="presentation"><a role="menuitem" tabindex="-1">Activity</a></li>';
    	builder += '<li role="presentation"><a role="menuitem" tabindex="-1">Questions</a></li>';    	    	
    	builder += '</ul>';
    	builder += '</div>'
    	builder += '<div class="dropdown" style="margin-bottom: 20px;">';
    	builder += '<button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">'
    	builder += '<span id="selected2">Insert as a</span>';
    	builder += '<span class="caret"></span>';
    	builder += '</button>';
    	builder += '<ul class="dropdown-menu" role ="menu" aria-labelledby="dropdownMenu2" id="menu2">';
    	builder += '<li role="presentation"><a role="menuitem" tabindex="-1">List</a></li>';
    	builder += '<li role="presentation"><a role="menuitem" tabindex="-1">Grid</a></li>';   	    	
    	builder += '</ul>'; 
    	builder += '</div>'; 
    	builder += '<div class="input-group">';
      	builder += '<input type="text" class="form-control" placeholder="Search for...">';
        builder += '<span class="input-group-btn">';
        builder += '<button class="btn btn-default" type="button">Go!</button>';
      	builder += '</span>';
    	builder += '</div>';
    	

	$('.woofmark-command-insert').attr('data-content', builder);
	$('.woofmark-command-insert').popover({ html : true,sanitize: false});
    $('.wk-commands .woofmark-command-insert').click(function() {
    $("#menu a").click(function(){
        $("#selected").text($(this).text());
    });
	})
    $('.wk-commands .woofmark-command-insert').click(function() {
    $("#menu2 a").click(function(){
        $("#selected2").text($(this).text());
    });
	})
}
