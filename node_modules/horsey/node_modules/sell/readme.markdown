# Sell

> Cross-browser text selection made simple

# Install

```shell
npm install sell --save
```

# Use

Note that `el` must be either an `<input>` element or a `<textarea>`.

`sell(el)`

Returns an object like `{ start: 1, end: 3 }` indicating where the selection starts and ends.

`sell(el, p)`

Sets text selection on element `el` to a range `p`, like the ones returned from `sell(el)`. Note that you can set either `start` or `end` to the special `'end'` value, in which case `el.value.length` will be used.

# License

MIT
