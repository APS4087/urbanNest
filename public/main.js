/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./app/index.js":
/*!**********************!*\
  !*** ./app/index.js ***!
  \**********************/
/***/ (() => {



/***/ }),

/***/ "./node_modules/ansi-html-community/index.js":
/*!***************************************************!*\
  !*** ./node_modules/ansi-html-community/index.js ***!
  \***************************************************/
/***/ ((module) => {

"use strict";


module.exports = ansiHTML;

// Reference to https://github.com/sindresorhus/ansi-regex
var _regANSI = /(?:(?:\u001b\[)|\u009b)(?:(?:[0-9]{1,3})?(?:(?:;[0-9]{0,3})*)?[A-M|f-m])|\u001b[A-M]/;
var _defColors = {
  reset: ['fff', '000'],
  // [FOREGROUD_COLOR, BACKGROUND_COLOR]
  black: '000',
  red: 'ff0000',
  green: '209805',
  yellow: 'e8bf03',
  blue: '0000ff',
  magenta: 'ff00ff',
  cyan: '00ffee',
  lightgrey: 'f0f0f0',
  darkgrey: '888'
};
var _styles = {
  30: 'black',
  31: 'red',
  32: 'green',
  33: 'yellow',
  34: 'blue',
  35: 'magenta',
  36: 'cyan',
  37: 'lightgrey'
};
var _openTags = {
  '1': 'font-weight:bold',
  // bold
  '2': 'opacity:0.5',
  // dim
  '3': '<i>',
  // italic
  '4': '<u>',
  // underscore
  '8': 'display:none',
  // hidden
  '9': '<del>' // delete
};
var _closeTags = {
  '23': '</i>',
  // reset italic
  '24': '</u>',
  // reset underscore
  '29': '</del>' // reset delete
};
[0, 21, 22, 27, 28, 39, 49].forEach(function (n) {
  _closeTags[n] = '</span>';
});

/**
 * Converts text with ANSI color codes to HTML markup.
 * @param {String} text
 * @returns {*}
 */
function ansiHTML(text) {
  // Returns the text if the string has no ANSI escape code.
  if (!_regANSI.test(text)) {
    return text;
  }

  // Cache opened sequence.
  var ansiCodes = [];
  // Replace with markup.
  var ret = text.replace(/\033\[(\d+)m/g, function (match, seq) {
    var ot = _openTags[seq];
    if (ot) {
      // If current sequence has been opened, close it.
      if (!!~ansiCodes.indexOf(seq)) {
        // eslint-disable-line no-extra-boolean-cast
        ansiCodes.pop();
        return '</span>';
      }
      // Open tag.
      ansiCodes.push(seq);
      return ot[0] === '<' ? ot : '<span style="' + ot + ';">';
    }
    var ct = _closeTags[seq];
    if (ct) {
      // Pop sequence
      ansiCodes.pop();
      return ct;
    }
    return '';
  });

  // Make sure tags are closed.
  var l = ansiCodes.length;
  l > 0 && (ret += Array(l + 1).join('</span>'));
  return ret;
}

/**
 * Customize colors.
 * @param {Object} colors reference to _defColors
 */
ansiHTML.setColors = function (colors) {
  if (typeof colors !== 'object') {
    throw new Error('`colors` parameter must be an Object.');
  }
  var _finalColors = {};
  for (var key in _defColors) {
    var hex = colors.hasOwnProperty(key) ? colors[key] : null;
    if (!hex) {
      _finalColors[key] = _defColors[key];
      continue;
    }
    if ('reset' === key) {
      if (typeof hex === 'string') {
        hex = [hex];
      }
      if (!Array.isArray(hex) || hex.length === 0 || hex.some(function (h) {
        return typeof h !== 'string';
      })) {
        throw new Error('The value of `' + key + '` property must be an Array and each item could only be a hex string, e.g.: FF0000');
      }
      var defHexColor = _defColors[key];
      if (!hex[0]) {
        hex[0] = defHexColor[0];
      }
      if (hex.length === 1 || !hex[1]) {
        hex = [hex[0]];
        hex.push(defHexColor[1]);
      }
      hex = hex.slice(0, 2);
    } else if (typeof hex !== 'string') {
      throw new Error('The value of `' + key + '` property must be a hex string, e.g.: FF0000');
    }
    _finalColors[key] = hex;
  }
  _setTags(_finalColors);
};

/**
 * Reset colors.
 */
ansiHTML.reset = function () {
  _setTags(_defColors);
};

/**
 * Expose tags, including open and close.
 * @type {Object}
 */
ansiHTML.tags = {};
if (Object.defineProperty) {
  Object.defineProperty(ansiHTML.tags, 'open', {
    get: function () {
      return _openTags;
    }
  });
  Object.defineProperty(ansiHTML.tags, 'close', {
    get: function () {
      return _closeTags;
    }
  });
} else {
  ansiHTML.tags.open = _openTags;
  ansiHTML.tags.close = _closeTags;
}
function _setTags(colors) {
  // reset all
  _openTags['0'] = 'font-weight:normal;opacity:1;color:#' + colors.reset[0] + ';background:#' + colors.reset[1];
  // inverse
  _openTags['7'] = 'color:#' + colors.reset[1] + ';background:#' + colors.reset[0];
  // dark grey
  _openTags['90'] = 'color:#' + colors.darkgrey;
  for (var code in _styles) {
    var color = _styles[code];
    var oriColor = colors[color] || '000';
    _openTags[code] = 'color:#' + oriColor;
    code = parseInt(code);
    _openTags[(code + 10).toString()] = 'background:#' + oriColor;
  }
}
ansiHTML.reset();

/***/ }),

/***/ "./node_modules/events/events.js":
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
/***/ ((module) => {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var R = typeof Reflect === 'object' ? Reflect : null;
var ReflectApply = R && typeof R.apply === 'function' ? R.apply : function ReflectApply(target, receiver, args) {
  return Function.prototype.apply.call(target, receiver, args);
};
var ReflectOwnKeys;
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys;
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}
function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}
var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
};
function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;
module.exports.once = once;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;
EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;
function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}
Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function () {
    return defaultMaxListeners;
  },
  set: function (arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});
EventEmitter.init = function () {
  if (this._events === undefined || this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }
  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};
function _getMaxListeners(that) {
  if (that._maxListeners === undefined) return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}
EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};
EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = type === 'error';
  var events = this._events;
  if (events !== undefined) doError = doError && events.error === undefined;else if (!doError) return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0) er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }
  var handler = events[type];
  if (handler === undefined) return false;
  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i) ReflectApply(listeners[i], this, args);
  }
  return true;
};
function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;
  checkListener(listener);
  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type, listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }
  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] = prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' + existing.length + ' ' + String(type) + ' listeners ' + 'added. Use emitter.setMaxListeners() to ' + 'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }
  return target;
}
EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};
EventEmitter.prototype.on = EventEmitter.prototype.addListener;
EventEmitter.prototype.prependListener = function prependListener(type, listener) {
  return _addListener(this, type, listener, true);
};
function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0) return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}
function _onceWrap(target, type, listener) {
  var state = {
    fired: false,
    wrapFn: undefined,
    target: target,
    type: type,
    listener: listener
  };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}
EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};
EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
  checkListener(listener);
  this.prependListener(type, _onceWrap(this, type, listener));
  return this;
};

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener = function removeListener(type, listener) {
  var list, events, position, i, originalListener;
  checkListener(listener);
  events = this._events;
  if (events === undefined) return this;
  list = events[type];
  if (list === undefined) return this;
  if (list === listener || list.listener === listener) {
    if (--this._eventsCount === 0) this._events = Object.create(null);else {
      delete events[type];
      if (events.removeListener) this.emit('removeListener', type, list.listener || listener);
    }
  } else if (typeof list !== 'function') {
    position = -1;
    for (i = list.length - 1; i >= 0; i--) {
      if (list[i] === listener || list[i].listener === listener) {
        originalListener = list[i].listener;
        position = i;
        break;
      }
    }
    if (position < 0) return this;
    if (position === 0) list.shift();else {
      spliceOne(list, position);
    }
    if (list.length === 1) events[type] = list[0];
    if (events.removeListener !== undefined) this.emit('removeListener', type, originalListener || listener);
  }
  return this;
};
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.removeAllListeners = function removeAllListeners(type) {
  var listeners, events, i;
  events = this._events;
  if (events === undefined) return this;

  // not listening for removeListener, no need to emit
  if (events.removeListener === undefined) {
    if (arguments.length === 0) {
      this._events = Object.create(null);
      this._eventsCount = 0;
    } else if (events[type] !== undefined) {
      if (--this._eventsCount === 0) this._events = Object.create(null);else delete events[type];
    }
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    var keys = Object.keys(events);
    var key;
    for (i = 0; i < keys.length; ++i) {
      key = keys[i];
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = Object.create(null);
    this._eventsCount = 0;
    return this;
  }
  listeners = events[type];
  if (typeof listeners === 'function') {
    this.removeListener(type, listeners);
  } else if (listeners !== undefined) {
    // LIFO order
    for (i = listeners.length - 1; i >= 0; i--) {
      this.removeListener(type, listeners[i]);
    }
  }
  return this;
};
function _listeners(target, type, unwrap) {
  var events = target._events;
  if (events === undefined) return [];
  var evlistener = events[type];
  if (evlistener === undefined) return [];
  if (typeof evlistener === 'function') return unwrap ? [evlistener.listener || evlistener] : [evlistener];
  return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}
EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};
EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};
EventEmitter.listenerCount = function (emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};
EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;
  if (events !== undefined) {
    var evlistener = events[type];
    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }
  return 0;
}
EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};
function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i) copy[i] = arr[i];
  return copy;
}
function spliceOne(list, index) {
  for (; index + 1 < list.length; index++) list[index] = list[index + 1];
  list.pop();
}
function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}
function once(emitter, name) {
  return new Promise(function (resolve, reject) {
    function errorListener(err) {
      emitter.removeListener(name, resolver);
      reject(err);
    }
    function resolver() {
      if (typeof emitter.removeListener === 'function') {
        emitter.removeListener('error', errorListener);
      }
      resolve([].slice.call(arguments));
    }
    ;
    eventTargetAgnosticAddListener(emitter, name, resolver, {
      once: true
    });
    if (name !== 'error') {
      addErrorHandlerIfEventEmitter(emitter, errorListener, {
        once: true
      });
    }
  });
}
function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
  if (typeof emitter.on === 'function') {
    eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
  }
}
function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
  if (typeof emitter.on === 'function') {
    if (flags.once) {
      emitter.once(name, listener);
    } else {
      emitter.on(name, listener);
    }
  } else if (typeof emitter.addEventListener === 'function') {
    // EventTarget does not have `error` event semantics like Node
    // EventEmitters, we do not listen for `error` events here.
    emitter.addEventListener(name, function wrapListener(arg) {
      // IE does not have builtin `{ once: true }` support so we
      // have to do it manually.
      if (flags.once) {
        emitter.removeEventListener(name, wrapListener);
      }
      listener(arg);
    });
  } else {
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
  }
}

/***/ }),

/***/ "./node_modules/html-entities/lib/index.js":
/*!*************************************************!*\
  !*** ./node_modules/html-entities/lib/index.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
var named_references_1 = __webpack_require__(/*! ./named-references */ "./node_modules/html-entities/lib/named-references.js");
var numeric_unicode_map_1 = __webpack_require__(/*! ./numeric-unicode-map */ "./node_modules/html-entities/lib/numeric-unicode-map.js");
var surrogate_pairs_1 = __webpack_require__(/*! ./surrogate-pairs */ "./node_modules/html-entities/lib/surrogate-pairs.js");
var allNamedReferences = __assign(__assign({}, named_references_1.namedReferences), {
  all: named_references_1.namedReferences.html5
});
function replaceUsingRegExp(macroText, macroRegExp, macroReplacer) {
  macroRegExp.lastIndex = 0;
  var replaceMatch = macroRegExp.exec(macroText);
  var replaceResult;
  if (replaceMatch) {
    replaceResult = "";
    var replaceLastIndex = 0;
    do {
      if (replaceLastIndex !== replaceMatch.index) {
        replaceResult += macroText.substring(replaceLastIndex, replaceMatch.index);
      }
      var replaceInput = replaceMatch[0];
      replaceResult += macroReplacer(replaceInput);
      replaceLastIndex = replaceMatch.index + replaceInput.length;
    } while (replaceMatch = macroRegExp.exec(macroText));
    if (replaceLastIndex !== macroText.length) {
      replaceResult += macroText.substring(replaceLastIndex);
    }
  } else {
    replaceResult = macroText;
  }
  return replaceResult;
}
var encodeRegExps = {
  specialChars: /[<>'"&]/g,
  nonAscii: /[<>'"&\u0080-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/g,
  nonAsciiPrintable: /[<>'"&\x01-\x08\x11-\x15\x17-\x1F\x7f-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/g,
  nonAsciiPrintableOnly: /[\x01-\x08\x11-\x15\x17-\x1F\x7f-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/g,
  extensive: /[\x01-\x0c\x0e-\x1f\x21-\x2c\x2e-\x2f\x3a-\x40\x5b-\x60\x7b-\x7d\x7f-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/g
};
var defaultEncodeOptions = {
  mode: "specialChars",
  level: "all",
  numeric: "decimal"
};
function encode(text, _a) {
  var _b = _a === void 0 ? defaultEncodeOptions : _a,
    _c = _b.mode,
    mode = _c === void 0 ? "specialChars" : _c,
    _d = _b.numeric,
    numeric = _d === void 0 ? "decimal" : _d,
    _e = _b.level,
    level = _e === void 0 ? "all" : _e;
  if (!text) {
    return "";
  }
  var encodeRegExp = encodeRegExps[mode];
  var references = allNamedReferences[level].characters;
  var isHex = numeric === "hexadecimal";
  return replaceUsingRegExp(text, encodeRegExp, function (input) {
    var result = references[input];
    if (!result) {
      var code = input.length > 1 ? surrogate_pairs_1.getCodePoint(input, 0) : input.charCodeAt(0);
      result = (isHex ? "&#x" + code.toString(16) : "&#" + code) + ";";
    }
    return result;
  });
}
exports.encode = encode;
var defaultDecodeOptions = {
  scope: "body",
  level: "all"
};
var strict = /&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);/g;
var attribute = /&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+)[;=]?/g;
var baseDecodeRegExps = {
  xml: {
    strict: strict,
    attribute: attribute,
    body: named_references_1.bodyRegExps.xml
  },
  html4: {
    strict: strict,
    attribute: attribute,
    body: named_references_1.bodyRegExps.html4
  },
  html5: {
    strict: strict,
    attribute: attribute,
    body: named_references_1.bodyRegExps.html5
  }
};
var decodeRegExps = __assign(__assign({}, baseDecodeRegExps), {
  all: baseDecodeRegExps.html5
});
var fromCharCode = String.fromCharCode;
var outOfBoundsChar = fromCharCode(65533);
var defaultDecodeEntityOptions = {
  level: "all"
};
function getDecodedEntity(entity, references, isAttribute, isStrict) {
  var decodeResult = entity;
  var decodeEntityLastChar = entity[entity.length - 1];
  if (isAttribute && decodeEntityLastChar === "=") {
    decodeResult = entity;
  } else if (isStrict && decodeEntityLastChar !== ";") {
    decodeResult = entity;
  } else {
    var decodeResultByReference = references[entity];
    if (decodeResultByReference) {
      decodeResult = decodeResultByReference;
    } else if (entity[0] === "&" && entity[1] === "#") {
      var decodeSecondChar = entity[2];
      var decodeCode = decodeSecondChar == "x" || decodeSecondChar == "X" ? parseInt(entity.substr(3), 16) : parseInt(entity.substr(2));
      decodeResult = decodeCode >= 1114111 ? outOfBoundsChar : decodeCode > 65535 ? surrogate_pairs_1.fromCodePoint(decodeCode) : fromCharCode(numeric_unicode_map_1.numericUnicodeMap[decodeCode] || decodeCode);
    }
  }
  return decodeResult;
}
function decodeEntity(entity, _a) {
  var _b = (_a === void 0 ? defaultDecodeEntityOptions : _a).level,
    level = _b === void 0 ? "all" : _b;
  if (!entity) {
    return "";
  }
  return getDecodedEntity(entity, allNamedReferences[level].entities, false, false);
}
exports.decodeEntity = decodeEntity;
function decode(text, _a) {
  var _b = _a === void 0 ? defaultDecodeOptions : _a,
    _c = _b.level,
    level = _c === void 0 ? "all" : _c,
    _d = _b.scope,
    scope = _d === void 0 ? level === "xml" ? "strict" : "body" : _d;
  if (!text) {
    return "";
  }
  var decodeRegExp = decodeRegExps[level][scope];
  var references = allNamedReferences[level].entities;
  var isAttribute = scope === "attribute";
  var isStrict = scope === "strict";
  return replaceUsingRegExp(text, decodeRegExp, function (entity) {
    return getDecodedEntity(entity, references, isAttribute, isStrict);
  });
}
exports.decode = decode;

/***/ }),

/***/ "./node_modules/html-entities/lib/named-references.js":
/*!************************************************************!*\
  !*** ./node_modules/html-entities/lib/named-references.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.bodyRegExps = {
  xml: /&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g,
  html4: /&notin;|&(?:nbsp|iexcl|cent|pound|curren|yen|brvbar|sect|uml|copy|ordf|laquo|not|shy|reg|macr|deg|plusmn|sup2|sup3|acute|micro|para|middot|cedil|sup1|ordm|raquo|frac14|frac12|frac34|iquest|Agrave|Aacute|Acirc|Atilde|Auml|Aring|AElig|Ccedil|Egrave|Eacute|Ecirc|Euml|Igrave|Iacute|Icirc|Iuml|ETH|Ntilde|Ograve|Oacute|Ocirc|Otilde|Ouml|times|Oslash|Ugrave|Uacute|Ucirc|Uuml|Yacute|THORN|szlig|agrave|aacute|acirc|atilde|auml|aring|aelig|ccedil|egrave|eacute|ecirc|euml|igrave|iacute|icirc|iuml|eth|ntilde|ograve|oacute|ocirc|otilde|ouml|divide|oslash|ugrave|uacute|ucirc|uuml|yacute|thorn|yuml|quot|amp|lt|gt|#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g,
  html5: /&centerdot;|&copysr;|&divideontimes;|&gtcc;|&gtcir;|&gtdot;|&gtlPar;|&gtquest;|&gtrapprox;|&gtrarr;|&gtrdot;|&gtreqless;|&gtreqqless;|&gtrless;|&gtrsim;|&ltcc;|&ltcir;|&ltdot;|&lthree;|&ltimes;|&ltlarr;|&ltquest;|&ltrPar;|&ltri;|&ltrie;|&ltrif;|&notin;|&notinE;|&notindot;|&notinva;|&notinvb;|&notinvc;|&notni;|&notniva;|&notnivb;|&notnivc;|&parallel;|&timesb;|&timesbar;|&timesd;|&(?:AElig|AMP|Aacute|Acirc|Agrave|Aring|Atilde|Auml|COPY|Ccedil|ETH|Eacute|Ecirc|Egrave|Euml|GT|Iacute|Icirc|Igrave|Iuml|LT|Ntilde|Oacute|Ocirc|Ograve|Oslash|Otilde|Ouml|QUOT|REG|THORN|Uacute|Ucirc|Ugrave|Uuml|Yacute|aacute|acirc|acute|aelig|agrave|amp|aring|atilde|auml|brvbar|ccedil|cedil|cent|copy|curren|deg|divide|eacute|ecirc|egrave|eth|euml|frac12|frac14|frac34|gt|iacute|icirc|iexcl|igrave|iquest|iuml|laquo|lt|macr|micro|middot|nbsp|not|ntilde|oacute|ocirc|ograve|ordf|ordm|oslash|otilde|ouml|para|plusmn|pound|quot|raquo|reg|sect|shy|sup1|sup2|sup3|szlig|thorn|times|uacute|ucirc|ugrave|uml|uuml|yacute|yen|yuml|#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g
};
exports.namedReferences = {
  xml: {
    entities: {
      "&lt;": "<",
      "&gt;": ">",
      "&quot;": '"',
      "&apos;": "'",
      "&amp;": "&"
    },
    characters: {
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&apos;",
      "&": "&amp;"
    }
  },
  html4: {
    entities: {
      "&apos;": "'",
      "&nbsp": " ",
      "&nbsp;": " ",
      "&iexcl": "¡",
      "&iexcl;": "¡",
      "&cent": "¢",
      "&cent;": "¢",
      "&pound": "£",
      "&pound;": "£",
      "&curren": "¤",
      "&curren;": "¤",
      "&yen": "¥",
      "&yen;": "¥",
      "&brvbar": "¦",
      "&brvbar;": "¦",
      "&sect": "§",
      "&sect;": "§",
      "&uml": "¨",
      "&uml;": "¨",
      "&copy": "©",
      "&copy;": "©",
      "&ordf": "ª",
      "&ordf;": "ª",
      "&laquo": "«",
      "&laquo;": "«",
      "&not": "¬",
      "&not;": "¬",
      "&shy": "­",
      "&shy;": "­",
      "&reg": "®",
      "&reg;": "®",
      "&macr": "¯",
      "&macr;": "¯",
      "&deg": "°",
      "&deg;": "°",
      "&plusmn": "±",
      "&plusmn;": "±",
      "&sup2": "²",
      "&sup2;": "²",
      "&sup3": "³",
      "&sup3;": "³",
      "&acute": "´",
      "&acute;": "´",
      "&micro": "µ",
      "&micro;": "µ",
      "&para": "¶",
      "&para;": "¶",
      "&middot": "·",
      "&middot;": "·",
      "&cedil": "¸",
      "&cedil;": "¸",
      "&sup1": "¹",
      "&sup1;": "¹",
      "&ordm": "º",
      "&ordm;": "º",
      "&raquo": "»",
      "&raquo;": "»",
      "&frac14": "¼",
      "&frac14;": "¼",
      "&frac12": "½",
      "&frac12;": "½",
      "&frac34": "¾",
      "&frac34;": "¾",
      "&iquest": "¿",
      "&iquest;": "¿",
      "&Agrave": "À",
      "&Agrave;": "À",
      "&Aacute": "Á",
      "&Aacute;": "Á",
      "&Acirc": "Â",
      "&Acirc;": "Â",
      "&Atilde": "Ã",
      "&Atilde;": "Ã",
      "&Auml": "Ä",
      "&Auml;": "Ä",
      "&Aring": "Å",
      "&Aring;": "Å",
      "&AElig": "Æ",
      "&AElig;": "Æ",
      "&Ccedil": "Ç",
      "&Ccedil;": "Ç",
      "&Egrave": "È",
      "&Egrave;": "È",
      "&Eacute": "É",
      "&Eacute;": "É",
      "&Ecirc": "Ê",
      "&Ecirc;": "Ê",
      "&Euml": "Ë",
      "&Euml;": "Ë",
      "&Igrave": "Ì",
      "&Igrave;": "Ì",
      "&Iacute": "Í",
      "&Iacute;": "Í",
      "&Icirc": "Î",
      "&Icirc;": "Î",
      "&Iuml": "Ï",
      "&Iuml;": "Ï",
      "&ETH": "Ð",
      "&ETH;": "Ð",
      "&Ntilde": "Ñ",
      "&Ntilde;": "Ñ",
      "&Ograve": "Ò",
      "&Ograve;": "Ò",
      "&Oacute": "Ó",
      "&Oacute;": "Ó",
      "&Ocirc": "Ô",
      "&Ocirc;": "Ô",
      "&Otilde": "Õ",
      "&Otilde;": "Õ",
      "&Ouml": "Ö",
      "&Ouml;": "Ö",
      "&times": "×",
      "&times;": "×",
      "&Oslash": "Ø",
      "&Oslash;": "Ø",
      "&Ugrave": "Ù",
      "&Ugrave;": "Ù",
      "&Uacute": "Ú",
      "&Uacute;": "Ú",
      "&Ucirc": "Û",
      "&Ucirc;": "Û",
      "&Uuml": "Ü",
      "&Uuml;": "Ü",
      "&Yacute": "Ý",
      "&Yacute;": "Ý",
      "&THORN": "Þ",
      "&THORN;": "Þ",
      "&szlig": "ß",
      "&szlig;": "ß",
      "&agrave": "à",
      "&agrave;": "à",
      "&aacute": "á",
      "&aacute;": "á",
      "&acirc": "â",
      "&acirc;": "â",
      "&atilde": "ã",
      "&atilde;": "ã",
      "&auml": "ä",
      "&auml;": "ä",
      "&aring": "å",
      "&aring;": "å",
      "&aelig": "æ",
      "&aelig;": "æ",
      "&ccedil": "ç",
      "&ccedil;": "ç",
      "&egrave": "è",
      "&egrave;": "è",
      "&eacute": "é",
      "&eacute;": "é",
      "&ecirc": "ê",
      "&ecirc;": "ê",
      "&euml": "ë",
      "&euml;": "ë",
      "&igrave": "ì",
      "&igrave;": "ì",
      "&iacute": "í",
      "&iacute;": "í",
      "&icirc": "î",
      "&icirc;": "î",
      "&iuml": "ï",
      "&iuml;": "ï",
      "&eth": "ð",
      "&eth;": "ð",
      "&ntilde": "ñ",
      "&ntilde;": "ñ",
      "&ograve": "ò",
      "&ograve;": "ò",
      "&oacute": "ó",
      "&oacute;": "ó",
      "&ocirc": "ô",
      "&ocirc;": "ô",
      "&otilde": "õ",
      "&otilde;": "õ",
      "&ouml": "ö",
      "&ouml;": "ö",
      "&divide": "÷",
      "&divide;": "÷",
      "&oslash": "ø",
      "&oslash;": "ø",
      "&ugrave": "ù",
      "&ugrave;": "ù",
      "&uacute": "ú",
      "&uacute;": "ú",
      "&ucirc": "û",
      "&ucirc;": "û",
      "&uuml": "ü",
      "&uuml;": "ü",
      "&yacute": "ý",
      "&yacute;": "ý",
      "&thorn": "þ",
      "&thorn;": "þ",
      "&yuml": "ÿ",
      "&yuml;": "ÿ",
      "&quot": '"',
      "&quot;": '"',
      "&amp": "&",
      "&amp;": "&",
      "&lt": "<",
      "&lt;": "<",
      "&gt": ">",
      "&gt;": ">",
      "&OElig;": "Œ",
      "&oelig;": "œ",
      "&Scaron;": "Š",
      "&scaron;": "š",
      "&Yuml;": "Ÿ",
      "&circ;": "ˆ",
      "&tilde;": "˜",
      "&ensp;": " ",
      "&emsp;": " ",
      "&thinsp;": " ",
      "&zwnj;": "‌",
      "&zwj;": "‍",
      "&lrm;": "‎",
      "&rlm;": "‏",
      "&ndash;": "–",
      "&mdash;": "—",
      "&lsquo;": "‘",
      "&rsquo;": "’",
      "&sbquo;": "‚",
      "&ldquo;": "“",
      "&rdquo;": "”",
      "&bdquo;": "„",
      "&dagger;": "†",
      "&Dagger;": "‡",
      "&permil;": "‰",
      "&lsaquo;": "‹",
      "&rsaquo;": "›",
      "&euro;": "€",
      "&fnof;": "ƒ",
      "&Alpha;": "Α",
      "&Beta;": "Β",
      "&Gamma;": "Γ",
      "&Delta;": "Δ",
      "&Epsilon;": "Ε",
      "&Zeta;": "Ζ",
      "&Eta;": "Η",
      "&Theta;": "Θ",
      "&Iota;": "Ι",
      "&Kappa;": "Κ",
      "&Lambda;": "Λ",
      "&Mu;": "Μ",
      "&Nu;": "Ν",
      "&Xi;": "Ξ",
      "&Omicron;": "Ο",
      "&Pi;": "Π",
      "&Rho;": "Ρ",
      "&Sigma;": "Σ",
      "&Tau;": "Τ",
      "&Upsilon;": "Υ",
      "&Phi;": "Φ",
      "&Chi;": "Χ",
      "&Psi;": "Ψ",
      "&Omega;": "Ω",
      "&alpha;": "α",
      "&beta;": "β",
      "&gamma;": "γ",
      "&delta;": "δ",
      "&epsilon;": "ε",
      "&zeta;": "ζ",
      "&eta;": "η",
      "&theta;": "θ",
      "&iota;": "ι",
      "&kappa;": "κ",
      "&lambda;": "λ",
      "&mu;": "μ",
      "&nu;": "ν",
      "&xi;": "ξ",
      "&omicron;": "ο",
      "&pi;": "π",
      "&rho;": "ρ",
      "&sigmaf;": "ς",
      "&sigma;": "σ",
      "&tau;": "τ",
      "&upsilon;": "υ",
      "&phi;": "φ",
      "&chi;": "χ",
      "&psi;": "ψ",
      "&omega;": "ω",
      "&thetasym;": "ϑ",
      "&upsih;": "ϒ",
      "&piv;": "ϖ",
      "&bull;": "•",
      "&hellip;": "…",
      "&prime;": "′",
      "&Prime;": "″",
      "&oline;": "‾",
      "&frasl;": "⁄",
      "&weierp;": "℘",
      "&image;": "ℑ",
      "&real;": "ℜ",
      "&trade;": "™",
      "&alefsym;": "ℵ",
      "&larr;": "←",
      "&uarr;": "↑",
      "&rarr;": "→",
      "&darr;": "↓",
      "&harr;": "↔",
      "&crarr;": "↵",
      "&lArr;": "⇐",
      "&uArr;": "⇑",
      "&rArr;": "⇒",
      "&dArr;": "⇓",
      "&hArr;": "⇔",
      "&forall;": "∀",
      "&part;": "∂",
      "&exist;": "∃",
      "&empty;": "∅",
      "&nabla;": "∇",
      "&isin;": "∈",
      "&notin;": "∉",
      "&ni;": "∋",
      "&prod;": "∏",
      "&sum;": "∑",
      "&minus;": "−",
      "&lowast;": "∗",
      "&radic;": "√",
      "&prop;": "∝",
      "&infin;": "∞",
      "&ang;": "∠",
      "&and;": "∧",
      "&or;": "∨",
      "&cap;": "∩",
      "&cup;": "∪",
      "&int;": "∫",
      "&there4;": "∴",
      "&sim;": "∼",
      "&cong;": "≅",
      "&asymp;": "≈",
      "&ne;": "≠",
      "&equiv;": "≡",
      "&le;": "≤",
      "&ge;": "≥",
      "&sub;": "⊂",
      "&sup;": "⊃",
      "&nsub;": "⊄",
      "&sube;": "⊆",
      "&supe;": "⊇",
      "&oplus;": "⊕",
      "&otimes;": "⊗",
      "&perp;": "⊥",
      "&sdot;": "⋅",
      "&lceil;": "⌈",
      "&rceil;": "⌉",
      "&lfloor;": "⌊",
      "&rfloor;": "⌋",
      "&lang;": "〈",
      "&rang;": "〉",
      "&loz;": "◊",
      "&spades;": "♠",
      "&clubs;": "♣",
      "&hearts;": "♥",
      "&diams;": "♦"
    },
    characters: {
      "'": "&apos;",
      " ": "&nbsp;",
      "¡": "&iexcl;",
      "¢": "&cent;",
      "£": "&pound;",
      "¤": "&curren;",
      "¥": "&yen;",
      "¦": "&brvbar;",
      "§": "&sect;",
      "¨": "&uml;",
      "©": "&copy;",
      "ª": "&ordf;",
      "«": "&laquo;",
      "¬": "&not;",
      "­": "&shy;",
      "®": "&reg;",
      "¯": "&macr;",
      "°": "&deg;",
      "±": "&plusmn;",
      "²": "&sup2;",
      "³": "&sup3;",
      "´": "&acute;",
      "µ": "&micro;",
      "¶": "&para;",
      "·": "&middot;",
      "¸": "&cedil;",
      "¹": "&sup1;",
      "º": "&ordm;",
      "»": "&raquo;",
      "¼": "&frac14;",
      "½": "&frac12;",
      "¾": "&frac34;",
      "¿": "&iquest;",
      "À": "&Agrave;",
      "Á": "&Aacute;",
      "Â": "&Acirc;",
      "Ã": "&Atilde;",
      "Ä": "&Auml;",
      "Å": "&Aring;",
      "Æ": "&AElig;",
      "Ç": "&Ccedil;",
      "È": "&Egrave;",
      "É": "&Eacute;",
      "Ê": "&Ecirc;",
      "Ë": "&Euml;",
      "Ì": "&Igrave;",
      "Í": "&Iacute;",
      "Î": "&Icirc;",
      "Ï": "&Iuml;",
      "Ð": "&ETH;",
      "Ñ": "&Ntilde;",
      "Ò": "&Ograve;",
      "Ó": "&Oacute;",
      "Ô": "&Ocirc;",
      "Õ": "&Otilde;",
      "Ö": "&Ouml;",
      "×": "&times;",
      "Ø": "&Oslash;",
      "Ù": "&Ugrave;",
      "Ú": "&Uacute;",
      "Û": "&Ucirc;",
      "Ü": "&Uuml;",
      "Ý": "&Yacute;",
      "Þ": "&THORN;",
      "ß": "&szlig;",
      "à": "&agrave;",
      "á": "&aacute;",
      "â": "&acirc;",
      "ã": "&atilde;",
      "ä": "&auml;",
      "å": "&aring;",
      "æ": "&aelig;",
      "ç": "&ccedil;",
      "è": "&egrave;",
      "é": "&eacute;",
      "ê": "&ecirc;",
      "ë": "&euml;",
      "ì": "&igrave;",
      "í": "&iacute;",
      "î": "&icirc;",
      "ï": "&iuml;",
      "ð": "&eth;",
      "ñ": "&ntilde;",
      "ò": "&ograve;",
      "ó": "&oacute;",
      "ô": "&ocirc;",
      "õ": "&otilde;",
      "ö": "&ouml;",
      "÷": "&divide;",
      "ø": "&oslash;",
      "ù": "&ugrave;",
      "ú": "&uacute;",
      "û": "&ucirc;",
      "ü": "&uuml;",
      "ý": "&yacute;",
      "þ": "&thorn;",
      "ÿ": "&yuml;",
      '"': "&quot;",
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "Œ": "&OElig;",
      "œ": "&oelig;",
      "Š": "&Scaron;",
      "š": "&scaron;",
      "Ÿ": "&Yuml;",
      "ˆ": "&circ;",
      "˜": "&tilde;",
      " ": "&ensp;",
      " ": "&emsp;",
      " ": "&thinsp;",
      "‌": "&zwnj;",
      "‍": "&zwj;",
      "‎": "&lrm;",
      "‏": "&rlm;",
      "–": "&ndash;",
      "—": "&mdash;",
      "‘": "&lsquo;",
      "’": "&rsquo;",
      "‚": "&sbquo;",
      "“": "&ldquo;",
      "”": "&rdquo;",
      "„": "&bdquo;",
      "†": "&dagger;",
      "‡": "&Dagger;",
      "‰": "&permil;",
      "‹": "&lsaquo;",
      "›": "&rsaquo;",
      "€": "&euro;",
      "ƒ": "&fnof;",
      "Α": "&Alpha;",
      "Β": "&Beta;",
      "Γ": "&Gamma;",
      "Δ": "&Delta;",
      "Ε": "&Epsilon;",
      "Ζ": "&Zeta;",
      "Η": "&Eta;",
      "Θ": "&Theta;",
      "Ι": "&Iota;",
      "Κ": "&Kappa;",
      "Λ": "&Lambda;",
      "Μ": "&Mu;",
      "Ν": "&Nu;",
      "Ξ": "&Xi;",
      "Ο": "&Omicron;",
      "Π": "&Pi;",
      "Ρ": "&Rho;",
      "Σ": "&Sigma;",
      "Τ": "&Tau;",
      "Υ": "&Upsilon;",
      "Φ": "&Phi;",
      "Χ": "&Chi;",
      "Ψ": "&Psi;",
      "Ω": "&Omega;",
      "α": "&alpha;",
      "β": "&beta;",
      "γ": "&gamma;",
      "δ": "&delta;",
      "ε": "&epsilon;",
      "ζ": "&zeta;",
      "η": "&eta;",
      "θ": "&theta;",
      "ι": "&iota;",
      "κ": "&kappa;",
      "λ": "&lambda;",
      "μ": "&mu;",
      "ν": "&nu;",
      "ξ": "&xi;",
      "ο": "&omicron;",
      "π": "&pi;",
      "ρ": "&rho;",
      "ς": "&sigmaf;",
      "σ": "&sigma;",
      "τ": "&tau;",
      "υ": "&upsilon;",
      "φ": "&phi;",
      "χ": "&chi;",
      "ψ": "&psi;",
      "ω": "&omega;",
      "ϑ": "&thetasym;",
      "ϒ": "&upsih;",
      "ϖ": "&piv;",
      "•": "&bull;",
      "…": "&hellip;",
      "′": "&prime;",
      "″": "&Prime;",
      "‾": "&oline;",
      "⁄": "&frasl;",
      "℘": "&weierp;",
      "ℑ": "&image;",
      "ℜ": "&real;",
      "™": "&trade;",
      "ℵ": "&alefsym;",
      "←": "&larr;",
      "↑": "&uarr;",
      "→": "&rarr;",
      "↓": "&darr;",
      "↔": "&harr;",
      "↵": "&crarr;",
      "⇐": "&lArr;",
      "⇑": "&uArr;",
      "⇒": "&rArr;",
      "⇓": "&dArr;",
      "⇔": "&hArr;",
      "∀": "&forall;",
      "∂": "&part;",
      "∃": "&exist;",
      "∅": "&empty;",
      "∇": "&nabla;",
      "∈": "&isin;",
      "∉": "&notin;",
      "∋": "&ni;",
      "∏": "&prod;",
      "∑": "&sum;",
      "−": "&minus;",
      "∗": "&lowast;",
      "√": "&radic;",
      "∝": "&prop;",
      "∞": "&infin;",
      "∠": "&ang;",
      "∧": "&and;",
      "∨": "&or;",
      "∩": "&cap;",
      "∪": "&cup;",
      "∫": "&int;",
      "∴": "&there4;",
      "∼": "&sim;",
      "≅": "&cong;",
      "≈": "&asymp;",
      "≠": "&ne;",
      "≡": "&equiv;",
      "≤": "&le;",
      "≥": "&ge;",
      "⊂": "&sub;",
      "⊃": "&sup;",
      "⊄": "&nsub;",
      "⊆": "&sube;",
      "⊇": "&supe;",
      "⊕": "&oplus;",
      "⊗": "&otimes;",
      "⊥": "&perp;",
      "⋅": "&sdot;",
      "⌈": "&lceil;",
      "⌉": "&rceil;",
      "⌊": "&lfloor;",
      "⌋": "&rfloor;",
      "〈": "&lang;",
      "〉": "&rang;",
      "◊": "&loz;",
      "♠": "&spades;",
      "♣": "&clubs;",
      "♥": "&hearts;",
      "♦": "&diams;"
    }
  },
  html5: {
    entities: {
      "&AElig": "Æ",
      "&AElig;": "Æ",
      "&AMP": "&",
      "&AMP;": "&",
      "&Aacute": "Á",
      "&Aacute;": "Á",
      "&Abreve;": "Ă",
      "&Acirc": "Â",
      "&Acirc;": "Â",
      "&Acy;": "А",
      "&Afr;": "𝔄",
      "&Agrave": "À",
      "&Agrave;": "À",
      "&Alpha;": "Α",
      "&Amacr;": "Ā",
      "&And;": "⩓",
      "&Aogon;": "Ą",
      "&Aopf;": "𝔸",
      "&ApplyFunction;": "⁡",
      "&Aring": "Å",
      "&Aring;": "Å",
      "&Ascr;": "𝒜",
      "&Assign;": "≔",
      "&Atilde": "Ã",
      "&Atilde;": "Ã",
      "&Auml": "Ä",
      "&Auml;": "Ä",
      "&Backslash;": "∖",
      "&Barv;": "⫧",
      "&Barwed;": "⌆",
      "&Bcy;": "Б",
      "&Because;": "∵",
      "&Bernoullis;": "ℬ",
      "&Beta;": "Β",
      "&Bfr;": "𝔅",
      "&Bopf;": "𝔹",
      "&Breve;": "˘",
      "&Bscr;": "ℬ",
      "&Bumpeq;": "≎",
      "&CHcy;": "Ч",
      "&COPY": "©",
      "&COPY;": "©",
      "&Cacute;": "Ć",
      "&Cap;": "⋒",
      "&CapitalDifferentialD;": "ⅅ",
      "&Cayleys;": "ℭ",
      "&Ccaron;": "Č",
      "&Ccedil": "Ç",
      "&Ccedil;": "Ç",
      "&Ccirc;": "Ĉ",
      "&Cconint;": "∰",
      "&Cdot;": "Ċ",
      "&Cedilla;": "¸",
      "&CenterDot;": "·",
      "&Cfr;": "ℭ",
      "&Chi;": "Χ",
      "&CircleDot;": "⊙",
      "&CircleMinus;": "⊖",
      "&CirclePlus;": "⊕",
      "&CircleTimes;": "⊗",
      "&ClockwiseContourIntegral;": "∲",
      "&CloseCurlyDoubleQuote;": "”",
      "&CloseCurlyQuote;": "’",
      "&Colon;": "∷",
      "&Colone;": "⩴",
      "&Congruent;": "≡",
      "&Conint;": "∯",
      "&ContourIntegral;": "∮",
      "&Copf;": "ℂ",
      "&Coproduct;": "∐",
      "&CounterClockwiseContourIntegral;": "∳",
      "&Cross;": "⨯",
      "&Cscr;": "𝒞",
      "&Cup;": "⋓",
      "&CupCap;": "≍",
      "&DD;": "ⅅ",
      "&DDotrahd;": "⤑",
      "&DJcy;": "Ђ",
      "&DScy;": "Ѕ",
      "&DZcy;": "Џ",
      "&Dagger;": "‡",
      "&Darr;": "↡",
      "&Dashv;": "⫤",
      "&Dcaron;": "Ď",
      "&Dcy;": "Д",
      "&Del;": "∇",
      "&Delta;": "Δ",
      "&Dfr;": "𝔇",
      "&DiacriticalAcute;": "´",
      "&DiacriticalDot;": "˙",
      "&DiacriticalDoubleAcute;": "˝",
      "&DiacriticalGrave;": "`",
      "&DiacriticalTilde;": "˜",
      "&Diamond;": "⋄",
      "&DifferentialD;": "ⅆ",
      "&Dopf;": "𝔻",
      "&Dot;": "¨",
      "&DotDot;": "⃜",
      "&DotEqual;": "≐",
      "&DoubleContourIntegral;": "∯",
      "&DoubleDot;": "¨",
      "&DoubleDownArrow;": "⇓",
      "&DoubleLeftArrow;": "⇐",
      "&DoubleLeftRightArrow;": "⇔",
      "&DoubleLeftTee;": "⫤",
      "&DoubleLongLeftArrow;": "⟸",
      "&DoubleLongLeftRightArrow;": "⟺",
      "&DoubleLongRightArrow;": "⟹",
      "&DoubleRightArrow;": "⇒",
      "&DoubleRightTee;": "⊨",
      "&DoubleUpArrow;": "⇑",
      "&DoubleUpDownArrow;": "⇕",
      "&DoubleVerticalBar;": "∥",
      "&DownArrow;": "↓",
      "&DownArrowBar;": "⤓",
      "&DownArrowUpArrow;": "⇵",
      "&DownBreve;": "̑",
      "&DownLeftRightVector;": "⥐",
      "&DownLeftTeeVector;": "⥞",
      "&DownLeftVector;": "↽",
      "&DownLeftVectorBar;": "⥖",
      "&DownRightTeeVector;": "⥟",
      "&DownRightVector;": "⇁",
      "&DownRightVectorBar;": "⥗",
      "&DownTee;": "⊤",
      "&DownTeeArrow;": "↧",
      "&Downarrow;": "⇓",
      "&Dscr;": "𝒟",
      "&Dstrok;": "Đ",
      "&ENG;": "Ŋ",
      "&ETH": "Ð",
      "&ETH;": "Ð",
      "&Eacute": "É",
      "&Eacute;": "É",
      "&Ecaron;": "Ě",
      "&Ecirc": "Ê",
      "&Ecirc;": "Ê",
      "&Ecy;": "Э",
      "&Edot;": "Ė",
      "&Efr;": "𝔈",
      "&Egrave": "È",
      "&Egrave;": "È",
      "&Element;": "∈",
      "&Emacr;": "Ē",
      "&EmptySmallSquare;": "◻",
      "&EmptyVerySmallSquare;": "▫",
      "&Eogon;": "Ę",
      "&Eopf;": "𝔼",
      "&Epsilon;": "Ε",
      "&Equal;": "⩵",
      "&EqualTilde;": "≂",
      "&Equilibrium;": "⇌",
      "&Escr;": "ℰ",
      "&Esim;": "⩳",
      "&Eta;": "Η",
      "&Euml": "Ë",
      "&Euml;": "Ë",
      "&Exists;": "∃",
      "&ExponentialE;": "ⅇ",
      "&Fcy;": "Ф",
      "&Ffr;": "𝔉",
      "&FilledSmallSquare;": "◼",
      "&FilledVerySmallSquare;": "▪",
      "&Fopf;": "𝔽",
      "&ForAll;": "∀",
      "&Fouriertrf;": "ℱ",
      "&Fscr;": "ℱ",
      "&GJcy;": "Ѓ",
      "&GT": ">",
      "&GT;": ">",
      "&Gamma;": "Γ",
      "&Gammad;": "Ϝ",
      "&Gbreve;": "Ğ",
      "&Gcedil;": "Ģ",
      "&Gcirc;": "Ĝ",
      "&Gcy;": "Г",
      "&Gdot;": "Ġ",
      "&Gfr;": "𝔊",
      "&Gg;": "⋙",
      "&Gopf;": "𝔾",
      "&GreaterEqual;": "≥",
      "&GreaterEqualLess;": "⋛",
      "&GreaterFullEqual;": "≧",
      "&GreaterGreater;": "⪢",
      "&GreaterLess;": "≷",
      "&GreaterSlantEqual;": "⩾",
      "&GreaterTilde;": "≳",
      "&Gscr;": "𝒢",
      "&Gt;": "≫",
      "&HARDcy;": "Ъ",
      "&Hacek;": "ˇ",
      "&Hat;": "^",
      "&Hcirc;": "Ĥ",
      "&Hfr;": "ℌ",
      "&HilbertSpace;": "ℋ",
      "&Hopf;": "ℍ",
      "&HorizontalLine;": "─",
      "&Hscr;": "ℋ",
      "&Hstrok;": "Ħ",
      "&HumpDownHump;": "≎",
      "&HumpEqual;": "≏",
      "&IEcy;": "Е",
      "&IJlig;": "Ĳ",
      "&IOcy;": "Ё",
      "&Iacute": "Í",
      "&Iacute;": "Í",
      "&Icirc": "Î",
      "&Icirc;": "Î",
      "&Icy;": "И",
      "&Idot;": "İ",
      "&Ifr;": "ℑ",
      "&Igrave": "Ì",
      "&Igrave;": "Ì",
      "&Im;": "ℑ",
      "&Imacr;": "Ī",
      "&ImaginaryI;": "ⅈ",
      "&Implies;": "⇒",
      "&Int;": "∬",
      "&Integral;": "∫",
      "&Intersection;": "⋂",
      "&InvisibleComma;": "⁣",
      "&InvisibleTimes;": "⁢",
      "&Iogon;": "Į",
      "&Iopf;": "𝕀",
      "&Iota;": "Ι",
      "&Iscr;": "ℐ",
      "&Itilde;": "Ĩ",
      "&Iukcy;": "І",
      "&Iuml": "Ï",
      "&Iuml;": "Ï",
      "&Jcirc;": "Ĵ",
      "&Jcy;": "Й",
      "&Jfr;": "𝔍",
      "&Jopf;": "𝕁",
      "&Jscr;": "𝒥",
      "&Jsercy;": "Ј",
      "&Jukcy;": "Є",
      "&KHcy;": "Х",
      "&KJcy;": "Ќ",
      "&Kappa;": "Κ",
      "&Kcedil;": "Ķ",
      "&Kcy;": "К",
      "&Kfr;": "𝔎",
      "&Kopf;": "𝕂",
      "&Kscr;": "𝒦",
      "&LJcy;": "Љ",
      "&LT": "<",
      "&LT;": "<",
      "&Lacute;": "Ĺ",
      "&Lambda;": "Λ",
      "&Lang;": "⟪",
      "&Laplacetrf;": "ℒ",
      "&Larr;": "↞",
      "&Lcaron;": "Ľ",
      "&Lcedil;": "Ļ",
      "&Lcy;": "Л",
      "&LeftAngleBracket;": "⟨",
      "&LeftArrow;": "←",
      "&LeftArrowBar;": "⇤",
      "&LeftArrowRightArrow;": "⇆",
      "&LeftCeiling;": "⌈",
      "&LeftDoubleBracket;": "⟦",
      "&LeftDownTeeVector;": "⥡",
      "&LeftDownVector;": "⇃",
      "&LeftDownVectorBar;": "⥙",
      "&LeftFloor;": "⌊",
      "&LeftRightArrow;": "↔",
      "&LeftRightVector;": "⥎",
      "&LeftTee;": "⊣",
      "&LeftTeeArrow;": "↤",
      "&LeftTeeVector;": "⥚",
      "&LeftTriangle;": "⊲",
      "&LeftTriangleBar;": "⧏",
      "&LeftTriangleEqual;": "⊴",
      "&LeftUpDownVector;": "⥑",
      "&LeftUpTeeVector;": "⥠",
      "&LeftUpVector;": "↿",
      "&LeftUpVectorBar;": "⥘",
      "&LeftVector;": "↼",
      "&LeftVectorBar;": "⥒",
      "&Leftarrow;": "⇐",
      "&Leftrightarrow;": "⇔",
      "&LessEqualGreater;": "⋚",
      "&LessFullEqual;": "≦",
      "&LessGreater;": "≶",
      "&LessLess;": "⪡",
      "&LessSlantEqual;": "⩽",
      "&LessTilde;": "≲",
      "&Lfr;": "𝔏",
      "&Ll;": "⋘",
      "&Lleftarrow;": "⇚",
      "&Lmidot;": "Ŀ",
      "&LongLeftArrow;": "⟵",
      "&LongLeftRightArrow;": "⟷",
      "&LongRightArrow;": "⟶",
      "&Longleftarrow;": "⟸",
      "&Longleftrightarrow;": "⟺",
      "&Longrightarrow;": "⟹",
      "&Lopf;": "𝕃",
      "&LowerLeftArrow;": "↙",
      "&LowerRightArrow;": "↘",
      "&Lscr;": "ℒ",
      "&Lsh;": "↰",
      "&Lstrok;": "Ł",
      "&Lt;": "≪",
      "&Map;": "⤅",
      "&Mcy;": "М",
      "&MediumSpace;": " ",
      "&Mellintrf;": "ℳ",
      "&Mfr;": "𝔐",
      "&MinusPlus;": "∓",
      "&Mopf;": "𝕄",
      "&Mscr;": "ℳ",
      "&Mu;": "Μ",
      "&NJcy;": "Њ",
      "&Nacute;": "Ń",
      "&Ncaron;": "Ň",
      "&Ncedil;": "Ņ",
      "&Ncy;": "Н",
      "&NegativeMediumSpace;": "​",
      "&NegativeThickSpace;": "​",
      "&NegativeThinSpace;": "​",
      "&NegativeVeryThinSpace;": "​",
      "&NestedGreaterGreater;": "≫",
      "&NestedLessLess;": "≪",
      "&NewLine;": "\n",
      "&Nfr;": "𝔑",
      "&NoBreak;": "⁠",
      "&NonBreakingSpace;": " ",
      "&Nopf;": "ℕ",
      "&Not;": "⫬",
      "&NotCongruent;": "≢",
      "&NotCupCap;": "≭",
      "&NotDoubleVerticalBar;": "∦",
      "&NotElement;": "∉",
      "&NotEqual;": "≠",
      "&NotEqualTilde;": "≂̸",
      "&NotExists;": "∄",
      "&NotGreater;": "≯",
      "&NotGreaterEqual;": "≱",
      "&NotGreaterFullEqual;": "≧̸",
      "&NotGreaterGreater;": "≫̸",
      "&NotGreaterLess;": "≹",
      "&NotGreaterSlantEqual;": "⩾̸",
      "&NotGreaterTilde;": "≵",
      "&NotHumpDownHump;": "≎̸",
      "&NotHumpEqual;": "≏̸",
      "&NotLeftTriangle;": "⋪",
      "&NotLeftTriangleBar;": "⧏̸",
      "&NotLeftTriangleEqual;": "⋬",
      "&NotLess;": "≮",
      "&NotLessEqual;": "≰",
      "&NotLessGreater;": "≸",
      "&NotLessLess;": "≪̸",
      "&NotLessSlantEqual;": "⩽̸",
      "&NotLessTilde;": "≴",
      "&NotNestedGreaterGreater;": "⪢̸",
      "&NotNestedLessLess;": "⪡̸",
      "&NotPrecedes;": "⊀",
      "&NotPrecedesEqual;": "⪯̸",
      "&NotPrecedesSlantEqual;": "⋠",
      "&NotReverseElement;": "∌",
      "&NotRightTriangle;": "⋫",
      "&NotRightTriangleBar;": "⧐̸",
      "&NotRightTriangleEqual;": "⋭",
      "&NotSquareSubset;": "⊏̸",
      "&NotSquareSubsetEqual;": "⋢",
      "&NotSquareSuperset;": "⊐̸",
      "&NotSquareSupersetEqual;": "⋣",
      "&NotSubset;": "⊂⃒",
      "&NotSubsetEqual;": "⊈",
      "&NotSucceeds;": "⊁",
      "&NotSucceedsEqual;": "⪰̸",
      "&NotSucceedsSlantEqual;": "⋡",
      "&NotSucceedsTilde;": "≿̸",
      "&NotSuperset;": "⊃⃒",
      "&NotSupersetEqual;": "⊉",
      "&NotTilde;": "≁",
      "&NotTildeEqual;": "≄",
      "&NotTildeFullEqual;": "≇",
      "&NotTildeTilde;": "≉",
      "&NotVerticalBar;": "∤",
      "&Nscr;": "𝒩",
      "&Ntilde": "Ñ",
      "&Ntilde;": "Ñ",
      "&Nu;": "Ν",
      "&OElig;": "Œ",
      "&Oacute": "Ó",
      "&Oacute;": "Ó",
      "&Ocirc": "Ô",
      "&Ocirc;": "Ô",
      "&Ocy;": "О",
      "&Odblac;": "Ő",
      "&Ofr;": "𝔒",
      "&Ograve": "Ò",
      "&Ograve;": "Ò",
      "&Omacr;": "Ō",
      "&Omega;": "Ω",
      "&Omicron;": "Ο",
      "&Oopf;": "𝕆",
      "&OpenCurlyDoubleQuote;": "“",
      "&OpenCurlyQuote;": "‘",
      "&Or;": "⩔",
      "&Oscr;": "𝒪",
      "&Oslash": "Ø",
      "&Oslash;": "Ø",
      "&Otilde": "Õ",
      "&Otilde;": "Õ",
      "&Otimes;": "⨷",
      "&Ouml": "Ö",
      "&Ouml;": "Ö",
      "&OverBar;": "‾",
      "&OverBrace;": "⏞",
      "&OverBracket;": "⎴",
      "&OverParenthesis;": "⏜",
      "&PartialD;": "∂",
      "&Pcy;": "П",
      "&Pfr;": "𝔓",
      "&Phi;": "Φ",
      "&Pi;": "Π",
      "&PlusMinus;": "±",
      "&Poincareplane;": "ℌ",
      "&Popf;": "ℙ",
      "&Pr;": "⪻",
      "&Precedes;": "≺",
      "&PrecedesEqual;": "⪯",
      "&PrecedesSlantEqual;": "≼",
      "&PrecedesTilde;": "≾",
      "&Prime;": "″",
      "&Product;": "∏",
      "&Proportion;": "∷",
      "&Proportional;": "∝",
      "&Pscr;": "𝒫",
      "&Psi;": "Ψ",
      "&QUOT": '"',
      "&QUOT;": '"',
      "&Qfr;": "𝔔",
      "&Qopf;": "ℚ",
      "&Qscr;": "𝒬",
      "&RBarr;": "⤐",
      "&REG": "®",
      "&REG;": "®",
      "&Racute;": "Ŕ",
      "&Rang;": "⟫",
      "&Rarr;": "↠",
      "&Rarrtl;": "⤖",
      "&Rcaron;": "Ř",
      "&Rcedil;": "Ŗ",
      "&Rcy;": "Р",
      "&Re;": "ℜ",
      "&ReverseElement;": "∋",
      "&ReverseEquilibrium;": "⇋",
      "&ReverseUpEquilibrium;": "⥯",
      "&Rfr;": "ℜ",
      "&Rho;": "Ρ",
      "&RightAngleBracket;": "⟩",
      "&RightArrow;": "→",
      "&RightArrowBar;": "⇥",
      "&RightArrowLeftArrow;": "⇄",
      "&RightCeiling;": "⌉",
      "&RightDoubleBracket;": "⟧",
      "&RightDownTeeVector;": "⥝",
      "&RightDownVector;": "⇂",
      "&RightDownVectorBar;": "⥕",
      "&RightFloor;": "⌋",
      "&RightTee;": "⊢",
      "&RightTeeArrow;": "↦",
      "&RightTeeVector;": "⥛",
      "&RightTriangle;": "⊳",
      "&RightTriangleBar;": "⧐",
      "&RightTriangleEqual;": "⊵",
      "&RightUpDownVector;": "⥏",
      "&RightUpTeeVector;": "⥜",
      "&RightUpVector;": "↾",
      "&RightUpVectorBar;": "⥔",
      "&RightVector;": "⇀",
      "&RightVectorBar;": "⥓",
      "&Rightarrow;": "⇒",
      "&Ropf;": "ℝ",
      "&RoundImplies;": "⥰",
      "&Rrightarrow;": "⇛",
      "&Rscr;": "ℛ",
      "&Rsh;": "↱",
      "&RuleDelayed;": "⧴",
      "&SHCHcy;": "Щ",
      "&SHcy;": "Ш",
      "&SOFTcy;": "Ь",
      "&Sacute;": "Ś",
      "&Sc;": "⪼",
      "&Scaron;": "Š",
      "&Scedil;": "Ş",
      "&Scirc;": "Ŝ",
      "&Scy;": "С",
      "&Sfr;": "𝔖",
      "&ShortDownArrow;": "↓",
      "&ShortLeftArrow;": "←",
      "&ShortRightArrow;": "→",
      "&ShortUpArrow;": "↑",
      "&Sigma;": "Σ",
      "&SmallCircle;": "∘",
      "&Sopf;": "𝕊",
      "&Sqrt;": "√",
      "&Square;": "□",
      "&SquareIntersection;": "⊓",
      "&SquareSubset;": "⊏",
      "&SquareSubsetEqual;": "⊑",
      "&SquareSuperset;": "⊐",
      "&SquareSupersetEqual;": "⊒",
      "&SquareUnion;": "⊔",
      "&Sscr;": "𝒮",
      "&Star;": "⋆",
      "&Sub;": "⋐",
      "&Subset;": "⋐",
      "&SubsetEqual;": "⊆",
      "&Succeeds;": "≻",
      "&SucceedsEqual;": "⪰",
      "&SucceedsSlantEqual;": "≽",
      "&SucceedsTilde;": "≿",
      "&SuchThat;": "∋",
      "&Sum;": "∑",
      "&Sup;": "⋑",
      "&Superset;": "⊃",
      "&SupersetEqual;": "⊇",
      "&Supset;": "⋑",
      "&THORN": "Þ",
      "&THORN;": "Þ",
      "&TRADE;": "™",
      "&TSHcy;": "Ћ",
      "&TScy;": "Ц",
      "&Tab;": "\t",
      "&Tau;": "Τ",
      "&Tcaron;": "Ť",
      "&Tcedil;": "Ţ",
      "&Tcy;": "Т",
      "&Tfr;": "𝔗",
      "&Therefore;": "∴",
      "&Theta;": "Θ",
      "&ThickSpace;": "  ",
      "&ThinSpace;": " ",
      "&Tilde;": "∼",
      "&TildeEqual;": "≃",
      "&TildeFullEqual;": "≅",
      "&TildeTilde;": "≈",
      "&Topf;": "𝕋",
      "&TripleDot;": "⃛",
      "&Tscr;": "𝒯",
      "&Tstrok;": "Ŧ",
      "&Uacute": "Ú",
      "&Uacute;": "Ú",
      "&Uarr;": "↟",
      "&Uarrocir;": "⥉",
      "&Ubrcy;": "Ў",
      "&Ubreve;": "Ŭ",
      "&Ucirc": "Û",
      "&Ucirc;": "Û",
      "&Ucy;": "У",
      "&Udblac;": "Ű",
      "&Ufr;": "𝔘",
      "&Ugrave": "Ù",
      "&Ugrave;": "Ù",
      "&Umacr;": "Ū",
      "&UnderBar;": "_",
      "&UnderBrace;": "⏟",
      "&UnderBracket;": "⎵",
      "&UnderParenthesis;": "⏝",
      "&Union;": "⋃",
      "&UnionPlus;": "⊎",
      "&Uogon;": "Ų",
      "&Uopf;": "𝕌",
      "&UpArrow;": "↑",
      "&UpArrowBar;": "⤒",
      "&UpArrowDownArrow;": "⇅",
      "&UpDownArrow;": "↕",
      "&UpEquilibrium;": "⥮",
      "&UpTee;": "⊥",
      "&UpTeeArrow;": "↥",
      "&Uparrow;": "⇑",
      "&Updownarrow;": "⇕",
      "&UpperLeftArrow;": "↖",
      "&UpperRightArrow;": "↗",
      "&Upsi;": "ϒ",
      "&Upsilon;": "Υ",
      "&Uring;": "Ů",
      "&Uscr;": "𝒰",
      "&Utilde;": "Ũ",
      "&Uuml": "Ü",
      "&Uuml;": "Ü",
      "&VDash;": "⊫",
      "&Vbar;": "⫫",
      "&Vcy;": "В",
      "&Vdash;": "⊩",
      "&Vdashl;": "⫦",
      "&Vee;": "⋁",
      "&Verbar;": "‖",
      "&Vert;": "‖",
      "&VerticalBar;": "∣",
      "&VerticalLine;": "|",
      "&VerticalSeparator;": "❘",
      "&VerticalTilde;": "≀",
      "&VeryThinSpace;": " ",
      "&Vfr;": "𝔙",
      "&Vopf;": "𝕍",
      "&Vscr;": "𝒱",
      "&Vvdash;": "⊪",
      "&Wcirc;": "Ŵ",
      "&Wedge;": "⋀",
      "&Wfr;": "𝔚",
      "&Wopf;": "𝕎",
      "&Wscr;": "𝒲",
      "&Xfr;": "𝔛",
      "&Xi;": "Ξ",
      "&Xopf;": "𝕏",
      "&Xscr;": "𝒳",
      "&YAcy;": "Я",
      "&YIcy;": "Ї",
      "&YUcy;": "Ю",
      "&Yacute": "Ý",
      "&Yacute;": "Ý",
      "&Ycirc;": "Ŷ",
      "&Ycy;": "Ы",
      "&Yfr;": "𝔜",
      "&Yopf;": "𝕐",
      "&Yscr;": "𝒴",
      "&Yuml;": "Ÿ",
      "&ZHcy;": "Ж",
      "&Zacute;": "Ź",
      "&Zcaron;": "Ž",
      "&Zcy;": "З",
      "&Zdot;": "Ż",
      "&ZeroWidthSpace;": "​",
      "&Zeta;": "Ζ",
      "&Zfr;": "ℨ",
      "&Zopf;": "ℤ",
      "&Zscr;": "𝒵",
      "&aacute": "á",
      "&aacute;": "á",
      "&abreve;": "ă",
      "&ac;": "∾",
      "&acE;": "∾̳",
      "&acd;": "∿",
      "&acirc": "â",
      "&acirc;": "â",
      "&acute": "´",
      "&acute;": "´",
      "&acy;": "а",
      "&aelig": "æ",
      "&aelig;": "æ",
      "&af;": "⁡",
      "&afr;": "𝔞",
      "&agrave": "à",
      "&agrave;": "à",
      "&alefsym;": "ℵ",
      "&aleph;": "ℵ",
      "&alpha;": "α",
      "&amacr;": "ā",
      "&amalg;": "⨿",
      "&amp": "&",
      "&amp;": "&",
      "&and;": "∧",
      "&andand;": "⩕",
      "&andd;": "⩜",
      "&andslope;": "⩘",
      "&andv;": "⩚",
      "&ang;": "∠",
      "&ange;": "⦤",
      "&angle;": "∠",
      "&angmsd;": "∡",
      "&angmsdaa;": "⦨",
      "&angmsdab;": "⦩",
      "&angmsdac;": "⦪",
      "&angmsdad;": "⦫",
      "&angmsdae;": "⦬",
      "&angmsdaf;": "⦭",
      "&angmsdag;": "⦮",
      "&angmsdah;": "⦯",
      "&angrt;": "∟",
      "&angrtvb;": "⊾",
      "&angrtvbd;": "⦝",
      "&angsph;": "∢",
      "&angst;": "Å",
      "&angzarr;": "⍼",
      "&aogon;": "ą",
      "&aopf;": "𝕒",
      "&ap;": "≈",
      "&apE;": "⩰",
      "&apacir;": "⩯",
      "&ape;": "≊",
      "&apid;": "≋",
      "&apos;": "'",
      "&approx;": "≈",
      "&approxeq;": "≊",
      "&aring": "å",
      "&aring;": "å",
      "&ascr;": "𝒶",
      "&ast;": "*",
      "&asymp;": "≈",
      "&asympeq;": "≍",
      "&atilde": "ã",
      "&atilde;": "ã",
      "&auml": "ä",
      "&auml;": "ä",
      "&awconint;": "∳",
      "&awint;": "⨑",
      "&bNot;": "⫭",
      "&backcong;": "≌",
      "&backepsilon;": "϶",
      "&backprime;": "‵",
      "&backsim;": "∽",
      "&backsimeq;": "⋍",
      "&barvee;": "⊽",
      "&barwed;": "⌅",
      "&barwedge;": "⌅",
      "&bbrk;": "⎵",
      "&bbrktbrk;": "⎶",
      "&bcong;": "≌",
      "&bcy;": "б",
      "&bdquo;": "„",
      "&becaus;": "∵",
      "&because;": "∵",
      "&bemptyv;": "⦰",
      "&bepsi;": "϶",
      "&bernou;": "ℬ",
      "&beta;": "β",
      "&beth;": "ℶ",
      "&between;": "≬",
      "&bfr;": "𝔟",
      "&bigcap;": "⋂",
      "&bigcirc;": "◯",
      "&bigcup;": "⋃",
      "&bigodot;": "⨀",
      "&bigoplus;": "⨁",
      "&bigotimes;": "⨂",
      "&bigsqcup;": "⨆",
      "&bigstar;": "★",
      "&bigtriangledown;": "▽",
      "&bigtriangleup;": "△",
      "&biguplus;": "⨄",
      "&bigvee;": "⋁",
      "&bigwedge;": "⋀",
      "&bkarow;": "⤍",
      "&blacklozenge;": "⧫",
      "&blacksquare;": "▪",
      "&blacktriangle;": "▴",
      "&blacktriangledown;": "▾",
      "&blacktriangleleft;": "◂",
      "&blacktriangleright;": "▸",
      "&blank;": "␣",
      "&blk12;": "▒",
      "&blk14;": "░",
      "&blk34;": "▓",
      "&block;": "█",
      "&bne;": "=⃥",
      "&bnequiv;": "≡⃥",
      "&bnot;": "⌐",
      "&bopf;": "𝕓",
      "&bot;": "⊥",
      "&bottom;": "⊥",
      "&bowtie;": "⋈",
      "&boxDL;": "╗",
      "&boxDR;": "╔",
      "&boxDl;": "╖",
      "&boxDr;": "╓",
      "&boxH;": "═",
      "&boxHD;": "╦",
      "&boxHU;": "╩",
      "&boxHd;": "╤",
      "&boxHu;": "╧",
      "&boxUL;": "╝",
      "&boxUR;": "╚",
      "&boxUl;": "╜",
      "&boxUr;": "╙",
      "&boxV;": "║",
      "&boxVH;": "╬",
      "&boxVL;": "╣",
      "&boxVR;": "╠",
      "&boxVh;": "╫",
      "&boxVl;": "╢",
      "&boxVr;": "╟",
      "&boxbox;": "⧉",
      "&boxdL;": "╕",
      "&boxdR;": "╒",
      "&boxdl;": "┐",
      "&boxdr;": "┌",
      "&boxh;": "─",
      "&boxhD;": "╥",
      "&boxhU;": "╨",
      "&boxhd;": "┬",
      "&boxhu;": "┴",
      "&boxminus;": "⊟",
      "&boxplus;": "⊞",
      "&boxtimes;": "⊠",
      "&boxuL;": "╛",
      "&boxuR;": "╘",
      "&boxul;": "┘",
      "&boxur;": "└",
      "&boxv;": "│",
      "&boxvH;": "╪",
      "&boxvL;": "╡",
      "&boxvR;": "╞",
      "&boxvh;": "┼",
      "&boxvl;": "┤",
      "&boxvr;": "├",
      "&bprime;": "‵",
      "&breve;": "˘",
      "&brvbar": "¦",
      "&brvbar;": "¦",
      "&bscr;": "𝒷",
      "&bsemi;": "⁏",
      "&bsim;": "∽",
      "&bsime;": "⋍",
      "&bsol;": "\\",
      "&bsolb;": "⧅",
      "&bsolhsub;": "⟈",
      "&bull;": "•",
      "&bullet;": "•",
      "&bump;": "≎",
      "&bumpE;": "⪮",
      "&bumpe;": "≏",
      "&bumpeq;": "≏",
      "&cacute;": "ć",
      "&cap;": "∩",
      "&capand;": "⩄",
      "&capbrcup;": "⩉",
      "&capcap;": "⩋",
      "&capcup;": "⩇",
      "&capdot;": "⩀",
      "&caps;": "∩︀",
      "&caret;": "⁁",
      "&caron;": "ˇ",
      "&ccaps;": "⩍",
      "&ccaron;": "č",
      "&ccedil": "ç",
      "&ccedil;": "ç",
      "&ccirc;": "ĉ",
      "&ccups;": "⩌",
      "&ccupssm;": "⩐",
      "&cdot;": "ċ",
      "&cedil": "¸",
      "&cedil;": "¸",
      "&cemptyv;": "⦲",
      "&cent": "¢",
      "&cent;": "¢",
      "&centerdot;": "·",
      "&cfr;": "𝔠",
      "&chcy;": "ч",
      "&check;": "✓",
      "&checkmark;": "✓",
      "&chi;": "χ",
      "&cir;": "○",
      "&cirE;": "⧃",
      "&circ;": "ˆ",
      "&circeq;": "≗",
      "&circlearrowleft;": "↺",
      "&circlearrowright;": "↻",
      "&circledR;": "®",
      "&circledS;": "Ⓢ",
      "&circledast;": "⊛",
      "&circledcirc;": "⊚",
      "&circleddash;": "⊝",
      "&cire;": "≗",
      "&cirfnint;": "⨐",
      "&cirmid;": "⫯",
      "&cirscir;": "⧂",
      "&clubs;": "♣",
      "&clubsuit;": "♣",
      "&colon;": ":",
      "&colone;": "≔",
      "&coloneq;": "≔",
      "&comma;": ",",
      "&commat;": "@",
      "&comp;": "∁",
      "&compfn;": "∘",
      "&complement;": "∁",
      "&complexes;": "ℂ",
      "&cong;": "≅",
      "&congdot;": "⩭",
      "&conint;": "∮",
      "&copf;": "𝕔",
      "&coprod;": "∐",
      "&copy": "©",
      "&copy;": "©",
      "&copysr;": "℗",
      "&crarr;": "↵",
      "&cross;": "✗",
      "&cscr;": "𝒸",
      "&csub;": "⫏",
      "&csube;": "⫑",
      "&csup;": "⫐",
      "&csupe;": "⫒",
      "&ctdot;": "⋯",
      "&cudarrl;": "⤸",
      "&cudarrr;": "⤵",
      "&cuepr;": "⋞",
      "&cuesc;": "⋟",
      "&cularr;": "↶",
      "&cularrp;": "⤽",
      "&cup;": "∪",
      "&cupbrcap;": "⩈",
      "&cupcap;": "⩆",
      "&cupcup;": "⩊",
      "&cupdot;": "⊍",
      "&cupor;": "⩅",
      "&cups;": "∪︀",
      "&curarr;": "↷",
      "&curarrm;": "⤼",
      "&curlyeqprec;": "⋞",
      "&curlyeqsucc;": "⋟",
      "&curlyvee;": "⋎",
      "&curlywedge;": "⋏",
      "&curren": "¤",
      "&curren;": "¤",
      "&curvearrowleft;": "↶",
      "&curvearrowright;": "↷",
      "&cuvee;": "⋎",
      "&cuwed;": "⋏",
      "&cwconint;": "∲",
      "&cwint;": "∱",
      "&cylcty;": "⌭",
      "&dArr;": "⇓",
      "&dHar;": "⥥",
      "&dagger;": "†",
      "&daleth;": "ℸ",
      "&darr;": "↓",
      "&dash;": "‐",
      "&dashv;": "⊣",
      "&dbkarow;": "⤏",
      "&dblac;": "˝",
      "&dcaron;": "ď",
      "&dcy;": "д",
      "&dd;": "ⅆ",
      "&ddagger;": "‡",
      "&ddarr;": "⇊",
      "&ddotseq;": "⩷",
      "&deg": "°",
      "&deg;": "°",
      "&delta;": "δ",
      "&demptyv;": "⦱",
      "&dfisht;": "⥿",
      "&dfr;": "𝔡",
      "&dharl;": "⇃",
      "&dharr;": "⇂",
      "&diam;": "⋄",
      "&diamond;": "⋄",
      "&diamondsuit;": "♦",
      "&diams;": "♦",
      "&die;": "¨",
      "&digamma;": "ϝ",
      "&disin;": "⋲",
      "&div;": "÷",
      "&divide": "÷",
      "&divide;": "÷",
      "&divideontimes;": "⋇",
      "&divonx;": "⋇",
      "&djcy;": "ђ",
      "&dlcorn;": "⌞",
      "&dlcrop;": "⌍",
      "&dollar;": "$",
      "&dopf;": "𝕕",
      "&dot;": "˙",
      "&doteq;": "≐",
      "&doteqdot;": "≑",
      "&dotminus;": "∸",
      "&dotplus;": "∔",
      "&dotsquare;": "⊡",
      "&doublebarwedge;": "⌆",
      "&downarrow;": "↓",
      "&downdownarrows;": "⇊",
      "&downharpoonleft;": "⇃",
      "&downharpoonright;": "⇂",
      "&drbkarow;": "⤐",
      "&drcorn;": "⌟",
      "&drcrop;": "⌌",
      "&dscr;": "𝒹",
      "&dscy;": "ѕ",
      "&dsol;": "⧶",
      "&dstrok;": "đ",
      "&dtdot;": "⋱",
      "&dtri;": "▿",
      "&dtrif;": "▾",
      "&duarr;": "⇵",
      "&duhar;": "⥯",
      "&dwangle;": "⦦",
      "&dzcy;": "џ",
      "&dzigrarr;": "⟿",
      "&eDDot;": "⩷",
      "&eDot;": "≑",
      "&eacute": "é",
      "&eacute;": "é",
      "&easter;": "⩮",
      "&ecaron;": "ě",
      "&ecir;": "≖",
      "&ecirc": "ê",
      "&ecirc;": "ê",
      "&ecolon;": "≕",
      "&ecy;": "э",
      "&edot;": "ė",
      "&ee;": "ⅇ",
      "&efDot;": "≒",
      "&efr;": "𝔢",
      "&eg;": "⪚",
      "&egrave": "è",
      "&egrave;": "è",
      "&egs;": "⪖",
      "&egsdot;": "⪘",
      "&el;": "⪙",
      "&elinters;": "⏧",
      "&ell;": "ℓ",
      "&els;": "⪕",
      "&elsdot;": "⪗",
      "&emacr;": "ē",
      "&empty;": "∅",
      "&emptyset;": "∅",
      "&emptyv;": "∅",
      "&emsp13;": " ",
      "&emsp14;": " ",
      "&emsp;": " ",
      "&eng;": "ŋ",
      "&ensp;": " ",
      "&eogon;": "ę",
      "&eopf;": "𝕖",
      "&epar;": "⋕",
      "&eparsl;": "⧣",
      "&eplus;": "⩱",
      "&epsi;": "ε",
      "&epsilon;": "ε",
      "&epsiv;": "ϵ",
      "&eqcirc;": "≖",
      "&eqcolon;": "≕",
      "&eqsim;": "≂",
      "&eqslantgtr;": "⪖",
      "&eqslantless;": "⪕",
      "&equals;": "=",
      "&equest;": "≟",
      "&equiv;": "≡",
      "&equivDD;": "⩸",
      "&eqvparsl;": "⧥",
      "&erDot;": "≓",
      "&erarr;": "⥱",
      "&escr;": "ℯ",
      "&esdot;": "≐",
      "&esim;": "≂",
      "&eta;": "η",
      "&eth": "ð",
      "&eth;": "ð",
      "&euml": "ë",
      "&euml;": "ë",
      "&euro;": "€",
      "&excl;": "!",
      "&exist;": "∃",
      "&expectation;": "ℰ",
      "&exponentiale;": "ⅇ",
      "&fallingdotseq;": "≒",
      "&fcy;": "ф",
      "&female;": "♀",
      "&ffilig;": "ﬃ",
      "&fflig;": "ﬀ",
      "&ffllig;": "ﬄ",
      "&ffr;": "𝔣",
      "&filig;": "ﬁ",
      "&fjlig;": "fj",
      "&flat;": "♭",
      "&fllig;": "ﬂ",
      "&fltns;": "▱",
      "&fnof;": "ƒ",
      "&fopf;": "𝕗",
      "&forall;": "∀",
      "&fork;": "⋔",
      "&forkv;": "⫙",
      "&fpartint;": "⨍",
      "&frac12": "½",
      "&frac12;": "½",
      "&frac13;": "⅓",
      "&frac14": "¼",
      "&frac14;": "¼",
      "&frac15;": "⅕",
      "&frac16;": "⅙",
      "&frac18;": "⅛",
      "&frac23;": "⅔",
      "&frac25;": "⅖",
      "&frac34": "¾",
      "&frac34;": "¾",
      "&frac35;": "⅗",
      "&frac38;": "⅜",
      "&frac45;": "⅘",
      "&frac56;": "⅚",
      "&frac58;": "⅝",
      "&frac78;": "⅞",
      "&frasl;": "⁄",
      "&frown;": "⌢",
      "&fscr;": "𝒻",
      "&gE;": "≧",
      "&gEl;": "⪌",
      "&gacute;": "ǵ",
      "&gamma;": "γ",
      "&gammad;": "ϝ",
      "&gap;": "⪆",
      "&gbreve;": "ğ",
      "&gcirc;": "ĝ",
      "&gcy;": "г",
      "&gdot;": "ġ",
      "&ge;": "≥",
      "&gel;": "⋛",
      "&geq;": "≥",
      "&geqq;": "≧",
      "&geqslant;": "⩾",
      "&ges;": "⩾",
      "&gescc;": "⪩",
      "&gesdot;": "⪀",
      "&gesdoto;": "⪂",
      "&gesdotol;": "⪄",
      "&gesl;": "⋛︀",
      "&gesles;": "⪔",
      "&gfr;": "𝔤",
      "&gg;": "≫",
      "&ggg;": "⋙",
      "&gimel;": "ℷ",
      "&gjcy;": "ѓ",
      "&gl;": "≷",
      "&glE;": "⪒",
      "&gla;": "⪥",
      "&glj;": "⪤",
      "&gnE;": "≩",
      "&gnap;": "⪊",
      "&gnapprox;": "⪊",
      "&gne;": "⪈",
      "&gneq;": "⪈",
      "&gneqq;": "≩",
      "&gnsim;": "⋧",
      "&gopf;": "𝕘",
      "&grave;": "`",
      "&gscr;": "ℊ",
      "&gsim;": "≳",
      "&gsime;": "⪎",
      "&gsiml;": "⪐",
      "&gt": ">",
      "&gt;": ">",
      "&gtcc;": "⪧",
      "&gtcir;": "⩺",
      "&gtdot;": "⋗",
      "&gtlPar;": "⦕",
      "&gtquest;": "⩼",
      "&gtrapprox;": "⪆",
      "&gtrarr;": "⥸",
      "&gtrdot;": "⋗",
      "&gtreqless;": "⋛",
      "&gtreqqless;": "⪌",
      "&gtrless;": "≷",
      "&gtrsim;": "≳",
      "&gvertneqq;": "≩︀",
      "&gvnE;": "≩︀",
      "&hArr;": "⇔",
      "&hairsp;": " ",
      "&half;": "½",
      "&hamilt;": "ℋ",
      "&hardcy;": "ъ",
      "&harr;": "↔",
      "&harrcir;": "⥈",
      "&harrw;": "↭",
      "&hbar;": "ℏ",
      "&hcirc;": "ĥ",
      "&hearts;": "♥",
      "&heartsuit;": "♥",
      "&hellip;": "…",
      "&hercon;": "⊹",
      "&hfr;": "𝔥",
      "&hksearow;": "⤥",
      "&hkswarow;": "⤦",
      "&hoarr;": "⇿",
      "&homtht;": "∻",
      "&hookleftarrow;": "↩",
      "&hookrightarrow;": "↪",
      "&hopf;": "𝕙",
      "&horbar;": "―",
      "&hscr;": "𝒽",
      "&hslash;": "ℏ",
      "&hstrok;": "ħ",
      "&hybull;": "⁃",
      "&hyphen;": "‐",
      "&iacute": "í",
      "&iacute;": "í",
      "&ic;": "⁣",
      "&icirc": "î",
      "&icirc;": "î",
      "&icy;": "и",
      "&iecy;": "е",
      "&iexcl": "¡",
      "&iexcl;": "¡",
      "&iff;": "⇔",
      "&ifr;": "𝔦",
      "&igrave": "ì",
      "&igrave;": "ì",
      "&ii;": "ⅈ",
      "&iiiint;": "⨌",
      "&iiint;": "∭",
      "&iinfin;": "⧜",
      "&iiota;": "℩",
      "&ijlig;": "ĳ",
      "&imacr;": "ī",
      "&image;": "ℑ",
      "&imagline;": "ℐ",
      "&imagpart;": "ℑ",
      "&imath;": "ı",
      "&imof;": "⊷",
      "&imped;": "Ƶ",
      "&in;": "∈",
      "&incare;": "℅",
      "&infin;": "∞",
      "&infintie;": "⧝",
      "&inodot;": "ı",
      "&int;": "∫",
      "&intcal;": "⊺",
      "&integers;": "ℤ",
      "&intercal;": "⊺",
      "&intlarhk;": "⨗",
      "&intprod;": "⨼",
      "&iocy;": "ё",
      "&iogon;": "į",
      "&iopf;": "𝕚",
      "&iota;": "ι",
      "&iprod;": "⨼",
      "&iquest": "¿",
      "&iquest;": "¿",
      "&iscr;": "𝒾",
      "&isin;": "∈",
      "&isinE;": "⋹",
      "&isindot;": "⋵",
      "&isins;": "⋴",
      "&isinsv;": "⋳",
      "&isinv;": "∈",
      "&it;": "⁢",
      "&itilde;": "ĩ",
      "&iukcy;": "і",
      "&iuml": "ï",
      "&iuml;": "ï",
      "&jcirc;": "ĵ",
      "&jcy;": "й",
      "&jfr;": "𝔧",
      "&jmath;": "ȷ",
      "&jopf;": "𝕛",
      "&jscr;": "𝒿",
      "&jsercy;": "ј",
      "&jukcy;": "є",
      "&kappa;": "κ",
      "&kappav;": "ϰ",
      "&kcedil;": "ķ",
      "&kcy;": "к",
      "&kfr;": "𝔨",
      "&kgreen;": "ĸ",
      "&khcy;": "х",
      "&kjcy;": "ќ",
      "&kopf;": "𝕜",
      "&kscr;": "𝓀",
      "&lAarr;": "⇚",
      "&lArr;": "⇐",
      "&lAtail;": "⤛",
      "&lBarr;": "⤎",
      "&lE;": "≦",
      "&lEg;": "⪋",
      "&lHar;": "⥢",
      "&lacute;": "ĺ",
      "&laemptyv;": "⦴",
      "&lagran;": "ℒ",
      "&lambda;": "λ",
      "&lang;": "⟨",
      "&langd;": "⦑",
      "&langle;": "⟨",
      "&lap;": "⪅",
      "&laquo": "«",
      "&laquo;": "«",
      "&larr;": "←",
      "&larrb;": "⇤",
      "&larrbfs;": "⤟",
      "&larrfs;": "⤝",
      "&larrhk;": "↩",
      "&larrlp;": "↫",
      "&larrpl;": "⤹",
      "&larrsim;": "⥳",
      "&larrtl;": "↢",
      "&lat;": "⪫",
      "&latail;": "⤙",
      "&late;": "⪭",
      "&lates;": "⪭︀",
      "&lbarr;": "⤌",
      "&lbbrk;": "❲",
      "&lbrace;": "{",
      "&lbrack;": "[",
      "&lbrke;": "⦋",
      "&lbrksld;": "⦏",
      "&lbrkslu;": "⦍",
      "&lcaron;": "ľ",
      "&lcedil;": "ļ",
      "&lceil;": "⌈",
      "&lcub;": "{",
      "&lcy;": "л",
      "&ldca;": "⤶",
      "&ldquo;": "“",
      "&ldquor;": "„",
      "&ldrdhar;": "⥧",
      "&ldrushar;": "⥋",
      "&ldsh;": "↲",
      "&le;": "≤",
      "&leftarrow;": "←",
      "&leftarrowtail;": "↢",
      "&leftharpoondown;": "↽",
      "&leftharpoonup;": "↼",
      "&leftleftarrows;": "⇇",
      "&leftrightarrow;": "↔",
      "&leftrightarrows;": "⇆",
      "&leftrightharpoons;": "⇋",
      "&leftrightsquigarrow;": "↭",
      "&leftthreetimes;": "⋋",
      "&leg;": "⋚",
      "&leq;": "≤",
      "&leqq;": "≦",
      "&leqslant;": "⩽",
      "&les;": "⩽",
      "&lescc;": "⪨",
      "&lesdot;": "⩿",
      "&lesdoto;": "⪁",
      "&lesdotor;": "⪃",
      "&lesg;": "⋚︀",
      "&lesges;": "⪓",
      "&lessapprox;": "⪅",
      "&lessdot;": "⋖",
      "&lesseqgtr;": "⋚",
      "&lesseqqgtr;": "⪋",
      "&lessgtr;": "≶",
      "&lesssim;": "≲",
      "&lfisht;": "⥼",
      "&lfloor;": "⌊",
      "&lfr;": "𝔩",
      "&lg;": "≶",
      "&lgE;": "⪑",
      "&lhard;": "↽",
      "&lharu;": "↼",
      "&lharul;": "⥪",
      "&lhblk;": "▄",
      "&ljcy;": "љ",
      "&ll;": "≪",
      "&llarr;": "⇇",
      "&llcorner;": "⌞",
      "&llhard;": "⥫",
      "&lltri;": "◺",
      "&lmidot;": "ŀ",
      "&lmoust;": "⎰",
      "&lmoustache;": "⎰",
      "&lnE;": "≨",
      "&lnap;": "⪉",
      "&lnapprox;": "⪉",
      "&lne;": "⪇",
      "&lneq;": "⪇",
      "&lneqq;": "≨",
      "&lnsim;": "⋦",
      "&loang;": "⟬",
      "&loarr;": "⇽",
      "&lobrk;": "⟦",
      "&longleftarrow;": "⟵",
      "&longleftrightarrow;": "⟷",
      "&longmapsto;": "⟼",
      "&longrightarrow;": "⟶",
      "&looparrowleft;": "↫",
      "&looparrowright;": "↬",
      "&lopar;": "⦅",
      "&lopf;": "𝕝",
      "&loplus;": "⨭",
      "&lotimes;": "⨴",
      "&lowast;": "∗",
      "&lowbar;": "_",
      "&loz;": "◊",
      "&lozenge;": "◊",
      "&lozf;": "⧫",
      "&lpar;": "(",
      "&lparlt;": "⦓",
      "&lrarr;": "⇆",
      "&lrcorner;": "⌟",
      "&lrhar;": "⇋",
      "&lrhard;": "⥭",
      "&lrm;": "‎",
      "&lrtri;": "⊿",
      "&lsaquo;": "‹",
      "&lscr;": "𝓁",
      "&lsh;": "↰",
      "&lsim;": "≲",
      "&lsime;": "⪍",
      "&lsimg;": "⪏",
      "&lsqb;": "[",
      "&lsquo;": "‘",
      "&lsquor;": "‚",
      "&lstrok;": "ł",
      "&lt": "<",
      "&lt;": "<",
      "&ltcc;": "⪦",
      "&ltcir;": "⩹",
      "&ltdot;": "⋖",
      "&lthree;": "⋋",
      "&ltimes;": "⋉",
      "&ltlarr;": "⥶",
      "&ltquest;": "⩻",
      "&ltrPar;": "⦖",
      "&ltri;": "◃",
      "&ltrie;": "⊴",
      "&ltrif;": "◂",
      "&lurdshar;": "⥊",
      "&luruhar;": "⥦",
      "&lvertneqq;": "≨︀",
      "&lvnE;": "≨︀",
      "&mDDot;": "∺",
      "&macr": "¯",
      "&macr;": "¯",
      "&male;": "♂",
      "&malt;": "✠",
      "&maltese;": "✠",
      "&map;": "↦",
      "&mapsto;": "↦",
      "&mapstodown;": "↧",
      "&mapstoleft;": "↤",
      "&mapstoup;": "↥",
      "&marker;": "▮",
      "&mcomma;": "⨩",
      "&mcy;": "м",
      "&mdash;": "—",
      "&measuredangle;": "∡",
      "&mfr;": "𝔪",
      "&mho;": "℧",
      "&micro": "µ",
      "&micro;": "µ",
      "&mid;": "∣",
      "&midast;": "*",
      "&midcir;": "⫰",
      "&middot": "·",
      "&middot;": "·",
      "&minus;": "−",
      "&minusb;": "⊟",
      "&minusd;": "∸",
      "&minusdu;": "⨪",
      "&mlcp;": "⫛",
      "&mldr;": "…",
      "&mnplus;": "∓",
      "&models;": "⊧",
      "&mopf;": "𝕞",
      "&mp;": "∓",
      "&mscr;": "𝓂",
      "&mstpos;": "∾",
      "&mu;": "μ",
      "&multimap;": "⊸",
      "&mumap;": "⊸",
      "&nGg;": "⋙̸",
      "&nGt;": "≫⃒",
      "&nGtv;": "≫̸",
      "&nLeftarrow;": "⇍",
      "&nLeftrightarrow;": "⇎",
      "&nLl;": "⋘̸",
      "&nLt;": "≪⃒",
      "&nLtv;": "≪̸",
      "&nRightarrow;": "⇏",
      "&nVDash;": "⊯",
      "&nVdash;": "⊮",
      "&nabla;": "∇",
      "&nacute;": "ń",
      "&nang;": "∠⃒",
      "&nap;": "≉",
      "&napE;": "⩰̸",
      "&napid;": "≋̸",
      "&napos;": "ŉ",
      "&napprox;": "≉",
      "&natur;": "♮",
      "&natural;": "♮",
      "&naturals;": "ℕ",
      "&nbsp": " ",
      "&nbsp;": " ",
      "&nbump;": "≎̸",
      "&nbumpe;": "≏̸",
      "&ncap;": "⩃",
      "&ncaron;": "ň",
      "&ncedil;": "ņ",
      "&ncong;": "≇",
      "&ncongdot;": "⩭̸",
      "&ncup;": "⩂",
      "&ncy;": "н",
      "&ndash;": "–",
      "&ne;": "≠",
      "&neArr;": "⇗",
      "&nearhk;": "⤤",
      "&nearr;": "↗",
      "&nearrow;": "↗",
      "&nedot;": "≐̸",
      "&nequiv;": "≢",
      "&nesear;": "⤨",
      "&nesim;": "≂̸",
      "&nexist;": "∄",
      "&nexists;": "∄",
      "&nfr;": "𝔫",
      "&ngE;": "≧̸",
      "&nge;": "≱",
      "&ngeq;": "≱",
      "&ngeqq;": "≧̸",
      "&ngeqslant;": "⩾̸",
      "&nges;": "⩾̸",
      "&ngsim;": "≵",
      "&ngt;": "≯",
      "&ngtr;": "≯",
      "&nhArr;": "⇎",
      "&nharr;": "↮",
      "&nhpar;": "⫲",
      "&ni;": "∋",
      "&nis;": "⋼",
      "&nisd;": "⋺",
      "&niv;": "∋",
      "&njcy;": "њ",
      "&nlArr;": "⇍",
      "&nlE;": "≦̸",
      "&nlarr;": "↚",
      "&nldr;": "‥",
      "&nle;": "≰",
      "&nleftarrow;": "↚",
      "&nleftrightarrow;": "↮",
      "&nleq;": "≰",
      "&nleqq;": "≦̸",
      "&nleqslant;": "⩽̸",
      "&nles;": "⩽̸",
      "&nless;": "≮",
      "&nlsim;": "≴",
      "&nlt;": "≮",
      "&nltri;": "⋪",
      "&nltrie;": "⋬",
      "&nmid;": "∤",
      "&nopf;": "𝕟",
      "&not": "¬",
      "&not;": "¬",
      "&notin;": "∉",
      "&notinE;": "⋹̸",
      "&notindot;": "⋵̸",
      "&notinva;": "∉",
      "&notinvb;": "⋷",
      "&notinvc;": "⋶",
      "&notni;": "∌",
      "&notniva;": "∌",
      "&notnivb;": "⋾",
      "&notnivc;": "⋽",
      "&npar;": "∦",
      "&nparallel;": "∦",
      "&nparsl;": "⫽⃥",
      "&npart;": "∂̸",
      "&npolint;": "⨔",
      "&npr;": "⊀",
      "&nprcue;": "⋠",
      "&npre;": "⪯̸",
      "&nprec;": "⊀",
      "&npreceq;": "⪯̸",
      "&nrArr;": "⇏",
      "&nrarr;": "↛",
      "&nrarrc;": "⤳̸",
      "&nrarrw;": "↝̸",
      "&nrightarrow;": "↛",
      "&nrtri;": "⋫",
      "&nrtrie;": "⋭",
      "&nsc;": "⊁",
      "&nsccue;": "⋡",
      "&nsce;": "⪰̸",
      "&nscr;": "𝓃",
      "&nshortmid;": "∤",
      "&nshortparallel;": "∦",
      "&nsim;": "≁",
      "&nsime;": "≄",
      "&nsimeq;": "≄",
      "&nsmid;": "∤",
      "&nspar;": "∦",
      "&nsqsube;": "⋢",
      "&nsqsupe;": "⋣",
      "&nsub;": "⊄",
      "&nsubE;": "⫅̸",
      "&nsube;": "⊈",
      "&nsubset;": "⊂⃒",
      "&nsubseteq;": "⊈",
      "&nsubseteqq;": "⫅̸",
      "&nsucc;": "⊁",
      "&nsucceq;": "⪰̸",
      "&nsup;": "⊅",
      "&nsupE;": "⫆̸",
      "&nsupe;": "⊉",
      "&nsupset;": "⊃⃒",
      "&nsupseteq;": "⊉",
      "&nsupseteqq;": "⫆̸",
      "&ntgl;": "≹",
      "&ntilde": "ñ",
      "&ntilde;": "ñ",
      "&ntlg;": "≸",
      "&ntriangleleft;": "⋪",
      "&ntrianglelefteq;": "⋬",
      "&ntriangleright;": "⋫",
      "&ntrianglerighteq;": "⋭",
      "&nu;": "ν",
      "&num;": "#",
      "&numero;": "№",
      "&numsp;": " ",
      "&nvDash;": "⊭",
      "&nvHarr;": "⤄",
      "&nvap;": "≍⃒",
      "&nvdash;": "⊬",
      "&nvge;": "≥⃒",
      "&nvgt;": ">⃒",
      "&nvinfin;": "⧞",
      "&nvlArr;": "⤂",
      "&nvle;": "≤⃒",
      "&nvlt;": "<⃒",
      "&nvltrie;": "⊴⃒",
      "&nvrArr;": "⤃",
      "&nvrtrie;": "⊵⃒",
      "&nvsim;": "∼⃒",
      "&nwArr;": "⇖",
      "&nwarhk;": "⤣",
      "&nwarr;": "↖",
      "&nwarrow;": "↖",
      "&nwnear;": "⤧",
      "&oS;": "Ⓢ",
      "&oacute": "ó",
      "&oacute;": "ó",
      "&oast;": "⊛",
      "&ocir;": "⊚",
      "&ocirc": "ô",
      "&ocirc;": "ô",
      "&ocy;": "о",
      "&odash;": "⊝",
      "&odblac;": "ő",
      "&odiv;": "⨸",
      "&odot;": "⊙",
      "&odsold;": "⦼",
      "&oelig;": "œ",
      "&ofcir;": "⦿",
      "&ofr;": "𝔬",
      "&ogon;": "˛",
      "&ograve": "ò",
      "&ograve;": "ò",
      "&ogt;": "⧁",
      "&ohbar;": "⦵",
      "&ohm;": "Ω",
      "&oint;": "∮",
      "&olarr;": "↺",
      "&olcir;": "⦾",
      "&olcross;": "⦻",
      "&oline;": "‾",
      "&olt;": "⧀",
      "&omacr;": "ō",
      "&omega;": "ω",
      "&omicron;": "ο",
      "&omid;": "⦶",
      "&ominus;": "⊖",
      "&oopf;": "𝕠",
      "&opar;": "⦷",
      "&operp;": "⦹",
      "&oplus;": "⊕",
      "&or;": "∨",
      "&orarr;": "↻",
      "&ord;": "⩝",
      "&order;": "ℴ",
      "&orderof;": "ℴ",
      "&ordf": "ª",
      "&ordf;": "ª",
      "&ordm": "º",
      "&ordm;": "º",
      "&origof;": "⊶",
      "&oror;": "⩖",
      "&orslope;": "⩗",
      "&orv;": "⩛",
      "&oscr;": "ℴ",
      "&oslash": "ø",
      "&oslash;": "ø",
      "&osol;": "⊘",
      "&otilde": "õ",
      "&otilde;": "õ",
      "&otimes;": "⊗",
      "&otimesas;": "⨶",
      "&ouml": "ö",
      "&ouml;": "ö",
      "&ovbar;": "⌽",
      "&par;": "∥",
      "&para": "¶",
      "&para;": "¶",
      "&parallel;": "∥",
      "&parsim;": "⫳",
      "&parsl;": "⫽",
      "&part;": "∂",
      "&pcy;": "п",
      "&percnt;": "%",
      "&period;": ".",
      "&permil;": "‰",
      "&perp;": "⊥",
      "&pertenk;": "‱",
      "&pfr;": "𝔭",
      "&phi;": "φ",
      "&phiv;": "ϕ",
      "&phmmat;": "ℳ",
      "&phone;": "☎",
      "&pi;": "π",
      "&pitchfork;": "⋔",
      "&piv;": "ϖ",
      "&planck;": "ℏ",
      "&planckh;": "ℎ",
      "&plankv;": "ℏ",
      "&plus;": "+",
      "&plusacir;": "⨣",
      "&plusb;": "⊞",
      "&pluscir;": "⨢",
      "&plusdo;": "∔",
      "&plusdu;": "⨥",
      "&pluse;": "⩲",
      "&plusmn": "±",
      "&plusmn;": "±",
      "&plussim;": "⨦",
      "&plustwo;": "⨧",
      "&pm;": "±",
      "&pointint;": "⨕",
      "&popf;": "𝕡",
      "&pound": "£",
      "&pound;": "£",
      "&pr;": "≺",
      "&prE;": "⪳",
      "&prap;": "⪷",
      "&prcue;": "≼",
      "&pre;": "⪯",
      "&prec;": "≺",
      "&precapprox;": "⪷",
      "&preccurlyeq;": "≼",
      "&preceq;": "⪯",
      "&precnapprox;": "⪹",
      "&precneqq;": "⪵",
      "&precnsim;": "⋨",
      "&precsim;": "≾",
      "&prime;": "′",
      "&primes;": "ℙ",
      "&prnE;": "⪵",
      "&prnap;": "⪹",
      "&prnsim;": "⋨",
      "&prod;": "∏",
      "&profalar;": "⌮",
      "&profline;": "⌒",
      "&profsurf;": "⌓",
      "&prop;": "∝",
      "&propto;": "∝",
      "&prsim;": "≾",
      "&prurel;": "⊰",
      "&pscr;": "𝓅",
      "&psi;": "ψ",
      "&puncsp;": " ",
      "&qfr;": "𝔮",
      "&qint;": "⨌",
      "&qopf;": "𝕢",
      "&qprime;": "⁗",
      "&qscr;": "𝓆",
      "&quaternions;": "ℍ",
      "&quatint;": "⨖",
      "&quest;": "?",
      "&questeq;": "≟",
      "&quot": '"',
      "&quot;": '"',
      "&rAarr;": "⇛",
      "&rArr;": "⇒",
      "&rAtail;": "⤜",
      "&rBarr;": "⤏",
      "&rHar;": "⥤",
      "&race;": "∽̱",
      "&racute;": "ŕ",
      "&radic;": "√",
      "&raemptyv;": "⦳",
      "&rang;": "⟩",
      "&rangd;": "⦒",
      "&range;": "⦥",
      "&rangle;": "⟩",
      "&raquo": "»",
      "&raquo;": "»",
      "&rarr;": "→",
      "&rarrap;": "⥵",
      "&rarrb;": "⇥",
      "&rarrbfs;": "⤠",
      "&rarrc;": "⤳",
      "&rarrfs;": "⤞",
      "&rarrhk;": "↪",
      "&rarrlp;": "↬",
      "&rarrpl;": "⥅",
      "&rarrsim;": "⥴",
      "&rarrtl;": "↣",
      "&rarrw;": "↝",
      "&ratail;": "⤚",
      "&ratio;": "∶",
      "&rationals;": "ℚ",
      "&rbarr;": "⤍",
      "&rbbrk;": "❳",
      "&rbrace;": "}",
      "&rbrack;": "]",
      "&rbrke;": "⦌",
      "&rbrksld;": "⦎",
      "&rbrkslu;": "⦐",
      "&rcaron;": "ř",
      "&rcedil;": "ŗ",
      "&rceil;": "⌉",
      "&rcub;": "}",
      "&rcy;": "р",
      "&rdca;": "⤷",
      "&rdldhar;": "⥩",
      "&rdquo;": "”",
      "&rdquor;": "”",
      "&rdsh;": "↳",
      "&real;": "ℜ",
      "&realine;": "ℛ",
      "&realpart;": "ℜ",
      "&reals;": "ℝ",
      "&rect;": "▭",
      "&reg": "®",
      "&reg;": "®",
      "&rfisht;": "⥽",
      "&rfloor;": "⌋",
      "&rfr;": "𝔯",
      "&rhard;": "⇁",
      "&rharu;": "⇀",
      "&rharul;": "⥬",
      "&rho;": "ρ",
      "&rhov;": "ϱ",
      "&rightarrow;": "→",
      "&rightarrowtail;": "↣",
      "&rightharpoondown;": "⇁",
      "&rightharpoonup;": "⇀",
      "&rightleftarrows;": "⇄",
      "&rightleftharpoons;": "⇌",
      "&rightrightarrows;": "⇉",
      "&rightsquigarrow;": "↝",
      "&rightthreetimes;": "⋌",
      "&ring;": "˚",
      "&risingdotseq;": "≓",
      "&rlarr;": "⇄",
      "&rlhar;": "⇌",
      "&rlm;": "‏",
      "&rmoust;": "⎱",
      "&rmoustache;": "⎱",
      "&rnmid;": "⫮",
      "&roang;": "⟭",
      "&roarr;": "⇾",
      "&robrk;": "⟧",
      "&ropar;": "⦆",
      "&ropf;": "𝕣",
      "&roplus;": "⨮",
      "&rotimes;": "⨵",
      "&rpar;": ")",
      "&rpargt;": "⦔",
      "&rppolint;": "⨒",
      "&rrarr;": "⇉",
      "&rsaquo;": "›",
      "&rscr;": "𝓇",
      "&rsh;": "↱",
      "&rsqb;": "]",
      "&rsquo;": "’",
      "&rsquor;": "’",
      "&rthree;": "⋌",
      "&rtimes;": "⋊",
      "&rtri;": "▹",
      "&rtrie;": "⊵",
      "&rtrif;": "▸",
      "&rtriltri;": "⧎",
      "&ruluhar;": "⥨",
      "&rx;": "℞",
      "&sacute;": "ś",
      "&sbquo;": "‚",
      "&sc;": "≻",
      "&scE;": "⪴",
      "&scap;": "⪸",
      "&scaron;": "š",
      "&sccue;": "≽",
      "&sce;": "⪰",
      "&scedil;": "ş",
      "&scirc;": "ŝ",
      "&scnE;": "⪶",
      "&scnap;": "⪺",
      "&scnsim;": "⋩",
      "&scpolint;": "⨓",
      "&scsim;": "≿",
      "&scy;": "с",
      "&sdot;": "⋅",
      "&sdotb;": "⊡",
      "&sdote;": "⩦",
      "&seArr;": "⇘",
      "&searhk;": "⤥",
      "&searr;": "↘",
      "&searrow;": "↘",
      "&sect": "§",
      "&sect;": "§",
      "&semi;": ";",
      "&seswar;": "⤩",
      "&setminus;": "∖",
      "&setmn;": "∖",
      "&sext;": "✶",
      "&sfr;": "𝔰",
      "&sfrown;": "⌢",
      "&sharp;": "♯",
      "&shchcy;": "щ",
      "&shcy;": "ш",
      "&shortmid;": "∣",
      "&shortparallel;": "∥",
      "&shy": "­",
      "&shy;": "­",
      "&sigma;": "σ",
      "&sigmaf;": "ς",
      "&sigmav;": "ς",
      "&sim;": "∼",
      "&simdot;": "⩪",
      "&sime;": "≃",
      "&simeq;": "≃",
      "&simg;": "⪞",
      "&simgE;": "⪠",
      "&siml;": "⪝",
      "&simlE;": "⪟",
      "&simne;": "≆",
      "&simplus;": "⨤",
      "&simrarr;": "⥲",
      "&slarr;": "←",
      "&smallsetminus;": "∖",
      "&smashp;": "⨳",
      "&smeparsl;": "⧤",
      "&smid;": "∣",
      "&smile;": "⌣",
      "&smt;": "⪪",
      "&smte;": "⪬",
      "&smtes;": "⪬︀",
      "&softcy;": "ь",
      "&sol;": "/",
      "&solb;": "⧄",
      "&solbar;": "⌿",
      "&sopf;": "𝕤",
      "&spades;": "♠",
      "&spadesuit;": "♠",
      "&spar;": "∥",
      "&sqcap;": "⊓",
      "&sqcaps;": "⊓︀",
      "&sqcup;": "⊔",
      "&sqcups;": "⊔︀",
      "&sqsub;": "⊏",
      "&sqsube;": "⊑",
      "&sqsubset;": "⊏",
      "&sqsubseteq;": "⊑",
      "&sqsup;": "⊐",
      "&sqsupe;": "⊒",
      "&sqsupset;": "⊐",
      "&sqsupseteq;": "⊒",
      "&squ;": "□",
      "&square;": "□",
      "&squarf;": "▪",
      "&squf;": "▪",
      "&srarr;": "→",
      "&sscr;": "𝓈",
      "&ssetmn;": "∖",
      "&ssmile;": "⌣",
      "&sstarf;": "⋆",
      "&star;": "☆",
      "&starf;": "★",
      "&straightepsilon;": "ϵ",
      "&straightphi;": "ϕ",
      "&strns;": "¯",
      "&sub;": "⊂",
      "&subE;": "⫅",
      "&subdot;": "⪽",
      "&sube;": "⊆",
      "&subedot;": "⫃",
      "&submult;": "⫁",
      "&subnE;": "⫋",
      "&subne;": "⊊",
      "&subplus;": "⪿",
      "&subrarr;": "⥹",
      "&subset;": "⊂",
      "&subseteq;": "⊆",
      "&subseteqq;": "⫅",
      "&subsetneq;": "⊊",
      "&subsetneqq;": "⫋",
      "&subsim;": "⫇",
      "&subsub;": "⫕",
      "&subsup;": "⫓",
      "&succ;": "≻",
      "&succapprox;": "⪸",
      "&succcurlyeq;": "≽",
      "&succeq;": "⪰",
      "&succnapprox;": "⪺",
      "&succneqq;": "⪶",
      "&succnsim;": "⋩",
      "&succsim;": "≿",
      "&sum;": "∑",
      "&sung;": "♪",
      "&sup1": "¹",
      "&sup1;": "¹",
      "&sup2": "²",
      "&sup2;": "²",
      "&sup3": "³",
      "&sup3;": "³",
      "&sup;": "⊃",
      "&supE;": "⫆",
      "&supdot;": "⪾",
      "&supdsub;": "⫘",
      "&supe;": "⊇",
      "&supedot;": "⫄",
      "&suphsol;": "⟉",
      "&suphsub;": "⫗",
      "&suplarr;": "⥻",
      "&supmult;": "⫂",
      "&supnE;": "⫌",
      "&supne;": "⊋",
      "&supplus;": "⫀",
      "&supset;": "⊃",
      "&supseteq;": "⊇",
      "&supseteqq;": "⫆",
      "&supsetneq;": "⊋",
      "&supsetneqq;": "⫌",
      "&supsim;": "⫈",
      "&supsub;": "⫔",
      "&supsup;": "⫖",
      "&swArr;": "⇙",
      "&swarhk;": "⤦",
      "&swarr;": "↙",
      "&swarrow;": "↙",
      "&swnwar;": "⤪",
      "&szlig": "ß",
      "&szlig;": "ß",
      "&target;": "⌖",
      "&tau;": "τ",
      "&tbrk;": "⎴",
      "&tcaron;": "ť",
      "&tcedil;": "ţ",
      "&tcy;": "т",
      "&tdot;": "⃛",
      "&telrec;": "⌕",
      "&tfr;": "𝔱",
      "&there4;": "∴",
      "&therefore;": "∴",
      "&theta;": "θ",
      "&thetasym;": "ϑ",
      "&thetav;": "ϑ",
      "&thickapprox;": "≈",
      "&thicksim;": "∼",
      "&thinsp;": " ",
      "&thkap;": "≈",
      "&thksim;": "∼",
      "&thorn": "þ",
      "&thorn;": "þ",
      "&tilde;": "˜",
      "&times": "×",
      "&times;": "×",
      "&timesb;": "⊠",
      "&timesbar;": "⨱",
      "&timesd;": "⨰",
      "&tint;": "∭",
      "&toea;": "⤨",
      "&top;": "⊤",
      "&topbot;": "⌶",
      "&topcir;": "⫱",
      "&topf;": "𝕥",
      "&topfork;": "⫚",
      "&tosa;": "⤩",
      "&tprime;": "‴",
      "&trade;": "™",
      "&triangle;": "▵",
      "&triangledown;": "▿",
      "&triangleleft;": "◃",
      "&trianglelefteq;": "⊴",
      "&triangleq;": "≜",
      "&triangleright;": "▹",
      "&trianglerighteq;": "⊵",
      "&tridot;": "◬",
      "&trie;": "≜",
      "&triminus;": "⨺",
      "&triplus;": "⨹",
      "&trisb;": "⧍",
      "&tritime;": "⨻",
      "&trpezium;": "⏢",
      "&tscr;": "𝓉",
      "&tscy;": "ц",
      "&tshcy;": "ћ",
      "&tstrok;": "ŧ",
      "&twixt;": "≬",
      "&twoheadleftarrow;": "↞",
      "&twoheadrightarrow;": "↠",
      "&uArr;": "⇑",
      "&uHar;": "⥣",
      "&uacute": "ú",
      "&uacute;": "ú",
      "&uarr;": "↑",
      "&ubrcy;": "ў",
      "&ubreve;": "ŭ",
      "&ucirc": "û",
      "&ucirc;": "û",
      "&ucy;": "у",
      "&udarr;": "⇅",
      "&udblac;": "ű",
      "&udhar;": "⥮",
      "&ufisht;": "⥾",
      "&ufr;": "𝔲",
      "&ugrave": "ù",
      "&ugrave;": "ù",
      "&uharl;": "↿",
      "&uharr;": "↾",
      "&uhblk;": "▀",
      "&ulcorn;": "⌜",
      "&ulcorner;": "⌜",
      "&ulcrop;": "⌏",
      "&ultri;": "◸",
      "&umacr;": "ū",
      "&uml": "¨",
      "&uml;": "¨",
      "&uogon;": "ų",
      "&uopf;": "𝕦",
      "&uparrow;": "↑",
      "&updownarrow;": "↕",
      "&upharpoonleft;": "↿",
      "&upharpoonright;": "↾",
      "&uplus;": "⊎",
      "&upsi;": "υ",
      "&upsih;": "ϒ",
      "&upsilon;": "υ",
      "&upuparrows;": "⇈",
      "&urcorn;": "⌝",
      "&urcorner;": "⌝",
      "&urcrop;": "⌎",
      "&uring;": "ů",
      "&urtri;": "◹",
      "&uscr;": "𝓊",
      "&utdot;": "⋰",
      "&utilde;": "ũ",
      "&utri;": "▵",
      "&utrif;": "▴",
      "&uuarr;": "⇈",
      "&uuml": "ü",
      "&uuml;": "ü",
      "&uwangle;": "⦧",
      "&vArr;": "⇕",
      "&vBar;": "⫨",
      "&vBarv;": "⫩",
      "&vDash;": "⊨",
      "&vangrt;": "⦜",
      "&varepsilon;": "ϵ",
      "&varkappa;": "ϰ",
      "&varnothing;": "∅",
      "&varphi;": "ϕ",
      "&varpi;": "ϖ",
      "&varpropto;": "∝",
      "&varr;": "↕",
      "&varrho;": "ϱ",
      "&varsigma;": "ς",
      "&varsubsetneq;": "⊊︀",
      "&varsubsetneqq;": "⫋︀",
      "&varsupsetneq;": "⊋︀",
      "&varsupsetneqq;": "⫌︀",
      "&vartheta;": "ϑ",
      "&vartriangleleft;": "⊲",
      "&vartriangleright;": "⊳",
      "&vcy;": "в",
      "&vdash;": "⊢",
      "&vee;": "∨",
      "&veebar;": "⊻",
      "&veeeq;": "≚",
      "&vellip;": "⋮",
      "&verbar;": "|",
      "&vert;": "|",
      "&vfr;": "𝔳",
      "&vltri;": "⊲",
      "&vnsub;": "⊂⃒",
      "&vnsup;": "⊃⃒",
      "&vopf;": "𝕧",
      "&vprop;": "∝",
      "&vrtri;": "⊳",
      "&vscr;": "𝓋",
      "&vsubnE;": "⫋︀",
      "&vsubne;": "⊊︀",
      "&vsupnE;": "⫌︀",
      "&vsupne;": "⊋︀",
      "&vzigzag;": "⦚",
      "&wcirc;": "ŵ",
      "&wedbar;": "⩟",
      "&wedge;": "∧",
      "&wedgeq;": "≙",
      "&weierp;": "℘",
      "&wfr;": "𝔴",
      "&wopf;": "𝕨",
      "&wp;": "℘",
      "&wr;": "≀",
      "&wreath;": "≀",
      "&wscr;": "𝓌",
      "&xcap;": "⋂",
      "&xcirc;": "◯",
      "&xcup;": "⋃",
      "&xdtri;": "▽",
      "&xfr;": "𝔵",
      "&xhArr;": "⟺",
      "&xharr;": "⟷",
      "&xi;": "ξ",
      "&xlArr;": "⟸",
      "&xlarr;": "⟵",
      "&xmap;": "⟼",
      "&xnis;": "⋻",
      "&xodot;": "⨀",
      "&xopf;": "𝕩",
      "&xoplus;": "⨁",
      "&xotime;": "⨂",
      "&xrArr;": "⟹",
      "&xrarr;": "⟶",
      "&xscr;": "𝓍",
      "&xsqcup;": "⨆",
      "&xuplus;": "⨄",
      "&xutri;": "△",
      "&xvee;": "⋁",
      "&xwedge;": "⋀",
      "&yacute": "ý",
      "&yacute;": "ý",
      "&yacy;": "я",
      "&ycirc;": "ŷ",
      "&ycy;": "ы",
      "&yen": "¥",
      "&yen;": "¥",
      "&yfr;": "𝔶",
      "&yicy;": "ї",
      "&yopf;": "𝕪",
      "&yscr;": "𝓎",
      "&yucy;": "ю",
      "&yuml": "ÿ",
      "&yuml;": "ÿ",
      "&zacute;": "ź",
      "&zcaron;": "ž",
      "&zcy;": "з",
      "&zdot;": "ż",
      "&zeetrf;": "ℨ",
      "&zeta;": "ζ",
      "&zfr;": "𝔷",
      "&zhcy;": "ж",
      "&zigrarr;": "⇝",
      "&zopf;": "𝕫",
      "&zscr;": "𝓏",
      "&zwj;": "‍",
      "&zwnj;": "‌"
    },
    characters: {
      "Æ": "&AElig;",
      "&": "&amp;",
      "Á": "&Aacute;",
      "Ă": "&Abreve;",
      "Â": "&Acirc;",
      "А": "&Acy;",
      "𝔄": "&Afr;",
      "À": "&Agrave;",
      "Α": "&Alpha;",
      "Ā": "&Amacr;",
      "⩓": "&And;",
      "Ą": "&Aogon;",
      "𝔸": "&Aopf;",
      "⁡": "&af;",
      "Å": "&angst;",
      "𝒜": "&Ascr;",
      "≔": "&coloneq;",
      "Ã": "&Atilde;",
      "Ä": "&Auml;",
      "∖": "&ssetmn;",
      "⫧": "&Barv;",
      "⌆": "&doublebarwedge;",
      "Б": "&Bcy;",
      "∵": "&because;",
      "ℬ": "&bernou;",
      "Β": "&Beta;",
      "𝔅": "&Bfr;",
      "𝔹": "&Bopf;",
      "˘": "&breve;",
      "≎": "&bump;",
      "Ч": "&CHcy;",
      "©": "&copy;",
      "Ć": "&Cacute;",
      "⋒": "&Cap;",
      "ⅅ": "&DD;",
      "ℭ": "&Cfr;",
      "Č": "&Ccaron;",
      "Ç": "&Ccedil;",
      "Ĉ": "&Ccirc;",
      "∰": "&Cconint;",
      "Ċ": "&Cdot;",
      "¸": "&cedil;",
      "·": "&middot;",
      "Χ": "&Chi;",
      "⊙": "&odot;",
      "⊖": "&ominus;",
      "⊕": "&oplus;",
      "⊗": "&otimes;",
      "∲": "&cwconint;",
      "”": "&rdquor;",
      "’": "&rsquor;",
      "∷": "&Proportion;",
      "⩴": "&Colone;",
      "≡": "&equiv;",
      "∯": "&DoubleContourIntegral;",
      "∮": "&oint;",
      "ℂ": "&complexes;",
      "∐": "&coprod;",
      "∳": "&awconint;",
      "⨯": "&Cross;",
      "𝒞": "&Cscr;",
      "⋓": "&Cup;",
      "≍": "&asympeq;",
      "⤑": "&DDotrahd;",
      "Ђ": "&DJcy;",
      "Ѕ": "&DScy;",
      "Џ": "&DZcy;",
      "‡": "&ddagger;",
      "↡": "&Darr;",
      "⫤": "&DoubleLeftTee;",
      "Ď": "&Dcaron;",
      "Д": "&Dcy;",
      "∇": "&nabla;",
      "Δ": "&Delta;",
      "𝔇": "&Dfr;",
      "´": "&acute;",
      "˙": "&dot;",
      "˝": "&dblac;",
      "`": "&grave;",
      "˜": "&tilde;",
      "⋄": "&diamond;",
      "ⅆ": "&dd;",
      "𝔻": "&Dopf;",
      "¨": "&uml;",
      "⃜": "&DotDot;",
      "≐": "&esdot;",
      "⇓": "&dArr;",
      "⇐": "&lArr;",
      "⇔": "&iff;",
      "⟸": "&xlArr;",
      "⟺": "&xhArr;",
      "⟹": "&xrArr;",
      "⇒": "&rArr;",
      "⊨": "&vDash;",
      "⇑": "&uArr;",
      "⇕": "&vArr;",
      "∥": "&spar;",
      "↓": "&downarrow;",
      "⤓": "&DownArrowBar;",
      "⇵": "&duarr;",
      "̑": "&DownBreve;",
      "⥐": "&DownLeftRightVector;",
      "⥞": "&DownLeftTeeVector;",
      "↽": "&lhard;",
      "⥖": "&DownLeftVectorBar;",
      "⥟": "&DownRightTeeVector;",
      "⇁": "&rightharpoondown;",
      "⥗": "&DownRightVectorBar;",
      "⊤": "&top;",
      "↧": "&mapstodown;",
      "𝒟": "&Dscr;",
      "Đ": "&Dstrok;",
      "Ŋ": "&ENG;",
      "Ð": "&ETH;",
      "É": "&Eacute;",
      "Ě": "&Ecaron;",
      "Ê": "&Ecirc;",
      "Э": "&Ecy;",
      "Ė": "&Edot;",
      "𝔈": "&Efr;",
      "È": "&Egrave;",
      "∈": "&isinv;",
      "Ē": "&Emacr;",
      "◻": "&EmptySmallSquare;",
      "▫": "&EmptyVerySmallSquare;",
      "Ę": "&Eogon;",
      "𝔼": "&Eopf;",
      "Ε": "&Epsilon;",
      "⩵": "&Equal;",
      "≂": "&esim;",
      "⇌": "&rlhar;",
      "ℰ": "&expectation;",
      "⩳": "&Esim;",
      "Η": "&Eta;",
      "Ë": "&Euml;",
      "∃": "&exist;",
      "ⅇ": "&exponentiale;",
      "Ф": "&Fcy;",
      "𝔉": "&Ffr;",
      "◼": "&FilledSmallSquare;",
      "▪": "&squf;",
      "𝔽": "&Fopf;",
      "∀": "&forall;",
      "ℱ": "&Fscr;",
      "Ѓ": "&GJcy;",
      ">": "&gt;",
      "Γ": "&Gamma;",
      "Ϝ": "&Gammad;",
      "Ğ": "&Gbreve;",
      "Ģ": "&Gcedil;",
      "Ĝ": "&Gcirc;",
      "Г": "&Gcy;",
      "Ġ": "&Gdot;",
      "𝔊": "&Gfr;",
      "⋙": "&ggg;",
      "𝔾": "&Gopf;",
      "≥": "&geq;",
      "⋛": "&gtreqless;",
      "≧": "&geqq;",
      "⪢": "&GreaterGreater;",
      "≷": "&gtrless;",
      "⩾": "&ges;",
      "≳": "&gtrsim;",
      "𝒢": "&Gscr;",
      "≫": "&gg;",
      "Ъ": "&HARDcy;",
      "ˇ": "&caron;",
      "^": "&Hat;",
      "Ĥ": "&Hcirc;",
      "ℌ": "&Poincareplane;",
      "ℋ": "&hamilt;",
      "ℍ": "&quaternions;",
      "─": "&boxh;",
      "Ħ": "&Hstrok;",
      "≏": "&bumpeq;",
      "Е": "&IEcy;",
      "Ĳ": "&IJlig;",
      "Ё": "&IOcy;",
      "Í": "&Iacute;",
      "Î": "&Icirc;",
      "И": "&Icy;",
      "İ": "&Idot;",
      "ℑ": "&imagpart;",
      "Ì": "&Igrave;",
      "Ī": "&Imacr;",
      "ⅈ": "&ii;",
      "∬": "&Int;",
      "∫": "&int;",
      "⋂": "&xcap;",
      "⁣": "&ic;",
      "⁢": "&it;",
      "Į": "&Iogon;",
      "𝕀": "&Iopf;",
      "Ι": "&Iota;",
      "ℐ": "&imagline;",
      "Ĩ": "&Itilde;",
      "І": "&Iukcy;",
      "Ï": "&Iuml;",
      "Ĵ": "&Jcirc;",
      "Й": "&Jcy;",
      "𝔍": "&Jfr;",
      "𝕁": "&Jopf;",
      "𝒥": "&Jscr;",
      "Ј": "&Jsercy;",
      "Є": "&Jukcy;",
      "Х": "&KHcy;",
      "Ќ": "&KJcy;",
      "Κ": "&Kappa;",
      "Ķ": "&Kcedil;",
      "К": "&Kcy;",
      "𝔎": "&Kfr;",
      "𝕂": "&Kopf;",
      "𝒦": "&Kscr;",
      "Љ": "&LJcy;",
      "<": "&lt;",
      "Ĺ": "&Lacute;",
      "Λ": "&Lambda;",
      "⟪": "&Lang;",
      "ℒ": "&lagran;",
      "↞": "&twoheadleftarrow;",
      "Ľ": "&Lcaron;",
      "Ļ": "&Lcedil;",
      "Л": "&Lcy;",
      "⟨": "&langle;",
      "←": "&slarr;",
      "⇤": "&larrb;",
      "⇆": "&lrarr;",
      "⌈": "&lceil;",
      "⟦": "&lobrk;",
      "⥡": "&LeftDownTeeVector;",
      "⇃": "&downharpoonleft;",
      "⥙": "&LeftDownVectorBar;",
      "⌊": "&lfloor;",
      "↔": "&leftrightarrow;",
      "⥎": "&LeftRightVector;",
      "⊣": "&dashv;",
      "↤": "&mapstoleft;",
      "⥚": "&LeftTeeVector;",
      "⊲": "&vltri;",
      "⧏": "&LeftTriangleBar;",
      "⊴": "&trianglelefteq;",
      "⥑": "&LeftUpDownVector;",
      "⥠": "&LeftUpTeeVector;",
      "↿": "&upharpoonleft;",
      "⥘": "&LeftUpVectorBar;",
      "↼": "&lharu;",
      "⥒": "&LeftVectorBar;",
      "⋚": "&lesseqgtr;",
      "≦": "&leqq;",
      "≶": "&lg;",
      "⪡": "&LessLess;",
      "⩽": "&les;",
      "≲": "&lsim;",
      "𝔏": "&Lfr;",
      "⋘": "&Ll;",
      "⇚": "&lAarr;",
      "Ŀ": "&Lmidot;",
      "⟵": "&xlarr;",
      "⟷": "&xharr;",
      "⟶": "&xrarr;",
      "𝕃": "&Lopf;",
      "↙": "&swarrow;",
      "↘": "&searrow;",
      "↰": "&lsh;",
      "Ł": "&Lstrok;",
      "≪": "&ll;",
      "⤅": "&Map;",
      "М": "&Mcy;",
      " ": "&MediumSpace;",
      "ℳ": "&phmmat;",
      "𝔐": "&Mfr;",
      "∓": "&mp;",
      "𝕄": "&Mopf;",
      "Μ": "&Mu;",
      "Њ": "&NJcy;",
      "Ń": "&Nacute;",
      "Ň": "&Ncaron;",
      "Ņ": "&Ncedil;",
      "Н": "&Ncy;",
      "​": "&ZeroWidthSpace;",
      "\n": "&NewLine;",
      "𝔑": "&Nfr;",
      "⁠": "&NoBreak;",
      " ": "&nbsp;",
      "ℕ": "&naturals;",
      "⫬": "&Not;",
      "≢": "&nequiv;",
      "≭": "&NotCupCap;",
      "∦": "&nspar;",
      "∉": "&notinva;",
      "≠": "&ne;",
      "≂̸": "&nesim;",
      "∄": "&nexists;",
      "≯": "&ngtr;",
      "≱": "&ngeq;",
      "≧̸": "&ngeqq;",
      "≫̸": "&nGtv;",
      "≹": "&ntgl;",
      "⩾̸": "&nges;",
      "≵": "&ngsim;",
      "≎̸": "&nbump;",
      "≏̸": "&nbumpe;",
      "⋪": "&ntriangleleft;",
      "⧏̸": "&NotLeftTriangleBar;",
      "⋬": "&ntrianglelefteq;",
      "≮": "&nlt;",
      "≰": "&nleq;",
      "≸": "&ntlg;",
      "≪̸": "&nLtv;",
      "⩽̸": "&nles;",
      "≴": "&nlsim;",
      "⪢̸": "&NotNestedGreaterGreater;",
      "⪡̸": "&NotNestedLessLess;",
      "⊀": "&nprec;",
      "⪯̸": "&npreceq;",
      "⋠": "&nprcue;",
      "∌": "&notniva;",
      "⋫": "&ntriangleright;",
      "⧐̸": "&NotRightTriangleBar;",
      "⋭": "&ntrianglerighteq;",
      "⊏̸": "&NotSquareSubset;",
      "⋢": "&nsqsube;",
      "⊐̸": "&NotSquareSuperset;",
      "⋣": "&nsqsupe;",
      "⊂⃒": "&vnsub;",
      "⊈": "&nsubseteq;",
      "⊁": "&nsucc;",
      "⪰̸": "&nsucceq;",
      "⋡": "&nsccue;",
      "≿̸": "&NotSucceedsTilde;",
      "⊃⃒": "&vnsup;",
      "⊉": "&nsupseteq;",
      "≁": "&nsim;",
      "≄": "&nsimeq;",
      "≇": "&ncong;",
      "≉": "&napprox;",
      "∤": "&nsmid;",
      "𝒩": "&Nscr;",
      "Ñ": "&Ntilde;",
      "Ν": "&Nu;",
      "Œ": "&OElig;",
      "Ó": "&Oacute;",
      "Ô": "&Ocirc;",
      "О": "&Ocy;",
      "Ő": "&Odblac;",
      "𝔒": "&Ofr;",
      "Ò": "&Ograve;",
      "Ō": "&Omacr;",
      "Ω": "&ohm;",
      "Ο": "&Omicron;",
      "𝕆": "&Oopf;",
      "“": "&ldquo;",
      "‘": "&lsquo;",
      "⩔": "&Or;",
      "𝒪": "&Oscr;",
      "Ø": "&Oslash;",
      "Õ": "&Otilde;",
      "⨷": "&Otimes;",
      "Ö": "&Ouml;",
      "‾": "&oline;",
      "⏞": "&OverBrace;",
      "⎴": "&tbrk;",
      "⏜": "&OverParenthesis;",
      "∂": "&part;",
      "П": "&Pcy;",
      "𝔓": "&Pfr;",
      "Φ": "&Phi;",
      "Π": "&Pi;",
      "±": "&pm;",
      "ℙ": "&primes;",
      "⪻": "&Pr;",
      "≺": "&prec;",
      "⪯": "&preceq;",
      "≼": "&preccurlyeq;",
      "≾": "&prsim;",
      "″": "&Prime;",
      "∏": "&prod;",
      "∝": "&vprop;",
      "𝒫": "&Pscr;",
      "Ψ": "&Psi;",
      '"': "&quot;",
      "𝔔": "&Qfr;",
      "ℚ": "&rationals;",
      "𝒬": "&Qscr;",
      "⤐": "&drbkarow;",
      "®": "&reg;",
      "Ŕ": "&Racute;",
      "⟫": "&Rang;",
      "↠": "&twoheadrightarrow;",
      "⤖": "&Rarrtl;",
      "Ř": "&Rcaron;",
      "Ŗ": "&Rcedil;",
      "Р": "&Rcy;",
      "ℜ": "&realpart;",
      "∋": "&niv;",
      "⇋": "&lrhar;",
      "⥯": "&duhar;",
      "Ρ": "&Rho;",
      "⟩": "&rangle;",
      "→": "&srarr;",
      "⇥": "&rarrb;",
      "⇄": "&rlarr;",
      "⌉": "&rceil;",
      "⟧": "&robrk;",
      "⥝": "&RightDownTeeVector;",
      "⇂": "&downharpoonright;",
      "⥕": "&RightDownVectorBar;",
      "⌋": "&rfloor;",
      "⊢": "&vdash;",
      "↦": "&mapsto;",
      "⥛": "&RightTeeVector;",
      "⊳": "&vrtri;",
      "⧐": "&RightTriangleBar;",
      "⊵": "&trianglerighteq;",
      "⥏": "&RightUpDownVector;",
      "⥜": "&RightUpTeeVector;",
      "↾": "&upharpoonright;",
      "⥔": "&RightUpVectorBar;",
      "⇀": "&rightharpoonup;",
      "⥓": "&RightVectorBar;",
      "ℝ": "&reals;",
      "⥰": "&RoundImplies;",
      "⇛": "&rAarr;",
      "ℛ": "&realine;",
      "↱": "&rsh;",
      "⧴": "&RuleDelayed;",
      "Щ": "&SHCHcy;",
      "Ш": "&SHcy;",
      "Ь": "&SOFTcy;",
      "Ś": "&Sacute;",
      "⪼": "&Sc;",
      "Š": "&Scaron;",
      "Ş": "&Scedil;",
      "Ŝ": "&Scirc;",
      "С": "&Scy;",
      "𝔖": "&Sfr;",
      "↑": "&uparrow;",
      "Σ": "&Sigma;",
      "∘": "&compfn;",
      "𝕊": "&Sopf;",
      "√": "&radic;",
      "□": "&square;",
      "⊓": "&sqcap;",
      "⊏": "&sqsubset;",
      "⊑": "&sqsubseteq;",
      "⊐": "&sqsupset;",
      "⊒": "&sqsupseteq;",
      "⊔": "&sqcup;",
      "𝒮": "&Sscr;",
      "⋆": "&sstarf;",
      "⋐": "&Subset;",
      "⊆": "&subseteq;",
      "≻": "&succ;",
      "⪰": "&succeq;",
      "≽": "&succcurlyeq;",
      "≿": "&succsim;",
      "∑": "&sum;",
      "⋑": "&Supset;",
      "⊃": "&supset;",
      "⊇": "&supseteq;",
      "Þ": "&THORN;",
      "™": "&trade;",
      "Ћ": "&TSHcy;",
      "Ц": "&TScy;",
      "\t": "&Tab;",
      "Τ": "&Tau;",
      "Ť": "&Tcaron;",
      "Ţ": "&Tcedil;",
      "Т": "&Tcy;",
      "𝔗": "&Tfr;",
      "∴": "&therefore;",
      "Θ": "&Theta;",
      "  ": "&ThickSpace;",
      " ": "&thinsp;",
      "∼": "&thksim;",
      "≃": "&simeq;",
      "≅": "&cong;",
      "≈": "&thkap;",
      "𝕋": "&Topf;",
      "⃛": "&tdot;",
      "𝒯": "&Tscr;",
      "Ŧ": "&Tstrok;",
      "Ú": "&Uacute;",
      "↟": "&Uarr;",
      "⥉": "&Uarrocir;",
      "Ў": "&Ubrcy;",
      "Ŭ": "&Ubreve;",
      "Û": "&Ucirc;",
      "У": "&Ucy;",
      "Ű": "&Udblac;",
      "𝔘": "&Ufr;",
      "Ù": "&Ugrave;",
      "Ū": "&Umacr;",
      _: "&lowbar;",
      "⏟": "&UnderBrace;",
      "⎵": "&bbrk;",
      "⏝": "&UnderParenthesis;",
      "⋃": "&xcup;",
      "⊎": "&uplus;",
      "Ų": "&Uogon;",
      "𝕌": "&Uopf;",
      "⤒": "&UpArrowBar;",
      "⇅": "&udarr;",
      "↕": "&varr;",
      "⥮": "&udhar;",
      "⊥": "&perp;",
      "↥": "&mapstoup;",
      "↖": "&nwarrow;",
      "↗": "&nearrow;",
      "ϒ": "&upsih;",
      "Υ": "&Upsilon;",
      "Ů": "&Uring;",
      "𝒰": "&Uscr;",
      "Ũ": "&Utilde;",
      "Ü": "&Uuml;",
      "⊫": "&VDash;",
      "⫫": "&Vbar;",
      "В": "&Vcy;",
      "⊩": "&Vdash;",
      "⫦": "&Vdashl;",
      "⋁": "&xvee;",
      "‖": "&Vert;",
      "∣": "&smid;",
      "|": "&vert;",
      "❘": "&VerticalSeparator;",
      "≀": "&wreath;",
      " ": "&hairsp;",
      "𝔙": "&Vfr;",
      "𝕍": "&Vopf;",
      "𝒱": "&Vscr;",
      "⊪": "&Vvdash;",
      "Ŵ": "&Wcirc;",
      "⋀": "&xwedge;",
      "𝔚": "&Wfr;",
      "𝕎": "&Wopf;",
      "𝒲": "&Wscr;",
      "𝔛": "&Xfr;",
      "Ξ": "&Xi;",
      "𝕏": "&Xopf;",
      "𝒳": "&Xscr;",
      "Я": "&YAcy;",
      "Ї": "&YIcy;",
      "Ю": "&YUcy;",
      "Ý": "&Yacute;",
      "Ŷ": "&Ycirc;",
      "Ы": "&Ycy;",
      "𝔜": "&Yfr;",
      "𝕐": "&Yopf;",
      "𝒴": "&Yscr;",
      "Ÿ": "&Yuml;",
      "Ж": "&ZHcy;",
      "Ź": "&Zacute;",
      "Ž": "&Zcaron;",
      "З": "&Zcy;",
      "Ż": "&Zdot;",
      "Ζ": "&Zeta;",
      "ℨ": "&zeetrf;",
      "ℤ": "&integers;",
      "𝒵": "&Zscr;",
      "á": "&aacute;",
      "ă": "&abreve;",
      "∾": "&mstpos;",
      "∾̳": "&acE;",
      "∿": "&acd;",
      "â": "&acirc;",
      "а": "&acy;",
      "æ": "&aelig;",
      "𝔞": "&afr;",
      "à": "&agrave;",
      "ℵ": "&aleph;",
      "α": "&alpha;",
      "ā": "&amacr;",
      "⨿": "&amalg;",
      "∧": "&wedge;",
      "⩕": "&andand;",
      "⩜": "&andd;",
      "⩘": "&andslope;",
      "⩚": "&andv;",
      "∠": "&angle;",
      "⦤": "&ange;",
      "∡": "&measuredangle;",
      "⦨": "&angmsdaa;",
      "⦩": "&angmsdab;",
      "⦪": "&angmsdac;",
      "⦫": "&angmsdad;",
      "⦬": "&angmsdae;",
      "⦭": "&angmsdaf;",
      "⦮": "&angmsdag;",
      "⦯": "&angmsdah;",
      "∟": "&angrt;",
      "⊾": "&angrtvb;",
      "⦝": "&angrtvbd;",
      "∢": "&angsph;",
      "⍼": "&angzarr;",
      "ą": "&aogon;",
      "𝕒": "&aopf;",
      "⩰": "&apE;",
      "⩯": "&apacir;",
      "≊": "&approxeq;",
      "≋": "&apid;",
      "'": "&apos;",
      "å": "&aring;",
      "𝒶": "&ascr;",
      "*": "&midast;",
      "ã": "&atilde;",
      "ä": "&auml;",
      "⨑": "&awint;",
      "⫭": "&bNot;",
      "≌": "&bcong;",
      "϶": "&bepsi;",
      "‵": "&bprime;",
      "∽": "&bsim;",
      "⋍": "&bsime;",
      "⊽": "&barvee;",
      "⌅": "&barwedge;",
      "⎶": "&bbrktbrk;",
      "б": "&bcy;",
      "„": "&ldquor;",
      "⦰": "&bemptyv;",
      "β": "&beta;",
      "ℶ": "&beth;",
      "≬": "&twixt;",
      "𝔟": "&bfr;",
      "◯": "&xcirc;",
      "⨀": "&xodot;",
      "⨁": "&xoplus;",
      "⨂": "&xotime;",
      "⨆": "&xsqcup;",
      "★": "&starf;",
      "▽": "&xdtri;",
      "△": "&xutri;",
      "⨄": "&xuplus;",
      "⤍": "&rbarr;",
      "⧫": "&lozf;",
      "▴": "&utrif;",
      "▾": "&dtrif;",
      "◂": "&ltrif;",
      "▸": "&rtrif;",
      "␣": "&blank;",
      "▒": "&blk12;",
      "░": "&blk14;",
      "▓": "&blk34;",
      "█": "&block;",
      "=⃥": "&bne;",
      "≡⃥": "&bnequiv;",
      "⌐": "&bnot;",
      "𝕓": "&bopf;",
      "⋈": "&bowtie;",
      "╗": "&boxDL;",
      "╔": "&boxDR;",
      "╖": "&boxDl;",
      "╓": "&boxDr;",
      "═": "&boxH;",
      "╦": "&boxHD;",
      "╩": "&boxHU;",
      "╤": "&boxHd;",
      "╧": "&boxHu;",
      "╝": "&boxUL;",
      "╚": "&boxUR;",
      "╜": "&boxUl;",
      "╙": "&boxUr;",
      "║": "&boxV;",
      "╬": "&boxVH;",
      "╣": "&boxVL;",
      "╠": "&boxVR;",
      "╫": "&boxVh;",
      "╢": "&boxVl;",
      "╟": "&boxVr;",
      "⧉": "&boxbox;",
      "╕": "&boxdL;",
      "╒": "&boxdR;",
      "┐": "&boxdl;",
      "┌": "&boxdr;",
      "╥": "&boxhD;",
      "╨": "&boxhU;",
      "┬": "&boxhd;",
      "┴": "&boxhu;",
      "⊟": "&minusb;",
      "⊞": "&plusb;",
      "⊠": "&timesb;",
      "╛": "&boxuL;",
      "╘": "&boxuR;",
      "┘": "&boxul;",
      "└": "&boxur;",
      "│": "&boxv;",
      "╪": "&boxvH;",
      "╡": "&boxvL;",
      "╞": "&boxvR;",
      "┼": "&boxvh;",
      "┤": "&boxvl;",
      "├": "&boxvr;",
      "¦": "&brvbar;",
      "𝒷": "&bscr;",
      "⁏": "&bsemi;",
      "\\": "&bsol;",
      "⧅": "&bsolb;",
      "⟈": "&bsolhsub;",
      "•": "&bullet;",
      "⪮": "&bumpE;",
      "ć": "&cacute;",
      "∩": "&cap;",
      "⩄": "&capand;",
      "⩉": "&capbrcup;",
      "⩋": "&capcap;",
      "⩇": "&capcup;",
      "⩀": "&capdot;",
      "∩︀": "&caps;",
      "⁁": "&caret;",
      "⩍": "&ccaps;",
      "č": "&ccaron;",
      "ç": "&ccedil;",
      "ĉ": "&ccirc;",
      "⩌": "&ccups;",
      "⩐": "&ccupssm;",
      "ċ": "&cdot;",
      "⦲": "&cemptyv;",
      "¢": "&cent;",
      "𝔠": "&cfr;",
      "ч": "&chcy;",
      "✓": "&checkmark;",
      "χ": "&chi;",
      "○": "&cir;",
      "⧃": "&cirE;",
      "ˆ": "&circ;",
      "≗": "&cire;",
      "↺": "&olarr;",
      "↻": "&orarr;",
      "Ⓢ": "&oS;",
      "⊛": "&oast;",
      "⊚": "&ocir;",
      "⊝": "&odash;",
      "⨐": "&cirfnint;",
      "⫯": "&cirmid;",
      "⧂": "&cirscir;",
      "♣": "&clubsuit;",
      ":": "&colon;",
      ",": "&comma;",
      "@": "&commat;",
      "∁": "&complement;",
      "⩭": "&congdot;",
      "𝕔": "&copf;",
      "℗": "&copysr;",
      "↵": "&crarr;",
      "✗": "&cross;",
      "𝒸": "&cscr;",
      "⫏": "&csub;",
      "⫑": "&csube;",
      "⫐": "&csup;",
      "⫒": "&csupe;",
      "⋯": "&ctdot;",
      "⤸": "&cudarrl;",
      "⤵": "&cudarrr;",
      "⋞": "&curlyeqprec;",
      "⋟": "&curlyeqsucc;",
      "↶": "&curvearrowleft;",
      "⤽": "&cularrp;",
      "∪": "&cup;",
      "⩈": "&cupbrcap;",
      "⩆": "&cupcap;",
      "⩊": "&cupcup;",
      "⊍": "&cupdot;",
      "⩅": "&cupor;",
      "∪︀": "&cups;",
      "↷": "&curvearrowright;",
      "⤼": "&curarrm;",
      "⋎": "&cuvee;",
      "⋏": "&cuwed;",
      "¤": "&curren;",
      "∱": "&cwint;",
      "⌭": "&cylcty;",
      "⥥": "&dHar;",
      "†": "&dagger;",
      "ℸ": "&daleth;",
      "‐": "&hyphen;",
      "⤏": "&rBarr;",
      "ď": "&dcaron;",
      "д": "&dcy;",
      "⇊": "&downdownarrows;",
      "⩷": "&eDDot;",
      "°": "&deg;",
      "δ": "&delta;",
      "⦱": "&demptyv;",
      "⥿": "&dfisht;",
      "𝔡": "&dfr;",
      "♦": "&diams;",
      "ϝ": "&gammad;",
      "⋲": "&disin;",
      "÷": "&divide;",
      "⋇": "&divonx;",
      "ђ": "&djcy;",
      "⌞": "&llcorner;",
      "⌍": "&dlcrop;",
      $: "&dollar;",
      "𝕕": "&dopf;",
      "≑": "&eDot;",
      "∸": "&minusd;",
      "∔": "&plusdo;",
      "⊡": "&sdotb;",
      "⌟": "&lrcorner;",
      "⌌": "&drcrop;",
      "𝒹": "&dscr;",
      "ѕ": "&dscy;",
      "⧶": "&dsol;",
      "đ": "&dstrok;",
      "⋱": "&dtdot;",
      "▿": "&triangledown;",
      "⦦": "&dwangle;",
      "џ": "&dzcy;",
      "⟿": "&dzigrarr;",
      "é": "&eacute;",
      "⩮": "&easter;",
      "ě": "&ecaron;",
      "≖": "&eqcirc;",
      "ê": "&ecirc;",
      "≕": "&eqcolon;",
      "э": "&ecy;",
      "ė": "&edot;",
      "≒": "&fallingdotseq;",
      "𝔢": "&efr;",
      "⪚": "&eg;",
      "è": "&egrave;",
      "⪖": "&eqslantgtr;",
      "⪘": "&egsdot;",
      "⪙": "&el;",
      "⏧": "&elinters;",
      "ℓ": "&ell;",
      "⪕": "&eqslantless;",
      "⪗": "&elsdot;",
      "ē": "&emacr;",
      "∅": "&varnothing;",
      " ": "&emsp13;",
      " ": "&emsp14;",
      " ": "&emsp;",
      "ŋ": "&eng;",
      " ": "&ensp;",
      "ę": "&eogon;",
      "𝕖": "&eopf;",
      "⋕": "&epar;",
      "⧣": "&eparsl;",
      "⩱": "&eplus;",
      "ε": "&epsilon;",
      "ϵ": "&varepsilon;",
      "=": "&equals;",
      "≟": "&questeq;",
      "⩸": "&equivDD;",
      "⧥": "&eqvparsl;",
      "≓": "&risingdotseq;",
      "⥱": "&erarr;",
      "ℯ": "&escr;",
      "η": "&eta;",
      "ð": "&eth;",
      "ë": "&euml;",
      "€": "&euro;",
      "!": "&excl;",
      "ф": "&fcy;",
      "♀": "&female;",
      "ﬃ": "&ffilig;",
      "ﬀ": "&fflig;",
      "ﬄ": "&ffllig;",
      "𝔣": "&ffr;",
      "ﬁ": "&filig;",
      fj: "&fjlig;",
      "♭": "&flat;",
      "ﬂ": "&fllig;",
      "▱": "&fltns;",
      "ƒ": "&fnof;",
      "𝕗": "&fopf;",
      "⋔": "&pitchfork;",
      "⫙": "&forkv;",
      "⨍": "&fpartint;",
      "½": "&half;",
      "⅓": "&frac13;",
      "¼": "&frac14;",
      "⅕": "&frac15;",
      "⅙": "&frac16;",
      "⅛": "&frac18;",
      "⅔": "&frac23;",
      "⅖": "&frac25;",
      "¾": "&frac34;",
      "⅗": "&frac35;",
      "⅜": "&frac38;",
      "⅘": "&frac45;",
      "⅚": "&frac56;",
      "⅝": "&frac58;",
      "⅞": "&frac78;",
      "⁄": "&frasl;",
      "⌢": "&sfrown;",
      "𝒻": "&fscr;",
      "⪌": "&gtreqqless;",
      "ǵ": "&gacute;",
      "γ": "&gamma;",
      "⪆": "&gtrapprox;",
      "ğ": "&gbreve;",
      "ĝ": "&gcirc;",
      "г": "&gcy;",
      "ġ": "&gdot;",
      "⪩": "&gescc;",
      "⪀": "&gesdot;",
      "⪂": "&gesdoto;",
      "⪄": "&gesdotol;",
      "⋛︀": "&gesl;",
      "⪔": "&gesles;",
      "𝔤": "&gfr;",
      "ℷ": "&gimel;",
      "ѓ": "&gjcy;",
      "⪒": "&glE;",
      "⪥": "&gla;",
      "⪤": "&glj;",
      "≩": "&gneqq;",
      "⪊": "&gnapprox;",
      "⪈": "&gneq;",
      "⋧": "&gnsim;",
      "𝕘": "&gopf;",
      "ℊ": "&gscr;",
      "⪎": "&gsime;",
      "⪐": "&gsiml;",
      "⪧": "&gtcc;",
      "⩺": "&gtcir;",
      "⋗": "&gtrdot;",
      "⦕": "&gtlPar;",
      "⩼": "&gtquest;",
      "⥸": "&gtrarr;",
      "≩︀": "&gvnE;",
      "ъ": "&hardcy;",
      "⥈": "&harrcir;",
      "↭": "&leftrightsquigarrow;",
      "ℏ": "&plankv;",
      "ĥ": "&hcirc;",
      "♥": "&heartsuit;",
      "…": "&mldr;",
      "⊹": "&hercon;",
      "𝔥": "&hfr;",
      "⤥": "&searhk;",
      "⤦": "&swarhk;",
      "⇿": "&hoarr;",
      "∻": "&homtht;",
      "↩": "&larrhk;",
      "↪": "&rarrhk;",
      "𝕙": "&hopf;",
      "―": "&horbar;",
      "𝒽": "&hscr;",
      "ħ": "&hstrok;",
      "⁃": "&hybull;",
      "í": "&iacute;",
      "î": "&icirc;",
      "и": "&icy;",
      "е": "&iecy;",
      "¡": "&iexcl;",
      "𝔦": "&ifr;",
      "ì": "&igrave;",
      "⨌": "&qint;",
      "∭": "&tint;",
      "⧜": "&iinfin;",
      "℩": "&iiota;",
      "ĳ": "&ijlig;",
      "ī": "&imacr;",
      "ı": "&inodot;",
      "⊷": "&imof;",
      "Ƶ": "&imped;",
      "℅": "&incare;",
      "∞": "&infin;",
      "⧝": "&infintie;",
      "⊺": "&intercal;",
      "⨗": "&intlarhk;",
      "⨼": "&iprod;",
      "ё": "&iocy;",
      "į": "&iogon;",
      "𝕚": "&iopf;",
      "ι": "&iota;",
      "¿": "&iquest;",
      "𝒾": "&iscr;",
      "⋹": "&isinE;",
      "⋵": "&isindot;",
      "⋴": "&isins;",
      "⋳": "&isinsv;",
      "ĩ": "&itilde;",
      "і": "&iukcy;",
      "ï": "&iuml;",
      "ĵ": "&jcirc;",
      "й": "&jcy;",
      "𝔧": "&jfr;",
      "ȷ": "&jmath;",
      "𝕛": "&jopf;",
      "𝒿": "&jscr;",
      "ј": "&jsercy;",
      "є": "&jukcy;",
      "κ": "&kappa;",
      "ϰ": "&varkappa;",
      "ķ": "&kcedil;",
      "к": "&kcy;",
      "𝔨": "&kfr;",
      "ĸ": "&kgreen;",
      "х": "&khcy;",
      "ќ": "&kjcy;",
      "𝕜": "&kopf;",
      "𝓀": "&kscr;",
      "⤛": "&lAtail;",
      "⤎": "&lBarr;",
      "⪋": "&lesseqqgtr;",
      "⥢": "&lHar;",
      "ĺ": "&lacute;",
      "⦴": "&laemptyv;",
      "λ": "&lambda;",
      "⦑": "&langd;",
      "⪅": "&lessapprox;",
      "«": "&laquo;",
      "⤟": "&larrbfs;",
      "⤝": "&larrfs;",
      "↫": "&looparrowleft;",
      "⤹": "&larrpl;",
      "⥳": "&larrsim;",
      "↢": "&leftarrowtail;",
      "⪫": "&lat;",
      "⤙": "&latail;",
      "⪭": "&late;",
      "⪭︀": "&lates;",
      "⤌": "&lbarr;",
      "❲": "&lbbrk;",
      "{": "&lcub;",
      "[": "&lsqb;",
      "⦋": "&lbrke;",
      "⦏": "&lbrksld;",
      "⦍": "&lbrkslu;",
      "ľ": "&lcaron;",
      "ļ": "&lcedil;",
      "л": "&lcy;",
      "⤶": "&ldca;",
      "⥧": "&ldrdhar;",
      "⥋": "&ldrushar;",
      "↲": "&ldsh;",
      "≤": "&leq;",
      "⇇": "&llarr;",
      "⋋": "&lthree;",
      "⪨": "&lescc;",
      "⩿": "&lesdot;",
      "⪁": "&lesdoto;",
      "⪃": "&lesdotor;",
      "⋚︀": "&lesg;",
      "⪓": "&lesges;",
      "⋖": "&ltdot;",
      "⥼": "&lfisht;",
      "𝔩": "&lfr;",
      "⪑": "&lgE;",
      "⥪": "&lharul;",
      "▄": "&lhblk;",
      "љ": "&ljcy;",
      "⥫": "&llhard;",
      "◺": "&lltri;",
      "ŀ": "&lmidot;",
      "⎰": "&lmoustache;",
      "≨": "&lneqq;",
      "⪉": "&lnapprox;",
      "⪇": "&lneq;",
      "⋦": "&lnsim;",
      "⟬": "&loang;",
      "⇽": "&loarr;",
      "⟼": "&xmap;",
      "↬": "&rarrlp;",
      "⦅": "&lopar;",
      "𝕝": "&lopf;",
      "⨭": "&loplus;",
      "⨴": "&lotimes;",
      "∗": "&lowast;",
      "◊": "&lozenge;",
      "(": "&lpar;",
      "⦓": "&lparlt;",
      "⥭": "&lrhard;",
      "‎": "&lrm;",
      "⊿": "&lrtri;",
      "‹": "&lsaquo;",
      "𝓁": "&lscr;",
      "⪍": "&lsime;",
      "⪏": "&lsimg;",
      "‚": "&sbquo;",
      "ł": "&lstrok;",
      "⪦": "&ltcc;",
      "⩹": "&ltcir;",
      "⋉": "&ltimes;",
      "⥶": "&ltlarr;",
      "⩻": "&ltquest;",
      "⦖": "&ltrPar;",
      "◃": "&triangleleft;",
      "⥊": "&lurdshar;",
      "⥦": "&luruhar;",
      "≨︀": "&lvnE;",
      "∺": "&mDDot;",
      "¯": "&strns;",
      "♂": "&male;",
      "✠": "&maltese;",
      "▮": "&marker;",
      "⨩": "&mcomma;",
      "м": "&mcy;",
      "—": "&mdash;",
      "𝔪": "&mfr;",
      "℧": "&mho;",
      "µ": "&micro;",
      "⫰": "&midcir;",
      "−": "&minus;",
      "⨪": "&minusdu;",
      "⫛": "&mlcp;",
      "⊧": "&models;",
      "𝕞": "&mopf;",
      "𝓂": "&mscr;",
      "μ": "&mu;",
      "⊸": "&mumap;",
      "⋙̸": "&nGg;",
      "≫⃒": "&nGt;",
      "⇍": "&nlArr;",
      "⇎": "&nhArr;",
      "⋘̸": "&nLl;",
      "≪⃒": "&nLt;",
      "⇏": "&nrArr;",
      "⊯": "&nVDash;",
      "⊮": "&nVdash;",
      "ń": "&nacute;",
      "∠⃒": "&nang;",
      "⩰̸": "&napE;",
      "≋̸": "&napid;",
      "ŉ": "&napos;",
      "♮": "&natural;",
      "⩃": "&ncap;",
      "ň": "&ncaron;",
      "ņ": "&ncedil;",
      "⩭̸": "&ncongdot;",
      "⩂": "&ncup;",
      "н": "&ncy;",
      "–": "&ndash;",
      "⇗": "&neArr;",
      "⤤": "&nearhk;",
      "≐̸": "&nedot;",
      "⤨": "&toea;",
      "𝔫": "&nfr;",
      "↮": "&nleftrightarrow;",
      "⫲": "&nhpar;",
      "⋼": "&nis;",
      "⋺": "&nisd;",
      "њ": "&njcy;",
      "≦̸": "&nleqq;",
      "↚": "&nleftarrow;",
      "‥": "&nldr;",
      "𝕟": "&nopf;",
      "¬": "&not;",
      "⋹̸": "&notinE;",
      "⋵̸": "&notindot;",
      "⋷": "&notinvb;",
      "⋶": "&notinvc;",
      "⋾": "&notnivb;",
      "⋽": "&notnivc;",
      "⫽⃥": "&nparsl;",
      "∂̸": "&npart;",
      "⨔": "&npolint;",
      "↛": "&nrightarrow;",
      "⤳̸": "&nrarrc;",
      "↝̸": "&nrarrw;",
      "𝓃": "&nscr;",
      "⊄": "&nsub;",
      "⫅̸": "&nsubseteqq;",
      "⊅": "&nsup;",
      "⫆̸": "&nsupseteqq;",
      "ñ": "&ntilde;",
      "ν": "&nu;",
      "#": "&num;",
      "№": "&numero;",
      " ": "&numsp;",
      "⊭": "&nvDash;",
      "⤄": "&nvHarr;",
      "≍⃒": "&nvap;",
      "⊬": "&nvdash;",
      "≥⃒": "&nvge;",
      ">⃒": "&nvgt;",
      "⧞": "&nvinfin;",
      "⤂": "&nvlArr;",
      "≤⃒": "&nvle;",
      "<⃒": "&nvlt;",
      "⊴⃒": "&nvltrie;",
      "⤃": "&nvrArr;",
      "⊵⃒": "&nvrtrie;",
      "∼⃒": "&nvsim;",
      "⇖": "&nwArr;",
      "⤣": "&nwarhk;",
      "⤧": "&nwnear;",
      "ó": "&oacute;",
      "ô": "&ocirc;",
      "о": "&ocy;",
      "ő": "&odblac;",
      "⨸": "&odiv;",
      "⦼": "&odsold;",
      "œ": "&oelig;",
      "⦿": "&ofcir;",
      "𝔬": "&ofr;",
      "˛": "&ogon;",
      "ò": "&ograve;",
      "⧁": "&ogt;",
      "⦵": "&ohbar;",
      "⦾": "&olcir;",
      "⦻": "&olcross;",
      "⧀": "&olt;",
      "ō": "&omacr;",
      "ω": "&omega;",
      "ο": "&omicron;",
      "⦶": "&omid;",
      "𝕠": "&oopf;",
      "⦷": "&opar;",
      "⦹": "&operp;",
      "∨": "&vee;",
      "⩝": "&ord;",
      "ℴ": "&oscr;",
      "ª": "&ordf;",
      "º": "&ordm;",
      "⊶": "&origof;",
      "⩖": "&oror;",
      "⩗": "&orslope;",
      "⩛": "&orv;",
      "ø": "&oslash;",
      "⊘": "&osol;",
      "õ": "&otilde;",
      "⨶": "&otimesas;",
      "ö": "&ouml;",
      "⌽": "&ovbar;",
      "¶": "&para;",
      "⫳": "&parsim;",
      "⫽": "&parsl;",
      "п": "&pcy;",
      "%": "&percnt;",
      ".": "&period;",
      "‰": "&permil;",
      "‱": "&pertenk;",
      "𝔭": "&pfr;",
      "φ": "&phi;",
      "ϕ": "&varphi;",
      "☎": "&phone;",
      "π": "&pi;",
      "ϖ": "&varpi;",
      "ℎ": "&planckh;",
      "+": "&plus;",
      "⨣": "&plusacir;",
      "⨢": "&pluscir;",
      "⨥": "&plusdu;",
      "⩲": "&pluse;",
      "⨦": "&plussim;",
      "⨧": "&plustwo;",
      "⨕": "&pointint;",
      "𝕡": "&popf;",
      "£": "&pound;",
      "⪳": "&prE;",
      "⪷": "&precapprox;",
      "⪹": "&prnap;",
      "⪵": "&prnE;",
      "⋨": "&prnsim;",
      "′": "&prime;",
      "⌮": "&profalar;",
      "⌒": "&profline;",
      "⌓": "&profsurf;",
      "⊰": "&prurel;",
      "𝓅": "&pscr;",
      "ψ": "&psi;",
      " ": "&puncsp;",
      "𝔮": "&qfr;",
      "𝕢": "&qopf;",
      "⁗": "&qprime;",
      "𝓆": "&qscr;",
      "⨖": "&quatint;",
      "?": "&quest;",
      "⤜": "&rAtail;",
      "⥤": "&rHar;",
      "∽̱": "&race;",
      "ŕ": "&racute;",
      "⦳": "&raemptyv;",
      "⦒": "&rangd;",
      "⦥": "&range;",
      "»": "&raquo;",
      "⥵": "&rarrap;",
      "⤠": "&rarrbfs;",
      "⤳": "&rarrc;",
      "⤞": "&rarrfs;",
      "⥅": "&rarrpl;",
      "⥴": "&rarrsim;",
      "↣": "&rightarrowtail;",
      "↝": "&rightsquigarrow;",
      "⤚": "&ratail;",
      "∶": "&ratio;",
      "❳": "&rbbrk;",
      "}": "&rcub;",
      "]": "&rsqb;",
      "⦌": "&rbrke;",
      "⦎": "&rbrksld;",
      "⦐": "&rbrkslu;",
      "ř": "&rcaron;",
      "ŗ": "&rcedil;",
      "р": "&rcy;",
      "⤷": "&rdca;",
      "⥩": "&rdldhar;",
      "↳": "&rdsh;",
      "▭": "&rect;",
      "⥽": "&rfisht;",
      "𝔯": "&rfr;",
      "⥬": "&rharul;",
      "ρ": "&rho;",
      "ϱ": "&varrho;",
      "⇉": "&rrarr;",
      "⋌": "&rthree;",
      "˚": "&ring;",
      "‏": "&rlm;",
      "⎱": "&rmoustache;",
      "⫮": "&rnmid;",
      "⟭": "&roang;",
      "⇾": "&roarr;",
      "⦆": "&ropar;",
      "𝕣": "&ropf;",
      "⨮": "&roplus;",
      "⨵": "&rotimes;",
      ")": "&rpar;",
      "⦔": "&rpargt;",
      "⨒": "&rppolint;",
      "›": "&rsaquo;",
      "𝓇": "&rscr;",
      "⋊": "&rtimes;",
      "▹": "&triangleright;",
      "⧎": "&rtriltri;",
      "⥨": "&ruluhar;",
      "℞": "&rx;",
      "ś": "&sacute;",
      "⪴": "&scE;",
      "⪸": "&succapprox;",
      "š": "&scaron;",
      "ş": "&scedil;",
      "ŝ": "&scirc;",
      "⪶": "&succneqq;",
      "⪺": "&succnapprox;",
      "⋩": "&succnsim;",
      "⨓": "&scpolint;",
      "с": "&scy;",
      "⋅": "&sdot;",
      "⩦": "&sdote;",
      "⇘": "&seArr;",
      "§": "&sect;",
      ";": "&semi;",
      "⤩": "&tosa;",
      "✶": "&sext;",
      "𝔰": "&sfr;",
      "♯": "&sharp;",
      "щ": "&shchcy;",
      "ш": "&shcy;",
      "­": "&shy;",
      "σ": "&sigma;",
      "ς": "&varsigma;",
      "⩪": "&simdot;",
      "⪞": "&simg;",
      "⪠": "&simgE;",
      "⪝": "&siml;",
      "⪟": "&simlE;",
      "≆": "&simne;",
      "⨤": "&simplus;",
      "⥲": "&simrarr;",
      "⨳": "&smashp;",
      "⧤": "&smeparsl;",
      "⌣": "&ssmile;",
      "⪪": "&smt;",
      "⪬": "&smte;",
      "⪬︀": "&smtes;",
      "ь": "&softcy;",
      "/": "&sol;",
      "⧄": "&solb;",
      "⌿": "&solbar;",
      "𝕤": "&sopf;",
      "♠": "&spadesuit;",
      "⊓︀": "&sqcaps;",
      "⊔︀": "&sqcups;",
      "𝓈": "&sscr;",
      "☆": "&star;",
      "⊂": "&subset;",
      "⫅": "&subseteqq;",
      "⪽": "&subdot;",
      "⫃": "&subedot;",
      "⫁": "&submult;",
      "⫋": "&subsetneqq;",
      "⊊": "&subsetneq;",
      "⪿": "&subplus;",
      "⥹": "&subrarr;",
      "⫇": "&subsim;",
      "⫕": "&subsub;",
      "⫓": "&subsup;",
      "♪": "&sung;",
      "¹": "&sup1;",
      "²": "&sup2;",
      "³": "&sup3;",
      "⫆": "&supseteqq;",
      "⪾": "&supdot;",
      "⫘": "&supdsub;",
      "⫄": "&supedot;",
      "⟉": "&suphsol;",
      "⫗": "&suphsub;",
      "⥻": "&suplarr;",
      "⫂": "&supmult;",
      "⫌": "&supsetneqq;",
      "⊋": "&supsetneq;",
      "⫀": "&supplus;",
      "⫈": "&supsim;",
      "⫔": "&supsub;",
      "⫖": "&supsup;",
      "⇙": "&swArr;",
      "⤪": "&swnwar;",
      "ß": "&szlig;",
      "⌖": "&target;",
      "τ": "&tau;",
      "ť": "&tcaron;",
      "ţ": "&tcedil;",
      "т": "&tcy;",
      "⌕": "&telrec;",
      "𝔱": "&tfr;",
      "θ": "&theta;",
      "ϑ": "&vartheta;",
      "þ": "&thorn;",
      "×": "&times;",
      "⨱": "&timesbar;",
      "⨰": "&timesd;",
      "⌶": "&topbot;",
      "⫱": "&topcir;",
      "𝕥": "&topf;",
      "⫚": "&topfork;",
      "‴": "&tprime;",
      "▵": "&utri;",
      "≜": "&trie;",
      "◬": "&tridot;",
      "⨺": "&triminus;",
      "⨹": "&triplus;",
      "⧍": "&trisb;",
      "⨻": "&tritime;",
      "⏢": "&trpezium;",
      "𝓉": "&tscr;",
      "ц": "&tscy;",
      "ћ": "&tshcy;",
      "ŧ": "&tstrok;",
      "⥣": "&uHar;",
      "ú": "&uacute;",
      "ў": "&ubrcy;",
      "ŭ": "&ubreve;",
      "û": "&ucirc;",
      "у": "&ucy;",
      "ű": "&udblac;",
      "⥾": "&ufisht;",
      "𝔲": "&ufr;",
      "ù": "&ugrave;",
      "▀": "&uhblk;",
      "⌜": "&ulcorner;",
      "⌏": "&ulcrop;",
      "◸": "&ultri;",
      "ū": "&umacr;",
      "ų": "&uogon;",
      "𝕦": "&uopf;",
      "υ": "&upsilon;",
      "⇈": "&uuarr;",
      "⌝": "&urcorner;",
      "⌎": "&urcrop;",
      "ů": "&uring;",
      "◹": "&urtri;",
      "𝓊": "&uscr;",
      "⋰": "&utdot;",
      "ũ": "&utilde;",
      "ü": "&uuml;",
      "⦧": "&uwangle;",
      "⫨": "&vBar;",
      "⫩": "&vBarv;",
      "⦜": "&vangrt;",
      "⊊︀": "&vsubne;",
      "⫋︀": "&vsubnE;",
      "⊋︀": "&vsupne;",
      "⫌︀": "&vsupnE;",
      "в": "&vcy;",
      "⊻": "&veebar;",
      "≚": "&veeeq;",
      "⋮": "&vellip;",
      "𝔳": "&vfr;",
      "𝕧": "&vopf;",
      "𝓋": "&vscr;",
      "⦚": "&vzigzag;",
      "ŵ": "&wcirc;",
      "⩟": "&wedbar;",
      "≙": "&wedgeq;",
      "℘": "&wp;",
      "𝔴": "&wfr;",
      "𝕨": "&wopf;",
      "𝓌": "&wscr;",
      "𝔵": "&xfr;",
      "ξ": "&xi;",
      "⋻": "&xnis;",
      "𝕩": "&xopf;",
      "𝓍": "&xscr;",
      "ý": "&yacute;",
      "я": "&yacy;",
      "ŷ": "&ycirc;",
      "ы": "&ycy;",
      "¥": "&yen;",
      "𝔶": "&yfr;",
      "ї": "&yicy;",
      "𝕪": "&yopf;",
      "𝓎": "&yscr;",
      "ю": "&yucy;",
      "ÿ": "&yuml;",
      "ź": "&zacute;",
      "ž": "&zcaron;",
      "з": "&zcy;",
      "ż": "&zdot;",
      "ζ": "&zeta;",
      "𝔷": "&zfr;",
      "ж": "&zhcy;",
      "⇝": "&zigrarr;",
      "𝕫": "&zopf;",
      "𝓏": "&zscr;",
      "‍": "&zwj;",
      "‌": "&zwnj;"
    }
  }
};

/***/ }),

/***/ "./node_modules/html-entities/lib/numeric-unicode-map.js":
/*!***************************************************************!*\
  !*** ./node_modules/html-entities/lib/numeric-unicode-map.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.numericUnicodeMap = {
  0: 65533,
  128: 8364,
  130: 8218,
  131: 402,
  132: 8222,
  133: 8230,
  134: 8224,
  135: 8225,
  136: 710,
  137: 8240,
  138: 352,
  139: 8249,
  140: 338,
  142: 381,
  145: 8216,
  146: 8217,
  147: 8220,
  148: 8221,
  149: 8226,
  150: 8211,
  151: 8212,
  152: 732,
  153: 8482,
  154: 353,
  155: 8250,
  156: 339,
  158: 382,
  159: 376
};

/***/ }),

/***/ "./node_modules/html-entities/lib/surrogate-pairs.js":
/*!***********************************************************!*\
  !*** ./node_modules/html-entities/lib/surrogate-pairs.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.fromCodePoint = String.fromCodePoint || function (astralCodePoint) {
  return String.fromCharCode(Math.floor((astralCodePoint - 65536) / 1024) + 55296, (astralCodePoint - 65536) % 1024 + 56320);
};
exports.getCodePoint = String.prototype.codePointAt ? function (input, position) {
  return input.codePointAt(position);
} : function (input, position) {
  return (input.charCodeAt(position) - 55296) * 1024 + input.charCodeAt(position + 1) - 56320 + 65536;
};
exports.highSurrogateFrom = 55296;
exports.highSurrogateTo = 56319;

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js ***!
  \*******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* eslint-env browser */
/*
  eslint-disable
  no-console,
  func-names
*/

/** @typedef {any} TODO */
var normalizeUrl = __webpack_require__(/*! ./normalize-url */ "./node_modules/mini-css-extract-plugin/dist/hmr/normalize-url.js");
var srcByModuleId = Object.create(null);
var noDocument = typeof document === "undefined";
var forEach = Array.prototype.forEach;

/**
 * @param {function} fn
 * @param {number} time
 * @returns {(function(): void)|*}
 */
function debounce(fn, time) {
  var timeout = 0;
  return function () {
    // @ts-ignore
    var self = this;
    // eslint-disable-next-line prefer-rest-params
    var args = arguments;
    var functionCall = function functionCall() {
      return fn.apply(self, args);
    };
    clearTimeout(timeout);

    // @ts-ignore
    timeout = setTimeout(functionCall, time);
  };
}
function noop() {}

/**
 * @param {TODO} moduleId
 * @returns {TODO}
 */
function getCurrentScriptUrl(moduleId) {
  var src = srcByModuleId[moduleId];
  if (!src) {
    if (document.currentScript) {
      src = (/** @type {HTMLScriptElement} */document.currentScript).src;
    } else {
      var scripts = document.getElementsByTagName("script");
      var lastScriptTag = scripts[scripts.length - 1];
      if (lastScriptTag) {
        src = lastScriptTag.src;
      }
    }
    srcByModuleId[moduleId] = src;
  }

  /**
   * @param {string} fileMap
   * @returns {null | string[]}
   */
  return function (fileMap) {
    if (!src) {
      return null;
    }
    var splitResult = src.split(/([^\\/]+)\.js$/);
    var filename = splitResult && splitResult[1];
    if (!filename) {
      return [src.replace(".js", ".css")];
    }
    if (!fileMap) {
      return [src.replace(".js", ".css")];
    }
    return fileMap.split(",").map(function (mapRule) {
      var reg = new RegExp("".concat(filename, "\\.js$"), "g");
      return normalizeUrl(src.replace(reg, "".concat(mapRule.replace(/{fileName}/g, filename), ".css")));
    });
  };
}

/**
 * @param {TODO} el
 * @param {string} [url]
 */
function updateCss(el, url) {
  if (!url) {
    if (!el.href) {
      return;
    }

    // eslint-disable-next-line
    url = el.href.split("?")[0];
  }
  if (!isUrlRequest(/** @type {string} */url)) {
    return;
  }
  if (el.isLoaded === false) {
    // We seem to be about to replace a css link that hasn't loaded yet.
    // We're probably changing the same file more than once.
    return;
  }
  if (!url || !(url.indexOf(".css") > -1)) {
    return;
  }

  // eslint-disable-next-line no-param-reassign
  el.visited = true;
  var newEl = el.cloneNode();
  newEl.isLoaded = false;
  newEl.addEventListener("load", function () {
    if (newEl.isLoaded) {
      return;
    }
    newEl.isLoaded = true;
    el.parentNode.removeChild(el);
  });
  newEl.addEventListener("error", function () {
    if (newEl.isLoaded) {
      return;
    }
    newEl.isLoaded = true;
    el.parentNode.removeChild(el);
  });
  newEl.href = "".concat(url, "?").concat(Date.now());
  if (el.nextSibling) {
    el.parentNode.insertBefore(newEl, el.nextSibling);
  } else {
    el.parentNode.appendChild(newEl);
  }
}

/**
 * @param {string} href
 * @param {TODO} src
 * @returns {TODO}
 */
function getReloadUrl(href, src) {
  var ret;

  // eslint-disable-next-line no-param-reassign
  href = normalizeUrl(href);
  src.some(
  /**
   * @param {string} url
   */
  // eslint-disable-next-line array-callback-return
  function (url) {
    if (href.indexOf(src) > -1) {
      ret = url;
    }
  });
  return ret;
}

/**
 * @param {string} [src]
 * @returns {boolean}
 */
function reloadStyle(src) {
  if (!src) {
    return false;
  }
  var elements = document.querySelectorAll("link");
  var loaded = false;
  forEach.call(elements, function (el) {
    if (!el.href) {
      return;
    }
    var url = getReloadUrl(el.href, src);
    if (!isUrlRequest(url)) {
      return;
    }
    if (el.visited === true) {
      return;
    }
    if (url) {
      updateCss(el, url);
      loaded = true;
    }
  });
  return loaded;
}
function reloadAll() {
  var elements = document.querySelectorAll("link");
  forEach.call(elements, function (el) {
    if (el.visited === true) {
      return;
    }
    updateCss(el);
  });
}

/**
 * @param {string} url
 * @returns {boolean}
 */
function isUrlRequest(url) {
  // An URL is not an request if

  // It is not http or https
  if (!/^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(url)) {
    return false;
  }
  return true;
}

/**
 * @param {TODO} moduleId
 * @param {TODO} options
 * @returns {TODO}
 */
module.exports = function (moduleId, options) {
  if (noDocument) {
    console.log("no window.document found, will not HMR CSS");
    return noop;
  }
  var getScriptSrc = getCurrentScriptUrl(moduleId);
  function update() {
    var src = getScriptSrc(options.filename);
    var reloaded = reloadStyle(src);
    if (options.locals) {
      console.log("[HMR] Detected local css modules. Reload all css");
      reloadAll();
      return;
    }
    if (reloaded) {
      console.log("[HMR] css reload %s", src.join(" "));
    } else {
      console.log("[HMR] Reload all css");
      reloadAll();
    }
  }
  return debounce(update, 50);
};

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/hmr/normalize-url.js":
/*!************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/hmr/normalize-url.js ***!
  \************************************************************************/
/***/ ((module) => {

"use strict";


/* eslint-disable */

/**
 * @param {string[]} pathComponents
 * @returns {string}
 */
function normalizeUrl(pathComponents) {
  return pathComponents.reduce(function (accumulator, item) {
    switch (item) {
      case "..":
        accumulator.pop();
        break;
      case ".":
        break;
      default:
        accumulator.push(item);
    }
    return accumulator;
  }, /** @type {string[]} */[]).join("/");
}

/**
 * @param {string} urlString
 * @returns {string}
 */
module.exports = function (urlString) {
  urlString = urlString.trim();
  if (/^data:/i.test(urlString)) {
    return urlString;
  }
  var protocol = urlString.indexOf("//") !== -1 ? urlString.split("//")[0] + "//" : "";
  var components = urlString.replace(new RegExp(protocol, "i"), "").split("/");
  var host = components[0].toLowerCase().replace(/\.$/, "");
  components[0] = "";
  var path = normalizeUrl(components);
  return protocol + host + path;
};

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/clients/WebSocketClient.js":
/*!***************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/clients/WebSocketClient.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ WebSocketClient)
/* harmony export */ });
/* harmony import */ var _utils_log_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/log.js */ "./node_modules/webpack-dev-server/client/utils/log.js");
function _classCallCheck(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
  }
}
function _createClass(e, r, t) {
  return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}

var WebSocketClient = /*#__PURE__*/function () {
  /**
   * @param {string} url
   */
  function WebSocketClient(url) {
    _classCallCheck(this, WebSocketClient);
    this.client = new WebSocket(url);
    this.client.onerror = function (error) {
      _utils_log_js__WEBPACK_IMPORTED_MODULE_0__.log.error(error);
    };
  }

  /**
   * @param {(...args: any[]) => void} f
   */
  return _createClass(WebSocketClient, [{
    key: "onOpen",
    value: function onOpen(f) {
      this.client.onopen = f;
    }

    /**
     * @param {(...args: any[]) => void} f
     */
  }, {
    key: "onClose",
    value: function onClose(f) {
      this.client.onclose = f;
    }

    // call f with the message string as the first argument
    /**
     * @param {(...args: any[]) => void} f
     */
  }, {
    key: "onMessage",
    value: function onMessage(f) {
      this.client.onmessage = function (e) {
        f(e.data);
      };
    }
  }]);
}();


/***/ }),

/***/ "./node_modules/webpack-dev-server/client/index.js?protocol=ws%3A&hostname=0.0.0.0&port=8080&pathname=%2Fws&logging=info&overlay=true&reconnect=10&hot=true&live-reload=true":
/*!***********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/index.js?protocol=ws%3A&hostname=0.0.0.0&port=8080&pathname=%2Fws&logging=info&overlay=true&reconnect=10&hot=true&live-reload=true ***!
  \***********************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
var __resourceQuery = "?protocol=ws%3A&hostname=0.0.0.0&port=8080&pathname=%2Fws&logging=info&overlay=true&reconnect=10&hot=true&live-reload=true";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var webpack_hot_log_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webpack/hot/log.js */ "./node_modules/webpack/hot/log.js");
/* harmony import */ var webpack_hot_log_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webpack_hot_log_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_stripAnsi_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/stripAnsi.js */ "./node_modules/webpack-dev-server/client/utils/stripAnsi.js");
/* harmony import */ var _utils_parseURL_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/parseURL.js */ "./node_modules/webpack-dev-server/client/utils/parseURL.js");
/* harmony import */ var _socket_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./socket.js */ "./node_modules/webpack-dev-server/client/socket.js");
/* harmony import */ var _overlay_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./overlay.js */ "./node_modules/webpack-dev-server/client/overlay.js");
/* harmony import */ var _utils_log_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/log.js */ "./node_modules/webpack-dev-server/client/utils/log.js");
/* harmony import */ var _utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/sendMessage.js */ "./node_modules/webpack-dev-server/client/utils/sendMessage.js");
/* harmony import */ var _utils_reloadApp_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/reloadApp.js */ "./node_modules/webpack-dev-server/client/utils/reloadApp.js");
/* harmony import */ var _utils_createSocketURL_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./utils/createSocketURL.js */ "./node_modules/webpack-dev-server/client/utils/createSocketURL.js");
/* harmony import */ var _progress_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./progress.js */ "./node_modules/webpack-dev-server/client/progress.js");
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
      _defineProperty(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}
function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
/* global __resourceQuery, __webpack_hash__ */
/// <reference types="webpack/module" />











/**
 * @typedef {Object} OverlayOptions
 * @property {boolean | (error: Error) => boolean} [warnings]
 * @property {boolean | (error: Error) => boolean} [errors]
 * @property {boolean | (error: Error) => boolean} [runtimeErrors]
 * @property {string} [trustedTypesPolicyName]
 */

/**
 * @typedef {Object} Options
 * @property {boolean} hot
 * @property {boolean} liveReload
 * @property {boolean} progress
 * @property {boolean | OverlayOptions} overlay
 * @property {string} [logging]
 * @property {number} [reconnect]
 */

/**
 * @typedef {Object} Status
 * @property {boolean} isUnloading
 * @property {string} currentHash
 * @property {string} [previousHash]
 */

/**
 * @param {boolean | { warnings?: boolean | string; errors?: boolean | string; runtimeErrors?: boolean | string; }} overlayOptions
 */
var decodeOverlayOptions = function decodeOverlayOptions(overlayOptions) {
  if (typeof overlayOptions === "object") {
    ["warnings", "errors", "runtimeErrors"].forEach(function (property) {
      if (typeof overlayOptions[property] === "string") {
        var overlayFilterFunctionString = decodeURIComponent(overlayOptions[property]);

        // eslint-disable-next-line no-new-func
        var overlayFilterFunction = new Function("message", "var callback = ".concat(overlayFilterFunctionString, "\n        return callback(message)"));
        overlayOptions[property] = overlayFilterFunction;
      }
    });
  }
};

/**
 * @type {Status}
 */
var status = {
  isUnloading: false,
  // eslint-disable-next-line camelcase
  currentHash: __webpack_require__.h()
};

/** @type {Options} */
var options = {
  hot: false,
  liveReload: false,
  progress: false,
  overlay: false
};
var parsedResourceQuery = (0,_utils_parseURL_js__WEBPACK_IMPORTED_MODULE_2__["default"])(__resourceQuery);
var enabledFeatures = {
  "Hot Module Replacement": false,
  "Live Reloading": false,
  Progress: false,
  Overlay: false
};
if (parsedResourceQuery.hot === "true") {
  options.hot = true;
  enabledFeatures["Hot Module Replacement"] = true;
}
if (parsedResourceQuery["live-reload"] === "true") {
  options.liveReload = true;
  enabledFeatures["Live Reloading"] = true;
}
if (parsedResourceQuery.progress === "true") {
  options.progress = true;
  enabledFeatures.Progress = true;
}
if (parsedResourceQuery.overlay) {
  try {
    options.overlay = JSON.parse(parsedResourceQuery.overlay);
  } catch (e) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.error("Error parsing overlay options from resource query:", e);
  }

  // Fill in default "true" params for partially-specified objects.
  if (typeof options.overlay === "object") {
    options.overlay = _objectSpread({
      errors: true,
      warnings: true,
      runtimeErrors: true
    }, options.overlay);
    decodeOverlayOptions(options.overlay);
  }
  enabledFeatures.Overlay = true;
}
if (parsedResourceQuery.logging) {
  options.logging = parsedResourceQuery.logging;
}
if (typeof parsedResourceQuery.reconnect !== "undefined") {
  options.reconnect = Number(parsedResourceQuery.reconnect);
}

/**
 * @param {string} level
 */
function setAllLogLevel(level) {
  // This is needed because the HMR logger operate separately from dev server logger
  webpack_hot_log_js__WEBPACK_IMPORTED_MODULE_0___default().setLogLevel(level === "verbose" || level === "log" ? "info" : level);
  (0,_utils_log_js__WEBPACK_IMPORTED_MODULE_5__.setLogLevel)(level);
}
if (options.logging) {
  setAllLogLevel(options.logging);
}
(0,_utils_log_js__WEBPACK_IMPORTED_MODULE_5__.logEnabledFeatures)(enabledFeatures);
self.addEventListener("beforeunload", function () {
  status.isUnloading = true;
});
var overlay = typeof window !== "undefined" ? (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.createOverlay)(typeof options.overlay === "object" ? {
  trustedTypesPolicyName: options.overlay.trustedTypesPolicyName,
  catchRuntimeError: options.overlay.runtimeErrors
} : {
  trustedTypesPolicyName: false,
  catchRuntimeError: options.overlay
}) : {
  send: function send() {}
};
var onSocketMessage = {
  hot: function hot() {
    if (parsedResourceQuery.hot === "false") {
      return;
    }
    options.hot = true;
  },
  liveReload: function liveReload() {
    if (parsedResourceQuery["live-reload"] === "false") {
      return;
    }
    options.liveReload = true;
  },
  invalid: function invalid() {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("App updated. Recompiling...");

    // Fixes #1042. overlay doesn't clear if errors are fixed but warnings remain.
    if (options.overlay) {
      overlay.send({
        type: "DISMISS"
      });
    }
    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Invalid");
  },
  /**
   * @param {string} hash
   */
  hash: function hash(_hash) {
    status.previousHash = status.currentHash;
    status.currentHash = _hash;
  },
  logging: setAllLogLevel,
  /**
   * @param {boolean} value
   */
  overlay: function overlay(value) {
    if (typeof document === "undefined") {
      return;
    }
    options.overlay = value;
    decodeOverlayOptions(options.overlay);
  },
  /**
   * @param {number} value
   */
  reconnect: function reconnect(value) {
    if (parsedResourceQuery.reconnect === "false") {
      return;
    }
    options.reconnect = value;
  },
  /**
   * @param {boolean} value
   */
  progress: function progress(value) {
    options.progress = value;
  },
  /**
   * @param {{ pluginName?: string, percent: number, msg: string }} data
   */
  "progress-update": function progressUpdate(data) {
    if (options.progress) {
      _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("".concat(data.pluginName ? "[".concat(data.pluginName, "] ") : "").concat(data.percent, "% - ").concat(data.msg, "."));
    }
    if ((0,_progress_js__WEBPACK_IMPORTED_MODULE_9__.isProgressSupported)()) {
      if (typeof options.progress === "string") {
        var progress = document.querySelector("wds-progress");
        if (!progress) {
          (0,_progress_js__WEBPACK_IMPORTED_MODULE_9__.defineProgressElement)();
          progress = document.createElement("wds-progress");
          document.body.appendChild(progress);
        }
        progress.setAttribute("progress", data.percent);
        progress.setAttribute("type", options.progress);
      }
    }
    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Progress", data);
  },
  "still-ok": function stillOk() {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("Nothing changed.");
    if (options.overlay) {
      overlay.send({
        type: "DISMISS"
      });
    }
    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("StillOk");
  },
  ok: function ok() {
    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Ok");
    if (options.overlay) {
      overlay.send({
        type: "DISMISS"
      });
    }
    (0,_utils_reloadApp_js__WEBPACK_IMPORTED_MODULE_7__["default"])(options, status);
  },
  /**
   * @param {string} file
   */
  "static-changed": function staticChanged(file) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("".concat(file ? "\"".concat(file, "\"") : "Content", " from static directory was changed. Reloading..."));
    self.location.reload();
  },
  /**
   * @param {Error[]} warnings
   * @param {any} params
   */
  warnings: function warnings(_warnings, params) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.warn("Warnings while compiling.");
    var printableWarnings = _warnings.map(function (error) {
      var _formatProblem = (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.formatProblem)("warning", error),
        header = _formatProblem.header,
        body = _formatProblem.body;
      return "".concat(header, "\n").concat((0,_utils_stripAnsi_js__WEBPACK_IMPORTED_MODULE_1__["default"])(body));
    });
    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Warnings", printableWarnings);
    for (var i = 0; i < printableWarnings.length; i++) {
      _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.warn(printableWarnings[i]);
    }
    var overlayWarningsSetting = typeof options.overlay === "boolean" ? options.overlay : options.overlay && options.overlay.warnings;
    if (overlayWarningsSetting) {
      var warningsToDisplay = typeof overlayWarningsSetting === "function" ? _warnings.filter(overlayWarningsSetting) : _warnings;
      if (warningsToDisplay.length) {
        overlay.send({
          type: "BUILD_ERROR",
          level: "warning",
          messages: _warnings
        });
      }
    }
    if (params && params.preventReloading) {
      return;
    }
    (0,_utils_reloadApp_js__WEBPACK_IMPORTED_MODULE_7__["default"])(options, status);
  },
  /**
   * @param {Error[]} errors
   */
  errors: function errors(_errors) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.error("Errors while compiling. Reload prevented.");
    var printableErrors = _errors.map(function (error) {
      var _formatProblem2 = (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.formatProblem)("error", error),
        header = _formatProblem2.header,
        body = _formatProblem2.body;
      return "".concat(header, "\n").concat((0,_utils_stripAnsi_js__WEBPACK_IMPORTED_MODULE_1__["default"])(body));
    });
    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Errors", printableErrors);
    for (var i = 0; i < printableErrors.length; i++) {
      _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.error(printableErrors[i]);
    }
    var overlayErrorsSettings = typeof options.overlay === "boolean" ? options.overlay : options.overlay && options.overlay.errors;
    if (overlayErrorsSettings) {
      var errorsToDisplay = typeof overlayErrorsSettings === "function" ? _errors.filter(overlayErrorsSettings) : _errors;
      if (errorsToDisplay.length) {
        overlay.send({
          type: "BUILD_ERROR",
          level: "error",
          messages: _errors
        });
      }
    }
  },
  /**
   * @param {Error} error
   */
  error: function error(_error) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.error(_error);
  },
  close: function close() {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("Disconnected!");
    if (options.overlay) {
      overlay.send({
        type: "DISMISS"
      });
    }
    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Close");
  }
};
var socketURL = (0,_utils_createSocketURL_js__WEBPACK_IMPORTED_MODULE_8__["default"])(parsedResourceQuery);
(0,_socket_js__WEBPACK_IMPORTED_MODULE_3__["default"])(socketURL, onSocketMessage, options.reconnect);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/modules/logger/index.js":
/*!************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/modules/logger/index.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

/******/(function () {
  // webpackBootstrap
  /******/
  "use strict";

  /******/
  var __webpack_modules__ = {
    /***/"./client-src/modules/logger/tapable.js": (
    /*!**********************************************!*\
      !*** ./client-src/modules/logger/tapable.js ***!
      \**********************************************/
    /***/
    function (__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_404__) {
      __nested_webpack_require_404__.r(__nested_webpack_exports__);
      /* harmony export */
      __nested_webpack_require_404__.d(__nested_webpack_exports__, {
        /* harmony export */SyncBailHook: function () {
          return /* binding */SyncBailHook;
        }
        /* harmony export */
      });
      function SyncBailHook() {
        return {
          call: function call() {}
        };
      }

      /**
       * Client stub for tapable SyncBailHook
       */
      // eslint-disable-next-line import/prefer-default-export

      /***/
    }),
    /***/"./node_modules/webpack/lib/logging/Logger.js": (
    /*!****************************************************!*\
      !*** ./node_modules/webpack/lib/logging/Logger.js ***!
      \****************************************************/
    /***/
    function (module) {
      /*
      	MIT License http://www.opensource.org/licenses/mit-license.php
      	Author Tobias Koppers @sokra
      */

      function _toConsumableArray(r) {
        return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
      }
      function _nonIterableSpread() {
        throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      function _unsupportedIterableToArray(r, a) {
        if (r) {
          if ("string" == typeof r) return _arrayLikeToArray(r, a);
          var t = {}.toString.call(r).slice(8, -1);
          return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
        }
      }
      function _iterableToArray(r) {
        if ("undefined" != typeof (typeof Symbol !== "undefined" ? Symbol : function (i) {
          return i;
        }) && null != r[(typeof Symbol !== "undefined" ? Symbol : function (i) {
          return i;
        }).iterator] || null != r["@@iterator"]) return Array.from(r);
      }
      function _arrayWithoutHoles(r) {
        if (Array.isArray(r)) return _arrayLikeToArray(r);
      }
      function _arrayLikeToArray(r, a) {
        (null == a || a > r.length) && (a = r.length);
        for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
        return n;
      }
      function _classCallCheck(a, n) {
        if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
      }
      function _defineProperties(e, r) {
        for (var t = 0; t < r.length; t++) {
          var o = r[t];
          o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
        }
      }
      function _createClass(e, r, t) {
        return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
          writable: !1
        }), e;
      }
      function _toPropertyKey(t) {
        var i = _toPrimitive(t, "string");
        return "symbol" == typeof i ? i : i + "";
      }
      function _toPrimitive(t, r) {
        if ("object" != typeof t || !t) return t;
        var e = t[(typeof Symbol !== "undefined" ? Symbol : function (i) {
          return i;
        }).toPrimitive];
        if (void 0 !== e) {
          var i = e.call(t, r || "default");
          if ("object" != typeof i) return i;
          throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return ("string" === r ? String : Number)(t);
      }
      var LogType = Object.freeze({
        error: (/** @type {"error"} */"error"),
        // message, c style arguments
        warn: (/** @type {"warn"} */"warn"),
        // message, c style arguments
        info: (/** @type {"info"} */"info"),
        // message, c style arguments
        log: (/** @type {"log"} */"log"),
        // message, c style arguments
        debug: (/** @type {"debug"} */"debug"),
        // message, c style arguments

        trace: (/** @type {"trace"} */"trace"),
        // no arguments

        group: (/** @type {"group"} */"group"),
        // [label]
        groupCollapsed: (/** @type {"groupCollapsed"} */"groupCollapsed"),
        // [label]
        groupEnd: (/** @type {"groupEnd"} */"groupEnd"),
        // [label]

        profile: (/** @type {"profile"} */"profile"),
        // [profileName]
        profileEnd: (/** @type {"profileEnd"} */"profileEnd"),
        // [profileName]

        time: (/** @type {"time"} */"time"),
        // name, time as [seconds, nanoseconds]

        clear: (/** @type {"clear"} */"clear"),
        // no arguments
        status: (/** @type {"status"} */"status") // message, arguments
      });
      module.exports.LogType = LogType;

      /** @typedef {typeof LogType[keyof typeof LogType]} LogTypeEnum */

      var LOG_SYMBOL = (typeof Symbol !== "undefined" ? Symbol : function (i) {
        return i;
      })("webpack logger raw log method");
      var TIMERS_SYMBOL = (typeof Symbol !== "undefined" ? Symbol : function (i) {
        return i;
      })("webpack logger times");
      var TIMERS_AGGREGATES_SYMBOL = (typeof Symbol !== "undefined" ? Symbol : function (i) {
        return i;
      })("webpack logger aggregated times");
      var WebpackLogger = /*#__PURE__*/function () {
        /**
         * @param {function(LogTypeEnum, any[]=): void} log log function
         * @param {function(string | function(): string): WebpackLogger} getChildLogger function to create child logger
         */
        function WebpackLogger(log, getChildLogger) {
          _classCallCheck(this, WebpackLogger);
          this[LOG_SYMBOL] = log;
          this.getChildLogger = getChildLogger;
        }

        /**
         * @param {...any} args args
         */
        return _createClass(WebpackLogger, [{
          key: "error",
          value: function error() {
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }
            this[LOG_SYMBOL](LogType.error, args);
          }

          /**
           * @param {...any} args args
           */
        }, {
          key: "warn",
          value: function warn() {
            for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
              args[_key2] = arguments[_key2];
            }
            this[LOG_SYMBOL](LogType.warn, args);
          }

          /**
           * @param {...any} args args
           */
        }, {
          key: "info",
          value: function info() {
            for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
              args[_key3] = arguments[_key3];
            }
            this[LOG_SYMBOL](LogType.info, args);
          }

          /**
           * @param {...any} args args
           */
        }, {
          key: "log",
          value: function log() {
            for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
              args[_key4] = arguments[_key4];
            }
            this[LOG_SYMBOL](LogType.log, args);
          }

          /**
           * @param {...any} args args
           */
        }, {
          key: "debug",
          value: function debug() {
            for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
              args[_key5] = arguments[_key5];
            }
            this[LOG_SYMBOL](LogType.debug, args);
          }

          /**
           * @param {any} assertion assertion
           * @param {...any} args args
           */
        }, {
          key: "assert",
          value: function assert(assertion) {
            if (!assertion) {
              for (var _len6 = arguments.length, args = new Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
                args[_key6 - 1] = arguments[_key6];
              }
              this[LOG_SYMBOL](LogType.error, args);
            }
          }
        }, {
          key: "trace",
          value: function trace() {
            this[LOG_SYMBOL](LogType.trace, ["Trace"]);
          }
        }, {
          key: "clear",
          value: function clear() {
            this[LOG_SYMBOL](LogType.clear);
          }

          /**
           * @param {...any} args args
           */
        }, {
          key: "status",
          value: function status() {
            for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
              args[_key7] = arguments[_key7];
            }
            this[LOG_SYMBOL](LogType.status, args);
          }

          /**
           * @param {...any} args args
           */
        }, {
          key: "group",
          value: function group() {
            for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
              args[_key8] = arguments[_key8];
            }
            this[LOG_SYMBOL](LogType.group, args);
          }

          /**
           * @param {...any} args args
           */
        }, {
          key: "groupCollapsed",
          value: function groupCollapsed() {
            for (var _len9 = arguments.length, args = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
              args[_key9] = arguments[_key9];
            }
            this[LOG_SYMBOL](LogType.groupCollapsed, args);
          }
        }, {
          key: "groupEnd",
          value: function groupEnd() {
            this[LOG_SYMBOL](LogType.groupEnd);
          }

          /**
           * @param {string=} label label
           */
        }, {
          key: "profile",
          value: function profile(label) {
            this[LOG_SYMBOL](LogType.profile, [label]);
          }

          /**
           * @param {string=} label label
           */
        }, {
          key: "profileEnd",
          value: function profileEnd(label) {
            this[LOG_SYMBOL](LogType.profileEnd, [label]);
          }

          /**
           * @param {string} label label
           */
        }, {
          key: "time",
          value: function time(label) {
            /** @type {Map<string | undefined, [number, number]>} */
            this[TIMERS_SYMBOL] = this[TIMERS_SYMBOL] || new Map();
            this[TIMERS_SYMBOL].set(label, process.hrtime());
          }

          /**
           * @param {string=} label label
           */
        }, {
          key: "timeLog",
          value: function timeLog(label) {
            var prev = this[TIMERS_SYMBOL] && this[TIMERS_SYMBOL].get(label);
            if (!prev) {
              throw new Error("No such label '".concat(label, "' for WebpackLogger.timeLog()"));
            }
            var time = process.hrtime(prev);
            this[LOG_SYMBOL](LogType.time, [label].concat(_toConsumableArray(time)));
          }

          /**
           * @param {string=} label label
           */
        }, {
          key: "timeEnd",
          value: function timeEnd(label) {
            var prev = this[TIMERS_SYMBOL] && this[TIMERS_SYMBOL].get(label);
            if (!prev) {
              throw new Error("No such label '".concat(label, "' for WebpackLogger.timeEnd()"));
            }
            var time = process.hrtime(prev);
            /** @type {Map<string | undefined, [number, number]>} */
            this[TIMERS_SYMBOL].delete(label);
            this[LOG_SYMBOL](LogType.time, [label].concat(_toConsumableArray(time)));
          }

          /**
           * @param {string=} label label
           */
        }, {
          key: "timeAggregate",
          value: function timeAggregate(label) {
            var prev = this[TIMERS_SYMBOL] && this[TIMERS_SYMBOL].get(label);
            if (!prev) {
              throw new Error("No such label '".concat(label, "' for WebpackLogger.timeAggregate()"));
            }
            var time = process.hrtime(prev);
            /** @type {Map<string | undefined, [number, number]>} */
            this[TIMERS_SYMBOL].delete(label);
            /** @type {Map<string | undefined, [number, number]>} */
            this[TIMERS_AGGREGATES_SYMBOL] = this[TIMERS_AGGREGATES_SYMBOL] || new Map();
            var current = this[TIMERS_AGGREGATES_SYMBOL].get(label);
            if (current !== undefined) {
              if (time[1] + current[1] > 1e9) {
                time[0] += current[0] + 1;
                time[1] = time[1] - 1e9 + current[1];
              } else {
                time[0] += current[0];
                time[1] += current[1];
              }
            }
            this[TIMERS_AGGREGATES_SYMBOL].set(label, time);
          }

          /**
           * @param {string=} label label
           */
        }, {
          key: "timeAggregateEnd",
          value: function timeAggregateEnd(label) {
            if (this[TIMERS_AGGREGATES_SYMBOL] === undefined) return;
            var time = this[TIMERS_AGGREGATES_SYMBOL].get(label);
            if (time === undefined) return;
            this[TIMERS_AGGREGATES_SYMBOL].delete(label);
            this[LOG_SYMBOL](LogType.time, [label].concat(_toConsumableArray(time)));
          }
        }]);
      }();
      module.exports.Logger = WebpackLogger;

      /***/
    }),
    /***/"./node_modules/webpack/lib/logging/createConsoleLogger.js": (
    /*!*****************************************************************!*\
      !*** ./node_modules/webpack/lib/logging/createConsoleLogger.js ***!
      \*****************************************************************/
    /***/
    function (module, __unused_webpack_exports, __nested_webpack_require_14223__) {
      /*
      	MIT License http://www.opensource.org/licenses/mit-license.php
      	Author Tobias Koppers @sokra
      */

      function _slicedToArray(r, e) {
        return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
      }
      function _nonIterableRest() {
        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      function _iterableToArrayLimit(r, l) {
        var t = null == r ? null : "undefined" != typeof (typeof Symbol !== "undefined" ? Symbol : function (i) {
          return i;
        }) && r[(typeof Symbol !== "undefined" ? Symbol : function (i) {
          return i;
        }).iterator] || r["@@iterator"];
        if (null != t) {
          var e,
            n,
            i,
            u,
            a = [],
            f = !0,
            o = !1;
          try {
            if (i = (t = t.call(r)).next, 0 === l) {
              if (Object(t) !== t) return;
              f = !1;
            } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
          } catch (r) {
            o = !0, n = r;
          } finally {
            try {
              if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
            } finally {
              if (o) throw n;
            }
          }
          return a;
        }
      }
      function _arrayWithHoles(r) {
        if (Array.isArray(r)) return r;
      }
      function _toConsumableArray(r) {
        return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
      }
      function _nonIterableSpread() {
        throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      function _unsupportedIterableToArray(r, a) {
        if (r) {
          if ("string" == typeof r) return _arrayLikeToArray(r, a);
          var t = {}.toString.call(r).slice(8, -1);
          return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
        }
      }
      function _iterableToArray(r) {
        if ("undefined" != typeof (typeof Symbol !== "undefined" ? Symbol : function (i) {
          return i;
        }) && null != r[(typeof Symbol !== "undefined" ? Symbol : function (i) {
          return i;
        }).iterator] || null != r["@@iterator"]) return Array.from(r);
      }
      function _arrayWithoutHoles(r) {
        if (Array.isArray(r)) return _arrayLikeToArray(r);
      }
      function _arrayLikeToArray(r, a) {
        (null == a || a > r.length) && (a = r.length);
        for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
        return n;
      }
      var _require = __nested_webpack_require_14223__(/*! ./Logger */"./node_modules/webpack/lib/logging/Logger.js"),
        LogType = _require.LogType;

      /** @typedef {import("../../declarations/WebpackOptions").FilterItemTypes} FilterItemTypes */
      /** @typedef {import("../../declarations/WebpackOptions").FilterTypes} FilterTypes */
      /** @typedef {import("./Logger").LogTypeEnum} LogTypeEnum */

      /** @typedef {function(string): boolean} FilterFunction */
      /** @typedef {function(string, LogTypeEnum, any[]=): void} LoggingFunction */

      /**
       * @typedef {object} LoggerConsole
       * @property {function(): void} clear
       * @property {function(): void} trace
       * @property {(...args: any[]) => void} info
       * @property {(...args: any[]) => void} log
       * @property {(...args: any[]) => void} warn
       * @property {(...args: any[]) => void} error
       * @property {(...args: any[]) => void=} debug
       * @property {(...args: any[]) => void=} group
       * @property {(...args: any[]) => void=} groupCollapsed
       * @property {(...args: any[]) => void=} groupEnd
       * @property {(...args: any[]) => void=} status
       * @property {(...args: any[]) => void=} profile
       * @property {(...args: any[]) => void=} profileEnd
       * @property {(...args: any[]) => void=} logTime
       */

      /**
       * @typedef {object} LoggerOptions
       * @property {false|true|"none"|"error"|"warn"|"info"|"log"|"verbose"} level loglevel
       * @property {FilterTypes|boolean} debug filter for debug logging
       * @property {LoggerConsole} console the console to log to
       */

      /**
       * @param {FilterItemTypes} item an input item
       * @returns {FilterFunction | undefined} filter function
       */
      var filterToFunction = function filterToFunction(item) {
        if (typeof item === "string") {
          var regExp = new RegExp("[\\\\/]".concat(item.replace(/[-[\]{}()*+?.\\^$|]/g, "\\$&"), "([\\\\/]|$|!|\\?)"));
          return function (ident) {
            return regExp.test(ident);
          };
        }
        if (item && typeof item === "object" && typeof item.test === "function") {
          return function (ident) {
            return item.test(ident);
          };
        }
        if (typeof item === "function") {
          return item;
        }
        if (typeof item === "boolean") {
          return function () {
            return item;
          };
        }
      };

      /**
       * @enum {number}
       */
      var LogLevel = {
        none: 6,
        false: 6,
        error: 5,
        warn: 4,
        info: 3,
        log: 2,
        true: 2,
        verbose: 1
      };

      /**
       * @param {LoggerOptions} options options object
       * @returns {LoggingFunction} logging function
       */
      module.exports = function (_ref) {
        var _ref$level = _ref.level,
          level = _ref$level === void 0 ? "info" : _ref$level,
          _ref$debug = _ref.debug,
          debug = _ref$debug === void 0 ? false : _ref$debug,
          console = _ref.console;
        var debugFilters = /** @type {FilterFunction[]} */

        typeof debug === "boolean" ? [function () {
          return debug;
        }] : /** @type {FilterItemTypes[]} */[].concat(debug).map(filterToFunction);
        /** @type {number} */
        var loglevel = LogLevel["".concat(level)] || 0;

        /**
         * @param {string} name name of the logger
         * @param {LogTypeEnum} type type of the log entry
         * @param {any[]=} args arguments of the log entry
         * @returns {void}
         */
        var logger = function logger(name, type, args) {
          var labeledArgs = function labeledArgs() {
            if (Array.isArray(args)) {
              if (args.length > 0 && typeof args[0] === "string") {
                return ["[".concat(name, "] ").concat(args[0])].concat(_toConsumableArray(args.slice(1)));
              }
              return ["[".concat(name, "]")].concat(_toConsumableArray(args));
            }
            return [];
          };
          var debug = debugFilters.some(function (f) {
            return f(name);
          });
          switch (type) {
            case LogType.debug:
              if (!debug) return;
              if (typeof console.debug === "function") {
                console.debug.apply(console, _toConsumableArray(labeledArgs()));
              } else {
                console.log.apply(console, _toConsumableArray(labeledArgs()));
              }
              break;
            case LogType.log:
              if (!debug && loglevel > LogLevel.log) return;
              console.log.apply(console, _toConsumableArray(labeledArgs()));
              break;
            case LogType.info:
              if (!debug && loglevel > LogLevel.info) return;
              console.info.apply(console, _toConsumableArray(labeledArgs()));
              break;
            case LogType.warn:
              if (!debug && loglevel > LogLevel.warn) return;
              console.warn.apply(console, _toConsumableArray(labeledArgs()));
              break;
            case LogType.error:
              if (!debug && loglevel > LogLevel.error) return;
              console.error.apply(console, _toConsumableArray(labeledArgs()));
              break;
            case LogType.trace:
              if (!debug) return;
              console.trace();
              break;
            case LogType.groupCollapsed:
              if (!debug && loglevel > LogLevel.log) return;
              if (!debug && loglevel > LogLevel.verbose) {
                if (typeof console.groupCollapsed === "function") {
                  console.groupCollapsed.apply(console, _toConsumableArray(labeledArgs()));
                } else {
                  console.log.apply(console, _toConsumableArray(labeledArgs()));
                }
                break;
              }
            // falls through
            case LogType.group:
              if (!debug && loglevel > LogLevel.log) return;
              if (typeof console.group === "function") {
                console.group.apply(console, _toConsumableArray(labeledArgs()));
              } else {
                console.log.apply(console, _toConsumableArray(labeledArgs()));
              }
              break;
            case LogType.groupEnd:
              if (!debug && loglevel > LogLevel.log) return;
              if (typeof console.groupEnd === "function") {
                console.groupEnd();
              }
              break;
            case LogType.time:
              {
                if (!debug && loglevel > LogLevel.log) return;
                var _args = _slicedToArray(/** @type {[string, number, number]} */
                  args, 3),
                  label = _args[0],
                  start = _args[1],
                  end = _args[2];
                var ms = start * 1000 + end / 1000000;
                var msg = "[".concat(name, "] ").concat(label, ": ").concat(ms, " ms");
                if (typeof console.logTime === "function") {
                  console.logTime(msg);
                } else {
                  console.log(msg);
                }
                break;
              }
            case LogType.profile:
              if (typeof console.profile === "function") {
                console.profile.apply(console, _toConsumableArray(labeledArgs()));
              }
              break;
            case LogType.profileEnd:
              if (typeof console.profileEnd === "function") {
                console.profileEnd.apply(console, _toConsumableArray(labeledArgs()));
              }
              break;
            case LogType.clear:
              if (!debug && loglevel > LogLevel.log) return;
              if (typeof console.clear === "function") {
                console.clear();
              }
              break;
            case LogType.status:
              if (!debug && loglevel > LogLevel.info) return;
              if (typeof console.status === "function") {
                if (!args || args.length === 0) {
                  console.status();
                } else {
                  console.status.apply(console, _toConsumableArray(labeledArgs()));
                }
              } else if (args && args.length !== 0) {
                console.info.apply(console, _toConsumableArray(labeledArgs()));
              }
              break;
            default:
              throw new Error("Unexpected LogType ".concat(type));
          }
        };
        return logger;
      };

      /***/
    }),
    /***/"./node_modules/webpack/lib/logging/runtime.js": (
    /*!*****************************************************!*\
      !*** ./node_modules/webpack/lib/logging/runtime.js ***!
      \*****************************************************/
    /***/
    function (module, __unused_webpack_exports, __nested_webpack_require_26176__) {
      /*
      	MIT License http://www.opensource.org/licenses/mit-license.php
      	Author Tobias Koppers @sokra
      */

      function _extends() {
        return _extends = Object.assign ? Object.assign.bind() : function (n) {
          for (var e = 1; e < arguments.length; e++) {
            var t = arguments[e];
            for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
          }
          return n;
        }, _extends.apply(null, arguments);
      }
      var _require = __nested_webpack_require_26176__(/*! tapable */"./client-src/modules/logger/tapable.js"),
        SyncBailHook = _require.SyncBailHook;
      var _require2 = __nested_webpack_require_26176__(/*! ./Logger */"./node_modules/webpack/lib/logging/Logger.js"),
        Logger = _require2.Logger;
      var createConsoleLogger = __nested_webpack_require_26176__(/*! ./createConsoleLogger */"./node_modules/webpack/lib/logging/createConsoleLogger.js");

      /** @type {createConsoleLogger.LoggerOptions} */
      var currentDefaultLoggerOptions = {
        level: "info",
        debug: false,
        console: console
      };
      var currentDefaultLogger = createConsoleLogger(currentDefaultLoggerOptions);

      /**
       * @param {string} name name of the logger
       * @returns {Logger} a logger
       */
      module.exports.getLogger = function (name) {
        return new Logger(function (type, args) {
          if (module.exports.hooks.log.call(name, type, args) === undefined) {
            currentDefaultLogger(name, type, args);
          }
        }, function (childName) {
          return module.exports.getLogger("".concat(name, "/").concat(childName));
        });
      };

      /**
       * @param {createConsoleLogger.LoggerOptions} options new options, merge with old options
       * @returns {void}
       */
      module.exports.configureDefaultLogger = function (options) {
        _extends(currentDefaultLoggerOptions, options);
        currentDefaultLogger = createConsoleLogger(currentDefaultLoggerOptions);
      };
      module.exports.hooks = {
        log: new SyncBailHook(["origin", "type", "args"])
      };

      /***/
    })

    /******/
  };
  /************************************************************************/
  /******/ // The module cache
  /******/
  var __webpack_module_cache__ = {};
  /******/
  /******/ // The require function
  /******/
  function __nested_webpack_require_28565__(moduleId) {
    /******/ // Check if module is in cache
    /******/var cachedModule = __webpack_module_cache__[moduleId];
    /******/
    if (cachedModule !== undefined) {
      /******/return cachedModule.exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/
    var module = __webpack_module_cache__[moduleId] = {
      /******/ // no module.id needed
      /******/ // no module.loaded needed
      /******/exports: {}
      /******/
    };
    /******/
    /******/ // Execute the module function
    /******/
    __webpack_modules__[moduleId](module, module.exports, __nested_webpack_require_28565__);
    /******/
    /******/ // Return the exports of the module
    /******/
    return module.exports;
    /******/
  }
  /******/
  /************************************************************************/
  /******/ /* webpack/runtime/define property getters */
  /******/
  !function () {
    /******/ // define getter functions for harmony exports
    /******/__nested_webpack_require_28565__.d = function (exports, definition) {
      /******/for (var key in definition) {
        /******/if (__nested_webpack_require_28565__.o(definition, key) && !__nested_webpack_require_28565__.o(exports, key)) {
          /******/Object.defineProperty(exports, key, {
            enumerable: true,
            get: definition[key]
          });
          /******/
        }
        /******/
      }
      /******/
    };
    /******/
  }();
  /******/
  /******/ /* webpack/runtime/hasOwnProperty shorthand */
  /******/
  !function () {
    /******/__nested_webpack_require_28565__.o = function (obj, prop) {
      return Object.prototype.hasOwnProperty.call(obj, prop);
    };
    /******/
  }();
  /******/
  /******/ /* webpack/runtime/make namespace object */
  /******/
  !function () {
    /******/ // define __esModule on exports
    /******/__nested_webpack_require_28565__.r = function (exports) {
      /******/if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
        /******/Object.defineProperty(exports, Symbol.toStringTag, {
          value: 'Module'
        });
        /******/
      }
      /******/
      Object.defineProperty(exports, '__esModule', {
        value: true
      });
      /******/
    };
    /******/
  }();
  /******/
  /************************************************************************/
  var __nested_webpack_exports__ = {};
  /*!********************************************!*\
    !*** ./client-src/modules/logger/index.js ***!
    \********************************************/
  __nested_webpack_require_28565__.r(__nested_webpack_exports__);
  /* harmony export */
  __nested_webpack_require_28565__.d(__nested_webpack_exports__, {
    /* harmony export */"default": function () {
      return /* reexport default export from named module */webpack_lib_logging_runtime_js__WEBPACK_IMPORTED_MODULE_0__;
    }
    /* harmony export */
  });
  /* harmony import */
  var webpack_lib_logging_runtime_js__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_28565__(/*! webpack/lib/logging/runtime.js */"./node_modules/webpack/lib/logging/runtime.js");
  var __webpack_export_target__ = exports;
  for (var i in __nested_webpack_exports__) __webpack_export_target__[i] = __nested_webpack_exports__[i];
  if (__nested_webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", {
    value: true
  });
  /******/
})();

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/overlay.js":
/*!***********************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/overlay.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createOverlay: () => (/* binding */ createOverlay),
/* harmony export */   formatProblem: () => (/* binding */ formatProblem)
/* harmony export */ });
/* harmony import */ var ansi_html_community__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ansi-html-community */ "./node_modules/ansi-html-community/index.js");
/* harmony import */ var ansi_html_community__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ansi_html_community__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var html_entities__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! html-entities */ "./node_modules/html-entities/lib/index.js");
/* harmony import */ var html_entities__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(html_entities__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _overlay_runtime_error_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./overlay/runtime-error.js */ "./node_modules/webpack-dev-server/client/overlay/runtime-error.js");
/* harmony import */ var _overlay_state_machine_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./overlay/state-machine.js */ "./node_modules/webpack-dev-server/client/overlay/state-machine.js");
/* harmony import */ var _overlay_styles_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./overlay/styles.js */ "./node_modules/webpack-dev-server/client/overlay/styles.js");
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
      _defineProperty(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}
function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
// The error overlay is inspired (and mostly copied) from Create React App (https://github.com/facebookincubator/create-react-app)
// They, in turn, got inspired by webpack-hot-middleware (https://github.com/glenjamin/webpack-hot-middleware).






var colors = {
  reset: ["transparent", "transparent"],
  black: "181818",
  red: "E36049",
  green: "B3CB74",
  yellow: "FFD080",
  blue: "7CAFC2",
  magenta: "7FACCA",
  cyan: "C3C2EF",
  lightgrey: "EBE7E3",
  darkgrey: "6D7891"
};
ansi_html_community__WEBPACK_IMPORTED_MODULE_0___default().setColors(colors);

/**
 * @param {string} type
 * @param {string  | { file?: string, moduleName?: string, loc?: string, message?: string; stack?: string[] }} item
 * @returns {{ header: string, body: string }}
 */
function formatProblem(type, item) {
  var header = type === "warning" ? "WARNING" : "ERROR";
  var body = "";
  if (typeof item === "string") {
    body += item;
  } else {
    var file = item.file || "";
    // eslint-disable-next-line no-nested-ternary
    var moduleName = item.moduleName ? item.moduleName.indexOf("!") !== -1 ? "".concat(item.moduleName.replace(/^(\s|\S)*!/, ""), " (").concat(item.moduleName, ")") : "".concat(item.moduleName) : "";
    var loc = item.loc;
    header += "".concat(moduleName || file ? " in ".concat(moduleName ? "".concat(moduleName).concat(file ? " (".concat(file, ")") : "") : file).concat(loc ? " ".concat(loc) : "") : "");
    body += item.message || "";
  }
  if (Array.isArray(item.stack)) {
    item.stack.forEach(function (stack) {
      if (typeof stack === "string") {
        body += "\r\n".concat(stack);
      }
    });
  }
  return {
    header: header,
    body: body
  };
}

/**
 * @typedef {Object} CreateOverlayOptions
 * @property {string | null} trustedTypesPolicyName
 * @property {boolean | (error: Error) => void} [catchRuntimeError]
 */

/**
 *
 * @param {CreateOverlayOptions} options
 */
var createOverlay = function createOverlay(options) {
  /** @type {HTMLIFrameElement | null | undefined} */
  var iframeContainerElement;
  /** @type {HTMLDivElement | null | undefined} */
  var containerElement;
  /** @type {HTMLDivElement | null | undefined} */
  var headerElement;
  /** @type {Array<(element: HTMLDivElement) => void>} */
  var onLoadQueue = [];
  /** @type {TrustedTypePolicy | undefined} */
  var overlayTrustedTypesPolicy;

  /**
   *
   * @param {HTMLElement} element
   * @param {CSSStyleDeclaration} style
   */
  function applyStyle(element, style) {
    Object.keys(style).forEach(function (prop) {
      element.style[prop] = style[prop];
    });
  }

  /**
   * @param {string | null} trustedTypesPolicyName
   */
  function createContainer(trustedTypesPolicyName) {
    // Enable Trusted Types if they are available in the current browser.
    if (window.trustedTypes) {
      overlayTrustedTypesPolicy = window.trustedTypes.createPolicy(trustedTypesPolicyName || "webpack-dev-server#overlay", {
        createHTML: function createHTML(value) {
          return value;
        }
      });
    }
    iframeContainerElement = document.createElement("iframe");
    iframeContainerElement.id = "webpack-dev-server-client-overlay";
    iframeContainerElement.src = "about:blank";
    applyStyle(iframeContainerElement, _overlay_styles_js__WEBPACK_IMPORTED_MODULE_3__.iframeStyle);
    iframeContainerElement.onload = function () {
      var contentElement = /** @type {Document} */
      (/** @type {HTMLIFrameElement} */
      iframeContainerElement.contentDocument).createElement("div");
      containerElement = /** @type {Document} */
      (/** @type {HTMLIFrameElement} */
      iframeContainerElement.contentDocument).createElement("div");
      contentElement.id = "webpack-dev-server-client-overlay-div";
      applyStyle(contentElement, _overlay_styles_js__WEBPACK_IMPORTED_MODULE_3__.containerStyle);
      headerElement = document.createElement("div");
      headerElement.innerText = "Compiled with problems:";
      applyStyle(headerElement, _overlay_styles_js__WEBPACK_IMPORTED_MODULE_3__.headerStyle);
      var closeButtonElement = document.createElement("button");
      applyStyle(closeButtonElement, _overlay_styles_js__WEBPACK_IMPORTED_MODULE_3__.dismissButtonStyle);
      closeButtonElement.innerText = "×";
      closeButtonElement.ariaLabel = "Dismiss";
      closeButtonElement.addEventListener("click", function () {
        // eslint-disable-next-line no-use-before-define
        overlayService.send({
          type: "DISMISS"
        });
      });
      contentElement.appendChild(headerElement);
      contentElement.appendChild(closeButtonElement);
      contentElement.appendChild(containerElement);

      /** @type {Document} */
      (/** @type {HTMLIFrameElement} */
      iframeContainerElement.contentDocument).body.appendChild(contentElement);
      onLoadQueue.forEach(function (onLoad) {
        onLoad(/** @type {HTMLDivElement} */contentElement);
      });
      onLoadQueue = [];

      /** @type {HTMLIFrameElement} */
      iframeContainerElement.onload = null;
    };
    document.body.appendChild(iframeContainerElement);
  }

  /**
   * @param {(element: HTMLDivElement) => void} callback
   * @param {string | null} trustedTypesPolicyName
   */
  function ensureOverlayExists(callback, trustedTypesPolicyName) {
    if (containerElement) {
      containerElement.innerHTML = overlayTrustedTypesPolicy ? overlayTrustedTypesPolicy.createHTML("") : "";
      // Everything is ready, call the callback right away.
      callback(containerElement);
      return;
    }
    onLoadQueue.push(callback);
    if (iframeContainerElement) {
      return;
    }
    createContainer(trustedTypesPolicyName);
  }

  // Successful compilation.
  function hide() {
    if (!iframeContainerElement) {
      return;
    }

    // Clean up and reset internal state.
    document.body.removeChild(iframeContainerElement);
    iframeContainerElement = null;
    containerElement = null;
  }

  // Compilation with errors (e.g. syntax error or missing modules).
  /**
   * @param {string} type
   * @param {Array<string  | { moduleIdentifier?: string, moduleName?: string, loc?: string, message?: string }>} messages
   * @param {string | null} trustedTypesPolicyName
   * @param {'build' | 'runtime'} messageSource
   */
  function show(type, messages, trustedTypesPolicyName, messageSource) {
    ensureOverlayExists(function () {
      headerElement.innerText = messageSource === "runtime" ? "Uncaught runtime errors:" : "Compiled with problems:";
      messages.forEach(function (message) {
        var entryElement = document.createElement("div");
        var msgStyle = type === "warning" ? _overlay_styles_js__WEBPACK_IMPORTED_MODULE_3__.msgStyles.warning : _overlay_styles_js__WEBPACK_IMPORTED_MODULE_3__.msgStyles.error;
        applyStyle(entryElement, _objectSpread(_objectSpread({}, msgStyle), {}, {
          padding: "1rem 1rem 1.5rem 1rem"
        }));
        var typeElement = document.createElement("div");
        var _formatProblem = formatProblem(type, message),
          header = _formatProblem.header,
          body = _formatProblem.body;
        typeElement.innerText = header;
        applyStyle(typeElement, _overlay_styles_js__WEBPACK_IMPORTED_MODULE_3__.msgTypeStyle);
        if (message.moduleIdentifier) {
          applyStyle(typeElement, {
            cursor: "pointer"
          });
          // element.dataset not supported in IE
          typeElement.setAttribute("data-can-open", true);
          typeElement.addEventListener("click", function () {
            fetch("/webpack-dev-server/open-editor?fileName=".concat(message.moduleIdentifier));
          });
        }

        // Make it look similar to our terminal.
        var text = ansi_html_community__WEBPACK_IMPORTED_MODULE_0___default()((0,html_entities__WEBPACK_IMPORTED_MODULE_4__.encode)(body));
        var messageTextNode = document.createElement("div");
        applyStyle(messageTextNode, _overlay_styles_js__WEBPACK_IMPORTED_MODULE_3__.msgTextStyle);
        messageTextNode.innerHTML = overlayTrustedTypesPolicy ? overlayTrustedTypesPolicy.createHTML(text) : text;
        entryElement.appendChild(typeElement);
        entryElement.appendChild(messageTextNode);

        /** @type {HTMLDivElement} */
        containerElement.appendChild(entryElement);
      });
    }, trustedTypesPolicyName);
  }
  var overlayService = (0,_overlay_state_machine_js__WEBPACK_IMPORTED_MODULE_2__["default"])({
    showOverlay: function showOverlay(_ref) {
      var _ref$level = _ref.level,
        level = _ref$level === void 0 ? "error" : _ref$level,
        messages = _ref.messages,
        messageSource = _ref.messageSource;
      return show(level, messages, options.trustedTypesPolicyName, messageSource);
    },
    hideOverlay: hide
  });
  if (options.catchRuntimeError) {
    /**
     * @param {Error | undefined} error
     * @param {string} fallbackMessage
     */
    var handleError = function handleError(error, fallbackMessage) {
      var errorObject = error instanceof Error ? error : new Error(error || fallbackMessage);
      var shouldDisplay = typeof options.catchRuntimeError === "function" ? options.catchRuntimeError(errorObject) : true;
      if (shouldDisplay) {
        overlayService.send({
          type: "RUNTIME_ERROR",
          messages: [{
            message: errorObject.message,
            stack: (0,_overlay_runtime_error_js__WEBPACK_IMPORTED_MODULE_1__.parseErrorToStacks)(errorObject)
          }]
        });
      }
    };
    (0,_overlay_runtime_error_js__WEBPACK_IMPORTED_MODULE_1__.listenToRuntimeError)(function (errorEvent) {
      // error property may be empty in older browser like IE
      var error = errorEvent.error,
        message = errorEvent.message;
      if (!error && !message) {
        return;
      }
      handleError(error, message);
    });
    (0,_overlay_runtime_error_js__WEBPACK_IMPORTED_MODULE_1__.listenToUnhandledRejection)(function (promiseRejectionEvent) {
      var reason = promiseRejectionEvent.reason;
      handleError(reason, "Unknown promise rejection reason");
    });
  }
  return overlayService;
};


/***/ }),

/***/ "./node_modules/webpack-dev-server/client/overlay/fsm.js":
/*!***************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/overlay/fsm.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
      _defineProperty(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}
function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
/**
 * @typedef {Object} StateDefinitions
 * @property {{[event: string]: { target: string; actions?: Array<string> }}} [on]
 */

/**
 * @typedef {Object} Options
 * @property {{[state: string]: StateDefinitions}} states
 * @property {object} context;
 * @property {string} initial
 */

/**
 * @typedef {Object} Implementation
 * @property {{[actionName: string]: (ctx: object, event: any) => object}} actions
 */

/**
 * A simplified `createMachine` from `@xstate/fsm` with the following differences:
 *
 *  - the returned machine is technically a "service". No `interpret(machine).start()` is needed.
 *  - the state definition only support `on` and target must be declared with { target: 'nextState', actions: [] } explicitly.
 *  - event passed to `send` must be an object with `type` property.
 *  - actions implementation will be [assign action](https://xstate.js.org/docs/guides/context.html#assign-action) if you return any value.
 *  Do not return anything if you just want to invoke side effect.
 *
 * The goal of this custom function is to avoid installing the entire `'xstate/fsm'` package, while enabling modeling using
 * state machine. You can copy the first parameter into the editor at https://stately.ai/viz to visualize the state machine.
 *
 * @param {Options} options
 * @param {Implementation} implementation
 */
function createMachine(_ref, _ref2) {
  var states = _ref.states,
    context = _ref.context,
    initial = _ref.initial;
  var actions = _ref2.actions;
  var currentState = initial;
  var currentContext = context;
  return {
    send: function send(event) {
      var currentStateOn = states[currentState].on;
      var transitionConfig = currentStateOn && currentStateOn[event.type];
      if (transitionConfig) {
        currentState = transitionConfig.target;
        if (transitionConfig.actions) {
          transitionConfig.actions.forEach(function (actName) {
            var actionImpl = actions[actName];
            var nextContextValue = actionImpl && actionImpl(currentContext, event);
            if (nextContextValue) {
              currentContext = _objectSpread(_objectSpread({}, currentContext), nextContextValue);
            }
          });
        }
      }
    }
  };
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createMachine);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/overlay/runtime-error.js":
/*!*************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/overlay/runtime-error.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   listenToRuntimeError: () => (/* binding */ listenToRuntimeError),
/* harmony export */   listenToUnhandledRejection: () => (/* binding */ listenToUnhandledRejection),
/* harmony export */   parseErrorToStacks: () => (/* binding */ parseErrorToStacks)
/* harmony export */ });
/**
 *
 * @param {Error} error
 */
function parseErrorToStacks(error) {
  if (!error || !(error instanceof Error)) {
    throw new Error("parseErrorToStacks expects Error object");
  }
  if (typeof error.stack === "string") {
    return error.stack.split("\n").filter(function (stack) {
      return stack !== "Error: ".concat(error.message);
    });
  }
}

/**
 * @callback ErrorCallback
 * @param {ErrorEvent} error
 * @returns {void}
 */

/**
 * @param {ErrorCallback} callback
 */
function listenToRuntimeError(callback) {
  window.addEventListener("error", callback);
  return function cleanup() {
    window.removeEventListener("error", callback);
  };
}

/**
 * @callback UnhandledRejectionCallback
 * @param {PromiseRejectionEvent} rejectionEvent
 * @returns {void}
 */

/**
 * @param {UnhandledRejectionCallback} callback
 */
function listenToUnhandledRejection(callback) {
  window.addEventListener("unhandledrejection", callback);
  return function cleanup() {
    window.removeEventListener("unhandledrejection", callback);
  };
}


/***/ }),

/***/ "./node_modules/webpack-dev-server/client/overlay/state-machine.js":
/*!*************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/overlay/state-machine.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _fsm_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fsm.js */ "./node_modules/webpack-dev-server/client/overlay/fsm.js");


/**
 * @typedef {Object} ShowOverlayData
 * @property {'warning' | 'error'} level
 * @property {Array<string  | { moduleIdentifier?: string, moduleName?: string, loc?: string, message?: string }>} messages
 * @property {'build' | 'runtime'} messageSource
 */

/**
 * @typedef {Object} CreateOverlayMachineOptions
 * @property {(data: ShowOverlayData) => void} showOverlay
 * @property {() => void} hideOverlay
 */

/**
 * @param {CreateOverlayMachineOptions} options
 */
var createOverlayMachine = function createOverlayMachine(options) {
  var hideOverlay = options.hideOverlay,
    showOverlay = options.showOverlay;
  var overlayMachine = (0,_fsm_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
    initial: "hidden",
    context: {
      level: "error",
      messages: [],
      messageSource: "build"
    },
    states: {
      hidden: {
        on: {
          BUILD_ERROR: {
            target: "displayBuildError",
            actions: ["setMessages", "showOverlay"]
          },
          RUNTIME_ERROR: {
            target: "displayRuntimeError",
            actions: ["setMessages", "showOverlay"]
          }
        }
      },
      displayBuildError: {
        on: {
          DISMISS: {
            target: "hidden",
            actions: ["dismissMessages", "hideOverlay"]
          },
          BUILD_ERROR: {
            target: "displayBuildError",
            actions: ["appendMessages", "showOverlay"]
          }
        }
      },
      displayRuntimeError: {
        on: {
          DISMISS: {
            target: "hidden",
            actions: ["dismissMessages", "hideOverlay"]
          },
          RUNTIME_ERROR: {
            target: "displayRuntimeError",
            actions: ["appendMessages", "showOverlay"]
          },
          BUILD_ERROR: {
            target: "displayBuildError",
            actions: ["setMessages", "showOverlay"]
          }
        }
      }
    }
  }, {
    actions: {
      dismissMessages: function dismissMessages() {
        return {
          messages: [],
          level: "error",
          messageSource: "build"
        };
      },
      appendMessages: function appendMessages(context, event) {
        return {
          messages: context.messages.concat(event.messages),
          level: event.level || context.level,
          messageSource: event.type === "RUNTIME_ERROR" ? "runtime" : "build"
        };
      },
      setMessages: function setMessages(context, event) {
        return {
          messages: event.messages,
          level: event.level || context.level,
          messageSource: event.type === "RUNTIME_ERROR" ? "runtime" : "build"
        };
      },
      hideOverlay: hideOverlay,
      showOverlay: showOverlay
    }
  });
  return overlayMachine;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createOverlayMachine);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/overlay/styles.js":
/*!******************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/overlay/styles.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   containerStyle: () => (/* binding */ containerStyle),
/* harmony export */   dismissButtonStyle: () => (/* binding */ dismissButtonStyle),
/* harmony export */   headerStyle: () => (/* binding */ headerStyle),
/* harmony export */   iframeStyle: () => (/* binding */ iframeStyle),
/* harmony export */   msgStyles: () => (/* binding */ msgStyles),
/* harmony export */   msgTextStyle: () => (/* binding */ msgTextStyle),
/* harmony export */   msgTypeStyle: () => (/* binding */ msgTypeStyle)
/* harmony export */ });
// styles are inspired by `react-error-overlay`

var msgStyles = {
  error: {
    backgroundColor: "rgba(206, 17, 38, 0.1)",
    color: "#fccfcf"
  },
  warning: {
    backgroundColor: "rgba(251, 245, 180, 0.1)",
    color: "#fbf5b4"
  }
};
var iframeStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: "100vw",
  height: "100vh",
  border: "none",
  "z-index": 9999999999
};
var containerStyle = {
  position: "fixed",
  boxSizing: "border-box",
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
  width: "100vw",
  height: "100vh",
  fontSize: "large",
  padding: "2rem 2rem 4rem 2rem",
  lineHeight: "1.2",
  whiteSpace: "pre-wrap",
  overflow: "auto",
  backgroundColor: "rgba(0, 0, 0, 0.9)",
  color: "white"
};
var headerStyle = {
  color: "#e83b46",
  fontSize: "2em",
  whiteSpace: "pre-wrap",
  fontFamily: "sans-serif",
  margin: "0 2rem 2rem 0",
  flex: "0 0 auto",
  maxHeight: "50%",
  overflow: "auto"
};
var dismissButtonStyle = {
  color: "#ffffff",
  lineHeight: "1rem",
  fontSize: "1.5rem",
  padding: "1rem",
  cursor: "pointer",
  position: "absolute",
  right: 0,
  top: 0,
  backgroundColor: "transparent",
  border: "none"
};
var msgTypeStyle = {
  color: "#e83b46",
  fontSize: "1.2em",
  marginBottom: "1rem",
  fontFamily: "sans-serif"
};
var msgTextStyle = {
  lineHeight: "1.5",
  fontSize: "1rem",
  fontFamily: "Menlo, Consolas, monospace"
};


/***/ }),

/***/ "./node_modules/webpack-dev-server/client/progress.js":
/*!************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/progress.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   defineProgressElement: () => (/* binding */ defineProgressElement),
/* harmony export */   isProgressSupported: () => (/* binding */ isProgressSupported)
/* harmony export */ });
function _classCallCheck(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
  }
}
function _createClass(e, r, t) {
  return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _callSuper(t, o, e) {
  return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
}
function _possibleConstructorReturn(t, e) {
  if (e && ("object" == typeof e || "function" == typeof e)) return e;
  if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
  return _assertThisInitialized(t);
}
function _assertThisInitialized(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function _inherits(t, e) {
  if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(t, "prototype", {
    writable: !1
  }), e && _setPrototypeOf(t, e);
}
function _wrapNativeSuper(t) {
  var r = "function" == typeof Map ? new Map() : void 0;
  return _wrapNativeSuper = function _wrapNativeSuper(t) {
    if (null === t || !_isNativeFunction(t)) return t;
    if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function");
    if (void 0 !== r) {
      if (r.has(t)) return r.get(t);
      r.set(t, Wrapper);
    }
    function Wrapper() {
      return _construct(t, arguments, _getPrototypeOf(this).constructor);
    }
    return Wrapper.prototype = Object.create(t.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: !1,
        writable: !0,
        configurable: !0
      }
    }), _setPrototypeOf(Wrapper, t);
  }, _wrapNativeSuper(t);
}
function _construct(t, e, r) {
  if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments);
  var o = [null];
  o.push.apply(o, e);
  var p = new (t.bind.apply(t, o))();
  return r && _setPrototypeOf(p, r.prototype), p;
}
function _isNativeReflectConstruct() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
  } catch (t) {}
  return (_isNativeReflectConstruct = function _isNativeReflectConstruct() {
    return !!t;
  })();
}
function _isNativeFunction(t) {
  try {
    return -1 !== Function.toString.call(t).indexOf("[native code]");
  } catch (n) {
    return "function" == typeof t;
  }
}
function _setPrototypeOf(t, e) {
  return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
    return t.__proto__ = e, t;
  }, _setPrototypeOf(t, e);
}
function _getPrototypeOf(t) {
  return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
    return t.__proto__ || Object.getPrototypeOf(t);
  }, _getPrototypeOf(t);
}
function _classPrivateMethodInitSpec(e, a) {
  _checkPrivateRedeclaration(e, a), a.add(e);
}
function _checkPrivateRedeclaration(e, t) {
  if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object");
}
function _assertClassBrand(e, t, n) {
  if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
  throw new TypeError("Private element is not present on this object");
}
function isProgressSupported() {
  return "customElements" in self && !!HTMLElement.prototype.attachShadow;
}
function defineProgressElement() {
  var _WebpackDevServerProgress;
  if (customElements.get("wds-progress")) {
    return;
  }
  var _WebpackDevServerProgress_brand = /*#__PURE__*/new WeakSet();
  var WebpackDevServerProgress = /*#__PURE__*/function (_HTMLElement) {
    function WebpackDevServerProgress() {
      var _this;
      _classCallCheck(this, WebpackDevServerProgress);
      _this = _callSuper(this, WebpackDevServerProgress);
      _classPrivateMethodInitSpec(_this, _WebpackDevServerProgress_brand);
      _this.attachShadow({
        mode: "open"
      });
      _this.maxDashOffset = -219.99078369140625;
      _this.animationTimer = null;
      return _this;
    }
    _inherits(WebpackDevServerProgress, _HTMLElement);
    return _createClass(WebpackDevServerProgress, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        _assertClassBrand(_WebpackDevServerProgress_brand, this, _reset).call(this);
      }
    }, {
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(name, oldValue, newValue) {
        if (name === "progress") {
          _assertClassBrand(_WebpackDevServerProgress_brand, this, _update).call(this, Number(newValue));
        } else if (name === "type") {
          _assertClassBrand(_WebpackDevServerProgress_brand, this, _reset).call(this);
        }
      }
    }], [{
      key: "observedAttributes",
      get: function get() {
        return ["progress", "type"];
      }
    }]);
  }(/*#__PURE__*/_wrapNativeSuper(HTMLElement));
  _WebpackDevServerProgress = WebpackDevServerProgress;
  function _reset() {
    var _this$getAttribute, _Number;
    clearTimeout(this.animationTimer);
    this.animationTimer = null;
    var typeAttr = (_this$getAttribute = this.getAttribute("type")) === null || _this$getAttribute === void 0 ? void 0 : _this$getAttribute.toLowerCase();
    this.type = typeAttr === "circular" ? "circular" : "linear";
    var innerHTML = this.type === "circular" ? _circularTemplate.call(_WebpackDevServerProgress) : _linearTemplate.call(_WebpackDevServerProgress);
    this.shadowRoot.innerHTML = innerHTML;
    this.initialProgress = (_Number = Number(this.getAttribute("progress"))) !== null && _Number !== void 0 ? _Number : 0;
    _assertClassBrand(_WebpackDevServerProgress_brand, this, _update).call(this, this.initialProgress);
  }
  function _circularTemplate() {
    return "\n        <style>\n        :host {\n            width: 200px;\n            height: 200px;\n            position: fixed;\n            right: 5%;\n            top: 5%;\n            transition: opacity .25s ease-in-out;\n            z-index: 2147483645;\n        }\n\n        circle {\n            fill: #282d35;\n        }\n\n        path {\n            fill: rgba(0, 0, 0, 0);\n            stroke: rgb(186, 223, 172);\n            stroke-dasharray: 219.99078369140625;\n            stroke-dashoffset: -219.99078369140625;\n            stroke-width: 10;\n            transform: rotate(90deg) translate(0px, -80px);\n        }\n\n        text {\n            font-family: 'Open Sans', sans-serif;\n            font-size: 18px;\n            fill: #ffffff;\n            dominant-baseline: middle;\n            text-anchor: middle;\n        }\n\n        tspan#percent-super {\n            fill: #bdc3c7;\n            font-size: 0.45em;\n            baseline-shift: 10%;\n        }\n\n        @keyframes fade {\n            0% { opacity: 1; transform: scale(1); }\n            100% { opacity: 0; transform: scale(0); }\n        }\n\n        .disappear {\n            animation: fade 0.3s;\n            animation-fill-mode: forwards;\n            animation-delay: 0.5s;\n        }\n\n        .hidden {\n            display: none;\n        }\n        </style>\n        <svg id=\"progress\" class=\"hidden noselect\" viewBox=\"0 0 80 80\">\n        <circle cx=\"50%\" cy=\"50%\" r=\"35\"></circle>\n        <path d=\"M5,40a35,35 0 1,0 70,0a35,35 0 1,0 -70,0\"></path>\n        <text x=\"50%\" y=\"51%\">\n            <tspan id=\"percent-value\">0</tspan>\n            <tspan id=\"percent-super\">%</tspan>\n        </text>\n        </svg>\n      ";
  }
  function _linearTemplate() {
    return "\n        <style>\n        :host {\n            position: fixed;\n            top: 0;\n            left: 0;\n            height: 4px;\n            width: 100vw;\n            z-index: 2147483645;\n        }\n\n        #bar {\n            width: 0%;\n            height: 4px;\n            background-color: rgb(186, 223, 172);\n        }\n\n        @keyframes fade {\n            0% { opacity: 1; }\n            100% { opacity: 0; }\n        }\n\n        .disappear {\n            animation: fade 0.3s;\n            animation-fill-mode: forwards;\n            animation-delay: 0.5s;\n        }\n\n        .hidden {\n            display: none;\n        }\n        </style>\n        <div id=\"progress\"></div>\n        ";
  }
  function _update(percent) {
    var element = this.shadowRoot.querySelector("#progress");
    if (this.type === "circular") {
      var path = this.shadowRoot.querySelector("path");
      var value = this.shadowRoot.querySelector("#percent-value");
      var offset = (100 - percent) / 100 * this.maxDashOffset;
      path.style.strokeDashoffset = offset;
      value.textContent = percent;
    } else {
      element.style.width = "".concat(percent, "%");
    }
    if (percent >= 100) {
      _assertClassBrand(_WebpackDevServerProgress_brand, this, _hide).call(this);
    } else if (percent > 0) {
      _assertClassBrand(_WebpackDevServerProgress_brand, this, _show).call(this);
    }
  }
  function _show() {
    var element = this.shadowRoot.querySelector("#progress");
    element.classList.remove("hidden");
  }
  function _hide() {
    var _this2 = this;
    var element = this.shadowRoot.querySelector("#progress");
    if (this.type === "circular") {
      element.classList.add("disappear");
      element.addEventListener("animationend", function () {
        element.classList.add("hidden");
        _assertClassBrand(_WebpackDevServerProgress_brand, _this2, _update).call(_this2, 0);
      }, {
        once: true
      });
    } else if (this.type === "linear") {
      element.classList.add("disappear");
      this.animationTimer = setTimeout(function () {
        element.classList.remove("disappear");
        element.classList.add("hidden");
        element.style.width = "0%";
        _this2.animationTimer = null;
      }, 800);
    }
  }
  customElements.define("wds-progress", WebpackDevServerProgress);
}

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/socket.js":
/*!**********************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/socket.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   client: () => (/* binding */ client),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _clients_WebSocketClient_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./clients/WebSocketClient.js */ "./node_modules/webpack-dev-server/client/clients/WebSocketClient.js");
/* harmony import */ var _utils_log_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/log.js */ "./node_modules/webpack-dev-server/client/utils/log.js");
/* provided dependency */ var __webpack_dev_server_client__ = __webpack_require__(/*! ./node_modules/webpack-dev-server/client/clients/WebSocketClient.js */ "./node_modules/webpack-dev-server/client/clients/WebSocketClient.js");
/* global __webpack_dev_server_client__ */




// this WebsocketClient is here as a default fallback, in case the client is not injected
/* eslint-disable camelcase */
var Client =
// eslint-disable-next-line no-nested-ternary
typeof __webpack_dev_server_client__ !== "undefined" ? typeof __webpack_dev_server_client__.default !== "undefined" ? __webpack_dev_server_client__.default : __webpack_dev_server_client__ : _clients_WebSocketClient_js__WEBPACK_IMPORTED_MODULE_0__["default"];
/* eslint-enable camelcase */

var retries = 0;
var maxRetries = 10;

// Initialized client is exported so external consumers can utilize the same instance
// It is mutable to enforce singleton
// eslint-disable-next-line import/no-mutable-exports
var client = null;

/**
 * @param {string} url
 * @param {{ [handler: string]: (data?: any, params?: any) => any }} handlers
 * @param {number} [reconnect]
 */
var socket = function initSocket(url, handlers, reconnect) {
  client = new Client(url);
  client.onOpen(function () {
    retries = 0;
    if (typeof reconnect !== "undefined") {
      maxRetries = reconnect;
    }
  });
  client.onClose(function () {
    if (retries === 0) {
      handlers.close();
    }

    // Try to reconnect.
    client = null;

    // After 10 retries stop trying, to prevent logspam.
    if (retries < maxRetries) {
      // Exponentially increase timeout to reconnect.
      // Respectfully copied from the package `got`.
      // eslint-disable-next-line no-restricted-properties
      var retryInMs = 1000 * Math.pow(2, retries) + Math.random() * 100;
      retries += 1;
      _utils_log_js__WEBPACK_IMPORTED_MODULE_1__.log.info("Trying to reconnect...");
      setTimeout(function () {
        socket(url, handlers, reconnect);
      }, retryInMs);
    }
  });
  client.onMessage(
  /**
   * @param {any} data
   */
  function (data) {
    var message = JSON.parse(data);
    if (handlers[message.type]) {
      handlers[message.type](message.data, message.params);
    }
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (socket);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/createSocketURL.js":
/*!*************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/createSocketURL.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * @param {{ protocol?: string, auth?: string, hostname?: string, port?: string, pathname?: string, search?: string, hash?: string, slashes?: boolean }} objURL
 * @returns {string}
 */
function format(objURL) {
  var protocol = objURL.protocol || "";
  if (protocol && protocol.substr(-1) !== ":") {
    protocol += ":";
  }
  var auth = objURL.auth || "";
  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ":");
    auth += "@";
  }
  var host = "";
  if (objURL.hostname) {
    host = auth + (objURL.hostname.indexOf(":") === -1 ? objURL.hostname : "[".concat(objURL.hostname, "]"));
    if (objURL.port) {
      host += ":".concat(objURL.port);
    }
  }
  var pathname = objURL.pathname || "";
  if (objURL.slashes) {
    host = "//".concat(host || "");
    if (pathname && pathname.charAt(0) !== "/") {
      pathname = "/".concat(pathname);
    }
  } else if (!host) {
    host = "";
  }
  var search = objURL.search || "";
  if (search && search.charAt(0) !== "?") {
    search = "?".concat(search);
  }
  var hash = objURL.hash || "";
  if (hash && hash.charAt(0) !== "#") {
    hash = "#".concat(hash);
  }
  pathname = pathname.replace(/[?#]/g,
  /**
   * @param {string} match
   * @returns {string}
   */
  function (match) {
    return encodeURIComponent(match);
  });
  search = search.replace("#", "%23");
  return "".concat(protocol).concat(host).concat(pathname).concat(search).concat(hash);
}

/**
 * @param {URL & { fromCurrentScript?: boolean }} parsedURL
 * @returns {string}
 */
function createSocketURL(parsedURL) {
  var hostname = parsedURL.hostname;

  // Node.js module parses it as `::`
  // `new URL(urlString, [baseURLString])` parses it as '[::]'
  var isInAddrAny = hostname === "0.0.0.0" || hostname === "::" || hostname === "[::]";

  // why do we need this check?
  // hostname n/a for file protocol (example, when using electron, ionic)
  // see: https://github.com/webpack/webpack-dev-server/pull/384
  if (isInAddrAny && self.location.hostname && self.location.protocol.indexOf("http") === 0) {
    hostname = self.location.hostname;
  }
  var socketURLProtocol = parsedURL.protocol || self.location.protocol;

  // When https is used in the app, secure web sockets are always necessary because the browser doesn't accept non-secure web sockets.
  if (socketURLProtocol === "auto:" || hostname && isInAddrAny && self.location.protocol === "https:") {
    socketURLProtocol = self.location.protocol;
  }
  socketURLProtocol = socketURLProtocol.replace(/^(?:http|.+-extension|file)/i, "ws");
  var socketURLAuth = "";

  // `new URL(urlString, [baseURLstring])` doesn't have `auth` property
  // Parse authentication credentials in case we need them
  if (parsedURL.username) {
    socketURLAuth = parsedURL.username;

    // Since HTTP basic authentication does not allow empty username,
    // we only include password if the username is not empty.
    if (parsedURL.password) {
      // Result: <username>:<password>
      socketURLAuth = socketURLAuth.concat(":", parsedURL.password);
    }
  }

  // In case the host is a raw IPv6 address, it can be enclosed in
  // the brackets as the brackets are needed in the final URL string.
  // Need to remove those as url.format blindly adds its own set of brackets
  // if the host string contains colons. That would lead to non-working
  // double brackets (e.g. [[::]]) host
  //
  // All of these web socket url params are optionally passed in through resourceQuery,
  // so we need to fall back to the default if they are not provided
  var socketURLHostname = (hostname || self.location.hostname || "localhost").replace(/^\[(.*)\]$/, "$1");
  var socketURLPort = parsedURL.port;
  if (!socketURLPort || socketURLPort === "0") {
    socketURLPort = self.location.port;
  }

  // If path is provided it'll be passed in via the resourceQuery as a
  // query param so it has to be parsed out of the querystring in order for the
  // client to open the socket to the correct location.
  var socketURLPathname = "/ws";
  if (parsedURL.pathname && !parsedURL.fromCurrentScript) {
    socketURLPathname = parsedURL.pathname;
  }
  return format({
    protocol: socketURLProtocol,
    auth: socketURLAuth,
    hostname: socketURLHostname,
    port: socketURLPort,
    pathname: socketURLPathname,
    slashes: true
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createSocketURL);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/getCurrentScriptSource.js":
/*!********************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/getCurrentScriptSource.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * @returns {string}
 */
function getCurrentScriptSource() {
  // `document.currentScript` is the most accurate way to find the current script,
  // but is not supported in all browsers.
  if (document.currentScript) {
    return document.currentScript.getAttribute("src");
  }

  // Fallback to getting all scripts running in the document.
  var scriptElements = document.scripts || [];
  var scriptElementsWithSrc = Array.prototype.filter.call(scriptElements, function (element) {
    return element.getAttribute("src");
  });
  if (scriptElementsWithSrc.length > 0) {
    var currentScript = scriptElementsWithSrc[scriptElementsWithSrc.length - 1];
    return currentScript.getAttribute("src");
  }

  // Fail as there was no script to use.
  throw new Error("[webpack-dev-server] Failed to get current script source.");
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getCurrentScriptSource);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/log.js":
/*!*************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/log.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   log: () => (/* binding */ log),
/* harmony export */   logEnabledFeatures: () => (/* binding */ logEnabledFeatures),
/* harmony export */   setLogLevel: () => (/* binding */ setLogLevel)
/* harmony export */ });
/* harmony import */ var _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/logger/index.js */ "./node_modules/webpack-dev-server/client/modules/logger/index.js");
/* harmony import */ var _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0__);

var name = "webpack-dev-server";
// default level is set on the client side, so it does not need
// to be set by the CLI or API
var defaultLevel = "info";

// options new options, merge with old options
/**
 * @param {false | true | "none" | "error" | "warn" | "info" | "log" | "verbose"} level
 * @returns {void}
 */
function setLogLevel(level) {
  _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0___default().configureDefaultLogger({
    level: level
  });
}
setLogLevel(defaultLevel);
var log = _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0___default().getLogger(name);
var logEnabledFeatures = function logEnabledFeatures(features) {
  var enabledFeatures = Object.keys(features);
  if (!features || enabledFeatures.length === 0) {
    return;
  }
  var logString = "Server started:";

  // Server started: Hot Module Replacement enabled, Live Reloading enabled, Overlay disabled.
  for (var i = 0; i < enabledFeatures.length; i++) {
    var key = enabledFeatures[i];
    logString += " ".concat(key, " ").concat(features[key] ? "enabled" : "disabled", ",");
  }
  // replace last comma with a period
  logString = logString.slice(0, -1).concat(".");
  log.info(logString);
};


/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/parseURL.js":
/*!******************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/parseURL.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _getCurrentScriptSource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getCurrentScriptSource.js */ "./node_modules/webpack-dev-server/client/utils/getCurrentScriptSource.js");


/**
 * @param {string} resourceQuery
 * @returns {{ [key: string]: string | boolean }}
 */
function parseURL(resourceQuery) {
  /** @type {{ [key: string]: string }} */
  var options = {};
  if (typeof resourceQuery === "string" && resourceQuery !== "") {
    var searchParams = resourceQuery.slice(1).split("&");
    for (var i = 0; i < searchParams.length; i++) {
      var pair = searchParams[i].split("=");
      options[pair[0]] = decodeURIComponent(pair[1]);
    }
  } else {
    // Else, get the url from the <script> this file was called with.
    var scriptSource = (0,_getCurrentScriptSource_js__WEBPACK_IMPORTED_MODULE_0__["default"])();
    var scriptSourceURL;
    try {
      // The placeholder `baseURL` with `window.location.href`,
      // is to allow parsing of path-relative or protocol-relative URLs,
      // and will have no effect if `scriptSource` is a fully valid URL.
      scriptSourceURL = new URL(scriptSource, self.location.href);
    } catch (error) {
      // URL parsing failed, do nothing.
      // We will still proceed to see if we can recover using `resourceQuery`
    }
    if (scriptSourceURL) {
      options = scriptSourceURL;
      options.fromCurrentScript = true;
    }
  }
  return options;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (parseURL);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/reloadApp.js":
/*!*******************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/reloadApp.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webpack/hot/emitter.js */ "./node_modules/webpack/hot/emitter.js");
/* harmony import */ var webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _log_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./log.js */ "./node_modules/webpack-dev-server/client/utils/log.js");



/** @typedef {import("../index").Options} Options
/** @typedef {import("../index").Status} Status

/**
 * @param {Options} options
 * @param {Status} status
 */
function reloadApp(_ref, status) {
  var hot = _ref.hot,
    liveReload = _ref.liveReload;
  if (status.isUnloading) {
    return;
  }
  var currentHash = status.currentHash,
    previousHash = status.previousHash;
  var isInitial = currentHash.indexOf(/** @type {string} */previousHash) >= 0;
  if (isInitial) {
    return;
  }

  /**
   * @param {Window} rootWindow
   * @param {number} intervalId
   */
  function applyReload(rootWindow, intervalId) {
    clearInterval(intervalId);
    _log_js__WEBPACK_IMPORTED_MODULE_1__.log.info("App updated. Reloading...");
    rootWindow.location.reload();
  }
  var search = self.location.search.toLowerCase();
  var allowToHot = search.indexOf("webpack-dev-server-hot=false") === -1;
  var allowToLiveReload = search.indexOf("webpack-dev-server-live-reload=false") === -1;
  if (hot && allowToHot) {
    _log_js__WEBPACK_IMPORTED_MODULE_1__.log.info("App hot update...");
    webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_0___default().emit("webpackHotUpdate", status.currentHash);
    if (typeof self !== "undefined" && self.window) {
      // broadcast update to window
      self.postMessage("webpackHotUpdate".concat(status.currentHash), "*");
    }
  }
  // allow refreshing the page only if liveReload isn't disabled
  else if (liveReload && allowToLiveReload) {
    var rootWindow = self;

    // use parent window for reload (in case we're in an iframe with no valid src)
    var intervalId = self.setInterval(function () {
      if (rootWindow.location.protocol !== "about:") {
        // reload immediately if protocol is valid
        applyReload(rootWindow, intervalId);
      } else {
        rootWindow = rootWindow.parent;
        if (rootWindow.parent === rootWindow) {
          // if parent equals current window we've reached the root which would continue forever, so trigger a reload anyways
          applyReload(rootWindow, intervalId);
        }
      }
    });
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (reloadApp);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/sendMessage.js":
/*!*********************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/sendMessage.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* global __resourceQuery WorkerGlobalScope */

// Send messages to the outside, so plugins can consume it.
/**
 * @param {string} type
 * @param {any} [data]
 */
function sendMsg(type, data) {
  if (typeof self !== "undefined" && (typeof WorkerGlobalScope === "undefined" || !(self instanceof WorkerGlobalScope))) {
    self.postMessage({
      type: "webpack".concat(type),
      data: data
    }, "*");
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sendMsg);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/stripAnsi.js":
/*!*******************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/stripAnsi.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var ansiRegex = new RegExp(["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)", "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))"].join("|"), "g");

/**
 *
 * Strip [ANSI escape codes](https://en.wikipedia.org/wiki/ANSI_escape_code) from a string.
 * Adapted from code originally released by Sindre Sorhus
 * Licensed the MIT License
 *
 * @param {string} string
 * @return {string}
 */
function stripAnsi(string) {
  if (typeof string !== "string") {
    throw new TypeError("Expected a `string`, got `".concat(typeof string, "`"));
  }
  return string.replace(ansiRegex, "");
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (stripAnsi);

/***/ }),

/***/ "./node_modules/webpack/hot/dev-server.js":
/*!************************************************!*\
  !*** ./node_modules/webpack/hot/dev-server.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
/* globals __webpack_hash__ */
if (true) {
  /** @type {undefined|string} */
  var lastHash;
  var upToDate = function upToDate() {
    return /** @type {string} */lastHash.indexOf(__webpack_require__.h()) >= 0;
  };
  var log = __webpack_require__(/*! ./log */ "./node_modules/webpack/hot/log.js");
  var check = function check() {
    module.hot.check(true).then(function (updatedModules) {
      if (!updatedModules) {
        log("warning", "[HMR] Cannot find update. " + (typeof window !== "undefined" ? "Need to do a full reload!" : "Please reload manually!"));
        log("warning", "[HMR] (Probably because of restarting the webpack-dev-server)");
        if (typeof window !== "undefined") {
          window.location.reload();
        }
        return;
      }
      if (!upToDate()) {
        check();
      }
      __webpack_require__(/*! ./log-apply-result */ "./node_modules/webpack/hot/log-apply-result.js")(updatedModules, updatedModules);
      if (upToDate()) {
        log("info", "[HMR] App is up to date.");
      }
    }).catch(function (err) {
      var status = module.hot.status();
      if (["abort", "fail"].indexOf(status) >= 0) {
        log("warning", "[HMR] Cannot apply update. " + (typeof window !== "undefined" ? "Need to do a full reload!" : "Please reload manually!"));
        log("warning", "[HMR] " + log.formatError(err));
        if (typeof window !== "undefined") {
          window.location.reload();
        }
      } else {
        log("warning", "[HMR] Update failed: " + log.formatError(err));
      }
    });
  };
  var hotEmitter = __webpack_require__(/*! ./emitter */ "./node_modules/webpack/hot/emitter.js");
  hotEmitter.on("webpackHotUpdate", function (currentHash) {
    lastHash = currentHash;
    if (!upToDate() && module.hot.status() === "idle") {
      log("info", "[HMR] Checking for updates on the server...");
      check();
    }
  });
  log("info", "[HMR] Waiting for update signal from WDS...");
} else {}

/***/ }),

/***/ "./node_modules/webpack/hot/emitter.js":
/*!*********************************************!*\
  !*** ./node_modules/webpack/hot/emitter.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var EventEmitter = __webpack_require__(/*! events */ "./node_modules/events/events.js");
module.exports = new EventEmitter();

/***/ }),

/***/ "./node_modules/webpack/hot/log-apply-result.js":
/*!******************************************************!*\
  !*** ./node_modules/webpack/hot/log-apply-result.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

/**
 * @param {(string | number)[]} updatedModules updated modules
 * @param {(string | number)[] | null} renewedModules renewed modules
 */
module.exports = function (updatedModules, renewedModules) {
  var unacceptedModules = updatedModules.filter(function (moduleId) {
    return renewedModules && renewedModules.indexOf(moduleId) < 0;
  });
  var log = __webpack_require__(/*! ./log */ "./node_modules/webpack/hot/log.js");
  if (unacceptedModules.length > 0) {
    log("warning", "[HMR] The following modules couldn't be hot updated: (They would need a full reload!)");
    unacceptedModules.forEach(function (moduleId) {
      log("warning", "[HMR]  - " + moduleId);
    });
  }
  if (!renewedModules || renewedModules.length === 0) {
    log("info", "[HMR] Nothing hot updated.");
  } else {
    log("info", "[HMR] Updated modules:");
    renewedModules.forEach(function (moduleId) {
      if (typeof moduleId === "string" && moduleId.indexOf("!") !== -1) {
        var parts = moduleId.split("!");
        log.groupCollapsed("info", "[HMR]  - " + parts.pop());
        log("info", "[HMR]  - " + moduleId);
        log.groupEnd("info");
      } else {
        log("info", "[HMR]  - " + moduleId);
      }
    });
    var numberIds = renewedModules.every(function (moduleId) {
      return typeof moduleId === "number";
    });
    if (numberIds) log("info", '[HMR] Consider using the optimization.moduleIds: "named" for module names.');
  }
};

/***/ }),

/***/ "./node_modules/webpack/hot/log.js":
/*!*****************************************!*\
  !*** ./node_modules/webpack/hot/log.js ***!
  \*****************************************/
/***/ ((module) => {

/** @typedef {"info" | "warning" | "error"} LogLevel */

/** @type {LogLevel} */
var logLevel = "info";
function dummy() {}

/**
 * @param {LogLevel} level log level
 * @returns {boolean} true, if should log
 */
function shouldLog(level) {
  var shouldLog = logLevel === "info" && level === "info" || ["info", "warning"].indexOf(logLevel) >= 0 && level === "warning" || ["info", "warning", "error"].indexOf(logLevel) >= 0 && level === "error";
  return shouldLog;
}

/**
 * @param {(msg?: string) => void} logFn log function
 * @returns {(level: LogLevel, msg?: string) => void} function that logs when log level is sufficient
 */
function logGroup(logFn) {
  return function (level, msg) {
    if (shouldLog(level)) {
      logFn(msg);
    }
  };
}

/**
 * @param {LogLevel} level log level
 * @param {string|Error} msg message
 */
module.exports = function (level, msg) {
  if (shouldLog(level)) {
    if (level === "info") {
      console.log(msg);
    } else if (level === "warning") {
      console.warn(msg);
    } else if (level === "error") {
      console.error(msg);
    }
  }
};
var group = console.group || dummy;
var groupCollapsed = console.groupCollapsed || dummy;
var groupEnd = console.groupEnd || dummy;
module.exports.group = logGroup(group);
module.exports.groupCollapsed = logGroup(groupCollapsed);
module.exports.groupEnd = logGroup(groupEnd);

/**
 * @param {LogLevel} level log level
 */
module.exports.setLogLevel = function (level) {
  logLevel = level;
};

/**
 * @param {Error} err error
 * @returns {string} formatted error
 */
module.exports.formatError = function (err) {
  var message = err.message;
  var stack = err.stack;
  if (!stack) {
    return message;
  } else if (stack.indexOf(message) < 0) {
    return message + "\n" + stack;
  }
  return stack;
};

/***/ }),

/***/ "./styles/index.scss":
/*!***************************!*\
  !*** ./styles/index.scss ***!
  \***************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

    if(true) {
      (function() {
        var localsJsonString = undefined;
        // 1727938070325
        var cssReload = __webpack_require__(/*! ../node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js")(module.id, {"publicPath":""});
        // only invalidate when locals change
        if (
          module.hot.data &&
          module.hot.data.value &&
          module.hot.data.value !== localsJsonString
        ) {
          module.hot.invalidate();
        } else {
          module.hot.accept();
        }
        module.hot.dispose(function(data) {
          data.value = localsJsonString;
          cssReload();
        });
      })();
    }
  

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var execOptions = { id: moduleId, module: module, factory: __webpack_modules__[moduleId], require: __webpack_require__ };
/******/ 		__webpack_require__.i.forEach(function(handler) { handler(execOptions); });
/******/ 		module = execOptions.module;
/******/ 		execOptions.factory.call(module.exports, module, module.exports, execOptions.require);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
/******/ 	
/******/ 	// expose the module execution interceptor
/******/ 	__webpack_require__.i = [];
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript update chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference all chunks
/******/ 		__webpack_require__.hu = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + "." + __webpack_require__.h() + ".hot-update.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get mini-css chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.miniCssF = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return undefined;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get update manifest filename */
/******/ 	(() => {
/******/ 		__webpack_require__.hmrF = () => ("main." + __webpack_require__.h() + ".hot-update.json");
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => ("035490c2bcd52e1d214c")
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "floema:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 		
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hot module replacement */
/******/ 	(() => {
/******/ 		var currentModuleData = {};
/******/ 		var installedModules = __webpack_require__.c;
/******/ 		
/******/ 		// module and require creation
/******/ 		var currentChildModule;
/******/ 		var currentParents = [];
/******/ 		
/******/ 		// status
/******/ 		var registeredStatusHandlers = [];
/******/ 		var currentStatus = "idle";
/******/ 		
/******/ 		// while downloading
/******/ 		var blockingPromises = 0;
/******/ 		var blockingPromisesWaiting = [];
/******/ 		
/******/ 		// The update info
/******/ 		var currentUpdateApplyHandlers;
/******/ 		var queuedInvalidatedModules;
/******/ 		
/******/ 		__webpack_require__.hmrD = currentModuleData;
/******/ 		
/******/ 		__webpack_require__.i.push(function (options) {
/******/ 			var module = options.module;
/******/ 			var require = createRequire(options.require, options.id);
/******/ 			module.hot = createModuleHotObject(options.id, module);
/******/ 			module.parents = currentParents;
/******/ 			module.children = [];
/******/ 			currentParents = [];
/******/ 			options.require = require;
/******/ 		});
/******/ 		
/******/ 		__webpack_require__.hmrC = {};
/******/ 		__webpack_require__.hmrI = {};
/******/ 		
/******/ 		function createRequire(require, moduleId) {
/******/ 			var me = installedModules[moduleId];
/******/ 			if (!me) return require;
/******/ 			var fn = function (request) {
/******/ 				if (me.hot.active) {
/******/ 					if (installedModules[request]) {
/******/ 						var parents = installedModules[request].parents;
/******/ 						if (parents.indexOf(moduleId) === -1) {
/******/ 							parents.push(moduleId);
/******/ 						}
/******/ 					} else {
/******/ 						currentParents = [moduleId];
/******/ 						currentChildModule = request;
/******/ 					}
/******/ 					if (me.children.indexOf(request) === -1) {
/******/ 						me.children.push(request);
/******/ 					}
/******/ 				} else {
/******/ 					console.warn(
/******/ 						"[HMR] unexpected require(" +
/******/ 							request +
/******/ 							") from disposed module " +
/******/ 							moduleId
/******/ 					);
/******/ 					currentParents = [];
/******/ 				}
/******/ 				return require(request);
/******/ 			};
/******/ 			var createPropertyDescriptor = function (name) {
/******/ 				return {
/******/ 					configurable: true,
/******/ 					enumerable: true,
/******/ 					get: function () {
/******/ 						return require[name];
/******/ 					},
/******/ 					set: function (value) {
/******/ 						require[name] = value;
/******/ 					}
/******/ 				};
/******/ 			};
/******/ 			for (var name in require) {
/******/ 				if (Object.prototype.hasOwnProperty.call(require, name) && name !== "e") {
/******/ 					Object.defineProperty(fn, name, createPropertyDescriptor(name));
/******/ 				}
/******/ 			}
/******/ 			fn.e = function (chunkId, fetchPriority) {
/******/ 				return trackBlockingPromise(require.e(chunkId, fetchPriority));
/******/ 			};
/******/ 			return fn;
/******/ 		}
/******/ 		
/******/ 		function createModuleHotObject(moduleId, me) {
/******/ 			var _main = currentChildModule !== moduleId;
/******/ 			var hot = {
/******/ 				// private stuff
/******/ 				_acceptedDependencies: {},
/******/ 				_acceptedErrorHandlers: {},
/******/ 				_declinedDependencies: {},
/******/ 				_selfAccepted: false,
/******/ 				_selfDeclined: false,
/******/ 				_selfInvalidated: false,
/******/ 				_disposeHandlers: [],
/******/ 				_main: _main,
/******/ 				_requireSelf: function () {
/******/ 					currentParents = me.parents.slice();
/******/ 					currentChildModule = _main ? undefined : moduleId;
/******/ 					__webpack_require__(moduleId);
/******/ 				},
/******/ 		
/******/ 				// Module API
/******/ 				active: true,
/******/ 				accept: function (dep, callback, errorHandler) {
/******/ 					if (dep === undefined) hot._selfAccepted = true;
/******/ 					else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 					else if (typeof dep === "object" && dep !== null) {
/******/ 						for (var i = 0; i < dep.length; i++) {
/******/ 							hot._acceptedDependencies[dep[i]] = callback || function () {};
/******/ 							hot._acceptedErrorHandlers[dep[i]] = errorHandler;
/******/ 						}
/******/ 					} else {
/******/ 						hot._acceptedDependencies[dep] = callback || function () {};
/******/ 						hot._acceptedErrorHandlers[dep] = errorHandler;
/******/ 					}
/******/ 				},
/******/ 				decline: function (dep) {
/******/ 					if (dep === undefined) hot._selfDeclined = true;
/******/ 					else if (typeof dep === "object" && dep !== null)
/******/ 						for (var i = 0; i < dep.length; i++)
/******/ 							hot._declinedDependencies[dep[i]] = true;
/******/ 					else hot._declinedDependencies[dep] = true;
/******/ 				},
/******/ 				dispose: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				addDisposeHandler: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				removeDisposeHandler: function (callback) {
/******/ 					var idx = hot._disposeHandlers.indexOf(callback);
/******/ 					if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 				},
/******/ 				invalidate: function () {
/******/ 					this._selfInvalidated = true;
/******/ 					switch (currentStatus) {
/******/ 						case "idle":
/******/ 							currentUpdateApplyHandlers = [];
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							setStatus("ready");
/******/ 							break;
/******/ 						case "ready":
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							break;
/******/ 						case "prepare":
/******/ 						case "check":
/******/ 						case "dispose":
/******/ 						case "apply":
/******/ 							(queuedInvalidatedModules = queuedInvalidatedModules || []).push(
/******/ 								moduleId
/******/ 							);
/******/ 							break;
/******/ 						default:
/******/ 							// ignore requests in error states
/******/ 							break;
/******/ 					}
/******/ 				},
/******/ 		
/******/ 				// Management API
/******/ 				check: hotCheck,
/******/ 				apply: hotApply,
/******/ 				status: function (l) {
/******/ 					if (!l) return currentStatus;
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				addStatusHandler: function (l) {
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				removeStatusHandler: function (l) {
/******/ 					var idx = registeredStatusHandlers.indexOf(l);
/******/ 					if (idx >= 0) registeredStatusHandlers.splice(idx, 1);
/******/ 				},
/******/ 		
/******/ 				// inherit from previous dispose call
/******/ 				data: currentModuleData[moduleId]
/******/ 			};
/******/ 			currentChildModule = undefined;
/******/ 			return hot;
/******/ 		}
/******/ 		
/******/ 		function setStatus(newStatus) {
/******/ 			currentStatus = newStatus;
/******/ 			var results = [];
/******/ 		
/******/ 			for (var i = 0; i < registeredStatusHandlers.length; i++)
/******/ 				results[i] = registeredStatusHandlers[i].call(null, newStatus);
/******/ 		
/******/ 			return Promise.all(results).then(function () {});
/******/ 		}
/******/ 		
/******/ 		function unblock() {
/******/ 			if (--blockingPromises === 0) {
/******/ 				setStatus("ready").then(function () {
/******/ 					if (blockingPromises === 0) {
/******/ 						var list = blockingPromisesWaiting;
/******/ 						blockingPromisesWaiting = [];
/******/ 						for (var i = 0; i < list.length; i++) {
/******/ 							list[i]();
/******/ 						}
/******/ 					}
/******/ 				});
/******/ 			}
/******/ 		}
/******/ 		
/******/ 		function trackBlockingPromise(promise) {
/******/ 			switch (currentStatus) {
/******/ 				case "ready":
/******/ 					setStatus("prepare");
/******/ 				/* fallthrough */
/******/ 				case "prepare":
/******/ 					blockingPromises++;
/******/ 					promise.then(unblock, unblock);
/******/ 					return promise;
/******/ 				default:
/******/ 					return promise;
/******/ 			}
/******/ 		}
/******/ 		
/******/ 		function waitForBlockingPromises(fn) {
/******/ 			if (blockingPromises === 0) return fn();
/******/ 			return new Promise(function (resolve) {
/******/ 				blockingPromisesWaiting.push(function () {
/******/ 					resolve(fn());
/******/ 				});
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function hotCheck(applyOnUpdate) {
/******/ 			if (currentStatus !== "idle") {
/******/ 				throw new Error("check() is only allowed in idle status");
/******/ 			}
/******/ 			return setStatus("check")
/******/ 				.then(__webpack_require__.hmrM)
/******/ 				.then(function (update) {
/******/ 					if (!update) {
/******/ 						return setStatus(applyInvalidatedModules() ? "ready" : "idle").then(
/******/ 							function () {
/******/ 								return null;
/******/ 							}
/******/ 						);
/******/ 					}
/******/ 		
/******/ 					return setStatus("prepare").then(function () {
/******/ 						var updatedModules = [];
/******/ 						currentUpdateApplyHandlers = [];
/******/ 		
/******/ 						return Promise.all(
/******/ 							Object.keys(__webpack_require__.hmrC).reduce(function (
/******/ 								promises,
/******/ 								key
/******/ 							) {
/******/ 								__webpack_require__.hmrC[key](
/******/ 									update.c,
/******/ 									update.r,
/******/ 									update.m,
/******/ 									promises,
/******/ 									currentUpdateApplyHandlers,
/******/ 									updatedModules
/******/ 								);
/******/ 								return promises;
/******/ 							}, [])
/******/ 						).then(function () {
/******/ 							return waitForBlockingPromises(function () {
/******/ 								if (applyOnUpdate) {
/******/ 									return internalApply(applyOnUpdate);
/******/ 								}
/******/ 								return setStatus("ready").then(function () {
/******/ 									return updatedModules;
/******/ 								});
/******/ 							});
/******/ 						});
/******/ 					});
/******/ 				});
/******/ 		}
/******/ 		
/******/ 		function hotApply(options) {
/******/ 			if (currentStatus !== "ready") {
/******/ 				return Promise.resolve().then(function () {
/******/ 					throw new Error(
/******/ 						"apply() is only allowed in ready status (state: " +
/******/ 							currentStatus +
/******/ 							")"
/******/ 					);
/******/ 				});
/******/ 			}
/******/ 			return internalApply(options);
/******/ 		}
/******/ 		
/******/ 		function internalApply(options) {
/******/ 			options = options || {};
/******/ 		
/******/ 			applyInvalidatedModules();
/******/ 		
/******/ 			var results = currentUpdateApplyHandlers.map(function (handler) {
/******/ 				return handler(options);
/******/ 			});
/******/ 			currentUpdateApplyHandlers = undefined;
/******/ 		
/******/ 			var errors = results
/******/ 				.map(function (r) {
/******/ 					return r.error;
/******/ 				})
/******/ 				.filter(Boolean);
/******/ 		
/******/ 			if (errors.length > 0) {
/******/ 				return setStatus("abort").then(function () {
/******/ 					throw errors[0];
/******/ 				});
/******/ 			}
/******/ 		
/******/ 			// Now in "dispose" phase
/******/ 			var disposePromise = setStatus("dispose");
/******/ 		
/******/ 			results.forEach(function (result) {
/******/ 				if (result.dispose) result.dispose();
/******/ 			});
/******/ 		
/******/ 			// Now in "apply" phase
/******/ 			var applyPromise = setStatus("apply");
/******/ 		
/******/ 			var error;
/******/ 			var reportError = function (err) {
/******/ 				if (!error) error = err;
/******/ 			};
/******/ 		
/******/ 			var outdatedModules = [];
/******/ 			results.forEach(function (result) {
/******/ 				if (result.apply) {
/******/ 					var modules = result.apply(reportError);
/******/ 					if (modules) {
/******/ 						for (var i = 0; i < modules.length; i++) {
/******/ 							outdatedModules.push(modules[i]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		
/******/ 			return Promise.all([disposePromise, applyPromise]).then(function () {
/******/ 				// handle errors in accept handlers and self accepted module load
/******/ 				if (error) {
/******/ 					return setStatus("fail").then(function () {
/******/ 						throw error;
/******/ 					});
/******/ 				}
/******/ 		
/******/ 				if (queuedInvalidatedModules) {
/******/ 					return internalApply(options).then(function (list) {
/******/ 						outdatedModules.forEach(function (moduleId) {
/******/ 							if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 						});
/******/ 						return list;
/******/ 					});
/******/ 				}
/******/ 		
/******/ 				return setStatus("idle").then(function () {
/******/ 					return outdatedModules;
/******/ 				});
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function applyInvalidatedModules() {
/******/ 			if (queuedInvalidatedModules) {
/******/ 				if (!currentUpdateApplyHandlers) currentUpdateApplyHandlers = [];
/******/ 				Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 					queuedInvalidatedModules.forEach(function (moduleId) {
/******/ 						__webpack_require__.hmrI[key](
/******/ 							moduleId,
/******/ 							currentUpdateApplyHandlers
/******/ 						);
/******/ 					});
/******/ 				});
/******/ 				queuedInvalidatedModules = undefined;
/******/ 				return true;
/******/ 			}
/******/ 		}
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript && document.currentScript.tagName.toUpperCase() === 'SCRIPT')
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/css loading */
/******/ 	(() => {
/******/ 		if (typeof document === "undefined") return;
/******/ 		var createStylesheet = (chunkId, fullhref, oldTag, resolve, reject) => {
/******/ 			var linkTag = document.createElement("link");
/******/ 		
/******/ 			linkTag.rel = "stylesheet";
/******/ 			linkTag.type = "text/css";
/******/ 			if (__webpack_require__.nc) {
/******/ 				linkTag.nonce = __webpack_require__.nc;
/******/ 			}
/******/ 			var onLinkComplete = (event) => {
/******/ 				// avoid mem leaks.
/******/ 				linkTag.onerror = linkTag.onload = null;
/******/ 				if (event.type === 'load') {
/******/ 					resolve();
/******/ 				} else {
/******/ 					var errorType = event && event.type;
/******/ 					var realHref = event && event.target && event.target.href || fullhref;
/******/ 					var err = new Error("Loading CSS chunk " + chunkId + " failed.\n(" + errorType + ": " + realHref + ")");
/******/ 					err.name = "ChunkLoadError";
/******/ 					err.code = "CSS_CHUNK_LOAD_FAILED";
/******/ 					err.type = errorType;
/******/ 					err.request = realHref;
/******/ 					if (linkTag.parentNode) linkTag.parentNode.removeChild(linkTag)
/******/ 					reject(err);
/******/ 				}
/******/ 			}
/******/ 			linkTag.onerror = linkTag.onload = onLinkComplete;
/******/ 			linkTag.href = fullhref;
/******/ 		
/******/ 		
/******/ 			if (oldTag) {
/******/ 				oldTag.parentNode.insertBefore(linkTag, oldTag.nextSibling);
/******/ 			} else {
/******/ 				document.head.appendChild(linkTag);
/******/ 			}
/******/ 			return linkTag;
/******/ 		};
/******/ 		var findStylesheet = (href, fullhref) => {
/******/ 			var existingLinkTags = document.getElementsByTagName("link");
/******/ 			for(var i = 0; i < existingLinkTags.length; i++) {
/******/ 				var tag = existingLinkTags[i];
/******/ 				var dataHref = tag.getAttribute("data-href") || tag.getAttribute("href");
/******/ 				if(tag.rel === "stylesheet" && (dataHref === href || dataHref === fullhref)) return tag;
/******/ 			}
/******/ 			var existingStyleTags = document.getElementsByTagName("style");
/******/ 			for(var i = 0; i < existingStyleTags.length; i++) {
/******/ 				var tag = existingStyleTags[i];
/******/ 				var dataHref = tag.getAttribute("data-href");
/******/ 				if(dataHref === href || dataHref === fullhref) return tag;
/******/ 			}
/******/ 		};
/******/ 		var loadStylesheet = (chunkId) => {
/******/ 			return new Promise((resolve, reject) => {
/******/ 				var href = __webpack_require__.miniCssF(chunkId);
/******/ 				var fullhref = __webpack_require__.p + href;
/******/ 				if(findStylesheet(href, fullhref)) return resolve();
/******/ 				createStylesheet(chunkId, fullhref, null, resolve, reject);
/******/ 			});
/******/ 		}
/******/ 		// no chunk loading
/******/ 		
/******/ 		var oldTags = [];
/******/ 		var newTags = [];
/******/ 		var applyHandler = (options) => {
/******/ 			return { dispose: () => {
/******/ 				for(var i = 0; i < oldTags.length; i++) {
/******/ 					var oldTag = oldTags[i];
/******/ 					if(oldTag.parentNode) oldTag.parentNode.removeChild(oldTag);
/******/ 				}
/******/ 				oldTags.length = 0;
/******/ 			}, apply: () => {
/******/ 				for(var i = 0; i < newTags.length; i++) newTags[i].rel = "stylesheet";
/******/ 				newTags.length = 0;
/******/ 			} };
/******/ 		}
/******/ 		__webpack_require__.hmrC.miniCss = (chunkIds, removedChunks, removedModules, promises, applyHandlers, updatedModulesList) => {
/******/ 			applyHandlers.push(applyHandler);
/******/ 			chunkIds.forEach((chunkId) => {
/******/ 				var href = __webpack_require__.miniCssF(chunkId);
/******/ 				var fullhref = __webpack_require__.p + href;
/******/ 				var oldTag = findStylesheet(href, fullhref);
/******/ 				if(!oldTag) return;
/******/ 				promises.push(new Promise((resolve, reject) => {
/******/ 					var tag = createStylesheet(chunkId, fullhref, oldTag, () => {
/******/ 						tag.as = "style";
/******/ 						tag.rel = "preload";
/******/ 						resolve();
/******/ 					}, reject);
/******/ 					oldTags.push(oldTag);
/******/ 					newTags.push(tag);
/******/ 				}));
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = __webpack_require__.hmrS_jsonp = __webpack_require__.hmrS_jsonp || {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		var currentUpdatedModulesList;
/******/ 		var waitingUpdateResolves = {};
/******/ 		function loadUpdateChunk(chunkId, updatedModulesList) {
/******/ 			currentUpdatedModulesList = updatedModulesList;
/******/ 			return new Promise((resolve, reject) => {
/******/ 				waitingUpdateResolves[chunkId] = resolve;
/******/ 				// start update chunk loading
/******/ 				var url = __webpack_require__.p + __webpack_require__.hu(chunkId);
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				var loadingEnded = (event) => {
/******/ 					if(waitingUpdateResolves[chunkId]) {
/******/ 						waitingUpdateResolves[chunkId] = undefined
/******/ 						var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 						var realSrc = event && event.target && event.target.src;
/******/ 						error.message = 'Loading hot update chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 						error.name = 'ChunkLoadError';
/******/ 						error.type = errorType;
/******/ 						error.request = realSrc;
/******/ 						reject(error);
/******/ 					}
/******/ 				};
/******/ 				__webpack_require__.l(url, loadingEnded);
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		self["webpackHotUpdatefloema"] = (chunkId, moreModules, runtime) => {
/******/ 			for(var moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					currentUpdate[moduleId] = moreModules[moduleId];
/******/ 					if(currentUpdatedModulesList) currentUpdatedModulesList.push(moduleId);
/******/ 				}
/******/ 			}
/******/ 			if(runtime) currentUpdateRuntime.push(runtime);
/******/ 			if(waitingUpdateResolves[chunkId]) {
/******/ 				waitingUpdateResolves[chunkId]();
/******/ 				waitingUpdateResolves[chunkId] = undefined;
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		var currentUpdateChunks;
/******/ 		var currentUpdate;
/******/ 		var currentUpdateRemovedChunks;
/******/ 		var currentUpdateRuntime;
/******/ 		function applyHandler(options) {
/******/ 			if (__webpack_require__.f) delete __webpack_require__.f.jsonpHmr;
/******/ 			currentUpdateChunks = undefined;
/******/ 			function getAffectedModuleEffects(updateModuleId) {
/******/ 				var outdatedModules = [updateModuleId];
/******/ 				var outdatedDependencies = {};
/******/ 		
/******/ 				var queue = outdatedModules.map(function (id) {
/******/ 					return {
/******/ 						chain: [id],
/******/ 						id: id
/******/ 					};
/******/ 				});
/******/ 				while (queue.length > 0) {
/******/ 					var queueItem = queue.pop();
/******/ 					var moduleId = queueItem.id;
/******/ 					var chain = queueItem.chain;
/******/ 					var module = __webpack_require__.c[moduleId];
/******/ 					if (
/******/ 						!module ||
/******/ 						(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 					)
/******/ 						continue;
/******/ 					if (module.hot._selfDeclined) {
/******/ 						return {
/******/ 							type: "self-declined",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					if (module.hot._main) {
/******/ 						return {
/******/ 							type: "unaccepted",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					for (var i = 0; i < module.parents.length; i++) {
/******/ 						var parentId = module.parents[i];
/******/ 						var parent = __webpack_require__.c[parentId];
/******/ 						if (!parent) continue;
/******/ 						if (parent.hot._declinedDependencies[moduleId]) {
/******/ 							return {
/******/ 								type: "declined",
/******/ 								chain: chain.concat([parentId]),
/******/ 								moduleId: moduleId,
/******/ 								parentId: parentId
/******/ 							};
/******/ 						}
/******/ 						if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 						if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 							if (!outdatedDependencies[parentId])
/******/ 								outdatedDependencies[parentId] = [];
/******/ 							addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 							continue;
/******/ 						}
/******/ 						delete outdatedDependencies[parentId];
/******/ 						outdatedModules.push(parentId);
/******/ 						queue.push({
/******/ 							chain: chain.concat([parentId]),
/******/ 							id: parentId
/******/ 						});
/******/ 					}
/******/ 				}
/******/ 		
/******/ 				return {
/******/ 					type: "accepted",
/******/ 					moduleId: updateModuleId,
/******/ 					outdatedModules: outdatedModules,
/******/ 					outdatedDependencies: outdatedDependencies
/******/ 				};
/******/ 			}
/******/ 		
/******/ 			function addAllToSet(a, b) {
/******/ 				for (var i = 0; i < b.length; i++) {
/******/ 					var item = b[i];
/******/ 					if (a.indexOf(item) === -1) a.push(item);
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			// at begin all updates modules are outdated
/******/ 			// the "outdated" status can propagate to parents if they don't accept the children
/******/ 			var outdatedDependencies = {};
/******/ 			var outdatedModules = [];
/******/ 			var appliedUpdate = {};
/******/ 		
/******/ 			var warnUnexpectedRequire = function warnUnexpectedRequire(module) {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" + module.id + ") to disposed module"
/******/ 				);
/******/ 			};
/******/ 		
/******/ 			for (var moduleId in currentUpdate) {
/******/ 				if (__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 					var newModuleFactory = currentUpdate[moduleId];
/******/ 					/** @type {TODO} */
/******/ 					var result = newModuleFactory
/******/ 						? getAffectedModuleEffects(moduleId)
/******/ 						: {
/******/ 								type: "disposed",
/******/ 								moduleId: moduleId
/******/ 							};
/******/ 					/** @type {Error|false} */
/******/ 					var abortError = false;
/******/ 					var doApply = false;
/******/ 					var doDispose = false;
/******/ 					var chainInfo = "";
/******/ 					if (result.chain) {
/******/ 						chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 					}
/******/ 					switch (result.type) {
/******/ 						case "self-declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of self decline: " +
/******/ 										result.moduleId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of declined dependency: " +
/******/ 										result.moduleId +
/******/ 										" in " +
/******/ 										result.parentId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "unaccepted":
/******/ 							if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 							if (!options.ignoreUnaccepted)
/******/ 								abortError = new Error(
/******/ 									"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "accepted":
/******/ 							if (options.onAccepted) options.onAccepted(result);
/******/ 							doApply = true;
/******/ 							break;
/******/ 						case "disposed":
/******/ 							if (options.onDisposed) options.onDisposed(result);
/******/ 							doDispose = true;
/******/ 							break;
/******/ 						default:
/******/ 							throw new Error("Unexception type " + result.type);
/******/ 					}
/******/ 					if (abortError) {
/******/ 						return {
/******/ 							error: abortError
/******/ 						};
/******/ 					}
/******/ 					if (doApply) {
/******/ 						appliedUpdate[moduleId] = newModuleFactory;
/******/ 						addAllToSet(outdatedModules, result.outdatedModules);
/******/ 						for (moduleId in result.outdatedDependencies) {
/******/ 							if (__webpack_require__.o(result.outdatedDependencies, moduleId)) {
/******/ 								if (!outdatedDependencies[moduleId])
/******/ 									outdatedDependencies[moduleId] = [];
/******/ 								addAllToSet(
/******/ 									outdatedDependencies[moduleId],
/******/ 									result.outdatedDependencies[moduleId]
/******/ 								);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 					if (doDispose) {
/******/ 						addAllToSet(outdatedModules, [result.moduleId]);
/******/ 						appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 			currentUpdate = undefined;
/******/ 		
/******/ 			// Store self accepted outdated modules to require them later by the module system
/******/ 			var outdatedSelfAcceptedModules = [];
/******/ 			for (var j = 0; j < outdatedModules.length; j++) {
/******/ 				var outdatedModuleId = outdatedModules[j];
/******/ 				var module = __webpack_require__.c[outdatedModuleId];
/******/ 				if (
/******/ 					module &&
/******/ 					(module.hot._selfAccepted || module.hot._main) &&
/******/ 					// removed self-accepted modules should not be required
/******/ 					appliedUpdate[outdatedModuleId] !== warnUnexpectedRequire &&
/******/ 					// when called invalidate self-accepting is not possible
/******/ 					!module.hot._selfInvalidated
/******/ 				) {
/******/ 					outdatedSelfAcceptedModules.push({
/******/ 						module: outdatedModuleId,
/******/ 						require: module.hot._requireSelf,
/******/ 						errorHandler: module.hot._selfAccepted
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			var moduleOutdatedDependencies;
/******/ 		
/******/ 			return {
/******/ 				dispose: function () {
/******/ 					currentUpdateRemovedChunks.forEach(function (chunkId) {
/******/ 						delete installedChunks[chunkId];
/******/ 					});
/******/ 					currentUpdateRemovedChunks = undefined;
/******/ 		
/******/ 					var idx;
/******/ 					var queue = outdatedModules.slice();
/******/ 					while (queue.length > 0) {
/******/ 						var moduleId = queue.pop();
/******/ 						var module = __webpack_require__.c[moduleId];
/******/ 						if (!module) continue;
/******/ 		
/******/ 						var data = {};
/******/ 		
/******/ 						// Call dispose handlers
/******/ 						var disposeHandlers = module.hot._disposeHandlers;
/******/ 						for (j = 0; j < disposeHandlers.length; j++) {
/******/ 							disposeHandlers[j].call(null, data);
/******/ 						}
/******/ 						__webpack_require__.hmrD[moduleId] = data;
/******/ 		
/******/ 						// disable module (this disables requires from this module)
/******/ 						module.hot.active = false;
/******/ 		
/******/ 						// remove module from cache
/******/ 						delete __webpack_require__.c[moduleId];
/******/ 		
/******/ 						// when disposing there is no need to call dispose handler
/******/ 						delete outdatedDependencies[moduleId];
/******/ 		
/******/ 						// remove "parents" references from all children
/******/ 						for (j = 0; j < module.children.length; j++) {
/******/ 							var child = __webpack_require__.c[module.children[j]];
/******/ 							if (!child) continue;
/******/ 							idx = child.parents.indexOf(moduleId);
/******/ 							if (idx >= 0) {
/******/ 								child.parents.splice(idx, 1);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// remove outdated dependency from module children
/******/ 					var dependency;
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									dependency = moduleOutdatedDependencies[j];
/******/ 									idx = module.children.indexOf(dependency);
/******/ 									if (idx >= 0) module.children.splice(idx, 1);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				},
/******/ 				apply: function (reportError) {
/******/ 					// insert new code
/******/ 					for (var updateModuleId in appliedUpdate) {
/******/ 						if (__webpack_require__.o(appliedUpdate, updateModuleId)) {
/******/ 							__webpack_require__.m[updateModuleId] = appliedUpdate[updateModuleId];
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// run new runtime modules
/******/ 					for (var i = 0; i < currentUpdateRuntime.length; i++) {
/******/ 						currentUpdateRuntime[i](__webpack_require__);
/******/ 					}
/******/ 		
/******/ 					// call accept handlers
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							var module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								var callbacks = [];
/******/ 								var errorHandlers = [];
/******/ 								var dependenciesForCallbacks = [];
/******/ 								for (var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									var dependency = moduleOutdatedDependencies[j];
/******/ 									var acceptCallback =
/******/ 										module.hot._acceptedDependencies[dependency];
/******/ 									var errorHandler =
/******/ 										module.hot._acceptedErrorHandlers[dependency];
/******/ 									if (acceptCallback) {
/******/ 										if (callbacks.indexOf(acceptCallback) !== -1) continue;
/******/ 										callbacks.push(acceptCallback);
/******/ 										errorHandlers.push(errorHandler);
/******/ 										dependenciesForCallbacks.push(dependency);
/******/ 									}
/******/ 								}
/******/ 								for (var k = 0; k < callbacks.length; k++) {
/******/ 									try {
/******/ 										callbacks[k].call(null, moduleOutdatedDependencies);
/******/ 									} catch (err) {
/******/ 										if (typeof errorHandlers[k] === "function") {
/******/ 											try {
/******/ 												errorHandlers[k](err, {
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k]
/******/ 												});
/******/ 											} catch (err2) {
/******/ 												if (options.onErrored) {
/******/ 													options.onErrored({
/******/ 														type: "accept-error-handler-errored",
/******/ 														moduleId: outdatedModuleId,
/******/ 														dependencyId: dependenciesForCallbacks[k],
/******/ 														error: err2,
/******/ 														originalError: err
/******/ 													});
/******/ 												}
/******/ 												if (!options.ignoreErrored) {
/******/ 													reportError(err2);
/******/ 													reportError(err);
/******/ 												}
/******/ 											}
/******/ 										} else {
/******/ 											if (options.onErrored) {
/******/ 												options.onErrored({
/******/ 													type: "accept-errored",
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k],
/******/ 													error: err
/******/ 												});
/******/ 											}
/******/ 											if (!options.ignoreErrored) {
/******/ 												reportError(err);
/******/ 											}
/******/ 										}
/******/ 									}
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// Load self accepted modules
/******/ 					for (var o = 0; o < outdatedSelfAcceptedModules.length; o++) {
/******/ 						var item = outdatedSelfAcceptedModules[o];
/******/ 						var moduleId = item.module;
/******/ 						try {
/******/ 							item.require(moduleId);
/******/ 						} catch (err) {
/******/ 							if (typeof item.errorHandler === "function") {
/******/ 								try {
/******/ 									item.errorHandler(err, {
/******/ 										moduleId: moduleId,
/******/ 										module: __webpack_require__.c[moduleId]
/******/ 									});
/******/ 								} catch (err1) {
/******/ 									if (options.onErrored) {
/******/ 										options.onErrored({
/******/ 											type: "self-accept-error-handler-errored",
/******/ 											moduleId: moduleId,
/******/ 											error: err1,
/******/ 											originalError: err
/******/ 										});
/******/ 									}
/******/ 									if (!options.ignoreErrored) {
/******/ 										reportError(err1);
/******/ 										reportError(err);
/******/ 									}
/******/ 								}
/******/ 							} else {
/******/ 								if (options.onErrored) {
/******/ 									options.onErrored({
/******/ 										type: "self-accept-errored",
/******/ 										moduleId: moduleId,
/******/ 										error: err
/******/ 									});
/******/ 								}
/******/ 								if (!options.ignoreErrored) {
/******/ 									reportError(err);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					return outdatedModules;
/******/ 				}
/******/ 			};
/******/ 		}
/******/ 		__webpack_require__.hmrI.jsonp = function (moduleId, applyHandlers) {
/******/ 			if (!currentUpdate) {
/******/ 				currentUpdate = {};
/******/ 				currentUpdateRuntime = [];
/******/ 				currentUpdateRemovedChunks = [];
/******/ 				applyHandlers.push(applyHandler);
/******/ 			}
/******/ 			if (!__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 				currentUpdate[moduleId] = __webpack_require__.m[moduleId];
/******/ 			}
/******/ 		};
/******/ 		__webpack_require__.hmrC.jsonp = function (
/******/ 			chunkIds,
/******/ 			removedChunks,
/******/ 			removedModules,
/******/ 			promises,
/******/ 			applyHandlers,
/******/ 			updatedModulesList
/******/ 		) {
/******/ 			applyHandlers.push(applyHandler);
/******/ 			currentUpdateChunks = {};
/******/ 			currentUpdateRemovedChunks = removedChunks;
/******/ 			currentUpdate = removedModules.reduce(function (obj, key) {
/******/ 				obj[key] = false;
/******/ 				return obj;
/******/ 			}, {});
/******/ 			currentUpdateRuntime = [];
/******/ 			chunkIds.forEach(function (chunkId) {
/******/ 				if (
/******/ 					__webpack_require__.o(installedChunks, chunkId) &&
/******/ 					installedChunks[chunkId] !== undefined
/******/ 				) {
/******/ 					promises.push(loadUpdateChunk(chunkId, updatedModulesList));
/******/ 					currentUpdateChunks[chunkId] = true;
/******/ 				} else {
/******/ 					currentUpdateChunks[chunkId] = false;
/******/ 				}
/******/ 			});
/******/ 			if (__webpack_require__.f) {
/******/ 				__webpack_require__.f.jsonpHmr = function (chunkId, promises) {
/******/ 					if (
/******/ 						currentUpdateChunks &&
/******/ 						__webpack_require__.o(currentUpdateChunks, chunkId) &&
/******/ 						!currentUpdateChunks[chunkId]
/******/ 					) {
/******/ 						promises.push(loadUpdateChunk(chunkId));
/******/ 						currentUpdateChunks[chunkId] = true;
/******/ 					}
/******/ 				};
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.hmrM = () => {
/******/ 			if (typeof fetch === "undefined") throw new Error("No browser support: need fetch API");
/******/ 			return fetch(__webpack_require__.p + __webpack_require__.hmrF()).then((response) => {
/******/ 				if(response.status === 404) return; // no update available
/******/ 				if(!response.ok) throw new Error("Failed to fetch update manifest " + response.statusText);
/******/ 				return response.json();
/******/ 			});
/******/ 		};
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	__webpack_require__("./node_modules/webpack-dev-server/client/index.js?protocol=ws%3A&hostname=0.0.0.0&port=8080&pathname=%2Fws&logging=info&overlay=true&reconnect=10&hot=true&live-reload=true");
/******/ 	__webpack_require__("./node_modules/webpack/hot/dev-server.js");
/******/ 	__webpack_require__("./app/index.js");
/******/ 	var __webpack_exports__ = __webpack_require__("./styles/index.scss");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LFNBQVM7TUFDVCxRQUFRO01BQ1IsU0FBUztNQUNULFNBQVM7TUFDVCxVQUFVO01BQ1YsUUFBUTtNQUNSLFNBQVM7TUFDVCxXQUFXO01BQ1gsWUFBWTtNQUNaLFNBQVM7TUFDVCxVQUFVO01BQ1YsU0FBUztNQUNULFVBQVU7TUFDVixVQUFVO01BQ1YsV0FBVztNQUNYLFVBQVU7TUFDVixXQUFXO01BQ1gsU0FBUztNQUNULFVBQVU7TUFDVixXQUFXO01BQ1gsWUFBWTtNQUNaLFVBQVU7TUFDVixXQUFXO01BQ1gsU0FBUztNQUNULFVBQVU7TUFDVixTQUFTO01BQ1QsVUFBVTtNQUNWLFVBQVU7TUFDVixXQUFXO01BQ1gsV0FBVztNQUNYLFlBQVk7TUFDWixXQUFXO01BQ1gsWUFBWTtNQUNaLFdBQVc7TUFDWCxZQUFZO01BQ1osV0FBVztNQUNYLFlBQVk7TUFDWixXQUFXO01BQ1gsWUFBWTtNQUNaLFdBQVc7TUFDWCxZQUFZO01BQ1osVUFBVTtNQUNWLFdBQVc7TUFDWCxXQUFXO01BQ1gsWUFBWTtNQUNaLFNBQVM7TUFDVCxVQUFVO01BQ1YsVUFBVTtNQUNWLFdBQVc7TUFDWCxVQUFVO01BQ1YsV0FBVztNQUNYLFdBQVc7TUFDWCxZQUFZO01BQ1osV0FBVztNQUNYLFlBQVk7TUFDWixXQUFXO01BQ1gsWUFBWTtNQUNaLFVBQVU7TUFDVixXQUFXO01BQ1gsU0FBUztNQUNULFVBQVU7TUFDVixXQUFXO01BQ1gsWUFBWTtNQUNaLFdBQVc7TUFDWCxZQUFZO01BQ1osVUFBVTtNQUNWLFdBQVc7TUFDWCxTQUFTO01BQ1QsVUFBVTtNQUNWLFFBQVE7TUFDUixTQUFTO01BQ1QsV0FBVztNQUNYLFlBQVk7TUFDWixXQUFXO01BQ1gsWUFBWTtNQUNaLFdBQVc7TUFDWCxZQUFZO01BQ1osVUFBVTtNQUNWLFdBQVc7TUFDWCxXQUFXO01BQ1gsWUFBWTtNQUNaLFNBQVM7TUFDVCxVQUFVO01BQ1YsVUFBVTtNQUNWLFdBQVc7TUFDWCxXQUFXO01BQ1gsWUFBWTtNQUNaLFdBQVc7TUFDWCxZQUFZO01BQ1osV0FBVztNQUNYLFlBQVk7TUFDWixVQUFVO01BQ1YsV0FBVztNQUNYLFNBQVM7TUFDVCxVQUFVO01BQ1YsV0FBVztNQUNYLFlBQVk7TUFDWixVQUFVO01BQ1YsV0FBVztNQUNYLFVBQVU7TUFDVixXQUFXO01BQ1gsV0FBVztNQUNYLFlBQVk7TUFDWixXQUFXO01BQ1gsWUFBWTtNQUNaLFVBQVU7TUFDVixXQUFXO01BQ1gsV0FBVztNQUNYLFlBQVk7TUFDWixTQUFTO01BQ1QsVUFBVTtNQUNWLFVBQVU7TUFDVixXQUFXO01BQ1gsVUFBVTtNQUNWLFdBQVc7TUFDWCxXQUFXO01BQ1gsWUFBWTtNQUNaLFdBQVc7TUFDWCxZQUFZO01BQ1osV0FBVztNQUNYLFlBQVk7TUFDWixVQUFVO01BQ1YsV0FBVztNQUNYLFNBQVM7TUFDVCxVQUFVO01BQ1YsV0FBVztNQUNYLFlBQVk7TUFDWixXQUFXO01BQ1gsWUFBWTtNQUNaLFVBQVU7TUFDVixXQUFXO01BQ1gsU0FBUztNQUNULFVBQVU7TUFDVixRQUFRO01BQ1IsU0FBUztNQUNULFdBQVc7TUFDWCxZQUFZO01BQ1osV0FBVztNQUNYLFlBQVk7TUFDWixXQUFXO01BQ1gsWUFBWTtNQUNaLFVBQVU7TUFDVixXQUFXO01BQ1gsV0FBVztNQUNYLFlBQVk7TUFDWixTQUFTO01BQ1QsVUFBVTtNQUNWLFdBQVc7TUFDWCxZQUFZO01BQ1osV0FBVztNQUNYLFlBQVk7TUFDWixXQUFXO01BQ1gsWUFBWTtNQUNaLFdBQVc7TUFDWCxZQUFZO01BQ1osVUFBVTtNQUNWLFdBQVc7TUFDWCxTQUFTO01BQ1QsVUFBVTtNQUNWLFdBQVc7TUFDWCxZQUFZO01BQ1osVUFBVTtNQUNWLFdBQVc7TUFDWCxTQUFTO01BQ1QsVUFBVTtNQUNWLFNBQVM7TUFDVCxVQUFVO01BQ1YsUUFBUTtNQUNSLFNBQVM7TUFDVCxPQUFPO01BQ1AsUUFBUTtNQUNSLE9BQU87TUFDUCxRQUFRO01BQ1IsV0FBVztNQUNYLFdBQVc7TUFDWCxZQUFZO01BQ1osWUFBWTtNQUNaLFVBQVU7TUFDVixVQUFVO01BQ1YsV0FBVztNQUNYLFVBQVU7TUFDVixVQUFVO01BQ1YsWUFBWTtNQUNaLFVBQVU7TUFDVixTQUFTO01BQ1QsU0FBUztNQUNULFNBQVM7TUFDVCxXQUFXO01BQ1gsV0FBVztNQUNYLFdBQVc7TUFDWCxXQUFXO01BQ1gsV0FBVztNQUNYLFdBQVc7TUFDWCxXQUFXO01BQ1gsV0FBVztNQUNYLFlBQVk7TUFDWixZQUFZO01BQ1osWUFBWTtNQUNaLFlBQVk7TUFDWixZQUFZO01BQ1osVUFBVTtNQUNWLFVBQVU7TUFDVixXQUFXO01BQ1gsVUFBVTtNQUNWLFdBQVc7TUFDWCxXQUFXO01BQ1gsYUFBYTtNQUNiLFVBQVU7TUFDVixTQUFTO01BQ1QsV0FBVztNQUNYLFVBQVU7TUFDVixXQUFXO01BQ1gsWUFBWTtNQUNaLFFBQVE7TUFDUixRQUFRO01BQ1IsUUFBUTtNQUNSLGFBQWE7TUFDYixRQUFRO01BQ1IsU0FBUztNQUNULFdBQVc7TUFDWCxTQUFTO01BQ1QsYUFBYTtNQUNiLFNBQVM7TUFDVCxTQUFTO01BQ1QsU0FBUztNQUNULFdBQVc7TUFDWCxXQUFXO01BQ1gsVUFBVTtNQUNWLFdBQVc7TUFDWCxXQUFXO01BQ1gsYUFBYTtNQUNiLFVBQVU7TUFDVixTQUFTO01BQ1QsV0FBVztNQUNYLFVBQVU7TUFDVixXQUFXO01BQ1gsWUFBWTtNQUNaLFFBQVE7TUFDUixRQUFRO01BQ1IsUUFBUTtNQUNSLGFBQWE7TUFDYixRQUFRO01BQ1IsU0FBUztNQUNULFlBQVk7TUFDWixXQUFXO01BQ1gsU0FBUztNQUNULGFBQWE7TUFDYixTQUFTO01BQ1QsU0FBUztNQUNULFNBQVM7TUFDVCxXQUFXO01BQ1gsY0FBYztNQUNkLFdBQVc7TUFDWCxTQUFTO01BQ1QsVUFBVTtNQUNWLFlBQVk7TUFDWixXQUFXO01BQ1gsV0FBVztNQUNYLFdBQVc7TUFDWCxXQUFXO01BQ1gsWUFBWTtNQUNaLFdBQVc7TUFDWCxVQUFVO01BQ1YsV0FBVztNQUNYLGFBQWE7TUFDYixVQUFVO01BQ1YsVUFBVTtNQUNWLFVBQVU7TUFDVixVQUFVO01BQ1YsVUFBVTtNQUNWLFdBQVc7TUFDWCxVQUFVO01BQ1YsVUFBVTtNQUNWLFVBQVU7TUFDVixVQUFVO01BQ1YsVUFBVTtNQUNWLFlBQVk7TUFDWixVQUFVO01BQ1YsV0FBVztNQUNYLFdBQVc7TUFDWCxXQUFXO01BQ1gsVUFBVTtNQUNWLFdBQVc7TUFDWCxRQUFRO01BQ1IsVUFBVTtNQUNWLFNBQVM7TUFDVCxXQUFXO01BQ1gsWUFBWTtNQUNaLFdBQVc7TUFDWCxVQUFVO01BQ1YsV0FBVztNQUNYLFNBQVM7TUFDVCxTQUFTO01BQ1QsUUFBUTtNQUNSLFNBQVM7TUFDVCxTQUFTO01BQ1QsU0FBUztNQUNULFlBQVk7TUFDWixTQUFTO01BQ1QsVUFBVTtNQUNWLFdBQVc7TUFDWCxRQUFRO01BQ1IsV0FBVztNQUNYLFFBQVE7TUFDUixRQUFRO01BQ1IsU0FBUztNQUNULFNBQVM7TUFDVCxVQUFVO01BQ1YsVUFBVTtNQUNWLFVBQVU7TUFDVixXQUFXO01BQ1gsWUFBWTtNQUNaLFVBQVU7TUFDVixVQUFVO01BQ1YsV0FBVztNQUNYLFdBQVc7TUFDWCxZQUFZO01BQ1osWUFBWTtNQUNaLFVBQVU7TUFDVixVQUFVO01BQ1YsU0FBUztNQUNULFlBQVk7TUFDWixXQUFXO01BQ1gsWUFBWTtNQUNaLFdBQVc7SUFBQTtJQUVmaEMsVUFBQSxFQUFjO01BQ1YsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01B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QUNaLGNBQWM7TUFDZCxXQUFXO01BQ1gsWUFBWTtNQUNaLFVBQVU7TUFDVixTQUFTO01BQ1QsVUFBVTtNQUNWLFdBQVc7TUFDWCxZQUFZO01BQ1osWUFBWTtNQUNaLFlBQVk7TUFDWixVQUFVO01BQ1YsV0FBVztNQUNYLFdBQVc7TUFDWCxjQUFjO01BQ2QsYUFBYTtNQUNiLFFBQVE7TUFDUixZQUFZO01BQ1osV0FBVztNQUNYLFFBQVE7TUFDUixTQUFTO01BQ1QsVUFBVTtNQUNWLFlBQVk7TUFDWixXQUFXO01BQ1gsU0FBUztNQUNULFlBQVk7TUFDWixXQUFXO01BQ1gsVUFBVTtNQUNWLFdBQVc7TUFDWCxZQUFZO01BQ1osY0FBYztNQUNkLFdBQVc7TUFDWCxTQUFTO01BQ1QsVUFBVTtNQUNWLFdBQVc7TUFDWCxXQUFXO01BQ1gsV0FBVztNQUNYLFlBQVk7TUFDWixXQUFXO01BQ1gsYUFBYTtNQUNiLFNBQVM7TUFDVCxVQUFVO01BQ1YsVUFBVTtNQUNWLFlBQVk7TUFDWixjQUFjO01BQ2QsV0FBVztNQUNYLFVBQVU7TUFDVixTQUFTO01BQ1QsWUFBWTtNQUNaLFdBQVc7TUFDWCxZQUFZO01BQ1osVUFBVTtNQUNWLGNBQWM7TUFDZCxtQkFBbUI7TUFDbkIsUUFBUTtNQUNSLFNBQVM7TUFDVCxXQUFXO01BQ1gsWUFBWTtNQUNaLFlBQVk7TUFDWixTQUFTO01BQ1QsWUFBWTtNQUNaLFVBQVU7TUFDVixXQUFXO01BQ1gsVUFBVTtNQUNWLFdBQVc7TUFDWCxVQUFVO01BQ1YsV0FBVztNQUNYLFdBQVc7TUFDWCxhQUFhO01BQ2IsYUFBYTtNQUNiLFdBQVc7TUFDWCxtQkFBbUI7TUFDbkIsWUFBWTtNQUNaLGNBQWM7TUFDZCxVQUFVO01BQ1YsV0FBVztNQUNYLFNBQVM7TUFDVCxVQUFVO01BQ1YsV0FBVztNQUNYLFlBQVk7TUFDWixTQUFTO01BQ1QsVUFBVTtNQUNWLFlBQVk7TUFDWixVQUFVO01BQ1YsWUFBWTtNQUNaLGVBQWU7TUFDZixVQUFVO01BQ1YsV0FBVztNQUNYLFlBQVk7TUFDWixXQUFXO01BQ1gs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VTtNQUNWLFlBQVk7TUFDWixZQUFZO01BQ1osV0FBVztNQUNYLFdBQVc7TUFDWCxVQUFVO01BQ1YsWUFBWTtNQUNaLFlBQVk7TUFDWixXQUFXO01BQ1gsVUFBVTtNQUNWLFlBQVk7TUFDWixXQUFXO01BQ1gsWUFBWTtNQUNaLFVBQVU7TUFDVixXQUFXO01BQ1gsU0FBUztNQUNULFFBQVE7TUFDUixTQUFTO01BQ1QsU0FBUztNQUNULFVBQVU7TUFDVixVQUFVO01BQ1YsVUFBVTtNQUNWLFVBQVU7TUFDVixTQUFTO01BQ1QsVUFBVTtNQUNWLFlBQVk7TUFDWixZQUFZO01BQ1osU0FBUztNQUNULFVBQVU7TUFDVixZQUFZO01BQ1osVUFBVTtNQUNWLFNBQVM7TUFDVCxVQUFVO01BQ1YsYUFBYTtNQUNiLFVBQVU7TUFDVixVQUFVO01BQ1YsU0FBUztNQUNULFVBQVU7SUFBQTtJQUVkaEMsVUFBQSxFQUFjO01BQ1YsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sTUFBTTtNQUNOLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLE1BQU07TUFDTixNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixNQUFNO01BQ04sS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsTUFBTTtNQUNOLE1BQU07TUFDTixLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sTUFBTTtNQUNOLEtBQUs7TUFDTCxNQUFNO01BQ04sTUFBTTtNQUNOLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxNQUFNO01BQ04sTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFNO01BQ04sTUFBTTtNQUNOLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMbUMsQ0FBQSxFQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLE1BQU07TUFDTixNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLE1BQU07TUFDTixNQUFNO01BQ04sTUFBTTtNQUNOLEtBQUs7TUFDTCxNQUFNO01BQ04sTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixNQUFNO01BQ04sTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sTUFBTTtNQUNOLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMQyxDQUFBLEVBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMQyxFQUFBLEVBQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxNQUFNO01BQ04sTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLE1BQU07TUFDTixNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsTUFBTTtNQUNOLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixNQUFNO01BQ04sTUFBTTtNQUNOLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxNQUFNO01BQ04sTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLE1BQU07TUFDTixNQUFNO01BQ04sS0FBSztNQUNMLE1BQU07TUFDTixNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixNQUFNO01BQ04sS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxNQUFNO01BQ04sTUFBTTtNQUNOLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLE1BQU07TUFDTixNQUFNO01BQ04sTUFBTTtNQUNOLE1BQU07TUFDTixLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsTUFBTTtNQUNOLE1BQU07TUFDTixNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO01BQ0wsS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sTUFBTTtNQUNOLE1BQU07TUFDTixNQUFNO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxNQUFNO01BQ04sTUFBTTtNQUNOLEtB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V0FDQTtXQUNBO1dBQ0EsV0FBVztXQUNYO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0EsbUJBQW1CLHdDQUF3QztXQUMzRDtXQUNBO1dBQ0E7V0FDQTtXQUNBLE1BQU07V0FDTjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsUUFBUTtXQUNSLFFBQVE7V0FDUjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxTQUFTO1dBQ1Q7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsT0FBTztXQUNQO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxRQUFRO1dBQ1I7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEVBQUUsSUFBSTtXQUNOO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxJQUFJO1dBQ0o7V0FDQTtXQUNBLEVBQUU7V0FDRjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQSxzQ0FBc0M7V0FDdEM7V0FDQTtXQUNBLEVBQUU7V0FDRjs7V0FFQTs7V0FFQTs7Ozs7VUUzZkE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mbG9lbWEvLi9ub2RlX21vZHVsZXMvYW5zaS1odG1sLWNvbW11bml0eS9pbmRleC5qcyIsIndlYnBhY2s6Ly9mbG9lbWEvLi9ub2RlX21vZHVsZXMvZXZlbnRzL2V2ZW50cy5qcyIsIndlYnBhY2s6Ly9mbG9lbWEvLi4vc3JjL2luZGV4LnRzIiwid2VicGFjazovL2Zsb2VtYS8uLi9zcmMvbmFtZWQtcmVmZXJlbmNlcy50cyIsIndlYnBhY2s6Ly9mbG9lbWEvLi4vc3JjL251bWVyaWMtdW5pY29kZS1tYXAudHMiLCJ3ZWJwYWNrOi8vZmxvZW1hLy4uL3NyYy9zdXJyb2dhdGUtcGFpcnMudHMiLCJ3ZWJwYWNrOi8vZmxvZW1hLy4vbm9kZV9tb2R1bGVzL21pbmktY3NzLWV4dHJhY3QtcGx1Z2luL2Rpc3QvaG1yL2hvdE1vZHVsZVJlcGxhY2VtZW50LmpzIiwid2VicGFjazovL2Zsb2VtYS8uL25vZGVfbW9kdWxlcy9taW5pLWNzcy1leHRyYWN0LXBsdWdpbi9kaXN0L2htci9ub3JtYWxpemUtdXJsLmpzIiwid2VicGFjazovL2Zsb2VtYS8uL25vZGVfbW9kdWxlcy93ZWJwYWNrLWRldi1zZXJ2ZXIvY2xpZW50L2NsaWVudHMvV2ViU29ja2V0Q2xpZW50LmpzIiwid2VicGFjazovL2Zsb2VtYS8uL25vZGVfbW9kdWxlcy93ZWJwYWNrLWRldi1zZXJ2ZXIvY2xpZW50L2luZGV4LmpzIiwid2VicGFjazovL2Zsb2VtYS8uL25vZGVfbW9kdWxlcy93ZWJwYWNrLWRldi1zZXJ2ZXIvY2xpZW50L21vZHVsZXMvbG9nZ2VyL2luZGV4LmpzIiwid2VicGFjazovL2Zsb2VtYS8uL25vZGVfbW9kdWxlcy93ZWJwYWNrLWRldi1zZXJ2ZXIvY2xpZW50L292ZXJsYXkuanMiLCJ3ZWJwYWNrOi8vZmxvZW1hLy4vbm9kZV9tb2R1bGVzL3dlYnBhY2stZGV2LXNlcnZlci9jbGllbnQvb3ZlcmxheS9mc20uanMiLCJ3ZWJwYWNrOi8vZmxvZW1hLy4vbm9kZV9tb2R1bGVzL3dlYnBhY2stZGV2LXNlcnZlci9jbGllbnQvb3ZlcmxheS9ydW50aW1lLWVycm9yLmpzIiwid2VicGFjazovL2Zsb2VtYS8uL25vZGVfbW9kdWxlcy93ZWJwYWNrLWRldi1zZXJ2ZXIvY2xpZW50L292ZXJsYXkvc3RhdGUtbWFjaGluZS5qcyIsIndlYnBhY2s6Ly9mbG9lbWEvLi9ub2RlX21vZHVsZXMvd2VicGFjay1kZXYtc2VydmVyL2NsaWVudC9vdmVybGF5L3N0eWxlcy5qcyIsIndlYnBhY2s6Ly9mbG9lbWEvLi9ub2RlX21vZHVsZXMvd2VicGFjay1kZXYtc2VydmVyL2NsaWVudC9wcm9ncmVzcy5qcyIsIndlYnBhY2s6Ly9mbG9lbWEvLi9ub2RlX21vZHVsZXMvd2VicGFjay1kZXYtc2VydmVyL2NsaWVudC9zb2NrZXQuanMiLCJ3ZWJwYWNrOi8vZmxvZW1hLy4vbm9kZV9tb2R1bGVzL3dlYnBhY2stZGV2LXNlcnZlci9jbGllbnQvdXRpbHMvY3JlYXRlU29ja2V0VVJMLmpzIiwid2VicGFjazovL2Zsb2VtYS8uL25vZGVfbW9kdWxlcy93ZWJwYWNrLWRldi1zZXJ2ZXIvY2xpZW50L3V0aWxzL2dldEN1cnJlbnRTY3JpcHRTb3VyY2UuanMiLCJ3ZWJwYWNrOi8vZmxvZW1hLy4vbm9kZV9tb2R1bGVzL3dlYnBhY2stZGV2LXNlcnZlci9jbGllbnQvdXRpbHMvbG9nLmpzIiwid2VicGFjazovL2Zsb2VtYS8uL25vZGVfbW9kdWxlcy93ZWJwYWNrLWRldi1zZXJ2ZXIvY2xpZW50L3V0aWxzL3BhcnNlVVJMLmpzIiwid2VicGFjazovL2Zsb2VtYS8uL25vZGVfbW9kdWxlcy93ZWJwYWNrLWRldi1zZXJ2ZXIvY2xpZW50L3V0aWxzL3JlbG9hZEFwcC5qcyIsIndlYnBhY2s6Ly9mbG9lbWEvLi9ub2RlX21vZHVsZXMvd2VicGFjay1kZXYtc2VydmVyL2NsaWVudC91dGlscy9zZW5kTWVzc2FnZS5qcyIsIndlYnBhY2s6Ly9mbG9lbWEvLi9ub2RlX21vZHVsZXMvd2VicGFjay1kZXYtc2VydmVyL2NsaWVudC91dGlscy9zdHJpcEFuc2kuanMiLCJ3ZWJwYWNrOi8vZmxvZW1hLy4vbm9kZV9tb2R1bGVzL3dlYnBhY2svaG90L2Rldi1zZXJ2ZXIuanMiLCJ3ZWJwYWNrOi8vZmxvZW1hLy4vbm9kZV9tb2R1bGVzL3dlYnBhY2svaG90L2VtaXR0ZXIuanMiLCJ3ZWJwYWNrOi8vZmxvZW1hLy4vbm9kZV9tb2R1bGVzL3dlYnBhY2svaG90L2xvZy1hcHBseS1yZXN1bHQuanMiLCJ3ZWJwYWNrOi8vZmxvZW1hLy4vbm9kZV9tb2R1bGVzL3dlYnBhY2svaG90L2xvZy5qcyIsIndlYnBhY2s6Ly9mbG9lbWEvLi9zdHlsZXMvaW5kZXguc2NzcyIsIndlYnBhY2s6Ly9mbG9lbWEvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZmxvZW1hL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2Zsb2VtYS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vZmxvZW1hL3dlYnBhY2svcnVudGltZS9nZXQgamF2YXNjcmlwdCB1cGRhdGUgY2h1bmsgZmlsZW5hbWUiLCJ3ZWJwYWNrOi8vZmxvZW1hL3dlYnBhY2svcnVudGltZS9nZXQgbWluaS1jc3MgY2h1bmsgZmlsZW5hbWUiLCJ3ZWJwYWNrOi8vZmxvZW1hL3dlYnBhY2svcnVudGltZS9nZXQgdXBkYXRlIG1hbmlmZXN0IGZpbGVuYW1lIiwid2VicGFjazovL2Zsb2VtYS93ZWJwYWNrL3J1bnRpbWUvZ2V0RnVsbEhhc2giLCJ3ZWJwYWNrOi8vZmxvZW1hL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vZmxvZW1hL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZmxvZW1hL3dlYnBhY2svcnVudGltZS9sb2FkIHNjcmlwdCIsIndlYnBhY2s6Ly9mbG9lbWEvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9mbG9lbWEvd2VicGFjay9ydW50aW1lL2hvdCBtb2R1bGUgcmVwbGFjZW1lbnQiLCJ3ZWJwYWNrOi8vZmxvZW1hL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL2Zsb2VtYS93ZWJwYWNrL3J1bnRpbWUvY3NzIGxvYWRpbmciLCJ3ZWJwYWNrOi8vZmxvZW1hL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL2Zsb2VtYS93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2Zsb2VtYS93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vZmxvZW1hL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcblxubW9kdWxlLmV4cG9ydHMgPSBhbnNpSFRNTFxuXG4vLyBSZWZlcmVuY2UgdG8gaHR0cHM6Ly9naXRodWIuY29tL3NpbmRyZXNvcmh1cy9hbnNpLXJlZ2V4XG52YXIgX3JlZ0FOU0kgPSAvKD86KD86XFx1MDAxYlxcWyl8XFx1MDA5YikoPzooPzpbMC05XXsxLDN9KT8oPzooPzo7WzAtOV17MCwzfSkqKT9bQS1NfGYtbV0pfFxcdTAwMWJbQS1NXS9cblxudmFyIF9kZWZDb2xvcnMgPSB7XG4gIHJlc2V0OiBbJ2ZmZicsICcwMDAnXSwgLy8gW0ZPUkVHUk9VRF9DT0xPUiwgQkFDS0dST1VORF9DT0xPUl1cbiAgYmxhY2s6ICcwMDAnLFxuICByZWQ6ICdmZjAwMDAnLFxuICBncmVlbjogJzIwOTgwNScsXG4gIHllbGxvdzogJ2U4YmYwMycsXG4gIGJsdWU6ICcwMDAwZmYnLFxuICBtYWdlbnRhOiAnZmYwMGZmJyxcbiAgY3lhbjogJzAwZmZlZScsXG4gIGxpZ2h0Z3JleTogJ2YwZjBmMCcsXG4gIGRhcmtncmV5OiAnODg4J1xufVxudmFyIF9zdHlsZXMgPSB7XG4gIDMwOiAnYmxhY2snLFxuICAzMTogJ3JlZCcsXG4gIDMyOiAnZ3JlZW4nLFxuICAzMzogJ3llbGxvdycsXG4gIDM0OiAnYmx1ZScsXG4gIDM1OiAnbWFnZW50YScsXG4gIDM2OiAnY3lhbicsXG4gIDM3OiAnbGlnaHRncmV5J1xufVxudmFyIF9vcGVuVGFncyA9IHtcbiAgJzEnOiAnZm9udC13ZWlnaHQ6Ym9sZCcsIC8vIGJvbGRcbiAgJzInOiAnb3BhY2l0eTowLjUnLCAvLyBkaW1cbiAgJzMnOiAnPGk+JywgLy8gaXRhbGljXG4gICc0JzogJzx1PicsIC8vIHVuZGVyc2NvcmVcbiAgJzgnOiAnZGlzcGxheTpub25lJywgLy8gaGlkZGVuXG4gICc5JzogJzxkZWw+JyAvLyBkZWxldGVcbn1cbnZhciBfY2xvc2VUYWdzID0ge1xuICAnMjMnOiAnPC9pPicsIC8vIHJlc2V0IGl0YWxpY1xuICAnMjQnOiAnPC91PicsIC8vIHJlc2V0IHVuZGVyc2NvcmVcbiAgJzI5JzogJzwvZGVsPicgLy8gcmVzZXQgZGVsZXRlXG59XG5cbjtbMCwgMjEsIDIyLCAyNywgMjgsIDM5LCA0OV0uZm9yRWFjaChmdW5jdGlvbiAobikge1xuICBfY2xvc2VUYWdzW25dID0gJzwvc3Bhbj4nXG59KVxuXG4vKipcbiAqIENvbnZlcnRzIHRleHQgd2l0aCBBTlNJIGNvbG9yIGNvZGVzIHRvIEhUTUwgbWFya3VwLlxuICogQHBhcmFtIHtTdHJpbmd9IHRleHRcbiAqIEByZXR1cm5zIHsqfVxuICovXG5mdW5jdGlvbiBhbnNpSFRNTCAodGV4dCkge1xuICAvLyBSZXR1cm5zIHRoZSB0ZXh0IGlmIHRoZSBzdHJpbmcgaGFzIG5vIEFOU0kgZXNjYXBlIGNvZGUuXG4gIGlmICghX3JlZ0FOU0kudGVzdCh0ZXh0KSkge1xuICAgIHJldHVybiB0ZXh0XG4gIH1cblxuICAvLyBDYWNoZSBvcGVuZWQgc2VxdWVuY2UuXG4gIHZhciBhbnNpQ29kZXMgPSBbXVxuICAvLyBSZXBsYWNlIHdpdGggbWFya3VwLlxuICB2YXIgcmV0ID0gdGV4dC5yZXBsYWNlKC9cXDAzM1xcWyhcXGQrKW0vZywgZnVuY3Rpb24gKG1hdGNoLCBzZXEpIHtcbiAgICB2YXIgb3QgPSBfb3BlblRhZ3Nbc2VxXVxuICAgIGlmIChvdCkge1xuICAgICAgLy8gSWYgY3VycmVudCBzZXF1ZW5jZSBoYXMgYmVlbiBvcGVuZWQsIGNsb3NlIGl0LlxuICAgICAgaWYgKCEhfmFuc2lDb2Rlcy5pbmRleE9mKHNlcSkpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1leHRyYS1ib29sZWFuLWNhc3RcbiAgICAgICAgYW5zaUNvZGVzLnBvcCgpXG4gICAgICAgIHJldHVybiAnPC9zcGFuPidcbiAgICAgIH1cbiAgICAgIC8vIE9wZW4gdGFnLlxuICAgICAgYW5zaUNvZGVzLnB1c2goc2VxKVxuICAgICAgcmV0dXJuIG90WzBdID09PSAnPCcgPyBvdCA6ICc8c3BhbiBzdHlsZT1cIicgKyBvdCArICc7XCI+J1xuICAgIH1cblxuICAgIHZhciBjdCA9IF9jbG9zZVRhZ3Nbc2VxXVxuICAgIGlmIChjdCkge1xuICAgICAgLy8gUG9wIHNlcXVlbmNlXG4gICAgICBhbnNpQ29kZXMucG9wKClcbiAgICAgIHJldHVybiBjdFxuICAgIH1cbiAgICByZXR1cm4gJydcbiAgfSlcblxuICAvLyBNYWtlIHN1cmUgdGFncyBhcmUgY2xvc2VkLlxuICB2YXIgbCA9IGFuc2lDb2Rlcy5sZW5ndGhcbiAgOyhsID4gMCkgJiYgKHJldCArPSBBcnJheShsICsgMSkuam9pbignPC9zcGFuPicpKVxuXG4gIHJldHVybiByZXRcbn1cblxuLyoqXG4gKiBDdXN0b21pemUgY29sb3JzLlxuICogQHBhcmFtIHtPYmplY3R9IGNvbG9ycyByZWZlcmVuY2UgdG8gX2RlZkNvbG9yc1xuICovXG5hbnNpSFRNTC5zZXRDb2xvcnMgPSBmdW5jdGlvbiAoY29sb3JzKSB7XG4gIGlmICh0eXBlb2YgY29sb3JzICE9PSAnb2JqZWN0Jykge1xuICAgIHRocm93IG5ldyBFcnJvcignYGNvbG9yc2AgcGFyYW1ldGVyIG11c3QgYmUgYW4gT2JqZWN0LicpXG4gIH1cblxuICB2YXIgX2ZpbmFsQ29sb3JzID0ge31cbiAgZm9yICh2YXIga2V5IGluIF9kZWZDb2xvcnMpIHtcbiAgICB2YXIgaGV4ID0gY29sb3JzLmhhc093blByb3BlcnR5KGtleSkgPyBjb2xvcnNba2V5XSA6IG51bGxcbiAgICBpZiAoIWhleCkge1xuICAgICAgX2ZpbmFsQ29sb3JzW2tleV0gPSBfZGVmQ29sb3JzW2tleV1cbiAgICAgIGNvbnRpbnVlXG4gICAgfVxuICAgIGlmICgncmVzZXQnID09PSBrZXkpIHtcbiAgICAgIGlmICh0eXBlb2YgaGV4ID09PSAnc3RyaW5nJykge1xuICAgICAgICBoZXggPSBbaGV4XVxuICAgICAgfVxuICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGhleCkgfHwgaGV4Lmxlbmd0aCA9PT0gMCB8fCBoZXguc29tZShmdW5jdGlvbiAoaCkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIGggIT09ICdzdHJpbmcnXG4gICAgICB9KSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSB2YWx1ZSBvZiBgJyArIGtleSArICdgIHByb3BlcnR5IG11c3QgYmUgYW4gQXJyYXkgYW5kIGVhY2ggaXRlbSBjb3VsZCBvbmx5IGJlIGEgaGV4IHN0cmluZywgZS5nLjogRkYwMDAwJylcbiAgICAgIH1cbiAgICAgIHZhciBkZWZIZXhDb2xvciA9IF9kZWZDb2xvcnNba2V5XVxuICAgICAgaWYgKCFoZXhbMF0pIHtcbiAgICAgICAgaGV4WzBdID0gZGVmSGV4Q29sb3JbMF1cbiAgICAgIH1cbiAgICAgIGlmIChoZXgubGVuZ3RoID09PSAxIHx8ICFoZXhbMV0pIHtcbiAgICAgICAgaGV4ID0gW2hleFswXV1cbiAgICAgICAgaGV4LnB1c2goZGVmSGV4Q29sb3JbMV0pXG4gICAgICB9XG5cbiAgICAgIGhleCA9IGhleC5zbGljZSgwLCAyKVxuICAgIH0gZWxzZSBpZiAodHlwZW9mIGhleCAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIHZhbHVlIG9mIGAnICsga2V5ICsgJ2AgcHJvcGVydHkgbXVzdCBiZSBhIGhleCBzdHJpbmcsIGUuZy46IEZGMDAwMCcpXG4gICAgfVxuICAgIF9maW5hbENvbG9yc1trZXldID0gaGV4XG4gIH1cbiAgX3NldFRhZ3MoX2ZpbmFsQ29sb3JzKVxufVxuXG4vKipcbiAqIFJlc2V0IGNvbG9ycy5cbiAqL1xuYW5zaUhUTUwucmVzZXQgPSBmdW5jdGlvbiAoKSB7XG4gIF9zZXRUYWdzKF9kZWZDb2xvcnMpXG59XG5cbi8qKlxuICogRXhwb3NlIHRhZ3MsIGluY2x1ZGluZyBvcGVuIGFuZCBjbG9zZS5cbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbmFuc2lIVE1MLnRhZ3MgPSB7fVxuXG5pZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShhbnNpSFRNTC50YWdzLCAnb3BlbicsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIF9vcGVuVGFncyB9XG4gIH0pXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShhbnNpSFRNTC50YWdzLCAnY2xvc2UnLCB7XG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBfY2xvc2VUYWdzIH1cbiAgfSlcbn0gZWxzZSB7XG4gIGFuc2lIVE1MLnRhZ3Mub3BlbiA9IF9vcGVuVGFnc1xuICBhbnNpSFRNTC50YWdzLmNsb3NlID0gX2Nsb3NlVGFnc1xufVxuXG5mdW5jdGlvbiBfc2V0VGFncyAoY29sb3JzKSB7XG4gIC8vIHJlc2V0IGFsbFxuICBfb3BlblRhZ3NbJzAnXSA9ICdmb250LXdlaWdodDpub3JtYWw7b3BhY2l0eToxO2NvbG9yOiMnICsgY29sb3JzLnJlc2V0WzBdICsgJztiYWNrZ3JvdW5kOiMnICsgY29sb3JzLnJlc2V0WzFdXG4gIC8vIGludmVyc2VcbiAgX29wZW5UYWdzWyc3J10gPSAnY29sb3I6IycgKyBjb2xvcnMucmVzZXRbMV0gKyAnO2JhY2tncm91bmQ6IycgKyBjb2xvcnMucmVzZXRbMF1cbiAgLy8gZGFyayBncmV5XG4gIF9vcGVuVGFnc1snOTAnXSA9ICdjb2xvcjojJyArIGNvbG9ycy5kYXJrZ3JleVxuXG4gIGZvciAodmFyIGNvZGUgaW4gX3N0eWxlcykge1xuICAgIHZhciBjb2xvciA9IF9zdHlsZXNbY29kZV1cbiAgICB2YXIgb3JpQ29sb3IgPSBjb2xvcnNbY29sb3JdIHx8ICcwMDAnXG4gICAgX29wZW5UYWdzW2NvZGVdID0gJ2NvbG9yOiMnICsgb3JpQ29sb3JcbiAgICBjb2RlID0gcGFyc2VJbnQoY29kZSlcbiAgICBfb3BlblRhZ3NbKGNvZGUgKyAxMCkudG9TdHJpbmcoKV0gPSAnYmFja2dyb3VuZDojJyArIG9yaUNvbG9yXG4gIH1cbn1cblxuYW5zaUhUTUwucmVzZXQoKVxuIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFIgPSB0eXBlb2YgUmVmbGVjdCA9PT0gJ29iamVjdCcgPyBSZWZsZWN0IDogbnVsbFxudmFyIFJlZmxlY3RBcHBseSA9IFIgJiYgdHlwZW9mIFIuYXBwbHkgPT09ICdmdW5jdGlvbidcbiAgPyBSLmFwcGx5XG4gIDogZnVuY3Rpb24gUmVmbGVjdEFwcGx5KHRhcmdldCwgcmVjZWl2ZXIsIGFyZ3MpIHtcbiAgICByZXR1cm4gRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5LmNhbGwodGFyZ2V0LCByZWNlaXZlciwgYXJncyk7XG4gIH1cblxudmFyIFJlZmxlY3RPd25LZXlzXG5pZiAoUiAmJiB0eXBlb2YgUi5vd25LZXlzID09PSAnZnVuY3Rpb24nKSB7XG4gIFJlZmxlY3RPd25LZXlzID0gUi5vd25LZXlzXG59IGVsc2UgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcbiAgUmVmbGVjdE93bktleXMgPSBmdW5jdGlvbiBSZWZsZWN0T3duS2V5cyh0YXJnZXQpIHtcbiAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGFyZ2V0KVxuICAgICAgLmNvbmNhdChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHRhcmdldCkpO1xuICB9O1xufSBlbHNlIHtcbiAgUmVmbGVjdE93bktleXMgPSBmdW5jdGlvbiBSZWZsZWN0T3duS2V5cyh0YXJnZXQpIHtcbiAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGFyZ2V0KTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gUHJvY2Vzc0VtaXRXYXJuaW5nKHdhcm5pbmcpIHtcbiAgaWYgKGNvbnNvbGUgJiYgY29uc29sZS53YXJuKSBjb25zb2xlLndhcm4od2FybmluZyk7XG59XG5cbnZhciBOdW1iZXJJc05hTiA9IE51bWJlci5pc05hTiB8fCBmdW5jdGlvbiBOdW1iZXJJc05hTih2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT09IHZhbHVlO1xufVxuXG5mdW5jdGlvbiBFdmVudEVtaXR0ZXIoKSB7XG4gIEV2ZW50RW1pdHRlci5pbml0LmNhbGwodGhpcyk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50RW1pdHRlcjtcbm1vZHVsZS5leHBvcnRzLm9uY2UgPSBvbmNlO1xuXG4vLyBCYWNrd2FyZHMtY29tcGF0IHdpdGggbm9kZSAwLjEwLnhcbkV2ZW50RW1pdHRlci5FdmVudEVtaXR0ZXIgPSBFdmVudEVtaXR0ZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX2V2ZW50c0NvdW50ID0gMDtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX21heExpc3RlbmVycyA9IHVuZGVmaW5lZDtcblxuLy8gQnkgZGVmYXVsdCBFdmVudEVtaXR0ZXJzIHdpbGwgcHJpbnQgYSB3YXJuaW5nIGlmIG1vcmUgdGhhbiAxMCBsaXN0ZW5lcnMgYXJlXG4vLyBhZGRlZCB0byBpdC4gVGhpcyBpcyBhIHVzZWZ1bCBkZWZhdWx0IHdoaWNoIGhlbHBzIGZpbmRpbmcgbWVtb3J5IGxlYWtzLlxudmFyIGRlZmF1bHRNYXhMaXN0ZW5lcnMgPSAxMDtcblxuZnVuY3Rpb24gY2hlY2tMaXN0ZW5lcihsaXN0ZW5lcikge1xuICBpZiAodHlwZW9mIGxpc3RlbmVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIFwibGlzdGVuZXJcIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgRnVuY3Rpb24uIFJlY2VpdmVkIHR5cGUgJyArIHR5cGVvZiBsaXN0ZW5lcik7XG4gIH1cbn1cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KEV2ZW50RW1pdHRlciwgJ2RlZmF1bHRNYXhMaXN0ZW5lcnMnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGRlZmF1bHRNYXhMaXN0ZW5lcnM7XG4gIH0sXG4gIHNldDogZnVuY3Rpb24oYXJnKSB7XG4gICAgaWYgKHR5cGVvZiBhcmcgIT09ICdudW1iZXInIHx8IGFyZyA8IDAgfHwgTnVtYmVySXNOYU4oYXJnKSkge1xuICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RoZSB2YWx1ZSBvZiBcImRlZmF1bHRNYXhMaXN0ZW5lcnNcIiBpcyBvdXQgb2YgcmFuZ2UuIEl0IG11c3QgYmUgYSBub24tbmVnYXRpdmUgbnVtYmVyLiBSZWNlaXZlZCAnICsgYXJnICsgJy4nKTtcbiAgICB9XG4gICAgZGVmYXVsdE1heExpc3RlbmVycyA9IGFyZztcbiAgfVxufSk7XG5cbkV2ZW50RW1pdHRlci5pbml0ID0gZnVuY3Rpb24oKSB7XG5cbiAgaWYgKHRoaXMuX2V2ZW50cyA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICB0aGlzLl9ldmVudHMgPT09IE9iamVjdC5nZXRQcm90b3R5cGVPZih0aGlzKS5fZXZlbnRzKSB7XG4gICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gIH1cblxuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSB0aGlzLl9tYXhMaXN0ZW5lcnMgfHwgdW5kZWZpbmVkO1xufTtcblxuLy8gT2J2aW91c2x5IG5vdCBhbGwgRW1pdHRlcnMgc2hvdWxkIGJlIGxpbWl0ZWQgdG8gMTAuIFRoaXMgZnVuY3Rpb24gYWxsb3dzXG4vLyB0aGF0IHRvIGJlIGluY3JlYXNlZC4gU2V0IHRvIHplcm8gZm9yIHVubGltaXRlZC5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuc2V0TWF4TGlzdGVuZXJzID0gZnVuY3Rpb24gc2V0TWF4TGlzdGVuZXJzKG4pIHtcbiAgaWYgKHR5cGVvZiBuICE9PSAnbnVtYmVyJyB8fCBuIDwgMCB8fCBOdW1iZXJJc05hTihuKSkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdUaGUgdmFsdWUgb2YgXCJuXCIgaXMgb3V0IG9mIHJhbmdlLiBJdCBtdXN0IGJlIGEgbm9uLW5lZ2F0aXZlIG51bWJlci4gUmVjZWl2ZWQgJyArIG4gKyAnLicpO1xuICB9XG4gIHRoaXMuX21heExpc3RlbmVycyA9IG47XG4gIHJldHVybiB0aGlzO1xufTtcblxuZnVuY3Rpb24gX2dldE1heExpc3RlbmVycyh0aGF0KSB7XG4gIGlmICh0aGF0Ll9tYXhMaXN0ZW5lcnMgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnM7XG4gIHJldHVybiB0aGF0Ll9tYXhMaXN0ZW5lcnM7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZ2V0TWF4TGlzdGVuZXJzID0gZnVuY3Rpb24gZ2V0TWF4TGlzdGVuZXJzKCkge1xuICByZXR1cm4gX2dldE1heExpc3RlbmVycyh0aGlzKTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uIGVtaXQodHlwZSkge1xuICB2YXIgYXJncyA9IFtdO1xuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgYXJncy5wdXNoKGFyZ3VtZW50c1tpXSk7XG4gIHZhciBkb0Vycm9yID0gKHR5cGUgPT09ICdlcnJvcicpO1xuXG4gIHZhciBldmVudHMgPSB0aGlzLl9ldmVudHM7XG4gIGlmIChldmVudHMgIT09IHVuZGVmaW5lZClcbiAgICBkb0Vycm9yID0gKGRvRXJyb3IgJiYgZXZlbnRzLmVycm9yID09PSB1bmRlZmluZWQpO1xuICBlbHNlIGlmICghZG9FcnJvcilcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgLy8gSWYgdGhlcmUgaXMgbm8gJ2Vycm9yJyBldmVudCBsaXN0ZW5lciB0aGVuIHRocm93LlxuICBpZiAoZG9FcnJvcikge1xuICAgIHZhciBlcjtcbiAgICBpZiAoYXJncy5sZW5ndGggPiAwKVxuICAgICAgZXIgPSBhcmdzWzBdO1xuICAgIGlmIChlciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAvLyBOb3RlOiBUaGUgY29tbWVudHMgb24gdGhlIGB0aHJvd2AgbGluZXMgYXJlIGludGVudGlvbmFsLCB0aGV5IHNob3dcbiAgICAgIC8vIHVwIGluIE5vZGUncyBvdXRwdXQgaWYgdGhpcyByZXN1bHRzIGluIGFuIHVuaGFuZGxlZCBleGNlcHRpb24uXG4gICAgICB0aHJvdyBlcjsgLy8gVW5oYW5kbGVkICdlcnJvcicgZXZlbnRcbiAgICB9XG4gICAgLy8gQXQgbGVhc3QgZ2l2ZSBzb21lIGtpbmQgb2YgY29udGV4dCB0byB0aGUgdXNlclxuICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoJ1VuaGFuZGxlZCBlcnJvci4nICsgKGVyID8gJyAoJyArIGVyLm1lc3NhZ2UgKyAnKScgOiAnJykpO1xuICAgIGVyci5jb250ZXh0ID0gZXI7XG4gICAgdGhyb3cgZXJyOyAvLyBVbmhhbmRsZWQgJ2Vycm9yJyBldmVudFxuICB9XG5cbiAgdmFyIGhhbmRsZXIgPSBldmVudHNbdHlwZV07XG5cbiAgaWYgKGhhbmRsZXIgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKHR5cGVvZiBoYW5kbGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgUmVmbGVjdEFwcGx5KGhhbmRsZXIsIHRoaXMsIGFyZ3MpO1xuICB9IGVsc2Uge1xuICAgIHZhciBsZW4gPSBoYW5kbGVyLmxlbmd0aDtcbiAgICB2YXIgbGlzdGVuZXJzID0gYXJyYXlDbG9uZShoYW5kbGVyLCBsZW4pO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyArK2kpXG4gICAgICBSZWZsZWN0QXBwbHkobGlzdGVuZXJzW2ldLCB0aGlzLCBhcmdzKTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufTtcblxuZnVuY3Rpb24gX2FkZExpc3RlbmVyKHRhcmdldCwgdHlwZSwgbGlzdGVuZXIsIHByZXBlbmQpIHtcbiAgdmFyIG07XG4gIHZhciBldmVudHM7XG4gIHZhciBleGlzdGluZztcblxuICBjaGVja0xpc3RlbmVyKGxpc3RlbmVyKTtcblxuICBldmVudHMgPSB0YXJnZXQuX2V2ZW50cztcbiAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIHRhcmdldC5fZXZlbnRzQ291bnQgPSAwO1xuICB9IGVsc2Uge1xuICAgIC8vIFRvIGF2b2lkIHJlY3Vyc2lvbiBpbiB0aGUgY2FzZSB0aGF0IHR5cGUgPT09IFwibmV3TGlzdGVuZXJcIiEgQmVmb3JlXG4gICAgLy8gYWRkaW5nIGl0IHRvIHRoZSBsaXN0ZW5lcnMsIGZpcnN0IGVtaXQgXCJuZXdMaXN0ZW5lclwiLlxuICAgIGlmIChldmVudHMubmV3TGlzdGVuZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGFyZ2V0LmVtaXQoJ25ld0xpc3RlbmVyJywgdHlwZSxcbiAgICAgICAgICAgICAgICAgIGxpc3RlbmVyLmxpc3RlbmVyID8gbGlzdGVuZXIubGlzdGVuZXIgOiBsaXN0ZW5lcik7XG5cbiAgICAgIC8vIFJlLWFzc2lnbiBgZXZlbnRzYCBiZWNhdXNlIGEgbmV3TGlzdGVuZXIgaGFuZGxlciBjb3VsZCBoYXZlIGNhdXNlZCB0aGVcbiAgICAgIC8vIHRoaXMuX2V2ZW50cyB0byBiZSBhc3NpZ25lZCB0byBhIG5ldyBvYmplY3RcbiAgICAgIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzO1xuICAgIH1cbiAgICBleGlzdGluZyA9IGV2ZW50c1t0eXBlXTtcbiAgfVxuXG4gIGlmIChleGlzdGluZyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgLy8gT3B0aW1pemUgdGhlIGNhc2Ugb2Ygb25lIGxpc3RlbmVyLiBEb24ndCBuZWVkIHRoZSBleHRyYSBhcnJheSBvYmplY3QuXG4gICAgZXhpc3RpbmcgPSBldmVudHNbdHlwZV0gPSBsaXN0ZW5lcjtcbiAgICArK3RhcmdldC5fZXZlbnRzQ291bnQ7XG4gIH0gZWxzZSB7XG4gICAgaWYgKHR5cGVvZiBleGlzdGluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgLy8gQWRkaW5nIHRoZSBzZWNvbmQgZWxlbWVudCwgbmVlZCB0byBjaGFuZ2UgdG8gYXJyYXkuXG4gICAgICBleGlzdGluZyA9IGV2ZW50c1t0eXBlXSA9XG4gICAgICAgIHByZXBlbmQgPyBbbGlzdGVuZXIsIGV4aXN0aW5nXSA6IFtleGlzdGluZywgbGlzdGVuZXJdO1xuICAgICAgLy8gSWYgd2UndmUgYWxyZWFkeSBnb3QgYW4gYXJyYXksIGp1c3QgYXBwZW5kLlxuICAgIH0gZWxzZSBpZiAocHJlcGVuZCkge1xuICAgICAgZXhpc3RpbmcudW5zaGlmdChsaXN0ZW5lcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV4aXN0aW5nLnB1c2gobGlzdGVuZXIpO1xuICAgIH1cblxuICAgIC8vIENoZWNrIGZvciBsaXN0ZW5lciBsZWFrXG4gICAgbSA9IF9nZXRNYXhMaXN0ZW5lcnModGFyZ2V0KTtcbiAgICBpZiAobSA+IDAgJiYgZXhpc3RpbmcubGVuZ3RoID4gbSAmJiAhZXhpc3Rpbmcud2FybmVkKSB7XG4gICAgICBleGlzdGluZy53YXJuZWQgPSB0cnVlO1xuICAgICAgLy8gTm8gZXJyb3IgY29kZSBmb3IgdGhpcyBzaW5jZSBpdCBpcyBhIFdhcm5pbmdcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuICAgICAgdmFyIHcgPSBuZXcgRXJyb3IoJ1Bvc3NpYmxlIEV2ZW50RW1pdHRlciBtZW1vcnkgbGVhayBkZXRlY3RlZC4gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGV4aXN0aW5nLmxlbmd0aCArICcgJyArIFN0cmluZyh0eXBlKSArICcgbGlzdGVuZXJzICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAnYWRkZWQuIFVzZSBlbWl0dGVyLnNldE1heExpc3RlbmVycygpIHRvICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAnaW5jcmVhc2UgbGltaXQnKTtcbiAgICAgIHcubmFtZSA9ICdNYXhMaXN0ZW5lcnNFeGNlZWRlZFdhcm5pbmcnO1xuICAgICAgdy5lbWl0dGVyID0gdGFyZ2V0O1xuICAgICAgdy50eXBlID0gdHlwZTtcbiAgICAgIHcuY291bnQgPSBleGlzdGluZy5sZW5ndGg7XG4gICAgICBQcm9jZXNzRW1pdFdhcm5pbmcodyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IGZ1bmN0aW9uIGFkZExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gIHJldHVybiBfYWRkTGlzdGVuZXIodGhpcywgdHlwZSwgbGlzdGVuZXIsIGZhbHNlKTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub24gPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnByZXBlbmRMaXN0ZW5lciA9XG4gICAgZnVuY3Rpb24gcHJlcGVuZExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICByZXR1cm4gX2FkZExpc3RlbmVyKHRoaXMsIHR5cGUsIGxpc3RlbmVyLCB0cnVlKTtcbiAgICB9O1xuXG5mdW5jdGlvbiBvbmNlV3JhcHBlcigpIHtcbiAgaWYgKCF0aGlzLmZpcmVkKSB7XG4gICAgdGhpcy50YXJnZXQucmVtb3ZlTGlzdGVuZXIodGhpcy50eXBlLCB0aGlzLndyYXBGbik7XG4gICAgdGhpcy5maXJlZCA9IHRydWU7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApXG4gICAgICByZXR1cm4gdGhpcy5saXN0ZW5lci5jYWxsKHRoaXMudGFyZ2V0KTtcbiAgICByZXR1cm4gdGhpcy5saXN0ZW5lci5hcHBseSh0aGlzLnRhcmdldCwgYXJndW1lbnRzKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfb25jZVdyYXAodGFyZ2V0LCB0eXBlLCBsaXN0ZW5lcikge1xuICB2YXIgc3RhdGUgPSB7IGZpcmVkOiBmYWxzZSwgd3JhcEZuOiB1bmRlZmluZWQsIHRhcmdldDogdGFyZ2V0LCB0eXBlOiB0eXBlLCBsaXN0ZW5lcjogbGlzdGVuZXIgfTtcbiAgdmFyIHdyYXBwZWQgPSBvbmNlV3JhcHBlci5iaW5kKHN0YXRlKTtcbiAgd3JhcHBlZC5saXN0ZW5lciA9IGxpc3RlbmVyO1xuICBzdGF0ZS53cmFwRm4gPSB3cmFwcGVkO1xuICByZXR1cm4gd3JhcHBlZDtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24gb25jZSh0eXBlLCBsaXN0ZW5lcikge1xuICBjaGVja0xpc3RlbmVyKGxpc3RlbmVyKTtcbiAgdGhpcy5vbih0eXBlLCBfb25jZVdyYXAodGhpcywgdHlwZSwgbGlzdGVuZXIpKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnByZXBlbmRPbmNlTGlzdGVuZXIgPVxuICAgIGZ1bmN0aW9uIHByZXBlbmRPbmNlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpO1xuICAgICAgdGhpcy5wcmVwZW5kTGlzdGVuZXIodHlwZSwgX29uY2VXcmFwKHRoaXMsIHR5cGUsIGxpc3RlbmVyKSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4vLyBFbWl0cyBhICdyZW1vdmVMaXN0ZW5lcicgZXZlbnQgaWYgYW5kIG9ubHkgaWYgdGhlIGxpc3RlbmVyIHdhcyByZW1vdmVkLlxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9XG4gICAgZnVuY3Rpb24gcmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgIHZhciBsaXN0LCBldmVudHMsIHBvc2l0aW9uLCBpLCBvcmlnaW5hbExpc3RlbmVyO1xuXG4gICAgICBjaGVja0xpc3RlbmVyKGxpc3RlbmVyKTtcblxuICAgICAgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuICAgICAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgbGlzdCA9IGV2ZW50c1t0eXBlXTtcbiAgICAgIGlmIChsaXN0ID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICBpZiAobGlzdCA9PT0gbGlzdGVuZXIgfHwgbGlzdC5saXN0ZW5lciA9PT0gbGlzdGVuZXIpIHtcbiAgICAgICAgaWYgKC0tdGhpcy5fZXZlbnRzQ291bnQgPT09IDApXG4gICAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgZGVsZXRlIGV2ZW50c1t0eXBlXTtcbiAgICAgICAgICBpZiAoZXZlbnRzLnJlbW92ZUxpc3RlbmVyKVxuICAgICAgICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIGxpc3QubGlzdGVuZXIgfHwgbGlzdGVuZXIpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBsaXN0ICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHBvc2l0aW9uID0gLTE7XG5cbiAgICAgICAgZm9yIChpID0gbGlzdC5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgIGlmIChsaXN0W2ldID09PSBsaXN0ZW5lciB8fCBsaXN0W2ldLmxpc3RlbmVyID09PSBsaXN0ZW5lcikge1xuICAgICAgICAgICAgb3JpZ2luYWxMaXN0ZW5lciA9IGxpc3RbaV0ubGlzdGVuZXI7XG4gICAgICAgICAgICBwb3NpdGlvbiA9IGk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocG9zaXRpb24gPCAwKVxuICAgICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICAgIGlmIChwb3NpdGlvbiA9PT0gMClcbiAgICAgICAgICBsaXN0LnNoaWZ0KCk7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHNwbGljZU9uZShsaXN0LCBwb3NpdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobGlzdC5sZW5ndGggPT09IDEpXG4gICAgICAgICAgZXZlbnRzW3R5cGVdID0gbGlzdFswXTtcblxuICAgICAgICBpZiAoZXZlbnRzLnJlbW92ZUxpc3RlbmVyICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIG9yaWdpbmFsTGlzdGVuZXIgfHwgbGlzdGVuZXIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9mZiA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzID1cbiAgICBmdW5jdGlvbiByZW1vdmVBbGxMaXN0ZW5lcnModHlwZSkge1xuICAgICAgdmFyIGxpc3RlbmVycywgZXZlbnRzLCBpO1xuXG4gICAgICBldmVudHMgPSB0aGlzLl9ldmVudHM7XG4gICAgICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICAvLyBub3QgbGlzdGVuaW5nIGZvciByZW1vdmVMaXN0ZW5lciwgbm8gbmVlZCB0byBlbWl0XG4gICAgICBpZiAoZXZlbnRzLnJlbW92ZUxpc3RlbmVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICAgIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbiAgICAgICAgfSBlbHNlIGlmIChldmVudHNbdHlwZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGlmICgtLXRoaXMuX2V2ZW50c0NvdW50ID09PSAwKVxuICAgICAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICBkZWxldGUgZXZlbnRzW3R5cGVdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICAvLyBlbWl0IHJlbW92ZUxpc3RlbmVyIGZvciBhbGwgbGlzdGVuZXJzIG9uIGFsbCBldmVudHNcbiAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMoZXZlbnRzKTtcbiAgICAgICAgdmFyIGtleTtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICBrZXkgPSBrZXlzW2ldO1xuICAgICAgICAgIGlmIChrZXkgPT09ICdyZW1vdmVMaXN0ZW5lcicpIGNvbnRpbnVlO1xuICAgICAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKGtleSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoJ3JlbW92ZUxpc3RlbmVyJyk7XG4gICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIGxpc3RlbmVycyA9IGV2ZW50c1t0eXBlXTtcblxuICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lcnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnMpO1xuICAgICAgfSBlbHNlIGlmIChsaXN0ZW5lcnMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAvLyBMSUZPIG9yZGVyXG4gICAgICAgIGZvciAoaSA9IGxpc3RlbmVycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzW2ldKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG5mdW5jdGlvbiBfbGlzdGVuZXJzKHRhcmdldCwgdHlwZSwgdW53cmFwKSB7XG4gIHZhciBldmVudHMgPSB0YXJnZXQuX2V2ZW50cztcblxuICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIFtdO1xuXG4gIHZhciBldmxpc3RlbmVyID0gZXZlbnRzW3R5cGVdO1xuICBpZiAoZXZsaXN0ZW5lciA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBbXTtcblxuICBpZiAodHlwZW9mIGV2bGlzdGVuZXIgPT09ICdmdW5jdGlvbicpXG4gICAgcmV0dXJuIHVud3JhcCA/IFtldmxpc3RlbmVyLmxpc3RlbmVyIHx8IGV2bGlzdGVuZXJdIDogW2V2bGlzdGVuZXJdO1xuXG4gIHJldHVybiB1bndyYXAgP1xuICAgIHVud3JhcExpc3RlbmVycyhldmxpc3RlbmVyKSA6IGFycmF5Q2xvbmUoZXZsaXN0ZW5lciwgZXZsaXN0ZW5lci5sZW5ndGgpO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uIGxpc3RlbmVycyh0eXBlKSB7XG4gIHJldHVybiBfbGlzdGVuZXJzKHRoaXMsIHR5cGUsIHRydWUpO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yYXdMaXN0ZW5lcnMgPSBmdW5jdGlvbiByYXdMaXN0ZW5lcnModHlwZSkge1xuICByZXR1cm4gX2xpc3RlbmVycyh0aGlzLCB0eXBlLCBmYWxzZSk7XG59O1xuXG5FdmVudEVtaXR0ZXIubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uKGVtaXR0ZXIsIHR5cGUpIHtcbiAgaWYgKHR5cGVvZiBlbWl0dGVyLmxpc3RlbmVyQ291bnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gZW1pdHRlci5saXN0ZW5lckNvdW50KHR5cGUpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBsaXN0ZW5lckNvdW50LmNhbGwoZW1pdHRlciwgdHlwZSk7XG4gIH1cbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJDb3VudCA9IGxpc3RlbmVyQ291bnQ7XG5mdW5jdGlvbiBsaXN0ZW5lckNvdW50KHR5cGUpIHtcbiAgdmFyIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcblxuICBpZiAoZXZlbnRzICE9PSB1bmRlZmluZWQpIHtcbiAgICB2YXIgZXZsaXN0ZW5lciA9IGV2ZW50c1t0eXBlXTtcblxuICAgIGlmICh0eXBlb2YgZXZsaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIDE7XG4gICAgfSBlbHNlIGlmIChldmxpc3RlbmVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBldmxpc3RlbmVyLmxlbmd0aDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gMDtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5ldmVudE5hbWVzID0gZnVuY3Rpb24gZXZlbnROYW1lcygpIHtcbiAgcmV0dXJuIHRoaXMuX2V2ZW50c0NvdW50ID4gMCA/IFJlZmxlY3RPd25LZXlzKHRoaXMuX2V2ZW50cykgOiBbXTtcbn07XG5cbmZ1bmN0aW9uIGFycmF5Q2xvbmUoYXJyLCBuKSB7XG4gIHZhciBjb3B5ID0gbmV3IEFycmF5KG4pO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IG47ICsraSlcbiAgICBjb3B5W2ldID0gYXJyW2ldO1xuICByZXR1cm4gY29weTtcbn1cblxuZnVuY3Rpb24gc3BsaWNlT25lKGxpc3QsIGluZGV4KSB7XG4gIGZvciAoOyBpbmRleCArIDEgPCBsaXN0Lmxlbmd0aDsgaW5kZXgrKylcbiAgICBsaXN0W2luZGV4XSA9IGxpc3RbaW5kZXggKyAxXTtcbiAgbGlzdC5wb3AoKTtcbn1cblxuZnVuY3Rpb24gdW53cmFwTGlzdGVuZXJzKGFycikge1xuICB2YXIgcmV0ID0gbmV3IEFycmF5KGFyci5sZW5ndGgpO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHJldC5sZW5ndGg7ICsraSkge1xuICAgIHJldFtpXSA9IGFycltpXS5saXN0ZW5lciB8fCBhcnJbaV07XG4gIH1cbiAgcmV0dXJuIHJldDtcbn1cblxuZnVuY3Rpb24gb25jZShlbWl0dGVyLCBuYW1lKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgZnVuY3Rpb24gZXJyb3JMaXN0ZW5lcihlcnIpIHtcbiAgICAgIGVtaXR0ZXIucmVtb3ZlTGlzdGVuZXIobmFtZSwgcmVzb2x2ZXIpO1xuICAgICAgcmVqZWN0KGVycik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVzb2x2ZXIoKSB7XG4gICAgICBpZiAodHlwZW9mIGVtaXR0ZXIucmVtb3ZlTGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgZW1pdHRlci5yZW1vdmVMaXN0ZW5lcignZXJyb3InLCBlcnJvckxpc3RlbmVyKTtcbiAgICAgIH1cbiAgICAgIHJlc29sdmUoW10uc2xpY2UuY2FsbChhcmd1bWVudHMpKTtcbiAgICB9O1xuXG4gICAgZXZlbnRUYXJnZXRBZ25vc3RpY0FkZExpc3RlbmVyKGVtaXR0ZXIsIG5hbWUsIHJlc29sdmVyLCB7IG9uY2U6IHRydWUgfSk7XG4gICAgaWYgKG5hbWUgIT09ICdlcnJvcicpIHtcbiAgICAgIGFkZEVycm9ySGFuZGxlcklmRXZlbnRFbWl0dGVyKGVtaXR0ZXIsIGVycm9yTGlzdGVuZXIsIHsgb25jZTogdHJ1ZSB9KTtcbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBhZGRFcnJvckhhbmRsZXJJZkV2ZW50RW1pdHRlcihlbWl0dGVyLCBoYW5kbGVyLCBmbGFncykge1xuICBpZiAodHlwZW9mIGVtaXR0ZXIub24gPT09ICdmdW5jdGlvbicpIHtcbiAgICBldmVudFRhcmdldEFnbm9zdGljQWRkTGlzdGVuZXIoZW1pdHRlciwgJ2Vycm9yJywgaGFuZGxlciwgZmxhZ3MpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGV2ZW50VGFyZ2V0QWdub3N0aWNBZGRMaXN0ZW5lcihlbWl0dGVyLCBuYW1lLCBsaXN0ZW5lciwgZmxhZ3MpIHtcbiAgaWYgKHR5cGVvZiBlbWl0dGVyLm9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgaWYgKGZsYWdzLm9uY2UpIHtcbiAgICAgIGVtaXR0ZXIub25jZShuYW1lLCBsaXN0ZW5lcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVtaXR0ZXIub24obmFtZSwgbGlzdGVuZXIpO1xuICAgIH1cbiAgfSBlbHNlIGlmICh0eXBlb2YgZW1pdHRlci5hZGRFdmVudExpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgLy8gRXZlbnRUYXJnZXQgZG9lcyBub3QgaGF2ZSBgZXJyb3JgIGV2ZW50IHNlbWFudGljcyBsaWtlIE5vZGVcbiAgICAvLyBFdmVudEVtaXR0ZXJzLCB3ZSBkbyBub3QgbGlzdGVuIGZvciBgZXJyb3JgIGV2ZW50cyBoZXJlLlxuICAgIGVtaXR0ZXIuYWRkRXZlbnRMaXN0ZW5lcihuYW1lLCBmdW5jdGlvbiB3cmFwTGlzdGVuZXIoYXJnKSB7XG4gICAgICAvLyBJRSBkb2VzIG5vdCBoYXZlIGJ1aWx0aW4gYHsgb25jZTogdHJ1ZSB9YCBzdXBwb3J0IHNvIHdlXG4gICAgICAvLyBoYXZlIHRvIGRvIGl0IG1hbnVhbGx5LlxuICAgICAgaWYgKGZsYWdzLm9uY2UpIHtcbiAgICAgICAgZW1pdHRlci5yZW1vdmVFdmVudExpc3RlbmVyKG5hbWUsIHdyYXBMaXN0ZW5lcik7XG4gICAgICB9XG4gICAgICBsaXN0ZW5lcihhcmcpO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBcImVtaXR0ZXJcIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgRXZlbnRFbWl0dGVyLiBSZWNlaXZlZCB0eXBlICcgKyB0eXBlb2YgZW1pdHRlcik7XG4gIH1cbn1cbiIsbnVsbCxudWxsLG51bGwsbnVsbCwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGVzbGludC1lbnYgYnJvd3NlciAqL1xuLypcbiAgZXNsaW50LWRpc2FibGVcbiAgbm8tY29uc29sZSxcbiAgZnVuYy1uYW1lc1xuKi9cblxuLyoqIEB0eXBlZGVmIHthbnl9IFRPRE8gKi9cblxudmFyIG5vcm1hbGl6ZVVybCA9IHJlcXVpcmUoXCIuL25vcm1hbGl6ZS11cmxcIik7XG52YXIgc3JjQnlNb2R1bGVJZCA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG52YXIgbm9Eb2N1bWVudCA9IHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIjtcbnZhciBmb3JFYWNoID0gQXJyYXkucHJvdG90eXBlLmZvckVhY2g7XG5cbi8qKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gZm5cbiAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lXG4gKiBAcmV0dXJucyB7KGZ1bmN0aW9uKCk6IHZvaWQpfCp9XG4gKi9cbmZ1bmN0aW9uIGRlYm91bmNlKGZuLCB0aW1lKSB7XG4gIHZhciB0aW1lb3V0ID0gMDtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBwcmVmZXItcmVzdC1wYXJhbXNcbiAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcbiAgICB2YXIgZnVuY3Rpb25DYWxsID0gZnVuY3Rpb24gZnVuY3Rpb25DYWxsKCkge1xuICAgICAgcmV0dXJuIGZuLmFwcGx5KHNlbGYsIGFyZ3MpO1xuICAgIH07XG4gICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uQ2FsbCwgdGltZSk7XG4gIH07XG59XG5mdW5jdGlvbiBub29wKCkge31cblxuLyoqXG4gKiBAcGFyYW0ge1RPRE99IG1vZHVsZUlkXG4gKiBAcmV0dXJucyB7VE9ET31cbiAqL1xuZnVuY3Rpb24gZ2V0Q3VycmVudFNjcmlwdFVybChtb2R1bGVJZCkge1xuICB2YXIgc3JjID0gc3JjQnlNb2R1bGVJZFttb2R1bGVJZF07XG4gIGlmICghc3JjKSB7XG4gICAgaWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpIHtcbiAgICAgIHNyYyA9ICggLyoqIEB0eXBlIHtIVE1MU2NyaXB0RWxlbWVudH0gKi9kb2N1bWVudC5jdXJyZW50U2NyaXB0KS5zcmM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG4gICAgICB2YXIgbGFzdFNjcmlwdFRhZyA9IHNjcmlwdHNbc2NyaXB0cy5sZW5ndGggLSAxXTtcbiAgICAgIGlmIChsYXN0U2NyaXB0VGFnKSB7XG4gICAgICAgIHNyYyA9IGxhc3RTY3JpcHRUYWcuc3JjO1xuICAgICAgfVxuICAgIH1cbiAgICBzcmNCeU1vZHVsZUlkW21vZHVsZUlkXSA9IHNyYztcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZmlsZU1hcFxuICAgKiBAcmV0dXJucyB7bnVsbCB8IHN0cmluZ1tdfVxuICAgKi9cbiAgcmV0dXJuIGZ1bmN0aW9uIChmaWxlTWFwKSB7XG4gICAgaWYgKCFzcmMpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICB2YXIgc3BsaXRSZXN1bHQgPSBzcmMuc3BsaXQoLyhbXlxcXFwvXSspXFwuanMkLyk7XG4gICAgdmFyIGZpbGVuYW1lID0gc3BsaXRSZXN1bHQgJiYgc3BsaXRSZXN1bHRbMV07XG4gICAgaWYgKCFmaWxlbmFtZSkge1xuICAgICAgcmV0dXJuIFtzcmMucmVwbGFjZShcIi5qc1wiLCBcIi5jc3NcIildO1xuICAgIH1cbiAgICBpZiAoIWZpbGVNYXApIHtcbiAgICAgIHJldHVybiBbc3JjLnJlcGxhY2UoXCIuanNcIiwgXCIuY3NzXCIpXTtcbiAgICB9XG4gICAgcmV0dXJuIGZpbGVNYXAuc3BsaXQoXCIsXCIpLm1hcChmdW5jdGlvbiAobWFwUnVsZSkge1xuICAgICAgdmFyIHJlZyA9IG5ldyBSZWdFeHAoXCJcIi5jb25jYXQoZmlsZW5hbWUsIFwiXFxcXC5qcyRcIiksIFwiZ1wiKTtcbiAgICAgIHJldHVybiBub3JtYWxpemVVcmwoc3JjLnJlcGxhY2UocmVnLCBcIlwiLmNvbmNhdChtYXBSdWxlLnJlcGxhY2UoL3tmaWxlTmFtZX0vZywgZmlsZW5hbWUpLCBcIi5jc3NcIikpKTtcbiAgICB9KTtcbiAgfTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge1RPRE99IGVsXG4gKiBAcGFyYW0ge3N0cmluZ30gW3VybF1cbiAqL1xuZnVuY3Rpb24gdXBkYXRlQ3NzKGVsLCB1cmwpIHtcbiAgaWYgKCF1cmwpIHtcbiAgICBpZiAoIWVsLmhyZWYpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgICB1cmwgPSBlbC5ocmVmLnNwbGl0KFwiP1wiKVswXTtcbiAgfVxuICBpZiAoIWlzVXJsUmVxdWVzdCggLyoqIEB0eXBlIHtzdHJpbmd9ICovdXJsKSkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoZWwuaXNMb2FkZWQgPT09IGZhbHNlKSB7XG4gICAgLy8gV2Ugc2VlbSB0byBiZSBhYm91dCB0byByZXBsYWNlIGEgY3NzIGxpbmsgdGhhdCBoYXNuJ3QgbG9hZGVkIHlldC5cbiAgICAvLyBXZSdyZSBwcm9iYWJseSBjaGFuZ2luZyB0aGUgc2FtZSBmaWxlIG1vcmUgdGhhbiBvbmNlLlxuICAgIHJldHVybjtcbiAgfVxuICBpZiAoIXVybCB8fCAhKHVybC5pbmRleE9mKFwiLmNzc1wiKSA+IC0xKSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICBlbC52aXNpdGVkID0gdHJ1ZTtcbiAgdmFyIG5ld0VsID0gZWwuY2xvbmVOb2RlKCk7XG4gIG5ld0VsLmlzTG9hZGVkID0gZmFsc2U7XG4gIG5ld0VsLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGZ1bmN0aW9uICgpIHtcbiAgICBpZiAobmV3RWwuaXNMb2FkZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbmV3RWwuaXNMb2FkZWQgPSB0cnVlO1xuICAgIGVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWwpO1xuICB9KTtcbiAgbmV3RWwuYWRkRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsIGZ1bmN0aW9uICgpIHtcbiAgICBpZiAobmV3RWwuaXNMb2FkZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbmV3RWwuaXNMb2FkZWQgPSB0cnVlO1xuICAgIGVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWwpO1xuICB9KTtcbiAgbmV3RWwuaHJlZiA9IFwiXCIuY29uY2F0KHVybCwgXCI/XCIpLmNvbmNhdChEYXRlLm5vdygpKTtcbiAgaWYgKGVsLm5leHRTaWJsaW5nKSB7XG4gICAgZWwucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUobmV3RWwsIGVsLm5leHRTaWJsaW5nKTtcbiAgfSBlbHNlIHtcbiAgICBlbC5wYXJlbnROb2RlLmFwcGVuZENoaWxkKG5ld0VsKTtcbiAgfVxufVxuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSBocmVmXG4gKiBAcGFyYW0ge1RPRE99IHNyY1xuICogQHJldHVybnMge1RPRE99XG4gKi9cbmZ1bmN0aW9uIGdldFJlbG9hZFVybChocmVmLCBzcmMpIHtcbiAgdmFyIHJldDtcblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgaHJlZiA9IG5vcm1hbGl6ZVVybChocmVmKTtcbiAgc3JjLnNvbWUoXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsXG4gICAqL1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgYXJyYXktY2FsbGJhY2stcmV0dXJuXG4gIGZ1bmN0aW9uICh1cmwpIHtcbiAgICBpZiAoaHJlZi5pbmRleE9mKHNyYykgPiAtMSkge1xuICAgICAgcmV0ID0gdXJsO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiByZXQ7XG59XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IFtzcmNdXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gcmVsb2FkU3R5bGUoc3JjKSB7XG4gIGlmICghc3JjKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBlbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJsaW5rXCIpO1xuICB2YXIgbG9hZGVkID0gZmFsc2U7XG4gIGZvckVhY2guY2FsbChlbGVtZW50cywgZnVuY3Rpb24gKGVsKSB7XG4gICAgaWYgKCFlbC5ocmVmKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB1cmwgPSBnZXRSZWxvYWRVcmwoZWwuaHJlZiwgc3JjKTtcbiAgICBpZiAoIWlzVXJsUmVxdWVzdCh1cmwpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChlbC52aXNpdGVkID09PSB0cnVlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh1cmwpIHtcbiAgICAgIHVwZGF0ZUNzcyhlbCwgdXJsKTtcbiAgICAgIGxvYWRlZCA9IHRydWU7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGxvYWRlZDtcbn1cbmZ1bmN0aW9uIHJlbG9hZEFsbCgpIHtcbiAgdmFyIGVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcImxpbmtcIik7XG4gIGZvckVhY2guY2FsbChlbGVtZW50cywgZnVuY3Rpb24gKGVsKSB7XG4gICAgaWYgKGVsLnZpc2l0ZWQgPT09IHRydWUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdXBkYXRlQ3NzKGVsKTtcbiAgfSk7XG59XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybFxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGlzVXJsUmVxdWVzdCh1cmwpIHtcbiAgLy8gQW4gVVJMIGlzIG5vdCBhbiByZXF1ZXN0IGlmXG5cbiAgLy8gSXQgaXMgbm90IGh0dHAgb3IgaHR0cHNcbiAgaWYgKCEvXlthLXpBLVpdW2EtekEtWlxcZCtcXC0uXSo6Ly50ZXN0KHVybCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbi8qKlxuICogQHBhcmFtIHtUT0RPfSBtb2R1bGVJZFxuICogQHBhcmFtIHtUT0RPfSBvcHRpb25zXG4gKiBAcmV0dXJucyB7VE9ET31cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobW9kdWxlSWQsIG9wdGlvbnMpIHtcbiAgaWYgKG5vRG9jdW1lbnQpIHtcbiAgICBjb25zb2xlLmxvZyhcIm5vIHdpbmRvdy5kb2N1bWVudCBmb3VuZCwgd2lsbCBub3QgSE1SIENTU1wiKTtcbiAgICByZXR1cm4gbm9vcDtcbiAgfVxuICB2YXIgZ2V0U2NyaXB0U3JjID0gZ2V0Q3VycmVudFNjcmlwdFVybChtb2R1bGVJZCk7XG4gIGZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICB2YXIgc3JjID0gZ2V0U2NyaXB0U3JjKG9wdGlvbnMuZmlsZW5hbWUpO1xuICAgIHZhciByZWxvYWRlZCA9IHJlbG9hZFN0eWxlKHNyYyk7XG4gICAgaWYgKG9wdGlvbnMubG9jYWxzKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIltITVJdIERldGVjdGVkIGxvY2FsIGNzcyBtb2R1bGVzLiBSZWxvYWQgYWxsIGNzc1wiKTtcbiAgICAgIHJlbG9hZEFsbCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAocmVsb2FkZWQpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiW0hNUl0gY3NzIHJlbG9hZCAlc1wiLCBzcmMuam9pbihcIiBcIikpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZyhcIltITVJdIFJlbG9hZCBhbGwgY3NzXCIpO1xuICAgICAgcmVsb2FkQWxsKCk7XG4gICAgfVxuICB9XG4gIHJldHVybiBkZWJvdW5jZSh1cGRhdGUsIDUwKTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGVzbGludC1kaXNhYmxlICovXG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmdbXX0gcGF0aENvbXBvbmVudHNcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIG5vcm1hbGl6ZVVybChwYXRoQ29tcG9uZW50cykge1xuICByZXR1cm4gcGF0aENvbXBvbmVudHMucmVkdWNlKGZ1bmN0aW9uIChhY2N1bXVsYXRvciwgaXRlbSkge1xuICAgIHN3aXRjaCAoaXRlbSkge1xuICAgICAgY2FzZSBcIi4uXCI6XG4gICAgICAgIGFjY3VtdWxhdG9yLnBvcCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCIuXCI6XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYWNjdW11bGF0b3IucHVzaChpdGVtKTtcbiAgICB9XG4gICAgcmV0dXJuIGFjY3VtdWxhdG9yO1xuICB9LCAvKiogQHR5cGUge3N0cmluZ1tdfSAqL1tdKS5qb2luKFwiL1wiKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsU3RyaW5nXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1cmxTdHJpbmcpIHtcbiAgdXJsU3RyaW5nID0gdXJsU3RyaW5nLnRyaW0oKTtcbiAgaWYgKC9eZGF0YTovaS50ZXN0KHVybFN0cmluZykpIHtcbiAgICByZXR1cm4gdXJsU3RyaW5nO1xuICB9XG4gIHZhciBwcm90b2NvbCA9IHVybFN0cmluZy5pbmRleE9mKFwiLy9cIikgIT09IC0xID8gdXJsU3RyaW5nLnNwbGl0KFwiLy9cIilbMF0gKyBcIi8vXCIgOiBcIlwiO1xuICB2YXIgY29tcG9uZW50cyA9IHVybFN0cmluZy5yZXBsYWNlKG5ldyBSZWdFeHAocHJvdG9jb2wsIFwiaVwiKSwgXCJcIikuc3BsaXQoXCIvXCIpO1xuICB2YXIgaG9zdCA9IGNvbXBvbmVudHNbMF0udG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9cXC4kLywgXCJcIik7XG4gIGNvbXBvbmVudHNbMF0gPSBcIlwiO1xuICB2YXIgcGF0aCA9IG5vcm1hbGl6ZVVybChjb21wb25lbnRzKTtcbiAgcmV0dXJuIHByb3RvY29sICsgaG9zdCArIHBhdGg7XG59OyIsImZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhhLCBuKSB7IGlmICghKGEgaW5zdGFuY2VvZiBuKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfVxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXMoZSwgcikgeyBmb3IgKHZhciB0ID0gMDsgdCA8IHIubGVuZ3RoOyB0KyspIHsgdmFyIG8gPSByW3RdOyBvLmVudW1lcmFibGUgPSBvLmVudW1lcmFibGUgfHwgITEsIG8uY29uZmlndXJhYmxlID0gITAsIFwidmFsdWVcIiBpbiBvICYmIChvLndyaXRhYmxlID0gITApLCBPYmplY3QuZGVmaW5lUHJvcGVydHkoZSwgX3RvUHJvcGVydHlLZXkoby5rZXkpLCBvKTsgfSB9XG5mdW5jdGlvbiBfY3JlYXRlQ2xhc3MoZSwgciwgdCkgeyByZXR1cm4gciAmJiBfZGVmaW5lUHJvcGVydGllcyhlLnByb3RvdHlwZSwgciksIHQgJiYgX2RlZmluZVByb3BlcnRpZXMoZSwgdCksIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLCBcInByb3RvdHlwZVwiLCB7IHdyaXRhYmxlOiAhMSB9KSwgZTsgfVxuZnVuY3Rpb24gX3RvUHJvcGVydHlLZXkodCkgeyB2YXIgaSA9IF90b1ByaW1pdGl2ZSh0LCBcInN0cmluZ1wiKTsgcmV0dXJuIFwic3ltYm9sXCIgPT0gdHlwZW9mIGkgPyBpIDogaSArIFwiXCI7IH1cbmZ1bmN0aW9uIF90b1ByaW1pdGl2ZSh0LCByKSB7IGlmIChcIm9iamVjdFwiICE9IHR5cGVvZiB0IHx8ICF0KSByZXR1cm4gdDsgdmFyIGUgPSB0W1N5bWJvbC50b1ByaW1pdGl2ZV07IGlmICh2b2lkIDAgIT09IGUpIHsgdmFyIGkgPSBlLmNhbGwodCwgciB8fCBcImRlZmF1bHRcIik7IGlmIChcIm9iamVjdFwiICE9IHR5cGVvZiBpKSByZXR1cm4gaTsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkBAdG9QcmltaXRpdmUgbXVzdCByZXR1cm4gYSBwcmltaXRpdmUgdmFsdWUuXCIpOyB9IHJldHVybiAoXCJzdHJpbmdcIiA9PT0gciA/IFN0cmluZyA6IE51bWJlcikodCk7IH1cbmltcG9ydCB7IGxvZyB9IGZyb20gXCIuLi91dGlscy9sb2cuanNcIjtcbnZhciBXZWJTb2NrZXRDbGllbnQgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IHVybFxuICAgKi9cbiAgZnVuY3Rpb24gV2ViU29ja2V0Q2xpZW50KHVybCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBXZWJTb2NrZXRDbGllbnQpO1xuICAgIHRoaXMuY2xpZW50ID0gbmV3IFdlYlNvY2tldCh1cmwpO1xuICAgIHRoaXMuY2xpZW50Lm9uZXJyb3IgPSBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgIGxvZy5lcnJvcihlcnJvcik7XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZH0gZlxuICAgKi9cbiAgcmV0dXJuIF9jcmVhdGVDbGFzcyhXZWJTb2NrZXRDbGllbnQsIFt7XG4gICAga2V5OiBcIm9uT3BlblwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvbk9wZW4oZikge1xuICAgICAgdGhpcy5jbGllbnQub25vcGVuID0gZjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0geyguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZH0gZlxuICAgICAqL1xuICB9LCB7XG4gICAga2V5OiBcIm9uQ2xvc2VcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gb25DbG9zZShmKSB7XG4gICAgICB0aGlzLmNsaWVudC5vbmNsb3NlID0gZjtcbiAgICB9XG5cbiAgICAvLyBjYWxsIGYgd2l0aCB0aGUgbWVzc2FnZSBzdHJpbmcgYXMgdGhlIGZpcnN0IGFyZ3VtZW50XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHsoLi4uYXJnczogYW55W10pID0+IHZvaWR9IGZcbiAgICAgKi9cbiAgfSwge1xuICAgIGtleTogXCJvbk1lc3NhZ2VcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gb25NZXNzYWdlKGYpIHtcbiAgICAgIHRoaXMuY2xpZW50Lm9ubWVzc2FnZSA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGYoZS5kYXRhKTtcbiAgICAgIH07XG4gICAgfVxuICB9XSk7XG59KCk7XG5leHBvcnQgeyBXZWJTb2NrZXRDbGllbnQgYXMgZGVmYXVsdCB9OyIsImZ1bmN0aW9uIG93bktleXMoZSwgcikgeyB2YXIgdCA9IE9iamVjdC5rZXlzKGUpOyBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykgeyB2YXIgbyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoZSk7IHIgJiYgKG8gPSBvLmZpbHRlcihmdW5jdGlvbiAocikgeyByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihlLCByKS5lbnVtZXJhYmxlOyB9KSksIHQucHVzaC5hcHBseSh0LCBvKTsgfSByZXR1cm4gdDsgfVxuZnVuY3Rpb24gX29iamVjdFNwcmVhZChlKSB7IGZvciAodmFyIHIgPSAxOyByIDwgYXJndW1lbnRzLmxlbmd0aDsgcisrKSB7IHZhciB0ID0gbnVsbCAhPSBhcmd1bWVudHNbcl0gPyBhcmd1bWVudHNbcl0gOiB7fTsgciAlIDIgPyBvd25LZXlzKE9iamVjdCh0KSwgITApLmZvckVhY2goZnVuY3Rpb24gKHIpIHsgX2RlZmluZVByb3BlcnR5KGUsIHIsIHRbcl0pOyB9KSA6IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzID8gT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoZSwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnModCkpIDogb3duS2V5cyhPYmplY3QodCkpLmZvckVhY2goZnVuY3Rpb24gKHIpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGUsIHIsIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodCwgcikpOyB9KTsgfSByZXR1cm4gZTsgfVxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KGUsIHIsIHQpIHsgcmV0dXJuIChyID0gX3RvUHJvcGVydHlLZXkocikpIGluIGUgPyBPYmplY3QuZGVmaW5lUHJvcGVydHkoZSwgciwgeyB2YWx1ZTogdCwgZW51bWVyYWJsZTogITAsIGNvbmZpZ3VyYWJsZTogITAsIHdyaXRhYmxlOiAhMCB9KSA6IGVbcl0gPSB0LCBlOyB9XG5mdW5jdGlvbiBfdG9Qcm9wZXJ0eUtleSh0KSB7IHZhciBpID0gX3RvUHJpbWl0aXZlKHQsIFwic3RyaW5nXCIpOyByZXR1cm4gXCJzeW1ib2xcIiA9PSB0eXBlb2YgaSA/IGkgOiBpICsgXCJcIjsgfVxuZnVuY3Rpb24gX3RvUHJpbWl0aXZlKHQsIHIpIHsgaWYgKFwib2JqZWN0XCIgIT0gdHlwZW9mIHQgfHwgIXQpIHJldHVybiB0OyB2YXIgZSA9IHRbU3ltYm9sLnRvUHJpbWl0aXZlXTsgaWYgKHZvaWQgMCAhPT0gZSkgeyB2YXIgaSA9IGUuY2FsbCh0LCByIHx8IFwiZGVmYXVsdFwiKTsgaWYgKFwib2JqZWN0XCIgIT0gdHlwZW9mIGkpIHJldHVybiBpOyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQEB0b1ByaW1pdGl2ZSBtdXN0IHJldHVybiBhIHByaW1pdGl2ZSB2YWx1ZS5cIik7IH0gcmV0dXJuIChcInN0cmluZ1wiID09PSByID8gU3RyaW5nIDogTnVtYmVyKSh0KTsgfVxuLyogZ2xvYmFsIF9fcmVzb3VyY2VRdWVyeSwgX193ZWJwYWNrX2hhc2hfXyAqL1xuLy8vIDxyZWZlcmVuY2UgdHlwZXM9XCJ3ZWJwYWNrL21vZHVsZVwiIC8+XG5pbXBvcnQgd2VicGFja0hvdExvZyBmcm9tIFwid2VicGFjay9ob3QvbG9nLmpzXCI7XG5pbXBvcnQgc3RyaXBBbnNpIGZyb20gXCIuL3V0aWxzL3N0cmlwQW5zaS5qc1wiO1xuaW1wb3J0IHBhcnNlVVJMIGZyb20gXCIuL3V0aWxzL3BhcnNlVVJMLmpzXCI7XG5pbXBvcnQgc29ja2V0IGZyb20gXCIuL3NvY2tldC5qc1wiO1xuaW1wb3J0IHsgZm9ybWF0UHJvYmxlbSwgY3JlYXRlT3ZlcmxheSB9IGZyb20gXCIuL292ZXJsYXkuanNcIjtcbmltcG9ydCB7IGxvZywgbG9nRW5hYmxlZEZlYXR1cmVzLCBzZXRMb2dMZXZlbCB9IGZyb20gXCIuL3V0aWxzL2xvZy5qc1wiO1xuaW1wb3J0IHNlbmRNZXNzYWdlIGZyb20gXCIuL3V0aWxzL3NlbmRNZXNzYWdlLmpzXCI7XG5pbXBvcnQgcmVsb2FkQXBwIGZyb20gXCIuL3V0aWxzL3JlbG9hZEFwcC5qc1wiO1xuaW1wb3J0IGNyZWF0ZVNvY2tldFVSTCBmcm9tIFwiLi91dGlscy9jcmVhdGVTb2NrZXRVUkwuanNcIjtcbmltcG9ydCB7IGlzUHJvZ3Jlc3NTdXBwb3J0ZWQsIGRlZmluZVByb2dyZXNzRWxlbWVudCB9IGZyb20gXCIuL3Byb2dyZXNzLmpzXCI7XG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gT3ZlcmxheU9wdGlvbnNcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbiB8IChlcnJvcjogRXJyb3IpID0+IGJvb2xlYW59IFt3YXJuaW5nc11cbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbiB8IChlcnJvcjogRXJyb3IpID0+IGJvb2xlYW59IFtlcnJvcnNdXG4gKiBAcHJvcGVydHkge2Jvb2xlYW4gfCAoZXJyb3I6IEVycm9yKSA9PiBib29sZWFufSBbcnVudGltZUVycm9yc11cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBbdHJ1c3RlZFR5cGVzUG9saWN5TmFtZV1cbiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IE9wdGlvbnNcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gaG90XG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IGxpdmVSZWxvYWRcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gcHJvZ3Jlc3NcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbiB8IE92ZXJsYXlPcHRpb25zfSBvdmVybGF5XG4gKiBAcHJvcGVydHkge3N0cmluZ30gW2xvZ2dpbmddXG4gKiBAcHJvcGVydHkge251bWJlcn0gW3JlY29ubmVjdF1cbiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IFN0YXR1c1xuICogQHByb3BlcnR5IHtib29sZWFufSBpc1VubG9hZGluZ1xuICogQHByb3BlcnR5IHtzdHJpbmd9IGN1cnJlbnRIYXNoXG4gKiBAcHJvcGVydHkge3N0cmluZ30gW3ByZXZpb3VzSGFzaF1cbiAqL1xuXG4vKipcbiAqIEBwYXJhbSB7Ym9vbGVhbiB8IHsgd2FybmluZ3M/OiBib29sZWFuIHwgc3RyaW5nOyBlcnJvcnM/OiBib29sZWFuIHwgc3RyaW5nOyBydW50aW1lRXJyb3JzPzogYm9vbGVhbiB8IHN0cmluZzsgfX0gb3ZlcmxheU9wdGlvbnNcbiAqL1xudmFyIGRlY29kZU92ZXJsYXlPcHRpb25zID0gZnVuY3Rpb24gZGVjb2RlT3ZlcmxheU9wdGlvbnMob3ZlcmxheU9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBvdmVybGF5T3B0aW9ucyA9PT0gXCJvYmplY3RcIikge1xuICAgIFtcIndhcm5pbmdzXCIsIFwiZXJyb3JzXCIsIFwicnVudGltZUVycm9yc1wiXS5mb3JFYWNoKGZ1bmN0aW9uIChwcm9wZXJ0eSkge1xuICAgICAgaWYgKHR5cGVvZiBvdmVybGF5T3B0aW9uc1twcm9wZXJ0eV0gPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgdmFyIG92ZXJsYXlGaWx0ZXJGdW5jdGlvblN0cmluZyA9IGRlY29kZVVSSUNvbXBvbmVudChvdmVybGF5T3B0aW9uc1twcm9wZXJ0eV0pO1xuXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXctZnVuY1xuICAgICAgICB2YXIgb3ZlcmxheUZpbHRlckZ1bmN0aW9uID0gbmV3IEZ1bmN0aW9uKFwibWVzc2FnZVwiLCBcInZhciBjYWxsYmFjayA9IFwiLmNvbmNhdChvdmVybGF5RmlsdGVyRnVuY3Rpb25TdHJpbmcsIFwiXFxuICAgICAgICByZXR1cm4gY2FsbGJhY2sobWVzc2FnZSlcIikpO1xuICAgICAgICBvdmVybGF5T3B0aW9uc1twcm9wZXJ0eV0gPSBvdmVybGF5RmlsdGVyRnVuY3Rpb247XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn07XG5cbi8qKlxuICogQHR5cGUge1N0YXR1c31cbiAqL1xudmFyIHN0YXR1cyA9IHtcbiAgaXNVbmxvYWRpbmc6IGZhbHNlLFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY2FtZWxjYXNlXG4gIGN1cnJlbnRIYXNoOiBfX3dlYnBhY2tfaGFzaF9fXG59O1xuXG4vKiogQHR5cGUge09wdGlvbnN9ICovXG52YXIgb3B0aW9ucyA9IHtcbiAgaG90OiBmYWxzZSxcbiAgbGl2ZVJlbG9hZDogZmFsc2UsXG4gIHByb2dyZXNzOiBmYWxzZSxcbiAgb3ZlcmxheTogZmFsc2Vcbn07XG52YXIgcGFyc2VkUmVzb3VyY2VRdWVyeSA9IHBhcnNlVVJMKF9fcmVzb3VyY2VRdWVyeSk7XG52YXIgZW5hYmxlZEZlYXR1cmVzID0ge1xuICBcIkhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcIjogZmFsc2UsXG4gIFwiTGl2ZSBSZWxvYWRpbmdcIjogZmFsc2UsXG4gIFByb2dyZXNzOiBmYWxzZSxcbiAgT3ZlcmxheTogZmFsc2Vcbn07XG5pZiAocGFyc2VkUmVzb3VyY2VRdWVyeS5ob3QgPT09IFwidHJ1ZVwiKSB7XG4gIG9wdGlvbnMuaG90ID0gdHJ1ZTtcbiAgZW5hYmxlZEZlYXR1cmVzW1wiSG90IE1vZHVsZSBSZXBsYWNlbWVudFwiXSA9IHRydWU7XG59XG5pZiAocGFyc2VkUmVzb3VyY2VRdWVyeVtcImxpdmUtcmVsb2FkXCJdID09PSBcInRydWVcIikge1xuICBvcHRpb25zLmxpdmVSZWxvYWQgPSB0cnVlO1xuICBlbmFibGVkRmVhdHVyZXNbXCJMaXZlIFJlbG9hZGluZ1wiXSA9IHRydWU7XG59XG5pZiAocGFyc2VkUmVzb3VyY2VRdWVyeS5wcm9ncmVzcyA9PT0gXCJ0cnVlXCIpIHtcbiAgb3B0aW9ucy5wcm9ncmVzcyA9IHRydWU7XG4gIGVuYWJsZWRGZWF0dXJlcy5Qcm9ncmVzcyA9IHRydWU7XG59XG5pZiAocGFyc2VkUmVzb3VyY2VRdWVyeS5vdmVybGF5KSB7XG4gIHRyeSB7XG4gICAgb3B0aW9ucy5vdmVybGF5ID0gSlNPTi5wYXJzZShwYXJzZWRSZXNvdXJjZVF1ZXJ5Lm92ZXJsYXkpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgbG9nLmVycm9yKFwiRXJyb3IgcGFyc2luZyBvdmVybGF5IG9wdGlvbnMgZnJvbSByZXNvdXJjZSBxdWVyeTpcIiwgZSk7XG4gIH1cblxuICAvLyBGaWxsIGluIGRlZmF1bHQgXCJ0cnVlXCIgcGFyYW1zIGZvciBwYXJ0aWFsbHktc3BlY2lmaWVkIG9iamVjdHMuXG4gIGlmICh0eXBlb2Ygb3B0aW9ucy5vdmVybGF5ID09PSBcIm9iamVjdFwiKSB7XG4gICAgb3B0aW9ucy5vdmVybGF5ID0gX29iamVjdFNwcmVhZCh7XG4gICAgICBlcnJvcnM6IHRydWUsXG4gICAgICB3YXJuaW5nczogdHJ1ZSxcbiAgICAgIHJ1bnRpbWVFcnJvcnM6IHRydWVcbiAgICB9LCBvcHRpb25zLm92ZXJsYXkpO1xuICAgIGRlY29kZU92ZXJsYXlPcHRpb25zKG9wdGlvbnMub3ZlcmxheSk7XG4gIH1cbiAgZW5hYmxlZEZlYXR1cmVzLk92ZXJsYXkgPSB0cnVlO1xufVxuaWYgKHBhcnNlZFJlc291cmNlUXVlcnkubG9nZ2luZykge1xuICBvcHRpb25zLmxvZ2dpbmcgPSBwYXJzZWRSZXNvdXJjZVF1ZXJ5LmxvZ2dpbmc7XG59XG5pZiAodHlwZW9mIHBhcnNlZFJlc291cmNlUXVlcnkucmVjb25uZWN0ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gIG9wdGlvbnMucmVjb25uZWN0ID0gTnVtYmVyKHBhcnNlZFJlc291cmNlUXVlcnkucmVjb25uZWN0KTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gbGV2ZWxcbiAqL1xuZnVuY3Rpb24gc2V0QWxsTG9nTGV2ZWwobGV2ZWwpIHtcbiAgLy8gVGhpcyBpcyBuZWVkZWQgYmVjYXVzZSB0aGUgSE1SIGxvZ2dlciBvcGVyYXRlIHNlcGFyYXRlbHkgZnJvbSBkZXYgc2VydmVyIGxvZ2dlclxuICB3ZWJwYWNrSG90TG9nLnNldExvZ0xldmVsKGxldmVsID09PSBcInZlcmJvc2VcIiB8fCBsZXZlbCA9PT0gXCJsb2dcIiA/IFwiaW5mb1wiIDogbGV2ZWwpO1xuICBzZXRMb2dMZXZlbChsZXZlbCk7XG59XG5pZiAob3B0aW9ucy5sb2dnaW5nKSB7XG4gIHNldEFsbExvZ0xldmVsKG9wdGlvbnMubG9nZ2luZyk7XG59XG5sb2dFbmFibGVkRmVhdHVyZXMoZW5hYmxlZEZlYXR1cmVzKTtcbnNlbGYuYWRkRXZlbnRMaXN0ZW5lcihcImJlZm9yZXVubG9hZFwiLCBmdW5jdGlvbiAoKSB7XG4gIHN0YXR1cy5pc1VubG9hZGluZyA9IHRydWU7XG59KTtcbnZhciBvdmVybGF5ID0gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IGNyZWF0ZU92ZXJsYXkodHlwZW9mIG9wdGlvbnMub3ZlcmxheSA9PT0gXCJvYmplY3RcIiA/IHtcbiAgdHJ1c3RlZFR5cGVzUG9saWN5TmFtZTogb3B0aW9ucy5vdmVybGF5LnRydXN0ZWRUeXBlc1BvbGljeU5hbWUsXG4gIGNhdGNoUnVudGltZUVycm9yOiBvcHRpb25zLm92ZXJsYXkucnVudGltZUVycm9yc1xufSA6IHtcbiAgdHJ1c3RlZFR5cGVzUG9saWN5TmFtZTogZmFsc2UsXG4gIGNhdGNoUnVudGltZUVycm9yOiBvcHRpb25zLm92ZXJsYXlcbn0pIDoge1xuICBzZW5kOiBmdW5jdGlvbiBzZW5kKCkge31cbn07XG52YXIgb25Tb2NrZXRNZXNzYWdlID0ge1xuICBob3Q6IGZ1bmN0aW9uIGhvdCgpIHtcbiAgICBpZiAocGFyc2VkUmVzb3VyY2VRdWVyeS5ob3QgPT09IFwiZmFsc2VcIikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBvcHRpb25zLmhvdCA9IHRydWU7XG4gIH0sXG4gIGxpdmVSZWxvYWQ6IGZ1bmN0aW9uIGxpdmVSZWxvYWQoKSB7XG4gICAgaWYgKHBhcnNlZFJlc291cmNlUXVlcnlbXCJsaXZlLXJlbG9hZFwiXSA9PT0gXCJmYWxzZVwiKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIG9wdGlvbnMubGl2ZVJlbG9hZCA9IHRydWU7XG4gIH0sXG4gIGludmFsaWQ6IGZ1bmN0aW9uIGludmFsaWQoKSB7XG4gICAgbG9nLmluZm8oXCJBcHAgdXBkYXRlZC4gUmVjb21waWxpbmcuLi5cIik7XG5cbiAgICAvLyBGaXhlcyAjMTA0Mi4gb3ZlcmxheSBkb2Vzbid0IGNsZWFyIGlmIGVycm9ycyBhcmUgZml4ZWQgYnV0IHdhcm5pbmdzIHJlbWFpbi5cbiAgICBpZiAob3B0aW9ucy5vdmVybGF5KSB7XG4gICAgICBvdmVybGF5LnNlbmQoe1xuICAgICAgICB0eXBlOiBcIkRJU01JU1NcIlxuICAgICAgfSk7XG4gICAgfVxuICAgIHNlbmRNZXNzYWdlKFwiSW52YWxpZFwiKTtcbiAgfSxcbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBoYXNoXG4gICAqL1xuICBoYXNoOiBmdW5jdGlvbiBoYXNoKF9oYXNoKSB7XG4gICAgc3RhdHVzLnByZXZpb3VzSGFzaCA9IHN0YXR1cy5jdXJyZW50SGFzaDtcbiAgICBzdGF0dXMuY3VycmVudEhhc2ggPSBfaGFzaDtcbiAgfSxcbiAgbG9nZ2luZzogc2V0QWxsTG9nTGV2ZWwsXG4gIC8qKlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IHZhbHVlXG4gICAqL1xuICBvdmVybGF5OiBmdW5jdGlvbiBvdmVybGF5KHZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBvcHRpb25zLm92ZXJsYXkgPSB2YWx1ZTtcbiAgICBkZWNvZGVPdmVybGF5T3B0aW9ucyhvcHRpb25zLm92ZXJsYXkpO1xuICB9LFxuICAvKipcbiAgICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlXG4gICAqL1xuICByZWNvbm5lY3Q6IGZ1bmN0aW9uIHJlY29ubmVjdCh2YWx1ZSkge1xuICAgIGlmIChwYXJzZWRSZXNvdXJjZVF1ZXJ5LnJlY29ubmVjdCA9PT0gXCJmYWxzZVwiKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIG9wdGlvbnMucmVjb25uZWN0ID0gdmFsdWU7XG4gIH0sXG4gIC8qKlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IHZhbHVlXG4gICAqL1xuICBwcm9ncmVzczogZnVuY3Rpb24gcHJvZ3Jlc3ModmFsdWUpIHtcbiAgICBvcHRpb25zLnByb2dyZXNzID0gdmFsdWU7XG4gIH0sXG4gIC8qKlxuICAgKiBAcGFyYW0ge3sgcGx1Z2luTmFtZT86IHN0cmluZywgcGVyY2VudDogbnVtYmVyLCBtc2c6IHN0cmluZyB9fSBkYXRhXG4gICAqL1xuICBcInByb2dyZXNzLXVwZGF0ZVwiOiBmdW5jdGlvbiBwcm9ncmVzc1VwZGF0ZShkYXRhKSB7XG4gICAgaWYgKG9wdGlvbnMucHJvZ3Jlc3MpIHtcbiAgICAgIGxvZy5pbmZvKFwiXCIuY29uY2F0KGRhdGEucGx1Z2luTmFtZSA/IFwiW1wiLmNvbmNhdChkYXRhLnBsdWdpbk5hbWUsIFwiXSBcIikgOiBcIlwiKS5jb25jYXQoZGF0YS5wZXJjZW50LCBcIiUgLSBcIikuY29uY2F0KGRhdGEubXNnLCBcIi5cIikpO1xuICAgIH1cbiAgICBpZiAoaXNQcm9ncmVzc1N1cHBvcnRlZCgpKSB7XG4gICAgICBpZiAodHlwZW9mIG9wdGlvbnMucHJvZ3Jlc3MgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgdmFyIHByb2dyZXNzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIndkcy1wcm9ncmVzc1wiKTtcbiAgICAgICAgaWYgKCFwcm9ncmVzcykge1xuICAgICAgICAgIGRlZmluZVByb2dyZXNzRWxlbWVudCgpO1xuICAgICAgICAgIHByb2dyZXNzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIndkcy1wcm9ncmVzc1wiKTtcbiAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHByb2dyZXNzKTtcbiAgICAgICAgfVxuICAgICAgICBwcm9ncmVzcy5zZXRBdHRyaWJ1dGUoXCJwcm9ncmVzc1wiLCBkYXRhLnBlcmNlbnQpO1xuICAgICAgICBwcm9ncmVzcy5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIG9wdGlvbnMucHJvZ3Jlc3MpO1xuICAgICAgfVxuICAgIH1cbiAgICBzZW5kTWVzc2FnZShcIlByb2dyZXNzXCIsIGRhdGEpO1xuICB9LFxuICBcInN0aWxsLW9rXCI6IGZ1bmN0aW9uIHN0aWxsT2soKSB7XG4gICAgbG9nLmluZm8oXCJOb3RoaW5nIGNoYW5nZWQuXCIpO1xuICAgIGlmIChvcHRpb25zLm92ZXJsYXkpIHtcbiAgICAgIG92ZXJsYXkuc2VuZCh7XG4gICAgICAgIHR5cGU6IFwiRElTTUlTU1wiXG4gICAgICB9KTtcbiAgICB9XG4gICAgc2VuZE1lc3NhZ2UoXCJTdGlsbE9rXCIpO1xuICB9LFxuICBvazogZnVuY3Rpb24gb2soKSB7XG4gICAgc2VuZE1lc3NhZ2UoXCJPa1wiKTtcbiAgICBpZiAob3B0aW9ucy5vdmVybGF5KSB7XG4gICAgICBvdmVybGF5LnNlbmQoe1xuICAgICAgICB0eXBlOiBcIkRJU01JU1NcIlxuICAgICAgfSk7XG4gICAgfVxuICAgIHJlbG9hZEFwcChvcHRpb25zLCBzdGF0dXMpO1xuICB9LFxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGZpbGVcbiAgICovXG4gIFwic3RhdGljLWNoYW5nZWRcIjogZnVuY3Rpb24gc3RhdGljQ2hhbmdlZChmaWxlKSB7XG4gICAgbG9nLmluZm8oXCJcIi5jb25jYXQoZmlsZSA/IFwiXFxcIlwiLmNvbmNhdChmaWxlLCBcIlxcXCJcIikgOiBcIkNvbnRlbnRcIiwgXCIgZnJvbSBzdGF0aWMgZGlyZWN0b3J5IHdhcyBjaGFuZ2VkLiBSZWxvYWRpbmcuLi5cIikpO1xuICAgIHNlbGYubG9jYXRpb24ucmVsb2FkKCk7XG4gIH0sXG4gIC8qKlxuICAgKiBAcGFyYW0ge0Vycm9yW119IHdhcm5pbmdzXG4gICAqIEBwYXJhbSB7YW55fSBwYXJhbXNcbiAgICovXG4gIHdhcm5pbmdzOiBmdW5jdGlvbiB3YXJuaW5ncyhfd2FybmluZ3MsIHBhcmFtcykge1xuICAgIGxvZy53YXJuKFwiV2FybmluZ3Mgd2hpbGUgY29tcGlsaW5nLlwiKTtcbiAgICB2YXIgcHJpbnRhYmxlV2FybmluZ3MgPSBfd2FybmluZ3MubWFwKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgdmFyIF9mb3JtYXRQcm9ibGVtID0gZm9ybWF0UHJvYmxlbShcIndhcm5pbmdcIiwgZXJyb3IpLFxuICAgICAgICBoZWFkZXIgPSBfZm9ybWF0UHJvYmxlbS5oZWFkZXIsXG4gICAgICAgIGJvZHkgPSBfZm9ybWF0UHJvYmxlbS5ib2R5O1xuICAgICAgcmV0dXJuIFwiXCIuY29uY2F0KGhlYWRlciwgXCJcXG5cIikuY29uY2F0KHN0cmlwQW5zaShib2R5KSk7XG4gICAgfSk7XG4gICAgc2VuZE1lc3NhZ2UoXCJXYXJuaW5nc1wiLCBwcmludGFibGVXYXJuaW5ncyk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcmludGFibGVXYXJuaW5ncy5sZW5ndGg7IGkrKykge1xuICAgICAgbG9nLndhcm4ocHJpbnRhYmxlV2FybmluZ3NbaV0pO1xuICAgIH1cbiAgICB2YXIgb3ZlcmxheVdhcm5pbmdzU2V0dGluZyA9IHR5cGVvZiBvcHRpb25zLm92ZXJsYXkgPT09IFwiYm9vbGVhblwiID8gb3B0aW9ucy5vdmVybGF5IDogb3B0aW9ucy5vdmVybGF5ICYmIG9wdGlvbnMub3ZlcmxheS53YXJuaW5ncztcbiAgICBpZiAob3ZlcmxheVdhcm5pbmdzU2V0dGluZykge1xuICAgICAgdmFyIHdhcm5pbmdzVG9EaXNwbGF5ID0gdHlwZW9mIG92ZXJsYXlXYXJuaW5nc1NldHRpbmcgPT09IFwiZnVuY3Rpb25cIiA/IF93YXJuaW5ncy5maWx0ZXIob3ZlcmxheVdhcm5pbmdzU2V0dGluZykgOiBfd2FybmluZ3M7XG4gICAgICBpZiAod2FybmluZ3NUb0Rpc3BsYXkubGVuZ3RoKSB7XG4gICAgICAgIG92ZXJsYXkuc2VuZCh7XG4gICAgICAgICAgdHlwZTogXCJCVUlMRF9FUlJPUlwiLFxuICAgICAgICAgIGxldmVsOiBcIndhcm5pbmdcIixcbiAgICAgICAgICBtZXNzYWdlczogX3dhcm5pbmdzXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAocGFyYW1zICYmIHBhcmFtcy5wcmV2ZW50UmVsb2FkaW5nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHJlbG9hZEFwcChvcHRpb25zLCBzdGF0dXMpO1xuICB9LFxuICAvKipcbiAgICogQHBhcmFtIHtFcnJvcltdfSBlcnJvcnNcbiAgICovXG4gIGVycm9yczogZnVuY3Rpb24gZXJyb3JzKF9lcnJvcnMpIHtcbiAgICBsb2cuZXJyb3IoXCJFcnJvcnMgd2hpbGUgY29tcGlsaW5nLiBSZWxvYWQgcHJldmVudGVkLlwiKTtcbiAgICB2YXIgcHJpbnRhYmxlRXJyb3JzID0gX2Vycm9ycy5tYXAoZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICB2YXIgX2Zvcm1hdFByb2JsZW0yID0gZm9ybWF0UHJvYmxlbShcImVycm9yXCIsIGVycm9yKSxcbiAgICAgICAgaGVhZGVyID0gX2Zvcm1hdFByb2JsZW0yLmhlYWRlcixcbiAgICAgICAgYm9keSA9IF9mb3JtYXRQcm9ibGVtMi5ib2R5O1xuICAgICAgcmV0dXJuIFwiXCIuY29uY2F0KGhlYWRlciwgXCJcXG5cIikuY29uY2F0KHN0cmlwQW5zaShib2R5KSk7XG4gICAgfSk7XG4gICAgc2VuZE1lc3NhZ2UoXCJFcnJvcnNcIiwgcHJpbnRhYmxlRXJyb3JzKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByaW50YWJsZUVycm9ycy5sZW5ndGg7IGkrKykge1xuICAgICAgbG9nLmVycm9yKHByaW50YWJsZUVycm9yc1tpXSk7XG4gICAgfVxuICAgIHZhciBvdmVybGF5RXJyb3JzU2V0dGluZ3MgPSB0eXBlb2Ygb3B0aW9ucy5vdmVybGF5ID09PSBcImJvb2xlYW5cIiA/IG9wdGlvbnMub3ZlcmxheSA6IG9wdGlvbnMub3ZlcmxheSAmJiBvcHRpb25zLm92ZXJsYXkuZXJyb3JzO1xuICAgIGlmIChvdmVybGF5RXJyb3JzU2V0dGluZ3MpIHtcbiAgICAgIHZhciBlcnJvcnNUb0Rpc3BsYXkgPSB0eXBlb2Ygb3ZlcmxheUVycm9yc1NldHRpbmdzID09PSBcImZ1bmN0aW9uXCIgPyBfZXJyb3JzLmZpbHRlcihvdmVybGF5RXJyb3JzU2V0dGluZ3MpIDogX2Vycm9ycztcbiAgICAgIGlmIChlcnJvcnNUb0Rpc3BsYXkubGVuZ3RoKSB7XG4gICAgICAgIG92ZXJsYXkuc2VuZCh7XG4gICAgICAgICAgdHlwZTogXCJCVUlMRF9FUlJPUlwiLFxuICAgICAgICAgIGxldmVsOiBcImVycm9yXCIsXG4gICAgICAgICAgbWVzc2FnZXM6IF9lcnJvcnNcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuICAvKipcbiAgICogQHBhcmFtIHtFcnJvcn0gZXJyb3JcbiAgICovXG4gIGVycm9yOiBmdW5jdGlvbiBlcnJvcihfZXJyb3IpIHtcbiAgICBsb2cuZXJyb3IoX2Vycm9yKTtcbiAgfSxcbiAgY2xvc2U6IGZ1bmN0aW9uIGNsb3NlKCkge1xuICAgIGxvZy5pbmZvKFwiRGlzY29ubmVjdGVkIVwiKTtcbiAgICBpZiAob3B0aW9ucy5vdmVybGF5KSB7XG4gICAgICBvdmVybGF5LnNlbmQoe1xuICAgICAgICB0eXBlOiBcIkRJU01JU1NcIlxuICAgICAgfSk7XG4gICAgfVxuICAgIHNlbmRNZXNzYWdlKFwiQ2xvc2VcIik7XG4gIH1cbn07XG52YXIgc29ja2V0VVJMID0gY3JlYXRlU29ja2V0VVJMKHBhcnNlZFJlc291cmNlUXVlcnkpO1xuc29ja2V0KHNvY2tldFVSTCwgb25Tb2NrZXRNZXNzYWdlLCBvcHRpb25zLnJlY29ubmVjdCk7IiwiLyoqKioqKi8gKGZ1bmN0aW9uKCkgeyAvLyB3ZWJwYWNrQm9vdHN0cmFwXG4vKioqKioqLyBcdFwidXNlIHN0cmljdFwiO1xuLyoqKioqKi8gXHR2YXIgX193ZWJwYWNrX21vZHVsZXNfXyA9ICh7XG5cbi8qKiovIFwiLi9jbGllbnQtc3JjL21vZHVsZXMvbG9nZ2VyL3RhcGFibGUuanNcIjpcbi8qISoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiohKlxcXG4gICEqKiogLi9jbGllbnQtc3JjL21vZHVsZXMvbG9nZ2VyL3RhcGFibGUuanMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqLyAoZnVuY3Rpb24oX191bnVzZWRfd2VicGFja19tb2R1bGUsIF9fd2VicGFja19leHBvcnRzX18sIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5yKF9fd2VicGFja19leHBvcnRzX18pO1xuLyogaGFybW9ueSBleHBvcnQgKi8gX193ZWJwYWNrX3JlcXVpcmVfXy5kKF9fd2VicGFja19leHBvcnRzX18sIHtcbi8qIGhhcm1vbnkgZXhwb3J0ICovICAgU3luY0JhaWxIb29rOiBmdW5jdGlvbigpIHsgcmV0dXJuIC8qIGJpbmRpbmcgKi8gU3luY0JhaWxIb29rOyB9XG4vKiBoYXJtb255IGV4cG9ydCAqLyB9KTtcbmZ1bmN0aW9uIFN5bmNCYWlsSG9vaygpIHtcbiAgcmV0dXJuIHtcbiAgICBjYWxsOiBmdW5jdGlvbiBjYWxsKCkge31cbiAgfTtcbn1cblxuLyoqXG4gKiBDbGllbnQgc3R1YiBmb3IgdGFwYWJsZSBTeW5jQmFpbEhvb2tcbiAqL1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9wcmVmZXItZGVmYXVsdC1leHBvcnRcblxuXG4vKioqLyB9KSxcblxuLyoqKi8gXCIuL25vZGVfbW9kdWxlcy93ZWJwYWNrL2xpYi9sb2dnaW5nL0xvZ2dlci5qc1wiOlxuLyohKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiEqXFxcbiAgISoqKiAuL25vZGVfbW9kdWxlcy93ZWJwYWNrL2xpYi9sb2dnaW5nL0xvZ2dlci5qcyAqKiohXG4gIFxcKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUpIHtcblxuLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cblxuXG5cbmZ1bmN0aW9uIF90b0NvbnN1bWFibGVBcnJheShyKSB7XG4gIHJldHVybiBfYXJyYXlXaXRob3V0SG9sZXMocikgfHwgX2l0ZXJhYmxlVG9BcnJheShyKSB8fCBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkocikgfHwgX25vbkl0ZXJhYmxlU3ByZWFkKCk7XG59XG5mdW5jdGlvbiBfbm9uSXRlcmFibGVTcHJlYWQoKSB7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gc3ByZWFkIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpO1xufVxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KHIsIGEpIHtcbiAgaWYgKHIpIHtcbiAgICBpZiAoXCJzdHJpbmdcIiA9PSB0eXBlb2YgcikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KHIsIGEpO1xuICAgIHZhciB0ID0ge30udG9TdHJpbmcuY2FsbChyKS5zbGljZSg4LCAtMSk7XG4gICAgcmV0dXJuIFwiT2JqZWN0XCIgPT09IHQgJiYgci5jb25zdHJ1Y3RvciAmJiAodCA9IHIuY29uc3RydWN0b3IubmFtZSksIFwiTWFwXCIgPT09IHQgfHwgXCJTZXRcIiA9PT0gdCA/IEFycmF5LmZyb20ocikgOiBcIkFyZ3VtZW50c1wiID09PSB0IHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KHQpID8gX2FycmF5TGlrZVRvQXJyYXkociwgYSkgOiB2b2lkIDA7XG4gIH1cbn1cbmZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXkocikge1xuICBpZiAoXCJ1bmRlZmluZWRcIiAhPSB0eXBlb2YgKHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgPyBTeW1ib2wgOiBmdW5jdGlvbiAoaSkgeyByZXR1cm4gaTsgfSkgJiYgbnVsbCAhPSByWyh0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiID8gU3ltYm9sIDogZnVuY3Rpb24gKGkpIHsgcmV0dXJuIGk7IH0pLml0ZXJhdG9yXSB8fCBudWxsICE9IHJbXCJAQGl0ZXJhdG9yXCJdKSByZXR1cm4gQXJyYXkuZnJvbShyKTtcbn1cbmZ1bmN0aW9uIF9hcnJheVdpdGhvdXRIb2xlcyhyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KHIpKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkocik7XG59XG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShyLCBhKSB7XG4gIChudWxsID09IGEgfHwgYSA+IHIubGVuZ3RoKSAmJiAoYSA9IHIubGVuZ3RoKTtcbiAgZm9yICh2YXIgZSA9IDAsIG4gPSBBcnJheShhKTsgZSA8IGE7IGUrKykgbltlXSA9IHJbZV07XG4gIHJldHVybiBuO1xufVxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGEsIG4pIHtcbiAgaWYgKCEoYSBpbnN0YW5jZW9mIG4pKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xufVxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXMoZSwgcikge1xuICBmb3IgKHZhciB0ID0gMDsgdCA8IHIubGVuZ3RoOyB0KyspIHtcbiAgICB2YXIgbyA9IHJbdF07XG4gICAgby5lbnVtZXJhYmxlID0gby5lbnVtZXJhYmxlIHx8ICExLCBvLmNvbmZpZ3VyYWJsZSA9ICEwLCBcInZhbHVlXCIgaW4gbyAmJiAoby53cml0YWJsZSA9ICEwKSwgT2JqZWN0LmRlZmluZVByb3BlcnR5KGUsIF90b1Byb3BlcnR5S2V5KG8ua2V5KSwgbyk7XG4gIH1cbn1cbmZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhlLCByLCB0KSB7XG4gIHJldHVybiByICYmIF9kZWZpbmVQcm9wZXJ0aWVzKGUucHJvdG90eXBlLCByKSwgdCAmJiBfZGVmaW5lUHJvcGVydGllcyhlLCB0KSwgT2JqZWN0LmRlZmluZVByb3BlcnR5KGUsIFwicHJvdG90eXBlXCIsIHtcbiAgICB3cml0YWJsZTogITFcbiAgfSksIGU7XG59XG5mdW5jdGlvbiBfdG9Qcm9wZXJ0eUtleSh0KSB7XG4gIHZhciBpID0gX3RvUHJpbWl0aXZlKHQsIFwic3RyaW5nXCIpO1xuICByZXR1cm4gXCJzeW1ib2xcIiA9PSB0eXBlb2YgaSA/IGkgOiBpICsgXCJcIjtcbn1cbmZ1bmN0aW9uIF90b1ByaW1pdGl2ZSh0LCByKSB7XG4gIGlmIChcIm9iamVjdFwiICE9IHR5cGVvZiB0IHx8ICF0KSByZXR1cm4gdDtcbiAgdmFyIGUgPSB0Wyh0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiID8gU3ltYm9sIDogZnVuY3Rpb24gKGkpIHsgcmV0dXJuIGk7IH0pLnRvUHJpbWl0aXZlXTtcbiAgaWYgKHZvaWQgMCAhPT0gZSkge1xuICAgIHZhciBpID0gZS5jYWxsKHQsIHIgfHwgXCJkZWZhdWx0XCIpO1xuICAgIGlmIChcIm9iamVjdFwiICE9IHR5cGVvZiBpKSByZXR1cm4gaTtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQEB0b1ByaW1pdGl2ZSBtdXN0IHJldHVybiBhIHByaW1pdGl2ZSB2YWx1ZS5cIik7XG4gIH1cbiAgcmV0dXJuIChcInN0cmluZ1wiID09PSByID8gU3RyaW5nIDogTnVtYmVyKSh0KTtcbn1cbnZhciBMb2dUeXBlID0gT2JqZWN0LmZyZWV6ZSh7XG4gIGVycm9yOiAoLyoqIEB0eXBlIHtcImVycm9yXCJ9ICovXCJlcnJvclwiKSxcbiAgLy8gbWVzc2FnZSwgYyBzdHlsZSBhcmd1bWVudHNcbiAgd2FybjogKC8qKiBAdHlwZSB7XCJ3YXJuXCJ9ICovXCJ3YXJuXCIpLFxuICAvLyBtZXNzYWdlLCBjIHN0eWxlIGFyZ3VtZW50c1xuICBpbmZvOiAoLyoqIEB0eXBlIHtcImluZm9cIn0gKi9cImluZm9cIiksXG4gIC8vIG1lc3NhZ2UsIGMgc3R5bGUgYXJndW1lbnRzXG4gIGxvZzogKC8qKiBAdHlwZSB7XCJsb2dcIn0gKi9cImxvZ1wiKSxcbiAgLy8gbWVzc2FnZSwgYyBzdHlsZSBhcmd1bWVudHNcbiAgZGVidWc6ICgvKiogQHR5cGUge1wiZGVidWdcIn0gKi9cImRlYnVnXCIpLFxuICAvLyBtZXNzYWdlLCBjIHN0eWxlIGFyZ3VtZW50c1xuXG4gIHRyYWNlOiAoLyoqIEB0eXBlIHtcInRyYWNlXCJ9ICovXCJ0cmFjZVwiKSxcbiAgLy8gbm8gYXJndW1lbnRzXG5cbiAgZ3JvdXA6ICgvKiogQHR5cGUge1wiZ3JvdXBcIn0gKi9cImdyb3VwXCIpLFxuICAvLyBbbGFiZWxdXG4gIGdyb3VwQ29sbGFwc2VkOiAoLyoqIEB0eXBlIHtcImdyb3VwQ29sbGFwc2VkXCJ9ICovXCJncm91cENvbGxhcHNlZFwiKSxcbiAgLy8gW2xhYmVsXVxuICBncm91cEVuZDogKC8qKiBAdHlwZSB7XCJncm91cEVuZFwifSAqL1wiZ3JvdXBFbmRcIiksXG4gIC8vIFtsYWJlbF1cblxuICBwcm9maWxlOiAoLyoqIEB0eXBlIHtcInByb2ZpbGVcIn0gKi9cInByb2ZpbGVcIiksXG4gIC8vIFtwcm9maWxlTmFtZV1cbiAgcHJvZmlsZUVuZDogKC8qKiBAdHlwZSB7XCJwcm9maWxlRW5kXCJ9ICovXCJwcm9maWxlRW5kXCIpLFxuICAvLyBbcHJvZmlsZU5hbWVdXG5cbiAgdGltZTogKC8qKiBAdHlwZSB7XCJ0aW1lXCJ9ICovXCJ0aW1lXCIpLFxuICAvLyBuYW1lLCB0aW1lIGFzIFtzZWNvbmRzLCBuYW5vc2Vjb25kc11cblxuICBjbGVhcjogKC8qKiBAdHlwZSB7XCJjbGVhclwifSAqL1wiY2xlYXJcIiksXG4gIC8vIG5vIGFyZ3VtZW50c1xuICBzdGF0dXM6ICgvKiogQHR5cGUge1wic3RhdHVzXCJ9ICovXCJzdGF0dXNcIikgLy8gbWVzc2FnZSwgYXJndW1lbnRzXG59KTtcbm1vZHVsZS5leHBvcnRzLkxvZ1R5cGUgPSBMb2dUeXBlO1xuXG4vKiogQHR5cGVkZWYge3R5cGVvZiBMb2dUeXBlW2tleW9mIHR5cGVvZiBMb2dUeXBlXX0gTG9nVHlwZUVudW0gKi9cblxudmFyIExPR19TWU1CT0wgPSAodHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiA/IFN5bWJvbCA6IGZ1bmN0aW9uIChpKSB7IHJldHVybiBpOyB9KShcIndlYnBhY2sgbG9nZ2VyIHJhdyBsb2cgbWV0aG9kXCIpO1xudmFyIFRJTUVSU19TWU1CT0wgPSAodHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiA/IFN5bWJvbCA6IGZ1bmN0aW9uIChpKSB7IHJldHVybiBpOyB9KShcIndlYnBhY2sgbG9nZ2VyIHRpbWVzXCIpO1xudmFyIFRJTUVSU19BR0dSRUdBVEVTX1NZTUJPTCA9ICh0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiID8gU3ltYm9sIDogZnVuY3Rpb24gKGkpIHsgcmV0dXJuIGk7IH0pKFwid2VicGFjayBsb2dnZXIgYWdncmVnYXRlZCB0aW1lc1wiKTtcbnZhciBXZWJwYWNrTG9nZ2VyID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb24oTG9nVHlwZUVudW0sIGFueVtdPSk6IHZvaWR9IGxvZyBsb2cgZnVuY3Rpb25cbiAgICogQHBhcmFtIHtmdW5jdGlvbihzdHJpbmcgfCBmdW5jdGlvbigpOiBzdHJpbmcpOiBXZWJwYWNrTG9nZ2VyfSBnZXRDaGlsZExvZ2dlciBmdW5jdGlvbiB0byBjcmVhdGUgY2hpbGQgbG9nZ2VyXG4gICAqL1xuICBmdW5jdGlvbiBXZWJwYWNrTG9nZ2VyKGxvZywgZ2V0Q2hpbGRMb2dnZXIpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgV2VicGFja0xvZ2dlcik7XG4gICAgdGhpc1tMT0dfU1lNQk9MXSA9IGxvZztcbiAgICB0aGlzLmdldENoaWxkTG9nZ2VyID0gZ2V0Q2hpbGRMb2dnZXI7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHsuLi5hbnl9IGFyZ3MgYXJnc1xuICAgKi9cbiAgcmV0dXJuIF9jcmVhdGVDbGFzcyhXZWJwYWNrTG9nZ2VyLCBbe1xuICAgIGtleTogXCJlcnJvclwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBlcnJvcigpIHtcbiAgICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgICBhcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgICAgfVxuICAgICAgdGhpc1tMT0dfU1lNQk9MXShMb2dUeXBlLmVycm9yLCBhcmdzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gey4uLmFueX0gYXJncyBhcmdzXG4gICAgICovXG4gIH0sIHtcbiAgICBrZXk6IFwid2FyblwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB3YXJuKCkge1xuICAgICAgZm9yICh2YXIgX2xlbjIgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4yKSwgX2tleTIgPSAwOyBfa2V5MiA8IF9sZW4yOyBfa2V5MisrKSB7XG4gICAgICAgIGFyZ3NbX2tleTJdID0gYXJndW1lbnRzW19rZXkyXTtcbiAgICAgIH1cbiAgICAgIHRoaXNbTE9HX1NZTUJPTF0oTG9nVHlwZS53YXJuLCBhcmdzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gey4uLmFueX0gYXJncyBhcmdzXG4gICAgICovXG4gIH0sIHtcbiAgICBrZXk6IFwiaW5mb1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBpbmZvKCkge1xuICAgICAgZm9yICh2YXIgX2xlbjMgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4zKSwgX2tleTMgPSAwOyBfa2V5MyA8IF9sZW4zOyBfa2V5MysrKSB7XG4gICAgICAgIGFyZ3NbX2tleTNdID0gYXJndW1lbnRzW19rZXkzXTtcbiAgICAgIH1cbiAgICAgIHRoaXNbTE9HX1NZTUJPTF0oTG9nVHlwZS5pbmZvLCBhcmdzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gey4uLmFueX0gYXJncyBhcmdzXG4gICAgICovXG4gIH0sIHtcbiAgICBrZXk6IFwibG9nXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGxvZygpIHtcbiAgICAgIGZvciAodmFyIF9sZW40ID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuNCksIF9rZXk0ID0gMDsgX2tleTQgPCBfbGVuNDsgX2tleTQrKykge1xuICAgICAgICBhcmdzW19rZXk0XSA9IGFyZ3VtZW50c1tfa2V5NF07XG4gICAgICB9XG4gICAgICB0aGlzW0xPR19TWU1CT0xdKExvZ1R5cGUubG9nLCBhcmdzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gey4uLmFueX0gYXJncyBhcmdzXG4gICAgICovXG4gIH0sIHtcbiAgICBrZXk6IFwiZGVidWdcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGVidWcoKSB7XG4gICAgICBmb3IgKHZhciBfbGVuNSA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjUpLCBfa2V5NSA9IDA7IF9rZXk1IDwgX2xlbjU7IF9rZXk1KyspIHtcbiAgICAgICAgYXJnc1tfa2V5NV0gPSBhcmd1bWVudHNbX2tleTVdO1xuICAgICAgfVxuICAgICAgdGhpc1tMT0dfU1lNQk9MXShMb2dUeXBlLmRlYnVnLCBhcmdzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge2FueX0gYXNzZXJ0aW9uIGFzc2VydGlvblxuICAgICAqIEBwYXJhbSB7Li4uYW55fSBhcmdzIGFyZ3NcbiAgICAgKi9cbiAgfSwge1xuICAgIGtleTogXCJhc3NlcnRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gYXNzZXJ0KGFzc2VydGlvbikge1xuICAgICAgaWYgKCFhc3NlcnRpb24pIHtcbiAgICAgICAgZm9yICh2YXIgX2xlbjYgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW42ID4gMSA/IF9sZW42IC0gMSA6IDApLCBfa2V5NiA9IDE7IF9rZXk2IDwgX2xlbjY7IF9rZXk2KyspIHtcbiAgICAgICAgICBhcmdzW19rZXk2IC0gMV0gPSBhcmd1bWVudHNbX2tleTZdO1xuICAgICAgICB9XG4gICAgICAgIHRoaXNbTE9HX1NZTUJPTF0oTG9nVHlwZS5lcnJvciwgYXJncyk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInRyYWNlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHRyYWNlKCkge1xuICAgICAgdGhpc1tMT0dfU1lNQk9MXShMb2dUeXBlLnRyYWNlLCBbXCJUcmFjZVwiXSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImNsZWFyXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNsZWFyKCkge1xuICAgICAgdGhpc1tMT0dfU1lNQk9MXShMb2dUeXBlLmNsZWFyKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gey4uLmFueX0gYXJncyBhcmdzXG4gICAgICovXG4gIH0sIHtcbiAgICBrZXk6IFwic3RhdHVzXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHN0YXR1cygpIHtcbiAgICAgIGZvciAodmFyIF9sZW43ID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuNyksIF9rZXk3ID0gMDsgX2tleTcgPCBfbGVuNzsgX2tleTcrKykge1xuICAgICAgICBhcmdzW19rZXk3XSA9IGFyZ3VtZW50c1tfa2V5N107XG4gICAgICB9XG4gICAgICB0aGlzW0xPR19TWU1CT0xdKExvZ1R5cGUuc3RhdHVzLCBhcmdzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gey4uLmFueX0gYXJncyBhcmdzXG4gICAgICovXG4gIH0sIHtcbiAgICBrZXk6IFwiZ3JvdXBcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ3JvdXAoKSB7XG4gICAgICBmb3IgKHZhciBfbGVuOCA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjgpLCBfa2V5OCA9IDA7IF9rZXk4IDwgX2xlbjg7IF9rZXk4KyspIHtcbiAgICAgICAgYXJnc1tfa2V5OF0gPSBhcmd1bWVudHNbX2tleThdO1xuICAgICAgfVxuICAgICAgdGhpc1tMT0dfU1lNQk9MXShMb2dUeXBlLmdyb3VwLCBhcmdzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gey4uLmFueX0gYXJncyBhcmdzXG4gICAgICovXG4gIH0sIHtcbiAgICBrZXk6IFwiZ3JvdXBDb2xsYXBzZWRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ3JvdXBDb2xsYXBzZWQoKSB7XG4gICAgICBmb3IgKHZhciBfbGVuOSA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjkpLCBfa2V5OSA9IDA7IF9rZXk5IDwgX2xlbjk7IF9rZXk5KyspIHtcbiAgICAgICAgYXJnc1tfa2V5OV0gPSBhcmd1bWVudHNbX2tleTldO1xuICAgICAgfVxuICAgICAgdGhpc1tMT0dfU1lNQk9MXShMb2dUeXBlLmdyb3VwQ29sbGFwc2VkLCBhcmdzKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZ3JvdXBFbmRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ3JvdXBFbmQoKSB7XG4gICAgICB0aGlzW0xPR19TWU1CT0xdKExvZ1R5cGUuZ3JvdXBFbmQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nPX0gbGFiZWwgbGFiZWxcbiAgICAgKi9cbiAgfSwge1xuICAgIGtleTogXCJwcm9maWxlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHByb2ZpbGUobGFiZWwpIHtcbiAgICAgIHRoaXNbTE9HX1NZTUJPTF0oTG9nVHlwZS5wcm9maWxlLCBbbGFiZWxdKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZz19IGxhYmVsIGxhYmVsXG4gICAgICovXG4gIH0sIHtcbiAgICBrZXk6IFwicHJvZmlsZUVuZFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBwcm9maWxlRW5kKGxhYmVsKSB7XG4gICAgICB0aGlzW0xPR19TWU1CT0xdKExvZ1R5cGUucHJvZmlsZUVuZCwgW2xhYmVsXSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxhYmVsIGxhYmVsXG4gICAgICovXG4gIH0sIHtcbiAgICBrZXk6IFwidGltZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB0aW1lKGxhYmVsKSB7XG4gICAgICAvKiogQHR5cGUge01hcDxzdHJpbmcgfCB1bmRlZmluZWQsIFtudW1iZXIsIG51bWJlcl0+fSAqL1xuICAgICAgdGhpc1tUSU1FUlNfU1lNQk9MXSA9IHRoaXNbVElNRVJTX1NZTUJPTF0gfHwgbmV3IE1hcCgpO1xuICAgICAgdGhpc1tUSU1FUlNfU1lNQk9MXS5zZXQobGFiZWwsIHByb2Nlc3MuaHJ0aW1lKCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nPX0gbGFiZWwgbGFiZWxcbiAgICAgKi9cbiAgfSwge1xuICAgIGtleTogXCJ0aW1lTG9nXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHRpbWVMb2cobGFiZWwpIHtcbiAgICAgIHZhciBwcmV2ID0gdGhpc1tUSU1FUlNfU1lNQk9MXSAmJiB0aGlzW1RJTUVSU19TWU1CT0xdLmdldChsYWJlbCk7XG4gICAgICBpZiAoIXByZXYpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm8gc3VjaCBsYWJlbCAnXCIuY29uY2F0KGxhYmVsLCBcIicgZm9yIFdlYnBhY2tMb2dnZXIudGltZUxvZygpXCIpKTtcbiAgICAgIH1cbiAgICAgIHZhciB0aW1lID0gcHJvY2Vzcy5ocnRpbWUocHJldik7XG4gICAgICB0aGlzW0xPR19TWU1CT0xdKExvZ1R5cGUudGltZSwgW2xhYmVsXS5jb25jYXQoX3RvQ29uc3VtYWJsZUFycmF5KHRpbWUpKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmc9fSBsYWJlbCBsYWJlbFxuICAgICAqL1xuICB9LCB7XG4gICAga2V5OiBcInRpbWVFbmRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gdGltZUVuZChsYWJlbCkge1xuICAgICAgdmFyIHByZXYgPSB0aGlzW1RJTUVSU19TWU1CT0xdICYmIHRoaXNbVElNRVJTX1NZTUJPTF0uZ2V0KGxhYmVsKTtcbiAgICAgIGlmICghcHJldikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBzdWNoIGxhYmVsICdcIi5jb25jYXQobGFiZWwsIFwiJyBmb3IgV2VicGFja0xvZ2dlci50aW1lRW5kKClcIikpO1xuICAgICAgfVxuICAgICAgdmFyIHRpbWUgPSBwcm9jZXNzLmhydGltZShwcmV2KTtcbiAgICAgIC8qKiBAdHlwZSB7TWFwPHN0cmluZyB8IHVuZGVmaW5lZCwgW251bWJlciwgbnVtYmVyXT59ICovXG4gICAgICB0aGlzW1RJTUVSU19TWU1CT0xdLmRlbGV0ZShsYWJlbCk7XG4gICAgICB0aGlzW0xPR19TWU1CT0xdKExvZ1R5cGUudGltZSwgW2xhYmVsXS5jb25jYXQoX3RvQ29uc3VtYWJsZUFycmF5KHRpbWUpKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmc9fSBsYWJlbCBsYWJlbFxuICAgICAqL1xuICB9LCB7XG4gICAga2V5OiBcInRpbWVBZ2dyZWdhdGVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gdGltZUFnZ3JlZ2F0ZShsYWJlbCkge1xuICAgICAgdmFyIHByZXYgPSB0aGlzW1RJTUVSU19TWU1CT0xdICYmIHRoaXNbVElNRVJTX1NZTUJPTF0uZ2V0KGxhYmVsKTtcbiAgICAgIGlmICghcHJldikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBzdWNoIGxhYmVsICdcIi5jb25jYXQobGFiZWwsIFwiJyBmb3IgV2VicGFja0xvZ2dlci50aW1lQWdncmVnYXRlKClcIikpO1xuICAgICAgfVxuICAgICAgdmFyIHRpbWUgPSBwcm9jZXNzLmhydGltZShwcmV2KTtcbiAgICAgIC8qKiBAdHlwZSB7TWFwPHN0cmluZyB8IHVuZGVmaW5lZCwgW251bWJlciwgbnVtYmVyXT59ICovXG4gICAgICB0aGlzW1RJTUVSU19TWU1CT0xdLmRlbGV0ZShsYWJlbCk7XG4gICAgICAvKiogQHR5cGUge01hcDxzdHJpbmcgfCB1bmRlZmluZWQsIFtudW1iZXIsIG51bWJlcl0+fSAqL1xuICAgICAgdGhpc1tUSU1FUlNfQUdHUkVHQVRFU19TWU1CT0xdID0gdGhpc1tUSU1FUlNfQUdHUkVHQVRFU19TWU1CT0xdIHx8IG5ldyBNYXAoKTtcbiAgICAgIHZhciBjdXJyZW50ID0gdGhpc1tUSU1FUlNfQUdHUkVHQVRFU19TWU1CT0xdLmdldChsYWJlbCk7XG4gICAgICBpZiAoY3VycmVudCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmICh0aW1lWzFdICsgY3VycmVudFsxXSA+IDFlOSkge1xuICAgICAgICAgIHRpbWVbMF0gKz0gY3VycmVudFswXSArIDE7XG4gICAgICAgICAgdGltZVsxXSA9IHRpbWVbMV0gLSAxZTkgKyBjdXJyZW50WzFdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRpbWVbMF0gKz0gY3VycmVudFswXTtcbiAgICAgICAgICB0aW1lWzFdICs9IGN1cnJlbnRbMV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXNbVElNRVJTX0FHR1JFR0FURVNfU1lNQk9MXS5zZXQobGFiZWwsIHRpbWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nPX0gbGFiZWwgbGFiZWxcbiAgICAgKi9cbiAgfSwge1xuICAgIGtleTogXCJ0aW1lQWdncmVnYXRlRW5kXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHRpbWVBZ2dyZWdhdGVFbmQobGFiZWwpIHtcbiAgICAgIGlmICh0aGlzW1RJTUVSU19BR0dSRUdBVEVTX1NZTUJPTF0gPT09IHVuZGVmaW5lZCkgcmV0dXJuO1xuICAgICAgdmFyIHRpbWUgPSB0aGlzW1RJTUVSU19BR0dSRUdBVEVTX1NZTUJPTF0uZ2V0KGxhYmVsKTtcbiAgICAgIGlmICh0aW1lID09PSB1bmRlZmluZWQpIHJldHVybjtcbiAgICAgIHRoaXNbVElNRVJTX0FHR1JFR0FURVNfU1lNQk9MXS5kZWxldGUobGFiZWwpO1xuICAgICAgdGhpc1tMT0dfU1lNQk9MXShMb2dUeXBlLnRpbWUsIFtsYWJlbF0uY29uY2F0KF90b0NvbnN1bWFibGVBcnJheSh0aW1lKSkpO1xuICAgIH1cbiAgfV0pO1xufSgpO1xubW9kdWxlLmV4cG9ydHMuTG9nZ2VyID0gV2VicGFja0xvZ2dlcjtcblxuLyoqKi8gfSksXG5cbi8qKiovIFwiLi9ub2RlX21vZHVsZXMvd2VicGFjay9saWIvbG9nZ2luZy9jcmVhdGVDb25zb2xlTG9nZ2VyLmpzXCI6XG4vKiEqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiEqXFxcbiAgISoqKiAuL25vZGVfbW9kdWxlcy93ZWJwYWNrL2xpYi9sb2dnaW5nL2NyZWF0ZUNvbnNvbGVMb2dnZXIuanMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgX191bnVzZWRfd2VicGFja19leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5cblxuXG5mdW5jdGlvbiBfc2xpY2VkVG9BcnJheShyLCBlKSB7XG4gIHJldHVybiBfYXJyYXlXaXRoSG9sZXMocikgfHwgX2l0ZXJhYmxlVG9BcnJheUxpbWl0KHIsIGUpIHx8IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShyLCBlKSB8fCBfbm9uSXRlcmFibGVSZXN0KCk7XG59XG5mdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkge1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpO1xufVxuZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KHIsIGwpIHtcbiAgdmFyIHQgPSBudWxsID09IHIgPyBudWxsIDogXCJ1bmRlZmluZWRcIiAhPSB0eXBlb2YgKHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgPyBTeW1ib2wgOiBmdW5jdGlvbiAoaSkgeyByZXR1cm4gaTsgfSkgJiYgclsodHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiA/IFN5bWJvbCA6IGZ1bmN0aW9uIChpKSB7IHJldHVybiBpOyB9KS5pdGVyYXRvcl0gfHwgcltcIkBAaXRlcmF0b3JcIl07XG4gIGlmIChudWxsICE9IHQpIHtcbiAgICB2YXIgZSxcbiAgICAgIG4sXG4gICAgICBpLFxuICAgICAgdSxcbiAgICAgIGEgPSBbXSxcbiAgICAgIGYgPSAhMCxcbiAgICAgIG8gPSAhMTtcbiAgICB0cnkge1xuICAgICAgaWYgKGkgPSAodCA9IHQuY2FsbChyKSkubmV4dCwgMCA9PT0gbCkge1xuICAgICAgICBpZiAoT2JqZWN0KHQpICE9PSB0KSByZXR1cm47XG4gICAgICAgIGYgPSAhMTtcbiAgICAgIH0gZWxzZSBmb3IgKDsgIShmID0gKGUgPSBpLmNhbGwodCkpLmRvbmUpICYmIChhLnB1c2goZS52YWx1ZSksIGEubGVuZ3RoICE9PSBsKTsgZiA9ICEwKTtcbiAgICB9IGNhdGNoIChyKSB7XG4gICAgICBvID0gITAsIG4gPSByO1xuICAgIH0gZmluYWxseSB7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAoIWYgJiYgbnVsbCAhPSB0LnJldHVybiAmJiAodSA9IHQucmV0dXJuKCksIE9iamVjdCh1KSAhPT0gdSkpIHJldHVybjtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGlmIChvKSB0aHJvdyBuO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYTtcbiAgfVxufVxuZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKHIpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkocikpIHJldHVybiByO1xufVxuZnVuY3Rpb24gX3RvQ29uc3VtYWJsZUFycmF5KHIpIHtcbiAgcmV0dXJuIF9hcnJheVdpdGhvdXRIb2xlcyhyKSB8fCBfaXRlcmFibGVUb0FycmF5KHIpIHx8IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShyKSB8fCBfbm9uSXRlcmFibGVTcHJlYWQoKTtcbn1cbmZ1bmN0aW9uIF9ub25JdGVyYWJsZVNwcmVhZCgpIHtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBzcHJlYWQgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7XG59XG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkociwgYSkge1xuICBpZiAocikge1xuICAgIGlmIChcInN0cmluZ1wiID09IHR5cGVvZiByKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkociwgYSk7XG4gICAgdmFyIHQgPSB7fS50b1N0cmluZy5jYWxsKHIpLnNsaWNlKDgsIC0xKTtcbiAgICByZXR1cm4gXCJPYmplY3RcIiA9PT0gdCAmJiByLmNvbnN0cnVjdG9yICYmICh0ID0gci5jb25zdHJ1Y3Rvci5uYW1lKSwgXCJNYXBcIiA9PT0gdCB8fCBcIlNldFwiID09PSB0ID8gQXJyYXkuZnJvbShyKSA6IFwiQXJndW1lbnRzXCIgPT09IHQgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QodCkgPyBfYXJyYXlMaWtlVG9BcnJheShyLCBhKSA6IHZvaWQgMDtcbiAgfVxufVxuZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheShyKSB7XG4gIGlmIChcInVuZGVmaW5lZFwiICE9IHR5cGVvZiAodHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiA/IFN5bWJvbCA6IGZ1bmN0aW9uIChpKSB7IHJldHVybiBpOyB9KSAmJiBudWxsICE9IHJbKHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgPyBTeW1ib2wgOiBmdW5jdGlvbiAoaSkgeyByZXR1cm4gaTsgfSkuaXRlcmF0b3JdIHx8IG51bGwgIT0gcltcIkBAaXRlcmF0b3JcIl0pIHJldHVybiBBcnJheS5mcm9tKHIpO1xufVxuZnVuY3Rpb24gX2FycmF5V2l0aG91dEhvbGVzKHIpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkocikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShyKTtcbn1cbmZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KHIsIGEpIHtcbiAgKG51bGwgPT0gYSB8fCBhID4gci5sZW5ndGgpICYmIChhID0gci5sZW5ndGgpO1xuICBmb3IgKHZhciBlID0gMCwgbiA9IEFycmF5KGEpOyBlIDwgYTsgZSsrKSBuW2VdID0gcltlXTtcbiAgcmV0dXJuIG47XG59XG52YXIgX3JlcXVpcmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuL0xvZ2dlciAqLyBcIi4vbm9kZV9tb2R1bGVzL3dlYnBhY2svbGliL2xvZ2dpbmcvTG9nZ2VyLmpzXCIpLFxuICBMb2dUeXBlID0gX3JlcXVpcmUuTG9nVHlwZTtcblxuLyoqIEB0eXBlZGVmIHtpbXBvcnQoXCIuLi8uLi9kZWNsYXJhdGlvbnMvV2VicGFja09wdGlvbnNcIikuRmlsdGVySXRlbVR5cGVzfSBGaWx0ZXJJdGVtVHlwZXMgKi9cbi8qKiBAdHlwZWRlZiB7aW1wb3J0KFwiLi4vLi4vZGVjbGFyYXRpb25zL1dlYnBhY2tPcHRpb25zXCIpLkZpbHRlclR5cGVzfSBGaWx0ZXJUeXBlcyAqL1xuLyoqIEB0eXBlZGVmIHtpbXBvcnQoXCIuL0xvZ2dlclwiKS5Mb2dUeXBlRW51bX0gTG9nVHlwZUVudW0gKi9cblxuLyoqIEB0eXBlZGVmIHtmdW5jdGlvbihzdHJpbmcpOiBib29sZWFufSBGaWx0ZXJGdW5jdGlvbiAqL1xuLyoqIEB0eXBlZGVmIHtmdW5jdGlvbihzdHJpbmcsIExvZ1R5cGVFbnVtLCBhbnlbXT0pOiB2b2lkfSBMb2dnaW5nRnVuY3Rpb24gKi9cblxuLyoqXG4gKiBAdHlwZWRlZiB7b2JqZWN0fSBMb2dnZXJDb25zb2xlXG4gKiBAcHJvcGVydHkge2Z1bmN0aW9uKCk6IHZvaWR9IGNsZWFyXG4gKiBAcHJvcGVydHkge2Z1bmN0aW9uKCk6IHZvaWR9IHRyYWNlXG4gKiBAcHJvcGVydHkgeyguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZH0gaW5mb1xuICogQHByb3BlcnR5IHsoLi4uYXJnczogYW55W10pID0+IHZvaWR9IGxvZ1xuICogQHByb3BlcnR5IHsoLi4uYXJnczogYW55W10pID0+IHZvaWR9IHdhcm5cbiAqIEBwcm9wZXJ0eSB7KC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkfSBlcnJvclxuICogQHByb3BlcnR5IHsoLi4uYXJnczogYW55W10pID0+IHZvaWQ9fSBkZWJ1Z1xuICogQHByb3BlcnR5IHsoLi4uYXJnczogYW55W10pID0+IHZvaWQ9fSBncm91cFxuICogQHByb3BlcnR5IHsoLi4uYXJnczogYW55W10pID0+IHZvaWQ9fSBncm91cENvbGxhcHNlZFxuICogQHByb3BlcnR5IHsoLi4uYXJnczogYW55W10pID0+IHZvaWQ9fSBncm91cEVuZFxuICogQHByb3BlcnR5IHsoLi4uYXJnczogYW55W10pID0+IHZvaWQ9fSBzdGF0dXNcbiAqIEBwcm9wZXJ0eSB7KC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkPX0gcHJvZmlsZVxuICogQHByb3BlcnR5IHsoLi4uYXJnczogYW55W10pID0+IHZvaWQ9fSBwcm9maWxlRW5kXG4gKiBAcHJvcGVydHkgeyguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZD19IGxvZ1RpbWVcbiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIHtvYmplY3R9IExvZ2dlck9wdGlvbnNcbiAqIEBwcm9wZXJ0eSB7ZmFsc2V8dHJ1ZXxcIm5vbmVcInxcImVycm9yXCJ8XCJ3YXJuXCJ8XCJpbmZvXCJ8XCJsb2dcInxcInZlcmJvc2VcIn0gbGV2ZWwgbG9nbGV2ZWxcbiAqIEBwcm9wZXJ0eSB7RmlsdGVyVHlwZXN8Ym9vbGVhbn0gZGVidWcgZmlsdGVyIGZvciBkZWJ1ZyBsb2dnaW5nXG4gKiBAcHJvcGVydHkge0xvZ2dlckNvbnNvbGV9IGNvbnNvbGUgdGhlIGNvbnNvbGUgdG8gbG9nIHRvXG4gKi9cblxuLyoqXG4gKiBAcGFyYW0ge0ZpbHRlckl0ZW1UeXBlc30gaXRlbSBhbiBpbnB1dCBpdGVtXG4gKiBAcmV0dXJucyB7RmlsdGVyRnVuY3Rpb24gfCB1bmRlZmluZWR9IGZpbHRlciBmdW5jdGlvblxuICovXG52YXIgZmlsdGVyVG9GdW5jdGlvbiA9IGZ1bmN0aW9uIGZpbHRlclRvRnVuY3Rpb24oaXRlbSkge1xuICBpZiAodHlwZW9mIGl0ZW0gPT09IFwic3RyaW5nXCIpIHtcbiAgICB2YXIgcmVnRXhwID0gbmV3IFJlZ0V4cChcIltcXFxcXFxcXC9dXCIuY29uY2F0KGl0ZW0ucmVwbGFjZSgvWy1bXFxde30oKSorPy5cXFxcXiR8XS9nLCBcIlxcXFwkJlwiKSwgXCIoW1xcXFxcXFxcL118JHwhfFxcXFw/KVwiKSk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChpZGVudCkge1xuICAgICAgcmV0dXJuIHJlZ0V4cC50ZXN0KGlkZW50KTtcbiAgICB9O1xuICB9XG4gIGlmIChpdGVtICYmIHR5cGVvZiBpdGVtID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBpdGVtLnRlc3QgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHJldHVybiBmdW5jdGlvbiAoaWRlbnQpIHtcbiAgICAgIHJldHVybiBpdGVtLnRlc3QoaWRlbnQpO1xuICAgIH07XG4gIH1cbiAgaWYgKHR5cGVvZiBpdGVtID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICByZXR1cm4gaXRlbTtcbiAgfVxuICBpZiAodHlwZW9mIGl0ZW0gPT09IFwiYm9vbGVhblwiKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBpdGVtO1xuICAgIH07XG4gIH1cbn07XG5cbi8qKlxuICogQGVudW0ge251bWJlcn1cbiAqL1xudmFyIExvZ0xldmVsID0ge1xuICBub25lOiA2LFxuICBmYWxzZTogNixcbiAgZXJyb3I6IDUsXG4gIHdhcm46IDQsXG4gIGluZm86IDMsXG4gIGxvZzogMixcbiAgdHJ1ZTogMixcbiAgdmVyYm9zZTogMVxufTtcblxuLyoqXG4gKiBAcGFyYW0ge0xvZ2dlck9wdGlvbnN9IG9wdGlvbnMgb3B0aW9ucyBvYmplY3RcbiAqIEByZXR1cm5zIHtMb2dnaW5nRnVuY3Rpb259IGxvZ2dpbmcgZnVuY3Rpb25cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoX3JlZikge1xuICB2YXIgX3JlZiRsZXZlbCA9IF9yZWYubGV2ZWwsXG4gICAgbGV2ZWwgPSBfcmVmJGxldmVsID09PSB2b2lkIDAgPyBcImluZm9cIiA6IF9yZWYkbGV2ZWwsXG4gICAgX3JlZiRkZWJ1ZyA9IF9yZWYuZGVidWcsXG4gICAgZGVidWcgPSBfcmVmJGRlYnVnID09PSB2b2lkIDAgPyBmYWxzZSA6IF9yZWYkZGVidWcsXG4gICAgY29uc29sZSA9IF9yZWYuY29uc29sZTtcbiAgdmFyIGRlYnVnRmlsdGVycyA9IC8qKiBAdHlwZSB7RmlsdGVyRnVuY3Rpb25bXX0gKi9cblxuICB0eXBlb2YgZGVidWcgPT09IFwiYm9vbGVhblwiID8gW2Z1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZGVidWc7XG4gIH1dIDogLyoqIEB0eXBlIHtGaWx0ZXJJdGVtVHlwZXNbXX0gKi9bXS5jb25jYXQoZGVidWcpLm1hcChmaWx0ZXJUb0Z1bmN0aW9uKTtcbiAgLyoqIEB0eXBlIHtudW1iZXJ9ICovXG4gIHZhciBsb2dsZXZlbCA9IExvZ0xldmVsW1wiXCIuY29uY2F0KGxldmVsKV0gfHwgMDtcblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgbmFtZSBvZiB0aGUgbG9nZ2VyXG4gICAqIEBwYXJhbSB7TG9nVHlwZUVudW19IHR5cGUgdHlwZSBvZiB0aGUgbG9nIGVudHJ5XG4gICAqIEBwYXJhbSB7YW55W109fSBhcmdzIGFyZ3VtZW50cyBvZiB0aGUgbG9nIGVudHJ5XG4gICAqIEByZXR1cm5zIHt2b2lkfVxuICAgKi9cbiAgdmFyIGxvZ2dlciA9IGZ1bmN0aW9uIGxvZ2dlcihuYW1lLCB0eXBlLCBhcmdzKSB7XG4gICAgdmFyIGxhYmVsZWRBcmdzID0gZnVuY3Rpb24gbGFiZWxlZEFyZ3MoKSB7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShhcmdzKSkge1xuICAgICAgICBpZiAoYXJncy5sZW5ndGggPiAwICYmIHR5cGVvZiBhcmdzWzBdID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgcmV0dXJuIFtcIltcIi5jb25jYXQobmFtZSwgXCJdIFwiKS5jb25jYXQoYXJnc1swXSldLmNvbmNhdChfdG9Db25zdW1hYmxlQXJyYXkoYXJncy5zbGljZSgxKSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbXCJbXCIuY29uY2F0KG5hbWUsIFwiXVwiKV0uY29uY2F0KF90b0NvbnN1bWFibGVBcnJheShhcmdzKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gW107XG4gICAgfTtcbiAgICB2YXIgZGVidWcgPSBkZWJ1Z0ZpbHRlcnMuc29tZShmdW5jdGlvbiAoZikge1xuICAgICAgcmV0dXJuIGYobmFtZSk7XG4gICAgfSk7XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlIExvZ1R5cGUuZGVidWc6XG4gICAgICAgIGlmICghZGVidWcpIHJldHVybjtcbiAgICAgICAgaWYgKHR5cGVvZiBjb25zb2xlLmRlYnVnID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICBjb25zb2xlLmRlYnVnLmFwcGx5KGNvbnNvbGUsIF90b0NvbnN1bWFibGVBcnJheShsYWJlbGVkQXJncygpKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5sb2cuYXBwbHkoY29uc29sZSwgX3RvQ29uc3VtYWJsZUFycmF5KGxhYmVsZWRBcmdzKCkpKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgTG9nVHlwZS5sb2c6XG4gICAgICAgIGlmICghZGVidWcgJiYgbG9nbGV2ZWwgPiBMb2dMZXZlbC5sb2cpIHJldHVybjtcbiAgICAgICAgY29uc29sZS5sb2cuYXBwbHkoY29uc29sZSwgX3RvQ29uc3VtYWJsZUFycmF5KGxhYmVsZWRBcmdzKCkpKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIExvZ1R5cGUuaW5mbzpcbiAgICAgICAgaWYgKCFkZWJ1ZyAmJiBsb2dsZXZlbCA+IExvZ0xldmVsLmluZm8pIHJldHVybjtcbiAgICAgICAgY29uc29sZS5pbmZvLmFwcGx5KGNvbnNvbGUsIF90b0NvbnN1bWFibGVBcnJheShsYWJlbGVkQXJncygpKSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBMb2dUeXBlLndhcm46XG4gICAgICAgIGlmICghZGVidWcgJiYgbG9nbGV2ZWwgPiBMb2dMZXZlbC53YXJuKSByZXR1cm47XG4gICAgICAgIGNvbnNvbGUud2Fybi5hcHBseShjb25zb2xlLCBfdG9Db25zdW1hYmxlQXJyYXkobGFiZWxlZEFyZ3MoKSkpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgTG9nVHlwZS5lcnJvcjpcbiAgICAgICAgaWYgKCFkZWJ1ZyAmJiBsb2dsZXZlbCA+IExvZ0xldmVsLmVycm9yKSByZXR1cm47XG4gICAgICAgIGNvbnNvbGUuZXJyb3IuYXBwbHkoY29uc29sZSwgX3RvQ29uc3VtYWJsZUFycmF5KGxhYmVsZWRBcmdzKCkpKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIExvZ1R5cGUudHJhY2U6XG4gICAgICAgIGlmICghZGVidWcpIHJldHVybjtcbiAgICAgICAgY29uc29sZS50cmFjZSgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgTG9nVHlwZS5ncm91cENvbGxhcHNlZDpcbiAgICAgICAgaWYgKCFkZWJ1ZyAmJiBsb2dsZXZlbCA+IExvZ0xldmVsLmxvZykgcmV0dXJuO1xuICAgICAgICBpZiAoIWRlYnVnICYmIGxvZ2xldmVsID4gTG9nTGV2ZWwudmVyYm9zZSkge1xuICAgICAgICAgIGlmICh0eXBlb2YgY29uc29sZS5ncm91cENvbGxhcHNlZCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICBjb25zb2xlLmdyb3VwQ29sbGFwc2VkLmFwcGx5KGNvbnNvbGUsIF90b0NvbnN1bWFibGVBcnJheShsYWJlbGVkQXJncygpKSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nLmFwcGx5KGNvbnNvbGUsIF90b0NvbnN1bWFibGVBcnJheShsYWJlbGVkQXJncygpKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAvLyBmYWxscyB0aHJvdWdoXG4gICAgICBjYXNlIExvZ1R5cGUuZ3JvdXA6XG4gICAgICAgIGlmICghZGVidWcgJiYgbG9nbGV2ZWwgPiBMb2dMZXZlbC5sb2cpIHJldHVybjtcbiAgICAgICAgaWYgKHR5cGVvZiBjb25zb2xlLmdyb3VwID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICBjb25zb2xlLmdyb3VwLmFwcGx5KGNvbnNvbGUsIF90b0NvbnN1bWFibGVBcnJheShsYWJlbGVkQXJncygpKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5sb2cuYXBwbHkoY29uc29sZSwgX3RvQ29uc3VtYWJsZUFycmF5KGxhYmVsZWRBcmdzKCkpKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgTG9nVHlwZS5ncm91cEVuZDpcbiAgICAgICAgaWYgKCFkZWJ1ZyAmJiBsb2dsZXZlbCA+IExvZ0xldmVsLmxvZykgcmV0dXJuO1xuICAgICAgICBpZiAodHlwZW9mIGNvbnNvbGUuZ3JvdXBFbmQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgIGNvbnNvbGUuZ3JvdXBFbmQoKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgTG9nVHlwZS50aW1lOlxuICAgICAgICB7XG4gICAgICAgICAgaWYgKCFkZWJ1ZyAmJiBsb2dsZXZlbCA+IExvZ0xldmVsLmxvZykgcmV0dXJuO1xuICAgICAgICAgIHZhciBfYXJncyA9IF9zbGljZWRUb0FycmF5KC8qKiBAdHlwZSB7W3N0cmluZywgbnVtYmVyLCBudW1iZXJdfSAqL1xuICAgICAgICAgICAgYXJncywgMyksXG4gICAgICAgICAgICBsYWJlbCA9IF9hcmdzWzBdLFxuICAgICAgICAgICAgc3RhcnQgPSBfYXJnc1sxXSxcbiAgICAgICAgICAgIGVuZCA9IF9hcmdzWzJdO1xuICAgICAgICAgIHZhciBtcyA9IHN0YXJ0ICogMTAwMCArIGVuZCAvIDEwMDAwMDA7XG4gICAgICAgICAgdmFyIG1zZyA9IFwiW1wiLmNvbmNhdChuYW1lLCBcIl0gXCIpLmNvbmNhdChsYWJlbCwgXCI6IFwiKS5jb25jYXQobXMsIFwiIG1zXCIpO1xuICAgICAgICAgIGlmICh0eXBlb2YgY29uc29sZS5sb2dUaW1lID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nVGltZShtc2cpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhtc2cpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgY2FzZSBMb2dUeXBlLnByb2ZpbGU6XG4gICAgICAgIGlmICh0eXBlb2YgY29uc29sZS5wcm9maWxlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICBjb25zb2xlLnByb2ZpbGUuYXBwbHkoY29uc29sZSwgX3RvQ29uc3VtYWJsZUFycmF5KGxhYmVsZWRBcmdzKCkpKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgTG9nVHlwZS5wcm9maWxlRW5kOlxuICAgICAgICBpZiAodHlwZW9mIGNvbnNvbGUucHJvZmlsZUVuZCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgY29uc29sZS5wcm9maWxlRW5kLmFwcGx5KGNvbnNvbGUsIF90b0NvbnN1bWFibGVBcnJheShsYWJlbGVkQXJncygpKSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIExvZ1R5cGUuY2xlYXI6XG4gICAgICAgIGlmICghZGVidWcgJiYgbG9nbGV2ZWwgPiBMb2dMZXZlbC5sb2cpIHJldHVybjtcbiAgICAgICAgaWYgKHR5cGVvZiBjb25zb2xlLmNsZWFyID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICBjb25zb2xlLmNsZWFyKCk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIExvZ1R5cGUuc3RhdHVzOlxuICAgICAgICBpZiAoIWRlYnVnICYmIGxvZ2xldmVsID4gTG9nTGV2ZWwuaW5mbykgcmV0dXJuO1xuICAgICAgICBpZiAodHlwZW9mIGNvbnNvbGUuc3RhdHVzID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICBpZiAoIWFyZ3MgfHwgYXJncy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGNvbnNvbGUuc3RhdHVzKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUuc3RhdHVzLmFwcGx5KGNvbnNvbGUsIF90b0NvbnN1bWFibGVBcnJheShsYWJlbGVkQXJncygpKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGFyZ3MgJiYgYXJncy5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICBjb25zb2xlLmluZm8uYXBwbHkoY29uc29sZSwgX3RvQ29uc3VtYWJsZUFycmF5KGxhYmVsZWRBcmdzKCkpKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVuZXhwZWN0ZWQgTG9nVHlwZSBcIi5jb25jYXQodHlwZSkpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxvZ2dlcjtcbn07XG5cbi8qKiovIH0pLFxuXG4vKioqLyBcIi4vbm9kZV9tb2R1bGVzL3dlYnBhY2svbGliL2xvZ2dpbmcvcnVudGltZS5qc1wiOlxuLyohKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiohKlxcXG4gICEqKiogLi9ub2RlX21vZHVsZXMvd2VicGFjay9saWIvbG9nZ2luZy9ydW50aW1lLmpzICoqKiFcbiAgXFwqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIF9fdW51c2VkX3dlYnBhY2tfZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG4vKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuXG5cblxuZnVuY3Rpb24gX2V4dGVuZHMoKSB7XG4gIHJldHVybiBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gPyBPYmplY3QuYXNzaWduLmJpbmQoKSA6IGZ1bmN0aW9uIChuKSB7XG4gICAgZm9yICh2YXIgZSA9IDE7IGUgPCBhcmd1bWVudHMubGVuZ3RoOyBlKyspIHtcbiAgICAgIHZhciB0ID0gYXJndW1lbnRzW2VdO1xuICAgICAgZm9yICh2YXIgciBpbiB0KSAoe30pLmhhc093blByb3BlcnR5LmNhbGwodCwgcikgJiYgKG5bcl0gPSB0W3JdKTtcbiAgICB9XG4gICAgcmV0dXJuIG47XG4gIH0sIF9leHRlbmRzLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG59XG52YXIgX3JlcXVpcmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISB0YXBhYmxlICovIFwiLi9jbGllbnQtc3JjL21vZHVsZXMvbG9nZ2VyL3RhcGFibGUuanNcIiksXG4gIFN5bmNCYWlsSG9vayA9IF9yZXF1aXJlLlN5bmNCYWlsSG9vaztcbnZhciBfcmVxdWlyZTIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuL0xvZ2dlciAqLyBcIi4vbm9kZV9tb2R1bGVzL3dlYnBhY2svbGliL2xvZ2dpbmcvTG9nZ2VyLmpzXCIpLFxuICBMb2dnZXIgPSBfcmVxdWlyZTIuTG9nZ2VyO1xudmFyIGNyZWF0ZUNvbnNvbGVMb2dnZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuL2NyZWF0ZUNvbnNvbGVMb2dnZXIgKi8gXCIuL25vZGVfbW9kdWxlcy93ZWJwYWNrL2xpYi9sb2dnaW5nL2NyZWF0ZUNvbnNvbGVMb2dnZXIuanNcIik7XG5cbi8qKiBAdHlwZSB7Y3JlYXRlQ29uc29sZUxvZ2dlci5Mb2dnZXJPcHRpb25zfSAqL1xudmFyIGN1cnJlbnREZWZhdWx0TG9nZ2VyT3B0aW9ucyA9IHtcbiAgbGV2ZWw6IFwiaW5mb1wiLFxuICBkZWJ1ZzogZmFsc2UsXG4gIGNvbnNvbGU6IGNvbnNvbGVcbn07XG52YXIgY3VycmVudERlZmF1bHRMb2dnZXIgPSBjcmVhdGVDb25zb2xlTG9nZ2VyKGN1cnJlbnREZWZhdWx0TG9nZ2VyT3B0aW9ucyk7XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgbmFtZSBvZiB0aGUgbG9nZ2VyXG4gKiBAcmV0dXJucyB7TG9nZ2VyfSBhIGxvZ2dlclxuICovXG5tb2R1bGUuZXhwb3J0cy5nZXRMb2dnZXIgPSBmdW5jdGlvbiAobmFtZSkge1xuICByZXR1cm4gbmV3IExvZ2dlcihmdW5jdGlvbiAodHlwZSwgYXJncykge1xuICAgIGlmIChtb2R1bGUuZXhwb3J0cy5ob29rcy5sb2cuY2FsbChuYW1lLCB0eXBlLCBhcmdzKSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBjdXJyZW50RGVmYXVsdExvZ2dlcihuYW1lLCB0eXBlLCBhcmdzKTtcbiAgICB9XG4gIH0sIGZ1bmN0aW9uIChjaGlsZE5hbWUpIHtcbiAgICByZXR1cm4gbW9kdWxlLmV4cG9ydHMuZ2V0TG9nZ2VyKFwiXCIuY29uY2F0KG5hbWUsIFwiL1wiKS5jb25jYXQoY2hpbGROYW1lKSk7XG4gIH0pO1xufTtcblxuLyoqXG4gKiBAcGFyYW0ge2NyZWF0ZUNvbnNvbGVMb2dnZXIuTG9nZ2VyT3B0aW9uc30gb3B0aW9ucyBuZXcgb3B0aW9ucywgbWVyZ2Ugd2l0aCBvbGQgb3B0aW9uc1xuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbm1vZHVsZS5leHBvcnRzLmNvbmZpZ3VyZURlZmF1bHRMb2dnZXIgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICBfZXh0ZW5kcyhjdXJyZW50RGVmYXVsdExvZ2dlck9wdGlvbnMsIG9wdGlvbnMpO1xuICBjdXJyZW50RGVmYXVsdExvZ2dlciA9IGNyZWF0ZUNvbnNvbGVMb2dnZXIoY3VycmVudERlZmF1bHRMb2dnZXJPcHRpb25zKTtcbn07XG5tb2R1bGUuZXhwb3J0cy5ob29rcyA9IHtcbiAgbG9nOiBuZXcgU3luY0JhaWxIb29rKFtcIm9yaWdpblwiLCBcInR5cGVcIiwgXCJhcmdzXCJdKVxufTtcblxuLyoqKi8gfSlcblxuLyoqKioqKi8gXHR9KTtcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqKioqLyBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbi8qKioqKiovIFx0dmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuLyoqKioqKi8gXHRcbi8qKioqKiovIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbi8qKioqKiovIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuLyoqKioqKi8gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuLyoqKioqKi8gXHRcdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuLyoqKioqKi8gXHRcdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuLyoqKioqKi8gXHRcdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuLyoqKioqKi8gXHRcdH1cbi8qKioqKiovIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuLyoqKioqKi8gXHRcdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuLyoqKioqKi8gXHRcdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuLyoqKioqKi8gXHRcdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcbi8qKioqKiovIFx0XHRcdGV4cG9ydHM6IHt9XG4vKioqKioqLyBcdFx0fTtcbi8qKioqKiovIFx0XG4vKioqKioqLyBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4vKioqKioqLyBcdFx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG4vKioqKioqLyBcdFxuLyoqKioqKi8gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4vKioqKioqLyBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuLyoqKioqKi8gXHR9XG4vKioqKioqLyBcdFxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKioqKiovIFx0Lyogd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzICovXG4vKioqKioqLyBcdCFmdW5jdGlvbigpIHtcbi8qKioqKiovIFx0XHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG4vKioqKioqLyBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgZGVmaW5pdGlvbikge1xuLyoqKioqKi8gXHRcdFx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuLyoqKioqKi8gXHRcdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcbi8qKioqKiovIFx0XHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuLyoqKioqKi8gXHRcdFx0XHR9XG4vKioqKioqLyBcdFx0XHR9XG4vKioqKioqLyBcdFx0fTtcbi8qKioqKiovIFx0fSgpO1xuLyoqKioqKi8gXHRcbi8qKioqKiovIFx0Lyogd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCAqL1xuLyoqKioqKi8gXHQhZnVuY3Rpb24oKSB7XG4vKioqKioqLyBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqLCBwcm9wKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTsgfVxuLyoqKioqKi8gXHR9KCk7XG4vKioqKioqLyBcdFxuLyoqKioqKi8gXHQvKiB3ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0ICovXG4vKioqKioqLyBcdCFmdW5jdGlvbigpIHtcbi8qKioqKiovIFx0XHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4vKioqKioqLyBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuLyoqKioqKi8gXHRcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4vKioqKioqLyBcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuLyoqKioqKi8gXHRcdFx0fVxuLyoqKioqKi8gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKioqKiovIFx0XHR9O1xuLyoqKioqKi8gXHR9KCk7XG4vKioqKioqLyBcdFxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0ge307XG4vKiEqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiEqXFxcbiAgISoqKiAuL2NsaWVudC1zcmMvbW9kdWxlcy9sb2dnZXIvaW5kZXguanMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yKF9fd2VicGFja19leHBvcnRzX18pO1xuLyogaGFybW9ueSBleHBvcnQgKi8gX193ZWJwYWNrX3JlcXVpcmVfXy5kKF9fd2VicGFja19leHBvcnRzX18sIHtcbi8qIGhhcm1vbnkgZXhwb3J0ICovICAgXCJkZWZhdWx0XCI6IGZ1bmN0aW9uKCkgeyByZXR1cm4gLyogcmVleHBvcnQgZGVmYXVsdCBleHBvcnQgZnJvbSBuYW1lZCBtb2R1bGUgKi8gd2VicGFja19saWJfbG9nZ2luZ19ydW50aW1lX2pzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX187IH1cbi8qIGhhcm1vbnkgZXhwb3J0ICovIH0pO1xuLyogaGFybW9ueSBpbXBvcnQgKi8gdmFyIHdlYnBhY2tfbGliX2xvZ2dpbmdfcnVudGltZV9qc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgd2VicGFjay9saWIvbG9nZ2luZy9ydW50aW1lLmpzICovIFwiLi9ub2RlX21vZHVsZXMvd2VicGFjay9saWIvbG9nZ2luZy9ydW50aW1lLmpzXCIpO1xuXG52YXIgX193ZWJwYWNrX2V4cG9ydF90YXJnZXRfXyA9IGV4cG9ydHM7XG5mb3IodmFyIGkgaW4gX193ZWJwYWNrX2V4cG9ydHNfXykgX193ZWJwYWNrX2V4cG9ydF90YXJnZXRfX1tpXSA9IF9fd2VicGFja19leHBvcnRzX19baV07XG5pZihfX3dlYnBhY2tfZXhwb3J0c19fLl9fZXNNb2R1bGUpIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShfX3dlYnBhY2tfZXhwb3J0X3RhcmdldF9fLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKioqKiovIH0pKClcbjsiLCJmdW5jdGlvbiBvd25LZXlzKGUsIHIpIHsgdmFyIHQgPSBPYmplY3Qua2V5cyhlKTsgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHsgdmFyIG8gPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKGUpOyByICYmIChvID0gby5maWx0ZXIoZnVuY3Rpb24gKHIpIHsgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoZSwgcikuZW51bWVyYWJsZTsgfSkpLCB0LnB1c2guYXBwbHkodCwgbyk7IH0gcmV0dXJuIHQ7IH1cbmZ1bmN0aW9uIF9vYmplY3RTcHJlYWQoZSkgeyBmb3IgKHZhciByID0gMTsgciA8IGFyZ3VtZW50cy5sZW5ndGg7IHIrKykgeyB2YXIgdCA9IG51bGwgIT0gYXJndW1lbnRzW3JdID8gYXJndW1lbnRzW3JdIDoge307IHIgJSAyID8gb3duS2V5cyhPYmplY3QodCksICEwKS5mb3JFYWNoKGZ1bmN0aW9uIChyKSB7IF9kZWZpbmVQcm9wZXJ0eShlLCByLCB0W3JdKTsgfSkgOiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKGUsIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKHQpKSA6IG93bktleXMoT2JqZWN0KHQpKS5mb3JFYWNoKGZ1bmN0aW9uIChyKSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLCByLCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHQsIHIpKTsgfSk7IH0gcmV0dXJuIGU7IH1cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShlLCByLCB0KSB7IHJldHVybiAociA9IF90b1Byb3BlcnR5S2V5KHIpKSBpbiBlID8gT2JqZWN0LmRlZmluZVByb3BlcnR5KGUsIHIsIHsgdmFsdWU6IHQsIGVudW1lcmFibGU6ICEwLCBjb25maWd1cmFibGU6ICEwLCB3cml0YWJsZTogITAgfSkgOiBlW3JdID0gdCwgZTsgfVxuZnVuY3Rpb24gX3RvUHJvcGVydHlLZXkodCkgeyB2YXIgaSA9IF90b1ByaW1pdGl2ZSh0LCBcInN0cmluZ1wiKTsgcmV0dXJuIFwic3ltYm9sXCIgPT0gdHlwZW9mIGkgPyBpIDogaSArIFwiXCI7IH1cbmZ1bmN0aW9uIF90b1ByaW1pdGl2ZSh0LCByKSB7IGlmIChcIm9iamVjdFwiICE9IHR5cGVvZiB0IHx8ICF0KSByZXR1cm4gdDsgdmFyIGUgPSB0W1N5bWJvbC50b1ByaW1pdGl2ZV07IGlmICh2b2lkIDAgIT09IGUpIHsgdmFyIGkgPSBlLmNhbGwodCwgciB8fCBcImRlZmF1bHRcIik7IGlmIChcIm9iamVjdFwiICE9IHR5cGVvZiBpKSByZXR1cm4gaTsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkBAdG9QcmltaXRpdmUgbXVzdCByZXR1cm4gYSBwcmltaXRpdmUgdmFsdWUuXCIpOyB9IHJldHVybiAoXCJzdHJpbmdcIiA9PT0gciA/IFN0cmluZyA6IE51bWJlcikodCk7IH1cbi8vIFRoZSBlcnJvciBvdmVybGF5IGlzIGluc3BpcmVkIChhbmQgbW9zdGx5IGNvcGllZCkgZnJvbSBDcmVhdGUgUmVhY3QgQXBwIChodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2tpbmN1YmF0b3IvY3JlYXRlLXJlYWN0LWFwcClcbi8vIFRoZXksIGluIHR1cm4sIGdvdCBpbnNwaXJlZCBieSB3ZWJwYWNrLWhvdC1taWRkbGV3YXJlIChodHRwczovL2dpdGh1Yi5jb20vZ2xlbmphbWluL3dlYnBhY2staG90LW1pZGRsZXdhcmUpLlxuXG5pbXBvcnQgYW5zaUhUTUwgZnJvbSBcImFuc2ktaHRtbC1jb21tdW5pdHlcIjtcbmltcG9ydCB7IGVuY29kZSB9IGZyb20gXCJodG1sLWVudGl0aWVzXCI7XG5pbXBvcnQgeyBsaXN0ZW5Ub1J1bnRpbWVFcnJvciwgbGlzdGVuVG9VbmhhbmRsZWRSZWplY3Rpb24sIHBhcnNlRXJyb3JUb1N0YWNrcyB9IGZyb20gXCIuL292ZXJsYXkvcnVudGltZS1lcnJvci5qc1wiO1xuaW1wb3J0IGNyZWF0ZU92ZXJsYXlNYWNoaW5lIGZyb20gXCIuL292ZXJsYXkvc3RhdGUtbWFjaGluZS5qc1wiO1xuaW1wb3J0IHsgY29udGFpbmVyU3R5bGUsIGRpc21pc3NCdXR0b25TdHlsZSwgaGVhZGVyU3R5bGUsIGlmcmFtZVN0eWxlLCBtc2dTdHlsZXMsIG1zZ1RleHRTdHlsZSwgbXNnVHlwZVN0eWxlIH0gZnJvbSBcIi4vb3ZlcmxheS9zdHlsZXMuanNcIjtcbnZhciBjb2xvcnMgPSB7XG4gIHJlc2V0OiBbXCJ0cmFuc3BhcmVudFwiLCBcInRyYW5zcGFyZW50XCJdLFxuICBibGFjazogXCIxODE4MThcIixcbiAgcmVkOiBcIkUzNjA0OVwiLFxuICBncmVlbjogXCJCM0NCNzRcIixcbiAgeWVsbG93OiBcIkZGRDA4MFwiLFxuICBibHVlOiBcIjdDQUZDMlwiLFxuICBtYWdlbnRhOiBcIjdGQUNDQVwiLFxuICBjeWFuOiBcIkMzQzJFRlwiLFxuICBsaWdodGdyZXk6IFwiRUJFN0UzXCIsXG4gIGRhcmtncmV5OiBcIjZENzg5MVwiXG59O1xuYW5zaUhUTUwuc2V0Q29sb3JzKGNvbG9ycyk7XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAqIEBwYXJhbSB7c3RyaW5nICB8IHsgZmlsZT86IHN0cmluZywgbW9kdWxlTmFtZT86IHN0cmluZywgbG9jPzogc3RyaW5nLCBtZXNzYWdlPzogc3RyaW5nOyBzdGFjaz86IHN0cmluZ1tdIH19IGl0ZW1cbiAqIEByZXR1cm5zIHt7IGhlYWRlcjogc3RyaW5nLCBib2R5OiBzdHJpbmcgfX1cbiAqL1xuZnVuY3Rpb24gZm9ybWF0UHJvYmxlbSh0eXBlLCBpdGVtKSB7XG4gIHZhciBoZWFkZXIgPSB0eXBlID09PSBcIndhcm5pbmdcIiA/IFwiV0FSTklOR1wiIDogXCJFUlJPUlwiO1xuICB2YXIgYm9keSA9IFwiXCI7XG4gIGlmICh0eXBlb2YgaXRlbSA9PT0gXCJzdHJpbmdcIikge1xuICAgIGJvZHkgKz0gaXRlbTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgZmlsZSA9IGl0ZW0uZmlsZSB8fCBcIlwiO1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXN0ZWQtdGVybmFyeVxuICAgIHZhciBtb2R1bGVOYW1lID0gaXRlbS5tb2R1bGVOYW1lID8gaXRlbS5tb2R1bGVOYW1lLmluZGV4T2YoXCIhXCIpICE9PSAtMSA/IFwiXCIuY29uY2F0KGl0ZW0ubW9kdWxlTmFtZS5yZXBsYWNlKC9eKFxcc3xcXFMpKiEvLCBcIlwiKSwgXCIgKFwiKS5jb25jYXQoaXRlbS5tb2R1bGVOYW1lLCBcIilcIikgOiBcIlwiLmNvbmNhdChpdGVtLm1vZHVsZU5hbWUpIDogXCJcIjtcbiAgICB2YXIgbG9jID0gaXRlbS5sb2M7XG4gICAgaGVhZGVyICs9IFwiXCIuY29uY2F0KG1vZHVsZU5hbWUgfHwgZmlsZSA/IFwiIGluIFwiLmNvbmNhdChtb2R1bGVOYW1lID8gXCJcIi5jb25jYXQobW9kdWxlTmFtZSkuY29uY2F0KGZpbGUgPyBcIiAoXCIuY29uY2F0KGZpbGUsIFwiKVwiKSA6IFwiXCIpIDogZmlsZSkuY29uY2F0KGxvYyA/IFwiIFwiLmNvbmNhdChsb2MpIDogXCJcIikgOiBcIlwiKTtcbiAgICBib2R5ICs9IGl0ZW0ubWVzc2FnZSB8fCBcIlwiO1xuICB9XG4gIGlmIChBcnJheS5pc0FycmF5KGl0ZW0uc3RhY2spKSB7XG4gICAgaXRlbS5zdGFjay5mb3JFYWNoKGZ1bmN0aW9uIChzdGFjaykge1xuICAgICAgaWYgKHR5cGVvZiBzdGFjayA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICBib2R5ICs9IFwiXFxyXFxuXCIuY29uY2F0KHN0YWNrKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICByZXR1cm4ge1xuICAgIGhlYWRlcjogaGVhZGVyLFxuICAgIGJvZHk6IGJvZHlcbiAgfTtcbn1cblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBDcmVhdGVPdmVybGF5T3B0aW9uc1xuICogQHByb3BlcnR5IHtzdHJpbmcgfCBudWxsfSB0cnVzdGVkVHlwZXNQb2xpY3lOYW1lXG4gKiBAcHJvcGVydHkge2Jvb2xlYW4gfCAoZXJyb3I6IEVycm9yKSA9PiB2b2lkfSBbY2F0Y2hSdW50aW1lRXJyb3JdXG4gKi9cblxuLyoqXG4gKlxuICogQHBhcmFtIHtDcmVhdGVPdmVybGF5T3B0aW9uc30gb3B0aW9uc1xuICovXG52YXIgY3JlYXRlT3ZlcmxheSA9IGZ1bmN0aW9uIGNyZWF0ZU92ZXJsYXkob3B0aW9ucykge1xuICAvKiogQHR5cGUge0hUTUxJRnJhbWVFbGVtZW50IHwgbnVsbCB8IHVuZGVmaW5lZH0gKi9cbiAgdmFyIGlmcmFtZUNvbnRhaW5lckVsZW1lbnQ7XG4gIC8qKiBAdHlwZSB7SFRNTERpdkVsZW1lbnQgfCBudWxsIHwgdW5kZWZpbmVkfSAqL1xuICB2YXIgY29udGFpbmVyRWxlbWVudDtcbiAgLyoqIEB0eXBlIHtIVE1MRGl2RWxlbWVudCB8IG51bGwgfCB1bmRlZmluZWR9ICovXG4gIHZhciBoZWFkZXJFbGVtZW50O1xuICAvKiogQHR5cGUge0FycmF5PChlbGVtZW50OiBIVE1MRGl2RWxlbWVudCkgPT4gdm9pZD59ICovXG4gIHZhciBvbkxvYWRRdWV1ZSA9IFtdO1xuICAvKiogQHR5cGUge1RydXN0ZWRUeXBlUG9saWN5IHwgdW5kZWZpbmVkfSAqL1xuICB2YXIgb3ZlcmxheVRydXN0ZWRUeXBlc1BvbGljeTtcblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICAgKiBAcGFyYW0ge0NTU1N0eWxlRGVjbGFyYXRpb259IHN0eWxlXG4gICAqL1xuICBmdW5jdGlvbiBhcHBseVN0eWxlKGVsZW1lbnQsIHN0eWxlKSB7XG4gICAgT2JqZWN0LmtleXMoc3R5bGUpLmZvckVhY2goZnVuY3Rpb24gKHByb3ApIHtcbiAgICAgIGVsZW1lbnQuc3R5bGVbcHJvcF0gPSBzdHlsZVtwcm9wXTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZyB8IG51bGx9IHRydXN0ZWRUeXBlc1BvbGljeU5hbWVcbiAgICovXG4gIGZ1bmN0aW9uIGNyZWF0ZUNvbnRhaW5lcih0cnVzdGVkVHlwZXNQb2xpY3lOYW1lKSB7XG4gICAgLy8gRW5hYmxlIFRydXN0ZWQgVHlwZXMgaWYgdGhleSBhcmUgYXZhaWxhYmxlIGluIHRoZSBjdXJyZW50IGJyb3dzZXIuXG4gICAgaWYgKHdpbmRvdy50cnVzdGVkVHlwZXMpIHtcbiAgICAgIG92ZXJsYXlUcnVzdGVkVHlwZXNQb2xpY3kgPSB3aW5kb3cudHJ1c3RlZFR5cGVzLmNyZWF0ZVBvbGljeSh0cnVzdGVkVHlwZXNQb2xpY3lOYW1lIHx8IFwid2VicGFjay1kZXYtc2VydmVyI292ZXJsYXlcIiwge1xuICAgICAgICBjcmVhdGVIVE1MOiBmdW5jdGlvbiBjcmVhdGVIVE1MKHZhbHVlKSB7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgaWZyYW1lQ29udGFpbmVyRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpZnJhbWVcIik7XG4gICAgaWZyYW1lQ29udGFpbmVyRWxlbWVudC5pZCA9IFwid2VicGFjay1kZXYtc2VydmVyLWNsaWVudC1vdmVybGF5XCI7XG4gICAgaWZyYW1lQ29udGFpbmVyRWxlbWVudC5zcmMgPSBcImFib3V0OmJsYW5rXCI7XG4gICAgYXBwbHlTdHlsZShpZnJhbWVDb250YWluZXJFbGVtZW50LCBpZnJhbWVTdHlsZSk7XG4gICAgaWZyYW1lQ29udGFpbmVyRWxlbWVudC5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgY29udGVudEVsZW1lbnQgPSAvKiogQHR5cGUge0RvY3VtZW50fSAqL1xuICAgICAgKC8qKiBAdHlwZSB7SFRNTElGcmFtZUVsZW1lbnR9ICovXG4gICAgICBpZnJhbWVDb250YWluZXJFbGVtZW50LmNvbnRlbnREb2N1bWVudCkuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGNvbnRhaW5lckVsZW1lbnQgPSAvKiogQHR5cGUge0RvY3VtZW50fSAqL1xuICAgICAgKC8qKiBAdHlwZSB7SFRNTElGcmFtZUVsZW1lbnR9ICovXG4gICAgICBpZnJhbWVDb250YWluZXJFbGVtZW50LmNvbnRlbnREb2N1bWVudCkuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGNvbnRlbnRFbGVtZW50LmlkID0gXCJ3ZWJwYWNrLWRldi1zZXJ2ZXItY2xpZW50LW92ZXJsYXktZGl2XCI7XG4gICAgICBhcHBseVN0eWxlKGNvbnRlbnRFbGVtZW50LCBjb250YWluZXJTdHlsZSk7XG4gICAgICBoZWFkZXJFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGhlYWRlckVsZW1lbnQuaW5uZXJUZXh0ID0gXCJDb21waWxlZCB3aXRoIHByb2JsZW1zOlwiO1xuICAgICAgYXBwbHlTdHlsZShoZWFkZXJFbGVtZW50LCBoZWFkZXJTdHlsZSk7XG4gICAgICB2YXIgY2xvc2VCdXR0b25FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgIGFwcGx5U3R5bGUoY2xvc2VCdXR0b25FbGVtZW50LCBkaXNtaXNzQnV0dG9uU3R5bGUpO1xuICAgICAgY2xvc2VCdXR0b25FbGVtZW50LmlubmVyVGV4dCA9IFwiw5dcIjtcbiAgICAgIGNsb3NlQnV0dG9uRWxlbWVudC5hcmlhTGFiZWwgPSBcIkRpc21pc3NcIjtcbiAgICAgIGNsb3NlQnV0dG9uRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdXNlLWJlZm9yZS1kZWZpbmVcbiAgICAgICAgb3ZlcmxheVNlcnZpY2Uuc2VuZCh7XG4gICAgICAgICAgdHlwZTogXCJESVNNSVNTXCJcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIGNvbnRlbnRFbGVtZW50LmFwcGVuZENoaWxkKGhlYWRlckVsZW1lbnQpO1xuICAgICAgY29udGVudEVsZW1lbnQuYXBwZW5kQ2hpbGQoY2xvc2VCdXR0b25FbGVtZW50KTtcbiAgICAgIGNvbnRlbnRFbGVtZW50LmFwcGVuZENoaWxkKGNvbnRhaW5lckVsZW1lbnQpO1xuXG4gICAgICAvKiogQHR5cGUge0RvY3VtZW50fSAqL1xuICAgICAgKC8qKiBAdHlwZSB7SFRNTElGcmFtZUVsZW1lbnR9ICovXG4gICAgICBpZnJhbWVDb250YWluZXJFbGVtZW50LmNvbnRlbnREb2N1bWVudCkuYm9keS5hcHBlbmRDaGlsZChjb250ZW50RWxlbWVudCk7XG4gICAgICBvbkxvYWRRdWV1ZS5mb3JFYWNoKGZ1bmN0aW9uIChvbkxvYWQpIHtcbiAgICAgICAgb25Mb2FkKC8qKiBAdHlwZSB7SFRNTERpdkVsZW1lbnR9ICovY29udGVudEVsZW1lbnQpO1xuICAgICAgfSk7XG4gICAgICBvbkxvYWRRdWV1ZSA9IFtdO1xuXG4gICAgICAvKiogQHR5cGUge0hUTUxJRnJhbWVFbGVtZW50fSAqL1xuICAgICAgaWZyYW1lQ29udGFpbmVyRWxlbWVudC5vbmxvYWQgPSBudWxsO1xuICAgIH07XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChpZnJhbWVDb250YWluZXJFbGVtZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyhlbGVtZW50OiBIVE1MRGl2RWxlbWVudCkgPT4gdm9pZH0gY2FsbGJhY2tcbiAgICogQHBhcmFtIHtzdHJpbmcgfCBudWxsfSB0cnVzdGVkVHlwZXNQb2xpY3lOYW1lXG4gICAqL1xuICBmdW5jdGlvbiBlbnN1cmVPdmVybGF5RXhpc3RzKGNhbGxiYWNrLCB0cnVzdGVkVHlwZXNQb2xpY3lOYW1lKSB7XG4gICAgaWYgKGNvbnRhaW5lckVsZW1lbnQpIHtcbiAgICAgIGNvbnRhaW5lckVsZW1lbnQuaW5uZXJIVE1MID0gb3ZlcmxheVRydXN0ZWRUeXBlc1BvbGljeSA/IG92ZXJsYXlUcnVzdGVkVHlwZXNQb2xpY3kuY3JlYXRlSFRNTChcIlwiKSA6IFwiXCI7XG4gICAgICAvLyBFdmVyeXRoaW5nIGlzIHJlYWR5LCBjYWxsIHRoZSBjYWxsYmFjayByaWdodCBhd2F5LlxuICAgICAgY2FsbGJhY2soY29udGFpbmVyRWxlbWVudCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIG9uTG9hZFF1ZXVlLnB1c2goY2FsbGJhY2spO1xuICAgIGlmIChpZnJhbWVDb250YWluZXJFbGVtZW50KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNyZWF0ZUNvbnRhaW5lcih0cnVzdGVkVHlwZXNQb2xpY3lOYW1lKTtcbiAgfVxuXG4gIC8vIFN1Y2Nlc3NmdWwgY29tcGlsYXRpb24uXG4gIGZ1bmN0aW9uIGhpZGUoKSB7XG4gICAgaWYgKCFpZnJhbWVDb250YWluZXJFbGVtZW50KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gQ2xlYW4gdXAgYW5kIHJlc2V0IGludGVybmFsIHN0YXRlLlxuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoaWZyYW1lQ29udGFpbmVyRWxlbWVudCk7XG4gICAgaWZyYW1lQ29udGFpbmVyRWxlbWVudCA9IG51bGw7XG4gICAgY29udGFpbmVyRWxlbWVudCA9IG51bGw7XG4gIH1cblxuICAvLyBDb21waWxhdGlvbiB3aXRoIGVycm9ycyAoZS5nLiBzeW50YXggZXJyb3Igb3IgbWlzc2luZyBtb2R1bGVzKS5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gICAqIEBwYXJhbSB7QXJyYXk8c3RyaW5nICB8IHsgbW9kdWxlSWRlbnRpZmllcj86IHN0cmluZywgbW9kdWxlTmFtZT86IHN0cmluZywgbG9jPzogc3RyaW5nLCBtZXNzYWdlPzogc3RyaW5nIH0+fSBtZXNzYWdlc1xuICAgKiBAcGFyYW0ge3N0cmluZyB8IG51bGx9IHRydXN0ZWRUeXBlc1BvbGljeU5hbWVcbiAgICogQHBhcmFtIHsnYnVpbGQnIHwgJ3J1bnRpbWUnfSBtZXNzYWdlU291cmNlXG4gICAqL1xuICBmdW5jdGlvbiBzaG93KHR5cGUsIG1lc3NhZ2VzLCB0cnVzdGVkVHlwZXNQb2xpY3lOYW1lLCBtZXNzYWdlU291cmNlKSB7XG4gICAgZW5zdXJlT3ZlcmxheUV4aXN0cyhmdW5jdGlvbiAoKSB7XG4gICAgICBoZWFkZXJFbGVtZW50LmlubmVyVGV4dCA9IG1lc3NhZ2VTb3VyY2UgPT09IFwicnVudGltZVwiID8gXCJVbmNhdWdodCBydW50aW1lIGVycm9yczpcIiA6IFwiQ29tcGlsZWQgd2l0aCBwcm9ibGVtczpcIjtcbiAgICAgIG1lc3NhZ2VzLmZvckVhY2goZnVuY3Rpb24gKG1lc3NhZ2UpIHtcbiAgICAgICAgdmFyIGVudHJ5RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHZhciBtc2dTdHlsZSA9IHR5cGUgPT09IFwid2FybmluZ1wiID8gbXNnU3R5bGVzLndhcm5pbmcgOiBtc2dTdHlsZXMuZXJyb3I7XG4gICAgICAgIGFwcGx5U3R5bGUoZW50cnlFbGVtZW50LCBfb2JqZWN0U3ByZWFkKF9vYmplY3RTcHJlYWQoe30sIG1zZ1N0eWxlKSwge30sIHtcbiAgICAgICAgICBwYWRkaW5nOiBcIjFyZW0gMXJlbSAxLjVyZW0gMXJlbVwiXG4gICAgICAgIH0pKTtcbiAgICAgICAgdmFyIHR5cGVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgdmFyIF9mb3JtYXRQcm9ibGVtID0gZm9ybWF0UHJvYmxlbSh0eXBlLCBtZXNzYWdlKSxcbiAgICAgICAgICBoZWFkZXIgPSBfZm9ybWF0UHJvYmxlbS5oZWFkZXIsXG4gICAgICAgICAgYm9keSA9IF9mb3JtYXRQcm9ibGVtLmJvZHk7XG4gICAgICAgIHR5cGVFbGVtZW50LmlubmVyVGV4dCA9IGhlYWRlcjtcbiAgICAgICAgYXBwbHlTdHlsZSh0eXBlRWxlbWVudCwgbXNnVHlwZVN0eWxlKTtcbiAgICAgICAgaWYgKG1lc3NhZ2UubW9kdWxlSWRlbnRpZmllcikge1xuICAgICAgICAgIGFwcGx5U3R5bGUodHlwZUVsZW1lbnQsIHtcbiAgICAgICAgICAgIGN1cnNvcjogXCJwb2ludGVyXCJcbiAgICAgICAgICB9KTtcbiAgICAgICAgICAvLyBlbGVtZW50LmRhdGFzZXQgbm90IHN1cHBvcnRlZCBpbiBJRVxuICAgICAgICAgIHR5cGVFbGVtZW50LnNldEF0dHJpYnV0ZShcImRhdGEtY2FuLW9wZW5cIiwgdHJ1ZSk7XG4gICAgICAgICAgdHlwZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGZldGNoKFwiL3dlYnBhY2stZGV2LXNlcnZlci9vcGVuLWVkaXRvcj9maWxlTmFtZT1cIi5jb25jYXQobWVzc2FnZS5tb2R1bGVJZGVudGlmaWVyKSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBNYWtlIGl0IGxvb2sgc2ltaWxhciB0byBvdXIgdGVybWluYWwuXG4gICAgICAgIHZhciB0ZXh0ID0gYW5zaUhUTUwoZW5jb2RlKGJvZHkpKTtcbiAgICAgICAgdmFyIG1lc3NhZ2VUZXh0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGFwcGx5U3R5bGUobWVzc2FnZVRleHROb2RlLCBtc2dUZXh0U3R5bGUpO1xuICAgICAgICBtZXNzYWdlVGV4dE5vZGUuaW5uZXJIVE1MID0gb3ZlcmxheVRydXN0ZWRUeXBlc1BvbGljeSA/IG92ZXJsYXlUcnVzdGVkVHlwZXNQb2xpY3kuY3JlYXRlSFRNTCh0ZXh0KSA6IHRleHQ7XG4gICAgICAgIGVudHJ5RWxlbWVudC5hcHBlbmRDaGlsZCh0eXBlRWxlbWVudCk7XG4gICAgICAgIGVudHJ5RWxlbWVudC5hcHBlbmRDaGlsZChtZXNzYWdlVGV4dE5vZGUpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7SFRNTERpdkVsZW1lbnR9ICovXG4gICAgICAgIGNvbnRhaW5lckVsZW1lbnQuYXBwZW5kQ2hpbGQoZW50cnlFbGVtZW50KTtcbiAgICAgIH0pO1xuICAgIH0sIHRydXN0ZWRUeXBlc1BvbGljeU5hbWUpO1xuICB9XG4gIHZhciBvdmVybGF5U2VydmljZSA9IGNyZWF0ZU92ZXJsYXlNYWNoaW5lKHtcbiAgICBzaG93T3ZlcmxheTogZnVuY3Rpb24gc2hvd092ZXJsYXkoX3JlZikge1xuICAgICAgdmFyIF9yZWYkbGV2ZWwgPSBfcmVmLmxldmVsLFxuICAgICAgICBsZXZlbCA9IF9yZWYkbGV2ZWwgPT09IHZvaWQgMCA/IFwiZXJyb3JcIiA6IF9yZWYkbGV2ZWwsXG4gICAgICAgIG1lc3NhZ2VzID0gX3JlZi5tZXNzYWdlcyxcbiAgICAgICAgbWVzc2FnZVNvdXJjZSA9IF9yZWYubWVzc2FnZVNvdXJjZTtcbiAgICAgIHJldHVybiBzaG93KGxldmVsLCBtZXNzYWdlcywgb3B0aW9ucy50cnVzdGVkVHlwZXNQb2xpY3lOYW1lLCBtZXNzYWdlU291cmNlKTtcbiAgICB9LFxuICAgIGhpZGVPdmVybGF5OiBoaWRlXG4gIH0pO1xuICBpZiAob3B0aW9ucy5jYXRjaFJ1bnRpbWVFcnJvcikge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7RXJyb3IgfCB1bmRlZmluZWR9IGVycm9yXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGZhbGxiYWNrTWVzc2FnZVxuICAgICAqL1xuICAgIHZhciBoYW5kbGVFcnJvciA9IGZ1bmN0aW9uIGhhbmRsZUVycm9yKGVycm9yLCBmYWxsYmFja01lc3NhZ2UpIHtcbiAgICAgIHZhciBlcnJvck9iamVjdCA9IGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvciA6IG5ldyBFcnJvcihlcnJvciB8fCBmYWxsYmFja01lc3NhZ2UpO1xuICAgICAgdmFyIHNob3VsZERpc3BsYXkgPSB0eXBlb2Ygb3B0aW9ucy5jYXRjaFJ1bnRpbWVFcnJvciA9PT0gXCJmdW5jdGlvblwiID8gb3B0aW9ucy5jYXRjaFJ1bnRpbWVFcnJvcihlcnJvck9iamVjdCkgOiB0cnVlO1xuICAgICAgaWYgKHNob3VsZERpc3BsYXkpIHtcbiAgICAgICAgb3ZlcmxheVNlcnZpY2Uuc2VuZCh7XG4gICAgICAgICAgdHlwZTogXCJSVU5USU1FX0VSUk9SXCIsXG4gICAgICAgICAgbWVzc2FnZXM6IFt7XG4gICAgICAgICAgICBtZXNzYWdlOiBlcnJvck9iamVjdC5tZXNzYWdlLFxuICAgICAgICAgICAgc3RhY2s6IHBhcnNlRXJyb3JUb1N0YWNrcyhlcnJvck9iamVjdClcbiAgICAgICAgICB9XVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICAgIGxpc3RlblRvUnVudGltZUVycm9yKGZ1bmN0aW9uIChlcnJvckV2ZW50KSB7XG4gICAgICAvLyBlcnJvciBwcm9wZXJ0eSBtYXkgYmUgZW1wdHkgaW4gb2xkZXIgYnJvd3NlciBsaWtlIElFXG4gICAgICB2YXIgZXJyb3IgPSBlcnJvckV2ZW50LmVycm9yLFxuICAgICAgICBtZXNzYWdlID0gZXJyb3JFdmVudC5tZXNzYWdlO1xuICAgICAgaWYgKCFlcnJvciAmJiAhbWVzc2FnZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBoYW5kbGVFcnJvcihlcnJvciwgbWVzc2FnZSk7XG4gICAgfSk7XG4gICAgbGlzdGVuVG9VbmhhbmRsZWRSZWplY3Rpb24oZnVuY3Rpb24gKHByb21pc2VSZWplY3Rpb25FdmVudCkge1xuICAgICAgdmFyIHJlYXNvbiA9IHByb21pc2VSZWplY3Rpb25FdmVudC5yZWFzb247XG4gICAgICBoYW5kbGVFcnJvcihyZWFzb24sIFwiVW5rbm93biBwcm9taXNlIHJlamVjdGlvbiByZWFzb25cIik7XG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIG92ZXJsYXlTZXJ2aWNlO1xufTtcbmV4cG9ydCB7IGZvcm1hdFByb2JsZW0sIGNyZWF0ZU92ZXJsYXkgfTsiLCJmdW5jdGlvbiBvd25LZXlzKGUsIHIpIHsgdmFyIHQgPSBPYmplY3Qua2V5cyhlKTsgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHsgdmFyIG8gPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKGUpOyByICYmIChvID0gby5maWx0ZXIoZnVuY3Rpb24gKHIpIHsgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoZSwgcikuZW51bWVyYWJsZTsgfSkpLCB0LnB1c2guYXBwbHkodCwgbyk7IH0gcmV0dXJuIHQ7IH1cbmZ1bmN0aW9uIF9vYmplY3RTcHJlYWQoZSkgeyBmb3IgKHZhciByID0gMTsgciA8IGFyZ3VtZW50cy5sZW5ndGg7IHIrKykgeyB2YXIgdCA9IG51bGwgIT0gYXJndW1lbnRzW3JdID8gYXJndW1lbnRzW3JdIDoge307IHIgJSAyID8gb3duS2V5cyhPYmplY3QodCksICEwKS5mb3JFYWNoKGZ1bmN0aW9uIChyKSB7IF9kZWZpbmVQcm9wZXJ0eShlLCByLCB0W3JdKTsgfSkgOiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKGUsIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKHQpKSA6IG93bktleXMoT2JqZWN0KHQpKS5mb3JFYWNoKGZ1bmN0aW9uIChyKSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLCByLCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHQsIHIpKTsgfSk7IH0gcmV0dXJuIGU7IH1cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShlLCByLCB0KSB7IHJldHVybiAociA9IF90b1Byb3BlcnR5S2V5KHIpKSBpbiBlID8gT2JqZWN0LmRlZmluZVByb3BlcnR5KGUsIHIsIHsgdmFsdWU6IHQsIGVudW1lcmFibGU6ICEwLCBjb25maWd1cmFibGU6ICEwLCB3cml0YWJsZTogITAgfSkgOiBlW3JdID0gdCwgZTsgfVxuZnVuY3Rpb24gX3RvUHJvcGVydHlLZXkodCkgeyB2YXIgaSA9IF90b1ByaW1pdGl2ZSh0LCBcInN0cmluZ1wiKTsgcmV0dXJuIFwic3ltYm9sXCIgPT0gdHlwZW9mIGkgPyBpIDogaSArIFwiXCI7IH1cbmZ1bmN0aW9uIF90b1ByaW1pdGl2ZSh0LCByKSB7IGlmIChcIm9iamVjdFwiICE9IHR5cGVvZiB0IHx8ICF0KSByZXR1cm4gdDsgdmFyIGUgPSB0W1N5bWJvbC50b1ByaW1pdGl2ZV07IGlmICh2b2lkIDAgIT09IGUpIHsgdmFyIGkgPSBlLmNhbGwodCwgciB8fCBcImRlZmF1bHRcIik7IGlmIChcIm9iamVjdFwiICE9IHR5cGVvZiBpKSByZXR1cm4gaTsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkBAdG9QcmltaXRpdmUgbXVzdCByZXR1cm4gYSBwcmltaXRpdmUgdmFsdWUuXCIpOyB9IHJldHVybiAoXCJzdHJpbmdcIiA9PT0gciA/IFN0cmluZyA6IE51bWJlcikodCk7IH1cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gU3RhdGVEZWZpbml0aW9uc1xuICogQHByb3BlcnR5IHt7W2V2ZW50OiBzdHJpbmddOiB7IHRhcmdldDogc3RyaW5nOyBhY3Rpb25zPzogQXJyYXk8c3RyaW5nPiB9fX0gW29uXVxuICovXG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gT3B0aW9uc1xuICogQHByb3BlcnR5IHt7W3N0YXRlOiBzdHJpbmddOiBTdGF0ZURlZmluaXRpb25zfX0gc3RhdGVzXG4gKiBAcHJvcGVydHkge29iamVjdH0gY29udGV4dDtcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBpbml0aWFsXG4gKi9cblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBJbXBsZW1lbnRhdGlvblxuICogQHByb3BlcnR5IHt7W2FjdGlvbk5hbWU6IHN0cmluZ106IChjdHg6IG9iamVjdCwgZXZlbnQ6IGFueSkgPT4gb2JqZWN0fX0gYWN0aW9uc1xuICovXG5cbi8qKlxuICogQSBzaW1wbGlmaWVkIGBjcmVhdGVNYWNoaW5lYCBmcm9tIGBAeHN0YXRlL2ZzbWAgd2l0aCB0aGUgZm9sbG93aW5nIGRpZmZlcmVuY2VzOlxuICpcbiAqICAtIHRoZSByZXR1cm5lZCBtYWNoaW5lIGlzIHRlY2huaWNhbGx5IGEgXCJzZXJ2aWNlXCIuIE5vIGBpbnRlcnByZXQobWFjaGluZSkuc3RhcnQoKWAgaXMgbmVlZGVkLlxuICogIC0gdGhlIHN0YXRlIGRlZmluaXRpb24gb25seSBzdXBwb3J0IGBvbmAgYW5kIHRhcmdldCBtdXN0IGJlIGRlY2xhcmVkIHdpdGggeyB0YXJnZXQ6ICduZXh0U3RhdGUnLCBhY3Rpb25zOiBbXSB9IGV4cGxpY2l0bHkuXG4gKiAgLSBldmVudCBwYXNzZWQgdG8gYHNlbmRgIG11c3QgYmUgYW4gb2JqZWN0IHdpdGggYHR5cGVgIHByb3BlcnR5LlxuICogIC0gYWN0aW9ucyBpbXBsZW1lbnRhdGlvbiB3aWxsIGJlIFthc3NpZ24gYWN0aW9uXShodHRwczovL3hzdGF0ZS5qcy5vcmcvZG9jcy9ndWlkZXMvY29udGV4dC5odG1sI2Fzc2lnbi1hY3Rpb24pIGlmIHlvdSByZXR1cm4gYW55IHZhbHVlLlxuICogIERvIG5vdCByZXR1cm4gYW55dGhpbmcgaWYgeW91IGp1c3Qgd2FudCB0byBpbnZva2Ugc2lkZSBlZmZlY3QuXG4gKlxuICogVGhlIGdvYWwgb2YgdGhpcyBjdXN0b20gZnVuY3Rpb24gaXMgdG8gYXZvaWQgaW5zdGFsbGluZyB0aGUgZW50aXJlIGAneHN0YXRlL2ZzbSdgIHBhY2thZ2UsIHdoaWxlIGVuYWJsaW5nIG1vZGVsaW5nIHVzaW5nXG4gKiBzdGF0ZSBtYWNoaW5lLiBZb3UgY2FuIGNvcHkgdGhlIGZpcnN0IHBhcmFtZXRlciBpbnRvIHRoZSBlZGl0b3IgYXQgaHR0cHM6Ly9zdGF0ZWx5LmFpL3ZpeiB0byB2aXN1YWxpemUgdGhlIHN0YXRlIG1hY2hpbmUuXG4gKlxuICogQHBhcmFtIHtPcHRpb25zfSBvcHRpb25zXG4gKiBAcGFyYW0ge0ltcGxlbWVudGF0aW9ufSBpbXBsZW1lbnRhdGlvblxuICovXG5mdW5jdGlvbiBjcmVhdGVNYWNoaW5lKF9yZWYsIF9yZWYyKSB7XG4gIHZhciBzdGF0ZXMgPSBfcmVmLnN0YXRlcyxcbiAgICBjb250ZXh0ID0gX3JlZi5jb250ZXh0LFxuICAgIGluaXRpYWwgPSBfcmVmLmluaXRpYWw7XG4gIHZhciBhY3Rpb25zID0gX3JlZjIuYWN0aW9ucztcbiAgdmFyIGN1cnJlbnRTdGF0ZSA9IGluaXRpYWw7XG4gIHZhciBjdXJyZW50Q29udGV4dCA9IGNvbnRleHQ7XG4gIHJldHVybiB7XG4gICAgc2VuZDogZnVuY3Rpb24gc2VuZChldmVudCkge1xuICAgICAgdmFyIGN1cnJlbnRTdGF0ZU9uID0gc3RhdGVzW2N1cnJlbnRTdGF0ZV0ub247XG4gICAgICB2YXIgdHJhbnNpdGlvbkNvbmZpZyA9IGN1cnJlbnRTdGF0ZU9uICYmIGN1cnJlbnRTdGF0ZU9uW2V2ZW50LnR5cGVdO1xuICAgICAgaWYgKHRyYW5zaXRpb25Db25maWcpIHtcbiAgICAgICAgY3VycmVudFN0YXRlID0gdHJhbnNpdGlvbkNvbmZpZy50YXJnZXQ7XG4gICAgICAgIGlmICh0cmFuc2l0aW9uQ29uZmlnLmFjdGlvbnMpIHtcbiAgICAgICAgICB0cmFuc2l0aW9uQ29uZmlnLmFjdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAoYWN0TmFtZSkge1xuICAgICAgICAgICAgdmFyIGFjdGlvbkltcGwgPSBhY3Rpb25zW2FjdE5hbWVdO1xuICAgICAgICAgICAgdmFyIG5leHRDb250ZXh0VmFsdWUgPSBhY3Rpb25JbXBsICYmIGFjdGlvbkltcGwoY3VycmVudENvbnRleHQsIGV2ZW50KTtcbiAgICAgICAgICAgIGlmIChuZXh0Q29udGV4dFZhbHVlKSB7XG4gICAgICAgICAgICAgIGN1cnJlbnRDb250ZXh0ID0gX29iamVjdFNwcmVhZChfb2JqZWN0U3ByZWFkKHt9LCBjdXJyZW50Q29udGV4dCksIG5leHRDb250ZXh0VmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xufVxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlTWFjaGluZTsiLCIvKipcbiAqXG4gKiBAcGFyYW0ge0Vycm9yfSBlcnJvclxuICovXG5mdW5jdGlvbiBwYXJzZUVycm9yVG9TdGFja3MoZXJyb3IpIHtcbiAgaWYgKCFlcnJvciB8fCAhKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwicGFyc2VFcnJvclRvU3RhY2tzIGV4cGVjdHMgRXJyb3Igb2JqZWN0XCIpO1xuICB9XG4gIGlmICh0eXBlb2YgZXJyb3Iuc3RhY2sgPT09IFwic3RyaW5nXCIpIHtcbiAgICByZXR1cm4gZXJyb3Iuc3RhY2suc3BsaXQoXCJcXG5cIikuZmlsdGVyKGZ1bmN0aW9uIChzdGFjaykge1xuICAgICAgcmV0dXJuIHN0YWNrICE9PSBcIkVycm9yOiBcIi5jb25jYXQoZXJyb3IubWVzc2FnZSk7XG4gICAgfSk7XG4gIH1cbn1cblxuLyoqXG4gKiBAY2FsbGJhY2sgRXJyb3JDYWxsYmFja1xuICogQHBhcmFtIHtFcnJvckV2ZW50fSBlcnJvclxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cblxuLyoqXG4gKiBAcGFyYW0ge0Vycm9yQ2FsbGJhY2t9IGNhbGxiYWNrXG4gKi9cbmZ1bmN0aW9uIGxpc3RlblRvUnVudGltZUVycm9yKGNhbGxiYWNrKSB7XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiZXJyb3JcIiwgY2FsbGJhY2spO1xuICByZXR1cm4gZnVuY3Rpb24gY2xlYW51cCgpIHtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsIGNhbGxiYWNrKTtcbiAgfTtcbn1cblxuLyoqXG4gKiBAY2FsbGJhY2sgVW5oYW5kbGVkUmVqZWN0aW9uQ2FsbGJhY2tcbiAqIEBwYXJhbSB7UHJvbWlzZVJlamVjdGlvbkV2ZW50fSByZWplY3Rpb25FdmVudFxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cblxuLyoqXG4gKiBAcGFyYW0ge1VuaGFuZGxlZFJlamVjdGlvbkNhbGxiYWNrfSBjYWxsYmFja1xuICovXG5mdW5jdGlvbiBsaXN0ZW5Ub1VuaGFuZGxlZFJlamVjdGlvbihjYWxsYmFjaykge1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInVuaGFuZGxlZHJlamVjdGlvblwiLCBjYWxsYmFjayk7XG4gIHJldHVybiBmdW5jdGlvbiBjbGVhbnVwKCkge1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwidW5oYW5kbGVkcmVqZWN0aW9uXCIsIGNhbGxiYWNrKTtcbiAgfTtcbn1cbmV4cG9ydCB7IGxpc3RlblRvUnVudGltZUVycm9yLCBsaXN0ZW5Ub1VuaGFuZGxlZFJlamVjdGlvbiwgcGFyc2VFcnJvclRvU3RhY2tzIH07IiwiaW1wb3J0IGNyZWF0ZU1hY2hpbmUgZnJvbSBcIi4vZnNtLmpzXCI7XG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gU2hvd092ZXJsYXlEYXRhXG4gKiBAcHJvcGVydHkgeyd3YXJuaW5nJyB8ICdlcnJvcid9IGxldmVsXG4gKiBAcHJvcGVydHkge0FycmF5PHN0cmluZyAgfCB7IG1vZHVsZUlkZW50aWZpZXI/OiBzdHJpbmcsIG1vZHVsZU5hbWU/OiBzdHJpbmcsIGxvYz86IHN0cmluZywgbWVzc2FnZT86IHN0cmluZyB9Pn0gbWVzc2FnZXNcbiAqIEBwcm9wZXJ0eSB7J2J1aWxkJyB8ICdydW50aW1lJ30gbWVzc2FnZVNvdXJjZVxuICovXG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gQ3JlYXRlT3ZlcmxheU1hY2hpbmVPcHRpb25zXG4gKiBAcHJvcGVydHkgeyhkYXRhOiBTaG93T3ZlcmxheURhdGEpID0+IHZvaWR9IHNob3dPdmVybGF5XG4gKiBAcHJvcGVydHkgeygpID0+IHZvaWR9IGhpZGVPdmVybGF5XG4gKi9cblxuLyoqXG4gKiBAcGFyYW0ge0NyZWF0ZU92ZXJsYXlNYWNoaW5lT3B0aW9uc30gb3B0aW9uc1xuICovXG52YXIgY3JlYXRlT3ZlcmxheU1hY2hpbmUgPSBmdW5jdGlvbiBjcmVhdGVPdmVybGF5TWFjaGluZShvcHRpb25zKSB7XG4gIHZhciBoaWRlT3ZlcmxheSA9IG9wdGlvbnMuaGlkZU92ZXJsYXksXG4gICAgc2hvd092ZXJsYXkgPSBvcHRpb25zLnNob3dPdmVybGF5O1xuICB2YXIgb3ZlcmxheU1hY2hpbmUgPSBjcmVhdGVNYWNoaW5lKHtcbiAgICBpbml0aWFsOiBcImhpZGRlblwiLFxuICAgIGNvbnRleHQ6IHtcbiAgICAgIGxldmVsOiBcImVycm9yXCIsXG4gICAgICBtZXNzYWdlczogW10sXG4gICAgICBtZXNzYWdlU291cmNlOiBcImJ1aWxkXCJcbiAgICB9LFxuICAgIHN0YXRlczoge1xuICAgICAgaGlkZGVuOiB7XG4gICAgICAgIG9uOiB7XG4gICAgICAgICAgQlVJTERfRVJST1I6IHtcbiAgICAgICAgICAgIHRhcmdldDogXCJkaXNwbGF5QnVpbGRFcnJvclwiLFxuICAgICAgICAgICAgYWN0aW9uczogW1wic2V0TWVzc2FnZXNcIiwgXCJzaG93T3ZlcmxheVwiXVxuICAgICAgICAgIH0sXG4gICAgICAgICAgUlVOVElNRV9FUlJPUjoge1xuICAgICAgICAgICAgdGFyZ2V0OiBcImRpc3BsYXlSdW50aW1lRXJyb3JcIixcbiAgICAgICAgICAgIGFjdGlvbnM6IFtcInNldE1lc3NhZ2VzXCIsIFwic2hvd092ZXJsYXlcIl1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBkaXNwbGF5QnVpbGRFcnJvcjoge1xuICAgICAgICBvbjoge1xuICAgICAgICAgIERJU01JU1M6IHtcbiAgICAgICAgICAgIHRhcmdldDogXCJoaWRkZW5cIixcbiAgICAgICAgICAgIGFjdGlvbnM6IFtcImRpc21pc3NNZXNzYWdlc1wiLCBcImhpZGVPdmVybGF5XCJdXG4gICAgICAgICAgfSxcbiAgICAgICAgICBCVUlMRF9FUlJPUjoge1xuICAgICAgICAgICAgdGFyZ2V0OiBcImRpc3BsYXlCdWlsZEVycm9yXCIsXG4gICAgICAgICAgICBhY3Rpb25zOiBbXCJhcHBlbmRNZXNzYWdlc1wiLCBcInNob3dPdmVybGF5XCJdXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZGlzcGxheVJ1bnRpbWVFcnJvcjoge1xuICAgICAgICBvbjoge1xuICAgICAgICAgIERJU01JU1M6IHtcbiAgICAgICAgICAgIHRhcmdldDogXCJoaWRkZW5cIixcbiAgICAgICAgICAgIGFjdGlvbnM6IFtcImRpc21pc3NNZXNzYWdlc1wiLCBcImhpZGVPdmVybGF5XCJdXG4gICAgICAgICAgfSxcbiAgICAgICAgICBSVU5USU1FX0VSUk9SOiB7XG4gICAgICAgICAgICB0YXJnZXQ6IFwiZGlzcGxheVJ1bnRpbWVFcnJvclwiLFxuICAgICAgICAgICAgYWN0aW9uczogW1wiYXBwZW5kTWVzc2FnZXNcIiwgXCJzaG93T3ZlcmxheVwiXVxuICAgICAgICAgIH0sXG4gICAgICAgICAgQlVJTERfRVJST1I6IHtcbiAgICAgICAgICAgIHRhcmdldDogXCJkaXNwbGF5QnVpbGRFcnJvclwiLFxuICAgICAgICAgICAgYWN0aW9uczogW1wic2V0TWVzc2FnZXNcIiwgXCJzaG93T3ZlcmxheVwiXVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGFjdGlvbnM6IHtcbiAgICAgIGRpc21pc3NNZXNzYWdlczogZnVuY3Rpb24gZGlzbWlzc01lc3NhZ2VzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIG1lc3NhZ2VzOiBbXSxcbiAgICAgICAgICBsZXZlbDogXCJlcnJvclwiLFxuICAgICAgICAgIG1lc3NhZ2VTb3VyY2U6IFwiYnVpbGRcIlxuICAgICAgICB9O1xuICAgICAgfSxcbiAgICAgIGFwcGVuZE1lc3NhZ2VzOiBmdW5jdGlvbiBhcHBlbmRNZXNzYWdlcyhjb250ZXh0LCBldmVudCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIG1lc3NhZ2VzOiBjb250ZXh0Lm1lc3NhZ2VzLmNvbmNhdChldmVudC5tZXNzYWdlcyksXG4gICAgICAgICAgbGV2ZWw6IGV2ZW50LmxldmVsIHx8IGNvbnRleHQubGV2ZWwsXG4gICAgICAgICAgbWVzc2FnZVNvdXJjZTogZXZlbnQudHlwZSA9PT0gXCJSVU5USU1FX0VSUk9SXCIgPyBcInJ1bnRpbWVcIiA6IFwiYnVpbGRcIlxuICAgICAgICB9O1xuICAgICAgfSxcbiAgICAgIHNldE1lc3NhZ2VzOiBmdW5jdGlvbiBzZXRNZXNzYWdlcyhjb250ZXh0LCBldmVudCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIG1lc3NhZ2VzOiBldmVudC5tZXNzYWdlcyxcbiAgICAgICAgICBsZXZlbDogZXZlbnQubGV2ZWwgfHwgY29udGV4dC5sZXZlbCxcbiAgICAgICAgICBtZXNzYWdlU291cmNlOiBldmVudC50eXBlID09PSBcIlJVTlRJTUVfRVJST1JcIiA/IFwicnVudGltZVwiIDogXCJidWlsZFwiXG4gICAgICAgIH07XG4gICAgICB9LFxuICAgICAgaGlkZU92ZXJsYXk6IGhpZGVPdmVybGF5LFxuICAgICAgc2hvd092ZXJsYXk6IHNob3dPdmVybGF5XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIG92ZXJsYXlNYWNoaW5lO1xufTtcbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZU92ZXJsYXlNYWNoaW5lOyIsIi8vIHN0eWxlcyBhcmUgaW5zcGlyZWQgYnkgYHJlYWN0LWVycm9yLW92ZXJsYXlgXG5cbnZhciBtc2dTdHlsZXMgPSB7XG4gIGVycm9yOiB7XG4gICAgYmFja2dyb3VuZENvbG9yOiBcInJnYmEoMjA2LCAxNywgMzgsIDAuMSlcIixcbiAgICBjb2xvcjogXCIjZmNjZmNmXCJcbiAgfSxcbiAgd2FybmluZzoge1xuICAgIGJhY2tncm91bmRDb2xvcjogXCJyZ2JhKDI1MSwgMjQ1LCAxODAsIDAuMSlcIixcbiAgICBjb2xvcjogXCIjZmJmNWI0XCJcbiAgfVxufTtcbnZhciBpZnJhbWVTdHlsZSA9IHtcbiAgcG9zaXRpb246IFwiZml4ZWRcIixcbiAgdG9wOiAwLFxuICBsZWZ0OiAwLFxuICByaWdodDogMCxcbiAgYm90dG9tOiAwLFxuICB3aWR0aDogXCIxMDB2d1wiLFxuICBoZWlnaHQ6IFwiMTAwdmhcIixcbiAgYm9yZGVyOiBcIm5vbmVcIixcbiAgXCJ6LWluZGV4XCI6IDk5OTk5OTk5OTlcbn07XG52YXIgY29udGFpbmVyU3R5bGUgPSB7XG4gIHBvc2l0aW9uOiBcImZpeGVkXCIsXG4gIGJveFNpemluZzogXCJib3JkZXItYm94XCIsXG4gIGxlZnQ6IDAsXG4gIHRvcDogMCxcbiAgcmlnaHQ6IDAsXG4gIGJvdHRvbTogMCxcbiAgd2lkdGg6IFwiMTAwdndcIixcbiAgaGVpZ2h0OiBcIjEwMHZoXCIsXG4gIGZvbnRTaXplOiBcImxhcmdlXCIsXG4gIHBhZGRpbmc6IFwiMnJlbSAycmVtIDRyZW0gMnJlbVwiLFxuICBsaW5lSGVpZ2h0OiBcIjEuMlwiLFxuICB3aGl0ZVNwYWNlOiBcInByZS13cmFwXCIsXG4gIG92ZXJmbG93OiBcImF1dG9cIixcbiAgYmFja2dyb3VuZENvbG9yOiBcInJnYmEoMCwgMCwgMCwgMC45KVwiLFxuICBjb2xvcjogXCJ3aGl0ZVwiXG59O1xudmFyIGhlYWRlclN0eWxlID0ge1xuICBjb2xvcjogXCIjZTgzYjQ2XCIsXG4gIGZvbnRTaXplOiBcIjJlbVwiLFxuICB3aGl0ZVNwYWNlOiBcInByZS13cmFwXCIsXG4gIGZvbnRGYW1pbHk6IFwic2Fucy1zZXJpZlwiLFxuICBtYXJnaW46IFwiMCAycmVtIDJyZW0gMFwiLFxuICBmbGV4OiBcIjAgMCBhdXRvXCIsXG4gIG1heEhlaWdodDogXCI1MCVcIixcbiAgb3ZlcmZsb3c6IFwiYXV0b1wiXG59O1xudmFyIGRpc21pc3NCdXR0b25TdHlsZSA9IHtcbiAgY29sb3I6IFwiI2ZmZmZmZlwiLFxuICBsaW5lSGVpZ2h0OiBcIjFyZW1cIixcbiAgZm9udFNpemU6IFwiMS41cmVtXCIsXG4gIHBhZGRpbmc6IFwiMXJlbVwiLFxuICBjdXJzb3I6IFwicG9pbnRlclwiLFxuICBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLFxuICByaWdodDogMCxcbiAgdG9wOiAwLFxuICBiYWNrZ3JvdW5kQ29sb3I6IFwidHJhbnNwYXJlbnRcIixcbiAgYm9yZGVyOiBcIm5vbmVcIlxufTtcbnZhciBtc2dUeXBlU3R5bGUgPSB7XG4gIGNvbG9yOiBcIiNlODNiNDZcIixcbiAgZm9udFNpemU6IFwiMS4yZW1cIixcbiAgbWFyZ2luQm90dG9tOiBcIjFyZW1cIixcbiAgZm9udEZhbWlseTogXCJzYW5zLXNlcmlmXCJcbn07XG52YXIgbXNnVGV4dFN0eWxlID0ge1xuICBsaW5lSGVpZ2h0OiBcIjEuNVwiLFxuICBmb250U2l6ZTogXCIxcmVtXCIsXG4gIGZvbnRGYW1pbHk6IFwiTWVubG8sIENvbnNvbGFzLCBtb25vc3BhY2VcIlxufTtcbmV4cG9ydCB7IG1zZ1N0eWxlcywgaWZyYW1lU3R5bGUsIGNvbnRhaW5lclN0eWxlLCBoZWFkZXJTdHlsZSwgZGlzbWlzc0J1dHRvblN0eWxlLCBtc2dUeXBlU3R5bGUsIG1zZ1RleHRTdHlsZSB9OyIsImZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhhLCBuKSB7IGlmICghKGEgaW5zdGFuY2VvZiBuKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfVxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXMoZSwgcikgeyBmb3IgKHZhciB0ID0gMDsgdCA8IHIubGVuZ3RoOyB0KyspIHsgdmFyIG8gPSByW3RdOyBvLmVudW1lcmFibGUgPSBvLmVudW1lcmFibGUgfHwgITEsIG8uY29uZmlndXJhYmxlID0gITAsIFwidmFsdWVcIiBpbiBvICYmIChvLndyaXRhYmxlID0gITApLCBPYmplY3QuZGVmaW5lUHJvcGVydHkoZSwgX3RvUHJvcGVydHlLZXkoby5rZXkpLCBvKTsgfSB9XG5mdW5jdGlvbiBfY3JlYXRlQ2xhc3MoZSwgciwgdCkgeyByZXR1cm4gciAmJiBfZGVmaW5lUHJvcGVydGllcyhlLnByb3RvdHlwZSwgciksIHQgJiYgX2RlZmluZVByb3BlcnRpZXMoZSwgdCksIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLCBcInByb3RvdHlwZVwiLCB7IHdyaXRhYmxlOiAhMSB9KSwgZTsgfVxuZnVuY3Rpb24gX3RvUHJvcGVydHlLZXkodCkgeyB2YXIgaSA9IF90b1ByaW1pdGl2ZSh0LCBcInN0cmluZ1wiKTsgcmV0dXJuIFwic3ltYm9sXCIgPT0gdHlwZW9mIGkgPyBpIDogaSArIFwiXCI7IH1cbmZ1bmN0aW9uIF90b1ByaW1pdGl2ZSh0LCByKSB7IGlmIChcIm9iamVjdFwiICE9IHR5cGVvZiB0IHx8ICF0KSByZXR1cm4gdDsgdmFyIGUgPSB0W1N5bWJvbC50b1ByaW1pdGl2ZV07IGlmICh2b2lkIDAgIT09IGUpIHsgdmFyIGkgPSBlLmNhbGwodCwgciB8fCBcImRlZmF1bHRcIik7IGlmIChcIm9iamVjdFwiICE9IHR5cGVvZiBpKSByZXR1cm4gaTsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkBAdG9QcmltaXRpdmUgbXVzdCByZXR1cm4gYSBwcmltaXRpdmUgdmFsdWUuXCIpOyB9IHJldHVybiAoXCJzdHJpbmdcIiA9PT0gciA/IFN0cmluZyA6IE51bWJlcikodCk7IH1cbmZ1bmN0aW9uIF9jYWxsU3VwZXIodCwgbywgZSkgeyByZXR1cm4gbyA9IF9nZXRQcm90b3R5cGVPZihvKSwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odCwgX2lzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCgpID8gUmVmbGVjdC5jb25zdHJ1Y3QobywgZSB8fCBbXSwgX2dldFByb3RvdHlwZU9mKHQpLmNvbnN0cnVjdG9yKSA6IG8uYXBwbHkodCwgZSkpOyB9XG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0LCBlKSB7IGlmIChlICYmIChcIm9iamVjdFwiID09IHR5cGVvZiBlIHx8IFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgZSkpIHJldHVybiBlOyBpZiAodm9pZCAwICE9PSBlKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiRGVyaXZlZCBjb25zdHJ1Y3RvcnMgbWF5IG9ubHkgcmV0dXJuIG9iamVjdCBvciB1bmRlZmluZWRcIik7IHJldHVybiBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKHQpOyB9XG5mdW5jdGlvbiBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKGUpIHsgaWYgKHZvaWQgMCA9PT0gZSkgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyByZXR1cm4gZTsgfVxuZnVuY3Rpb24gX2luaGVyaXRzKHQsIGUpIHsgaWYgKFwiZnVuY3Rpb25cIiAhPSB0eXBlb2YgZSAmJiBudWxsICE9PSBlKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb25cIik7IHQucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShlICYmIGUucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiB0LCB3cml0YWJsZTogITAsIGNvbmZpZ3VyYWJsZTogITAgfSB9KSwgT2JqZWN0LmRlZmluZVByb3BlcnR5KHQsIFwicHJvdG90eXBlXCIsIHsgd3JpdGFibGU6ICExIH0pLCBlICYmIF9zZXRQcm90b3R5cGVPZih0LCBlKTsgfVxuZnVuY3Rpb24gX3dyYXBOYXRpdmVTdXBlcih0KSB7IHZhciByID0gXCJmdW5jdGlvblwiID09IHR5cGVvZiBNYXAgPyBuZXcgTWFwKCkgOiB2b2lkIDA7IHJldHVybiBfd3JhcE5hdGl2ZVN1cGVyID0gZnVuY3Rpb24gX3dyYXBOYXRpdmVTdXBlcih0KSB7IGlmIChudWxsID09PSB0IHx8ICFfaXNOYXRpdmVGdW5jdGlvbih0KSkgcmV0dXJuIHQ7IGlmIChcImZ1bmN0aW9uXCIgIT0gdHlwZW9mIHQpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvblwiKTsgaWYgKHZvaWQgMCAhPT0gcikgeyBpZiAoci5oYXModCkpIHJldHVybiByLmdldCh0KTsgci5zZXQodCwgV3JhcHBlcik7IH0gZnVuY3Rpb24gV3JhcHBlcigpIHsgcmV0dXJuIF9jb25zdHJ1Y3QodCwgYXJndW1lbnRzLCBfZ2V0UHJvdG90eXBlT2YodGhpcykuY29uc3RydWN0b3IpOyB9IHJldHVybiBXcmFwcGVyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUodC5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IFdyYXBwZXIsIGVudW1lcmFibGU6ICExLCB3cml0YWJsZTogITAsIGNvbmZpZ3VyYWJsZTogITAgfSB9KSwgX3NldFByb3RvdHlwZU9mKFdyYXBwZXIsIHQpOyB9LCBfd3JhcE5hdGl2ZVN1cGVyKHQpOyB9XG5mdW5jdGlvbiBfY29uc3RydWN0KHQsIGUsIHIpIHsgaWYgKF9pc05hdGl2ZVJlZmxlY3RDb25zdHJ1Y3QoKSkgcmV0dXJuIFJlZmxlY3QuY29uc3RydWN0LmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7IHZhciBvID0gW251bGxdOyBvLnB1c2guYXBwbHkobywgZSk7IHZhciBwID0gbmV3ICh0LmJpbmQuYXBwbHkodCwgbykpKCk7IHJldHVybiByICYmIF9zZXRQcm90b3R5cGVPZihwLCByLnByb3RvdHlwZSksIHA7IH1cbmZ1bmN0aW9uIF9pc05hdGl2ZVJlZmxlY3RDb25zdHJ1Y3QoKSB7IHRyeSB7IHZhciB0ID0gIUJvb2xlYW4ucHJvdG90eXBlLnZhbHVlT2YuY2FsbChSZWZsZWN0LmNvbnN0cnVjdChCb29sZWFuLCBbXSwgZnVuY3Rpb24gKCkge30pKTsgfSBjYXRjaCAodCkge30gcmV0dXJuIChfaXNOYXRpdmVSZWZsZWN0Q29uc3RydWN0ID0gZnVuY3Rpb24gX2lzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCgpIHsgcmV0dXJuICEhdDsgfSkoKTsgfVxuZnVuY3Rpb24gX2lzTmF0aXZlRnVuY3Rpb24odCkgeyB0cnkgeyByZXR1cm4gLTEgIT09IEZ1bmN0aW9uLnRvU3RyaW5nLmNhbGwodCkuaW5kZXhPZihcIltuYXRpdmUgY29kZV1cIik7IH0gY2F0Y2ggKG4pIHsgcmV0dXJuIFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgdDsgfSB9XG5mdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YodCwgZSkgeyByZXR1cm4gX3NldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mLmJpbmQoKSA6IGZ1bmN0aW9uICh0LCBlKSB7IHJldHVybiB0Ll9fcHJvdG9fXyA9IGUsIHQ7IH0sIF9zZXRQcm90b3R5cGVPZih0LCBlKTsgfVxuZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKHQpIHsgcmV0dXJuIF9nZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5nZXRQcm90b3R5cGVPZi5iaW5kKCkgOiBmdW5jdGlvbiAodCkgeyByZXR1cm4gdC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKHQpOyB9LCBfZ2V0UHJvdG90eXBlT2YodCk7IH1cbmZ1bmN0aW9uIF9jbGFzc1ByaXZhdGVNZXRob2RJbml0U3BlYyhlLCBhKSB7IF9jaGVja1ByaXZhdGVSZWRlY2xhcmF0aW9uKGUsIGEpLCBhLmFkZChlKTsgfVxuZnVuY3Rpb24gX2NoZWNrUHJpdmF0ZVJlZGVjbGFyYXRpb24oZSwgdCkgeyBpZiAodC5oYXMoZSkpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgaW5pdGlhbGl6ZSB0aGUgc2FtZSBwcml2YXRlIGVsZW1lbnRzIHR3aWNlIG9uIGFuIG9iamVjdFwiKTsgfVxuZnVuY3Rpb24gX2Fzc2VydENsYXNzQnJhbmQoZSwgdCwgbikgeyBpZiAoXCJmdW5jdGlvblwiID09IHR5cGVvZiBlID8gZSA9PT0gdCA6IGUuaGFzKHQpKSByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA8IDMgPyB0IDogbjsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgZWxlbWVudCBpcyBub3QgcHJlc2VudCBvbiB0aGlzIG9iamVjdFwiKTsgfVxuZXhwb3J0IGZ1bmN0aW9uIGlzUHJvZ3Jlc3NTdXBwb3J0ZWQoKSB7XG4gIHJldHVybiBcImN1c3RvbUVsZW1lbnRzXCIgaW4gc2VsZiAmJiAhIUhUTUxFbGVtZW50LnByb3RvdHlwZS5hdHRhY2hTaGFkb3c7XG59XG5leHBvcnQgZnVuY3Rpb24gZGVmaW5lUHJvZ3Jlc3NFbGVtZW50KCkge1xuICB2YXIgX1dlYnBhY2tEZXZTZXJ2ZXJQcm9ncmVzcztcbiAgaWYgKGN1c3RvbUVsZW1lbnRzLmdldChcIndkcy1wcm9ncmVzc1wiKSkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgX1dlYnBhY2tEZXZTZXJ2ZXJQcm9ncmVzc19icmFuZCA9IC8qI19fUFVSRV9fKi9uZXcgV2Vha1NldCgpO1xuICB2YXIgV2VicGFja0RldlNlcnZlclByb2dyZXNzID0gLyojX19QVVJFX18qL2Z1bmN0aW9uIChfSFRNTEVsZW1lbnQpIHtcbiAgICBmdW5jdGlvbiBXZWJwYWNrRGV2U2VydmVyUHJvZ3Jlc3MoKSB7XG4gICAgICB2YXIgX3RoaXM7XG4gICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgV2VicGFja0RldlNlcnZlclByb2dyZXNzKTtcbiAgICAgIF90aGlzID0gX2NhbGxTdXBlcih0aGlzLCBXZWJwYWNrRGV2U2VydmVyUHJvZ3Jlc3MpO1xuICAgICAgX2NsYXNzUHJpdmF0ZU1ldGhvZEluaXRTcGVjKF90aGlzLCBfV2VicGFja0RldlNlcnZlclByb2dyZXNzX2JyYW5kKTtcbiAgICAgIF90aGlzLmF0dGFjaFNoYWRvdyh7XG4gICAgICAgIG1vZGU6IFwib3BlblwiXG4gICAgICB9KTtcbiAgICAgIF90aGlzLm1heERhc2hPZmZzZXQgPSAtMjE5Ljk5MDc4MzY5MTQwNjI1O1xuICAgICAgX3RoaXMuYW5pbWF0aW9uVGltZXIgPSBudWxsO1xuICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBfaW5oZXJpdHMoV2VicGFja0RldlNlcnZlclByb2dyZXNzLCBfSFRNTEVsZW1lbnQpO1xuICAgIHJldHVybiBfY3JlYXRlQ2xhc3MoV2VicGFja0RldlNlcnZlclByb2dyZXNzLCBbe1xuICAgICAga2V5OiBcImNvbm5lY3RlZENhbGxiYWNrXCIsXG4gICAgICB2YWx1ZTogZnVuY3Rpb24gY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgICAgIF9hc3NlcnRDbGFzc0JyYW5kKF9XZWJwYWNrRGV2U2VydmVyUHJvZ3Jlc3NfYnJhbmQsIHRoaXMsIF9yZXNldCkuY2FsbCh0aGlzKTtcbiAgICAgIH1cbiAgICB9LCB7XG4gICAgICBrZXk6IFwiYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrXCIsXG4gICAgICB2YWx1ZTogZnVuY3Rpb24gYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKG5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSkge1xuICAgICAgICBpZiAobmFtZSA9PT0gXCJwcm9ncmVzc1wiKSB7XG4gICAgICAgICAgX2Fzc2VydENsYXNzQnJhbmQoX1dlYnBhY2tEZXZTZXJ2ZXJQcm9ncmVzc19icmFuZCwgdGhpcywgX3VwZGF0ZSkuY2FsbCh0aGlzLCBOdW1iZXIobmV3VmFsdWUpKTtcbiAgICAgICAgfSBlbHNlIGlmIChuYW1lID09PSBcInR5cGVcIikge1xuICAgICAgICAgIF9hc3NlcnRDbGFzc0JyYW5kKF9XZWJwYWNrRGV2U2VydmVyUHJvZ3Jlc3NfYnJhbmQsIHRoaXMsIF9yZXNldCkuY2FsbCh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1dLCBbe1xuICAgICAga2V5OiBcIm9ic2VydmVkQXR0cmlidXRlc1wiLFxuICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgIHJldHVybiBbXCJwcm9ncmVzc1wiLCBcInR5cGVcIl07XG4gICAgICB9XG4gICAgfV0pO1xuICB9KC8qI19fUFVSRV9fKi9fd3JhcE5hdGl2ZVN1cGVyKEhUTUxFbGVtZW50KSk7XG4gIF9XZWJwYWNrRGV2U2VydmVyUHJvZ3Jlc3MgPSBXZWJwYWNrRGV2U2VydmVyUHJvZ3Jlc3M7XG4gIGZ1bmN0aW9uIF9yZXNldCgpIHtcbiAgICB2YXIgX3RoaXMkZ2V0QXR0cmlidXRlLCBfTnVtYmVyO1xuICAgIGNsZWFyVGltZW91dCh0aGlzLmFuaW1hdGlvblRpbWVyKTtcbiAgICB0aGlzLmFuaW1hdGlvblRpbWVyID0gbnVsbDtcbiAgICB2YXIgdHlwZUF0dHIgPSAoX3RoaXMkZ2V0QXR0cmlidXRlID0gdGhpcy5nZXRBdHRyaWJ1dGUoXCJ0eXBlXCIpKSA9PT0gbnVsbCB8fCBfdGhpcyRnZXRBdHRyaWJ1dGUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF90aGlzJGdldEF0dHJpYnV0ZS50b0xvd2VyQ2FzZSgpO1xuICAgIHRoaXMudHlwZSA9IHR5cGVBdHRyID09PSBcImNpcmN1bGFyXCIgPyBcImNpcmN1bGFyXCIgOiBcImxpbmVhclwiO1xuICAgIHZhciBpbm5lckhUTUwgPSB0aGlzLnR5cGUgPT09IFwiY2lyY3VsYXJcIiA/IF9jaXJjdWxhclRlbXBsYXRlLmNhbGwoX1dlYnBhY2tEZXZTZXJ2ZXJQcm9ncmVzcykgOiBfbGluZWFyVGVtcGxhdGUuY2FsbChfV2VicGFja0RldlNlcnZlclByb2dyZXNzKTtcbiAgICB0aGlzLnNoYWRvd1Jvb3QuaW5uZXJIVE1MID0gaW5uZXJIVE1MO1xuICAgIHRoaXMuaW5pdGlhbFByb2dyZXNzID0gKF9OdW1iZXIgPSBOdW1iZXIodGhpcy5nZXRBdHRyaWJ1dGUoXCJwcm9ncmVzc1wiKSkpICE9PSBudWxsICYmIF9OdW1iZXIgIT09IHZvaWQgMCA/IF9OdW1iZXIgOiAwO1xuICAgIF9hc3NlcnRDbGFzc0JyYW5kKF9XZWJwYWNrRGV2U2VydmVyUHJvZ3Jlc3NfYnJhbmQsIHRoaXMsIF91cGRhdGUpLmNhbGwodGhpcywgdGhpcy5pbml0aWFsUHJvZ3Jlc3MpO1xuICB9XG4gIGZ1bmN0aW9uIF9jaXJjdWxhclRlbXBsYXRlKCkge1xuICAgIHJldHVybiBcIlxcbiAgICAgICAgPHN0eWxlPlxcbiAgICAgICAgOmhvc3Qge1xcbiAgICAgICAgICAgIHdpZHRoOiAyMDBweDtcXG4gICAgICAgICAgICBoZWlnaHQ6IDIwMHB4O1xcbiAgICAgICAgICAgIHBvc2l0aW9uOiBmaXhlZDtcXG4gICAgICAgICAgICByaWdodDogNSU7XFxuICAgICAgICAgICAgdG9wOiA1JTtcXG4gICAgICAgICAgICB0cmFuc2l0aW9uOiBvcGFjaXR5IC4yNXMgZWFzZS1pbi1vdXQ7XFxuICAgICAgICAgICAgei1pbmRleDogMjE0NzQ4MzY0NTtcXG4gICAgICAgIH1cXG5cXG4gICAgICAgIGNpcmNsZSB7XFxuICAgICAgICAgICAgZmlsbDogIzI4MmQzNTtcXG4gICAgICAgIH1cXG5cXG4gICAgICAgIHBhdGgge1xcbiAgICAgICAgICAgIGZpbGw6IHJnYmEoMCwgMCwgMCwgMCk7XFxuICAgICAgICAgICAgc3Ryb2tlOiByZ2IoMTg2LCAyMjMsIDE3Mik7XFxuICAgICAgICAgICAgc3Ryb2tlLWRhc2hhcnJheTogMjE5Ljk5MDc4MzY5MTQwNjI1O1xcbiAgICAgICAgICAgIHN0cm9rZS1kYXNob2Zmc2V0OiAtMjE5Ljk5MDc4MzY5MTQwNjI1O1xcbiAgICAgICAgICAgIHN0cm9rZS13aWR0aDogMTA7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoOTBkZWcpIHRyYW5zbGF0ZSgwcHgsIC04MHB4KTtcXG4gICAgICAgIH1cXG5cXG4gICAgICAgIHRleHQge1xcbiAgICAgICAgICAgIGZvbnQtZmFtaWx5OiAnT3BlbiBTYW5zJywgc2Fucy1zZXJpZjtcXG4gICAgICAgICAgICBmb250LXNpemU6IDE4cHg7XFxuICAgICAgICAgICAgZmlsbDogI2ZmZmZmZjtcXG4gICAgICAgICAgICBkb21pbmFudC1iYXNlbGluZTogbWlkZGxlO1xcbiAgICAgICAgICAgIHRleHQtYW5jaG9yOiBtaWRkbGU7XFxuICAgICAgICB9XFxuXFxuICAgICAgICB0c3BhbiNwZXJjZW50LXN1cGVyIHtcXG4gICAgICAgICAgICBmaWxsOiAjYmRjM2M3O1xcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMC40NWVtO1xcbiAgICAgICAgICAgIGJhc2VsaW5lLXNoaWZ0OiAxMCU7XFxuICAgICAgICB9XFxuXFxuICAgICAgICBAa2V5ZnJhbWVzIGZhZGUge1xcbiAgICAgICAgICAgIDAlIHsgb3BhY2l0eTogMTsgdHJhbnNmb3JtOiBzY2FsZSgxKTsgfVxcbiAgICAgICAgICAgIDEwMCUgeyBvcGFjaXR5OiAwOyB0cmFuc2Zvcm06IHNjYWxlKDApOyB9XFxuICAgICAgICB9XFxuXFxuICAgICAgICAuZGlzYXBwZWFyIHtcXG4gICAgICAgICAgICBhbmltYXRpb246IGZhZGUgMC4zcztcXG4gICAgICAgICAgICBhbmltYXRpb24tZmlsbC1tb2RlOiBmb3J3YXJkcztcXG4gICAgICAgICAgICBhbmltYXRpb24tZGVsYXk6IDAuNXM7XFxuICAgICAgICB9XFxuXFxuICAgICAgICAuaGlkZGVuIHtcXG4gICAgICAgICAgICBkaXNwbGF5OiBub25lO1xcbiAgICAgICAgfVxcbiAgICAgICAgPC9zdHlsZT5cXG4gICAgICAgIDxzdmcgaWQ9XFxcInByb2dyZXNzXFxcIiBjbGFzcz1cXFwiaGlkZGVuIG5vc2VsZWN0XFxcIiB2aWV3Qm94PVxcXCIwIDAgODAgODBcXFwiPlxcbiAgICAgICAgPGNpcmNsZSBjeD1cXFwiNTAlXFxcIiBjeT1cXFwiNTAlXFxcIiByPVxcXCIzNVxcXCI+PC9jaXJjbGU+XFxuICAgICAgICA8cGF0aCBkPVxcXCJNNSw0MGEzNSwzNSAwIDEsMCA3MCwwYTM1LDM1IDAgMSwwIC03MCwwXFxcIj48L3BhdGg+XFxuICAgICAgICA8dGV4dCB4PVxcXCI1MCVcXFwiIHk9XFxcIjUxJVxcXCI+XFxuICAgICAgICAgICAgPHRzcGFuIGlkPVxcXCJwZXJjZW50LXZhbHVlXFxcIj4wPC90c3Bhbj5cXG4gICAgICAgICAgICA8dHNwYW4gaWQ9XFxcInBlcmNlbnQtc3VwZXJcXFwiPiU8L3RzcGFuPlxcbiAgICAgICAgPC90ZXh0PlxcbiAgICAgICAgPC9zdmc+XFxuICAgICAgXCI7XG4gIH1cbiAgZnVuY3Rpb24gX2xpbmVhclRlbXBsYXRlKCkge1xuICAgIHJldHVybiBcIlxcbiAgICAgICAgPHN0eWxlPlxcbiAgICAgICAgOmhvc3Qge1xcbiAgICAgICAgICAgIHBvc2l0aW9uOiBmaXhlZDtcXG4gICAgICAgICAgICB0b3A6IDA7XFxuICAgICAgICAgICAgbGVmdDogMDtcXG4gICAgICAgICAgICBoZWlnaHQ6IDRweDtcXG4gICAgICAgICAgICB3aWR0aDogMTAwdnc7XFxuICAgICAgICAgICAgei1pbmRleDogMjE0NzQ4MzY0NTtcXG4gICAgICAgIH1cXG5cXG4gICAgICAgICNiYXIge1xcbiAgICAgICAgICAgIHdpZHRoOiAwJTtcXG4gICAgICAgICAgICBoZWlnaHQ6IDRweDtcXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTg2LCAyMjMsIDE3Mik7XFxuICAgICAgICB9XFxuXFxuICAgICAgICBAa2V5ZnJhbWVzIGZhZGUge1xcbiAgICAgICAgICAgIDAlIHsgb3BhY2l0eTogMTsgfVxcbiAgICAgICAgICAgIDEwMCUgeyBvcGFjaXR5OiAwOyB9XFxuICAgICAgICB9XFxuXFxuICAgICAgICAuZGlzYXBwZWFyIHtcXG4gICAgICAgICAgICBhbmltYXRpb246IGZhZGUgMC4zcztcXG4gICAgICAgICAgICBhbmltYXRpb24tZmlsbC1tb2RlOiBmb3J3YXJkcztcXG4gICAgICAgICAgICBhbmltYXRpb24tZGVsYXk6IDAuNXM7XFxuICAgICAgICB9XFxuXFxuICAgICAgICAuaGlkZGVuIHtcXG4gICAgICAgICAgICBkaXNwbGF5OiBub25lO1xcbiAgICAgICAgfVxcbiAgICAgICAgPC9zdHlsZT5cXG4gICAgICAgIDxkaXYgaWQ9XFxcInByb2dyZXNzXFxcIj48L2Rpdj5cXG4gICAgICAgIFwiO1xuICB9XG4gIGZ1bmN0aW9uIF91cGRhdGUocGVyY2VudCkge1xuICAgIHZhciBlbGVtZW50ID0gdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvZ3Jlc3NcIik7XG4gICAgaWYgKHRoaXMudHlwZSA9PT0gXCJjaXJjdWxhclwiKSB7XG4gICAgICB2YXIgcGF0aCA9IHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKFwicGF0aFwiKTtcbiAgICAgIHZhciB2YWx1ZSA9IHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKFwiI3BlcmNlbnQtdmFsdWVcIik7XG4gICAgICB2YXIgb2Zmc2V0ID0gKDEwMCAtIHBlcmNlbnQpIC8gMTAwICogdGhpcy5tYXhEYXNoT2Zmc2V0O1xuICAgICAgcGF0aC5zdHlsZS5zdHJva2VEYXNob2Zmc2V0ID0gb2Zmc2V0O1xuICAgICAgdmFsdWUudGV4dENvbnRlbnQgPSBwZXJjZW50O1xuICAgIH0gZWxzZSB7XG4gICAgICBlbGVtZW50LnN0eWxlLndpZHRoID0gXCJcIi5jb25jYXQocGVyY2VudCwgXCIlXCIpO1xuICAgIH1cbiAgICBpZiAocGVyY2VudCA+PSAxMDApIHtcbiAgICAgIF9hc3NlcnRDbGFzc0JyYW5kKF9XZWJwYWNrRGV2U2VydmVyUHJvZ3Jlc3NfYnJhbmQsIHRoaXMsIF9oaWRlKS5jYWxsKHRoaXMpO1xuICAgIH0gZWxzZSBpZiAocGVyY2VudCA+IDApIHtcbiAgICAgIF9hc3NlcnRDbGFzc0JyYW5kKF9XZWJwYWNrRGV2U2VydmVyUHJvZ3Jlc3NfYnJhbmQsIHRoaXMsIF9zaG93KS5jYWxsKHRoaXMpO1xuICAgIH1cbiAgfVxuICBmdW5jdGlvbiBfc2hvdygpIHtcbiAgICB2YXIgZWxlbWVudCA9IHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKFwiI3Byb2dyZXNzXCIpO1xuICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgfVxuICBmdW5jdGlvbiBfaGlkZSgpIHtcbiAgICB2YXIgX3RoaXMyID0gdGhpcztcbiAgICB2YXIgZWxlbWVudCA9IHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKFwiI3Byb2dyZXNzXCIpO1xuICAgIGlmICh0aGlzLnR5cGUgPT09IFwiY2lyY3VsYXJcIikge1xuICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiZGlzYXBwZWFyXCIpO1xuICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiYW5pbWF0aW9uZW5kXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgICBfYXNzZXJ0Q2xhc3NCcmFuZChfV2VicGFja0RldlNlcnZlclByb2dyZXNzX2JyYW5kLCBfdGhpczIsIF91cGRhdGUpLmNhbGwoX3RoaXMyLCAwKTtcbiAgICAgIH0sIHtcbiAgICAgICAgb25jZTogdHJ1ZVxuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLnR5cGUgPT09IFwibGluZWFyXCIpIHtcbiAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImRpc2FwcGVhclwiKTtcbiAgICAgIHRoaXMuYW5pbWF0aW9uVGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiZGlzYXBwZWFyXCIpO1xuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUud2lkdGggPSBcIjAlXCI7XG4gICAgICAgIF90aGlzMi5hbmltYXRpb25UaW1lciA9IG51bGw7XG4gICAgICB9LCA4MDApO1xuICAgIH1cbiAgfVxuICBjdXN0b21FbGVtZW50cy5kZWZpbmUoXCJ3ZHMtcHJvZ3Jlc3NcIiwgV2VicGFja0RldlNlcnZlclByb2dyZXNzKTtcbn0iLCIvKiBnbG9iYWwgX193ZWJwYWNrX2Rldl9zZXJ2ZXJfY2xpZW50X18gKi9cblxuaW1wb3J0IFdlYlNvY2tldENsaWVudCBmcm9tIFwiLi9jbGllbnRzL1dlYlNvY2tldENsaWVudC5qc1wiO1xuaW1wb3J0IHsgbG9nIH0gZnJvbSBcIi4vdXRpbHMvbG9nLmpzXCI7XG5cbi8vIHRoaXMgV2Vic29ja2V0Q2xpZW50IGlzIGhlcmUgYXMgYSBkZWZhdWx0IGZhbGxiYWNrLCBpbiBjYXNlIHRoZSBjbGllbnQgaXMgbm90IGluamVjdGVkXG4vKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbnZhciBDbGllbnQgPVxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5lc3RlZC10ZXJuYXJ5XG50eXBlb2YgX193ZWJwYWNrX2Rldl9zZXJ2ZXJfY2xpZW50X18gIT09IFwidW5kZWZpbmVkXCIgPyB0eXBlb2YgX193ZWJwYWNrX2Rldl9zZXJ2ZXJfY2xpZW50X18uZGVmYXVsdCAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19kZXZfc2VydmVyX2NsaWVudF9fLmRlZmF1bHQgOiBfX3dlYnBhY2tfZGV2X3NlcnZlcl9jbGllbnRfXyA6IFdlYlNvY2tldENsaWVudDtcbi8qIGVzbGludC1lbmFibGUgY2FtZWxjYXNlICovXG5cbnZhciByZXRyaWVzID0gMDtcbnZhciBtYXhSZXRyaWVzID0gMTA7XG5cbi8vIEluaXRpYWxpemVkIGNsaWVudCBpcyBleHBvcnRlZCBzbyBleHRlcm5hbCBjb25zdW1lcnMgY2FuIHV0aWxpemUgdGhlIHNhbWUgaW5zdGFuY2Vcbi8vIEl0IGlzIG11dGFibGUgdG8gZW5mb3JjZSBzaW5nbGV0b25cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tbXV0YWJsZS1leHBvcnRzXG5leHBvcnQgdmFyIGNsaWVudCA9IG51bGw7XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybFxuICogQHBhcmFtIHt7IFtoYW5kbGVyOiBzdHJpbmddOiAoZGF0YT86IGFueSwgcGFyYW1zPzogYW55KSA9PiBhbnkgfX0gaGFuZGxlcnNcbiAqIEBwYXJhbSB7bnVtYmVyfSBbcmVjb25uZWN0XVxuICovXG52YXIgc29ja2V0ID0gZnVuY3Rpb24gaW5pdFNvY2tldCh1cmwsIGhhbmRsZXJzLCByZWNvbm5lY3QpIHtcbiAgY2xpZW50ID0gbmV3IENsaWVudCh1cmwpO1xuICBjbGllbnQub25PcGVuKGZ1bmN0aW9uICgpIHtcbiAgICByZXRyaWVzID0gMDtcbiAgICBpZiAodHlwZW9mIHJlY29ubmVjdCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgbWF4UmV0cmllcyA9IHJlY29ubmVjdDtcbiAgICB9XG4gIH0pO1xuICBjbGllbnQub25DbG9zZShmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHJldHJpZXMgPT09IDApIHtcbiAgICAgIGhhbmRsZXJzLmNsb3NlKCk7XG4gICAgfVxuXG4gICAgLy8gVHJ5IHRvIHJlY29ubmVjdC5cbiAgICBjbGllbnQgPSBudWxsO1xuXG4gICAgLy8gQWZ0ZXIgMTAgcmV0cmllcyBzdG9wIHRyeWluZywgdG8gcHJldmVudCBsb2dzcGFtLlxuICAgIGlmIChyZXRyaWVzIDwgbWF4UmV0cmllcykge1xuICAgICAgLy8gRXhwb25lbnRpYWxseSBpbmNyZWFzZSB0aW1lb3V0IHRvIHJlY29ubmVjdC5cbiAgICAgIC8vIFJlc3BlY3RmdWxseSBjb3BpZWQgZnJvbSB0aGUgcGFja2FnZSBgZ290YC5cbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXByb3BlcnRpZXNcbiAgICAgIHZhciByZXRyeUluTXMgPSAxMDAwICogTWF0aC5wb3coMiwgcmV0cmllcykgKyBNYXRoLnJhbmRvbSgpICogMTAwO1xuICAgICAgcmV0cmllcyArPSAxO1xuICAgICAgbG9nLmluZm8oXCJUcnlpbmcgdG8gcmVjb25uZWN0Li4uXCIpO1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNvY2tldCh1cmwsIGhhbmRsZXJzLCByZWNvbm5lY3QpO1xuICAgICAgfSwgcmV0cnlJbk1zKTtcbiAgICB9XG4gIH0pO1xuICBjbGllbnQub25NZXNzYWdlKFxuICAvKipcbiAgICogQHBhcmFtIHthbnl9IGRhdGFcbiAgICovXG4gIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgdmFyIG1lc3NhZ2UgPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgIGlmIChoYW5kbGVyc1ttZXNzYWdlLnR5cGVdKSB7XG4gICAgICBoYW5kbGVyc1ttZXNzYWdlLnR5cGVdKG1lc3NhZ2UuZGF0YSwgbWVzc2FnZS5wYXJhbXMpO1xuICAgIH1cbiAgfSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgc29ja2V0OyIsIi8qKlxuICogQHBhcmFtIHt7IHByb3RvY29sPzogc3RyaW5nLCBhdXRoPzogc3RyaW5nLCBob3N0bmFtZT86IHN0cmluZywgcG9ydD86IHN0cmluZywgcGF0aG5hbWU/OiBzdHJpbmcsIHNlYXJjaD86IHN0cmluZywgaGFzaD86IHN0cmluZywgc2xhc2hlcz86IGJvb2xlYW4gfX0gb2JqVVJMXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBmb3JtYXQob2JqVVJMKSB7XG4gIHZhciBwcm90b2NvbCA9IG9ialVSTC5wcm90b2NvbCB8fCBcIlwiO1xuICBpZiAocHJvdG9jb2wgJiYgcHJvdG9jb2wuc3Vic3RyKC0xKSAhPT0gXCI6XCIpIHtcbiAgICBwcm90b2NvbCArPSBcIjpcIjtcbiAgfVxuICB2YXIgYXV0aCA9IG9ialVSTC5hdXRoIHx8IFwiXCI7XG4gIGlmIChhdXRoKSB7XG4gICAgYXV0aCA9IGVuY29kZVVSSUNvbXBvbmVudChhdXRoKTtcbiAgICBhdXRoID0gYXV0aC5yZXBsYWNlKC8lM0EvaSwgXCI6XCIpO1xuICAgIGF1dGggKz0gXCJAXCI7XG4gIH1cbiAgdmFyIGhvc3QgPSBcIlwiO1xuICBpZiAob2JqVVJMLmhvc3RuYW1lKSB7XG4gICAgaG9zdCA9IGF1dGggKyAob2JqVVJMLmhvc3RuYW1lLmluZGV4T2YoXCI6XCIpID09PSAtMSA/IG9ialVSTC5ob3N0bmFtZSA6IFwiW1wiLmNvbmNhdChvYmpVUkwuaG9zdG5hbWUsIFwiXVwiKSk7XG4gICAgaWYgKG9ialVSTC5wb3J0KSB7XG4gICAgICBob3N0ICs9IFwiOlwiLmNvbmNhdChvYmpVUkwucG9ydCk7XG4gICAgfVxuICB9XG4gIHZhciBwYXRobmFtZSA9IG9ialVSTC5wYXRobmFtZSB8fCBcIlwiO1xuICBpZiAob2JqVVJMLnNsYXNoZXMpIHtcbiAgICBob3N0ID0gXCIvL1wiLmNvbmNhdChob3N0IHx8IFwiXCIpO1xuICAgIGlmIChwYXRobmFtZSAmJiBwYXRobmFtZS5jaGFyQXQoMCkgIT09IFwiL1wiKSB7XG4gICAgICBwYXRobmFtZSA9IFwiL1wiLmNvbmNhdChwYXRobmFtZSk7XG4gICAgfVxuICB9IGVsc2UgaWYgKCFob3N0KSB7XG4gICAgaG9zdCA9IFwiXCI7XG4gIH1cbiAgdmFyIHNlYXJjaCA9IG9ialVSTC5zZWFyY2ggfHwgXCJcIjtcbiAgaWYgKHNlYXJjaCAmJiBzZWFyY2guY2hhckF0KDApICE9PSBcIj9cIikge1xuICAgIHNlYXJjaCA9IFwiP1wiLmNvbmNhdChzZWFyY2gpO1xuICB9XG4gIHZhciBoYXNoID0gb2JqVVJMLmhhc2ggfHwgXCJcIjtcbiAgaWYgKGhhc2ggJiYgaGFzaC5jaGFyQXQoMCkgIT09IFwiI1wiKSB7XG4gICAgaGFzaCA9IFwiI1wiLmNvbmNhdChoYXNoKTtcbiAgfVxuICBwYXRobmFtZSA9IHBhdGhuYW1lLnJlcGxhY2UoL1s/I10vZyxcbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBtYXRjaFxuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgKi9cbiAgZnVuY3Rpb24gKG1hdGNoKSB7XG4gICAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChtYXRjaCk7XG4gIH0pO1xuICBzZWFyY2ggPSBzZWFyY2gucmVwbGFjZShcIiNcIiwgXCIlMjNcIik7XG4gIHJldHVybiBcIlwiLmNvbmNhdChwcm90b2NvbCkuY29uY2F0KGhvc3QpLmNvbmNhdChwYXRobmFtZSkuY29uY2F0KHNlYXJjaCkuY29uY2F0KGhhc2gpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7VVJMICYgeyBmcm9tQ3VycmVudFNjcmlwdD86IGJvb2xlYW4gfX0gcGFyc2VkVVJMXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBjcmVhdGVTb2NrZXRVUkwocGFyc2VkVVJMKSB7XG4gIHZhciBob3N0bmFtZSA9IHBhcnNlZFVSTC5ob3N0bmFtZTtcblxuICAvLyBOb2RlLmpzIG1vZHVsZSBwYXJzZXMgaXQgYXMgYDo6YFxuICAvLyBgbmV3IFVSTCh1cmxTdHJpbmcsIFtiYXNlVVJMU3RyaW5nXSlgIHBhcnNlcyBpdCBhcyAnWzo6XSdcbiAgdmFyIGlzSW5BZGRyQW55ID0gaG9zdG5hbWUgPT09IFwiMC4wLjAuMFwiIHx8IGhvc3RuYW1lID09PSBcIjo6XCIgfHwgaG9zdG5hbWUgPT09IFwiWzo6XVwiO1xuXG4gIC8vIHdoeSBkbyB3ZSBuZWVkIHRoaXMgY2hlY2s/XG4gIC8vIGhvc3RuYW1lIG4vYSBmb3IgZmlsZSBwcm90b2NvbCAoZXhhbXBsZSwgd2hlbiB1c2luZyBlbGVjdHJvbiwgaW9uaWMpXG4gIC8vIHNlZTogaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2svd2VicGFjay1kZXYtc2VydmVyL3B1bGwvMzg0XG4gIGlmIChpc0luQWRkckFueSAmJiBzZWxmLmxvY2F0aW9uLmhvc3RuYW1lICYmIHNlbGYubG9jYXRpb24ucHJvdG9jb2wuaW5kZXhPZihcImh0dHBcIikgPT09IDApIHtcbiAgICBob3N0bmFtZSA9IHNlbGYubG9jYXRpb24uaG9zdG5hbWU7XG4gIH1cbiAgdmFyIHNvY2tldFVSTFByb3RvY29sID0gcGFyc2VkVVJMLnByb3RvY29sIHx8IHNlbGYubG9jYXRpb24ucHJvdG9jb2w7XG5cbiAgLy8gV2hlbiBodHRwcyBpcyB1c2VkIGluIHRoZSBhcHAsIHNlY3VyZSB3ZWIgc29ja2V0cyBhcmUgYWx3YXlzIG5lY2Vzc2FyeSBiZWNhdXNlIHRoZSBicm93c2VyIGRvZXNuJ3QgYWNjZXB0IG5vbi1zZWN1cmUgd2ViIHNvY2tldHMuXG4gIGlmIChzb2NrZXRVUkxQcm90b2NvbCA9PT0gXCJhdXRvOlwiIHx8IGhvc3RuYW1lICYmIGlzSW5BZGRyQW55ICYmIHNlbGYubG9jYXRpb24ucHJvdG9jb2wgPT09IFwiaHR0cHM6XCIpIHtcbiAgICBzb2NrZXRVUkxQcm90b2NvbCA9IHNlbGYubG9jYXRpb24ucHJvdG9jb2w7XG4gIH1cbiAgc29ja2V0VVJMUHJvdG9jb2wgPSBzb2NrZXRVUkxQcm90b2NvbC5yZXBsYWNlKC9eKD86aHR0cHwuKy1leHRlbnNpb258ZmlsZSkvaSwgXCJ3c1wiKTtcbiAgdmFyIHNvY2tldFVSTEF1dGggPSBcIlwiO1xuXG4gIC8vIGBuZXcgVVJMKHVybFN0cmluZywgW2Jhc2VVUkxzdHJpbmddKWAgZG9lc24ndCBoYXZlIGBhdXRoYCBwcm9wZXJ0eVxuICAvLyBQYXJzZSBhdXRoZW50aWNhdGlvbiBjcmVkZW50aWFscyBpbiBjYXNlIHdlIG5lZWQgdGhlbVxuICBpZiAocGFyc2VkVVJMLnVzZXJuYW1lKSB7XG4gICAgc29ja2V0VVJMQXV0aCA9IHBhcnNlZFVSTC51c2VybmFtZTtcblxuICAgIC8vIFNpbmNlIEhUVFAgYmFzaWMgYXV0aGVudGljYXRpb24gZG9lcyBub3QgYWxsb3cgZW1wdHkgdXNlcm5hbWUsXG4gICAgLy8gd2Ugb25seSBpbmNsdWRlIHBhc3N3b3JkIGlmIHRoZSB1c2VybmFtZSBpcyBub3QgZW1wdHkuXG4gICAgaWYgKHBhcnNlZFVSTC5wYXNzd29yZCkge1xuICAgICAgLy8gUmVzdWx0OiA8dXNlcm5hbWU+OjxwYXNzd29yZD5cbiAgICAgIHNvY2tldFVSTEF1dGggPSBzb2NrZXRVUkxBdXRoLmNvbmNhdChcIjpcIiwgcGFyc2VkVVJMLnBhc3N3b3JkKTtcbiAgICB9XG4gIH1cblxuICAvLyBJbiBjYXNlIHRoZSBob3N0IGlzIGEgcmF3IElQdjYgYWRkcmVzcywgaXQgY2FuIGJlIGVuY2xvc2VkIGluXG4gIC8vIHRoZSBicmFja2V0cyBhcyB0aGUgYnJhY2tldHMgYXJlIG5lZWRlZCBpbiB0aGUgZmluYWwgVVJMIHN0cmluZy5cbiAgLy8gTmVlZCB0byByZW1vdmUgdGhvc2UgYXMgdXJsLmZvcm1hdCBibGluZGx5IGFkZHMgaXRzIG93biBzZXQgb2YgYnJhY2tldHNcbiAgLy8gaWYgdGhlIGhvc3Qgc3RyaW5nIGNvbnRhaW5zIGNvbG9ucy4gVGhhdCB3b3VsZCBsZWFkIHRvIG5vbi13b3JraW5nXG4gIC8vIGRvdWJsZSBicmFja2V0cyAoZS5nLiBbWzo6XV0pIGhvc3RcbiAgLy9cbiAgLy8gQWxsIG9mIHRoZXNlIHdlYiBzb2NrZXQgdXJsIHBhcmFtcyBhcmUgb3B0aW9uYWxseSBwYXNzZWQgaW4gdGhyb3VnaCByZXNvdXJjZVF1ZXJ5LFxuICAvLyBzbyB3ZSBuZWVkIHRvIGZhbGwgYmFjayB0byB0aGUgZGVmYXVsdCBpZiB0aGV5IGFyZSBub3QgcHJvdmlkZWRcbiAgdmFyIHNvY2tldFVSTEhvc3RuYW1lID0gKGhvc3RuYW1lIHx8IHNlbGYubG9jYXRpb24uaG9zdG5hbWUgfHwgXCJsb2NhbGhvc3RcIikucmVwbGFjZSgvXlxcWyguKilcXF0kLywgXCIkMVwiKTtcbiAgdmFyIHNvY2tldFVSTFBvcnQgPSBwYXJzZWRVUkwucG9ydDtcbiAgaWYgKCFzb2NrZXRVUkxQb3J0IHx8IHNvY2tldFVSTFBvcnQgPT09IFwiMFwiKSB7XG4gICAgc29ja2V0VVJMUG9ydCA9IHNlbGYubG9jYXRpb24ucG9ydDtcbiAgfVxuXG4gIC8vIElmIHBhdGggaXMgcHJvdmlkZWQgaXQnbGwgYmUgcGFzc2VkIGluIHZpYSB0aGUgcmVzb3VyY2VRdWVyeSBhcyBhXG4gIC8vIHF1ZXJ5IHBhcmFtIHNvIGl0IGhhcyB0byBiZSBwYXJzZWQgb3V0IG9mIHRoZSBxdWVyeXN0cmluZyBpbiBvcmRlciBmb3IgdGhlXG4gIC8vIGNsaWVudCB0byBvcGVuIHRoZSBzb2NrZXQgdG8gdGhlIGNvcnJlY3QgbG9jYXRpb24uXG4gIHZhciBzb2NrZXRVUkxQYXRobmFtZSA9IFwiL3dzXCI7XG4gIGlmIChwYXJzZWRVUkwucGF0aG5hbWUgJiYgIXBhcnNlZFVSTC5mcm9tQ3VycmVudFNjcmlwdCkge1xuICAgIHNvY2tldFVSTFBhdGhuYW1lID0gcGFyc2VkVVJMLnBhdGhuYW1lO1xuICB9XG4gIHJldHVybiBmb3JtYXQoe1xuICAgIHByb3RvY29sOiBzb2NrZXRVUkxQcm90b2NvbCxcbiAgICBhdXRoOiBzb2NrZXRVUkxBdXRoLFxuICAgIGhvc3RuYW1lOiBzb2NrZXRVUkxIb3N0bmFtZSxcbiAgICBwb3J0OiBzb2NrZXRVUkxQb3J0LFxuICAgIHBhdGhuYW1lOiBzb2NrZXRVUkxQYXRobmFtZSxcbiAgICBzbGFzaGVzOiB0cnVlXG4gIH0pO1xufVxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlU29ja2V0VVJMOyIsIi8qKlxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZ2V0Q3VycmVudFNjcmlwdFNvdXJjZSgpIHtcbiAgLy8gYGRvY3VtZW50LmN1cnJlbnRTY3JpcHRgIGlzIHRoZSBtb3N0IGFjY3VyYXRlIHdheSB0byBmaW5kIHRoZSBjdXJyZW50IHNjcmlwdCxcbiAgLy8gYnV0IGlzIG5vdCBzdXBwb3J0ZWQgaW4gYWxsIGJyb3dzZXJzLlxuICBpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdCkge1xuICAgIHJldHVybiBkb2N1bWVudC5jdXJyZW50U2NyaXB0LmdldEF0dHJpYnV0ZShcInNyY1wiKTtcbiAgfVxuXG4gIC8vIEZhbGxiYWNrIHRvIGdldHRpbmcgYWxsIHNjcmlwdHMgcnVubmluZyBpbiB0aGUgZG9jdW1lbnQuXG4gIHZhciBzY3JpcHRFbGVtZW50cyA9IGRvY3VtZW50LnNjcmlwdHMgfHwgW107XG4gIHZhciBzY3JpcHRFbGVtZW50c1dpdGhTcmMgPSBBcnJheS5wcm90b3R5cGUuZmlsdGVyLmNhbGwoc2NyaXB0RWxlbWVudHMsIGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgcmV0dXJuIGVsZW1lbnQuZ2V0QXR0cmlidXRlKFwic3JjXCIpO1xuICB9KTtcbiAgaWYgKHNjcmlwdEVsZW1lbnRzV2l0aFNyYy5sZW5ndGggPiAwKSB7XG4gICAgdmFyIGN1cnJlbnRTY3JpcHQgPSBzY3JpcHRFbGVtZW50c1dpdGhTcmNbc2NyaXB0RWxlbWVudHNXaXRoU3JjLmxlbmd0aCAtIDFdO1xuICAgIHJldHVybiBjdXJyZW50U2NyaXB0LmdldEF0dHJpYnV0ZShcInNyY1wiKTtcbiAgfVxuXG4gIC8vIEZhaWwgYXMgdGhlcmUgd2FzIG5vIHNjcmlwdCB0byB1c2UuXG4gIHRocm93IG5ldyBFcnJvcihcIlt3ZWJwYWNrLWRldi1zZXJ2ZXJdIEZhaWxlZCB0byBnZXQgY3VycmVudCBzY3JpcHQgc291cmNlLlwiKTtcbn1cbmV4cG9ydCBkZWZhdWx0IGdldEN1cnJlbnRTY3JpcHRTb3VyY2U7IiwiaW1wb3J0IGxvZ2dlciBmcm9tIFwiLi4vbW9kdWxlcy9sb2dnZXIvaW5kZXguanNcIjtcbnZhciBuYW1lID0gXCJ3ZWJwYWNrLWRldi1zZXJ2ZXJcIjtcbi8vIGRlZmF1bHQgbGV2ZWwgaXMgc2V0IG9uIHRoZSBjbGllbnQgc2lkZSwgc28gaXQgZG9lcyBub3QgbmVlZFxuLy8gdG8gYmUgc2V0IGJ5IHRoZSBDTEkgb3IgQVBJXG52YXIgZGVmYXVsdExldmVsID0gXCJpbmZvXCI7XG5cbi8vIG9wdGlvbnMgbmV3IG9wdGlvbnMsIG1lcmdlIHdpdGggb2xkIG9wdGlvbnNcbi8qKlxuICogQHBhcmFtIHtmYWxzZSB8IHRydWUgfCBcIm5vbmVcIiB8IFwiZXJyb3JcIiB8IFwid2FyblwiIHwgXCJpbmZvXCIgfCBcImxvZ1wiIHwgXCJ2ZXJib3NlXCJ9IGxldmVsXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZnVuY3Rpb24gc2V0TG9nTGV2ZWwobGV2ZWwpIHtcbiAgbG9nZ2VyLmNvbmZpZ3VyZURlZmF1bHRMb2dnZXIoe1xuICAgIGxldmVsOiBsZXZlbFxuICB9KTtcbn1cbnNldExvZ0xldmVsKGRlZmF1bHRMZXZlbCk7XG52YXIgbG9nID0gbG9nZ2VyLmdldExvZ2dlcihuYW1lKTtcbnZhciBsb2dFbmFibGVkRmVhdHVyZXMgPSBmdW5jdGlvbiBsb2dFbmFibGVkRmVhdHVyZXMoZmVhdHVyZXMpIHtcbiAgdmFyIGVuYWJsZWRGZWF0dXJlcyA9IE9iamVjdC5rZXlzKGZlYXR1cmVzKTtcbiAgaWYgKCFmZWF0dXJlcyB8fCBlbmFibGVkRmVhdHVyZXMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBsb2dTdHJpbmcgPSBcIlNlcnZlciBzdGFydGVkOlwiO1xuXG4gIC8vIFNlcnZlciBzdGFydGVkOiBIb3QgTW9kdWxlIFJlcGxhY2VtZW50IGVuYWJsZWQsIExpdmUgUmVsb2FkaW5nIGVuYWJsZWQsIE92ZXJsYXkgZGlzYWJsZWQuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgZW5hYmxlZEZlYXR1cmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGtleSA9IGVuYWJsZWRGZWF0dXJlc1tpXTtcbiAgICBsb2dTdHJpbmcgKz0gXCIgXCIuY29uY2F0KGtleSwgXCIgXCIpLmNvbmNhdChmZWF0dXJlc1trZXldID8gXCJlbmFibGVkXCIgOiBcImRpc2FibGVkXCIsIFwiLFwiKTtcbiAgfVxuICAvLyByZXBsYWNlIGxhc3QgY29tbWEgd2l0aCBhIHBlcmlvZFxuICBsb2dTdHJpbmcgPSBsb2dTdHJpbmcuc2xpY2UoMCwgLTEpLmNvbmNhdChcIi5cIik7XG4gIGxvZy5pbmZvKGxvZ1N0cmluZyk7XG59O1xuZXhwb3J0IHsgbG9nLCBsb2dFbmFibGVkRmVhdHVyZXMsIHNldExvZ0xldmVsIH07IiwiaW1wb3J0IGdldEN1cnJlbnRTY3JpcHRTb3VyY2UgZnJvbSBcIi4vZ2V0Q3VycmVudFNjcmlwdFNvdXJjZS5qc1wiO1xuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSByZXNvdXJjZVF1ZXJ5XG4gKiBAcmV0dXJucyB7eyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfCBib29sZWFuIH19XG4gKi9cbmZ1bmN0aW9uIHBhcnNlVVJMKHJlc291cmNlUXVlcnkpIHtcbiAgLyoqIEB0eXBlIHt7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9fSAqL1xuICB2YXIgb3B0aW9ucyA9IHt9O1xuICBpZiAodHlwZW9mIHJlc291cmNlUXVlcnkgPT09IFwic3RyaW5nXCIgJiYgcmVzb3VyY2VRdWVyeSAhPT0gXCJcIikge1xuICAgIHZhciBzZWFyY2hQYXJhbXMgPSByZXNvdXJjZVF1ZXJ5LnNsaWNlKDEpLnNwbGl0KFwiJlwiKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNlYXJjaFBhcmFtcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHBhaXIgPSBzZWFyY2hQYXJhbXNbaV0uc3BsaXQoXCI9XCIpO1xuICAgICAgb3B0aW9uc1twYWlyWzBdXSA9IGRlY29kZVVSSUNvbXBvbmVudChwYWlyWzFdKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gRWxzZSwgZ2V0IHRoZSB1cmwgZnJvbSB0aGUgPHNjcmlwdD4gdGhpcyBmaWxlIHdhcyBjYWxsZWQgd2l0aC5cbiAgICB2YXIgc2NyaXB0U291cmNlID0gZ2V0Q3VycmVudFNjcmlwdFNvdXJjZSgpO1xuICAgIHZhciBzY3JpcHRTb3VyY2VVUkw7XG4gICAgdHJ5IHtcbiAgICAgIC8vIFRoZSBwbGFjZWhvbGRlciBgYmFzZVVSTGAgd2l0aCBgd2luZG93LmxvY2F0aW9uLmhyZWZgLFxuICAgICAgLy8gaXMgdG8gYWxsb3cgcGFyc2luZyBvZiBwYXRoLXJlbGF0aXZlIG9yIHByb3RvY29sLXJlbGF0aXZlIFVSTHMsXG4gICAgICAvLyBhbmQgd2lsbCBoYXZlIG5vIGVmZmVjdCBpZiBgc2NyaXB0U291cmNlYCBpcyBhIGZ1bGx5IHZhbGlkIFVSTC5cbiAgICAgIHNjcmlwdFNvdXJjZVVSTCA9IG5ldyBVUkwoc2NyaXB0U291cmNlLCBzZWxmLmxvY2F0aW9uLmhyZWYpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAvLyBVUkwgcGFyc2luZyBmYWlsZWQsIGRvIG5vdGhpbmcuXG4gICAgICAvLyBXZSB3aWxsIHN0aWxsIHByb2NlZWQgdG8gc2VlIGlmIHdlIGNhbiByZWNvdmVyIHVzaW5nIGByZXNvdXJjZVF1ZXJ5YFxuICAgIH1cbiAgICBpZiAoc2NyaXB0U291cmNlVVJMKSB7XG4gICAgICBvcHRpb25zID0gc2NyaXB0U291cmNlVVJMO1xuICAgICAgb3B0aW9ucy5mcm9tQ3VycmVudFNjcmlwdCA9IHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBvcHRpb25zO1xufVxuZXhwb3J0IGRlZmF1bHQgcGFyc2VVUkw7IiwiaW1wb3J0IGhvdEVtaXR0ZXIgZnJvbSBcIndlYnBhY2svaG90L2VtaXR0ZXIuanNcIjtcbmltcG9ydCB7IGxvZyB9IGZyb20gXCIuL2xvZy5qc1wiO1xuXG4vKiogQHR5cGVkZWYge2ltcG9ydChcIi4uL2luZGV4XCIpLk9wdGlvbnN9IE9wdGlvbnNcbi8qKiBAdHlwZWRlZiB7aW1wb3J0KFwiLi4vaW5kZXhcIikuU3RhdHVzfSBTdGF0dXNcblxuLyoqXG4gKiBAcGFyYW0ge09wdGlvbnN9IG9wdGlvbnNcbiAqIEBwYXJhbSB7U3RhdHVzfSBzdGF0dXNcbiAqL1xuZnVuY3Rpb24gcmVsb2FkQXBwKF9yZWYsIHN0YXR1cykge1xuICB2YXIgaG90ID0gX3JlZi5ob3QsXG4gICAgbGl2ZVJlbG9hZCA9IF9yZWYubGl2ZVJlbG9hZDtcbiAgaWYgKHN0YXR1cy5pc1VubG9hZGluZykge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgY3VycmVudEhhc2ggPSBzdGF0dXMuY3VycmVudEhhc2gsXG4gICAgcHJldmlvdXNIYXNoID0gc3RhdHVzLnByZXZpb3VzSGFzaDtcbiAgdmFyIGlzSW5pdGlhbCA9IGN1cnJlbnRIYXNoLmluZGV4T2YoLyoqIEB0eXBlIHtzdHJpbmd9ICovcHJldmlvdXNIYXNoKSA+PSAwO1xuICBpZiAoaXNJbml0aWFsKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7V2luZG93fSByb290V2luZG93XG4gICAqIEBwYXJhbSB7bnVtYmVyfSBpbnRlcnZhbElkXG4gICAqL1xuICBmdW5jdGlvbiBhcHBseVJlbG9hZChyb290V2luZG93LCBpbnRlcnZhbElkKSB7XG4gICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbElkKTtcbiAgICBsb2cuaW5mbyhcIkFwcCB1cGRhdGVkLiBSZWxvYWRpbmcuLi5cIik7XG4gICAgcm9vdFdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgfVxuICB2YXIgc2VhcmNoID0gc2VsZi5sb2NhdGlvbi5zZWFyY2gudG9Mb3dlckNhc2UoKTtcbiAgdmFyIGFsbG93VG9Ib3QgPSBzZWFyY2guaW5kZXhPZihcIndlYnBhY2stZGV2LXNlcnZlci1ob3Q9ZmFsc2VcIikgPT09IC0xO1xuICB2YXIgYWxsb3dUb0xpdmVSZWxvYWQgPSBzZWFyY2guaW5kZXhPZihcIndlYnBhY2stZGV2LXNlcnZlci1saXZlLXJlbG9hZD1mYWxzZVwiKSA9PT0gLTE7XG4gIGlmIChob3QgJiYgYWxsb3dUb0hvdCkge1xuICAgIGxvZy5pbmZvKFwiQXBwIGhvdCB1cGRhdGUuLi5cIik7XG4gICAgaG90RW1pdHRlci5lbWl0KFwid2VicGFja0hvdFVwZGF0ZVwiLCBzdGF0dXMuY3VycmVudEhhc2gpO1xuICAgIGlmICh0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiAmJiBzZWxmLndpbmRvdykge1xuICAgICAgLy8gYnJvYWRjYXN0IHVwZGF0ZSB0byB3aW5kb3dcbiAgICAgIHNlbGYucG9zdE1lc3NhZ2UoXCJ3ZWJwYWNrSG90VXBkYXRlXCIuY29uY2F0KHN0YXR1cy5jdXJyZW50SGFzaCksIFwiKlwiKTtcbiAgICB9XG4gIH1cbiAgLy8gYWxsb3cgcmVmcmVzaGluZyB0aGUgcGFnZSBvbmx5IGlmIGxpdmVSZWxvYWQgaXNuJ3QgZGlzYWJsZWRcbiAgZWxzZSBpZiAobGl2ZVJlbG9hZCAmJiBhbGxvd1RvTGl2ZVJlbG9hZCkge1xuICAgIHZhciByb290V2luZG93ID0gc2VsZjtcblxuICAgIC8vIHVzZSBwYXJlbnQgd2luZG93IGZvciByZWxvYWQgKGluIGNhc2Ugd2UncmUgaW4gYW4gaWZyYW1lIHdpdGggbm8gdmFsaWQgc3JjKVxuICAgIHZhciBpbnRlcnZhbElkID0gc2VsZi5zZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAocm9vdFdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCAhPT0gXCJhYm91dDpcIikge1xuICAgICAgICAvLyByZWxvYWQgaW1tZWRpYXRlbHkgaWYgcHJvdG9jb2wgaXMgdmFsaWRcbiAgICAgICAgYXBwbHlSZWxvYWQocm9vdFdpbmRvdywgaW50ZXJ2YWxJZCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByb290V2luZG93ID0gcm9vdFdpbmRvdy5wYXJlbnQ7XG4gICAgICAgIGlmIChyb290V2luZG93LnBhcmVudCA9PT0gcm9vdFdpbmRvdykge1xuICAgICAgICAgIC8vIGlmIHBhcmVudCBlcXVhbHMgY3VycmVudCB3aW5kb3cgd2UndmUgcmVhY2hlZCB0aGUgcm9vdCB3aGljaCB3b3VsZCBjb250aW51ZSBmb3JldmVyLCBzbyB0cmlnZ2VyIGEgcmVsb2FkIGFueXdheXNcbiAgICAgICAgICBhcHBseVJlbG9hZChyb290V2luZG93LCBpbnRlcnZhbElkKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5leHBvcnQgZGVmYXVsdCByZWxvYWRBcHA7IiwiLyogZ2xvYmFsIF9fcmVzb3VyY2VRdWVyeSBXb3JrZXJHbG9iYWxTY29wZSAqL1xuXG4vLyBTZW5kIG1lc3NhZ2VzIHRvIHRoZSBvdXRzaWRlLCBzbyBwbHVnaW5zIGNhbiBjb25zdW1lIGl0LlxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICogQHBhcmFtIHthbnl9IFtkYXRhXVxuICovXG5mdW5jdGlvbiBzZW5kTXNnKHR5cGUsIGRhdGEpIHtcbiAgaWYgKHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiICYmICh0eXBlb2YgV29ya2VyR2xvYmFsU2NvcGUgPT09IFwidW5kZWZpbmVkXCIgfHwgIShzZWxmIGluc3RhbmNlb2YgV29ya2VyR2xvYmFsU2NvcGUpKSkge1xuICAgIHNlbGYucG9zdE1lc3NhZ2Uoe1xuICAgICAgdHlwZTogXCJ3ZWJwYWNrXCIuY29uY2F0KHR5cGUpLFxuICAgICAgZGF0YTogZGF0YVxuICAgIH0sIFwiKlwiKTtcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgc2VuZE1zZzsiLCJ2YXIgYW5zaVJlZ2V4ID0gbmV3IFJlZ0V4cChbXCJbXFxcXHUwMDFCXFxcXHUwMDlCXVtbXFxcXF0oKSM7P10qKD86KD86KD86KD86O1stYS16QS1aXFxcXGRcXFxcLyMmLjo9PyVAfl9dKykqfFthLXpBLVpcXFxcZF0rKD86O1stYS16QS1aXFxcXGRcXFxcLyMmLjo9PyVAfl9dKikqKT9cXFxcdTAwMDcpXCIsIFwiKD86KD86XFxcXGR7MSw0fSg/OjtcXFxcZHswLDR9KSopP1tcXFxcZEEtUFItVFpjZi1ucS11eT0+PH5dKSlcIl0uam9pbihcInxcIiksIFwiZ1wiKTtcblxuLyoqXG4gKlxuICogU3RyaXAgW0FOU0kgZXNjYXBlIGNvZGVzXShodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9BTlNJX2VzY2FwZV9jb2RlKSBmcm9tIGEgc3RyaW5nLlxuICogQWRhcHRlZCBmcm9tIGNvZGUgb3JpZ2luYWxseSByZWxlYXNlZCBieSBTaW5kcmUgU29yaHVzXG4gKiBMaWNlbnNlZCB0aGUgTUlUIExpY2Vuc2VcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIHN0cmlwQW5zaShzdHJpbmcpIHtcbiAgaWYgKHR5cGVvZiBzdHJpbmcgIT09IFwic3RyaW5nXCIpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiRXhwZWN0ZWQgYSBgc3RyaW5nYCwgZ290IGBcIi5jb25jYXQodHlwZW9mIHN0cmluZywgXCJgXCIpKTtcbiAgfVxuICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoYW5zaVJlZ2V4LCBcIlwiKTtcbn1cbmV4cG9ydCBkZWZhdWx0IHN0cmlwQW5zaTsiLCIvKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuLyogZ2xvYmFscyBfX3dlYnBhY2tfaGFzaF9fICovXG5pZiAobW9kdWxlLmhvdCkge1xuXHQvKiogQHR5cGUge3VuZGVmaW5lZHxzdHJpbmd9ICovXG5cdHZhciBsYXN0SGFzaDtcblx0dmFyIHVwVG9EYXRlID0gZnVuY3Rpb24gdXBUb0RhdGUoKSB7XG5cdFx0cmV0dXJuIC8qKiBAdHlwZSB7c3RyaW5nfSAqLyAobGFzdEhhc2gpLmluZGV4T2YoX193ZWJwYWNrX2hhc2hfXykgPj0gMDtcblx0fTtcblx0dmFyIGxvZyA9IHJlcXVpcmUoXCIuL2xvZ1wiKTtcblx0dmFyIGNoZWNrID0gZnVuY3Rpb24gY2hlY2soKSB7XG5cdFx0bW9kdWxlLmhvdFxuXHRcdFx0LmNoZWNrKHRydWUpXG5cdFx0XHQudGhlbihmdW5jdGlvbiAodXBkYXRlZE1vZHVsZXMpIHtcblx0XHRcdFx0aWYgKCF1cGRhdGVkTW9kdWxlcykge1xuXHRcdFx0XHRcdGxvZyhcblx0XHRcdFx0XHRcdFwid2FybmluZ1wiLFxuXHRcdFx0XHRcdFx0XCJbSE1SXSBDYW5ub3QgZmluZCB1cGRhdGUuIFwiICtcblx0XHRcdFx0XHRcdFx0KHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCJcblx0XHRcdFx0XHRcdFx0XHQ/IFwiTmVlZCB0byBkbyBhIGZ1bGwgcmVsb2FkIVwiXG5cdFx0XHRcdFx0XHRcdFx0OiBcIlBsZWFzZSByZWxvYWQgbWFudWFsbHkhXCIpXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRsb2coXG5cdFx0XHRcdFx0XHRcIndhcm5pbmdcIixcblx0XHRcdFx0XHRcdFwiW0hNUl0gKFByb2JhYmx5IGJlY2F1c2Ugb2YgcmVzdGFydGluZyB0aGUgd2VicGFjay1kZXYtc2VydmVyKVwiXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdFx0XHRcdFx0d2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoIXVwVG9EYXRlKCkpIHtcblx0XHRcdFx0XHRjaGVjaygpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmVxdWlyZShcIi4vbG9nLWFwcGx5LXJlc3VsdFwiKSh1cGRhdGVkTW9kdWxlcywgdXBkYXRlZE1vZHVsZXMpO1xuXG5cdFx0XHRcdGlmICh1cFRvRGF0ZSgpKSB7XG5cdFx0XHRcdFx0bG9nKFwiaW5mb1wiLCBcIltITVJdIEFwcCBpcyB1cCB0byBkYXRlLlwiKTtcblx0XHRcdFx0fVxuXHRcdFx0fSlcblx0XHRcdC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG5cdFx0XHRcdHZhciBzdGF0dXMgPSBtb2R1bGUuaG90LnN0YXR1cygpO1xuXHRcdFx0XHRpZiAoW1wiYWJvcnRcIiwgXCJmYWlsXCJdLmluZGV4T2Yoc3RhdHVzKSA+PSAwKSB7XG5cdFx0XHRcdFx0bG9nKFxuXHRcdFx0XHRcdFx0XCJ3YXJuaW5nXCIsXG5cdFx0XHRcdFx0XHRcIltITVJdIENhbm5vdCBhcHBseSB1cGRhdGUuIFwiICtcblx0XHRcdFx0XHRcdFx0KHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCJcblx0XHRcdFx0XHRcdFx0XHQ/IFwiTmVlZCB0byBkbyBhIGZ1bGwgcmVsb2FkIVwiXG5cdFx0XHRcdFx0XHRcdFx0OiBcIlBsZWFzZSByZWxvYWQgbWFudWFsbHkhXCIpXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRsb2coXCJ3YXJuaW5nXCIsIFwiW0hNUl0gXCIgKyBsb2cuZm9ybWF0RXJyb3IoZXJyKSk7XG5cdFx0XHRcdFx0aWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHtcblx0XHRcdFx0XHRcdHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0bG9nKFwid2FybmluZ1wiLCBcIltITVJdIFVwZGF0ZSBmYWlsZWQ6IFwiICsgbG9nLmZvcm1hdEVycm9yKGVycikpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0fTtcblx0dmFyIGhvdEVtaXR0ZXIgPSByZXF1aXJlKFwiLi9lbWl0dGVyXCIpO1xuXHRob3RFbWl0dGVyLm9uKFwid2VicGFja0hvdFVwZGF0ZVwiLCBmdW5jdGlvbiAoY3VycmVudEhhc2gpIHtcblx0XHRsYXN0SGFzaCA9IGN1cnJlbnRIYXNoO1xuXHRcdGlmICghdXBUb0RhdGUoKSAmJiBtb2R1bGUuaG90LnN0YXR1cygpID09PSBcImlkbGVcIikge1xuXHRcdFx0bG9nKFwiaW5mb1wiLCBcIltITVJdIENoZWNraW5nIGZvciB1cGRhdGVzIG9uIHRoZSBzZXJ2ZXIuLi5cIik7XG5cdFx0XHRjaGVjaygpO1xuXHRcdH1cblx0fSk7XG5cdGxvZyhcImluZm9cIiwgXCJbSE1SXSBXYWl0aW5nIGZvciB1cGRhdGUgc2lnbmFsIGZyb20gV0RTLi4uXCIpO1xufSBlbHNlIHtcblx0dGhyb3cgbmV3IEVycm9yKFwiW0hNUl0gSG90IE1vZHVsZSBSZXBsYWNlbWVudCBpcyBkaXNhYmxlZC5cIik7XG59XG4iLCJ2YXIgRXZlbnRFbWl0dGVyID0gcmVxdWlyZShcImV2ZW50c1wiKTtcbm1vZHVsZS5leHBvcnRzID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuIiwiLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cblxuLyoqXG4gKiBAcGFyYW0geyhzdHJpbmcgfCBudW1iZXIpW119IHVwZGF0ZWRNb2R1bGVzIHVwZGF0ZWQgbW9kdWxlc1xuICogQHBhcmFtIHsoc3RyaW5nIHwgbnVtYmVyKVtdIHwgbnVsbH0gcmVuZXdlZE1vZHVsZXMgcmVuZXdlZCBtb2R1bGVzXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHVwZGF0ZWRNb2R1bGVzLCByZW5ld2VkTW9kdWxlcykge1xuXHR2YXIgdW5hY2NlcHRlZE1vZHVsZXMgPSB1cGRhdGVkTW9kdWxlcy5maWx0ZXIoZnVuY3Rpb24gKG1vZHVsZUlkKSB7XG5cdFx0cmV0dXJuIHJlbmV3ZWRNb2R1bGVzICYmIHJlbmV3ZWRNb2R1bGVzLmluZGV4T2YobW9kdWxlSWQpIDwgMDtcblx0fSk7XG5cdHZhciBsb2cgPSByZXF1aXJlKFwiLi9sb2dcIik7XG5cblx0aWYgKHVuYWNjZXB0ZWRNb2R1bGVzLmxlbmd0aCA+IDApIHtcblx0XHRsb2coXG5cdFx0XHRcIndhcm5pbmdcIixcblx0XHRcdFwiW0hNUl0gVGhlIGZvbGxvd2luZyBtb2R1bGVzIGNvdWxkbid0IGJlIGhvdCB1cGRhdGVkOiAoVGhleSB3b3VsZCBuZWVkIGEgZnVsbCByZWxvYWQhKVwiXG5cdFx0KTtcblx0XHR1bmFjY2VwdGVkTW9kdWxlcy5mb3JFYWNoKGZ1bmN0aW9uIChtb2R1bGVJZCkge1xuXHRcdFx0bG9nKFwid2FybmluZ1wiLCBcIltITVJdICAtIFwiICsgbW9kdWxlSWQpO1xuXHRcdH0pO1xuXHR9XG5cblx0aWYgKCFyZW5ld2VkTW9kdWxlcyB8fCByZW5ld2VkTW9kdWxlcy5sZW5ndGggPT09IDApIHtcblx0XHRsb2coXCJpbmZvXCIsIFwiW0hNUl0gTm90aGluZyBob3QgdXBkYXRlZC5cIik7XG5cdH0gZWxzZSB7XG5cdFx0bG9nKFwiaW5mb1wiLCBcIltITVJdIFVwZGF0ZWQgbW9kdWxlczpcIik7XG5cdFx0cmVuZXdlZE1vZHVsZXMuZm9yRWFjaChmdW5jdGlvbiAobW9kdWxlSWQpIHtcblx0XHRcdGlmICh0eXBlb2YgbW9kdWxlSWQgPT09IFwic3RyaW5nXCIgJiYgbW9kdWxlSWQuaW5kZXhPZihcIiFcIikgIT09IC0xKSB7XG5cdFx0XHRcdHZhciBwYXJ0cyA9IG1vZHVsZUlkLnNwbGl0KFwiIVwiKTtcblx0XHRcdFx0bG9nLmdyb3VwQ29sbGFwc2VkKFwiaW5mb1wiLCBcIltITVJdICAtIFwiICsgcGFydHMucG9wKCkpO1xuXHRcdFx0XHRsb2coXCJpbmZvXCIsIFwiW0hNUl0gIC0gXCIgKyBtb2R1bGVJZCk7XG5cdFx0XHRcdGxvZy5ncm91cEVuZChcImluZm9cIik7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRsb2coXCJpbmZvXCIsIFwiW0hNUl0gIC0gXCIgKyBtb2R1bGVJZCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0dmFyIG51bWJlcklkcyA9IHJlbmV3ZWRNb2R1bGVzLmV2ZXJ5KGZ1bmN0aW9uIChtb2R1bGVJZCkge1xuXHRcdFx0cmV0dXJuIHR5cGVvZiBtb2R1bGVJZCA9PT0gXCJudW1iZXJcIjtcblx0XHR9KTtcblx0XHRpZiAobnVtYmVySWRzKVxuXHRcdFx0bG9nKFxuXHRcdFx0XHRcImluZm9cIixcblx0XHRcdFx0J1tITVJdIENvbnNpZGVyIHVzaW5nIHRoZSBvcHRpbWl6YXRpb24ubW9kdWxlSWRzOiBcIm5hbWVkXCIgZm9yIG1vZHVsZSBuYW1lcy4nXG5cdFx0XHQpO1xuXHR9XG59O1xuIiwiLyoqIEB0eXBlZGVmIHtcImluZm9cIiB8IFwid2FybmluZ1wiIHwgXCJlcnJvclwifSBMb2dMZXZlbCAqL1xuXG4vKiogQHR5cGUge0xvZ0xldmVsfSAqL1xudmFyIGxvZ0xldmVsID0gXCJpbmZvXCI7XG5cbmZ1bmN0aW9uIGR1bW15KCkge31cblxuLyoqXG4gKiBAcGFyYW0ge0xvZ0xldmVsfSBsZXZlbCBsb2cgbGV2ZWxcbiAqIEByZXR1cm5zIHtib29sZWFufSB0cnVlLCBpZiBzaG91bGQgbG9nXG4gKi9cbmZ1bmN0aW9uIHNob3VsZExvZyhsZXZlbCkge1xuXHR2YXIgc2hvdWxkTG9nID1cblx0XHQobG9nTGV2ZWwgPT09IFwiaW5mb1wiICYmIGxldmVsID09PSBcImluZm9cIikgfHxcblx0XHQoW1wiaW5mb1wiLCBcIndhcm5pbmdcIl0uaW5kZXhPZihsb2dMZXZlbCkgPj0gMCAmJiBsZXZlbCA9PT0gXCJ3YXJuaW5nXCIpIHx8XG5cdFx0KFtcImluZm9cIiwgXCJ3YXJuaW5nXCIsIFwiZXJyb3JcIl0uaW5kZXhPZihsb2dMZXZlbCkgPj0gMCAmJiBsZXZlbCA9PT0gXCJlcnJvclwiKTtcblx0cmV0dXJuIHNob3VsZExvZztcbn1cblxuLyoqXG4gKiBAcGFyYW0geyhtc2c/OiBzdHJpbmcpID0+IHZvaWR9IGxvZ0ZuIGxvZyBmdW5jdGlvblxuICogQHJldHVybnMgeyhsZXZlbDogTG9nTGV2ZWwsIG1zZz86IHN0cmluZykgPT4gdm9pZH0gZnVuY3Rpb24gdGhhdCBsb2dzIHdoZW4gbG9nIGxldmVsIGlzIHN1ZmZpY2llbnRcbiAqL1xuZnVuY3Rpb24gbG9nR3JvdXAobG9nRm4pIHtcblx0cmV0dXJuIGZ1bmN0aW9uIChsZXZlbCwgbXNnKSB7XG5cdFx0aWYgKHNob3VsZExvZyhsZXZlbCkpIHtcblx0XHRcdGxvZ0ZuKG1zZyk7XG5cdFx0fVxuXHR9O1xufVxuXG4vKipcbiAqIEBwYXJhbSB7TG9nTGV2ZWx9IGxldmVsIGxvZyBsZXZlbFxuICogQHBhcmFtIHtzdHJpbmd8RXJyb3J9IG1zZyBtZXNzYWdlXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxldmVsLCBtc2cpIHtcblx0aWYgKHNob3VsZExvZyhsZXZlbCkpIHtcblx0XHRpZiAobGV2ZWwgPT09IFwiaW5mb1wiKSB7XG5cdFx0XHRjb25zb2xlLmxvZyhtc2cpO1xuXHRcdH0gZWxzZSBpZiAobGV2ZWwgPT09IFwid2FybmluZ1wiKSB7XG5cdFx0XHRjb25zb2xlLndhcm4obXNnKTtcblx0XHR9IGVsc2UgaWYgKGxldmVsID09PSBcImVycm9yXCIpIHtcblx0XHRcdGNvbnNvbGUuZXJyb3IobXNnKTtcblx0XHR9XG5cdH1cbn07XG5cbnZhciBncm91cCA9IGNvbnNvbGUuZ3JvdXAgfHwgZHVtbXk7XG52YXIgZ3JvdXBDb2xsYXBzZWQgPSBjb25zb2xlLmdyb3VwQ29sbGFwc2VkIHx8IGR1bW15O1xudmFyIGdyb3VwRW5kID0gY29uc29sZS5ncm91cEVuZCB8fCBkdW1teTtcblxubW9kdWxlLmV4cG9ydHMuZ3JvdXAgPSBsb2dHcm91cChncm91cCk7XG5cbm1vZHVsZS5leHBvcnRzLmdyb3VwQ29sbGFwc2VkID0gbG9nR3JvdXAoZ3JvdXBDb2xsYXBzZWQpO1xuXG5tb2R1bGUuZXhwb3J0cy5ncm91cEVuZCA9IGxvZ0dyb3VwKGdyb3VwRW5kKTtcblxuLyoqXG4gKiBAcGFyYW0ge0xvZ0xldmVsfSBsZXZlbCBsb2cgbGV2ZWxcbiAqL1xubW9kdWxlLmV4cG9ydHMuc2V0TG9nTGV2ZWwgPSBmdW5jdGlvbiAobGV2ZWwpIHtcblx0bG9nTGV2ZWwgPSBsZXZlbDtcbn07XG5cbi8qKlxuICogQHBhcmFtIHtFcnJvcn0gZXJyIGVycm9yXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBmb3JtYXR0ZWQgZXJyb3JcbiAqL1xubW9kdWxlLmV4cG9ydHMuZm9ybWF0RXJyb3IgPSBmdW5jdGlvbiAoZXJyKSB7XG5cdHZhciBtZXNzYWdlID0gZXJyLm1lc3NhZ2U7XG5cdHZhciBzdGFjayA9IGVyci5zdGFjaztcblx0aWYgKCFzdGFjaykge1xuXHRcdHJldHVybiBtZXNzYWdlO1xuXHR9IGVsc2UgaWYgKHN0YWNrLmluZGV4T2YobWVzc2FnZSkgPCAwKSB7XG5cdFx0cmV0dXJuIG1lc3NhZ2UgKyBcIlxcblwiICsgc3RhY2s7XG5cdH1cblx0cmV0dXJuIHN0YWNrO1xufTtcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9O1xuICAgIGlmKG1vZHVsZS5ob3QpIHtcbiAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGxvY2Fsc0pzb25TdHJpbmcgPSB1bmRlZmluZWQ7XG4gICAgICAgIC8vIDE3Mjc5MzgwNzAzMjVcbiAgICAgICAgdmFyIGNzc1JlbG9hZCA9IHJlcXVpcmUoXCIuLi9ub2RlX21vZHVsZXMvbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4vZGlzdC9obXIvaG90TW9kdWxlUmVwbGFjZW1lbnQuanNcIikobW9kdWxlLmlkLCB7XCJwdWJsaWNQYXRoXCI6XCJcIn0pO1xuICAgICAgICAvLyBvbmx5IGludmFsaWRhdGUgd2hlbiBsb2NhbHMgY2hhbmdlXG4gICAgICAgIGlmIChcbiAgICAgICAgICBtb2R1bGUuaG90LmRhdGEgJiZcbiAgICAgICAgICBtb2R1bGUuaG90LmRhdGEudmFsdWUgJiZcbiAgICAgICAgICBtb2R1bGUuaG90LmRhdGEudmFsdWUgIT09IGxvY2Fsc0pzb25TdHJpbmdcbiAgICAgICAgKSB7XG4gICAgICAgICAgbW9kdWxlLmhvdC5pbnZhbGlkYXRlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbW9kdWxlLmhvdC5hY2NlcHQoKTtcbiAgICAgICAgfVxuICAgICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgIGRhdGEudmFsdWUgPSBsb2NhbHNKc29uU3RyaW5nO1xuICAgICAgICAgIGNzc1JlbG9hZCgpO1xuICAgICAgICB9KTtcbiAgICAgIH0pKCk7XG4gICAgfVxuICAiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdHZhciBleGVjT3B0aW9ucyA9IHsgaWQ6IG1vZHVsZUlkLCBtb2R1bGU6IG1vZHVsZSwgZmFjdG9yeTogX193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0sIHJlcXVpcmU6IF9fd2VicGFja19yZXF1aXJlX18gfTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5pLmZvckVhY2goZnVuY3Rpb24oaGFuZGxlcikgeyBoYW5kbGVyKGV4ZWNPcHRpb25zKTsgfSk7XG5cdG1vZHVsZSA9IGV4ZWNPcHRpb25zLm1vZHVsZTtcblx0ZXhlY09wdGlvbnMuZmFjdG9yeS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBleGVjT3B0aW9ucy5yZXF1aXJlKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4vLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuX193ZWJwYWNrX3JlcXVpcmVfXy5jID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fO1xuXG4vLyBleHBvc2UgdGhlIG1vZHVsZSBleGVjdXRpb24gaW50ZXJjZXB0b3Jcbl9fd2VicGFja19yZXF1aXJlX18uaSA9IFtdO1xuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIi8vIFRoaXMgZnVuY3Rpb24gYWxsb3cgdG8gcmVmZXJlbmNlIGFsbCBjaHVua3Ncbl9fd2VicGFja19yZXF1aXJlX18uaHUgPSAoY2h1bmtJZCkgPT4ge1xuXHQvLyByZXR1cm4gdXJsIGZvciBmaWxlbmFtZXMgYmFzZWQgb24gdGVtcGxhdGVcblx0cmV0dXJuIFwiXCIgKyBjaHVua0lkICsgXCIuXCIgKyBfX3dlYnBhY2tfcmVxdWlyZV9fLmgoKSArIFwiLmhvdC11cGRhdGUuanNcIjtcbn07IiwiLy8gVGhpcyBmdW5jdGlvbiBhbGxvdyB0byByZWZlcmVuY2UgYXN5bmMgY2h1bmtzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm1pbmlDc3NGID0gKGNodW5rSWQpID0+IHtcblx0Ly8gcmV0dXJuIHVybCBmb3IgZmlsZW5hbWVzIGJhc2VkIG9uIHRlbXBsYXRlXG5cdHJldHVybiB1bmRlZmluZWQ7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uaG1yRiA9ICgpID0+IChcIm1haW4uXCIgKyBfX3dlYnBhY2tfcmVxdWlyZV9fLmgoKSArIFwiLmhvdC11cGRhdGUuanNvblwiKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSAoKSA9PiAoXCIwMzU0OTBjMmJjZDUyZTFkMjE0Y1wiKSIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsInZhciBpblByb2dyZXNzID0ge307XG52YXIgZGF0YVdlYnBhY2tQcmVmaXggPSBcImZsb2VtYTpcIjtcbi8vIGxvYWRTY3JpcHQgZnVuY3Rpb24gdG8gbG9hZCBhIHNjcmlwdCB2aWEgc2NyaXB0IHRhZ1xuX193ZWJwYWNrX3JlcXVpcmVfXy5sID0gKHVybCwgZG9uZSwga2V5LCBjaHVua0lkKSA9PiB7XG5cdGlmKGluUHJvZ3Jlc3NbdXJsXSkgeyBpblByb2dyZXNzW3VybF0ucHVzaChkb25lKTsgcmV0dXJuOyB9XG5cdHZhciBzY3JpcHQsIG5lZWRBdHRhY2g7XG5cdGlmKGtleSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgc2NyaXB0cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIHMgPSBzY3JpcHRzW2ldO1xuXHRcdFx0aWYocy5nZXRBdHRyaWJ1dGUoXCJzcmNcIikgPT0gdXJsIHx8IHMuZ2V0QXR0cmlidXRlKFwiZGF0YS13ZWJwYWNrXCIpID09IGRhdGFXZWJwYWNrUHJlZml4ICsga2V5KSB7IHNjcmlwdCA9IHM7IGJyZWFrOyB9XG5cdFx0fVxuXHR9XG5cdGlmKCFzY3JpcHQpIHtcblx0XHRuZWVkQXR0YWNoID0gdHJ1ZTtcblx0XHRzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcblxuXHRcdHNjcmlwdC5jaGFyc2V0ID0gJ3V0Zi04Jztcblx0XHRzY3JpcHQudGltZW91dCA9IDEyMDtcblx0XHRpZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5uYykge1xuXHRcdFx0c2NyaXB0LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIF9fd2VicGFja19yZXF1aXJlX18ubmMpO1xuXHRcdH1cblx0XHRzY3JpcHQuc2V0QXR0cmlidXRlKFwiZGF0YS13ZWJwYWNrXCIsIGRhdGFXZWJwYWNrUHJlZml4ICsga2V5KTtcblxuXHRcdHNjcmlwdC5zcmMgPSB1cmw7XG5cdH1cblx0aW5Qcm9ncmVzc1t1cmxdID0gW2RvbmVdO1xuXHR2YXIgb25TY3JpcHRDb21wbGV0ZSA9IChwcmV2LCBldmVudCkgPT4ge1xuXHRcdC8vIGF2b2lkIG1lbSBsZWFrcyBpbiBJRS5cblx0XHRzY3JpcHQub25lcnJvciA9IHNjcmlwdC5vbmxvYWQgPSBudWxsO1xuXHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcblx0XHR2YXIgZG9uZUZucyA9IGluUHJvZ3Jlc3NbdXJsXTtcblx0XHRkZWxldGUgaW5Qcm9ncmVzc1t1cmxdO1xuXHRcdHNjcmlwdC5wYXJlbnROb2RlICYmIHNjcmlwdC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHNjcmlwdCk7XG5cdFx0ZG9uZUZucyAmJiBkb25lRm5zLmZvckVhY2goKGZuKSA9PiAoZm4oZXZlbnQpKSk7XG5cdFx0aWYocHJldikgcmV0dXJuIHByZXYoZXZlbnQpO1xuXHR9XG5cdHZhciB0aW1lb3V0ID0gc2V0VGltZW91dChvblNjcmlwdENvbXBsZXRlLmJpbmQobnVsbCwgdW5kZWZpbmVkLCB7IHR5cGU6ICd0aW1lb3V0JywgdGFyZ2V0OiBzY3JpcHQgfSksIDEyMDAwMCk7XG5cdHNjcmlwdC5vbmVycm9yID0gb25TY3JpcHRDb21wbGV0ZS5iaW5kKG51bGwsIHNjcmlwdC5vbmVycm9yKTtcblx0c2NyaXB0Lm9ubG9hZCA9IG9uU2NyaXB0Q29tcGxldGUuYmluZChudWxsLCBzY3JpcHQub25sb2FkKTtcblx0bmVlZEF0dGFjaCAmJiBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG59OyIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBjdXJyZW50TW9kdWxlRGF0YSA9IHt9O1xudmFyIGluc3RhbGxlZE1vZHVsZXMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmM7XG5cbi8vIG1vZHVsZSBhbmQgcmVxdWlyZSBjcmVhdGlvblxudmFyIGN1cnJlbnRDaGlsZE1vZHVsZTtcbnZhciBjdXJyZW50UGFyZW50cyA9IFtdO1xuXG4vLyBzdGF0dXNcbnZhciByZWdpc3RlcmVkU3RhdHVzSGFuZGxlcnMgPSBbXTtcbnZhciBjdXJyZW50U3RhdHVzID0gXCJpZGxlXCI7XG5cbi8vIHdoaWxlIGRvd25sb2FkaW5nXG52YXIgYmxvY2tpbmdQcm9taXNlcyA9IDA7XG52YXIgYmxvY2tpbmdQcm9taXNlc1dhaXRpbmcgPSBbXTtcblxuLy8gVGhlIHVwZGF0ZSBpbmZvXG52YXIgY3VycmVudFVwZGF0ZUFwcGx5SGFuZGxlcnM7XG52YXIgcXVldWVkSW52YWxpZGF0ZWRNb2R1bGVzO1xuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmhtckQgPSBjdXJyZW50TW9kdWxlRGF0YTtcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5pLnB1c2goZnVuY3Rpb24gKG9wdGlvbnMpIHtcblx0dmFyIG1vZHVsZSA9IG9wdGlvbnMubW9kdWxlO1xuXHR2YXIgcmVxdWlyZSA9IGNyZWF0ZVJlcXVpcmUob3B0aW9ucy5yZXF1aXJlLCBvcHRpb25zLmlkKTtcblx0bW9kdWxlLmhvdCA9IGNyZWF0ZU1vZHVsZUhvdE9iamVjdChvcHRpb25zLmlkLCBtb2R1bGUpO1xuXHRtb2R1bGUucGFyZW50cyA9IGN1cnJlbnRQYXJlbnRzO1xuXHRtb2R1bGUuY2hpbGRyZW4gPSBbXTtcblx0Y3VycmVudFBhcmVudHMgPSBbXTtcblx0b3B0aW9ucy5yZXF1aXJlID0gcmVxdWlyZTtcbn0pO1xuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmhtckMgPSB7fTtcbl9fd2VicGFja19yZXF1aXJlX18uaG1ySSA9IHt9O1xuXG5mdW5jdGlvbiBjcmVhdGVSZXF1aXJlKHJlcXVpcmUsIG1vZHVsZUlkKSB7XG5cdHZhciBtZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuXHRpZiAoIW1lKSByZXR1cm4gcmVxdWlyZTtcblx0dmFyIGZuID0gZnVuY3Rpb24gKHJlcXVlc3QpIHtcblx0XHRpZiAobWUuaG90LmFjdGl2ZSkge1xuXHRcdFx0aWYgKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0pIHtcblx0XHRcdFx0dmFyIHBhcmVudHMgPSBpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHM7XG5cdFx0XHRcdGlmIChwYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpID09PSAtMSkge1xuXHRcdFx0XHRcdHBhcmVudHMucHVzaChtb2R1bGVJZCk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGN1cnJlbnRQYXJlbnRzID0gW21vZHVsZUlkXTtcblx0XHRcdFx0Y3VycmVudENoaWxkTW9kdWxlID0gcmVxdWVzdDtcblx0XHRcdH1cblx0XHRcdGlmIChtZS5jaGlsZHJlbi5pbmRleE9mKHJlcXVlc3QpID09PSAtMSkge1xuXHRcdFx0XHRtZS5jaGlsZHJlbi5wdXNoKHJlcXVlc3QpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zb2xlLndhcm4oXG5cdFx0XHRcdFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICtcblx0XHRcdFx0XHRyZXF1ZXN0ICtcblx0XHRcdFx0XHRcIikgZnJvbSBkaXNwb3NlZCBtb2R1bGUgXCIgK1xuXHRcdFx0XHRcdG1vZHVsZUlkXG5cdFx0XHQpO1xuXHRcdFx0Y3VycmVudFBhcmVudHMgPSBbXTtcblx0XHR9XG5cdFx0cmV0dXJuIHJlcXVpcmUocmVxdWVzdCk7XG5cdH07XG5cdHZhciBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IgPSBmdW5jdGlvbiAobmFtZSkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRjb25maWd1cmFibGU6IHRydWUsXG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0OiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHJldHVybiByZXF1aXJlW25hbWVdO1xuXHRcdFx0fSxcblx0XHRcdHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG5cdFx0XHRcdHJlcXVpcmVbbmFtZV0gPSB2YWx1ZTtcblx0XHRcdH1cblx0XHR9O1xuXHR9O1xuXHRmb3IgKHZhciBuYW1lIGluIHJlcXVpcmUpIHtcblx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHJlcXVpcmUsIG5hbWUpICYmIG5hbWUgIT09IFwiZVwiKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZm4sIG5hbWUsIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvcihuYW1lKSk7XG5cdFx0fVxuXHR9XG5cdGZuLmUgPSBmdW5jdGlvbiAoY2h1bmtJZCwgZmV0Y2hQcmlvcml0eSkge1xuXHRcdHJldHVybiB0cmFja0Jsb2NraW5nUHJvbWlzZShyZXF1aXJlLmUoY2h1bmtJZCwgZmV0Y2hQcmlvcml0eSkpO1xuXHR9O1xuXHRyZXR1cm4gZm47XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZU1vZHVsZUhvdE9iamVjdChtb2R1bGVJZCwgbWUpIHtcblx0dmFyIF9tYWluID0gY3VycmVudENoaWxkTW9kdWxlICE9PSBtb2R1bGVJZDtcblx0dmFyIGhvdCA9IHtcblx0XHQvLyBwcml2YXRlIHN0dWZmXG5cdFx0X2FjY2VwdGVkRGVwZW5kZW5jaWVzOiB7fSxcblx0XHRfYWNjZXB0ZWRFcnJvckhhbmRsZXJzOiB7fSxcblx0XHRfZGVjbGluZWREZXBlbmRlbmNpZXM6IHt9LFxuXHRcdF9zZWxmQWNjZXB0ZWQ6IGZhbHNlLFxuXHRcdF9zZWxmRGVjbGluZWQ6IGZhbHNlLFxuXHRcdF9zZWxmSW52YWxpZGF0ZWQ6IGZhbHNlLFxuXHRcdF9kaXNwb3NlSGFuZGxlcnM6IFtdLFxuXHRcdF9tYWluOiBfbWFpbixcblx0XHRfcmVxdWlyZVNlbGY6IGZ1bmN0aW9uICgpIHtcblx0XHRcdGN1cnJlbnRQYXJlbnRzID0gbWUucGFyZW50cy5zbGljZSgpO1xuXHRcdFx0Y3VycmVudENoaWxkTW9kdWxlID0gX21haW4gPyB1bmRlZmluZWQgOiBtb2R1bGVJZDtcblx0XHRcdF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpO1xuXHRcdH0sXG5cblx0XHQvLyBNb2R1bGUgQVBJXG5cdFx0YWN0aXZlOiB0cnVlLFxuXHRcdGFjY2VwdDogZnVuY3Rpb24gKGRlcCwgY2FsbGJhY2ssIGVycm9ySGFuZGxlcikge1xuXHRcdFx0aWYgKGRlcCA9PT0gdW5kZWZpbmVkKSBob3QuX3NlbGZBY2NlcHRlZCA9IHRydWU7XG5cdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcImZ1bmN0aW9uXCIpIGhvdC5fc2VsZkFjY2VwdGVkID0gZGVwO1xuXHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIiAmJiBkZXAgIT09IG51bGwpIHtcblx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbiAoKSB7fTtcblx0XHRcdFx0XHRob3QuX2FjY2VwdGVkRXJyb3JIYW5kbGVyc1tkZXBbaV1dID0gZXJyb3JIYW5kbGVyO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcF0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbiAoKSB7fTtcblx0XHRcdFx0aG90Ll9hY2NlcHRlZEVycm9ySGFuZGxlcnNbZGVwXSA9IGVycm9ySGFuZGxlcjtcblx0XHRcdH1cblx0XHR9LFxuXHRcdGRlY2xpbmU6IGZ1bmN0aW9uIChkZXApIHtcblx0XHRcdGlmIChkZXAgPT09IHVuZGVmaW5lZCkgaG90Ll9zZWxmRGVjbGluZWQgPSB0cnVlO1xuXHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIiAmJiBkZXAgIT09IG51bGwpXG5cdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxuXHRcdFx0XHRcdGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IHRydWU7XG5cdFx0XHRlbHNlIGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwXSA9IHRydWU7XG5cdFx0fSxcblx0XHRkaXNwb3NlOiBmdW5jdGlvbiAoY2FsbGJhY2spIHtcblx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuXHRcdH0sXG5cdFx0YWRkRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuXHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XG5cdFx0fSxcblx0XHRyZW1vdmVEaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG5cdFx0XHR2YXIgaWR4ID0gaG90Ll9kaXNwb3NlSGFuZGxlcnMuaW5kZXhPZihjYWxsYmFjayk7XG5cdFx0XHRpZiAoaWR4ID49IDApIGhvdC5fZGlzcG9zZUhhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xuXHRcdH0sXG5cdFx0aW52YWxpZGF0ZTogZnVuY3Rpb24gKCkge1xuXHRcdFx0dGhpcy5fc2VsZkludmFsaWRhdGVkID0gdHJ1ZTtcblx0XHRcdHN3aXRjaCAoY3VycmVudFN0YXR1cykge1xuXHRcdFx0XHRjYXNlIFwiaWRsZVwiOlxuXHRcdFx0XHRcdGN1cnJlbnRVcGRhdGVBcHBseUhhbmRsZXJzID0gW107XG5cdFx0XHRcdFx0T2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5obXJJKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18uaG1ySVtrZXldKFxuXHRcdFx0XHRcdFx0XHRtb2R1bGVJZCxcblx0XHRcdFx0XHRcdFx0Y3VycmVudFVwZGF0ZUFwcGx5SGFuZGxlcnNcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0c2V0U3RhdHVzKFwicmVhZHlcIik7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJyZWFkeVwiOlxuXHRcdFx0XHRcdE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uaG1ySSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG5cdFx0XHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmhtcklba2V5XShcblx0XHRcdFx0XHRcdFx0bW9kdWxlSWQsXG5cdFx0XHRcdFx0XHRcdGN1cnJlbnRVcGRhdGVBcHBseUhhbmRsZXJzXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFwicHJlcGFyZVwiOlxuXHRcdFx0XHRjYXNlIFwiY2hlY2tcIjpcblx0XHRcdFx0Y2FzZSBcImRpc3Bvc2VcIjpcblx0XHRcdFx0Y2FzZSBcImFwcGx5XCI6XG5cdFx0XHRcdFx0KHF1ZXVlZEludmFsaWRhdGVkTW9kdWxlcyA9IHF1ZXVlZEludmFsaWRhdGVkTW9kdWxlcyB8fCBbXSkucHVzaChcblx0XHRcdFx0XHRcdG1vZHVsZUlkXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHQvLyBpZ25vcmUgcmVxdWVzdHMgaW4gZXJyb3Igc3RhdGVzXG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8vIE1hbmFnZW1lbnQgQVBJXG5cdFx0Y2hlY2s6IGhvdENoZWNrLFxuXHRcdGFwcGx5OiBob3RBcHBseSxcblx0XHRzdGF0dXM6IGZ1bmN0aW9uIChsKSB7XG5cdFx0XHRpZiAoIWwpIHJldHVybiBjdXJyZW50U3RhdHVzO1xuXHRcdFx0cmVnaXN0ZXJlZFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG5cdFx0fSxcblx0XHRhZGRTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbiAobCkge1xuXHRcdFx0cmVnaXN0ZXJlZFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG5cdFx0fSxcblx0XHRyZW1vdmVTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbiAobCkge1xuXHRcdFx0dmFyIGlkeCA9IHJlZ2lzdGVyZWRTdGF0dXNIYW5kbGVycy5pbmRleE9mKGwpO1xuXHRcdFx0aWYgKGlkeCA+PSAwKSByZWdpc3RlcmVkU3RhdHVzSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG5cdFx0fSxcblxuXHRcdC8vIGluaGVyaXQgZnJvbSBwcmV2aW91cyBkaXNwb3NlIGNhbGxcblx0XHRkYXRhOiBjdXJyZW50TW9kdWxlRGF0YVttb2R1bGVJZF1cblx0fTtcblx0Y3VycmVudENoaWxkTW9kdWxlID0gdW5kZWZpbmVkO1xuXHRyZXR1cm4gaG90O1xufVxuXG5mdW5jdGlvbiBzZXRTdGF0dXMobmV3U3RhdHVzKSB7XG5cdGN1cnJlbnRTdGF0dXMgPSBuZXdTdGF0dXM7XG5cdHZhciByZXN1bHRzID0gW107XG5cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCByZWdpc3RlcmVkU3RhdHVzSGFuZGxlcnMubGVuZ3RoOyBpKyspXG5cdFx0cmVzdWx0c1tpXSA9IHJlZ2lzdGVyZWRTdGF0dXNIYW5kbGVyc1tpXS5jYWxsKG51bGwsIG5ld1N0YXR1cyk7XG5cblx0cmV0dXJuIFByb21pc2UuYWxsKHJlc3VsdHMpLnRoZW4oZnVuY3Rpb24gKCkge30pO1xufVxuXG5mdW5jdGlvbiB1bmJsb2NrKCkge1xuXHRpZiAoLS1ibG9ja2luZ1Byb21pc2VzID09PSAwKSB7XG5cdFx0c2V0U3RhdHVzKFwicmVhZHlcIikudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHRpZiAoYmxvY2tpbmdQcm9taXNlcyA9PT0gMCkge1xuXHRcdFx0XHR2YXIgbGlzdCA9IGJsb2NraW5nUHJvbWlzZXNXYWl0aW5nO1xuXHRcdFx0XHRibG9ja2luZ1Byb21pc2VzV2FpdGluZyA9IFtdO1xuXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRsaXN0W2ldKCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblx0fVxufVxuXG5mdW5jdGlvbiB0cmFja0Jsb2NraW5nUHJvbWlzZShwcm9taXNlKSB7XG5cdHN3aXRjaCAoY3VycmVudFN0YXR1cykge1xuXHRcdGNhc2UgXCJyZWFkeVwiOlxuXHRcdFx0c2V0U3RhdHVzKFwicHJlcGFyZVwiKTtcblx0XHQvKiBmYWxsdGhyb3VnaCAqL1xuXHRcdGNhc2UgXCJwcmVwYXJlXCI6XG5cdFx0XHRibG9ja2luZ1Byb21pc2VzKys7XG5cdFx0XHRwcm9taXNlLnRoZW4odW5ibG9jaywgdW5ibG9jayk7XG5cdFx0XHRyZXR1cm4gcHJvbWlzZTtcblx0XHRkZWZhdWx0OlxuXHRcdFx0cmV0dXJuIHByb21pc2U7XG5cdH1cbn1cblxuZnVuY3Rpb24gd2FpdEZvckJsb2NraW5nUHJvbWlzZXMoZm4pIHtcblx0aWYgKGJsb2NraW5nUHJvbWlzZXMgPT09IDApIHJldHVybiBmbigpO1xuXHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcblx0XHRibG9ja2luZ1Byb21pc2VzV2FpdGluZy5wdXNoKGZ1bmN0aW9uICgpIHtcblx0XHRcdHJlc29sdmUoZm4oKSk7XG5cdFx0fSk7XG5cdH0pO1xufVxuXG5mdW5jdGlvbiBob3RDaGVjayhhcHBseU9uVXBkYXRlKSB7XG5cdGlmIChjdXJyZW50U3RhdHVzICE9PSBcImlkbGVcIikge1xuXHRcdHRocm93IG5ldyBFcnJvcihcImNoZWNrKCkgaXMgb25seSBhbGxvd2VkIGluIGlkbGUgc3RhdHVzXCIpO1xuXHR9XG5cdHJldHVybiBzZXRTdGF0dXMoXCJjaGVja1wiKVxuXHRcdC50aGVuKF9fd2VicGFja19yZXF1aXJlX18uaG1yTSlcblx0XHQudGhlbihmdW5jdGlvbiAodXBkYXRlKSB7XG5cdFx0XHRpZiAoIXVwZGF0ZSkge1xuXHRcdFx0XHRyZXR1cm4gc2V0U3RhdHVzKGFwcGx5SW52YWxpZGF0ZWRNb2R1bGVzKCkgPyBcInJlYWR5XCIgOiBcImlkbGVcIikudGhlbihcblx0XHRcdFx0XHRmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBzZXRTdGF0dXMoXCJwcmVwYXJlXCIpLnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0XHR2YXIgdXBkYXRlZE1vZHVsZXMgPSBbXTtcblx0XHRcdFx0Y3VycmVudFVwZGF0ZUFwcGx5SGFuZGxlcnMgPSBbXTtcblxuXHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5hbGwoXG5cdFx0XHRcdFx0T2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5obXJDKS5yZWR1Y2UoZnVuY3Rpb24gKFxuXHRcdFx0XHRcdFx0cHJvbWlzZXMsXG5cdFx0XHRcdFx0XHRrZXlcblx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18uaG1yQ1trZXldKFxuXHRcdFx0XHRcdFx0XHR1cGRhdGUuYyxcblx0XHRcdFx0XHRcdFx0dXBkYXRlLnIsXG5cdFx0XHRcdFx0XHRcdHVwZGF0ZS5tLFxuXHRcdFx0XHRcdFx0XHRwcm9taXNlcyxcblx0XHRcdFx0XHRcdFx0Y3VycmVudFVwZGF0ZUFwcGx5SGFuZGxlcnMsXG5cdFx0XHRcdFx0XHRcdHVwZGF0ZWRNb2R1bGVzXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0cmV0dXJuIHByb21pc2VzO1xuXHRcdFx0XHRcdH0sIFtdKVxuXHRcdFx0XHQpLnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdHJldHVybiB3YWl0Rm9yQmxvY2tpbmdQcm9taXNlcyhmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHRpZiAoYXBwbHlPblVwZGF0ZSkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gaW50ZXJuYWxBcHBseShhcHBseU9uVXBkYXRlKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHJldHVybiBzZXRTdGF0dXMoXCJyZWFkeVwiKS50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHVwZGF0ZWRNb2R1bGVzO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG59XG5cbmZ1bmN0aW9uIGhvdEFwcGx5KG9wdGlvbnMpIHtcblx0aWYgKGN1cnJlbnRTdGF0dXMgIT09IFwicmVhZHlcIikge1xuXHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoKS50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihcblx0XHRcdFx0XCJhcHBseSgpIGlzIG9ubHkgYWxsb3dlZCBpbiByZWFkeSBzdGF0dXMgKHN0YXRlOiBcIiArXG5cdFx0XHRcdFx0Y3VycmVudFN0YXR1cyArXG5cdFx0XHRcdFx0XCIpXCJcblx0XHRcdCk7XG5cdFx0fSk7XG5cdH1cblx0cmV0dXJuIGludGVybmFsQXBwbHkob3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIGludGVybmFsQXBwbHkob3B0aW9ucykge1xuXHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuXHRhcHBseUludmFsaWRhdGVkTW9kdWxlcygpO1xuXG5cdHZhciByZXN1bHRzID0gY3VycmVudFVwZGF0ZUFwcGx5SGFuZGxlcnMubWFwKGZ1bmN0aW9uIChoYW5kbGVyKSB7XG5cdFx0cmV0dXJuIGhhbmRsZXIob3B0aW9ucyk7XG5cdH0pO1xuXHRjdXJyZW50VXBkYXRlQXBwbHlIYW5kbGVycyA9IHVuZGVmaW5lZDtcblxuXHR2YXIgZXJyb3JzID0gcmVzdWx0c1xuXHRcdC5tYXAoZnVuY3Rpb24gKHIpIHtcblx0XHRcdHJldHVybiByLmVycm9yO1xuXHRcdH0pXG5cdFx0LmZpbHRlcihCb29sZWFuKTtcblxuXHRpZiAoZXJyb3JzLmxlbmd0aCA+IDApIHtcblx0XHRyZXR1cm4gc2V0U3RhdHVzKFwiYWJvcnRcIikudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHR0aHJvdyBlcnJvcnNbMF07XG5cdFx0fSk7XG5cdH1cblxuXHQvLyBOb3cgaW4gXCJkaXNwb3NlXCIgcGhhc2Vcblx0dmFyIGRpc3Bvc2VQcm9taXNlID0gc2V0U3RhdHVzKFwiZGlzcG9zZVwiKTtcblxuXHRyZXN1bHRzLmZvckVhY2goZnVuY3Rpb24gKHJlc3VsdCkge1xuXHRcdGlmIChyZXN1bHQuZGlzcG9zZSkgcmVzdWx0LmRpc3Bvc2UoKTtcblx0fSk7XG5cblx0Ly8gTm93IGluIFwiYXBwbHlcIiBwaGFzZVxuXHR2YXIgYXBwbHlQcm9taXNlID0gc2V0U3RhdHVzKFwiYXBwbHlcIik7XG5cblx0dmFyIGVycm9yO1xuXHR2YXIgcmVwb3J0RXJyb3IgPSBmdW5jdGlvbiAoZXJyKSB7XG5cdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG5cdH07XG5cblx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xuXHRyZXN1bHRzLmZvckVhY2goZnVuY3Rpb24gKHJlc3VsdCkge1xuXHRcdGlmIChyZXN1bHQuYXBwbHkpIHtcblx0XHRcdHZhciBtb2R1bGVzID0gcmVzdWx0LmFwcGx5KHJlcG9ydEVycm9yKTtcblx0XHRcdGlmIChtb2R1bGVzKSB7XG5cdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbW9kdWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKG1vZHVsZXNbaV0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9KTtcblxuXHRyZXR1cm4gUHJvbWlzZS5hbGwoW2Rpc3Bvc2VQcm9taXNlLCBhcHBseVByb21pc2VdKS50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHQvLyBoYW5kbGUgZXJyb3JzIGluIGFjY2VwdCBoYW5kbGVycyBhbmQgc2VsZiBhY2NlcHRlZCBtb2R1bGUgbG9hZFxuXHRcdGlmIChlcnJvcikge1xuXHRcdFx0cmV0dXJuIHNldFN0YXR1cyhcImZhaWxcIikudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHRocm93IGVycm9yO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0aWYgKHF1ZXVlZEludmFsaWRhdGVkTW9kdWxlcykge1xuXHRcdFx0cmV0dXJuIGludGVybmFsQXBwbHkob3B0aW9ucykudGhlbihmdW5jdGlvbiAobGlzdCkge1xuXHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMuZm9yRWFjaChmdW5jdGlvbiAobW9kdWxlSWQpIHtcblx0XHRcdFx0XHRpZiAobGlzdC5pbmRleE9mKG1vZHVsZUlkKSA8IDApIGxpc3QucHVzaChtb2R1bGVJZCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRyZXR1cm4gbGlzdDtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdHJldHVybiBzZXRTdGF0dXMoXCJpZGxlXCIpLnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuIG91dGRhdGVkTW9kdWxlcztcblx0XHR9KTtcblx0fSk7XG59XG5cbmZ1bmN0aW9uIGFwcGx5SW52YWxpZGF0ZWRNb2R1bGVzKCkge1xuXHRpZiAocXVldWVkSW52YWxpZGF0ZWRNb2R1bGVzKSB7XG5cdFx0aWYgKCFjdXJyZW50VXBkYXRlQXBwbHlIYW5kbGVycykgY3VycmVudFVwZGF0ZUFwcGx5SGFuZGxlcnMgPSBbXTtcblx0XHRPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLmhtckkpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuXHRcdFx0cXVldWVkSW52YWxpZGF0ZWRNb2R1bGVzLmZvckVhY2goZnVuY3Rpb24gKG1vZHVsZUlkKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18uaG1ySVtrZXldKFxuXHRcdFx0XHRcdG1vZHVsZUlkLFxuXHRcdFx0XHRcdGN1cnJlbnRVcGRhdGVBcHBseUhhbmRsZXJzXG5cdFx0XHRcdCk7XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0XHRxdWV1ZWRJbnZhbGlkYXRlZE1vZHVsZXMgPSB1bmRlZmluZWQ7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cbn0iLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQgJiYgZG9jdW1lbnQuY3VycmVudFNjcmlwdC50YWdOYW1lLnRvVXBwZXJDYXNlKCkgPT09ICdTQ1JJUFQnKVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjO1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHtcblx0XHRcdHZhciBpID0gc2NyaXB0cy5sZW5ndGggLSAxO1xuXHRcdFx0d2hpbGUgKGkgPiAtMSAmJiAoIXNjcmlwdFVybCB8fCAhL15odHRwKHM/KTovLnRlc3Qoc2NyaXB0VXJsKSkpIHNjcmlwdFVybCA9IHNjcmlwdHNbaS0tXS5zcmM7XG5cdFx0fVxuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm47XG52YXIgY3JlYXRlU3R5bGVzaGVldCA9IChjaHVua0lkLCBmdWxsaHJlZiwgb2xkVGFnLCByZXNvbHZlLCByZWplY3QpID0+IHtcblx0dmFyIGxpbmtUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcblxuXHRsaW5rVGFnLnJlbCA9IFwic3R5bGVzaGVldFwiO1xuXHRsaW5rVGFnLnR5cGUgPSBcInRleHQvY3NzXCI7XG5cdGlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLm5jKSB7XG5cdFx0bGlua1RhZy5ub25jZSA9IF9fd2VicGFja19yZXF1aXJlX18ubmM7XG5cdH1cblx0dmFyIG9uTGlua0NvbXBsZXRlID0gKGV2ZW50KSA9PiB7XG5cdFx0Ly8gYXZvaWQgbWVtIGxlYWtzLlxuXHRcdGxpbmtUYWcub25lcnJvciA9IGxpbmtUYWcub25sb2FkID0gbnVsbDtcblx0XHRpZiAoZXZlbnQudHlwZSA9PT0gJ2xvYWQnKSB7XG5cdFx0XHRyZXNvbHZlKCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHZhciBlcnJvclR5cGUgPSBldmVudCAmJiBldmVudC50eXBlO1xuXHRcdFx0dmFyIHJlYWxIcmVmID0gZXZlbnQgJiYgZXZlbnQudGFyZ2V0ICYmIGV2ZW50LnRhcmdldC5ocmVmIHx8IGZ1bGxocmVmO1xuXHRcdFx0dmFyIGVyciA9IG5ldyBFcnJvcihcIkxvYWRpbmcgQ1NTIGNodW5rIFwiICsgY2h1bmtJZCArIFwiIGZhaWxlZC5cXG4oXCIgKyBlcnJvclR5cGUgKyBcIjogXCIgKyByZWFsSHJlZiArIFwiKVwiKTtcblx0XHRcdGVyci5uYW1lID0gXCJDaHVua0xvYWRFcnJvclwiO1xuXHRcdFx0ZXJyLmNvZGUgPSBcIkNTU19DSFVOS19MT0FEX0ZBSUxFRFwiO1xuXHRcdFx0ZXJyLnR5cGUgPSBlcnJvclR5cGU7XG5cdFx0XHRlcnIucmVxdWVzdCA9IHJlYWxIcmVmO1xuXHRcdFx0aWYgKGxpbmtUYWcucGFyZW50Tm9kZSkgbGlua1RhZy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGxpbmtUYWcpXG5cdFx0XHRyZWplY3QoZXJyKTtcblx0XHR9XG5cdH1cblx0bGlua1RhZy5vbmVycm9yID0gbGlua1RhZy5vbmxvYWQgPSBvbkxpbmtDb21wbGV0ZTtcblx0bGlua1RhZy5ocmVmID0gZnVsbGhyZWY7XG5cblxuXHRpZiAob2xkVGFnKSB7XG5cdFx0b2xkVGFnLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGxpbmtUYWcsIG9sZFRhZy5uZXh0U2libGluZyk7XG5cdH0gZWxzZSB7XG5cdFx0ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChsaW5rVGFnKTtcblx0fVxuXHRyZXR1cm4gbGlua1RhZztcbn07XG52YXIgZmluZFN0eWxlc2hlZXQgPSAoaHJlZiwgZnVsbGhyZWYpID0+IHtcblx0dmFyIGV4aXN0aW5nTGlua1RhZ3MgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImxpbmtcIik7XG5cdGZvcih2YXIgaSA9IDA7IGkgPCBleGlzdGluZ0xpbmtUYWdzLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIHRhZyA9IGV4aXN0aW5nTGlua1RhZ3NbaV07XG5cdFx0dmFyIGRhdGFIcmVmID0gdGFnLmdldEF0dHJpYnV0ZShcImRhdGEtaHJlZlwiKSB8fCB0YWcuZ2V0QXR0cmlidXRlKFwiaHJlZlwiKTtcblx0XHRpZih0YWcucmVsID09PSBcInN0eWxlc2hlZXRcIiAmJiAoZGF0YUhyZWYgPT09IGhyZWYgfHwgZGF0YUhyZWYgPT09IGZ1bGxocmVmKSkgcmV0dXJuIHRhZztcblx0fVxuXHR2YXIgZXhpc3RpbmdTdHlsZVRhZ3MgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInN0eWxlXCIpO1xuXHRmb3IodmFyIGkgPSAwOyBpIDwgZXhpc3RpbmdTdHlsZVRhZ3MubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgdGFnID0gZXhpc3RpbmdTdHlsZVRhZ3NbaV07XG5cdFx0dmFyIGRhdGFIcmVmID0gdGFnLmdldEF0dHJpYnV0ZShcImRhdGEtaHJlZlwiKTtcblx0XHRpZihkYXRhSHJlZiA9PT0gaHJlZiB8fCBkYXRhSHJlZiA9PT0gZnVsbGhyZWYpIHJldHVybiB0YWc7XG5cdH1cbn07XG52YXIgbG9hZFN0eWxlc2hlZXQgPSAoY2h1bmtJZCkgPT4ge1xuXHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdHZhciBocmVmID0gX193ZWJwYWNrX3JlcXVpcmVfXy5taW5pQ3NzRihjaHVua0lkKTtcblx0XHR2YXIgZnVsbGhyZWYgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBocmVmO1xuXHRcdGlmKGZpbmRTdHlsZXNoZWV0KGhyZWYsIGZ1bGxocmVmKSkgcmV0dXJuIHJlc29sdmUoKTtcblx0XHRjcmVhdGVTdHlsZXNoZWV0KGNodW5rSWQsIGZ1bGxocmVmLCBudWxsLCByZXNvbHZlLCByZWplY3QpO1xuXHR9KTtcbn1cbi8vIG5vIGNodW5rIGxvYWRpbmdcblxudmFyIG9sZFRhZ3MgPSBbXTtcbnZhciBuZXdUYWdzID0gW107XG52YXIgYXBwbHlIYW5kbGVyID0gKG9wdGlvbnMpID0+IHtcblx0cmV0dXJuIHsgZGlzcG9zZTogKCkgPT4ge1xuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBvbGRUYWdzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgb2xkVGFnID0gb2xkVGFnc1tpXTtcblx0XHRcdGlmKG9sZFRhZy5wYXJlbnROb2RlKSBvbGRUYWcucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChvbGRUYWcpO1xuXHRcdH1cblx0XHRvbGRUYWdzLmxlbmd0aCA9IDA7XG5cdH0sIGFwcGx5OiAoKSA9PiB7XG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IG5ld1RhZ3MubGVuZ3RoOyBpKyspIG5ld1RhZ3NbaV0ucmVsID0gXCJzdHlsZXNoZWV0XCI7XG5cdFx0bmV3VGFncy5sZW5ndGggPSAwO1xuXHR9IH07XG59XG5fX3dlYnBhY2tfcmVxdWlyZV9fLmhtckMubWluaUNzcyA9IChjaHVua0lkcywgcmVtb3ZlZENodW5rcywgcmVtb3ZlZE1vZHVsZXMsIHByb21pc2VzLCBhcHBseUhhbmRsZXJzLCB1cGRhdGVkTW9kdWxlc0xpc3QpID0+IHtcblx0YXBwbHlIYW5kbGVycy5wdXNoKGFwcGx5SGFuZGxlcik7XG5cdGNodW5rSWRzLmZvckVhY2goKGNodW5rSWQpID0+IHtcblx0XHR2YXIgaHJlZiA9IF9fd2VicGFja19yZXF1aXJlX18ubWluaUNzc0YoY2h1bmtJZCk7XG5cdFx0dmFyIGZ1bGxocmVmID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgaHJlZjtcblx0XHR2YXIgb2xkVGFnID0gZmluZFN0eWxlc2hlZXQoaHJlZiwgZnVsbGhyZWYpO1xuXHRcdGlmKCFvbGRUYWcpIHJldHVybjtcblx0XHRwcm9taXNlcy5wdXNoKG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdHZhciB0YWcgPSBjcmVhdGVTdHlsZXNoZWV0KGNodW5rSWQsIGZ1bGxocmVmLCBvbGRUYWcsICgpID0+IHtcblx0XHRcdFx0dGFnLmFzID0gXCJzdHlsZVwiO1xuXHRcdFx0XHR0YWcucmVsID0gXCJwcmVsb2FkXCI7XG5cdFx0XHRcdHJlc29sdmUoKTtcblx0XHRcdH0sIHJlamVjdCk7XG5cdFx0XHRvbGRUYWdzLnB1c2gob2xkVGFnKTtcblx0XHRcdG5ld1RhZ3MucHVzaCh0YWcpO1xuXHRcdH0pKTtcblx0fSk7XG59XG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZCIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0gX193ZWJwYWNrX3JlcXVpcmVfXy5obXJTX2pzb25wID0gX193ZWJwYWNrX3JlcXVpcmVfXy5obXJTX2pzb25wIHx8IHtcblx0XCJtYWluXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG52YXIgY3VycmVudFVwZGF0ZWRNb2R1bGVzTGlzdDtcbnZhciB3YWl0aW5nVXBkYXRlUmVzb2x2ZXMgPSB7fTtcbmZ1bmN0aW9uIGxvYWRVcGRhdGVDaHVuayhjaHVua0lkLCB1cGRhdGVkTW9kdWxlc0xpc3QpIHtcblx0Y3VycmVudFVwZGF0ZWRNb2R1bGVzTGlzdCA9IHVwZGF0ZWRNb2R1bGVzTGlzdDtcblx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHR3YWl0aW5nVXBkYXRlUmVzb2x2ZXNbY2h1bmtJZF0gPSByZXNvbHZlO1xuXHRcdC8vIHN0YXJ0IHVwZGF0ZSBjaHVuayBsb2FkaW5nXG5cdFx0dmFyIHVybCA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIF9fd2VicGFja19yZXF1aXJlX18uaHUoY2h1bmtJZCk7XG5cdFx0Ly8gY3JlYXRlIGVycm9yIGJlZm9yZSBzdGFjayB1bndvdW5kIHRvIGdldCB1c2VmdWwgc3RhY2t0cmFjZSBsYXRlclxuXHRcdHZhciBlcnJvciA9IG5ldyBFcnJvcigpO1xuXHRcdHZhciBsb2FkaW5nRW5kZWQgPSAoZXZlbnQpID0+IHtcblx0XHRcdGlmKHdhaXRpbmdVcGRhdGVSZXNvbHZlc1tjaHVua0lkXSkge1xuXHRcdFx0XHR3YWl0aW5nVXBkYXRlUmVzb2x2ZXNbY2h1bmtJZF0gPSB1bmRlZmluZWRcblx0XHRcdFx0dmFyIGVycm9yVHlwZSA9IGV2ZW50ICYmIChldmVudC50eXBlID09PSAnbG9hZCcgPyAnbWlzc2luZycgOiBldmVudC50eXBlKTtcblx0XHRcdFx0dmFyIHJlYWxTcmMgPSBldmVudCAmJiBldmVudC50YXJnZXQgJiYgZXZlbnQudGFyZ2V0LnNyYztcblx0XHRcdFx0ZXJyb3IubWVzc2FnZSA9ICdMb2FkaW5nIGhvdCB1cGRhdGUgY2h1bmsgJyArIGNodW5rSWQgKyAnIGZhaWxlZC5cXG4oJyArIGVycm9yVHlwZSArICc6ICcgKyByZWFsU3JjICsgJyknO1xuXHRcdFx0XHRlcnJvci5uYW1lID0gJ0NodW5rTG9hZEVycm9yJztcblx0XHRcdFx0ZXJyb3IudHlwZSA9IGVycm9yVHlwZTtcblx0XHRcdFx0ZXJyb3IucmVxdWVzdCA9IHJlYWxTcmM7XG5cdFx0XHRcdHJlamVjdChlcnJvcik7XG5cdFx0XHR9XG5cdFx0fTtcblx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmwodXJsLCBsb2FkaW5nRW5kZWQpO1xuXHR9KTtcbn1cblxuc2VsZltcIndlYnBhY2tIb3RVcGRhdGVmbG9lbWFcIl0gPSAoY2h1bmtJZCwgbW9yZU1vZHVsZXMsIHJ1bnRpbWUpID0+IHtcblx0Zm9yKHZhciBtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRjdXJyZW50VXBkYXRlW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdGlmKGN1cnJlbnRVcGRhdGVkTW9kdWxlc0xpc3QpIGN1cnJlbnRVcGRhdGVkTW9kdWxlc0xpc3QucHVzaChtb2R1bGVJZCk7XG5cdFx0fVxuXHR9XG5cdGlmKHJ1bnRpbWUpIGN1cnJlbnRVcGRhdGVSdW50aW1lLnB1c2gocnVudGltZSk7XG5cdGlmKHdhaXRpbmdVcGRhdGVSZXNvbHZlc1tjaHVua0lkXSkge1xuXHRcdHdhaXRpbmdVcGRhdGVSZXNvbHZlc1tjaHVua0lkXSgpO1xuXHRcdHdhaXRpbmdVcGRhdGVSZXNvbHZlc1tjaHVua0lkXSA9IHVuZGVmaW5lZDtcblx0fVxufTtcblxudmFyIGN1cnJlbnRVcGRhdGVDaHVua3M7XG52YXIgY3VycmVudFVwZGF0ZTtcbnZhciBjdXJyZW50VXBkYXRlUmVtb3ZlZENodW5rcztcbnZhciBjdXJyZW50VXBkYXRlUnVudGltZTtcbmZ1bmN0aW9uIGFwcGx5SGFuZGxlcihvcHRpb25zKSB7XG5cdGlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmYpIGRlbGV0ZSBfX3dlYnBhY2tfcmVxdWlyZV9fLmYuanNvbnBIbXI7XG5cdGN1cnJlbnRVcGRhdGVDaHVua3MgPSB1bmRlZmluZWQ7XG5cdGZ1bmN0aW9uIGdldEFmZmVjdGVkTW9kdWxlRWZmZWN0cyh1cGRhdGVNb2R1bGVJZCkge1xuXHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbdXBkYXRlTW9kdWxlSWRdO1xuXHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuXG5cdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLm1hcChmdW5jdGlvbiAoaWQpIHtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdGNoYWluOiBbaWRdLFxuXHRcdFx0XHRpZDogaWRcblx0XHRcdH07XG5cdFx0fSk7XG5cdFx0d2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcblx0XHRcdHZhciBxdWV1ZUl0ZW0gPSBxdWV1ZS5wb3AoKTtcblx0XHRcdHZhciBtb2R1bGVJZCA9IHF1ZXVlSXRlbS5pZDtcblx0XHRcdHZhciBjaGFpbiA9IHF1ZXVlSXRlbS5jaGFpbjtcblx0XHRcdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmNbbW9kdWxlSWRdO1xuXHRcdFx0aWYgKFxuXHRcdFx0XHQhbW9kdWxlIHx8XG5cdFx0XHRcdChtb2R1bGUuaG90Ll9zZWxmQWNjZXB0ZWQgJiYgIW1vZHVsZS5ob3QuX3NlbGZJbnZhbGlkYXRlZClcblx0XHRcdClcblx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRpZiAobW9kdWxlLmhvdC5fc2VsZkRlY2xpbmVkKSB7XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0dHlwZTogXCJzZWxmLWRlY2xpbmVkXCIsXG5cdFx0XHRcdFx0Y2hhaW46IGNoYWluLFxuXHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXHRcdFx0aWYgKG1vZHVsZS5ob3QuX21haW4pIHtcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHR0eXBlOiBcInVuYWNjZXB0ZWRcIixcblx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXG5cdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1vZHVsZS5wYXJlbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdHZhciBwYXJlbnRJZCA9IG1vZHVsZS5wYXJlbnRzW2ldO1xuXHRcdFx0XHR2YXIgcGFyZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5jW3BhcmVudElkXTtcblx0XHRcdFx0aWYgKCFwYXJlbnQpIGNvbnRpbnVlO1xuXHRcdFx0XHRpZiAocGFyZW50LmhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRcdHR5cGU6IFwiZGVjbGluZWRcIixcblx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbi5jb25jYXQoW3BhcmVudElkXSksXG5cdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG5cdFx0XHRcdFx0XHRwYXJlbnRJZDogcGFyZW50SWRcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChvdXRkYXRlZE1vZHVsZXMuaW5kZXhPZihwYXJlbnRJZCkgIT09IC0xKSBjb250aW51ZTtcblx0XHRcdFx0aWYgKHBhcmVudC5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuXHRcdFx0XHRcdGlmICghb3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdKVxuXHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdID0gW107XG5cdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdLCBbbW9kdWxlSWRdKTtcblx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdO1xuXHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaChwYXJlbnRJZCk7XG5cdFx0XHRcdHF1ZXVlLnB1c2goe1xuXHRcdFx0XHRcdGNoYWluOiBjaGFpbi5jb25jYXQoW3BhcmVudElkXSksXG5cdFx0XHRcdFx0aWQ6IHBhcmVudElkXG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB7XG5cdFx0XHR0eXBlOiBcImFjY2VwdGVkXCIsXG5cdFx0XHRtb2R1bGVJZDogdXBkYXRlTW9kdWxlSWQsXG5cdFx0XHRvdXRkYXRlZE1vZHVsZXM6IG91dGRhdGVkTW9kdWxlcyxcblx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzOiBvdXRkYXRlZERlcGVuZGVuY2llc1xuXHRcdH07XG5cdH1cblxuXHRmdW5jdGlvbiBhZGRBbGxUb1NldChhLCBiKSB7XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBiLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaXRlbSA9IGJbaV07XG5cdFx0XHRpZiAoYS5pbmRleE9mKGl0ZW0pID09PSAtMSkgYS5wdXNoKGl0ZW0pO1xuXHRcdH1cblx0fVxuXG5cdC8vIGF0IGJlZ2luIGFsbCB1cGRhdGVzIG1vZHVsZXMgYXJlIG91dGRhdGVkXG5cdC8vIHRoZSBcIm91dGRhdGVkXCIgc3RhdHVzIGNhbiBwcm9wYWdhdGUgdG8gcGFyZW50cyBpZiB0aGV5IGRvbid0IGFjY2VwdCB0aGUgY2hpbGRyZW5cblx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XG5cdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcblx0dmFyIGFwcGxpZWRVcGRhdGUgPSB7fTtcblxuXHR2YXIgd2FyblVuZXhwZWN0ZWRSZXF1aXJlID0gZnVuY3Rpb24gd2FyblVuZXhwZWN0ZWRSZXF1aXJlKG1vZHVsZSkge1xuXHRcdGNvbnNvbGUud2Fybihcblx0XHRcdFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICsgbW9kdWxlLmlkICsgXCIpIHRvIGRpc3Bvc2VkIG1vZHVsZVwiXG5cdFx0KTtcblx0fTtcblxuXHRmb3IgKHZhciBtb2R1bGVJZCBpbiBjdXJyZW50VXBkYXRlKSB7XG5cdFx0aWYgKF9fd2VicGFja19yZXF1aXJlX18ubyhjdXJyZW50VXBkYXRlLCBtb2R1bGVJZCkpIHtcblx0XHRcdHZhciBuZXdNb2R1bGVGYWN0b3J5ID0gY3VycmVudFVwZGF0ZVttb2R1bGVJZF07XG5cdFx0XHQvKiogQHR5cGUge1RPRE99ICovXG5cdFx0XHR2YXIgcmVzdWx0ID0gbmV3TW9kdWxlRmFjdG9yeVxuXHRcdFx0XHQ/IGdldEFmZmVjdGVkTW9kdWxlRWZmZWN0cyhtb2R1bGVJZClcblx0XHRcdFx0OiB7XG5cdFx0XHRcdFx0XHR0eXBlOiBcImRpc3Bvc2VkXCIsXG5cdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcblx0XHRcdFx0XHR9O1xuXHRcdFx0LyoqIEB0eXBlIHtFcnJvcnxmYWxzZX0gKi9cblx0XHRcdHZhciBhYm9ydEVycm9yID0gZmFsc2U7XG5cdFx0XHR2YXIgZG9BcHBseSA9IGZhbHNlO1xuXHRcdFx0dmFyIGRvRGlzcG9zZSA9IGZhbHNlO1xuXHRcdFx0dmFyIGNoYWluSW5mbyA9IFwiXCI7XG5cdFx0XHRpZiAocmVzdWx0LmNoYWluKSB7XG5cdFx0XHRcdGNoYWluSW5mbyA9IFwiXFxuVXBkYXRlIHByb3BhZ2F0aW9uOiBcIiArIHJlc3VsdC5jaGFpbi5qb2luKFwiIC0+IFwiKTtcblx0XHRcdH1cblx0XHRcdHN3aXRjaCAocmVzdWx0LnR5cGUpIHtcblx0XHRcdFx0Y2FzZSBcInNlbGYtZGVjbGluZWRcIjpcblx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRlY2xpbmVkKSBvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcblx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXG5cdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuXHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBvZiBzZWxmIGRlY2xpbmU6IFwiICtcblx0XHRcdFx0XHRcdFx0XHRyZXN1bHQubW9kdWxlSWQgK1xuXHRcdFx0XHRcdFx0XHRcdGNoYWluSW5mb1xuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcImRlY2xpbmVkXCI6XG5cdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EZWNsaW5lZCkgb3B0aW9ucy5vbkRlY2xpbmVkKHJlc3VsdCk7XG5cdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZURlY2xpbmVkKVxuXHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcblx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2Ugb2YgZGVjbGluZWQgZGVwZW5kZW5jeTogXCIgK1xuXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5tb2R1bGVJZCArXG5cdFx0XHRcdFx0XHRcdFx0XCIgaW4gXCIgK1xuXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5wYXJlbnRJZCArXG5cdFx0XHRcdFx0XHRcdFx0Y2hhaW5JbmZvXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFwidW5hY2NlcHRlZFwiOlxuXHRcdFx0XHRcdGlmIChvcHRpb25zLm9uVW5hY2NlcHRlZCkgb3B0aW9ucy5vblVuYWNjZXB0ZWQocmVzdWx0KTtcblx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlVW5hY2NlcHRlZClcblx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG5cdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIFwiICsgbW9kdWxlSWQgKyBcIiBpcyBub3QgYWNjZXB0ZWRcIiArIGNoYWluSW5mb1xuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcImFjY2VwdGVkXCI6XG5cdFx0XHRcdFx0aWYgKG9wdGlvbnMub25BY2NlcHRlZCkgb3B0aW9ucy5vbkFjY2VwdGVkKHJlc3VsdCk7XG5cdFx0XHRcdFx0ZG9BcHBseSA9IHRydWU7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJkaXNwb3NlZFwiOlxuXHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGlzcG9zZWQpIG9wdGlvbnMub25EaXNwb3NlZChyZXN1bHQpO1xuXHRcdFx0XHRcdGRvRGlzcG9zZSA9IHRydWU7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiVW5leGNlcHRpb24gdHlwZSBcIiArIHJlc3VsdC50eXBlKTtcblx0XHRcdH1cblx0XHRcdGlmIChhYm9ydEVycm9yKSB7XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0ZXJyb3I6IGFib3J0RXJyb3Jcblx0XHRcdFx0fTtcblx0XHRcdH1cblx0XHRcdGlmIChkb0FwcGx5KSB7XG5cdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gbmV3TW9kdWxlRmFjdG9yeTtcblx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCByZXN1bHQub3V0ZGF0ZWRNb2R1bGVzKTtcblx0XHRcdFx0Zm9yIChtb2R1bGVJZCBpbiByZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcblx0XHRcdFx0XHRpZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5vKHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdFx0XHRpZiAoIW91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSlcblx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdID0gW107XG5cdFx0XHRcdFx0XHRhZGRBbGxUb1NldChcblx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdLFxuXHRcdFx0XHRcdFx0XHRyZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYgKGRvRGlzcG9zZSkge1xuXHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIFtyZXN1bHQubW9kdWxlSWRdKTtcblx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSB3YXJuVW5leHBlY3RlZFJlcXVpcmU7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdGN1cnJlbnRVcGRhdGUgPSB1bmRlZmluZWQ7XG5cblx0Ly8gU3RvcmUgc2VsZiBhY2NlcHRlZCBvdXRkYXRlZCBtb2R1bGVzIHRvIHJlcXVpcmUgdGhlbSBsYXRlciBieSB0aGUgbW9kdWxlIHN5c3RlbVxuXHR2YXIgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzID0gW107XG5cdGZvciAodmFyIGogPSAwOyBqIDwgb3V0ZGF0ZWRNb2R1bGVzLmxlbmd0aDsgaisrKSB7XG5cdFx0dmFyIG91dGRhdGVkTW9kdWxlSWQgPSBvdXRkYXRlZE1vZHVsZXNbal07XG5cdFx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19yZXF1aXJlX18uY1tvdXRkYXRlZE1vZHVsZUlkXTtcblx0XHRpZiAoXG5cdFx0XHRtb2R1bGUgJiZcblx0XHRcdChtb2R1bGUuaG90Ll9zZWxmQWNjZXB0ZWQgfHwgbW9kdWxlLmhvdC5fbWFpbikgJiZcblx0XHRcdC8vIHJlbW92ZWQgc2VsZi1hY2NlcHRlZCBtb2R1bGVzIHNob3VsZCBub3QgYmUgcmVxdWlyZWRcblx0XHRcdGFwcGxpZWRVcGRhdGVbb3V0ZGF0ZWRNb2R1bGVJZF0gIT09IHdhcm5VbmV4cGVjdGVkUmVxdWlyZSAmJlxuXHRcdFx0Ly8gd2hlbiBjYWxsZWQgaW52YWxpZGF0ZSBzZWxmLWFjY2VwdGluZyBpcyBub3QgcG9zc2libGVcblx0XHRcdCFtb2R1bGUuaG90Ll9zZWxmSW52YWxpZGF0ZWRcblx0XHQpIHtcblx0XHRcdG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5wdXNoKHtcblx0XHRcdFx0bW9kdWxlOiBvdXRkYXRlZE1vZHVsZUlkLFxuXHRcdFx0XHRyZXF1aXJlOiBtb2R1bGUuaG90Ll9yZXF1aXJlU2VsZixcblx0XHRcdFx0ZXJyb3JIYW5kbGVyOiBtb2R1bGUuaG90Ll9zZWxmQWNjZXB0ZWRcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXG5cdHZhciBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcztcblxuXHRyZXR1cm4ge1xuXHRcdGRpc3Bvc2U6IGZ1bmN0aW9uICgpIHtcblx0XHRcdGN1cnJlbnRVcGRhdGVSZW1vdmVkQ2h1bmtzLmZvckVhY2goZnVuY3Rpb24gKGNodW5rSWQpIHtcblx0XHRcdFx0ZGVsZXRlIGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcblx0XHRcdH0pO1xuXHRcdFx0Y3VycmVudFVwZGF0ZVJlbW92ZWRDaHVua3MgPSB1bmRlZmluZWQ7XG5cblx0XHRcdHZhciBpZHg7XG5cdFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMuc2xpY2UoKTtcblx0XHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdHZhciBtb2R1bGVJZCA9IHF1ZXVlLnBvcCgpO1xuXHRcdFx0XHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX3JlcXVpcmVfXy5jW21vZHVsZUlkXTtcblx0XHRcdFx0aWYgKCFtb2R1bGUpIGNvbnRpbnVlO1xuXG5cdFx0XHRcdHZhciBkYXRhID0ge307XG5cblx0XHRcdFx0Ly8gQ2FsbCBkaXNwb3NlIGhhbmRsZXJzXG5cdFx0XHRcdHZhciBkaXNwb3NlSGFuZGxlcnMgPSBtb2R1bGUuaG90Ll9kaXNwb3NlSGFuZGxlcnM7XG5cdFx0XHRcdGZvciAoaiA9IDA7IGogPCBkaXNwb3NlSGFuZGxlcnMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0XHRkaXNwb3NlSGFuZGxlcnNbal0uY2FsbChudWxsLCBkYXRhKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmhtckRbbW9kdWxlSWRdID0gZGF0YTtcblxuXHRcdFx0XHQvLyBkaXNhYmxlIG1vZHVsZSAodGhpcyBkaXNhYmxlcyByZXF1aXJlcyBmcm9tIHRoaXMgbW9kdWxlKVxuXHRcdFx0XHRtb2R1bGUuaG90LmFjdGl2ZSA9IGZhbHNlO1xuXG5cdFx0XHRcdC8vIHJlbW92ZSBtb2R1bGUgZnJvbSBjYWNoZVxuXHRcdFx0XHRkZWxldGUgX193ZWJwYWNrX3JlcXVpcmVfXy5jW21vZHVsZUlkXTtcblxuXHRcdFx0XHQvLyB3aGVuIGRpc3Bvc2luZyB0aGVyZSBpcyBubyBuZWVkIHRvIGNhbGwgZGlzcG9zZSBoYW5kbGVyXG5cdFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG5cblx0XHRcdFx0Ly8gcmVtb3ZlIFwicGFyZW50c1wiIHJlZmVyZW5jZXMgZnJvbSBhbGwgY2hpbGRyZW5cblx0XHRcdFx0Zm9yIChqID0gMDsgaiA8IG1vZHVsZS5jaGlsZHJlbi5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRcdHZhciBjaGlsZCA9IF9fd2VicGFja19yZXF1aXJlX18uY1ttb2R1bGUuY2hpbGRyZW5bal1dO1xuXHRcdFx0XHRcdGlmICghY2hpbGQpIGNvbnRpbnVlO1xuXHRcdFx0XHRcdGlkeCA9IGNoaWxkLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCk7XG5cdFx0XHRcdFx0aWYgKGlkeCA+PSAwKSB7XG5cdFx0XHRcdFx0XHRjaGlsZC5wYXJlbnRzLnNwbGljZShpZHgsIDEpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyByZW1vdmUgb3V0ZGF0ZWQgZGVwZW5kZW5jeSBmcm9tIG1vZHVsZSBjaGlsZHJlblxuXHRcdFx0dmFyIGRlcGVuZGVuY3k7XG5cdFx0XHRmb3IgKHZhciBvdXRkYXRlZE1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG5cdFx0XHRcdGlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLm8ob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG91dGRhdGVkTW9kdWxlSWQpKSB7XG5cdFx0XHRcdFx0bW9kdWxlID0gX193ZWJwYWNrX3JlcXVpcmVfXy5jW291dGRhdGVkTW9kdWxlSWRdO1xuXHRcdFx0XHRcdGlmIChtb2R1bGUpIHtcblx0XHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID1cblx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbb3V0ZGF0ZWRNb2R1bGVJZF07XG5cdFx0XHRcdFx0XHRmb3IgKGogPSAwOyBqIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2pdO1xuXHRcdFx0XHRcdFx0XHRpZHggPSBtb2R1bGUuY2hpbGRyZW4uaW5kZXhPZihkZXBlbmRlbmN5KTtcblx0XHRcdFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBtb2R1bGUuY2hpbGRyZW4uc3BsaWNlKGlkeCwgMSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSxcblx0XHRhcHBseTogZnVuY3Rpb24gKHJlcG9ydEVycm9yKSB7XG5cdFx0XHQvLyBpbnNlcnQgbmV3IGNvZGVcblx0XHRcdGZvciAodmFyIHVwZGF0ZU1vZHVsZUlkIGluIGFwcGxpZWRVcGRhdGUpIHtcblx0XHRcdFx0aWYgKF9fd2VicGFja19yZXF1aXJlX18ubyhhcHBsaWVkVXBkYXRlLCB1cGRhdGVNb2R1bGVJZCkpIHtcblx0XHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bdXBkYXRlTW9kdWxlSWRdID0gYXBwbGllZFVwZGF0ZVt1cGRhdGVNb2R1bGVJZF07XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gcnVuIG5ldyBydW50aW1lIG1vZHVsZXNcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgY3VycmVudFVwZGF0ZVJ1bnRpbWUubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0Y3VycmVudFVwZGF0ZVJ1bnRpbWVbaV0oX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIGNhbGwgYWNjZXB0IGhhbmRsZXJzXG5cdFx0XHRmb3IgKHZhciBvdXRkYXRlZE1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG5cdFx0XHRcdGlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLm8ob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG91dGRhdGVkTW9kdWxlSWQpKSB7XG5cdFx0XHRcdFx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19yZXF1aXJlX18uY1tvdXRkYXRlZE1vZHVsZUlkXTtcblx0XHRcdFx0XHRpZiAobW9kdWxlKSB7XG5cdFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9XG5cdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW291dGRhdGVkTW9kdWxlSWRdO1xuXHRcdFx0XHRcdFx0dmFyIGNhbGxiYWNrcyA9IFtdO1xuXHRcdFx0XHRcdFx0dmFyIGVycm9ySGFuZGxlcnMgPSBbXTtcblx0XHRcdFx0XHRcdHZhciBkZXBlbmRlbmNpZXNGb3JDYWxsYmFja3MgPSBbXTtcblx0XHRcdFx0XHRcdGZvciAodmFyIGogPSAwOyBqIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0XHRcdFx0dmFyIGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tqXTtcblx0XHRcdFx0XHRcdFx0dmFyIGFjY2VwdENhbGxiYWNrID1cblx0XHRcdFx0XHRcdFx0XHRtb2R1bGUuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBlbmRlbmN5XTtcblx0XHRcdFx0XHRcdFx0dmFyIGVycm9ySGFuZGxlciA9XG5cdFx0XHRcdFx0XHRcdFx0bW9kdWxlLmhvdC5fYWNjZXB0ZWRFcnJvckhhbmRsZXJzW2RlcGVuZGVuY3ldO1xuXHRcdFx0XHRcdFx0XHRpZiAoYWNjZXB0Q2FsbGJhY2spIHtcblx0XHRcdFx0XHRcdFx0XHRpZiAoY2FsbGJhY2tzLmluZGV4T2YoYWNjZXB0Q2FsbGJhY2spICE9PSAtMSkgY29udGludWU7XG5cdFx0XHRcdFx0XHRcdFx0Y2FsbGJhY2tzLnB1c2goYWNjZXB0Q2FsbGJhY2spO1xuXHRcdFx0XHRcdFx0XHRcdGVycm9ySGFuZGxlcnMucHVzaChlcnJvckhhbmRsZXIpO1xuXHRcdFx0XHRcdFx0XHRcdGRlcGVuZGVuY2llc0ZvckNhbGxiYWNrcy5wdXNoKGRlcGVuZGVuY3kpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRmb3IgKHZhciBrID0gMDsgayA8IGNhbGxiYWNrcy5sZW5ndGg7IGsrKykge1xuXHRcdFx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0XHRcdGNhbGxiYWNrc1trXS5jYWxsKG51bGwsIG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzKTtcblx0XHRcdFx0XHRcdFx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKHR5cGVvZiBlcnJvckhhbmRsZXJzW2tdID09PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGVycm9ySGFuZGxlcnNba10oZXJyLCB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG91dGRhdGVkTW9kdWxlSWQsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZGVwZW5kZW5jeUlkOiBkZXBlbmRlbmNpZXNGb3JDYWxsYmFja3Nba11cblx0XHRcdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdFx0XHR9IGNhdGNoIChlcnIyKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwiYWNjZXB0LWVycm9yLWhhbmRsZXItZXJyb3JlZFwiLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG91dGRhdGVkTW9kdWxlSWQsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRkZXBlbmRlbmN5SWQ6IGRlcGVuZGVuY2llc0ZvckNhbGxiYWNrc1trXSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnIyLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0b3JpZ2luYWxFcnJvcjogZXJyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXBvcnRFcnJvcihlcnIyKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXBvcnRFcnJvcihlcnIpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJhY2NlcHQtZXJyb3JlZFwiLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBvdXRkYXRlZE1vZHVsZUlkLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGRlcGVuZGVuY3lJZDogZGVwZW5kZW5jaWVzRm9yQ2FsbGJhY2tzW2tdLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcblx0XHRcdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRyZXBvcnRFcnJvcihlcnIpO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBMb2FkIHNlbGYgYWNjZXB0ZWQgbW9kdWxlc1xuXHRcdFx0Zm9yICh2YXIgbyA9IDA7IG8gPCBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMubGVuZ3RoOyBvKyspIHtcblx0XHRcdFx0dmFyIGl0ZW0gPSBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXNbb107XG5cdFx0XHRcdHZhciBtb2R1bGVJZCA9IGl0ZW0ubW9kdWxlO1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdGl0ZW0ucmVxdWlyZShtb2R1bGVJZCk7XG5cdFx0XHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0XHRcdGlmICh0eXBlb2YgaXRlbS5lcnJvckhhbmRsZXIgPT09IFwiZnVuY3Rpb25cIikge1xuXHRcdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdFx0aXRlbS5lcnJvckhhbmRsZXIoZXJyLCB7XG5cdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuXHRcdFx0XHRcdFx0XHRcdG1vZHVsZTogX193ZWJwYWNrX3JlcXVpcmVfXy5jW21vZHVsZUlkXVxuXHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdH0gY2F0Y2ggKGVycjEpIHtcblx0XHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG5cdFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuXHRcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvci1oYW5kbGVyLWVycm9yZWRcIixcblx0XHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcblx0XHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnIxLFxuXHRcdFx0XHRcdFx0XHRcdFx0b3JpZ2luYWxFcnJvcjogZXJyXG5cdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcblx0XHRcdFx0XHRcdFx0XHRyZXBvcnRFcnJvcihlcnIxKTtcblx0XHRcdFx0XHRcdFx0XHRyZXBvcnRFcnJvcihlcnIpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuXHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG5cdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvcmVkXCIsXG5cdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuXHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuXHRcdFx0XHRcdFx0XHRyZXBvcnRFcnJvcihlcnIpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gb3V0ZGF0ZWRNb2R1bGVzO1xuXHRcdH1cblx0fTtcbn1cbl9fd2VicGFja19yZXF1aXJlX18uaG1ySS5qc29ucCA9IGZ1bmN0aW9uIChtb2R1bGVJZCwgYXBwbHlIYW5kbGVycykge1xuXHRpZiAoIWN1cnJlbnRVcGRhdGUpIHtcblx0XHRjdXJyZW50VXBkYXRlID0ge307XG5cdFx0Y3VycmVudFVwZGF0ZVJ1bnRpbWUgPSBbXTtcblx0XHRjdXJyZW50VXBkYXRlUmVtb3ZlZENodW5rcyA9IFtdO1xuXHRcdGFwcGx5SGFuZGxlcnMucHVzaChhcHBseUhhbmRsZXIpO1xuXHR9XG5cdGlmICghX193ZWJwYWNrX3JlcXVpcmVfXy5vKGN1cnJlbnRVcGRhdGUsIG1vZHVsZUlkKSkge1xuXHRcdGN1cnJlbnRVcGRhdGVbbW9kdWxlSWRdID0gX193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXTtcblx0fVxufTtcbl9fd2VicGFja19yZXF1aXJlX18uaG1yQy5qc29ucCA9IGZ1bmN0aW9uIChcblx0Y2h1bmtJZHMsXG5cdHJlbW92ZWRDaHVua3MsXG5cdHJlbW92ZWRNb2R1bGVzLFxuXHRwcm9taXNlcyxcblx0YXBwbHlIYW5kbGVycyxcblx0dXBkYXRlZE1vZHVsZXNMaXN0XG4pIHtcblx0YXBwbHlIYW5kbGVycy5wdXNoKGFwcGx5SGFuZGxlcik7XG5cdGN1cnJlbnRVcGRhdGVDaHVua3MgPSB7fTtcblx0Y3VycmVudFVwZGF0ZVJlbW92ZWRDaHVua3MgPSByZW1vdmVkQ2h1bmtzO1xuXHRjdXJyZW50VXBkYXRlID0gcmVtb3ZlZE1vZHVsZXMucmVkdWNlKGZ1bmN0aW9uIChvYmosIGtleSkge1xuXHRcdG9ialtrZXldID0gZmFsc2U7XG5cdFx0cmV0dXJuIG9iajtcblx0fSwge30pO1xuXHRjdXJyZW50VXBkYXRlUnVudGltZSA9IFtdO1xuXHRjaHVua0lkcy5mb3JFYWNoKGZ1bmN0aW9uIChjaHVua0lkKSB7XG5cdFx0aWYgKFxuXHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiZcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSAhPT0gdW5kZWZpbmVkXG5cdFx0KSB7XG5cdFx0XHRwcm9taXNlcy5wdXNoKGxvYWRVcGRhdGVDaHVuayhjaHVua0lkLCB1cGRhdGVkTW9kdWxlc0xpc3QpKTtcblx0XHRcdGN1cnJlbnRVcGRhdGVDaHVua3NbY2h1bmtJZF0gPSB0cnVlO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjdXJyZW50VXBkYXRlQ2h1bmtzW2NodW5rSWRdID0gZmFsc2U7XG5cdFx0fVxuXHR9KTtcblx0aWYgKF9fd2VicGFja19yZXF1aXJlX18uZikge1xuXHRcdF9fd2VicGFja19yZXF1aXJlX18uZi5qc29ucEhtciA9IGZ1bmN0aW9uIChjaHVua0lkLCBwcm9taXNlcykge1xuXHRcdFx0aWYgKFxuXHRcdFx0XHRjdXJyZW50VXBkYXRlQ2h1bmtzICYmXG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubyhjdXJyZW50VXBkYXRlQ2h1bmtzLCBjaHVua0lkKSAmJlxuXHRcdFx0XHQhY3VycmVudFVwZGF0ZUNodW5rc1tjaHVua0lkXVxuXHRcdFx0KSB7XG5cdFx0XHRcdHByb21pc2VzLnB1c2gobG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpKTtcblx0XHRcdFx0Y3VycmVudFVwZGF0ZUNodW5rc1tjaHVua0lkXSA9IHRydWU7XG5cdFx0XHR9XG5cdFx0fTtcblx0fVxufTtcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5obXJNID0gKCkgPT4ge1xuXHRpZiAodHlwZW9mIGZldGNoID09PSBcInVuZGVmaW5lZFwiKSB0aHJvdyBuZXcgRXJyb3IoXCJObyBicm93c2VyIHN1cHBvcnQ6IG5lZWQgZmV0Y2ggQVBJXCIpO1xuXHRyZXR1cm4gZmV0Y2goX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgX193ZWJwYWNrX3JlcXVpcmVfXy5obXJGKCkpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG5cdFx0aWYocmVzcG9uc2Uuc3RhdHVzID09PSA0MDQpIHJldHVybjsgLy8gbm8gdXBkYXRlIGF2YWlsYWJsZVxuXHRcdGlmKCFyZXNwb25zZS5vaykgdGhyb3cgbmV3IEVycm9yKFwiRmFpbGVkIHRvIGZldGNoIHVwZGF0ZSBtYW5pZmVzdCBcIiArIHJlc3BvbnNlLnN0YXR1c1RleHQpO1xuXHRcdHJldHVybiByZXNwb25zZS5qc29uKCk7XG5cdH0pO1xufTtcblxuLy8gbm8gb24gY2h1bmtzIGxvYWRlZFxuXG4vLyBubyBqc29ucCBmdW5jdGlvbiIsIiIsIi8vIG1vZHVsZSBjYWNoZSBhcmUgdXNlZCBzbyBlbnRyeSBpbmxpbmluZyBpcyBkaXNhYmxlZFxuLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9ub2RlX21vZHVsZXMvd2VicGFjay1kZXYtc2VydmVyL2NsaWVudC9pbmRleC5qcz9wcm90b2NvbD13cyUzQSZob3N0bmFtZT0wLjAuMC4wJnBvcnQ9ODA4MCZwYXRobmFtZT0lMkZ3cyZsb2dnaW5nPWluZm8mb3ZlcmxheT10cnVlJnJlY29ubmVjdD0xMCZob3Q9dHJ1ZSZsaXZlLXJlbG9hZD10cnVlXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vbm9kZV9tb2R1bGVzL3dlYnBhY2svaG90L2Rldi1zZXJ2ZXIuanNcIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9hcHAvaW5kZXguanNcIik7XG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3N0eWxlcy9pbmRleC5zY3NzXCIpO1xuIiwiIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJhbnNpSFRNTCIsIl9yZWdBTlNJIiwiX2RlZkNvbG9ycyIsInJlc2V0IiwiYmxhY2siLCJyZWQiLCJncmVlbiIsInllbGxvdyIsImJsdWUiLCJtYWdlbnRhIiwiY3lhbiIsImxpZ2h0Z3JleSIsImRhcmtncmV5IiwiX3N0eWxlcyIsIl9vcGVuVGFncyIsIl9jbG9zZVRhZ3MiLCJmb3JFYWNoIiwibiIsInRleHQiLCJ0ZXN0IiwiYW5zaUNvZGVzIiwicmV0IiwicmVwbGFjZSIsIm1hdGNoIiwic2VxIiwib3QiLCJpbmRleE9mIiwicG9wIiwicHVzaCIsImN0IiwibCIsImxlbmd0aCIsIkFycmF5Iiwiam9pbiIsInNldENvbG9ycyIsImNvbG9ycyIsIkVycm9yIiwiX2ZpbmFsQ29sb3JzIiwia2V5IiwiaGV4IiwiaGFzT3duUHJvcGVydHkiLCJpc0FycmF5Iiwic29tZSIsImgiLCJkZWZIZXhDb2xvciIsInNsaWNlIiwiX3NldFRhZ3MiLCJ0YWdzIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJnZXQiLCJvcGVuIiwiY2xvc2UiLCJjb2RlIiwiY29sb3IiLCJvcmlDb2xvciIsInBhcnNlSW50IiwidG9TdHJpbmciLCJSIiwiUmVmbGVjdCIsIlJlZmxlY3RBcHBseSIsImFwcGx5IiwidGFyZ2V0IiwicmVjZWl2ZXIiLCJhcmdzIiwiRnVuY3Rpb24iLCJwcm90b3R5cGUiLCJjYWxsIiwiUmVmbGVjdE93bktleXMiLCJvd25LZXlzIiwiZ2V0T3duUHJvcGVydHlTeW1ib2xzIiwiZ2V0T3duUHJvcGVydHlOYW1lcyIsImNvbmNhdCIsIlByb2Nlc3NFbWl0V2FybmluZyIsIndhcm5pbmciLCJjb25zb2xlIiwid2FybiIsIk51bWJlcklzTmFOIiwiTnVtYmVyIiwiaXNOYU4iLCJ2YWx1ZSIsIkV2ZW50RW1pdHRlciIsImluaXQiLCJvbmNlIiwiX2V2ZW50cyIsInVuZGVmaW5lZCIsIl9ldmVudHNDb3VudCIsIl9tYXhMaXN0ZW5lcnMiLCJkZWZhdWx0TWF4TGlzdGVuZXJzIiwiY2hlY2tMaXN0ZW5lciIsImxpc3RlbmVyIiwiVHlwZUVycm9yIiwiZW51bWVyYWJsZSIsInNldCIsImFyZyIsIlJhbmdlRXJyb3IiLCJnZXRQcm90b3R5cGVPZiIsImNyZWF0ZSIsInNldE1heExpc3RlbmVycyIsIl9nZXRNYXhMaXN0ZW5lcnMiLCJ0aGF0IiwiZ2V0TWF4TGlzdGVuZXJzIiwiZW1pdCIsInR5cGUiLCJpIiwiYXJndW1lbnRzIiwiZG9FcnJvciIsImV2ZW50cyIsImVycm9yIiwiZXIiLCJlcnIiLCJtZXNzYWdlIiwiY29udGV4dCIsImhhbmRsZXIiLCJsZW4iLCJsaXN0ZW5lcnMiLCJhcnJheUNsb25lIiwiX2FkZExpc3RlbmVyIiwicHJlcGVuZCIsIm0iLCJleGlzdGluZyIsIm5ld0xpc3RlbmVyIiwidW5zaGlmdCIsIndhcm5lZCIsInciLCJTdHJpbmciLCJuYW1lIiwiZW1pdHRlciIsImNvdW50IiwiYWRkTGlzdGVuZXIiLCJvbiIsInByZXBlbmRMaXN0ZW5lciIsIm9uY2VXcmFwcGVyIiwiZmlyZWQiLCJyZW1vdmVMaXN0ZW5lciIsIndyYXBGbiIsIl9vbmNlV3JhcCIsInN0YXRlIiwid3JhcHBlZCIsImJpbmQiLCJwcmVwZW5kT25jZUxpc3RlbmVyIiwibGlzdCIsInBvc2l0aW9uIiwib3JpZ2luYWxMaXN0ZW5lciIsInNoaWZ0Iiwic3BsaWNlT25lIiwib2ZmIiwicmVtb3ZlQWxsTGlzdGVuZXJzIiwia2V5cyIsIl9saXN0ZW5lcnMiLCJ1bndyYXAiLCJldmxpc3RlbmVyIiwidW53cmFwTGlzdGVuZXJzIiwicmF3TGlzdGVuZXJzIiwibGlzdGVuZXJDb3VudCIsImV2ZW50TmFtZXMiLCJhcnIiLCJjb3B5IiwiaW5kZXgiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImVycm9yTGlzdGVuZXIiLCJyZXNvbHZlciIsImV2ZW50VGFyZ2V0QWdub3N0aWNBZGRMaXN0ZW5lciIsImFkZEVycm9ySGFuZGxlcklmRXZlbnRFbWl0dGVyIiwiZmxhZ3MiLCJhZGRFdmVudExpc3RlbmVyIiwid3JhcExpc3RlbmVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIm5hbWVkX3JlZmVyZW5jZXNfMSIsInJlcXVpcmUiLCJudW1lcmljX3VuaWNvZGVfbWFwXzEiLCJzdXJyb2dhdGVfcGFpcnNfMSIsImFsbE5hbWVkUmVmZXJlbmNlcyIsIl9fYXNzaWduIiwibmFtZWRSZWZlcmVuY2VzIiwiYWxsIiwiaHRtbDUiLCJyZXBsYWNlVXNpbmdSZWdFeHAiLCJtYWNyb1RleHQiLCJtYWNyb1JlZ0V4cCIsIm1hY3JvUmVwbGFjZXIiLCJsYXN0SW5kZXgiLCJyZXBsYWNlTWF0Y2giLCJleGVjIiwicmVwbGFjZVJlc3VsdCIsInJlcGxhY2VMYXN0SW5kZXgiLCJzdWJzdHJpbmciLCJyZXBsYWNlSW5wdXQiLCJlbmNvZGVSZWdFeHBzIiwic3BlY2lhbENoYXJzIiwibm9uQXNjaWkiLCJub25Bc2NpaVByaW50YWJsZSIsIm5vbkFzY2lpUHJpbnRhYmxlT25seSIsImV4dGVuc2l2ZSIsImRlZmF1bHRFbmNvZGVPcHRpb25zIiwibW9kZSIsImxldmVsIiwibnVtZXJpYyIsImVuY29kZSIsIl9hIiwiX2IiLCJfYyIsIl9kIiwiX2UiLCJlbmNvZGVSZWdFeHAiLCJyZWZlcmVuY2VzIiwiY2hhcmFjdGVycyIsImlzSGV4IiwiaW5wdXQiLCJyZXN1bHQiLCJnZXRDb2RlUG9pbnQiLCJjaGFyQ29kZUF0IiwiZGVmYXVsdERlY29kZU9wdGlvbnMiLCJzY29wZSIsInN0cmljdCIsImF0dHJpYnV0ZSIsImJhc2VEZWNvZGVSZWdFeHBzIiwieG1sIiwiYm9keSIsImJvZHlSZWdFeHBzIiwiaHRtbDQiLCJkZWNvZGVSZWdFeHBzIiwiZnJvbUNoYXJDb2RlIiwib3V0T2ZCb3VuZHNDaGFyIiwiZGVmYXVsdERlY29kZUVudGl0eU9wdGlvbnMiLCJnZXREZWNvZGVkRW50aXR5IiwiZW50aXR5IiwiaXNBdHRyaWJ1dGUiLCJpc1N0cmljdCIsImRlY29kZVJlc3VsdCIsImRlY29kZUVudGl0eUxhc3RDaGFyIiwiZGVjb2RlUmVzdWx0QnlSZWZlcmVuY2UiLCJkZWNvZGVTZWNvbmRDaGFyIiwiZGVjb2RlQ29kZSIsInN1YnN0ciIsImZyb21Db2RlUG9pbnQiLCJudW1lcmljVW5pY29kZU1hcCIsImRlY29kZUVudGl0eSIsImVudGl0aWVzIiwiZGVjb2RlIiwiZGVjb2RlUmVnRXhwIiwiXyIsIiQiLCJmaiIsImFzdHJhbENvZGVQb2ludCIsIk1hdGgiLCJmbG9vciIsImNvZGVQb2ludEF0IiwiaGlnaFN1cnJvZ2F0ZUZyb20iLCJoaWdoU3Vycm9nYXRlVG8iLCJub3JtYWxpemVVcmwiLCJzcmNCeU1vZHVsZUlkIiwibm9Eb2N1bWVudCIsImRvY3VtZW50IiwiZGVib3VuY2UiLCJmbiIsInRpbWUiLCJ0aW1lb3V0Iiwic2VsZiIsImZ1bmN0aW9uQ2FsbCIsImNsZWFyVGltZW91dCIsInNldFRpbWVvdXQiLCJub29wIiwiZ2V0Q3VycmVudFNjcmlwdFVybCIsIm1vZHVsZUlkIiwic3JjIiwiY3VycmVudFNjcmlwdCIsInNjcmlwdHMiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImxhc3RTY3JpcHRUYWciLCJmaWxlTWFwIiwic3BsaXRSZXN1bHQiLCJzcGxpdCIsImZpbGVuYW1lIiwibWFwIiwibWFwUnVsZSIsInJlZyIsIlJlZ0V4cCIsInVwZGF0ZUNzcyIsImVsIiwidXJsIiwiaHJlZiIsImlzVXJsUmVxdWVzdCIsImlzTG9hZGVkIiwidmlzaXRlZCIsIm5ld0VsIiwiY2xvbmVOb2RlIiwicGFyZW50Tm9kZSIsInJlbW92ZUNoaWxkIiwiRGF0ZSIsIm5vdyIsIm5leHRTaWJsaW5nIiwiaW5zZXJ0QmVmb3JlIiwiYXBwZW5kQ2hpbGQiLCJnZXRSZWxvYWRVcmwiLCJyZWxvYWRTdHlsZSIsImVsZW1lbnRzIiwicXVlcnlTZWxlY3RvckFsbCIsImxvYWRlZCIsInJlbG9hZEFsbCIsIm9wdGlvbnMiLCJsb2ciLCJnZXRTY3JpcHRTcmMiLCJ1cGRhdGUiLCJyZWxvYWRlZCIsImxvY2FscyIsInBhdGhDb21wb25lbnRzIiwicmVkdWNlIiwiYWNjdW11bGF0b3IiLCJpdGVtIiwidXJsU3RyaW5nIiwidHJpbSIsInByb3RvY29sIiwiY29tcG9uZW50cyIsImhvc3QiLCJ0b0xvd2VyQ2FzZSIsInBhdGgiLCJfY2xhc3NDYWxsQ2hlY2siLCJhIiwiX2RlZmluZVByb3BlcnRpZXMiLCJlIiwiciIsInQiLCJvIiwiY29uZmlndXJhYmxlIiwid3JpdGFibGUiLCJfdG9Qcm9wZXJ0eUtleSIsIl9jcmVhdGVDbGFzcyIsIl90b1ByaW1pdGl2ZSIsIlN5bWJvbCIsInRvUHJpbWl0aXZlIiwiV2ViU29ja2V0Q2xpZW50IiwiY2xpZW50IiwiV2ViU29ja2V0Iiwib25lcnJvciIsIm9uT3BlbiIsImYiLCJvbm9wZW4iLCJvbkNsb3NlIiwib25jbG9zZSIsIm9uTWVzc2FnZSIsIm9ubWVzc2FnZSIsImRhdGEiLCJkZWZhdWx0IiwiZmlsdGVyIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiX29iamVjdFNwcmVhZCIsIl9kZWZpbmVQcm9wZXJ0eSIsImdldE93blByb3BlcnR5RGVzY3JpcHRvcnMiLCJkZWZpbmVQcm9wZXJ0aWVzIiwid2VicGFja0hvdExvZyIsInN0cmlwQW5zaSIsInBhcnNlVVJMIiwic29ja2V0IiwiZm9ybWF0UHJvYmxlbSIsImNyZWF0ZU92ZXJsYXkiLCJsb2dFbmFibGVkRmVhdHVyZXMiLCJzZXRMb2dMZXZlbCIsInNlbmRNZXNzYWdlIiwicmVsb2FkQXBwIiwiY3JlYXRlU29ja2V0VVJMIiwiaXNQcm9ncmVzc1N1cHBvcnRlZCIsImRlZmluZVByb2dyZXNzRWxlbWVudCIsImRlY29kZU92ZXJsYXlPcHRpb25zIiwib3ZlcmxheU9wdGlvbnMiLCJwcm9wZXJ0eSIsIm92ZXJsYXlGaWx0ZXJGdW5jdGlvblN0cmluZyIsImRlY29kZVVSSUNvbXBvbmVudCIsIm92ZXJsYXlGaWx0ZXJGdW5jdGlvbiIsInN0YXR1cyIsImlzVW5sb2FkaW5nIiwiY3VycmVudEhhc2giLCJfX3dlYnBhY2tfaGFzaF9fIiwiaG90IiwibGl2ZVJlbG9hZCIsInByb2dyZXNzIiwib3ZlcmxheSIsInBhcnNlZFJlc291cmNlUXVlcnkiLCJfX3Jlc291cmNlUXVlcnkiLCJlbmFibGVkRmVhdHVyZXMiLCJQcm9ncmVzcyIsIk92ZXJsYXkiLCJKU09OIiwicGFyc2UiLCJlcnJvcnMiLCJ3YXJuaW5ncyIsInJ1bnRpbWVFcnJvcnMiLCJsb2dnaW5nIiwicmVjb25uZWN0Iiwic2V0QWxsTG9nTGV2ZWwiLCJ3aW5kb3ciLCJ0cnVzdGVkVHlwZXNQb2xpY3lOYW1lIiwiY2F0Y2hSdW50aW1lRXJyb3IiLCJzZW5kIiwib25Tb2NrZXRNZXNzYWdlIiwiaW52YWxpZCIsImluZm8iLCJoYXNoIiwiX2hhc2giLCJwcmV2aW91c0hhc2giLCJwcm9ncmVzc1VwZGF0ZSIsInBsdWdpbk5hbWUiLCJwZXJjZW50IiwibXNnIiwicXVlcnlTZWxlY3RvciIsImNyZWF0ZUVsZW1lbnQiLCJzZXRBdHRyaWJ1dGUiLCJzdGlsbE9rIiwib2siLCJzdGF0aWNDaGFuZ2VkIiwiZmlsZSIsImxvY2F0aW9uIiwicmVsb2FkIiwiX3dhcm5pbmdzIiwicGFyYW1zIiwicHJpbnRhYmxlV2FybmluZ3MiLCJfZm9ybWF0UHJvYmxlbSIsImhlYWRlciIsIm92ZXJsYXlXYXJuaW5nc1NldHRpbmciLCJ3YXJuaW5nc1RvRGlzcGxheSIsIm1lc3NhZ2VzIiwicHJldmVudFJlbG9hZGluZyIsIl9lcnJvcnMiLCJwcmludGFibGVFcnJvcnMiLCJfZm9ybWF0UHJvYmxlbTIiLCJvdmVybGF5RXJyb3JzU2V0dGluZ3MiLCJlcnJvcnNUb0Rpc3BsYXkiLCJfZXJyb3IiLCJzb2NrZXRVUkwiLCJfX3dlYnBhY2tfbW9kdWxlc19fIiwiLi9jbGllbnQtc3JjL21vZHVsZXMvbG9nZ2VyL3RhcGFibGUuanMiLCJfX3VudXNlZF93ZWJwYWNrX21vZHVsZSIsIl9fd2VicGFja19leHBvcnRzX18iLCJfX3dlYnBhY2tfcmVxdWlyZV9fIiwiZCIsIlN5bmNCYWlsSG9vayIsIi4vbm9kZV9tb2R1bGVzL3dlYnBhY2svbGliL2xvZ2dpbmcvTG9nZ2VyLmpzIiwiX3RvQ29uc3VtYWJsZUFycmF5IiwiX2FycmF5V2l0aG91dEhvbGVzIiwiX2l0ZXJhYmxlVG9BcnJheSIsIl91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheSIsIl9ub25JdGVyYWJsZVNwcmVhZCIsIl9hcnJheUxpa2VUb0FycmF5IiwiY29uc3RydWN0b3IiLCJmcm9tIiwiaXRlcmF0b3IiLCJMb2dUeXBlIiwiZnJlZXplIiwiZGVidWciLCJ0cmFjZSIsImdyb3VwIiwiZ3JvdXBDb2xsYXBzZWQiLCJncm91cEVuZCIsInByb2ZpbGUiLCJwcm9maWxlRW5kIiwiY2xlYXIiLCJMT0dfU1lNQk9MIiwiVElNRVJTX1NZTUJPTCIsIlRJTUVSU19BR0dSRUdBVEVTX1NZTUJPTCIsIldlYnBhY2tMb2dnZXIiLCJnZXRDaGlsZExvZ2dlciIsIl9sZW4iLCJfa2V5IiwiX2xlbjIiLCJfa2V5MiIsIl9sZW4zIiwiX2tleTMiLCJfbGVuNCIsIl9rZXk0IiwiX2xlbjUiLCJfa2V5NSIsImFzc2VydCIsImFzc2VydGlvbiIsIl9sZW42IiwiX2tleTYiLCJfbGVuNyIsIl9rZXk3IiwiX2xlbjgiLCJfa2V5OCIsIl9sZW45IiwiX2tleTkiLCJsYWJlbCIsIk1hcCIsInByb2Nlc3MiLCJocnRpbWUiLCJ0aW1lTG9nIiwicHJldiIsInRpbWVFbmQiLCJkZWxldGUiLCJ0aW1lQWdncmVnYXRlIiwiY3VycmVudCIsInRpbWVBZ2dyZWdhdGVFbmQiLCJMb2dnZXIiLCIuL25vZGVfbW9kdWxlcy93ZWJwYWNrL2xpYi9sb2dnaW5nL2NyZWF0ZUNvbnNvbGVMb2dnZXIuanMiLCJfX3VudXNlZF93ZWJwYWNrX2V4cG9ydHMiLCJfc2xpY2VkVG9BcnJheSIsIl9hcnJheVdpdGhIb2xlcyIsIl9pdGVyYWJsZVRvQXJyYXlMaW1pdCIsIl9ub25JdGVyYWJsZVJlc3QiLCJ1IiwibmV4dCIsImRvbmUiLCJyZXR1cm4iLCJfcmVxdWlyZSIsImZpbHRlclRvRnVuY3Rpb24iLCJyZWdFeHAiLCJpZGVudCIsIkxvZ0xldmVsIiwibm9uZSIsImZhbHNlIiwidHJ1ZSIsInZlcmJvc2UiLCJfcmVmIiwiX3JlZiRsZXZlbCIsIl9yZWYkZGVidWciLCJkZWJ1Z0ZpbHRlcnMiLCJsb2dsZXZlbCIsImxvZ2dlciIsImxhYmVsZWRBcmdzIiwiX2FyZ3MiLCJzdGFydCIsImVuZCIsIm1zIiwibG9nVGltZSIsIi4vbm9kZV9tb2R1bGVzL3dlYnBhY2svbGliL2xvZ2dpbmcvcnVudGltZS5qcyIsIl9leHRlbmRzIiwiYXNzaWduIiwiX3JlcXVpcmUyIiwiY3JlYXRlQ29uc29sZUxvZ2dlciIsImN1cnJlbnREZWZhdWx0TG9nZ2VyT3B0aW9ucyIsImN1cnJlbnREZWZhdWx0TG9nZ2VyIiwiZ2V0TG9nZ2VyIiwiaG9va3MiLCJjaGlsZE5hbWUiLCJjb25maWd1cmVEZWZhdWx0TG9nZ2VyIiwiX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fIiwiY2FjaGVkTW9kdWxlIiwiZGVmaW5pdGlvbiIsIm9iaiIsInByb3AiLCJ0b1N0cmluZ1RhZyIsIndlYnBhY2tfbGliX2xvZ2dpbmdfcnVudGltZV9qc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fIiwiX193ZWJwYWNrX2V4cG9ydF90YXJnZXRfXyIsIl9fZXNNb2R1bGUiLCJsaXN0ZW5Ub1J1bnRpbWVFcnJvciIsImxpc3RlblRvVW5oYW5kbGVkUmVqZWN0aW9uIiwicGFyc2VFcnJvclRvU3RhY2tzIiwiY3JlYXRlT3ZlcmxheU1hY2hpbmUiLCJjb250YWluZXJTdHlsZSIsImRpc21pc3NCdXR0b25TdHlsZSIsImhlYWRlclN0eWxlIiwiaWZyYW1lU3R5bGUiLCJtc2dTdHlsZXMiLCJtc2dUZXh0U3R5bGUiLCJtc2dUeXBlU3R5bGUiLCJtb2R1bGVOYW1lIiwibG9jIiwic3RhY2siLCJpZnJhbWVDb250YWluZXJFbGVtZW50IiwiY29udGFpbmVyRWxlbWVudCIsImhlYWRlckVsZW1lbnQiLCJvbkxvYWRRdWV1ZSIsIm92ZXJsYXlUcnVzdGVkVHlwZXNQb2xpY3kiLCJhcHBseVN0eWxlIiwiZWxlbWVudCIsInN0eWxlIiwiY3JlYXRlQ29udGFpbmVyIiwidHJ1c3RlZFR5cGVzIiwiY3JlYXRlUG9saWN5IiwiY3JlYXRlSFRNTCIsImlkIiwib25sb2FkIiwiY29udGVudEVsZW1lbnQiLCJjb250ZW50RG9jdW1lbnQiLCJpbm5lclRleHQiLCJjbG9zZUJ1dHRvbkVsZW1lbnQiLCJhcmlhTGFiZWwiLCJvdmVybGF5U2VydmljZSIsIm9uTG9hZCIsImVuc3VyZU92ZXJsYXlFeGlzdHMiLCJjYWxsYmFjayIsImlubmVySFRNTCIsImhpZGUiLCJzaG93IiwibWVzc2FnZVNvdXJjZSIsImVudHJ5RWxlbWVudCIsIm1zZ1N0eWxlIiwicGFkZGluZyIsInR5cGVFbGVtZW50IiwibW9kdWxlSWRlbnRpZmllciIsImN1cnNvciIsImZldGNoIiwibWVzc2FnZVRleHROb2RlIiwic2hvd092ZXJsYXkiLCJoaWRlT3ZlcmxheSIsImhhbmRsZUVycm9yIiwiZmFsbGJhY2tNZXNzYWdlIiwiZXJyb3JPYmplY3QiLCJzaG91bGREaXNwbGF5IiwiZXJyb3JFdmVudCIsInByb21pc2VSZWplY3Rpb25FdmVudCIsInJlYXNvbiIsImNyZWF0ZU1hY2hpbmUiLCJfcmVmMiIsInN0YXRlcyIsImluaXRpYWwiLCJhY3Rpb25zIiwiY3VycmVudFN0YXRlIiwiY3VycmVudENvbnRleHQiLCJldmVudCIsImN1cnJlbnRTdGF0ZU9uIiwidHJhbnNpdGlvbkNvbmZpZyIsImFjdE5hbWUiLCJhY3Rpb25JbXBsIiwibmV4dENvbnRleHRWYWx1ZSIsImNsZWFudXAiLCJvdmVybGF5TWFjaGluZSIsImhpZGRlbiIsIkJVSUxEX0VSUk9SIiwiUlVOVElNRV9FUlJPUiIsImRpc3BsYXlCdWlsZEVycm9yIiwiRElTTUlTUyIsImRpc3BsYXlSdW50aW1lRXJyb3IiLCJkaXNtaXNzTWVzc2FnZXMiLCJhcHBlbmRNZXNzYWdlcyIsInNldE1lc3NhZ2VzIiwiYmFja2dyb3VuZENvbG9yIiwidG9wIiwibGVmdCIsInJpZ2h0IiwiYm90dG9tIiwid2lkdGgiLCJoZWlnaHQiLCJib3JkZXIiLCJib3hTaXppbmciLCJmb250U2l6ZSIsImxpbmVIZWlnaHQiLCJ3aGl0ZVNwYWNlIiwib3ZlcmZsb3ciLCJmb250RmFtaWx5IiwibWFyZ2luIiwiZmxleCIsIm1heEhlaWdodCIsIm1hcmdpbkJvdHRvbSIsIl9jYWxsU3VwZXIiLCJfZ2V0UHJvdG90eXBlT2YiLCJfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybiIsIl9pc05hdGl2ZVJlZmxlY3RDb25zdHJ1Y3QiLCJjb25zdHJ1Y3QiLCJfYXNzZXJ0VGhpc0luaXRpYWxpemVkIiwiUmVmZXJlbmNlRXJyb3IiLCJfaW5oZXJpdHMiLCJfc2V0UHJvdG90eXBlT2YiLCJfd3JhcE5hdGl2ZVN1cGVyIiwiX2lzTmF0aXZlRnVuY3Rpb24iLCJoYXMiLCJXcmFwcGVyIiwiX2NvbnN0cnVjdCIsInAiLCJCb29sZWFuIiwidmFsdWVPZiIsInNldFByb3RvdHlwZU9mIiwiX19wcm90b19fIiwiX2NsYXNzUHJpdmF0ZU1ldGhvZEluaXRTcGVjIiwiX2NoZWNrUHJpdmF0ZVJlZGVjbGFyYXRpb24iLCJhZGQiLCJfYXNzZXJ0Q2xhc3NCcmFuZCIsIkhUTUxFbGVtZW50IiwiYXR0YWNoU2hhZG93IiwiX1dlYnBhY2tEZXZTZXJ2ZXJQcm9ncmVzcyIsImN1c3RvbUVsZW1lbnRzIiwiX1dlYnBhY2tEZXZTZXJ2ZXJQcm9ncmVzc19icmFuZCIsIldlYWtTZXQiLCJXZWJwYWNrRGV2U2VydmVyUHJvZ3Jlc3MiLCJfSFRNTEVsZW1lbnQiLCJfdGhpcyIsIm1heERhc2hPZmZzZXQiLCJhbmltYXRpb25UaW1lciIsImNvbm5lY3RlZENhbGxiYWNrIiwiX3Jlc2V0IiwiYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrIiwib2xkVmFsdWUiLCJuZXdWYWx1ZSIsIl91cGRhdGUiLCJfdGhpcyRnZXRBdHRyaWJ1dGUiLCJfTnVtYmVyIiwidHlwZUF0dHIiLCJnZXRBdHRyaWJ1dGUiLCJfY2lyY3VsYXJUZW1wbGF0ZSIsIl9saW5lYXJUZW1wbGF0ZSIsInNoYWRvd1Jvb3QiLCJpbml0aWFsUHJvZ3Jlc3MiLCJvZmZzZXQiLCJzdHJva2VEYXNob2Zmc2V0IiwidGV4dENvbnRlbnQiLCJfaGlkZSIsIl9zaG93IiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwiX3RoaXMyIiwiZGVmaW5lIiwiQ2xpZW50IiwiX193ZWJwYWNrX2Rldl9zZXJ2ZXJfY2xpZW50X18iLCJyZXRyaWVzIiwibWF4UmV0cmllcyIsImluaXRTb2NrZXQiLCJoYW5kbGVycyIsInJldHJ5SW5NcyIsInBvdyIsInJhbmRvbSIsImZvcm1hdCIsIm9ialVSTCIsImF1dGgiLCJlbmNvZGVVUklDb21wb25lbnQiLCJob3N0bmFtZSIsInBvcnQiLCJwYXRobmFtZSIsInNsYXNoZXMiLCJjaGFyQXQiLCJzZWFyY2giLCJwYXJzZWRVUkwiLCJpc0luQWRkckFueSIsInNvY2tldFVSTFByb3RvY29sIiwic29ja2V0VVJMQXV0aCIsInVzZXJuYW1lIiwicGFzc3dvcmQiLCJzb2NrZXRVUkxIb3N0bmFtZSIsInNvY2tldFVSTFBvcnQiLCJzb2NrZXRVUkxQYXRobmFtZSIsImZyb21DdXJyZW50U2NyaXB0IiwiZ2V0Q3VycmVudFNjcmlwdFNvdXJjZSIsInNjcmlwdEVsZW1lbnRzIiwic2NyaXB0RWxlbWVudHNXaXRoU3JjIiwiZGVmYXVsdExldmVsIiwiZmVhdHVyZXMiLCJsb2dTdHJpbmciLCJyZXNvdXJjZVF1ZXJ5Iiwic2VhcmNoUGFyYW1zIiwicGFpciIsInNjcmlwdFNvdXJjZSIsInNjcmlwdFNvdXJjZVVSTCIsIlVSTCIsImhvdEVtaXR0ZXIiLCJpc0luaXRpYWwiLCJhcHBseVJlbG9hZCIsInJvb3RXaW5kb3ciLCJpbnRlcnZhbElkIiwiY2xlYXJJbnRlcnZhbCIsImFsbG93VG9Ib3QiLCJhbGxvd1RvTGl2ZVJlbG9hZCIsInBvc3RNZXNzYWdlIiwic2V0SW50ZXJ2YWwiLCJwYXJlbnQiLCJzZW5kTXNnIiwiV29ya2VyR2xvYmFsU2NvcGUiLCJhbnNpUmVnZXgiLCJzdHJpbmciLCJsYXN0SGFzaCIsInVwVG9EYXRlIiwiY2hlY2siLCJ0aGVuIiwidXBkYXRlZE1vZHVsZXMiLCJjYXRjaCIsImZvcm1hdEVycm9yIiwicmVuZXdlZE1vZHVsZXMiLCJ1bmFjY2VwdGVkTW9kdWxlcyIsInBhcnRzIiwibnVtYmVySWRzIiwiZXZlcnkiLCJsb2dMZXZlbCIsImR1bW15Iiwic2hvdWxkTG9nIiwibG9nR3JvdXAiLCJsb2dGbiJdLCJzb3VyY2VSb290IjoiIn0=