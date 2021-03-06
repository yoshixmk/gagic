/* PrismJS 1.21.0
https://prismjs.com/download.html#themes=prism&languages=markup+css+clike+javascript+aspnet+autoit+bash+c+csharp+cpp+clojure+coffeescript+css-extras+dart+diff+django+docker+elm+erlang+git+go+graphql+handlebars+haskell+http+ini+java+javadoc+javadoclike+jsdoc+js-extras+json+json5+jsonp+js-templates+kotlin+latex+less+livescript+makefile+markdown+markup-templating+matlab+nginx+objectivec+ocaml+perl+php+phpdoc+php-extras+powershell+python+jsx+tsx+ruby+rust+sass+scss+shell-session+stylus+swift+textile+typescript+vim+visual-basic+wasm+xml-doc+yaml&plugins=autolinker+inline-color+diff-highlight */
var _self = "undefined" != typeof window
    ? window
    : "undefined" != typeof WorkerGlobalScope &&
        self instanceof WorkerGlobalScope
    ? self
    : {},
  Prism = function (u) {
    var c = /\blang(?:uage)?-([\w-]+)\b/i,
      n = 0,
      M = {
        manual: u.Prism && u.Prism.manual,
        disableWorkerMessageHandler: u.Prism &&
          u.Prism.disableWorkerMessageHandler,
        util: {
          encode: function e(n) {
            return n instanceof W
              ? new W(n.type, e(n.content), n.alias)
              : Array.isArray(n)
              ? n.map(e)
              : n.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(
                /\u00a0/g,
                " ",
              );
          },
          type: function (e) {
            return Object.prototype.toString.call(e).slice(8, -1);
          },
          objId: function (e) {
            return e.__id || Object.defineProperty(e, "__id", { value: ++n }),
              e.__id;
          },
          clone: function t(e, r) {
            var a, n;
            switch (r = r || {}, M.util.type(e)) {
              case "Object":
                if (n = M.util.objId(e), r[n]) return r[n];
                for (var i in a = {}, r[n] = a, e) {
                  e.hasOwnProperty(i) && (a[i] = t(e[i], r));
                }
                return a;
              case "Array":
                return n = M.util.objId(e),
                  r[n] ? r[n] : (a = [],
                    r[n] = a,
                    e.forEach(function (e, n) {
                      a[n] = t(e, r);
                    }),
                    a);
              default:
                return e;
            }
          },
          getLanguage: function (e) {
            for (; e && !c.test(e.className);) e = e.parentElement;
            return e
              ? (e.className.match(c) || [, "none"])[1].toLowerCase()
              : "none";
          },
          currentScript: function () {
            if ("undefined" == typeof document) return null;
            if ("currentScript" in document) return document.currentScript;
            try {
              throw new Error();
            } catch (e) {
              var n = (/at [^(\r\n]*\((.*):.+:.+\)$/i.exec(e.stack) || [])[1];
              if (n) {
                var t = document.getElementsByTagName("script");
                for (var r in t) if (t[r].src == n) return t[r];
              }
              return null;
            }
          },
          isActive: function (e, n, t) {
            for (var r = "no-" + n; e;) {
              var a = e.classList;
              if (a.contains(n)) return !0;
              if (a.contains(r)) {
                return !1;
              }
              e = e.parentElement;
            }
            return !!t;
          },
        },
        languages: {
          extend: function (e, n) {
            var t = M.util.clone(M.languages[e]);
            for (var r in n) t[r] = n[r];
            return t;
          },
          insertBefore: function (t, e, n, r) {
            var a = (r = r || M.languages)[t], i = {};
            for (var l in a) {
              if (a.hasOwnProperty(l)) {
                if (l == e) {
                  for (var o in n) n.hasOwnProperty(o) && (i[o] = n[o]);
                }
                n.hasOwnProperty(l) || (i[l] = a[l]);
              }
            }
            var s = r[t];
            return r[t] = i,
              M.languages.DFS(M.languages, function (e, n) {
                n === s && e != t && (this[e] = i);
              }),
              i;
          },
          DFS: function e(n, t, r, a) {
            a = a || {};
            var i = M.util.objId;
            for (var l in n) {
              if (n.hasOwnProperty(l)) {
                t.call(n, l, n[l], r || l);
                var o = n[l], s = M.util.type(o);
                "Object" !== s || a[i(o)]
                  ? "Array" !== s || a[i(o)] || (a[i(o)] = !0, e(o, t, l, a))
                  : (a[i(o)] = !0, e(o, t, null, a));
              }
            }
          },
        },
        plugins: {},
        highlightAll: function (e, n) {
          M.highlightAllUnder(document, e, n);
        },
        highlightAllUnder: function (e, n, t) {
          var r = {
            callback: t,
            container: e,
            selector:
              'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code',
          };
          M.hooks.run("before-highlightall", r),
            r.elements = Array.prototype.slice.apply(
              r.container.querySelectorAll(r.selector),
            ),
            M.hooks.run("before-all-elements-highlight", r);
          for (var a, i = 0; a = r.elements[i++];) {
            M.highlightElement(a, !0 === n, r.callback);
          }
        },
        highlightElement: function (e, n, t) {
          var r = M.util.getLanguage(e), a = M.languages[r];
          e.className = e.className.replace(c, "").replace(/\s+/g, " ") +
            " language-" + r;
          var i = e.parentElement;
          i && "pre" === i.nodeName.toLowerCase() &&
            (i.className = i.className.replace(c, "").replace(/\s+/g, " ") +
              " language-" + r);
          var l = { element: e, language: r, grammar: a, code: e.textContent };
          function o(e) {
            l.highlightedCode = e,
              M.hooks.run("before-insert", l),
              l.element.innerHTML = l.highlightedCode,
              M.hooks.run("after-highlight", l),
              M.hooks.run("complete", l),
              t && t.call(l.element);
          }
          if (M.hooks.run("before-sanity-check", l), !l.code) {
            return M.hooks.run("complete", l), void (t && t.call(l.element));
          }
          if (M.hooks.run("before-highlight", l), l.grammar) {
            if (n && u.Worker) {
              var s = new Worker(M.filename);
              s.onmessage = function (e) {
                o(e.data);
              },
                s.postMessage(
                  JSON.stringify(
                    { language: l.language, code: l.code, immediateClose: !0 },
                  ),
                );
            } else o(M.highlight(l.code, l.grammar, l.language));
          } else o(M.util.encode(l.code));
        },
        highlight: function (e, n, t) {
          var r = { code: e, grammar: n, language: t };
          return M.hooks.run("before-tokenize", r),
            r.tokens = M.tokenize(r.code, r.grammar),
            M.hooks.run("after-tokenize", r),
            W.stringify(M.util.encode(r.tokens), r.language);
        },
        tokenize: function (e, n) {
          var t = n.rest;
          if (t) {
            for (var r in t) n[r] = t[r];
            delete n.rest;
          }
          var a = new i();
          return I(a, a.head, e),
            function e(n, t, r, a, i, l) {
              for (var o in r) {
                if (r.hasOwnProperty(o) && r[o]) {
                  var s = r[o];
                  s = Array.isArray(s) ? s : [s];
                  for (var u = 0; u < s.length; ++u) {
                    if (l && l.cause == o + "," + u) return;
                    var c = s[u],
                      g = c.inside,
                      f = !!c.lookbehind,
                      h = !!c.greedy,
                      d = 0,
                      v = c.alias;
                    if (h && !c.pattern.global) {
                      var p = c.pattern.toString().match(/[imsuy]*$/)[0];
                      c.pattern = RegExp(c.pattern.source, p + "g");
                    }
                    for (
                      var m = c.pattern || c, y = a.next, k = i;
                      y !== t.tail && !(l && k >= l.reach);
                      k += y.value.length, y = y.next
                    ) {
                      var b = y.value;
                      if (t.length > n.length) return;
                      if (!(b instanceof W)) {
                        var x = 1;
                        if (h && y != t.tail.prev) {
                          m.lastIndex = k;
                          var w = m.exec(n);
                          if (!w) {
                            break;
                          }
                          var A = w.index + (f && w[1] ? w[1].length : 0),
                            P = w.index + w[0].length,
                            S = k;
                          for (S += y.value.length; S <= A;) {
                            y = y.next, S += y.value.length;
                          }
                          if (
                            S -= y.value.length, k = S, y.value instanceof W
                          ) {
                            continue;
                          }
                          for (
                            var E = y;
                            E !== t.tail &&
                            (S < P || "string" == typeof E.value);
                            E = E.next
                          ) {
                            x++, S += E.value.length;
                          }
                          x--, b = n.slice(k, S), w.index -= k;
                        } else {
                          m.lastIndex = 0;
                          var w = m.exec(b);
                        }
                        if (w) {
                          f && (d = w[1] ? w[1].length : 0);
                          var A = w.index + d,
                            O = w[0].slice(d),
                            P = A + O.length,
                            L = b.slice(0, A),
                            N = b.slice(P),
                            j = k + b.length;
                          l && j > l.reach && (l.reach = j);
                          var C = y.prev;
                          L && (C = I(t, C, L), k += L.length), z(t, C, x);
                          var _ = new W(o, g ? M.tokenize(O, g) : O, v, O);
                          y = I(t, C, _),
                            N && I(t, y, N),
                            1 < x &&
                            e(
                              n,
                              t,
                              r,
                              y.prev,
                              k,
                              { cause: o + "," + u, reach: j },
                            );
                        }
                      }
                    }
                  }
                }
              }
            }(e, a, n, a.head, 0),
            function (e) {
              var n = [], t = e.head.next;
              for (; t !== e.tail;)n.push(t.value), t = t.next;
              return n;
            }(a);
        },
        hooks: {
          all: {},
          add: function (e, n) {
            var t = M.hooks.all;
            t[e] = t[e] || [], t[e].push(n);
          },
          run: function (e, n) {
            var t = M.hooks.all[e];
            if (t && t.length) for (var r, a = 0; r = t[a++];) r(n);
          },
        },
        Token: W,
      };
    function W(e, n, t, r) {
      this.type = e,
        this.content = n,
        this.alias = t,
        this.length = 0 | (r || "").length;
    }
    function i() {
      var e = { value: null, prev: null, next: null },
        n = { value: null, prev: e, next: null };
      e.next = n, this.head = e, this.tail = n, this.length = 0;
    }
    function I(e, n, t) {
      var r = n.next, a = { value: t, prev: n, next: r };
      return n.next = a, r.prev = a, e.length++, a;
    }
    function z(e, n, t) {
      for (var r = n.next, a = 0; a < t && r !== e.tail; a++) r = r.next;
      (n.next = r).prev = n, e.length -= a;
    }
    if (
      u.Prism = M,
        W.stringify = function n(e, t) {
          if ("string" == typeof e) return e;
          if (Array.isArray(e)) {
            var r = "";
            return e.forEach(function (e) {
              r += n(e, t);
            }),
              r;
          }
          var a = {
              type: e.type,
              content: n(e.content, t),
              tag: "span",
              classes: ["token", e.type],
              attributes: {},
              language: t,
            },
            i = e.alias;
          i && (Array.isArray(i)
            ? Array.prototype.push.apply(a.classes, i)
            : a.classes.push(i)), M.hooks.run("wrap", a);
          var l = "";
          for (var o in a.attributes) {
            l += " " + o + '="' +
              (a.attributes[o] || "").replace(/"/g, "&quot;") + '"';
          }
          return "<" + a.tag + ' class="' + a.classes.join(" ") + '"' + l +
            ">" + a.content + "</" + a.tag + ">";
        },
        !u.document
    ) {
      return u.addEventListener &&
        (M.disableWorkerMessageHandler ||
          u.addEventListener("message", function (e) {
            var n = JSON.parse(e.data),
              t = n.language,
              r = n.code,
              a = n.immediateClose;
            u.postMessage(M.highlight(r, M.languages[t], t)), a && u.close();
          }, !1)),
        M;
    }
    var e = M.util.currentScript();
    function t() {
      M.manual || M.highlightAll();
    }
    if (
      e &&
      (M.filename = e.src, e.hasAttribute("data-manual") && (M.manual = !0)),
        !M.manual
    ) {
      var r = document.readyState;
      "loading" === r || "interactive" === r && e && e.defer
        ? document.addEventListener("DOMContentLoaded", t)
        : window.requestAnimationFrame
        ? window.requestAnimationFrame(t)
        : window.setTimeout(t, 16);
    }
    return M;
  }(_self);
"undefined" != typeof module && module.exports && (module.exports = Prism),
  "undefined" != typeof global && (global.Prism = Prism);
Prism.languages.markup = {
  comment: /<!--[\s\S]*?-->/,
  prolog: /<\?[\s\S]+?\?>/,
  doctype: {
    pattern:
      /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
    greedy: !0,
    inside: {
      "internal-subset": {
        pattern: /(\[)[\s\S]+(?=\]>$)/,
        lookbehind: !0,
        greedy: !0,
        inside: null,
      },
      string: { pattern: /"[^"]*"|'[^']*'/, greedy: !0 },
      punctuation: /^<!|>$|[[\]]/,
      "doctype-tag": /^DOCTYPE/,
      name: /[^\s<>'"]+/,
    },
  },
  cdata: /<!\[CDATA\[[\s\S]*?]]>/i,
  tag: {
    pattern:
      /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
    greedy: !0,
    inside: {
      tag: {
        pattern: /^<\/?[^\s>\/]+/,
        inside: { punctuation: /^<\/?/, namespace: /^[^\s>\/:]+:/ },
      },
      "attr-value": {
        pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
        inside: {
          punctuation: [{ pattern: /^=/, alias: "attr-equals" }, /"|'/],
        },
      },
      punctuation: /\/?>/,
      "attr-name": {
        pattern: /[^\s>\/]+/,
        inside: { namespace: /^[^\s>\/:]+:/ },
      },
    },
  },
  entity: [
    { pattern: /&[\da-z]{1,8};/i, alias: "named-entity" },
    /&#x?[\da-f]{1,8};/i,
  ],
},
  Prism.languages.markup.tag.inside["attr-value"].inside.entity =
    Prism.languages.markup.entity,
  Prism.languages.markup.doctype.inside["internal-subset"].inside =
    Prism.languages.markup,
  Prism.hooks.add("wrap", function (a) {
    "entity" === a.type &&
      (a.attributes.title = a.content.replace(/&amp;/, "&"));
  }),
  Object.defineProperty(
    Prism.languages.markup.tag,
    "addInlined",
    {
      value: function (a, e) {
        var s = {};
        s["language-" + e] = {
          pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
          lookbehind: !0,
          inside: Prism.languages[e],
        }, s.cdata = /^<!\[CDATA\[|\]\]>$/i;
        var n = {
          "included-cdata": { pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i, inside: s },
        };
        n["language-" + e] = { pattern: /[\s\S]+/, inside: Prism.languages[e] };
        var t = {};
        t[a] = {
          pattern: RegExp(
            "(<__[^]*?>)(?:<!\\[CDATA\\[(?:[^\\]]|\\](?!\\]>))*\\]\\]>|(?!<!\\[CDATA\\[)[^])*?(?=</__>)"
              .replace(/__/g, function () {
                return a;
              }),
            "i",
          ),
          lookbehind: !0,
          greedy: !0,
          inside: n,
        }, Prism.languages.insertBefore("markup", "cdata", t);
      },
    },
  ),
  Prism.languages.html = Prism.languages.markup,
  Prism.languages.mathml = Prism.languages.markup,
  Prism.languages.svg = Prism.languages.markup,
  Prism.languages.xml = Prism.languages.extend("markup", {}),
  Prism.languages.ssml = Prism.languages.xml,
  Prism.languages.atom = Prism.languages.xml,
  Prism.languages.rss = Prism.languages.xml;
!function (e) {
  var s = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/;
  e.languages.css = {
    comment: /\/\*[\s\S]*?\*\//,
    atrule: {
      pattern: /@[\w-]+[\s\S]*?(?:;|(?=\s*\{))/,
      inside: {
        rule: /^@[\w-]+/,
        "selector-function-argument": {
          pattern:
            /(\bselector\s*\((?!\s*\))\s*)(?:[^()]|\((?:[^()]|\([^()]*\))*\))+?(?=\s*\))/,
          lookbehind: !0,
          alias: "selector",
        },
        keyword: {
          pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
          lookbehind: !0,
        },
      },
    },
    url: {
      pattern: RegExp(
        "\\burl\\((?:" + s.source + "|(?:[^\\\\\r\n()\"']|\\\\[^])*)\\)",
        "i",
      ),
      greedy: !0,
      inside: {
        function: /^url/i,
        punctuation: /^\(|\)$/,
        string: { pattern: RegExp("^" + s.source + "$"), alias: "url" },
      },
    },
    selector: RegExp("[^{}\\s](?:[^{};\"']|" + s.source + ")*?(?=\\s*\\{)"),
    string: { pattern: s, greedy: !0 },
    property: /[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i,
    important: /!important\b/i,
    function: /[-a-z0-9]+(?=\()/i,
    punctuation: /[(){};:,]/,
  }, e.languages.css.atrule.inside.rest = e.languages.css;
  var t = e.languages.markup;
  t &&
    (t.tag.addInlined("style", "css"),
      e.languages.insertBefore(
        "inside",
        "attr-value",
        {
          "style-attr": {
            pattern: /\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,
            inside: {
              "attr-name": { pattern: /^\s*style/i, inside: t.tag.inside },
              punctuation: /^\s*=\s*['"]|['"]\s*$/,
              "attr-value": { pattern: /.+/i, inside: e.languages.css },
            },
            alias: "language-css",
          },
        },
        t.tag,
      ));
}(Prism);
Prism.languages.clike = {
  comment: [
    { pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/, lookbehind: !0 },
    { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0, greedy: !0 },
  ],
  string: {
    pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    greedy: !0,
  },
  "class-name": {
    pattern:
      /(\b(?:class|interface|extends|implements|trait|instanceof|new)\s+|\bcatch\s+\()[\w.\\]+/i,
    lookbehind: !0,
    inside: { punctuation: /[.\\]/ },
  },
  keyword:
    /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
  boolean: /\b(?:true|false)\b/,
  function: /\w+(?=\()/,
  number: /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,
  operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
  punctuation: /[{}[\];(),.:]/,
};
Prism.languages.javascript = Prism.languages.extend(
  "clike",
  {
    "class-name": [
      Prism.languages.clike["class-name"],
      {
        pattern:
          /(^|[^$\w\xA0-\uFFFF])[_$A-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\.(?:prototype|constructor))/,
        lookbehind: !0,
      },
    ],
    keyword: [
      { pattern: /((?:^|})\s*)(?:catch|finally)\b/, lookbehind: !0 },
      {
        pattern:
          /(^|[^.]|\.\.\.\s*)\b(?:as|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|for|from|function|(?:get|set)(?=\s*[\[$\w\xA0-\uFFFF])|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
        lookbehind: !0,
      },
    ],
    number:
      /\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/,
    function:
      /#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
    operator:
      /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/,
  },
),
  Prism.languages.javascript["class-name"][0].pattern =
    /(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/,
  Prism.languages.insertBefore(
    "javascript",
    "keyword",
    {
      regex: {
        pattern:
          /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*]|\\.|[^/\\\[\r\n])+\/[gimyus]{0,6}(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/,
        lookbehind: !0,
        greedy: !0,
        inside: {
          "regex-source": {
            pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
            lookbehind: !0,
            alias: "language-regex",
            inside: Prism.languages.regex,
          },
          "regex-flags": /[a-z]+$/,
          "regex-delimiter": /^\/|\/$/,
        },
      },
      "function-variable": {
        pattern:
          /#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/,
        alias: "function",
      },
      parameter: [
        {
          pattern:
            /(function(?:\s+[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)?\s*\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\))/,
          lookbehind: !0,
          inside: Prism.languages.javascript,
        },
        {
          pattern: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=>)/i,
          inside: Prism.languages.javascript,
        },
        {
          pattern: /(\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*=>)/,
          lookbehind: !0,
          inside: Prism.languages.javascript,
        },
        {
          pattern:
            /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*\{)/,
          lookbehind: !0,
          inside: Prism.languages.javascript,
        },
      ],
      constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/,
    },
  ),
  Prism.languages.insertBefore(
    "javascript",
    "string",
    {
      "template-string": {
        pattern:
          /`(?:\\[\s\S]|\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}|(?!\${)[^\\`])*`/,
        greedy: !0,
        inside: {
          "template-punctuation": { pattern: /^`|`$/, alias: "string" },
          interpolation: {
            pattern:
              /((?:^|[^\\])(?:\\{2})*)\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}/,
            lookbehind: !0,
            inside: {
              "interpolation-punctuation": {
                pattern: /^\${|}$/,
                alias: "punctuation",
              },
              rest: Prism.languages.javascript,
            },
          },
          string: /[\s\S]+/,
        },
      },
    },
  ),
  Prism.languages.markup &&
  Prism.languages.markup.tag.addInlined("script", "javascript"),
  Prism.languages.js = Prism.languages.javascript;
!function (s) {
  function a(e, s) {
    return e.replace(/<<(\d+)>>/g, function (e, n) {
      return "(?:" + s[+n] + ")";
    });
  }
  function t(e, n, s) {
    return RegExp(a(e, n), s || "");
  }
  function e(e, n) {
    for (var s = 0; s < n; s++) {
      e = e.replace(/<<self>>/g, function () {
        return "(?:" + e + ")";
      });
    }
    return e.replace(/<<self>>/g, "[^\\s\\S]");
  }
  var n =
      "bool byte char decimal double dynamic float int long object sbyte short string uint ulong ushort var void",
    r = "class enum interface struct",
    i =
      "add alias and ascending async await by descending from get global group into join let nameof not notnull on or orderby partial remove select set unmanaged value when where where",
    o =
      "abstract as base break case catch checked const continue default delegate do else event explicit extern finally fixed for foreach goto if implicit in internal is lock namespace new null operator out override params private protected public readonly ref return sealed sizeof stackalloc static switch this throw try typeof unchecked unsafe using virtual volatile while yield";
  function l(e) {
    return "\\b(?:" + e.trim().replace(/ /g, "|") + ")\\b";
  }
  var d = l(r),
    p = RegExp(l(n + " " + r + " " + i + " " + o)),
    c = l(r + " " + i + " " + o),
    u = l(n + " " + r + " " + o),
    g = e("<(?:[^<>;=+\\-*/%&|^]|<<self>>)*>", 2),
    b = e("\\((?:[^()]|<<self>>)*\\)", 2),
    h = "@?\\b[A-Za-z_]\\w*\\b",
    f = a("<<0>>(?:\\s*<<1>>)?", [h, g]),
    m = a("(?!<<0>>)<<1>>(?:\\s*\\.\\s*<<1>>)*", [c, f]),
    k = "\\[\\s*(?:,\\s*)*\\]",
    y = a("<<0>>(?:\\s*(?:\\?\\s*)?<<1>>)*(?:\\s*\\?)?", [m, k]),
    w = a(
      "(?:<<0>>|<<1>>)(?:\\s*(?:\\?\\s*)?<<2>>)*(?:\\s*\\?)?",
      [
        a(
          "\\(<<0>>+(?:,<<0>>+)+\\)",
          [a("[^,()<>[\\];=+\\-*/%&|^]|<<0>>|<<1>>|<<2>>", [g, b, k])],
        ),
        m,
        k,
      ],
    ),
    v = { keyword: p, punctuation: /[<>()?,.:[\]]/ },
    x = "'(?:[^\r\n'\\\\]|\\\\.|\\\\[Uux][\\da-fA-F]{1,8})'",
    $ = '"(?:\\\\.|[^\\\\"\r\n])*"';
  s.languages.csharp = s.languages.extend(
    "clike",
    {
      string: [
        {
          pattern: t("(^|[^$\\\\])<<0>>", ['@"(?:""|\\\\[^]|[^\\\\"])*"(?!")']),
          lookbehind: !0,
          greedy: !0,
        },
        { pattern: t("(^|[^@$\\\\])<<0>>", [$]), lookbehind: !0, greedy: !0 },
        { pattern: RegExp(x), greedy: !0, alias: "character" },
      ],
      "class-name": [
        {
          pattern: t("(\\busing\\s+static\\s+)<<0>>(?=\\s*;)", [m]),
          lookbehind: !0,
          inside: v,
        },
        {
          pattern: t("(\\busing\\s+<<0>>\\s*=\\s*)<<1>>(?=\\s*;)", [h, w]),
          lookbehind: !0,
          inside: v,
        },
        { pattern: t("(\\busing\\s+)<<0>>(?=\\s*=)", [h]), lookbehind: !0 },
        {
          pattern: t("(\\b<<0>>\\s+)<<1>>", [d, f]),
          lookbehind: !0,
          inside: v,
        },
        {
          pattern: t("(\\bcatch\\s*\\(\\s*)<<0>>", [m]),
          lookbehind: !0,
          inside: v,
        },
        { pattern: t("(\\bwhere\\s+)<<0>>", [h]), lookbehind: !0 },
        {
          pattern: t("(\\b(?:is(?:\\s+not)?|as)\\s+)<<0>>", [y]),
          lookbehind: !0,
          inside: v,
        },
        {
          pattern: t(
            "\\b<<0>>(?=\\s+(?!<<1>>)<<2>>(?:\\s*[=,;:{)\\]]|\\s+(?:in|when)\\b))",
            [w, u, h],
          ),
          inside: v,
        },
      ],
      keyword: p,
      number:
        /(?:\b0(?:x[\da-f_]*[\da-f]|b[01_]*[01])|(?:\B\.\d+(?:_+\d+)*|\b\d+(?:_+\d+)*(?:\.\d+(?:_+\d+)*)?)(?:e[-+]?\d+(?:_+\d+)*)?)(?:ul|lu|[dflmu])?\b/i,
      operator: />>=?|<<=?|[-=]>|([-+&|])\1|~|\?\?=?|[-+*/%&|^!=<>]=?/,
      punctuation: /\?\.?|::|[{}[\];(),.:]/,
    },
  ),
    s.languages.insertBefore(
      "csharp",
      "number",
      { range: { pattern: /\.\./, alias: "operator" } },
    ),
    s.languages.insertBefore(
      "csharp",
      "punctuation",
      {
        "named-parameter": {
          pattern: t("([(,]\\s*)<<0>>(?=\\s*:)", [h]),
          lookbehind: !0,
          alias: "punctuation",
        },
      },
    ),
    s.languages.insertBefore(
      "csharp",
      "class-name",
      {
        namespace: {
          pattern: t(
            "(\\b(?:namespace|using)\\s+)<<0>>(?:\\s*\\.\\s*<<0>>)*(?=\\s*[;{])",
            [h],
          ),
          lookbehind: !0,
          inside: { punctuation: /\./ },
        },
        "type-expression": {
          pattern: t(
            "(\\b(?:default|typeof|sizeof)\\s*\\(\\s*)(?:[^()\\s]|\\s(?!\\s*\\))|<<0>>)*(?=\\s*\\))",
            [b],
          ),
          lookbehind: !0,
          alias: "class-name",
          inside: v,
        },
        "return-type": {
          pattern: t(
            "<<0>>(?=\\s+(?:<<1>>\\s*(?:=>|[({]|\\.\\s*this\\s*\\[)|this\\s*\\[))",
            [w, m],
          ),
          inside: v,
          alias: "class-name",
        },
        "constructor-invocation": {
          pattern: t("(\\bnew\\s+)<<0>>(?=\\s*[[({])", [w]),
          lookbehind: !0,
          inside: v,
          alias: "class-name",
        },
        "generic-method": {
          pattern: t("<<0>>\\s*<<1>>(?=\\s*\\()", [h, g]),
          inside: {
            function: t("^<<0>>", [h]),
            generic: { pattern: RegExp(g), alias: "class-name", inside: v },
          },
        },
        "type-list": {
          pattern: t(
            "\\b((?:<<0>>\\s+<<1>>|where\\s+<<2>>)\\s*:\\s*)(?:<<3>>|<<4>>)(?:\\s*,\\s*(?:<<3>>|<<4>>))*(?=\\s*(?:where|[{;]|=>|$))",
            [d, f, h, w, p.source],
          ),
          lookbehind: !0,
          inside: {
            keyword: p,
            "class-name": { pattern: RegExp(w), greedy: !0, inside: v },
            punctuation: /,/,
          },
        },
        preprocessor: {
          pattern: /(^\s*)#.*/m,
          lookbehind: !0,
          alias: "property",
          inside: {
            directive: {
              pattern:
                /(\s*#)\b(?:define|elif|else|endif|endregion|error|if|line|pragma|region|undef|warning)\b/,
              lookbehind: !0,
              alias: "keyword",
            },
          },
        },
      },
    );
  var _ = $ + "|" + x,
    B = a("/(?![*/])|//[^\r\n]*[\r\n]|/\\*(?:[^*]|\\*(?!/))*\\*/|<<0>>", [_]),
    E = e(a("[^\"'/()]|<<0>>|\\(<<self>>*\\)", [B]), 2),
    R =
      "\\b(?:assembly|event|field|method|module|param|property|return|type)\\b",
    P = a("<<0>>(?:\\s*\\(<<1>>*\\))?", [m, E]);
  s.languages.insertBefore(
    "csharp",
    "class-name",
    {
      attribute: {
        pattern: t(
          "((?:^|[^\\s\\w>)?])\\s*\\[\\s*)(?:<<0>>\\s*:\\s*)?<<1>>(?:\\s*,\\s*<<1>>)*(?=\\s*\\])",
          [R, P],
        ),
        lookbehind: !0,
        greedy: !0,
        inside: {
          target: { pattern: t("^<<0>>(?=\\s*:)", [R]), alias: "keyword" },
          "attribute-arguments": {
            pattern: t("\\(<<0>>*\\)", [E]),
            inside: s.languages.csharp,
          },
          "class-name": { pattern: RegExp(m), inside: { punctuation: /\./ } },
          punctuation: /[:,]/,
        },
      },
    },
  );
  var z = ":[^}\r\n]+",
    S = e(a("[^\"'/()]|<<0>>|\\(<<self>>*\\)", [B]), 2),
    j = a("\\{(?!\\{)(?:(?![}:])<<0>>)*<<1>>?\\}", [S, z]),
    A = e(
      a(
        "[^\"'/()]|/(?!\\*)|/\\*(?:[^*]|\\*(?!/))*\\*/|<<0>>|\\(<<self>>*\\)",
        [_],
      ),
      2,
    ),
    F = a("\\{(?!\\{)(?:(?![}:])<<0>>)*<<1>>?\\}", [A, z]);
  function U(e, n) {
    return {
      interpolation: {
        pattern: t("((?:^|[^{])(?:\\{\\{)*)<<0>>", [e]),
        lookbehind: !0,
        inside: {
          "format-string": {
            pattern: t("(^\\{(?:(?![}:])<<0>>)*)<<1>>(?=\\}$)", [n, z]),
            lookbehind: !0,
            inside: { punctuation: /^:/ },
          },
          punctuation: /^\{|\}$/,
          expression: {
            pattern: /[\s\S]+/,
            alias: "language-csharp",
            inside: s.languages.csharp,
          },
        },
      },
      string: /[\s\S]+/,
    };
  }
  s.languages.insertBefore(
    "csharp",
    "string",
    {
      "interpolation-string": [
        {
          pattern: t(
            '(^|[^\\\\])(?:\\$@|@\\$)"(?:""|\\\\[^]|\\{\\{|<<0>>|[^\\\\{"])*"',
            [j],
          ),
          lookbehind: !0,
          greedy: !0,
          inside: U(j, S),
        },
        {
          pattern: t('(^|[^@\\\\])\\$"(?:\\\\.|\\{\\{|<<0>>|[^\\\\"{])*"', [F]),
          lookbehind: !0,
          greedy: !0,
          inside: U(F, A),
        },
      ],
    },
  );
}(Prism), Prism.languages.dotnet = Prism.languages.cs = Prism.languages.csharp;
Prism.languages.aspnet = Prism.languages.extend(
  "markup",
  {
    "page-directive": {
      pattern: /<%\s*@.*%>/i,
      alias: "tag",
      inside: {
        "page-directive": {
          pattern:
            /<%\s*@\s*(?:Assembly|Control|Implements|Import|Master(?:Type)?|OutputCache|Page|PreviousPageType|Reference|Register)?|%>/i,
          alias: "tag",
        },
        rest: Prism.languages.markup.tag.inside,
      },
    },
    directive: {
      pattern: /<%.*%>/i,
      alias: "tag",
      inside: {
        directive: { pattern: /<%\s*?[$=%#:]{0,2}|%>/i, alias: "tag" },
        rest: Prism.languages.csharp,
      },
    },
  },
),
  Prism.languages.aspnet.tag.pattern =
    /<(?!%)\/?[^\s>\/]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+))?)*\s*\/?>/i,
  Prism.languages.insertBefore(
    "inside",
    "punctuation",
    { directive: Prism.languages.aspnet.directive },
    Prism.languages.aspnet.tag.inside["attr-value"],
  ),
  Prism.languages.insertBefore(
    "aspnet",
    "comment",
    {
      "asp-comment": { pattern: /<%--[\s\S]*?--%>/, alias: ["asp", "comment"] },
    },
  ),
  Prism.languages.insertBefore(
    "aspnet",
    Prism.languages.javascript ? "script" : "tag",
    {
      "asp-script": {
        pattern:
          /(<script(?=.*runat=['"]?server['"]?)[\s\S]*?>)[\s\S]*?(?=<\/script>)/i,
        lookbehind: !0,
        alias: ["asp", "script"],
        inside: Prism.languages.csharp || {},
      },
    },
  );
Prism.languages.autoit = {
  comment: [
    /;.*/,
    {
      pattern: /(^\s*)#(?:comments-start|cs)[\s\S]*?^\s*#(?:comments-end|ce)/m,
      lookbehind: !0,
    },
  ],
  url: {
    pattern: /(^\s*#include\s+)(?:<[^\r\n>]+>|"[^\r\n"]+")/m,
    lookbehind: !0,
  },
  string: {
    pattern: /(["'])(?:\1\1|(?!\1)[^\r\n])*\1/,
    greedy: !0,
    inside: { variable: /([%$@])\w+\1/ },
  },
  directive: { pattern: /(^\s*)#\w+/m, lookbehind: !0, alias: "keyword" },
  function: /\b\w+(?=\()/,
  variable: /[$@]\w+/,
  keyword:
    /\b(?:Case|Const|Continue(?:Case|Loop)|Default|Dim|Do|Else(?:If)?|End(?:Func|If|Select|Switch|With)|Enum|Exit(?:Loop)?|For|Func|Global|If|In|Local|Next|Null|ReDim|Select|Static|Step|Switch|Then|To|Until|Volatile|WEnd|While|With)\b/i,
  number: /\b(?:0x[\da-f]+|\d+(?:\.\d+)?(?:e[+-]?\d+)?)\b/i,
  boolean: /\b(?:True|False)\b/i,
  operator: /<[=>]?|[-+*\/=&>]=?|[?^]|\b(?:And|Or|Not)\b/i,
  punctuation: /[\[\]().,:]/,
};
!function (e) {
  var t =
      "\\b(?:BASH|BASHOPTS|BASH_ALIASES|BASH_ARGC|BASH_ARGV|BASH_CMDS|BASH_COMPLETION_COMPAT_DIR|BASH_LINENO|BASH_REMATCH|BASH_SOURCE|BASH_VERSINFO|BASH_VERSION|COLORTERM|COLUMNS|COMP_WORDBREAKS|DBUS_SESSION_BUS_ADDRESS|DEFAULTS_PATH|DESKTOP_SESSION|DIRSTACK|DISPLAY|EUID|GDMSESSION|GDM_LANG|GNOME_KEYRING_CONTROL|GNOME_KEYRING_PID|GPG_AGENT_INFO|GROUPS|HISTCONTROL|HISTFILE|HISTFILESIZE|HISTSIZE|HOME|HOSTNAME|HOSTTYPE|IFS|INSTANCE|JOB|LANG|LANGUAGE|LC_ADDRESS|LC_ALL|LC_IDENTIFICATION|LC_MEASUREMENT|LC_MONETARY|LC_NAME|LC_NUMERIC|LC_PAPER|LC_TELEPHONE|LC_TIME|LESSCLOSE|LESSOPEN|LINES|LOGNAME|LS_COLORS|MACHTYPE|MAILCHECK|MANDATORY_PATH|NO_AT_BRIDGE|OLDPWD|OPTERR|OPTIND|ORBIT_SOCKETDIR|OSTYPE|PAPERSIZE|PATH|PIPESTATUS|PPID|PS1|PS2|PS3|PS4|PWD|RANDOM|REPLY|SECONDS|SELINUX_INIT|SESSION|SESSIONTYPE|SESSION_MANAGER|SHELL|SHELLOPTS|SHLVL|SSH_AUTH_SOCK|TERM|UID|UPSTART_EVENTS|UPSTART_INSTANCE|UPSTART_JOB|UPSTART_SESSION|USER|WINDOWID|XAUTHORITY|XDG_CONFIG_DIRS|XDG_CURRENT_DESKTOP|XDG_DATA_DIRS|XDG_GREETER_DATA_DIR|XDG_MENU_PREFIX|XDG_RUNTIME_DIR|XDG_SEAT|XDG_SEAT_PATH|XDG_SESSION_DESKTOP|XDG_SESSION_ID|XDG_SESSION_PATH|XDG_SESSION_TYPE|XDG_VTNR|XMODIFIERS)\\b",
    n = {
      pattern: /(^(["']?)\w+\2)[ \t]+\S.*/,
      lookbehind: !0,
      alias: "punctuation",
      inside: null,
    },
    a = {
      bash: n,
      environment: { pattern: RegExp("\\$" + t), alias: "constant" },
      variable: [
        {
          pattern: /\$?\(\([\s\S]+?\)\)/,
          greedy: !0,
          inside: {
            variable: [
              { pattern: /(^\$\(\([\s\S]+)\)\)/, lookbehind: !0 },
              /^\$\(\(/,
            ],
            number: /\b0x[\dA-Fa-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee]-?\d+)?/,
            operator:
              /--?|-=|\+\+?|\+=|!=?|~|\*\*?|\*=|\/=?|%=?|<<=?|>>=?|<=?|>=?|==?|&&?|&=|\^=?|\|\|?|\|=|\?|:/,
            punctuation: /\(\(?|\)\)?|,|;/,
          },
        },
        {
          pattern: /\$\((?:\([^)]+\)|[^()])+\)|`[^`]+`/,
          greedy: !0,
          inside: { variable: /^\$\(|^`|\)$|`$/ },
        },
        {
          pattern: /\$\{[^}]+\}/,
          greedy: !0,
          inside: {
            operator: /:[-=?+]?|[!\/]|##?|%%?|\^\^?|,,?/,
            punctuation: /[\[\]]/,
            environment: {
              pattern: RegExp("(\\{)" + t),
              lookbehind: !0,
              alias: "constant",
            },
          },
        },
        /\$(?:\w+|[#?*!@$])/,
      ],
      entity:
        /\\(?:[abceEfnrtv\\"]|O?[0-7]{1,3}|x[0-9a-fA-F]{1,2}|u[0-9a-fA-F]{4}|U[0-9a-fA-F]{8})/,
    };
  e.languages.bash = {
    shebang: { pattern: /^#!\s*\/.*/, alias: "important" },
    comment: { pattern: /(^|[^"{\\$])#.*/, lookbehind: !0 },
    "function-name": [
      {
        pattern: /(\bfunction\s+)\w+(?=(?:\s*\(?:\s*\))?\s*\{)/,
        lookbehind: !0,
        alias: "function",
      },
      { pattern: /\b\w+(?=\s*\(\s*\)\s*\{)/, alias: "function" },
    ],
    "for-or-select": {
      pattern: /(\b(?:for|select)\s+)\w+(?=\s+in\s)/,
      alias: "variable",
      lookbehind: !0,
    },
    "assign-left": {
      pattern: /(^|[\s;|&]|[<>]\()\w+(?=\+?=)/,
      inside: {
        environment: {
          pattern: RegExp("(^|[\\s;|&]|[<>]\\()" + t),
          lookbehind: !0,
          alias: "constant",
        },
      },
      alias: "variable",
      lookbehind: !0,
    },
    string: [
      {
        pattern: /((?:^|[^<])<<-?\s*)(\w+?)\s[\s\S]*?(?:\r?\n|\r)\2/,
        lookbehind: !0,
        greedy: !0,
        inside: a,
      },
      {
        pattern: /((?:^|[^<])<<-?\s*)(["'])(\w+)\2\s[\s\S]*?(?:\r?\n|\r)\3/,
        lookbehind: !0,
        greedy: !0,
        inside: { bash: n },
      },
      {
        pattern:
          /(^|[^\\](?:\\\\)*)(["'])(?:\\[\s\S]|\$\([^)]+\)|`[^`]+`|(?!\2)[^\\])*\2/,
        lookbehind: !0,
        greedy: !0,
        inside: a,
      },
    ],
    environment: { pattern: RegExp("\\$?" + t), alias: "constant" },
    variable: a.variable,
    function: {
      pattern:
        /(^|[\s;|&]|[<>]\()(?:add|apropos|apt|aptitude|apt-cache|apt-get|aspell|automysqlbackup|awk|basename|bash|bc|bconsole|bg|bzip2|cal|cat|cfdisk|chgrp|chkconfig|chmod|chown|chroot|cksum|clear|cmp|column|comm|composer|cp|cron|crontab|csplit|curl|cut|date|dc|dd|ddrescue|debootstrap|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|du|egrep|eject|env|ethtool|expand|expect|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|git|gparted|grep|groupadd|groupdel|groupmod|groups|grub-mkconfig|gzip|halt|head|hg|history|host|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|ip|jobs|join|kill|killall|less|link|ln|locate|logname|logrotate|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|lynx|make|man|mc|mdadm|mkconfig|mkdir|mke2fs|mkfifo|mkfs|mkisofs|mknod|mkswap|mmv|more|most|mount|mtools|mtr|mutt|mv|nano|nc|netstat|nice|nl|nohup|notify-send|npm|nslookup|op|open|parted|passwd|paste|pathchk|ping|pkill|pnpm|popd|pr|printcap|printenv|ps|pushd|pv|quota|quotacheck|quotactl|ram|rar|rcp|reboot|remsync|rename|renice|rev|rm|rmdir|rpm|rsync|scp|screen|sdiff|sed|sendmail|seq|service|sftp|sh|shellcheck|shuf|shutdown|sleep|slocate|sort|split|ssh|stat|strace|su|sudo|sum|suspend|swapon|sync|tac|tail|tar|tee|time|timeout|top|touch|tr|traceroute|tsort|tty|umount|uname|unexpand|uniq|units|unrar|unshar|unzip|update-grub|uptime|useradd|userdel|usermod|users|uudecode|uuencode|v|vdir|vi|vim|virsh|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yarn|yes|zenity|zip|zsh|zypper)(?=$|[)\s;|&])/,
      lookbehind: !0,
    },
    keyword: {
      pattern:
        /(^|[\s;|&]|[<>]\()(?:if|then|else|elif|fi|for|while|in|case|esac|function|select|do|done|until)(?=$|[)\s;|&])/,
      lookbehind: !0,
    },
    builtin: {
      pattern:
        /(^|[\s;|&]|[<>]\()(?:\.|:|break|cd|continue|eval|exec|exit|export|getopts|hash|pwd|readonly|return|shift|test|times|trap|umask|unset|alias|bind|builtin|caller|command|declare|echo|enable|help|let|local|logout|mapfile|printf|read|readarray|source|type|typeset|ulimit|unalias|set|shopt)(?=$|[)\s;|&])/,
      lookbehind: !0,
      alias: "class-name",
    },
    boolean: {
      pattern: /(^|[\s;|&]|[<>]\()(?:true|false)(?=$|[)\s;|&])/,
      lookbehind: !0,
    },
    "file-descriptor": { pattern: /\B&\d\b/, alias: "important" },
    operator: {
      pattern:
        /\d?<>|>\||\+=|==?|!=?|=~|<<[<-]?|[&\d]?>>|\d?[<>]&?|&[>&]?|\|[&|]?|<=?|>=?/,
      inside: { "file-descriptor": { pattern: /^\d/, alias: "important" } },
    },
    punctuation: /\$?\(\(?|\)\)?|\.\.|[{}[\];\\]/,
    number: { pattern: /(^|\s)(?:[1-9]\d*|0)(?:[.,]\d+)?\b/, lookbehind: !0 },
  }, n.inside = e.languages.bash;
  for (
    var s = [
        "comment",
        "function-name",
        "for-or-select",
        "assign-left",
        "string",
        "environment",
        "function",
        "keyword",
        "builtin",
        "boolean",
        "file-descriptor",
        "operator",
        "punctuation",
        "number",
      ],
      i = a.variable[1].inside,
      o = 0;
    o < s.length;
    o++
  ) {
    i[s[o]] = e.languages.bash[s[o]];
  }
  e.languages.shell = e.languages.bash;
}(Prism);
Prism.languages.c = Prism.languages.extend(
  "clike",
  {
    comment: {
      pattern:
        /\/\/(?:[^\r\n\\]|\\(?:\r\n?|\n|(?![\r\n])))*|\/\*[\s\S]*?(?:\*\/|$)/,
      greedy: !0,
    },
    "class-name": {
      pattern:
        /(\b(?:enum|struct)\s+(?:__attribute__\s*\(\([\s\S]*?\)\)\s*)?)\w+/,
      lookbehind: !0,
    },
    keyword:
      /\b(?:__attribute__|_Alignas|_Alignof|_Atomic|_Bool|_Complex|_Generic|_Imaginary|_Noreturn|_Static_assert|_Thread_local|asm|typeof|inline|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|union|unsigned|void|volatile|while)\b/,
    function: /[a-z_]\w*(?=\s*\()/i,
    operator: />>=?|<<=?|->|([-+&|:])\1|[?:~]|[-+*/%&|^!=<>]=?/,
    number:
      /(?:\b0x(?:[\da-f]+\.?[\da-f]*|\.[\da-f]+)(?:p[+-]?\d+)?|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?)[ful]*/i,
  },
),
  Prism.languages.insertBefore(
    "c",
    "string",
    {
      macro: {
        pattern:
          /(^\s*)#\s*[a-z]+(?:[^\r\n\\/]|\/(?!\*)|\/\*(?:[^*]|\*(?!\/))*\*\/|\\(?:\r\n|[\s\S]))*/im,
        lookbehind: !0,
        greedy: !0,
        alias: "property",
        inside: {
          string: [
            { pattern: /^(#\s*include\s*)<[^>]+>/, lookbehind: !0 },
            Prism.languages.c.string,
          ],
          comment: Prism.languages.c.comment,
          directive: {
            pattern: /^(#\s*)[a-z]+/,
            lookbehind: !0,
            alias: "keyword",
          },
          "directive-hash": /^#/,
          punctuation: /##|\\(?=[\r\n])/,
          expression: { pattern: /\S[\s\S]*/, inside: Prism.languages.c },
        },
      },
      constant:
        /\b(?:__FILE__|__LINE__|__DATE__|__TIME__|__TIMESTAMP__|__func__|EOF|NULL|SEEK_CUR|SEEK_END|SEEK_SET|stdin|stdout|stderr)\b/,
    },
  ),
  delete Prism.languages.c.boolean;
!function (e) {
  var t =
    /\b(?:alignas|alignof|asm|auto|bool|break|case|catch|char|char8_t|char16_t|char32_t|class|compl|concept|const|consteval|constexpr|constinit|const_cast|continue|co_await|co_return|co_yield|decltype|default|delete|do|double|dynamic_cast|else|enum|explicit|export|extern|float|for|friend|goto|if|inline|int|int8_t|int16_t|int32_t|int64_t|uint8_t|uint16_t|uint32_t|uint64_t|long|mutable|namespace|new|noexcept|nullptr|operator|private|protected|public|register|reinterpret_cast|requires|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|try|typedef|typeid|typename|union|unsigned|using|virtual|void|volatile|wchar_t|while)\b/;
  e.languages.cpp = e.languages.extend(
    "c",
    {
      "class-name": [
        {
          pattern: RegExp(
            "(\\b(?:class|concept|enum|struct|typename)\\s+)(?!<keyword>)\\w+"
              .replace(/<keyword>/g, function () {
                return t.source;
              }),
          ),
          lookbehind: !0,
        },
        /\b[A-Z]\w*(?=\s*::\s*\w+\s*\()/,
        /\b[A-Z_]\w*(?=\s*::\s*~\w+\s*\()/i,
        /\w+(?=\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>\s*::\s*\w+\s*\()/,
      ],
      keyword: t,
      number: {
        pattern:
          /(?:\b0b[01']+|\b0x(?:[\da-f']+\.?[\da-f']*|\.[\da-f']+)(?:p[+-]?[\d']+)?|(?:\b[\d']+\.?[\d']*|\B\.[\d']+)(?:e[+-]?[\d']+)?)[ful]*/i,
        greedy: !0,
      },
      operator:
        />>=?|<<=?|->|([-+&|:])\1|[?:~]|<=>|[-+*/%&|^!=<>]=?|\b(?:and|and_eq|bitand|bitor|not|not_eq|or|or_eq|xor|xor_eq)\b/,
      boolean: /\b(?:true|false)\b/,
    },
  ),
    e.languages.insertBefore(
      "cpp",
      "string",
      {
        "raw-string": {
          pattern: /R"([^()\\ ]{0,16})\([\s\S]*?\)\1"/,
          alias: "string",
          greedy: !0,
        },
      },
    ),
    e.languages.insertBefore(
      "cpp",
      "class-name",
      {
        "base-clause": {
          pattern: /(\b(?:class|struct)\s+\w+\s*:\s*)(?:[^;{}"'])+?(?=\s*[;{])/,
          lookbehind: !0,
          greedy: !0,
          inside: e.languages.extend("cpp", {}),
        },
      },
    ),
    e.languages.insertBefore(
      "inside",
      "operator",
      { "class-name": /\b[a-z_]\w*\b(?!\s*::)/i },
      e.languages.cpp["base-clause"],
    );
}(Prism);
Prism.languages.clojure = {
  comment: /;.*/,
  string: { pattern: /"(?:[^"\\]|\\.)*"/, greedy: !0 },
  operator: /(?:::|[:|'])\b[a-z][\w*+!?-]*\b/i,
  keyword: {
    pattern:
      /([^\w+*'?-])(?:def|if|do|let|\.\.|quote|var|->>|->|fn|loop|recur|throw|try|monitor-enter|\.|new|set!|def\-|defn|defn\-|defmacro|defmulti|defmethod|defstruct|defonce|declare|definline|definterface|defprotocol|==|defrecord|>=|deftype|<=|defproject|ns|\*|\+|\-|\/|<|=|>|accessor|agent|agent-errors|aget|alength|all-ns|alter|and|append-child|apply|array-map|aset|aset-boolean|aset-byte|aset-char|aset-double|aset-float|aset-int|aset-long|aset-short|assert|assoc|await|await-for|bean|binding|bit-and|bit-not|bit-or|bit-shift-left|bit-shift-right|bit-xor|boolean|branch\?|butlast|byte|cast|char|children|class|clear-agent-errors|comment|commute|comp|comparator|complement|concat|conj|cons|constantly|cond|if-not|construct-proxy|contains\?|count|create-ns|create-struct|cycle|dec|deref|difference|disj|dissoc|distinct|doall|doc|dorun|doseq|dosync|dotimes|doto|double|down|drop|drop-while|edit|end\?|ensure|eval|every\?|false\?|ffirst|file-seq|filter|find|find-doc|find-ns|find-var|first|float|flush|for|fnseq|frest|gensym|get-proxy-class|get|hash-map|hash-set|identical\?|identity|if-let|import|in-ns|inc|index|insert-child|insert-left|insert-right|inspect-table|inspect-tree|instance\?|int|interleave|intersection|into|into-array|iterate|join|key|keys|keyword|keyword\?|last|lazy-cat|lazy-cons|left|lefts|line-seq|list\*|list|load|load-file|locking|long|macroexpand|macroexpand-1|make-array|make-node|map|map-invert|map\?|mapcat|max|max-key|memfn|merge|merge-with|meta|min|min-key|name|namespace|neg\?|newline|next|nil\?|node|not|not-any\?|not-every\?|not=|ns-imports|ns-interns|ns-map|ns-name|ns-publics|ns-refers|ns-resolve|ns-unmap|nth|nthrest|or|parse|partial|path|peek|pop|pos\?|pr|pr-str|print|print-str|println|println-str|prn|prn-str|project|proxy|proxy-mappings|quot|rand|rand-int|range|re-find|re-groups|re-matcher|re-matches|re-pattern|re-seq|read|read-line|reduce|ref|ref-set|refer|rem|remove|remove-method|remove-ns|rename|rename-keys|repeat|replace|replicate|resolve|rest|resultset-seq|reverse|rfirst|right|rights|root|rrest|rseq|second|select|select-keys|send|send-off|seq|seq-zip|seq\?|set|short|slurp|some|sort|sort-by|sorted-map|sorted-map-by|sorted-set|special-symbol\?|split-at|split-with|str|string\?|struct|struct-map|subs|subvec|symbol|symbol\?|sync|take|take-nth|take-while|test|time|to-array|to-array-2d|tree-seq|true\?|union|up|update-proxy|val|vals|var-get|var-set|var\?|vector|vector-zip|vector\?|when|when-first|when-let|when-not|with-local-vars|with-meta|with-open|with-out-str|xml-seq|xml-zip|zero\?|zipmap|zipper)(?=[^\w+*'?-])/,
    lookbehind: !0,
  },
  boolean: /\b(?:true|false|nil)\b/,
  number: /\b[\da-f]+\b/i,
  punctuation: /[{}\[\](),]/,
};
!function (e) {
  var t = /#(?!\{).+/, n = { pattern: /#\{[^}]+\}/, alias: "variable" };
  e.languages.coffeescript = e.languages.extend(
    "javascript",
    {
      comment: t,
      string: [
        { pattern: /'(?:\\[\s\S]|[^\\'])*'/, greedy: !0 },
        {
          pattern: /"(?:\\[\s\S]|[^\\"])*"/,
          greedy: !0,
          inside: { interpolation: n },
        },
      ],
      keyword:
        /\b(?:and|break|by|catch|class|continue|debugger|delete|do|each|else|extend|extends|false|finally|for|if|in|instanceof|is|isnt|let|loop|namespace|new|no|not|null|of|off|on|or|own|return|super|switch|then|this|throw|true|try|typeof|undefined|unless|until|when|while|window|with|yes|yield)\b/,
      "class-member": { pattern: /@(?!\d)\w+/, alias: "variable" },
    },
  ),
    e.languages.insertBefore(
      "coffeescript",
      "comment",
      {
        "multiline-comment": { pattern: /###[\s\S]+?###/, alias: "comment" },
        "block-regex": {
          pattern: /\/{3}[\s\S]*?\/{3}/,
          alias: "regex",
          inside: { comment: t, interpolation: n },
        },
      },
    ),
    e.languages.insertBefore(
      "coffeescript",
      "string",
      {
        "inline-javascript": {
          pattern: /`(?:\\[\s\S]|[^\\`])*`/,
          inside: {
            delimiter: { pattern: /^`|`$/, alias: "punctuation" },
            rest: e.languages.javascript,
          },
        },
        "multiline-string": [
          { pattern: /'''[\s\S]*?'''/, greedy: !0, alias: "string" },
          {
            pattern: /"""[\s\S]*?"""/,
            greedy: !0,
            alias: "string",
            inside: { interpolation: n },
          },
        ],
      },
    ),
    e.languages.insertBefore(
      "coffeescript",
      "keyword",
      { property: /(?!\d)\w+(?=\s*:(?!:))/ },
    ),
    delete e.languages.coffeescript["template-string"],
    e.languages.coffee = e.languages.coffeescript;
}(Prism);
!function (e) {
  var a, n = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/;
  e.languages.css.selector = {
    pattern: e.languages.css.selector,
    inside: a = {
      "pseudo-element":
        /:(?:after|before|first-letter|first-line|selection)|::[-\w]+/,
      "pseudo-class": /:[-\w]+/,
      class: /\.[-\w]+/,
      id: /#[-\w]+/,
      attribute: {
        pattern: RegExp("\\[(?:[^[\\]\"']|" + n.source + ")*\\]"),
        greedy: !0,
        inside: {
          punctuation: /^\[|\]$/,
          "case-sensitivity": {
            pattern: /(\s)[si]$/i,
            lookbehind: !0,
            alias: "keyword",
          },
          namespace: {
            pattern: /^(\s*)[-*\w\xA0-\uFFFF]*\|(?!=)/,
            lookbehind: !0,
            inside: { punctuation: /\|$/ },
          },
          "attr-name": { pattern: /^(\s*)[-\w\xA0-\uFFFF]+/, lookbehind: !0 },
          "attr-value": [
            n,
            { pattern: /(=\s*)[-\w\xA0-\uFFFF]+(?=\s*$)/, lookbehind: !0 },
          ],
          operator: /[|~*^$]?=/,
        },
      },
      "n-th": [
        {
          pattern: /(\(\s*)[+-]?\d*[\dn](?:\s*[+-]\s*\d+)?(?=\s*\))/,
          lookbehind: !0,
          inside: { number: /[\dn]+/, operator: /[+-]/ },
        },
        { pattern: /(\(\s*)(?:even|odd)(?=\s*\))/i, lookbehind: !0 },
      ],
      combinator: />|\+|~|\|\|/,
      punctuation: /[(),]/,
    },
  },
    e.languages.css.atrule.inside["selector-function-argument"].inside = a,
    e.languages.insertBefore(
      "css",
      "property",
      {
        variable: {
          pattern:
            /(^|[^-\w\xA0-\uFFFF])--[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*/i,
          lookbehind: !0,
        },
      },
    );
  var r = { pattern: /(\b\d+)(?:%|[a-z]+\b)/, lookbehind: !0 },
    i = { pattern: /(^|[^\w.-])-?\d*\.?\d+/, lookbehind: !0 };
  e.languages.insertBefore(
    "css",
    "function",
    {
      operator: { pattern: /(\s)[+\-*\/](?=\s)/, lookbehind: !0 },
      hexcode: { pattern: /\B#(?:[\da-f]{1,2}){3,4}\b/i, alias: "color" },
      color: [
        /\b(?:AliceBlue|AntiqueWhite|Aqua|Aquamarine|Azure|Beige|Bisque|Black|BlanchedAlmond|Blue|BlueViolet|Brown|BurlyWood|CadetBlue|Chartreuse|Chocolate|Coral|CornflowerBlue|Cornsilk|Crimson|Cyan|DarkBlue|DarkCyan|DarkGoldenRod|DarkGr[ae]y|DarkGreen|DarkKhaki|DarkMagenta|DarkOliveGreen|DarkOrange|DarkOrchid|DarkRed|DarkSalmon|DarkSeaGreen|DarkSlateBlue|DarkSlateGr[ae]y|DarkTurquoise|DarkViolet|DeepPink|DeepSkyBlue|DimGr[ae]y|DodgerBlue|FireBrick|FloralWhite|ForestGreen|Fuchsia|Gainsboro|GhostWhite|Gold|GoldenRod|Gr[ae]y|Green|GreenYellow|HoneyDew|HotPink|IndianRed|Indigo|Ivory|Khaki|Lavender|LavenderBlush|LawnGreen|LemonChiffon|LightBlue|LightCoral|LightCyan|LightGoldenRodYellow|LightGr[ae]y|LightGreen|LightPink|LightSalmon|LightSeaGreen|LightSkyBlue|LightSlateGr[ae]y|LightSteelBlue|LightYellow|Lime|LimeGreen|Linen|Magenta|Maroon|MediumAquaMarine|MediumBlue|MediumOrchid|MediumPurple|MediumSeaGreen|MediumSlateBlue|MediumSpringGreen|MediumTurquoise|MediumVioletRed|MidnightBlue|MintCream|MistyRose|Moccasin|NavajoWhite|Navy|OldLace|Olive|OliveDrab|Orange|OrangeRed|Orchid|PaleGoldenRod|PaleGreen|PaleTurquoise|PaleVioletRed|PapayaWhip|PeachPuff|Peru|Pink|Plum|PowderBlue|Purple|Red|RosyBrown|RoyalBlue|SaddleBrown|Salmon|SandyBrown|SeaGreen|SeaShell|Sienna|Silver|SkyBlue|SlateBlue|SlateGr[ae]y|Snow|SpringGreen|SteelBlue|Tan|Teal|Thistle|Tomato|Transparent|Turquoise|Violet|Wheat|White|WhiteSmoke|Yellow|YellowGreen)\b/i,
        {
          pattern:
            /\b(?:rgb|hsl)\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*\)\B|\b(?:rgb|hsl)a\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*,\s*(?:0|0?\.\d+|1)\s*\)\B/i,
          inside: {
            unit: r,
            number: i,
            function: /[\w-]+(?=\()/,
            punctuation: /[(),]/,
          },
        },
      ],
      entity: /\\[\da-f]{1,8}/i,
      unit: r,
      number: i,
    },
  );
}(Prism);
Prism.languages.dart = Prism.languages.extend(
  "clike",
  {
    string: [
      { pattern: /r?("""|''')[\s\S]*?\1/, greedy: !0 },
      { pattern: /r?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/, greedy: !0 },
    ],
    keyword: [
      /\b(?:async|sync|yield)\*/,
      /\b(?:abstract|assert|async|await|break|case|catch|class|const|continue|covariant|default|deferred|do|dynamic|else|enum|export|extension|external|extends|factory|final|finally|for|Function|get|hide|if|implements|interface|import|in|library|mixin|new|null|on|operator|part|rethrow|return|set|show|static|super|switch|sync|this|throw|try|typedef|var|void|while|with|yield)\b/,
    ],
    operator:
      /\bis!|\b(?:as|is)\b|\+\+|--|&&|\|\||<<=?|>>=?|~(?:\/=?)?|[+\-*\/%&^|=!<>]=?|\?/,
  },
),
  Prism.languages.insertBefore(
    "dart",
    "function",
    { metadata: { pattern: /@\w+/, alias: "symbol" } },
  );
!function (i) {
  i.languages.diff = {
    coord: [/^(?:\*{3}|-{3}|\+{3}).*$/m, /^@@.*@@$/m, /^\d+.*$/m],
  };
  var r = {
    "deleted-sign": "-",
    "deleted-arrow": "<",
    "inserted-sign": "+",
    "inserted-arrow": ">",
    unchanged: " ",
    diff: "!",
  };
  Object.keys(r).forEach(function (e) {
    var n = r[e], a = [];
    /^\w+$/.test(e) || a.push(/\w+/.exec(e)[0]),
      "diff" === e && a.push("bold"),
      i.languages.diff[e] = {
        pattern: RegExp("^(?:[" + n + "].*(?:\r\n?|\n|(?![\\s\\S])))+", "m"),
        alias: a,
        inside: {
          line: { pattern: /(.)(?=[\s\S]).*(?:\r\n?|\n)?/, lookbehind: !0 },
          prefix: { pattern: /[\s\S]/, alias: /\w+/.exec(e)[0] },
        },
      };
  }), Object.defineProperty(i.languages.diff, "PREFIXES", { value: r });
}(Prism);
!function (h) {
  function v(e, n) {
    return "___" + e.toUpperCase() + n + "___";
  }
  Object.defineProperties(
    h.languages["markup-templating"] = {},
    {
      buildPlaceholders: {
        value: function (a, r, e, o) {
          if (a.language === r) {
            var c = a.tokenStack = [];
            a.code = a.code.replace(e, function (e) {
              if ("function" == typeof o && !o(e)) return e;
              for (
                var n, t = c.length;
                -1 !== a.code.indexOf(n = v(r, t));
              ) {
                ++t;
              }
              return c[t] = e, n;
            }), a.grammar = h.languages.markup;
          }
        },
      },
      tokenizePlaceholders: {
        value: function (p, k) {
          if (p.language === k && p.tokenStack) {
            p.grammar = h.languages[k];
            var m = 0, d = Object.keys(p.tokenStack);
            !function e(n) {
              for (var t = 0; t < n.length && !(m >= d.length); t++) {
                var a = n[t];
                if (
                  "string" == typeof a ||
                  a.content && "string" == typeof a.content
                ) {
                  var r = d[m],
                    o = p.tokenStack[r],
                    c = "string" == typeof a ? a : a.content,
                    i = v(k, r),
                    u = c.indexOf(i);
                  if (-1 < u) {
                    ++m;
                    var g = c.substring(0, u),
                      l = new h.Token(
                        k,
                        h.tokenize(o, p.grammar),
                        "language-" + k,
                        o,
                      ),
                      s = c.substring(u + i.length),
                      f = [];
                    g && f.push.apply(f, e([g])),
                      f.push(l),
                      s && f.push.apply(f, e([s])),
                      "string" == typeof a
                        ? n.splice.apply(n, [t, 1].concat(f))
                        : a.content = f;
                  }
                } else a.content && e(a.content);
              }
              return n;
            }(p.tokens);
          }
        },
      },
    },
  );
}(Prism);
!function (e) {
  e.languages.django = {
    comment: /^{#[\s\S]*?#}$/,
    tag: { pattern: /(^{%[+-]?\s*)\w+/, lookbehind: !0, alias: "keyword" },
    delimiter: { pattern: /^{[{%][+-]?|[+-]?[}%]}$/, alias: "punctuation" },
    string: { pattern: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/, greedy: !0 },
    filter: { pattern: /(\|)\w+/, lookbehind: !0, alias: "function" },
    test: {
      pattern: /(\bis\s+(?:not\s+)?)(?!not\b)\w+/,
      lookbehind: !0,
      alias: "function",
    },
    function: /\b[a-z_]\w+(?=\s*\()/i,
    keyword:
      /\b(?:and|as|by|else|for|if|import|in|is|loop|not|or|recursive|with|without)\b/,
    operator: /[-+*/%=]=?|!=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,
    number: /\b\d+(?:\.\d+)?\b/,
    boolean: /[Tt]rue|[Ff]alse|[Nn]one/,
    variable: /\b\w+?\b/,
    punctuation: /[{}[\](),.:;]/,
  };
  var n = /{{[\s\S]*?}}|{%[\s\S]*?%}|{#[\s\S]*?#}/g,
    o = e.languages["markup-templating"];
  e.hooks.add("before-tokenize", function (e) {
    o.buildPlaceholders(e, "django", n);
  }),
    e.hooks.add("after-tokenize", function (e) {
      o.tokenizePlaceholders(e, "django");
    }),
    e.languages.jinja2 = e.languages.django,
    e.hooks.add("before-tokenize", function (e) {
      o.buildPlaceholders(e, "jinja2", n);
    }),
    e.hooks.add("after-tokenize", function (e) {
      o.tokenizePlaceholders(e, "jinja2");
    });
}(Prism);
Prism.languages.docker = {
  keyword: {
    pattern:
      /(^\s*)(?:ADD|ARG|CMD|COPY|ENTRYPOINT|ENV|EXPOSE|FROM|HEALTHCHECK|LABEL|MAINTAINER|ONBUILD|RUN|SHELL|STOPSIGNAL|USER|VOLUME|WORKDIR)(?=\s)/im,
    lookbehind: !0,
  },
  string: /("|')(?:(?!\1)[^\\\r\n]|\\(?:\r\n|[\s\S]))*\1/,
  comment: { pattern: /#.*/, greedy: !0 },
  punctuation: /---|\.\.\.|[:[\]{}\-,|>?]/,
}, Prism.languages.dockerfile = Prism.languages.docker;
Prism.languages.elm = {
  comment: /--.*|{-[\s\S]*?-}/,
  char: {
    pattern: /'(?:[^\\'\r\n]|\\(?:[abfnrtv\\']|\d+|x[0-9a-fA-F]+))'/,
    greedy: !0,
  },
  string: [
    { pattern: /"""[\s\S]*?"""/, greedy: !0 },
    {
      pattern: /"(?:[^\\"\r\n]|\\(?:[abfnrtv\\"]|\d+|x[0-9a-fA-F]+))*"/,
      greedy: !0,
    },
  ],
  import_statement: {
    pattern:
      /^\s*import\s+[A-Z]\w*(?:\.[A-Z]\w*)*(?:\s+as\s+(?:[A-Z]\w*)(?:\.[A-Z]\w*)*)?(?:\s+exposing\s+)?/m,
    inside: { keyword: /\b(?:import|as|exposing)\b/ },
  },
  keyword:
    /\b(?:alias|as|case|else|exposing|if|in|infixl|infixr|let|module|of|then|type)\b/,
  builtin:
    /\b(?:abs|acos|always|asin|atan|atan2|ceiling|clamp|compare|cos|curry|degrees|e|flip|floor|fromPolar|identity|isInfinite|isNaN|logBase|max|min|negate|never|not|pi|radians|rem|round|sin|sqrt|tan|toFloat|toPolar|toString|truncate|turns|uncurry|xor)\b/,
  number: /\b(?:\d+(?:\.\d+)?(?:e[+-]?\d+)?|0x[0-9a-f]+)\b/i,
  operator: /\s\.\s|[+\-/*=.$<>:&|^?%#@~!]{2,}|[+\-/*=$<>:&|^?%#@~!]/,
  hvariable: /\b(?:[A-Z]\w*\.)*[a-z]\w*\b/,
  constant: /\b(?:[A-Z]\w*\.)*[A-Z]\w*\b/,
  punctuation: /[{}[\]|(),.:]/,
};
Prism.languages.erlang = {
  comment: /%.+/,
  string: { pattern: /"(?:\\.|[^\\"\r\n])*"/, greedy: !0 },
  "quoted-function": {
    pattern: /'(?:\\.|[^\\'\r\n])+'(?=\()/,
    alias: "function",
  },
  "quoted-atom": { pattern: /'(?:\\.|[^\\'\r\n])+'/, alias: "atom" },
  boolean: /\b(?:true|false)\b/,
  keyword: /\b(?:fun|when|case|of|end|if|receive|after|try|catch)\b/,
  number: [
    /\$\\?./,
    /\d+#[a-z0-9]+/i,
    /(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,
  ],
  function: /\b[a-z][\w@]*(?=\()/,
  variable: { pattern: /(^|[^@])(?:\b|\?)[A-Z_][\w@]*/, lookbehind: !0 },
  operator: [
    /[=\/<>:]=|=[:\/]=|\+\+?|--?|[=*\/!]|\b(?:bnot|div|rem|band|bor|bxor|bsl|bsr|not|and|or|xor|orelse|andalso)\b/,
    { pattern: /(^|[^<])<(?!<)/, lookbehind: !0 },
    { pattern: /(^|[^>])>(?!>)/, lookbehind: !0 },
  ],
  atom: /\b[a-z][\w@]*/,
  punctuation: /[()[\]{}:;,.#|]|<<|>>/,
};
Prism.languages.git = {
  comment: /^#.*/m,
  deleted: /^[-–].*/m,
  inserted: /^\+.*/m,
  string: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/m,
  command: { pattern: /^.*\$ git .*$/m, inside: { parameter: /\s--?\w+/m } },
  coord: /^@@.*@@$/m,
  commit_sha1: /^commit \w{40}$/m,
};
Prism.languages.go = Prism.languages.extend(
  "clike",
  {
    keyword:
      /\b(?:break|case|chan|const|continue|default|defer|else|fallthrough|for|func|go(?:to)?|if|import|interface|map|package|range|return|select|struct|switch|type|var)\b/,
    builtin:
      /\b(?:bool|byte|complex(?:64|128)|error|float(?:32|64)|rune|string|u?int(?:8|16|32|64)?|uintptr|append|cap|close|complex|copy|delete|imag|len|make|new|panic|print(?:ln)?|real|recover)\b/,
    boolean: /\b(?:_|iota|nil|true|false)\b/,
    operator:
      /[*\/%^!=]=?|\+[=+]?|-[=-]?|\|[=|]?|&(?:=|&|\^=?)?|>(?:>=?|=)?|<(?:<=?|=|-)?|:=|\.\.\./,
    number: /(?:\b0x[a-f\d]+|(?:\b\d+\.?\d*|\B\.\d+)(?:e[-+]?\d+)?)i?/i,
    string: { pattern: /(["'`])(?:\\[\s\S]|(?!\1)[^\\])*\1/, greedy: !0 },
  },
), delete Prism.languages.go["class-name"];
Prism.languages.graphql = {
  comment: /#.*/,
  description: {
    pattern: /(?:"""(?:[^"]|(?!""")")*"""|"(?:\\.|[^\\"\r\n])*")(?=\s*[a-z_])/i,
    greedy: !0,
    alias: "string",
    inside: {
      "language-markdown": {
        pattern: /(^"(?:"")?)(?!\1)[\s\S]+(?=\1$)/,
        lookbehind: !0,
        inside: Prism.languages.markdown,
      },
    },
  },
  string: {
    pattern: /"""(?:[^"]|(?!""")")*"""|"(?:\\.|[^\\"\r\n])*"/,
    greedy: !0,
  },
  number: /(?:\B-|\b)\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
  boolean: /\b(?:true|false)\b/,
  variable: /\$[a-z_]\w*/i,
  directive: { pattern: /@[a-z_]\w*/i, alias: "function" },
  "attr-name": {
    pattern: /[a-z_]\w*(?=\s*(?:\((?:[^()"]|"(?:\\.|[^\\"\r\n])*")*\))?:)/i,
    greedy: !0,
  },
  "class-name": {
    pattern:
      /(\b(?:enum|implements|interface|on|scalar|type|union)\s+|&\s*)[a-zA-Z_]\w*/,
    lookbehind: !0,
  },
  fragment: {
    pattern: /(\bfragment\s+|\.{3}\s*(?!on\b))[a-zA-Z_]\w*/,
    lookbehind: !0,
    alias: "function",
  },
  keyword:
    /\b(?:directive|enum|extend|fragment|implements|input|interface|mutation|on|query|repeatable|scalar|schema|subscription|type|union)\b/,
  operator: /[!=|&]|\.{3}/,
  punctuation: /[!(){}\[\]:=,]/,
  constant: /\b(?!ID\b)[A-Z][A-Z_\d]*\b/,
};
!function (e) {
  e.languages.handlebars = {
    comment: /\{\{![\s\S]*?\}\}/,
    delimiter: { pattern: /^\{\{\{?|\}\}\}?$/i, alias: "punctuation" },
    string: /(["'])(?:\\.|(?!\1)[^\\\r\n])*\1/,
    number: /\b0x[\dA-Fa-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee][+-]?\d+)?/,
    boolean: /\b(?:true|false)\b/,
    block: {
      pattern: /^(\s*~?\s*)[#\/]\S+?(?=\s*~?\s*$|\s)/i,
      lookbehind: !0,
      alias: "keyword",
    },
    brackets: {
      pattern: /\[[^\]]+\]/,
      inside: { punctuation: /\[|\]/, variable: /[\s\S]+/ },
    },
    punctuation: /[!"#%&':()*+,.\/;<=>@\[\\\]^`{|}~]/,
    variable: /[^!"#%&'()*+,\/;<=>@\[\\\]^`{|}~\s]+/,
  },
    e.hooks.add("before-tokenize", function (a) {
      e.languages["markup-templating"].buildPlaceholders(
        a,
        "handlebars",
        /\{\{\{[\s\S]+?\}\}\}|\{\{[\s\S]+?\}\}/g,
      );
    }),
    e.hooks.add("after-tokenize", function (a) {
      e.languages["markup-templating"].tokenizePlaceholders(a, "handlebars");
    });
}(Prism);
Prism.languages.haskell = {
  comment: {
    pattern:
      /(^|[^-!#$%*+=?&@|~.:<>^\\\/])(?:--(?:(?=.)[^-!#$%*+=?&@|~.:<>^\\\/].*|$)|{-[\s\S]*?-})/m,
    lookbehind: !0,
  },
  char: {
    pattern:
      /'(?:[^\\']|\\(?:[abfnrtv\\"'&]|\^[A-Z@[\]^_]|NUL|SOH|STX|ETX|EOT|ENQ|ACK|BEL|BS|HT|LF|VT|FF|CR|SO|SI|DLE|DC1|DC2|DC3|DC4|NAK|SYN|ETB|CAN|EM|SUB|ESC|FS|GS|RS|US|SP|DEL|\d+|o[0-7]+|x[0-9a-fA-F]+))'/,
    alias: "string",
  },
  string: { pattern: /"(?:[^\\"]|\\(?:\S|\s+\\))*"/, greedy: !0 },
  keyword:
    /\b(?:case|class|data|deriving|do|else|if|in|infixl|infixr|instance|let|module|newtype|of|primitive|then|type|where)\b/,
  "import-statement": {
    pattern:
      /(^\s*)import\s+(?:qualified\s+)?(?:[A-Z][\w']*)(?:\.[A-Z][\w']*)*(?:\s+as\s+(?:[A-Z][\w']*)(?:\.[A-Z][\w']*)*)?(?:\s+hiding\b)?/m,
    lookbehind: !0,
    inside: { keyword: /\b(?:import|qualified|as|hiding)\b/ },
  },
  builtin:
    /\b(?:abs|acos|acosh|all|and|any|appendFile|approxRational|asTypeOf|asin|asinh|atan|atan2|atanh|basicIORun|break|catch|ceiling|chr|compare|concat|concatMap|const|cos|cosh|curry|cycle|decodeFloat|denominator|digitToInt|div|divMod|drop|dropWhile|either|elem|encodeFloat|enumFrom|enumFromThen|enumFromThenTo|enumFromTo|error|even|exp|exponent|fail|filter|flip|floatDigits|floatRadix|floatRange|floor|fmap|foldl|foldl1|foldr|foldr1|fromDouble|fromEnum|fromInt|fromInteger|fromIntegral|fromRational|fst|gcd|getChar|getContents|getLine|group|head|id|inRange|index|init|intToDigit|interact|ioError|isAlpha|isAlphaNum|isAscii|isControl|isDenormalized|isDigit|isHexDigit|isIEEE|isInfinite|isLower|isNaN|isNegativeZero|isOctDigit|isPrint|isSpace|isUpper|iterate|last|lcm|length|lex|lexDigits|lexLitChar|lines|log|logBase|lookup|map|mapM|mapM_|max|maxBound|maximum|maybe|min|minBound|minimum|mod|negate|not|notElem|null|numerator|odd|or|ord|otherwise|pack|pi|pred|primExitWith|print|product|properFraction|putChar|putStr|putStrLn|quot|quotRem|range|rangeSize|read|readDec|readFile|readFloat|readHex|readIO|readInt|readList|readLitChar|readLn|readOct|readParen|readSigned|reads|readsPrec|realToFrac|recip|rem|repeat|replicate|return|reverse|round|scaleFloat|scanl|scanl1|scanr|scanr1|seq|sequence|sequence_|show|showChar|showInt|showList|showLitChar|showParen|showSigned|showString|shows|showsPrec|significand|signum|sin|sinh|snd|sort|span|splitAt|sqrt|subtract|succ|sum|tail|take|takeWhile|tan|tanh|threadToIOResult|toEnum|toInt|toInteger|toLower|toRational|toUpper|truncate|uncurry|undefined|unlines|until|unwords|unzip|unzip3|userError|words|writeFile|zip|zip3|zipWith|zipWith3)\b/,
  number: /\b(?:\d+(?:\.\d+)?(?:e[+-]?\d+)?|0o[0-7]+|0x[0-9a-f]+)\b/i,
  operator:
    /\s\.\s|[-!#$%*+=?&@|~.:<>^\\\/]*\.[-!#$%*+=?&@|~.:<>^\\\/]+|[-!#$%*+=?&@|~.:<>^\\\/]+\.[-!#$%*+=?&@|~.:<>^\\\/]*|[-!#$%*+=?&@|~:<>^\\\/]+|`(?:[A-Z][\w']*\.)*[_a-z][\w']*`/,
  hvariable: /\b(?:[A-Z][\w']*\.)*[_a-z][\w']*\b/,
  constant: /\b(?:[A-Z][\w']*\.)*[A-Z][\w']*\b/,
  punctuation: /[{}[\];(),.:]/,
}, Prism.languages.hs = Prism.languages.haskell;
!function (t) {
  t.languages.http = {
    "request-line": {
      pattern:
        /^(?:POST|GET|PUT|DELETE|OPTIONS|PATCH|TRACE|CONNECT)\s(?:https?:\/\/|\/)\S+\sHTTP\/[0-9.]+/m,
      inside: {
        property: /^(?:POST|GET|PUT|DELETE|OPTIONS|PATCH|TRACE|CONNECT)\b/,
        "attr-name": /:\w+/,
      },
    },
    "response-status": {
      pattern: /^HTTP\/1.[01] \d+.*/m,
      inside: {
        property: { pattern: /(^HTTP\/1.[01] )\d+.*/i, lookbehind: !0 },
      },
    },
    "header-name": { pattern: /^[\w-]+:(?=.)/m, alias: "keyword" },
  };
  var a,
    e,
    n,
    i = t.languages,
    p = {
      "application/javascript": i.javascript,
      "application/json": i.json || i.javascript,
      "application/xml": i.xml,
      "text/xml": i.xml,
      "text/html": i.html,
      "text/css": i.css,
    },
    s = { "application/json": !0, "application/xml": !0 };
  for (var r in p) {
    if (p[r]) {
      a = a || {};
      var T = s[r]
        ? (void 0,
          n = (e = r).replace(/^[a-z]+\//, ""),
          "(?:" + e + "|\\w+/(?:[\\w.-]+\\+)+" + n + "(?![+\\w.-]))")
        : r;
      a[r.replace(/\//g, "-")] = {
        pattern: RegExp(
          "(content-type:\\s*" + T + "[\\s\\S]*?)(?:\\r?\\n|\\r){2}[\\s\\S]*",
          "i",
        ),
        lookbehind: !0,
        inside: p[r],
      };
    }
  }
  a && t.languages.insertBefore("http", "header-name", a);
}(Prism);
Prism.languages.ini = {
  comment: /^[ \t]*[;#].*$/m,
  selector: /^[ \t]*\[.*?\]/m,
  constant: /^[ \t]*[^\s=]+?(?=[ \t]*=)/m,
  "attr-value": { pattern: /=.*/, inside: { punctuation: /^[=]/ } },
};
!function (e) {
  var t =
      /\b(?:abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|exports|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|module|native|new|null|open|opens|package|private|protected|provides|public|record|requires|return|short|static|strictfp|super|switch|synchronized|this|throw|throws|to|transient|transitive|try|uses|var|void|volatile|while|with|yield)\b/,
    a = /\b[A-Z](?:\w*[a-z]\w*)?\b/;
  e.languages.java = e.languages.extend(
    "clike",
    {
      "class-name": [a, /\b[A-Z]\w*(?=\s+\w+\s*[;,=())])/],
      keyword: t,
      function: [
        e.languages.clike.function,
        { pattern: /(\:\:)[a-z_]\w*/, lookbehind: !0 },
      ],
      number:
        /\b0b[01][01_]*L?\b|\b0x[\da-f_]*\.?[\da-f_p+-]+\b|(?:\b\d[\d_]*\.?[\d_]*|\B\.\d[\d_]*)(?:e[+-]?\d[\d_]*)?[dfl]?/i,
      operator: {
        pattern:
          /(^|[^.])(?:<<=?|>>>?=?|->|--|\+\+|&&|\|\||::|[?:~]|[-+*/%&|^!=<>]=?)/m,
        lookbehind: !0,
      },
    },
  ),
    e.languages.insertBefore(
      "java",
      "string",
      {
        "triple-quoted-string": {
          pattern: /"""[ \t]*[\r\n](?:(?:"|"")?(?:\\.|[^"\\]))*"""/,
          greedy: !0,
          alias: "string",
        },
      },
    ),
    e.languages.insertBefore(
      "java",
      "class-name",
      {
        annotation: {
          alias: "punctuation",
          pattern: /(^|[^.])@\w+/,
          lookbehind: !0,
        },
        namespace: {
          pattern: RegExp(
            "(\\b(?:exports|import(?:\\s+static)?|module|open|opens|package|provides|requires|to|transitive|uses|with)\\s+)(?!<keyword>)[a-z]\\w*(?:\\.[a-z]\\w*)*\\.?"
              .replace(/<keyword>/g, function () {
                return t.source;
              }),
          ),
          lookbehind: !0,
          inside: { punctuation: /\./ },
        },
        generics: {
          pattern:
            /<(?:[\w\s,.&?]|<(?:[\w\s,.&?]|<(?:[\w\s,.&?]|<[\w\s,.&?]*>)*>)*>)*>/,
          inside: {
            "class-name": a,
            keyword: t,
            punctuation: /[<>(),.:]/,
            operator: /[?&|]/,
          },
        },
      },
    );
}(Prism);
!function (n) {
  n.languages.php = n.languages.extend(
    "clike",
    {
      keyword:
        /\b(?:__halt_compiler|abstract|and|array|as|break|callable|case|catch|class|clone|const|continue|declare|default|die|do|echo|else|elseif|empty|enddeclare|endfor|endforeach|endif|endswitch|endwhile|eval|exit|extends|final|finally|for|foreach|function|global|goto|if|implements|include|include_once|instanceof|insteadof|interface|isset|list|namespace|new|or|parent|print|private|protected|public|require|require_once|return|static|switch|throw|trait|try|unset|use|var|while|xor|yield)\b/i,
      boolean: { pattern: /\b(?:false|true)\b/i, alias: "constant" },
      constant: [/\b[A-Z_][A-Z0-9_]*\b/, /\b(?:null)\b/i],
      comment: {
        pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/,
        lookbehind: !0,
      },
    },
  ),
    n.languages.insertBefore(
      "php",
      "string",
      {
        "shell-comment": {
          pattern: /(^|[^\\])#.*/,
          lookbehind: !0,
          alias: "comment",
        },
      },
    ),
    n.languages.insertBefore(
      "php",
      "comment",
      {
        delimiter: {
          pattern: /\?>$|^<\?(?:php(?=\s)|=)?/i,
          alias: "important",
        },
      },
    ),
    n.languages.insertBefore(
      "php",
      "keyword",
      {
        variable: /\$+(?:\w+\b|(?={))/i,
        package: {
          pattern: /(\\|namespace\s+|use\s+)[\w\\]+/,
          lookbehind: !0,
          inside: { punctuation: /\\/ },
        },
      },
    ),
    n.languages.insertBefore(
      "php",
      "operator",
      { property: { pattern: /(->)[\w]+/, lookbehind: !0 } },
    );
  var e = {
    pattern:
      /{\$(?:{(?:{[^{}]+}|[^{}]+)}|[^{}])+}|(^|[^\\{])\$+(?:\w+(?:\[[^\r\n\[\]]+\]|->\w+)*)/,
    lookbehind: !0,
    inside: n.languages.php,
  };
  n.languages.insertBefore(
    "php",
    "string",
    {
      "nowdoc-string": {
        pattern: /<<<'([^']+)'[\r\n](?:.*[\r\n])*?\1;/,
        greedy: !0,
        alias: "string",
        inside: {
          delimiter: {
            pattern: /^<<<'[^']+'|[a-z_]\w*;$/i,
            alias: "symbol",
            inside: { punctuation: /^<<<'?|[';]$/ },
          },
        },
      },
      "heredoc-string": {
        pattern:
          /<<<(?:"([^"]+)"[\r\n](?:.*[\r\n])*?\1;|([a-z_]\w*)[\r\n](?:.*[\r\n])*?\2;)/i,
        greedy: !0,
        alias: "string",
        inside: {
          delimiter: {
            pattern: /^<<<(?:"[^"]+"|[a-z_]\w*)|[a-z_]\w*;$/i,
            alias: "symbol",
            inside: { punctuation: /^<<<"?|[";]$/ },
          },
          interpolation: e,
        },
      },
      "single-quoted-string": {
        pattern: /'(?:\\[\s\S]|[^\\'])*'/,
        greedy: !0,
        alias: "string",
      },
      "double-quoted-string": {
        pattern: /"(?:\\[\s\S]|[^\\"])*"/,
        greedy: !0,
        alias: "string",
        inside: { interpolation: e },
      },
    },
  ),
    delete n.languages.php.string,
    n.hooks.add("before-tokenize", function (e) {
      if (/<\?/.test(e.code)) {
        n.languages["markup-templating"].buildPlaceholders(
          e,
          "php",
          /<\?(?:[^"'/#]|\/(?![*/])|("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|(?:\/\/|#)(?:[^?\n\r]|\?(?!>))*(?=$|\?>|[\r\n])|\/\*[\s\S]*?(?:\*\/|$))*?(?:\?>|$)/gi,
        );
      }
    }),
    n.hooks.add("after-tokenize", function (e) {
      n.languages["markup-templating"].tokenizePlaceholders(e, "php");
    });
}(Prism);
!function (p) {
  var a = p.languages.javadoclike = {
    parameter: {
      pattern: /(^\s*(?:\/{3}|\*|\/\*\*)\s*@(?:param|arg|arguments)\s+)\w+/m,
      lookbehind: !0,
    },
    keyword: {
      pattern: /(^\s*(?:\/{3}|\*|\/\*\*)\s*|\{)@[a-z][a-zA-Z-]+\b/m,
      lookbehind: !0,
    },
    punctuation: /[{}]/,
  };
  Object.defineProperty(a, "addSupport", {
    value: function (a, e) {
      "string" == typeof a && (a = [a]),
        a.forEach(function (a) {
          !function (a, e) {
            var n = "doc-comment", t = p.languages[a];
            if (t) {
              var r = t[n];
              if (!r) {
                var o = {
                  "doc-comment": {
                    pattern: /(^|[^\\])\/\*\*[^/][\s\S]*?(?:\*\/|$)/,
                    lookbehind: !0,
                    alias: "comment",
                  },
                };
                r = (t = p.languages.insertBefore(a, "comment", o))[n];
              }
              if (
                r instanceof RegExp && (r = t[n] = { pattern: r }),
                  Array.isArray(r)
              ) {
                for (
                  var i = 0, s = r.length;
                  i < s;
                  i++
                ) {
                  r[i] instanceof RegExp && (r[i] = { pattern: r[i] }), e(r[i]);
                }
              } else e(r);
            }
          }(a, function (a) {
            a.inside || (a.inside = {}), a.inside.rest = e;
          });
        });
    },
  }), a.addSupport(["java", "javascript", "php"], a);
}(Prism);
!function (a) {
  var e = /(^(?:\s*(?:\*\s*)*)).*[^*\s].*$/m,
    n = "(?:[a-zA-Z]\\w+\\s*\\.\\s*)*[A-Z]\\w*(?:\\s*<mem>)?|<mem>".replace(
      /<mem>/g,
      function () {
        return "#\\s*\\w+(?:\\s*\\([^()]*\\))?";
      },
    );
  a.languages.javadoc = a.languages.extend("javadoclike", {}),
    a.languages.insertBefore(
      "javadoc",
      "keyword",
      {
        reference: {
          pattern: RegExp(
            "(@(?:exception|throws|see|link|linkplain|value)\\s+(?:\\*\\s*)?)(?:" +
              n + ")",
          ),
          lookbehind: !0,
          inside: {
            function: { pattern: /(#\s*)\w+(?=\s*\()/, lookbehind: !0 },
            field: { pattern: /(#\s*)\w+/, lookbehind: !0 },
            namespace: {
              pattern: /\b(?:[a-z]\w*\s*\.\s*)+/,
              inside: { punctuation: /\./ },
            },
            "class-name": /\b[A-Z]\w*/,
            keyword: a.languages.java.keyword,
            punctuation: /[#()[\],.]/,
          },
        },
        "class-name": {
          pattern: /(@param\s+)<[A-Z]\w*>/,
          lookbehind: !0,
          inside: { punctuation: /[.<>]/ },
        },
        "code-section": [
          {
            pattern:
              /(\{@code\s+)(?:[^{}]|\{(?:[^{}]|\{(?:[^{}]|\{(?:[^{}]|\{[^{}]*\})*\})*\})*\})+?(?=\s*\})/,
            lookbehind: !0,
            inside: {
              code: {
                pattern: e,
                lookbehind: !0,
                inside: a.languages.java,
                alias: "language-java",
              },
            },
          },
          {
            pattern: /(<(code|pre|tt)>(?!<code>)\s*)[\s\S]+?(?=\s*<\/\2>)/,
            lookbehind: !0,
            inside: {
              line: {
                pattern: e,
                lookbehind: !0,
                inside: {
                  tag: a.languages.markup.tag,
                  entity: a.languages.markup.entity,
                  code: {
                    pattern: /.+/,
                    inside: a.languages.java,
                    alias: "language-java",
                  },
                },
              },
            },
          },
        ],
        tag: a.languages.markup.tag,
        entity: a.languages.markup.entity,
      },
    ),
    a.languages.javadoclike.addSupport("java", a.languages.javadoc);
}(Prism);
!function (e) {
  e.languages.typescript = e.languages.extend(
    "javascript",
    {
      "class-name": {
        pattern:
          /(\b(?:class|extends|implements|instanceof|interface|new|type)\s+)(?!keyof\b)[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?:\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>)?/,
        lookbehind: !0,
        greedy: !0,
        inside: null,
      },
      keyword:
        /\b(?:abstract|as|asserts|async|await|break|case|catch|class|const|constructor|continue|debugger|declare|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|is|keyof|let|module|namespace|new|null|of|package|private|protected|public|readonly|return|require|set|static|super|switch|this|throw|try|type|typeof|undefined|var|void|while|with|yield)\b/,
      builtin:
        /\b(?:string|Function|any|number|boolean|Array|symbol|console|Promise|unknown|never)\b/,
    },
  ), delete e.languages.typescript.parameter;
  var n = e.languages.extend("typescript", {});
  delete n["class-name"],
    e.languages.typescript["class-name"].inside = n,
    e.languages.insertBefore(
      "typescript",
      "function",
      {
        "generic-function": {
          pattern:
            /#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>(?=\s*\()/,
          greedy: !0,
          inside: {
            function: /^#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*/,
            generic: { pattern: /<[\s\S]+/, alias: "class-name", inside: n },
          },
        },
      },
    ),
    e.languages.ts = e.languages.typescript;
}(Prism);
!function (e) {
  var a = e.languages.javascript,
    n = "{(?:[^{}]|{(?:[^{}]|{[^{}]*})*})+}",
    t = "(@(?:param|arg|argument|property)\\s+(?:" + n + "\\s+)?)";
  e.languages.jsdoc = e.languages.extend(
    "javadoclike",
    {
      parameter: {
        pattern: RegExp(t + "[$\\w\\xA0-\\uFFFF.]+(?=\\s|$)"),
        lookbehind: !0,
        inside: { punctuation: /\./ },
      },
    },
  ),
    e.languages.insertBefore(
      "jsdoc",
      "keyword",
      {
        "optional-parameter": {
          pattern: RegExp(
            t + "\\[[$\\w\\xA0-\\uFFFF.]+(?:=[^[\\]]+)?\\](?=\\s|$)",
          ),
          lookbehind: !0,
          inside: {
            parameter: {
              pattern: /(^\[)[$\w\xA0-\uFFFF\.]+/,
              lookbehind: !0,
              inside: { punctuation: /\./ },
            },
            code: {
              pattern: /(=)[\s\S]*(?=\]$)/,
              lookbehind: !0,
              inside: a,
              alias: "language-javascript",
            },
            punctuation: /[=[\]]/,
          },
        },
        "class-name": [
          {
            pattern: RegExp(
              "(@(?:augments|extends|class|interface|memberof!?|template|this|typedef)\\s+(?:<TYPE>\\s+)?)[A-Z]\\w*(?:\\.[A-Z]\\w*)*"
                .replace(/<TYPE>/g, function () {
                  return n;
                }),
            ),
            lookbehind: !0,
            inside: { punctuation: /\./ },
          },
          {
            pattern: RegExp("(@[a-z]+\\s+)" + n),
            lookbehind: !0,
            inside: {
              string: a.string,
              number: a.number,
              boolean: a.boolean,
              keyword: e.languages.typescript.keyword,
              operator: /=>|\.\.\.|[&|?:*]/,
              punctuation: /[.,;=<>{}()[\]]/,
            },
          },
        ],
        example: {
          pattern: /(@example\s+)[^@]+?(?=\s*(?:\*\s*)?(?:@\w|\*\/))/,
          lookbehind: !0,
          inside: {
            code: {
              pattern: /^(\s*(?:\*\s*)?).+$/m,
              lookbehind: !0,
              inside: a,
              alias: "language-javascript",
            },
          },
        },
      },
    ),
    e.languages.javadoclike.addSupport("javascript", e.languages.jsdoc);
}(Prism);
!function (a) {
  function e(a, e) {
    return RegExp(
      a.replace(/<ID>/g, function () {
        return "[_$a-zA-Z\\xA0-\\uFFFF][$\\w\\xA0-\\uFFFF]*";
      }),
      e,
    );
  }
  a.languages.insertBefore(
    "javascript",
    "function-variable",
    {
      "method-variable": {
        pattern: RegExp(
          "(\\.\\s*)" +
            a.languages.javascript["function-variable"].pattern.source,
        ),
        lookbehind: !0,
        alias: ["function-variable", "method", "function", "property-access"],
      },
    },
  ),
    a.languages.insertBefore(
      "javascript",
      "function",
      {
        method: {
          pattern: RegExp("(\\.\\s*)" + a.languages.javascript.function.source),
          lookbehind: !0,
          alias: ["function", "property-access"],
        },
      },
    ),
    a.languages.insertBefore(
      "javascript",
      "constant",
      {
        "known-class-name": [
          {
            pattern:
              /\b(?:(?:(?:Uint|Int)(?:8|16|32)|Uint8Clamped|Float(?:32|64))?Array|ArrayBuffer|BigInt|Boolean|DataView|Date|Error|Function|Intl|JSON|Math|Number|Object|Promise|Proxy|Reflect|RegExp|String|Symbol|(?:Weak)?(?:Set|Map)|WebAssembly)\b/,
            alias: "class-name",
          },
          { pattern: /\b(?:[A-Z]\w*)Error\b/, alias: "class-name" },
        ],
      },
    ),
    a.languages.insertBefore(
      "javascript",
      "keyword",
      {
        imports: {
          pattern: e(
            "(\\bimport\\b\\s*)(?:<ID>(?:\\s*,\\s*(?:\\*\\s*as\\s+<ID>|\\{[^{}]*\\}))?|\\*\\s*as\\s+<ID>|\\{[^{}]*\\})(?=\\s*\\bfrom\\b)",
          ),
          lookbehind: !0,
          inside: a.languages.javascript,
        },
        exports: {
          pattern: e(
            "(\\bexport\\b\\s*)(?:\\*(?:\\s*as\\s+<ID>)?(?=\\s*\\bfrom\\b)|\\{[^{}]*\\})",
          ),
          lookbehind: !0,
          inside: a.languages.javascript,
        },
      },
    ),
    a.languages.javascript.keyword.unshift(
      { pattern: /\b(?:as|default|export|from|import)\b/, alias: "module" },
      {
        pattern:
          /\b(?:await|break|catch|continue|do|else|for|finally|if|return|switch|throw|try|while|yield)\b/,
        alias: "control-flow",
      },
      { pattern: /\bnull\b/, alias: ["null", "nil"] },
      { pattern: /\bundefined\b/, alias: "nil" },
    ),
    a.languages.insertBefore(
      "javascript",
      "operator",
      {
        spread: { pattern: /\.{3}/, alias: "operator" },
        arrow: { pattern: /=>/, alias: "operator" },
      },
    ),
    a.languages.insertBefore(
      "javascript",
      "punctuation",
      {
        "property-access": { pattern: e("(\\.\\s*)#?<ID>"), lookbehind: !0 },
        "maybe-class-name": {
          pattern: /(^|[^$\w\xA0-\uFFFF])[A-Z][$\w\xA0-\uFFFF]+/,
          lookbehind: !0,
        },
        dom: {
          pattern:
            /\b(?:document|location|navigator|performance|(?:local|session)Storage|window)\b/,
          alias: "variable",
        },
        console: { pattern: /\bconsole(?=\s*\.)/, alias: "class-name" },
      },
    );
  for (
    var t = [
        "function",
        "function-variable",
        "method",
        "method-variable",
        "property-access",
      ],
      r = 0;
    r < t.length;
    r++
  ) {
    var n = t[r], s = a.languages.javascript[n];
    "RegExp" === a.util.type(s) &&
      (s = a.languages.javascript[n] = { pattern: s });
    var o = s.inside || {};
    (s.inside = o)["maybe-class-name"] = /^[A-Z][\s\S]*/;
  }
}(Prism);
Prism.languages.json = {
  property: { pattern: /"(?:\\.|[^\\"\r\n])*"(?=\s*:)/, greedy: !0 },
  string: { pattern: /"(?:\\.|[^\\"\r\n])*"(?!\s*:)/, greedy: !0 },
  comment: { pattern: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/, greedy: !0 },
  number: /-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
  punctuation: /[{}[\],]/,
  operator: /:/,
  boolean: /\b(?:true|false)\b/,
  null: { pattern: /\bnull\b/, alias: "keyword" },
}, Prism.languages.webmanifest = Prism.languages.json;
!function (n) {
  var e = /("|')(?:\\(?:\r\n?|\n|.)|(?!\1)[^\\\r\n])*\1/;
  n.languages.json5 = n.languages.extend(
    "json",
    {
      property: [
        { pattern: RegExp(e.source + "(?=\\s*:)"), greedy: !0 },
        {
          pattern: /[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*:)/,
          alias: "unquoted",
        },
      ],
      string: { pattern: e, greedy: !0 },
      number:
        /[+-]?\b(?:NaN|Infinity|0x[a-fA-F\d]+)\b|[+-]?(?:\b\d+\.?\d*|\B\.\d+)(?:[eE][+-]?\d+\b)?/,
    },
  );
}(Prism);
Prism.languages.jsonp = Prism.languages.extend(
  "json",
  { punctuation: /[{}[\]();,.]/ },
),
  Prism.languages.insertBefore(
    "jsonp",
    "punctuation",
    { function: /[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*\()/ },
  );
!function (u) {
  var e = u.languages.javascript["template-string"],
    n = e.pattern.source,
    a = e.inside.interpolation,
    i = a.inside["interpolation-punctuation"],
    r = a.pattern.source;
  function t(e, t) {
    if (u.languages[e]) {
      return {
        pattern: RegExp("((?:" + t + ")\\s*)" + n),
        lookbehind: !0,
        greedy: !0,
        inside: {
          "template-punctuation": { pattern: /^`|`$/, alias: "string" },
          "embedded-code": { pattern: /[\s\S]+/, alias: e },
        },
      };
    }
  }
  function o(e, t, n) {
    var r = { code: e, grammar: t, language: n };
    return u.hooks.run("before-tokenize", r),
      r.tokens = u.tokenize(r.code, r.grammar),
      u.hooks.run("after-tokenize", r),
      r.tokens;
  }
  function d(e) {
    var t = {};
    t["interpolation-punctuation"] = i;
    var n = u.tokenize(e, t);
    if (3 === n.length) {
      var r = [1, 1];
      r.push.apply(r, o(n[1], u.languages.javascript, "javascript")),
        n.splice.apply(n, r);
    }
    return new u.Token("interpolation", n, a.alias, e);
  }
  function c(a, e, i) {
    var t = u.tokenize(
        a,
        { interpolation: { pattern: RegExp(r), lookbehind: !0 } },
      ),
      f = 0,
      y = {},
      n = o(
        t.map(function (e) {
          if ("string" == typeof e) return e;
          for (
            var t, n = e.content;
            -1 !==
              a.indexOf(
                (r = f++, t = "___" + i.toUpperCase() + "_" + r + "___"),
              );
          );
          return y[t] = n, t;
          var r;
        }).join(""),
        e,
        i,
      ),
      v = Object.keys(y);
    return f = 0,
      function e(t) {
        for (var n = 0; n < t.length; n++) {
          if (f >= v.length) return;
          var r = t[n];
          if ("string" == typeof r || "string" == typeof r.content) {
            var a = v[f],
              i = "string" == typeof r ? r : r.content,
              o = i.indexOf(a);
            if (-1 !== o) {
              ++f;
              var s = i.substring(0, o),
                p = d(y[a]),
                l = i.substring(o + a.length),
                g = [];
              if (s && g.push(s), g.push(p), l) {
                var u = [l];
                e(u), g.push.apply(g, u);
              }
              "string" == typeof r
                ? (t.splice.apply(t, [n, 1].concat(g)), n += g.length - 1)
                : r.content = g;
            }
          } else {
            var c = r.content;
            Array.isArray(c) ? e(c) : e([c]);
          }
        }
      }(n),
      new u.Token(i, n, "language-" + i, a);
  }
  u.languages.javascript["template-string"] = [
    t(
      "css",
      "\\b(?:styled(?:\\([^)]*\\))?(?:\\s*\\.\\s*\\w+(?:\\([^)]*\\))*)*|css(?:\\s*\\.\\s*(?:global|resolve))?|createGlobalStyle|keyframes)",
    ),
    t("html", "\\bhtml|\\.\\s*(?:inner|outer)HTML\\s*\\+?="),
    t("svg", "\\bsvg"),
    t("markdown", "\\b(?:md|markdown)"),
    t("graphql", "\\b(?:gql|graphql(?:\\s*\\.\\s*experimental)?)"),
    e,
  ].filter(Boolean);
  var s = { javascript: !0, js: !0, typescript: !0, ts: !0, jsx: !0, tsx: !0 };
  function f(e) {
    return "string" == typeof e
      ? e
      : Array.isArray(e)
      ? e.map(f).join("")
      : f(e.content);
  }
  u.hooks.add("after-tokenize", function (e) {
    e.language in s && !function e(t) {
      for (var n = 0, r = t.length; n < r; n++) {
        var a = t[n];
        if ("string" != typeof a) {
          var i = a.content;
          if (Array.isArray(i)) {
            if ("template-string" === a.type) {
              var o = i[1];
              if (
                3 === i.length && "string" != typeof o &&
                "embedded-code" === o.type
              ) {
                var s = f(o),
                  p = o.alias,
                  l = Array.isArray(p) ? p[0] : p,
                  g = u.languages[l];
                if (!g) continue;
                i[1] = c(s, g, l);
              }
            } else e(i);
          } else "string" != typeof i && e([i]);
        }
      }
    }(e.tokens);
  });
}(Prism);
!function (n) {
  n.languages.kotlin = n.languages.extend(
    "clike",
    {
      keyword: {
        pattern:
          /(^|[^.])\b(?:abstract|actual|annotation|as|break|by|catch|class|companion|const|constructor|continue|crossinline|data|do|dynamic|else|enum|expect|external|final|finally|for|fun|get|if|import|in|infix|init|inline|inner|interface|internal|is|lateinit|noinline|null|object|open|operator|out|override|package|private|protected|public|reified|return|sealed|set|super|suspend|tailrec|this|throw|to|try|typealias|val|var|vararg|when|where|while)\b/,
        lookbehind: !0,
      },
      function: [
        /\w+(?=\s*\()/,
        { pattern: /(\.)\w+(?=\s*\{)/, lookbehind: !0 },
      ],
      number:
        /\b(?:0[xX][\da-fA-F]+(?:_[\da-fA-F]+)*|0[bB][01]+(?:_[01]+)*|\d+(?:_\d+)*(?:\.\d+(?:_\d+)*)?(?:[eE][+-]?\d+(?:_\d+)*)?[fFL]?)\b/,
      operator:
        /\+[+=]?|-[-=>]?|==?=?|!(?:!|==?)?|[\/*%<>]=?|[?:]:?|\.\.|&&|\|\||\b(?:and|inv|or|shl|shr|ushr|xor)\b/,
    },
  ),
    delete n.languages.kotlin["class-name"],
    n.languages.insertBefore(
      "kotlin",
      "string",
      { "raw-string": { pattern: /("""|''')[\s\S]*?\1/, alias: "string" } },
    ),
    n.languages.insertBefore(
      "kotlin",
      "keyword",
      {
        annotation: {
          pattern: /\B@(?:\w+:)?(?:[A-Z]\w*|\[[^\]]+\])/,
          alias: "builtin",
        },
      },
    ),
    n.languages.insertBefore(
      "kotlin",
      "function",
      { label: { pattern: /\w+@|@\w+/, alias: "symbol" } },
    );
  var e = [
    {
      pattern: /\$\{[^}]+\}/,
      inside: {
        delimiter: { pattern: /^\$\{|\}$/, alias: "variable" },
        rest: n.languages.kotlin,
      },
    },
    { pattern: /\$\w+/, alias: "variable" },
  ];
  n.languages.kotlin.string.inside = n.languages.kotlin["raw-string"].inside = {
    interpolation: e,
  },
    n.languages.kt = n.languages.kotlin,
    n.languages.kts = n.languages.kotlin;
}(Prism);
!function (a) {
  var e = /\\(?:[^a-z()[\]]|[a-z*]+)/i,
    n = { "equation-command": { pattern: e, alias: "regex" } };
  a.languages.latex = {
    comment: /%.*/m,
    cdata: {
      pattern:
        /(\\begin\{((?:verbatim|lstlisting)\*?)\})[\s\S]*?(?=\\end\{\2\})/,
      lookbehind: !0,
    },
    equation: [
      {
        pattern:
          /\$\$(?:\\[\s\S]|[^\\$])+\$\$|\$(?:\\[\s\S]|[^\\$])+\$|\\\([\s\S]*?\\\)|\\\[[\s\S]*?\\\]/,
        inside: n,
        alias: "string",
      },
      {
        pattern:
          /(\\begin\{((?:equation|math|eqnarray|align|multline|gather)\*?)\})[\s\S]*?(?=\\end\{\2\})/,
        lookbehind: !0,
        inside: n,
        alias: "string",
      },
    ],
    keyword: {
      pattern:
        /(\\(?:begin|end|ref|cite|label|usepackage|documentclass)(?:\[[^\]]+\])?\{)[^}]+(?=\})/,
      lookbehind: !0,
    },
    url: { pattern: /(\\url\{)[^}]+(?=\})/, lookbehind: !0 },
    headline: {
      pattern:
        /(\\(?:part|chapter|section|subsection|frametitle|subsubsection|paragraph|subparagraph|subsubparagraph|subsubsubparagraph)\*?(?:\[[^\]]+\])?\{)[^}]+(?=\}(?:\[[^\]]+\])?)/,
      lookbehind: !0,
      alias: "class-name",
    },
    function: { pattern: e, alias: "selector" },
    punctuation: /[[\]{}&]/,
  },
    a.languages.tex = a.languages.latex,
    a.languages.context = a.languages.latex;
}(Prism);
Prism.languages.less = Prism.languages.extend(
  "css",
  {
    comment: [
      /\/\*[\s\S]*?\*\//,
      { pattern: /(^|[^\\])\/\/.*/, lookbehind: !0 },
    ],
    atrule: {
      pattern: /@[\w-]+?(?:\((?:[^(){}]|\([^(){}]*\))*\)|[^(){};])*?(?=\s*\{)/,
      inside: { punctuation: /[:()]/ },
    },
    selector: {
      pattern:
        /(?:@\{[\w-]+\}|[^{};\s@])(?:@\{[\w-]+\}|\((?:[^(){}]|\([^(){}]*\))*\)|[^(){};@])*?(?=\s*\{)/,
      inside: { variable: /@+[\w-]+/ },
    },
    property: /(?:@\{[\w-]+\}|[\w-])+(?:\+_?)?(?=\s*:)/i,
    operator: /[+\-*\/]/,
  },
),
  Prism.languages.insertBefore(
    "less",
    "property",
    {
      variable: [
        { pattern: /@[\w-]+\s*:/, inside: { punctuation: /:/ } },
        /@@?[\w-]+/,
      ],
      "mixin-usage": {
        pattern: /([{;]\s*)[.#](?!\d)[\w-]+.*?(?=[(;])/,
        lookbehind: !0,
        alias: "function",
      },
    },
  );
Prism.languages.livescript = {
  comment: [
    { pattern: /(^|[^\\])\/\*[\s\S]*?\*\//, lookbehind: !0 },
    { pattern: /(^|[^\\])#.*/, lookbehind: !0 },
  ],
  "interpolated-string": {
    pattern: /(^|[^"])("""|")(?:\\[\s\S]|(?!\2)[^\\])*\2(?!")/,
    lookbehind: !0,
    greedy: !0,
    inside: {
      variable: {
        pattern: /(^|[^\\])#[a-z_](?:-?[a-z]|[\d_])*/m,
        lookbehind: !0,
      },
      interpolation: {
        pattern: /(^|[^\\])#\{[^}]+\}/m,
        lookbehind: !0,
        inside: {
          "interpolation-punctuation": {
            pattern: /^#\{|\}$/,
            alias: "variable",
          },
        },
      },
      string: /[\s\S]+/,
    },
  },
  string: [
    { pattern: /('''|')(?:\\[\s\S]|(?!\1)[^\\])*\1/, greedy: !0 },
    { pattern: /<\[[\s\S]*?\]>/, greedy: !0 },
    /\\[^\s,;\])}]+/,
  ],
  regex: [
    {
      pattern: /\/\/(?:\[[^\r\n\]]*\]|\\.|(?!\/\/)[^\\\[])+\/\/[gimyu]{0,5}/,
      greedy: !0,
      inside: { comment: { pattern: /(^|[^\\])#.*/, lookbehind: !0 } },
    },
    {
      pattern: /\/(?:\[[^\r\n\]]*\]|\\.|[^/\\\r\n\[])+\/[gimyu]{0,5}/,
      greedy: !0,
    },
  ],
  keyword: {
    pattern:
      /(^|(?!-).)\b(?:break|case|catch|class|const|continue|default|do|else|extends|fallthrough|finally|for(?: ever)?|function|if|implements|it|let|loop|new|null|otherwise|own|return|super|switch|that|then|this|throw|try|unless|until|var|void|when|while|yield)(?!-)\b/m,
    lookbehind: !0,
  },
  "keyword-operator": {
    pattern:
      /(^|[^-])\b(?:(?:delete|require|typeof)!|(?:and|by|delete|export|from|import(?: all)?|in|instanceof|is(?:nt| not)?|not|of|or|til|to|typeof|with|xor)(?!-)\b)/m,
    lookbehind: !0,
    alias: "operator",
  },
  boolean: {
    pattern: /(^|[^-])\b(?:false|no|off|on|true|yes)(?!-)\b/m,
    lookbehind: !0,
  },
  argument: {
    pattern: /(^|(?!\.&\.)[^&])&(?!&)\d*/m,
    lookbehind: !0,
    alias: "variable",
  },
  number: /\b(?:\d+~[\da-z]+|\d[\d_]*(?:\.\d[\d_]*)?(?:[a-z]\w*)?)/i,
  identifier: /[a-z_](?:-?[a-z]|[\d_])*/i,
  operator: [
    { pattern: /( )\.(?= )/, lookbehind: !0 },
    /\.(?:[=~]|\.\.?)|\.(?:[&|^]|<<|>>>?)\.|:(?:=|:=?)|&&|\|[|>]|<(?:<<?<?|--?!?|~~?!?|[|=?])?|>[>=?]?|-(?:->?|>)?|\+\+?|@@?|%%?|\*\*?|!(?:~?=|--?>|~?~>)?|~(?:~?>|=)?|==?|\^\^?|[\/?]/,
  ],
  punctuation: /[(){}\[\]|.,:;`]/,
},
  Prism.languages.livescript["interpolated-string"].inside.interpolation.inside
    .rest = Prism.languages.livescript;
Prism.languages.makefile = {
  comment: {
    pattern: /(^|[^\\])#(?:\\(?:\r\n|[\s\S])|[^\\\r\n])*/,
    lookbehind: !0,
  },
  string: {
    pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    greedy: !0,
  },
  builtin: /\.[A-Z][^:#=\s]+(?=\s*:(?!=))/,
  symbol: {
    pattern: /^[^:=\r\n]+(?=\s*:(?!=))/m,
    inside: { variable: /\$+(?:[^(){}:#=\s]+|(?=[({]))/ },
  },
  variable: /\$+(?:[^(){}:#=\s]+|\([@*%<^+?][DF]\)|(?=[({]))/,
  keyword: [
    /-include\b|\b(?:define|else|endef|endif|export|ifn?def|ifn?eq|include|override|private|sinclude|undefine|unexport|vpath)\b/,
    {
      pattern:
        /(\()(?:addsuffix|abspath|and|basename|call|dir|error|eval|file|filter(?:-out)?|findstring|firstword|flavor|foreach|guile|if|info|join|lastword|load|notdir|or|origin|patsubst|realpath|shell|sort|strip|subst|suffix|value|warning|wildcard|word(?:s|list)?)(?=[ \t])/,
      lookbehind: !0,
    },
  ],
  operator: /(?:::|[?:+!])?=|[|@]/,
  punctuation: /[:;(){}]/,
};
!function (d) {
  function n(n) {
    return n = n.replace(/<inner>/g, function () {
      return "(?:\\\\.|[^\\\\\n\r]|(?:\n|\r\n?)(?!\n|\r\n?))";
    }),
      RegExp("((?:^|[^\\\\])(?:\\\\{2})*)(?:" + n + ")");
  }
  var e = "(?:\\\\.|``(?:[^`\r\n]|`(?!`))+``|`[^`\r\n]+`|[^\\\\|\r\n`])+",
    t = "\\|?__(?:\\|__)+\\|?(?:(?:\n|\r\n?)|$)".replace(/__/g, function () {
      return e;
    }),
    a =
      "\\|?[ \t]*:?-{3,}:?[ \t]*(?:\\|[ \t]*:?-{3,}:?[ \t]*)+\\|?(?:\n|\r\n?)";
  d.languages.markdown = d.languages.extend("markup", {}),
    d.languages.insertBefore(
      "markdown",
      "prolog",
      {
        blockquote: { pattern: /^>(?:[\t ]*>)*/m, alias: "punctuation" },
        table: {
          pattern: RegExp("^" + t + a + "(?:" + t + ")*", "m"),
          inside: {
            "table-data-rows": {
              pattern: RegExp("^(" + t + a + ")(?:" + t + ")*$"),
              lookbehind: !0,
              inside: {
                "table-data": {
                  pattern: RegExp(e),
                  inside: d.languages.markdown,
                },
                punctuation: /\|/,
              },
            },
            "table-line": {
              pattern: RegExp("^(" + t + ")" + a + "$"),
              lookbehind: !0,
              inside: { punctuation: /\||:?-{3,}:?/ },
            },
            "table-header-row": {
              pattern: RegExp("^" + t + "$"),
              inside: {
                "table-header": {
                  pattern: RegExp(e),
                  alias: "important",
                  inside: d.languages.markdown,
                },
                punctuation: /\|/,
              },
            },
          },
        },
        code: [
          {
            pattern:
              /((?:^|\n)[ \t]*\n|(?:^|\r\n?)[ \t]*\r\n?)(?: {4}|\t).+(?:(?:\n|\r\n?)(?: {4}|\t).+)*/,
            lookbehind: !0,
            alias: "keyword",
          },
          { pattern: /``.+?``|`[^`\r\n]+`/, alias: "keyword" },
          {
            pattern: /^```[\s\S]*?^```$/m,
            greedy: !0,
            inside: {
              "code-block": {
                pattern: /^(```.*(?:\n|\r\n?))[\s\S]+?(?=(?:\n|\r\n?)^```$)/m,
                lookbehind: !0,
              },
              "code-language": { pattern: /^(```).+/, lookbehind: !0 },
              punctuation: /```/,
            },
          },
        ],
        title: [
          {
            pattern: /\S.*(?:\n|\r\n?)(?:==+|--+)(?=[ \t]*$)/m,
            alias: "important",
            inside: { punctuation: /==+$|--+$/ },
          },
          {
            pattern: /(^\s*)#+.+/m,
            lookbehind: !0,
            alias: "important",
            inside: { punctuation: /^#+|#+$/ },
          },
        ],
        hr: {
          pattern: /(^\s*)([*-])(?:[\t ]*\2){2,}(?=\s*$)/m,
          lookbehind: !0,
          alias: "punctuation",
        },
        list: {
          pattern: /(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,
          lookbehind: !0,
          alias: "punctuation",
        },
        "url-reference": {
          pattern:
            /!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,
          inside: {
            variable: { pattern: /^(!?\[)[^\]]+/, lookbehind: !0 },
            string:
              /(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,
            punctuation: /^[\[\]!:]|[<>]/,
          },
          alias: "url",
        },
        bold: {
          pattern: n(
            "\\b__(?:(?!_)<inner>|_(?:(?!_)<inner>)+_)+__\\b|\\*\\*(?:(?!\\*)<inner>|\\*(?:(?!\\*)<inner>)+\\*)+\\*\\*",
          ),
          lookbehind: !0,
          greedy: !0,
          inside: {
            content: {
              pattern: /(^..)[\s\S]+(?=..$)/,
              lookbehind: !0,
              inside: {},
            },
            punctuation: /\*\*|__/,
          },
        },
        italic: {
          pattern: n(
            "\\b_(?:(?!_)<inner>|__(?:(?!_)<inner>)+__)+_\\b|\\*(?:(?!\\*)<inner>|\\*\\*(?:(?!\\*)<inner>)+\\*\\*)+\\*",
          ),
          lookbehind: !0,
          greedy: !0,
          inside: {
            content: {
              pattern: /(^.)[\s\S]+(?=.$)/,
              lookbehind: !0,
              inside: {},
            },
            punctuation: /[*_]/,
          },
        },
        strike: {
          pattern: n("(~~?)(?:(?!~)<inner>)+?\\2"),
          lookbehind: !0,
          greedy: !0,
          inside: {
            content: {
              pattern: /(^~~?)[\s\S]+(?=\1$)/,
              lookbehind: !0,
              inside: {},
            },
            punctuation: /~~?/,
          },
        },
        url: {
          pattern: n(
            '!?\\[(?:(?!\\])<inner>)+\\](?:\\([^\\s)]+(?:[\t ]+"(?:\\\\.|[^"\\\\])*")?\\)| ?\\[(?:(?!\\])<inner>)+\\])',
          ),
          lookbehind: !0,
          greedy: !0,
          inside: {
            variable: { pattern: /(\[)[^\]]+(?=\]$)/, lookbehind: !0 },
            content: {
              pattern: /(^!?\[)[^\]]+(?=\])/,
              lookbehind: !0,
              inside: {},
            },
            string: { pattern: /"(?:\\.|[^"\\])*"(?=\)$)/ },
          },
        },
      },
    ),
    ["url", "bold", "italic", "strike"].forEach(function (e) {
      ["url", "bold", "italic", "strike"].forEach(function (n) {
        e !== n &&
          (d.languages.markdown[e].inside.content.inside[n] =
            d.languages.markdown[n]);
      });
    }),
    d.hooks.add("after-tokenize", function (n) {
      "markdown" !== n.language && "md" !== n.language || !function n(e) {
        if (e && "string" != typeof e) {
          for (var t = 0, a = e.length; t < a; t++) {
            var i = e[t];
            if ("code" === i.type) {
              var r = i.content[1], o = i.content[3];
              if (
                r && o && "code-language" === r.type &&
                "code-block" === o.type && "string" == typeof r.content
              ) {
                var l = r.content.replace(/\b#/g, "sharp").replace(
                    /\b\+\+/g,
                    "pp",
                  ),
                  s = "language-" +
                    (l = (/[a-z][\w-]*/i.exec(l) || [""])[0].toLowerCase());
                o.alias
                  ? "string" == typeof o.alias
                    ? o.alias = [o.alias, s]
                    : o.alias.push(s)
                  : o.alias = [s];
              }
            } else n(i.content);
          }
        }
      }(n.tokens);
    }),
    d.hooks.add("wrap", function (n) {
      if ("code-block" === n.type) {
        for (var e = "", t = 0, a = n.classes.length; t < a; t++) {
          var i = n.classes[t], r = /language-(.+)/.exec(i);
          if (r) {
            e = r[1];
            break;
          }
        }
        var o = d.languages[e];
        if (o) {
          var l = n.content.replace(/&lt;/g, "<").replace(/&amp;/g, "&");
          n.content = d.highlight(l, o, e);
        } else if (e && "none" !== e && d.plugins.autoloader) {
          var s = "md-" + (new Date()).valueOf() + "-" +
            Math.floor(1e16 * Math.random());
          n.attributes.id = s,
            d.plugins.autoloader.loadLanguages(e, function () {
              var n = document.getElementById(s);
              n &&
                (n.innerHTML = d.highlight(n.textContent, d.languages[e], e));
            });
        }
      }
    }),
    d.languages.md = d.languages.markdown;
}(Prism);
Prism.languages.matlab = {
  comment: [/%\{[\s\S]*?\}%/, /%.+/],
  string: { pattern: /\B'(?:''|[^'\r\n])*'/, greedy: !0 },
  number: /(?:\b\d+\.?\d*|\B\.\d+)(?:[eE][+-]?\d+)?(?:[ij])?|\b[ij]\b/,
  keyword:
    /\b(?:break|case|catch|continue|else|elseif|end|for|function|if|inf|NaN|otherwise|parfor|pause|pi|return|switch|try|while)\b/,
  function: /(?!\d)\w+(?=\s*\()/,
  operator: /\.?[*^\/\\']|[+\-:@]|[<>=~]=?|&&?|\|\|?/,
  punctuation: /\.{3}|[.,;\[\](){}!]/,
};
Prism.languages.nginx = Prism.languages.extend(
  "clike",
  {
    comment: { pattern: /(^|[^"{\\])#.*/, lookbehind: !0 },
    keyword:
      /\b(?:CONTENT_|DOCUMENT_|GATEWAY_|HTTP_|HTTPS|if_not_empty|PATH_|QUERY_|REDIRECT_|REMOTE_|REQUEST_|SCGI|SCRIPT_|SERVER_|http|events|accept_mutex|accept_mutex_delay|access_log|add_after_body|add_before_body|add_header|addition_types|aio|alias|allow|ancient_browser|ancient_browser_value|auth|auth_basic|auth_basic_user_file|auth_http|auth_http_header|auth_http_timeout|autoindex|autoindex_exact_size|autoindex_localtime|break|charset|charset_map|charset_types|chunked_transfer_encoding|client_body_buffer_size|client_body_in_file_only|client_body_in_single_buffer|client_body_temp_path|client_body_timeout|client_header_buffer_size|client_header_timeout|client_max_body_size|connection_pool_size|create_full_put_path|daemon|dav_access|dav_methods|debug_connection|debug_points|default_type|deny|devpoll_changes|devpoll_events|directio|directio_alignment|disable_symlinks|empty_gif|env|epoll_events|error_log|error_page|expires|fastcgi_buffer_size|fastcgi_buffers|fastcgi_busy_buffers_size|fastcgi_cache|fastcgi_cache_bypass|fastcgi_cache_key|fastcgi_cache_lock|fastcgi_cache_lock_timeout|fastcgi_cache_methods|fastcgi_cache_min_uses|fastcgi_cache_path|fastcgi_cache_purge|fastcgi_cache_use_stale|fastcgi_cache_valid|fastcgi_connect_timeout|fastcgi_hide_header|fastcgi_ignore_client_abort|fastcgi_ignore_headers|fastcgi_index|fastcgi_intercept_errors|fastcgi_keep_conn|fastcgi_max_temp_file_size|fastcgi_next_upstream|fastcgi_no_cache|fastcgi_param|fastcgi_pass|fastcgi_pass_header|fastcgi_read_timeout|fastcgi_redirect_errors|fastcgi_send_timeout|fastcgi_split_path_info|fastcgi_store|fastcgi_store_access|fastcgi_temp_file_write_size|fastcgi_temp_path|flv|geo|geoip_city|geoip_country|google_perftools_profiles|gzip|gzip_buffers|gzip_comp_level|gzip_disable|gzip_http_version|gzip_min_length|gzip_proxied|gzip_static|gzip_types|gzip_vary|if|if_modified_since|ignore_invalid_headers|image_filter|image_filter_buffer|image_filter_jpeg_quality|image_filter_sharpen|image_filter_transparency|imap_capabilities|imap_client_buffer|include|index|internal|ip_hash|keepalive|keepalive_disable|keepalive_requests|keepalive_timeout|kqueue_changes|kqueue_events|large_client_header_buffers|limit_conn|limit_conn_log_level|limit_conn_zone|limit_except|limit_rate|limit_rate_after|limit_req|limit_req_log_level|limit_req_zone|limit_zone|lingering_close|lingering_time|lingering_timeout|listen|location|lock_file|log_format|log_format_combined|log_not_found|log_subrequest|map|map_hash_bucket_size|map_hash_max_size|master_process|max_ranges|memcached_buffer_size|memcached_connect_timeout|memcached_next_upstream|memcached_pass|memcached_read_timeout|memcached_send_timeout|merge_slashes|min_delete_depth|modern_browser|modern_browser_value|mp4|mp4_buffer_size|mp4_max_buffer_size|msie_padding|msie_refresh|multi_accept|open_file_cache|open_file_cache_errors|open_file_cache_min_uses|open_file_cache_valid|open_log_file_cache|optimize_server_names|override_charset|pcre_jit|perl|perl_modules|perl_require|perl_set|pid|pop3_auth|pop3_capabilities|port_in_redirect|post_action|postpone_output|protocol|proxy|proxy_buffer|proxy_buffer_size|proxy_buffering|proxy_buffers|proxy_busy_buffers_size|proxy_cache|proxy_cache_bypass|proxy_cache_key|proxy_cache_lock|proxy_cache_lock_timeout|proxy_cache_methods|proxy_cache_min_uses|proxy_cache_path|proxy_cache_use_stale|proxy_cache_valid|proxy_connect_timeout|proxy_cookie_domain|proxy_cookie_path|proxy_headers_hash_bucket_size|proxy_headers_hash_max_size|proxy_hide_header|proxy_http_version|proxy_ignore_client_abort|proxy_ignore_headers|proxy_intercept_errors|proxy_max_temp_file_size|proxy_method|proxy_next_upstream|proxy_no_cache|proxy_pass|proxy_pass_error_message|proxy_pass_header|proxy_pass_request_body|proxy_pass_request_headers|proxy_read_timeout|proxy_redirect|proxy_redirect_errors|proxy_send_lowat|proxy_send_timeout|proxy_set_body|proxy_set_header|proxy_ssl_session_reuse|proxy_store|proxy_store_access|proxy_temp_file_write_size|proxy_temp_path|proxy_timeout|proxy_upstream_fail_timeout|proxy_upstream_max_fails|random_index|read_ahead|real_ip_header|recursive_error_pages|request_pool_size|reset_timedout_connection|resolver|resolver_timeout|return|rewrite|root|rtsig_overflow_events|rtsig_overflow_test|rtsig_overflow_threshold|rtsig_signo|satisfy|satisfy_any|secure_link_secret|send_lowat|send_timeout|sendfile|sendfile_max_chunk|server|server_name|server_name_in_redirect|server_names_hash_bucket_size|server_names_hash_max_size|server_tokens|set|set_real_ip_from|smtp_auth|smtp_capabilities|so_keepalive|source_charset|split_clients|ssi|ssi_silent_errors|ssi_types|ssi_value_length|ssl|ssl_certificate|ssl_certificate_key|ssl_ciphers|ssl_client_certificate|ssl_crl|ssl_dhparam|ssl_engine|ssl_prefer_server_ciphers|ssl_protocols|ssl_session_cache|ssl_session_timeout|ssl_verify_client|ssl_verify_depth|starttls|stub_status|sub_filter|sub_filter_once|sub_filter_types|tcp_nodelay|tcp_nopush|timeout|timer_resolution|try_files|types|types_hash_bucket_size|types_hash_max_size|underscores_in_headers|uninitialized_variable_warn|upstream|use|user|userid|userid_domain|userid_expires|userid_name|userid_p3p|userid_path|userid_service|valid_referers|variables_hash_bucket_size|variables_hash_max_size|worker_connections|worker_cpu_affinity|worker_priority|worker_processes|worker_rlimit_core|worker_rlimit_nofile|worker_rlimit_sigpending|working_directory|xclient|xml_entities|xslt_entities|xslt_stylesheet|xslt_types|ssl_session_tickets|ssl_stapling|ssl_stapling_verify|ssl_ecdh_curve|ssl_trusted_certificate|more_set_headers|ssl_early_data)\b/i,
  },
), Prism.languages.insertBefore("nginx", "keyword", { variable: /\$[a-z_]+/i });
Prism.languages.objectivec = Prism.languages.extend(
  "c",
  {
    keyword:
      /\b(?:asm|typeof|inline|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|union|unsigned|void|volatile|while|in|self|super)\b|(?:@interface|@end|@implementation|@protocol|@class|@public|@protected|@private|@property|@try|@catch|@finally|@throw|@synthesize|@dynamic|@selector)\b/,
    string:
      /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1|@"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"/,
    operator: /-[->]?|\+\+?|!=?|<<?=?|>>?=?|==?|&&?|\|\|?|[~^%?*\/@]/,
  },
),
  delete Prism.languages.objectivec["class-name"],
  Prism.languages.objc = Prism.languages.objectivec;
Prism.languages.ocaml = {
  comment: /\(\*[\s\S]*?\*\)/,
  string: [
    { pattern: /"(?:\\.|[^\\\r\n"])*"/, greedy: !0 },
    {
      pattern: /(['`])(?:\\(?:\d+|x[\da-f]+|.)|(?!\1)[^\\\r\n])\1/i,
      greedy: !0,
    },
  ],
  number:
    /\b(?:0x[\da-f][\da-f_]+|(?:0[bo])?\d[\d_]*\.?[\d_]*(?:e[+-]?[\d_]+)?)/i,
  directive: { pattern: /\B#\w+/, alias: "important" },
  label: { pattern: /\B~\w+/, alias: "function" },
  type_variable: { pattern: /\B'\w+/, alias: "function" },
  variant: { pattern: /`\w+/, alias: "variable" },
  module: { pattern: /\b[A-Z]\w+/, alias: "variable" },
  keyword:
    /\b(?:as|assert|begin|class|constraint|do|done|downto|else|end|exception|external|for|fun|function|functor|if|in|include|inherit|initializer|lazy|let|match|method|module|mutable|new|nonrec|object|of|open|private|rec|sig|struct|then|to|try|type|val|value|virtual|when|where|while|with)\b/,
  boolean: /\b(?:false|true)\b/,
  operator:
    /:=|[=<>@^|&+\-*\/$%!?~][!$%&*+\-.\/:<=>?@^|~]*|\b(?:and|asr|land|lor|lsl|lsr|lxor|mod|or)\b/,
  punctuation: /[(){}\[\]|.,:;]|\b_\b/,
};
Prism.languages.perl = {
  comment: [
    { pattern: /(^\s*)=\w+[\s\S]*?=cut.*/m, lookbehind: !0 },
    { pattern: /(^|[^\\$])#.*/, lookbehind: !0 },
  ],
  string: [
    {
      pattern:
        /\b(?:q|qq|qx|qw)\s*([^a-zA-Z0-9\s{(\[<])(?:(?!\1)[^\\]|\\[\s\S])*\1/,
      greedy: !0,
    },
    {
      pattern: /\b(?:q|qq|qx|qw)\s+([a-zA-Z0-9])(?:(?!\1)[^\\]|\\[\s\S])*\1/,
      greedy: !0,
    },
    { pattern: /\b(?:q|qq|qx|qw)\s*\((?:[^()\\]|\\[\s\S])*\)/, greedy: !0 },
    { pattern: /\b(?:q|qq|qx|qw)\s*\{(?:[^{}\\]|\\[\s\S])*\}/, greedy: !0 },
    { pattern: /\b(?:q|qq|qx|qw)\s*\[(?:[^[\]\\]|\\[\s\S])*\]/, greedy: !0 },
    { pattern: /\b(?:q|qq|qx|qw)\s*<(?:[^<>\\]|\\[\s\S])*>/, greedy: !0 },
    { pattern: /("|`)(?:(?!\1)[^\\]|\\[\s\S])*\1/, greedy: !0 },
    { pattern: /'(?:[^'\\\r\n]|\\.)*'/, greedy: !0 },
  ],
  regex: [
    {
      pattern:
        /\b(?:m|qr)\s*([^a-zA-Z0-9\s{(\[<])(?:(?!\1)[^\\]|\\[\s\S])*\1[msixpodualngc]*/,
      greedy: !0,
    },
    {
      pattern:
        /\b(?:m|qr)\s+([a-zA-Z0-9])(?:(?!\1)[^\\]|\\[\s\S])*\1[msixpodualngc]*/,
      greedy: !0,
    },
    {
      pattern: /\b(?:m|qr)\s*\((?:[^()\\]|\\[\s\S])*\)[msixpodualngc]*/,
      greedy: !0,
    },
    {
      pattern: /\b(?:m|qr)\s*\{(?:[^{}\\]|\\[\s\S])*\}[msixpodualngc]*/,
      greedy: !0,
    },
    {
      pattern: /\b(?:m|qr)\s*\[(?:[^[\]\\]|\\[\s\S])*\][msixpodualngc]*/,
      greedy: !0,
    },
    {
      pattern: /\b(?:m|qr)\s*<(?:[^<>\\]|\\[\s\S])*>[msixpodualngc]*/,
      greedy: !0,
    },
    {
      pattern:
        /(^|[^-]\b)(?:s|tr|y)\s*([^a-zA-Z0-9\s{(\[<])(?:(?!\2)[^\\]|\\[\s\S])*\2(?:(?!\2)[^\\]|\\[\s\S])*\2[msixpodualngcer]*/,
      lookbehind: !0,
      greedy: !0,
    },
    {
      pattern:
        /(^|[^-]\b)(?:s|tr|y)\s+([a-zA-Z0-9])(?:(?!\2)[^\\]|\\[\s\S])*\2(?:(?!\2)[^\\]|\\[\s\S])*\2[msixpodualngcer]*/,
      lookbehind: !0,
      greedy: !0,
    },
    {
      pattern:
        /(^|[^-]\b)(?:s|tr|y)\s*\((?:[^()\\]|\\[\s\S])*\)\s*\((?:[^()\\]|\\[\s\S])*\)[msixpodualngcer]*/,
      lookbehind: !0,
      greedy: !0,
    },
    {
      pattern:
        /(^|[^-]\b)(?:s|tr|y)\s*\{(?:[^{}\\]|\\[\s\S])*\}\s*\{(?:[^{}\\]|\\[\s\S])*\}[msixpodualngcer]*/,
      lookbehind: !0,
      greedy: !0,
    },
    {
      pattern:
        /(^|[^-]\b)(?:s|tr|y)\s*\[(?:[^[\]\\]|\\[\s\S])*\]\s*\[(?:[^[\]\\]|\\[\s\S])*\][msixpodualngcer]*/,
      lookbehind: !0,
      greedy: !0,
    },
    {
      pattern:
        /(^|[^-]\b)(?:s|tr|y)\s*<(?:[^<>\\]|\\[\s\S])*>\s*<(?:[^<>\\]|\\[\s\S])*>[msixpodualngcer]*/,
      lookbehind: !0,
      greedy: !0,
    },
    {
      pattern:
        /\/(?:[^\/\\\r\n]|\\.)*\/[msixpodualngc]*(?=\s*(?:$|[\r\n,.;})&|\-+*~<>!?^]|(?:lt|gt|le|ge|eq|ne|cmp|not|and|or|xor|x)\b))/,
      greedy: !0,
    },
  ],
  variable: [
    /[&*$@%]\{\^[A-Z]+\}/,
    /[&*$@%]\^[A-Z_]/,
    /[&*$@%]#?(?=\{)/,
    /[&*$@%]#?(?:(?:::)*'?(?!\d)[\w$]+)+(?:::)*/i,
    /[&*$@%]\d+/,
    /(?!%=)[$@%][!"#$%&'()*+,\-.\/:;<=>?@[\\\]^_`{|}~]/,
  ],
  filehandle: { pattern: /<(?![<=])\S*>|\b_\b/, alias: "symbol" },
  vstring: { pattern: /v\d+(?:\.\d+)*|\d+(?:\.\d+){2,}/, alias: "string" },
  function: { pattern: /sub [a-z0-9_]+/i, inside: { keyword: /sub/ } },
  keyword:
    /\b(?:any|break|continue|default|delete|die|do|else|elsif|eval|for|foreach|given|goto|if|last|local|my|next|our|package|print|redo|require|return|say|state|sub|switch|undef|unless|until|use|when|while)\b/,
  number:
    /\b(?:0x[\dA-Fa-f](?:_?[\dA-Fa-f])*|0b[01](?:_?[01])*|(?:\d(?:_?\d)*)?\.?\d(?:_?\d)*(?:[Ee][+-]?\d+)?)\b/,
  operator:
    /-[rwxoRWXOezsfdlpSbctugkTBMAC]\b|\+[+=]?|-[-=>]?|\*\*?=?|\/\/?=?|=[=~>]?|~[~=]?|\|\|?=?|&&?=?|<(?:=>?|<=?)?|>>?=?|![~=]?|[%^]=?|\.(?:=|\.\.?)?|[\\?]|\bx(?:=|\b)|\b(?:lt|gt|le|ge|eq|ne|cmp|not|and|or|xor)\b/,
  punctuation: /[{}[\];(),:]/,
};
!function (a) {
  var e = "(?:\\b[a-zA-Z]\\w*|[|\\\\[\\]])+";
  a.languages.phpdoc = a.languages.extend(
    "javadoclike",
    {
      parameter: {
        pattern: RegExp(
          "(@(?:global|param|property(?:-read|-write)?|var)\\s+(?:" + e +
            "\\s+)?)\\$\\w+",
        ),
        lookbehind: !0,
      },
    },
  ),
    a.languages.insertBefore(
      "phpdoc",
      "keyword",
      {
        "class-name": [
          {
            pattern: RegExp(
              "(@(?:global|package|param|property(?:-read|-write)?|return|subpackage|throws|var)\\s+)" +
                e,
            ),
            lookbehind: !0,
            inside: {
              keyword:
                /\b(?:callback|resource|boolean|integer|double|object|string|array|false|float|mixed|bool|null|self|true|void|int)\b/,
              punctuation: /[|\\[\]()]/,
            },
          },
        ],
      },
    ),
    a.languages.javadoclike.addSupport("php", a.languages.phpdoc);
}(Prism);
Prism.languages.insertBefore(
  "php",
  "variable",
  {
    this: /\$this\b/,
    global:
      /\$(?:_(?:SERVER|GET|POST|FILES|REQUEST|SESSION|ENV|COOKIE)|GLOBALS|HTTP_RAW_POST_DATA|argc|argv|php_errormsg|http_response_header)\b/,
    scope: {
      pattern: /\b[\w\\]+::/,
      inside: { keyword: /static|self|parent/, punctuation: /::|\\/ },
    },
  },
);
!function (e) {
  var i = Prism.languages.powershell = {
      comment: [
        { pattern: /(^|[^`])<#[\s\S]*?#>/, lookbehind: !0 },
        { pattern: /(^|[^`])#.*/, lookbehind: !0 },
      ],
      string: [
        {
          pattern: /"(?:`[\s\S]|[^`"])*"/,
          greedy: !0,
          inside: {
            function: {
              pattern: /(^|[^`])\$\((?:\$\([^\r\n()]*\)|(?!\$\()[^\r\n)])*\)/,
              lookbehind: !0,
              inside: {},
            },
          },
        },
        { pattern: /'(?:[^']|'')*'/, greedy: !0 },
      ],
      namespace: /\[[a-z](?:\[(?:\[[^\]]*]|[^\[\]])*]|[^\[\]])*]/i,
      boolean: /\$(?:true|false)\b/i,
      variable: /\$\w+\b/,
      function: [
        /\b(?:Add|Approve|Assert|Backup|Block|Checkpoint|Clear|Close|Compare|Complete|Compress|Confirm|Connect|Convert|ConvertFrom|ConvertTo|Copy|Debug|Deny|Disable|Disconnect|Dismount|Edit|Enable|Enter|Exit|Expand|Export|Find|ForEach|Format|Get|Grant|Group|Hide|Import|Initialize|Install|Invoke|Join|Limit|Lock|Measure|Merge|Move|New|Open|Optimize|Out|Ping|Pop|Protect|Publish|Push|Read|Receive|Redo|Register|Remove|Rename|Repair|Request|Reset|Resize|Resolve|Restart|Restore|Resume|Revoke|Save|Search|Select|Send|Set|Show|Skip|Sort|Split|Start|Step|Stop|Submit|Suspend|Switch|Sync|Tee|Test|Trace|Unblock|Undo|Uninstall|Unlock|Unprotect|Unpublish|Unregister|Update|Use|Wait|Watch|Where|Write)-[a-z]+\b/i,
        /\b(?:ac|cat|chdir|clc|cli|clp|clv|compare|copy|cp|cpi|cpp|cvpa|dbp|del|diff|dir|ebp|echo|epal|epcsv|epsn|erase|fc|fl|ft|fw|gal|gbp|gc|gci|gcs|gdr|gi|gl|gm|gp|gps|group|gsv|gu|gv|gwmi|iex|ii|ipal|ipcsv|ipsn|irm|iwmi|iwr|kill|lp|ls|measure|mi|mount|move|mp|mv|nal|ndr|ni|nv|ogv|popd|ps|pushd|pwd|rbp|rd|rdr|ren|ri|rm|rmdir|rni|rnp|rp|rv|rvpa|rwmi|sal|saps|sasv|sbp|sc|select|set|shcm|si|sl|sleep|sls|sort|sp|spps|spsv|start|sv|swmi|tee|trcm|type|write)\b/i,
      ],
      keyword:
        /\b(?:Begin|Break|Catch|Class|Continue|Data|Define|Do|DynamicParam|Else|ElseIf|End|Exit|Filter|Finally|For|ForEach|From|Function|If|InlineScript|Parallel|Param|Process|Return|Sequence|Switch|Throw|Trap|Try|Until|Using|Var|While|Workflow)\b/i,
      operator: {
        pattern:
          /(\W?)(?:!|-(?:eq|ne|gt|ge|lt|le|sh[lr]|not|b?(?:and|x?or)|(?:Not)?(?:Like|Match|Contains|In)|Replace|Join|is(?:Not)?|as)\b|-[-=]?|\+[+=]?|[*\/%]=?)/i,
        lookbehind: !0,
      },
      punctuation: /[|{}[\];(),.]/,
    },
    r = i.string[0].inside;
  r.boolean = i.boolean, r.variable = i.variable, r.function.inside = i;
}();
Prism.languages.python = {
  comment: { pattern: /(^|[^\\])#.*/, lookbehind: !0 },
  "string-interpolation": {
    pattern:
      /(?:f|rf|fr)(?:("""|''')[\s\S]*?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2)/i,
    greedy: !0,
    inside: {
      interpolation: {
        pattern:
          /((?:^|[^{])(?:{{)*){(?!{)(?:[^{}]|{(?!{)(?:[^{}]|{(?!{)(?:[^{}])+})+})+}/,
        lookbehind: !0,
        inside: {
          "format-spec": { pattern: /(:)[^:(){}]+(?=}$)/, lookbehind: !0 },
          "conversion-option": {
            pattern: /![sra](?=[:}]$)/,
            alias: "punctuation",
          },
          rest: null,
        },
      },
      string: /[\s\S]+/,
    },
  },
  "triple-quoted-string": {
    pattern: /(?:[rub]|rb|br)?("""|''')[\s\S]*?\1/i,
    greedy: !0,
    alias: "string",
  },
  string: {
    pattern: /(?:[rub]|rb|br)?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i,
    greedy: !0,
  },
  function: {
    pattern: /((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g,
    lookbehind: !0,
  },
  "class-name": { pattern: /(\bclass\s+)\w+/i, lookbehind: !0 },
  decorator: {
    pattern: /(^\s*)@\w+(?:\.\w+)*/im,
    lookbehind: !0,
    alias: ["annotation", "punctuation"],
    inside: { punctuation: /\./ },
  },
  keyword:
    /\b(?:and|as|assert|async|await|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/,
  builtin:
    /\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,
  boolean: /\b(?:True|False|None)\b/,
  number:
    /(?:\b(?=\d)|\B(?=\.))(?:0[bo])?(?:(?:\d|0x[\da-f])[\da-f]*\.?\d*|\.\d+)(?:e[+-]?\d+)?j?\b/i,
  operator: /[-+%=]=?|!=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,
  punctuation: /[{}[\];(),.:]/,
},
  Prism.languages.python["string-interpolation"].inside.interpolation.inside
    .rest = Prism.languages.python,
  Prism.languages.py = Prism.languages.python;
!function (i) {
  var t = i.util.clone(i.languages.javascript);
  i.languages.jsx = i.languages.extend("markup", t),
    i.languages.jsx.tag.pattern =
      /<\/?(?:[\w.:-]+\s*(?:\s+(?:[\w.:$-]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s{'">=]+|\{(?:\{(?:\{[^{}]*\}|[^{}])*\}|[^{}])+\}))?|\{\s*\.{3}\s*[a-z_$][\w$]*(?:\.[a-z_$][\w$]*)*\s*\}))*\s*\/?)?>/i,
    i.languages.jsx.tag.inside.tag.pattern = /^<\/?[^\s>\/]*/i,
    i.languages.jsx.tag.inside["attr-value"].pattern =
      /=(?!\{)(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">]+)/i,
    i.languages.jsx.tag.inside.tag.inside["class-name"] =
      /^[A-Z]\w*(?:\.[A-Z]\w*)*$/,
    i.languages.insertBefore(
      "inside",
      "attr-name",
      {
        spread: {
          pattern: /\{\s*\.{3}\s*[a-z_$][\w$]*(?:\.[a-z_$][\w$]*)*\s*\}/,
          inside: { punctuation: /\.{3}|[{}.]/, "attr-value": /\w+/ },
        },
      },
      i.languages.jsx.tag,
    ),
    i.languages.insertBefore(
      "inside",
      "attr-value",
      {
        script: {
          pattern: /=(?:\{(?:\{(?:\{[^{}]*\}|[^{}])*\}|[^{}])+\})/i,
          inside: {
            "script-punctuation": { pattern: /^=(?={)/, alias: "punctuation" },
            rest: i.languages.jsx,
          },
          alias: "language-javascript",
        },
      },
      i.languages.jsx.tag,
    );
  var o = function (t) {
      return t
        ? "string" == typeof t
          ? t
          : "string" == typeof t.content
          ? t.content
          : t.content.map(o).join("")
        : "";
    },
    p = function (t) {
      for (var n = [], e = 0; e < t.length; e++) {
        var a = t[e], s = !1;
        if (
          "string" != typeof a &&
          ("tag" === a.type && a.content[0] && "tag" === a.content[0].type
            ? "</" === a.content[0].content[0].content
              ? 0 < n.length &&
                n[n.length - 1].tagName === o(a.content[0].content[1]) &&
                n.pop()
              : "/>" === a.content[a.content.length - 1].content ||
                n.push({ tagName: o(a.content[0].content[1]), openedBraces: 0 })
            : 0 < n.length && "punctuation" === a.type && "{" === a.content
            ? n[n.length - 1].openedBraces++
            : 0 < n.length && 0 < n[n.length - 1].openedBraces &&
                "punctuation" === a.type && "}" === a.content
            ? n[n.length - 1].openedBraces--
            : s = !0),
            (s || "string" == typeof a) && 0 < n.length &&
            0 === n[n.length - 1].openedBraces
        ) {
          var g = o(a);
          e < t.length - 1 &&
          ("string" == typeof t[e + 1] || "plain-text" === t[e + 1].type) &&
          (g += o(t[e + 1]), t.splice(e + 1, 1)),
            0 < e &&
            ("string" == typeof t[e - 1] || "plain-text" === t[e - 1].type) &&
            (g = o(t[e - 1]) + g, t.splice(e - 1, 1), e--),
            t[e] = new i.Token("plain-text", g, null, g);
        }
        a.content && "string" != typeof a.content && p(a.content);
      }
    };
  i.hooks.add("after-tokenize", function (t) {
    "jsx" !== t.language && "tsx" !== t.language || p(t.tokens);
  });
}(Prism);
var typescript = Prism.util.clone(Prism.languages.typescript);
Prism.languages.tsx = Prism.languages.extend("jsx", typescript);
!function (e) {
  e.languages.ruby = e.languages.extend(
    "clike",
    {
      comment: [/#.*/, { pattern: /^=begin\s[\s\S]*?^=end/m, greedy: !0 }],
      "class-name": {
        pattern: /(\b(?:class)\s+|\bcatch\s+\()[\w.\\]+/i,
        lookbehind: !0,
        inside: { punctuation: /[.\\]/ },
      },
      keyword:
        /\b(?:alias|and|BEGIN|begin|break|case|class|def|define_method|defined|do|each|else|elsif|END|end|ensure|extend|for|if|in|include|module|new|next|nil|not|or|prepend|protected|private|public|raise|redo|require|rescue|retry|return|self|super|then|throw|undef|unless|until|when|while|yield)\b/,
    },
  );
  var n = {
    pattern: /#\{[^}]+\}/,
    inside: {
      delimiter: { pattern: /^#\{|\}$/, alias: "tag" },
      rest: e.languages.ruby,
    },
  };
  delete e.languages.ruby.function,
    e.languages.insertBefore(
      "ruby",
      "keyword",
      {
        regex: [
          {
            pattern: RegExp(
              "%r(?:" +
                [
                  "([^a-zA-Z0-9\\s{(\\[<])(?:(?!\\1)[^\\\\]|\\\\[^])*\\1[gim]{0,3}",
                  "\\((?:[^()\\\\]|\\\\[^])*\\)[gim]{0,3}",
                  "\\{(?:[^#{}\\\\]|#(?:\\{[^}]+\\})?|\\\\[^])*\\}[gim]{0,3}",
                  "\\[(?:[^\\[\\]\\\\]|\\\\[^])*\\][gim]{0,3}",
                  "<(?:[^<>\\\\]|\\\\[^])*>[gim]{0,3}",
                ].join("|") + ")",
            ),
            greedy: !0,
            inside: { interpolation: n },
          },
          {
            pattern:
              /(^|[^/])\/(?!\/)(?:\[[^\r\n\]]+\]|\\.|[^[/\\\r\n])+\/[gim]{0,3}(?=\s*(?:$|[\r\n,.;})]))/,
            lookbehind: !0,
            greedy: !0,
          },
        ],
        variable: /[@$]+[a-zA-Z_]\w*(?:[?!]|\b)/,
        symbol: { pattern: /(^|[^:]):[a-zA-Z_]\w*(?:[?!]|\b)/, lookbehind: !0 },
        "method-definition": {
          pattern: /(\bdef\s+)[\w.]+/,
          lookbehind: !0,
          inside: { function: /\w+$/, rest: e.languages.ruby },
        },
      },
    ),
    e.languages.insertBefore(
      "ruby",
      "number",
      {
        builtin:
          /\b(?:Array|Bignum|Binding|Class|Continuation|Dir|Exception|FalseClass|File|Stat|Fixnum|Float|Hash|Integer|IO|MatchData|Method|Module|NilClass|Numeric|Object|Proc|Range|Regexp|String|Struct|TMS|Symbol|ThreadGroup|Thread|Time|TrueClass)\b/,
        constant: /\b[A-Z]\w*(?:[?!]|\b)/,
      },
    ),
    e.languages.ruby.string = [
      {
        pattern: RegExp(
          "%[qQiIwWxs]?(?:" +
            [
              "([^a-zA-Z0-9\\s{(\\[<])(?:(?!\\1)[^\\\\]|\\\\[^])*\\1",
              "\\((?:[^()\\\\]|\\\\[^])*\\)",
              "\\{(?:[^#{}\\\\]|#(?:\\{[^}]+\\})?|\\\\[^])*\\}",
              "\\[(?:[^\\[\\]\\\\]|\\\\[^])*\\]",
              "<(?:[^<>\\\\]|\\\\[^])*>",
            ].join("|") + ")",
        ),
        greedy: !0,
        inside: { interpolation: n },
      },
      {
        pattern: /("|')(?:#\{[^}]+\}|\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
        greedy: !0,
        inside: { interpolation: n },
      },
    ],
    e.languages.rb = e.languages.ruby;
}(Prism);
!function (e) {
  for (
    var a = "/\\*(?:[^*/]|\\*(?!/)|/(?!\\*)|<self>)*\\*/", t = 0;
    t < 2;
    t++
  ) {
    a = a.replace(/<self>/g, function () {
      return a;
    });
  }
  a = a.replace(/<self>/g, function () {
    return "[^\\s\\S]";
  }),
    e.languages.rust = {
      comment: [
        { pattern: RegExp("(^|[^\\\\])" + a), lookbehind: !0, greedy: !0 },
        { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0, greedy: !0 },
      ],
      string: {
        pattern: /b?"(?:\\[\s\S]|[^\\"])*"|b?r(#*)"(?:[^"]|"(?!\1))*"\1/,
        greedy: !0,
      },
      char: {
        pattern:
          /b?'(?:\\(?:x[0-7][\da-fA-F]|u{(?:[\da-fA-F]_*){1,6}|.)|[^\\\r\n\t'])'/,
        greedy: !0,
        alias: "string",
      },
      attribute: {
        pattern: /#!?\[(?:[^\[\]"]|"(?:\\[\s\S]|[^\\"])*")*\]/,
        greedy: !0,
        alias: "attr-name",
        inside: { string: null },
      },
      "closure-params": {
        pattern: /([=(,:]\s*|\bmove\s*)\|[^|]*\||\|[^|]*\|(?=\s*(?:\{|->))/,
        lookbehind: !0,
        greedy: !0,
        inside: {
          "closure-punctuation": { pattern: /^\||\|$/, alias: "punctuation" },
          rest: null,
        },
      },
      "lifetime-annotation": { pattern: /'\w+/, alias: "symbol" },
      "fragment-specifier": {
        pattern: /(\$\w+:)[a-z]+/,
        lookbehind: !0,
        alias: "punctuation",
      },
      variable: /\$\w+/,
      "function-definition": {
        pattern: /(\bfn\s+)\w+/,
        lookbehind: !0,
        alias: "function",
      },
      "type-definition": {
        pattern: /(\b(?:enum|struct|union)\s+)\w+/,
        lookbehind: !0,
        alias: "class-name",
      },
      "module-declaration": [
        {
          pattern: /(\b(?:crate|mod)\s+)[a-z][a-z_\d]*/,
          lookbehind: !0,
          alias: "namespace",
        },
        {
          pattern:
            /(\b(?:crate|self|super)\s*)::\s*[a-z][a-z_\d]*\b(?:\s*::(?:\s*[a-z][a-z_\d]*\s*::)*)?/,
          lookbehind: !0,
          alias: "namespace",
          inside: { punctuation: /::/ },
        },
      ],
      keyword: [
        /\b(?:abstract|as|async|await|become|box|break|const|continue|crate|do|dyn|else|enum|extern|final|fn|for|if|impl|in|let|loop|macro|match|mod|move|mut|override|priv|pub|ref|return|self|Self|static|struct|super|trait|try|type|typeof|union|unsafe|unsized|use|virtual|where|while|yield)\b/,
        /\b(?:[ui](?:8|16|32|64|128|size)|f(?:32|64)|bool|char|str)\b/,
      ],
      function: /\b[a-z_]\w*(?=\s*(?:::\s*<|\())/,
      macro: { pattern: /\w+!/, alias: "property" },
      constant: /\b[A-Z_][A-Z_\d]+\b/,
      "class-name": /\b[A-Z]\w*\b/,
      namespace: {
        pattern: /(?:\b[a-z][a-z_\d]*\s*::\s*)*\b[a-z][a-z_\d]*\s*::(?!\s*<)/,
        inside: { punctuation: /::/ },
      },
      number:
        /\b(?:0x[\dA-Fa-f](?:_?[\dA-Fa-f])*|0o[0-7](?:_?[0-7])*|0b[01](?:_?[01])*|(?:\d(?:_?\d)*)?\.?\d(?:_?\d)*(?:[Ee][+-]?\d+)?)(?:_?(?:[iu](?:8|16|32|64|size)?|f32|f64))?\b/,
      boolean: /\b(?:false|true)\b/,
      punctuation: /->|\.\.=|\.{1,3}|::|[{}[\];(),:]/,
      operator: /[-+*\/%!^]=?|=[=>]?|&[&=]?|\|[|=]?|<<?=?|>>?=?|[@?]/,
    },
    e.languages.rust["closure-params"].inside.rest = e.languages.rust,
    e.languages.rust.attribute.inside.string = e.languages.rust.string;
}(Prism);
!function (e) {
  e.languages.sass = e.languages.extend(
    "css",
    {
      comment: {
        pattern: /^([ \t]*)\/[\/*].*(?:(?:\r?\n|\r)\1[ \t]+.+)*/m,
        lookbehind: !0,
      },
    },
  ),
    e.languages.insertBefore(
      "sass",
      "atrule",
      {
        "atrule-line": {
          pattern: /^(?:[ \t]*)[@+=].+/m,
          inside: { atrule: /(?:@[\w-]+|[+=])/m },
        },
      },
    ),
    delete e.languages.sass.atrule;
  var t = /\$[-\w]+|#\{\$[-\w]+\}/,
    a = [
      /[+*\/%]|[=!]=|<=?|>=?|\b(?:and|or|not)\b/,
      { pattern: /(\s+)-(?=\s)/, lookbehind: !0 },
    ];
  e.languages.insertBefore(
    "sass",
    "property",
    {
      "variable-line": {
        pattern: /^[ \t]*\$.+/m,
        inside: { punctuation: /:/, variable: t, operator: a },
      },
      "property-line": {
        pattern: /^[ \t]*(?:[^:\s]+ *:.*|:[^:\s]+.*)/m,
        inside: {
          property: [
            /[^:\s]+(?=\s*:)/,
            { pattern: /(:)[^:\s]+/, lookbehind: !0 },
          ],
          punctuation: /:/,
          variable: t,
          operator: a,
          important: e.languages.sass.important,
        },
      },
    },
  ),
    delete e.languages.sass.property,
    delete e.languages.sass.important,
    e.languages.insertBefore(
      "sass",
      "punctuation",
      {
        selector: {
          pattern:
            /([ \t]*)\S(?:,?[^,\r\n]+)*(?:,(?:\r?\n|\r)\1[ \t]+\S(?:,?[^,\r\n]+)*)*/,
          lookbehind: !0,
        },
      },
    );
}(Prism);
Prism.languages.scss = Prism.languages.extend(
  "css",
  {
    comment: {
      pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/,
      lookbehind: !0,
    },
    atrule: {
      pattern: /@[\w-]+(?:\([^()]+\)|[^(])*?(?=\s+[{;])/,
      inside: { rule: /@[\w-]+/ },
    },
    url: /(?:[-a-z]+-)?url(?=\()/i,
    selector: {
      pattern:
        /(?=\S)[^@;{}()]?(?:[^@;{}()]|#\{\$[-\w]+\})+(?=\s*\{(?:\}|\s|[^}]+[:{][^}]+))/m,
      inside: {
        parent: { pattern: /&/, alias: "important" },
        placeholder: /%[-\w]+/,
        variable: /\$[-\w]+|#\{\$[-\w]+\}/,
      },
    },
    property: {
      pattern: /(?:[\w-]|\$[-\w]+|#\{\$[-\w]+\})+(?=\s*:)/,
      inside: { variable: /\$[-\w]+|#\{\$[-\w]+\}/ },
    },
  },
),
  Prism.languages.insertBefore(
    "scss",
    "atrule",
    {
      keyword: [
        /@(?:if|else(?: if)?|for|each|while|import|extend|debug|warn|mixin|include|function|return|content)/i,
        { pattern: /( +)(?:from|through)(?= )/, lookbehind: !0 },
      ],
    },
  ),
  Prism.languages.insertBefore(
    "scss",
    "important",
    { variable: /\$[-\w]+|#\{\$[-\w]+\}/ },
  ),
  Prism.languages.insertBefore(
    "scss",
    "function",
    {
      placeholder: { pattern: /%[-\w]+/, alias: "selector" },
      statement: { pattern: /\B!(?:default|optional)\b/i, alias: "keyword" },
      boolean: /\b(?:true|false)\b/,
      null: { pattern: /\bnull\b/, alias: "keyword" },
      operator: {
        pattern: /(\s)(?:[-+*\/%]|[=!]=|<=?|>=?|and|or|not)(?=\s)/,
        lookbehind: !0,
      },
    },
  ),
  Prism.languages.scss.atrule.inside.rest = Prism.languages.scss;
!function (n) {
  var s = [
    "([\"'])(?:\\\\[^]|\\$\\([^)]+\\)|`[^`]+`|(?!\\1)[^\\\\])*\\1",
    "<<-?\\s*([\"']?)(\\w+)\\2\\s[^]*?[\r\n]\\3",
  ].join("|");
  n.languages["shell-session"] = {
    info: {
      pattern: /^[^\r\n$#*!]+(?=[$#])/m,
      alias: "punctuation",
      inside: {
        path: { pattern: /(:)[\s\S]+/, lookbehind: !0 },
        user: /^[^\s@:$#*!/\\]+@[^\s@:$#*!/\\]+(?=:|$)/,
        punctuation: /:/,
      },
    },
    command: {
      pattern: RegExp(
        "[$#](?:[^\\\\\r\n'\"<]|\\\\.|<<str>>)+".replace(
          /<<str>>/g,
          function () {
            return s;
          },
        ),
      ),
      greedy: !0,
      inside: {
        bash: {
          pattern: /(^[$#]\s*)[\s\S]+/,
          lookbehind: !0,
          alias: "language-bash",
          inside: n.languages.bash,
        },
        "shell-symbol": { pattern: /^[$#]/, alias: "important" },
      },
    },
    output: /.(?:.*(?:[\r\n]|.$))*/,
  };
}(Prism);
!function (e) {
  var n = { pattern: /(\b\d+)(?:%|[a-z]+)/, lookbehind: !0 },
    r = { pattern: /(^|[^\w.-])-?\d*\.?\d+/, lookbehind: !0 },
    i = {
      comment: {
        pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/,
        lookbehind: !0,
      },
      url: { pattern: /url\((["']?).*?\1\)/i, greedy: !0 },
      string: {
        pattern: /("|')(?:(?!\1)[^\\\r\n]|\\(?:\r\n|[\s\S]))*\1/,
        greedy: !0,
      },
      interpolation: null,
      func: null,
      important: /\B!(?:important|optional)\b/i,
      keyword: {
        pattern: /(^|\s+)(?:(?:if|else|for|return|unless)(?=\s+|$)|@[\w-]+)/,
        lookbehind: !0,
      },
      hexcode: /#[\da-f]{3,6}/i,
      color: [
        /\b(?:AliceBlue|AntiqueWhite|Aqua|Aquamarine|Azure|Beige|Bisque|Black|BlanchedAlmond|Blue|BlueViolet|Brown|BurlyWood|CadetBlue|Chartreuse|Chocolate|Coral|CornflowerBlue|Cornsilk|Crimson|Cyan|DarkBlue|DarkCyan|DarkGoldenRod|DarkGr[ae]y|DarkGreen|DarkKhaki|DarkMagenta|DarkOliveGreen|DarkOrange|DarkOrchid|DarkRed|DarkSalmon|DarkSeaGreen|DarkSlateBlue|DarkSlateGr[ae]y|DarkTurquoise|DarkViolet|DeepPink|DeepSkyBlue|DimGr[ae]y|DodgerBlue|FireBrick|FloralWhite|ForestGreen|Fuchsia|Gainsboro|GhostWhite|Gold|GoldenRod|Gr[ae]y|Green|GreenYellow|HoneyDew|HotPink|IndianRed|Indigo|Ivory|Khaki|Lavender|LavenderBlush|LawnGreen|LemonChiffon|LightBlue|LightCoral|LightCyan|LightGoldenRodYellow|LightGr[ae]y|LightGreen|LightPink|LightSalmon|LightSeaGreen|LightSkyBlue|LightSlateGr[ae]y|LightSteelBlue|LightYellow|Lime|LimeGreen|Linen|Magenta|Maroon|MediumAquaMarine|MediumBlue|MediumOrchid|MediumPurple|MediumSeaGreen|MediumSlateBlue|MediumSpringGreen|MediumTurquoise|MediumVioletRed|MidnightBlue|MintCream|MistyRose|Moccasin|NavajoWhite|Navy|OldLace|Olive|OliveDrab|Orange|OrangeRed|Orchid|PaleGoldenRod|PaleGreen|PaleTurquoise|PaleVioletRed|PapayaWhip|PeachPuff|Peru|Pink|Plum|PowderBlue|Purple|Red|RosyBrown|RoyalBlue|SaddleBrown|Salmon|SandyBrown|SeaGreen|SeaShell|Sienna|Silver|SkyBlue|SlateBlue|SlateGr[ae]y|Snow|SpringGreen|SteelBlue|Tan|Teal|Thistle|Tomato|Transparent|Turquoise|Violet|Wheat|White|WhiteSmoke|Yellow|YellowGreen)\b/i,
        {
          pattern:
            /\b(?:rgb|hsl)\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*\)\B|\b(?:rgb|hsl)a\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*,\s*(?:0|0?\.\d+|1)\s*\)\B/i,
          inside: {
            unit: n,
            number: r,
            function: /[\w-]+(?=\()/,
            punctuation: /[(),]/,
          },
        },
      ],
      entity: /\\[\da-f]{1,8}/i,
      unit: n,
      boolean: /\b(?:true|false)\b/,
      operator: [
        /~|[+!\/%<>?=]=?|[-:]=|\*[*=]?|\.{2,3}|&&|\|\||\B-\B|\b(?:and|in|is(?: a| defined| not|nt)?|not|or)\b/,
      ],
      number: r,
      punctuation: /[{}()\[\];:,]/,
    };
  i.interpolation = {
    pattern: /\{[^\r\n}:]+\}/,
    alias: "variable",
    inside: { delimiter: { pattern: /^{|}$/, alias: "punctuation" }, rest: i },
  },
    i.func = {
      pattern: /[\w-]+\([^)]*\).*/,
      inside: { function: /^[^(]+/, rest: i },
    },
    e.languages.stylus = {
      "atrule-declaration": {
        pattern: /(^\s*)@.+/m,
        lookbehind: !0,
        inside: { atrule: /^@[\w-]+/, rest: i },
      },
      "variable-declaration": {
        pattern: /(^[ \t]*)[\w$-]+\s*.?=[ \t]*(?:(?:\{[^}]*\}|.+)|$)/m,
        lookbehind: !0,
        inside: { variable: /^\S+/, rest: i },
      },
      statement: {
        pattern: /(^[ \t]*)(?:if|else|for|return|unless)[ \t]+.+/m,
        lookbehind: !0,
        inside: { keyword: /^\S+/, rest: i },
      },
      "property-declaration": {
        pattern:
          /((?:^|\{)([ \t]*))(?:[\w-]|\{[^}\r\n]+\})+(?:\s*:\s*|[ \t]+)[^{\r\n]*(?:;|[^{\r\n,](?=$)(?!(?:\r?\n|\r)(?:\{|\2[ \t]+)))/m,
        lookbehind: !0,
        inside: {
          property: {
            pattern: /^[^\s:]+/,
            inside: { interpolation: i.interpolation },
          },
          rest: i,
        },
      },
      selector: {
        pattern:
          /(^[ \t]*)(?:(?=\S)(?:[^{}\r\n:()]|::?[\w-]+(?:\([^)\r\n]*\))?|\{[^}\r\n]+\})+)(?:(?:\r?\n|\r)(?:\1(?:(?=\S)(?:[^{}\r\n:()]|::?[\w-]+(?:\([^)\r\n]*\))?|\{[^}\r\n]+\})+)))*(?:,$|\{|(?=(?:\r?\n|\r)(?:\{|\1[ \t]+)))/m,
        lookbehind: !0,
        inside: {
          interpolation: i.interpolation,
          comment: i.comment,
          punctuation: /[{},]/,
        },
      },
      func: i.func,
      string: i.string,
      comment: {
        pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/,
        lookbehind: !0,
        greedy: !0,
      },
      interpolation: i.interpolation,
      punctuation: /[{}()\[\];:.]/,
    };
}(Prism);
Prism.languages.swift = Prism.languages.extend(
  "clike",
  {
    string: {
      pattern:
        /("|')(?:\\(?:\((?:[^()]|\([^)]+\))+\)|\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
      greedy: !0,
      inside: {
        interpolation: {
          pattern: /\\\((?:[^()]|\([^)]+\))+\)/,
          inside: { delimiter: { pattern: /^\\\(|\)$/, alias: "variable" } },
        },
      },
    },
    keyword:
      /\b(?:as|associativity|break|case|catch|class|continue|convenience|default|defer|deinit|didSet|do|dynamic(?:Type)?|else|enum|extension|fallthrough|final|for|func|get|guard|if|import|in|infix|init|inout|internal|is|lazy|left|let|mutating|new|none|nonmutating|operator|optional|override|postfix|precedence|prefix|private|protocol|public|repeat|required|rethrows|return|right|safe|self|Self|set|static|struct|subscript|super|switch|throws?|try|Type|typealias|unowned|unsafe|var|weak|where|while|willSet|__(?:COLUMN__|FILE__|FUNCTION__|LINE__))\b/,
    number:
      /\b(?:[\d_]+(?:\.[\de_]+)?|0x[a-f0-9_]+(?:\.[a-f0-9p_]+)?|0b[01_]+|0o[0-7_]+)\b/i,
    constant: /\b(?:nil|[A-Z_]{2,}|k[A-Z][A-Za-z_]+)\b/,
    atrule:
      /@\b(?:IB(?:Outlet|Designable|Action|Inspectable)|class_protocol|exported|noreturn|NS(?:Copying|Managed)|objc|UIApplicationMain|auto_closure)\b/,
    builtin:
      /\b(?:[A-Z]\S+|abs|advance|alignof(?:Value)?|assert|contains|count(?:Elements)?|debugPrint(?:ln)?|distance|drop(?:First|Last)|dump|enumerate|equal|filter|find|first|getVaList|indices|isEmpty|join|last|lexicographicalCompare|map|max(?:Element)?|min(?:Element)?|numericCast|overlaps|partition|print(?:ln)?|reduce|reflect|reverse|sizeof(?:Value)?|sort(?:ed)?|split|startsWith|stride(?:of(?:Value)?)?|suffix|swap|toDebugString|toString|transcode|underestimateCount|unsafeBitCast|with(?:ExtendedLifetime|Unsafe(?:MutablePointers?|Pointers?)|VaList))\b/,
  },
),
  Prism.languages.swift.string.inside.interpolation.inside.rest =
    Prism.languages.swift;
!function (n) {
  function e(n, e) {
    return RegExp(
      n.replace(/<MOD>/g, function () {
        return "(?:\\([^|()\n]+\\)|\\[[^\\]\n]+\\]|\\{[^}\n]+\\})";
      }).replace(/<PAR>/g, function () {
        return "(?:\\)|\\((?![^|()\n]+\\)))";
      }),
      e || "",
    );
  }
  var i = {
      css: { pattern: /\{[^}]+\}/, inside: { rest: n.languages.css } },
      "class-id": {
        pattern: /(\()[^)]+(?=\))/,
        lookbehind: !0,
        alias: "attr-value",
      },
      lang: {
        pattern: /(\[)[^\]]+(?=\])/,
        lookbehind: !0,
        alias: "attr-value",
      },
      punctuation: /[\\\/]\d+|\S/,
    },
    t = n.languages.textile = n.languages.extend(
      "markup",
      {
        phrase: {
          pattern: /(^|\r|\n)\S[\s\S]*?(?=$|\r?\n\r?\n|\r\r)/,
          lookbehind: !0,
          inside: {
            "block-tag": {
              pattern: e("^[a-z]\\w*(?:<MOD>|<PAR>|[<>=])*\\."),
              inside: {
                modifier: {
                  pattern: e("(^[a-z]\\w*)(?:<MOD>|<PAR>|[<>=])+(?=\\.)"),
                  lookbehind: !0,
                  inside: i,
                },
                tag: /^[a-z]\w*/,
                punctuation: /\.$/,
              },
            },
            list: {
              pattern: e("^[*#]+<MOD>*\\s+.+", "m"),
              inside: {
                modifier: {
                  pattern: e("(^[*#]+)<MOD>+"),
                  lookbehind: !0,
                  inside: i,
                },
                punctuation: /^[*#]+/,
              },
            },
            table: {
              pattern: e(
                "^(?:(?:<MOD>|<PAR>|[<>=^~])+\\.\\s*)?(?:\\|(?:(?:<MOD>|<PAR>|[<>=^~_]|[\\\\/]\\d+)+\\.)?[^|]*)+\\|",
                "m",
              ),
              inside: {
                modifier: {
                  pattern: e(
                    "(^|\\|(?:\r?\n|\r)?)(?:<MOD>|<PAR>|[<>=^~_]|[\\\\/]\\d+)+(?=\\.)",
                  ),
                  lookbehind: !0,
                  inside: i,
                },
                punctuation: /\||^\./,
              },
            },
            inline: {
              pattern: e(
                "(^|[^a-zA-Z\\d])(\\*\\*|__|\\?\\?|[*_%@+\\-^~])<MOD>*.+?\\2(?![a-zA-Z\\d])",
              ),
              lookbehind: !0,
              inside: {
                bold: {
                  pattern: e("(^(\\*\\*?)<MOD>*).+?(?=\\2)"),
                  lookbehind: !0,
                },
                italic: {
                  pattern: e("(^(__?)<MOD>*).+?(?=\\2)"),
                  lookbehind: !0,
                },
                cite: {
                  pattern: e("(^\\?\\?<MOD>*).+?(?=\\?\\?)"),
                  lookbehind: !0,
                  alias: "string",
                },
                code: {
                  pattern: e("(^@<MOD>*).+?(?=@)"),
                  lookbehind: !0,
                  alias: "keyword",
                },
                inserted: {
                  pattern: e("(^\\+<MOD>*).+?(?=\\+)"),
                  lookbehind: !0,
                },
                deleted: { pattern: e("(^-<MOD>*).+?(?=-)"), lookbehind: !0 },
                span: { pattern: e("(^%<MOD>*).+?(?=%)"), lookbehind: !0 },
                modifier: {
                  pattern: e("(^\\*\\*|__|\\?\\?|[*_%@+\\-^~])<MOD>+"),
                  lookbehind: !0,
                  inside: i,
                },
                punctuation: /[*_%?@+\-^~]+/,
              },
            },
            "link-ref": {
              pattern: /^\[[^\]]+\]\S+$/m,
              inside: {
                string: { pattern: /(\[)[^\]]+(?=\])/, lookbehind: !0 },
                url: { pattern: /(\])\S+$/, lookbehind: !0 },
                punctuation: /[\[\]]/,
              },
            },
            link: {
              pattern: e('"<MOD>*[^"]+":.+?(?=[^\\w/]?(?:\\s|$))'),
              inside: {
                text: { pattern: e('(^"<MOD>*)[^"]+(?=")'), lookbehind: !0 },
                modifier: {
                  pattern: e('(^")<MOD>+'),
                  lookbehind: !0,
                  inside: i,
                },
                url: { pattern: /(:).+/, lookbehind: !0 },
                punctuation: /[":]/,
              },
            },
            image: {
              pattern: e(
                "!(?:<MOD>|<PAR>|[<>=])*[^!\\s()]+(?:\\([^)]+\\))?!(?::.+?(?=[^\\w/]?(?:\\s|$)))?",
              ),
              inside: {
                source: {
                  pattern: e(
                    "(^!(?:<MOD>|<PAR>|[<>=])*)[^!\\s()]+(?:\\([^)]+\\))?(?=!)",
                  ),
                  lookbehind: !0,
                  alias: "url",
                },
                modifier: {
                  pattern: e("(^!)(?:<MOD>|<PAR>|[<>=])+"),
                  lookbehind: !0,
                  inside: i,
                },
                url: { pattern: /(:).+/, lookbehind: !0 },
                punctuation: /[!:]/,
              },
            },
            footnote: {
              pattern: /\b\[\d+\]/,
              alias: "comment",
              inside: { punctuation: /\[|\]/ },
            },
            acronym: {
              pattern: /\b[A-Z\d]+\([^)]+\)/,
              inside: {
                comment: { pattern: /(\()[^)]+(?=\))/, lookbehind: !0 },
                punctuation: /[()]/,
              },
            },
            mark: {
              pattern: /\b\((?:TM|R|C)\)/,
              alias: "comment",
              inside: { punctuation: /[()]/ },
            },
          },
        },
      },
    ),
    a = t.phrase.inside,
    o = {
      inline: a.inline,
      link: a.link,
      image: a.image,
      footnote: a.footnote,
      acronym: a.acronym,
      mark: a.mark,
    };
  t.tag.pattern =
    /<\/?(?!\d)[a-z0-9]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+))?)*\s*\/?>/i;
  var r = a.inline.inside;
  r.bold.inside = o,
    r.italic.inside = o,
    r.inserted.inside = o,
    r.deleted.inside = o,
    r.span.inside = o;
  var d = a.table.inside;
  d.inline = o.inline,
    d.link = o.link,
    d.image = o.image,
    d.footnote = o.footnote,
    d.acronym = o.acronym,
    d.mark = o.mark;
}(Prism);
Prism.languages.vim = {
  string: /"(?:[^"\\\r\n]|\\.)*"|'(?:[^'\r\n]|'')*'/,
  comment: /".*/,
  function: /\w+(?=\()/,
  keyword:
    /\b(?:ab|abbreviate|abc|abclear|abo|aboveleft|al|all|arga|argadd|argd|argdelete|argdo|arge|argedit|argg|argglobal|argl|arglocal|ar|args|argu|argument|as|ascii|bad|badd|ba|ball|bd|bdelete|be|bel|belowright|bf|bfirst|bl|blast|bm|bmodified|bn|bnext|bN|bNext|bo|botright|bp|bprevious|brea|break|breaka|breakadd|breakd|breakdel|breakl|breaklist|br|brewind|bro|browse|bufdo|b|buffer|buffers|bun|bunload|bw|bwipeout|ca|cabbrev|cabc|cabclear|caddb|caddbuffer|cad|caddexpr|caddf|caddfile|cal|call|cat|catch|cb|cbuffer|cc|ccl|cclose|cd|ce|center|cex|cexpr|cf|cfile|cfir|cfirst|cgetb|cgetbuffer|cgete|cgetexpr|cg|cgetfile|c|change|changes|chd|chdir|che|checkpath|checkt|checktime|cla|clast|cl|clist|clo|close|cmapc|cmapclear|cnew|cnewer|cn|cnext|cN|cNext|cnf|cnfile|cNfcNfile|cnorea|cnoreabbrev|col|colder|colo|colorscheme|comc|comclear|comp|compiler|conf|confirm|con|continue|cope|copen|co|copy|cpf|cpfile|cp|cprevious|cq|cquit|cr|crewind|cuna|cunabbrev|cu|cunmap|cw|cwindow|debugg|debuggreedy|delc|delcommand|d|delete|delf|delfunction|delm|delmarks|diffg|diffget|diffoff|diffpatch|diffpu|diffput|diffsplit|diffthis|diffu|diffupdate|dig|digraphs|di|display|dj|djump|dl|dlist|dr|drop|ds|dsearch|dsp|dsplit|earlier|echoe|echoerr|echom|echomsg|echon|e|edit|el|else|elsei|elseif|em|emenu|endfo|endfor|endf|endfunction|endfun|en|endif|endt|endtry|endw|endwhile|ene|enew|ex|exi|exit|exu|exusage|f|file|files|filetype|fina|finally|fin|find|fini|finish|fir|first|fix|fixdel|fo|fold|foldc|foldclose|folddoc|folddoclosed|foldd|folddoopen|foldo|foldopen|for|fu|fun|function|go|goto|gr|grep|grepa|grepadd|ha|hardcopy|h|help|helpf|helpfind|helpg|helpgrep|helpt|helptags|hid|hide|his|history|ia|iabbrev|iabc|iabclear|if|ij|ijump|il|ilist|imapc|imapclear|in|inorea|inoreabbrev|isearch|isp|isplit|iuna|iunabbrev|iu|iunmap|j|join|ju|jumps|k|keepalt|keepj|keepjumps|kee|keepmarks|laddb|laddbuffer|lad|laddexpr|laddf|laddfile|lan|language|la|last|later|lb|lbuffer|lc|lcd|lch|lchdir|lcl|lclose|let|left|lefta|leftabove|lex|lexpr|lf|lfile|lfir|lfirst|lgetb|lgetbuffer|lgete|lgetexpr|lg|lgetfile|lgr|lgrep|lgrepa|lgrepadd|lh|lhelpgrep|l|list|ll|lla|llast|lli|llist|lmak|lmake|lm|lmap|lmapc|lmapclear|lnew|lnewer|lne|lnext|lN|lNext|lnf|lnfile|lNf|lNfile|ln|lnoremap|lo|loadview|loc|lockmarks|lockv|lockvar|lol|lolder|lop|lopen|lpf|lpfile|lp|lprevious|lr|lrewind|ls|lt|ltag|lu|lunmap|lv|lvimgrep|lvimgrepa|lvimgrepadd|lw|lwindow|mak|make|ma|mark|marks|mat|match|menut|menutranslate|mk|mkexrc|mks|mksession|mksp|mkspell|mkvie|mkview|mkv|mkvimrc|mod|mode|m|move|mzf|mzfile|mz|mzscheme|nbkey|new|n|next|N|Next|nmapc|nmapclear|noh|nohlsearch|norea|noreabbrev|nu|number|nun|nunmap|omapc|omapclear|on|only|o|open|opt|options|ou|ounmap|pc|pclose|ped|pedit|pe|perl|perld|perldo|po|pop|popu|popup|pp|ppop|pre|preserve|prev|previous|p|print|P|Print|profd|profdel|prof|profile|promptf|promptfind|promptr|promptrepl|ps|psearch|pta|ptag|ptf|ptfirst|ptj|ptjump|ptl|ptlast|ptn|ptnext|ptN|ptNext|ptp|ptprevious|ptr|ptrewind|pts|ptselect|pu|put|pw|pwd|pyf|pyfile|py|python|qa|qall|q|quit|quita|quitall|r|read|rec|recover|redi|redir|red|redo|redr|redraw|redraws|redrawstatus|reg|registers|res|resize|ret|retab|retu|return|rew|rewind|ri|right|rightb|rightbelow|rub|ruby|rubyd|rubydo|rubyf|rubyfile|ru|runtime|rv|rviminfo|sal|sall|san|sandbox|sa|sargument|sav|saveas|sba|sball|sbf|sbfirst|sbl|sblast|sbm|sbmodified|sbn|sbnext|sbN|sbNext|sbp|sbprevious|sbr|sbrewind|sb|sbuffer|scripte|scriptencoding|scrip|scriptnames|se|set|setf|setfiletype|setg|setglobal|setl|setlocal|sf|sfind|sfir|sfirst|sh|shell|sign|sil|silent|sim|simalt|sla|slast|sl|sleep|sm|smagic|smap|smapc|smapclear|sme|smenu|sn|snext|sN|sNext|sni|sniff|sno|snomagic|snor|snoremap|snoreme|snoremenu|sor|sort|so|source|spelld|spelldump|spe|spellgood|spelli|spellinfo|spellr|spellrepall|spellu|spellundo|spellw|spellwrong|sp|split|spr|sprevious|sre|srewind|sta|stag|startg|startgreplace|star|startinsert|startr|startreplace|stj|stjump|st|stop|stopi|stopinsert|sts|stselect|sun|sunhide|sunm|sunmap|sus|suspend|sv|sview|syncbind|t|tab|tabc|tabclose|tabd|tabdo|tabe|tabedit|tabf|tabfind|tabfir|tabfirst|tabl|tablast|tabm|tabmove|tabnew|tabn|tabnext|tabN|tabNext|tabo|tabonly|tabp|tabprevious|tabr|tabrewind|tabs|ta|tag|tags|tc|tcl|tcld|tcldo|tclf|tclfile|te|tearoff|tf|tfirst|th|throw|tj|tjump|tl|tlast|tm|tmenu|tn|tnext|tN|tNext|to|topleft|tp|tprevious|tr|trewind|try|ts|tselect|tu|tunmenu|una|unabbreviate|u|undo|undoj|undojoin|undol|undolist|unh|unhide|unlet|unlo|unlockvar|unm|unmap|up|update|verb|verbose|ve|version|vert|vertical|vie|view|vim|vimgrep|vimgrepa|vimgrepadd|vi|visual|viu|viusage|vmapc|vmapclear|vne|vnew|vs|vsplit|vu|vunmap|wa|wall|wh|while|winc|wincmd|windo|winp|winpos|win|winsize|wn|wnext|wN|wNext|wp|wprevious|wq|wqa|wqall|w|write|ws|wsverb|wv|wviminfo|X|xa|xall|x|xit|xm|xmap|xmapc|xmapclear|xme|xmenu|XMLent|XMLns|xn|xnoremap|xnoreme|xnoremenu|xu|xunmap|y|yank)\b/,
  builtin:
    /\b(?:autocmd|acd|ai|akm|aleph|allowrevins|altkeymap|ambiwidth|ambw|anti|antialias|arab|arabic|arabicshape|ari|arshape|autochdir|autoindent|autoread|autowrite|autowriteall|aw|awa|background|backspace|backup|backupcopy|backupdir|backupext|backupskip|balloondelay|ballooneval|balloonexpr|bdir|bdlay|beval|bex|bexpr|bg|bh|bin|binary|biosk|bioskey|bk|bkc|bomb|breakat|brk|browsedir|bs|bsdir|bsk|bt|bufhidden|buflisted|buftype|casemap|ccv|cdpath|cedit|cfu|ch|charconvert|ci|cin|cindent|cink|cinkeys|cino|cinoptions|cinw|cinwords|clipboard|cmdheight|cmdwinheight|cmp|cms|columns|com|comments|commentstring|compatible|complete|completefunc|completeopt|consk|conskey|copyindent|cot|cpo|cpoptions|cpt|cscopepathcomp|cscopeprg|cscopequickfix|cscopetag|cscopetagorder|cscopeverbose|cspc|csprg|csqf|cst|csto|csverb|cuc|cul|cursorcolumn|cursorline|cwh|debug|deco|def|define|delcombine|dex|dg|dict|dictionary|diff|diffexpr|diffopt|digraph|dip|dir|directory|dy|ea|ead|eadirection|eb|ed|edcompatible|ef|efm|ei|ek|enc|encoding|endofline|eol|ep|equalalways|equalprg|errorbells|errorfile|errorformat|esckeys|et|eventignore|expandtab|exrc|fcl|fcs|fdc|fde|fdi|fdl|fdls|fdm|fdn|fdo|fdt|fen|fenc|fencs|fex|ff|ffs|fileencoding|fileencodings|fileformat|fileformats|fillchars|fk|fkmap|flp|fml|fmr|foldcolumn|foldenable|foldexpr|foldignore|foldlevel|foldlevelstart|foldmarker|foldmethod|foldminlines|foldnestmax|foldtext|formatexpr|formatlistpat|formatoptions|formatprg|fp|fs|fsync|ft|gcr|gd|gdefault|gfm|gfn|gfs|gfw|ghr|gp|grepformat|grepprg|gtl|gtt|guicursor|guifont|guifontset|guifontwide|guiheadroom|guioptions|guipty|guitablabel|guitabtooltip|helpfile|helpheight|helplang|hf|hh|hi|hidden|highlight|hk|hkmap|hkmapp|hkp|hl|hlg|hls|hlsearch|ic|icon|iconstring|ignorecase|im|imactivatekey|imak|imc|imcmdline|imd|imdisable|imi|iminsert|ims|imsearch|inc|include|includeexpr|incsearch|inde|indentexpr|indentkeys|indk|inex|inf|infercase|insertmode|isf|isfname|isi|isident|isk|iskeyword|isprint|joinspaces|js|key|keymap|keymodel|keywordprg|km|kmp|kp|langmap|langmenu|laststatus|lazyredraw|lbr|lcs|linebreak|lines|linespace|lisp|lispwords|listchars|loadplugins|lpl|lsp|lz|macatsui|magic|makeef|makeprg|matchpairs|matchtime|maxcombine|maxfuncdepth|maxmapdepth|maxmem|maxmempattern|maxmemtot|mco|mef|menuitems|mfd|mh|mis|mkspellmem|ml|mls|mm|mmd|mmp|mmt|modeline|modelines|modifiable|modified|more|mouse|mousef|mousefocus|mousehide|mousem|mousemodel|mouses|mouseshape|mouset|mousetime|mp|mps|msm|mzq|mzquantum|nf|nrformats|numberwidth|nuw|odev|oft|ofu|omnifunc|opendevice|operatorfunc|opfunc|osfiletype|pa|para|paragraphs|paste|pastetoggle|patchexpr|patchmode|path|pdev|penc|pex|pexpr|pfn|ph|pheader|pi|pm|pmbcs|pmbfn|popt|preserveindent|previewheight|previewwindow|printdevice|printencoding|printexpr|printfont|printheader|printmbcharset|printmbfont|printoptions|prompt|pt|pumheight|pvh|pvw|qe|quoteescape|readonly|remap|report|restorescreen|revins|rightleft|rightleftcmd|rl|rlc|ro|rs|rtp|ruf|ruler|rulerformat|runtimepath|sbo|sc|scb|scr|scroll|scrollbind|scrolljump|scrolloff|scrollopt|scs|sect|sections|secure|sel|selection|selectmode|sessionoptions|sft|shcf|shellcmdflag|shellpipe|shellquote|shellredir|shellslash|shelltemp|shelltype|shellxquote|shiftround|shiftwidth|shm|shortmess|shortname|showbreak|showcmd|showfulltag|showmatch|showmode|showtabline|shq|si|sidescroll|sidescrolloff|siso|sj|slm|smartcase|smartindent|smarttab|smc|smd|softtabstop|sol|spc|spell|spellcapcheck|spellfile|spelllang|spellsuggest|spf|spl|splitbelow|splitright|sps|sr|srr|ss|ssl|ssop|stal|startofline|statusline|stl|stmp|su|sua|suffixes|suffixesadd|sw|swapfile|swapsync|swb|swf|switchbuf|sws|sxq|syn|synmaxcol|syntax|tabline|tabpagemax|tabstop|tagbsearch|taglength|tagrelative|tagstack|tal|tb|tbi|tbidi|tbis|tbs|tenc|term|termbidi|termencoding|terse|textauto|textmode|textwidth|tgst|thesaurus|tildeop|timeout|timeoutlen|title|titlelen|titleold|titlestring|toolbar|toolbariconsize|top|tpm|tsl|tsr|ttimeout|ttimeoutlen|ttm|tty|ttybuiltin|ttyfast|ttym|ttymouse|ttyscroll|ttytype|tw|tx|uc|ul|undolevels|updatecount|updatetime|ut|vb|vbs|vdir|verbosefile|vfile|viewdir|viewoptions|viminfo|virtualedit|visualbell|vop|wak|warn|wb|wc|wcm|wd|weirdinvert|wfh|wfw|whichwrap|wi|wig|wildchar|wildcharm|wildignore|wildmenu|wildmode|wildoptions|wim|winaltkeys|window|winfixheight|winfixwidth|winheight|winminheight|winminwidth|winwidth|wiv|wiw|wm|wmh|wmnu|wmw|wop|wrap|wrapmargin|wrapscan|writeany|writebackup|writedelay|ww|noacd|noai|noakm|noallowrevins|noaltkeymap|noanti|noantialias|noar|noarab|noarabic|noarabicshape|noari|noarshape|noautochdir|noautoindent|noautoread|noautowrite|noautowriteall|noaw|noawa|nobackup|noballooneval|nobeval|nobin|nobinary|nobiosk|nobioskey|nobk|nobl|nobomb|nobuflisted|nocf|noci|nocin|nocindent|nocompatible|noconfirm|noconsk|noconskey|nocopyindent|nocp|nocscopetag|nocscopeverbose|nocst|nocsverb|nocuc|nocul|nocursorcolumn|nocursorline|nodeco|nodelcombine|nodg|nodiff|nodigraph|nodisable|noea|noeb|noed|noedcompatible|noek|noendofline|noeol|noequalalways|noerrorbells|noesckeys|noet|noex|noexpandtab|noexrc|nofen|nofk|nofkmap|nofoldenable|nogd|nogdefault|noguipty|nohid|nohidden|nohk|nohkmap|nohkmapp|nohkp|nohls|noic|noicon|noignorecase|noim|noimc|noimcmdline|noimd|noincsearch|noinf|noinfercase|noinsertmode|nois|nojoinspaces|nojs|nolazyredraw|nolbr|nolinebreak|nolisp|nolist|noloadplugins|nolpl|nolz|noma|nomacatsui|nomagic|nomh|noml|nomod|nomodeline|nomodifiable|nomodified|nomore|nomousef|nomousefocus|nomousehide|nonu|nonumber|noodev|noopendevice|nopaste|nopi|nopreserveindent|nopreviewwindow|noprompt|nopvw|noreadonly|noremap|norestorescreen|norevins|nori|norightleft|norightleftcmd|norl|norlc|noro|nors|noru|noruler|nosb|nosc|noscb|noscrollbind|noscs|nosecure|nosft|noshellslash|noshelltemp|noshiftround|noshortname|noshowcmd|noshowfulltag|noshowmatch|noshowmode|nosi|nosm|nosmartcase|nosmartindent|nosmarttab|nosmd|nosn|nosol|nospell|nosplitbelow|nosplitright|nospr|nosr|nossl|nosta|nostartofline|nostmp|noswapfile|noswf|nota|notagbsearch|notagrelative|notagstack|notbi|notbidi|notbs|notermbidi|noterse|notextauto|notextmode|notf|notgst|notildeop|notimeout|notitle|noto|notop|notr|nottimeout|nottybuiltin|nottyfast|notx|novb|novisualbell|nowa|nowarn|nowb|noweirdinvert|nowfh|nowfw|nowildmenu|nowinfixheight|nowinfixwidth|nowiv|nowmnu|nowrap|nowrapscan|nowrite|nowriteany|nowritebackup|nows|invacd|invai|invakm|invallowrevins|invaltkeymap|invanti|invantialias|invar|invarab|invarabic|invarabicshape|invari|invarshape|invautochdir|invautoindent|invautoread|invautowrite|invautowriteall|invaw|invawa|invbackup|invballooneval|invbeval|invbin|invbinary|invbiosk|invbioskey|invbk|invbl|invbomb|invbuflisted|invcf|invci|invcin|invcindent|invcompatible|invconfirm|invconsk|invconskey|invcopyindent|invcp|invcscopetag|invcscopeverbose|invcst|invcsverb|invcuc|invcul|invcursorcolumn|invcursorline|invdeco|invdelcombine|invdg|invdiff|invdigraph|invdisable|invea|inveb|inved|invedcompatible|invek|invendofline|inveol|invequalalways|inverrorbells|invesckeys|invet|invex|invexpandtab|invexrc|invfen|invfk|invfkmap|invfoldenable|invgd|invgdefault|invguipty|invhid|invhidden|invhk|invhkmap|invhkmapp|invhkp|invhls|invhlsearch|invic|invicon|invignorecase|invim|invimc|invimcmdline|invimd|invincsearch|invinf|invinfercase|invinsertmode|invis|invjoinspaces|invjs|invlazyredraw|invlbr|invlinebreak|invlisp|invlist|invloadplugins|invlpl|invlz|invma|invmacatsui|invmagic|invmh|invml|invmod|invmodeline|invmodifiable|invmodified|invmore|invmousef|invmousefocus|invmousehide|invnu|invnumber|invodev|invopendevice|invpaste|invpi|invpreserveindent|invpreviewwindow|invprompt|invpvw|invreadonly|invremap|invrestorescreen|invrevins|invri|invrightleft|invrightleftcmd|invrl|invrlc|invro|invrs|invru|invruler|invsb|invsc|invscb|invscrollbind|invscs|invsecure|invsft|invshellslash|invshelltemp|invshiftround|invshortname|invshowcmd|invshowfulltag|invshowmatch|invshowmode|invsi|invsm|invsmartcase|invsmartindent|invsmarttab|invsmd|invsn|invsol|invspell|invsplitbelow|invsplitright|invspr|invsr|invssl|invsta|invstartofline|invstmp|invswapfile|invswf|invta|invtagbsearch|invtagrelative|invtagstack|invtbi|invtbidi|invtbs|invtermbidi|invterse|invtextauto|invtextmode|invtf|invtgst|invtildeop|invtimeout|invtitle|invto|invtop|invtr|invttimeout|invttybuiltin|invttyfast|invtx|invvb|invvisualbell|invwa|invwarn|invwb|invweirdinvert|invwfh|invwfw|invwildmenu|invwinfixheight|invwinfixwidth|invwiv|invwmnu|invwrap|invwrapscan|invwrite|invwriteany|invwritebackup|invws|t_AB|t_AF|t_al|t_AL|t_bc|t_cd|t_ce|t_Ce|t_cl|t_cm|t_Co|t_cs|t_Cs|t_CS|t_CV|t_da|t_db|t_dl|t_DL|t_EI|t_F1|t_F2|t_F3|t_F4|t_F5|t_F6|t_F7|t_F8|t_F9|t_fs|t_IE|t_IS|t_k1|t_K1|t_k2|t_k3|t_K3|t_k4|t_K4|t_k5|t_K5|t_k6|t_K6|t_k7|t_K7|t_k8|t_K8|t_k9|t_K9|t_KA|t_kb|t_kB|t_KB|t_KC|t_kd|t_kD|t_KD|t_ke|t_KE|t_KF|t_KG|t_kh|t_KH|t_kI|t_KI|t_KJ|t_KK|t_kl|t_KL|t_kN|t_kP|t_kr|t_ks|t_ku|t_le|t_mb|t_md|t_me|t_mr|t_ms|t_nd|t_op|t_RI|t_RV|t_Sb|t_se|t_Sf|t_SI|t_so|t_sr|t_te|t_ti|t_ts|t_ue|t_us|t_ut|t_vb|t_ve|t_vi|t_vs|t_WP|t_WS|t_xs|t_ZH|t_ZR)\b/,
  number: /\b(?:0x[\da-f]+|\d+(?:\.\d+)?)\b/i,
  operator:
    /\|\||&&|[-+.]=?|[=!](?:[=~][#?]?)?|[<>]=?[#?]?|[*\/%?]|\b(?:is(?:not)?)\b/,
  punctuation: /[{}[\](),;:]/,
};
Prism.languages["visual-basic"] = {
  comment: {
    pattern: /(?:['‘’]|REM\b)(?:[^\r\n_]|_(?:\r\n?|\n)?)*/i,
    inside: { keyword: /^REM/i },
  },
  directive: {
    pattern:
      /#(?:Const|Else|ElseIf|End|ExternalChecksum|ExternalSource|If|Region)(?:[^\S\r\n]_[^\S\r\n]*(?:\r\n?|\n)|.)+/i,
    alias: "comment",
    greedy: !0,
  },
  string: { pattern: /\$?["“”](?:["“”]{2}|[^"“”])*["“”]C?/i, greedy: !0 },
  date: {
    pattern:
      /#[^\S\r\n]*(?:\d+([/-])\d+\1\d+(?:[^\S\r\n]+(?:\d+[^\S\r\n]*(?:AM|PM)|\d+:\d+(?::\d+)?(?:[^\S\r\n]*(?:AM|PM))?))?|\d+[^\S\r\n]*(?:AM|PM)|\d+:\d+(?::\d+)?(?:[^\S\r\n]*(?:AM|PM))?)[^\S\r\n]*#/i,
    alias: "builtin",
  },
  number:
    /(?:(?:\b\d+(?:\.\d+)?|\.\d+)(?:E[+-]?\d+)?|&[HO][\dA-F]+)(?:U?[ILS]|[FRD])?/i,
  boolean: /\b(?:True|False|Nothing)\b/i,
  keyword:
    /\b(?:AddHandler|AddressOf|Alias|And(?:Also)?|As|Boolean|ByRef|Byte|ByVal|Call|Case|Catch|C(?:Bool|Byte|Char|Date|Dbl|Dec|Int|Lng|Obj|SByte|Short|Sng|Str|Type|UInt|ULng|UShort)|Char|Class|Const|Continue|Currency|Date|Decimal|Declare|Default|Delegate|Dim|DirectCast|Do|Double|Each|Else(?:If)?|End(?:If)?|Enum|Erase|Error|Event|Exit|Finally|For|Friend|Function|Get(?:Type|XMLNamespace)?|Global|GoSub|GoTo|Handles|If|Implements|Imports|In|Inherits|Integer|Interface|Is|IsNot|Let|Lib|Like|Long|Loop|Me|Mod|Module|Must(?:Inherit|Override)|My(?:Base|Class)|Namespace|Narrowing|New|Next|Not(?:Inheritable|Overridable)?|Object|Of|On|Operator|Option(?:al)?|Or(?:Else)?|Out|Overloads|Overridable|Overrides|ParamArray|Partial|Private|Property|Protected|Public|RaiseEvent|ReadOnly|ReDim|RemoveHandler|Resume|Return|SByte|Select|Set|Shadows|Shared|short|Single|Static|Step|Stop|String|Structure|Sub|SyncLock|Then|Throw|To|Try|TryCast|Type|TypeOf|U(?:Integer|Long|Short)|Using|Variant|Wend|When|While|Widening|With(?:Events)?|WriteOnly|Until|Xor)\b/i,
  operator: [
    /[+\-*/\\^<=>&#@$%!]/,
    { pattern: /([^\S\r\n])_(?=[^\S\r\n]*[\r\n])/, lookbehind: !0 },
  ],
  punctuation: /[{}().,:?]/,
},
  Prism.languages.vb = Prism.languages["visual-basic"],
  Prism.languages.vba = Prism.languages["visual-basic"];
Prism.languages.wasm = {
  comment: [/\(;[\s\S]*?;\)/, { pattern: /;;.*/, greedy: !0 }],
  string: { pattern: /"(?:\\[\s\S]|[^"\\])*"/, greedy: !0 },
  keyword: [
    { pattern: /\b(?:align|offset)=/, inside: { operator: /=/ } },
    {
      pattern:
        /\b(?:(?:f32|f64|i32|i64)(?:\.(?:abs|add|and|ceil|clz|const|convert_[su]\/i(?:32|64)|copysign|ctz|demote\/f64|div(?:_[su])?|eqz?|extend_[su]\/i32|floor|ge(?:_[su])?|gt(?:_[su])?|le(?:_[su])?|load(?:(?:8|16|32)_[su])?|lt(?:_[su])?|max|min|mul|nearest|neg?|or|popcnt|promote\/f32|reinterpret\/[fi](?:32|64)|rem_[su]|rot[lr]|shl|shr_[su]|store(?:8|16|32)?|sqrt|sub|trunc(?:_[su]\/f(?:32|64))?|wrap\/i64|xor))?|memory\.(?:grow|size))\b/,
      inside: { punctuation: /\./ },
    },
    /\b(?:anyfunc|block|br(?:_if|_table)?|call(?:_indirect)?|data|drop|elem|else|end|export|func|get_(?:global|local)|global|if|import|local|loop|memory|module|mut|nop|offset|param|result|return|select|set_(?:global|local)|start|table|tee_local|then|type|unreachable)\b/,
  ],
  variable: /\$[\w!#$%&'*+\-./:<=>?@\\^_`|~]+/i,
  number:
    /[+-]?\b(?:\d(?:_?\d)*(?:\.\d(?:_?\d)*)?(?:[eE][+-]?\d(?:_?\d)*)?|0x[\da-fA-F](?:_?[\da-fA-F])*(?:\.[\da-fA-F](?:_?[\da-fA-D])*)?(?:[pP][+-]?\d(?:_?\d)*)?)\b|\binf\b|\bnan(?::0x[\da-fA-F](?:_?[\da-fA-D])*)?\b/,
  punctuation: /[()]/,
};
!function (n) {
  function a(a, e) {
    n.languages[a] &&
      n.languages.insertBefore(a, "comment", { "doc-comment": e });
  }
  var e = n.languages.markup.tag,
    t = {
      pattern: /\/\/\/.*/,
      greedy: !0,
      alias: "comment",
      inside: { tag: e },
    },
    g = { pattern: /'''.*/, greedy: !0, alias: "comment", inside: { tag: e } };
  a("csharp", t), a("fsharp", t), a("vbnet", g);
}(Prism);
!function (n) {
  var t = /[*&][^\s[\]{},]+/,
    e =
      /!(?:<[\w\-%#;/?:@&=+$,.!~*'()[\]]+>|(?:[a-zA-Z\d-]*!)?[\w\-%#;/?:@&=+$.~*'()]+)?/,
    r = "(?:" + e.source + "(?:[ \t]+" + t.source + ")?|" + t.source +
      "(?:[ \t]+" + e.source + ")?)";
  function a(n, t) {
    t = (t || "").replace(/m/g, "") + "m";
    var e =
      "([:\\-,[{]\\s*(?:\\s<<prop>>[ \t]+)?)(?:<<value>>)(?=[ \t]*(?:$|,|]|}|\\s*#))"
        .replace(/<<prop>>/g, function () {
          return r;
        }).replace(/<<value>>/g, function () {
          return n;
        });
    return RegExp(e, t);
  }
  n.languages.yaml = {
    scalar: {
      pattern: RegExp(
        "([\\-:]\\s*(?:\\s<<prop>>[ \t]+)?[|>])[ \t]*(?:((?:\r?\n|\r)[ \t]+)[^\r\n]+(?:\\2[^\r\n]+)*)"
          .replace(/<<prop>>/g, function () {
            return r;
          }),
      ),
      lookbehind: !0,
      alias: "string",
    },
    comment: /#.*/,
    key: {
      pattern: RegExp(
        "((?:^|[:\\-,[{\r\n?])[ \t]*(?:<<prop>>[ \t]+)?)[^\r\n{[\\]},#\\s]+?(?=\\s*:\\s)"
          .replace(/<<prop>>/g, function () {
            return r;
          }),
      ),
      lookbehind: !0,
      alias: "atrule",
    },
    directive: { pattern: /(^[ \t]*)%.+/m, lookbehind: !0, alias: "important" },
    datetime: {
      pattern: a(
        "\\d{4}-\\d\\d?-\\d\\d?(?:[tT]|[ \t]+)\\d\\d?:\\d{2}:\\d{2}(?:\\.\\d*)?[ \t]*(?:Z|[-+]\\d\\d?(?::\\d{2})?)?|\\d{4}-\\d{2}-\\d{2}|\\d\\d?:\\d{2}(?::\\d{2}(?:\\.\\d*)?)?",
      ),
      lookbehind: !0,
      alias: "number",
    },
    boolean: {
      pattern: a("true|false", "i"),
      lookbehind: !0,
      alias: "important",
    },
    null: { pattern: a("null|~", "i"), lookbehind: !0, alias: "important" },
    string: {
      pattern: a("(\"|')(?:(?!\\2)[^\\\\\r\n]|\\\\.)*\\2"),
      lookbehind: !0,
      greedy: !0,
    },
    number: {
      pattern: a(
        "[+-]?(?:0x[\\da-f]+|0o[0-7]+|(?:\\d+\\.?\\d*|\\.?\\d+)(?:e[+-]?\\d+)?|\\.inf|\\.nan)",
        "i",
      ),
      lookbehind: !0,
    },
    tag: e,
    important: t,
    punctuation: /---|[:[\]{}\-,|>?]|\.\.\./,
  }, n.languages.yml = n.languages.yaml;
}(Prism);
!function () {
  if (
    ("undefined" == typeof self || self.Prism) &&
    ("undefined" == typeof global || global.Prism)
  ) {
    var t =
        /\b([a-z]{3,7}:\/\/|tel:)[\w\-+%~/.:=&@]+(?:\?[\w\-+%~/.:=?&!$'()*,;@]*)?(?:#[\w\-+%~/.:#=?&!$'()*,;@]*)?/,
      r = /\b\S+@[\w.]+[a-z]{2}/,
      a = /\[([^\]]+)]\(([^)]+)\)/,
      l = ["comment", "url", "attr-value", "string"];
    Prism.plugins.autolinker = {
      processGrammar: function (i) {
        i && !i["url-link"] && (Prism.languages.DFS(i, function (i, n, e) {
          -1 < l.indexOf(e) && !Array.isArray(n) &&
            (n.pattern || (n = this[i] = { pattern: n }),
              n.inside = n.inside || {},
              "comment" == e && (n.inside["md-link"] = a),
              "attr-value" == e
                ? Prism.languages.insertBefore(
                  "inside",
                  "punctuation",
                  { "url-link": t },
                  n,
                )
                : n.inside["url-link"] = t,
              n.inside["email-link"] = r);
        }),
          i["url-link"] = t,
          i["email-link"] = r);
      },
    },
      Prism.hooks.add("before-highlight", function (i) {
        Prism.plugins.autolinker.processGrammar(i.grammar);
      }),
      Prism.hooks.add("wrap", function (i) {
        if (/-link$/.test(i.type)) {
          i.tag = "a";
          var n = i.content;
          if ("email-link" == i.type && 0 != n.indexOf("mailto:")) {
            n = "mailto:" + n;
          } else if ("md-link" == i.type) {
            var e = i.content.match(a);
            n = e[2], i.content = e[1];
          }
          i.attributes.href = n;
          try {
            i.content = decodeURIComponent(i.content);
          } catch (i) {}
        }
      });
  }
}();
!function () {
  if (
    "undefined" != typeof self && "undefined" != typeof Prism &&
    "undefined" != typeof document
  ) {
    var a =
        /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/g,
      c = /^#?((?:[\da-f]){3,4}|(?:[\da-f]{2}){3,4})$/i,
      f = [function (n) {
        var r = c.exec(n);
        if (r) {
          for (
            var o = 6 <= (n = r[1]).length ? 2 : 1,
              e = n.length / o,
              s = 1 == o ? 1 / 15 : 1 / 255,
              t = [],
              i = 0;
            i < e;
            i++
          ) {
            var a = parseInt(n.substr(i * o, o), 16);
            t.push(a * s);
          }
          return 3 == e && t.push(1),
            "rgba(" + t.slice(0, 3).map(function (n) {
              return String(Math.round(255 * n));
            }).join(",") + "," + String(Number(t[3].toFixed(3))) + ")";
        }
      }, function (n) {
        var r = (new Option()).style;
        return r.color = n, r.color ? n : void 0;
      }];
    Prism.hooks.add("wrap", function (n) {
      if ("color" === n.type || 0 <= n.classes.indexOf("color")) {
        for (
          var r, o = n.content, e = o.split(a).join(""), s = 0, t = f.length;
          s < t && !r;
          s++
        ) {
          r = f[s](e);
        }
        if (!r) return;
        var i =
          '<span class="inline-color-wrapper"><span class="inline-color" style="background-color:' +
          r + ';"></span></span>';
        n.content = i + o;
      }
    });
  }
}();
!function () {
  if ("undefined" != typeof Prism && Prism.languages.diff) {
    var o = /diff-([\w-]+)/i,
      m =
        /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/gi,
      c = RegExp(
        "(?:__|[^\r\n<])*(?:\r\n?|\n|(?:__|[^\r\n<])(?![^\r\n]))".replace(
          /__/g,
          function () {
            return m.source;
          },
        ),
        "gi",
      ),
      d = Prism.languages.diff.PREFIXES;
    Prism.hooks.add("before-sanity-check", function (e) {
      var a = e.language;
      o.test(a) && !e.grammar &&
        (e.grammar = Prism.languages[a] = Prism.languages.diff);
    }),
      Prism.hooks.add("before-tokenize", function (e) {
        var a = e.language;
        o.test(a) && !Prism.languages[a] &&
          (Prism.languages[a] = Prism.languages.diff);
      }),
      Prism.hooks.add("wrap", function (e) {
        var a, s;
        if ("diff" !== e.language) {
          var n = o.exec(e.language);
          if (!n) return;
          a = n[1], s = Prism.languages[a];
        }
        if (e.type in d) {
          var r,
            i = e.content.replace(m, "").replace(/&lt;/g, "<").replace(
              /&amp;/g,
              "&",
            ),
            g = i.replace(/(^|[\r\n])./g, "$1");
          r = s ? Prism.highlight(g, s, a) : Prism.util.encode(g);
          var f,
            t = new Prism.Token("prefix", d[e.type], [/\w+/.exec(e.type)[0]]),
            u = Prism.Token.stringify(t, e.language),
            l = [];
          for (c.lastIndex = 0; f = c.exec(r);) l.push(u + f[0]);
          /(?:^|[\r\n]).$/.test(i) && l.push(u),
            e.content = l.join(""),
            s && e.classes.push("language-" + a);
        }
      });
  }
}();
