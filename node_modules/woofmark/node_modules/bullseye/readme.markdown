# bullseye

> Attach elements onto their target

# Install

```shell
npm install bullseye --save
```

```shell
bower install bullseye --save
```

# `bullseye(el, target?, options?)`

Position `el` according to the current position of `target`. In order to play well with friends, bullseye won't change the `position` CSS property, but instead leaves it up to you to set the appropriate `position` value on `el`. This way, we don't make it hard for you to set a different `position` value when you need to.

Option              | Description
--------------------|----------------------------------------------------------------------------------------------------------------------
`caret`             | When `true`, the tracked position will be right below the text selection caret instead of below the entire `target` element
`tracking`          | When not `false`, window resize events will update the position for `el`
`autoupdateToCaret` | Set to `false` if you don't want automatic position updates when `caret` is set to `true`

When you call `bullseye(el, target?, options?)`, you'll get back a tiny API to interact with the instance.

If `target` isn't provided, it'll match `el`. Bullseye supports operator overloading.

```js
bullseye(el)
bullseye(el, options)
bullseye(el, target)
bullseye(el, target, options)
```

### `.refresh()`

Refreshes position of `el` according to the current position of `target`.

### `.read()`

Returns the current position in `{ x, y }` format. Note that these values will be slightly modified in `.refresh()`, so it's _not 100% 1-to-1_.

### `.sleep()`

When `caret` is `true`, it becomes computationally expensive to figure out the position whenever a key is pressed. For that reason, you can put bullseye to sleep on `blur` events and wake it up on `focus`, calling `.refresh()`. This isn't done automatically for you to give you finer-grained control.

### `.destroy()`

Removes the `resize` event listener. Note that further calls to `.refresh` will throw exceptions.

# License

MIT
