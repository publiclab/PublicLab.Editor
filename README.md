PublicLab.Editor
====

[![Build Status](https://travis-ci.org/publiclab/PublicLab.Editor.svg)](https://travis-ci.org/publiclab/PublicLab.Editor)
[![Code of Conduct](https://img.shields.io/badge/code-of%20conduct-green.svg)](https://publiclab.org/conduct)
Please contact [plots-dev@googlegroups.com](mailto:plots-dev@googlegroups.com) to get involved! We'd love to make this editor compatible with other platforms.

PublicLab.Editor is a general purpose, modular JavaScript/Bootstrap UI library for rich text posting, which provides an author-friendly, minimal, mobile/desktop (fluid) interface for creating blog-like content, designed for [PublicLab.org](https://publiclab.org) (itself an [open source project](https://github.com/publiclab/plots2)).

PublicLab.Editor provides author-friendly interfaces for:

* titling
* main image uploading
* text body editing using [Woofmark](https://bevacqua.github.io/woofmark/) (markdown/WYSIWYG)
* tagging
* edit history

We may include an extensible API for adding custom content modules, for example:

* coauthoring: "add co-authors"
* "post a response" buttons
* event data (calendar selector, RSVP)
* related content selection: "this work is a response to post X"
* geotagging: "Use the map to show where this happened"
* data embedding: "Paste data here and choose a chart style" (via Chart.js?)

Some, or many of the above may be optionally based on [Public Lab Powertags](https://publiclab.org/wiki/power-tags). We may also include:

* client-side validation


## Design process

Design updates are [viewable on PublicLab.org](https://publiclab.org/tag/rich-editor).

You can try a very early, rough prototype here:

https://publiclab.github.io/PublicLab.Editor/examples/

![Screenshot](https://i.publiclab.org/system/images/photos/000/016/883/original/preview.png)


## Modules

The editor is built from different modules like:

* TitleModule
* MainImageModule
* EditorModule
* TagsModule
* HistoryModule
* RichTextModule
* MapModule

Each manages its own UI and validation, and which report their contents via a `module.value()` method. The EditorModule encapsulates all the modules. It contains a WYSIWYG textarea, managed (by default) by Woofmark.

### Default modules

The Title, MainImage, Tags, History, and RichText modules are on by default. To disable them for a more minimal editor, you can set them to false in the constructor options:

```js
var editor = new PL.Editor({ 
  mainImageModule: false // disable the MainImageModule
});
```
**Note:** The MapModule is NOT a default module, i.e., you will need to explicitly set `mapModule: true` in order to properly enable it in the parent HTML file.

### Module content

To input content into a module, the convention is to use that module's `value()` method, like this:

```js
editor.richTextModule.value('hello there'); // sets the richTextModule's content
```

You can also use `module.value()` as a getter, like this:

```js
var content = editor.richTextModule.value(); // get the richTextModule's content

editor.richTextModule.value(content + ' and then some'); // sets the richTextModule's content
```


To add a new field, or new behavior, extend `PublicLab.Module` or customize an existing module by extending it -- for example:

````js
PublicLab.Module.extend({
  init: function(_editor) {

    this._super(_editor);

  }
});
````
Module output is collected (by `editor.collectData()`) in the `editor.data` object -- a collection of values based on each `module.key`, assigning the value of `module.value()` to that key. So a module with a `key` of `nid`, for example, which returned `6` from `module.value()`, would result in `editor.data` being:

```js
{
  nid: 6
}
```

Because of this, each module must have a `key` property and a `value()` method. Some modules, like the TagsModule, will return their own value added to the existing value of `key`, so that multiple modules may add to the `tags` property of `editor.data`.

## Installation

To install PublicLab.Editor for development, you'll need [NodeJS](https://nodejs.org). You can get the detailed instruction on installing node and npm in its official [documentation](https://docs.npmjs.com/getting-started/installing-node).

After installing node and npm run `npm install` from the root directory.

PublicLab.Editor uses grunt - the javascript task runner for compilation of the modules. To install grunt run `npm install -g grunt-cli`. If you get permission errors, refer [this](https://stackoverflow.com/questions/16151018/npm-throws-error-without-sudo).

If you simply open the `examples/index.html` file in your browser, you will probably experience the [CORS offline issue](https://github.com/publiclab/PublicLab.Editor/issues/240). To avoid this, you need to access the Editor using a HTTP/HTTPS domain in your localhost, through a server. One option is to install [npm live server](https://www.npmjs.com/package/live-server) with the command `npm install -g live-server`.

Make changes to the files in the `/src/` directory, then run `grunt build` to compile into `/dist/PublicLab.Editor.js`. This will use `grunt-browserify` to concatenate and include any node modules named in `require()` statements. You'll then be able to try it out by opening the project's directory in your terminal and running the command `live-server`. When the project opens in your default browser, open the folder `/examples` to access the editor. Run `grunt` and leave it running to build as you go.

You can also run `grunt debug` to have *grunt-browserify* to include Source Maps for easy debugging. This way you can locate the module from where the error is generating. This is for use in development only.


## Setup

To use PublicLab.Editor, you'll need to follow [the template provided here](https://publiclab.github.io/PublicLab.Editor/examples/index.html), and use the following constructor:

````js
var editor = new PL.Editor({
  textarea: document.getElementById('my-textarea'),
  destination:        "/notes/create",   // content will Submit to this URL upon clicking "Publish"
  data: { // prepopulate fields:
    title:           "Your post title",
    body:            "Your post content",
    tags:            "nice,cool"
  }
});
````

To customize the @author and #tag autocompletes with your own suggestions, or with AJAX calls to your server, see the autocomplete example in `/examples/autocomplete.html`.

The editor toolbar comes in two different formats. You can use a smaller version by using a `size` property in the constructor. Refer to example given in `/examples/comment.html`

## Dependencies

As of `v1`, `PublicLab.Editor` requires `jQuery` to be included on the page, and some external `jQuery` plugins for the `TagsModule` and `MainImageModule`:

```html
<script src="../node_modules/jquery/dist/jquery.min.js"></script>

<!-- required for TagsModule -->
<script src="../node_modules/typeahead.js/dist/typeahead.jquery.js"></script>
<script src="../node_modules/typeahead.js/dist/bloodhound.js"></script>
<script src="../node_modules/bootstrap-tokenfield/dist/bootstrap-tokenfield.js"></script>

<!-- required for MainImageModule -->
<script src="../node_modules/blueimp-file-upload/js/vendor/jquery.ui.widget.js"></script>
<script src="../node_modules/blueimp-file-upload/js/jquery.iframe-transport.js"></script>
<script src="../node_modules/blueimp-file-upload/js/jquery.fileupload.js"></script>
```

These used to be compiled into `PublicLab.Editor` but are now external so that `jQuery` does not get included twice when using the editor in a page which already has `jQuery.


## Server

PublicLab.Editor expects a response from the server upon sending a request to `destination` that is a URL which it will follow.

### Creating a mock server

* Testing image upload and other features that depend on an interactive server is difficult with just a basic one-line webserver. Instead, you can set up the `plots2` project as explained here to see the Editor working interactively while you test out those features.

 * Clone [`plots2`](https://github.com/publiclab/plots2#standard-installation) and follow the [Standard Installation](https://github.com/publiclab/plots2#standard-installation) instructions to run it on your local server.
* Now in `plots2/package.json#` at `line 62`, replace this line with `"publiclab-editor": "file:..<path>"` where `<path>` is path of your cloned `PublicLab.Editor` repo folder
* Now with `passenger start` you can access the Editor at `localhost:3000/post`. Make changes in Editor's source code and run `grunt build` or `grunt debug` to bundle all files. Then run `yarn install --force` in plots2 repo to view changes on server.
* For reflecting HTML changes use   `plots2/app/views/editor/rich.html.erb` instead of example.html. They both have same structure.
* For reflecting the changes on the local server need to run `yarn install --force` and refresh your page.



****

## Modules

Various modules have different configurable options to be added to the options object, as seen in the [Integration section](#integration).

### Rich Text Module

**formats** -- provide an array of strings specifying allowed file extensions that may be uploaded inline in the rich text input area:

```js
var editor = new PL.Editor({
  textarea: document.getElementById('my-textarea'),
  richTextModule: {
    formats: ['xml', 'pdf', 'csv', 'stl']
  }
});
```
###  Atwho.js Data Module

`At.js` is essentially an autocompletion library to autocomplete mentions, smileys etc. just like you see on Github. It can be used to implement the following functionalities:

- Set up multiple listeners for different characters with different behavior and data.
- Format returned data using **custom templates**, that support keyboard and mouse imput.
- Custom data handlers and template renderers using a group of configurable callbacks.

We currently employ the `At.js` library to autocomplete authors, wiki pages, and emojis, by wiring them to the "@", "#", and ":" symbols respectively. Refer to the demonstration below for a better insight as to how this works.

![atwho_js](https://user-images.githubusercontent.com/33557095/53129501-b54e9e00-358d-11e9-8ebb-555ca5a1fdcc.gif)

**Usage and code snippets**
- Inorder to setup the autocompletion library, please follow these steps.
1.  Assuming that you have an installed copy of [At.js](https://www.npmjs.com/package/at-js) in your node modules, firstly, you need to include the minified CSS and JS builds and the emojis source file, `emoji.js` to your parent HTML.
````HTML
<link
      href="../node_modules/at.js/dist/css/jquery.atwho.min.css"
      rel="stylesheet"
    />
    <script src="../node_modules/at.js/dist/js/jquery.atwho.min.js"></script>
    <script src="data/emoji.js"></script>
````
2. Include the `At.js` data module script from `./examples/data/atwho.PLE.js`into your parent HTML.
````HTML
<script src="data/atwho.PLE.js"></script>
````
- **Callout watcher:** Triggered at the "@" character, the callout watcher recommends four most likely authors for the user's query. Upon selection, the profile of that particular user is rendered in an anchor tag.
````js
  at: "@",
  callbacks: {
    beforeInsert: function(value, obj) {
      username = value.slice(1);    // remove ambiguous first character
      value = "<a href='https://publiclab.org/profile/" + username + "' target='_blank'>" + value + "</a>";     //  render value as a link
      return value;
    },
    remoteFilter: function(query, callback) {
      $.getJSON(
        "https://publiclab.org/api/srch/profiles?query=" + query, {},     //  send user query to PL servers
        function(data) {
          if (data.hasOwnProperty("items") && data.items.length > 0) {
            callback(
              data.items.map(function(i) {
                return i.doc_title;     //  for every "item" return the author's name
              }));}});}},
  highlightFirst: true,     //  highlight the first suggestion
  limit: 4      //  limiter
````
- **Hastag watcher:** Triggered at the "#" character, the hashtag watcher recommends four most likely wikis for the user's query. Upon selection, the wiki page of that particular topic is rendered in an anchor tag.
````js
  at: "#",
  callbacks: {
    beforeInsert: function(value, obj) {
      value = value.slice(1);    // remove ambiguous first character
      tag = value.slice(value.lastIndexOf("/") + 1);      //  retrieve tag name
      value = "<a href='https://publiclab.org" + value + "' target='_blank'>#" + tag + "</a>";      //  render value as a link
      return value;
    },
    remoteFilter: function(query, callback) {
      $.getJSON(
        "https://publiclab.org/api/srch/tags?query=" + query, {},     //  send user query to PL servers
        function(data) {
          if (data.hasOwnProperty("items") && data.items.length > 0) {
            callback(
              data.items.map(function(i) {
                return i.doc_url;     //  for every "item" return the wiki's url
              }));}});} },
  highlightFirst: true,      //  highlight the first suggestion
  limit: 4
````
- **Emoji watcher:** Triggered at the ":" character, the emoji watcher recommends three most likely emojis for the user's query. Upon selection, the value of the particular emoji is rendered from the emoji source file `emoji.js`.
````js
if (e.key === ":") {
      var x = emoji;
      $(this).atwho({
        at: e.key,
        limit: 3,
        highlightFirst: true,     //  highlight the first suggestion
        data: keys,
        callbacks: {
          beforeInsert: function(value, obj) {
            value = value.slice(1);    // remove ambiguous first character
            value = x[value];     // retrieve respective emoji object's value from source
            return value;
````
Detailed documentation can be referred to at the [At.js wiki pages](https://github.com/ichord/At.js/wiki). Checkout this [link](http://publiclab.github.io/PublicLab.Editor/examples/) for a live demo!

### Tags Module

The Tags module uses [Bootstrap Tokenfield](https://github.com/sliptree/bootstrap-tokenfield). To add tags after initialization, use:

`editor.tagsModule.el.find('input').tokenfield('createToken', 'purple');`

### Map Module

To add Map module, pass `mapModule: true` in options. Also if you pass `lat: XX` and `lon: YY` in options it will show the map at coordinates [XX, YY]. You can optionally include a zoom parameter, by default the value of "5" will be used.

````js
editor = new PL.Editor({
    mapModule: true,
    lat: 23,
    lon: 77,
    zoom: 5
});
````


****

## Developers

Help improve Public Lab software!

To report bugs and request features, please use the GitHub issue tracker provided at https://github.com/publiclab/PublicLab.Editor/issues

For additional support, join the Public Lab website and mailing list at http://publiclab.org/lists or for urgent requests, email web@publiclab.org

* Join the 'plots-dev@googlegroups.com' discussion list to get involved
* Look for open issues at https://github.com/publiclab/PublicLab.Editor/issues
* We're specifically asking for help with issues labelled with [help-wanted](https://github.com/publiclab/PublicLab.Editor/labels/help-wanted) tag
* Find lots of info on contributing at http://publiclab.org/wiki/developers
* Review specific contributor guidelines at http://publiclab.org/wiki/contributing-to-public-lab-software
* Some devs hang out in http://publiclab.org/chat (irc webchat)


## Testing

Automated tests are an essential way to ensure that new changes don't break existing functionality, and can help you be confident that your code is ready to be merged in. We use Jasmine for testing: https://jasmine.github.io/2.4/introduction.html

To run tests, open /test.html in a browser. If you have phantomjs installed, you can run `grunt jasmine` to run tests on the commandline.

You can find the installation instructions for phantomjs in its official [build documentation](http://phantomjs.org/build.html). For Ubuntu/debian based system you can follow [these instructions](https://gist.github.com/julionc/7476620) or use the script mentioned there.

To add new tests, edit the `*_spec.js` files in `/spec/javascripts/`.


****


### Integration

Connect this editor to a parent server-side app, such as [PublicLab.org](https://github.com/publiclab/plots2) or other servers.

The API we'll be working from will include several server URLs, which we'll be building into the file at `src/adapters/PublicLab.Adaptors.js`:

* publishing by `POST` (`CREATE`) to `/notes/create` (will go to plots2's `notes_controller.rb#create`)
* updating by `UPDATE` to `/notes/update` (will go to plots2's `notes_controller.rb#update`)
* uploading images by `POST` to `/images/create` (will go to plots2's `images_controller.rb#create`)

#### Tags integration

The TagsModule uses Bloodhound for tag suggestions. It can make `GET` requests to the server to fetch recent tag suggestion, which returns data in json format like `/tags/recent.json`. You can also give your own suggestions in an array. Refer to the example given in `/examples/autocomplete.html`.

#### RichText integration

Similarly the RichText module (which wraps the Woofmark adaptor) may make `GET` requests to:

* fetch relevant tags from `/tags/related.json` with whatever relevant content to base "relatedness" on
* fetch relevant authors from `/authors/<foo>.json` with `<foo>` being the typeahead stub, like `@jyw` for `@jywarren`

These can be overridden within the options in a `richTextModule` object, like:

```js
var editor = new PL.Editor({
  textarea: document.getElementById('my-textarea'),
  richTextModule: {
    tagsUrl:    '/tags.json',
    authorsUrl: '/authors.json'
  }
});
```

#### Title integration

The TitleModule can make requests to find "related" content and suggest it be attached. Documentation on this can be found at:

https://github.com/publiclab/PublicLab.Editor/blob/master/src/modules/PublicLab.TitleModule.Related.js

****

### Compatibility

PublicLab.Editor uses jQuery 1.7+ or 2, and tests run on Node v5+. Other versions depended on are noted in the package.json file.
