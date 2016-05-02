# 1.1.4 Mortal Kombat 2

- Sektor now ignores API limitations on the server-side, instead of throwing

# 1.1.1 Short Circuit

- Less bytes

# 1.1.0 Query Major

- Addressed an issue where `.querySelectorAll` would return elements incorrectly when passing a context root
- Fixed a bug where contextual queries without a prefix, such as `sektor('> foo', div)` would fail
- When providing an invalid selector, queries silently fail instead of throwing DOM errors

# 1.0.1 Minority Rapport

- Fixed a bug in `.matchesSelector` code path

# 1.0.0 IPO

- Initial Public Release
