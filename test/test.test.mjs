import MarkdownIt from "markdown-it";
import createPlugin from "../";
import { expect, test } from "bun:test";

test("simple case", () => {
  const md = new MarkdownIt();
  expect(
    md.use(createPlugin(
      /@(\w+)/,

      function (match, utils, env) {
        if (!env.userExists(match[1])) return '@' + match[1];
        var url = 'http://example.org/u/' + match[1]

        return '<a href="' + utils.escape(url) + '">'
             + utils.escape(match[1])
             + '</a>'
      }
    ))
    .render("hello @user and @user2", { userExists: (u) => u === "user" })
  ).toBe(
    '<p>hello <a href="http://example.org/u/user">user</a> and @user2</p>\n'
  );
});