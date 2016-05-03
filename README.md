PublicLab.Editor
====

**This library is incomplete -- this page is a very rough planning document.**

Please contact [plots-dev@googlegroups.com](mailto:plots-dev@googlegroups.com) to get involved! We'd love to make this editor compatible with other platforms.

PublicLab.Editor is a general purpose, JavaScript/Bootstrap UI framework for rich text posting, which provides an author-friendly, minimal, mobile/desktop (fluid) interface for creating blog-like content, designed for [PublicLab.org](https://publiclab.org) (itself an [open source project](https://github.com/publiclab/plots2)).

PublicLab.Editor will provide author-friendly interfaces for:

* titling
* main image uploading
* body editing using [Woofmark](https://bevacqua.github.io/woofmark/) (markdown/WYSIWYG)
* tagging
* edit history

You can try a very early, rough prototype here: https://publiclab.github.io/PublicLab.Editor/examples/

We may include an extensible API for adding custom content modules, for example:

* coauthoring: "add co-authors"
* "post a response" buttons
* event data (calendar selector, RSVP)
* related content selection: "this work is a response to post X"
* geotagging: "Use the map to show where this happened"
* data embedding: "Paste data here and choose a chart style" (via Chart.js?)

Some, or many of the above may be optionally based on [Public Lab Powertags](https://publiclab.org/wiki/power-tags). We may also include:

* client-side validation


### Setup

To use PublicLab.Editor, you'll need to follow [the template provided here](https://publiclab.github.io/PublicLab.Editor/examples/), and use the following constructor:

````js
var editor = PublicLab.Editor({
  publishUrl:      "/notes",            // content will POST to this URL upon clicking "Publish"
  updateUrl:       "/notes",            // content will UPDATE to this URL upon clicking "Save"
  relatedTagsUrl:  "/notes",            // content will UPDATE to this URL upon clicking "Save"
  newPost:         true,                // is it a new post, or are you editing an existing post?
  title:           "Your post title",
  body:            "Your post content",
  tags:            "nice,cool"
  // maybe more?
});
````


****


### Integration with PublicLab.org

The API we'll be working from will include several server URLs:

* publishing by `POST` (`CREATE`?) to `/notes` (will go to plots2's `notes_controller.rb#create`)
* updating by `UPDATE` to `/notes` (will go to plots2's `notes_controller.rb#update`)
* uploading images by `POST` to `/images` (will go to plots2's `images_controller.rb#create`)

The tagging module may make `GET` requests to:

* fetching recent tags from `/tags/recent.json`
* fetching relevant tags from `/tags/related.json` with whatever relevant content to base "relatedness" on
* fetching relevant authors from `/authors/<foo>.json` with `<foo>` being the typeahead stub, like `@jyw` for `@jywarren`



