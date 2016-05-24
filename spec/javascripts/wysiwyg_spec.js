var wysiwyg;

describe("Wysiwyg", function() {

  beforeAll(function() {

    fixture = loadFixtures('index.html');

    wysiwyg = PublicLab.Woofmark($('.ple-textarea')[0], editor, {});

  });


  afterEach(function() {
  });


  it("converts markdown to html and back", function() {

    var markdown = "# About my project\n\nI have been working on [this thing][1] and wanted to share.\n\nMy goals have been:\n\n- simple to make\n- ease of use\n- low cost\n\nAnd then, after #balloon-mapping with @eustatic, tables:\n\n| col1 | col2 | col3 |\n|------|------|------|\n| foo  | bar  | baz  |\n| food | bars | bats |\n\n```javascript\n\n// Code could go here\nvar myVariable = 4;\n\n```\n\n[1]: /link";

    var html = '<h1 id="about-my-project">About my project</h1>\n<p>I have been working on <a href="/link">this thing</a> and wanted to share.</p>\n<p>My goals have been:</p>\n<ul>\n<li>simple to make</li>\n<li>ease of use</li>\n<li>low cost</li>\n</ul>\n<p>And then, after <a href="/tag/balloon">#balloon</a>-mapping with <a href="/profile/eustatic">@eustatic</a>, tables:</p>\n<table>\n<thead>\n<tr>\n<th>col1</th>\n<th>col2</th>\n<th>col3</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>foo</td>\n<td>bar</td>\n<td>baz</td>\n</tr>\n<tr>\n<td>food</td>\n<td>bars</td>\n<td>bats</td>\n</tr>\n</tbody>\n</table>\n<pre class="md-code-block"><code class="md-code md-lang-javascript">\n<span class="md-code-comment">// Code could go here</span>\n<span class="md-code-keyword">var</span> myVariable = <span class="md-code-number">4</span>;\n\n</code></pre>\n';

    var markdown2HTML = wysiwyg.parseMarkdown(markdown);
    var html2Markdown = wysiwyg.parseHTML(html);

    // convert
    expect(markdown2HTML).toEqual(html);
    expect(html2Markdown).toEqual(markdown);

    // and back
    // this won't match exactly, because markdown changes [links](/url) 
    // to [links][1] and adds a `[1] /url` footnote. 
    // So we use the already-converted version:
    expect(wysiwyg.parseHTML(markdown2HTML)).toEqual(markdown);
    // this one should be easier, as the parser re-inserts 
    // the URLs from the footers:
    expect(wysiwyg.parseMarkdown(html2Markdown)).toEqual(html);

  });


  xit("recognizes @callouts and #hashtags", function() {
  });


});
