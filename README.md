
Make simple [markdown-it](https://github.com/markdown-it/markdown-it) plugins easier.

## Usage:

```js
import md from 'markdown-it';
import createPlugin from '@hongminhee/markdown-it-regexp';

var plugin = Plugin(
  // regexp to match
  /@(\w+)/,

  // this function will be called when something matches
  function(match, utils, env) {
    if (!env.userExists(match[1])) return '@' + match[1];
    var url = 'http://example.org/u/' + match[1]

    return '<a href="' + utils.escape(url) + '">'
         + utils.escape(match[1])
         + '</a>'
  }
)

md()
  .use(plugin)
  .render("hello @user", { userExists: (u) => u === "user" })

// prints out:
// <p>hello <a href="http://example.org/u/user">user</a> and @user2</p>
```

## Fair warning:

1. it could be slower than you expect
2. it is a draft, breaking changes might happen
