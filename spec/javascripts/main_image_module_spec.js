describe("MainImageModule", function() {


  it("reports key, value, valid", function() {

    var fixture = loadFixtures('index.html');

    var editor = new PL.Editor({
      textarea: $('.ple-textarea')[0],
      mainImageUrl: 'examples/example.gif'
    });

    var module = new PL.MainImageModule(editor, {});

    expect(module).not.toBeUndefined();
    expect(module.value()).not.toBe(false);
    expect(module.value()).not.toBeUndefined();
    expect(module.key).toBe('main_image_url');

    expect(module.options.name).toBe('main_image');
    expect(module.options.required).toBe(false);

    expect(module.valid()).toBe(true);
  });


  it("makes upload request", function(done) {

    var mainImageUrl = 'http://example.com/image.jpg',
        nid          = 3,
        uid          = 4;

    var fixture = loadFixtures('index.html');

    var editor = new PL.Editor({
      textarea: $('.ple-textarea')[0],
      mainImageModule: {
        nid: nid,
        uid: uid,
        uploadUrl: '/img' //overriding default '/images'
      }
    });

    jasmine.Ajax.install();


    var ajaxSpy = spyOn($, "ajax").and.callFake(function(options) {

      if (options.url === '/img') {

        // http://stackoverflow.com/questions/13148356/how-to-properly-unit-test-jquerys-ajax-promises-using-jasmine-and-or-sinon
        var d = $.Deferred();
        d.resolve(options);
        d.reject(options);
        return d.promise();

      }

    });

    function fileuploadsend(e, data) {

      expect(data.url).toBe('/img');
      expect(data.formData.nid).toBe(nid);
      expect(data.formData.uid).toBe(uid);

    }

    editor.mainImageModule.el.find('input').bind('fileuploadsend', fileuploadsend);

    function fileuploaddone(e, data) {

      expect(data).not.toBeUndefined();
 
      done();
      jasmine.Ajax.uninstall();
 
    }

    editor.mainImageModule.el.find('input').bind('fileuploaddone', fileuploaddone);

    var blob = new Blob(["fakedata"]);

    // https://github.com/blueimp/jQuery-File-Upload/wiki/API#programmatic-file-upload
    editor.mainImageModule.el.find('input').fileupload('add', {
      files: [
        blob
      ]
    });

  });


});
