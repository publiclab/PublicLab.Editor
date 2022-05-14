/*
   Embed insertion: <iframe width="560" height="315" src="https://www.youtube.com/embed/Ej_l1hANqMc" frameborder="0" allowfullscreen></iframe>
*/


module.exports = function initAthwo(_module, wysiwyg) {
  var calloutWatcher = {
    at: "@",
    callbacks: {
      beforeInsert: function(value, obj) {
        console.log('module extension');
        username = value.slice(1);
        value =
              "<a href='https://publiclab.org/profile/" +
              username +
              "' target='_blank'>" +
              value +
              "</a>";
        return value;
      },
      remoteFilter: function(query, callback) {
        $.getJSON(
            "https://publiclab.org/api/srch/profiles?query=" + query,
            {},
            function(data) {
              if (data.hasOwnProperty("items") && data.items.length > 0) {
                callback(
                    data.items.map(function(i) {
                      return i.doc_title;
                    })
                );
              }
            }
        );
      }
    },
    highlightFirst: true,
    limit: 4
  };

  var hashtagWatcher = {
    at: "#",
    callbacks: {
      beforeInsert: function(value, obj) {
        value = value.slice(1);
        tag = value.slice(value.lastIndexOf("/") + 1);
        value =
              "<a href='https://publiclab.org" +
              value +
              "' target='_blank'>#" +
              tag +
              "</a>";
        return value;
      },
      remoteFilter: function(query, callback) {
        if (Number.isInteger(Number(query))) {
          callback(null);
          return;
        }

        $.getJSON(
            "https://publiclab.org/api/srch/tags?query=" + query,
            {},
            function(data) {
              if (data.hasOwnProperty("items") && data.items.length > 0) {
                callback(
                    data.items.map(function(i) {
                      return i.doc_url;
                    })
                );
              }
            }
        );
      }
    },
    highlightFirst: true,
    limit: 4
  };

  $(".wk-wysiwyg")
      .atwho(calloutWatcher)
      .atwho(hashtagWatcher)
      .keypress(function(e) {
        if (e.key === ":") {
          var x = emoji;
          $(this).atwho({
            at: e.key,
            limit: 3,
            highlightFirst: true,
            data: keys,
            callbacks: {
              beforeInsert: function(value, obj) {
                value = value.slice(1);
                value = x[value];
                return value;
              }
            }
          });
        }
      });
};
