
module.exports = function CustomInsert(_module, wysiwyg) {
  function Syntax(Latitude, Longitude, Layers) {
    var syn = "[map:content:" + Latitude + ":" + Longitude;
    if(Layers)
      syn = syn + ":" + Layers;
    syn = syn + "]"        
    return syn;
  }

  $('.wk-commands').append('<a class="woofmark-command-insert-map btn btn-default" data-toggle="Insert" title="Custom Insert Maps"><i class="fa fa-globe"></i></a>');

  var builder =  '<div class="input-group">';
  builder += '<input type="number" class="form-control" placeholder="Latitude" id="Latitude" style="min-width: 150px;" required>';
  builder += '<input type="number" class="form-control" placeholder="Longitude" id="Longitude" style="min-width: 150px;">';
  builder += '<input type="text" class="form-control" placeholder="Preset Layers(separated with commas)" id="layer" style="min-width: 150px;">';
  builder += '<button class="btn btn-default" type="button" id ="submit">Go!</button>';
  builder += '</div>';
  
  $('.woofmark-command-insert-map').attr('data-content', builder);
  $('.woofmark-command-insert-map').attr('data-container', 'body');
  $('.woofmark-command-insert-map').attr('data-placement','top');
  $('.woofmark-command-insert-map').popover({ html : true,sanitize: false});
  $('.wk-commands .woofmark-command-insert-map').click(function() {
    $('#submit').click(function(){
      wysiwyg.runCommand(function(chunks, mode){
        var syntax = Syntax($('#Latitude')[0].value, $('#Longitude')[0].value, $('#layer')[0].value);
        if (mode === 'markdown') chunks.before += syntax;
        else {
         chunks.before += _module.wysiwyg.parseMarkdown(syntax);
       } 
     })
    })
  })
}
