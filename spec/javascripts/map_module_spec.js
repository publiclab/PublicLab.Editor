var editor, module;

describe("MapModule", function() {

  beforeAll(function() {

    fixture = loadFixtures('index.html');

    editor = new PL.Editor({
      textarea: $('.ple-textarea')[0],
      mapModule: true
    });

    module = editor.mapModule;

  });


  it("reports key, value, valid", function() {

    expect(module).not.toBeUndefined();
    expect(module.key).toBe('map_data');

    expect(module.options.name).toBe('map');
    expect(module.options.required).toBe(false);

    expect(module.valid()).toBe(true);

  });


  xit("accepts inputs", function() {



  });

});
