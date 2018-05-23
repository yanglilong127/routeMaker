webpackJsonp([2,6],{

/***/ 0:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var consoleLogger = {
  type: 'logger',

  log: function log(args) {
    this.output('log', args);
  },
  warn: function warn(args) {
    this.output('warn', args);
  },
  error: function error(args) {
    this.output('error', args);
  },
  output: function output(type, args) {
    var _console;

    /* eslint no-console: 0 */
    if (console && console[type]) (_console = console)[type].apply(_console, _toConsumableArray(args));
  }
};

var Logger = function () {
  function Logger(concreteLogger) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Logger);

    this.init(concreteLogger, options);
  }

  Logger.prototype.init = function init(concreteLogger) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    this.prefix = options.prefix || 'i18next:';
    this.logger = concreteLogger || consoleLogger;
    this.options = options;
    this.debug = options.debug;
  };

  Logger.prototype.setDebug = function setDebug(bool) {
    this.debug = bool;
  };

  Logger.prototype.log = function log() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return this.forward(args, 'log', '', true);
  };

  Logger.prototype.warn = function warn() {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return this.forward(args, 'warn', '', true);
  };

  Logger.prototype.error = function error() {
    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    return this.forward(args, 'error', '');
  };

  Logger.prototype.deprecate = function deprecate() {
    for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }

    return this.forward(args, 'warn', 'WARNING DEPRECATED: ', true);
  };

  Logger.prototype.forward = function forward(args, lvl, prefix, debugOnly) {
    if (debugOnly && !this.debug) return null;
    if (typeof args[0] === 'string') args[0] = '' + prefix + this.prefix + ' ' + args[0];
    return this.logger[lvl](args);
  };

  Logger.prototype.create = function create(moduleName) {
    return new Logger(this.logger, _extends({ prefix: this.prefix + ':' + moduleName + ':' }, this.options));
  };

  return Logger;
}();

/* harmony default export */ __webpack_exports__["a"] = (new Logger());

/***/ }),

/***/ 10:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var require;var require;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function (f) {
    if (( false ? "undefined" : _typeof(exports)) === "object" && typeof module !== "undefined") {
        module.exports = f();
    } else if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (f),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {
        var g;if (typeof window !== "undefined") {
            g = window;
        } else if (typeof global !== "undefined") {
            g = global;
        } else if (typeof self !== "undefined") {
            g = self;
        } else {
            g = this;
        }g.XRegExp = f();
    }
})(function () {
    var define, module, exports;return function e(t, n, r) {
        function s(o, u) {
            if (!n[o]) {
                if (!t[o]) {
                    var a = typeof require == "function" && require;if (!u && a) return require(o, !0);if (i) return i(o, !0);var f = new Error("Cannot find module '" + o + "'");throw f.code = "MODULE_NOT_FOUND", f;
                }var l = n[o] = { exports: {} };t[o][0].call(l.exports, function (e) {
                    var n = t[o][1][e];return s(n ? n : e);
                }, l, l.exports, e, t, n, r);
            }return n[o].exports;
        }var i = typeof require == "function" && require;for (var o = 0; o < r.length; o++) {
            s(r[o]);
        }return s;
    }({ 1: [function (require, module, exports) {
            'use strict';

            Object.defineProperty(exports, "__esModule", {
                value: true
            });

            /*!
             * XRegExp.build 4.0.0
             * <xregexp.com>
             * Steven Levithan (c) 2012-2017 MIT License
             */

            exports.default = function (XRegExp) {
                var REGEX_DATA = 'xregexp';
                var subParts = /(\()(?!\?)|\\([1-9]\d*)|\\[\s\S]|\[(?:[^\\\]]|\\[\s\S])*\]/g;
                var parts = XRegExp.union([/\({{([\w$]+)}}\)|{{([\w$]+)}}/, subParts], 'g', {
                    conjunction: 'or'
                });

                /**
                 * Strips a leading `^` and trailing unescaped `$`, if both are present.
                 *
                 * @private
                 * @param {String} pattern Pattern to process.
                 * @returns {String} Pattern with edge anchors removed.
                 */
                function deanchor(pattern) {
                    // Allow any number of empty noncapturing groups before/after anchors, because regexes
                    // built/generated by XRegExp sometimes include them
                    var leadingAnchor = /^(?:\(\?:\))*\^/;
                    var trailingAnchor = /\$(?:\(\?:\))*$/;

                    if (leadingAnchor.test(pattern) && trailingAnchor.test(pattern) &&
                    // Ensure that the trailing `$` isn't escaped
                    trailingAnchor.test(pattern.replace(/\\[\s\S]/g, ''))) {
                        return pattern.replace(leadingAnchor, '').replace(trailingAnchor, '');
                    }

                    return pattern;
                }

                /**
                 * Converts the provided value to an XRegExp. Native RegExp flags are not preserved.
                 *
                 * @private
                 * @param {String|RegExp} value Value to convert.
                 * @param {Boolean} [addFlagX] Whether to apply the `x` flag in cases when `value` is not
                 *   already a regex generated by XRegExp
                 * @returns {RegExp} XRegExp object with XRegExp syntax applied.
                 */
                function asXRegExp(value, addFlagX) {
                    var flags = addFlagX ? 'x' : '';
                    return XRegExp.isRegExp(value) ? value[REGEX_DATA] && value[REGEX_DATA].captureNames ?
                    // Don't recompile, to preserve capture names
                    value :
                    // Recompile as XRegExp
                    XRegExp(value.source, flags) :
                    // Compile string as XRegExp
                    XRegExp(value, flags);
                }

                function interpolate(substitution) {
                    return substitution instanceof RegExp ? substitution : XRegExp.escape(substitution);
                }

                function reduceToSubpatternsObject(subpatterns, interpolated, subpatternIndex) {
                    subpatterns['subpattern' + subpatternIndex] = interpolated;
                    return subpatterns;
                }

                function embedSubpatternAfter(raw, subpatternIndex, rawLiterals) {
                    var hasSubpattern = subpatternIndex < rawLiterals.length - 1;
                    return raw + (hasSubpattern ? '{{subpattern' + subpatternIndex + '}}' : '');
                }

                /**
                 * Provides tagged template literals that create regexes with XRegExp syntax and flags. The
                 * provided pattern is handled as a raw string, so backslashes don't need to be escaped.
                 *
                 * Interpolation of strings and regexes shares the features of `XRegExp.build`. Interpolated
                 * patterns are treated as atomic units when quantified, interpolated strings have their special
                 * characters escaped, a leading `^` and trailing unescaped `$` are stripped from interpolated
                 * regexes if both are present, and any backreferences within an interpolated regex are
                 * rewritten to work within the overall pattern.
                 *
                 * @memberOf XRegExp
                 * @param {String} [flags] Any combination of XRegExp flags.
                 * @returns {Function} Handler for template literals that construct regexes with XRegExp syntax.
                 * @example
                 *
                 * const h12 = /1[0-2]|0?[1-9]/;
                 * const h24 = /2[0-3]|[01][0-9]/;
                 * const hours = XRegExp.tag('x')`${h12} : | ${h24}`;
                 * const minutes = /^[0-5][0-9]$/;
                 * // Note that explicitly naming the 'minutes' group is required for named backreferences
                 * const time = XRegExp.tag('x')`^ ${hours} (?<minutes>${minutes}) $`;
                 * time.test('10:59'); // -> true
                 * XRegExp.exec('10:59', time).minutes; // -> '59'
                 */
                XRegExp.tag = function (flags) {
                    return function (literals) {
                        for (var _len = arguments.length, substitutions = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                            substitutions[_key - 1] = arguments[_key];
                        }

                        var subpatterns = substitutions.map(interpolate).reduce(reduceToSubpatternsObject, {});
                        var pattern = literals.raw.map(embedSubpatternAfter).join('');
                        return XRegExp.build(pattern, subpatterns, flags);
                    };
                };

                /**
                 * Builds regexes using named subpatterns, for readability and pattern reuse. Backreferences in
                 * the outer pattern and provided subpatterns are automatically renumbered to work correctly.
                 * Native flags used by provided subpatterns are ignored in favor of the `flags` argument.
                 *
                 * @memberOf XRegExp
                 * @param {String} pattern XRegExp pattern using `{{name}}` for embedded subpatterns. Allows
                 *   `({{name}})` as shorthand for `(?<name>{{name}})`. Patterns cannot be embedded within
                 *   character classes.
                 * @param {Object} subs Lookup object for named subpatterns. Values can be strings or regexes. A
                 *   leading `^` and trailing unescaped `$` are stripped from subpatterns, if both are present.
                 * @param {String} [flags] Any combination of XRegExp flags.
                 * @returns {RegExp} Regex with interpolated subpatterns.
                 * @example
                 *
                 * const time = XRegExp.build('(?x)^ {{hours}} ({{minutes}}) $', {
                 *   hours: XRegExp.build('{{h12}} : | {{h24}}', {
                 *     h12: /1[0-2]|0?[1-9]/,
                 *     h24: /2[0-3]|[01][0-9]/
                 *   }, 'x'),
                 *   minutes: /^[0-5][0-9]$/
                 * });
                 * time.test('10:59'); // -> true
                 * XRegExp.exec('10:59', time).minutes; // -> '59'
                 */
                XRegExp.build = function (pattern, subs, flags) {
                    flags = flags || '';
                    // Used with `asXRegExp` calls for `pattern` and subpatterns in `subs`, to work around how
                    // some browsers convert `RegExp('\n')` to a regex that contains the literal characters `\`
                    // and `n`. See more details at <https://github.com/slevithan/xregexp/pull/163>.
                    var addFlagX = flags.indexOf('x') !== -1;
                    var inlineFlags = /^\(\?([\w$]+)\)/.exec(pattern);
                    // Add flags within a leading mode modifier to the overall pattern's flags
                    if (inlineFlags) {
                        flags = XRegExp._clipDuplicates(flags + inlineFlags[1]);
                    }

                    var data = {};
                    for (var p in subs) {
                        if (subs.hasOwnProperty(p)) {
                            // Passing to XRegExp enables extended syntax and ensures independent validity,
                            // lest an unescaped `(`, `)`, `[`, or trailing `\` breaks the `(?:)` wrapper. For
                            // subpatterns provided as native regexes, it dies on octals and adds the property
                            // used to hold extended regex instance data, for simplicity.
                            var sub = asXRegExp(subs[p], addFlagX);
                            data[p] = {
                                // Deanchoring allows embedding independently useful anchored regexes. If you
                                // really need to keep your anchors, double them (i.e., `^^...$$`).
                                pattern: deanchor(sub.source),
                                names: sub[REGEX_DATA].captureNames || []
                            };
                        }
                    }

                    // Passing to XRegExp dies on octals and ensures the outer pattern is independently valid;
                    // helps keep this simple. Named captures will be put back.
                    var patternAsRegex = asXRegExp(pattern, addFlagX);

                    // 'Caps' is short for 'captures'
                    var numCaps = 0;
                    var numPriorCaps = void 0;
                    var numOuterCaps = 0;
                    var outerCapsMap = [0];
                    var outerCapNames = patternAsRegex[REGEX_DATA].captureNames || [];
                    var output = patternAsRegex.source.replace(parts, function ($0, $1, $2, $3, $4) {
                        var subName = $1 || $2;
                        var capName = void 0;
                        var intro = void 0;
                        var localCapIndex = void 0;
                        // Named subpattern
                        if (subName) {
                            if (!data.hasOwnProperty(subName)) {
                                throw new ReferenceError('Undefined property ' + $0);
                            }
                            // Named subpattern was wrapped in a capturing group
                            if ($1) {
                                capName = outerCapNames[numOuterCaps];
                                outerCapsMap[++numOuterCaps] = ++numCaps;
                                // If it's a named group, preserve the name. Otherwise, use the subpattern name
                                // as the capture name
                                intro = '(?<' + (capName || subName) + '>';
                            } else {
                                intro = '(?:';
                            }
                            numPriorCaps = numCaps;
                            var rewrittenSubpattern = data[subName].pattern.replace(subParts, function (match, paren, backref) {
                                // Capturing group
                                if (paren) {
                                    capName = data[subName].names[numCaps - numPriorCaps];
                                    ++numCaps;
                                    // If the current capture has a name, preserve the name
                                    if (capName) {
                                        return '(?<' + capName + '>';
                                    }
                                    // Backreference
                                } else if (backref) {
                                    localCapIndex = +backref - 1;
                                    // Rewrite the backreference
                                    return data[subName].names[localCapIndex] ?
                                    // Need to preserve the backreference name in case using flag `n`
                                    '\\k<' + data[subName].names[localCapIndex] + '>' : '\\' + (+backref + numPriorCaps);
                                }
                                return match;
                            });
                            return '' + intro + rewrittenSubpattern + ')';
                        }
                        // Capturing group
                        if ($3) {
                            capName = outerCapNames[numOuterCaps];
                            outerCapsMap[++numOuterCaps] = ++numCaps;
                            // If the current capture has a name, preserve the name
                            if (capName) {
                                return '(?<' + capName + '>';
                            }
                            // Backreference
                        } else if ($4) {
                            localCapIndex = +$4 - 1;
                            // Rewrite the backreference
                            return outerCapNames[localCapIndex] ?
                            // Need to preserve the backreference name in case using flag `n`
                            '\\k<' + outerCapNames[localCapIndex] + '>' : '\\' + outerCapsMap[+$4];
                        }
                        return $0;
                    });

                    return XRegExp(output, flags);
                };
            };

            module.exports = exports['default'];
        }, {}], 2: [function (require, module, exports) {
            'use strict';

            Object.defineProperty(exports, "__esModule", {
                value: true
            });

            /*!
             * XRegExp.matchRecursive 4.0.0
             * <xregexp.com>
             * Steven Levithan (c) 2009-2017 MIT License
             */

            exports.default = function (XRegExp) {

                /**
                 * Returns a match detail object composed of the provided values.
                 *
                 * @private
                 */
                function row(name, value, start, end) {
                    return {
                        name: name,
                        value: value,
                        start: start,
                        end: end
                    };
                }

                /**
                 * Returns an array of match strings between outermost left and right delimiters, or an array of
                 * objects with detailed match parts and position data. An error is thrown if delimiters are
                 * unbalanced within the data.
                 *
                 * @memberOf XRegExp
                 * @param {String} str String to search.
                 * @param {String} left Left delimiter as an XRegExp pattern.
                 * @param {String} right Right delimiter as an XRegExp pattern.
                 * @param {String} [flags] Any native or XRegExp flags, used for the left and right delimiters.
                 * @param {Object} [options] Lets you specify `valueNames` and `escapeChar` options.
                 * @returns {Array} Array of matches, or an empty array.
                 * @example
                 *
                 * // Basic usage
                 * let str = '(t((e))s)t()(ing)';
                 * XRegExp.matchRecursive(str, '\\(', '\\)', 'g');
                 * // -> ['t((e))s', '', 'ing']
                 *
                 * // Extended information mode with valueNames
                 * str = 'Here is <div> <div>an</div></div> example';
                 * XRegExp.matchRecursive(str, '<div\\s*>', '</div>', 'gi', {
                 *   valueNames: ['between', 'left', 'match', 'right']
                 * });
                 * // -> [
                 * // {name: 'between', value: 'Here is ',       start: 0,  end: 8},
                 * // {name: 'left',    value: '<div>',          start: 8,  end: 13},
                 * // {name: 'match',   value: ' <div>an</div>', start: 13, end: 27},
                 * // {name: 'right',   value: '</div>',         start: 27, end: 33},
                 * // {name: 'between', value: ' example',       start: 33, end: 41}
                 * // ]
                 *
                 * // Omitting unneeded parts with null valueNames, and using escapeChar
                 * str = '...{1}.\\{{function(x,y){return {y:x}}}';
                 * XRegExp.matchRecursive(str, '{', '}', 'g', {
                 *   valueNames: ['literal', null, 'value', null],
                 *   escapeChar: '\\'
                 * });
                 * // -> [
                 * // {name: 'literal', value: '...',  start: 0, end: 3},
                 * // {name: 'value',   value: '1',    start: 4, end: 5},
                 * // {name: 'literal', value: '.\\{', start: 6, end: 9},
                 * // {name: 'value',   value: 'function(x,y){return {y:x}}', start: 10, end: 37}
                 * // ]
                 *
                 * // Sticky mode via flag y
                 * str = '<1><<<2>>><3>4<5>';
                 * XRegExp.matchRecursive(str, '<', '>', 'gy');
                 * // -> ['1', '<<2>>', '3']
                 */
                XRegExp.matchRecursive = function (str, left, right, flags, options) {
                    flags = flags || '';
                    options = options || {};
                    var global = flags.indexOf('g') !== -1;
                    var sticky = flags.indexOf('y') !== -1;
                    // Flag `y` is controlled internally
                    var basicFlags = flags.replace(/y/g, '');
                    var escapeChar = options.escapeChar;
                    var vN = options.valueNames;
                    var output = [];
                    var openTokens = 0;
                    var delimStart = 0;
                    var delimEnd = 0;
                    var lastOuterEnd = 0;
                    var outerStart = void 0;
                    var innerStart = void 0;
                    var leftMatch = void 0;
                    var rightMatch = void 0;
                    var esc = void 0;
                    left = XRegExp(left, basicFlags);
                    right = XRegExp(right, basicFlags);

                    if (escapeChar) {
                        if (escapeChar.length > 1) {
                            throw new Error('Cannot use more than one escape character');
                        }
                        escapeChar = XRegExp.escape(escapeChar);
                        // Example of concatenated `esc` regex:
                        // `escapeChar`: '%'
                        // `left`: '<'
                        // `right`: '>'
                        // Regex is: /(?:%[\S\s]|(?:(?!<|>)[^%])+)+/
                        esc = new RegExp('(?:' + escapeChar + '[\\S\\s]|(?:(?!' +
                        // Using `XRegExp.union` safely rewrites backreferences in `left` and `right`.
                        // Intentionally not passing `basicFlags` to `XRegExp.union` since any syntax
                        // transformation resulting from those flags was already applied to `left` and
                        // `right` when they were passed through the XRegExp constructor above.
                        XRegExp.union([left, right], '', { conjunction: 'or' }).source + ')[^' + escapeChar + '])+)+',
                        // Flags `gy` not needed here
                        flags.replace(/[^imu]+/g, ''));
                    }

                    while (true) {
                        // If using an escape character, advance to the delimiter's next starting position,
                        // skipping any escaped characters in between
                        if (escapeChar) {
                            delimEnd += (XRegExp.exec(str, esc, delimEnd, 'sticky') || [''])[0].length;
                        }
                        leftMatch = XRegExp.exec(str, left, delimEnd);
                        rightMatch = XRegExp.exec(str, right, delimEnd);
                        // Keep the leftmost match only
                        if (leftMatch && rightMatch) {
                            if (leftMatch.index <= rightMatch.index) {
                                rightMatch = null;
                            } else {
                                leftMatch = null;
                            }
                        }
                        // Paths (LM: leftMatch, RM: rightMatch, OT: openTokens):
                        // LM | RM | OT | Result
                        // 1  | 0  | 1  | loop
                        // 1  | 0  | 0  | loop
                        // 0  | 1  | 1  | loop
                        // 0  | 1  | 0  | throw
                        // 0  | 0  | 1  | throw
                        // 0  | 0  | 0  | break
                        // The paths above don't include the sticky mode special case. The loop ends after the
                        // first completed match if not `global`.
                        if (leftMatch || rightMatch) {
                            delimStart = (leftMatch || rightMatch).index;
                            delimEnd = delimStart + (leftMatch || rightMatch)[0].length;
                        } else if (!openTokens) {
                            break;
                        }
                        if (sticky && !openTokens && delimStart > lastOuterEnd) {
                            break;
                        }
                        if (leftMatch) {
                            if (!openTokens) {
                                outerStart = delimStart;
                                innerStart = delimEnd;
                            }
                            ++openTokens;
                        } else if (rightMatch && openTokens) {
                            if (! --openTokens) {
                                if (vN) {
                                    if (vN[0] && outerStart > lastOuterEnd) {
                                        output.push(row(vN[0], str.slice(lastOuterEnd, outerStart), lastOuterEnd, outerStart));
                                    }
                                    if (vN[1]) {
                                        output.push(row(vN[1], str.slice(outerStart, innerStart), outerStart, innerStart));
                                    }
                                    if (vN[2]) {
                                        output.push(row(vN[2], str.slice(innerStart, delimStart), innerStart, delimStart));
                                    }
                                    if (vN[3]) {
                                        output.push(row(vN[3], str.slice(delimStart, delimEnd), delimStart, delimEnd));
                                    }
                                } else {
                                    output.push(str.slice(innerStart, delimStart));
                                }
                                lastOuterEnd = delimEnd;
                                if (!global) {
                                    break;
                                }
                            }
                        } else {
                            throw new Error('Unbalanced delimiter found in string');
                        }
                        // If the delimiter matched an empty string, avoid an infinite loop
                        if (delimStart === delimEnd) {
                            ++delimEnd;
                        }
                    }

                    if (global && !sticky && vN && vN[0] && str.length > lastOuterEnd) {
                        output.push(row(vN[0], str.slice(lastOuterEnd), lastOuterEnd, str.length));
                    }

                    return output;
                };
            };

            module.exports = exports['default'];
        }, {}], 3: [function (require, module, exports) {
            'use strict';

            Object.defineProperty(exports, "__esModule", {
                value: true
            });

            /*!
             * XRegExp Unicode Base 4.0.0
             * <xregexp.com>
             * Steven Levithan (c) 2008-2017 MIT License
             */

            exports.default = function (XRegExp) {

                /**
                 * Adds base support for Unicode matching:
                 * - Adds syntax `\p{..}` for matching Unicode tokens. Tokens can be inverted using `\P{..}` or
                 *   `\p{^..}`. Token names ignore case, spaces, hyphens, and underscores. You can omit the
                 *   braces for token names that are a single letter (e.g. `\pL` or `PL`).
                 * - Adds flag A (astral), which enables 21-bit Unicode support.
                 * - Adds the `XRegExp.addUnicodeData` method used by other addons to provide character data.
                 *
                 * Unicode Base relies on externally provided Unicode character data. Official addons are
                 * available to provide data for Unicode categories, scripts, blocks, and properties.
                 *
                 * @requires XRegExp
                 */

                // ==--------------------------==
                // Private stuff
                // ==--------------------------==

                // Storage for Unicode data
                var unicode = {};

                // Reuse utils
                var dec = XRegExp._dec;
                var hex = XRegExp._hex;
                var pad4 = XRegExp._pad4;

                // Generates a token lookup name: lowercase, with hyphens, spaces, and underscores removed
                function normalize(name) {
                    return name.replace(/[- _]+/g, '').toLowerCase();
                }

                // Gets the decimal code of a literal code unit, \xHH, \uHHHH, or a backslash-escaped literal
                function charCode(chr) {
                    var esc = /^\\[xu](.+)/.exec(chr);
                    return esc ? dec(esc[1]) : chr.charCodeAt(chr[0] === '\\' ? 1 : 0);
                }

                // Inverts a list of ordered BMP characters and ranges
                function invertBmp(range) {
                    var output = '';
                    var lastEnd = -1;

                    XRegExp.forEach(range, /(\\x..|\\u....|\\?[\s\S])(?:-(\\x..|\\u....|\\?[\s\S]))?/, function (m) {
                        var start = charCode(m[1]);
                        if (start > lastEnd + 1) {
                            output += "\\u" + pad4(hex(lastEnd + 1));
                            if (start > lastEnd + 2) {
                                output += "-\\u" + pad4(hex(start - 1));
                            }
                        }
                        lastEnd = charCode(m[2] || m[1]);
                    });

                    if (lastEnd < 0xFFFF) {
                        output += "\\u" + pad4(hex(lastEnd + 1));
                        if (lastEnd < 0xFFFE) {
                            output += "-\\uFFFF";
                        }
                    }

                    return output;
                }

                // Generates an inverted BMP range on first use
                function cacheInvertedBmp(slug) {
                    var prop = 'b!';
                    return unicode[slug][prop] || (unicode[slug][prop] = invertBmp(unicode[slug].bmp));
                }

                // Combines and optionally negates BMP and astral data
                function buildAstral(slug, isNegated) {
                    var item = unicode[slug];
                    var combined = '';

                    if (item.bmp && !item.isBmpLast) {
                        combined = '[' + item.bmp + ']' + (item.astral ? '|' : '');
                    }
                    if (item.astral) {
                        combined += item.astral;
                    }
                    if (item.isBmpLast && item.bmp) {
                        combined += (item.astral ? '|' : '') + '[' + item.bmp + ']';
                    }

                    // Astral Unicode tokens always match a code point, never a code unit
                    return isNegated ? '(?:(?!' + combined + ")(?:[\uD800-\uDBFF][\uDC00-\uDFFF]|[\0-\uFFFF]))" : '(?:' + combined + ')';
                }

                // Builds a complete astral pattern on first use
                function cacheAstral(slug, isNegated) {
                    var prop = isNegated ? 'a!' : 'a=';
                    return unicode[slug][prop] || (unicode[slug][prop] = buildAstral(slug, isNegated));
                }

                // ==--------------------------==
                // Core functionality
                // ==--------------------------==

                /*
                 * Add astral mode (flag A) and Unicode token syntax: `\p{..}`, `\P{..}`, `\p{^..}`, `\pC`.
                 */
                XRegExp.addToken(
                // Use `*` instead of `+` to avoid capturing `^` as the token name in `\p{^}`
                /\\([pP])(?:{(\^?)([^}]*)}|([A-Za-z]))/, function (match, scope, flags) {
                    var ERR_DOUBLE_NEG = 'Invalid double negation ';
                    var ERR_UNKNOWN_NAME = 'Unknown Unicode token ';
                    var ERR_UNKNOWN_REF = 'Unicode token missing data ';
                    var ERR_ASTRAL_ONLY = 'Astral mode required for Unicode token ';
                    var ERR_ASTRAL_IN_CLASS = 'Astral mode does not support Unicode tokens within character classes';
                    // Negated via \P{..} or \p{^..}
                    var isNegated = match[1] === 'P' || !!match[2];
                    // Switch from BMP (0-FFFF) to astral (0-10FFFF) mode via flag A
                    var isAstralMode = flags.indexOf('A') !== -1;
                    // Token lookup name. Check `[4]` first to avoid passing `undefined` via `\p{}`
                    var slug = normalize(match[4] || match[3]);
                    // Token data object
                    var item = unicode[slug];

                    if (match[1] === 'P' && match[2]) {
                        throw new SyntaxError(ERR_DOUBLE_NEG + match[0]);
                    }
                    if (!unicode.hasOwnProperty(slug)) {
                        throw new SyntaxError(ERR_UNKNOWN_NAME + match[0]);
                    }

                    // Switch to the negated form of the referenced Unicode token
                    if (item.inverseOf) {
                        slug = normalize(item.inverseOf);
                        if (!unicode.hasOwnProperty(slug)) {
                            throw new ReferenceError(ERR_UNKNOWN_REF + match[0] + ' -> ' + item.inverseOf);
                        }
                        item = unicode[slug];
                        isNegated = !isNegated;
                    }

                    if (!(item.bmp || isAstralMode)) {
                        throw new SyntaxError(ERR_ASTRAL_ONLY + match[0]);
                    }
                    if (isAstralMode) {
                        if (scope === 'class') {
                            throw new SyntaxError(ERR_ASTRAL_IN_CLASS);
                        }

                        return cacheAstral(slug, isNegated);
                    }

                    return scope === 'class' ? isNegated ? cacheInvertedBmp(slug) : item.bmp : (isNegated ? '[^' : '[') + item.bmp + ']';
                }, {
                    scope: 'all',
                    optionalFlags: 'A',
                    leadChar: '\\'
                });

                /**
                 * Adds to the list of Unicode tokens that XRegExp regexes can match via `\p` or `\P`.
                 *
                 * @memberOf XRegExp
                 * @param {Array} data Objects with named character ranges. Each object may have properties
                 *   `name`, `alias`, `isBmpLast`, `inverseOf`, `bmp`, and `astral`. All but `name` are
                 *   optional, although one of `bmp` or `astral` is required (unless `inverseOf` is set). If
                 *   `astral` is absent, the `bmp` data is used for BMP and astral modes. If `bmp` is absent,
                 *   the name errors in BMP mode but works in astral mode. If both `bmp` and `astral` are
                 *   provided, the `bmp` data only is used in BMP mode, and the combination of `bmp` and
                 *   `astral` data is used in astral mode. `isBmpLast` is needed when a token matches orphan
                 *   high surrogates *and* uses surrogate pairs to match astral code points. The `bmp` and
                 *   `astral` data should be a combination of literal characters and `\xHH` or `\uHHHH` escape
                 *   sequences, with hyphens to create ranges. Any regex metacharacters in the data should be
                 *   escaped, apart from range-creating hyphens. The `astral` data can additionally use
                 *   character classes and alternation, and should use surrogate pairs to represent astral code
                 *   points. `inverseOf` can be used to avoid duplicating character data if a Unicode token is
                 *   defined as the exact inverse of another token.
                 * @example
                 *
                 * // Basic use
                 * XRegExp.addUnicodeData([{
                 *   name: 'XDigit',
                 *   alias: 'Hexadecimal',
                 *   bmp: '0-9A-Fa-f'
                 * }]);
                 * XRegExp('\\p{XDigit}:\\p{Hexadecimal}+').test('0:3D'); // -> true
                 */
                XRegExp.addUnicodeData = function (data) {
                    var ERR_NO_NAME = 'Unicode token requires name';
                    var ERR_NO_DATA = 'Unicode token has no character data ';
                    var item = void 0;

                    for (var i = 0; i < data.length; ++i) {
                        item = data[i];
                        if (!item.name) {
                            throw new Error(ERR_NO_NAME);
                        }
                        if (!(item.inverseOf || item.bmp || item.astral)) {
                            throw new Error(ERR_NO_DATA + item.name);
                        }
                        unicode[normalize(item.name)] = item;
                        if (item.alias) {
                            unicode[normalize(item.alias)] = item;
                        }
                    }

                    // Reset the pattern cache used by the `XRegExp` constructor, since the same pattern and
                    // flags might now produce different results
                    XRegExp.cache.flush('patterns');
                };

                /**
                 * @ignore
                 *
                 * Return a reference to the internal Unicode definition structure for the given Unicode
                 * Property if the given name is a legal Unicode Property for use in XRegExp `\p` or `\P` regex
                 * constructs.
                 *
                 * @memberOf XRegExp
                 * @param {String} name Name by which the Unicode Property may be recognized (case-insensitive),
                 *   e.g. `'N'` or `'Number'`. The given name is matched against all registered Unicode
                 *   Properties and Property Aliases.
                 * @returns {Object} Reference to definition structure when the name matches a Unicode Property.
                 *
                 * @note
                 * For more info on Unicode Properties, see also http://unicode.org/reports/tr18/#Categories.
                 *
                 * @note
                 * This method is *not* part of the officially documented API and may change or be removed in
                 * the future. It is meant for userland code that wishes to reuse the (large) internal Unicode
                 * structures set up by XRegExp.
                 */
                XRegExp._getUnicodeProperty = function (name) {
                    var slug = normalize(name);
                    return unicode[slug];
                };
            };

            module.exports = exports['default'];
        }, {}], 4: [function (require, module, exports) {
            'use strict';

            Object.defineProperty(exports, "__esModule", {
                value: true
            });

            /*!
             * XRegExp Unicode Blocks 4.0.0
             * <xregexp.com>
             * Steven Levithan (c) 2010-2017 MIT License
             * Unicode data by Mathias Bynens <mathiasbynens.be>
             */

            exports.default = function (XRegExp) {

                /**
                 * Adds support for all Unicode blocks. Block names use the prefix 'In'. E.g.,
                 * `\p{InBasicLatin}`. Token names are case insensitive, and any spaces, hyphens, and
                 * underscores are ignored.
                 *
                 * Uses Unicode 9.0.0.
                 *
                 * @requires XRegExp, Unicode Base
                 */

                if (!XRegExp.addUnicodeData) {
                    throw new ReferenceError('Unicode Base must be loaded before Unicode Blocks');
                }

                XRegExp.addUnicodeData([{
                    name: 'InAdlam',
                    astral: "\uD83A[\uDD00-\uDD5F]"
                }, {
                    name: 'InAegean_Numbers',
                    astral: "\uD800[\uDD00-\uDD3F]"
                }, {
                    name: 'InAhom',
                    astral: "\uD805[\uDF00-\uDF3F]"
                }, {
                    name: 'InAlchemical_Symbols',
                    astral: "\uD83D[\uDF00-\uDF7F]"
                }, {
                    name: 'InAlphabetic_Presentation_Forms',
                    bmp: "\uFB00-\uFB4F"
                }, {
                    name: 'InAnatolian_Hieroglyphs',
                    astral: "\uD811[\uDC00-\uDE7F]"
                }, {
                    name: 'InAncient_Greek_Musical_Notation',
                    astral: "\uD834[\uDE00-\uDE4F]"
                }, {
                    name: 'InAncient_Greek_Numbers',
                    astral: "\uD800[\uDD40-\uDD8F]"
                }, {
                    name: 'InAncient_Symbols',
                    astral: "\uD800[\uDD90-\uDDCF]"
                }, {
                    name: 'InArabic',
                    bmp: "\u0600-\u06FF"
                }, {
                    name: 'InArabic_Extended_A',
                    bmp: "\u08A0-\u08FF"
                }, {
                    name: 'InArabic_Mathematical_Alphabetic_Symbols',
                    astral: "\uD83B[\uDE00-\uDEFF]"
                }, {
                    name: 'InArabic_Presentation_Forms_A',
                    bmp: "\uFB50-\uFDFF"
                }, {
                    name: 'InArabic_Presentation_Forms_B',
                    bmp: "\uFE70-\uFEFF"
                }, {
                    name: 'InArabic_Supplement',
                    bmp: "\u0750-\u077F"
                }, {
                    name: 'InArmenian',
                    bmp: "\u0530-\u058F"
                }, {
                    name: 'InArrows',
                    bmp: "\u2190-\u21FF"
                }, {
                    name: 'InAvestan',
                    astral: "\uD802[\uDF00-\uDF3F]"
                }, {
                    name: 'InBalinese',
                    bmp: "\u1B00-\u1B7F"
                }, {
                    name: 'InBamum',
                    bmp: "\uA6A0-\uA6FF"
                }, {
                    name: 'InBamum_Supplement',
                    astral: "\uD81A[\uDC00-\uDE3F]"
                }, {
                    name: 'InBasic_Latin',
                    bmp: '\0-\x7F'
                }, {
                    name: 'InBassa_Vah',
                    astral: "\uD81A[\uDED0-\uDEFF]"
                }, {
                    name: 'InBatak',
                    bmp: "\u1BC0-\u1BFF"
                }, {
                    name: 'InBengali',
                    bmp: "\u0980-\u09FF"
                }, {
                    name: 'InBhaiksuki',
                    astral: "\uD807[\uDC00-\uDC6F]"
                }, {
                    name: 'InBlock_Elements',
                    bmp: "\u2580-\u259F"
                }, {
                    name: 'InBopomofo',
                    bmp: "\u3100-\u312F"
                }, {
                    name: 'InBopomofo_Extended',
                    bmp: "\u31A0-\u31BF"
                }, {
                    name: 'InBox_Drawing',
                    bmp: "\u2500-\u257F"
                }, {
                    name: 'InBrahmi',
                    astral: "\uD804[\uDC00-\uDC7F]"
                }, {
                    name: 'InBraille_Patterns',
                    bmp: "\u2800-\u28FF"
                }, {
                    name: 'InBuginese',
                    bmp: "\u1A00-\u1A1F"
                }, {
                    name: 'InBuhid',
                    bmp: "\u1740-\u175F"
                }, {
                    name: 'InByzantine_Musical_Symbols',
                    astral: "\uD834[\uDC00-\uDCFF]"
                }, {
                    name: 'InCJK_Compatibility',
                    bmp: "\u3300-\u33FF"
                }, {
                    name: 'InCJK_Compatibility_Forms',
                    bmp: "\uFE30-\uFE4F"
                }, {
                    name: 'InCJK_Compatibility_Ideographs',
                    bmp: "\uF900-\uFAFF"
                }, {
                    name: 'InCJK_Compatibility_Ideographs_Supplement',
                    astral: "\uD87E[\uDC00-\uDE1F]"
                }, {
                    name: 'InCJK_Radicals_Supplement',
                    bmp: "\u2E80-\u2EFF"
                }, {
                    name: 'InCJK_Strokes',
                    bmp: "\u31C0-\u31EF"
                }, {
                    name: 'InCJK_Symbols_and_Punctuation',
                    bmp: "\u3000-\u303F"
                }, {
                    name: 'InCJK_Unified_Ideographs',
                    bmp: "\u4E00-\u9FFF"
                }, {
                    name: 'InCJK_Unified_Ideographs_Extension_A',
                    bmp: "\u3400-\u4DBF"
                }, {
                    name: 'InCJK_Unified_Ideographs_Extension_B',
                    astral: "[\uD840-\uD868][\uDC00-\uDFFF]|\uD869[\uDC00-\uDEDF]"
                }, {
                    name: 'InCJK_Unified_Ideographs_Extension_C',
                    astral: "\uD869[\uDF00-\uDFFF]|[\uD86A-\uD86C][\uDC00-\uDFFF]|\uD86D[\uDC00-\uDF3F]"
                }, {
                    name: 'InCJK_Unified_Ideographs_Extension_D',
                    astral: "\uD86D[\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1F]"
                }, {
                    name: 'InCJK_Unified_Ideographs_Extension_E',
                    astral: "\uD86E[\uDC20-\uDFFF]|[\uD86F-\uD872][\uDC00-\uDFFF]|\uD873[\uDC00-\uDEAF]"
                }, {
                    name: 'InCarian',
                    astral: "\uD800[\uDEA0-\uDEDF]"
                }, {
                    name: 'InCaucasian_Albanian',
                    astral: "\uD801[\uDD30-\uDD6F]"
                }, {
                    name: 'InChakma',
                    astral: "\uD804[\uDD00-\uDD4F]"
                }, {
                    name: 'InCham',
                    bmp: "\uAA00-\uAA5F"
                }, {
                    name: 'InCherokee',
                    bmp: "\u13A0-\u13FF"
                }, {
                    name: 'InCherokee_Supplement',
                    bmp: "\uAB70-\uABBF"
                }, {
                    name: 'InCombining_Diacritical_Marks',
                    bmp: "\u0300-\u036F"
                }, {
                    name: 'InCombining_Diacritical_Marks_Extended',
                    bmp: "\u1AB0-\u1AFF"
                }, {
                    name: 'InCombining_Diacritical_Marks_Supplement',
                    bmp: "\u1DC0-\u1DFF"
                }, {
                    name: 'InCombining_Diacritical_Marks_for_Symbols',
                    bmp: "\u20D0-\u20FF"
                }, {
                    name: 'InCombining_Half_Marks',
                    bmp: "\uFE20-\uFE2F"
                }, {
                    name: 'InCommon_Indic_Number_Forms',
                    bmp: "\uA830-\uA83F"
                }, {
                    name: 'InControl_Pictures',
                    bmp: "\u2400-\u243F"
                }, {
                    name: 'InCoptic',
                    bmp: "\u2C80-\u2CFF"
                }, {
                    name: 'InCoptic_Epact_Numbers',
                    astral: "\uD800[\uDEE0-\uDEFF]"
                }, {
                    name: 'InCounting_Rod_Numerals',
                    astral: "\uD834[\uDF60-\uDF7F]"
                }, {
                    name: 'InCuneiform',
                    astral: "\uD808[\uDC00-\uDFFF]"
                }, {
                    name: 'InCuneiform_Numbers_and_Punctuation',
                    astral: "\uD809[\uDC00-\uDC7F]"
                }, {
                    name: 'InCurrency_Symbols',
                    bmp: "\u20A0-\u20CF"
                }, {
                    name: 'InCypriot_Syllabary',
                    astral: "\uD802[\uDC00-\uDC3F]"
                }, {
                    name: 'InCyrillic',
                    bmp: "\u0400-\u04FF"
                }, {
                    name: 'InCyrillic_Extended_A',
                    bmp: "\u2DE0-\u2DFF"
                }, {
                    name: 'InCyrillic_Extended_B',
                    bmp: "\uA640-\uA69F"
                }, {
                    name: 'InCyrillic_Extended_C',
                    bmp: "\u1C80-\u1C8F"
                }, {
                    name: 'InCyrillic_Supplement',
                    bmp: "\u0500-\u052F"
                }, {
                    name: 'InDeseret',
                    astral: "\uD801[\uDC00-\uDC4F]"
                }, {
                    name: 'InDevanagari',
                    bmp: "\u0900-\u097F"
                }, {
                    name: 'InDevanagari_Extended',
                    bmp: "\uA8E0-\uA8FF"
                }, {
                    name: 'InDingbats',
                    bmp: "\u2700-\u27BF"
                }, {
                    name: 'InDomino_Tiles',
                    astral: "\uD83C[\uDC30-\uDC9F]"
                }, {
                    name: 'InDuployan',
                    astral: "\uD82F[\uDC00-\uDC9F]"
                }, {
                    name: 'InEarly_Dynastic_Cuneiform',
                    astral: "\uD809[\uDC80-\uDD4F]"
                }, {
                    name: 'InEgyptian_Hieroglyphs',
                    astral: "\uD80C[\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2F]"
                }, {
                    name: 'InElbasan',
                    astral: "\uD801[\uDD00-\uDD2F]"
                }, {
                    name: 'InEmoticons',
                    astral: "\uD83D[\uDE00-\uDE4F]"
                }, {
                    name: 'InEnclosed_Alphanumeric_Supplement',
                    astral: "\uD83C[\uDD00-\uDDFF]"
                }, {
                    name: 'InEnclosed_Alphanumerics',
                    bmp: "\u2460-\u24FF"
                }, {
                    name: 'InEnclosed_CJK_Letters_and_Months',
                    bmp: "\u3200-\u32FF"
                }, {
                    name: 'InEnclosed_Ideographic_Supplement',
                    astral: "\uD83C[\uDE00-\uDEFF]"
                }, {
                    name: 'InEthiopic',
                    bmp: "\u1200-\u137F"
                }, {
                    name: 'InEthiopic_Extended',
                    bmp: "\u2D80-\u2DDF"
                }, {
                    name: 'InEthiopic_Extended_A',
                    bmp: "\uAB00-\uAB2F"
                }, {
                    name: 'InEthiopic_Supplement',
                    bmp: "\u1380-\u139F"
                }, {
                    name: 'InGeneral_Punctuation',
                    bmp: "\u2000-\u206F"
                }, {
                    name: 'InGeometric_Shapes',
                    bmp: "\u25A0-\u25FF"
                }, {
                    name: 'InGeometric_Shapes_Extended',
                    astral: "\uD83D[\uDF80-\uDFFF]"
                }, {
                    name: 'InGeorgian',
                    bmp: "\u10A0-\u10FF"
                }, {
                    name: 'InGeorgian_Supplement',
                    bmp: "\u2D00-\u2D2F"
                }, {
                    name: 'InGlagolitic',
                    bmp: "\u2C00-\u2C5F"
                }, {
                    name: 'InGlagolitic_Supplement',
                    astral: "\uD838[\uDC00-\uDC2F]"
                }, {
                    name: 'InGothic',
                    astral: "\uD800[\uDF30-\uDF4F]"
                }, {
                    name: 'InGrantha',
                    astral: "\uD804[\uDF00-\uDF7F]"
                }, {
                    name: 'InGreek_Extended',
                    bmp: "\u1F00-\u1FFF"
                }, {
                    name: 'InGreek_and_Coptic',
                    bmp: "\u0370-\u03FF"
                }, {
                    name: 'InGujarati',
                    bmp: "\u0A80-\u0AFF"
                }, {
                    name: 'InGurmukhi',
                    bmp: "\u0A00-\u0A7F"
                }, {
                    name: 'InHalfwidth_and_Fullwidth_Forms',
                    bmp: "\uFF00-\uFFEF"
                }, {
                    name: 'InHangul_Compatibility_Jamo',
                    bmp: "\u3130-\u318F"
                }, {
                    name: 'InHangul_Jamo',
                    bmp: "\u1100-\u11FF"
                }, {
                    name: 'InHangul_Jamo_Extended_A',
                    bmp: "\uA960-\uA97F"
                }, {
                    name: 'InHangul_Jamo_Extended_B',
                    bmp: "\uD7B0-\uD7FF"
                }, {
                    name: 'InHangul_Syllables',
                    bmp: "\uAC00-\uD7AF"
                }, {
                    name: 'InHanunoo',
                    bmp: "\u1720-\u173F"
                }, {
                    name: 'InHatran',
                    astral: "\uD802[\uDCE0-\uDCFF]"
                }, {
                    name: 'InHebrew',
                    bmp: "\u0590-\u05FF"
                }, {
                    name: 'InHigh_Private_Use_Surrogates',
                    bmp: "\uDB80-\uDBFF"
                }, {
                    name: 'InHigh_Surrogates',
                    bmp: "\uD800-\uDB7F"
                }, {
                    name: 'InHiragana',
                    bmp: "\u3040-\u309F"
                }, {
                    name: 'InIPA_Extensions',
                    bmp: "\u0250-\u02AF"
                }, {
                    name: 'InIdeographic_Description_Characters',
                    bmp: "\u2FF0-\u2FFF"
                }, {
                    name: 'InIdeographic_Symbols_and_Punctuation',
                    astral: "\uD81B[\uDFE0-\uDFFF]"
                }, {
                    name: 'InImperial_Aramaic',
                    astral: "\uD802[\uDC40-\uDC5F]"
                }, {
                    name: 'InInscriptional_Pahlavi',
                    astral: "\uD802[\uDF60-\uDF7F]"
                }, {
                    name: 'InInscriptional_Parthian',
                    astral: "\uD802[\uDF40-\uDF5F]"
                }, {
                    name: 'InJavanese',
                    bmp: "\uA980-\uA9DF"
                }, {
                    name: 'InKaithi',
                    astral: "\uD804[\uDC80-\uDCCF]"
                }, {
                    name: 'InKana_Supplement',
                    astral: "\uD82C[\uDC00-\uDCFF]"
                }, {
                    name: 'InKanbun',
                    bmp: "\u3190-\u319F"
                }, {
                    name: 'InKangxi_Radicals',
                    bmp: "\u2F00-\u2FDF"
                }, {
                    name: 'InKannada',
                    bmp: "\u0C80-\u0CFF"
                }, {
                    name: 'InKatakana',
                    bmp: "\u30A0-\u30FF"
                }, {
                    name: 'InKatakana_Phonetic_Extensions',
                    bmp: "\u31F0-\u31FF"
                }, {
                    name: 'InKayah_Li',
                    bmp: "\uA900-\uA92F"
                }, {
                    name: 'InKharoshthi',
                    astral: "\uD802[\uDE00-\uDE5F]"
                }, {
                    name: 'InKhmer',
                    bmp: "\u1780-\u17FF"
                }, {
                    name: 'InKhmer_Symbols',
                    bmp: "\u19E0-\u19FF"
                }, {
                    name: 'InKhojki',
                    astral: "\uD804[\uDE00-\uDE4F]"
                }, {
                    name: 'InKhudawadi',
                    astral: "\uD804[\uDEB0-\uDEFF]"
                }, {
                    name: 'InLao',
                    bmp: "\u0E80-\u0EFF"
                }, {
                    name: 'InLatin_Extended_Additional',
                    bmp: "\u1E00-\u1EFF"
                }, {
                    name: 'InLatin_Extended_A',
                    bmp: "\u0100-\u017F"
                }, {
                    name: 'InLatin_Extended_B',
                    bmp: "\u0180-\u024F"
                }, {
                    name: 'InLatin_Extended_C',
                    bmp: "\u2C60-\u2C7F"
                }, {
                    name: 'InLatin_Extended_D',
                    bmp: "\uA720-\uA7FF"
                }, {
                    name: 'InLatin_Extended_E',
                    bmp: "\uAB30-\uAB6F"
                }, {
                    name: 'InLatin_1_Supplement',
                    bmp: '\x80-\xFF'
                }, {
                    name: 'InLepcha',
                    bmp: "\u1C00-\u1C4F"
                }, {
                    name: 'InLetterlike_Symbols',
                    bmp: "\u2100-\u214F"
                }, {
                    name: 'InLimbu',
                    bmp: "\u1900-\u194F"
                }, {
                    name: 'InLinear_A',
                    astral: "\uD801[\uDE00-\uDF7F]"
                }, {
                    name: 'InLinear_B_Ideograms',
                    astral: "\uD800[\uDC80-\uDCFF]"
                }, {
                    name: 'InLinear_B_Syllabary',
                    astral: "\uD800[\uDC00-\uDC7F]"
                }, {
                    name: 'InLisu',
                    bmp: "\uA4D0-\uA4FF"
                }, {
                    name: 'InLow_Surrogates',
                    bmp: "\uDC00-\uDFFF"
                }, {
                    name: 'InLycian',
                    astral: "\uD800[\uDE80-\uDE9F]"
                }, {
                    name: 'InLydian',
                    astral: "\uD802[\uDD20-\uDD3F]"
                }, {
                    name: 'InMahajani',
                    astral: "\uD804[\uDD50-\uDD7F]"
                }, {
                    name: 'InMahjong_Tiles',
                    astral: "\uD83C[\uDC00-\uDC2F]"
                }, {
                    name: 'InMalayalam',
                    bmp: "\u0D00-\u0D7F"
                }, {
                    name: 'InMandaic',
                    bmp: "\u0840-\u085F"
                }, {
                    name: 'InManichaean',
                    astral: "\uD802[\uDEC0-\uDEFF]"
                }, {
                    name: 'InMarchen',
                    astral: "\uD807[\uDC70-\uDCBF]"
                }, {
                    name: 'InMathematical_Alphanumeric_Symbols',
                    astral: "\uD835[\uDC00-\uDFFF]"
                }, {
                    name: 'InMathematical_Operators',
                    bmp: "\u2200-\u22FF"
                }, {
                    name: 'InMeetei_Mayek',
                    bmp: "\uABC0-\uABFF"
                }, {
                    name: 'InMeetei_Mayek_Extensions',
                    bmp: "\uAAE0-\uAAFF"
                }, {
                    name: 'InMende_Kikakui',
                    astral: "\uD83A[\uDC00-\uDCDF]"
                }, {
                    name: 'InMeroitic_Cursive',
                    astral: "\uD802[\uDDA0-\uDDFF]"
                }, {
                    name: 'InMeroitic_Hieroglyphs',
                    astral: "\uD802[\uDD80-\uDD9F]"
                }, {
                    name: 'InMiao',
                    astral: "\uD81B[\uDF00-\uDF9F]"
                }, {
                    name: 'InMiscellaneous_Mathematical_Symbols_A',
                    bmp: "\u27C0-\u27EF"
                }, {
                    name: 'InMiscellaneous_Mathematical_Symbols_B',
                    bmp: "\u2980-\u29FF"
                }, {
                    name: 'InMiscellaneous_Symbols',
                    bmp: "\u2600-\u26FF"
                }, {
                    name: 'InMiscellaneous_Symbols_and_Arrows',
                    bmp: "\u2B00-\u2BFF"
                }, {
                    name: 'InMiscellaneous_Symbols_and_Pictographs',
                    astral: "\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF]"
                }, {
                    name: 'InMiscellaneous_Technical',
                    bmp: "\u2300-\u23FF"
                }, {
                    name: 'InModi',
                    astral: "\uD805[\uDE00-\uDE5F]"
                }, {
                    name: 'InModifier_Tone_Letters',
                    bmp: "\uA700-\uA71F"
                }, {
                    name: 'InMongolian',
                    bmp: "\u1800-\u18AF"
                }, {
                    name: 'InMongolian_Supplement',
                    astral: "\uD805[\uDE60-\uDE7F]"
                }, {
                    name: 'InMro',
                    astral: "\uD81A[\uDE40-\uDE6F]"
                }, {
                    name: 'InMultani',
                    astral: "\uD804[\uDE80-\uDEAF]"
                }, {
                    name: 'InMusical_Symbols',
                    astral: "\uD834[\uDD00-\uDDFF]"
                }, {
                    name: 'InMyanmar',
                    bmp: "\u1000-\u109F"
                }, {
                    name: 'InMyanmar_Extended_A',
                    bmp: "\uAA60-\uAA7F"
                }, {
                    name: 'InMyanmar_Extended_B',
                    bmp: "\uA9E0-\uA9FF"
                }, {
                    name: 'InNKo',
                    bmp: "\u07C0-\u07FF"
                }, {
                    name: 'InNabataean',
                    astral: "\uD802[\uDC80-\uDCAF]"
                }, {
                    name: 'InNew_Tai_Lue',
                    bmp: "\u1980-\u19DF"
                }, {
                    name: 'InNewa',
                    astral: "\uD805[\uDC00-\uDC7F]"
                }, {
                    name: 'InNumber_Forms',
                    bmp: "\u2150-\u218F"
                }, {
                    name: 'InOgham',
                    bmp: "\u1680-\u169F"
                }, {
                    name: 'InOl_Chiki',
                    bmp: "\u1C50-\u1C7F"
                }, {
                    name: 'InOld_Hungarian',
                    astral: "\uD803[\uDC80-\uDCFF]"
                }, {
                    name: 'InOld_Italic',
                    astral: "\uD800[\uDF00-\uDF2F]"
                }, {
                    name: 'InOld_North_Arabian',
                    astral: "\uD802[\uDE80-\uDE9F]"
                }, {
                    name: 'InOld_Permic',
                    astral: "\uD800[\uDF50-\uDF7F]"
                }, {
                    name: 'InOld_Persian',
                    astral: "\uD800[\uDFA0-\uDFDF]"
                }, {
                    name: 'InOld_South_Arabian',
                    astral: "\uD802[\uDE60-\uDE7F]"
                }, {
                    name: 'InOld_Turkic',
                    astral: "\uD803[\uDC00-\uDC4F]"
                }, {
                    name: 'InOptical_Character_Recognition',
                    bmp: "\u2440-\u245F"
                }, {
                    name: 'InOriya',
                    bmp: "\u0B00-\u0B7F"
                }, {
                    name: 'InOrnamental_Dingbats',
                    astral: "\uD83D[\uDE50-\uDE7F]"
                }, {
                    name: 'InOsage',
                    astral: "\uD801[\uDCB0-\uDCFF]"
                }, {
                    name: 'InOsmanya',
                    astral: "\uD801[\uDC80-\uDCAF]"
                }, {
                    name: 'InPahawh_Hmong',
                    astral: "\uD81A[\uDF00-\uDF8F]"
                }, {
                    name: 'InPalmyrene',
                    astral: "\uD802[\uDC60-\uDC7F]"
                }, {
                    name: 'InPau_Cin_Hau',
                    astral: "\uD806[\uDEC0-\uDEFF]"
                }, {
                    name: 'InPhags_pa',
                    bmp: "\uA840-\uA87F"
                }, {
                    name: 'InPhaistos_Disc',
                    astral: "\uD800[\uDDD0-\uDDFF]"
                }, {
                    name: 'InPhoenician',
                    astral: "\uD802[\uDD00-\uDD1F]"
                }, {
                    name: 'InPhonetic_Extensions',
                    bmp: "\u1D00-\u1D7F"
                }, {
                    name: 'InPhonetic_Extensions_Supplement',
                    bmp: "\u1D80-\u1DBF"
                }, {
                    name: 'InPlaying_Cards',
                    astral: "\uD83C[\uDCA0-\uDCFF]"
                }, {
                    name: 'InPrivate_Use_Area',
                    bmp: "\uE000-\uF8FF"
                }, {
                    name: 'InPsalter_Pahlavi',
                    astral: "\uD802[\uDF80-\uDFAF]"
                }, {
                    name: 'InRejang',
                    bmp: "\uA930-\uA95F"
                }, {
                    name: 'InRumi_Numeral_Symbols',
                    astral: "\uD803[\uDE60-\uDE7F]"
                }, {
                    name: 'InRunic',
                    bmp: "\u16A0-\u16FF"
                }, {
                    name: 'InSamaritan',
                    bmp: "\u0800-\u083F"
                }, {
                    name: 'InSaurashtra',
                    bmp: "\uA880-\uA8DF"
                }, {
                    name: 'InSharada',
                    astral: "\uD804[\uDD80-\uDDDF]"
                }, {
                    name: 'InShavian',
                    astral: "\uD801[\uDC50-\uDC7F]"
                }, {
                    name: 'InShorthand_Format_Controls',
                    astral: "\uD82F[\uDCA0-\uDCAF]"
                }, {
                    name: 'InSiddham',
                    astral: "\uD805[\uDD80-\uDDFF]"
                }, {
                    name: 'InSinhala',
                    bmp: "\u0D80-\u0DFF"
                }, {
                    name: 'InSinhala_Archaic_Numbers',
                    astral: "\uD804[\uDDE0-\uDDFF]"
                }, {
                    name: 'InSmall_Form_Variants',
                    bmp: "\uFE50-\uFE6F"
                }, {
                    name: 'InSora_Sompeng',
                    astral: "\uD804[\uDCD0-\uDCFF]"
                }, {
                    name: 'InSpacing_Modifier_Letters',
                    bmp: "\u02B0-\u02FF"
                }, {
                    name: 'InSpecials',
                    bmp: "\uFFF0-\uFFFF"
                }, {
                    name: 'InSundanese',
                    bmp: "\u1B80-\u1BBF"
                }, {
                    name: 'InSundanese_Supplement',
                    bmp: "\u1CC0-\u1CCF"
                }, {
                    name: 'InSuperscripts_and_Subscripts',
                    bmp: "\u2070-\u209F"
                }, {
                    name: 'InSupplemental_Arrows_A',
                    bmp: "\u27F0-\u27FF"
                }, {
                    name: 'InSupplemental_Arrows_B',
                    bmp: "\u2900-\u297F"
                }, {
                    name: 'InSupplemental_Arrows_C',
                    astral: "\uD83E[\uDC00-\uDCFF]"
                }, {
                    name: 'InSupplemental_Mathematical_Operators',
                    bmp: "\u2A00-\u2AFF"
                }, {
                    name: 'InSupplemental_Punctuation',
                    bmp: "\u2E00-\u2E7F"
                }, {
                    name: 'InSupplemental_Symbols_and_Pictographs',
                    astral: "\uD83E[\uDD00-\uDDFF]"
                }, {
                    name: 'InSupplementary_Private_Use_Area_A',
                    astral: "[\uDB80-\uDBBF][\uDC00-\uDFFF]"
                }, {
                    name: 'InSupplementary_Private_Use_Area_B',
                    astral: "[\uDBC0-\uDBFF][\uDC00-\uDFFF]"
                }, {
                    name: 'InSutton_SignWriting',
                    astral: "\uD836[\uDC00-\uDEAF]"
                }, {
                    name: 'InSyloti_Nagri',
                    bmp: "\uA800-\uA82F"
                }, {
                    name: 'InSyriac',
                    bmp: "\u0700-\u074F"
                }, {
                    name: 'InTagalog',
                    bmp: "\u1700-\u171F"
                }, {
                    name: 'InTagbanwa',
                    bmp: "\u1760-\u177F"
                }, {
                    name: 'InTags',
                    astral: "\uDB40[\uDC00-\uDC7F]"
                }, {
                    name: 'InTai_Le',
                    bmp: "\u1950-\u197F"
                }, {
                    name: 'InTai_Tham',
                    bmp: "\u1A20-\u1AAF"
                }, {
                    name: 'InTai_Viet',
                    bmp: "\uAA80-\uAADF"
                }, {
                    name: 'InTai_Xuan_Jing_Symbols',
                    astral: "\uD834[\uDF00-\uDF5F]"
                }, {
                    name: 'InTakri',
                    astral: "\uD805[\uDE80-\uDECF]"
                }, {
                    name: 'InTamil',
                    bmp: "\u0B80-\u0BFF"
                }, {
                    name: 'InTangut',
                    astral: "[\uD81C-\uD821][\uDC00-\uDFFF]"
                }, {
                    name: 'InTangut_Components',
                    astral: "\uD822[\uDC00-\uDEFF]"
                }, {
                    name: 'InTelugu',
                    bmp: "\u0C00-\u0C7F"
                }, {
                    name: 'InThaana',
                    bmp: "\u0780-\u07BF"
                }, {
                    name: 'InThai',
                    bmp: "\u0E00-\u0E7F"
                }, {
                    name: 'InTibetan',
                    bmp: "\u0F00-\u0FFF"
                }, {
                    name: 'InTifinagh',
                    bmp: "\u2D30-\u2D7F"
                }, {
                    name: 'InTirhuta',
                    astral: "\uD805[\uDC80-\uDCDF]"
                }, {
                    name: 'InTransport_and_Map_Symbols',
                    astral: "\uD83D[\uDE80-\uDEFF]"
                }, {
                    name: 'InUgaritic',
                    astral: "\uD800[\uDF80-\uDF9F]"
                }, {
                    name: 'InUnified_Canadian_Aboriginal_Syllabics',
                    bmp: "\u1400-\u167F"
                }, {
                    name: 'InUnified_Canadian_Aboriginal_Syllabics_Extended',
                    bmp: "\u18B0-\u18FF"
                }, {
                    name: 'InVai',
                    bmp: "\uA500-\uA63F"
                }, {
                    name: 'InVariation_Selectors',
                    bmp: "\uFE00-\uFE0F"
                }, {
                    name: 'InVariation_Selectors_Supplement',
                    astral: "\uDB40[\uDD00-\uDDEF]"
                }, {
                    name: 'InVedic_Extensions',
                    bmp: "\u1CD0-\u1CFF"
                }, {
                    name: 'InVertical_Forms',
                    bmp: "\uFE10-\uFE1F"
                }, {
                    name: 'InWarang_Citi',
                    astral: "\uD806[\uDCA0-\uDCFF]"
                }, {
                    name: 'InYi_Radicals',
                    bmp: "\uA490-\uA4CF"
                }, {
                    name: 'InYi_Syllables',
                    bmp: "\uA000-\uA48F"
                }, {
                    name: 'InYijing_Hexagram_Symbols',
                    bmp: "\u4DC0-\u4DFF"
                }]);
            };

            module.exports = exports['default'];
        }, {}], 5: [function (require, module, exports) {
            'use strict';

            Object.defineProperty(exports, "__esModule", {
                value: true
            });

            /*!
             * XRegExp Unicode Categories 4.0.0
             * <xregexp.com>
             * Steven Levithan (c) 2010-2017 MIT License
             * Unicode data by Mathias Bynens <mathiasbynens.be>
             */

            exports.default = function (XRegExp) {

                /**
                 * Adds support for Unicode's general categories. E.g., `\p{Lu}` or `\p{Uppercase Letter}`. See
                 * category descriptions in UAX #44 <http://unicode.org/reports/tr44/#GC_Values_Table>. Token
                 * names are case insensitive, and any spaces, hyphens, and underscores are ignored.
                 *
                 * Uses Unicode 9.0.0.
                 *
                 * @requires XRegExp, Unicode Base
                 */

                if (!XRegExp.addUnicodeData) {
                    throw new ReferenceError('Unicode Base must be loaded before Unicode Categories');
                }

                XRegExp.addUnicodeData([{
                    name: 'C',
                    alias: 'Other',
                    isBmpLast: true,
                    bmp: "\0-\x1F\x7F-\x9F\xAD\u0378\u0379\u0380-\u0383\u038B\u038D\u03A2\u0530\u0557\u0558\u0560\u0588\u058B\u058C\u0590\u05C8-\u05CF\u05EB-\u05EF\u05F5-\u0605\u061C\u061D\u06DD\u070E\u070F\u074B\u074C\u07B2-\u07BF\u07FB-\u07FF\u082E\u082F\u083F\u085C\u085D\u085F-\u089F\u08B5\u08BE-\u08D3\u08E2\u0984\u098D\u098E\u0991\u0992\u09A9\u09B1\u09B3-\u09B5\u09BA\u09BB\u09C5\u09C6\u09C9\u09CA\u09CF-\u09D6\u09D8-\u09DB\u09DE\u09E4\u09E5\u09FC-\u0A00\u0A04\u0A0B-\u0A0E\u0A11\u0A12\u0A29\u0A31\u0A34\u0A37\u0A3A\u0A3B\u0A3D\u0A43-\u0A46\u0A49\u0A4A\u0A4E-\u0A50\u0A52-\u0A58\u0A5D\u0A5F-\u0A65\u0A76-\u0A80\u0A84\u0A8E\u0A92\u0AA9\u0AB1\u0AB4\u0ABA\u0ABB\u0AC6\u0ACA\u0ACE\u0ACF\u0AD1-\u0ADF\u0AE4\u0AE5\u0AF2-\u0AF8\u0AFA-\u0B00\u0B04\u0B0D\u0B0E\u0B11\u0B12\u0B29\u0B31\u0B34\u0B3A\u0B3B\u0B45\u0B46\u0B49\u0B4A\u0B4E-\u0B55\u0B58-\u0B5B\u0B5E\u0B64\u0B65\u0B78-\u0B81\u0B84\u0B8B-\u0B8D\u0B91\u0B96-\u0B98\u0B9B\u0B9D\u0BA0-\u0BA2\u0BA5-\u0BA7\u0BAB-\u0BAD\u0BBA-\u0BBD\u0BC3-\u0BC5\u0BC9\u0BCE\u0BCF\u0BD1-\u0BD6\u0BD8-\u0BE5\u0BFB-\u0BFF\u0C04\u0C0D\u0C11\u0C29\u0C3A-\u0C3C\u0C45\u0C49\u0C4E-\u0C54\u0C57\u0C5B-\u0C5F\u0C64\u0C65\u0C70-\u0C77\u0C84\u0C8D\u0C91\u0CA9\u0CB4\u0CBA\u0CBB\u0CC5\u0CC9\u0CCE-\u0CD4\u0CD7-\u0CDD\u0CDF\u0CE4\u0CE5\u0CF0\u0CF3-\u0D00\u0D04\u0D0D\u0D11\u0D3B\u0D3C\u0D45\u0D49\u0D50-\u0D53\u0D64\u0D65\u0D80\u0D81\u0D84\u0D97-\u0D99\u0DB2\u0DBC\u0DBE\u0DBF\u0DC7-\u0DC9\u0DCB-\u0DCE\u0DD5\u0DD7\u0DE0-\u0DE5\u0DF0\u0DF1\u0DF5-\u0E00\u0E3B-\u0E3E\u0E5C-\u0E80\u0E83\u0E85\u0E86\u0E89\u0E8B\u0E8C\u0E8E-\u0E93\u0E98\u0EA0\u0EA4\u0EA6\u0EA8\u0EA9\u0EAC\u0EBA\u0EBE\u0EBF\u0EC5\u0EC7\u0ECE\u0ECF\u0EDA\u0EDB\u0EE0-\u0EFF\u0F48\u0F6D-\u0F70\u0F98\u0FBD\u0FCD\u0FDB-\u0FFF\u10C6\u10C8-\u10CC\u10CE\u10CF\u1249\u124E\u124F\u1257\u1259\u125E\u125F\u1289\u128E\u128F\u12B1\u12B6\u12B7\u12BF\u12C1\u12C6\u12C7\u12D7\u1311\u1316\u1317\u135B\u135C\u137D-\u137F\u139A-\u139F\u13F6\u13F7\u13FE\u13FF\u169D-\u169F\u16F9-\u16FF\u170D\u1715-\u171F\u1737-\u173F\u1754-\u175F\u176D\u1771\u1774-\u177F\u17DE\u17DF\u17EA-\u17EF\u17FA-\u17FF\u180E\u180F\u181A-\u181F\u1878-\u187F\u18AB-\u18AF\u18F6-\u18FF\u191F\u192C-\u192F\u193C-\u193F\u1941-\u1943\u196E\u196F\u1975-\u197F\u19AC-\u19AF\u19CA-\u19CF\u19DB-\u19DD\u1A1C\u1A1D\u1A5F\u1A7D\u1A7E\u1A8A-\u1A8F\u1A9A-\u1A9F\u1AAE\u1AAF\u1ABF-\u1AFF\u1B4C-\u1B4F\u1B7D-\u1B7F\u1BF4-\u1BFB\u1C38-\u1C3A\u1C4A-\u1C4C\u1C89-\u1CBF\u1CC8-\u1CCF\u1CF7\u1CFA-\u1CFF\u1DF6-\u1DFA\u1F16\u1F17\u1F1E\u1F1F\u1F46\u1F47\u1F4E\u1F4F\u1F58\u1F5A\u1F5C\u1F5E\u1F7E\u1F7F\u1FB5\u1FC5\u1FD4\u1FD5\u1FDC\u1FF0\u1FF1\u1FF5\u1FFF\u200B-\u200F\u202A-\u202E\u2060-\u206F\u2072\u2073\u208F\u209D-\u209F\u20BF-\u20CF\u20F1-\u20FF\u218C-\u218F\u23FF\u2427-\u243F\u244B-\u245F\u2B74\u2B75\u2B96\u2B97\u2BBA-\u2BBC\u2BC9\u2BD2-\u2BEB\u2BF0-\u2BFF\u2C2F\u2C5F\u2CF4-\u2CF8\u2D26\u2D28-\u2D2C\u2D2E\u2D2F\u2D68-\u2D6E\u2D71-\u2D7E\u2D97-\u2D9F\u2DA7\u2DAF\u2DB7\u2DBF\u2DC7\u2DCF\u2DD7\u2DDF\u2E45-\u2E7F\u2E9A\u2EF4-\u2EFF\u2FD6-\u2FEF\u2FFC-\u2FFF\u3040\u3097\u3098\u3100-\u3104\u312E-\u3130\u318F\u31BB-\u31BF\u31E4-\u31EF\u321F\u32FF\u4DB6-\u4DBF\u9FD6-\u9FFF\uA48D-\uA48F\uA4C7-\uA4CF\uA62C-\uA63F\uA6F8-\uA6FF\uA7AF\uA7B8-\uA7F6\uA82C-\uA82F\uA83A-\uA83F\uA878-\uA87F\uA8C6-\uA8CD\uA8DA-\uA8DF\uA8FE\uA8FF\uA954-\uA95E\uA97D-\uA97F\uA9CE\uA9DA-\uA9DD\uA9FF\uAA37-\uAA3F\uAA4E\uAA4F\uAA5A\uAA5B\uAAC3-\uAADA\uAAF7-\uAB00\uAB07\uAB08\uAB0F\uAB10\uAB17-\uAB1F\uAB27\uAB2F\uAB66-\uAB6F\uABEE\uABEF\uABFA-\uABFF\uD7A4-\uD7AF\uD7C7-\uD7CA\uD7FC-\uF8FF\uFA6E\uFA6F\uFADA-\uFAFF\uFB07-\uFB12\uFB18-\uFB1C\uFB37\uFB3D\uFB3F\uFB42\uFB45\uFBC2-\uFBD2\uFD40-\uFD4F\uFD90\uFD91\uFDC8-\uFDEF\uFDFE\uFDFF\uFE1A-\uFE1F\uFE53\uFE67\uFE6C-\uFE6F\uFE75\uFEFD-\uFF00\uFFBF-\uFFC1\uFFC8\uFFC9\uFFD0\uFFD1\uFFD8\uFFD9\uFFDD-\uFFDF\uFFE7\uFFEF-\uFFFB\uFFFE\uFFFF",
                    astral: "\uD800[\uDC0C\uDC27\uDC3B\uDC3E\uDC4E\uDC4F\uDC5E-\uDC7F\uDCFB-\uDCFF\uDD03-\uDD06\uDD34-\uDD36\uDD8F\uDD9C-\uDD9F\uDDA1-\uDDCF\uDDFE-\uDE7F\uDE9D-\uDE9F\uDED1-\uDEDF\uDEFC-\uDEFF\uDF24-\uDF2F\uDF4B-\uDF4F\uDF7B-\uDF7F\uDF9E\uDFC4-\uDFC7\uDFD6-\uDFFF]|\uD801[\uDC9E\uDC9F\uDCAA-\uDCAF\uDCD4-\uDCD7\uDCFC-\uDCFF\uDD28-\uDD2F\uDD64-\uDD6E\uDD70-\uDDFF\uDF37-\uDF3F\uDF56-\uDF5F\uDF68-\uDFFF]|\uD802[\uDC06\uDC07\uDC09\uDC36\uDC39-\uDC3B\uDC3D\uDC3E\uDC56\uDC9F-\uDCA6\uDCB0-\uDCDF\uDCF3\uDCF6-\uDCFA\uDD1C-\uDD1E\uDD3A-\uDD3E\uDD40-\uDD7F\uDDB8-\uDDBB\uDDD0\uDDD1\uDE04\uDE07-\uDE0B\uDE14\uDE18\uDE34-\uDE37\uDE3B-\uDE3E\uDE48-\uDE4F\uDE59-\uDE5F\uDEA0-\uDEBF\uDEE7-\uDEEA\uDEF7-\uDEFF\uDF36-\uDF38\uDF56\uDF57\uDF73-\uDF77\uDF92-\uDF98\uDF9D-\uDFA8\uDFB0-\uDFFF]|\uD803[\uDC49-\uDC7F\uDCB3-\uDCBF\uDCF3-\uDCF9\uDD00-\uDE5F\uDE7F-\uDFFF]|\uD804[\uDC4E-\uDC51\uDC70-\uDC7E\uDCBD\uDCC2-\uDCCF\uDCE9-\uDCEF\uDCFA-\uDCFF\uDD35\uDD44-\uDD4F\uDD77-\uDD7F\uDDCE\uDDCF\uDDE0\uDDF5-\uDDFF\uDE12\uDE3F-\uDE7F\uDE87\uDE89\uDE8E\uDE9E\uDEAA-\uDEAF\uDEEB-\uDEEF\uDEFA-\uDEFF\uDF04\uDF0D\uDF0E\uDF11\uDF12\uDF29\uDF31\uDF34\uDF3A\uDF3B\uDF45\uDF46\uDF49\uDF4A\uDF4E\uDF4F\uDF51-\uDF56\uDF58-\uDF5C\uDF64\uDF65\uDF6D-\uDF6F\uDF75-\uDFFF]|\uD805[\uDC5A\uDC5C\uDC5E-\uDC7F\uDCC8-\uDCCF\uDCDA-\uDD7F\uDDB6\uDDB7\uDDDE-\uDDFF\uDE45-\uDE4F\uDE5A-\uDE5F\uDE6D-\uDE7F\uDEB8-\uDEBF\uDECA-\uDEFF\uDF1A-\uDF1C\uDF2C-\uDF2F\uDF40-\uDFFF]|\uD806[\uDC00-\uDC9F\uDCF3-\uDCFE\uDD00-\uDEBF\uDEF9-\uDFFF]|\uD807[\uDC09\uDC37\uDC46-\uDC4F\uDC6D-\uDC6F\uDC90\uDC91\uDCA8\uDCB7-\uDFFF]|\uD808[\uDF9A-\uDFFF]|\uD809[\uDC6F\uDC75-\uDC7F\uDD44-\uDFFF]|[\uD80A\uD80B\uD80E-\uD810\uD812-\uD819\uD823-\uD82B\uD82D\uD82E\uD830-\uD833\uD837\uD839\uD83F\uD874-\uD87D\uD87F-\uDB3F\uDB41-\uDBFF][\uDC00-\uDFFF]|\uD80D[\uDC2F-\uDFFF]|\uD811[\uDE47-\uDFFF]|\uD81A[\uDE39-\uDE3F\uDE5F\uDE6A-\uDE6D\uDE70-\uDECF\uDEEE\uDEEF\uDEF6-\uDEFF\uDF46-\uDF4F\uDF5A\uDF62\uDF78-\uDF7C\uDF90-\uDFFF]|\uD81B[\uDC00-\uDEFF\uDF45-\uDF4F\uDF7F-\uDF8E\uDFA0-\uDFDF\uDFE1-\uDFFF]|\uD821[\uDFED-\uDFFF]|\uD822[\uDEF3-\uDFFF]|\uD82C[\uDC02-\uDFFF]|\uD82F[\uDC6B-\uDC6F\uDC7D-\uDC7F\uDC89-\uDC8F\uDC9A\uDC9B\uDCA0-\uDFFF]|\uD834[\uDCF6-\uDCFF\uDD27\uDD28\uDD73-\uDD7A\uDDE9-\uDDFF\uDE46-\uDEFF\uDF57-\uDF5F\uDF72-\uDFFF]|\uD835[\uDC55\uDC9D\uDCA0\uDCA1\uDCA3\uDCA4\uDCA7\uDCA8\uDCAD\uDCBA\uDCBC\uDCC4\uDD06\uDD0B\uDD0C\uDD15\uDD1D\uDD3A\uDD3F\uDD45\uDD47-\uDD49\uDD51\uDEA6\uDEA7\uDFCC\uDFCD]|\uD836[\uDE8C-\uDE9A\uDEA0\uDEB0-\uDFFF]|\uD838[\uDC07\uDC19\uDC1A\uDC22\uDC25\uDC2B-\uDFFF]|\uD83A[\uDCC5\uDCC6\uDCD7-\uDCFF\uDD4B-\uDD4F\uDD5A-\uDD5D\uDD60-\uDFFF]|\uD83B[\uDC00-\uDDFF\uDE04\uDE20\uDE23\uDE25\uDE26\uDE28\uDE33\uDE38\uDE3A\uDE3C-\uDE41\uDE43-\uDE46\uDE48\uDE4A\uDE4C\uDE50\uDE53\uDE55\uDE56\uDE58\uDE5A\uDE5C\uDE5E\uDE60\uDE63\uDE65\uDE66\uDE6B\uDE73\uDE78\uDE7D\uDE7F\uDE8A\uDE9C-\uDEA0\uDEA4\uDEAA\uDEBC-\uDEEF\uDEF2-\uDFFF]|\uD83C[\uDC2C-\uDC2F\uDC94-\uDC9F\uDCAF\uDCB0\uDCC0\uDCD0\uDCF6-\uDCFF\uDD0D-\uDD0F\uDD2F\uDD6C-\uDD6F\uDDAD-\uDDE5\uDE03-\uDE0F\uDE3C-\uDE3F\uDE49-\uDE4F\uDE52-\uDEFF]|\uD83D[\uDED3-\uDEDF\uDEED-\uDEEF\uDEF7-\uDEFF\uDF74-\uDF7F\uDFD5-\uDFFF]|\uD83E[\uDC0C-\uDC0F\uDC48-\uDC4F\uDC5A-\uDC5F\uDC88-\uDC8F\uDCAE-\uDD0F\uDD1F\uDD28-\uDD2F\uDD31\uDD32\uDD3F\uDD4C-\uDD4F\uDD5F-\uDD7F\uDD92-\uDDBF\uDDC1-\uDFFF]|\uD869[\uDED7-\uDEFF]|\uD86D[\uDF35-\uDF3F]|\uD86E[\uDC1E\uDC1F]|\uD873[\uDEA2-\uDFFF]|\uD87E[\uDE1E-\uDFFF]|\uDB40[\uDC00-\uDCFF\uDDF0-\uDFFF]"
                }, {
                    name: 'Cc',
                    alias: 'Control',
                    bmp: '\0-\x1F\x7F-\x9F'
                }, {
                    name: 'Cf',
                    alias: 'Format',
                    bmp: "\xAD\u0600-\u0605\u061C\u06DD\u070F\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB",
                    astral: "\uD804\uDCBD|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]"
                }, {
                    name: 'Cn',
                    alias: 'Unassigned',
                    bmp: "\u0378\u0379\u0380-\u0383\u038B\u038D\u03A2\u0530\u0557\u0558\u0560\u0588\u058B\u058C\u0590\u05C8-\u05CF\u05EB-\u05EF\u05F5-\u05FF\u061D\u070E\u074B\u074C\u07B2-\u07BF\u07FB-\u07FF\u082E\u082F\u083F\u085C\u085D\u085F-\u089F\u08B5\u08BE-\u08D3\u0984\u098D\u098E\u0991\u0992\u09A9\u09B1\u09B3-\u09B5\u09BA\u09BB\u09C5\u09C6\u09C9\u09CA\u09CF-\u09D6\u09D8-\u09DB\u09DE\u09E4\u09E5\u09FC-\u0A00\u0A04\u0A0B-\u0A0E\u0A11\u0A12\u0A29\u0A31\u0A34\u0A37\u0A3A\u0A3B\u0A3D\u0A43-\u0A46\u0A49\u0A4A\u0A4E-\u0A50\u0A52-\u0A58\u0A5D\u0A5F-\u0A65\u0A76-\u0A80\u0A84\u0A8E\u0A92\u0AA9\u0AB1\u0AB4\u0ABA\u0ABB\u0AC6\u0ACA\u0ACE\u0ACF\u0AD1-\u0ADF\u0AE4\u0AE5\u0AF2-\u0AF8\u0AFA-\u0B00\u0B04\u0B0D\u0B0E\u0B11\u0B12\u0B29\u0B31\u0B34\u0B3A\u0B3B\u0B45\u0B46\u0B49\u0B4A\u0B4E-\u0B55\u0B58-\u0B5B\u0B5E\u0B64\u0B65\u0B78-\u0B81\u0B84\u0B8B-\u0B8D\u0B91\u0B96-\u0B98\u0B9B\u0B9D\u0BA0-\u0BA2\u0BA5-\u0BA7\u0BAB-\u0BAD\u0BBA-\u0BBD\u0BC3-\u0BC5\u0BC9\u0BCE\u0BCF\u0BD1-\u0BD6\u0BD8-\u0BE5\u0BFB-\u0BFF\u0C04\u0C0D\u0C11\u0C29\u0C3A-\u0C3C\u0C45\u0C49\u0C4E-\u0C54\u0C57\u0C5B-\u0C5F\u0C64\u0C65\u0C70-\u0C77\u0C84\u0C8D\u0C91\u0CA9\u0CB4\u0CBA\u0CBB\u0CC5\u0CC9\u0CCE-\u0CD4\u0CD7-\u0CDD\u0CDF\u0CE4\u0CE5\u0CF0\u0CF3-\u0D00\u0D04\u0D0D\u0D11\u0D3B\u0D3C\u0D45\u0D49\u0D50-\u0D53\u0D64\u0D65\u0D80\u0D81\u0D84\u0D97-\u0D99\u0DB2\u0DBC\u0DBE\u0DBF\u0DC7-\u0DC9\u0DCB-\u0DCE\u0DD5\u0DD7\u0DE0-\u0DE5\u0DF0\u0DF1\u0DF5-\u0E00\u0E3B-\u0E3E\u0E5C-\u0E80\u0E83\u0E85\u0E86\u0E89\u0E8B\u0E8C\u0E8E-\u0E93\u0E98\u0EA0\u0EA4\u0EA6\u0EA8\u0EA9\u0EAC\u0EBA\u0EBE\u0EBF\u0EC5\u0EC7\u0ECE\u0ECF\u0EDA\u0EDB\u0EE0-\u0EFF\u0F48\u0F6D-\u0F70\u0F98\u0FBD\u0FCD\u0FDB-\u0FFF\u10C6\u10C8-\u10CC\u10CE\u10CF\u1249\u124E\u124F\u1257\u1259\u125E\u125F\u1289\u128E\u128F\u12B1\u12B6\u12B7\u12BF\u12C1\u12C6\u12C7\u12D7\u1311\u1316\u1317\u135B\u135C\u137D-\u137F\u139A-\u139F\u13F6\u13F7\u13FE\u13FF\u169D-\u169F\u16F9-\u16FF\u170D\u1715-\u171F\u1737-\u173F\u1754-\u175F\u176D\u1771\u1774-\u177F\u17DE\u17DF\u17EA-\u17EF\u17FA-\u17FF\u180F\u181A-\u181F\u1878-\u187F\u18AB-\u18AF\u18F6-\u18FF\u191F\u192C-\u192F\u193C-\u193F\u1941-\u1943\u196E\u196F\u1975-\u197F\u19AC-\u19AF\u19CA-\u19CF\u19DB-\u19DD\u1A1C\u1A1D\u1A5F\u1A7D\u1A7E\u1A8A-\u1A8F\u1A9A-\u1A9F\u1AAE\u1AAF\u1ABF-\u1AFF\u1B4C-\u1B4F\u1B7D-\u1B7F\u1BF4-\u1BFB\u1C38-\u1C3A\u1C4A-\u1C4C\u1C89-\u1CBF\u1CC8-\u1CCF\u1CF7\u1CFA-\u1CFF\u1DF6-\u1DFA\u1F16\u1F17\u1F1E\u1F1F\u1F46\u1F47\u1F4E\u1F4F\u1F58\u1F5A\u1F5C\u1F5E\u1F7E\u1F7F\u1FB5\u1FC5\u1FD4\u1FD5\u1FDC\u1FF0\u1FF1\u1FF5\u1FFF\u2065\u2072\u2073\u208F\u209D-\u209F\u20BF-\u20CF\u20F1-\u20FF\u218C-\u218F\u23FF\u2427-\u243F\u244B-\u245F\u2B74\u2B75\u2B96\u2B97\u2BBA-\u2BBC\u2BC9\u2BD2-\u2BEB\u2BF0-\u2BFF\u2C2F\u2C5F\u2CF4-\u2CF8\u2D26\u2D28-\u2D2C\u2D2E\u2D2F\u2D68-\u2D6E\u2D71-\u2D7E\u2D97-\u2D9F\u2DA7\u2DAF\u2DB7\u2DBF\u2DC7\u2DCF\u2DD7\u2DDF\u2E45-\u2E7F\u2E9A\u2EF4-\u2EFF\u2FD6-\u2FEF\u2FFC-\u2FFF\u3040\u3097\u3098\u3100-\u3104\u312E-\u3130\u318F\u31BB-\u31BF\u31E4-\u31EF\u321F\u32FF\u4DB6-\u4DBF\u9FD6-\u9FFF\uA48D-\uA48F\uA4C7-\uA4CF\uA62C-\uA63F\uA6F8-\uA6FF\uA7AF\uA7B8-\uA7F6\uA82C-\uA82F\uA83A-\uA83F\uA878-\uA87F\uA8C6-\uA8CD\uA8DA-\uA8DF\uA8FE\uA8FF\uA954-\uA95E\uA97D-\uA97F\uA9CE\uA9DA-\uA9DD\uA9FF\uAA37-\uAA3F\uAA4E\uAA4F\uAA5A\uAA5B\uAAC3-\uAADA\uAAF7-\uAB00\uAB07\uAB08\uAB0F\uAB10\uAB17-\uAB1F\uAB27\uAB2F\uAB66-\uAB6F\uABEE\uABEF\uABFA-\uABFF\uD7A4-\uD7AF\uD7C7-\uD7CA\uD7FC-\uD7FF\uFA6E\uFA6F\uFADA-\uFAFF\uFB07-\uFB12\uFB18-\uFB1C\uFB37\uFB3D\uFB3F\uFB42\uFB45\uFBC2-\uFBD2\uFD40-\uFD4F\uFD90\uFD91\uFDC8-\uFDEF\uFDFE\uFDFF\uFE1A-\uFE1F\uFE53\uFE67\uFE6C-\uFE6F\uFE75\uFEFD\uFEFE\uFF00\uFFBF-\uFFC1\uFFC8\uFFC9\uFFD0\uFFD1\uFFD8\uFFD9\uFFDD-\uFFDF\uFFE7\uFFEF-\uFFF8\uFFFE\uFFFF",
                    astral: "\uD800[\uDC0C\uDC27\uDC3B\uDC3E\uDC4E\uDC4F\uDC5E-\uDC7F\uDCFB-\uDCFF\uDD03-\uDD06\uDD34-\uDD36\uDD8F\uDD9C-\uDD9F\uDDA1-\uDDCF\uDDFE-\uDE7F\uDE9D-\uDE9F\uDED1-\uDEDF\uDEFC-\uDEFF\uDF24-\uDF2F\uDF4B-\uDF4F\uDF7B-\uDF7F\uDF9E\uDFC4-\uDFC7\uDFD6-\uDFFF]|\uD801[\uDC9E\uDC9F\uDCAA-\uDCAF\uDCD4-\uDCD7\uDCFC-\uDCFF\uDD28-\uDD2F\uDD64-\uDD6E\uDD70-\uDDFF\uDF37-\uDF3F\uDF56-\uDF5F\uDF68-\uDFFF]|\uD802[\uDC06\uDC07\uDC09\uDC36\uDC39-\uDC3B\uDC3D\uDC3E\uDC56\uDC9F-\uDCA6\uDCB0-\uDCDF\uDCF3\uDCF6-\uDCFA\uDD1C-\uDD1E\uDD3A-\uDD3E\uDD40-\uDD7F\uDDB8-\uDDBB\uDDD0\uDDD1\uDE04\uDE07-\uDE0B\uDE14\uDE18\uDE34-\uDE37\uDE3B-\uDE3E\uDE48-\uDE4F\uDE59-\uDE5F\uDEA0-\uDEBF\uDEE7-\uDEEA\uDEF7-\uDEFF\uDF36-\uDF38\uDF56\uDF57\uDF73-\uDF77\uDF92-\uDF98\uDF9D-\uDFA8\uDFB0-\uDFFF]|\uD803[\uDC49-\uDC7F\uDCB3-\uDCBF\uDCF3-\uDCF9\uDD00-\uDE5F\uDE7F-\uDFFF]|\uD804[\uDC4E-\uDC51\uDC70-\uDC7E\uDCC2-\uDCCF\uDCE9-\uDCEF\uDCFA-\uDCFF\uDD35\uDD44-\uDD4F\uDD77-\uDD7F\uDDCE\uDDCF\uDDE0\uDDF5-\uDDFF\uDE12\uDE3F-\uDE7F\uDE87\uDE89\uDE8E\uDE9E\uDEAA-\uDEAF\uDEEB-\uDEEF\uDEFA-\uDEFF\uDF04\uDF0D\uDF0E\uDF11\uDF12\uDF29\uDF31\uDF34\uDF3A\uDF3B\uDF45\uDF46\uDF49\uDF4A\uDF4E\uDF4F\uDF51-\uDF56\uDF58-\uDF5C\uDF64\uDF65\uDF6D-\uDF6F\uDF75-\uDFFF]|\uD805[\uDC5A\uDC5C\uDC5E-\uDC7F\uDCC8-\uDCCF\uDCDA-\uDD7F\uDDB6\uDDB7\uDDDE-\uDDFF\uDE45-\uDE4F\uDE5A-\uDE5F\uDE6D-\uDE7F\uDEB8-\uDEBF\uDECA-\uDEFF\uDF1A-\uDF1C\uDF2C-\uDF2F\uDF40-\uDFFF]|\uD806[\uDC00-\uDC9F\uDCF3-\uDCFE\uDD00-\uDEBF\uDEF9-\uDFFF]|\uD807[\uDC09\uDC37\uDC46-\uDC4F\uDC6D-\uDC6F\uDC90\uDC91\uDCA8\uDCB7-\uDFFF]|\uD808[\uDF9A-\uDFFF]|\uD809[\uDC6F\uDC75-\uDC7F\uDD44-\uDFFF]|[\uD80A\uD80B\uD80E-\uD810\uD812-\uD819\uD823-\uD82B\uD82D\uD82E\uD830-\uD833\uD837\uD839\uD83F\uD874-\uD87D\uD87F-\uDB3F\uDB41-\uDB7F][\uDC00-\uDFFF]|\uD80D[\uDC2F-\uDFFF]|\uD811[\uDE47-\uDFFF]|\uD81A[\uDE39-\uDE3F\uDE5F\uDE6A-\uDE6D\uDE70-\uDECF\uDEEE\uDEEF\uDEF6-\uDEFF\uDF46-\uDF4F\uDF5A\uDF62\uDF78-\uDF7C\uDF90-\uDFFF]|\uD81B[\uDC00-\uDEFF\uDF45-\uDF4F\uDF7F-\uDF8E\uDFA0-\uDFDF\uDFE1-\uDFFF]|\uD821[\uDFED-\uDFFF]|\uD822[\uDEF3-\uDFFF]|\uD82C[\uDC02-\uDFFF]|\uD82F[\uDC6B-\uDC6F\uDC7D-\uDC7F\uDC89-\uDC8F\uDC9A\uDC9B\uDCA4-\uDFFF]|\uD834[\uDCF6-\uDCFF\uDD27\uDD28\uDDE9-\uDDFF\uDE46-\uDEFF\uDF57-\uDF5F\uDF72-\uDFFF]|\uD835[\uDC55\uDC9D\uDCA0\uDCA1\uDCA3\uDCA4\uDCA7\uDCA8\uDCAD\uDCBA\uDCBC\uDCC4\uDD06\uDD0B\uDD0C\uDD15\uDD1D\uDD3A\uDD3F\uDD45\uDD47-\uDD49\uDD51\uDEA6\uDEA7\uDFCC\uDFCD]|\uD836[\uDE8C-\uDE9A\uDEA0\uDEB0-\uDFFF]|\uD838[\uDC07\uDC19\uDC1A\uDC22\uDC25\uDC2B-\uDFFF]|\uD83A[\uDCC5\uDCC6\uDCD7-\uDCFF\uDD4B-\uDD4F\uDD5A-\uDD5D\uDD60-\uDFFF]|\uD83B[\uDC00-\uDDFF\uDE04\uDE20\uDE23\uDE25\uDE26\uDE28\uDE33\uDE38\uDE3A\uDE3C-\uDE41\uDE43-\uDE46\uDE48\uDE4A\uDE4C\uDE50\uDE53\uDE55\uDE56\uDE58\uDE5A\uDE5C\uDE5E\uDE60\uDE63\uDE65\uDE66\uDE6B\uDE73\uDE78\uDE7D\uDE7F\uDE8A\uDE9C-\uDEA0\uDEA4\uDEAA\uDEBC-\uDEEF\uDEF2-\uDFFF]|\uD83C[\uDC2C-\uDC2F\uDC94-\uDC9F\uDCAF\uDCB0\uDCC0\uDCD0\uDCF6-\uDCFF\uDD0D-\uDD0F\uDD2F\uDD6C-\uDD6F\uDDAD-\uDDE5\uDE03-\uDE0F\uDE3C-\uDE3F\uDE49-\uDE4F\uDE52-\uDEFF]|\uD83D[\uDED3-\uDEDF\uDEED-\uDEEF\uDEF7-\uDEFF\uDF74-\uDF7F\uDFD5-\uDFFF]|\uD83E[\uDC0C-\uDC0F\uDC48-\uDC4F\uDC5A-\uDC5F\uDC88-\uDC8F\uDCAE-\uDD0F\uDD1F\uDD28-\uDD2F\uDD31\uDD32\uDD3F\uDD4C-\uDD4F\uDD5F-\uDD7F\uDD92-\uDDBF\uDDC1-\uDFFF]|\uD869[\uDED7-\uDEFF]|\uD86D[\uDF35-\uDF3F]|\uD86E[\uDC1E\uDC1F]|\uD873[\uDEA2-\uDFFF]|\uD87E[\uDE1E-\uDFFF]|\uDB40[\uDC00\uDC02-\uDC1F\uDC80-\uDCFF\uDDF0-\uDFFF]|[\uDBBF\uDBFF][\uDFFE\uDFFF]"
                }, {
                    name: 'Co',
                    alias: 'Private_Use',
                    bmp: "\uE000-\uF8FF",
                    astral: "[\uDB80-\uDBBE\uDBC0-\uDBFE][\uDC00-\uDFFF]|[\uDBBF\uDBFF][\uDC00-\uDFFD]"
                }, {
                    name: 'Cs',
                    alias: 'Surrogate',
                    bmp: "\uD800-\uDFFF"
                }, {
                    name: 'L',
                    alias: 'Letter',
                    bmp: "A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC",
                    astral: "\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF30-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F\uDFE0]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]"
                }, {
                    name: 'Ll',
                    alias: 'Lowercase_Letter',
                    bmp: "a-z\xB5\xDF-\xF6\xF8-\xFF\u0101\u0103\u0105\u0107\u0109\u010B\u010D\u010F\u0111\u0113\u0115\u0117\u0119\u011B\u011D\u011F\u0121\u0123\u0125\u0127\u0129\u012B\u012D\u012F\u0131\u0133\u0135\u0137\u0138\u013A\u013C\u013E\u0140\u0142\u0144\u0146\u0148\u0149\u014B\u014D\u014F\u0151\u0153\u0155\u0157\u0159\u015B\u015D\u015F\u0161\u0163\u0165\u0167\u0169\u016B\u016D\u016F\u0171\u0173\u0175\u0177\u017A\u017C\u017E-\u0180\u0183\u0185\u0188\u018C\u018D\u0192\u0195\u0199-\u019B\u019E\u01A1\u01A3\u01A5\u01A8\u01AA\u01AB\u01AD\u01B0\u01B4\u01B6\u01B9\u01BA\u01BD-\u01BF\u01C6\u01C9\u01CC\u01CE\u01D0\u01D2\u01D4\u01D6\u01D8\u01DA\u01DC\u01DD\u01DF\u01E1\u01E3\u01E5\u01E7\u01E9\u01EB\u01ED\u01EF\u01F0\u01F3\u01F5\u01F9\u01FB\u01FD\u01FF\u0201\u0203\u0205\u0207\u0209\u020B\u020D\u020F\u0211\u0213\u0215\u0217\u0219\u021B\u021D\u021F\u0221\u0223\u0225\u0227\u0229\u022B\u022D\u022F\u0231\u0233-\u0239\u023C\u023F\u0240\u0242\u0247\u0249\u024B\u024D\u024F-\u0293\u0295-\u02AF\u0371\u0373\u0377\u037B-\u037D\u0390\u03AC-\u03CE\u03D0\u03D1\u03D5-\u03D7\u03D9\u03DB\u03DD\u03DF\u03E1\u03E3\u03E5\u03E7\u03E9\u03EB\u03ED\u03EF-\u03F3\u03F5\u03F8\u03FB\u03FC\u0430-\u045F\u0461\u0463\u0465\u0467\u0469\u046B\u046D\u046F\u0471\u0473\u0475\u0477\u0479\u047B\u047D\u047F\u0481\u048B\u048D\u048F\u0491\u0493\u0495\u0497\u0499\u049B\u049D\u049F\u04A1\u04A3\u04A5\u04A7\u04A9\u04AB\u04AD\u04AF\u04B1\u04B3\u04B5\u04B7\u04B9\u04BB\u04BD\u04BF\u04C2\u04C4\u04C6\u04C8\u04CA\u04CC\u04CE\u04CF\u04D1\u04D3\u04D5\u04D7\u04D9\u04DB\u04DD\u04DF\u04E1\u04E3\u04E5\u04E7\u04E9\u04EB\u04ED\u04EF\u04F1\u04F3\u04F5\u04F7\u04F9\u04FB\u04FD\u04FF\u0501\u0503\u0505\u0507\u0509\u050B\u050D\u050F\u0511\u0513\u0515\u0517\u0519\u051B\u051D\u051F\u0521\u0523\u0525\u0527\u0529\u052B\u052D\u052F\u0561-\u0587\u13F8-\u13FD\u1C80-\u1C88\u1D00-\u1D2B\u1D6B-\u1D77\u1D79-\u1D9A\u1E01\u1E03\u1E05\u1E07\u1E09\u1E0B\u1E0D\u1E0F\u1E11\u1E13\u1E15\u1E17\u1E19\u1E1B\u1E1D\u1E1F\u1E21\u1E23\u1E25\u1E27\u1E29\u1E2B\u1E2D\u1E2F\u1E31\u1E33\u1E35\u1E37\u1E39\u1E3B\u1E3D\u1E3F\u1E41\u1E43\u1E45\u1E47\u1E49\u1E4B\u1E4D\u1E4F\u1E51\u1E53\u1E55\u1E57\u1E59\u1E5B\u1E5D\u1E5F\u1E61\u1E63\u1E65\u1E67\u1E69\u1E6B\u1E6D\u1E6F\u1E71\u1E73\u1E75\u1E77\u1E79\u1E7B\u1E7D\u1E7F\u1E81\u1E83\u1E85\u1E87\u1E89\u1E8B\u1E8D\u1E8F\u1E91\u1E93\u1E95-\u1E9D\u1E9F\u1EA1\u1EA3\u1EA5\u1EA7\u1EA9\u1EAB\u1EAD\u1EAF\u1EB1\u1EB3\u1EB5\u1EB7\u1EB9\u1EBB\u1EBD\u1EBF\u1EC1\u1EC3\u1EC5\u1EC7\u1EC9\u1ECB\u1ECD\u1ECF\u1ED1\u1ED3\u1ED5\u1ED7\u1ED9\u1EDB\u1EDD\u1EDF\u1EE1\u1EE3\u1EE5\u1EE7\u1EE9\u1EEB\u1EED\u1EEF\u1EF1\u1EF3\u1EF5\u1EF7\u1EF9\u1EFB\u1EFD\u1EFF-\u1F07\u1F10-\u1F15\u1F20-\u1F27\u1F30-\u1F37\u1F40-\u1F45\u1F50-\u1F57\u1F60-\u1F67\u1F70-\u1F7D\u1F80-\u1F87\u1F90-\u1F97\u1FA0-\u1FA7\u1FB0-\u1FB4\u1FB6\u1FB7\u1FBE\u1FC2-\u1FC4\u1FC6\u1FC7\u1FD0-\u1FD3\u1FD6\u1FD7\u1FE0-\u1FE7\u1FF2-\u1FF4\u1FF6\u1FF7\u210A\u210E\u210F\u2113\u212F\u2134\u2139\u213C\u213D\u2146-\u2149\u214E\u2184\u2C30-\u2C5E\u2C61\u2C65\u2C66\u2C68\u2C6A\u2C6C\u2C71\u2C73\u2C74\u2C76-\u2C7B\u2C81\u2C83\u2C85\u2C87\u2C89\u2C8B\u2C8D\u2C8F\u2C91\u2C93\u2C95\u2C97\u2C99\u2C9B\u2C9D\u2C9F\u2CA1\u2CA3\u2CA5\u2CA7\u2CA9\u2CAB\u2CAD\u2CAF\u2CB1\u2CB3\u2CB5\u2CB7\u2CB9\u2CBB\u2CBD\u2CBF\u2CC1\u2CC3\u2CC5\u2CC7\u2CC9\u2CCB\u2CCD\u2CCF\u2CD1\u2CD3\u2CD5\u2CD7\u2CD9\u2CDB\u2CDD\u2CDF\u2CE1\u2CE3\u2CE4\u2CEC\u2CEE\u2CF3\u2D00-\u2D25\u2D27\u2D2D\uA641\uA643\uA645\uA647\uA649\uA64B\uA64D\uA64F\uA651\uA653\uA655\uA657\uA659\uA65B\uA65D\uA65F\uA661\uA663\uA665\uA667\uA669\uA66B\uA66D\uA681\uA683\uA685\uA687\uA689\uA68B\uA68D\uA68F\uA691\uA693\uA695\uA697\uA699\uA69B\uA723\uA725\uA727\uA729\uA72B\uA72D\uA72F-\uA731\uA733\uA735\uA737\uA739\uA73B\uA73D\uA73F\uA741\uA743\uA745\uA747\uA749\uA74B\uA74D\uA74F\uA751\uA753\uA755\uA757\uA759\uA75B\uA75D\uA75F\uA761\uA763\uA765\uA767\uA769\uA76B\uA76D\uA76F\uA771-\uA778\uA77A\uA77C\uA77F\uA781\uA783\uA785\uA787\uA78C\uA78E\uA791\uA793-\uA795\uA797\uA799\uA79B\uA79D\uA79F\uA7A1\uA7A3\uA7A5\uA7A7\uA7A9\uA7B5\uA7B7\uA7FA\uAB30-\uAB5A\uAB60-\uAB65\uAB70-\uABBF\uFB00-\uFB06\uFB13-\uFB17\uFF41-\uFF5A",
                    astral: "\uD801[\uDC28-\uDC4F\uDCD8-\uDCFB]|\uD803[\uDCC0-\uDCF2]|\uD806[\uDCC0-\uDCDF]|\uD835[\uDC1A-\uDC33\uDC4E-\uDC54\uDC56-\uDC67\uDC82-\uDC9B\uDCB6-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDCCF\uDCEA-\uDD03\uDD1E-\uDD37\uDD52-\uDD6B\uDD86-\uDD9F\uDDBA-\uDDD3\uDDEE-\uDE07\uDE22-\uDE3B\uDE56-\uDE6F\uDE8A-\uDEA5\uDEC2-\uDEDA\uDEDC-\uDEE1\uDEFC-\uDF14\uDF16-\uDF1B\uDF36-\uDF4E\uDF50-\uDF55\uDF70-\uDF88\uDF8A-\uDF8F\uDFAA-\uDFC2\uDFC4-\uDFC9\uDFCB]|\uD83A[\uDD22-\uDD43]"
                }, {
                    name: 'Lm',
                    alias: 'Modifier_Letter',
                    bmp: "\u02B0-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0374\u037A\u0559\u0640\u06E5\u06E6\u07F4\u07F5\u07FA\u081A\u0824\u0828\u0971\u0E46\u0EC6\u10FC\u17D7\u1843\u1AA7\u1C78-\u1C7D\u1D2C-\u1D6A\u1D78\u1D9B-\u1DBF\u2071\u207F\u2090-\u209C\u2C7C\u2C7D\u2D6F\u2E2F\u3005\u3031-\u3035\u303B\u309D\u309E\u30FC-\u30FE\uA015\uA4F8-\uA4FD\uA60C\uA67F\uA69C\uA69D\uA717-\uA71F\uA770\uA788\uA7F8\uA7F9\uA9CF\uA9E6\uAA70\uAADD\uAAF3\uAAF4\uAB5C-\uAB5F\uFF70\uFF9E\uFF9F",
                    astral: "\uD81A[\uDF40-\uDF43]|\uD81B[\uDF93-\uDF9F\uDFE0]"
                }, {
                    name: 'Lo',
                    alias: 'Other_Letter',
                    bmp: "\xAA\xBA\u01BB\u01C0-\u01C3\u0294\u05D0-\u05EA\u05F0-\u05F2\u0620-\u063F\u0641-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u0800-\u0815\u0840-\u0858\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0972-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E45\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10D0-\u10FA\u10FD-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17DC\u1820-\u1842\u1844-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C77\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u2135-\u2138\u2D30-\u2D67\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3006\u303C\u3041-\u3096\u309F\u30A1-\u30FA\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA014\uA016-\uA48C\uA4D0-\uA4F7\uA500-\uA60B\uA610-\uA61F\uA62A\uA62B\uA66E\uA6A0-\uA6E5\uA78F\uA7F7\uA7FB-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9E0-\uA9E4\uA9E7-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA6F\uAA71-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB\uAADC\uAAE0-\uAAEA\uAAF2\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF66-\uFF6F\uFF71-\uFF9D\uFFA0-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC",
                    astral: "\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF30-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC50-\uDC9D\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCFF\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD83A[\uDC00-\uDCC4]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]"
                }, {
                    name: 'Lt',
                    alias: 'Titlecase_Letter',
                    bmp: "\u01C5\u01C8\u01CB\u01F2\u1F88-\u1F8F\u1F98-\u1F9F\u1FA8-\u1FAF\u1FBC\u1FCC\u1FFC"
                }, {
                    name: 'Lu',
                    alias: 'Uppercase_Letter',
                    bmp: "A-Z\xC0-\xD6\xD8-\xDE\u0100\u0102\u0104\u0106\u0108\u010A\u010C\u010E\u0110\u0112\u0114\u0116\u0118\u011A\u011C\u011E\u0120\u0122\u0124\u0126\u0128\u012A\u012C\u012E\u0130\u0132\u0134\u0136\u0139\u013B\u013D\u013F\u0141\u0143\u0145\u0147\u014A\u014C\u014E\u0150\u0152\u0154\u0156\u0158\u015A\u015C\u015E\u0160\u0162\u0164\u0166\u0168\u016A\u016C\u016E\u0170\u0172\u0174\u0176\u0178\u0179\u017B\u017D\u0181\u0182\u0184\u0186\u0187\u0189-\u018B\u018E-\u0191\u0193\u0194\u0196-\u0198\u019C\u019D\u019F\u01A0\u01A2\u01A4\u01A6\u01A7\u01A9\u01AC\u01AE\u01AF\u01B1-\u01B3\u01B5\u01B7\u01B8\u01BC\u01C4\u01C7\u01CA\u01CD\u01CF\u01D1\u01D3\u01D5\u01D7\u01D9\u01DB\u01DE\u01E0\u01E2\u01E4\u01E6\u01E8\u01EA\u01EC\u01EE\u01F1\u01F4\u01F6-\u01F8\u01FA\u01FC\u01FE\u0200\u0202\u0204\u0206\u0208\u020A\u020C\u020E\u0210\u0212\u0214\u0216\u0218\u021A\u021C\u021E\u0220\u0222\u0224\u0226\u0228\u022A\u022C\u022E\u0230\u0232\u023A\u023B\u023D\u023E\u0241\u0243-\u0246\u0248\u024A\u024C\u024E\u0370\u0372\u0376\u037F\u0386\u0388-\u038A\u038C\u038E\u038F\u0391-\u03A1\u03A3-\u03AB\u03CF\u03D2-\u03D4\u03D8\u03DA\u03DC\u03DE\u03E0\u03E2\u03E4\u03E6\u03E8\u03EA\u03EC\u03EE\u03F4\u03F7\u03F9\u03FA\u03FD-\u042F\u0460\u0462\u0464\u0466\u0468\u046A\u046C\u046E\u0470\u0472\u0474\u0476\u0478\u047A\u047C\u047E\u0480\u048A\u048C\u048E\u0490\u0492\u0494\u0496\u0498\u049A\u049C\u049E\u04A0\u04A2\u04A4\u04A6\u04A8\u04AA\u04AC\u04AE\u04B0\u04B2\u04B4\u04B6\u04B8\u04BA\u04BC\u04BE\u04C0\u04C1\u04C3\u04C5\u04C7\u04C9\u04CB\u04CD\u04D0\u04D2\u04D4\u04D6\u04D8\u04DA\u04DC\u04DE\u04E0\u04E2\u04E4\u04E6\u04E8\u04EA\u04EC\u04EE\u04F0\u04F2\u04F4\u04F6\u04F8\u04FA\u04FC\u04FE\u0500\u0502\u0504\u0506\u0508\u050A\u050C\u050E\u0510\u0512\u0514\u0516\u0518\u051A\u051C\u051E\u0520\u0522\u0524\u0526\u0528\u052A\u052C\u052E\u0531-\u0556\u10A0-\u10C5\u10C7\u10CD\u13A0-\u13F5\u1E00\u1E02\u1E04\u1E06\u1E08\u1E0A\u1E0C\u1E0E\u1E10\u1E12\u1E14\u1E16\u1E18\u1E1A\u1E1C\u1E1E\u1E20\u1E22\u1E24\u1E26\u1E28\u1E2A\u1E2C\u1E2E\u1E30\u1E32\u1E34\u1E36\u1E38\u1E3A\u1E3C\u1E3E\u1E40\u1E42\u1E44\u1E46\u1E48\u1E4A\u1E4C\u1E4E\u1E50\u1E52\u1E54\u1E56\u1E58\u1E5A\u1E5C\u1E5E\u1E60\u1E62\u1E64\u1E66\u1E68\u1E6A\u1E6C\u1E6E\u1E70\u1E72\u1E74\u1E76\u1E78\u1E7A\u1E7C\u1E7E\u1E80\u1E82\u1E84\u1E86\u1E88\u1E8A\u1E8C\u1E8E\u1E90\u1E92\u1E94\u1E9E\u1EA0\u1EA2\u1EA4\u1EA6\u1EA8\u1EAA\u1EAC\u1EAE\u1EB0\u1EB2\u1EB4\u1EB6\u1EB8\u1EBA\u1EBC\u1EBE\u1EC0\u1EC2\u1EC4\u1EC6\u1EC8\u1ECA\u1ECC\u1ECE\u1ED0\u1ED2\u1ED4\u1ED6\u1ED8\u1EDA\u1EDC\u1EDE\u1EE0\u1EE2\u1EE4\u1EE6\u1EE8\u1EEA\u1EEC\u1EEE\u1EF0\u1EF2\u1EF4\u1EF6\u1EF8\u1EFA\u1EFC\u1EFE\u1F08-\u1F0F\u1F18-\u1F1D\u1F28-\u1F2F\u1F38-\u1F3F\u1F48-\u1F4D\u1F59\u1F5B\u1F5D\u1F5F\u1F68-\u1F6F\u1FB8-\u1FBB\u1FC8-\u1FCB\u1FD8-\u1FDB\u1FE8-\u1FEC\u1FF8-\u1FFB\u2102\u2107\u210B-\u210D\u2110-\u2112\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u2130-\u2133\u213E\u213F\u2145\u2183\u2C00-\u2C2E\u2C60\u2C62-\u2C64\u2C67\u2C69\u2C6B\u2C6D-\u2C70\u2C72\u2C75\u2C7E-\u2C80\u2C82\u2C84\u2C86\u2C88\u2C8A\u2C8C\u2C8E\u2C90\u2C92\u2C94\u2C96\u2C98\u2C9A\u2C9C\u2C9E\u2CA0\u2CA2\u2CA4\u2CA6\u2CA8\u2CAA\u2CAC\u2CAE\u2CB0\u2CB2\u2CB4\u2CB6\u2CB8\u2CBA\u2CBC\u2CBE\u2CC0\u2CC2\u2CC4\u2CC6\u2CC8\u2CCA\u2CCC\u2CCE\u2CD0\u2CD2\u2CD4\u2CD6\u2CD8\u2CDA\u2CDC\u2CDE\u2CE0\u2CE2\u2CEB\u2CED\u2CF2\uA640\uA642\uA644\uA646\uA648\uA64A\uA64C\uA64E\uA650\uA652\uA654\uA656\uA658\uA65A\uA65C\uA65E\uA660\uA662\uA664\uA666\uA668\uA66A\uA66C\uA680\uA682\uA684\uA686\uA688\uA68A\uA68C\uA68E\uA690\uA692\uA694\uA696\uA698\uA69A\uA722\uA724\uA726\uA728\uA72A\uA72C\uA72E\uA732\uA734\uA736\uA738\uA73A\uA73C\uA73E\uA740\uA742\uA744\uA746\uA748\uA74A\uA74C\uA74E\uA750\uA752\uA754\uA756\uA758\uA75A\uA75C\uA75E\uA760\uA762\uA764\uA766\uA768\uA76A\uA76C\uA76E\uA779\uA77B\uA77D\uA77E\uA780\uA782\uA784\uA786\uA78B\uA78D\uA790\uA792\uA796\uA798\uA79A\uA79C\uA79E\uA7A0\uA7A2\uA7A4\uA7A6\uA7A8\uA7AA-\uA7AE\uA7B0-\uA7B4\uA7B6\uFF21-\uFF3A",
                    astral: "\uD801[\uDC00-\uDC27\uDCB0-\uDCD3]|\uD803[\uDC80-\uDCB2]|\uD806[\uDCA0-\uDCBF]|\uD835[\uDC00-\uDC19\uDC34-\uDC4D\uDC68-\uDC81\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB5\uDCD0-\uDCE9\uDD04\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD38\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD6C-\uDD85\uDDA0-\uDDB9\uDDD4-\uDDED\uDE08-\uDE21\uDE3C-\uDE55\uDE70-\uDE89\uDEA8-\uDEC0\uDEE2-\uDEFA\uDF1C-\uDF34\uDF56-\uDF6E\uDF90-\uDFA8\uDFCA]|\uD83A[\uDD00-\uDD21]"
                }, {
                    name: 'M',
                    alias: 'Mark',
                    bmp: "\u0300-\u036F\u0483-\u0489\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u08D4-\u08E1\u08E3-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962\u0963\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A70\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B62\u0B63\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0C00-\u0C03\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C81-\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0D01-\u0D03\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D82\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0EB1\u0EB4-\u0EB9\u0EBB\u0EBC\u0EC8-\u0ECD\u0F18\u0F19\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F\u109A-\u109D\u135D-\u135F\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4-\u17D3\u17DD\u180B-\u180D\u1885\u1886\u18A9\u1920-\u192B\u1930-\u193B\u1A17-\u1A1B\u1A55-\u1A5E\u1A60-\u1A7C\u1A7F\u1AB0-\u1ABE\u1B00-\u1B04\u1B34-\u1B44\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAD\u1BE6-\u1BF3\u1C24-\u1C37\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF2-\u1CF4\u1CF8\u1CF9\u1DC0-\u1DF5\u1DFB-\u1DFF\u20D0-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\uA66F-\uA672\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA880\uA881\uA8B4-\uA8C5\uA8E0-\uA8F1\uA926-\uA92D\uA947-\uA953\uA980-\uA983\uA9B3-\uA9C0\uA9E5\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uAA7B-\uAA7D\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEB-\uAAEF\uAAF5\uAAF6\uABE3-\uABEA\uABEC\uABED\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F",
                    astral: "\uD800[\uDDFD\uDEE0\uDF76-\uDF7A]|\uD802[\uDE01-\uDE03\uDE05\uDE06\uDE0C-\uDE0F\uDE38-\uDE3A\uDE3F\uDEE5\uDEE6]|\uD804[\uDC00-\uDC02\uDC38-\uDC46\uDC7F-\uDC82\uDCB0-\uDCBA\uDD00-\uDD02\uDD27-\uDD34\uDD73\uDD80-\uDD82\uDDB3-\uDDC0\uDDCA-\uDDCC\uDE2C-\uDE37\uDE3E\uDEDF-\uDEEA\uDF00-\uDF03\uDF3C\uDF3E-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF57\uDF62\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC35-\uDC46\uDCB0-\uDCC3\uDDAF-\uDDB5\uDDB8-\uDDC0\uDDDC\uDDDD\uDE30-\uDE40\uDEAB-\uDEB7\uDF1D-\uDF2B]|\uD807[\uDC2F-\uDC36\uDC38-\uDC3F\uDC92-\uDCA7\uDCA9-\uDCB6]|\uD81A[\uDEF0-\uDEF4\uDF30-\uDF36]|\uD81B[\uDF51-\uDF7E\uDF8F-\uDF92]|\uD82F[\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A]|\uD83A[\uDCD0-\uDCD6\uDD44-\uDD4A]|\uDB40[\uDD00-\uDDEF]"
                }, {
                    name: 'Mc',
                    alias: 'Spacing_Mark',
                    bmp: "\u0903\u093B\u093E-\u0940\u0949-\u094C\u094E\u094F\u0982\u0983\u09BE-\u09C0\u09C7\u09C8\u09CB\u09CC\u09D7\u0A03\u0A3E-\u0A40\u0A83\u0ABE-\u0AC0\u0AC9\u0ACB\u0ACC\u0B02\u0B03\u0B3E\u0B40\u0B47\u0B48\u0B4B\u0B4C\u0B57\u0BBE\u0BBF\u0BC1\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCC\u0BD7\u0C01-\u0C03\u0C41-\u0C44\u0C82\u0C83\u0CBE\u0CC0-\u0CC4\u0CC7\u0CC8\u0CCA\u0CCB\u0CD5\u0CD6\u0D02\u0D03\u0D3E-\u0D40\u0D46-\u0D48\u0D4A-\u0D4C\u0D57\u0D82\u0D83\u0DCF-\u0DD1\u0DD8-\u0DDF\u0DF2\u0DF3\u0F3E\u0F3F\u0F7F\u102B\u102C\u1031\u1038\u103B\u103C\u1056\u1057\u1062-\u1064\u1067-\u106D\u1083\u1084\u1087-\u108C\u108F\u109A-\u109C\u17B6\u17BE-\u17C5\u17C7\u17C8\u1923-\u1926\u1929-\u192B\u1930\u1931\u1933-\u1938\u1A19\u1A1A\u1A55\u1A57\u1A61\u1A63\u1A64\u1A6D-\u1A72\u1B04\u1B35\u1B3B\u1B3D-\u1B41\u1B43\u1B44\u1B82\u1BA1\u1BA6\u1BA7\u1BAA\u1BE7\u1BEA-\u1BEC\u1BEE\u1BF2\u1BF3\u1C24-\u1C2B\u1C34\u1C35\u1CE1\u1CF2\u1CF3\u302E\u302F\uA823\uA824\uA827\uA880\uA881\uA8B4-\uA8C3\uA952\uA953\uA983\uA9B4\uA9B5\uA9BA\uA9BB\uA9BD-\uA9C0\uAA2F\uAA30\uAA33\uAA34\uAA4D\uAA7B\uAA7D\uAAEB\uAAEE\uAAEF\uAAF5\uABE3\uABE4\uABE6\uABE7\uABE9\uABEA\uABEC",
                    astral: "\uD804[\uDC00\uDC02\uDC82\uDCB0-\uDCB2\uDCB7\uDCB8\uDD2C\uDD82\uDDB3-\uDDB5\uDDBF\uDDC0\uDE2C-\uDE2E\uDE32\uDE33\uDE35\uDEE0-\uDEE2\uDF02\uDF03\uDF3E\uDF3F\uDF41-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF57\uDF62\uDF63]|\uD805[\uDC35-\uDC37\uDC40\uDC41\uDC45\uDCB0-\uDCB2\uDCB9\uDCBB-\uDCBE\uDCC1\uDDAF-\uDDB1\uDDB8-\uDDBB\uDDBE\uDE30-\uDE32\uDE3B\uDE3C\uDE3E\uDEAC\uDEAE\uDEAF\uDEB6\uDF20\uDF21\uDF26]|\uD807[\uDC2F\uDC3E\uDCA9\uDCB1\uDCB4]|\uD81B[\uDF51-\uDF7E]|\uD834[\uDD65\uDD66\uDD6D-\uDD72]"
                }, {
                    name: 'Me',
                    alias: 'Enclosing_Mark',
                    bmp: "\u0488\u0489\u1ABE\u20DD-\u20E0\u20E2-\u20E4\uA670-\uA672"
                }, {
                    name: 'Mn',
                    alias: 'Nonspacing_Mark',
                    bmp: "\u0300-\u036F\u0483-\u0487\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u08D4-\u08E1\u08E3-\u0902\u093A\u093C\u0941-\u0948\u094D\u0951-\u0957\u0962\u0963\u0981\u09BC\u09C1-\u09C4\u09CD\u09E2\u09E3\u0A01\u0A02\u0A3C\u0A41\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A70\u0A71\u0A75\u0A81\u0A82\u0ABC\u0AC1-\u0AC5\u0AC7\u0AC8\u0ACD\u0AE2\u0AE3\u0B01\u0B3C\u0B3F\u0B41-\u0B44\u0B4D\u0B56\u0B62\u0B63\u0B82\u0BC0\u0BCD\u0C00\u0C3E-\u0C40\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C81\u0CBC\u0CBF\u0CC6\u0CCC\u0CCD\u0CE2\u0CE3\u0D01\u0D41-\u0D44\u0D4D\u0D62\u0D63\u0DCA\u0DD2-\u0DD4\u0DD6\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0EB1\u0EB4-\u0EB9\u0EBB\u0EBC\u0EC8-\u0ECD\u0F18\u0F19\u0F35\u0F37\u0F39\u0F71-\u0F7E\u0F80-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102D-\u1030\u1032-\u1037\u1039\u103A\u103D\u103E\u1058\u1059\u105E-\u1060\u1071-\u1074\u1082\u1085\u1086\u108D\u109D\u135D-\u135F\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4\u17B5\u17B7-\u17BD\u17C6\u17C9-\u17D3\u17DD\u180B-\u180D\u1885\u1886\u18A9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193B\u1A17\u1A18\u1A1B\u1A56\u1A58-\u1A5E\u1A60\u1A62\u1A65-\u1A6C\u1A73-\u1A7C\u1A7F\u1AB0-\u1ABD\u1B00-\u1B03\u1B34\u1B36-\u1B3A\u1B3C\u1B42\u1B6B-\u1B73\u1B80\u1B81\u1BA2-\u1BA5\u1BA8\u1BA9\u1BAB-\u1BAD\u1BE6\u1BE8\u1BE9\u1BED\u1BEF-\u1BF1\u1C2C-\u1C33\u1C36\u1C37\u1CD0-\u1CD2\u1CD4-\u1CE0\u1CE2-\u1CE8\u1CED\u1CF4\u1CF8\u1CF9\u1DC0-\u1DF5\u1DFB-\u1DFF\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302D\u3099\u309A\uA66F\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA825\uA826\uA8C4\uA8C5\uA8E0-\uA8F1\uA926-\uA92D\uA947-\uA951\uA980-\uA982\uA9B3\uA9B6-\uA9B9\uA9BC\uA9E5\uAA29-\uAA2E\uAA31\uAA32\uAA35\uAA36\uAA43\uAA4C\uAA7C\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEC\uAAED\uAAF6\uABE5\uABE8\uABED\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F",
                    astral: "\uD800[\uDDFD\uDEE0\uDF76-\uDF7A]|\uD802[\uDE01-\uDE03\uDE05\uDE06\uDE0C-\uDE0F\uDE38-\uDE3A\uDE3F\uDEE5\uDEE6]|\uD804[\uDC01\uDC38-\uDC46\uDC7F-\uDC81\uDCB3-\uDCB6\uDCB9\uDCBA\uDD00-\uDD02\uDD27-\uDD2B\uDD2D-\uDD34\uDD73\uDD80\uDD81\uDDB6-\uDDBE\uDDCA-\uDDCC\uDE2F-\uDE31\uDE34\uDE36\uDE37\uDE3E\uDEDF\uDEE3-\uDEEA\uDF00\uDF01\uDF3C\uDF40\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC38-\uDC3F\uDC42-\uDC44\uDC46\uDCB3-\uDCB8\uDCBA\uDCBF\uDCC0\uDCC2\uDCC3\uDDB2-\uDDB5\uDDBC\uDDBD\uDDBF\uDDC0\uDDDC\uDDDD\uDE33-\uDE3A\uDE3D\uDE3F\uDE40\uDEAB\uDEAD\uDEB0-\uDEB5\uDEB7\uDF1D-\uDF1F\uDF22-\uDF25\uDF27-\uDF2B]|\uD807[\uDC30-\uDC36\uDC38-\uDC3D\uDC3F\uDC92-\uDCA7\uDCAA-\uDCB0\uDCB2\uDCB3\uDCB5\uDCB6]|\uD81A[\uDEF0-\uDEF4\uDF30-\uDF36]|\uD81B[\uDF8F-\uDF92]|\uD82F[\uDC9D\uDC9E]|\uD834[\uDD67-\uDD69\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A]|\uD83A[\uDCD0-\uDCD6\uDD44-\uDD4A]|\uDB40[\uDD00-\uDDEF]"
                }, {
                    name: 'N',
                    alias: 'Number',
                    bmp: "0-9\xB2\xB3\xB9\xBC-\xBE\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u09F4-\u09F9\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0B72-\u0B77\u0BE6-\u0BF2\u0C66-\u0C6F\u0C78-\u0C7E\u0CE6-\u0CEF\u0D58-\u0D5E\u0D66-\u0D78\u0DE6-\u0DEF\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F33\u1040-\u1049\u1090-\u1099\u1369-\u137C\u16EE-\u16F0\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1946-\u194F\u19D0-\u19DA\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\u2070\u2074-\u2079\u2080-\u2089\u2150-\u2182\u2185-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2CFD\u3007\u3021-\u3029\u3038-\u303A\u3192-\u3195\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\uA620-\uA629\uA6E6-\uA6EF\uA830-\uA835\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uA9F0-\uA9F9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19",
                    astral: "\uD800[\uDD07-\uDD33\uDD40-\uDD78\uDD8A\uDD8B\uDEE1-\uDEFB\uDF20-\uDF23\uDF41\uDF4A\uDFD1-\uDFD5]|\uD801[\uDCA0-\uDCA9]|\uD802[\uDC58-\uDC5F\uDC79-\uDC7F\uDCA7-\uDCAF\uDCFB-\uDCFF\uDD16-\uDD1B\uDDBC\uDDBD\uDDC0-\uDDCF\uDDD2-\uDDFF\uDE40-\uDE47\uDE7D\uDE7E\uDE9D-\uDE9F\uDEEB-\uDEEF\uDF58-\uDF5F\uDF78-\uDF7F\uDFA9-\uDFAF]|\uD803[\uDCFA-\uDCFF\uDE60-\uDE7E]|\uD804[\uDC52-\uDC6F\uDCF0-\uDCF9\uDD36-\uDD3F\uDDD0-\uDDD9\uDDE1-\uDDF4\uDEF0-\uDEF9]|\uD805[\uDC50-\uDC59\uDCD0-\uDCD9\uDE50-\uDE59\uDEC0-\uDEC9\uDF30-\uDF3B]|\uD806[\uDCE0-\uDCF2]|\uD807[\uDC50-\uDC6C]|\uD809[\uDC00-\uDC6E]|\uD81A[\uDE60-\uDE69\uDF50-\uDF59\uDF5B-\uDF61]|\uD834[\uDF60-\uDF71]|\uD835[\uDFCE-\uDFFF]|\uD83A[\uDCC7-\uDCCF\uDD50-\uDD59]|\uD83C[\uDD00-\uDD0C]"
                }, {
                    name: 'Nd',
                    alias: 'Decimal_Number',
                    bmp: "0-9\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0BE6-\u0BEF\u0C66-\u0C6F\u0CE6-\u0CEF\u0D66-\u0D6F\u0DE6-\u0DEF\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F29\u1040-\u1049\u1090-\u1099\u17E0-\u17E9\u1810-\u1819\u1946-\u194F\u19D0-\u19D9\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\uA620-\uA629\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uA9F0-\uA9F9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19",
                    astral: "\uD801[\uDCA0-\uDCA9]|\uD804[\uDC66-\uDC6F\uDCF0-\uDCF9\uDD36-\uDD3F\uDDD0-\uDDD9\uDEF0-\uDEF9]|\uD805[\uDC50-\uDC59\uDCD0-\uDCD9\uDE50-\uDE59\uDEC0-\uDEC9\uDF30-\uDF39]|\uD806[\uDCE0-\uDCE9]|\uD807[\uDC50-\uDC59]|\uD81A[\uDE60-\uDE69\uDF50-\uDF59]|\uD835[\uDFCE-\uDFFF]|\uD83A[\uDD50-\uDD59]"
                }, {
                    name: 'Nl',
                    alias: 'Letter_Number',
                    bmp: "\u16EE-\u16F0\u2160-\u2182\u2185-\u2188\u3007\u3021-\u3029\u3038-\u303A\uA6E6-\uA6EF",
                    astral: "\uD800[\uDD40-\uDD74\uDF41\uDF4A\uDFD1-\uDFD5]|\uD809[\uDC00-\uDC6E]"
                }, {
                    name: 'No',
                    alias: 'Other_Number',
                    bmp: "\xB2\xB3\xB9\xBC-\xBE\u09F4-\u09F9\u0B72-\u0B77\u0BF0-\u0BF2\u0C78-\u0C7E\u0D58-\u0D5E\u0D70-\u0D78\u0F2A-\u0F33\u1369-\u137C\u17F0-\u17F9\u19DA\u2070\u2074-\u2079\u2080-\u2089\u2150-\u215F\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2CFD\u3192-\u3195\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\uA830-\uA835",
                    astral: "\uD800[\uDD07-\uDD33\uDD75-\uDD78\uDD8A\uDD8B\uDEE1-\uDEFB\uDF20-\uDF23]|\uD802[\uDC58-\uDC5F\uDC79-\uDC7F\uDCA7-\uDCAF\uDCFB-\uDCFF\uDD16-\uDD1B\uDDBC\uDDBD\uDDC0-\uDDCF\uDDD2-\uDDFF\uDE40-\uDE47\uDE7D\uDE7E\uDE9D-\uDE9F\uDEEB-\uDEEF\uDF58-\uDF5F\uDF78-\uDF7F\uDFA9-\uDFAF]|\uD803[\uDCFA-\uDCFF\uDE60-\uDE7E]|\uD804[\uDC52-\uDC65\uDDE1-\uDDF4]|\uD805[\uDF3A\uDF3B]|\uD806[\uDCEA-\uDCF2]|\uD807[\uDC5A-\uDC6C]|\uD81A[\uDF5B-\uDF61]|\uD834[\uDF60-\uDF71]|\uD83A[\uDCC7-\uDCCF]|\uD83C[\uDD00-\uDD0C]"
                }, {
                    name: 'P',
                    alias: 'Punctuation',
                    bmp: "!-#%-\\x2A,-/:;\\x3F@\\x5B-\\x5D_\\x7B}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u0AF0\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E44\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65",
                    astral: "\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC9\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDF3C-\uDF3E]|\uD807[\uDC41-\uDC45\uDC70\uDC71]|\uD809[\uDC70-\uDC74]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]"
                }, {
                    name: 'Pc',
                    alias: 'Connector_Punctuation',
                    bmp: "_\u203F\u2040\u2054\uFE33\uFE34\uFE4D-\uFE4F\uFF3F"
                }, {
                    name: 'Pd',
                    alias: 'Dash_Punctuation',
                    bmp: "\\x2D\u058A\u05BE\u1400\u1806\u2010-\u2015\u2E17\u2E1A\u2E3A\u2E3B\u2E40\u301C\u3030\u30A0\uFE31\uFE32\uFE58\uFE63\uFF0D"
                }, {
                    name: 'Pe',
                    alias: 'Close_Punctuation',
                    bmp: "\\x29\\x5D}\u0F3B\u0F3D\u169C\u2046\u207E\u208E\u2309\u230B\u232A\u2769\u276B\u276D\u276F\u2771\u2773\u2775\u27C6\u27E7\u27E9\u27EB\u27ED\u27EF\u2984\u2986\u2988\u298A\u298C\u298E\u2990\u2992\u2994\u2996\u2998\u29D9\u29DB\u29FD\u2E23\u2E25\u2E27\u2E29\u3009\u300B\u300D\u300F\u3011\u3015\u3017\u3019\u301B\u301E\u301F\uFD3E\uFE18\uFE36\uFE38\uFE3A\uFE3C\uFE3E\uFE40\uFE42\uFE44\uFE48\uFE5A\uFE5C\uFE5E\uFF09\uFF3D\uFF5D\uFF60\uFF63"
                }, {
                    name: 'Pf',
                    alias: 'Final_Punctuation',
                    bmp: "\xBB\u2019\u201D\u203A\u2E03\u2E05\u2E0A\u2E0D\u2E1D\u2E21"
                }, {
                    name: 'Pi',
                    alias: 'Initial_Punctuation',
                    bmp: "\xAB\u2018\u201B\u201C\u201F\u2039\u2E02\u2E04\u2E09\u2E0C\u2E1C\u2E20"
                }, {
                    name: 'Po',
                    alias: 'Other_Punctuation',
                    bmp: "!-#%-'\\x2A,\\x2E/:;\\x3F@\\x5C\xA1\xA7\xB6\xB7\xBF\u037E\u0387\u055A-\u055F\u0589\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u0AF0\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u166D\u166E\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u1805\u1807-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2016\u2017\u2020-\u2027\u2030-\u2038\u203B-\u203E\u2041-\u2043\u2047-\u2051\u2053\u2055-\u205E\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00\u2E01\u2E06-\u2E08\u2E0B\u2E0E-\u2E16\u2E18\u2E19\u2E1B\u2E1E\u2E1F\u2E2A-\u2E2E\u2E30-\u2E39\u2E3C-\u2E3F\u2E41\u2E43\u2E44\u3001-\u3003\u303D\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFE10-\uFE16\uFE19\uFE30\uFE45\uFE46\uFE49-\uFE4C\uFE50-\uFE52\uFE54-\uFE57\uFE5F-\uFE61\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF07\uFF0A\uFF0C\uFF0E\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3C\uFF61\uFF64\uFF65",
                    astral: "\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC9\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDF3C-\uDF3E]|\uD807[\uDC41-\uDC45\uDC70\uDC71]|\uD809[\uDC70-\uDC74]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]"
                }, {
                    name: 'Ps',
                    alias: 'Open_Punctuation',
                    bmp: "\\x28\\x5B\\x7B\u0F3A\u0F3C\u169B\u201A\u201E\u2045\u207D\u208D\u2308\u230A\u2329\u2768\u276A\u276C\u276E\u2770\u2772\u2774\u27C5\u27E6\u27E8\u27EA\u27EC\u27EE\u2983\u2985\u2987\u2989\u298B\u298D\u298F\u2991\u2993\u2995\u2997\u29D8\u29DA\u29FC\u2E22\u2E24\u2E26\u2E28\u2E42\u3008\u300A\u300C\u300E\u3010\u3014\u3016\u3018\u301A\u301D\uFD3F\uFE17\uFE35\uFE37\uFE39\uFE3B\uFE3D\uFE3F\uFE41\uFE43\uFE47\uFE59\uFE5B\uFE5D\uFF08\uFF3B\uFF5B\uFF5F\uFF62"
                }, {
                    name: 'S',
                    alias: 'Symbol',
                    bmp: "\\x24\\x2B<->\\x5E`\\x7C~\xA2-\xA6\xA8\xA9\xAC\xAE-\xB1\xB4\xB8\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0384\u0385\u03F6\u0482\u058D-\u058F\u0606-\u0608\u060B\u060E\u060F\u06DE\u06E9\u06FD\u06FE\u07F6\u09F2\u09F3\u09FA\u09FB\u0AF1\u0B70\u0BF3-\u0BFA\u0C7F\u0D4F\u0D79\u0E3F\u0F01-\u0F03\u0F13\u0F15-\u0F17\u0F1A-\u0F1F\u0F34\u0F36\u0F38\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE\u0FCF\u0FD5-\u0FD8\u109E\u109F\u1390-\u1399\u17DB\u1940\u19DE-\u19FF\u1B61-\u1B6A\u1B74-\u1B7C\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u2044\u2052\u207A-\u207C\u208A-\u208C\u20A0-\u20BE\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F\u218A\u218B\u2190-\u2307\u230C-\u2328\u232B-\u23FE\u2400-\u2426\u2440-\u244A\u249C-\u24E9\u2500-\u2767\u2794-\u27C4\u27C7-\u27E5\u27F0-\u2982\u2999-\u29D7\u29DC-\u29FB\u29FE-\u2B73\u2B76-\u2B95\u2B98-\u2BB9\u2BBD-\u2BC8\u2BCA-\u2BD1\u2BEC-\u2BEF\u2CE5-\u2CEA\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFB\u3004\u3012\u3013\u3020\u3036\u3037\u303E\u303F\u309B\u309C\u3190\u3191\u3196-\u319F\u31C0-\u31E3\u3200-\u321E\u322A-\u3247\u3250\u3260-\u327F\u328A-\u32B0\u32C0-\u32FE\u3300-\u33FF\u4DC0-\u4DFF\uA490-\uA4C6\uA700-\uA716\uA720\uA721\uA789\uA78A\uA828-\uA82B\uA836-\uA839\uAA77-\uAA79\uAB5B\uFB29\uFBB2-\uFBC1\uFDFC\uFDFD\uFE62\uFE64-\uFE66\uFE69\uFF04\uFF0B\uFF1C-\uFF1E\uFF3E\uFF40\uFF5C\uFF5E\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFFC\uFFFD",
                    astral: "\uD800[\uDD37-\uDD3F\uDD79-\uDD89\uDD8C-\uDD8E\uDD90-\uDD9B\uDDA0\uDDD0-\uDDFC]|\uD802[\uDC77\uDC78\uDEC8]|\uD805\uDF3F|\uD81A[\uDF3C-\uDF3F\uDF45]|\uD82F\uDC9C|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD64\uDD6A-\uDD6C\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDDE8\uDE00-\uDE41\uDE45\uDF00-\uDF56]|\uD835[\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85\uDE86]|\uD83B[\uDEF0\uDEF1]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD10-\uDD2E\uDD30-\uDD6B\uDD70-\uDDAC\uDDE6-\uDE02\uDE10-\uDE3B\uDE40-\uDE48\uDE50\uDE51\uDF00-\uDFFF]|\uD83D[\uDC00-\uDED2\uDEE0-\uDEEC\uDEF0-\uDEF6\uDF00-\uDF73\uDF80-\uDFD4]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDD10-\uDD1E\uDD20-\uDD27\uDD30\uDD33-\uDD3E\uDD40-\uDD4B\uDD50-\uDD5E\uDD80-\uDD91\uDDC0]"
                }, {
                    name: 'Sc',
                    alias: 'Currency_Symbol',
                    bmp: "\\x24\xA2-\xA5\u058F\u060B\u09F2\u09F3\u09FB\u0AF1\u0BF9\u0E3F\u17DB\u20A0-\u20BE\uA838\uFDFC\uFE69\uFF04\uFFE0\uFFE1\uFFE5\uFFE6"
                }, {
                    name: 'Sk',
                    alias: 'Modifier_Symbol',
                    bmp: "\\x5E`\xA8\xAF\xB4\xB8\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0384\u0385\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u309B\u309C\uA700-\uA716\uA720\uA721\uA789\uA78A\uAB5B\uFBB2-\uFBC1\uFF3E\uFF40\uFFE3",
                    astral: "\uD83C[\uDFFB-\uDFFF]"
                }, {
                    name: 'Sm',
                    alias: 'Math_Symbol',
                    bmp: "\\x2B<->\\x7C~\xAC\xB1\xD7\xF7\u03F6\u0606-\u0608\u2044\u2052\u207A-\u207C\u208A-\u208C\u2118\u2140-\u2144\u214B\u2190-\u2194\u219A\u219B\u21A0\u21A3\u21A6\u21AE\u21CE\u21CF\u21D2\u21D4\u21F4-\u22FF\u2320\u2321\u237C\u239B-\u23B3\u23DC-\u23E1\u25B7\u25C1\u25F8-\u25FF\u266F\u27C0-\u27C4\u27C7-\u27E5\u27F0-\u27FF\u2900-\u2982\u2999-\u29D7\u29DC-\u29FB\u29FE-\u2AFF\u2B30-\u2B44\u2B47-\u2B4C\uFB29\uFE62\uFE64-\uFE66\uFF0B\uFF1C-\uFF1E\uFF5C\uFF5E\uFFE2\uFFE9-\uFFEC",
                    astral: "\uD835[\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3]|\uD83B[\uDEF0\uDEF1]"
                }, {
                    name: 'So',
                    alias: 'Other_Symbol',
                    bmp: "\xA6\xA9\xAE\xB0\u0482\u058D\u058E\u060E\u060F\u06DE\u06E9\u06FD\u06FE\u07F6\u09FA\u0B70\u0BF3-\u0BF8\u0BFA\u0C7F\u0D4F\u0D79\u0F01-\u0F03\u0F13\u0F15-\u0F17\u0F1A-\u0F1F\u0F34\u0F36\u0F38\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE\u0FCF\u0FD5-\u0FD8\u109E\u109F\u1390-\u1399\u1940\u19DE-\u19FF\u1B61-\u1B6A\u1B74-\u1B7C\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116\u2117\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u214A\u214C\u214D\u214F\u218A\u218B\u2195-\u2199\u219C-\u219F\u21A1\u21A2\u21A4\u21A5\u21A7-\u21AD\u21AF-\u21CD\u21D0\u21D1\u21D3\u21D5-\u21F3\u2300-\u2307\u230C-\u231F\u2322-\u2328\u232B-\u237B\u237D-\u239A\u23B4-\u23DB\u23E2-\u23FE\u2400-\u2426\u2440-\u244A\u249C-\u24E9\u2500-\u25B6\u25B8-\u25C0\u25C2-\u25F7\u2600-\u266E\u2670-\u2767\u2794-\u27BF\u2800-\u28FF\u2B00-\u2B2F\u2B45\u2B46\u2B4D-\u2B73\u2B76-\u2B95\u2B98-\u2BB9\u2BBD-\u2BC8\u2BCA-\u2BD1\u2BEC-\u2BEF\u2CE5-\u2CEA\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFB\u3004\u3012\u3013\u3020\u3036\u3037\u303E\u303F\u3190\u3191\u3196-\u319F\u31C0-\u31E3\u3200-\u321E\u322A-\u3247\u3250\u3260-\u327F\u328A-\u32B0\u32C0-\u32FE\u3300-\u33FF\u4DC0-\u4DFF\uA490-\uA4C6\uA828-\uA82B\uA836\uA837\uA839\uAA77-\uAA79\uFDFD\uFFE4\uFFE8\uFFED\uFFEE\uFFFC\uFFFD",
                    astral: "\uD800[\uDD37-\uDD3F\uDD79-\uDD89\uDD8C-\uDD8E\uDD90-\uDD9B\uDDA0\uDDD0-\uDDFC]|\uD802[\uDC77\uDC78\uDEC8]|\uD805\uDF3F|\uD81A[\uDF3C-\uDF3F\uDF45]|\uD82F\uDC9C|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD64\uDD6A-\uDD6C\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDDE8\uDE00-\uDE41\uDE45\uDF00-\uDF56]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85\uDE86]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD10-\uDD2E\uDD30-\uDD6B\uDD70-\uDDAC\uDDE6-\uDE02\uDE10-\uDE3B\uDE40-\uDE48\uDE50\uDE51\uDF00-\uDFFA]|\uD83D[\uDC00-\uDED2\uDEE0-\uDEEC\uDEF0-\uDEF6\uDF00-\uDF73\uDF80-\uDFD4]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDD10-\uDD1E\uDD20-\uDD27\uDD30\uDD33-\uDD3E\uDD40-\uDD4B\uDD50-\uDD5E\uDD80-\uDD91\uDDC0]"
                }, {
                    name: 'Z',
                    alias: 'Separator',
                    bmp: " \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000"
                }, {
                    name: 'Zl',
                    alias: 'Line_Separator',
                    bmp: "\u2028"
                }, {
                    name: 'Zp',
                    alias: 'Paragraph_Separator',
                    bmp: "\u2029"
                }, {
                    name: 'Zs',
                    alias: 'Space_Separator',
                    bmp: " \xA0\u1680\u2000-\u200A\u202F\u205F\u3000"
                }]);
            };

            module.exports = exports['default'];
        }, {}], 6: [function (require, module, exports) {
            'use strict';

            Object.defineProperty(exports, "__esModule", {
                value: true
            });

            /*!
             * XRegExp Unicode Properties 4.0.0
             * <xregexp.com>
             * Steven Levithan (c) 2012-2017 MIT License
             * Unicode data by Mathias Bynens <mathiasbynens.be>
             */

            exports.default = function (XRegExp) {

                /**
                 * Adds properties to meet the UTS #18 Level 1 RL1.2 requirements for Unicode regex support. See
                 * <http://unicode.org/reports/tr18/#RL1.2>. Following are definitions of these properties from
                 * UAX #44 <http://unicode.org/reports/tr44/>:
                 *
                 * - Alphabetic
                 *   Characters with the Alphabetic property. Generated from: Lowercase + Uppercase + Lt + Lm +
                 *   Lo + Nl + Other_Alphabetic.
                 *
                 * - Default_Ignorable_Code_Point
                 *   For programmatic determination of default ignorable code points. New characters that should
                 *   be ignored in rendering (unless explicitly supported) will be assigned in these ranges,
                 *   permitting programs to correctly handle the default rendering of such characters when not
                 *   otherwise supported.
                 *
                 * - Lowercase
                 *   Characters with the Lowercase property. Generated from: Ll + Other_Lowercase.
                 *
                 * - Noncharacter_Code_Point
                 *   Code points permanently reserved for internal use.
                 *
                 * - Uppercase
                 *   Characters with the Uppercase property. Generated from: Lu + Other_Uppercase.
                 *
                 * - White_Space
                 *   Spaces, separator characters and other control characters which should be treated by
                 *   programming languages as "white space" for the purpose of parsing elements.
                 *
                 * The properties ASCII, Any, and Assigned are also included but are not defined in UAX #44. UTS
                 * #18 RL1.2 additionally requires support for Unicode scripts and general categories. These are
                 * included in XRegExp's Unicode Categories and Unicode Scripts addons.
                 *
                 * Token names are case insensitive, and any spaces, hyphens, and underscores are ignored.
                 *
                 * Uses Unicode 9.0.0.
                 *
                 * @requires XRegExp, Unicode Base
                 */

                if (!XRegExp.addUnicodeData) {
                    throw new ReferenceError('Unicode Base must be loaded before Unicode Properties');
                }

                var unicodeData = [{
                    name: 'ASCII',
                    bmp: '\0-\x7F'
                }, {
                    name: 'Alphabetic',
                    bmp: "A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0345\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05B0-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0657\u0659-\u065F\u066E-\u06D3\u06D5-\u06DC\u06E1-\u06E8\u06ED-\u06EF\u06FA-\u06FC\u06FF\u0710-\u073F\u074D-\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0817\u081A-\u082C\u0840-\u0858\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08DF\u08E3-\u08E9\u08F0-\u093B\u093D-\u094C\u094E-\u0950\u0955-\u0963\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD-\u09C4\u09C7\u09C8\u09CB\u09CC\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09F0\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3E-\u0A42\u0A47\u0A48\u0A4B\u0A4C\u0A51\u0A59-\u0A5C\u0A5E\u0A70-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD-\u0AC5\u0AC7-\u0AC9\u0ACB\u0ACC\u0AD0\u0AE0-\u0AE3\u0AF9\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D-\u0B44\u0B47\u0B48\u0B4B\u0B4C\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCC\u0BD0\u0BD7\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4C\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCC\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4C\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E46\u0E4D\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0ECD\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F71-\u0F81\u0F88-\u0F97\u0F99-\u0FBC\u1000-\u1036\u1038\u103B-\u103F\u1050-\u1062\u1065-\u1068\u106E-\u1086\u108E\u109C\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135F\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1713\u1720-\u1733\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17B3\u17B6-\u17C8\u17D7\u17DC\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u1938\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A1B\u1A20-\u1A5E\u1A61-\u1A74\u1AA7\u1B00-\u1B33\u1B35-\u1B43\u1B45-\u1B4B\u1B80-\u1BA9\u1BAC-\u1BAF\u1BBA-\u1BE5\u1BE7-\u1BF1\u1C00-\u1C35\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1D00-\u1DBF\u1DE7-\u1DF4\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u24B6-\u24E9\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA674-\uA67B\uA67F-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA827\uA840-\uA873\uA880-\uA8C3\uA8C5\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA92A\uA930-\uA952\uA960-\uA97C\uA980-\uA9B2\uA9B4-\uA9BF\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA60-\uAA76\uAA7A\uAA7E-\uAABE\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF5\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC",
                    astral: "\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC45\uDC82-\uDCB8\uDCD0-\uDCE8\uDD00-\uDD32\uDD50-\uDD72\uDD76\uDD80-\uDDBF\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE34\uDE37\uDE3E\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEE8\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D-\uDF44\uDF47\uDF48\uDF4B\uDF4C\uDF50\uDF57\uDF5D-\uDF63]|\uD805[\uDC00-\uDC41\uDC43-\uDC45\uDC47-\uDC4A\uDC80-\uDCC1\uDCC4\uDCC5\uDCC7\uDD80-\uDDB5\uDDB8-\uDDBE\uDDD8-\uDDDD\uDE00-\uDE3E\uDE40\uDE44\uDE80-\uDEB5\uDF00-\uDF19\uDF1D-\uDF2A]|\uD806[\uDCA0-\uDCDF\uDCFF\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC36\uDC38-\uDC3E\uDC40\uDC72-\uDC8F\uDC92-\uDCA7\uDCA9-\uDCB6]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF36\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF93-\uDF9F\uDFE0]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9E]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD47]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD83C[\uDD30-\uDD49\uDD50-\uDD69\uDD70-\uDD89]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]"
                }, {
                    name: 'Any',
                    isBmpLast: true,
                    bmp: "\0-\uFFFF",
                    astral: "[\uD800-\uDBFF][\uDC00-\uDFFF]"
                }, {
                    name: 'Default_Ignorable_Code_Point',
                    bmp: "\xAD\u034F\u061C\u115F\u1160\u17B4\u17B5\u180B-\u180E\u200B-\u200F\u202A-\u202E\u2060-\u206F\u3164\uFE00-\uFE0F\uFEFF\uFFA0\uFFF0-\uFFF8",
                    astral: "\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|[\uDB40-\uDB43][\uDC00-\uDFFF]"
                }, {
                    name: 'Lowercase',
                    bmp: "a-z\xAA\xB5\xBA\xDF-\xF6\xF8-\xFF\u0101\u0103\u0105\u0107\u0109\u010B\u010D\u010F\u0111\u0113\u0115\u0117\u0119\u011B\u011D\u011F\u0121\u0123\u0125\u0127\u0129\u012B\u012D\u012F\u0131\u0133\u0135\u0137\u0138\u013A\u013C\u013E\u0140\u0142\u0144\u0146\u0148\u0149\u014B\u014D\u014F\u0151\u0153\u0155\u0157\u0159\u015B\u015D\u015F\u0161\u0163\u0165\u0167\u0169\u016B\u016D\u016F\u0171\u0173\u0175\u0177\u017A\u017C\u017E-\u0180\u0183\u0185\u0188\u018C\u018D\u0192\u0195\u0199-\u019B\u019E\u01A1\u01A3\u01A5\u01A8\u01AA\u01AB\u01AD\u01B0\u01B4\u01B6\u01B9\u01BA\u01BD-\u01BF\u01C6\u01C9\u01CC\u01CE\u01D0\u01D2\u01D4\u01D6\u01D8\u01DA\u01DC\u01DD\u01DF\u01E1\u01E3\u01E5\u01E7\u01E9\u01EB\u01ED\u01EF\u01F0\u01F3\u01F5\u01F9\u01FB\u01FD\u01FF\u0201\u0203\u0205\u0207\u0209\u020B\u020D\u020F\u0211\u0213\u0215\u0217\u0219\u021B\u021D\u021F\u0221\u0223\u0225\u0227\u0229\u022B\u022D\u022F\u0231\u0233-\u0239\u023C\u023F\u0240\u0242\u0247\u0249\u024B\u024D\u024F-\u0293\u0295-\u02B8\u02C0\u02C1\u02E0-\u02E4\u0345\u0371\u0373\u0377\u037A-\u037D\u0390\u03AC-\u03CE\u03D0\u03D1\u03D5-\u03D7\u03D9\u03DB\u03DD\u03DF\u03E1\u03E3\u03E5\u03E7\u03E9\u03EB\u03ED\u03EF-\u03F3\u03F5\u03F8\u03FB\u03FC\u0430-\u045F\u0461\u0463\u0465\u0467\u0469\u046B\u046D\u046F\u0471\u0473\u0475\u0477\u0479\u047B\u047D\u047F\u0481\u048B\u048D\u048F\u0491\u0493\u0495\u0497\u0499\u049B\u049D\u049F\u04A1\u04A3\u04A5\u04A7\u04A9\u04AB\u04AD\u04AF\u04B1\u04B3\u04B5\u04B7\u04B9\u04BB\u04BD\u04BF\u04C2\u04C4\u04C6\u04C8\u04CA\u04CC\u04CE\u04CF\u04D1\u04D3\u04D5\u04D7\u04D9\u04DB\u04DD\u04DF\u04E1\u04E3\u04E5\u04E7\u04E9\u04EB\u04ED\u04EF\u04F1\u04F3\u04F5\u04F7\u04F9\u04FB\u04FD\u04FF\u0501\u0503\u0505\u0507\u0509\u050B\u050D\u050F\u0511\u0513\u0515\u0517\u0519\u051B\u051D\u051F\u0521\u0523\u0525\u0527\u0529\u052B\u052D\u052F\u0561-\u0587\u13F8-\u13FD\u1C80-\u1C88\u1D00-\u1DBF\u1E01\u1E03\u1E05\u1E07\u1E09\u1E0B\u1E0D\u1E0F\u1E11\u1E13\u1E15\u1E17\u1E19\u1E1B\u1E1D\u1E1F\u1E21\u1E23\u1E25\u1E27\u1E29\u1E2B\u1E2D\u1E2F\u1E31\u1E33\u1E35\u1E37\u1E39\u1E3B\u1E3D\u1E3F\u1E41\u1E43\u1E45\u1E47\u1E49\u1E4B\u1E4D\u1E4F\u1E51\u1E53\u1E55\u1E57\u1E59\u1E5B\u1E5D\u1E5F\u1E61\u1E63\u1E65\u1E67\u1E69\u1E6B\u1E6D\u1E6F\u1E71\u1E73\u1E75\u1E77\u1E79\u1E7B\u1E7D\u1E7F\u1E81\u1E83\u1E85\u1E87\u1E89\u1E8B\u1E8D\u1E8F\u1E91\u1E93\u1E95-\u1E9D\u1E9F\u1EA1\u1EA3\u1EA5\u1EA7\u1EA9\u1EAB\u1EAD\u1EAF\u1EB1\u1EB3\u1EB5\u1EB7\u1EB9\u1EBB\u1EBD\u1EBF\u1EC1\u1EC3\u1EC5\u1EC7\u1EC9\u1ECB\u1ECD\u1ECF\u1ED1\u1ED3\u1ED5\u1ED7\u1ED9\u1EDB\u1EDD\u1EDF\u1EE1\u1EE3\u1EE5\u1EE7\u1EE9\u1EEB\u1EED\u1EEF\u1EF1\u1EF3\u1EF5\u1EF7\u1EF9\u1EFB\u1EFD\u1EFF-\u1F07\u1F10-\u1F15\u1F20-\u1F27\u1F30-\u1F37\u1F40-\u1F45\u1F50-\u1F57\u1F60-\u1F67\u1F70-\u1F7D\u1F80-\u1F87\u1F90-\u1F97\u1FA0-\u1FA7\u1FB0-\u1FB4\u1FB6\u1FB7\u1FBE\u1FC2-\u1FC4\u1FC6\u1FC7\u1FD0-\u1FD3\u1FD6\u1FD7\u1FE0-\u1FE7\u1FF2-\u1FF4\u1FF6\u1FF7\u2071\u207F\u2090-\u209C\u210A\u210E\u210F\u2113\u212F\u2134\u2139\u213C\u213D\u2146-\u2149\u214E\u2170-\u217F\u2184\u24D0-\u24E9\u2C30-\u2C5E\u2C61\u2C65\u2C66\u2C68\u2C6A\u2C6C\u2C71\u2C73\u2C74\u2C76-\u2C7D\u2C81\u2C83\u2C85\u2C87\u2C89\u2C8B\u2C8D\u2C8F\u2C91\u2C93\u2C95\u2C97\u2C99\u2C9B\u2C9D\u2C9F\u2CA1\u2CA3\u2CA5\u2CA7\u2CA9\u2CAB\u2CAD\u2CAF\u2CB1\u2CB3\u2CB5\u2CB7\u2CB9\u2CBB\u2CBD\u2CBF\u2CC1\u2CC3\u2CC5\u2CC7\u2CC9\u2CCB\u2CCD\u2CCF\u2CD1\u2CD3\u2CD5\u2CD7\u2CD9\u2CDB\u2CDD\u2CDF\u2CE1\u2CE3\u2CE4\u2CEC\u2CEE\u2CF3\u2D00-\u2D25\u2D27\u2D2D\uA641\uA643\uA645\uA647\uA649\uA64B\uA64D\uA64F\uA651\uA653\uA655\uA657\uA659\uA65B\uA65D\uA65F\uA661\uA663\uA665\uA667\uA669\uA66B\uA66D\uA681\uA683\uA685\uA687\uA689\uA68B\uA68D\uA68F\uA691\uA693\uA695\uA697\uA699\uA69B-\uA69D\uA723\uA725\uA727\uA729\uA72B\uA72D\uA72F-\uA731\uA733\uA735\uA737\uA739\uA73B\uA73D\uA73F\uA741\uA743\uA745\uA747\uA749\uA74B\uA74D\uA74F\uA751\uA753\uA755\uA757\uA759\uA75B\uA75D\uA75F\uA761\uA763\uA765\uA767\uA769\uA76B\uA76D\uA76F-\uA778\uA77A\uA77C\uA77F\uA781\uA783\uA785\uA787\uA78C\uA78E\uA791\uA793-\uA795\uA797\uA799\uA79B\uA79D\uA79F\uA7A1\uA7A3\uA7A5\uA7A7\uA7A9\uA7B5\uA7B7\uA7F8-\uA7FA\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABBF\uFB00-\uFB06\uFB13-\uFB17\uFF41-\uFF5A",
                    astral: "\uD801[\uDC28-\uDC4F\uDCD8-\uDCFB]|\uD803[\uDCC0-\uDCF2]|\uD806[\uDCC0-\uDCDF]|\uD835[\uDC1A-\uDC33\uDC4E-\uDC54\uDC56-\uDC67\uDC82-\uDC9B\uDCB6-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDCCF\uDCEA-\uDD03\uDD1E-\uDD37\uDD52-\uDD6B\uDD86-\uDD9F\uDDBA-\uDDD3\uDDEE-\uDE07\uDE22-\uDE3B\uDE56-\uDE6F\uDE8A-\uDEA5\uDEC2-\uDEDA\uDEDC-\uDEE1\uDEFC-\uDF14\uDF16-\uDF1B\uDF36-\uDF4E\uDF50-\uDF55\uDF70-\uDF88\uDF8A-\uDF8F\uDFAA-\uDFC2\uDFC4-\uDFC9\uDFCB]|\uD83A[\uDD22-\uDD43]"
                }, {
                    name: 'Noncharacter_Code_Point',
                    bmp: "\uFDD0-\uFDEF\uFFFE\uFFFF",
                    astral: "[\uD83F\uD87F\uD8BF\uD8FF\uD93F\uD97F\uD9BF\uD9FF\uDA3F\uDA7F\uDABF\uDAFF\uDB3F\uDB7F\uDBBF\uDBFF][\uDFFE\uDFFF]"
                }, {
                    name: 'Uppercase',
                    bmp: "A-Z\xC0-\xD6\xD8-\xDE\u0100\u0102\u0104\u0106\u0108\u010A\u010C\u010E\u0110\u0112\u0114\u0116\u0118\u011A\u011C\u011E\u0120\u0122\u0124\u0126\u0128\u012A\u012C\u012E\u0130\u0132\u0134\u0136\u0139\u013B\u013D\u013F\u0141\u0143\u0145\u0147\u014A\u014C\u014E\u0150\u0152\u0154\u0156\u0158\u015A\u015C\u015E\u0160\u0162\u0164\u0166\u0168\u016A\u016C\u016E\u0170\u0172\u0174\u0176\u0178\u0179\u017B\u017D\u0181\u0182\u0184\u0186\u0187\u0189-\u018B\u018E-\u0191\u0193\u0194\u0196-\u0198\u019C\u019D\u019F\u01A0\u01A2\u01A4\u01A6\u01A7\u01A9\u01AC\u01AE\u01AF\u01B1-\u01B3\u01B5\u01B7\u01B8\u01BC\u01C4\u01C7\u01CA\u01CD\u01CF\u01D1\u01D3\u01D5\u01D7\u01D9\u01DB\u01DE\u01E0\u01E2\u01E4\u01E6\u01E8\u01EA\u01EC\u01EE\u01F1\u01F4\u01F6-\u01F8\u01FA\u01FC\u01FE\u0200\u0202\u0204\u0206\u0208\u020A\u020C\u020E\u0210\u0212\u0214\u0216\u0218\u021A\u021C\u021E\u0220\u0222\u0224\u0226\u0228\u022A\u022C\u022E\u0230\u0232\u023A\u023B\u023D\u023E\u0241\u0243-\u0246\u0248\u024A\u024C\u024E\u0370\u0372\u0376\u037F\u0386\u0388-\u038A\u038C\u038E\u038F\u0391-\u03A1\u03A3-\u03AB\u03CF\u03D2-\u03D4\u03D8\u03DA\u03DC\u03DE\u03E0\u03E2\u03E4\u03E6\u03E8\u03EA\u03EC\u03EE\u03F4\u03F7\u03F9\u03FA\u03FD-\u042F\u0460\u0462\u0464\u0466\u0468\u046A\u046C\u046E\u0470\u0472\u0474\u0476\u0478\u047A\u047C\u047E\u0480\u048A\u048C\u048E\u0490\u0492\u0494\u0496\u0498\u049A\u049C\u049E\u04A0\u04A2\u04A4\u04A6\u04A8\u04AA\u04AC\u04AE\u04B0\u04B2\u04B4\u04B6\u04B8\u04BA\u04BC\u04BE\u04C0\u04C1\u04C3\u04C5\u04C7\u04C9\u04CB\u04CD\u04D0\u04D2\u04D4\u04D6\u04D8\u04DA\u04DC\u04DE\u04E0\u04E2\u04E4\u04E6\u04E8\u04EA\u04EC\u04EE\u04F0\u04F2\u04F4\u04F6\u04F8\u04FA\u04FC\u04FE\u0500\u0502\u0504\u0506\u0508\u050A\u050C\u050E\u0510\u0512\u0514\u0516\u0518\u051A\u051C\u051E\u0520\u0522\u0524\u0526\u0528\u052A\u052C\u052E\u0531-\u0556\u10A0-\u10C5\u10C7\u10CD\u13A0-\u13F5\u1E00\u1E02\u1E04\u1E06\u1E08\u1E0A\u1E0C\u1E0E\u1E10\u1E12\u1E14\u1E16\u1E18\u1E1A\u1E1C\u1E1E\u1E20\u1E22\u1E24\u1E26\u1E28\u1E2A\u1E2C\u1E2E\u1E30\u1E32\u1E34\u1E36\u1E38\u1E3A\u1E3C\u1E3E\u1E40\u1E42\u1E44\u1E46\u1E48\u1E4A\u1E4C\u1E4E\u1E50\u1E52\u1E54\u1E56\u1E58\u1E5A\u1E5C\u1E5E\u1E60\u1E62\u1E64\u1E66\u1E68\u1E6A\u1E6C\u1E6E\u1E70\u1E72\u1E74\u1E76\u1E78\u1E7A\u1E7C\u1E7E\u1E80\u1E82\u1E84\u1E86\u1E88\u1E8A\u1E8C\u1E8E\u1E90\u1E92\u1E94\u1E9E\u1EA0\u1EA2\u1EA4\u1EA6\u1EA8\u1EAA\u1EAC\u1EAE\u1EB0\u1EB2\u1EB4\u1EB6\u1EB8\u1EBA\u1EBC\u1EBE\u1EC0\u1EC2\u1EC4\u1EC6\u1EC8\u1ECA\u1ECC\u1ECE\u1ED0\u1ED2\u1ED4\u1ED6\u1ED8\u1EDA\u1EDC\u1EDE\u1EE0\u1EE2\u1EE4\u1EE6\u1EE8\u1EEA\u1EEC\u1EEE\u1EF0\u1EF2\u1EF4\u1EF6\u1EF8\u1EFA\u1EFC\u1EFE\u1F08-\u1F0F\u1F18-\u1F1D\u1F28-\u1F2F\u1F38-\u1F3F\u1F48-\u1F4D\u1F59\u1F5B\u1F5D\u1F5F\u1F68-\u1F6F\u1FB8-\u1FBB\u1FC8-\u1FCB\u1FD8-\u1FDB\u1FE8-\u1FEC\u1FF8-\u1FFB\u2102\u2107\u210B-\u210D\u2110-\u2112\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u2130-\u2133\u213E\u213F\u2145\u2160-\u216F\u2183\u24B6-\u24CF\u2C00-\u2C2E\u2C60\u2C62-\u2C64\u2C67\u2C69\u2C6B\u2C6D-\u2C70\u2C72\u2C75\u2C7E-\u2C80\u2C82\u2C84\u2C86\u2C88\u2C8A\u2C8C\u2C8E\u2C90\u2C92\u2C94\u2C96\u2C98\u2C9A\u2C9C\u2C9E\u2CA0\u2CA2\u2CA4\u2CA6\u2CA8\u2CAA\u2CAC\u2CAE\u2CB0\u2CB2\u2CB4\u2CB6\u2CB8\u2CBA\u2CBC\u2CBE\u2CC0\u2CC2\u2CC4\u2CC6\u2CC8\u2CCA\u2CCC\u2CCE\u2CD0\u2CD2\u2CD4\u2CD6\u2CD8\u2CDA\u2CDC\u2CDE\u2CE0\u2CE2\u2CEB\u2CED\u2CF2\uA640\uA642\uA644\uA646\uA648\uA64A\uA64C\uA64E\uA650\uA652\uA654\uA656\uA658\uA65A\uA65C\uA65E\uA660\uA662\uA664\uA666\uA668\uA66A\uA66C\uA680\uA682\uA684\uA686\uA688\uA68A\uA68C\uA68E\uA690\uA692\uA694\uA696\uA698\uA69A\uA722\uA724\uA726\uA728\uA72A\uA72C\uA72E\uA732\uA734\uA736\uA738\uA73A\uA73C\uA73E\uA740\uA742\uA744\uA746\uA748\uA74A\uA74C\uA74E\uA750\uA752\uA754\uA756\uA758\uA75A\uA75C\uA75E\uA760\uA762\uA764\uA766\uA768\uA76A\uA76C\uA76E\uA779\uA77B\uA77D\uA77E\uA780\uA782\uA784\uA786\uA78B\uA78D\uA790\uA792\uA796\uA798\uA79A\uA79C\uA79E\uA7A0\uA7A2\uA7A4\uA7A6\uA7A8\uA7AA-\uA7AE\uA7B0-\uA7B4\uA7B6\uFF21-\uFF3A",
                    astral: "\uD801[\uDC00-\uDC27\uDCB0-\uDCD3]|\uD803[\uDC80-\uDCB2]|\uD806[\uDCA0-\uDCBF]|\uD835[\uDC00-\uDC19\uDC34-\uDC4D\uDC68-\uDC81\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB5\uDCD0-\uDCE9\uDD04\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD38\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD6C-\uDD85\uDDA0-\uDDB9\uDDD4-\uDDED\uDE08-\uDE21\uDE3C-\uDE55\uDE70-\uDE89\uDEA8-\uDEC0\uDEE2-\uDEFA\uDF1C-\uDF34\uDF56-\uDF6E\uDF90-\uDFA8\uDFCA]|\uD83A[\uDD00-\uDD21]|\uD83C[\uDD30-\uDD49\uDD50-\uDD69\uDD70-\uDD89]"
                }, {
                    name: 'White_Space',
                    bmp: "\t-\r \x85\xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000"
                }];

                // Add non-generated data
                unicodeData.push({
                    name: 'Assigned',
                    // Since this is defined as the inverse of Unicode category Cn (Unassigned), the Unicode
                    // Categories addon is required to use this property
                    inverseOf: 'Cn'
                });

                XRegExp.addUnicodeData(unicodeData);
            };

            module.exports = exports['default'];
        }, {}], 7: [function (require, module, exports) {
            'use strict';

            Object.defineProperty(exports, "__esModule", {
                value: true
            });

            /*!
             * XRegExp Unicode Scripts 4.0.0
             * <xregexp.com>
             * Steven Levithan (c) 2010-2017 MIT License
             * Unicode data by Mathias Bynens <mathiasbynens.be>
             */

            exports.default = function (XRegExp) {

                /**
                 * Adds support for all Unicode scripts. E.g., `\p{Latin}`. Token names are case insensitive,
                 * and any spaces, hyphens, and underscores are ignored.
                 *
                 * Uses Unicode 9.0.0.
                 *
                 * @requires XRegExp, Unicode Base
                 */

                if (!XRegExp.addUnicodeData) {
                    throw new ReferenceError('Unicode Base must be loaded before Unicode Scripts');
                }

                XRegExp.addUnicodeData([{
                    name: 'Adlam',
                    astral: "\uD83A[\uDD00-\uDD4A\uDD50-\uDD59\uDD5E\uDD5F]"
                }, {
                    name: 'Ahom',
                    astral: "\uD805[\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF3F]"
                }, {
                    name: 'Anatolian_Hieroglyphs',
                    astral: "\uD811[\uDC00-\uDE46]"
                }, {
                    name: 'Arabic',
                    bmp: "\u0600-\u0604\u0606-\u060B\u060D-\u061A\u061E\u0620-\u063F\u0641-\u064A\u0656-\u066F\u0671-\u06DC\u06DE-\u06FF\u0750-\u077F\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u08FF\uFB50-\uFBC1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFD\uFE70-\uFE74\uFE76-\uFEFC",
                    astral: "\uD803[\uDE60-\uDE7E]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB\uDEF0\uDEF1]"
                }, {
                    name: 'Armenian',
                    bmp: "\u0531-\u0556\u0559-\u055F\u0561-\u0587\u058A\u058D-\u058F\uFB13-\uFB17"
                }, {
                    name: 'Avestan',
                    astral: "\uD802[\uDF00-\uDF35\uDF39-\uDF3F]"
                }, {
                    name: 'Balinese',
                    bmp: "\u1B00-\u1B4B\u1B50-\u1B7C"
                }, {
                    name: 'Bamum',
                    bmp: "\uA6A0-\uA6F7",
                    astral: "\uD81A[\uDC00-\uDE38]"
                }, {
                    name: 'Bassa_Vah',
                    astral: "\uD81A[\uDED0-\uDEED\uDEF0-\uDEF5]"
                }, {
                    name: 'Batak',
                    bmp: "\u1BC0-\u1BF3\u1BFC-\u1BFF"
                }, {
                    name: 'Bengali',
                    bmp: "\u0980-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09FB"
                }, {
                    name: 'Bhaiksuki',
                    astral: "\uD807[\uDC00-\uDC08\uDC0A-\uDC36\uDC38-\uDC45\uDC50-\uDC6C]"
                }, {
                    name: 'Bopomofo',
                    bmp: "\u02EA\u02EB\u3105-\u312D\u31A0-\u31BA"
                }, {
                    name: 'Brahmi',
                    astral: "\uD804[\uDC00-\uDC4D\uDC52-\uDC6F\uDC7F]"
                }, {
                    name: 'Braille',
                    bmp: "\u2800-\u28FF"
                }, {
                    name: 'Buginese',
                    bmp: "\u1A00-\u1A1B\u1A1E\u1A1F"
                }, {
                    name: 'Buhid',
                    bmp: "\u1740-\u1753"
                }, {
                    name: 'Canadian_Aboriginal',
                    bmp: "\u1400-\u167F\u18B0-\u18F5"
                }, {
                    name: 'Carian',
                    astral: "\uD800[\uDEA0-\uDED0]"
                }, {
                    name: 'Caucasian_Albanian',
                    astral: "\uD801[\uDD30-\uDD63\uDD6F]"
                }, {
                    name: 'Chakma',
                    astral: "\uD804[\uDD00-\uDD34\uDD36-\uDD43]"
                }, {
                    name: 'Cham',
                    bmp: "\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA5C-\uAA5F"
                }, {
                    name: 'Cherokee',
                    bmp: "\u13A0-\u13F5\u13F8-\u13FD\uAB70-\uABBF"
                }, {
                    name: 'Common',
                    bmp: "\0-@\\x5B-`\\x7B-\xA9\xAB-\xB9\xBB-\xBF\xD7\xF7\u02B9-\u02DF\u02E5-\u02E9\u02EC-\u02FF\u0374\u037E\u0385\u0387\u0589\u0605\u060C\u061B\u061C\u061F\u0640\u06DD\u08E2\u0964\u0965\u0E3F\u0FD5-\u0FD8\u10FB\u16EB-\u16ED\u1735\u1736\u1802\u1803\u1805\u1CD3\u1CE1\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u2000-\u200B\u200E-\u2064\u2066-\u2070\u2074-\u207E\u2080-\u208E\u20A0-\u20BE\u2100-\u2125\u2127-\u2129\u212C-\u2131\u2133-\u214D\u214F-\u215F\u2189-\u218B\u2190-\u23FE\u2400-\u2426\u2440-\u244A\u2460-\u27FF\u2900-\u2B73\u2B76-\u2B95\u2B98-\u2BB9\u2BBD-\u2BC8\u2BCA-\u2BD1\u2BEC-\u2BEF\u2E00-\u2E44\u2FF0-\u2FFB\u3000-\u3004\u3006\u3008-\u3020\u3030-\u3037\u303C-\u303F\u309B\u309C\u30A0\u30FB\u30FC\u3190-\u319F\u31C0-\u31E3\u3220-\u325F\u327F-\u32CF\u3358-\u33FF\u4DC0-\u4DFF\uA700-\uA721\uA788-\uA78A\uA830-\uA839\uA92E\uA9CF\uAB5B\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE66\uFE68-\uFE6B\uFEFF\uFF01-\uFF20\uFF3B-\uFF40\uFF5B-\uFF65\uFF70\uFF9E\uFF9F\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFF9-\uFFFD",
                    astral: "\uD800[\uDD00-\uDD02\uDD07-\uDD33\uDD37-\uDD3F\uDD90-\uDD9B\uDDD0-\uDDFC\uDEE1-\uDEFB]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD66\uDD6A-\uDD7A\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDDE8\uDF00-\uDF56\uDF60-\uDF71]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDFCB\uDFCE-\uDFFF]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD00-\uDD0C\uDD10-\uDD2E\uDD30-\uDD6B\uDD70-\uDDAC\uDDE6-\uDDFF\uDE01\uDE02\uDE10-\uDE3B\uDE40-\uDE48\uDE50\uDE51\uDF00-\uDFFF]|\uD83D[\uDC00-\uDED2\uDEE0-\uDEEC\uDEF0-\uDEF6\uDF00-\uDF73\uDF80-\uDFD4]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDD10-\uDD1E\uDD20-\uDD27\uDD30\uDD33-\uDD3E\uDD40-\uDD4B\uDD50-\uDD5E\uDD80-\uDD91\uDDC0]|\uDB40[\uDC01\uDC20-\uDC7F]"
                }, {
                    name: 'Coptic',
                    bmp: "\u03E2-\u03EF\u2C80-\u2CF3\u2CF9-\u2CFF"
                }, {
                    name: 'Cuneiform',
                    astral: "\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC70-\uDC74\uDC80-\uDD43]"
                }, {
                    name: 'Cypriot',
                    astral: "\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F]"
                }, {
                    name: 'Cyrillic',
                    bmp: "\u0400-\u0484\u0487-\u052F\u1C80-\u1C88\u1D2B\u1D78\u2DE0-\u2DFF\uA640-\uA69F\uFE2E\uFE2F"
                }, {
                    name: 'Deseret',
                    astral: "\uD801[\uDC00-\uDC4F]"
                }, {
                    name: 'Devanagari',
                    bmp: "\u0900-\u0950\u0953-\u0963\u0966-\u097F\uA8E0-\uA8FD"
                }, {
                    name: 'Duployan',
                    astral: "\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9C-\uDC9F]"
                }, {
                    name: 'Egyptian_Hieroglyphs',
                    astral: "\uD80C[\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]"
                }, {
                    name: 'Elbasan',
                    astral: "\uD801[\uDD00-\uDD27]"
                }, {
                    name: 'Ethiopic',
                    bmp: "\u1200-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u137C\u1380-\u1399\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E"
                }, {
                    name: 'Georgian',
                    bmp: "\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u10FF\u2D00-\u2D25\u2D27\u2D2D"
                }, {
                    name: 'Glagolitic',
                    bmp: "\u2C00-\u2C2E\u2C30-\u2C5E",
                    astral: "\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A]"
                }, {
                    name: 'Gothic',
                    astral: "\uD800[\uDF30-\uDF4A]"
                }, {
                    name: 'Grantha',
                    astral: "\uD804[\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]"
                }, {
                    name: 'Greek',
                    bmp: "\u0370-\u0373\u0375-\u0377\u037A-\u037D\u037F\u0384\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03E1\u03F0-\u03FF\u1D26-\u1D2A\u1D5D-\u1D61\u1D66-\u1D6A\u1DBF\u1F00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FC4\u1FC6-\u1FD3\u1FD6-\u1FDB\u1FDD-\u1FEF\u1FF2-\u1FF4\u1FF6-\u1FFE\u2126\uAB65",
                    astral: "\uD800[\uDD40-\uDD8E\uDDA0]|\uD834[\uDE00-\uDE45]"
                }, {
                    name: 'Gujarati',
                    bmp: "\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AF1\u0AF9"
                }, {
                    name: 'Gurmukhi',
                    bmp: "\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75"
                }, {
                    name: 'Han',
                    bmp: "\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u3005\u3007\u3021-\u3029\u3038-\u303B\u3400-\u4DB5\u4E00-\u9FD5\uF900-\uFA6D\uFA70-\uFAD9",
                    astral: "[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]"
                }, {
                    name: 'Hangul',
                    bmp: "\u1100-\u11FF\u302E\u302F\u3131-\u318E\u3200-\u321E\u3260-\u327E\uA960-\uA97C\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uFFA0-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC"
                }, {
                    name: 'Hanunoo',
                    bmp: "\u1720-\u1734"
                }, {
                    name: 'Hatran',
                    astral: "\uD802[\uDCE0-\uDCF2\uDCF4\uDCF5\uDCFB-\uDCFF]"
                }, {
                    name: 'Hebrew',
                    bmp: "\u0591-\u05C7\u05D0-\u05EA\u05F0-\u05F4\uFB1D-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFB4F"
                }, {
                    name: 'Hiragana',
                    bmp: "\u3041-\u3096\u309D-\u309F",
                    astral: "\uD82C\uDC01|\uD83C\uDE00"
                }, {
                    name: 'Imperial_Aramaic',
                    astral: "\uD802[\uDC40-\uDC55\uDC57-\uDC5F]"
                }, {
                    name: 'Inherited',
                    bmp: "\u0300-\u036F\u0485\u0486\u064B-\u0655\u0670\u0951\u0952\u1AB0-\u1ABE\u1CD0-\u1CD2\u1CD4-\u1CE0\u1CE2-\u1CE8\u1CED\u1CF4\u1CF8\u1CF9\u1DC0-\u1DF5\u1DFB-\u1DFF\u200C\u200D\u20D0-\u20F0\u302A-\u302D\u3099\u309A\uFE00-\uFE0F\uFE20-\uFE2D",
                    astral: "\uD800[\uDDFD\uDEE0]|\uD834[\uDD67-\uDD69\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD]|\uDB40[\uDD00-\uDDEF]"
                }, {
                    name: 'Inscriptional_Pahlavi',
                    astral: "\uD802[\uDF60-\uDF72\uDF78-\uDF7F]"
                }, {
                    name: 'Inscriptional_Parthian',
                    astral: "\uD802[\uDF40-\uDF55\uDF58-\uDF5F]"
                }, {
                    name: 'Javanese',
                    bmp: "\uA980-\uA9CD\uA9D0-\uA9D9\uA9DE\uA9DF"
                }, {
                    name: 'Kaithi',
                    astral: "\uD804[\uDC80-\uDCC1]"
                }, {
                    name: 'Kannada',
                    bmp: "\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2"
                }, {
                    name: 'Katakana',
                    bmp: "\u30A1-\u30FA\u30FD-\u30FF\u31F0-\u31FF\u32D0-\u32FE\u3300-\u3357\uFF66-\uFF6F\uFF71-\uFF9D",
                    astral: "\uD82C\uDC00"
                }, {
                    name: 'Kayah_Li',
                    bmp: "\uA900-\uA92D\uA92F"
                }, {
                    name: 'Kharoshthi',
                    astral: "\uD802[\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F-\uDE47\uDE50-\uDE58]"
                }, {
                    name: 'Khmer',
                    bmp: "\u1780-\u17DD\u17E0-\u17E9\u17F0-\u17F9\u19E0-\u19FF"
                }, {
                    name: 'Khojki',
                    astral: "\uD804[\uDE00-\uDE11\uDE13-\uDE3E]"
                }, {
                    name: 'Khudawadi',
                    astral: "\uD804[\uDEB0-\uDEEA\uDEF0-\uDEF9]"
                }, {
                    name: 'Lao',
                    bmp: "\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF"
                }, {
                    name: 'Latin',
                    bmp: "A-Za-z\xAA\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02B8\u02E0-\u02E4\u1D00-\u1D25\u1D2C-\u1D5C\u1D62-\u1D65\u1D6B-\u1D77\u1D79-\u1DBE\u1E00-\u1EFF\u2071\u207F\u2090-\u209C\u212A\u212B\u2132\u214E\u2160-\u2188\u2C60-\u2C7F\uA722-\uA787\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA7FF\uAB30-\uAB5A\uAB5C-\uAB64\uFB00-\uFB06\uFF21-\uFF3A\uFF41-\uFF5A"
                }, {
                    name: 'Lepcha',
                    bmp: "\u1C00-\u1C37\u1C3B-\u1C49\u1C4D-\u1C4F"
                }, {
                    name: 'Limbu',
                    bmp: "\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1940\u1944-\u194F"
                }, {
                    name: 'Linear_A',
                    astral: "\uD801[\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]"
                }, {
                    name: 'Linear_B',
                    astral: "\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA]"
                }, {
                    name: 'Lisu',
                    bmp: "\uA4D0-\uA4FF"
                }, {
                    name: 'Lycian',
                    astral: "\uD800[\uDE80-\uDE9C]"
                }, {
                    name: 'Lydian',
                    astral: "\uD802[\uDD20-\uDD39\uDD3F]"
                }, {
                    name: 'Mahajani',
                    astral: "\uD804[\uDD50-\uDD76]"
                }, {
                    name: 'Malayalam',
                    bmp: "\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4F\u0D54-\u0D63\u0D66-\u0D7F"
                }, {
                    name: 'Mandaic',
                    bmp: "\u0840-\u085B\u085E"
                }, {
                    name: 'Manichaean',
                    astral: "\uD802[\uDEC0-\uDEE6\uDEEB-\uDEF6]"
                }, {
                    name: 'Marchen',
                    astral: "\uD807[\uDC70-\uDC8F\uDC92-\uDCA7\uDCA9-\uDCB6]"
                }, {
                    name: 'Meetei_Mayek',
                    bmp: "\uAAE0-\uAAF6\uABC0-\uABED\uABF0-\uABF9"
                }, {
                    name: 'Mende_Kikakui',
                    astral: "\uD83A[\uDC00-\uDCC4\uDCC7-\uDCD6]"
                }, {
                    name: 'Meroitic_Cursive',
                    astral: "\uD802[\uDDA0-\uDDB7\uDDBC-\uDDCF\uDDD2-\uDDFF]"
                }, {
                    name: 'Meroitic_Hieroglyphs',
                    astral: "\uD802[\uDD80-\uDD9F]"
                }, {
                    name: 'Miao',
                    astral: "\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F]"
                }, {
                    name: 'Modi',
                    astral: "\uD805[\uDE00-\uDE44\uDE50-\uDE59]"
                }, {
                    name: 'Mongolian',
                    bmp: "\u1800\u1801\u1804\u1806-\u180E\u1810-\u1819\u1820-\u1877\u1880-\u18AA",
                    astral: "\uD805[\uDE60-\uDE6C]"
                }, {
                    name: 'Mro',
                    astral: "\uD81A[\uDE40-\uDE5E\uDE60-\uDE69\uDE6E\uDE6F]"
                }, {
                    name: 'Multani',
                    astral: "\uD804[\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA9]"
                }, {
                    name: 'Myanmar',
                    bmp: "\u1000-\u109F\uA9E0-\uA9FE\uAA60-\uAA7F"
                }, {
                    name: 'Nabataean',
                    astral: "\uD802[\uDC80-\uDC9E\uDCA7-\uDCAF]"
                }, {
                    name: 'New_Tai_Lue',
                    bmp: "\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u19DE\u19DF"
                }, {
                    name: 'Newa',
                    astral: "\uD805[\uDC00-\uDC59\uDC5B\uDC5D]"
                }, {
                    name: 'Nko',
                    bmp: "\u07C0-\u07FA"
                }, {
                    name: 'Ogham',
                    bmp: "\u1680-\u169C"
                }, {
                    name: 'Ol_Chiki',
                    bmp: "\u1C50-\u1C7F"
                }, {
                    name: 'Old_Hungarian',
                    astral: "\uD803[\uDC80-\uDCB2\uDCC0-\uDCF2\uDCFA-\uDCFF]"
                }, {
                    name: 'Old_Italic',
                    astral: "\uD800[\uDF00-\uDF23]"
                }, {
                    name: 'Old_North_Arabian',
                    astral: "\uD802[\uDE80-\uDE9F]"
                }, {
                    name: 'Old_Permic',
                    astral: "\uD800[\uDF50-\uDF7A]"
                }, {
                    name: 'Old_Persian',
                    astral: "\uD800[\uDFA0-\uDFC3\uDFC8-\uDFD5]"
                }, {
                    name: 'Old_South_Arabian',
                    astral: "\uD802[\uDE60-\uDE7F]"
                }, {
                    name: 'Old_Turkic',
                    astral: "\uD803[\uDC00-\uDC48]"
                }, {
                    name: 'Oriya',
                    bmp: "\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B77"
                }, {
                    name: 'Osage',
                    astral: "\uD801[\uDCB0-\uDCD3\uDCD8-\uDCFB]"
                }, {
                    name: 'Osmanya',
                    astral: "\uD801[\uDC80-\uDC9D\uDCA0-\uDCA9]"
                }, {
                    name: 'Pahawh_Hmong',
                    astral: "\uD81A[\uDF00-\uDF45\uDF50-\uDF59\uDF5B-\uDF61\uDF63-\uDF77\uDF7D-\uDF8F]"
                }, {
                    name: 'Palmyrene',
                    astral: "\uD802[\uDC60-\uDC7F]"
                }, {
                    name: 'Pau_Cin_Hau',
                    astral: "\uD806[\uDEC0-\uDEF8]"
                }, {
                    name: 'Phags_Pa',
                    bmp: "\uA840-\uA877"
                }, {
                    name: 'Phoenician',
                    astral: "\uD802[\uDD00-\uDD1B\uDD1F]"
                }, {
                    name: 'Psalter_Pahlavi',
                    astral: "\uD802[\uDF80-\uDF91\uDF99-\uDF9C\uDFA9-\uDFAF]"
                }, {
                    name: 'Rejang',
                    bmp: "\uA930-\uA953\uA95F"
                }, {
                    name: 'Runic',
                    bmp: "\u16A0-\u16EA\u16EE-\u16F8"
                }, {
                    name: 'Samaritan',
                    bmp: "\u0800-\u082D\u0830-\u083E"
                }, {
                    name: 'Saurashtra',
                    bmp: "\uA880-\uA8C5\uA8CE-\uA8D9"
                }, {
                    name: 'Sharada',
                    astral: "\uD804[\uDD80-\uDDCD\uDDD0-\uDDDF]"
                }, {
                    name: 'Shavian',
                    astral: "\uD801[\uDC50-\uDC7F]"
                }, {
                    name: 'Siddham',
                    astral: "\uD805[\uDD80-\uDDB5\uDDB8-\uDDDD]"
                }, {
                    name: 'SignWriting',
                    astral: "\uD836[\uDC00-\uDE8B\uDE9B-\uDE9F\uDEA1-\uDEAF]"
                }, {
                    name: 'Sinhala',
                    bmp: "\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2-\u0DF4",
                    astral: "\uD804[\uDDE1-\uDDF4]"
                }, {
                    name: 'Sora_Sompeng',
                    astral: "\uD804[\uDCD0-\uDCE8\uDCF0-\uDCF9]"
                }, {
                    name: 'Sundanese',
                    bmp: "\u1B80-\u1BBF\u1CC0-\u1CC7"
                }, {
                    name: 'Syloti_Nagri',
                    bmp: "\uA800-\uA82B"
                }, {
                    name: 'Syriac',
                    bmp: "\u0700-\u070D\u070F-\u074A\u074D-\u074F"
                }, {
                    name: 'Tagalog',
                    bmp: "\u1700-\u170C\u170E-\u1714"
                }, {
                    name: 'Tagbanwa',
                    bmp: "\u1760-\u176C\u176E-\u1770\u1772\u1773"
                }, {
                    name: 'Tai_Le',
                    bmp: "\u1950-\u196D\u1970-\u1974"
                }, {
                    name: 'Tai_Tham',
                    bmp: "\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA0-\u1AAD"
                }, {
                    name: 'Tai_Viet',
                    bmp: "\uAA80-\uAAC2\uAADB-\uAADF"
                }, {
                    name: 'Takri',
                    astral: "\uD805[\uDE80-\uDEB7\uDEC0-\uDEC9]"
                }, {
                    name: 'Tamil',
                    bmp: "\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BFA"
                }, {
                    name: 'Tangut',
                    astral: "\uD81B\uDFE0|[\uD81C-\uD820][\uDC00-\uDFFF]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]"
                }, {
                    name: 'Telugu',
                    bmp: "\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C78-\u0C7F"
                }, {
                    name: 'Thaana',
                    bmp: "\u0780-\u07B1"
                }, {
                    name: 'Thai',
                    bmp: "\u0E01-\u0E3A\u0E40-\u0E5B"
                }, {
                    name: 'Tibetan',
                    bmp: "\u0F00-\u0F47\u0F49-\u0F6C\u0F71-\u0F97\u0F99-\u0FBC\u0FBE-\u0FCC\u0FCE-\u0FD4\u0FD9\u0FDA"
                }, {
                    name: 'Tifinagh',
                    bmp: "\u2D30-\u2D67\u2D6F\u2D70\u2D7F"
                }, {
                    name: 'Tirhuta',
                    astral: "\uD805[\uDC80-\uDCC7\uDCD0-\uDCD9]"
                }, {
                    name: 'Ugaritic',
                    astral: "\uD800[\uDF80-\uDF9D\uDF9F]"
                }, {
                    name: 'Vai',
                    bmp: "\uA500-\uA62B"
                }, {
                    name: 'Warang_Citi',
                    astral: "\uD806[\uDCA0-\uDCF2\uDCFF]"
                }, {
                    name: 'Yi',
                    bmp: "\uA000-\uA48C\uA490-\uA4C6"
                }]);
            };

            module.exports = exports['default'];
        }, {}], 8: [function (require, module, exports) {
            'use strict';

            Object.defineProperty(exports, "__esModule", {
                value: true
            });

            var _xregexp = require('./xregexp');

            var _xregexp2 = _interopRequireDefault(_xregexp);

            var _build = require('./addons/build');

            var _build2 = _interopRequireDefault(_build);

            var _matchrecursive = require('./addons/matchrecursive');

            var _matchrecursive2 = _interopRequireDefault(_matchrecursive);

            var _unicodeBase = require('./addons/unicode-base');

            var _unicodeBase2 = _interopRequireDefault(_unicodeBase);

            var _unicodeBlocks = require('./addons/unicode-blocks');

            var _unicodeBlocks2 = _interopRequireDefault(_unicodeBlocks);

            var _unicodeCategories = require('./addons/unicode-categories');

            var _unicodeCategories2 = _interopRequireDefault(_unicodeCategories);

            var _unicodeProperties = require('./addons/unicode-properties');

            var _unicodeProperties2 = _interopRequireDefault(_unicodeProperties);

            var _unicodeScripts = require('./addons/unicode-scripts');

            var _unicodeScripts2 = _interopRequireDefault(_unicodeScripts);

            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : { default: obj };
            }

            (0, _build2.default)(_xregexp2.default);
            (0, _matchrecursive2.default)(_xregexp2.default);
            (0, _unicodeBase2.default)(_xregexp2.default);
            (0, _unicodeBlocks2.default)(_xregexp2.default);
            (0, _unicodeCategories2.default)(_xregexp2.default);
            (0, _unicodeProperties2.default)(_xregexp2.default);
            (0, _unicodeScripts2.default)(_xregexp2.default);

            exports.default = _xregexp2.default;
            module.exports = exports['default'];
        }, { "./addons/build": 1, "./addons/matchrecursive": 2, "./addons/unicode-base": 3, "./addons/unicode-blocks": 4, "./addons/unicode-categories": 5, "./addons/unicode-properties": 6, "./addons/unicode-scripts": 7, "./xregexp": 9 }], 9: [function (require, module, exports) {
            'use strict';

            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            /*!
             * XRegExp 4.0.0
             * <xregexp.com>
             * Steven Levithan (c) 2007-2017 MIT License
             */

            /**
             * XRegExp provides augmented, extensible regular expressions. You get additional regex syntax and
             * flags, beyond what browsers support natively. XRegExp is also a regex utility belt with tools to
             * make your client-side grepping simpler and more powerful, while freeing you from related
             * cross-browser inconsistencies.
             */

            // ==--------------------------==
            // Private stuff
            // ==--------------------------==

            // Property name used for extended regex instance data
            var REGEX_DATA = 'xregexp';
            // Optional features that can be installed and uninstalled
            var features = {
                astral: false
            };
            // Native methods to use and restore ('native' is an ES3 reserved keyword)
            var nativ = {
                exec: RegExp.prototype.exec,
                test: RegExp.prototype.test,
                match: String.prototype.match,
                replace: String.prototype.replace,
                split: String.prototype.split
            };
            // Storage for fixed/extended native methods
            var fixed = {};
            // Storage for regexes cached by `XRegExp.cache`
            var regexCache = {};
            // Storage for pattern details cached by the `XRegExp` constructor
            var patternCache = {};
            // Storage for regex syntax tokens added internally or by `XRegExp.addToken`
            var tokens = [];
            // Token scopes
            var defaultScope = 'default';
            var classScope = 'class';
            // Regexes that match native regex syntax, including octals
            var nativeTokens = {
                // Any native multicharacter token in default scope, or any single character
                'default': /\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9]\d*|x[\dA-Fa-f]{2}|u(?:[\dA-Fa-f]{4}|{[\dA-Fa-f]+})|c[A-Za-z]|[\s\S])|\(\?(?:[:=!]|<[=!])|[?*+]\?|{\d+(?:,\d*)?}\??|[\s\S]/,
                // Any native multicharacter token in character class scope, or any single character
                'class': /\\(?:[0-3][0-7]{0,2}|[4-7][0-7]?|x[\dA-Fa-f]{2}|u(?:[\dA-Fa-f]{4}|{[\dA-Fa-f]+})|c[A-Za-z]|[\s\S])|[\s\S]/
            };
            // Any backreference or dollar-prefixed character in replacement strings
            var replacementToken = /\$(?:{([\w$]+)}|<([\w$]+)>|(\d\d?|[\s\S]))/g;
            // Check for correct `exec` handling of nonparticipating capturing groups
            var correctExecNpcg = nativ.exec.call(/()??/, '')[1] === undefined;
            // Check for ES6 `flags` prop support
            var hasFlagsProp = /x/.flags !== undefined;
            // Shortcut to `Object.prototype.toString`
            var toString = {}.toString;

            function hasNativeFlag(flag) {
                // Can't check based on the presence of properties/getters since browsers might support such
                // properties even when they don't support the corresponding flag in regex construction (tested
                // in Chrome 48, where `'unicode' in /x/` is true but trying to construct a regex with flag `u`
                // throws an error)
                var isSupported = true;
                try {
                    // Can't use regex literals for testing even in a `try` because regex literals with
                    // unsupported flags cause a compilation error in IE
                    new RegExp('', flag);
                } catch (exception) {
                    isSupported = false;
                }
                return isSupported;
            }
            // Check for ES6 `u` flag support
            var hasNativeU = hasNativeFlag('u');
            // Check for ES6 `y` flag support
            var hasNativeY = hasNativeFlag('y');
            // Tracker for known flags, including addon flags
            var registeredFlags = {
                g: true,
                i: true,
                m: true,
                u: hasNativeU,
                y: hasNativeY
            };

            /**
             * Attaches extended data and `XRegExp.prototype` properties to a regex object.
             *
             * @private
             * @param {RegExp} regex Regex to augment.
             * @param {Array} captureNames Array with capture names, or `null`.
             * @param {String} xSource XRegExp pattern used to generate `regex`, or `null` if N/A.
             * @param {String} xFlags XRegExp flags used to generate `regex`, or `null` if N/A.
             * @param {Boolean} [isInternalOnly=false] Whether the regex will be used only for internal
             *   operations, and never exposed to users. For internal-only regexes, we can improve perf by
             *   skipping some operations like attaching `XRegExp.prototype` properties.
             * @returns {RegExp} Augmented regex.
             */
            function augment(regex, captureNames, xSource, xFlags, isInternalOnly) {
                var p = void 0;

                regex[REGEX_DATA] = {
                    captureNames: captureNames
                };

                if (isInternalOnly) {
                    return regex;
                }

                // Can't auto-inherit these since the XRegExp constructor returns a nonprimitive value
                if (regex.__proto__) {
                    regex.__proto__ = XRegExp.prototype;
                } else {
                    for (p in XRegExp.prototype) {
                        // An `XRegExp.prototype.hasOwnProperty(p)` check wouldn't be worth it here, since this
                        // is performance sensitive, and enumerable `Object.prototype` or `RegExp.prototype`
                        // extensions exist on `regex.prototype` anyway
                        regex[p] = XRegExp.prototype[p];
                    }
                }

                regex[REGEX_DATA].source = xSource;
                // Emulate the ES6 `flags` prop by ensuring flags are in alphabetical order
                regex[REGEX_DATA].flags = xFlags ? xFlags.split('').sort().join('') : xFlags;

                return regex;
            }

            /**
             * Removes any duplicate characters from the provided string.
             *
             * @private
             * @param {String} str String to remove duplicate characters from.
             * @returns {String} String with any duplicate characters removed.
             */
            function clipDuplicates(str) {
                return nativ.replace.call(str, /([\s\S])(?=[\s\S]*\1)/g, '');
            }

            /**
             * Copies a regex object while preserving extended data and augmenting with `XRegExp.prototype`
             * properties. The copy has a fresh `lastIndex` property (set to zero). Allows adding and removing
             * flags g and y while copying the regex.
             *
             * @private
             * @param {RegExp} regex Regex to copy.
             * @param {Object} [options] Options object with optional properties:
             *   - `addG` {Boolean} Add flag g while copying the regex.
             *   - `addY` {Boolean} Add flag y while copying the regex.
             *   - `removeG` {Boolean} Remove flag g while copying the regex.
             *   - `removeY` {Boolean} Remove flag y while copying the regex.
             *   - `isInternalOnly` {Boolean} Whether the copied regex will be used only for internal
             *     operations, and never exposed to users. For internal-only regexes, we can improve perf by
             *     skipping some operations like attaching `XRegExp.prototype` properties.
             *   - `source` {String} Overrides `<regex>.source`, for special cases.
             * @returns {RegExp} Copy of the provided regex, possibly with modified flags.
             */
            function copyRegex(regex, options) {
                if (!XRegExp.isRegExp(regex)) {
                    throw new TypeError('Type RegExp expected');
                }

                var xData = regex[REGEX_DATA] || {};
                var flags = getNativeFlags(regex);
                var flagsToAdd = '';
                var flagsToRemove = '';
                var xregexpSource = null;
                var xregexpFlags = null;

                options = options || {};

                if (options.removeG) {
                    flagsToRemove += 'g';
                }
                if (options.removeY) {
                    flagsToRemove += 'y';
                }
                if (flagsToRemove) {
                    flags = nativ.replace.call(flags, new RegExp('[' + flagsToRemove + ']+', 'g'), '');
                }

                if (options.addG) {
                    flagsToAdd += 'g';
                }
                if (options.addY) {
                    flagsToAdd += 'y';
                }
                if (flagsToAdd) {
                    flags = clipDuplicates(flags + flagsToAdd);
                }

                if (!options.isInternalOnly) {
                    if (xData.source !== undefined) {
                        xregexpSource = xData.source;
                    }
                    // null or undefined; don't want to add to `flags` if the previous value was null, since
                    // that indicates we're not tracking original precompilation flags
                    if (xData.flags != null) {
                        // Flags are only added for non-internal regexes by `XRegExp.globalize`. Flags are never
                        // removed for non-internal regexes, so don't need to handle it
                        xregexpFlags = flagsToAdd ? clipDuplicates(xData.flags + flagsToAdd) : xData.flags;
                    }
                }

                // Augment with `XRegExp.prototype` properties, but use the native `RegExp` constructor to avoid
                // searching for special tokens. That would be wrong for regexes constructed by `RegExp`, and
                // unnecessary for regexes constructed by `XRegExp` because the regex has already undergone the
                // translation to native regex syntax
                regex = augment(new RegExp(options.source || regex.source, flags), hasNamedCapture(regex) ? xData.captureNames.slice(0) : null, xregexpSource, xregexpFlags, options.isInternalOnly);

                return regex;
            }

            /**
             * Converts hexadecimal to decimal.
             *
             * @private
             * @param {String} hex
             * @returns {Number}
             */
            function dec(hex) {
                return parseInt(hex, 16);
            }

            /**
             * Returns a pattern that can be used in a native RegExp in place of an ignorable token such as an
             * inline comment or whitespace with flag x. This is used directly as a token handler function
             * passed to `XRegExp.addToken`.
             *
             * @private
             * @param {String} match Match arg of `XRegExp.addToken` handler
             * @param {String} scope Scope arg of `XRegExp.addToken` handler
             * @param {String} flags Flags arg of `XRegExp.addToken` handler
             * @returns {String} Either '' or '(?:)', depending on which is needed in the context of the match.
             */
            function getContextualTokenSeparator(match, scope, flags) {
                if (
                // No need to separate tokens if at the beginning or end of a group
                match.input[match.index - 1] === '(' || match.input[match.index + match[0].length] === ')' ||
                // Avoid separating tokens when the following token is a quantifier
                isQuantifierNext(match.input, match.index + match[0].length, flags)) {
                    return '';
                }
                // Keep tokens separated. This avoids e.g. inadvertedly changing `\1 1` or `\1(?#)1` to `\11`.
                // This also ensures all tokens remain as discrete atoms, e.g. it avoids converting the syntax
                // error `(? :` into `(?:`.
                return '(?:)';
            }

            /**
             * Returns native `RegExp` flags used by a regex object.
             *
             * @private
             * @param {RegExp} regex Regex to check.
             * @returns {String} Native flags in use.
             */
            function getNativeFlags(regex) {
                return hasFlagsProp ? regex.flags :
                // Explicitly using `RegExp.prototype.toString` (rather than e.g. `String` or concatenation
                // with an empty string) allows this to continue working predictably when
                // `XRegExp.proptotype.toString` is overridden
                nativ.exec.call(/\/([a-z]*)$/i, RegExp.prototype.toString.call(regex))[1];
            }

            /**
             * Determines whether a regex has extended instance data used to track capture names.
             *
             * @private
             * @param {RegExp} regex Regex to check.
             * @returns {Boolean} Whether the regex uses named capture.
             */
            function hasNamedCapture(regex) {
                return !!(regex[REGEX_DATA] && regex[REGEX_DATA].captureNames);
            }

            /**
             * Converts decimal to hexadecimal.
             *
             * @private
             * @param {Number|String} dec
             * @returns {String}
             */
            function hex(dec) {
                return parseInt(dec, 10).toString(16);
            }

            /**
             * Checks whether the next nonignorable token after the specified position is a quantifier.
             *
             * @private
             * @param {String} pattern Pattern to search within.
             * @param {Number} pos Index in `pattern` to search at.
             * @param {String} flags Flags used by the pattern.
             * @returns {Boolean} Whether the next nonignorable token is a quantifier.
             */
            function isQuantifierNext(pattern, pos, flags) {
                var inlineCommentPattern = '\\(\\?#[^)]*\\)';
                var lineCommentPattern = '#[^#\\n]*';
                var quantifierPattern = '[?*+]|{\\d+(?:,\\d*)?}';
                return nativ.test.call(flags.indexOf('x') !== -1 ?
                // Ignore any leading whitespace, line comments, and inline comments
                /^(?:\s|#[^#\n]*|\(\?#[^)]*\))*(?:[?*+]|{\d+(?:,\d*)?})/ :
                // Ignore any leading inline comments
                /^(?:\(\?#[^)]*\))*(?:[?*+]|{\d+(?:,\d*)?})/, pattern.slice(pos));
            }

            /**
             * Determines whether a value is of the specified type, by resolving its internal [[Class]].
             *
             * @private
             * @param {*} value Object to check.
             * @param {String} type Type to check for, in TitleCase.
             * @returns {Boolean} Whether the object matches the type.
             */
            function isType(value, type) {
                return toString.call(value) === '[object ' + type + ']';
            }

            /**
             * Adds leading zeros if shorter than four characters. Used for fixed-length hexadecimal values.
             *
             * @private
             * @param {String} str
             * @returns {String}
             */
            function pad4(str) {
                while (str.length < 4) {
                    str = '0' + str;
                }
                return str;
            }

            /**
             * Checks for flag-related errors, and strips/applies flags in a leading mode modifier. Offloads
             * the flag preparation logic from the `XRegExp` constructor.
             *
             * @private
             * @param {String} pattern Regex pattern, possibly with a leading mode modifier.
             * @param {String} flags Any combination of flags.
             * @returns {Object} Object with properties `pattern` and `flags`.
             */
            function prepareFlags(pattern, flags) {
                var i = void 0;

                // Recent browsers throw on duplicate flags, so copy this behavior for nonnative flags
                if (clipDuplicates(flags) !== flags) {
                    throw new SyntaxError('Invalid duplicate regex flag ' + flags);
                }

                // Strip and apply a leading mode modifier with any combination of flags except g or y
                pattern = nativ.replace.call(pattern, /^\(\?([\w$]+)\)/, function ($0, $1) {
                    if (nativ.test.call(/[gy]/, $1)) {
                        throw new SyntaxError('Cannot use flag g or y in mode modifier ' + $0);
                    }
                    // Allow duplicate flags within the mode modifier
                    flags = clipDuplicates(flags + $1);
                    return '';
                });

                // Throw on unknown native or nonnative flags
                for (i = 0; i < flags.length; ++i) {
                    if (!registeredFlags[flags[i]]) {
                        throw new SyntaxError('Unknown regex flag ' + flags[i]);
                    }
                }

                return {
                    pattern: pattern,
                    flags: flags
                };
            }

            /**
             * Prepares an options object from the given value.
             *
             * @private
             * @param {String|Object} value Value to convert to an options object.
             * @returns {Object} Options object.
             */
            function prepareOptions(value) {
                var options = {};

                if (isType(value, 'String')) {
                    XRegExp.forEach(value, /[^\s,]+/, function (match) {
                        options[match] = true;
                    });

                    return options;
                }

                return value;
            }

            /**
             * Registers a flag so it doesn't throw an 'unknown flag' error.
             *
             * @private
             * @param {String} flag Single-character flag to register.
             */
            function registerFlag(flag) {
                if (!/^[\w$]$/.test(flag)) {
                    throw new Error('Flag must be a single character A-Za-z0-9_$');
                }

                registeredFlags[flag] = true;
            }

            /**
             * Runs built-in and custom regex syntax tokens in reverse insertion order at the specified
             * position, until a match is found.
             *
             * @private
             * @param {String} pattern Original pattern from which an XRegExp object is being built.
             * @param {String} flags Flags being used to construct the regex.
             * @param {Number} pos Position to search for tokens within `pattern`.
             * @param {Number} scope Regex scope to apply: 'default' or 'class'.
             * @param {Object} context Context object to use for token handler functions.
             * @returns {Object} Object with properties `matchLength`, `output`, and `reparse`; or `null`.
             */
            function runTokens(pattern, flags, pos, scope, context) {
                var i = tokens.length;
                var leadChar = pattern[pos];
                var result = null;
                var match = void 0;
                var t = void 0;

                // Run in reverse insertion order
                while (i--) {
                    t = tokens[i];
                    if (t.leadChar && t.leadChar !== leadChar || t.scope !== scope && t.scope !== 'all' || t.flag && !(flags.indexOf(t.flag) !== -1)) {
                        continue;
                    }

                    match = XRegExp.exec(pattern, t.regex, pos, 'sticky');
                    if (match) {
                        result = {
                            matchLength: match[0].length,
                            output: t.handler.call(context, match, scope, flags),
                            reparse: t.reparse
                        };
                        // Finished with token tests
                        break;
                    }
                }

                return result;
            }

            /**
             * Enables or disables implicit astral mode opt-in. When enabled, flag A is automatically added to
             * all new regexes created by XRegExp. This causes an error to be thrown when creating regexes if
             * the Unicode Base addon is not available, since flag A is registered by that addon.
             *
             * @private
             * @param {Boolean} on `true` to enable; `false` to disable.
             */
            function setAstral(on) {
                features.astral = on;
            }

            /**
             * Returns the object, or throws an error if it is `null` or `undefined`. This is used to follow
             * the ES5 abstract operation `ToObject`.
             *
             * @private
             * @param {*} value Object to check and return.
             * @returns {*} The provided object.
             */
            function toObject(value) {
                // null or undefined
                if (value == null) {
                    throw new TypeError('Cannot convert null or undefined to object');
                }

                return value;
            }

            // ==--------------------------==
            // Constructor
            // ==--------------------------==

            /**
             * Creates an extended regular expression object for matching text with a pattern. Differs from a
             * native regular expression in that additional syntax and flags are supported. The returned object
             * is in fact a native `RegExp` and works with all native methods.
             *
             * @class XRegExp
             * @constructor
             * @param {String|RegExp} pattern Regex pattern string, or an existing regex object to copy.
             * @param {String} [flags] Any combination of flags.
             *   Native flags:
             *     - `g` - global
             *     - `i` - ignore case
             *     - `m` - multiline anchors
             *     - `u` - unicode (ES6)
             *     - `y` - sticky (Firefox 3+, ES6)
             *   Additional XRegExp flags:
             *     - `n` - explicit capture
             *     - `s` - dot matches all (aka singleline)
             *     - `x` - free-spacing and line comments (aka extended)
             *     - `A` - astral (requires the Unicode Base addon)
             *   Flags cannot be provided when constructing one `RegExp` from another.
             * @returns {RegExp} Extended regular expression object.
             * @example
             *
             * // With named capture and flag x
             * XRegExp(`(?<year>  [0-9]{4} ) -?  # year
             *          (?<month> [0-9]{2} ) -?  # month
             *          (?<day>   [0-9]{2} )     # day`, 'x');
             *
             * // Providing a regex object copies it. Native regexes are recompiled using native (not XRegExp)
             * // syntax. Copies maintain extended data, are augmented with `XRegExp.prototype` properties, and
             * // have fresh `lastIndex` properties (set to zero).
             * XRegExp(/regex/);
             */
            function XRegExp(pattern, flags) {
                if (XRegExp.isRegExp(pattern)) {
                    if (flags !== undefined) {
                        throw new TypeError('Cannot supply flags when copying a RegExp');
                    }
                    return copyRegex(pattern);
                }

                // Copy the argument behavior of `RegExp`
                pattern = pattern === undefined ? '' : String(pattern);
                flags = flags === undefined ? '' : String(flags);

                if (XRegExp.isInstalled('astral') && !(flags.indexOf('A') !== -1)) {
                    // This causes an error to be thrown if the Unicode Base addon is not available
                    flags += 'A';
                }

                if (!patternCache[pattern]) {
                    patternCache[pattern] = {};
                }

                if (!patternCache[pattern][flags]) {
                    var context = {
                        hasNamedCapture: false,
                        captureNames: []
                    };
                    var scope = defaultScope;
                    var output = '';
                    var pos = 0;
                    var result = void 0;

                    // Check for flag-related errors, and strip/apply flags in a leading mode modifier
                    var applied = prepareFlags(pattern, flags);
                    var appliedPattern = applied.pattern;
                    var appliedFlags = applied.flags;

                    // Use XRegExp's tokens to translate the pattern to a native regex pattern.
                    // `appliedPattern.length` may change on each iteration if tokens use `reparse`
                    while (pos < appliedPattern.length) {
                        do {
                            // Check for custom tokens at the current position
                            result = runTokens(appliedPattern, appliedFlags, pos, scope, context);
                            // If the matched token used the `reparse` option, splice its output into the
                            // pattern before running tokens again at the same position
                            if (result && result.reparse) {
                                appliedPattern = appliedPattern.slice(0, pos) + result.output + appliedPattern.slice(pos + result.matchLength);
                            }
                        } while (result && result.reparse);

                        if (result) {
                            output += result.output;
                            pos += result.matchLength || 1;
                        } else {
                            // Get the native token at the current position
                            var token = XRegExp.exec(appliedPattern, nativeTokens[scope], pos, 'sticky')[0];
                            output += token;
                            pos += token.length;
                            if (token === '[' && scope === defaultScope) {
                                scope = classScope;
                            } else if (token === ']' && scope === classScope) {
                                scope = defaultScope;
                            }
                        }
                    }

                    patternCache[pattern][flags] = {
                        // Use basic cleanup to collapse repeated empty groups like `(?:)(?:)` to `(?:)`. Empty
                        // groups are sometimes inserted during regex transpilation in order to keep tokens
                        // separated. However, more than one empty group in a row is never needed.
                        pattern: nativ.replace.call(output, /(?:\(\?:\))+/g, '(?:)'),
                        // Strip all but native flags
                        flags: nativ.replace.call(appliedFlags, /[^gimuy]+/g, ''),
                        // `context.captureNames` has an item for each capturing group, even if unnamed
                        captures: context.hasNamedCapture ? context.captureNames : null
                    };
                }

                var generated = patternCache[pattern][flags];
                return augment(new RegExp(generated.pattern, generated.flags), generated.captures, pattern, flags);
            }

            // Add `RegExp.prototype` to the prototype chain
            XRegExp.prototype = /(?:)/;

            // ==--------------------------==
            // Public properties
            // ==--------------------------==

            /**
             * The XRegExp version number as a string containing three dot-separated parts. For example,
             * '2.0.0-beta-3'.
             *
             * @static
             * @memberOf XRegExp
             * @type String
             */
            XRegExp.version = '4.0.0';

            // ==--------------------------==
            // Public methods
            // ==--------------------------==

            // Intentionally undocumented; used in tests and addons
            XRegExp._clipDuplicates = clipDuplicates;
            XRegExp._hasNativeFlag = hasNativeFlag;
            XRegExp._dec = dec;
            XRegExp._hex = hex;
            XRegExp._pad4 = pad4;

            /**
             * Extends XRegExp syntax and allows custom flags. This is used internally and can be used to
             * create XRegExp addons. If more than one token can match the same string, the last added wins.
             *
             * @memberOf XRegExp
             * @param {RegExp} regex Regex object that matches the new token.
             * @param {Function} handler Function that returns a new pattern string (using native regex syntax)
             *   to replace the matched token within all future XRegExp regexes. Has access to persistent
             *   properties of the regex being built, through `this`. Invoked with three arguments:
             *   - The match array, with named backreference properties.
             *   - The regex scope where the match was found: 'default' or 'class'.
             *   - The flags used by the regex, including any flags in a leading mode modifier.
             *   The handler function becomes part of the XRegExp construction process, so be careful not to
             *   construct XRegExps within the function or you will trigger infinite recursion.
             * @param {Object} [options] Options object with optional properties:
             *   - `scope` {String} Scope where the token applies: 'default', 'class', or 'all'.
             *   - `flag` {String} Single-character flag that triggers the token. This also registers the
             *     flag, which prevents XRegExp from throwing an 'unknown flag' error when the flag is used.
             *   - `optionalFlags` {String} Any custom flags checked for within the token `handler` that are
             *     not required to trigger the token. This registers the flags, to prevent XRegExp from
             *     throwing an 'unknown flag' error when any of the flags are used.
             *   - `reparse` {Boolean} Whether the `handler` function's output should not be treated as
             *     final, and instead be reparseable by other tokens (including the current token). Allows
             *     token chaining or deferring.
             *   - `leadChar` {String} Single character that occurs at the beginning of any successful match
             *     of the token (not always applicable). This doesn't change the behavior of the token unless
             *     you provide an erroneous value. However, providing it can increase the token's performance
             *     since the token can be skipped at any positions where this character doesn't appear.
             * @example
             *
             * // Basic usage: Add \a for the ALERT control code
             * XRegExp.addToken(
             *   /\\a/,
             *   () => '\\x07',
             *   {scope: 'all'}
             * );
             * XRegExp('\\a[\\a-\\n]+').test('\x07\n\x07'); // -> true
             *
             * // Add the U (ungreedy) flag from PCRE and RE2, which reverses greedy and lazy quantifiers.
             * // Since `scope` is not specified, it uses 'default' (i.e., transformations apply outside of
             * // character classes only)
             * XRegExp.addToken(
             *   /([?*+]|{\d+(?:,\d*)?})(\??)/,
             *   (match) => `${match[1]}${match[2] ? '' : '?'}`,
             *   {flag: 'U'}
             * );
             * XRegExp('a+', 'U').exec('aaa')[0]; // -> 'a'
             * XRegExp('a+?', 'U').exec('aaa')[0]; // -> 'aaa'
             */
            XRegExp.addToken = function (regex, handler, options) {
                options = options || {};
                var optionalFlags = options.optionalFlags;
                var i = void 0;

                if (options.flag) {
                    registerFlag(options.flag);
                }

                if (optionalFlags) {
                    optionalFlags = nativ.split.call(optionalFlags, '');
                    for (i = 0; i < optionalFlags.length; ++i) {
                        registerFlag(optionalFlags[i]);
                    }
                }

                // Add to the private list of syntax tokens
                tokens.push({
                    regex: copyRegex(regex, {
                        addG: true,
                        addY: hasNativeY,
                        isInternalOnly: true
                    }),
                    handler: handler,
                    scope: options.scope || defaultScope,
                    flag: options.flag,
                    reparse: options.reparse,
                    leadChar: options.leadChar
                });

                // Reset the pattern cache used by the `XRegExp` constructor, since the same pattern and flags
                // might now produce different results
                XRegExp.cache.flush('patterns');
            };

            /**
             * Caches and returns the result of calling `XRegExp(pattern, flags)`. On any subsequent call with
             * the same pattern and flag combination, the cached copy of the regex is returned.
             *
             * @memberOf XRegExp
             * @param {String} pattern Regex pattern string.
             * @param {String} [flags] Any combination of XRegExp flags.
             * @returns {RegExp} Cached XRegExp object.
             * @example
             *
             * while (match = XRegExp.cache('.', 'gs').exec(str)) {
             *   // The regex is compiled once only
             * }
             */
            XRegExp.cache = function (pattern, flags) {
                if (!regexCache[pattern]) {
                    regexCache[pattern] = {};
                }
                return regexCache[pattern][flags] || (regexCache[pattern][flags] = XRegExp(pattern, flags));
            };

            // Intentionally undocumented; used in tests
            XRegExp.cache.flush = function (cacheName) {
                if (cacheName === 'patterns') {
                    // Flush the pattern cache used by the `XRegExp` constructor
                    patternCache = {};
                } else {
                    // Flush the regex cache populated by `XRegExp.cache`
                    regexCache = {};
                }
            };

            /**
             * Escapes any regular expression metacharacters, for use when matching literal strings. The result
             * can safely be used at any point within a regex that uses any flags.
             *
             * @memberOf XRegExp
             * @param {String} str String to escape.
             * @returns {String} String with regex metacharacters escaped.
             * @example
             *
             * XRegExp.escape('Escaped? <.>');
             * // -> 'Escaped\?\ <\.>'
             */
            XRegExp.escape = function (str) {
                return nativ.replace.call(toObject(str), /[-\[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
            };

            /**
             * Executes a regex search in a specified string. Returns a match array or `null`. If the provided
             * regex uses named capture, named backreference properties are included on the match array.
             * Optional `pos` and `sticky` arguments specify the search start position, and whether the match
             * must start at the specified position only. The `lastIndex` property of the provided regex is not
             * used, but is updated for compatibility. Also fixes browser bugs compared to the native
             * `RegExp.prototype.exec` and can be used reliably cross-browser.
             *
             * @memberOf XRegExp
             * @param {String} str String to search.
             * @param {RegExp} regex Regex to search with.
             * @param {Number} [pos=0] Zero-based index at which to start the search.
             * @param {Boolean|String} [sticky=false] Whether the match must start at the specified position
             *   only. The string `'sticky'` is accepted as an alternative to `true`.
             * @returns {Array} Match array with named backreference properties, or `null`.
             * @example
             *
             * // Basic use, with named backreference
             * let match = XRegExp.exec('U+2620', XRegExp('U\\+(?<hex>[0-9A-F]{4})'));
             * match.hex; // -> '2620'
             *
             * // With pos and sticky, in a loop
             * let pos = 2, result = [], match;
             * while (match = XRegExp.exec('<1><2><3><4>5<6>', /<(\d)>/, pos, 'sticky')) {
             *   result.push(match[1]);
             *   pos = match.index + match[0].length;
             * }
             * // result -> ['2', '3', '4']
             */
            XRegExp.exec = function (str, regex, pos, sticky) {
                var cacheKey = 'g';
                var addY = false;
                var fakeY = false;
                var match = void 0;

                addY = hasNativeY && !!(sticky || regex.sticky && sticky !== false);
                if (addY) {
                    cacheKey += 'y';
                } else if (sticky) {
                    // Simulate sticky matching by appending an empty capture to the original regex. The
                    // resulting regex will succeed no matter what at the current index (set with `lastIndex`),
                    // and will not search the rest of the subject string. We'll know that the original regex
                    // has failed if that last capture is `''` rather than `undefined` (i.e., if that last
                    // capture participated in the match).
                    fakeY = true;
                    cacheKey += 'FakeY';
                }

                regex[REGEX_DATA] = regex[REGEX_DATA] || {};

                // Shares cached copies with `XRegExp.match`/`replace`
                var r2 = regex[REGEX_DATA][cacheKey] || (regex[REGEX_DATA][cacheKey] = copyRegex(regex, {
                    addG: true,
                    addY: addY,
                    source: fakeY ? regex.source + '|()' : undefined,
                    removeY: sticky === false,
                    isInternalOnly: true
                }));

                pos = pos || 0;
                r2.lastIndex = pos;

                // Fixed `exec` required for `lastIndex` fix, named backreferences, etc.
                match = fixed.exec.call(r2, str);

                // Get rid of the capture added by the pseudo-sticky matcher if needed. An empty string means
                // the original regexp failed (see above).
                if (fakeY && match && match.pop() === '') {
                    match = null;
                }

                if (regex.global) {
                    regex.lastIndex = match ? r2.lastIndex : 0;
                }

                return match;
            };

            /**
             * Executes a provided function once per regex match. Searches always start at the beginning of the
             * string and continue until the end, regardless of the state of the regex's `global` property and
             * initial `lastIndex`.
             *
             * @memberOf XRegExp
             * @param {String} str String to search.
             * @param {RegExp} regex Regex to search with.
             * @param {Function} callback Function to execute for each match. Invoked with four arguments:
             *   - The match array, with named backreference properties.
             *   - The zero-based match index.
             *   - The string being traversed.
             *   - The regex object being used to traverse the string.
             * @example
             *
             * // Extracts every other digit from a string
             * const evens = [];
             * XRegExp.forEach('1a2345', /\d/, (match, i) => {
             *   if (i % 2) evens.push(+match[0]);
             * });
             * // evens -> [2, 4]
             */
            XRegExp.forEach = function (str, regex, callback) {
                var pos = 0;
                var i = -1;
                var match = void 0;

                while (match = XRegExp.exec(str, regex, pos)) {
                    // Because `regex` is provided to `callback`, the function could use the deprecated/
                    // nonstandard `RegExp.prototype.compile` to mutate the regex. However, since `XRegExp.exec`
                    // doesn't use `lastIndex` to set the search position, this can't lead to an infinite loop,
                    // at least. Actually, because of the way `XRegExp.exec` caches globalized versions of
                    // regexes, mutating the regex will not have any effect on the iteration or matched strings,
                    // which is a nice side effect that brings extra safety.
                    callback(match, ++i, str, regex);

                    pos = match.index + (match[0].length || 1);
                }
            };

            /**
             * Copies a regex object and adds flag `g`. The copy maintains extended data, is augmented with
             * `XRegExp.prototype` properties, and has a fresh `lastIndex` property (set to zero). Native
             * regexes are not recompiled using XRegExp syntax.
             *
             * @memberOf XRegExp
             * @param {RegExp} regex Regex to globalize.
             * @returns {RegExp} Copy of the provided regex with flag `g` added.
             * @example
             *
             * const globalCopy = XRegExp.globalize(/regex/);
             * globalCopy.global; // -> true
             */
            XRegExp.globalize = function (regex) {
                return copyRegex(regex, { addG: true });
            };

            /**
             * Installs optional features according to the specified options. Can be undone using
             * `XRegExp.uninstall`.
             *
             * @memberOf XRegExp
             * @param {Object|String} options Options object or string.
             * @example
             *
             * // With an options object
             * XRegExp.install({
             *   // Enables support for astral code points in Unicode addons (implicitly sets flag A)
             *   astral: true
             * });
             *
             * // With an options string
             * XRegExp.install('astral');
             */
            XRegExp.install = function (options) {
                options = prepareOptions(options);

                if (!features.astral && options.astral) {
                    setAstral(true);
                }
            };

            /**
             * Checks whether an individual optional feature is installed.
             *
             * @memberOf XRegExp
             * @param {String} feature Name of the feature to check. One of:
             *   - `astral`
             * @returns {Boolean} Whether the feature is installed.
             * @example
             *
             * XRegExp.isInstalled('astral');
             */
            XRegExp.isInstalled = function (feature) {
                return !!features[feature];
            };

            /**
             * Returns `true` if an object is a regex; `false` if it isn't. This works correctly for regexes
             * created in another frame, when `instanceof` and `constructor` checks would fail.
             *
             * @memberOf XRegExp
             * @param {*} value Object to check.
             * @returns {Boolean} Whether the object is a `RegExp` object.
             * @example
             *
             * XRegExp.isRegExp('string'); // -> false
             * XRegExp.isRegExp(/regex/i); // -> true
             * XRegExp.isRegExp(RegExp('^', 'm')); // -> true
             * XRegExp.isRegExp(XRegExp('(?s).')); // -> true
             */
            XRegExp.isRegExp = function (value) {
                return toString.call(value) === '[object RegExp]';
            }; // isType(value, 'RegExp');

            /**
             * Returns the first matched string, or in global mode, an array containing all matched strings.
             * This is essentially a more convenient re-implementation of `String.prototype.match` that gives
             * the result types you actually want (string instead of `exec`-style array in match-first mode,
             * and an empty array instead of `null` when no matches are found in match-all mode). It also lets
             * you override flag g and ignore `lastIndex`, and fixes browser bugs.
             *
             * @memberOf XRegExp
             * @param {String} str String to search.
             * @param {RegExp} regex Regex to search with.
             * @param {String} [scope='one'] Use 'one' to return the first match as a string. Use 'all' to
             *   return an array of all matched strings. If not explicitly specified and `regex` uses flag g,
             *   `scope` is 'all'.
             * @returns {String|Array} In match-first mode: First match as a string, or `null`. In match-all
             *   mode: Array of all matched strings, or an empty array.
             * @example
             *
             * // Match first
             * XRegExp.match('abc', /\w/); // -> 'a'
             * XRegExp.match('abc', /\w/g, 'one'); // -> 'a'
             * XRegExp.match('abc', /x/g, 'one'); // -> null
             *
             * // Match all
             * XRegExp.match('abc', /\w/g); // -> ['a', 'b', 'c']
             * XRegExp.match('abc', /\w/, 'all'); // -> ['a', 'b', 'c']
             * XRegExp.match('abc', /x/, 'all'); // -> []
             */
            XRegExp.match = function (str, regex, scope) {
                var global = regex.global && scope !== 'one' || scope === 'all';
                var cacheKey = (global ? 'g' : '') + (regex.sticky ? 'y' : '') || 'noGY';

                regex[REGEX_DATA] = regex[REGEX_DATA] || {};

                // Shares cached copies with `XRegExp.exec`/`replace`
                var r2 = regex[REGEX_DATA][cacheKey] || (regex[REGEX_DATA][cacheKey] = copyRegex(regex, {
                    addG: !!global,
                    removeG: scope === 'one',
                    isInternalOnly: true
                }));

                var result = nativ.match.call(toObject(str), r2);

                if (regex.global) {
                    regex.lastIndex = scope === 'one' && result ?
                    // Can't use `r2.lastIndex` since `r2` is nonglobal in this case
                    result.index + result[0].length : 0;
                }

                return global ? result || [] : result && result[0];
            };

            /**
             * Retrieves the matches from searching a string using a chain of regexes that successively search
             * within previous matches. The provided `chain` array can contain regexes and or objects with
             * `regex` and `backref` properties. When a backreference is specified, the named or numbered
             * backreference is passed forward to the next regex or returned.
             *
             * @memberOf XRegExp
             * @param {String} str String to search.
             * @param {Array} chain Regexes that each search for matches within preceding results.
             * @returns {Array} Matches by the last regex in the chain, or an empty array.
             * @example
             *
             * // Basic usage; matches numbers within <b> tags
             * XRegExp.matchChain('1 <b>2</b> 3 <b>4 a 56</b>', [
             *   XRegExp('(?is)<b>.*?</b>'),
             *   /\d+/
             * ]);
             * // -> ['2', '4', '56']
             *
             * // Passing forward and returning specific backreferences
             * html = '<a href="http://xregexp.com/api/">XRegExp</a>\
             *         <a href="http://www.google.com/">Google</a>';
             * XRegExp.matchChain(html, [
             *   {regex: /<a href="([^"]+)">/i, backref: 1},
             *   {regex: XRegExp('(?i)^https?://(?<domain>[^/?#]+)'), backref: 'domain'}
             * ]);
             * // -> ['xregexp.com', 'www.google.com']
             */
            XRegExp.matchChain = function (str, chain) {
                return function recurseChain(values, level) {
                    var item = chain[level].regex ? chain[level] : { regex: chain[level] };
                    var matches = [];

                    function addMatch(match) {
                        if (item.backref) {
                            // Safari 4.0.5 (but not 5.0.5+) inappropriately uses sparse arrays to hold the
                            // `undefined`s for backreferences to nonparticipating capturing groups. In such
                            // cases, a `hasOwnProperty` or `in` check on its own would inappropriately throw
                            // the exception, so also check if the backreference is a number that is within the
                            // bounds of the array.
                            if (!(match.hasOwnProperty(item.backref) || +item.backref < match.length)) {
                                throw new ReferenceError('Backreference to undefined group: ' + item.backref);
                            }

                            matches.push(match[item.backref] || '');
                        } else {
                            matches.push(match[0]);
                        }
                    }

                    for (var i = 0; i < values.length; ++i) {
                        XRegExp.forEach(values[i], item.regex, addMatch);
                    }

                    return level === chain.length - 1 || !matches.length ? matches : recurseChain(matches, level + 1);
                }([str], 0);
            };

            /**
             * Returns a new string with one or all matches of a pattern replaced. The pattern can be a string
             * or regex, and the replacement can be a string or a function to be called for each match. To
             * perform a global search and replace, use the optional `scope` argument or include flag g if using
             * a regex. Replacement strings can use `${n}` or `$<n>` for named and numbered backreferences.
             * Replacement functions can use named backreferences via `arguments[0].name`. Also fixes browser
             * bugs compared to the native `String.prototype.replace` and can be used reliably cross-browser.
             *
             * @memberOf XRegExp
             * @param {String} str String to search.
             * @param {RegExp|String} search Search pattern to be replaced.
             * @param {String|Function} replacement Replacement string or a function invoked to create it.
             *   Replacement strings can include special replacement syntax:
             *     - $$ - Inserts a literal $ character.
             *     - $&, $0 - Inserts the matched substring.
             *     - $` - Inserts the string that precedes the matched substring (left context).
             *     - $' - Inserts the string that follows the matched substring (right context).
             *     - $n, $nn - Where n/nn are digits referencing an existent capturing group, inserts
             *       backreference n/nn.
             *     - ${n}, $<n> - Where n is a name or any number of digits that reference an existent capturing
             *       group, inserts backreference n.
             *   Replacement functions are invoked with three or more arguments:
             *     - The matched substring (corresponds to $& above). Named backreferences are accessible as
             *       properties of this first argument.
             *     - 0..n arguments, one for each backreference (corresponding to $1, $2, etc. above).
             *     - The zero-based index of the match within the total search string.
             *     - The total string being searched.
             * @param {String} [scope='one'] Use 'one' to replace the first match only, or 'all'. If not
             *   explicitly specified and using a regex with flag g, `scope` is 'all'.
             * @returns {String} New string with one or all matches replaced.
             * @example
             *
             * // Regex search, using named backreferences in replacement string
             * const name = XRegExp('(?<first>\\w+) (?<last>\\w+)');
             * XRegExp.replace('John Smith', name, '$<last>, $<first>');
             * // -> 'Smith, John'
             *
             * // Regex search, using named backreferences in replacement function
             * XRegExp.replace('John Smith', name, (match) => `${match.last}, ${match.first}`);
             * // -> 'Smith, John'
             *
             * // String search, with replace-all
             * XRegExp.replace('RegExp builds RegExps', 'RegExp', 'XRegExp', 'all');
             * // -> 'XRegExp builds XRegExps'
             */
            XRegExp.replace = function (str, search, replacement, scope) {
                var isRegex = XRegExp.isRegExp(search);
                var global = search.global && scope !== 'one' || scope === 'all';
                var cacheKey = (global ? 'g' : '') + (search.sticky ? 'y' : '') || 'noGY';
                var s2 = search;

                if (isRegex) {
                    search[REGEX_DATA] = search[REGEX_DATA] || {};

                    // Shares cached copies with `XRegExp.exec`/`match`. Since a copy is used, `search`'s
                    // `lastIndex` isn't updated *during* replacement iterations
                    s2 = search[REGEX_DATA][cacheKey] || (search[REGEX_DATA][cacheKey] = copyRegex(search, {
                        addG: !!global,
                        removeG: scope === 'one',
                        isInternalOnly: true
                    }));
                } else if (global) {
                    s2 = new RegExp(XRegExp.escape(String(search)), 'g');
                }

                // Fixed `replace` required for named backreferences, etc.
                var result = fixed.replace.call(toObject(str), s2, replacement);

                if (isRegex && search.global) {
                    // Fixes IE, Safari bug (last tested IE 9, Safari 5.1)
                    search.lastIndex = 0;
                }

                return result;
            };

            /**
             * Performs batch processing of string replacements. Used like `XRegExp.replace`, but accepts an
             * array of replacement details. Later replacements operate on the output of earlier replacements.
             * Replacement details are accepted as an array with a regex or string to search for, the
             * replacement string or function, and an optional scope of 'one' or 'all'. Uses the XRegExp
             * replacement text syntax, which supports named backreference properties via `${name}` or
             * `$<name>`.
             *
             * @memberOf XRegExp
             * @param {String} str String to search.
             * @param {Array} replacements Array of replacement detail arrays.
             * @returns {String} New string with all replacements.
             * @example
             *
             * str = XRegExp.replaceEach(str, [
             *   [XRegExp('(?<name>a)'), 'z${name}'],
             *   [/b/gi, 'y'],
             *   [/c/g, 'x', 'one'], // scope 'one' overrides /g
             *   [/d/, 'w', 'all'],  // scope 'all' overrides lack of /g
             *   ['e', 'v', 'all'],  // scope 'all' allows replace-all for strings
             *   [/f/g, ($0) => $0.toUpperCase()]
             * ]);
             */
            XRegExp.replaceEach = function (str, replacements) {
                var i = void 0;
                var r = void 0;

                for (i = 0; i < replacements.length; ++i) {
                    r = replacements[i];
                    str = XRegExp.replace(str, r[0], r[1], r[2]);
                }

                return str;
            };

            /**
             * Splits a string into an array of strings using a regex or string separator. Matches of the
             * separator are not included in the result array. However, if `separator` is a regex that contains
             * capturing groups, backreferences are spliced into the result each time `separator` is matched.
             * Fixes browser bugs compared to the native `String.prototype.split` and can be used reliably
             * cross-browser.
             *
             * @memberOf XRegExp
             * @param {String} str String to split.
             * @param {RegExp|String} separator Regex or string to use for separating the string.
             * @param {Number} [limit] Maximum number of items to include in the result array.
             * @returns {Array} Array of substrings.
             * @example
             *
             * // Basic use
             * XRegExp.split('a b c', ' ');
             * // -> ['a', 'b', 'c']
             *
             * // With limit
             * XRegExp.split('a b c', ' ', 2);
             * // -> ['a', 'b']
             *
             * // Backreferences in result array
             * XRegExp.split('..word1..', /([a-z]+)(\d+)/i);
             * // -> ['..', 'word', '1', '..']
             */
            XRegExp.split = function (str, separator, limit) {
                return fixed.split.call(toObject(str), separator, limit);
            };

            /**
             * Executes a regex search in a specified string. Returns `true` or `false`. Optional `pos` and
             * `sticky` arguments specify the search start position, and whether the match must start at the
             * specified position only. The `lastIndex` property of the provided regex is not used, but is
             * updated for compatibility. Also fixes browser bugs compared to the native
             * `RegExp.prototype.test` and can be used reliably cross-browser.
             *
             * @memberOf XRegExp
             * @param {String} str String to search.
             * @param {RegExp} regex Regex to search with.
             * @param {Number} [pos=0] Zero-based index at which to start the search.
             * @param {Boolean|String} [sticky=false] Whether the match must start at the specified position
             *   only. The string `'sticky'` is accepted as an alternative to `true`.
             * @returns {Boolean} Whether the regex matched the provided value.
             * @example
             *
             * // Basic use
             * XRegExp.test('abc', /c/); // -> true
             *
             * // With pos and sticky
             * XRegExp.test('abc', /c/, 0, 'sticky'); // -> false
             * XRegExp.test('abc', /c/, 2, 'sticky'); // -> true
             */
            // Do this the easy way :-)
            XRegExp.test = function (str, regex, pos, sticky) {
                return !!XRegExp.exec(str, regex, pos, sticky);
            };

            /**
             * Uninstalls optional features according to the specified options. All optional features start out
             * uninstalled, so this is used to undo the actions of `XRegExp.install`.
             *
             * @memberOf XRegExp
             * @param {Object|String} options Options object or string.
             * @example
             *
             * // With an options object
             * XRegExp.uninstall({
             *   // Disables support for astral code points in Unicode addons
             *   astral: true
             * });
             *
             * // With an options string
             * XRegExp.uninstall('astral');
             */
            XRegExp.uninstall = function (options) {
                options = prepareOptions(options);

                if (features.astral && options.astral) {
                    setAstral(false);
                }
            };

            /**
             * Returns an XRegExp object that is the union of the given patterns. Patterns can be provided as
             * regex objects or strings. Metacharacters are escaped in patterns provided as strings.
             * Backreferences in provided regex objects are automatically renumbered to work correctly within
             * the larger combined pattern. Native flags used by provided regexes are ignored in favor of the
             * `flags` argument.
             *
             * @memberOf XRegExp
             * @param {Array} patterns Regexes and strings to combine.
             * @param {String} [flags] Any combination of XRegExp flags.
             * @param {Object} [options] Options object with optional properties:
             *   - `conjunction` {String} Type of conjunction to use: 'or' (default) or 'none'.
             * @returns {RegExp} Union of the provided regexes and strings.
             * @example
             *
             * XRegExp.union(['a+b*c', /(dogs)\1/, /(cats)\1/], 'i');
             * // -> /a\+b\*c|(dogs)\1|(cats)\2/i
             *
             * XRegExp.union([/man/, /bear/, /pig/], 'i', {conjunction: 'none'});
             * // -> /manbearpig/i
             */
            XRegExp.union = function (patterns, flags, options) {
                options = options || {};
                var conjunction = options.conjunction || 'or';
                var numCaptures = 0;
                var numPriorCaptures = void 0;
                var captureNames = void 0;

                function rewrite(match, paren, backref) {
                    var name = captureNames[numCaptures - numPriorCaptures];

                    // Capturing group
                    if (paren) {
                        ++numCaptures;
                        // If the current capture has a name, preserve the name
                        if (name) {
                            return '(?<' + name + '>';
                        }
                        // Backreference
                    } else if (backref) {
                        // Rewrite the backreference
                        return '\\' + (+backref + numPriorCaptures);
                    }

                    return match;
                }

                if (!(isType(patterns, 'Array') && patterns.length)) {
                    throw new TypeError('Must provide a nonempty array of patterns to merge');
                }

                var parts = /(\()(?!\?)|\\([1-9]\d*)|\\[\s\S]|\[(?:[^\\\]]|\\[\s\S])*\]/g;
                var output = [];
                var pattern = void 0;
                for (var i = 0; i < patterns.length; ++i) {
                    pattern = patterns[i];

                    if (XRegExp.isRegExp(pattern)) {
                        numPriorCaptures = numCaptures;
                        captureNames = pattern[REGEX_DATA] && pattern[REGEX_DATA].captureNames || [];

                        // Rewrite backreferences. Passing to XRegExp dies on octals and ensures patterns are
                        // independently valid; helps keep this simple. Named captures are put back
                        output.push(nativ.replace.call(XRegExp(pattern.source).source, parts, rewrite));
                    } else {
                        output.push(XRegExp.escape(pattern));
                    }
                }

                var separator = conjunction === 'none' ? '' : '|';
                return XRegExp(output.join(separator), flags);
            };

            // ==--------------------------==
            // Fixed/extended native methods
            // ==--------------------------==

            /**
             * Adds named capture support (with backreferences returned as `result.name`), and fixes browser
             * bugs in the native `RegExp.prototype.exec`. Use via `XRegExp.exec`.
             *
             * @memberOf RegExp
             * @param {String} str String to search.
             * @returns {Array} Match array with named backreference properties, or `null`.
             */
            fixed.exec = function (str) {
                var origLastIndex = this.lastIndex;
                var match = nativ.exec.apply(this, arguments);

                if (match) {
                    // Fix browsers whose `exec` methods don't return `undefined` for nonparticipating capturing
                    // groups. This fixes IE 5.5-8, but not IE 9's quirks mode or emulation of older IEs. IE 9
                    // in standards mode follows the spec.
                    if (!correctExecNpcg && match.length > 1 && match.indexOf('') !== -1) {
                        var r2 = copyRegex(this, {
                            removeG: true,
                            isInternalOnly: true
                        });
                        // Using `str.slice(match.index)` rather than `match[0]` in case lookahead allowed
                        // matching due to characters outside the match
                        nativ.replace.call(String(str).slice(match.index), r2, function () {
                            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                                args[_key] = arguments[_key];
                            }

                            var len = args.length;
                            // Skip index 0 and the last 2
                            for (var i = 1; i < len - 2; ++i) {
                                if (args[i] === undefined) {
                                    match[i] = undefined;
                                }
                            }
                        });
                    }

                    // Attach named capture properties
                    if (this[REGEX_DATA] && this[REGEX_DATA].captureNames) {
                        // Skip index 0
                        for (var i = 1; i < match.length; ++i) {
                            var name = this[REGEX_DATA].captureNames[i - 1];
                            if (name) {
                                match[name] = match[i];
                            }
                        }
                    }

                    // Fix browsers that increment `lastIndex` after zero-length matches
                    if (this.global && !match[0].length && this.lastIndex > match.index) {
                        this.lastIndex = match.index;
                    }
                }

                if (!this.global) {
                    // Fixes IE, Opera bug (last tested IE 9, Opera 11.6)
                    this.lastIndex = origLastIndex;
                }

                return match;
            };

            /**
             * Fixes browser bugs in the native `RegExp.prototype.test`.
             *
             * @memberOf RegExp
             * @param {String} str String to search.
             * @returns {Boolean} Whether the regex matched the provided value.
             */
            fixed.test = function (str) {
                // Do this the easy way :-)
                return !!fixed.exec.call(this, str);
            };

            /**
             * Adds named capture support (with backreferences returned as `result.name`), and fixes browser
             * bugs in the native `String.prototype.match`.
             *
             * @memberOf String
             * @param {RegExp|*} regex Regex to search with. If not a regex object, it is passed to `RegExp`.
             * @returns {Array} If `regex` uses flag g, an array of match strings or `null`. Without flag g,
             *   the result of calling `regex.exec(this)`.
             */
            fixed.match = function (regex) {
                if (!XRegExp.isRegExp(regex)) {
                    // Use the native `RegExp` rather than `XRegExp`
                    regex = new RegExp(regex);
                } else if (regex.global) {
                    var result = nativ.match.apply(this, arguments);
                    // Fixes IE bug
                    regex.lastIndex = 0;

                    return result;
                }

                return fixed.exec.call(regex, toObject(this));
            };

            /**
             * Adds support for `${n}` (or `$<n>`) tokens for named and numbered backreferences in replacement
             * text, and provides named backreferences to replacement functions as `arguments[0].name`. Also
             * fixes browser bugs in replacement text syntax when performing a replacement using a nonregex
             * search value, and the value of a replacement regex's `lastIndex` property during replacement
             * iterations and upon completion. Note that this doesn't support SpiderMonkey's proprietary third
             * (`flags`) argument. Use via `XRegExp.replace`.
             *
             * @memberOf String
             * @param {RegExp|String} search Search pattern to be replaced.
             * @param {String|Function} replacement Replacement string or a function invoked to create it.
             * @returns {String} New string with one or all matches replaced.
             */
            fixed.replace = function (search, replacement) {
                var isRegex = XRegExp.isRegExp(search);
                var origLastIndex = void 0;
                var captureNames = void 0;
                var result = void 0;

                if (isRegex) {
                    if (search[REGEX_DATA]) {
                        captureNames = search[REGEX_DATA].captureNames;
                    }
                    // Only needed if `search` is nonglobal
                    origLastIndex = search.lastIndex;
                } else {
                    search += ''; // Type-convert
                }

                // Don't use `typeof`; some older browsers return 'function' for regex objects
                if (isType(replacement, 'Function')) {
                    // Stringifying `this` fixes a bug in IE < 9 where the last argument in replacement
                    // functions isn't type-converted to a string
                    result = nativ.replace.call(String(this), search, function () {
                        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                            args[_key2] = arguments[_key2];
                        }

                        if (captureNames) {
                            // Change the `args[0]` string primitive to a `String` object that can store
                            // properties. This really does need to use `String` as a constructor
                            args[0] = new String(args[0]);
                            // Store named backreferences on the first argument
                            for (var i = 0; i < captureNames.length; ++i) {
                                if (captureNames[i]) {
                                    args[0][captureNames[i]] = args[i + 1];
                                }
                            }
                        }
                        // Update `lastIndex` before calling `replacement`. Fixes IE, Chrome, Firefox, Safari
                        // bug (last tested IE 9, Chrome 17, Firefox 11, Safari 5.1)
                        if (isRegex && search.global) {
                            search.lastIndex = args[args.length - 2] + args[0].length;
                        }
                        // ES6 specs the context for replacement functions as `undefined`
                        return replacement.apply(undefined, args);
                    });
                } else {
                    // Ensure that the last value of `args` will be a string when given nonstring `this`,
                    // while still throwing on null or undefined context
                    result = nativ.replace.call(this == null ? this : String(this), search, function () {
                        for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                            args[_key3] = arguments[_key3];
                        }

                        return nativ.replace.call(String(replacement), replacementToken, replacer);

                        function replacer($0, bracketed, angled, dollarToken) {
                            bracketed = bracketed || angled;
                            // Named or numbered backreference with curly or angled braces
                            if (bracketed) {
                                // XRegExp behavior for `${n}` or `$<n>`:
                                // 1. Backreference to numbered capture, if `n` is an integer. Use `0` for the
                                //    entire match. Any number of leading zeros may be used.
                                // 2. Backreference to named capture `n`, if it exists and is not an integer
                                //    overridden by numbered capture. In practice, this does not overlap with
                                //    numbered capture since XRegExp does not allow named capture to use a bare
                                //    integer as the name.
                                // 3. If the name or number does not refer to an existing capturing group, it's
                                //    an error.
                                var n = +bracketed; // Type-convert; drop leading zeros
                                if (n <= args.length - 3) {
                                    return args[n] || '';
                                }
                                // Groups with the same name is an error, else would need `lastIndexOf`
                                n = captureNames ? captureNames.indexOf(bracketed) : -1;
                                if (n < 0) {
                                    throw new SyntaxError('Backreference to undefined group ' + $0);
                                }
                                return args[n + 1] || '';
                            }
                            // Else, special variable or numbered backreference without curly braces
                            if (dollarToken === '$') {
                                // $$
                                return '$';
                            }
                            if (dollarToken === '&' || +dollarToken === 0) {
                                // $&, $0 (not followed by 1-9), $00
                                return args[0];
                            }
                            if (dollarToken === '`') {
                                // $` (left context)
                                return args[args.length - 1].slice(0, args[args.length - 2]);
                            }
                            if (dollarToken === "'") {
                                // $' (right context)
                                return args[args.length - 1].slice(args[args.length - 2] + args[0].length);
                            }
                            // Else, numbered backreference without braces
                            dollarToken = +dollarToken; // Type-convert; drop leading zero
                            // XRegExp behavior for `$n` and `$nn`:
                            // - Backrefs end after 1 or 2 digits. Use `${..}` or `$<..>` for more digits.
                            // - `$1` is an error if no capturing groups.
                            // - `$10` is an error if less than 10 capturing groups. Use `${1}0` or `$<1>0`
                            //   instead.
                            // - `$01` is `$1` if at least one capturing group, else it's an error.
                            // - `$0` (not followed by 1-9) and `$00` are the entire match.
                            // Native behavior, for comparison:
                            // - Backrefs end after 1 or 2 digits. Cannot reference capturing group 100+.
                            // - `$1` is a literal `$1` if no capturing groups.
                            // - `$10` is `$1` followed by a literal `0` if less than 10 capturing groups.
                            // - `$01` is `$1` if at least one capturing group, else it's a literal `$01`.
                            // - `$0` is a literal `$0`.
                            if (!isNaN(dollarToken)) {
                                if (dollarToken > args.length - 3) {
                                    throw new SyntaxError('Backreference to undefined group ' + $0);
                                }
                                return args[dollarToken] || '';
                            }
                            // `$` followed by an unsupported char is an error, unlike native JS
                            throw new SyntaxError('Invalid token ' + $0);
                        }
                    });
                }

                if (isRegex) {
                    if (search.global) {
                        // Fixes IE, Safari bug (last tested IE 9, Safari 5.1)
                        search.lastIndex = 0;
                    } else {
                        // Fixes IE, Opera bug (last tested IE 9, Opera 11.6)
                        search.lastIndex = origLastIndex;
                    }
                }

                return result;
            };

            /**
             * Fixes browser bugs in the native `String.prototype.split`. Use via `XRegExp.split`.
             *
             * @memberOf String
             * @param {RegExp|String} separator Regex or string to use for separating the string.
             * @param {Number} [limit] Maximum number of items to include in the result array.
             * @returns {Array} Array of substrings.
             */
            fixed.split = function (separator, limit) {
                if (!XRegExp.isRegExp(separator)) {
                    // Browsers handle nonregex split correctly, so use the faster native method
                    return nativ.split.apply(this, arguments);
                }

                var str = String(this);
                var output = [];
                var origLastIndex = separator.lastIndex;
                var lastLastIndex = 0;
                var lastLength = void 0;

                // Values for `limit`, per the spec:
                // If undefined: pow(2,32) - 1
                // If 0, Infinity, or NaN: 0
                // If positive number: limit = floor(limit); if (limit >= pow(2,32)) limit -= pow(2,32);
                // If negative number: pow(2,32) - floor(abs(limit))
                // If other: Type-convert, then use the above rules
                // This line fails in very strange ways for some values of `limit` in Opera 10.5-10.63, unless
                // Opera Dragonfly is open (go figure). It works in at least Opera 9.5-10.1 and 11+
                limit = (limit === undefined ? -1 : limit) >>> 0;

                XRegExp.forEach(str, separator, function (match) {
                    // This condition is not the same as `if (match[0].length)`
                    if (match.index + match[0].length > lastLastIndex) {
                        output.push(str.slice(lastLastIndex, match.index));
                        if (match.length > 1 && match.index < str.length) {
                            Array.prototype.push.apply(output, match.slice(1));
                        }
                        lastLength = match[0].length;
                        lastLastIndex = match.index + lastLength;
                    }
                });

                if (lastLastIndex === str.length) {
                    if (!nativ.test.call(separator, '') || lastLength) {
                        output.push('');
                    }
                } else {
                    output.push(str.slice(lastLastIndex));
                }

                separator.lastIndex = origLastIndex;
                return output.length > limit ? output.slice(0, limit) : output;
            };

            // ==--------------------------==
            // Built-in syntax/flag tokens
            // ==--------------------------==

            /*
             * Letter escapes that natively match literal characters: `\a`, `\A`, etc. These should be
             * SyntaxErrors but are allowed in web reality. XRegExp makes them errors for cross-browser
             * consistency and to reserve their syntax, but lets them be superseded by addons.
             */
            XRegExp.addToken(/\\([ABCE-RTUVXYZaeg-mopqyz]|c(?![A-Za-z])|u(?![\dA-Fa-f]{4}|{[\dA-Fa-f]+})|x(?![\dA-Fa-f]{2}))/, function (match, scope) {
                // \B is allowed in default scope only
                if (match[1] === 'B' && scope === defaultScope) {
                    return match[0];
                }
                throw new SyntaxError('Invalid escape ' + match[0]);
            }, {
                scope: 'all',
                leadChar: '\\'
            });

            /*
             * Unicode code point escape with curly braces: `\u{N..}`. `N..` is any one or more digit
             * hexadecimal number from 0-10FFFF, and can include leading zeros. Requires the native ES6 `u` flag
             * to support code points greater than U+FFFF. Avoids converting code points above U+FFFF to
             * surrogate pairs (which could be done without flag `u`), since that could lead to broken behavior
             * if you follow a `\u{N..}` token that references a code point above U+FFFF with a quantifier, or
             * if you use the same in a character class.
             */
            XRegExp.addToken(/\\u{([\dA-Fa-f]+)}/, function (match, scope, flags) {
                var code = dec(match[1]);
                if (code > 0x10FFFF) {
                    throw new SyntaxError('Invalid Unicode code point ' + match[0]);
                }
                if (code <= 0xFFFF) {
                    // Converting to \uNNNN avoids needing to escape the literal character and keep it
                    // separate from preceding tokens
                    return "\\u" + pad4(hex(code));
                }
                // If `code` is between 0xFFFF and 0x10FFFF, require and defer to native handling
                if (hasNativeU && flags.indexOf('u') !== -1) {
                    return match[0];
                }
                throw new SyntaxError("Cannot use Unicode code point above \\u{FFFF} without flag u");
            }, {
                scope: 'all',
                leadChar: '\\'
            });

            /*
             * Empty character class: `[]` or `[^]`. This fixes a critical cross-browser syntax inconsistency.
             * Unless this is standardized (per the ES spec), regex syntax can't be accurately parsed because
             * character class endings can't be determined.
             */
            XRegExp.addToken(/\[(\^?)\]/,
            // For cross-browser compatibility with ES3, convert [] to \b\B and [^] to [\s\S].
            // (?!) should work like \b\B, but is unreliable in some versions of Firefox
            /* eslint-disable no-confusing-arrow */
            function (match) {
                return match[1] ? '[\\s\\S]' : '\\b\\B';
            },
            /* eslint-enable no-confusing-arrow */
            { leadChar: '[' });

            /*
             * Comment pattern: `(?# )`. Inline comments are an alternative to the line comments allowed in
             * free-spacing mode (flag x).
             */
            XRegExp.addToken(/\(\?#[^)]*\)/, getContextualTokenSeparator, { leadChar: '(' });

            /*
             * Whitespace and line comments, in free-spacing mode (aka extended mode, flag x) only.
             */
            XRegExp.addToken(/\s+|#[^\n]*\n?/, getContextualTokenSeparator, { flag: 'x' });

            /*
             * Dot, in dotall mode (aka singleline mode, flag s) only.
             */
            XRegExp.addToken(/\./, function () {
                return '[\\s\\S]';
            }, {
                flag: 's',
                leadChar: '.'
            });

            /*
             * Named backreference: `\k<name>`. Backreference names can use the characters A-Z, a-z, 0-9, _,
             * and $ only. Also allows numbered backreferences as `\k<n>`.
             */
            XRegExp.addToken(/\\k<([\w$]+)>/, function (match) {
                // Groups with the same name is an error, else would need `lastIndexOf`
                var index = isNaN(match[1]) ? this.captureNames.indexOf(match[1]) + 1 : +match[1];
                var endIndex = match.index + match[0].length;
                if (!index || index > this.captureNames.length) {
                    throw new SyntaxError('Backreference to undefined group ' + match[0]);
                }
                // Keep backreferences separate from subsequent literal numbers. This avoids e.g.
                // inadvertedly changing `(?<n>)\k<n>1` to `()\11`.
                return '\\' + index + (endIndex === match.input.length || isNaN(match.input[endIndex]) ? '' : '(?:)');
            }, { leadChar: '\\' });

            /*
             * Numbered backreference or octal, plus any following digits: `\0`, `\11`, etc. Octals except `\0`
             * not followed by 0-9 and backreferences to unopened capture groups throw an error. Other matches
             * are returned unaltered. IE < 9 doesn't support backreferences above `\99` in regex syntax.
             */
            XRegExp.addToken(/\\(\d+)/, function (match, scope) {
                if (!(scope === defaultScope && /^[1-9]/.test(match[1]) && +match[1] <= this.captureNames.length) && match[1] !== '0') {
                    throw new SyntaxError('Cannot use octal escape or backreference to undefined group ' + match[0]);
                }
                return match[0];
            }, {
                scope: 'all',
                leadChar: '\\'
            });

            /*
             * Named capturing group; match the opening delimiter only: `(?<name>`. Capture names can use the
             * characters A-Z, a-z, 0-9, _, and $ only. Names can't be integers. Supports Python-style
             * `(?P<name>` as an alternate syntax to avoid issues in some older versions of Opera which natively
             * supported the Python-style syntax. Otherwise, XRegExp might treat numbered backreferences to
             * Python-style named capture as octals.
             */
            XRegExp.addToken(/\(\?P?<([\w$]+)>/, function (match) {
                // Disallow bare integers as names because named backreferences are added to match arrays
                // and therefore numeric properties may lead to incorrect lookups
                if (!isNaN(match[1])) {
                    throw new SyntaxError('Cannot use integer as capture name ' + match[0]);
                }
                if (match[1] === 'length' || match[1] === '__proto__') {
                    throw new SyntaxError('Cannot use reserved word as capture name ' + match[0]);
                }
                if (this.captureNames.indexOf(match[1]) !== -1) {
                    throw new SyntaxError('Cannot use same name for multiple groups ' + match[0]);
                }
                this.captureNames.push(match[1]);
                this.hasNamedCapture = true;
                return '(';
            }, { leadChar: '(' });

            /*
             * Capturing group; match the opening parenthesis only. Required for support of named capturing
             * groups. Also adds explicit capture mode (flag n).
             */
            XRegExp.addToken(/\((?!\?)/, function (match, scope, flags) {
                if (flags.indexOf('n') !== -1) {
                    return '(?:';
                }
                this.captureNames.push(null);
                return '(';
            }, {
                optionalFlags: 'n',
                leadChar: '('
            });

            exports.default = XRegExp;
            module.exports = exports['default'];
        }, {}] }, {}, [8])(8);
});

/***/ }),

/***/ 11:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__logger_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__EventEmitter_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ResourceStore_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Translator_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__LanguageUtils_js__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__PluralResolver_js__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Interpolator_js__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__BackendConnector_js__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__CacheConnector_js__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__defaults_js__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__postProcessor_js__ = __webpack_require__(9);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }













function noop() {}

var I18n = function (_EventEmitter) {
  _inherits(I18n, _EventEmitter);

  function I18n() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var callback = arguments[1];

    _classCallCheck(this, I18n);

    var _this = _possibleConstructorReturn(this, _EventEmitter.call(this));

    _this.options = Object(__WEBPACK_IMPORTED_MODULE_9__defaults_js__["b" /* transformOptions */])(options);
    _this.services = {};
    _this.logger = __WEBPACK_IMPORTED_MODULE_0__logger_js__["a" /* default */];
    _this.modules = { external: [] };

    if (callback && !_this.isInitialized && !options.isClone) {
      var _ret;

      // https://github.com/i18next/i18next/issues/879
      if (!_this.options.initImmediate) return _ret = _this.init(options, callback), _possibleConstructorReturn(_this, _ret);
      setTimeout(function () {
        _this.init(options, callback);
      }, 0);
    }
    return _this;
  }

  I18n.prototype.init = function init() {
    var _this2 = this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var callback = arguments[1];

    if (typeof options === 'function') {
      callback = options;
      options = {};
    }
    this.options = _extends({}, Object(__WEBPACK_IMPORTED_MODULE_9__defaults_js__["a" /* get */])(), this.options, Object(__WEBPACK_IMPORTED_MODULE_9__defaults_js__["b" /* transformOptions */])(options));

    this.format = this.options.interpolation.format;
    if (!callback) callback = noop;

    function createClassOnDemand(ClassOrObject) {
      if (!ClassOrObject) return null;
      if (typeof ClassOrObject === 'function') return new ClassOrObject();
      return ClassOrObject;
    }

    // init services
    if (!this.options.isClone) {
      if (this.modules.logger) {
        __WEBPACK_IMPORTED_MODULE_0__logger_js__["a" /* default */].init(createClassOnDemand(this.modules.logger), this.options);
      } else {
        __WEBPACK_IMPORTED_MODULE_0__logger_js__["a" /* default */].init(null, this.options);
      }

      var lu = new __WEBPACK_IMPORTED_MODULE_4__LanguageUtils_js__["a" /* default */](this.options);
      this.store = new __WEBPACK_IMPORTED_MODULE_2__ResourceStore_js__["a" /* default */](this.options.resources, this.options);

      var s = this.services;
      s.logger = __WEBPACK_IMPORTED_MODULE_0__logger_js__["a" /* default */];
      s.resourceStore = this.store;
      s.resourceStore.on('added removed', function (lng, ns) {
        s.cacheConnector.save();
      });
      s.languageUtils = lu;
      s.pluralResolver = new __WEBPACK_IMPORTED_MODULE_5__PluralResolver_js__["a" /* default */](lu, { prepend: this.options.pluralSeparator, compatibilityJSON: this.options.compatibilityJSON, simplifyPluralSuffix: this.options.simplifyPluralSuffix });
      s.interpolator = new __WEBPACK_IMPORTED_MODULE_6__Interpolator_js__["a" /* default */](this.options);

      s.backendConnector = new __WEBPACK_IMPORTED_MODULE_7__BackendConnector_js__["a" /* default */](createClassOnDemand(this.modules.backend), s.resourceStore, s, this.options);
      // pipe events from backendConnector
      s.backendConnector.on('*', function (event) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        _this2.emit.apply(_this2, [event].concat(args));
      });

      s.backendConnector.on('loaded', function (loaded) {
        s.cacheConnector.save();
      });

      s.cacheConnector = new __WEBPACK_IMPORTED_MODULE_8__CacheConnector_js__["a" /* default */](createClassOnDemand(this.modules.cache), s.resourceStore, s, this.options);
      // pipe events from backendConnector
      s.cacheConnector.on('*', function (event) {
        for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          args[_key2 - 1] = arguments[_key2];
        }

        _this2.emit.apply(_this2, [event].concat(args));
      });

      if (this.modules.languageDetector) {
        s.languageDetector = createClassOnDemand(this.modules.languageDetector);
        s.languageDetector.init(s, this.options.detection, this.options);
      }

      this.translator = new __WEBPACK_IMPORTED_MODULE_3__Translator_js__["a" /* default */](this.services, this.options);
      // pipe events from translator
      this.translator.on('*', function (event) {
        for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
          args[_key3 - 1] = arguments[_key3];
        }

        _this2.emit.apply(_this2, [event].concat(args));
      });

      this.modules.external.forEach(function (m) {
        if (m.init) m.init(_this2);
      });
    }

    // append api
    var storeApi = ['getResource', 'addResource', 'addResources', 'addResourceBundle', 'removeResourceBundle', 'hasResourceBundle', 'getResourceBundle'];
    storeApi.forEach(function (fcName) {
      _this2[fcName] = function () {
        var _store;

        return (_store = _this2.store)[fcName].apply(_store, arguments);
      };
    });

    var load = function load() {
      _this2.changeLanguage(_this2.options.lng, function (err, t) {
        _this2.isInitialized = true;
        _this2.logger.log('initialized', _this2.options);
        _this2.emit('initialized', _this2.options);

        callback(err, t);
      });
    };

    if (this.options.resources || !this.options.initImmediate) {
      load();
    } else {
      setTimeout(load, 0);
    }

    return this;
  };

  /* eslint consistent-return: 0 */


  I18n.prototype.loadResources = function loadResources() {
    var _this3 = this;

    var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : noop;

    if (!this.options.resources) {
      if (this.language && this.language.toLowerCase() === 'cimode') return callback(); // avoid loading resources for cimode

      var toLoad = [];

      var append = function append(lng) {
        if (!lng) return;
        var lngs = _this3.services.languageUtils.toResolveHierarchy(lng);
        lngs.forEach(function (l) {
          if (toLoad.indexOf(l) < 0) toLoad.push(l);
        });
      };

      if (!this.language) {
        // at least load fallbacks in this case
        var fallbacks = this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);
        fallbacks.forEach(function (l) {
          return append(l);
        });
      } else {
        append(this.language);
      }

      if (this.options.preload) {
        this.options.preload.forEach(function (l) {
          return append(l);
        });
      }

      this.services.cacheConnector.load(toLoad, this.options.ns, function () {
        _this3.services.backendConnector.load(toLoad, _this3.options.ns, callback);
      });
    } else {
      callback(null);
    }
  };

  I18n.prototype.reloadResources = function reloadResources(lngs, ns) {
    if (!lngs) lngs = this.languages;
    if (!ns) ns = this.options.ns;
    this.services.backendConnector.reload(lngs, ns);
  };

  I18n.prototype.use = function use(module) {
    if (module.type === 'backend') {
      this.modules.backend = module;
    }

    if (module.type === 'cache') {
      this.modules.cache = module;
    }

    if (module.type === 'logger' || module.log && module.warn && module.error) {
      this.modules.logger = module;
    }

    if (module.type === 'languageDetector') {
      this.modules.languageDetector = module;
    }

    if (module.type === 'postProcessor') {
      __WEBPACK_IMPORTED_MODULE_10__postProcessor_js__["a" /* default */].addPostProcessor(module);
    }

    if (module.type === '3rdParty') {
      this.modules.external.push(module);
    }

    return this;
  };

  I18n.prototype.changeLanguage = function changeLanguage(lng, callback) {
    var _this4 = this;

    var done = function done(err, l) {
      _this4.translator.changeLanguage(l);

      if (l) {
        _this4.emit('languageChanged', l);
        _this4.logger.log('languageChanged', l);
      }

      if (callback) callback(err, function () {
        return _this4.t.apply(_this4, arguments);
      });
    };

    var setLng = function setLng(l) {
      if (l) {
        _this4.language = l;
        _this4.languages = _this4.services.languageUtils.toResolveHierarchy(l);
        if (!_this4.translator.language) _this4.translator.changeLanguage(l);

        if (_this4.services.languageDetector) _this4.services.languageDetector.cacheUserLanguage(l);
      }

      _this4.loadResources(function (err) {
        done(err, l);
      });
    };

    if (!lng && this.services.languageDetector && !this.services.languageDetector.async) {
      setLng(this.services.languageDetector.detect());
    } else if (!lng && this.services.languageDetector && this.services.languageDetector.async) {
      this.services.languageDetector.detect(setLng);
    } else {
      setLng(lng);
    }
  };

  I18n.prototype.getFixedT = function getFixedT(lng, ns) {
    var _this5 = this;

    var fixedT = function fixedT(key, opts) {
      for (var _len4 = arguments.length, rest = Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
        rest[_key4 - 2] = arguments[_key4];
      }

      var options = _extends({}, opts);
      if ((typeof opts === 'undefined' ? 'undefined' : _typeof(opts)) !== 'object') {
        options = _this5.options.overloadTranslationOptionHandler([key, opts].concat(rest));
      }

      options.lng = options.lng || fixedT.lng;
      options.lngs = options.lngs || fixedT.lngs;
      options.ns = options.ns || fixedT.ns;
      return _this5.t(key, options);
    };
    if (typeof lng === 'string') {
      fixedT.lng = lng;
    } else {
      fixedT.lngs = lng;
    }
    fixedT.ns = ns;
    return fixedT;
  };

  I18n.prototype.t = function t() {
    var _translator;

    return this.translator && (_translator = this.translator).translate.apply(_translator, arguments);
  };

  I18n.prototype.exists = function exists() {
    var _translator2;

    return this.translator && (_translator2 = this.translator).exists.apply(_translator2, arguments);
  };

  I18n.prototype.setDefaultNamespace = function setDefaultNamespace(ns) {
    this.options.defaultNS = ns;
  };

  I18n.prototype.loadNamespaces = function loadNamespaces(ns, callback) {
    var _this6 = this;

    if (!this.options.ns) return callback && callback();
    if (typeof ns === 'string') ns = [ns];

    ns.forEach(function (n) {
      if (_this6.options.ns.indexOf(n) < 0) _this6.options.ns.push(n);
    });

    this.loadResources(callback);
  };

  I18n.prototype.loadLanguages = function loadLanguages(lngs, callback) {
    if (typeof lngs === 'string') lngs = [lngs];
    var preloaded = this.options.preload || [];

    var newLngs = lngs.filter(function (lng) {
      return preloaded.indexOf(lng) < 0;
    });
    // Exit early if all given languages are already preloaded
    if (!newLngs.length) return callback();

    this.options.preload = preloaded.concat(newLngs);
    this.loadResources(callback);
  };

  I18n.prototype.dir = function dir(lng) {
    if (!lng) lng = this.languages && this.languages.length > 0 ? this.languages[0] : this.language;
    if (!lng) return 'rtl';

    var rtlLngs = ['ar', 'shu', 'sqr', 'ssh', 'xaa', 'yhd', 'yud', 'aao', 'abh', 'abv', 'acm', 'acq', 'acw', 'acx', 'acy', 'adf', 'ads', 'aeb', 'aec', 'afb', 'ajp', 'apc', 'apd', 'arb', 'arq', 'ars', 'ary', 'arz', 'auz', 'avl', 'ayh', 'ayl', 'ayn', 'ayp', 'bbz', 'pga', 'he', 'iw', 'ps', 'pbt', 'pbu', 'pst', 'prp', 'prd', 'ur', 'ydd', 'yds', 'yih', 'ji', 'yi', 'hbo', 'men', 'xmn', 'fa', 'jpr', 'peo', 'pes', 'prs', 'dv', 'sam'];

    return rtlLngs.indexOf(this.services.languageUtils.getLanguagePartFromCode(lng)) >= 0 ? 'rtl' : 'ltr';
  };

  /* eslint class-methods-use-this: 0 */


  I18n.prototype.createInstance = function createInstance() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var callback = arguments[1];

    return new I18n(options, callback);
  };

  I18n.prototype.cloneInstance = function cloneInstance() {
    var _this7 = this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;

    var mergedOptions = _extends({}, this.options, options, { isClone: true });
    var clone = new I18n(mergedOptions);
    var membersToCopy = ['store', 'services', 'language'];
    membersToCopy.forEach(function (m) {
      clone[m] = _this7[m];
    });
    clone.translator = new __WEBPACK_IMPORTED_MODULE_3__Translator_js__["a" /* default */](clone.services, clone.options);
    clone.translator.on('*', function (event) {
      for (var _len5 = arguments.length, args = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
        args[_key5 - 1] = arguments[_key5];
      }

      clone.emit.apply(clone, [event].concat(args));
    });
    clone.init(mergedOptions, callback);
    clone.translator.options = clone.options; // sync options

    return clone;
  };

  return I18n;
}(__WEBPACK_IMPORTED_MODULE_1__EventEmitter_js__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (new I18n());

/***/ }),

/***/ 12:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__EventEmitter_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_js__ = __webpack_require__(3);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }




var ResourceStore = function (_EventEmitter) {
  _inherits(ResourceStore, _EventEmitter);

  function ResourceStore(data) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { ns: ['translation'], defaultNS: 'translation' };

    _classCallCheck(this, ResourceStore);

    var _this = _possibleConstructorReturn(this, _EventEmitter.call(this));

    _this.data = data || {};
    _this.options = options;
    return _this;
  }

  ResourceStore.prototype.addNamespaces = function addNamespaces(ns) {
    if (this.options.ns.indexOf(ns) < 0) {
      this.options.ns.push(ns);
    }
  };

  ResourceStore.prototype.removeNamespaces = function removeNamespaces(ns) {
    var index = this.options.ns.indexOf(ns);
    if (index > -1) {
      this.options.ns.splice(index, 1);
    }
  };

  ResourceStore.prototype.getResource = function getResource(lng, ns, key) {
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    var keySeparator = options.keySeparator || this.options.keySeparator;
    if (keySeparator === undefined) keySeparator = '.';

    var path = [lng, ns];
    if (key && typeof key !== 'string') path = path.concat(key);
    if (key && typeof key === 'string') path = path.concat(keySeparator ? key.split(keySeparator) : key);

    if (lng.indexOf('.') > -1) {
      path = lng.split('.');
    }

    return __WEBPACK_IMPORTED_MODULE_1__utils_js__["d" /* getPath */](this.data, path);
  };

  ResourceStore.prototype.addResource = function addResource(lng, ns, key, value) {
    var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : { silent: false };

    var keySeparator = this.options.keySeparator;
    if (keySeparator === undefined) keySeparator = '.';

    var path = [lng, ns];
    if (key) path = path.concat(keySeparator ? key.split(keySeparator) : key);

    if (lng.indexOf('.') > -1) {
      path = lng.split('.');
      value = ns;
      ns = path[1];
    }

    this.addNamespaces(ns);

    __WEBPACK_IMPORTED_MODULE_1__utils_js__["h" /* setPath */](this.data, path, value);

    if (!options.silent) this.emit('added', lng, ns, key, value);
  };

  ResourceStore.prototype.addResources = function addResources(lng, ns, resources) {
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : { silent: false };

    /* eslint no-restricted-syntax: 0 */
    for (var m in resources) {
      if (typeof resources[m] === 'string') this.addResource(lng, ns, m, resources[m], { silent: true });
    }
    if (!options.silent) this.emit('added', lng, ns, resources);
  };

  ResourceStore.prototype.addResourceBundle = function addResourceBundle(lng, ns, resources, deep, overwrite) {
    var options = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : { silent: false };

    var path = [lng, ns];
    if (lng.indexOf('.') > -1) {
      path = lng.split('.');
      deep = resources;
      resources = ns;
      ns = path[1];
    }

    this.addNamespaces(ns);

    var pack = __WEBPACK_IMPORTED_MODULE_1__utils_js__["d" /* getPath */](this.data, path) || {};

    if (deep) {
      __WEBPACK_IMPORTED_MODULE_1__utils_js__["b" /* deepExtend */](pack, resources, overwrite);
    } else {
      pack = _extends({}, pack, resources);
    }

    __WEBPACK_IMPORTED_MODULE_1__utils_js__["h" /* setPath */](this.data, path, pack);

    if (!options.silent) this.emit('added', lng, ns, resources);
  };

  ResourceStore.prototype.removeResourceBundle = function removeResourceBundle(lng, ns) {
    if (this.hasResourceBundle(lng, ns)) {
      delete this.data[lng][ns];
    }
    this.removeNamespaces(ns);

    this.emit('removed', lng, ns);
  };

  ResourceStore.prototype.hasResourceBundle = function hasResourceBundle(lng, ns) {
    return this.getResource(lng, ns) !== undefined;
  };

  ResourceStore.prototype.getResourceBundle = function getResourceBundle(lng, ns) {
    if (!ns) ns = this.options.defaultNS;

    // COMPATIBILITY: remove extend in v2.1.0
    if (this.options.compatibilityAPI === 'v1') return _extends({}, this.getResource(lng, ns));

    return this.getResource(lng, ns);
  };

  ResourceStore.prototype.toJSON = function toJSON() {
    return this.data;
  };

  return ResourceStore;
}(__WEBPACK_IMPORTED_MODULE_0__EventEmitter_js__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (ResourceStore);

/***/ }),

/***/ 13:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__logger_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__EventEmitter_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__postProcessor_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_js__ = __webpack_require__(3);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }






var Translator = function (_EventEmitter) {
  _inherits(Translator, _EventEmitter);

  function Translator(services) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Translator);

    var _this = _possibleConstructorReturn(this, _EventEmitter.call(this));

    __WEBPACK_IMPORTED_MODULE_3__utils_js__["a" /* copy */](['resourceStore', 'languageUtils', 'pluralResolver', 'interpolator', 'backendConnector'], services, _this);

    _this.options = options;
    _this.logger = __WEBPACK_IMPORTED_MODULE_0__logger_js__["a" /* default */].create('translator');
    return _this;
  }

  Translator.prototype.changeLanguage = function changeLanguage(lng) {
    if (lng) this.language = lng;
  };

  Translator.prototype.exists = function exists(key) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { interpolation: {} };

    var resolved = this.resolve(key, options);
    return resolved && resolved.res !== undefined;
  };

  Translator.prototype.extractFromKey = function extractFromKey(key, options) {
    var nsSeparator = options.nsSeparator || this.options.nsSeparator;
    if (nsSeparator === undefined) nsSeparator = ':';
    var keySeparator = options.keySeparator || this.options.keySeparator || '.';

    var namespaces = options.ns || this.options.defaultNS;
    if (nsSeparator && key.indexOf(nsSeparator) > -1) {
      var parts = key.split(nsSeparator);
      if (nsSeparator !== keySeparator || nsSeparator === keySeparator && this.options.ns.indexOf(parts[0]) > -1) namespaces = parts.shift();
      key = parts.join(keySeparator);
    }
    if (typeof namespaces === 'string') namespaces = [namespaces];

    return {
      key: key,
      namespaces: namespaces
    };
  };

  Translator.prototype.translate = function translate(keys, options) {
    var _this2 = this;

    if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) !== 'object' && this.options.overloadTranslationOptionHandler) {
      /* eslint prefer-rest-params: 0 */
      options = this.options.overloadTranslationOptionHandler(arguments);
    }
    if (!options) options = {};

    // non valid keys handling
    if (keys === undefined || keys === null || keys === '') return '';
    if (typeof keys === 'number') keys = String(keys);
    if (typeof keys === 'string') keys = [keys];

    // separators
    var keySeparator = options.keySeparator || this.options.keySeparator || '.';

    // get namespace(s)

    var _extractFromKey = this.extractFromKey(keys[keys.length - 1], options),
        key = _extractFromKey.key,
        namespaces = _extractFromKey.namespaces;

    var namespace = namespaces[namespaces.length - 1];

    // return key on CIMode
    var lng = options.lng || this.language;
    var appendNamespaceToCIMode = options.appendNamespaceToCIMode || this.options.appendNamespaceToCIMode;
    if (lng && lng.toLowerCase() === 'cimode') {
      if (appendNamespaceToCIMode) {
        var nsSeparator = options.nsSeparator || this.options.nsSeparator;
        return namespace + nsSeparator + key;
      }

      return key;
    }

    // resolve from store
    var resolved = this.resolve(keys, options);
    var res = resolved && resolved.res;
    var resUsedKey = resolved && resolved.usedKey || key;

    var resType = Object.prototype.toString.apply(res);
    var noObject = ['[object Number]', '[object Function]', '[object RegExp]'];
    var joinArrays = options.joinArrays !== undefined ? options.joinArrays : this.options.joinArrays;

    // object
    var handleAsObject = typeof res !== 'string' && typeof res !== 'boolean' && typeof res !== 'number';
    if (res && handleAsObject && noObject.indexOf(resType) < 0 && !(joinArrays && resType === '[object Array]')) {
      if (!options.returnObjects && !this.options.returnObjects) {
        this.logger.warn('accessing an object - but returnObjects options is not enabled!');
        return this.options.returnedObjectHandler ? this.options.returnedObjectHandler(resUsedKey, res, options) : 'key \'' + key + ' (' + this.language + ')\' returned an object instead of string.';
      }

      // if we got a separator we loop over children - else we just return object as is
      // as having it set to false means no hierarchy so no lookup for nested values
      if (options.keySeparator || this.options.keySeparator) {
        var copy = resType === '[object Array]' ? [] : {}; // apply child translation on a copy

        /* eslint no-restricted-syntax: 0 */
        for (var m in res) {
          if (Object.prototype.hasOwnProperty.call(res, m)) {
            var deepKey = '' + resUsedKey + keySeparator + m;
            copy[m] = this.translate(deepKey, _extends({}, options, { joinArrays: false, ns: namespaces }));
            if (copy[m] === deepKey) copy[m] = res[m]; // if nothing found use orginal value as fallback
          }
        }
        res = copy;
      }
    } else if (joinArrays && resType === '[object Array]') {
      // array special treatment
      res = res.join(joinArrays);
      if (res) res = this.extendTranslation(res, keys, options);
    } else {
      // string, empty or null
      var usedDefault = false;
      var usedKey = false;

      // fallback value
      if (!this.isValidLookup(res) && options.defaultValue !== undefined) {
        usedDefault = true;
        res = options.defaultValue;
      }
      if (!this.isValidLookup(res)) {
        usedKey = true;
        res = key;
      }

      // save missing
      var updateMissing = options.defaultValue && options.defaultValue !== res && this.options.updateMissing;
      if (usedKey || usedDefault || updateMissing) {
        this.logger.log(updateMissing ? 'updateKey' : 'missingKey', lng, namespace, key, updateMissing ? options.defaultValue : res);

        var lngs = [];
        var fallbackLngs = this.languageUtils.getFallbackCodes(this.options.fallbackLng, options.lng || this.language);
        if (this.options.saveMissingTo === 'fallback' && fallbackLngs && fallbackLngs[0]) {
          for (var i = 0; i < fallbackLngs.length; i++) {
            lngs.push(fallbackLngs[i]);
          }
        } else if (this.options.saveMissingTo === 'all') {
          lngs = this.languageUtils.toResolveHierarchy(options.lng || this.language);
        } else {
          lngs.push(options.lng || this.language);
        }

        var send = function send(l, k) {
          if (_this2.options.missingKeyHandler) {
            _this2.options.missingKeyHandler(l, namespace, k, updateMissing ? options.defaultValue : res, updateMissing, options);
          } else if (_this2.backendConnector && _this2.backendConnector.saveMissing) {
            _this2.backendConnector.saveMissing(l, namespace, k, updateMissing ? options.defaultValue : res, updateMissing, options);
          }
          _this2.emit('missingKey', l, namespace, k, res);
        };

        if (this.options.saveMissing) {
          if (this.options.saveMissingPlurals && options.count) {
            lngs.forEach(function (l) {
              var plurals = _this2.pluralResolver.getPluralFormsOfKey(l, key);

              plurals.forEach(function (p) {
                return send([l], p);
              });
            });
          } else {
            send(lngs, key);
          }
        }
      }

      // extend
      res = this.extendTranslation(res, keys, options);

      // append namespace if still key
      if (usedKey && res === key && this.options.appendNamespaceToMissingKey) res = namespace + ':' + key;

      // parseMissingKeyHandler
      if (usedKey && this.options.parseMissingKeyHandler) res = this.options.parseMissingKeyHandler(res);
    }

    // return
    return res;
  };

  Translator.prototype.extendTranslation = function extendTranslation(res, key, options) {
    var _this3 = this;

    if (options.interpolation) this.interpolator.init(_extends({}, options, { interpolation: _extends({}, this.options.interpolation, options.interpolation) }));

    // interpolate
    var data = options.replace && typeof options.replace !== 'string' ? options.replace : options;
    if (this.options.interpolation.defaultVariables) data = _extends({}, this.options.interpolation.defaultVariables, data);
    res = this.interpolator.interpolate(res, data, options.lng || this.language);

    // nesting
    if (options.nest !== false) res = this.interpolator.nest(res, function () {
      return _this3.translate.apply(_this3, arguments);
    }, options);

    if (options.interpolation) this.interpolator.reset();

    // post process
    var postProcess = options.postProcess || this.options.postProcess;
    var postProcessorNames = typeof postProcess === 'string' ? [postProcess] : postProcess;

    if (res !== undefined && res !== null && postProcessorNames && postProcessorNames.length && options.applyPostProcessor !== false) {
      res = __WEBPACK_IMPORTED_MODULE_2__postProcessor_js__["a" /* default */].handle(postProcessorNames, res, key, options, this);
    }

    return res;
  };

  Translator.prototype.resolve = function resolve(keys) {
    var _this4 = this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var found = void 0;
    var usedKey = void 0;

    if (typeof keys === 'string') keys = [keys];

    // forEach possible key
    keys.forEach(function (k) {
      if (_this4.isValidLookup(found)) return;
      var extracted = _this4.extractFromKey(k, options);
      var key = extracted.key;
      usedKey = key;
      var namespaces = extracted.namespaces;
      if (_this4.options.fallbackNS) namespaces = namespaces.concat(_this4.options.fallbackNS);

      var needsPluralHandling = options.count !== undefined && typeof options.count !== 'string';
      var needsContextHandling = options.context !== undefined && typeof options.context === 'string' && options.context !== '';

      var codes = options.lngs ? options.lngs : _this4.languageUtils.toResolveHierarchy(options.lng || _this4.language);

      namespaces.forEach(function (ns) {
        if (_this4.isValidLookup(found)) return;

        codes.forEach(function (code) {
          if (_this4.isValidLookup(found)) return;

          var finalKey = key;
          var finalKeys = [finalKey];

          var pluralSuffix = void 0;
          if (needsPluralHandling) pluralSuffix = _this4.pluralResolver.getSuffix(code, options.count);

          // fallback for plural if context not found
          if (needsPluralHandling && needsContextHandling) finalKeys.push(finalKey + pluralSuffix);

          // get key for context if needed
          if (needsContextHandling) finalKeys.push(finalKey += '' + _this4.options.contextSeparator + options.context);

          // get key for plural if needed
          if (needsPluralHandling) finalKeys.push(finalKey += pluralSuffix);

          // iterate over finalKeys starting with most specific pluralkey (-> contextkey only) -> singularkey only
          var possibleKey = void 0;
          /* eslint no-cond-assign: 0 */
          while (possibleKey = finalKeys.pop()) {
            if (!_this4.isValidLookup(found)) {
              found = _this4.getResource(code, ns, possibleKey, options);
            }
          }
        });
      });
    });

    return { res: found, usedKey: usedKey };
  };

  Translator.prototype.isValidLookup = function isValidLookup(res) {
    return res !== undefined && !(!this.options.returnNull && res === null) && !(!this.options.returnEmptyString && res === '');
  };

  Translator.prototype.getResource = function getResource(code, ns, key) {
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    return this.resourceStore.getResource(code, ns, key, options);
  };

  return Translator;
}(__WEBPACK_IMPORTED_MODULE_1__EventEmitter_js__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (Translator);

/***/ }),

/***/ 14:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__logger_js__ = __webpack_require__(0);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

var LanguageUtil = function () {
  function LanguageUtil(options) {
    _classCallCheck(this, LanguageUtil);

    this.options = options;

    this.whitelist = this.options.whitelist || false;
    this.logger = __WEBPACK_IMPORTED_MODULE_0__logger_js__["a" /* default */].create('languageUtils');
  }

  LanguageUtil.prototype.getScriptPartFromCode = function getScriptPartFromCode(code) {
    if (!code || code.indexOf('-') < 0) return null;

    var p = code.split('-');
    if (p.length === 2) return null;
    p.pop();
    return this.formatLanguageCode(p.join('-'));
  };

  LanguageUtil.prototype.getLanguagePartFromCode = function getLanguagePartFromCode(code) {
    if (!code || code.indexOf('-') < 0) return code;

    var p = code.split('-');
    return this.formatLanguageCode(p[0]);
  };

  LanguageUtil.prototype.formatLanguageCode = function formatLanguageCode(code) {
    // http://www.iana.org/assignments/language-tags/language-tags.xhtml
    if (typeof code === 'string' && code.indexOf('-') > -1) {
      var specialCases = ['hans', 'hant', 'latn', 'cyrl', 'cans', 'mong', 'arab'];
      var p = code.split('-');

      if (this.options.lowerCaseLng) {
        p = p.map(function (part) {
          return part.toLowerCase();
        });
      } else if (p.length === 2) {
        p[0] = p[0].toLowerCase();
        p[1] = p[1].toUpperCase();

        if (specialCases.indexOf(p[1].toLowerCase()) > -1) p[1] = capitalize(p[1].toLowerCase());
      } else if (p.length === 3) {
        p[0] = p[0].toLowerCase();

        // if lenght 2 guess it's a country
        if (p[1].length === 2) p[1] = p[1].toUpperCase();
        if (p[0] !== 'sgn' && p[2].length === 2) p[2] = p[2].toUpperCase();

        if (specialCases.indexOf(p[1].toLowerCase()) > -1) p[1] = capitalize(p[1].toLowerCase());
        if (specialCases.indexOf(p[2].toLowerCase()) > -1) p[2] = capitalize(p[2].toLowerCase());
      }

      return p.join('-');
    }

    return this.options.cleanCode || this.options.lowerCaseLng ? code.toLowerCase() : code;
  };

  LanguageUtil.prototype.isWhitelisted = function isWhitelisted(code) {
    if (this.options.load === 'languageOnly' || this.options.nonExplicitWhitelist) {
      code = this.getLanguagePartFromCode(code);
    }
    return !this.whitelist || !this.whitelist.length || this.whitelist.indexOf(code) > -1;
  };

  LanguageUtil.prototype.getFallbackCodes = function getFallbackCodes(fallbacks, code) {
    if (!fallbacks) return [];
    if (typeof fallbacks === 'string') fallbacks = [fallbacks];
    if (Object.prototype.toString.apply(fallbacks) === '[object Array]') return fallbacks;

    if (!code) return fallbacks.default || [];

    // asume we have an object defining fallbacks
    var found = fallbacks[code];
    if (!found) found = fallbacks[this.getScriptPartFromCode(code)];
    if (!found) found = fallbacks[this.formatLanguageCode(code)];
    if (!found) found = fallbacks.default;

    return found || [];
  };

  LanguageUtil.prototype.toResolveHierarchy = function toResolveHierarchy(code, fallbackCode) {
    var _this = this;

    var fallbackCodes = this.getFallbackCodes(fallbackCode || this.options.fallbackLng || [], code);

    var codes = [];
    var addCode = function addCode(c) {
      if (!c) return;
      if (_this.isWhitelisted(c)) {
        codes.push(c);
      } else {
        _this.logger.warn('rejecting non-whitelisted language code: ' + c);
      }
    };

    if (typeof code === 'string' && code.indexOf('-') > -1) {
      if (this.options.load !== 'languageOnly') addCode(this.formatLanguageCode(code));
      if (this.options.load !== 'languageOnly' && this.options.load !== 'currentOnly') addCode(this.getScriptPartFromCode(code));
      if (this.options.load !== 'currentOnly') addCode(this.getLanguagePartFromCode(code));
    } else if (typeof code === 'string') {
      addCode(this.formatLanguageCode(code));
    }

    fallbackCodes.forEach(function (fc) {
      if (codes.indexOf(fc) < 0) addCode(_this.formatLanguageCode(fc));
    });

    return codes;
  };

  return LanguageUtil;
}();

/* harmony default export */ __webpack_exports__["a"] = (LanguageUtil);

/***/ }),

/***/ 15:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__logger_js__ = __webpack_require__(0);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



// definition http://translate.sourceforge.net/wiki/l10n/pluralforms
/* eslint-disable */
var sets = [{ lngs: ['ach', 'ak', 'am', 'arn', 'br', 'fil', 'gun', 'ln', 'mfe', 'mg', 'mi', 'oc', 'pt', 'pt-BR', 'tg', 'ti', 'tr', 'uz', 'wa'], nr: [1, 2], fc: 1 }, { lngs: ['af', 'an', 'ast', 'az', 'bg', 'bn', 'ca', 'da', 'de', 'dev', 'el', 'en', 'eo', 'es', 'et', 'eu', 'fi', 'fo', 'fur', 'fy', 'gl', 'gu', 'ha', 'he', 'hi', 'hu', 'hy', 'ia', 'it', 'kn', 'ku', 'lb', 'mai', 'ml', 'mn', 'mr', 'nah', 'nap', 'nb', 'ne', 'nl', 'nn', 'no', 'nso', 'pa', 'pap', 'pms', 'ps', 'pt-PT', 'rm', 'sco', 'se', 'si', 'so', 'son', 'sq', 'sv', 'sw', 'ta', 'te', 'tk', 'ur', 'yo'], nr: [1, 2], fc: 2 }, { lngs: ['ay', 'bo', 'cgg', 'fa', 'id', 'ja', 'jbo', 'ka', 'kk', 'km', 'ko', 'ky', 'lo', 'ms', 'sah', 'su', 'th', 'tt', 'ug', 'vi', 'wo', 'zh'], nr: [1], fc: 3 }, { lngs: ['be', 'bs', 'dz', 'hr', 'ru', 'sr', 'uk'], nr: [1, 2, 5], fc: 4 }, { lngs: ['ar'], nr: [0, 1, 2, 3, 11, 100], fc: 5 }, { lngs: ['cs', 'sk'], nr: [1, 2, 5], fc: 6 }, { lngs: ['csb', 'pl'], nr: [1, 2, 5], fc: 7 }, { lngs: ['cy'], nr: [1, 2, 3, 8], fc: 8 }, { lngs: ['fr'], nr: [1, 2], fc: 9 }, { lngs: ['ga'], nr: [1, 2, 3, 7, 11], fc: 10 }, { lngs: ['gd'], nr: [1, 2, 3, 20], fc: 11 }, { lngs: ['is'], nr: [1, 2], fc: 12 }, { lngs: ['jv'], nr: [0, 1], fc: 13 }, { lngs: ['kw'], nr: [1, 2, 3, 4], fc: 14 }, { lngs: ['lt'], nr: [1, 2, 10], fc: 15 }, { lngs: ['lv'], nr: [1, 2, 0], fc: 16 }, { lngs: ['mk'], nr: [1, 2], fc: 17 }, { lngs: ['mnk'], nr: [0, 1, 2], fc: 18 }, { lngs: ['mt'], nr: [1, 2, 11, 20], fc: 19 }, { lngs: ['or'], nr: [2, 1], fc: 2 }, { lngs: ['ro'], nr: [1, 2, 20], fc: 20 }, { lngs: ['sl'], nr: [5, 1, 2, 3], fc: 21 }];

var _rulesPluralsTypes = {
  1: function _(n) {
    return Number(n > 1);
  },
  2: function _(n) {
    return Number(n != 1);
  },
  3: function _(n) {
    return 0;
  },
  4: function _(n) {
    return Number(n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
  },
  5: function _(n) {
    return Number(n === 0 ? 0 : n == 1 ? 1 : n == 2 ? 2 : n % 100 >= 3 && n % 100 <= 10 ? 3 : n % 100 >= 11 ? 4 : 5);
  },
  6: function _(n) {
    return Number(n == 1 ? 0 : n >= 2 && n <= 4 ? 1 : 2);
  },
  7: function _(n) {
    return Number(n == 1 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
  },
  8: function _(n) {
    return Number(n == 1 ? 0 : n == 2 ? 1 : n != 8 && n != 11 ? 2 : 3);
  },
  9: function _(n) {
    return Number(n >= 2);
  },
  10: function _(n) {
    return Number(n == 1 ? 0 : n == 2 ? 1 : n < 7 ? 2 : n < 11 ? 3 : 4);
  },
  11: function _(n) {
    return Number(n == 1 || n == 11 ? 0 : n == 2 || n == 12 ? 1 : n > 2 && n < 20 ? 2 : 3);
  },
  12: function _(n) {
    return Number(n % 10 != 1 || n % 100 == 11);
  },
  13: function _(n) {
    return Number(n !== 0);
  },
  14: function _(n) {
    return Number(n == 1 ? 0 : n == 2 ? 1 : n == 3 ? 2 : 3);
  },
  15: function _(n) {
    return Number(n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
  },
  16: function _(n) {
    return Number(n % 10 == 1 && n % 100 != 11 ? 0 : n !== 0 ? 1 : 2);
  },
  17: function _(n) {
    return Number(n == 1 || n % 10 == 1 ? 0 : 1);
  },
  18: function _(n) {
    return Number(n == 0 ? 0 : n == 1 ? 1 : 2);
  },
  19: function _(n) {
    return Number(n == 1 ? 0 : n === 0 || n % 100 > 1 && n % 100 < 11 ? 1 : n % 100 > 10 && n % 100 < 20 ? 2 : 3);
  },
  20: function _(n) {
    return Number(n == 1 ? 0 : n === 0 || n % 100 > 0 && n % 100 < 20 ? 1 : 2);
  },
  21: function _(n) {
    return Number(n % 100 == 1 ? 1 : n % 100 == 2 ? 2 : n % 100 == 3 || n % 100 == 4 ? 3 : 0);
  }
};
/* eslint-enable */

function createRules() {
  var rules = {};
  sets.forEach(function (set) {
    set.lngs.forEach(function (l) {
      rules[l] = {
        numbers: set.nr,
        plurals: _rulesPluralsTypes[set.fc]
      };
    });
  });
  return rules;
}

var PluralResolver = function () {
  function PluralResolver(languageUtils) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, PluralResolver);

    this.languageUtils = languageUtils;
    this.options = options;

    this.logger = __WEBPACK_IMPORTED_MODULE_0__logger_js__["a" /* default */].create('pluralResolver');

    this.rules = createRules();
  }

  PluralResolver.prototype.addRule = function addRule(lng, obj) {
    this.rules[lng] = obj;
  };

  PluralResolver.prototype.getRule = function getRule(code) {
    return this.rules[code] || this.rules[this.languageUtils.getLanguagePartFromCode(code)];
  };

  PluralResolver.prototype.needsPlural = function needsPlural(code) {
    var rule = this.getRule(code);

    return rule && rule.numbers.length > 1;
  };

  PluralResolver.prototype.getPluralFormsOfKey = function getPluralFormsOfKey(code, key) {
    var _this = this;

    var ret = [];

    var rule = this.getRule(code);

    if (!rule) return ret;

    rule.numbers.forEach(function (n) {
      var suffix = _this.getSuffix(code, n);
      ret.push('' + key + suffix);
    });

    return ret;
  };

  PluralResolver.prototype.getSuffix = function getSuffix(code, count) {
    var _this2 = this;

    var rule = this.getRule(code);

    if (rule) {
      // if (rule.numbers.length === 1) return ''; // only singular

      var idx = rule.noAbs ? rule.plurals(count) : rule.plurals(Math.abs(count));
      var suffix = rule.numbers[idx];

      // special treatment for lngs only having singular and plural
      if (this.options.simplifyPluralSuffix && rule.numbers.length === 2 && rule.numbers[0] === 1) {
        if (suffix === 2) {
          suffix = 'plural';
        } else if (suffix === 1) {
          suffix = '';
        }
      }

      var returnSuffix = function returnSuffix() {
        return _this2.options.prepend && suffix.toString() ? _this2.options.prepend + suffix.toString() : suffix.toString();
      };

      // COMPATIBILITY JSON
      // v1
      if (this.options.compatibilityJSON === 'v1') {
        if (suffix === 1) return '';
        if (typeof suffix === 'number') return '_plural_' + suffix.toString();
        return returnSuffix();
      } else if ( /* v2 */this.options.compatibilityJSON === 'v2' || rule.numbers.length === 2 && rule.numbers[0] === 1) {
        return returnSuffix();
      } else if ( /* v3 - gettext index */rule.numbers.length === 2 && rule.numbers[0] === 1) {
        return returnSuffix();
      }
      return this.options.prepend && idx.toString() ? this.options.prepend + idx.toString() : idx.toString();
    }

    this.logger.warn('no plural rule found for: ' + code);
    return '';
  };

  return PluralResolver;
}();

/* harmony default export */ __webpack_exports__["a"] = (PluralResolver);

/***/ }),

/***/ 16:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__logger_js__ = __webpack_require__(0);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }




var Interpolator = function () {
  function Interpolator() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Interpolator);

    this.logger = __WEBPACK_IMPORTED_MODULE_1__logger_js__["a" /* default */].create('interpolator');

    this.init(options, true);
  }

  /* eslint no-param-reassign: 0 */


  Interpolator.prototype.init = function init() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var reset = arguments[1];

    if (reset) {
      this.options = options;
      this.format = options.interpolation && options.interpolation.format || function (value) {
        return value;
      };
      this.escape = options.interpolation && options.interpolation.escape || __WEBPACK_IMPORTED_MODULE_0__utils_js__["c" /* escape */];
    }
    if (!options.interpolation) options.interpolation = { escapeValue: true };

    var iOpts = options.interpolation;

    this.escapeValue = iOpts.escapeValue !== undefined ? iOpts.escapeValue : true;

    this.prefix = iOpts.prefix ? __WEBPACK_IMPORTED_MODULE_0__utils_js__["g" /* regexEscape */](iOpts.prefix) : iOpts.prefixEscaped || '{{';
    this.suffix = iOpts.suffix ? __WEBPACK_IMPORTED_MODULE_0__utils_js__["g" /* regexEscape */](iOpts.suffix) : iOpts.suffixEscaped || '}}';

    this.formatSeparator = iOpts.formatSeparator ? iOpts.formatSeparator : iOpts.formatSeparator || ',';

    this.unescapePrefix = iOpts.unescapeSuffix ? '' : iOpts.unescapePrefix || '-';
    this.unescapeSuffix = this.unescapePrefix ? '' : iOpts.unescapeSuffix || '';

    this.nestingPrefix = iOpts.nestingPrefix ? __WEBPACK_IMPORTED_MODULE_0__utils_js__["g" /* regexEscape */](iOpts.nestingPrefix) : iOpts.nestingPrefixEscaped || __WEBPACK_IMPORTED_MODULE_0__utils_js__["g" /* regexEscape */]('$t(');
    this.nestingSuffix = iOpts.nestingSuffix ? __WEBPACK_IMPORTED_MODULE_0__utils_js__["g" /* regexEscape */](iOpts.nestingSuffix) : iOpts.nestingSuffixEscaped || __WEBPACK_IMPORTED_MODULE_0__utils_js__["g" /* regexEscape */](')');

    this.maxReplaces = iOpts.maxReplaces ? iOpts.maxReplaces : 1000;

    // the regexp
    this.resetRegExp();
  };

  Interpolator.prototype.reset = function reset() {
    if (this.options) this.init(this.options);
  };

  Interpolator.prototype.resetRegExp = function resetRegExp() {
    // the regexp
    var regexpStr = this.prefix + '(.+?)' + this.suffix;
    this.regexp = new RegExp(regexpStr, 'g');

    var regexpUnescapeStr = '' + this.prefix + this.unescapePrefix + '(.+?)' + this.unescapeSuffix + this.suffix;
    this.regexpUnescape = new RegExp(regexpUnescapeStr, 'g');

    var nestingRegexpStr = this.nestingPrefix + '(.+?)' + this.nestingSuffix;
    this.nestingRegexp = new RegExp(nestingRegexpStr, 'g');
  };

  Interpolator.prototype.interpolate = function interpolate(str, data, lng) {
    var _this = this;

    var match = void 0;
    var value = void 0;
    var replaces = void 0;

    function regexSafe(val) {
      return val.replace(/\$/g, '$$$$');
    }

    var handleFormat = function handleFormat(key) {
      if (key.indexOf(_this.formatSeparator) < 0) return __WEBPACK_IMPORTED_MODULE_0__utils_js__["d" /* getPath */](data, key);

      var p = key.split(_this.formatSeparator);
      var k = p.shift().trim();
      var f = p.join(_this.formatSeparator).trim();

      return _this.format(__WEBPACK_IMPORTED_MODULE_0__utils_js__["d" /* getPath */](data, k), f, lng);
    };

    this.resetRegExp();

    replaces = 0;
    // unescape if has unescapePrefix/Suffix
    /* eslint no-cond-assign: 0 */
    while (match = this.regexpUnescape.exec(str)) {
      value = handleFormat(match[1].trim());
      str = str.replace(match[0], value);
      this.regexpUnescape.lastIndex = 0;
      replaces++;
      if (replaces >= this.maxReplaces) {
        break;
      }
    }

    replaces = 0;
    // regular escape on demand
    while (match = this.regexp.exec(str)) {
      value = handleFormat(match[1].trim());
      if (typeof value !== 'string') value = __WEBPACK_IMPORTED_MODULE_0__utils_js__["e" /* makeString */](value);
      if (!value) {
        if (typeof this.options.missingInterpolationHandler === 'function') {
          var temp = this.options.missingInterpolationHandler(str, match);
          value = typeof temp === 'string' ? temp : '';
        } else {
          this.logger.warn('missed to pass in variable ' + match[1] + ' for interpolating ' + str);
          value = '';
        }
      }
      value = this.escapeValue ? regexSafe(this.escape(value)) : regexSafe(value);
      str = str.replace(match[0], value);
      this.regexp.lastIndex = 0;
      replaces++;
      if (replaces >= this.maxReplaces) {
        break;
      }
    }
    return str;
  };

  Interpolator.prototype.nest = function nest(str, fc) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var match = void 0;
    var value = void 0;

    var clonedOptions = _extends({}, options);
    clonedOptions.applyPostProcessor = false; // avoid post processing on nested lookup

    // if value is something like "myKey": "lorem $(anotherKey, { "count": {{aValueInOptions}} })"
    function handleHasOptions(key, inheritedOptions) {
      if (key.indexOf(',') < 0) return key;

      var p = key.split(',');
      key = p.shift();
      var optionsString = p.join(',');
      optionsString = this.interpolate(optionsString, clonedOptions);
      optionsString = optionsString.replace(/'/g, '"');

      try {
        clonedOptions = JSON.parse(optionsString);

        if (inheritedOptions) clonedOptions = _extends({}, inheritedOptions, clonedOptions);
      } catch (e) {
        this.logger.error('failed parsing options string in nesting for key ' + key, e);
      }

      return key;
    }

    // regular escape on demand
    while (match = this.nestingRegexp.exec(str)) {
      value = fc(handleHasOptions.call(this, match[1].trim(), clonedOptions), clonedOptions);

      // is only the nesting key (key1 = '$(key2)') return the value without stringify
      if (value && match[0] === str && typeof value !== 'string') return value;

      // no string to include or empty
      if (typeof value !== 'string') value = __WEBPACK_IMPORTED_MODULE_0__utils_js__["e" /* makeString */](value);
      if (!value) {
        this.logger.warn('missed to resolve ' + match[1] + ' for nesting ' + str);
        value = '';
      }
      // Nested keys should not be escaped by default #854
      // value = this.escapeValue ? regexSafe(utils.escape(value)) : regexSafe(value);
      str = str.replace(match[0], value);
      this.regexp.lastIndex = 0;
    }
    return str;
  };

  return Interpolator;
}();

/* harmony default export */ __webpack_exports__["a"] = (Interpolator);

/***/ }),

/***/ 169:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

var _i18next = __webpack_require__(4);

var _i18next2 = _interopRequireDefault(_i18next);

var _i18nextXhrBackend = __webpack_require__(5);

var _i18nextXhrBackend2 = _interopRequireDefault(_i18nextXhrBackend);

var _functions = __webpack_require__(6);

var _setting = __webpack_require__(7);

var _pagination = __webpack_require__(23);

var _authmyid = __webpack_require__(31);

var _marker_drag = __webpack_require__(30);

var _company_manager = __webpack_require__(170);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//加载样式文件
//公司站点管理页面

__webpack_require__(27);
__webpack_require__(25);
__webpack_require__(171);

__webpack_require__(26);
window.map;
window.markers = []; //该条路线所有的标记集合
window.company_markers = []; //添加的公司所有站点
window.markerClusterer;
window.infoWindow;

//url解析
var operate_map = __webpack_require__(172); //所有国家，cloud登录地址
//输入框名字
//验证登录的功能

__webpack_require__(173);
(0, _authmyid.login_check)();
(0, _authmyid.login_out)(); //登出按钮操作

var url = window.location.href;
var route_name = decodeURI((0, _functions.parseQueryString)(url).route_name); //路线名
$('.box1 .home span.route_name').text(route_name);
//返回主页的连接诶地址
var home_addr = url.replace('/html/companyStation.html', '/index.html');
$('.box1 .home button.go_back').click(function (e) {
    //返回主页
    e.stopPropagation();
    window.location = home_addr;
});
url = (0, _functions.parseQueryString)(url);
var company_id = Number(url.uid); //公司id
//模态框，是否添加标记,初始化模态框
$('#myModal,#edit_company_stations,#myModal_gohome,#myModal_usedfor').modal({
    show: false
});
//模态框标记名输入框检测
$('#myModal .modal-body input.mark_name').get(0).oninput = function (e) {
    e.stopPropagation();
    (0, _pagination.input_check_fun)($(this), 1000);
};

//使标记命名框可以拖动
$('#marker_name').draggable();
$('#marker_name p.myBg i').click(function (e) {
    e.stopPropagation();
    $('#marker_name').fadeOut(); //隐藏
});
$('#marker_name .my_inp input.mark_name').get(0).oninput = function (e) {
    e.stopPropagation();
    (0, _pagination.input_check_fun)($(this), 1000);
};

function map_reset() {
    //地图重新画
    var place = map.getCenter(); //获取位置
    var zoom = map.getZoom(); //获取位置
    window.map = new google.maps.Map(document.getElementById('google_map'), {
        zoom: zoom,
        center: place,
        streetViewControl: true,
        rotateControl: true,
        scaleControl: true
    });
    //地址搜索控件
    //map.controls[google.maps.ControlPosition.TOP_LEFT].push(window.map_input);
    operate_map.place_autocomplete();
    window.clearMarkers_clusterer(window.markers);
    (0, _marker_drag.draw_line)(); //重新画线
}

window.my_company_stations = new _company_manager.Company_station();
window.my_company_stations.get_company_station().then(function (getData) {
    //添加公司下所有站点数据
    my_company_stations.add_all_stations(getData);
}, function (msg) {
    $('#zhezhao').fadeOut(1);
});

//点击搜索按钮
$('#jingweidu_search i.sosuo').click(function (e) {
    $('#place_search_form').submit(); //表单提交
});

//经纬度搜索表单提交
$('#place_search_form').submit(function (e) {
    e.preventDefault(); //阻止对表单的提交
    var input_val = $('#jingweidu_search input.search_place').val().trim();
    if (!input_val) {
        //非空，为空即返回
        return;
    }

    var err_tip = _i18next2.default.t('search_place'); //错误的提示语翻译
    var $err_tip = $('#jingweidu_search p.err_tip');
    input_val = input_val.split(','); //分成数组
    if (input_val.length != 2) {
        $err_tip.html(err_tip).stop(true).fadeIn(100);
        setTimeout(function () {
            $err_tip.stop(true).fadeOut();
        }, 5000);
        return;
    } else {
        var latitude = input_val[0].trim(); //纬度
        var longitude = input_val[1].trim(); //经度
        if (isNaN(latitude) || latitude == '' || isNaN(longitude) || longitude == '') {
            //只要其中有一个不是数值
            $err_tip.html(err_tip).stop(true).fadeIn(100);
            setTimeout(function () {
                $err_tip.stop(true).fadeOut();
            }, 5000);
            return;
        } else {
            //都是数值类型
            latitude = Number(latitude);
            longitude = Number(longitude);
            //判断值的范围
            if (latitude > 90 || latitude < -90 || longitude > 180 || longitude < -180) {
                $err_tip.html(err_tip).stop(true).fadeIn(100);
                setTimeout(function () {
                    $err_tip.stop(true).fadeOut();
                }, 5000);
                return;
            }

            latitude = parseInt(latitude * 1000000) / 1000000; //只取前六位
            longitude = parseInt(longitude * 1000000) / 1000000; //只取前六位
        }
    }
    //输入符合要求才能执行下面代码
    var latLng = {
        lat: function lat() {
            return latitude;
        },
        lng: function lng() {
            return longitude;
        }
    };
    operate_map.add_company_mark_repeat(company_id, latLng, window.company_markers);
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),

/***/ 17:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__logger_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__EventEmitter_js__ = __webpack_require__(2);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }





function remove(arr, what) {
  var found = arr.indexOf(what);

  while (found !== -1) {
    arr.splice(found, 1);
    found = arr.indexOf(what);
  }
}

var Connector = function (_EventEmitter) {
  _inherits(Connector, _EventEmitter);

  function Connector(backend, store, services) {
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    _classCallCheck(this, Connector);

    var _this = _possibleConstructorReturn(this, _EventEmitter.call(this));

    _this.backend = backend;
    _this.store = store;
    _this.languageUtils = services.languageUtils;
    _this.options = options;
    _this.logger = __WEBPACK_IMPORTED_MODULE_1__logger_js__["a" /* default */].create('backendConnector');

    _this.state = {};
    _this.queue = [];

    if (_this.backend && _this.backend.init) {
      _this.backend.init(services, options.backend, options);
    }
    return _this;
  }

  Connector.prototype.queueLoad = function queueLoad(languages, namespaces, callback) {
    var _this2 = this;

    // find what needs to be loaded
    var toLoad = [];
    var pending = [];
    var toLoadLanguages = [];
    var toLoadNamespaces = [];

    languages.forEach(function (lng) {
      var hasAllNamespaces = true;

      namespaces.forEach(function (ns) {
        var name = lng + '|' + ns;

        if (_this2.store.hasResourceBundle(lng, ns)) {
          _this2.state[name] = 2; // loaded
        } else if (_this2.state[name] < 0) {
          // nothing to do for err
        } else if (_this2.state[name] === 1) {
          if (pending.indexOf(name) < 0) pending.push(name);
        } else {
          _this2.state[name] = 1; // pending

          hasAllNamespaces = false;

          if (pending.indexOf(name) < 0) pending.push(name);
          if (toLoad.indexOf(name) < 0) toLoad.push(name);
          if (toLoadNamespaces.indexOf(ns) < 0) toLoadNamespaces.push(ns);
        }
      });

      if (!hasAllNamespaces) toLoadLanguages.push(lng);
    });

    if (toLoad.length || pending.length) {
      this.queue.push({
        pending: pending,
        loaded: {},
        errors: [],
        callback: callback
      });
    }

    return {
      toLoad: toLoad,
      pending: pending,
      toLoadLanguages: toLoadLanguages,
      toLoadNamespaces: toLoadNamespaces
    };
  };

  Connector.prototype.loaded = function loaded(name, err, data) {
    var _this3 = this;

    var _name$split = name.split('|'),
        _name$split2 = _slicedToArray(_name$split, 2),
        lng = _name$split2[0],
        ns = _name$split2[1];

    if (err) this.emit('failedLoading', lng, ns, err);

    if (data) {
      this.store.addResourceBundle(lng, ns, data);
    }

    // set loaded
    this.state[name] = err ? -1 : 2;

    // callback if ready
    this.queue.forEach(function (q) {
      __WEBPACK_IMPORTED_MODULE_0__utils_js__["f" /* pushPath */](q.loaded, [lng], ns);
      remove(q.pending, name);

      if (err) q.errors.push(err);

      if (q.pending.length === 0 && !q.done) {
        _this3.emit('loaded', q.loaded);
        /* eslint no-param-reassign: 0 */
        q.done = true;
        if (q.errors.length) {
          q.callback(q.errors);
        } else {
          q.callback();
        }
      }
    });

    // remove done load requests
    this.queue = this.queue.filter(function (q) {
      return !q.done;
    });
  };

  Connector.prototype.read = function read(lng, ns, fcName) {
    var tried = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

    var _this4 = this;

    var wait = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 250;
    var callback = arguments[5];

    if (!lng.length) return callback(null, {}); // noting to load

    return this.backend[fcName](lng, ns, function (err, data) {
      if (err && data /* = retryFlag */ && tried < 5) {
        setTimeout(function () {
          _this4.read.call(_this4, lng, ns, fcName, tried + 1, wait * 2, callback);
        }, wait);
        return;
      }
      callback(err, data);
    });
  };

  /* eslint consistent-return: 0 */


  Connector.prototype.load = function load(languages, namespaces, callback) {
    var _this5 = this;

    if (!this.backend) {
      this.logger.warn('No backend was added via i18next.use. Will not load resources.');
      return callback && callback();
    }
    var options = _extends({}, this.backend.options, this.options.backend);

    if (typeof languages === 'string') languages = this.languageUtils.toResolveHierarchy(languages);
    if (typeof namespaces === 'string') namespaces = [namespaces];

    var toLoad = this.queueLoad(languages, namespaces, callback);
    if (!toLoad.toLoad.length) {
      if (!toLoad.pending.length) callback(); // nothing to load and no pendings...callback now
      return null; // pendings will trigger callback
    }

    // load with multi-load
    if (options.allowMultiLoading && this.backend.readMulti) {
      this.read(toLoad.toLoadLanguages, toLoad.toLoadNamespaces, 'readMulti', null, null, function (err, data) {
        if (err) _this5.logger.warn('loading namespaces ' + toLoad.toLoadNamespaces.join(', ') + ' for languages ' + toLoad.toLoadLanguages.join(', ') + ' via multiloading failed', err);
        if (!err && data) _this5.logger.log('successfully loaded namespaces ' + toLoad.toLoadNamespaces.join(', ') + ' for languages ' + toLoad.toLoadLanguages.join(', ') + ' via multiloading', data);

        toLoad.toLoad.forEach(function (name) {
          var _name$split3 = name.split('|'),
              _name$split4 = _slicedToArray(_name$split3, 2),
              l = _name$split4[0],
              n = _name$split4[1];

          var bundle = __WEBPACK_IMPORTED_MODULE_0__utils_js__["d" /* getPath */](data, [l, n]);
          if (bundle) {
            _this5.loaded(name, err, bundle);
          } else {
            var error = 'loading namespace ' + n + ' for language ' + l + ' via multiloading failed';
            _this5.loaded(name, error);
            _this5.logger.error(error);
          }
        });
      });
    } else {
      toLoad.toLoad.forEach(function (name) {
        _this5.loadOne(name);
      });
    }
  };

  Connector.prototype.reload = function reload(languages, namespaces) {
    var _this6 = this;

    if (!this.backend) {
      this.logger.warn('No backend was added via i18next.use. Will not load resources.');
    }
    var options = _extends({}, this.backend.options, this.options.backend);

    if (typeof languages === 'string') languages = this.languageUtils.toResolveHierarchy(languages);
    if (typeof namespaces === 'string') namespaces = [namespaces];

    // load with multi-load
    if (options.allowMultiLoading && this.backend.readMulti) {
      this.read(languages, namespaces, 'readMulti', null, null, function (err, data) {
        if (err) _this6.logger.warn('reloading namespaces ' + namespaces.join(', ') + ' for languages ' + languages.join(', ') + ' via multiloading failed', err);
        if (!err && data) _this6.logger.log('successfully reloaded namespaces ' + namespaces.join(', ') + ' for languages ' + languages.join(', ') + ' via multiloading', data);

        languages.forEach(function (l) {
          namespaces.forEach(function (n) {
            var bundle = __WEBPACK_IMPORTED_MODULE_0__utils_js__["d" /* getPath */](data, [l, n]);
            if (bundle) {
              _this6.loaded(l + '|' + n, err, bundle);
            } else {
              var error = 'reloading namespace ' + n + ' for language ' + l + ' via multiloading failed';
              _this6.loaded(l + '|' + n, error);
              _this6.logger.error(error);
            }
          });
        });
      });
    } else {
      languages.forEach(function (l) {
        namespaces.forEach(function (n) {
          _this6.loadOne(l + '|' + n, 're');
        });
      });
    }
  };

  Connector.prototype.loadOne = function loadOne(name) {
    var _this7 = this;

    var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    var _name$split5 = name.split('|'),
        _name$split6 = _slicedToArray(_name$split5, 2),
        lng = _name$split6[0],
        ns = _name$split6[1];

    this.read(lng, ns, 'read', null, null, function (err, data) {
      if (err) _this7.logger.warn(prefix + 'loading namespace ' + ns + ' for language ' + lng + ' failed', err);
      if (!err && data) _this7.logger.log(prefix + 'loaded namespace ' + ns + ' for language ' + lng, data);

      _this7.loaded(name, err, data);
    });
  };

  Connector.prototype.saveMissing = function saveMissing(languages, namespace, key, fallbackValue, isUpdate) {
    var options = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};

    if (this.backend && this.backend.create) {
      this.backend.create(languages, namespace, key, fallbackValue, null /* unused callback */, _extends({}, options, { isUpdate: isUpdate }));
    }

    // write to store to avoid resending
    if (!languages || !languages[0]) return;
    this.store.addResource(languages[0], namespace, key, fallbackValue);
  };

  return Connector;
}(__WEBPACK_IMPORTED_MODULE_2__EventEmitter_js__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (Connector);

/***/ }),

/***/ 170:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

var _setting = __webpack_require__(7);

var _functions = __webpack_require__(6);

var _i18next = __webpack_require__(4);

var _i18next2 = _interopRequireDefault(_i18next);

var _i18nextXhrBackend = __webpack_require__(5);

var _i18nextXhrBackend2 = _interopRequireDefault(_i18nextXhrBackend);

var _search_place_name = __webpack_require__(32);

var _table_filter = __webpack_require__(46);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//对表格进行过滤

//company_station页面的脚本
//公司站点分页脚本
var url = (0, _functions.parseQueryString)(window.location.href); //搜索城市名

var company_id = Number(url.uid); //公司id

/**构造函数
 * 
 * **/
function Company_station() {
    this.new_marker_stationID; //新增公司站点所在的站点id

    /**获取数据库Company Station数据
     * 
     * city_name 城市名称，主要是用作设置滚动条位置
     * deleteOpera 删除操作，用于删除后提示
     * **/
    this.get_company_station = function (city_name) {
        var deleteOpera = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        var that = this;
        $('#zhezhao').fadeIn(1);
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: '/myroute/get_company_stations_manage',
                type: 'post',
                data: {},
                success: function (res, status) {
                    if (res.msg == 'ok') {
                        $('#company_stations tbody').html(''); //清空表格
                        var getData = res.data;
                        var stations_num = res.dataLen; //公司站点的总数目
                        if (getData.length === 0) {
                            $('#company_stations tfoot').fadeIn(1);
                            reject('error');
                            return;
                        } else {
                            $('#company_stations tfoot').fadeOut(1);
                        }
                        $('#search_station_numbers').text(stations_num);
                        that.createTable(getData, city_name, deleteOpera); //创建表格
                        if (that.new_marker_stationID) {
                            //如果是新增站点
                            //排序
                            that.sort_company_markers(getData);
                        }
                        resolve(getData);
                        //$('#zhezhao').fadeOut(1);不必添加，添加完后后触发点击事件的
                    } else if (res.msg == 'err' || res.msg == 'no') {
                        window.location = _setting.login_url; //跳转
                    }
                }.bind(this),
                error: function error(err) {
                    if (err.status == 500) {
                        alert('server error,please try again later.');
                    }
                }
            });
        });
    };

    //添加公司下所有站点数据,push(window.company_markers)
    this.add_all_stations = function (company_stationsData) {
        for (var i = 0; i < company_stationsData.length; i++) {
            var addr_content = company_stationsData[i].addr_content;
            var latLng = {
                lat: Number(company_stationsData[i].lat),
                lng: Number(company_stationsData[i].lng)
            };
            var marker = new google.maps.Marker({
                //map:map,
                position: latLng,
                addr_content: (0, _functions.htmlspecialchars_decode)(addr_content),
                station_id: company_stationsData[i].station_id,
                origin_station_id: company_stationsData[i].station_id, //初始的station_id
                station_name: company_stationsData[i].stations_name,
                draggable: true
            });
            window.company_markers.push(marker);
            marker_drag_ev(marker); //使标记可拖拽
        };
        //get_well_view();
    };

    //生成表格数据
    /**参数1 为获取的站点数据
     * 参数2 为添加站点时的名称，用于判断滚动高度
     * 参数3 是否为删除后的操作 bool型**/
    this.createTable = function (getData, init_city_name, deleteOpera) {
        $('#zhezhao').fadeIn(1);
        $('#marked_stations').scrollTop(0); //置顶
        $('#company_stations tbody').html(''); //清空
        var scroll_index;
        for (var i = 0; i < getData.length; i++) {
            var latLng = {
                lat: Number(getData[i].lat),
                lng: Number(getData[i].lng)
            };
            var station_id = getData[i].station_id;
            var station_name = getData[i].stations_name;
            var city_name = getData[i].city_name;
            var tr = '<tr class=\'company_station\' station_id=\'' + station_id + '\'>\n                        <td class=\'index\' title="' + (i + 1 > 999 ? i + 1 : '') + '">' + (i + 1 > 999 ? '999+' : i + 1) + '</td>\n                        <td class="station_city" title="' + city_name + '">' + city_name + '</td>\n                        <td class="station_name" title="' + station_name + '">' + station_name + '</td>\n                        <td class="station_addr" title="' + latLng.lat + ',' + latLng.lng + '">' + latLng.lat + '/' + latLng.lng + '</td>\n                        <td class="action">\n                            <i class="icon route_iconfont route_icon-shanchu delete"></i>\n                            <i class="icon route_iconfont route_icon-bianji1 edit"></i>\n                        </td>\n                    </tr>';
            $('#company_stations tbody').append($(tr));
            if (this.new_marker_stationID == station_id) {
                scroll_index = i;
            }
            var tr_length = $('#company_stations tbody tr').length;
            //为其添加已添加过的样式
            for (var j = 0; j < window.markers.length; j++) {
                var _station_id = window.markers[j].origin_station_id;
                if (station_id == _station_id) {
                    $('#company_stations tbody tr').eq(tr_length - 1).addClass('chosen').children('td.action').find('i.delete').fadeOut(1); //添加和删除操作隐藏
                    break;
                }
            }
        }
        if (scroll_index) {
            var td_height = $('#company_stations tbody tr').eq(0).height();
            var scroll_h = td_height * scroll_index;
            $('#marked_stations .data_box').scrollTop(scroll_h);
        }
        var index_xuanzhong = scroll_index ? scroll_index : 0;
        $('#company_stations tbody tr').eq(index_xuanzhong).addClass('chosen').siblings().removeClass('chosen');
        var time0 = setInterval(function () {
            if (window.company_markers[index_xuanzhong]) {
                map.setZoom(17);
                map.setCenter(window.company_markers[index_xuanzhong].getPosition());
                clearInterval(time0);
                //点击该条数据
                $('#company_stations tbody tr.company_station').eq(index_xuanzhong).trigger('click', deleteOpera);
            }
        }, 1000);

        this.station_operation();
        //表格搜索过滤
        (0, _table_filter.filterTable)();
    }.bind(this);

    //当新增公司站点时，需要对company_markers进行排序
    this.sort_company_markers = function (getData) {
        var marker_index;
        var company_markers_len = getData.length; //公司站点个数
        for (var i = 0; i < getData.length; i++) {
            var station_id = getData[i].station_id;
            if (station_id == this.new_marker_stationID) {
                marker_index = i;
                break;
            }
        };
        var marker = window.company_markers.splice(company_markers_len - 1, 1)[0];
        window.company_markers.splice(marker_index, 0, marker);
    };

    //表格里的操作按钮
    this.station_operation = function () {
        var that = this;

        //点击Operation的删除图标按钮
        $('#company_stations tbody tr.company_station td.action i.delete').unbind('click');
        $('#company_stations tbody tr.company_station td.action i.delete').bind('click', function (e) {
            e.stopPropagation();
            var station_id = $(this).parent().parent().attr('station_id'); //station_id
            var _this = $(this);
            var chosen_marker_index = Number($(this).parent().siblings('td.index').text()); //系列号
            $('#company_stations tbody tr.company_station').eq(chosen_marker_index - 1).trigger('click');
            $.ajax({
                url: '/myroute/company_manage_used_for',
                type: 'post',
                data: {
                    station_id: station_id
                },
                success: function success(res) {
                    if (res.msg == 'err') {
                        window.location.reload();
                    } else if (res.msg == 'ok') {
                        var used_data = res.used_data;
                        var dataLen = used_data.length; //数据条数
                        $('#myModal_delete').modal('show'); //模态框显示
                        if (dataLen) {
                            var used_tip = _i18next2.default.t('station_id_used');
                            $('#myModal_delete .modal-body').text(used_tip); //模态框显示
                        } else {
                            $('#myModal_delete .modal-body').text('', true); //模态框显示
                        };
                    }
                },
                error: function error(err) {
                    if (err.status == 500) {
                        alert('server error,please operation later.');
                    }
                }
            });
            //点击模态框的确定按钮
            $('#myModal_delete .modal-footer button.confirm').unbind('click');
            $('#myModal_delete .modal-footer button.confirm').bind('click', function (e) {
                e.stopPropagation();
                $('#myModal_delete').modal('hide');
                var markers_len = window.company_markers.length; //标记的个数
                var station_id = Number(_this.parent().parent().attr('station_id'));
                var now_station_id; //现在的id
                $('#zhezhao').fadeIn(1);
                for (var i = 0; i < markers_len; i++) {
                    //删除公司里的
                    if (station_id == Number(window.company_markers[i].origin_station_id)) {
                        //请求删除公司站点
                        $.ajax({
                            url: '/myroute/company_delete_station',
                            type: 'post',
                            data: { station_id: station_id },
                            async: false,
                            success: function success(res) {
                                $('#zhezhao').fadeOut(1);
                                if (res.msg == 'err' || res.msg == 'no') {
                                    window.location.reload();
                                } else if (res.msg == 'ok') {
                                    //删除成功提示
                                    /* var text_tip = i18next.t('Delete_success');
                                    $('#save_success').fadeIn(1).find('p.save_tip').text(text_tip);
                                    setTimeout(function(){
                                        $('#save_success').fadeOut(1);
                                    },2000); */
                                    window.company_markers[i].setMap(null);
                                    window.company_markers.splice(i, 1); //数组里标记也要移除
                                    //重新生成表格
                                    /* var curPage= Number($('#pageShow span.currPage').text()); //当前页码
                                    var table_num=$('#company_stations tbody tr').length;  //当前表格中的条数
                                    if(table_num == 1){ //如果表格条数只有一条
                                        curPage --;
                                    }
                                    that.get_company_station(that.nums_limit, curPage, true); //重新获取数据 */
                                    that.get_company_station('', true); //重新获取数据
                                }
                            },
                            error: function error(err) {
                                if (err.status == 500) {
                                    alert('server error,please operation later.');
                                }
                            }
                        });
                        break;
                    }
                }
                //从markers中删除 
                var $chosen_stations = $('#chosen_stations ul li.stations_list');
                for (var i = 0; i < window.markers.length; i++) {
                    var li_station_id = Number(window.markers[i].origin_station_id);
                    if (station_id == li_station_id) {
                        window.markers.splice(i, 1);
                        clearMarkers_clusterer(window.markers);
                        //删除已添加的Chosen Station
                        $chosen_stations.eq(i).remove(); //删除左边的
                        break;
                    }
                }
                $('#zhezhao').fadeOut(1);
            });
        });

        //点击Operation的编辑按钮
        $('#company_stations tbody tr.company_station td.action i.edit').unbind('click');
        $('#company_stations tbody tr.company_station td.action i.edit').bind('click', function (e) {
            e.stopPropagation();
            var $this = $(this);
            var station_id = $(this).parent().parent().attr('station_id'); //station_id
            var lat_lng = $(this).parent().siblings('td.station_addr').attr('title'); //经纬度
            var station_name = $(this).parent().siblings('td.station_name').text(); //站点名
            var chosen_marker_index = Number($(this).parent().siblings('td.index').text()); //系列号
            $('#company_stations tbody tr.company_station').eq(chosen_marker_index - 1).trigger('click');
            $('#edit_company_stations').modal('show') //站点编辑框显示
            .find('.modal-body input.station_name').val(station_name).siblings('input.lat_lng').val(lat_lng);
            //公司的marker序号
            var company_index = Number($this.parent().siblings('td.index').text()) - 1;
            var marker_position = window.company_markers[company_index].getPosition();
            //将地图中心移到此处
            window.map.setCenter(marker_position);
            //模态框点击确定按钮
            $('#edit_company_stations .modal-footer button.confirm').unbind('click');
            $('#edit_company_stations .modal-footer button.confirm').bind('click', function (e) {
                e.stopPropagation();
                var $input_latlng = $('#edit_company_stations .modal-body input.lat_lng'); //输入经纬度
                var $input_name = $('#edit_company_stations .modal-body input.station_name'); //输入站点名称框
                var new_station_name = $input_name.val().trim();
                var new_latlng = $input_latlng.val().trim();
                if (!new_station_name) {
                    //如果为空
                    $input_name.focus();
                    return;
                }
                if (!new_latlng) {
                    //如果为空
                    $input_latlng.focus();
                    return;
                }
                //返回 输入框的经纬度
                var ret_latlng = cheek_input_latlng($('#edit_company_stations .modal-body'));
                if (ret_latlng) {
                    if (new_latlng != lat_lng || new_station_name != station_name) {
                        var ret_data = (0, _functions.cal_station_id)(company_id, ret_latlng, window.company_markers, station_id);
                        if (!ret_data) {
                            //如果返回false
                            var p_tip = '<p class="add_mark_tip">There is a marker that is too small distance for this marker.</p>';
                            $('#edit_company_stations .modal-body').append($(p_tip)).find('p.add_mark_tip').fadeIn(1, function () {
                                setTimeout(function () {
                                    $('#edit_company_stations .modal-body p.add_mark_tip').remove();
                                }, 2000);
                            });
                            return;
                        }
                        $('#zhezhao').fadeIn(1);
                        //更改数据
                        $.ajax({
                            url: '/myroute/company_change_station_info',
                            type: 'post',
                            data: {
                                origin_station_id: station_id,
                                station_id: ret_data.station_id,
                                latLng: ret_data.latLng,
                                station_name: (0, _functions.htmlspecialchars)(new_station_name)
                            },
                            success: function success(res) {
                                $('#zhezhao').fadeOut(1);
                                if (res.msg == 'err') {
                                    window.location.reload();
                                } else if (res.msg == 'has') {
                                    //站点名存在提示信息
                                    var modify_tip = _i18next2.default.t('Station_name_exists');
                                    var $err_tip = $('#edit_company_stations .modal-body p.err_tip');
                                    $err_tip.text(modify_tip).stop(true).fadeIn(100);
                                    setTimeout(function () {
                                        $err_tip.stop(true).slideUp();
                                    }, 2000);
                                } else if (res.msg == 'ok') {
                                    //修该成功提示信息
                                    var modify_tip = _i18next2.default.t('Modify_success');
                                    var $err_tip = $('#edit_company_stations .modal-body p.err_tip');
                                    $err_tip.html(modify_tip).stop(true).fadeIn(100);
                                    setTimeout(function () {
                                        $err_tip.stop(true).fadeOut();
                                        $('#edit_company_stations').modal('hide');
                                    }, 2000);

                                    //更新所有更改过的名称和position地址
                                    //Company station更新
                                    $this.parent().siblings('td.station_name').text(new_station_name).attr('title', new_station_name).siblings('td.station_addr').text(ret_data.latLng.lat + '\/' + ret_data.latLng.lng).attr('title', ret_data.latLng.lat + ',' + ret_data.latLng.lng).parent().attr('station_id', ret_data.station_id);
                                    //修改其坐标和站点名
                                    var this_marker = window.company_markers[company_index];
                                    this_marker.station_id = ret_data.station_id;
                                    this_marker.origin_station_id = ret_data.station_id;
                                    this_marker.station_name = new_station_name;
                                    var new_position = {
                                        lat: ret_data.latLng.lat,
                                        lng: ret_data.latLng.lng
                                    };
                                    this_marker.posiotion = new_position;

                                    //更改Chosen station
                                    var isChosen = $this.parent().parent().hasClass('chosen'); //是否添加进路线
                                    if (!isChosen) {
                                        //没有选中则返回
                                        return;
                                    }
                                    var $chosen_stations = $('#chosen_stations ul li.stations_list');
                                    var this_chosenMarker = window.company_markers[chosen_marker_index - 1];
                                    this_chosenMarker.station_id = ret_data.station_id;
                                    this_chosenMarker.origin_station_id = ret_data.station_id;
                                    this_chosenMarker.station_name = new_station_name;
                                    this_chosenMarker.setPosition(new_position);
                                    window.map.setCenter(new_position);
                                }
                            },
                            error: function error(err) {
                                if (err.status == 500) {
                                    alert('server error,please operation later.');
                                }
                            }
                        });
                    } else {
                        $('#edit_company_stations').modal('hide'); //隐藏模态框
                    }
                } else {
                    var err_tip = _i18next2.default.t('search_place'); //错误的提示语翻译
                    var $err_tip = $('#edit_company_stations .modal-body p.err_tip');
                    $err_tip.html(err_tip).stop(true).fadeIn(100);
                    setTimeout(function () {
                        $err_tip.stop(true).fadeOut();
                    }, 5000);
                }
            });
        });

        //点击查看使用情况按钮
        /* $('#company_stations tbody tr.company_station td.use_situation i.detail').unbind('click');
        $('#company_stations tbody tr.company_station td.use_situation i.detail').bind('click',function(e){
            e.stopPropagation();
            var $this = $(this);
            var station_id = $(this).parent().parent().attr('station_id'); //station_id
            $('#myModal_usedfor').modal('show');
            $('#zhezhao').fadeIn(1);
            $.ajax({
                url:'/myroute/company_manage_used_for',
                type:'post',
                data:{
                    station_id: station_id,
                },
                success:function(res){
                    $('#zhezhao').fadeOut(1);
                    if(res.msg=='err'){
                        window.location.reload();
                    }else if(res.msg=='ok'){
                        var used_data = res.used_data;
                        var dataLen = used_data.length; //数据条数
                        $('#myModal_usedfor .modal-body .nums span.numbers').text(dataLen);
                        if(dataLen){
                            $('#stations_used_table tfoot').fadeOut(1);
                        }else{
                            $('#stations_used_table tfoot').fadeIn(1);
                        };
                        //显示数据
                        $('#stations_used_table tbody').html('');//清空
                        for(var i=0; i<dataLen; i++){
                            var tr = `<tr>
                                        <td>${i+1}</td>
                                        <td>${used_data[i].filename}</td>
                                    </tr>
                                    `;
                            $('#stations_used_table tbody').append($(tr));
                        }
                    }
                },
                error:(err)=>{
                    if(err.status==500){
                        alert('server error,please operation later.');
                    }  
                }
            });
        }); */

        //点击该站点这一列,使之位于地图中心点
        $('#company_stations tbody tr.company_station').unbind('click');
        //deleteOpera是否是删除操作后自动触发的
        $('#company_stations tbody tr.company_station').bind('click', function (e, deleteOpera) {
            e.stopPropagation();
            $(this).addClass('chosen').siblings().removeClass('chosen');
            window.map.setZoom(17);
            var station_id = $(this).attr('station_id');
            for (var i = 0; i < window.company_markers.length; i++) {
                var _station_id = window.company_markers[i].station_id;
                if (station_id == _station_id) {
                    var position = window.company_markers[i].getPosition();
                    window.map.setCenter(position);
                    window.company_markers[i].setMap(window.map);
                    //break;
                } else {
                    window.company_markers[i].setMap(null);
                }
            }
            //获取该站点被路线使用的情况
            $('#company_used_stations tbody').html(''); //清空
            if (!($('#zhezhao').css('display') == 'block')) {
                //如果是隐藏的
                $('#zhezhao').fadeIn(1);
            }
            $.ajax({
                url: '/myroute/company_manage_used_for',
                type: 'post',
                data: {
                    station_id: station_id
                },
                success: function success(res) {
                    $('#zhezhao').fadeOut(1);
                    if (res.msg == 'err') {
                        window.location.reload();
                    } else if (res.msg == 'ok') {
                        var used_data = res.used_data;
                        var dataLen = used_data.length; //数据条数
                        $('#search_route_numbers').text(dataLen);
                        if (dataLen) {
                            $('#company_used_stations tfoot').fadeOut(1);
                        } else {
                            $('#company_used_stations tfoot').fadeIn(1);
                        };
                        //显示数据
                        $('#stations_used_table tbody').html(''); //清空
                        var url = window.location.href.replace('companyStation.html', 'routeMaker.html');
                        for (var i = 0; i < dataLen; i++) {
                            var jump_url = url + '&xml_id=' + used_data[i].ctime + '&route_name=' + used_data[i].filename;
                            var tr = '<tr>\n                                        <td title=\'' + (i + 1) + '\'>' + (i + 1 > 99 ? '99+' : i + 1) + '</td>\n                                        <td class=\'route_name\' title=\'' + used_data[i].filename + '\'>' + used_data[i].filename + '</td>\n                                        <td class=\'edit\'><a href=\'' + jump_url + '\'>\n                                            <i class="icon route_iconfont route_icon-bianji edit"></i>\n                                        </a></td>\n                                    </tr>\n                                    ';
                            $('#company_used_stations tbody').append($(tr));
                        }
                        //生成表格之后可以搜索filter
                        (0, _table_filter.Used_stations_filter)();
                        //console.log('删除',deleteOpera)
                        if (deleteOpera) {
                            //删除成功提示
                            var text_tip = _i18next2.default.t('Delete_success');
                            $('#save_success').fadeIn(1).find('p.save_tip').text(text_tip);
                            setTimeout(function () {
                                $('#save_success').fadeOut(1);
                            }, 2000);
                        }
                    }
                },
                error: function error(err) {
                    if (err.status == 500) {
                        alert('server error,please operation later.');
                    }
                }
            });
        });
    };

    //向后台请求新增公司站点
    this.add_station_req = function (marker, station_name, addr_content, ret_data, city_name) {
        $('#zhezhao').fadeIn(1);
        var that = this;
        $.ajax({
            url: '/myroute/company_add_station',
            type: 'post',
            data: {
                ctime: new Date().getTime(),
                station_id: ret_data.station_id,
                stations_name: (0, _functions.htmlspecialchars)(station_name),
                addr_content: (0, _functions.htmlspecialchars)(addr_content),
                latLng: ret_data.latLng,
                city_name: (0, _functions.htmlspecialchars)(city_name)
            },
            success: function success(res) {
                //$('#zhezhao').fadeOut(1);
                if (res.msg == 'err') {
                    window.location.reload();
                } else if (res.msg == 'has') {
                    //站点名存在提示信息
                    $('#zhezhao').fadeOut(1);
                    var modify_tip = _i18next2.default.t('Station_name_exists');
                    var $err_tip = $('#marker_name .my_inp p.err_tip,#myModal .modal-body p.err_tip');
                    $err_tip.text(modify_tip).stop(true).fadeIn(100);
                    setTimeout(function () {
                        $err_tip.stop(true).slideUp();
                    }, 2000);
                } else if (res.msg == 'ok') {
                    $('#place_input').val(''); //清空地名输入框
                    $('#jingweidu_search input.search_place').val(''); //清空经纬度输入框
                    $('#myModal').fadeOut(1).modal('hide');
                    $('#marker_name').fadeOut(1).find('input.mark_name').val(''); //标记命名隐藏
                    company_markers.push(marker);
                    //marker.setMap(map);
                    marker_drag_ev(marker); //使标记可拖拽
                    //重新生成表格
                    that.get_company_station(city_name); //重新生成表格
                    that.new_marker_stationID = ret_data.station_id;
                }
            },
            error: function error(err) {
                if (err.status == 500) {
                    alert('server error,please operation later.');
                }
            }
        });
    };
}

//使标记在合理的可是区域内
var bounds = new google.maps.LatLngBounds(); //缩放对象
function get_well_view() {
    for (var i = 0; i < window.company_markers.length; i++) {
        bounds.extend(window.company_markers[i].getPosition());
    }
    window.map.fitBounds(bounds);
    window.clearMarkers_clusterer(window.company_markers); //标记聚合
}

//对输入的经纬数据进行检测
function cheek_input_latlng(element) {
    var input_val = element.find('input.lat_lng').val().trim();
    var err_tip = _i18next2.default.t('search_place'); //错误的提示语翻译
    var $err_tip = element.find('p.err_tip');
    input_val = input_val.split(','); //分成数组
    if (input_val.length != 2) {
        return false;
    } else {
        var latitude = input_val[0].trim(); //纬度
        var longitude = input_val[1].trim(); //经度
        if (isNaN(latitude) || latitude == '' || isNaN(longitude) || longitude == '') {
            //只要其中有一个不是数值
            return false;
        } else {
            //都是数值类型
            latitude = Number(latitude);
            longitude = Number(longitude);
            //判断值的范围
            if (latitude > 90 || latitude < -90 || longitude > 180 || longitude < -180) {
                return false;
            }

            latitude = parseInt(latitude * 1000000) / 1000000; //只取前六位
            longitude = parseInt(longitude * 1000000) / 1000000; //只取前六位
        }
    }
    //输入符合要求才能执行下面代码
    var latLng = {
        lat: function lat() {
            return latitude;
        },
        lng: function lng() {
            return longitude;
        }
    };
    return latLng;
}

function marker_drag_ev(marker) {
    var init_latLng; //拖拽之前初始的经纬度
    var compang_station_index; //表示在拖动的是第几个
    marker.addListener('dragstart', function (e) {
        init_latLng = e.latLng; //将最开始的经纬度位置赋值
        var station_id = this.origin_station_id;
        for (var i = 0; i < window.company_markers.length; i++) {
            var _origin_station_id = window.company_markers[i].origin_station_id;
            if (station_id == _origin_station_id) {
                compang_station_index = i;
                break;
            }
        };
        //滚动条高度
        var td_height = $('#company_stations tbody tr').eq(0).height();
        var scroll_h = td_height * compang_station_index;
        $('#marked_stations').scrollTop(scroll_h);
        //添加正在拖拽的背景颜色样式
        $('#company_stations tbody tr').eq(compang_station_index).addClass('draggable');
    });

    marker.addListener('dragend', function (e) {
        //清除正在拖拽的背景颜色样式
        $('#company_stations tbody tr').eq(compang_station_index).removeClass('draggable');
        var station_id = this.station_id; //站点id
        //console.log('初始',station_id)
        var ret_data = (0, _functions.cal_station_id)(company_id, e.latLng, window.company_markers, station_id);
        if (!ret_data) {
            //如果返回false
            var p_tip = '<p class="add_mark_tip">There is a tag that is too small for this tag.</p>';
            $('#place_input').after($(p_tip)).siblings('p.add_mark_tip').animate({ top: 15 }, 1000, function () {
                setTimeout(function () {
                    $('#google_map_box p.add_mark_tip').remove();
                }, 2000);
            });
            this.setPosition(init_latLng); //重新回到之前的位置
        } else {
            //可以放下
            this.setPosition(ret_data.latLng);
            this.station_id = ret_data.station_id;
            //console.log('落下',ret_data.latLng)
            //更新Company station
            for (var i = 0; i < window.company_markers.length; i++) {
                var _station_id = window.company_markers[i].station_id;
                if (station_id == _station_id) {
                    window.company_markers[i].station_id = ret_data.station_id;
                    window.company_markers[i].setPosition(ret_data.latLng);
                    break;
                }
            }
            //修改公司站点的station_id、经纬度
            $.ajax({
                url: '/myroute/company_manage_drag_station',
                type: 'post',
                data: {
                    origin_station_id: station_id,
                    station_id: ret_data.station_id,
                    latLng: ret_data.latLng
                },
                success: function success(res) {
                    if (res.msg === 'err') {
                        window.location.reload();
                    } else if (res.msg === 'no') {
                        window.location = _setting.login_url;
                    } else if (res.msg == 'ok') {
                        var $table_tr = $('#company_stations tbody tr');
                        for (var i = 0; i < $table_tr.length; i++) {
                            var _station_id2 = $table_tr.eq(i).attr('station_id');
                            if (station_id == _station_id2) {
                                $table_tr.eq(i).attr('station_id', ret_data.station_id);
                                $table_tr.eq(i).find('td.station_addr').text(ret_data.latLng.lat + '\/' + ret_data.latLng.lng).attr('title', ret_data.latLng.lat + ',' + ret_data.latLng.lng);
                                break;
                            }
                        }
                        for (var i = 0; i < window.company_markers.length; i++) {
                            var _station_id3 = window.company_markers[i].station_id;
                            if (ret_data.station_id == _station_id3) {
                                window.company_markers[i].origin_station_id = ret_data.station_id;
                                break;
                            }
                        }
                    }
                }
            });
        }
    });
}

module.exports = {
    Company_station: Company_station
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),

/***/ 171:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 172:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

var _i18next = __webpack_require__(4);

var _i18next2 = _interopRequireDefault(_i18next);

var _i18nextXhrBackend = __webpack_require__(5);

var _i18nextXhrBackend2 = _interopRequireDefault(_i18nextXhrBackend);

var _pagination = __webpack_require__(23);

var _functions = __webpack_require__(6);

var _ContextMenu = __webpack_require__(33);

var _marker_drag = __webpack_require__(30);

var _search_place_name = __webpack_require__(32);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//companyStation页面的
var pinyin = __webpack_require__(47); //将汉字转为拼音
//输入框名字
//得到站点id和经纬度


var company_id = Number((0, _functions.parseQueryString)(window.location.href).uid); //公司id

var uluru = { lat: 30.936986, lng: 113.914559 }; //湖北工程学院地理位置

window.map = new google.maps.Map(document.getElementById('google_map'), {
    zoom: 6,
    center: uluru,
    streetViewControl: true,
    rotateControl: true,
    scaleControl: true
});
if (navigator.geolocation) {
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };
    navigator.geolocation.getCurrentPosition(function (position) {
        // var place =map.getCenter();  //获取位置  http协议下无效
        var lat = parseInt(position.coords.latitude * 1000000) / 1000000;
        var lng = parseInt(position.coords.longitude * 1000000) / 1000000;
        // var lat =place.lat()+2;
        // var lng =place.lng()+3;
        uluru.lat = lat;
        uluru.lng = lng;

        window.map.setCenter(uluru);
        new google.maps.Marker({
            map: map,
            position: uluru
        });
    }, function (err) {
        console.log(err);
    }, options);
}

//新的构造器对象
//var map_context_menu=new ContextMenu(map);

//标记聚类
window.markerClusterer = new MarkerClusterer(map, markers, {
    imagePath: '/myroute/libs/images/m'
});

window.infoWindow = new google.maps.InfoWindow(); //窗口提示

//地址搜索控件
window.map_input = /** @type {!HTMLInputElement} */document.getElementById('place_input');
//map.controls[google.maps.ControlPosition.TOP_LEFT].push(map_input);
//地址自动完成功能
window.search_tmp_marker; //搜索时的临时点，点击确定或者重新搜索会被替换掉
//根据地名搜索经纬度
$('#latlng_search').submit(function (e) {
    e.preventDefault(); //阻止对表单的提交
    var place_name = $('#latlng_search .latlng_search input.input_addr').val().trim();
    (0, _search_place_name.search_latlng)(place_name).then(function (latLng) {
        var lat_lng = {
            lat: function lat() {
                return latLng.lat.toFixed(6);
            },
            lng: function lng() {
                return latLng.lng.toFixed(6);
            }
        };
        map.setCenter(latLng);
        map.setZoom(20); // Why 17? Because it looks good.当20时可以放大到10米的比例尺
        $('#myModal').modal('show');
        $('#myModal .modal-body input.mark_name').val(''); //清空名称
        //点击模态框的No
        $('#myModal button.cancel').unbind('click');
        $('#myModal button.cancel').bind('click', function (e) {
            e.stopPropagation();
            $('#myModal').modal('hide');
        });
        //点击模态框的Yes
        place_name = pinyin(place_name, {
            style: pinyin.STYLE_NORMAL
        }).join('');
        $('#myModal .modal-body input.mark_name').val(place_name);
        $('#myModal button.confirm').unbind('click');
        $('#myModal button.confirm').bind('click', function (e) {
            e.stopPropagation();
            var check_input_filename = (0, _pagination.input_check_fun)($('#myModal .modal-body input.mark_name'), 1000);
            if (!check_input_filename) {
                //不满足输入条件
                return;
            }
            var input_val = $('#myModal input.mark_name').val().trim();
            $('#myModal').modal('hide');
            var addr_content = '<div><strong>' + input_val + '</strong><br>' + input_val + '</div>';
            //新标记
            var ret_data = (0, _functions.cal_station_id)(company_id, lat_lng, company_markers);
            //console.log(ret_data)
            if (!ret_data) {
                //如果返回false
                var tip_err = _i18next2.default.t('Mark_near');
                $('#myModal .modal-body p.err_tip').text(tip_err).fadeIn(1);
                setTimeout(function () {
                    $('#myModal .modal-body p.err_tip').text('').fadeOut(1);
                }, 2000);
                return;
            }

            //删除之前的临时标记
            if (window.search_tmp_marker) {
                search_tmp_marker.setMap(null);
            }

            //表示下面开始添加标记
            var station_id = ret_data.station_id; //站点id
            var marker = new google.maps.Marker({
                //map: map,
                addr_content: addr_content,
                station_id: ret_data.station_id,
                origin_station_id: ret_data.station_id, //初始的station_id
                station_name: input_val,
                draggable: true
            });
            marker.setPosition(ret_data.latLng);
            (0, _search_place_name.search_place)(ret_data.latLng).then(function (city_name) {
                //公司新增站点请求
                window.my_company_stations.add_station_req(marker, input_val, addr_content, ret_data, city_name);
            });
        });
    }, function (msg) {
        if (msg == 'err') {
            alert("google api service error,plese try again,or this place can't be found.");
        }
    });
});

//刷新聚类标记
window.clearMarkers_clusterer = function (this_markers) {
    //清除所有的标记
    if (markerClusterer) {
        //相当于刷新了标记聚类
        markerClusterer.clearMarkers();
        markerClusterer = new MarkerClusterer(map, this_markers, {
            imagePath: '/myroute/libs/images/m'
            //maxZoom:20,  #最大放大
            //gridSize: size, 
        });
    }
};

//在地图上鼠标右键菜单出现
var marker_station_id; //标记序列号;  //删除标记的序列号
map.addListener('click', function (e) {
    $('#map_menu').fadeOut(1);
});

map.addListener('rightclick', function (e) {
    marker_station_id = -1;
    var latLng = e.latLng; //地理经纬度
    $('#map_menu ul.menu_lists li.add').fadeIn(1);
    $('#map_menu ul.menu_lists li.delete').fadeOut(1);
    map_menu_position(e); //菜单显示
    menu_click(latLng);
});

//添加标记复用代码
function add_company_mark_repeat(company_id, latLng, company_markers) {
    var ret_data = (0, _functions.cal_station_id)(company_id, latLng, company_markers);
    if (!ret_data) {
        //如果返回false
        var tip_err = _i18next2.default.t('Mark_near');
        $('#myModal .modal-body p.err_tip').text(tip_err).fadeIn(1);
        setTimeout(function () {
            $('#myModal .modal-body p.err_tip').text('').fadeOut(1);
        }, 2000);
        return;
    };
    //获取该经纬度所在地点名称
    (0, _search_place_name.search_place)(ret_data.latLng).then(function (city_name) {
        $('#marker_name').fadeIn() //标记命名显示
        .find('.my_inp input.mark_name').val(city_name);
    });
    //点击命名确定
    $('#marker_name .my_btn button.confirm').unbind('click');
    $('#marker_name .my_btn button.confirm').bind('click', function (e) {
        e.stopPropagation();
        var check_input_filename = (0, _pagination.input_check_fun)($('#marker_name .my_inp input.mark_name'), 1000);
        if (!check_input_filename) {
            //不满足输入条件
            return;
        }
        //满足条件增加标记
        var input_val = $('#marker_name .my_inp input.mark_name').val().trim();
        var addr_content = '<div><strong>' + input_val + '</strong><br></div>';
        var marker = new google.maps.Marker({
            //map:map,
            position: ret_data.latLng,
            addr_content: addr_content,
            station_id: ret_data.station_id,
            origin_station_id: ret_data.station_id, //初始的station_id
            station_name: input_val,
            draggable: true
        });
        map.setCenter(ret_data.latLng);
        (0, _search_place_name.search_place)(ret_data.latLng).then(function (city_name) {
            //公司新增站点请求
            window.my_company_stations.add_station_req(marker, input_val, addr_content, ret_data, city_name);
        });
    });
}
//地图菜单选项点击事件
function menu_click(latLng) {
    //点击菜单选项，添加标记
    $('#map_menu ul li.add').unbind('click');
    $('#map_menu ul li.add').bind('click', function (e) {
        e.stopPropagation();
        $('#map_menu').fadeOut(1);
        //添加标记
        add_company_mark_repeat(company_id, latLng, window.company_markers);
    });
    //删除标记
    $('#map_menu ul li.delete').unbind('click');
    $('#map_menu ul li.delete').bind('click', function (e) {
        e.stopPropagation();
        $('#map_menu').fadeOut(1);
        if (marker_station_id == -1) return;
        $('#myModal_delete').modal('show'); //删除模态框出现
        //点击模态框的确定按钮
        $('#myModal_delete .modal-footer button.confirm').unbind('click');
        $('#myModal_delete .modal-footer button.confirm').bind('click', function (e) {
            e.stopPropagation();
            $('#zhezhao').fadeIn(1);
            $('#myModal_delete').modal('hide'); //删除模态框隐藏
            var route_id = (0, _functions.parseQueryString)(window.location.href).xml_id;

            for (var i = 0; i < markers.length; i++) {
                if (marker_station_id == markers[i].origin_station_id) {
                    var station_id = markers[i].station_id; //站点id
                    $.ajax({
                        url: '/myroute/route_delete_station',
                        type: 'post',
                        async: false,
                        data: {
                            route_id: route_id, station_id: marker_station_id
                        },
                        success: function success(res) {
                            $('#zhezhao').fadeOut(1);
                            if (res.msg == 'err' || res.msg == 'no') {
                                //没有这个xml_id或者无session
                                window.location = login_url;
                            } else if (res.msg == 'ok') {
                                google.maps.event.clearInstanceListeners(markers[i]); //清除该实例的所有监听事件
                                //移除该标记
                                markers[i].setMap(null);
                                markers.splice(i, 1);
                                //刷新聚类标记
                                clearMarkers_clusterer(window.markers);
                                //... 左边栏的对应公司站点已选择样式也要删除
                                var $table_body = $('#company_stations tbody tr.company_station');
                                for (var j = 0; j < $table_body.length; j++) {
                                    var li_station_id = Number($table_body.eq(j).attr('station_id'));
                                    if (marker_station_id == li_station_id) {
                                        $table_body.eq(j).removeClass('chosen'); //增加添加过的样式
                                        $table_body.eq(j).find('td.action i').fadeIn(1); //增加添加过的样式
                                        break;
                                    }
                                }
                                //... 左边栏的对应所选站点也要删除
                                var $choose_stations = $('#chosen_stations ul li.stations_list');
                                for (var j = 0; j < $choose_stations.length; j++) {
                                    var li_station_id = Number($choose_stations.eq(j).attr('station_id'));
                                    if (li_station_id == station_id) {
                                        $choose_stations.eq(j).remove();
                                        break;
                                    }
                                }
                            }
                        },
                        error: function error(err) {
                            if (err.status == 500) {
                                alert('server error,please operation later.');
                                window.location.reload();
                            }
                        }
                    });
                    break;
                }
            }
        });
    });
}

//地图菜单选项出现的位置
var map_menu_position = function map_menu_position(e) {
    //菜单位置显示
    var top = e.pixel.y; //顶部距离
    var left = e.pixel.x; //左边距离

    var map_width = $('#google_map').width(); //地图宽度
    var map_height = $('#google_map').height();
    var menu_width = $('#map_menu').width(); //菜单宽度
    var menu_height = $('#map_menu').height();

    if (top > map_height - menu_height) {
        top = map_height - menu_height;
    }
    if (left > map_width - menu_width) {
        left = map_width - menu_width;
    }
    $('#map_menu').css({ top: top, left: left }).fadeIn(1);
    //添加标记
};

//标记的点击和右击事件
window.marker_click = function (marker) {
    var map_width = $('#google_map').width(); //地图宽度
    var menu_width = $('#map_menu').width(); //菜单宽度

    /* marker.addListener('click',function(e){
        var addr_cont=this.addr_content; //地址
        infoWindow.setContent(addr_cont);
        infoWindow.open(map, marker);
    }); */
    marker.addListener('mouseover', function (e) {
        var addr_cont = this.addr_content; //地址
        infoWindow.setContent(addr_cont);
        infoWindow.open(map, marker);
    });
    marker.addListener('rightclick', function (e) {
        //var position=map_context_menu.getProjection().fromLatLngToDivPixel(e.latLng);
        var position = (0, _ContextMenu.fromLatLngToPixel)(e.latLng, map);
        e.pixel = {};
        e.pixel.x = Math.round(position.x);
        e.pixel.y = Math.round(position.y);
        map_menu_position(e); //菜单出现的位置
        $('#map_menu ul.menu_lists li.add').fadeOut(1);
        $('#map_menu ul.menu_lists li.delete').fadeIn(1);
        marker_station_id = this.origin_station_id;
        var latLng = e.latLng;
        menu_click(latLng);
    });
    //刷新聚类标记
    clearMarkers_clusterer(window.markers);
};

module.exports = {
    add_company_mark_repeat: add_company_mark_repeat
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),

/***/ 173:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
//company语言操作事件
/* import {countries} from '../configs/setting';  //所有国家，cloud登录地址

$('#route_info,#merge_route_info').modal({
    show:false,
    backdrop:false  //元素用于提供一个可点击的区域，点击此区域就即可关闭模态框。
});

//点击Language按钮使语言选择框显示
$('#choose_language p.button_choose button.language').click(function(e){
    e.stopPropagation();
    $('#language_lists_box').fadeIn();
});
//语言选择框可以拖动
$('#language_lists_box').draggable({
    "containment":'.outerbox1'
});
//点击语言选择的叉叉
$('#language_lists_box p.title_info i').click(function(e){
    e.stopPropagation();
    $('#language_lists_box').fadeOut(); //隐藏
});
//语言列表
for(var key in countries){
    var $li='<li class="language">'
            + '<span class="this_country">'+key+'</span>'
            + '<i class="icon route_iconfont route_icon-you"></i>'
            + '<ul class="country">';
    for(var key1 in countries[key]){
        $li +='<li class="country_text" callname="'+countries[key][key1]+'"><span>'
                +key1+'</span><i class="icon route_iconfont"></i></li>';
    }
    $li += '</ul></li>';
    $('#language_lists_box ul.choose_my_language').append($li); //一次性选择多国语言
}

//点击列表语言
$('#language_lists_box ul.choose_my_language li.language ul li.country_text').click(function(e){
    e.stopPropagation();
    var jianchen=$(this).attr('callname');  //语言代码简称
    if(jianchen =='en.US')  //这个点击无效
        return;
    var $chosen_i=$(this).find('i.icon');
    var xml_id=$('#route_info').attr('xml_id');
    var $stations_tb=$('#language_table tbody tr');
    var stations=[];
    for(var i=1; i<$stations_tb.length; i++){
        var station_id=$stations_tb.eq(i).attr('id');
        stations.push(station_id);
    }
    if(!$chosen_i.hasClass('route_icon-xuanzhong')){  //添加语言
        $chosen_i.addClass('route_icon-xuanzhong'); //添加选中样式
        var language_len=$('#choose_language .language_box ul.chosen li.language').length;
        $.ajax({
            url : '/myroute/add/language',
            type:'post',
            data:{
                xml_id,
                jianchen,
                stations,
                xml_id,
                language_num:language_len+1 //语言数目
            },
            success:function(res){
                if(res.msg=='ok'){
                    var route_lang_id=res.route_lang_id; //该路线的对应语言id
                    var stations_data=res.stations_data;  //站点的ID和station_id数组
                    console.log(stations_data)
                    var li=`<li class="language">
                                <span>${jianchen}</span>
                                <i class="icon route_iconfont route_icon-shanchu"></i>
                            </li>`;
                    var $language_ul=$('#choose_language .language_box ul.chosen');
                    $language_ul.find('.clear').before($(li));
                    delete_language();  //使点击删除图标有效
                    //表格中头部语言添加一列
                    $('#language_table thead tr').append($(`<th route_lang_id=${route_lang_id}>${jianchen}</th>`));
                    var cols_len= $('#language_table thead tr th').length;
                    var $table_row=$('#language_table tbody tr'); //表格的行数
                    for(var i=0; i<$table_row.length; i++){
                        var th;  //列内容
                        if(i==0){
                            th=`<th>
                                    <input type="text" class="form-control" value=''>
                                </th>`;
                        }else{
                            var head_id=$table_row.eq(i).attr('id');
                            var station_lang_id;
                            var sta_transition='';
                            for(var j=0; j<stations_data.length; j++){
                                let ret_station_id=stations_data[j].station_id;
                                let ID=stations_data[j].ID;
                                let transition=stations_data[j].transition;
                                if(ret_station_id === head_id){
                                    station_lang_id = ID;
                                    sta_transition = transition;
                                    break;
                                }
                            }
                            th=`<th station_lang_id='${station_lang_id}'>
                                    <input type="text" class="form-control" value=${sta_transition}>
                                </th>`;
                        }
                        $('#language_table tbody tr').eq(i).append($(th));
                    }
                    //改变语言的数目
                    language_len=$('#choose_language .language_box ul.chosen li.language').length;
                    var $route_table=$('#getDataTable table tbody tr');
                    for(var i=0; i<$route_table.length; i++){
                        var route_id=$route_table.eq(i).attr('xml_id');
                        if(route_id ==xml_id){
                            $route_table.eq(i).find('th.language_num').text(language_len);
                            break;
                        }
                    }
                    //触发点击确定
                    $('#route_info .modal-footer button.confirm').trigger('click');
                }else if(res.msg=='err'){
                    window.location=login_url;
                }
            }
        });
    }else{    //删除语言
        request_delete_language(jianchen);
    }   
});

//点击Choose Language按钮弹出模态框
$('.box1 .home button.language').click(function(e){
    e.stopPropagation();
    $('#zhezhao').fadeIn(1);
    //先清空表格内容
    $('#language_table thead tr th:gt(0)').remove();
    $('#language_table tbody tr').remove()
    //清空已选择的语言
    $('#choose_language .language_box ul li.language').remove();
    $('#language_lists_box .languages_left li.country_text i.icon').removeClass('route_icon-xuanzhong');
     //请求数据
     $.ajax({
        url: '/myroute/company_stations_get_transition',
        type:'post',
        data:{},
        success:function(res){
            $('#zhezhao').fadeOut(1);  //遮罩隐藏
            if(res.msg=='ok'){
                $('#route_info').modal('show');
                var route_datas=res.route_data;  //路线语言及翻译数据
                var station_data1=res.stations_data1;  //站点语言及翻译数据
                var station_data2=res.stations_data2;  //站点经纬度
                //console.log(route_datas,station_data1,station_data2);
                //先添加前两行的内容,语言
                for(var i=0; i<route_datas.length; i++){
                    let ID=route_datas[i].ID;  //语言
                    let language=route_datas[i].lang;  //语言
                    let name=route_datas[i].transition;  //翻译
                    let head_th = `<th route_lang_id=${ID}>${language}</th>`;  
                    let body_th;  
                    if(language=='en.US'){
                        body_th=`<th>${name}</th>`;
                    }else{
                        body_th=`<th>
                                    <input type="text" class="form-control" value='${name}'>
                                </th>`;
                    }
                    $('#language_table thead tr').append($(head_th));
                    $('#language_table tbody tr:eq(0)').append($(body_th));
                    //添加语言列表
                    var li;
                    if(language=='en.US'){
                        li=`<li class="language">
                                <span route_id=${ID}>${language}</span>
                            </li>`;
                    }else{
                        li=`<li class="language">
                                <span route_id=${ID}>${language}</span>
                                <i class="icon route_iconfont route_icon-shanchu"></i>
                            </li>`;
                    }
                    var $language_ul=$('#choose_language .language_box ul.chosen');
                    $language_ul.find('.clear').before($(li));
                    var $language_chosen=$('#language_lists_box li.country_text');
                    //为已存在的语言添加选择图标
                    for(var j=0; j<$language_chosen.length; j++){
                        let callname=$language_chosen.eq(j).attr('callname');
                        if(language== callname){
                            $language_chosen.eq(j).find('i.icon').addClass('route_icon-xuanzhong');
                        }
                    }
                    delete_language();  //删除语言
                }
                //再添加站点
                for(var i=0; i<station_data2.length; i++){ //循环站点列
                    var station_id=station_data2[i].station_id;  //站点id
                    var station_name=station_data2[i].stations_name;  //站点名称
                    var station_lat=station_data2[i].lat;
                    var station_lon=station_data2[i].lng;
                
                    //先添加列的站点
                    var Station_mul_lang=i18next.t('Station'); //Station对应多语言的文字
                    var tbody=`<tr id='${station_id}' lat='${station_lat}' lon='${station_lon}'><th>
                            ${Station_mul_lang} ${i+1}</th></tr>`;
                    $('#language_table tbody').append($(tbody));
                    
                    //再添加body翻译语言
                    for(var j=0; j<route_datas.length; j++){  
                        var language_code=route_datas[j].lang;
                        for(var k=0; k<station_data1.length; k++){  //循环语言行
                            let _ID=station_data1[k].ID;
                            let _station=station_data1[k].station_id;
                            let _lang=station_data1[k].lang;
                            let _transition=station_data1[k].transition;
                            
                            if(language_code==_lang && station_id==_station){
                                var th;
                                if(language_code == 'en.US'){
                                    th=`<th station_lang_id=${_ID}>${_transition}</th>`;
                                }else{
                                    th=`<th station_lang_id=${_ID}>
                                            <input type="text" class="form-control" value='${_transition}'>
                                        </th>`;
                                }
                                $('#language_table tbody tr:last').append($(th));
                                break;
                            }
                        }
                    }
                }
                //触发点击确定事件
                $('#route_info').addClass('click_comfirm');
                $('#route_info .modal-footer button.confirm').trigger('click',false);
                setTimeout(function(){
                    $('#route_info').removeClass('click_comfirm');
                },1000);
            }else if(res.msg=='err'){
                window.location=login_url;
            }
        }
    });
}); */


/***/ }),

/***/ 18:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__logger_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__EventEmitter_js__ = __webpack_require__(2);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }




var Connector = function (_EventEmitter) {
  _inherits(Connector, _EventEmitter);

  function Connector(cache, store, services) {
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    _classCallCheck(this, Connector);

    var _this = _possibleConstructorReturn(this, _EventEmitter.call(this));

    _this.cache = cache;
    _this.store = store;
    _this.services = services;
    _this.options = options;
    _this.logger = __WEBPACK_IMPORTED_MODULE_0__logger_js__["a" /* default */].create('cacheConnector');

    if (_this.cache && _this.cache.init) _this.cache.init(services, options.cache, options);
    return _this;
  }

  /* eslint consistent-return: 0 */


  Connector.prototype.load = function load(languages, namespaces, callback) {
    var _this2 = this;

    if (!this.cache) return callback && callback();
    var options = _extends({}, this.cache.options, this.options.cache);

    var loadLngs = typeof languages === 'string' ? this.services.languageUtils.toResolveHierarchy(languages) : languages;

    if (options.enabled) {
      this.cache.load(loadLngs, function (err, data) {
        if (err) _this2.logger.error('loading languages ' + loadLngs.join(', ') + ' from cache failed', err);
        if (data) {
          /* eslint no-restricted-syntax: 0 */
          for (var l in data) {
            if (Object.prototype.hasOwnProperty.call(data, l)) {
              for (var n in data[l]) {
                if (Object.prototype.hasOwnProperty.call(data[l], n)) {
                  if (n !== 'i18nStamp') {
                    var bundle = data[l][n];
                    if (bundle) _this2.store.addResourceBundle(l, n, bundle);
                  }
                }
              }
            }
          }
        }
        if (callback) callback();
      });
    } else if (callback) {
      callback();
    }
  };

  Connector.prototype.save = function save() {
    if (this.cache && this.options.cache && this.options.cache.enabled) this.cache.save(this.store.data);
  };

  return Connector;
}(__WEBPACK_IMPORTED_MODULE_1__EventEmitter_js__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (Connector);

/***/ }),

/***/ 19:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return get; });
/* harmony export (immutable) */ __webpack_exports__["b"] = transformOptions;

function get() {
  return {
    debug: false,
    initImmediate: true,

    ns: ['translation'],
    defaultNS: ['translation'],
    fallbackLng: ['dev'],
    fallbackNS: false, // string or array of namespaces

    whitelist: false, // array with whitelisted languages
    nonExplicitWhitelist: false,
    load: 'all', // | currentOnly | languageOnly
    preload: false, // array with preload languages

    simplifyPluralSuffix: true,
    keySeparator: '.',
    nsSeparator: ':',
    pluralSeparator: '_',
    contextSeparator: '_',

    saveMissing: false, // enable to send missing values
    updateMissing: false, // enable to update default values if different from translated value (only useful on initial development, or when keeping code as source of truth)
    saveMissingTo: 'fallback', // 'current' || 'all'
    saveMissingPlurals: true, // will save all forms not only singular key
    missingKeyHandler: false, // function(lng, ns, key, fallbackValue) -> override if prefer on handling
    missingInterpolationHandler: false, // function(str, match)

    postProcess: false, // string or array of postProcessor names
    returnNull: true, // allows null value as valid translation
    returnEmptyString: true, // allows empty string value as valid translation
    returnObjects: false,
    joinArrays: false, // or string to join array
    returnedObjectHandler: function returnedObjectHandler() {}, // function(key, value, options) triggered if key returns object but returnObjects is set to false
    parseMissingKeyHandler: false, // function(key) parsed a key that was not found in t() before returning
    appendNamespaceToMissingKey: false,
    appendNamespaceToCIMode: false,
    overloadTranslationOptionHandler: function handle(args) {
      var ret = {};
      if (args[1]) ret.defaultValue = args[1];
      if (args[2]) ret.tDescription = args[2];
      return ret;
    },

    interpolation: {
      escapeValue: true,
      format: function format(value, _format, lng) {
        return value;
      },
      prefix: '{{',
      suffix: '}}',
      formatSeparator: ',',
      // prefixEscaped: '{{',
      // suffixEscaped: '}}',
      // unescapeSuffix: '',
      unescapePrefix: '-',

      nestingPrefix: '$t(',
      nestingSuffix: ')',
      // nestingPrefixEscaped: '$t(',
      // nestingSuffixEscaped: ')',
      // defaultVariables: undefined // object that can have values to interpolate on - extends passed in interpolation data
      maxReplaces: 1000 // max replaces to prevent endless loop
    }
  };
}

/* eslint no-param-reassign: 0 */
function transformOptions(options) {
  // create namespace object if namespace is passed in as string
  if (typeof options.ns === 'string') options.ns = [options.ns];
  if (typeof options.fallbackLng === 'string') options.fallbackLng = [options.fallbackLng];
  if (typeof options.fallbackNS === 'string') options.fallbackNS = [options.fallbackNS];

  // extend whitelist with cimode
  if (options.whitelist && options.whitelist.indexOf('cimode') < 0) {
    options.whitelist = options.whitelist.concat(['cimode']);
  }

  return options;
}

/***/ }),

/***/ 2:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventEmitter = function () {
  function EventEmitter() {
    _classCallCheck(this, EventEmitter);

    this.observers = {};
  }

  EventEmitter.prototype.on = function on(events, listener) {
    var _this = this;

    events.split(' ').forEach(function (event) {
      _this.observers[event] = _this.observers[event] || [];
      _this.observers[event].push(listener);
    });
  };

  EventEmitter.prototype.off = function off(event, listener) {
    var _this2 = this;

    if (!this.observers[event]) {
      return;
    }

    this.observers[event].forEach(function () {
      if (!listener) {
        delete _this2.observers[event];
      } else {
        var index = _this2.observers[event].indexOf(listener);
        if (index > -1) {
          _this2.observers[event].splice(index, 1);
        }
      }
    });
  };

  EventEmitter.prototype.emit = function emit(event) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    if (this.observers[event]) {
      var cloned = [].concat(this.observers[event]);
      cloned.forEach(function (observer) {
        observer.apply(undefined, args);
      });
    }

    if (this.observers['*']) {
      var _cloned = [].concat(this.observers['*']);
      _cloned.forEach(function (observer) {
        var _ref;

        observer.apply(observer, (_ref = [event]).concat.apply(_ref, args));
      });
    }
  };

  return EventEmitter;
}();

/* harmony default export */ __webpack_exports__["a"] = (EventEmitter);

/***/ }),

/***/ 20:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(21);

var utils = _interopRequireWildcard(_utils);

var _ajax = __webpack_require__(22);

var _ajax2 = _interopRequireDefault(_ajax);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function getDefaults() {
  return {
    loadPath: '/locales/{{lng}}/{{ns}}.json',
    addPath: '/locales/add/{{lng}}/{{ns}}',
    allowMultiLoading: false,
    parse: JSON.parse,
    crossDomain: false,
    ajax: _ajax2.default
  };
}

var Backend = function () {
  function Backend(services) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Backend);

    this.init(services, options);

    this.type = 'backend';
  }

  _createClass(Backend, [{
    key: 'init',
    value: function init(services) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      this.services = services;
      this.options = utils.defaults(options, this.options || {}, getDefaults());
    }
  }, {
    key: 'readMulti',
    value: function readMulti(languages, namespaces, callback) {
      var loadPath = this.options.loadPath;
      if (typeof this.options.loadPath === 'function') {
        loadPath = this.options.loadPath(languages, namespaces);
      }

      var url = this.services.interpolator.interpolate(loadPath, { lng: languages.join('+'), ns: namespaces.join('+') });

      this.loadUrl(url, callback);
    }
  }, {
    key: 'read',
    value: function read(language, namespace, callback) {
      var loadPath = this.options.loadPath;
      if (typeof this.options.loadPath === 'function') {
        loadPath = this.options.loadPath([language], [namespace]);
      }

      var url = this.services.interpolator.interpolate(loadPath, { lng: language, ns: namespace });

      this.loadUrl(url, callback);
    }
  }, {
    key: 'loadUrl',
    value: function loadUrl(url, callback) {
      var _this = this;

      this.options.ajax(url, this.options, function (data, xhr) {
        if (xhr.status >= 500 && xhr.status < 600) return callback('failed loading ' + url, true /* retry */);
        if (xhr.status >= 400 && xhr.status < 500) return callback('failed loading ' + url, false /* no retry */);

        var ret = void 0,
            err = void 0;
        try {
          ret = _this.options.parse(data, url);
        } catch (e) {
          err = 'failed parsing ' + url + ' to json';
        }
        if (err) return callback(err, false);
        callback(null, ret);
      });
    }
  }, {
    key: 'create',
    value: function create(languages, namespace, key, fallbackValue) {
      var _this2 = this;

      if (typeof languages === 'string') languages = [languages];

      var payload = {};
      payload[key] = fallbackValue || '';

      languages.forEach(function (lng) {
        var url = _this2.services.interpolator.interpolate(_this2.options.addPath, { lng: lng, ns: namespace });

        _this2.options.ajax(url, _this2.options, function (data, xhr) {
          //const statusCode = xhr.status.toString();
          // TODO: if statusCode === 4xx do log
        }, payload);
      });
    }
  }]);

  return Backend;
}();

Backend.type = 'backend';

exports.default = Backend;

/***/ }),

/***/ 21:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaults = defaults;
exports.extend = extend;
var arr = [];
var each = arr.forEach;
var slice = arr.slice;

function defaults(obj) {
  each.call(slice.call(arguments, 1), function (source) {
    if (source) {
      for (var prop in source) {
        if (obj[prop] === undefined) obj[prop] = source[prop];
      }
    }
  });
  return obj;
}

function extend(obj) {
  each.call(slice.call(arguments, 1), function (source) {
    if (source) {
      for (var prop in source) {
        obj[prop] = source[prop];
      }
    }
  });
  return obj;
}

/***/ }),

/***/ 22:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function addQueryString(url, params) {
  if (params && (typeof params === 'undefined' ? 'undefined' : _typeof(params)) === 'object') {
    var queryString = '',
        e = encodeURIComponent;

    // Must encode data
    for (var paramName in params) {
      queryString += '&' + e(paramName) + '=' + e(params[paramName]);
    }

    if (!queryString) {
      return url;
    }

    url = url + (url.indexOf('?') !== -1 ? '&' : '?') + queryString.slice(1);
  }

  return url;
}

// https://gist.github.com/Xeoncross/7663273
function ajax(url, options, callback, data, cache) {

  if (data && (typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object') {
    if (!cache) {
      data['_t'] = new Date();
    }
    // URL encoded form data must be in querystring format
    data = addQueryString('', data).slice(1);
  }

  if (options.queryStringParams) {
    url = addQueryString(url, options.queryStringParams);
  }

  try {
    var x;
    if (XMLHttpRequest) {
      x = new XMLHttpRequest();
    } else {
      x = new ActiveXObject('MSXML2.XMLHTTP.3.0');
    }
    x.open(data ? 'POST' : 'GET', url, 1);
    if (!options.crossDomain) {
      x.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    }
    x.withCredentials = !!options.withCredentials;
    if (data) {
      x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    }
    if (x.overrideMimeType) {
      x.overrideMimeType("application/json");
    }
    var h = options.customHeaders;
    if (h) {
      for (var i in h) {
        x.setRequestHeader(i, h[i]);
      }
    }
    x.onreadystatechange = function () {
      x.readyState > 3 && callback && callback(x.responseText, x);
    };
    x.send(data);
  } catch (e) {
    console && console.log(e);
  }
}

exports.default = ajax;

/***/ }),

/***/ 23:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($, XRegExp) {

var _i18next = __webpack_require__(4);

var _i18next2 = _interopRequireDefault(_i18next);

var _i18nextXhrBackend = __webpack_require__(5);

var _i18nextXhrBackend2 = _interopRequireDefault(_i18nextXhrBackend);

var _functions = __webpack_require__(6);

var _setting = __webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } //分页使用
//字节转换


//时间格式转换

/**获取数据库xml数据
 * page 从第几页
 * nums_limit  每页限制多少数量
 * first_load  是否是第一次请求，第一次请求会返回磁盘信息
 * filename xml文件名
 * **/
var getDataTable = function getDataTable() {
    var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    var nums_limit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
    var first_load = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    var filename = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

    $('#zhezhao').fadeIn(1);
    $.ajax({
        url: '/myroute/get_xml_data',
        type: 'post',
        data: {
            page: page,
            nums_limit: nums_limit,
            first_load: first_load,
            filename: filename
        },
        success: function success(res, status) {
            if (res.msg == 'ok') {
                $('#zhezhao').fadeOut(1);
                var dataLen = res.dataLen; //总条数
                var data = res.ret_data; //返回的数据
                var dataSize = res.dataSize; //用户已用空间
                var disk_space = res.disk_space; //总磁盘空间

                var page_num = Math.ceil(dataLen / nums_limit); //页数
                //初始化显示部分
                init_show(dataSize, disk_space, dataLen, page, first_load);
                create_list(data);
                //分页
                split_page(page_num, page);
            } else if (res.msg == 'err') {
                if (first_load) {
                    window.location.reload(); //重载
                } else {
                    window.location.reload(); //重载
                }
            }
        }
    });
};

/**分页码
 * totalPage 表示总页码数
 * currenPage 表示当前页码
 * count  表示显示的个数
 * **/
var split_page = function split_page(totalPage) {
    var currentPage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var count = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5;

    $('#pageShow .Page').pagination({
        totalPage: totalPage, // 总页数
        currentPage: currentPage, // 当前页数
        isShow: false, // 是否显示首尾页
        count: count, // 显示个数
        //homePageText: 'Start',  // 首页文本
        //endPageText: 'End',   // 尾页文本
        prevPageText: "prevPage", // 上一页文本
        nextPageText: "nextPage", // 下一页文本
        callback: function callback(current) {
            // 回调,current(当前页数)
            //1. 获取当前页数和总页数
            //var info=$("#pageShow .Page").pagination("getPage");// 获取当前页数和总页数
            //$('#currentPage').text(info.current);
            //$('#totalPage').text(info.total); 
            //更改当前页码显示
            //$('#pageShow .info_show span.currPage').text(current);
            //改变数据
            var show_num = $('#getData p.info_tip select.showpage').val();
            getDataTable(current, show_num);
        }
    });
    var $page = $('#pageShow .Page .ui-pagination-container a');
    //为每个页码添加data-i18n属性
    for (var i = 0; i < $page.length; i++) {
        var text = $page.eq(i).text();
        $page.eq(i).attr('data-i18n', text);
        var i18n_text = _i18next2.default.t(text);
        $page.eq(i).text(i18n_text);
    }
};

//生成表格数据
var create_list = function create_list(data) {
    var url = window.location.href.replace('index.html', 'html/routeMaker.html');
    $('#getDataTable table tbody').html(''); //清空表格
    for (var i = 0; i < data.length; i++) {
        var ctime = (0, _functions.forMatDate)(new Date(Number(data[i].ctime)));
        var mtime = (0, _functions.forMatDate)(new Date(Number(data[i].mtime)));
        var xml_addr = data[i].xml_addr; //xml的下载地址
        //编辑页面跳转地址
        var edit_url = url + '&xml_id=' + data[i].ctime + '&route_name=' + data[i].filename;
        var xuanzhong = '';
        if (window.all_routes.indexOf(data[i].ctime) != -1) {
            xuanzhong = 'route_icon-xuanzhong';
        }
        var added_languages = data[i].languages; //该路线添加的语言
        var added_languages_arrs = added_languages.split(','); //将其转为数组
        added_languages_arrs = added_languages_arrs.join(' ');
        var routes = data[i].routes.split(',');
        var border_box = '',
            edit = '',
            clone = '',
            route_drive = '';
        var merge_class = ''; //合并路线的背景颜色
        if (routes[1]) {
            //是合并的
            merge_class = 'merge';
            edit = '<a class=\'edit\'>\n                        <span class=\'num\'>' + data[i].station_num + '</span>\n                    </a>';
        } else {
            border_box = '<div class="border_box_check">\n                            <!--<i class="icon route_iconfont route_icon-xuanzhong"></i>-->\n                            <i class="icon route_iconfont choose ' + xuanzhong + '"></i>\n                        </div>';
            edit = '<a class=\'edit jump\' href=\'' + edit_url + '\'>\n                        <span class=\'num\'>' + data[i].station_num + '</span>\n                        <span class=\'edit\'>+</span>\n                    </a>';
            clone = '<i class="icon route_iconfont route_icon-clone clone"></i>';
            route_drive = '<i class="icon route_iconfont route_icon-zidongjiashi sim_drive"></i>';
        }
        var action_xiazai;
        if (xml_addr) {
            //如果下载地址有
            xml_addr += '.xml';
            var download_filename = xml_addr.split('\/')[xml_addr.split('\/').length - 1];
            var time1 = download_filename.slice(download_filename.lastIndexOf('_') + 1, download_filename.lastIndexOf('.'));
            var time2 = (0, _functions.forMatDate)(new Date(Number(data[i].mtime)), false);
            if (time1 == time2) {
                action_xiazai = '<a class=\'xiazai\' href=\'' + xml_addr + '\' download=\'' + download_filename + '\'>\n                        <i class="icon route_iconfont route_icon-comiisxiazai download"></i>\n                        <span class=\'need_update\'>*</span>\n                    </a>';
            } else {
                action_xiazai = '<a class=\'xiazai\' href=\'' + xml_addr + '\' download=\'' + download_filename + '\'>\n                        <i class="icon route_iconfont route_icon-comiisxiazai download"></i>\n                        <span class=\'need_update fadein\'>*</span>\n                    </a>';
            }
        } else {
            action_xiazai = '<a class=\'xiazai\'>\n                        <i class="icon route_iconfont route_icon-comiisxiazai noclick download"></i>\n                        <span class=\'need_update\'>*</span>\n                    </a>';
        }
        var li_list = '<tr xml_id=\'' + data[i].ctime + '\' class=\'' + merge_class + '\'>\n                        <th class=\'index\'>' + (i + 1) + '</th>\n                        <th class=\'click_choose\'>\n                            ' + border_box + '\n                        </th>\n                        <th class=\'filename\'>\n                            <span>' + data[i].filename + '</span>\n                            <button class="btn btn-primary btn-xs rename">\n                                <i class="icon route_iconfont route_icon-ziti"></i>\n                            </button>\n                        </th>\n                        <th class=\'description\'>\n                            <span class=\'text\'>' + data[i].description + '</span>\n                            <button class="btn btn-primary btn-xs detail">\n                                <i class="icon route_iconfont route_icon-xiangqing"></i>\n                            </button>\n                        </th>\n                        <th class=\'station_num\'>\n                            ' + edit + '\n                        </th>\n                        <th class=\'language_num\'>\n                            <span class=\'language_list\' data-toggle="tooltip" data-placement="top"\n                                 title="' + added_languages_arrs + '">' + added_languages + '</span>\n                            <span class=\'info\'>+</span>\n                        </th>\n                        <th class=\'ctime\'>' + ctime + '</th>\n                        <th class=\'mtime\'>' + mtime + '</th>\n                        <th class=\'action\'>\n                            ' + clone + '\n                            ' + route_drive + '\n                            ' + action_xiazai + '\n                            <i class="icon route_iconfont route_icon-shanchu delete"></i>\n                        </th>\n                    </tr>';
        $('#getDataTable table tbody').append($(li_list));
        //为其添加提示工具
        $('[data-toggle="tooltip"]').tooltip();
        delt_event(); //处理表格点击事件
    }
};

//磁盘信息数据更改，页码更改
/**
 * used_space传过来的数据单位是字节 用户已用空间
 * total_space传过来的数据单位是MB，  用户分配的空间大小
 * **/
var init_show = function init_show(used_space, total_space, total_num, page, first_load) {
    if (first_load) {
        var rate = parseInt(used_space * 10 / total_space) / 10; //比例
        $('#heading_contain .heading_cipan .progress-bar').css({ width: rate + '%' });
        var used_space = (0, _functions.byte2)(used_space);
        var total_space = (0, _functions.byte2)(total_space * 1024 * 1024);
        $('#heading_contain .heading_cipan .number_info span.number1').text(used_space);
        $('#heading_contain .heading_cipan .number_info span.number2').text(total_space);
    }
    var show_num = Number($('#getData .showpage').val()); //每页显示的数量
    var page_num = Math.ceil(total_num / show_num); //页数

    var fromNum = total_num > 0 ? show_num * (page - 1) + 1 : 0; //起始条数
    var toNum; //终止条数
    if (page < page_num) {
        toNum = fromNum + show_num - 1;
    } else {
        toNum = total_num;
    }
    $('#pageShow .info_show span.from_num').text(fromNum);
    $('#pageShow .info_show span.to_num').text(toNum);
    $('#pageShow .info_show span.total').text(total_num);
    if (total_num > 0) {
        $('#getDataTable table tfoot').fadeOut(1); //隐藏表格脚步
    } else {
        $('#getDataTable table tfoot').fadeIn(1); //隐藏表格脚步
    }
};

//处理表格的点击事件
var delt_event = function delt_event() {
    //处理路线下拉
    function deal_language_route() {
        //点击路线的下拉按钮
        $('#choose_stations_box ul.routes li.route_box .top_ i.xiala').unbind('click');
        $('#choose_stations_box ul.routes li.route_box .top_ i.xiala').bind('click', function (e) {
            e.stopPropagation();
            $(this).toggleClass('route_icon-shang1'); //切换上拉图标样式

            if ($(this).hasClass('route_icon-shang1')) {
                $(this).parent().siblings('ul.languages').stop(true).slideUp();
            } else {
                $(this).parent().siblings('ul.languages').stop(true).slideDown();
            }
        });
    }

    //点击选中按钮
    $('#getDataTable table tbody tr th.click_choose').unbind('click');
    $('#getDataTable table tbody tr th.click_choose').bind('click', function (e) {
        e.stopPropagation();
        if (!$(this).html().trim()) {
            //如果该元素内没有内容，即不可点击，返回
            return;
        }

        var _this = $(this);
        var xml_id = $(this).parent().attr('xml_id').trim(); //路线id
        var $xuanzhong = $(this).find('.border_box_check i.choose');
        if ($xuanzhong.hasClass('route_icon-xuanzhong')) {
            //取消
            $xuanzhong.removeClass('route_icon-xuanzhong');
            all_routes.splice(all_routes.indexOf(xml_id), 1);
            var $route_li = $('#choose_stations_box ul.routes li.route_box');
            for (var i = 0; i < $route_li.length; i++) {
                var the_route_id = $route_li.eq(i).attr('route_id').trim();
                if (the_route_id == xml_id) {
                    $route_li.eq(i).remove();
                    break;
                }
            }
        } else {
            //添加
            //限制其点击太快
            if ($(this).hasClass('time_chosen')) {
                //点击快过快
                return;
            } else {
                $(this).addClass('time_chosen');
                setTimeout(function () {
                    _this.removeClass('time_chosen');
                }, 500);
            }
            if (all_routes.indexOf(xml_id) != -1) {
                //存在
                return;
            }
            $.ajax({
                url: '/myroute/get_xml_id',
                type: 'post',
                data: { xml_id: xml_id },
                success: function success(res) {
                    if (res.msg == 'ok') {
                        var station_num = res.data.station_num; //站点数
                        var this_routes = res.data.routes; //该路线的站点集合
                        var route_name = res.data.filename; //路线名
                        this_routes = this_routes.split(','); //转为数组
                        _this.siblings('.station_num').find('a.edit span.num').text(station_num); //改变站点数，防止不一致
                        if (station_num > 0) {
                            //有站点
                            $xuanzhong.addClass('route_icon-xuanzhong');
                            for (var i = 0; i < this_routes.length; i++) {
                                var _route_id = this_routes[i];
                                if (all_routes.indexOf(_route_id) == -1) {
                                    //不存在
                                    all_routes.push(_route_id);
                                }
                            }
                            $.ajax({
                                url: '/myroute/get_route_languages',
                                type: 'post',
                                data: { xml_id: xml_id },
                                success: function success(res) {
                                    if (res.msg == 'ok') {
                                        var data = res.data;
                                        var $route_box = '<li class="route_box" route_id=' + xml_id + '>\n                                                            <div class="top_">\n                                                                <span class="route_name">' + route_name + '</span>\n                                                                <i class="icon route_iconfont route_icon-icon-test xiala"></i>\n                                                            </div>\n                                                            <ul class="languages"></ul>\n                                                        </li>';
                                        $('#choose_stations_box .routes').append($($route_box));
                                        var $languages_li = "";
                                        for (var i = 0; i < data.length; i++) {
                                            var language = data[i].lang;
                                            $languages_li += "<li class='languages'>" + language + "</li>";
                                            if (merge_routes_languages.indexOf(language) == -1) {
                                                merge_routes_languages.push(language);
                                            }
                                        }
                                        $('#choose_stations_box .routes li.route_box:last').find('ul.languages').append($($languages_li));

                                        //处理路线下拉
                                        deal_language_route();
                                    } else if (res.msg == 'err' || res.msg == 'no') {
                                        window.location.reload();
                                    }
                                },
                                error: function error(err) {
                                    if (err.status == 500) {
                                        alert('server error,please try again later.');
                                    }
                                }
                            });
                        } else {
                            var tip = _i18next2.default.t('Station_num_err'); //提示信息
                            $('#save_success p.save_tip').text(tip);
                            $('#save_success').stop(true).fadeIn(1);
                            setTimeout(function () {
                                $('#save_success').stop(true).fadeOut(1);
                            }, 2000);
                        }
                    } else if (res.msg == 'err') {
                        alert('Expiration of login information,login again.');
                        window.location = _setting.login_url;
                    } else if (res.msg == 'no') {
                        window.location.reload();
                    }
                },
                error: function error(err) {
                    if (err.status == 500) {
                        alert('server error,please try again later.');
                    }
                }
            });
        }
    });

    //点击查看详情按钮
    $('#getDataTable table tbody tr th.description button.detail').unbind('click');
    $('#getDataTable table tbody tr th.description button.detail').bind('click', function (e) {
        e.stopPropagation();
        $('#show_detail').fadeIn();
        $('#show_detail .my_inp input.xml_name').fadeOut(1).val('');
        var description_detail = _i18next2.default.t('Description_detail');
        $('#show_detail p.myBg span').text(description_detail).attr('data-i18n', 'Description_detail'); //更改标题
        var _this = $(this);
        var description = $(this).siblings('span.text').text(); //详情文本
        var $description_ele = $('#show_detail .my_inp textarea.xml_description');
        $description_ele.fadeIn(1).val(description).css({ 'height': '0' }).height($description_ele.get(0).scrollHeight);
        var xml_id = $(this).parent().parent().attr('xml_id'); //xml对应的id
        //点击确定按钮提交更改
        $('#show_detail .my_btn button.confirm').unbind('click');
        $('#show_detail .my_btn button.confirm').bind('click', function (e) {
            e.stopPropagation();
            var change_description = $('#show_detail textarea.xml_description').val().trim(); //更改后的详情文本

            if (description == change_description) {
                $('#show_detail').fadeOut();
            } else {
                $('#zhezhao').fadeIn(1);
                $.ajax({
                    url: '/myroute/change_xml_description',
                    type: 'post',
                    data: {
                        description: (0, _functions.htmlspecialchars)(change_description),
                        xml_id: xml_id
                    },
                    success: function success(res, status) {
                        if (res.msg == 'err') {
                            window.location.reload();
                        } else if (res.msg = 'ok') {
                            //成功
                            $('#zhezhao').fadeOut(1);
                            $('#show_detail').fadeOut();
                            _this.siblings('span.text').text(change_description); //变为更改后的内容
                        }
                    }
                });
            }
        });
    });

    //点击rename重命名按钮
    $('#getDataTable table tbody tr th.filename button.rename').unbind('click');
    $('#getDataTable table tbody tr th.filename button.rename').bind('click', function (e) {
        e.stopPropagation();
        var _this = $(this);
        $('#show_detail').fadeIn();
        var rename_filename = _i18next2.default.t('Rename_filename');
        $('#show_detail p.myBg span').text(rename_filename).attr('data-i18n', 'Rename_filename'); //更改文件名
        $('#show_detail .my_inp textarea.xml_description').fadeOut(1).val('');
        var filename = $(this).siblings('span').text(); //文件名
        $('#show_detail .my_inp input.xml_name').fadeIn(1).val(filename);
        var xml_id = $(this).parent().parent().attr('xml_id'); //xml对应的id
        //监听输入文件名框
        $('#show_detail .my_inp input.xml_name').get(0).oninput = function (e) {
            e.stopPropagation();
            input_check_fun($(this));
        };
        //点击确认按钮
        $('#show_detail .my_btn button.confirm').unbind('click');
        $('#show_detail .my_btn button.confirm').bind('click', function (e) {
            e.stopPropagation();
            var $input_xml = $('#show_detail .my_inp input.xml_name');
            if (!input_check_fun($input_xml)) return;
            var new_filename = $input_xml.val().trim();
            //去点原文件名标点符号后的文件名,并转为大写
            var remove_sysm_filename = XRegExp.replace(new_filename, XRegExp('\\p{P}?\\p{S}?\\p{Zs}?', 'g'), function (match) {
                return '';
            }).toUpperCase();
            //console.log(remove_sysm_filename)
            if (new_filename != filename) {
                //新文件名和原文件名不相等
                $('#zhezhao').fadeIn(1);
                $.ajax({
                    url: '/myroute/change_xml_filename',
                    type: 'post',
                    data: {
                        filename: filename,
                        new_filename: new_filename,
                        remove_sysm_filename: remove_sysm_filename,
                        xml_id: xml_id
                    },
                    success: function success(res, status) {
                        if (res.msg == 'err') {
                            window.location.reload();
                        } else if (res.msg == 'has') {
                            //表示名称存在
                            $('#zhezhao').fadeOut(1);
                            var exist_filename = res.filename;
                            var tip_text = _i18next2.default.t('Routename_exist') + exist_filename;
                            $('#show_detail .my_inp p.err_tip').text(tip_text).stop(true).fadeIn();
                            setTimeout(function () {
                                $('#show_detail .my_inp p.err_tip').fadeOut();
                            }, 3000);
                        } else if (res.msg = 'ok') {
                            //成功
                            $('#zhezhao').fadeOut(1);
                            $('#show_detail').fadeOut();
                            _this.siblings('span').text(new_filename); //变为更改后的内容
                            //更改跳转连接的url
                            var $a_ele = _this.parent().siblings('th.station_num').find('a.edit');
                            var jump_url = $a_ele.attr('href').split('&route_name=')[0];
                            jump_url += '&route_name=' + new_filename;
                            $a_ele.attr('href', jump_url);
                            //提示语需要更新
                            var changed_routes = [];
                            for (var i = 0; i < res.changed_routes.length; i++) {
                                var route_id = res.changed_routes[i].ctime;
                                changed_routes.push(route_id);
                            };
                            var $main_table_tr = $('#getDataTable table tbody tr');
                            for (var i = 0; i < $main_table_tr.length; i++) {
                                var _route_id2 = $main_table_tr.eq(i).attr('xml_id');
                                if (changed_routes.indexOf(_route_id2) != -1) {
                                    $main_table_tr.eq(i).find('th.action a.xiazai span.need_update').addClass('fadein');
                                }
                            }
                        }
                    }
                });
            } else {
                //相等
                var tip_text = _i18next2.default.t('NoChange');
                $('#show_detail .my_inp p.err_tip').text(tip_text).stop(true).fadeIn();
                setTimeout(function () {
                    $('#show_detail .my_inp p.err_tip').fadeOut();
                }, 3000);
            }
        });
    });

    //点击删除按钮
    $('#getDataTable table tbody tr th.action i.delete').unbind('click');
    $('#getDataTable table tbody tr th.action i.delete').bind('click', function (e) {
        e.stopPropagation();
        var xml_id = Number($(this).parent().parent().attr('xml_id'));
        var filename = $(this).parent().siblings('th.filename').find('span').text();
        //console.log(xml_id)
        //查询该路线被用于哪些合并路线中
        if (!$(this).parent().parent().hasClass('merge')) {
            //如果不是合并路线
            $.ajax({
                url: '/myroute/route_been_used',
                type: 'post',
                data: { xml_id: xml_id },
                success: function success(res) {
                    if (res.msg == 'err') {
                        window.location.reload();
                    } else if (res.msg = 'ok') {
                        $('#zhezhao').fadeOut(1);
                        var routes = res.routes; //路线名称数组
                        var filenames = '';
                        for (var i = 0; i < routes.length; i++) {
                            filenames += routes[i].filename;
                            if (i != routes.length - 1) {
                                filenames += ',';
                            }
                        };
                        if (routes.length > 0) {
                            var mal_tip = _i18next2.default.t('Used_routes') + filenames;
                            $('#myModal').modal('show').find('.modal-body').fadeIn(1).html(mal_tip);
                        } else {
                            $('#myModal').modal('show').find('.modal-body').fadeOut(1);
                        }
                    }
                }
            });
        } else {
            $('#myModal').modal('show').find('.modal-body').fadeOut(1);
        }
        //点击模态框的确认
        $('#myModal .modal-footer button.confirm').unbind('click');
        $('#myModal .modal-footer button.confirm').bind('click', function (e) {
            e.stopPropagation();
            $('#myModal').modal('hide');
            $('#zhezhao').fadeIn(1);
            $.ajax({
                url: '/myroute/delete_xml',
                type: 'post',
                data: {
                    xml_id: xml_id, filename: filename
                },
                success: function success(res, status) {
                    if (res.msg == 'err') {
                        window.location.reload();
                    } else if (res.msg = 'ok') {
                        $('#zhezhao').fadeOut(1);
                        var show_num = Number($('#getData p.info_tip select.showpage').val());
                        var cur_page = Math.ceil(Number($('#pageShow .info_show span.from_num').text()) / show_num);
                        var xml_len = $('#getDataTable table tbody tr').length; //目前存在的是否为最后一个
                        if (xml_len == 1) {
                            getDataTable(cur_page - 1, show_num);
                        } else {
                            getDataTable(cur_page, show_num);
                        }
                    }
                }
            });
        });
    });

    //点击查看路线信息,变更为点击语言栏目
    $('#getDataTable table tbody tr th.language_num span.info').unbind('click');
    $('#getDataTable table tbody tr th.language_num span.info').bind('click', function (e) {
        e.stopPropagation();
        var $this = $(this).parent(); //使之赋值给它的父标签
        var xml_id = Number($this.parent().attr('xml_id')); //路线id
        var $this = $this;
        //判断该路线是否是合并的路线
        var isMergeRoute = $this.siblings('th.click_choose').html().trim();
        //警告框显示
        var waring_info = _i18next2.default.t('modify_transition_tip');
        $('.route_info.merge_route .modal-body .waring_info').fadeIn(1).find('p.tip_info').text(waring_info);
        if (isMergeRoute) {
            //单一路线
            //先清空表格内容
            $('#language_table thead tr th:gt(0)').remove();
            $('#language_table tbody tr:gt(0)').remove();
            $('#language_table tbody tr:eq(0) th:gt(0)').remove();
            //清空已选择的语言
            $('#choose_language .language_box ul li.language').remove();
            $('#language_lists_box .languages_left li.country_text i.icon').removeClass('route_icon-xuanzhong');
            var filename = $this.siblings('th.filename').find('span').text(); //文件名
            var index = $this.siblings('th.index').text();
            $('#route_info').modal('show').attr({
                'xml_id': xml_id, 'filename': filename, 'index': index
            });
            $('body').css({ 'padding': '0px' });
            $('#route_info .modal-footer button.download').addClass('disabled').removeClass('btn-primary').find('a').attr({ 'download': null, href: null }).css({ color: 'red' });
            $('#zhezhao').fadeIn(1); //遮罩显示
            //请求数据
            $.ajax({
                url: '/myroute/get_routeInfo',
                type: 'post',
                data: { xml_id: xml_id },
                success: function success(res) {
                    $('#zhezhao').fadeOut(1); //遮罩隐藏
                    if (res.msg == 'ok') {
                        var route_datas = res.route_data; //路线语言及翻译数据
                        var station_data1 = res.stations_data1; //站点语言及翻译数据
                        var station_data2 = res.stations_data2; //站点经纬度
                        //console.log(route_datas,station_data1,station_data2);
                        //先添加前两行的内容,语言
                        for (var i = 0; i < route_datas.length; i++) {
                            var ID = route_datas[i].ID; //语言
                            var language = route_datas[i].lang; //语言
                            var name = route_datas[i].transition; //翻译
                            var head_th = '<th route_lang_id=' + ID + '>' + language + '</th>';
                            var body_th = void 0;
                            if (language == 'en.US') {
                                body_th = '<th>' + name + '</th>';
                            } else {
                                body_th = '<th>\n                                            <input type="text" class="form-control" value=\'' + name + '\' origin_val=\'' + name + '\'>\n                                        </th>';
                            }
                            $('#language_table thead tr').append($(head_th));
                            $('#language_table tbody tr:eq(0)').append($(body_th));
                            //添加语言列表
                            var li;
                            if (language == 'en.US') {
                                li = '<li class="language">\n                                        <span route_id=' + ID + '>' + language + '</span>\n                                    </li>';
                            } else {
                                li = '<li class="language">\n                                        <span route_id=' + ID + '>' + language + '</span>\n                                        <i class="icon route_iconfont route_icon-shanchu"></i>\n                                    </li>';
                            }
                            var $language_ul = $('#choose_language .language_box ul.chosen');
                            $language_ul.find('.clear').before($(li));
                            var $language_chosen = $('#language_lists_box li.country_text');
                            //为已存在的语言添加选择图标
                            for (var j = 0; j < $language_chosen.length; j++) {
                                var callname = $language_chosen.eq(j).attr('callname');
                                if (language == callname) {
                                    $language_chosen.eq(j).find('i.icon').addClass('route_icon-xuanzhong');
                                }
                            }
                            delete_language(); //删除语言
                        }
                        //再添加站点
                        for (var i = 0; i < station_data2.length; i++) {
                            //循环站点列
                            var station_id = station_data2[i].station_id; //站点id
                            var station_name = station_data2[i].stations_name; //站点名称
                            var station_lat = station_data2[i].lat;
                            var station_lon = station_data2[i].lng;

                            //先添加列的站点
                            var Station_mul_lang = _i18next2.default.t('Station'); //Station对应多语言的文字
                            var tbody = '<tr id=\'' + station_id + '\' lat=\'' + station_lat + '\' lon=\'' + station_lon + '\'><th>\n                                    ' + Station_mul_lang + ' ' + (i + 1) + '</th></tr>';
                            $('#language_table tbody').append($(tbody));

                            //再添加body翻译语言
                            for (var j = 0; j < route_datas.length; j++) {
                                var language_code = route_datas[j].lang;
                                for (var k = 0; k < station_data1.length; k++) {
                                    //循环语言行
                                    var _ID = station_data1[k].ID;
                                    var _station = station_data1[k].station_id;
                                    var _lang = station_data1[k].lang;
                                    var _transition = station_data1[k].transition;

                                    if (language_code == _lang && station_id == _station) {
                                        var th;
                                        if (language_code == 'en.US') {
                                            th = '<th station_lang_id=' + _ID + '>' + _transition + '</th>';
                                        } else {
                                            // origin_val值为原先的翻译
                                            th = '<th station_lang_id=' + _ID + '>\n                                                    <input type="text" class="form-control" value=\'' + _transition + '\' origin_val=\'' + _transition + '\'>\n                                                </th>';
                                        }
                                        $('#language_table tbody tr:last').append($(th));
                                        break;
                                    }
                                }
                            }
                        }
                        //触发点击确定事件
                        $('#route_info').addClass('click_comfirm');
                        $('#route_info .modal-footer button.confirm').trigger('click', { operation_by_myself: false, save_operation: true });
                        setTimeout(function () {
                            $('#route_info').removeClass('click_comfirm');
                        }, 1000);
                    } else if (res.msg == 'err') {
                        window.location = _setting.login_url;
                    }
                }
            });
        } else {
            //合并的路线
            $('#zhezhao').fadeIn(1); //遮罩显示
            $('#merge_route_info .modal-footer button.download').addClass('disabled').removeClass('btn-primary').find('a').attr({ 'download': null, href: null }).css({ color: 'red' });
            var filename = $this.siblings('th.filename').find('span').text(); //文件名
            var index = $this.siblings('th.index').text();
            $('#merge_route_info').modal('show').attr({
                'xml_id': xml_id, 'filename': filename, 'index': index
            });
            //更改路线名
            $('#merge_route_info .modal-header span.route_name').text(filename);
            $('body').css({ 'padding': '0px' });
            $('#merge_route_info .modal-body .body_table').html(''); //清空表格

            $.ajax({
                url: '/myroute/get_merge_route_info',
                type: 'post',
                data: {
                    route_id: xml_id
                },
                success: function success(res) {
                    $('#zhezhao').fadeOut(1); //遮罩隐藏
                    if (res.msg == 'ok') {
                        var result = res.result; //返回的结果
                        var stations_num = res.stations_num; //取出重复站点后的站点数
                        var Language_transi = _i18next2.default.t('Language'); //翻译
                        var Route_name_transi = _i18next2.default.t('Route_name'); //翻译
                        var Station_transi = _i18next2.default.t('Station'); //翻译
                        //console.log(result,stations_num)
                        //更新站点数目
                        $this.siblings('th.station_num').text(stations_num);
                        //查看是否有空数据，即其每条路线的组成是否都存在
                        for (var m = 0; m < result.length; m++) {
                            var route_datas = result[m].route_data; //路线语言及翻译数据
                            if (route_datas.length == 0) {
                                //如果有数据为空
                                $('#merge_route_info').modal('hide');
                                var tip_info = _i18next2.default.t('Merge_route_damage'); //提示信息
                                $('#save_success p.save_tip').text(tip_info);
                                $('#save_success').stop(true).fadeIn(1);
                                setTimeout(function () {
                                    $('#save_success').stop(true).fadeOut(1);
                                }, 3000);
                                return;
                            }
                        }
                        //循环添加多个表
                        for (var m = 0; m < result.length; m++) {
                            var route_datas = result[m].route_data; //路线语言及翻译数据
                            var station_data1 = result[m].stations_data1; //站点语言及翻译数据
                            var station_data2 = result[m].stations_data2; //站点经纬度

                            var the_route_id = route_datas[0].route_id; //路线的route_id
                            var route_filename = void 0;
                            for (var i = 0; i < route_datas.length; i++) {
                                var lang = route_datas[i].lang;
                                if (lang == 'en.US') {
                                    route_filename = route_datas[i].transition;
                                    break;
                                }
                            }
                            var table = '<table class="table table-bordered table-hover route_table" \n                                        route_id=' + the_route_id + ' filename=' + route_filename + '>\n                                        <thead>\n                                            <tr>\n                                                <th data-i18n=\'Language\'>' + Language_transi + '</th>\n                                            </tr>\n                                        </thead>\n                                        <tbody>\n                                            <tr>\n                                                <th data-i18n=\'Route_name\'>' + Route_name_transi + '</th>\n                                            </tr>\n                                        </tbody>\n                                    </table>';
                            var $table_box = $('#merge_route_info .modal-body .body_table');
                            $table_box.append($(table));

                            //先添加前两行的内容,语言
                            for (var i = 0; i < route_datas.length; i++) {
                                var ID = route_datas[i].ID; //语言
                                var language = route_datas[i].lang; //语言
                                var name = route_datas[i].transition; //翻译
                                var head_th = '<th route_lang_id=' + ID + '>' + language + '</th>';
                                var body_th = void 0;
                                if (language == 'en.US') {
                                    body_th = '<th>' + name + '</th>';
                                } else {
                                    // origin_val值为原先的翻译
                                    body_th = '<th>\n                                                <input type="text" class="form-control" value=\'' + name + '\' origin_val=\'' + name + '\'>\n                                            </th>';
                                }
                                $table_box.find('table').eq(m).find('thead tr').append($(head_th));
                                $table_box.find('table').eq(m).find('tbody tr:eq(0)').append($(body_th));
                            }
                            //再添加站点
                            for (var i = 0; i < station_data2.length; i++) {
                                //循环站点列
                                var station_id = station_data2[i].station_id; //站点id
                                var station_name = station_data2[i].stations_name; //站点名称
                                var station_lat = station_data2[i].lat;
                                var station_lon = station_data2[i].lng;

                                //先添加列的站点
                                var Station_mul_lang = _i18next2.default.t('Station'); //Station对应多语言的文字
                                var tbody = '<tr id=\'' + station_id + '\' lat=\'' + station_lat + '\' lon=\'' + station_lon + '\'><th>\n                                        ' + Station_mul_lang + ' ' + (i + 1) + '</th></tr>';
                                $table_box.find('table').eq(m).find('tbody').append($(tbody));

                                //再添加body翻译语言
                                for (var j = 0; j < route_datas.length; j++) {
                                    var language_code = route_datas[j].lang;
                                    for (var k = 0; k < station_data1.length; k++) {
                                        //循环语言行
                                        var _ID = station_data1[k].ID;
                                        var _station = station_data1[k].station_id;
                                        var _lang = station_data1[k].lang;
                                        var _transition = station_data1[k].transition;

                                        if (language_code == _lang && station_id == _station) {
                                            var th;
                                            if (language_code == 'en.US') {
                                                th = '<th station_lang_id=' + _ID + '>' + _transition + '</th>';
                                            } else {
                                                th = '<th station_lang_id=' + _ID + '>\n                                                        <input type="text" class="form-control" value=\'' + _transition + '\' origin_val=\'' + _transition + '\'>\n                                                    </th>';
                                            }
                                            $table_box.find('table').eq(m).find('tbody tr:last').append($(th));
                                            break;
                                        }
                                    }
                                }
                            }
                        }

                        //处理每个相同站点输入事件
                        all_stations_input();
                        //触发点击确定事件
                        $('#merge_route_info').addClass('click_comfirm');
                        setTimeout(function () {
                            $('#merge_route_info').removeClass('click_comfirm');
                        }, 1000);
                        $('#merge_route_info .modal-footer button.confirm').trigger('click', { operation_by_myself: false, save_operation: true });
                    } else if (res.msg == 'no') {
                        alert('this route is not exists.');
                        window.location.reload();
                    } else if (res.msg == 'err') {
                        alert('Expiration of login information,login again.');
                        window.location = _setting.login_url;
                    }
                },
                error: function error(err) {
                    if (err.status == 500) {
                        alert('server error,please try again later.');
                    }
                }
            });
        }
    });

    //点击Clone克隆按钮
    $('#getDataTable table tbody tr th.action i.clone').unbind('click');
    $('#getDataTable table tbody tr th.action i.clone').bind('click', function (e) {
        e.stopPropagation();
        var station_num = Number($(this).parent().siblings('th.station_num').find('span.num').text());
        if (station_num == 0) {
            var tip = _i18next2.default.t('Station_num_err'); //提示信息
            $('#save_success p.save_tip').text(tip);
            $('#save_success').stop(true).fadeIn(1);
            setTimeout(function () {
                $('#save_success').stop(true).fadeOut(1);
            }, 2000);
            return;
        };

        var _this = $(this).parent();
        $('#show_detail').fadeIn();
        var clone_route = _i18next2.default.t('Clone');
        $('#show_detail p.myBg span').text(clone_route).attr('data-i18n', 'Clone'); //更改文件名
        $('#show_detail .my_inp textarea.xml_description').fadeIn(1).val('').siblings('input.xml_name').fadeIn(1).val('');
        var xml_id = _this.parent().attr('xml_id'); //xml对应的id
        //监听输入文件名框
        $('#show_detail .my_inp input.xml_name').get(0).oninput = function (e) {
            e.stopPropagation();
            input_check_fun($(this));
        };
        //点击确认按钮
        $('#show_detail .my_btn button.confirm').unbind('click');
        $('#show_detail .my_btn button.confirm').bind('click', function (e) {
            e.stopPropagation();
            var $input_xml = $('#show_detail .my_inp input.xml_name');
            var filename = $input_xml.val().trim(); //文件名
            if (!input_check_fun($input_xml)) return;
            //去点原文件名标点符号后的文件名,并转为大写
            var remove_sysm_filename = XRegExp.replace(filename, XRegExp('\\p{P}?\\p{S}?\\p{Zs}?', 'g'), function (match) {
                return '';
            }).toUpperCase();
            var description = $('#show_detail textarea.xml_description').val().trim();
            //请求后台克隆
            $('#zhezhao').fadeIn(1);
            $.ajax({
                url: '/myroute/clone_route',
                type: 'post',
                data: {
                    route_id: xml_id,
                    filename: filename,
                    description: (0, _functions.htmlspecialchars)(description),
                    remove_sysm_filename: remove_sysm_filename
                },
                success: function success(res, status) {
                    if (res.msg == 'err') {
                        window.location.reload(); //重载
                    } else if (res.msg == 'has') {
                        //表示名称存在
                        $('#zhezhao').fadeOut(1);
                        var exist_filename = res.filename;
                        $('#show_detail .my_inp p.err_tip').text('A similar route name exists:' + exist_filename).stop(true).fadeIn();
                        setTimeout(function () {
                            $('#show_detail .my_inp p.err_tip').fadeOut();
                        }, 3000);
                    } else if (res.msg == 'ok') {
                        //隐藏对话框
                        $('#show_detail').fadeOut();
                        //清空输入框内容
                        $('#show_detail .my_inp input.xml_name').val('');
                        $('#show_detail textarea.xml_description').val('');
                        var show_num = $('#getData p.info_tip select.showpage').val();
                        getDataTable(1, show_num, true);
                    }
                }
            });
        });
    });

    //点击模拟驾驶车的按钮
    $('#getDataTable table tbody tr th.action i.sim_drive').unbind('click');
    $('#getDataTable table tbody tr th.action i.sim_drive').bind('click', function (e) {
        e.stopPropagation();
        var $this = $(this).parent();
        var xml_id = Number($this.parent().attr('xml_id')); //路线id
        var station_num = Number($this.siblings('th.station_num').find('a.edit span.num').text()); //站点个数
        var language_num = $this.siblings('th.language_num').find('span.language_list').text(); //语言个数
        language_num = language_num.split(',').length;
        if (station_num < 2 || language_num < 2) {
            var err_tip = _i18next2.default.t('Simulated_drive_err');
            $('#save_success p.save_tip').text(err_tip);
            $('#save_success').fadeIn(1);
            setTimeout(function () {
                $('#save_success').fadeOut(1);
            }, 2500);
            return;
        }
        $('#zhezhao').fadeIn(1);
        $.ajax({
            url: '/myroute/get_routeInfo',
            type: 'post',
            data: { xml_id: xml_id },
            success: function success(res) {
                $('#zhezhao').fadeOut(1);
                if (res.msg == 'ok') {
                    var route_data = res.route_data;
                    var stations_data1 = res.stations_data1;
                    var stations_data2 = res.stations_data2;

                    var hasCN = route_data.some(function (ele, index) {
                        //是否有中文zn.CN
                        if (ele.lang == 'zh.CN') {
                            return true;
                        } else {
                            return false;
                        }
                    });
                    if (!hasCN) {
                        var err_tip = _i18next2.default.t('Simulated_CN');
                        $('#save_success p.save_tip').text(err_tip);
                        $('#save_success').fadeIn(1);
                        setTimeout(function () {
                            $('#save_success').fadeOut(1);
                        }, 2500);
                        return;
                    }
                    var transition_over = stations_data1.every(function (ele, index) {
                        //所有翻译是否完全
                        if (!ele.transition) {
                            //为空
                            return false;
                        } else {
                            return true;
                        }
                    });
                    if (!transition_over) {
                        var err_tip = _i18next2.default.t('Simulated_CN');
                        $('#save_success p.save_tip').text(err_tip);
                        $('#save_success').fadeIn(1);
                        setTimeout(function () {
                            $('#save_success').fadeOut(1);
                        }, 2500);
                        return;
                    }
                    //通过检验
                    var jump_url = window.location.origin + '/myroute/html/routeDrive.html?route_id=' + xml_id;
                    window.location = jump_url;
                }
            }
        });
    });
};

//点击所选中的语言列表删除图标
function delete_language() {
    var $language_ul = $('#choose_language .language_box ul.chosen');
    //点击删除单个语言图标
    $language_ul.find('li.language i').unbind('click');
    $language_ul.find('li.language i').bind('click', function (e) {
        e.stopPropagation();
        var jianchen = $(this).siblings('span').text();
        request_delete_language(jianchen);
    });
}

//向后台请求删除语言
function request_delete_language(jianchen) {
    var xml_id = $('#route_info').attr('xml_id');
    var $stations_tb = $('#language_table tbody tr');
    var stations = []; //所有站点
    for (var i = 1; i < $stations_tb.length; i++) {
        var station_id = $stations_tb.eq(i).attr('id');
        stations.push(station_id);
    }
    var languages_arr = []; //所有语言简称
    var $languages_choosen = $('#choose_language .language_box li.language');
    for (var i = 0; i < $languages_choosen.length; i++) {
        var language = $languages_choosen.eq(i).find('span').text();
        if (language != jianchen) {
            languages_arr.push(language);
        }
    };
    $('#myModal').modal('show').find('.modal-body').fadeOut(1);
    $('#myModal .modal-footer button.confirm').unbind('click');
    $('#myModal .modal-footer button.confirm').bind('click', function (e) {
        var _data;

        //$chosen_i.removeClass('route_icon-xuanzhong'); //删除选中样式
        $('#myModal').modal('hide'); //隐藏模态框
        var language_len = $('#choose_language .language_box ul.chosen li.language').length;
        $.ajax({
            url: '/myroute/delete/language',
            type: 'post',
            data: (_data = {
                xml_id: xml_id,
                jianchen: jianchen,
                stations: stations
            }, _defineProperty(_data, 'xml_id', xml_id), _defineProperty(_data, 'language_num', language_len - 1), _defineProperty(_data, 'languages_arr', languages_arr.join(',')), _data),
            success: function success(res) {
                if (res.msg == 'ok') {
                    var $language_chosen = $('#choose_language .language_box ul.chosen li.language');
                    for (var i = 0; i < $language_chosen.length; i++) {
                        if (jianchen == $language_chosen.eq(i).find('span').text()) {
                            $language_chosen.eq(i).remove(); //删除列出的语言
                            break;
                        }
                    }
                    var $language_li = $('#language_lists_box ul.choose_my_language li.language ul li.country_text');
                    for (var i = 0; i < $language_li.length; i++) {
                        var callname = $language_li.eq(i).attr('callname');
                        if (callname == jianchen) {
                            $language_li.eq(i).find('i.icon').removeClass('route_icon-xuanzhong'); //删除选中样式
                        }
                    }
                    //删除表格中对应语言的列
                    var $table_head_cols = $('#language_table thead tr th'); //表格头部的列数
                    var $table_body_rows = $('#language_table tbody tr'); //表格的行数
                    for (var i = 1; i < $table_head_cols.length; i++) {
                        var language = $table_head_cols.eq(i).text().trim();
                        if (language == jianchen) {
                            $table_head_cols.eq(i).remove();
                            for (var j = 0; j < $table_body_rows.length; j++) {
                                $table_body_rows.eq(j).find('th').eq(i).remove();
                            }
                            break;
                        }
                    }
                    //改变语言的数目
                    language_len = $('#choose_language .language_box ul.chosen li.language').length;
                    var $route_table = $('#getDataTable table tbody tr');
                    for (var i = 0; i < $route_table.length; i++) {
                        var route_id = $route_table.eq(i).attr('xml_id');
                        if (route_id == xml_id) {
                            var $language_list_ele = $route_table.eq(i).find('th.language_num span.language_list');
                            $language_list_ele.text(languages_arr.join(','));
                            languages_arr = languages_arr.join(' ');
                            $language_list_ele.attr('data-original-title', languages_arr);
                            break;
                        }
                    }
                    //触发点击Language 的Confirm按钮
                    $('#route_info .modal-footer button.confirm').trigger('click');
                } else if (res.msg == 'err') {
                    window.location = _setting.login_url;
                }
            }
        });
    });
}

//匹配规则
function isInputRule(c) {
    //var re = /[^u4e00-u9fa5]/; //匹配中文正则
    var re1 = /[#?&=\\]/g; //匹配英文和数字下划线横杠以及点  
    if (!re1.exec(c)) {
        return true; //满足要求
    } else {
        return false; //不满足要求
    }
}

//处理每个站点input的输入，使相同id的站点输入同步
function all_stations_input() {
    var $table = $('#merge_route_info .modal-body .body_table table');
    for (var i = 0; i < $table.length; i++) {
        //循环表
        var row_num = $table.eq(i).find('tbody tr').length; //行数
        var col_num = $table.eq(i).find('thead tr th').length; //列数

        for (var j = 1; j < row_num; j++) {
            var _loop = function _loop() {
                //列
                //站点的ID
                language = $table.eq(i).find('thead tr th').eq(k).text();

                if (language == 'en.US') {
                    return 'continue';
                }
                $cell = $table.eq(i).find('tbody tr').eq(j).find('th').eq(k);

                var station_id = $cell.attr('station_lang_id').trim();
                $cell.find('input').get(0).oninput = function (e) {
                    e.preventDefault();
                    var input_val = $(this).val().trim();
                    //同步输入
                    for (var m = 0; m < $table.length; m++) {
                        if (i == m) {
                            //同一个表格
                            break;
                        } else {
                            //非同一个表格
                            var _row_num = $table.eq(m).find('tbody tr').length; //行数
                            var _col_num = $table.eq(m).find('thead tr th').length; //列数
                            for (var n = 1; n < _row_num; n++) {
                                //行
                                for (var p = 1; p < _col_num; p++) {
                                    //列
                                    //站点的ID
                                    var $cell_ = $table.eq(m).find('tbody tr').eq(n).find('th').eq(p);
                                    var _station_id = $cell_.attr('station_lang_id').trim();
                                    if (station_id == _station_id) {
                                        $cell_.find('input').val(input_val);
                                        break;
                                    }
                                }
                            }
                        }
                    }
                };
            };

            //行
            for (var k = 1; k < col_num; k++) {
                var language;
                var $cell;

                var _ret = _loop();

                if (_ret === 'continue') continue;
            }
        }
    }
}
//文件名输入框
function input_check_fun(_self) {
    var limit_filename_len = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 128;

    var input_check = false; //输入框是否符合要求
    var file_val = $(_self).val().trim(); //输入的文本
    var filename_len = file_val.length; //文件名长度
    if (file_val) {
        //有输入内容
        var timer;
        if (isInputRule(file_val)) {
            if (filename_len >= limit_filename_len) {
                input_check = false; //不符合要求
                clearTimeout(timer);
                $(_self).parent().find('p.err_tip').text('Length less than ' + limit_filename_len).stop(true).fadeIn();
                timer = setTimeout(function () {
                    $(_self).parent().find('p.err_tip').fadeOut();
                }, 3000);
            } else {
                //符合要求
                input_check = true; //符合要求
            }
        } else {
            input_check = false; //不符合要求
            clearTimeout(timer);
            $(_self).parent().find('p.err_tip').text('Unsupported symbol:#?&=\\').stop(true).fadeIn();
            timer = setTimeout(function () {
                $(_self).parent().find('p.err_tip').fadeOut();
            }, 3000);
        }
    } else {
        input_check = false; //不符合要求
        $(_self).parent().find('p.err_tip').text('No empty').fadeIn();
        setTimeout(function () {
            $(_self).parent().find('p.err_tip').fadeOut();
        }, 3000);
    }
    return input_check;
}

module.exports = {
    getDataTable: getDataTable,
    create_list: create_list,
    split_page: split_page,
    init_show: init_show,
    input_check_fun: input_check_fun,
    delete_language: delete_language,
    request_delete_language: request_delete_language
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(10)))

/***/ }),

/***/ 25:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 26:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

var _i18next = __webpack_require__(4);

var _i18next2 = _interopRequireDefault(_i18next);

var _i18nextXhrBackend = __webpack_require__(5);

var _i18nextXhrBackend2 = _interopRequireDefault(_i18nextXhrBackend);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var default_language = 'en_US'; //默认语言
var language = localStorage.getItem('language');
if (language) {
    //如果设置过了
    default_language = language;
    var choose_lang; //选中的语言
    var short_name;
    if (language == 'en_US') {
        choose_lang = 'English';
        short_name = 'EN';
    } else if (language == 'zh_CN') {
        choose_lang = 'simplified_chinese';
        short_name = 'CN';
    } else {
        choose_lang = 'traditional_chinese';
        short_name = 'CN';
    }
    $('#navigation .language_setting a span.language').data('i18n', choose_lang).attr('shortname', short_name);
}
_i18next2.default.use(_i18nextXhrBackend2.default).init({
    lng: default_language, //设置当前翻译的语言
    debug: false, //关闭debug模式
    whitelist: ['en_US', 'zh_CN', 'zh_TW'], //允许的语言列表
    backend: {
        loadPath: '/myroute/locales/{{lng}}.json'
    }
}, function (err, t) {
    // initialized and ready to go!
    updateContent();
});

//监听语言更新,语言变化执行此函数
_i18next2.default.on('languageChanged', function () {
    updateContent();
});

function updateContent() {
    var $i18n = $('[data-i18n]');
    var i18n_lens = $i18n.length;
    for (var i = 0; i < i18n_lens; i++) {
        var i18n_val = $i18n.eq(i).data('i18n');
        i18n_val = _i18next2.default.t(i18n_val);
        var tagName = $i18n.eq(i).get(0).tagName;
        if (tagName == 'INPUT' || tagName == 'TEXTAREA') {
            //针对input 和textarea框的默认显示
            $i18n.eq(i).attr('placeholder', i18n_val);
            var id_name = $i18n.eq(i).attr('id');
            if (id_name == 'register1' || id_name == 'login') {
                $i18n.eq(i).val(i18n_val);
            }
        } else {
            $i18n.eq(i).text(i18n_val);
        }
    }
};

//切换语言
$('#navigation .language_setting ul li').click(function (e) {
    e.stopPropagation();
    var lang = $(this).attr('val');
    var choose = $(this).data('i18n');
    var short_name = $(this).attr('shortname');
    $('#navigation .language_setting a span.language').data('i18n', choose).attr('shortname', short_name);

    _i18next2.default.changeLanguage(lang);
    localStorage.setItem('language', lang); //将所选语言存储在本地浏览器中
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),

/***/ 27:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 3:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["e"] = makeString;
/* harmony export (immutable) */ __webpack_exports__["a"] = copy;
/* harmony export (immutable) */ __webpack_exports__["h"] = setPath;
/* harmony export (immutable) */ __webpack_exports__["f"] = pushPath;
/* harmony export (immutable) */ __webpack_exports__["d"] = getPath;
/* harmony export (immutable) */ __webpack_exports__["b"] = deepExtend;
/* harmony export (immutable) */ __webpack_exports__["g"] = regexEscape;
/* harmony export (immutable) */ __webpack_exports__["c"] = escape;
function makeString(object) {
  if (object == null) return '';
  /* eslint prefer-template: 0 */
  return '' + object;
}

function copy(a, s, t) {
  a.forEach(function (m) {
    if (s[m]) t[m] = s[m];
  });
}

function getLastOfPath(object, path, Empty) {
  function cleanKey(key) {
    return key && key.indexOf('###') > -1 ? key.replace(/###/g, '.') : key;
  }

  function canNotTraverseDeeper() {
    return !object || typeof object === 'string';
  }

  var stack = typeof path !== 'string' ? [].concat(path) : path.split('.');
  while (stack.length > 1) {
    if (canNotTraverseDeeper()) return {};

    var key = cleanKey(stack.shift());
    if (!object[key] && Empty) object[key] = new Empty();
    object = object[key];
  }

  if (canNotTraverseDeeper()) return {};
  return {
    obj: object,
    k: cleanKey(stack.shift())
  };
}

function setPath(object, path, newValue) {
  var _getLastOfPath = getLastOfPath(object, path, Object),
      obj = _getLastOfPath.obj,
      k = _getLastOfPath.k;

  obj[k] = newValue;
}

function pushPath(object, path, newValue, concat) {
  var _getLastOfPath2 = getLastOfPath(object, path, Object),
      obj = _getLastOfPath2.obj,
      k = _getLastOfPath2.k;

  obj[k] = obj[k] || [];
  if (concat) obj[k] = obj[k].concat(newValue);
  if (!concat) obj[k].push(newValue);
}

function getPath(object, path) {
  var _getLastOfPath3 = getLastOfPath(object, path),
      obj = _getLastOfPath3.obj,
      k = _getLastOfPath3.k;

  if (!obj) return undefined;
  return obj[k];
}

function deepExtend(target, source, overwrite) {
  /* eslint no-restricted-syntax: 0 */
  for (var prop in source) {
    if (prop in target) {
      // If we reached a leaf string in target or source then replace with source or skip depending on the 'overwrite' switch
      if (typeof target[prop] === 'string' || target[prop] instanceof String || typeof source[prop] === 'string' || source[prop] instanceof String) {
        if (overwrite) target[prop] = source[prop];
      } else {
        deepExtend(target[prop], source[prop], overwrite);
      }
    } else {
      target[prop] = source[prop];
    }
  }
  return target;
}

function regexEscape(str) {
  /* eslint no-useless-escape: 0 */
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}

/* eslint-disable */
var _entityMap = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': '&quot;',
  "'": '&#39;',
  "/": '&#x2F;'
};
/* eslint-enable */

function escape(data) {
  if (typeof data === 'string') {
    return data.replace(/[&<>"'\/]/g, function (s) {
      return _entityMap[s];
    });
  }

  return data;
}

/***/ }),

/***/ 30:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

var _i18next = __webpack_require__(4);

var _i18next2 = _interopRequireDefault(_i18next);

var _i18nextXhrBackend = __webpack_require__(5);

var _i18nextXhrBackend2 = _interopRequireDefault(_i18nextXhrBackend);

var _functions = __webpack_require__(6);

var _setting = __webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//cloud登录地址

//标记拖拽的功能
var url_json = (0, _functions.parseQueryString)(window.location.href);
var company_id = Number(url_json.uid); //公司id

/**
 * new_company_drag 是否是新增的公司站点拖拽
 * **/
function marker_drag_ev(marker) {
    var new_company_drag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;


    var init_latLng; //拖拽之前初始的经纬度
    var compang_station_index; //表示在拖动的是第几个
    marker.addListener('dragstart', function (e) {
        init_latLng = e.latLng; //将最开始的经纬度位置赋值
        var station_id = this.origin_station_id;
        for (var i = 0; i < window.company_markers.length; i++) {
            var _origin_station_id = window.company_markers[i].origin_station_id;
            if (station_id == _origin_station_id) {
                compang_station_index = i;
                break;
            }
        };
        //滚动条高度
        var td_height = $('#company_stations tbody tr').eq(0).height();
        var scroll_h = td_height * compang_station_index;
        $('#marked_stations .data_box').scrollTop(scroll_h);
        //添加正在拖拽的背景颜色样式
        $('#company_stations tbody tr').eq(compang_station_index).addClass('draggable').siblings().removeClass('draggable');
    });

    marker.addListener('dragend', function (e) {
        //清除正在拖拽的背景颜色样式
        $('#company_stations tbody tr').eq(compang_station_index).removeClass('draggable');
        var station_id = this.station_id; //站点id
        //console.log('初始',station_id)
        var ret_data = (0, _functions.cal_station_id)(company_id, e.latLng, window.company_markers, station_id);
        if (!ret_data) {
            //如果返回false
            var p_tip = '<p class="add_mark_tip">There is a tag that is too small for this tag.</p>';
            $('#place_input').after($(p_tip)).siblings('p.add_mark_tip').animate({ top: 15 }, 1000, function () {
                setTimeout(function () {
                    $('#google_map_box p.add_mark_tip').remove();
                }, 2000);
            });
            this.setPosition(init_latLng); //重新回到之前的位置
        } else {
            //可以放下
            this.setPosition(ret_data.latLng);
            this.station_id = ret_data.station_id;
            //console.log('落下',ret_data.latLng)
            //更新markers和company_markers
            //chosen markers
            var $choose_station = $('#chosen_stations ul.stations_lists li.stations_list');
            for (var i = 0; i < $choose_station.length; i++) {
                var the_chosen_station = $choose_station.eq(i).attr('station_id');
                if (station_id == the_chosen_station) {
                    $choose_station.eq(i).attr('station_id', ret_data.station_id);
                    break;
                }
            }
            for (var i = 0; i < window.markers.length; i++) {
                var _station_id = window.markers[i].station_id;
                if (station_id == _station_id) {
                    window.markers[i].station_id = ret_data.station_id;
                    window.markers[i].setPosition(ret_data.latLng);
                    break;
                }
            }
            //更新Company station
            for (var i = 0; i < window.company_markers.length; i++) {
                var _station_id2 = window.company_markers[i].station_id;
                if (station_id == _station_id2) {
                    window.company_markers[i].station_id = ret_data.station_id;
                    window.company_markers[i].setPosition(ret_data.latLng);
                    break;
                }
            }
            draw_line(false);
            //修改公司站点的station_id、经纬度
            if (new_company_drag) {
                //新增公司的站点，改变其station_id
                $.ajax({
                    url: '/myroute/company_drag_station',
                    type: 'post',
                    data: {
                        origin_station_id: station_id,
                        station_id: ret_data.station_id,
                        latLng: ret_data.latLng
                    },
                    success: function success(res) {
                        if (res.msg === 'err') {
                            window.location.reload();
                        } else if (res.msg === 'no') {
                            window.location = _setting.login_url;
                        } else if (res.msg == 'ok') {
                            var $table_tr = $('#company_stations tbody tr');
                            for (var i = 0; i < $table_tr.length; i++) {
                                var _station_id3 = $table_tr.eq(i).attr('station_id');
                                if (station_id == _station_id3) {
                                    $table_tr.eq(i).attr('station_id', ret_data.station_id);
                                    $table_tr.eq(i).find('td.station_addr').text(ret_data.latLng.lat + '\/' + ret_data.latLng.lng).attr('title', ret_data.latLng.lat + ',' + ret_data.latLng.lng);
                                    break;
                                }
                            }
                            for (var i = 0; i < window.company_markers.length; i++) {
                                var _station_id4 = window.company_markers[i].station_id;
                                if (ret_data.station_id == _station_id4) {
                                    window.company_markers[i].origin_station_id = ret_data.station_id;
                                    break;
                                }
                            }
                        }
                    }
                });
            } else {
                var save_val = _i18next2.default.t('UnSaved');
                $('.home span.save_tip').removeClass('saved').attr('data-i18n', 'UnSaved').text(save_val);
            }
        }
    });

    //点击该marker
    marker.addListener('click', function (e) {
        var station_id = this.origin_station_id;
        for (var i = 0; i < window.company_markers.length; i++) {
            var _origin_station_id = window.company_markers[i].origin_station_id;
            if (station_id == _origin_station_id) {
                //滚动条高度
                var td_height = $('#company_stations tbody tr').eq(0).height();
                var scroll_h = td_height * i;
                $('#marked_stations .data_box').scrollTop(scroll_h);
                //添加正在拖拽的背景颜色样式
                $('#company_stations tbody tr').eq(i).addClass('draggable').siblings().removeClass('draggable');
                break;
            }
        };
    });
}

var bounds = new google.maps.LatLngBounds(); //缩放对象
var flightPath = new google.maps.Polyline({ //多线段
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2
});;

//所有标记设置最佳视野，并画折线
//参数是否允许缩放
function draw_line() {
    var expand = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

    //按照Choosen Station顺序排列
    var $choose_station = $('#chosen_stations ul.stations_lists li.stations_list');
    if ($choose_station.length == 0) {
        return;
    }
    for (var i = 0; i < $choose_station.length; i++) {
        var station_id = Number($choose_station.eq(i).attr('station_id'));
        var station_index = i + 1; //站点序号
        if (station_index > 999) {
            station_index = 999 + '+';
        }
        $choose_station.eq(i).find('span.station_num').text(station_index);
        for (var j = 0; j < window.markers.length; j++) {
            var li_station_id = Number(window.markers[j].station_id);
            if (li_station_id == station_id) {
                var marker = window.markers[j];
                window.markers.splice(j, 1); //删除本身自己的这个
                window.markers.splice(i, 0, marker);
                break;
            }
        }
    };
    //画折线
    var Path = []; //路线
    for (var i = 0; i < window.markers.length; i++) {
        var lat = parseInt(markers[i].position.lat() * 1000000) / 1000000;
        var lng = parseInt(markers[i].position.lng() * 1000000) / 1000000;
        var latlng = {
            lat: lat,
            lng: lng
        };
        Path.push(latlng);
    }
    flightPath.setPath(Path);
    flightPath.setMap(null);
    flightPath.setMap(map);

    /* if(window.markers.length < 2){ //一个以上标记才缩放
        return;
    } */
    //设置最佳缩放级别
    for (var i = 0; i < window.markers.length; i++) {
        bounds.extend(window.markers[i].getPosition());
        //更改标记图标
        var marker_num = i + 1; //标记的数字序号
        if (marker_num > 99) {
            marker_num = '99+';
        } else {
            marker_num = marker_num.toString();
        }
        window.markers[i].setLabel(marker_num);
        if (i === window.markers.length - 1) {
            window.markers[i].setIcon({
                url: '/myroute/libs/images/station_stop.png'
            });
        } else if (i === 0) {
            window.markers[i].setIcon({
                url: '/myroute/libs/images/station_start.png'
            });
        } else {
            window.markers[i].setIcon({
                url: '/myroute/libs/images/middle_station.png'
            });
        }
    }
    if (expand) {
        window.map.fitBounds(bounds);
    }
}

module.exports = {
    marker_drag_ev: marker_drag_ev,
    draw_line: draw_line
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),

/***/ 31:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

var _functions = __webpack_require__(6);

var _setting = __webpack_require__(7);

//cloud登录地址


//验证通过才能登录到主页面，验证

var url = window.location.href; //连接
var result_parmas = (0, _functions.parseQueryString)(url);
var username = result_parmas.uname; //用户名
var sz = result_parmas.sz; //服务区名称
var uid = Number(result_parmas.uid); //帐号ID
var salt = result_parmas.salt; //随机字符串
var utc = result_parmas.utc; //当前时间戳
var unlock = result_parmas.unlock; //验证解锁

//http://localhost:55566/myroute/index.html?sz=TPDQATEST&uid=1&uname=funtoro&salt=yHW79G&utc=1509929143&unlock=C119D7EE5E8BC391A7F6DF997E8D541F&fullname=funtoro&auth=http://210.65.11.102/tpdqatest/ums/authmyid.php
//http://localhost:55566/myroute/index.html?sz=TPDQATEST&uid=100&uname=funtoro&salt=yHW79G&utc=1509929143&unlock=DF55B0D3D9ABCF13D4D231B1038FCEDB&fullname=funtoro&auth=http://210.65.11.102/tpdqatest/ums/authmyid.php
//http://localhost:55566/myroute/index.html?sz=KSTEST&uid=1&uname=admin&salt=DluWwJ&utc=1508294733&unlock=34015270C773A8A99544D19A96C27582&fullname=admin&auth=http://210.65.11.102/tpdqatest/ums/authmyid.php
//xml主页登录验证
var login_check = function login_check(callback1, callback2) {
    var fullname = result_parmas.fullname; //全名
    if (username && fullname && sz && uid && salt && utc && unlock) {
        $.ajax({
            url: '/myroute/to_login_check',
            type: 'post',
            data: {
                username: username, sz: sz, uid: uid, utc: utc, salt: salt, unlock: unlock
            },
            success: function success(res, status) {
                if (res.msg == 'noRight') {
                    //验证不通过
                    alert('you have no right.');
                    window.location.href = _setting.login_url;
                    //跳转登录页面
                } else if (res.msg == 'ok') {
                    //通过
                    //通过后去获取xml数据信息
                    //del_data.getDataTable();
                    $('#navigation .login_status span.username').text(username);

                    //验证用户是否登录
                    if (typeof callback1 == 'function') {
                        callback1(sz, username, callback2);
                    }
                }
            }
        });
    } else {
        window.location.href = _setting.login_url;
    }
};

//点击登出操作
var login_out = function login_out() {
    //点击登出按钮
    $('#navigation .login_status ul li.login_out').click(function (e) {
        e.stopPropagation();
        $('#zhezhao').fadeIn(1);
        $.ajax({
            url: '/myroute/user_login_out',
            type: 'post',
            data: {},
            success: function success(res) {
                //window.location=login_url;
                window.location = _setting.login_url;
            }
        });
    });
};

module.exports = {
    login_check: login_check,
    login_out: login_out
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),

/***/ 32:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

//根据经纬度搜索城市地名
//API:  http://maps.google.cn/maps/api/geocode/json?latlng=30.603487,114.492305&language=CN


/** 根据经纬度搜索地名
 * 参数1 为经纬度的参数
 * 参数2 为搜索的语言
 * **/
//var api_url='http://maps.google.cn/maps/api/geocode/json?'; 
var api_url = 'http://ditu.google.cn/maps/api/geocode/json?';
function search_place(latlng) {
    var language = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'EN';

    var lat = latlng.lat; //纬度
    var lng = latlng.lng; //经度
    var detail_address = ''; //详细地址
    return new Promise(function (resolve, reject) {
        $('#zhezhao').fadeIn(1);
        getLocation();
        //请求数据
        function getLocation() {
            $.ajax({
                url: api_url + "latlng=" + lat + "," + lng + "&language=" + language,
                type: 'get',
                dataType: 'json',
                success: function success(res) {
                    $('#zhezhao').fadeOut(1);
                    if (res.status == 'OK') {
                        var results = res.results[0].address_components; //返回的数组结果
                        var result_len = results.length;
                        for (var i = result_len - 1; i >= 0; i--) {
                            var types = results[i].types;
                            if (types.indexOf('country') != -1) {
                                detail_address += results[i].long_name;
                            } else if (types.indexOf('administrative_area_level_1') != -1) {
                                detail_address += ',' + results[i].long_name;
                            } else if (types.indexOf('locality') != -1) {
                                detail_address += ',' + results[i].long_name;
                            }
                        };
                        resolve(detail_address);
                    } else {
                        //reject('err');
                        //如果请求不到数据就再次请求
                        getLocation();
                    }
                }
            });
        }
    });
}

/**
 * 根据地名搜索经纬度**/
function search_latlng(place) {
    var language = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'EN';

    var latLng = {}; //经纬度

    return new Promise(function (resolve, reject) {
        $('#zhezhao').fadeIn(1);
        getLat_lng();
        function getLat_lng() {
            $.ajax({
                url: api_url + "address=" + place + "&language=" + language,
                type: 'get',
                dataType: 'json',
                success: function success(res) {
                    $('#zhezhao').fadeOut(1);
                    if (res.status == 'OK') {
                        var results = res.results; //返回的数组结果
                        for (var i = 0; i < results.length; i++) {
                            var types = results[i].types;
                            if (types.indexOf('university') != -1) {
                                latLng = {
                                    lat: results[i].geometry.location.lat,
                                    lng: results[i].geometry.location.lng
                                };
                                resolve(latLng);
                                break;
                            } else if (types.indexOf('sublocality_level_1') != -1) {
                                latLng = {
                                    lat: results[i].geometry.location.lat,
                                    lng: results[i].geometry.location.lng
                                };
                                resolve(latLng);
                                break;
                            } else if (types.indexOf('locality') != -1 || types.indexOf('administrative_area_level_2') != -1) {
                                //是城市
                                latLng = {
                                    lat: results[i].geometry.location.lat,
                                    lng: results[i].geometry.location.lng
                                };
                                resolve(latLng);
                                break;
                            } else if (types.indexOf('administrative_area_level_1') != -1) {
                                latLng = {
                                    lat: results[i].geometry.location.lat,
                                    lng: results[i].geometry.location.lng
                                };
                                resolve(latLng);
                                break;
                            } else if (types.indexOf('country') != -1) {
                                latLng = {
                                    lat: results[i].geometry.location.lat,
                                    lng: results[i].geometry.location.lng
                                };
                                resolve(latLng);
                                break;
                            } else {
                                //非城市
                                continue;
                            }
                        }
                    } else {
                        //reject('err');
                        getLat_lng();
                    }
                }
            });
        }
    });
}

module.exports = {
    search_place: search_place,
    search_latlng: search_latlng
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),

/***/ 33:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//这个构造器能获取此对象到地图盒子的绝对距离
function ContextMenu(map, options) {
	var obj = {};
	this.setMap(map);
	this.map_ = map;
	this.mapDiv_ = map.getDiv();
}

ContextMenu.prototype = new google.maps.OverlayView();

ContextMenu.prototype.draw = function () {
	if (this.isVisible_) {
		var mapSize = new google.maps.Size(this.mapDiv_.offsetWidth, this.mapDiv_.offsetHeight);
		var menuSize = new google.maps.Size(this.menu_.offsetWidth, this.menu_.offsetHeight);
		var mousePosition = this.getProjection().fromLatLngToDivPixel(this.position_);

		var left = mousePosition.x;
		var top = mousePosition.y;

		if (mousePosition.x > mapSize.width - menuSize.width - this.pixelOffset.x) {
			left = left - menuSize.width - this.pixelOffset.x;
		} else {
			left += this.pixelOffset.x;
		}

		if (mousePosition.y > mapSize.height - menuSize.height - this.pixelOffset.y) {
			top = top - menuSize.height - this.pixelOffset.y;
		} else {
			top += this.pixelOffset.y;
		}

		this.menu_.style.left = left + 'px';
		this.menu_.style.top = top + 'px';
	} /* 
   this.map_.addListener('bounds_changed',function(e){
   }); */
};

//将谷歌地图的经纬度转为对象像素
var fromLatLngToPixel = function fromLatLngToPixel(position, map) {
	var scale = Math.pow(2, map.getZoom());
	var proj = map.getProjection();
	var bounds = map.getBounds();
	var nw = proj.fromLatLngToPoint(new google.maps.LatLng(bounds.getNorthEast().lat(), bounds.getSouthWest().lng()));
	var point = proj.fromLatLngToPoint(position);
	return new google.maps.Point(Math.floor((point.x - nw.x) * scale), Math.floor((point.y - nw.y) * scale));
	//{x: 17, y: 38}
};

//将谷歌地图的对象像素转为经纬度
var fromPixelToLatLng = function fromPixelToLatLng(pixel, map) {
	var scale = Math.pow(2, Map.getZoom());
	var proj = Map.getProjection();
	var bounds = Map.getBounds();
	var nw = proj.fromLatLngToPoint(new google.maps.LatLng(bounds.getNorthEast().lat(), bounds.getSouthWest().lng()));
	var point = new google.maps.Point();
	point.x = pixel.x / scale + nw.x;
	point.y = pixel.y / scale + nw.y;
	return proj.fromPointToLatLng(point);
};

module.exports = {
	ContextMenu: ContextMenu,
	fromLatLngToPixel: fromLatLngToPixel,
	fromPixelToLatLng: fromPixelToLatLng
};

/***/ }),

/***/ 4:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeLanguage", function() { return changeLanguage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cloneInstance", function() { return cloneInstance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createInstance", function() { return createInstance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dir", function() { return dir; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "exists", function() { return exists; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFixedT", function() { return getFixedT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "init", function() { return init; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadLanguages", function() { return loadLanguages; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadNamespaces", function() { return loadNamespaces; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadResources", function() { return loadResources; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "off", function() { return off; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "on", function() { return on; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setDefaultNamespace", function() { return setDefaultNamespace; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "t", function() { return t; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "use", function() { return use; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__i18next_js__ = __webpack_require__(11);


/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__i18next_js__["a" /* default */]);

var changeLanguage = __WEBPACK_IMPORTED_MODULE_0__i18next_js__["a" /* default */].changeLanguage.bind(__WEBPACK_IMPORTED_MODULE_0__i18next_js__["a" /* default */]);
var cloneInstance = __WEBPACK_IMPORTED_MODULE_0__i18next_js__["a" /* default */].cloneInstance.bind(__WEBPACK_IMPORTED_MODULE_0__i18next_js__["a" /* default */]);
var createInstance = __WEBPACK_IMPORTED_MODULE_0__i18next_js__["a" /* default */].createInstance.bind(__WEBPACK_IMPORTED_MODULE_0__i18next_js__["a" /* default */]);
var dir = __WEBPACK_IMPORTED_MODULE_0__i18next_js__["a" /* default */].dir.bind(__WEBPACK_IMPORTED_MODULE_0__i18next_js__["a" /* default */]);
var exists = __WEBPACK_IMPORTED_MODULE_0__i18next_js__["a" /* default */].exists.bind(__WEBPACK_IMPORTED_MODULE_0__i18next_js__["a" /* default */]);
var getFixedT = __WEBPACK_IMPORTED_MODULE_0__i18next_js__["a" /* default */].getFixedT.bind(__WEBPACK_IMPORTED_MODULE_0__i18next_js__["a" /* default */]);
var init = __WEBPACK_IMPORTED_MODULE_0__i18next_js__["a" /* default */].init.bind(__WEBPACK_IMPORTED_MODULE_0__i18next_js__["a" /* default */]);
var loadLanguages = __WEBPACK_IMPORTED_MODULE_0__i18next_js__["a" /* default */].loadLanguages.bind(__WEBPACK_IMPORTED_MODULE_0__i18next_js__["a" /* default */]);
var loadNamespaces = __WEBPACK_IMPORTED_MODULE_0__i18next_js__["a" /* default */].loadNamespaces.bind(__WEBPACK_IMPORTED_MODULE_0__i18next_js__["a" /* default */]);
var loadResources = __WEBPACK_IMPORTED_MODULE_0__i18next_js__["a" /* default */].loadResources.bind(__WEBPACK_IMPORTED_MODULE_0__i18next_js__["a" /* default */]);
var off = __WEBPACK_IMPORTED_MODULE_0__i18next_js__["a" /* default */].off.bind(__WEBPACK_IMPORTED_MODULE_0__i18next_js__["a" /* default */]);
var on = __WEBPACK_IMPORTED_MODULE_0__i18next_js__["a" /* default */].on.bind(__WEBPACK_IMPORTED_MODULE_0__i18next_js__["a" /* default */]);
var setDefaultNamespace = __WEBPACK_IMPORTED_MODULE_0__i18next_js__["a" /* default */].setDefaultNamespace.bind(__WEBPACK_IMPORTED_MODULE_0__i18next_js__["a" /* default */]);
var t = __WEBPACK_IMPORTED_MODULE_0__i18next_js__["a" /* default */].t.bind(__WEBPACK_IMPORTED_MODULE_0__i18next_js__["a" /* default */]);
var use = __WEBPACK_IMPORTED_MODULE_0__i18next_js__["a" /* default */].use.bind(__WEBPACK_IMPORTED_MODULE_0__i18next_js__["a" /* default */]);

/***/ }),

/***/ 46:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

//对表格进行过滤功能

function filterTable() {
    //清除选中样式并显示
    $('#marked_stations .search_data input.filter').val('');
    $('#marked_stations tbody tr').fadeIn(1).find('td').removeClass('filter');

    //监听输入内容
    $('#marked_stations .search_data input.filter').get(0).oninput = function (e) {
        e.preventDefault();
        var inp_val = $(this).val().trim().toLowerCase();
        if (inp_val) {
            //有内容
            $('#marked_stations .search_data i.clear_text').fadeIn(1);
            var $tbody_tr = $('#marked_stations tbody tr');
            for (var i = 0; i < $tbody_tr.length; i++) {
                if ($tbody_tr.eq(i).text().toLowerCase().indexOf(inp_val) != -1) {
                    //如果搜索到了
                    $tbody_tr.eq(i).fadeIn(1).addClass('isShow'); //显示
                    var $tbody_tr_td = $tbody_tr.eq(i).children('td');
                    for (var j = 0; j < $tbody_tr_td.length; j++) {
                        var td_text = $tbody_tr_td.eq(j).text().trim().toLowerCase();
                        if (td_text.indexOf(inp_val) != -1) {
                            $tbody_tr_td.eq(j).addClass('filter');
                        } else {
                            $tbody_tr_td.eq(j).removeClass('filter');
                        }
                    }
                } else {
                    $tbody_tr.eq(i).fadeOut(1).removeClass('isShow'); //隐藏
                }
            }
            //获取搜索到的结果条数
            var showNum = $('#marked_stations tbody tr.isShow').length;
            $('#search_station_numbers').text(showNum);
            //console.log(showNum)
            if (showNum === 0) {
                //表格没有数据时显示没有搜到结果
                $('#company_stations tfoot').fadeIn(1);
            } else {
                $('#company_stations tfoot').fadeOut(1);
            }
        } else {
            $('#marked_stations .search_data i.clear_text').fadeOut(1);
            $('#marked_stations tbody tr').fadeIn(1).find('td').removeClass('filter');
        }
    };
    /* //使用的
    $('#chosen_stations .search_data input.filter').get(0).oninput=function(e){
        e.preventDefault();
        var inp_val=$(this).val().trim().toLowerCase();
        if(inp_val){  //有内容
            $('#chosen_stations .search_data i.clear_text').fadeIn(1);
            var $tbody_tr= $('#chosen_stations tbody tr');
            for(var i=0; i<$tbody_tr.length; i++){
                if($tbody_tr.eq(i).text().toLowerCase().indexOf(inp_val)!= -1){ //如果搜索到了
                    $tbody_tr.eq(i).fadeIn(1).addClass('isShow');  //显示
                    var $tbody_tr_td=$tbody_tr.eq(i).children('td');
                    for(var j=0; j<$tbody_tr_td.length; j++){
                        var td_text=$tbody_tr_td.eq(j).text().trim().toLowerCase();
                        if(td_text.indexOf(inp_val)!= -1 ){
                            $tbody_tr_td.eq(j).addClass('filter');
                        }else{
                            $tbody_tr_td.eq(j).removeClass('filter');
                        }
                    }
                }else{
                    $tbody_tr.eq(i).fadeOut(1).removeClass('isShow');  //隐藏
                }
            }
            //获取搜索到的结果条数
            var showNum = $('#chosen_stations tbody tr.isShow').length;
            $('#pageShow .info_show span.total').text(showNum);
            //console.log(showNum)
            if(showNum == 0){  //表格没有数据时显示没有搜到结果
                $('#company_stations tfoot').fadeIn(1);
            }else{
                $('#company_stations tfoot').fadeOut(1);
            }
        }else{
            $('#chosen_stations .search_data i.clear_text').fadeOut(1);
            $('#chosen_stations tbody tr').fadeIn(1)
            .find('td').removeClass('filter');
        }
    }; */
    //点击表格输入框叉叉
    $('#marked_stations .search_data i.clear_text').unbind('click');
    $('#marked_stations .search_data i.clear_text').bind('click', function (e) {
        e.stopPropagation();
        $('#marked_stations .search_data input.filter').val('');
        $('#marked_stations .search_data i.clear_text').fadeOut(1);
        $('#marked_stations tbody tr').fadeIn(1).find('td').removeClass('filter');
        //数据原本条数
        var showNum = $('#marked_stations tbody tr').length;
        $('#search_station_numbers').text(showNum);
        if (showNum == 0) {
            //表格没有数据时显示没有搜到结果
            $('#company_stations tfoot').fadeIn(1);
        } else {
            $('#company_stations tfoot').fadeOut(1);
        }
    });
    //点击表格中的搜索图标按钮
    /*  $('#marked_stations .search_data i.serach').click(function(e){
         e.stopPropagation();
         var inp_val=$('#marked_stations .search_data input.filter').val().trim();
         if(inp_val){
             window.my_company_stations.get_company_station(my_company_stations.nums_limit,1, inp_val);
         }
     }); */
};

function Used_stations_filter() {
    //清除选中样式并显示
    $('#chosen_stations .search_data input.filter').val('');
    $('#chosen_stations tbody tr').fadeIn(1).find('td').removeClass('filter');

    //监听输入内容
    $('#chosen_stations .search_data input.filter').get(0).oninput = function (e) {
        e.preventDefault();
        var inp_val = $(this).val().trim().toLowerCase();
        if (inp_val) {
            //有内容
            $('#chosen_stations .search_data i.clear_text').fadeIn(1);
            var $tbody_tr = $('#chosen_stations tbody tr');
            for (var i = 0; i < $tbody_tr.length; i++) {
                if ($tbody_tr.eq(i).text().toLowerCase().indexOf(inp_val) != -1) {
                    //如果搜索到了
                    $tbody_tr.eq(i).fadeIn(1).addClass('isShow'); //显示
                    var $tbody_tr_td = $tbody_tr.eq(i).children('td');
                    for (var j = 0; j < $tbody_tr_td.length; j++) {
                        var td_text = $tbody_tr_td.eq(j).text().trim().toLowerCase();
                        if (td_text.indexOf(inp_val) != -1) {
                            $tbody_tr_td.eq(j).addClass('filter');
                        } else {
                            $tbody_tr_td.eq(j).removeClass('filter');
                        }
                    }
                } else {
                    $tbody_tr.eq(i).fadeOut(1).removeClass('isShow'); //隐藏
                }
            }
            //获取搜索到的结果条数
            var showNum = $('#chosen_stations tbody tr.isShow').length;
            $('#search_route_numbers').text(showNum);
            //console.log(showNum)
            if (showNum === 0) {
                //表格没有数据时显示没有搜到结果
                $('#company_used_stations tfoot').fadeIn(1);
            } else {
                $('#company_used_stations tfoot').fadeOut(1);
            }
        } else {
            $('#chosen_stations .search_data i.clear_text').fadeOut(1);
            $('#chosen_stations tbody tr').fadeIn(1).find('td').removeClass('filter');
        }
    };
    //点击表格输入框叉叉
    $('#chosen_stations .search_data i.clear_text').unbind('click');
    $('#chosen_stations .search_data i.clear_text').bind('click', function (e) {
        e.stopPropagation();
        $('#chosen_stations .search_data input.filter').val('');
        $('#chosen_stations .search_data i.clear_text').fadeOut(1);
        $('#chosen_stations tbody tr').fadeIn(1).find('td').removeClass('filter');
        //数据原本条数
        var showNum = $('#chosen_stations tbody tr').length;
        $('#search_route_numbers').text(showNum);
        if (showNum == 0) {
            //表格没有数据时显示没有搜到结果
            $('#company_used_stations tfoot').fadeIn(1);
        } else {
            $('#company_used_stations tfoot').fadeOut(1);
        }
    });
}

module.exports = {
    filterTable: filterTable,
    Used_stations_filter: Used_stations_filter
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),

/***/ 47:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 解压拼音库。
// @param {Object} dict_combo, 压缩的拼音库。
// @param {Object} 解压的拼音库。
function buildPinyinCache(dict_combo){
  let hans;
  let uncomboed = {};

  for(let py in dict_combo){
    hans = dict_combo[py];
    for(let i = 0, han, l = hans.length; i < l; i++){
      han = hans.charCodeAt(i);
      if(!uncomboed.hasOwnProperty(han)){
        uncomboed[han] = py;
      }else{
        uncomboed[han] += "," + py;
      }
    }
  }

  return uncomboed;
}

const PINYIN_DICT = buildPinyinCache(__webpack_require__(48));
const Pinyin = __webpack_require__(49);
const pinyin = new Pinyin(PINYIN_DICT);

module.exports = pinyin.convert.bind(pinyin);
module.exports.compare = pinyin.compare.bind(pinyin);
module.exports.STYLE_NORMAL = Pinyin.STYLE_NORMAL;
module.exports.STYLE_TONE = Pinyin.STYLE_TONE;
module.exports.STYLE_TONE2 = Pinyin.STYLE_TONE2;
module.exports.STYLE_TO3NE = Pinyin.STYLE_TO3NE;
module.exports.STYLE_INITIALS = Pinyin.STYLE_INITIALS;
module.exports.STYLE_FIRST_LETTER = Pinyin.STYLE_FIRST_LETTER;


/***/ }),

/***/ 48:
/***/ (function(module, exports) {

module.exports = {
"èr":"二贰",
"shí":"十时实蚀",
"yǐ":"乙已以蚁倚",
"yī":"一衣医依伊揖壹",
"chǎng,ān,hàn":"厂",
"dīng,zhēng":"丁",
"qī":"七戚欺漆柒凄嘁",
"bǔ,bo":"卜",
"rén":"人仁",
"rù":"入褥",
"jiǔ":"九久酒玖灸韭",
"ér":"儿而",
"bā":"八巴疤叭芭捌笆",
"jǐ,jī":"几",
"le,liǎo":"了",
"lì":"力历厉立励利例栗粒吏沥荔俐莉砾雳痢",
"dāo":"刀",
"nǎi":"乃奶",
"sān":"三叁",
"yòu":"又右幼诱佑",
"yú":"于余鱼娱渔榆愚隅逾舆",
"shì":"士示世市式势事侍饰试视柿是适室逝释誓拭恃嗜",
"gān,gàn":"干",
"gōng":"工弓公功攻宫恭躬",
"kuī":"亏盔窥",
"tǔ":"土",
"cùn":"寸",
"dà,dài,tài":"大",
"cái":"才材财裁",
"xià":"下夏",
"zhàng":"丈仗帐胀障杖账",
"yǔ,yù,yú":"与",
"shàng,shǎng":"上",
"wàn,mò":"万",
"kǒu":"口",
"xiǎo":"小晓",
"jīn":"巾斤今金津筋襟",
"shān":"山删衫珊",
"qiān":"千迁牵谦签",
"qǐ":"乞企启起",
"chuān":"川穿",
"gè,gě":"个各",
"sháo":"勺芍",
"yì":"亿义艺忆议亦异役译易疫益谊意毅翼屹抑邑绎奕逸肄溢",
"jí":"及吉级极即急疾集籍棘辑嫉",
"fán":"凡烦矾樊",
"xī":"夕西吸希析牺息悉惜稀锡溪熄膝昔晰犀熙嬉蟋",
"wán":"丸完玩顽",
"me,mó,ma,yāo":"么",
"guǎng,ān":"广",
"wáng,wú":"亡",
"mén":"门们",
"shī":"尸失师诗狮施湿虱",
"zhī":"之支汁芝肢脂蜘",
"jǐ":"己挤脊",
"zǐ":"子紫姊籽滓",
"wèi":"卫未位味畏胃喂慰谓猬蔚魏",
"yě":"也冶野",
"nǚ,rǔ":"女",
"rèn":"刃认韧纫",
"fēi":"飞非啡",
"xí":"习席袭媳",
"mǎ":"马码玛",
"chā,chá,chǎ":"叉",
"fēng":"丰封疯峰锋蜂枫",
"xiāng":"乡香箱厢湘镶",
"jǐng":"井警阱",
"wáng,wàng":"王",
"kāi":"开揩",
"tiān":"天添",
"wú":"无吴芜梧蜈",
"fū,fú":"夫",
"zhuān":"专砖",
"yuán":"元园原圆援缘源袁猿辕",
"yún":"云匀耘",
"zhā,zā,zhá":"扎",
"mù":"木目牧墓幕暮慕沐募睦穆",
"wǔ":"五午伍武侮舞捂鹉",
"tīng":"厅听",
"bù,fǒu":"不",
"qū,ōu":"区",
"quǎn":"犬",
"tài":"太态泰汰",
"yǒu":"友",
"chē,jū":"车",
"pǐ":"匹",
"yóu":"尤由邮犹油游",
"jù":"巨拒具俱剧距惧锯聚炬",
"yá":"牙芽崖蚜涯衙",
"bǐ":"比彼笔鄙匕秕",
"jiē":"皆阶接街秸",
"hù":"互户护沪",
"qiè,qiē":"切",
"wǎ,wà":"瓦",
"zhǐ":"止旨址纸指趾",
"tún,zhūn":"屯",
"shǎo,shào":"少",
"rì":"日",
"zhōng,zhòng":"中",
"gāng":"冈刚纲缸肛",
"nèi,nà":"内",
"bèi":"贝备倍辈狈惫焙",
"shuǐ":"水",
"jiàn,xiàn":"见",
"niú":"牛",
"shǒu":"手守首",
"máo":"毛矛茅锚",
"qì":"气弃汽器迄泣",
"shēng":"升生声牲笙甥",
"cháng,zhǎng":"长",
"shén,shí":"什",
"piàn,piān":"片",
"pú,pū":"仆",
"huà,huā":"化",
"bì":"币必毕闭毙碧蔽弊避壁庇蓖痹璧",
"chóu,qiú":"仇",
"zhuǎ,zhǎo":"爪",
"jǐn,jìn":"仅",
"réng":"仍",
"fù,fǔ":"父",
"cóng,zòng":"从",
"fǎn":"反返",
"jiè":"介戒届界借诫",
"xiōng":"凶兄胸匈汹",
"fēn,fèn":"分",
"fá":"乏伐罚阀筏",
"cāng":"仓苍舱沧",
"yuè":"月阅悦跃越岳粤",
"shì,zhī":"氏",
"wù":"勿务物误悟雾坞晤",
"qiàn":"欠歉",
"fēng,fěng":"风",
"dān":"丹耽",
"wū":"乌污呜屋巫诬",
"fèng":"凤奉",
"gōu,gòu":"勾",
"wén":"文闻蚊",
"liù,lù":"六",
"huǒ":"火伙",
"fāng":"方芳",
"dǒu,dòu":"斗",
"wèi,wéi":"为",
"dìng":"订定锭",
"jì":"计记技忌际季剂迹既继寄绩妓荠寂鲫冀",
"xīn":"心辛欣新薪锌",
"chǐ,chě":"尺",
"yǐn":"引饮蚓瘾",
"chǒu":"丑",
"kǒng":"孔恐",
"duì":"队对",
"bàn":"办半扮伴瓣绊",
"yǔ,yú":"予",
"yǔn":"允陨",
"quàn":"劝",
"shū":"书叔殊梳舒疏输蔬抒枢淑",
"shuāng":"双霜",
"yù":"玉育狱浴预域欲遇御裕愈誉芋郁喻寓豫",
"huàn":"幻换唤患宦涣焕痪",
"kān":"刊堪勘",
"mò":"末沫漠墨默茉陌寞",
"jī":"击饥圾机肌鸡积基激讥叽唧畸箕",
"dǎ,dá":"打",
"qiǎo":"巧",
"zhèng,zhēng":"正症挣",
"pū":"扑",
"bā,pá":"扒",
"gān":"甘肝竿柑",
"qù":"去",
"rēng":"扔",
"gǔ":"古谷股鼓",
"běn":"本",
"jié,jiē":"节结",
"shù,shú,zhú":"术",
"bǐng":"丙柄饼秉禀",
"kě,kè":"可",
"zuǒ":"左",
"bù":"布步怖部埠",
"shí,dàn":"石",
"lóng":"龙聋隆咙胧窿",
"yà":"轧亚讶",
"miè":"灭蔑",
"píng":"平评凭瓶萍坪",
"dōng":"东冬",
"kǎ,qiǎ":"卡",
"běi,bèi":"北",
"yè":"业页夜液谒腋",
"jiù":"旧救就舅臼疚",
"shuài":"帅蟀",
"guī":"归规闺硅瑰",
"zhàn,zhān":"占",
"dàn":"旦但诞淡蛋氮",
"qiě,jū":"且",
"yè,xié":"叶",
"jiǎ":"甲钾",
"dīng":"叮盯",
"shēn":"申伸身深呻绅",
"hào,háo":"号",
"diàn":"电店垫殿玷淀惦奠",
"tián":"田甜恬",
"shǐ":"史使始驶矢屎",
"zhī,zhǐ":"只",
"yāng":"央殃秧鸯",
"diāo":"叼雕刁碉",
"jiào":"叫轿较窖酵",
"lìng":"另",
"dāo,tāo":"叨",
"sì":"四寺饲肆",
"tàn":"叹炭探碳",
"qiū":"丘秋蚯",
"hé":"禾河荷盒",
"fù":"付负妇附咐赴复傅富腹覆赋缚",
"dài":"代带贷怠袋逮戴",
"xiān":"仙先掀锨",
"yí":"仪宜姨移遗夷胰",
"bái":"白",
"zǎi,zǐ,zī":"仔",
"chì":"斥赤翅",
"tā":"他它塌",
"guā":"瓜刮",
"hū":"乎呼忽",
"cóng":"丛",
"lìng,líng,lǐng":"令",
"yòng":"用",
"shuǎi":"甩",
"yìn":"印",
"lè,yuè":"乐",
"jù,gōu":"句",
"cōng":"匆葱聪囱",
"fàn":"犯饭泛范贩",
"cè":"册厕测策",
"wài":"外",
"chù,chǔ":"处",
"niǎo":"鸟",
"bāo":"包胞苞褒",
"zhǔ":"主煮嘱拄",
"shǎn":"闪陕",
"lán":"兰拦栏蓝篮澜",
"tóu,tou":"头",
"huì":"汇绘贿惠慧讳诲晦秽",
"hàn":"汉旱捍悍焊撼翰憾",
"tǎo":"讨",
"xué":"穴学",
"xiě":"写",
"níng,nìng,zhù":"宁",
"ràng":"让",
"lǐ":"礼李里理鲤",
"xùn":"训讯迅汛驯逊殉",
"yǒng":"永咏泳勇蛹踊",
"mín":"民",
"chū":"出初",
"ní":"尼",
"sī":"司丝私斯撕嘶",
"liáo":"辽疗僚聊寥嘹缭",
"jiā":"加佳嘉枷",
"nú":"奴",
"zhào,shào":"召",
"biān":"边编鞭蝙",
"pí":"皮疲脾啤",
"yùn":"孕运韵酝蕴",
"fā,fà":"发",
"shèng":"圣胜剩",
"tái,tāi":"台苔",
"jiū":"纠究揪鸠",
"mǔ":"母亩牡拇姆",
"káng,gāng":"扛",
"xíng":"刑形型邢",
"dòng":"动冻栋洞",
"kǎo":"考烤拷",
"kòu":"扣寇",
"tuō":"托拖脱",
"lǎo":"老",
"gǒng":"巩汞拱",
"zhí":"执直侄值职植",
"kuò":"扩阔廓",
"yáng":"扬阳杨洋",
"dì,de":"地",
"sǎo,sào":"扫",
"chǎng,cháng":"场",
"ěr":"耳尔饵",
"máng":"芒忙盲茫",
"xiǔ":"朽",
"pǔ,pò,pō,piáo":"朴",
"quán":"权全泉拳痊",
"guò,guo,guō":"过",
"chén":"臣尘辰沉陈晨忱",
"zài":"再在",
"xié":"协胁斜携鞋谐",
"yā,yà":"压",
"yàn":"厌艳宴验雁焰砚唁谚堰",
"yǒu,yòu":"有",
"cún":"存",
"bǎi":"百摆",
"kuā,kuà":"夸",
"jiàng":"匠酱",
"duó":"夺踱",
"huī":"灰挥恢辉徽",
"dá":"达",
"sǐ":"死",
"liè":"列劣烈猎",
"guǐ":"轨鬼诡",
"xié,yá,yé,yú,xú":"邪",
"jiá,jiā,gā,xiá":"夹",
"chéng":"成呈诚承城程惩橙",
"mài":"迈麦卖",
"huà,huá":"划",
"zhì":"至志帜制质治致秩智置挚掷窒滞稚",
"cǐ":"此",
"zhēn":"贞针侦珍真斟榛",
"jiān":"尖奸歼坚肩艰兼煎",
"guāng":"光",
"dāng,dàng":"当",
"zǎo":"早枣澡蚤藻",
"tù,tǔ":"吐",
"xià,hè":"吓",
"chóng":"虫崇",
"tuán":"团",
"tóng,tòng":"同",
"qū,qǔ":"曲",
"diào":"吊钓掉",
"yīn":"因阴音姻茵",
"chī":"吃嗤痴",
"ma,má,mǎ":"吗",
"yǔ":"屿宇羽",
"fān":"帆翻",
"huí":"回茴蛔",
"qǐ,kǎi":"岂",
"zé":"则责",
"suì":"岁碎穗祟遂隧",
"ròu":"肉",
"zhū,shú":"朱",
"wǎng":"网往枉",
"nián":"年",
"diū":"丢",
"shé":"舌",
"zhú":"竹逐烛",
"qiáo":"乔侨桥瞧荞憔",
"wěi":"伟伪苇纬萎",
"chuán,zhuàn":"传",
"pāng":"乓",
"pīng":"乒",
"xiū,xǔ":"休",
"fú":"伏扶俘浮符幅福凫芙袱辐蝠",
"yōu":"优忧悠幽",
"yán":"延严言岩炎沿盐颜阎蜒檐",
"jiàn":"件建荐贱剑健舰践鉴键箭涧",
"rèn,rén":"任",
"huá,huà,huā":"华",
"jià,jiè,jie":"价",
"shāng":"伤商",
"fèn,bīn":"份",
"fǎng":"仿访纺",
"yǎng,áng":"仰",
"zì":"自字",
"xiě,xuè":"血",
"xiàng":"向项象像橡",
"sì,shì":"似",
"hòu":"后厚候",
"zhōu":"舟州周洲",
"háng,xíng":"行",
"huì,kuài":"会",
"shā":"杀纱杉砂",
"hé,gě":"合",
"zhào":"兆赵照罩",
"zhòng":"众仲",
"yé":"爷",
"sǎn":"伞",
"chuàng,chuāng":"创",
"duǒ":"朵躲",
"wēi":"危威微偎薇巍",
"xún":"旬寻巡询循",
"zá":"杂砸",
"míng":"名明鸣铭螟",
"duō":"多哆",
"zhēng":"争征睁筝蒸怔狰",
"sè":"色涩瑟",
"zhuàng":"壮状撞",
"chōng,chòng":"冲",
"bīng":"冰兵",
"zhuāng":"庄装妆桩",
"qìng":"庆",
"liú":"刘留流榴琉硫瘤",
"qí,jì,zī,zhāi":"齐",
"cì":"次赐",
"jiāo":"交郊浇娇骄胶椒焦蕉礁",
"chǎn":"产铲阐",
"wàng":"妄忘旺望",
"chōng":"充",
"wèn":"问",
"chuǎng":"闯",
"yáng,xiáng":"羊",
"bìng,bīng":"并",
"dēng":"灯登蹬",
"mǐ":"米",
"guān":"关官棺",
"hàn,hán":"汗",
"jué":"决绝掘诀爵",
"jiāng":"江姜僵缰",
"tāng,shāng":"汤",
"chí":"池驰迟持弛",
"xīng,xìng":"兴",
"zhái":"宅",
"ān":"安氨庵鞍",
"jiǎng":"讲奖桨蒋",
"jūn":"军均君钧",
"xǔ,hǔ":"许",
"fěng":"讽",
"lùn,lún":"论",
"nóng":"农浓脓",
"shè":"设社舍涉赦",
"nà,nǎ,nèi,nā":"那",
"jìn,jǐn":"尽",
"dǎo":"导岛蹈捣祷",
"sūn,xùn":"孙",
"zhèn":"阵振震镇",
"shōu":"收",
"fáng":"防妨房肪",
"rú":"如儒蠕",
"mā":"妈",
"xì,hū":"戏",
"hǎo,hào":"好",
"tā,jiě":"她",
"guān,guàn":"观冠",
"huān":"欢",
"hóng,gōng":"红",
"mǎi":"买",
"xiān,qiàn":"纤",
"jì,jǐ":"纪济",
"yuē,yāo":"约",
"shòu":"寿受授售兽瘦",
"nòng,lòng":"弄",
"jìn":"进近晋浸",
"wéi":"违围唯维桅",
"yuǎn,yuàn":"远",
"tūn":"吞",
"tán":"坛谈痰昙谭潭檀",
"fǔ":"抚斧府俯辅腐甫脯",
"huài,pēi,pī,péi":"坏",
"rǎo":"扰",
"pī":"批披坯霹",
"zhǎo":"找沼",
"chě":"扯",
"zǒu":"走",
"chāo":"抄钞超",
"bà":"坝爸霸",
"gòng":"贡",
"zhé,shé,zhē":"折",
"qiǎng,qiāng,chēng":"抢",
"zhuā":"抓",
"xiào":"孝笑效哮啸",
"pāo":"抛",
"tóu":"投",
"kàng":"抗炕",
"fén":"坟焚",
"kēng":"坑",
"dǒu":"抖陡蚪",
"ké,qiào":"壳",
"fāng,fáng":"坊",
"niǔ":"扭纽钮",
"kuài":"块快筷",
"bǎ,bà":"把",
"bào":"报抱爆豹",
"jié":"劫杰洁捷截竭",
"què":"却确鹊",
"huā":"花",
"fēn":"芬吩纷氛",
"qín":"芹琴禽勤秦擒",
"láo":"劳牢",
"lú":"芦炉卢庐颅",
"gān,gǎn":"杆",
"kè":"克刻客课",
"sū,sù":"苏",
"dù":"杜渡妒镀",
"gàng,gāng":"杠",
"cūn":"村",
"qiú":"求球囚",
"xìng":"杏幸性姓",
"gèng,gēng":"更",
"liǎng":"两",
"lì,lí":"丽",
"shù":"束述树竖恕庶墅漱",
"dòu":"豆逗痘",
"hái,huán":"还",
"fǒu,pǐ":"否",
"lái":"来莱",
"lián":"连怜帘莲联廉镰",
"xiàn,xuán":"县",
"zhù,chú":"助",
"dāi":"呆",
"kuàng":"旷况矿框眶",
"ya,yā":"呀",
"zú":"足族",
"dūn":"吨蹲墩",
"kùn":"困",
"nán":"男",
"chǎo,chāo":"吵",
"yuán,yún,yùn":"员",
"chuàn":"串",
"chuī":"吹炊",
"ba,bā":"吧",
"hǒu":"吼",
"gǎng":"岗",
"bié,biè":"别",
"dīng,dìng":"钉",
"gào":"告",
"wǒ":"我",
"luàn":"乱",
"tū":"秃突凸",
"xiù":"秀袖绣锈嗅",
"gū,gù":"估",
"měi":"每美",
"hé,hē,hè":"何",
"tǐ,tī,bèn":"体",
"bó,bǎi,bà":"伯",
"zuò":"作坐座做",
"líng":"伶灵铃陵零龄玲凌菱蛉翎",
"dī":"低堤滴",
"yòng,yōng":"佣",
"nǐ":"你拟",
"zhù":"住注驻柱祝铸贮蛀",
"zào":"皂灶造燥躁噪",
"fó,fú,bì,bó":"佛",
"chè":"彻撤澈",
"tuǒ":"妥椭",
"lín":"邻林临琳磷鳞",
"hán":"含寒函涵韩",
"chà":"岔衩",
"cháng":"肠尝常偿",
"dù,dǔ":"肚",
"guī,jūn,qiū":"龟",
"miǎn":"免勉娩冕缅",
"jiǎo,jué":"角",
"kuáng":"狂",
"tiáo,tiāo":"条",
"luǎn":"卵",
"yíng":"迎盈营蝇赢荧莹萤",
"xì,jì":"系",
"chuáng":"床",
"kù":"库裤酷",
"yìng,yīng":"应",
"lěng":"冷",
"zhè,zhèi":"这",
"xù":"序叙绪续絮蓄旭恤酗婿",
"xián":"闲贤弦咸衔嫌涎舷",
"jiān,jiàn":"间监",
"pàn":"判盼叛畔",
"mēn,mèn":"闷",
"wāng":"汪",
"dì,tì,tuí":"弟",
"shā,shà":"沙",
"shà,shā":"煞",
"càn":"灿",
"wò":"沃卧握",
"méi,mò":"没",
"gōu":"沟钩",
"shěn,chén":"沈",
"huái":"怀槐徊淮",
"sòng":"宋送诵颂讼",
"hóng":"宏虹洪鸿",
"qióng":"穷琼",
"zāi":"灾栽",
"liáng":"良梁粮粱",
"zhèng":"证郑政",
"bǔ":"补捕哺",
"sù":"诉肃素速塑粟溯",
"shí,zhì":"识",
"cí":"词辞慈磁祠瓷雌",
"zhěn":"诊枕疹",
"niào,suī":"尿",
"céng":"层",
"jú":"局菊橘",
"wěi,yǐ":"尾",
"zhāng":"张章彰樟",
"gǎi":"改",
"lù":"陆录鹿路赂",
"ē,ā":"阿",
"zǔ":"阻组祖诅",
"miào":"妙庙",
"yāo":"妖腰邀夭吆",
"nǔ":"努",
"jìn,jìng":"劲",
"rěn":"忍",
"qū":"驱屈岖蛆躯",
"chún":"纯唇醇",
"nà":"纳钠捺",
"bó":"驳脖博搏膊舶渤",
"zòng,zǒng":"纵",
"wén,wèn":"纹",
"lǘ":"驴",
"huán":"环",
"qīng":"青轻倾清蜻氢卿",
"xiàn":"现限线宪陷馅羡献腺",
"biǎo":"表",
"mǒ,mò,mā":"抹",
"lǒng":"拢垄",
"dān,dàn,dǎn":"担",
"bá":"拔跋",
"jiǎn":"拣茧俭捡检减剪简柬碱",
"tǎn":"坦毯袒",
"chōu":"抽",
"yā":"押鸦鸭",
"guǎi":"拐",
"pāi":"拍",
"zhě":"者",
"dǐng":"顶鼎",
"yōng":"拥庸",
"chāi,cā":"拆",
"dǐ":"抵",
"jū,gōu":"拘",
"lā":"垃",
"lā,lá":"拉",
"bàn,pàn":"拌",
"zhāo":"招昭",
"pō":"坡泼颇",
"bō":"拨波玻菠播",
"zé,zhái":"择",
"tái":"抬",
"qí,jī":"其奇",
"qǔ":"取娶",
"kǔ":"苦",
"mào":"茂贸帽貌",
"ruò,rě":"若",
"miáo":"苗描瞄",
"píng,pēng":"苹",
"yīng":"英樱鹰莺婴缨鹦",
"qié":"茄",
"jīng":"茎京经惊晶睛精荆兢鲸",
"zhī,qí":"枝",
"bēi":"杯悲碑卑",
"guì,jǔ":"柜",
"bǎn":"板版",
"sōng":"松",
"qiāng":"枪腔",
"gòu":"构购够垢",
"sàng,sāng":"丧",
"huà":"画话桦",
"huò":"或货获祸惑霍",
"cì,cī":"刺",
"yǔ,yù":"雨语",
"bēn,bèn":"奔",
"fèn":"奋粪愤忿",
"hōng":"轰烘",
"qī,qì":"妻",
"ōu":"欧殴鸥",
"qǐng":"顷请",
"zhuǎn,zhuàn,zhuǎi":"转",
"zhǎn":"斩盏展",
"ruǎn":"软",
"lún":"轮仑伦沦",
"dào":"到盗悼道稻",
"chǐ":"齿耻侈",
"kěn":"肯垦恳啃",
"hǔ":"虎",
"xiē,suò":"些",
"lǔ":"虏鲁卤",
"shèn":"肾渗慎",
"shàng":"尚",
"guǒ":"果裹",
"kūn":"昆坤",
"guó":"国",
"chāng":"昌猖",
"chàng":"畅唱",
"diǎn":"典点碘",
"gù":"固故顾雇",
"áng":"昂",
"zhōng":"忠终钟盅衷",
"ne,ní":"呢",
"àn":"岸按案暗",
"tiě,tiē,tiè,":"帖",
"luó":"罗萝锣箩骡螺逻",
"kǎi":"凯慨",
"lǐng,líng":"岭",
"bài":"败拜",
"tú":"图徒途涂屠",
"chuí":"垂锤捶",
"zhī,zhì":"知织",
"guāi":"乖",
"gǎn":"秆赶敢感橄",
"hé,hè,huó,huò,hú":"和",
"gòng,gōng":"供共",
"wěi,wēi":"委",
"cè,zè,zhāi":"侧",
"pèi":"佩配沛",
"pò,pǎi":"迫",
"de,dì,dí":"的",
"pá":"爬",
"suǒ":"所索锁琐",
"jìng":"径竞竟敬静境镜靖",
"mìng":"命",
"cǎi,cài":"采",
"niàn":"念",
"tān":"贪摊滩瘫",
"rǔ":"乳辱",
"pín":"贫",
"fū":"肤麸孵敷",
"fèi":"肺废沸费吠",
"zhǒng":"肿",
"péng":"朋棚蓬膨硼鹏澎篷",
"fú,fù":"服",
"féi":"肥",
"hūn":"昏婚荤",
"tù":"兔",
"hú":"狐胡壶湖蝴弧葫",
"gǒu":"狗苟",
"bǎo":"饱宝保",
"xiǎng":"享响想",
"biàn":"变遍辨辩辫",
"dǐ,de":"底",
"jìng,chēng":"净",
"fàng":"放",
"nào":"闹",
"zhá":"闸铡",
"juàn,juǎn":"卷",
"quàn,xuàn":"券",
"dān,shàn,chán":"单",
"chǎo":"炒",
"qiǎn,jiān":"浅",
"fǎ":"法",
"xiè,yì":"泄",
"lèi":"泪类",
"zhān":"沾粘毡瞻",
"pō,bó":"泊",
"pào,pāo":"泡",
"xiè":"泻卸屑械谢懈蟹",
"ní,nì":"泥",
"zé,shì":"泽",
"pà":"怕帕",
"guài":"怪",
"zōng":"宗棕踪",
"shěn":"审婶",
"zhòu":"宙昼皱骤咒",
"kōng,kòng,kǒng":"空",
"láng,làng":"郎",
"chèn":"衬趁",
"gāi":"该",
"xiáng,yáng":"详",
"lì,dài":"隶",
"jū":"居鞠驹",
"shuā,shuà":"刷",
"mèng":"孟梦",
"gū":"孤姑辜咕沽菇箍",
"jiàng,xiáng":"降",
"mèi":"妹昧媚",
"jiě":"姐",
"jià":"驾架嫁稼",
"cān,shēn,cēn,sān":"参",
"liàn":"练炼恋链",
"xì":"细隙",
"shào":"绍哨",
"tuó":"驼驮鸵",
"guàn":"贯惯灌罐",
"zòu":"奏揍",
"chūn":"春椿",
"bāng":"帮邦梆",
"dú,dài":"毒",
"guà":"挂卦褂",
"kuǎ":"垮",
"kuà,kū":"挎",
"náo":"挠",
"dǎng,dàng":"挡",
"shuān":"拴栓",
"tǐng":"挺艇",
"kuò,guā":"括",
"shí,shè":"拾",
"tiāo,tiǎo":"挑",
"wā":"挖蛙洼",
"pīn":"拼",
"shèn,shén":"甚",
"mǒu":"某",
"nuó":"挪",
"gé":"革阁格隔",
"xiàng,hàng":"巷",
"cǎo":"草",
"chá":"茶察茬",
"dàng":"荡档",
"huāng":"荒慌",
"róng":"荣绒容熔融茸蓉溶榕",
"nán,nā":"南",
"biāo":"标彪膘",
"yào":"药耀",
"kū":"枯哭窟",
"xiāng,xiàng":"相",
"chá,zhā":"查",
"liǔ":"柳",
"bǎi,bó,bò":"柏",
"yào,yāo":"要",
"wāi":"歪",
"yán,yàn":"研",
"lí":"厘狸离犁梨璃黎漓篱",
"qì,qiè":"砌",
"miàn":"面",
"kǎn":"砍坎",
"shuǎ":"耍",
"nài":"耐奈",
"cán":"残蚕惭",
"zhàn":"战站栈绽蘸",
"bèi,bēi":"背",
"lǎn":"览懒揽缆榄",
"shěng,xǐng":"省",
"xiāo,xuē":"削",
"zhǎ":"眨",
"hǒng,hōng,hòng":"哄",
"xiǎn":"显险",
"mào,mò":"冒",
"yǎ,yā":"哑",
"yìng":"映硬",
"zuó":"昨",
"xīng":"星腥猩",
"pā":"趴",
"guì":"贵桂跪刽",
"sī,sāi":"思",
"xiā":"虾瞎",
"mǎ,mā,mà":"蚂",
"suī":"虽",
"pǐn":"品",
"mà":"骂",
"huá,huā":"哗",
"yè,yàn,yān":"咽",
"zán,zǎ":"咱",
"hā,hǎ,hà":"哈",
"yǎo":"咬舀",
"nǎ,něi,na,né":"哪",
"hāi,ké":"咳",
"xiá":"峡狭霞匣侠暇辖",
"gǔ,gū":"骨",
"gāng,gàng":"钢",
"tiē":"贴",
"yào,yuè":"钥",
"kàn,kān":"看",
"jǔ":"矩举",
"zěn":"怎",
"xuǎn":"选癣",
"zhòng,zhǒng,chóng":"种",
"miǎo":"秒渺藐",
"kē":"科棵颗磕蝌",
"biàn,pián":"便",
"zhòng,chóng":"重",
"liǎ":"俩",
"duàn":"段断缎锻",
"cù":"促醋簇",
"shùn":"顺瞬",
"xiū":"修羞",
"sú":"俗",
"qīn":"侵钦",
"xìn,shēn":"信",
"huáng":"皇黄煌凰惶蝗蟥",
"zhuī,duī":"追",
"jùn":"俊峻骏竣",
"dài,dāi":"待",
"xū":"须虚需",
"hěn":"很狠",
"dùn":"盾顿钝",
"lǜ":"律虑滤氯",
"pén":"盆",
"shí,sì,yì":"食",
"dǎn":"胆",
"táo":"逃桃陶萄淘",
"pàng":"胖",
"mài,mò":"脉",
"dú":"独牍",
"jiǎo":"狡饺绞脚搅",
"yuàn":"怨院愿",
"ráo":"饶",
"wān":"弯湾豌",
"āi":"哀哎埃",
"jiāng,jiàng":"将浆",
"tíng":"亭庭停蜓廷",
"liàng":"亮谅辆晾",
"dù,duó":"度",
"chuāng":"疮窗",
"qīn,qìng":"亲",
"zī":"姿资滋咨",
"dì":"帝递第蒂缔",
"chà,chā,chāi,cī":"差",
"yǎng":"养氧痒",
"qián":"前钱钳潜黔",
"mí":"迷谜靡",
"nì":"逆昵匿腻",
"zhà,zhá":"炸",
"zǒng":"总",
"làn":"烂滥",
"pào,páo,bāo":"炮",
"tì":"剃惕替屉涕",
"sǎ,xǐ":"洒",
"zhuó":"浊啄灼茁卓酌",
"xǐ,xiǎn":"洗",
"qià":"洽恰",
"pài":"派湃",
"huó":"活",
"rǎn":"染",
"héng":"恒衡",
"hún":"浑魂",
"nǎo":"恼脑",
"jué,jiào":"觉",
"hèn":"恨",
"xuān":"宣轩喧",
"qiè":"窃怯",
"biǎn,piān":"扁",
"ǎo":"袄",
"shén":"神",
"shuō,shuì,yuè":"说",
"tuì":"退蜕",
"chú":"除厨锄雏橱",
"méi":"眉梅煤霉玫枚媒楣",
"hái":"孩",
"wá":"娃",
"lǎo,mǔ":"姥",
"nù":"怒",
"hè":"贺赫褐鹤",
"róu":"柔揉蹂",
"bǎng":"绑膀",
"lěi":"垒蕾儡",
"rào":"绕",
"gěi,jǐ":"给",
"luò":"骆洛",
"luò,lào":"络",
"tǒng":"统桶筒捅",
"gēng":"耕羹",
"hào":"耗浩",
"bān":"班般斑搬扳颁",
"zhū":"珠株诸猪蛛",
"lāo":"捞",
"fěi":"匪诽",
"zǎi,zài":"载",
"mái,mán":"埋",
"shāo,shào":"捎稍",
"zhuō":"捉桌拙",
"niē":"捏",
"kǔn":"捆",
"dū,dōu":"都",
"sǔn":"损笋",
"juān":"捐鹃",
"zhé":"哲辙",
"rè":"热",
"wǎn":"挽晚碗惋婉",
"ái,āi":"挨",
"mò,mù":"莫",
"è,wù,ě,wū":"恶",
"tóng":"桐铜童彤瞳",
"xiào,jiào":"校",
"hé,hú":"核",
"yàng":"样漾",
"gēn":"根跟",
"gē":"哥鸽割歌戈",
"chǔ":"础储楚",
"pò":"破魄",
"tào":"套",
"chái":"柴豺",
"dǎng":"党",
"mián":"眠绵棉",
"shài":"晒",
"jǐn":"紧锦谨",
"yūn,yùn":"晕",
"huàng,huǎng":"晃",
"shǎng":"晌赏",
"ēn":"恩",
"ài,āi":"唉",
"ā,á,ǎ,à,a":"啊",
"bà,ba,pí":"罢",
"zéi":"贼",
"tiě":"铁",
"zuàn,zuān":"钻",
"qiān,yán":"铅",
"quē":"缺",
"tè":"特",
"chéng,shèng":"乘",
"dí":"敌笛涤嘀嫡",
"zū":"租",
"chèng":"秤",
"mì,bì":"秘泌",
"chēng,chèn,chèng":"称",
"tòu":"透",
"zhài":"债寨",
"dào,dǎo":"倒",
"tǎng,cháng":"倘",
"chàng,chāng":"倡",
"juàn":"倦绢眷",
"chòu,xiù":"臭",
"shè,yè,yì":"射",
"xú":"徐",
"háng":"航杭",
"ná":"拿",
"wēng":"翁嗡",
"diē":"爹跌",
"ài":"爱碍艾隘",
"gē,gé":"胳搁",
"cuì":"脆翠悴粹",
"zàng":"脏葬",
"láng":"狼廊琅榔",
"féng":"逢",
"è":"饿扼遏愕噩鳄",
"shuāi,cuī":"衰",
"gāo":"高糕羔篙",
"zhǔn":"准",
"bìng":"病",
"téng":"疼腾誊藤",
"liáng,liàng":"凉量",
"táng":"唐堂塘膛糖棠搪",
"pōu":"剖",
"chù,xù":"畜",
"páng,bàng":"旁磅",
"lǚ":"旅屡吕侣铝缕履",
"fěn":"粉",
"liào":"料镣",
"shāo":"烧",
"yān":"烟淹",
"tāo":"涛掏滔",
"lào":"涝酪",
"zhè":"浙蔗",
"xiāo":"消宵销萧硝箫嚣",
"hǎi":"海",
"zhǎng,zhàng":"涨",
"làng":"浪",
"rùn":"润闰",
"tàng":"烫",
"yǒng,chōng":"涌",
"huǐ":"悔毁",
"qiāo,qiǎo":"悄",
"hài":"害亥骇",
"jiā,jia,jie":"家",
"kuān":"宽",
"bīn":"宾滨彬缤濒",
"zhǎi":"窄",
"lǎng":"朗",
"dú,dòu":"读",
"zǎi":"宰",
"shàn,shān":"扇",
"shān,shàn":"苫",
"wà":"袜",
"xiáng":"祥翔",
"shuí":"谁",
"páo":"袍咆",
"bèi,pī":"被",
"tiáo,diào,zhōu":"调",
"yuān":"冤鸳渊",
"bō,bāo":"剥",
"ruò":"弱",
"péi":"陪培赔",
"niáng":"娘",
"tōng":"通",
"néng,nài":"能",
"nán,nàn,nuó":"难",
"sāng":"桑",
"pěng":"捧",
"dǔ":"堵赌睹",
"yǎn":"掩眼演衍",
"duī":"堆",
"pái,pǎi":"排",
"tuī":"推",
"jiào,jiāo":"教",
"lüè":"掠略",
"jù,jū":"据",
"kòng":"控",
"zhù,zhuó,zhe":"著",
"jūn,jùn":"菌",
"lè,lēi":"勒",
"méng":"萌盟檬朦",
"cài":"菜",
"tī":"梯踢剔",
"shāo,sào":"梢",
"fù,pì":"副",
"piào,piāo":"票",
"shuǎng":"爽",
"shèng,chéng":"盛",
"què,qiāo,qiǎo":"雀",
"xuě":"雪",
"chí,shi":"匙",
"xuán":"悬玄漩",
"mī,mí":"眯",
"la,lā":"啦",
"shé,yí":"蛇",
"lèi,léi,lěi":"累",
"zhǎn,chán":"崭",
"quān,juàn,juān":"圈",
"yín":"银吟淫",
"bèn":"笨",
"lóng,lǒng":"笼",
"mǐn":"敏皿闽悯",
"nín":"您",
"ǒu":"偶藕",
"tōu":"偷",
"piān":"偏篇翩",
"dé,děi,de":"得",
"jiǎ,jià":"假",
"pán":"盘",
"chuán":"船",
"cǎi":"彩睬踩",
"lǐng":"领",
"liǎn":"脸敛",
"māo,máo":"猫",
"měng":"猛锰",
"cāi":"猜",
"háo":"毫豪壕嚎",
"má":"麻",
"guǎn":"馆管",
"còu":"凑",
"hén":"痕",
"kāng":"康糠慷",
"xuán,xuàn":"旋",
"zhe,zhuó,zháo,zhāo":"着",
"lǜ,shuài":"率",
"gài,gě,hé":"盖",
"cū":"粗",
"lín,lìn":"淋",
"qú,jù":"渠",
"jiàn,jiān":"渐溅",
"hùn,hún":"混",
"pó":"婆",
"qíng":"情晴擎",
"cǎn":"惨",
"sù,xiǔ,xiù":"宿",
"yáo":"窑谣摇遥肴姚",
"móu":"谋",
"mì":"密蜜觅",
"huǎng":"谎恍幌",
"tán,dàn":"弹",
"suí":"随",
"yǐn,yìn":"隐",
"jǐng,gěng":"颈",
"shéng":"绳",
"qí":"骑棋旗歧祈脐畦崎鳍",
"chóu":"绸酬筹稠愁畴",
"lǜ,lù":"绿",
"dā":"搭",
"kuǎn":"款",
"tǎ":"塔",
"qū,cù":"趋",
"tí,dī,dǐ":"提",
"jiē,qì":"揭",
"xǐ":"喜徙",
"sōu":"搜艘",
"chā":"插",
"lǒu,lōu":"搂",
"qī,jī":"期",
"rě":"惹",
"sàn,sǎn":"散",
"dǒng":"董懂",
"gě,gé":"葛",
"pú":"葡菩蒲",
"zhāo,cháo":"朝",
"luò,là,lào":"落",
"kuí":"葵魁",
"bàng":"棒傍谤",
"yǐ,yī":"椅",
"sēn":"森",
"gùn,hùn":"棍",
"bī":"逼",
"zhí,shi":"殖",
"xià,shà":"厦",
"liè,liě":"裂",
"xióng":"雄熊",
"zàn":"暂赞",
"yǎ":"雅",
"chǎng":"敞",
"zhǎng":"掌",
"shǔ":"暑鼠薯黍蜀署曙",
"zuì":"最罪醉",
"hǎn":"喊罕",
"jǐng,yǐng":"景",
"lǎ":"喇",
"pēn,pèn":"喷",
"pǎo,páo":"跑",
"chuǎn":"喘",
"hē,hè,yè":"喝",
"hóu":"喉猴",
"pù,pū":"铺",
"hēi":"黑",
"guō":"锅郭",
"ruì":"锐瑞",
"duǎn":"短",
"é":"鹅额讹俄",
"děng":"等",
"kuāng":"筐",
"shuì":"税睡",
"zhù,zhú":"筑",
"shāi":"筛",
"dá,dā":"答",
"ào":"傲澳懊",
"pái":"牌徘",
"bǎo,bǔ,pù":"堡",
"ào,yù":"奥",
"fān,pān":"番",
"là,xī":"腊",
"huá":"猾滑",
"rán":"然燃",
"chán":"馋缠蝉",
"mán":"蛮馒",
"tòng":"痛",
"shàn":"善擅膳赡",
"zūn":"尊遵",
"pǔ":"普谱圃浦",
"gǎng,jiǎng":"港",
"céng,zēng":"曾",
"wēn":"温瘟",
"kě":"渴",
"zhā":"渣",
"duò":"惰舵跺",
"gài":"溉概丐钙",
"kuì":"愧",
"yú,tōu":"愉",
"wō":"窝蜗",
"cuàn":"窜篡",
"qún":"裙群",
"qiáng,qiǎng,jiàng":"强",
"shǔ,zhǔ":"属",
"zhōu,yù":"粥",
"sǎo":"嫂",
"huǎn":"缓",
"piàn":"骗",
"mō":"摸",
"shè,niè":"摄",
"tián,zhèn":"填",
"gǎo":"搞稿镐",
"suàn":"蒜算",
"méng,mēng,měng":"蒙",
"jìn,jīn":"禁",
"lóu":"楼娄",
"lài":"赖癞",
"lù,liù":"碌",
"pèng":"碰",
"léi":"雷",
"báo":"雹",
"dū":"督",
"nuǎn":"暖",
"xiē":"歇楔蝎",
"kuà":"跨胯",
"tiào,táo":"跳",
"é,yǐ":"蛾",
"sǎng":"嗓",
"qiǎn":"遣谴",
"cuò":"错挫措锉",
"ǎi":"矮蔼",
"shǎ":"傻",
"cuī":"催摧崔",
"tuǐ":"腿",
"chù":"触矗",
"jiě,jiè,xiè":"解",
"shù,shǔ,shuò":"数",
"mǎn":"满",
"liū,liù":"溜",
"gǔn":"滚",
"sāi,sài,sè":"塞",
"pì,bì":"辟",
"dié":"叠蝶谍碟",
"fèng,féng":"缝",
"qiáng":"墙",
"piě,piē":"撇",
"zhāi":"摘斋",
"shuāi":"摔",
"mó,mú":"模",
"bǎng,bàng":"榜",
"zhà":"榨乍诈",
"niàng":"酿",
"zāo":"遭糟",
"suān":"酸",
"shang,cháng":"裳",
"sòu":"嗽",
"là":"蜡辣",
"qiāo":"锹敲跷",
"zhuàn":"赚撰",
"wěn":"稳吻紊",
"bí":"鼻荸",
"mó":"膜魔馍摹蘑",
"xiān,xiǎn":"鲜",
"yí,nǐ":"疑",
"gāo,gào":"膏",
"zhē":"遮",
"duān":"端",
"màn":"漫慢曼幔",
"piāo,piào,piǎo":"漂",
"lòu":"漏陋",
"sài":"赛",
"nèn":"嫩",
"dèng":"凳邓瞪",
"suō,sù":"缩",
"qù,cù":"趣",
"sā,sǎ":"撒",
"tàng,tāng":"趟",
"chēng":"撑",
"zēng":"增憎",
"cáo":"槽曹",
"héng,hèng":"横",
"piāo":"飘",
"mán,mén":"瞒",
"tí":"题蹄啼",
"yǐng":"影颖",
"bào,pù":"暴",
"tà":"踏蹋",
"kào":"靠铐",
"pì":"僻屁譬",
"tǎng":"躺",
"dé":"德",
"mó,mā":"摩",
"shú":"熟秫赎",
"hú,hū,hù":"糊",
"pī,pǐ":"劈",
"cháo":"潮巢",
"cāo":"操糙",
"yàn,yān":"燕",
"diān":"颠掂",
"báo,bó,bò":"薄",
"cān":"餐",
"xǐng":"醒",
"zhěng":"整拯",
"zuǐ":"嘴",
"zèng":"赠",
"mó,mò":"磨",
"níng":"凝狞柠",
"jiǎo,zhuó":"缴",
"cā":"擦",
"cáng,zàng":"藏",
"fán,pó":"繁",
"bì,bei":"臂",
"bèng":"蹦泵",
"pān":"攀潘",
"chàn,zhàn":"颤",
"jiāng,qiáng":"疆",
"rǎng":"壤攘",
"jiáo,jué,jiào":"嚼",
"rǎng,rāng":"嚷",
"chǔn":"蠢",
"lù,lòu":"露",
"náng,nāng":"囊",
"dǎi":"歹",
"rǒng":"冗",
"hāng,bèn":"夯",
"āo,wā":"凹",
"féng,píng":"冯",
"yū":"迂淤",
"xū,yù":"吁",
"lèi,lē":"肋",
"kōu":"抠",
"lūn,lún":"抡",
"jiè,gài":"芥",
"xīn,xìn":"芯",
"chā,chà":"杈",
"xiāo,xiào":"肖",
"zhī,zī":"吱",
"ǒu,ōu,òu":"呕",
"nà,nè":"呐",
"qiàng,qiāng":"呛",
"tún,dùn":"囤",
"kēng,háng":"吭",
"shǔn":"吮",
"diàn,tián":"佃",
"sì,cì":"伺",
"zhǒu":"肘帚",
"diàn,tián,shèng":"甸",
"páo,bào":"刨",
"lìn":"吝赁躏",
"duì,ruì,yuè":"兑",
"zhuì":"坠缀赘",
"kē,kě":"坷",
"tuò,tà,zhí":"拓",
"fú,bì":"拂",
"nǐng,níng,nìng":"拧",
"ào,ǎo,niù":"拗",
"kē,hē":"苛",
"yān,yǎn":"奄",
"hē,a,kē":"呵",
"gā,kā":"咖",
"biǎn":"贬匾",
"jiǎo,yáo":"侥",
"chà,shā":"刹",
"āng":"肮",
"wèng":"瓮",
"nüè,yào":"疟",
"páng":"庞螃",
"máng,méng":"氓",
"gē,yì":"疙",
"jǔ,jù":"沮",
"zú,cù":"卒",
"nìng":"泞",
"chǒng":"宠",
"wǎn,yuān":"宛",
"mí,mǐ":"弥",
"qì,qiè,xiè":"契",
"xié,jiā":"挟",
"duò,duǒ":"垛",
"jiá":"荚颊",
"zhà,shān,shi,cè":"栅",
"bó,bèi":"勃",
"zhóu,zhòu":"轴",
"nüè":"虐",
"liē,liě,lié,lie":"咧",
"dǔn":"盹",
"xūn":"勋",
"yo,yō":"哟",
"mī":"咪",
"qiào,xiào":"俏",
"hóu,hòu":"侯",
"pēi":"胚",
"tāi":"胎",
"luán":"峦",
"sà":"飒萨",
"shuò":"烁",
"xuàn":"炫",
"píng,bǐng":"屏",
"nà,nuó":"娜",
"pá,bà":"耙",
"gěng":"埂耿梗",
"niè":"聂镊孽",
"mǎng":"莽",
"qī,xī":"栖",
"jiǎ,gǔ":"贾",
"chěng":"逞",
"pēng":"砰烹",
"láo,lào":"唠",
"bàng,bèng":"蚌",
"gōng,zhōng":"蚣",
"li,lǐ,lī":"哩",
"suō":"唆梭嗦",
"hēng":"哼",
"zāng":"赃",
"qiào":"峭窍撬",
"mǎo":"铆",
"ǎn":"俺",
"sǒng":"耸",
"juè,jué":"倔",
"yīn,yān,yǐn":"殷",
"guàng":"逛",
"něi":"馁",
"wō,guō":"涡",
"lào,luò":"烙",
"nuò":"诺懦糯",
"zhūn":"谆",
"niǎn,niē":"捻",
"qiā":"掐",
"yè,yē":"掖",
"chān,xiān,càn,shǎn":"掺",
"dǎn,shàn":"掸",
"fēi,fěi":"菲",
"qián,gān":"乾",
"shē":"奢赊",
"shuò,shí":"硕",
"luō,luó,luo":"啰",
"shá":"啥",
"hǔ,xià":"唬",
"tuò":"唾",
"bēng":"崩",
"dāng,chēng":"铛",
"xiǎn,xǐ":"铣",
"jiǎo,jiáo":"矫",
"tiáo":"笤",
"kuǐ,guī":"傀",
"xìn":"衅",
"dōu":"兜",
"jì,zhài":"祭",
"xiáo":"淆",
"tǎng,chǎng":"淌",
"chún,zhūn":"淳",
"shuàn":"涮",
"dāng":"裆",
"wèi,yù":"尉",
"duò,huī":"堕",
"chuò,chāo":"绰",
"bēng,běng,bèng":"绷",
"zōng,zèng":"综",
"zhuó,zuó":"琢",
"chuǎi,chuài,chuāi,tuán,zhuī":"揣",
"péng,bāng":"彭",
"chān":"搀",
"cuō":"搓",
"sāo":"搔",
"yē":"椰",
"zhuī,chuí":"椎",
"léng,lēng,líng":"棱",
"hān":"酣憨",
"sū":"酥",
"záo":"凿",
"qiào,qiáo":"翘",
"zhā,chā":"喳",
"bǒ":"跛",
"há,gé":"蛤",
"qiàn,kàn":"嵌",
"bāi":"掰",
"yān,ā":"腌",
"wàn":"腕",
"dūn,duì":"敦",
"kuì,huì":"溃",
"jiǒng":"窘",
"sāo,sǎo":"骚",
"pìn":"聘",
"bǎ":"靶",
"xuē":"靴薛",
"hāo":"蒿",
"léng":"楞",
"kǎi,jiē":"楷",
"pín,bīn":"频",
"zhuī":"锥",
"tuí":"颓",
"sāi":"腮",
"liú,liù":"馏",
"nì,niào":"溺",
"qǐn":"寝",
"luǒ":"裸",
"miù":"谬",
"jiǎo,chāo":"剿",
"áo,āo":"熬",
"niān":"蔫",
"màn,wàn":"蔓",
"chá,chā":"碴",
"xūn,xùn":"熏",
"tiǎn":"舔",
"sēng":"僧",
"da,dá":"瘩",
"guǎ":"寡",
"tuì,tùn":"褪",
"niǎn":"撵碾",
"liáo,liāo":"撩",
"cuō,zuǒ":"撮",
"ruǐ":"蕊",
"cháo,zhāo":"嘲",
"biē":"憋鳖",
"hēi,mò":"嘿",
"zhuàng,chuáng":"幢",
"jī,qǐ":"稽",
"lǒu":"篓",
"lǐn":"凛檩",
"biě,biē":"瘪",
"liáo,lào,lǎo":"潦",
"chéng,dèng":"澄",
"lèi,léi":"擂",
"piáo":"瓢",
"shà":"霎",
"mò,má":"蟆",
"qué":"瘸",
"liáo,liǎo":"燎",
"liào,liǎo":"瞭",
"sào,sāo":"臊",
"mí,méi":"糜",
"ái":"癌",
"tún":"臀",
"huò,huō,huá":"豁",
"pù,bào":"瀑",
"chuō":"戳",
"zǎn,cuán":"攒",
"cèng":"蹭",
"bò,bǒ":"簸",
"bó,bù":"簿",
"bìn":"鬓",
"suǐ":"髓",
"ráng":"瓤",
};


/***/ }),

/***/ 49:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const assign = __webpack_require__(50);
// XXX: Symbol when web support.
const PINYIN_STYLE = {
  NORMAL: 0,       // 普通风格，不带音标。
  TONE: 1,         // 标准风格，音标在韵母的第一个字母上。
  TONE2: 2,        // 声调以数字形式在拼音之后，使用数字 0~4 标识。
  TO3NE: 5,        // 声调以数字形式在声母之后，使用数字 0~4 标识。
  INITIALS: 3,     // 仅需要声母部分。
  FIRST_LETTER: 4, // 仅保留首字母。
};
const DEFAULT_OPTIONS = {
  style: PINYIN_STYLE.TONE, // 风格
  segment: false,           // 分词。
  heteronym: false,         // 多音字
};

// 声母表。
const INITIALS = "b,p,m,f,d,t,n,l,g,k,h,j,q,x,r,zh,ch,sh,z,c,s".split(",");
// 韵母表。
//const FINALS = "ang,eng,ing,ong,an,en,in,un,er,ai,ei,ui,ao,ou,iu,ie,ve,a,o,e,i,u,v".split(",");
// 带音标字符。
const PHONETIC_SYMBOL = __webpack_require__(51);
const RE_PHONETIC_SYMBOL = new RegExp("([" + Object.keys(PHONETIC_SYMBOL).join("") + "])", "g");
const RE_TONE2 = /([aeoiuvnm])([0-4])$/;

/*
 * 格式化拼音为声母（Initials）形式。
 * @param {String}
 * @return {String}
 */
function initials(pinyin) {
  for (let i = 0, l = INITIALS.length; i < l; i++){
    if (pinyin.indexOf(INITIALS[i]) === 0) {
      return INITIALS[i];
    }
  }
  return "";
}

class Pinyin {
  constructor (dict) {
    this._dict = dict;
  }

  // @param {String} hans 要转为拼音的目标字符串（汉字）。
  // @param {Object} options, 可选，用于指定拼音风格，是否启用多音字。
  // @return {Array} 返回的拼音列表。
  convert (hans, options) {

    if (typeof hans !== "string") {
      return [];
    }

    options = assign({}, DEFAULT_OPTIONS, options);

    let pys = [];
    let nohans = "";

    for(let i = 0, firstCharCode, words, l = hans.length; i < l; i++){

      words = hans[i];
      firstCharCode = words.charCodeAt(0);

      if(this._dict[firstCharCode]){

        // ends of non-chinese words.
        if(nohans.length > 0){
          pys.push([nohans]);
          nohans = ""; // reset non-chinese words.
        }

        pys.push(this.single_pinyin(words, options));

      }else{
        nohans += words;
      }
    }

    // 清理最后的非中文字符串。
    if(nohans.length > 0){
      pys.push([nohans]);
      nohans = ""; // reset non-chinese words.
    }
    return pys;
  }

  // 单字拼音转换。
  // @param {String} han, 单个汉字
  // @return {Array} 返回拼音列表，多音字会有多个拼音项。
  single_pinyin (han, options) {

    if (typeof han !== "string") {
      return [];
    }
    if (han.length !== 1) {
      return this.single_pinyin(han.charAt(0), options);
    }

    let hanCode = han.charCodeAt(0);

    if (!this._dict[hanCode]) {
      return [han];
    }

    let pys = this._dict[hanCode].split(",");
    if(!options.heteronym){
      return [Pinyin.toFixed(pys[0], options.style)];
    }

    // 临时存储已存在的拼音，避免多音字拼音转换为非注音风格出现重复。
    let py_cached = {};
    let pinyins = [];
    for(let i = 0, py, l = pys.length; i < l; i++){
      py = Pinyin.toFixed(pys[i], options.style);
      if(py_cached.hasOwnProperty(py)){
        continue;
      }
      py_cached[py] = py;

      pinyins.push(py);
    }
    return pinyins;
  }

  /**
   * 格式化拼音风格。
   *
   * @param {String} pinyin TONE 风格的拼音。
   * @param {ENUM} style 目标转换的拼音风格。
   * @return {String} 转换后的拼音。
   */
  static toFixed (pinyin, style) {
    let tone = ""; // 声调。
    let first_letter;
    let py;
    switch(style){
    case PINYIN_STYLE.INITIALS:
      return initials(pinyin);

    case PINYIN_STYLE.FIRST_LETTER:
      first_letter = pinyin.charAt(0);
      if (PHONETIC_SYMBOL.hasOwnProperty(first_letter)) {
        first_letter = PHONETIC_SYMBOL[first_letter].charAt(0);
      }
      return first_letter;

    case PINYIN_STYLE.NORMAL:
      return pinyin.replace(RE_PHONETIC_SYMBOL, function($0, $1_phonetic){
        return PHONETIC_SYMBOL[$1_phonetic].replace(RE_TONE2, "$1");
      });

    case PINYIN_STYLE.TO3NE:
      return pinyin.replace(RE_PHONETIC_SYMBOL, function($0, $1_phonetic){
        return PHONETIC_SYMBOL[$1_phonetic];
      });

    case PINYIN_STYLE.TONE2:
      py = pinyin.replace(RE_PHONETIC_SYMBOL, function($0, $1){
        // 声调数值。
        tone = PHONETIC_SYMBOL[$1].replace(RE_TONE2, "$2");

        return PHONETIC_SYMBOL[$1].replace(RE_TONE2, "$1");
      });
      return py + tone;

    case PINYIN_STYLE.TONE:
    default:
      return pinyin;
    }
  }

  /**
   * 比较两个汉字转成拼音后的排序顺序，可以用作默认的拼音排序算法。
   *
   * @param {String} hanA 汉字字符串 A。
   * @return {String} hanB 汉字字符串 B。
   * @return {Number} 返回 -1，0，或 1。
   */
  compare (hanA, hanB) {
    const pinyinA = this.convert(hanA, DEFAULT_OPTIONS);
    const pinyinB = this.convert(hanB, DEFAULT_OPTIONS);
    return String(pinyinA).localeCompare(pinyinB);
  }

  static get STYLE_NORMAL () {
    return PINYIN_STYLE.NORMAL;
  }
  static get STYLE_TONE () {
    return PINYIN_STYLE.TONE;
  }
  static get STYLE_TONE2 () {
    return PINYIN_STYLE.TONE2;
  }
  static get STYLE_TO3NE () {
    return PINYIN_STYLE.TO3NE;
  }
  static get STYLE_INITIALS () {
    return PINYIN_STYLE.INITIALS;
  }
  static get STYLE_FIRST_LETTER () {
    return PINYIN_STYLE.FIRST_LETTER;
  }
  static get DEFAULT_OPTIONS () {
    return DEFAULT_OPTIONS;
  }
}

module.exports = Pinyin;


/***/ }),

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(20).default;


/***/ }),

/***/ 50:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),

/***/ 51:
/***/ (function(module, exports) {

// 带音标字符。
module.exports = {
  "ā": "a1",
  "á": "a2",
  "ǎ": "a3",
  "à": "a4",
  "ē": "e1",
  "é": "e2",
  "ě": "e3",
  "è": "e4",
  "ō": "o1",
  "ó": "o2",
  "ǒ": "o3",
  "ò": "o4",
  "ī": "i1",
  "í": "i2",
  "ǐ": "i3",
  "ì": "i4",
  "ū": "u1",
  "ú": "u2",
  "ǔ": "u3",
  "ù": "u4",
  "ü": "v0",
  "ǘ": "v2",
  "ǚ": "v3",
  "ǜ": "v4",
  "ń": "n2",
  "ň": "n3",
  "": "m2",
};


/***/ }),

/***/ 6:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//用到的公共函数

//将url路径search参数转为json对象形式
function parseQueryString(url) {
    var reg_url = /^[^\?]+\?([\w\W]+)$/,
        reg_para = /([^&=]+)=([\w\W]*?)(&|$|#)/g,
        arr_url = reg_url.exec(url),
        ret = {};
    if (arr_url && arr_url[1]) {
        var str_para = arr_url[1],
            result;
        while ((result = reg_para.exec(str_para)) != null) {
            ret[result[1]] = result[2];
        }
    }
    return ret;
}

/**** 产生随机数据
 * 参数表示获取几位字符串
 * *** */
function get_random(length) {
    var suiji = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    var result = '';
    for (var i = 0; i < length; i++) {
        var suiji_len = suiji.length; //随机数组的长度
        var xiabiao = parseInt(Math.random() * suiji_len);
        result += suiji[xiabiao];
    }
    return result;
}

//存储空间转换  字节转换为KB、MB、GB..
//参数为数字型的字节
function byte2(size) {
    if (size < 1024) size = size + 'B';else if (size < 1024 * 1024) size = Math.round(size * 10 / 1024) / 10 + 'KB'; //保留小数点后一位
    else if (size < 1024 * 1024 * 1024) size = Math.round(size * 10 / (1024 * 1024)) / 10 + 'MB';else size = Math.round(size * 10 / (1024 * 1024 * 1024)) / 10 + 'GB';
    return size;
}

//将数字都转换为两位的
function num2double(number) {
    number = number.toString().length == 2 ? number : '0' + number;
    return number;
}

//将标准时间转换格式 2017/07/27 08:20:08
//参数2是默认导出格式
function forMatDate(date) {
    var default_val = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    //中国标准时间对象
    var year = date.getFullYear();
    var month = num2double(date.getMonth() + 1);
    var dat = num2double(date.getDate());
    var hours = num2double(date.getHours());
    var min = num2double(date.getMinutes());
    var sen = num2double(date.getSeconds());
    if (default_val) {
        date = year + '/' + month + '/' + dat + ' ' + hours + ':' + min + ':' + sen;
    } else {
        date = year + month + dat + hours + min + sen;
    }

    return date;
}

/** 
 * 计算两点之间距离 
 * @param start 
 * @param end 
 * @return 米 
**/
function getDistance(latLng_start, latLng_end) {
    var lat1 = Math.PI / 180 * latLng_start.lat;
    var lat2 = Math.PI / 180 * latLng_end.lat;

    var lon1 = Math.PI / 180 * latLng_start.lng;
    var lon2 = Math.PI / 180 * latLng_end.lng;
    //地球半径  
    var R = 6371;

    //两点间距离 km，如果想要米的话，结果*1000就可以了  
    var d = Math.acos(Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1)) * R;

    return d * 1000;
}

/**
 * 检查站点的唯一性
 * **/
function check_station(latLng) {
    var lat = latLng.lat;
    var lng = latLng.lng;
    var latLng_sum = lat + lng;
    for (var i = 0; i < window.company_markers.length; i++) {
        var tmp_latLng = window.company_markers[i].getPosition();
        var tmp_lat = parseInt(tmp_latLng.lat() * 1000000) / 1000000;
        var tmp_lng = parseInt(tmp_latLng.lng() * 1000000) / 1000000;
        var tmp_latLng_sum = tmp_lat + tmp_lng;
        if (latLng_sum === tmp_latLng_sum || lat === tmp_lat && lng === tmp_lng) {
            latLng.lat += 0.000001;
            check_station(latLng);
        }
    }
    latLng = {
        lat: parseInt(latLng.lat * 1000000) / 1000000,
        lng: parseInt(latLng.lng * 1000000) / 1000000
    };
    return latLng;
}

/**
 * 计算站点id(唯一性)=(公司id *1000+经度+纬度)* 1000000
 * @param company_id 公司id
 * @latLng 经纬度
 * @markers 标记数组
 * @except_itself 是否检查自己这个标记
 * **/
function cal_station_id(company_id, latLng, the_markers) {
    var except_itself = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    //经纬度保留6位小数
    var lat = latLng.lat();
    lat = parseInt(lat * 1000000) / 1000000;
    var lng = latLng.lng();
    lng = parseInt(lng * 1000000) / 1000000;

    latLng = {
        lat: lat,
        lng: lng
    };
    latLng = check_station(latLng);
    if (check_marker_area(latLng, the_markers, except_itself)) {
        var station_id = parseInt((company_id * 1000 + lat + lng) * 1000000);
        return {
            station_id: station_id,
            latLng: latLng
        };
    } else {
        return false;
    }
}

/**
 * 检查要增加的标记周围附近是否有其他标记
 * 参数1 经纬度对象
 * 参数2 所有标记数组
 * 参数3 是否检查自己这个标记
 * 参数4 单位米 默认100米
 * **/
function check_marker_area(latLng, the_markers, except_itself) {
    var area = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 100;

    for (var i = 0; i < the_markers.length; i++) {
        var end_latLng = the_markers[i].getPosition();
        var station_id = the_markers[i].station_id;
        if (except_itself == station_id) {
            //不检查自己
            continue;
        }
        var end_lat = parseInt(end_latLng.lat() * 1000000) / 1000000;
        var end_lng = parseInt(end_latLng.lng() * 1000000) / 1000000;
        end_latLng = {
            lat: end_lat,
            lng: end_lng
            //计算两点之间的距离
        };var distance = getDistance(latLng, end_latLng);
        if (distance < area) {
            return false;
        }
    }
    return true;
};

//html字符串转换为 HTML 实体
function htmlspecialchars(str) {
    var s = "";
    if (str.length == 0) return "";
    for (var i = 0; i < str.length; i++) {
        switch (str.substr(i, 1)) {
            case "\"":
                s += "&quot;";break;
            case "\'":
                s += "&apos;";break;
            default:
                s += str.substr(i, 1);break;
        }
    }
    return s;
}

//HTML实体 转换为 html字符串
function htmlspecialchars_decode(str) {
    str = str.replace(/&quot;/g, "\"");
    str = str.replace(/&apos;/g, "\'");
    return str;
}

module.exports = {
    parseQueryString: parseQueryString,
    get_random: get_random,
    byte2: byte2,
    forMatDate: forMatDate,
    getDistance: getDistance,
    cal_station_id: cal_station_id,
    htmlspecialchars: htmlspecialchars,
    htmlspecialchars_decode: htmlspecialchars_decode
};

/***/ }),

/***/ 7:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//默认配置项

//cloud登录页面的地址
var login_url = '/myroute/html/login.html';

//国际化语言名称简称
var countries = {
    'Arabic': {
        'Bahrain': 'ar.BH',
        'Algeria': 'ar.DZ',
        'Egypt': 'ar.EG',
        'Iraq': 'ar.IQ',
        'Jordan': 'ar.JO',
        'Kuwait': 'ar.KW',
        'Lebanon': 'ar.LB',
        'Libya': 'ar.LY',
        'Morocco': 'ar.MA',
        'Oman': 'ar.OM',
        'Qatar': 'ar.QA',
        'Saudi Arabia': 'ar.SA',
        'Sudan': 'ar.SD',
        'Syria': 'ar.SY',
        'Tunisia': 'ar.TN',
        'Yemen': 'ar.YE'
    },
    'Belarus': { 'Belarusian': 'be.BY' },
    'Bulgaria': { 'Bulgarian': 'bg.BG' },
    'Spain': { 'Catalan': 'ca.ES' },
    'Czech Republic': { 'Czech': 'cs.CZ' },
    'Denmark': { 'Danish': 'da.DK' },
    'German': {
        'Austria': 'de.AT',
        'Switzerland': 'de.CH',
        'Germany': 'de.DE',
        'Luxembourg': 'de.LU'
    },
    'Greece': { 'Greek': 'el.GR' },
    'English': {
        'Australia': 'en.AU',
        'Canada': 'en.CA',
        'England': 'en.GB',
        'Ireland': 'en.IE',
        'new Zealand': 'en.NZ',
        'United States': 'en.US',
        'South Africa': 'en.ZA'
    },
    'Spanish': {
        'Argentina': 'es.AR',
        'Bolivia': 'es.BO',
        'Chile': 'es.CL',
        'Colombia': 'es.CO',
        'Costa Rica': 'es.CR',
        'Dominican Republic': 'es.DO',
        'Ecuador': 'es.EC',
        'Spain': 'es.ES',
        'Guatemala': 'es.GT',
        'Honduras': 'es.HN',
        'Mexico': 'es.MX',
        'Nicaragua': 'es.NI',
        'Panama': 'es.PA',
        'Peru': 'es.PE',
        'Puerto Rico': 'es.PR',
        'Paraguay': 'es.PY',
        'El Salvador': 'es.SV',
        'Uruguay': 'es.UY',
        'Venezuela': 'es.VE'
    },
    'Estonian': { 'Estonia': 'et.EE' },
    'Finnish': { 'Finland': 'fi.FI' },
    'French': {
        'Belgium': 'fr.BE',
        'Canada': 'fr.CA',
        'Switzerland': 'fr.CH',
        'France': 'fr.FR',
        'Luxembourg': 'fr.LU'
    },
    'Croatian': { 'Croatia': 'hr.HR' },
    'Hungarian': { 'Hungary': 'hu.HU' },
    'Icelandic': { 'Iceland': 'is.IS' },
    'Italian': {
        'Switzerland': 'it.CH',
        'Italy': 'it.IT'
    },
    'Hebrew': { 'Israel': 'iw.IL' },
    'Japanese': { 'Japan': 'ja.JP' },
    'Korean': { 'South Korea': 'ko.KR' },
    'Lithuanian': { 'Lithuania': 'lt.LT' },
    'Latvian': { 'Latvia': 'lv.LV' },
    'Macedonian': { 'Macedonia': 'mk.MK' },
    'Dutch': {
        'Belgium': 'nl.BE',
        'Netherlands': 'nl.NL'
    },
    'Norwegian': { 'Norway': 'no.NO' },
    'Polish': { 'Poland': 'pl.PL' },
    'Portuguese': {
        'Brazil': 'pt.BR',
        'Portugal': 'pt.PT'
    },
    'Romanian': { 'Romania': 'ro.RO' },
    'Russian': { 'Russia': 'ru.RU' },
    'Cyprus-Croatian': { 'Yugoslavia': 'sr.YU' },
    'Swedish': { 'Sweden': 'sv.SE' },
    'Thai': { 'Thailand': 'th.TH' },
    'Turkish': { 'Turkey': 'tr.TR' },
    'Chinese': {
        'Simplified_CH': 'zh.CN',
        'Traditional_CH': 'zh.TW'
    },
    'Ukrainian': { 'Ukraine': 'uk.UA' }

};

var server_ip = 'www.burtyang.top:55566'; //服务区地址

module.exports = {
    login_url: login_url,
    countries: countries,
    server_ip: server_ip
};

/***/ }),

/***/ 9:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({

  processors: {},

  addPostProcessor: function addPostProcessor(module) {
    this.processors[module.name] = module;
  },
  handle: function handle(processors, value, key, options, translator) {
    var _this = this;

    processors.forEach(function (processor) {
      if (_this.processors[processor]) value = _this.processors[processor].process(value, key, options, translator);
    });

    return value;
  }
});

/***/ })

},[169]);