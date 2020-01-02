/*
 Table generation:

| col1 | col2 | col3 |
|------|------|------|
| cell | cell | cell |
| cell | cell | cell |
*/

module.exports = function initTables(_module, wysiwyg) {

  function createTable(cols, rows) {

    cols = cols || 3;
    rows = rows || 2;

    var table = "|";

    for (var col = 0; col < cols; col++) {

      table = table + " col" + col + " |";

    }

    table = table + "\n|";

    for (var col = 0; col < cols; col++) {

      table = table + "------|";

    }

    table = table + "\n";

    for (var row = 0; row < rows; row++) {

      table = table + "|";

      for (var col = 0; col < cols; col++) {
     
        table = table + " cell |";
     
      }

      table = table + "\n";

    }

    return table + "\n";

  }


  // create a submenu for sizing tables
  $('.wk-commands').append('<a class="woofmark-command-table btn btn-default" data-toggle="table" title="Table <table>"><i class="fa fa-table"></i></a>');

  $(document).ready(function(){
    $('[data-toggle="table"]').tooltip();   
  });

  var builder  = '<div class="form-inline form-group ple-table-popover" style="width:400px;">';
        builder += '<a id="decRows" class="btn btn-sm btn-default"><i class="fa fa-minus"></i></a> <span id="tableRows">4</span> <a id="incRows" class="btn btn-sm btn-default"><i class="fa fa-plus"></i></a>';
        builder += ' x ';
        builder += '<a id="decCols" class="btn btn-sm btn-default"><i class="fa fa-minus"></i></a> <span id="tableCols">3</span> <a id="incCols" class="btn btn-sm btn-default"><i class="fa fa-plus"></i></a>';
        builder += '&nbsp;<a class="ple-table-size btn btn-default">Add</a>';
        builder += '</div>';

    $('.woofmark-command-table').attr('data-content', builder);


    $(document).on('click', '#incRows', function(){ $("#tableRows").text( Number($("#tableRows").text()) + 1 ); });
    $(document).on('click', '#decRows', function(){ $("#tableRows").text( Number($("#tableRows").text()) - 1 ); });
    $(document).on('click', '#incCols', function(){ $("#tableCols").text( Number($("#tableCols").text()) + 1 ); });
    $(document).on('click', '#decCols', function(){ $("#tableCols").text( Number($("#tableCols").text()) - 1 ); });

  $('.woofmark-command-table').attr('data-content', builder);
  $('.woofmark-command-table').attr('data-container', 'body');
  $('.woofmark-command-table').attr('data-placement','top');

  $('.woofmark-command-table').popover({ html : true });

  $('.wk-commands .woofmark-command-table').click(function() {

    $('.ple-table-size').click(function() {

      wysiwyg.runCommand(function(chunks, mode) {

        var table = createTable(
          +Number($('.ple-table-popover #tableCols').text()),
          +Number($('.ple-table-popover #tableRows').text())
        );

        if (mode === 'markdown') chunks.before += table;
        else {

          chunks.before += _module.wysiwyg.parseMarkdown(table);
          setTimeout(_module.afterParse, 0); // do this asynchronously so it applies Boostrap table styling

        }

        $('.woofmark-command-table').popover('toggle');

      });

    });

  });

}
