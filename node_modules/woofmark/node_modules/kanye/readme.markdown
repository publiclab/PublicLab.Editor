# Kanye

> Smash your keyboards with ease

Browser support includes every sane browser and **IE7+**.

# Install

From `npm`

```shell
npm install kanye --save
```

From `bower`

```shell
bower install kanye --save
```

# API

Kanye exposes a few methods for interacting with keyboard events.

## `kanye.on(combo, options?, listener)`

Adds an event listener `listener` to the registry. This event listener will fire only when the user input is `combo`, and it can be optionally filtered by a `filter` selector.

The `combo` is expected to be a human-readable keyboard input string such as `cmd+a` or `cmd+shift+b`. If the conditions are satisfied, `listener` will be invoked passing the `event` as an argument. Options are outlined below and they can be omitted.

- `filter` allows you to filter out the event target based on a selector or a DOM element
- `context` allows you to group different shortcuts together, making them easier to remove on the future

## `kanye.off(combo, options?, listener)`

Removes an event listener previously registered by `kanye.on`. You'll need to specify the options again to make sure that the event listener is correctly removed.

## `kanye.clear(context?)`

Remove all event listeners previously added with `.on` to `context`. If a `context` is not provided, every single event listener ever registered with Kanye will be removed.

# License

MIT
