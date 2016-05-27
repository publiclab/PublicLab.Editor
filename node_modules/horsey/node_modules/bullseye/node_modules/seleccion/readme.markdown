# seleccion

> A `getSelection` polyfill and a `setSelection` dreamweaver

Includes also a `setSelection` method. See also [sell][2] to work with selection within `<input>` and `<textarea>` elements.

# install

```shell
npm install seleccion
```

# `seleccion.getSelection`

Provides a polyfill for `window.getSelection`.

```js
var getSelection = require('seleccion').get;
```

- Defaults to `window.getSelection` if available
- Falls back to `document.selection`
- Falls back to a naïve null object if both are unavailable

# `seleccion.set(range)`

Provides a convenient cross-browser method to set the text selection into `range`.

```js
var setSelection = require('seleccion').set;
setSelection({
  startContainer: document.querySelector('#some-span'),
  startOffset: 0,
  endContainer: document.querySelector('#another-span'),
  endOffset: 24,
  collapsed: false
});
```

# license

MIT

[1]: https://msdn.microsoft.com/en-us/library/ms536401(v=vs.85).aspx
