var editor;

describe("Wysiwyg", function() {

  beforeAll(function() {

    fixture = loadFixtures('index.html');

    editor = new PL.Editor({
      textarea: $('.ple-textarea')[0]
    });

  });


  afterEach(function() {
  });


  xit("converts markdown to html and back", function() {

    var markdown = "# About my project\n\nI have been working on [this thing](/) and wanted to share.\n\nMy goals have been:\n\n* simple to make\n* ease of use\n* low cost\n\n| col1 | col2 | col3 |\n|------|------|------|\n| foo  | bar  | baz  |\n| food | bars | bats |\n\n````js\n\n// Code could go here\nvar myVariable = 4;\n\n````";

    var html = '<h1 id="about-my-project">About my project</h1>\n<p>I have been working on <a href="/">this thing</a> and wanted to share.</p\n<p>My goals have been:</p\n<ul\n<li>simple to make</li\n<li>ease of use</li>\n<li>low cost</li>\n</ul>\n<table class="table">\n<thead>\n<tr>\n<th>col1</th>\n<th>col2</th>\n<th>col3</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>foo</td>\n<td>bar</td>\n<td>baz</td>\n</tr>\n<tr>\n<td>food</td>\n<td>bars</td>\n<td>bats</td>\n</tr>\n</tbody>\n</table>\n<pre class="md-code-block"><code class="md-code md-lang-javascript">\n<span class="md-code-comment">// Code could go here</span>\n<span class="md-code-keyword">var</span> myVariable = <span class="md-code-number">4</span>;\n\n</code></pre>';

    var markdown2HTML = PublicLab.wysiwyg.parseMarkdown(markdown);
    var html2Markdown = PublicLab.wysiwyg.parseHTML(html);

    // convert
    expect(markdown2HTML).toEqual(html);
    expect(html2Markdown)).toEqual(markdown);

    // and back
    expect(PublicLab.wysiwyg.parseHTML(markdown2HTML)).toEqual(markdown);
    expect(PublicLab.wysiwyg.parseMarkdown(html2Markdown)).toEqual(html);

  });


  xit("recognizes @callouts and #hashtags", function() {
  });


});
