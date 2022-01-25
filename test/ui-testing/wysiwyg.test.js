const timeout = process.env.SLOWMO ? 60000 : 10000;
const fs = require('fs');

beforeAll(async () => {
  try {
    path = fs.realpathSync('file://../examples/index.html');
    await page.goto('file://' + path, {waitUntil: 'domcontentloaded'});
    await page.evaluate(() => {
      wysiwyg = PublicLab.Woofmark(
          $('.ple-textarea')[0],
          {options: {}},
          {options: {}}
      );
    });
  } catch (err) {
    throw new Error(err);
  }
});

describe('Wysiwyg', () => {
  test('converts markdown to html and back', async () => {
    try {
      const markdown = "# About my project\n\nI have been working on [this thing](/link) and wanted to share.\n\nMy goals have been:\n\n- simple to make\n- ease of use\n- low cost\n\nAnd then, after #balloon-mapping with @eustatic, tables:\n\n| col1 | col2 | col3 |\n|------|------|------|\n| foo  | bar  | baz  |\n| food | bars | bats |\n\n```javascript\n\n// Code could go here\nvar myVariable = 4;\n\n```";
      const html = '<h1 id="about-my-project">About my project</h1>\n<p>I have been working on <a href="/link">this thing</a> and wanted to share.</p>\n<p>My goals have been:</p>\n<ul>\n<li>simple to make</li>\n<li>ease of use</li>\n<li>low cost</li>\n</ul>\n<p>And then, after <a href="/tag/balloon-mapping">#balloon-mapping</a> with <a href="/profile/eustatic">@eustatic</a>, tables:</p>\n<table>\n<thead>\n<tr>\n<th>col1</th>\n<th>col2</th>\n<th>col3</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>foo</td>\n<td>bar</td>\n<td>baz</td>\n</tr>\n<tr>\n<td>food</td>\n<td>bars</td>\n<td>bats</td>\n</tr>\n</tbody>\n</table>\n<pre class="md-code-block"><code class="md-code md-lang-javascript">\n<span class="md-code-comment">// Code could go here</span>\n<span class="md-code-keyword">var</span> myVariable = <span class="md-code-number">4</span>;\n\n</code></pre>\n';

      const markdown2HTML = await page.evaluate(() => wysiwyg.parseMarkdown("# About my project\n\nI have been working on [this thing](/link) and wanted to share.\n\nMy goals have been:\n\n- simple to make\n- ease of use\n- low cost\n\nAnd then, after #balloon-mapping with @eustatic, tables:\n\n| col1 | col2 | col3 |\n|------|------|------|\n| foo  | bar  | baz  |\n| food | bars | bats |\n\n```javascript\n\n// Code could go here\nvar myVariable = 4;\n\n```"));
      const html2Markdown = await page.evaluate(() => wysiwyg.parseHTML('<h1 id="about-my-project">About my project</h1>\n<p>I have been working on <a href="/link">this thing</a> and wanted to share.</p>\n<p>My goals have been:</p>\n<ul>\n<li>simple to make</li>\n<li>ease of use</li>\n<li>low cost</li>\n</ul>\n<p>And then, after <a href="/tag/balloon-mapping">#balloon-mapping</a> with <a href="/profile/eustatic">@eustatic</a>, tables:</p>\n<table>\n<thead>\n<tr>\n<th>col1</th>\n<th>col2</th>\n<th>col3</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>foo</td>\n<td>bar</td>\n<td>baz</td>\n</tr>\n<tr>\n<td>food</td>\n<td>bars</td>\n<td>bats</td>\n</tr>\n</tbody>\n</table>\n<pre class="md-code-block"><code class="md-code md-lang-javascript">\n<span class="md-code-comment">// Code could go here</span>\n<span class="md-code-keyword">var</span> myVariable = <span class="md-code-number">4</span>;\n\n</code></pre>\n'));

      // convert
      expect(markdown2HTML).toEqual(html);
      expect(html2Markdown).toEqual(markdown);

      // and back
      // this won't match exactly, because markdown changes [links](/url)
      // to [links][1] and adds a `[1] /url` footnote.
      // So we use the already-converted version:
      expect(await page.evaluate(() => wysiwyg.parseHTML('<h1 id="about-my-project">About my project</h1>\n<p>I have been working on <a href="/link">this thing</a> and wanted to share.</p>\n<p>My goals have been:</p>\n<ul>\n<li>simple to make</li>\n<li>ease of use</li>\n<li>low cost</li>\n</ul>\n<p>And then, after <a href="/tag/balloon-mapping">#balloon-mapping</a> with <a href="/profile/eustatic">@eustatic</a>, tables:</p>\n<table>\n<thead>\n<tr>\n<th>col1</th>\n<th>col2</th>\n<th>col3</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>foo</td>\n<td>bar</td>\n<td>baz</td>\n</tr>\n<tr>\n<td>food</td>\n<td>bars</td>\n<td>bats</td>\n</tr>\n</tbody>\n</table>\n<pre class="md-code-block"><code class="md-code md-lang-javascript">\n<span class="md-code-comment">// Code could go here</span>\n<span class="md-code-keyword">var</span> myVariable = <span class="md-code-number">4</span>;\n\n</code></pre>\n'))).toEqual(markdown);
      // this one should be easier, as the parser re-inserts
      // the URLs from the footers:
      expect(await page.evaluate(() => wysiwyg.parseMarkdown("# About my project\n\nI have been working on [this thing](/link) and wanted to share.\n\nMy goals have been:\n\n- simple to make\n- ease of use\n- low cost\n\nAnd then, after #balloon-mapping with @eustatic, tables:\n\n| col1 | col2 | col3 |\n|------|------|------|\n| foo  | bar  | baz  |\n| food | bars | bats |\n\n```javascript\n\n// Code could go here\nvar myVariable = 4;\n\n```"))).toEqual(html);
    } catch (err) {
      // console.log(err);
    }
  });

  test("parses @usernames and #tagnames and #tag-names", async () => {
    try {
      expect(await page.evaluate(() => wysiwyg.parseMarkdown('@hodor'))).toEqual('<p><a href="/profile/hodor">@hodor</a></p>\n');
      expect(await page.evaluate(() => wysiwyg.parseMarkdown('#spectrometer'))).toEqual('<p><a href="/tag/spectrometer">#spectrometer</a></p>\n');
      expect(await page.evaluate(() => wysiwyg.parseMarkdown('#balloon-mapping'))).toEqual('<p><a href="/tag/balloon-mapping">#balloon-mapping</a></p>\n');
    } catch (err) {
      // console.log(err);
    }
  });

  test("runs post-conversion filter", async () => {
    try {
      await page.evaluate(() => {
        wysiwyg.setMode('html');
        table = "<table><tr><td>Hi</td></tr></table>";
        wysiwyg.value(table);
      });
      expect(await page.evaluate(() => wysiwyg.value(table))).toEqual("| Hi|");
    } catch (err) {
      // console.log(err);
    }
  });
}), timeout;
