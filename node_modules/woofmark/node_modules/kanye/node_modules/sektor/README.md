![sektor.png][5]

> A slim alternative to jQuery's [Sizzle][1]

Sektor has a smaller footprint than that of [Sizzle][1]. <span>Sektor is [**836B**][3]</span> minified and gzipped, vs <span>the [**7.01kB**][2] in Sizzle</span>.

This is the selector engine used in [Dominus][4].

# Install

```shell
npm install sektor --save
```

```shell
bower install sektor --save
```

# Usage

The public API exposed by `sektor` mirrors the API in [Sizzle][1]. This means `sektor` is a drop-in replacement for [Sizzle][1].

# Drawbacks

Sektor has a few drawbacks when compared against [Sizzle][1]. The following features are **missing in `sektor`, but available in [Sizzle][1]**. If you want any of these, use [Sizzle][1] instead!

##### Missing features

Sektor lacks support for custom state-based selectors popularized by Sizzle, such as `:visible`, `:first`, and so on.

While [Sizzle][1] fixes a few cross-browser incompatibilities by providing their own full-blown selection engine, Sektor doesn't fix all of them. You can check the complete list of cross-browser incompatibilities Sizzle fixes [in their source code][6].

Sektor _does_ correct the behavior in `.querySelectorAll` [for context-rooted queries][7].

##### Features I'm glad are missing

I consider these "features" bloat, and thus they aren't implemented in `sektor`.

* Attribute not equal selector
* Positional selectors (`:first`; `:eq(n)`; `:odd`; etc.)
* Type selectors (`:input`; `:checkbox`; `:button`; etc.)
* `:has(selector)`
* Complex negations `:not(complex selector)`
* Adding custom selectors via Sizzle extensions
* Reliable functionality on XML fragments
* Matching against non-elements
* Reliable sorting of disconnected nodes

# License

MIT

[1]: https://github.com/jquery/sizzle
[2]: https://github.com/jquery/sizzle/blob/master/dist/sizzle.min.js
[3]: https://github.com/bevacqua/sektor/blob/master/dist/sektor.min.js
[4]: https://github.com/bevacqua/dominus
[5]: https://raw.githubusercontent.com/bevacqua/sektor/master/resources/sektor.png
[6]: https://github.com/jquery/sizzle/blob/5bc4454a18b859025cbb8480c70bd3b7ec623ac0/src/sizzle.js#L602-L676
[7]: http://ejohn.org/blog/thoughts-on-queryselectorall/
