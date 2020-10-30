/**
 * Magna v2.3.1 (https://github.com/coredna/magna)
 * Copywrite 2020 Andrew Fountain
 * Released under the MIT license 
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  return function () {
    var Super = _getPrototypeOf(Derived),
        result;

    if (_isNativeReflectConstruct()) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = _getPrototypeOf(object);
    if (object === null) break;
  }

  return object;
}

function _get(target, property, receiver) {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    _get = Reflect.get;
  } else {
    _get = function _get(target, property, receiver) {
      var base = _superPropBase(target, property);

      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);

      if (desc.get) {
        return desc.get.call(receiver);
      }

      return desc.value;
    };
  }

  return _get(target, property, receiver || target);
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(n);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _createForOfIteratorHelper(o) {
  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) {
      var i = 0;

      var F = function () {};

      return {
        s: F,
        n: function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var it,
      normalCompletion = true,
      didErr = false,
      err;
  return {
    s() {
      it = o[Symbol.iterator]();
    },

    n() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },

    e(e) {
      didErr = true;
      err = e;
    },

    f() {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }

  };
}

function _classPrivateFieldGet(receiver, privateMap) {
  var descriptor = privateMap.get(receiver);

  if (!descriptor) {
    throw new TypeError("attempted to get private field on non-instance");
  }

  if (descriptor.get) {
    return descriptor.get.call(receiver);
  }

  return descriptor.value;
}

function _classPrivateFieldSet(receiver, privateMap, value) {
  var descriptor = privateMap.get(receiver);

  if (!descriptor) {
    throw new TypeError("attempted to set private field on non-instance");
  }

  if (descriptor.set) {
    descriptor.set.call(receiver, value);
  } else {
    if (!descriptor.writable) {
      throw new TypeError("attempted to set read only private field");
    }

    descriptor.value = value;
  }

  return value;
}

function _classPrivateMethodGet(receiver, privateSet, fn) {
  if (!privateSet.has(receiver)) {
    throw new TypeError("attempted to get private field on non-instance");
  }

  return fn;
}

var INITIALIZED = Symbol('INITIALIZED');
var INIT_PROMISE = Symbol('INIT_PROMISE');
var INIT_DONE = Symbol('INIT_DONE');
var POPSTATE_PROMISE = Symbol('POPSTATE_PROMISE');
var POPSTATE_DONE = Symbol('POPSTATE_DONE');

var log = (function (message, color) {
  var _console;

  console.groupCollapsed("%c ".concat(message, " "), "border-left:6px solid ".concat(color, ";color:").concat(color));

  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  (_console = console).log.apply(_console, args);

  console.groupEnd();
});

var isObject = function isObject(possibleObject) {
  return Object.prototype.toString.call(possibleObject) === '[object Object]';
};

function mergeDeepRight(left, right) {
  var ret = {};

  for (var key in right) {
    if (Object.hasOwnProperty.call(right, key) === false) {
      continue;
    }

    if (isObject(right[key])) {
      ret[key] = mergeDeepRight(left[key], right[key]);
    } else {
      ret[key] = right[key];
    }
  }

  for (var _key in left) {
    if (Object.hasOwnProperty.call(left, _key) && typeof ret[_key] === 'undefined') {
      ret[_key] = left[_key];
    }
  }

  return ret;
}

function pad(count, string) {
  var _char = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ' ';

  return string + _char.repeat(count - string.length > 0 ? count - string.length : 0);
}

function getRootNode(node) {
  return node.parent ? getRootNode(node.parent) : node;
}

var _Symbol$toStringTag;
var PARENTS = new Map();
var ROOT = new Map();

var makeId = function (id) {
  return function () {
    return (id++).toString(16);
  };
}(16000);

var PropagateError = /*#__PURE__*/function (_Error) {
  _inherits(PropagateError, _Error);

  var _super = _createSuper(PropagateError);

  function PropagateError() {
    _classCallCheck(this, PropagateError);

    return _super.apply(this, arguments);
  }

  return PropagateError;
}( /*#__PURE__*/_wrapNativeSuper(Error));

var BubbleError = /*#__PURE__*/function (_Error2) {
  _inherits(BubbleError, _Error2);

  var _super2 = _createSuper(BubbleError);

  function BubbleError() {
    _classCallCheck(this, BubbleError);

    return _super2.apply(this, arguments);
  }

  return BubbleError;
}( /*#__PURE__*/_wrapNativeSuper(Error));

_Symbol$toStringTag = Symbol.toStringTag;

var Node = /*#__PURE__*/function () {
  function Node() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var nodes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    _classCallCheck(this, Node);

    _defineProperty(this, _Symbol$toStringTag, 'Node');

    if (this.constructor.defaultConfig) {
      this.config = mergeDeepRight(this.constructor.defaultConfig, config);
    } else if (this.constructor.config) {
      this.config = mergeDeepRight(this.constructor.config, config);
    } else {
      this.config = config;
    }

    this.nodes = nodes;
    this.id = makeId();
    this[INITIALIZED] = false;
    this[INIT_PROMISE] = Promise.resolve(null);
    this[INIT_DONE] = false;
    this[POPSTATE_PROMISE] = Promise.resolve(null);
    this[POPSTATE_DONE] = false;
    this.initChildren();
  }

  _createClass(Node, [{
    key: "initChildren",
    value: function initChildren() {
      var _this = this;

      this.nodes.forEach(function (node) {
        node.parent = _this;
      });
    }
  }, {
    key: "init",
    value: function init(_ref) {
      var request = _ref.request,
          response = _ref.response;
      return this.id;
    }
  }, {
    key: "destroy",
    value: function destroy(_ref2) {
      var request = _ref2.request;
    }
  }, {
    key: "popstate",
    value: function popstate(_ref3) {
      var request = _ref3.request,
          response = _ref3.response;
      this.info('popstate');
    }
  }, {
    key: "shouldInitialize",
    value: function shouldInitialize(_ref4) {
      var request = _ref4.request;
      return !this.parent || this.parent[INITIALIZED];
    }
  }, {
    key: "initPromise",
    value: function initPromise(_ref5) {
      var request = _ref5.request;
      return Promise.resolve("http: ".concat(this.id));
    }
  }, {
    key: "getInitPromise",
    value: function getInitPromise(_ref6) {
      var request = _ref6.request;
      this[INITIALIZED] = false;

      if (this.shouldInitialize({
        request: request
      })) {
        this.info("init");
        this[INITIALIZED] = true;
        return this.initPromise({
          request: request
        });
      }
    }
  }, {
    key: "popstatePromise",
    value: function popstatePromise(_ref7) {
      var request = _ref7.request;
      return Promise.resolve("popstate: ".concat(this.id));
    }
  }, {
    key: "getPopstatePromise",
    value: function getPopstatePromise(_ref8) {
      var request = _ref8.request;
      this[INITIALIZED] = false;

      if (this.shouldInitialize({
        request: request
      })) {
        this[INITIALIZED] = true;
        return this.popstatePromise({
          request: request
        });
      }
    }
  }, {
    key: "getParentInitPromise",
    value: function getParentInitPromise() {
      return this.parent ? this.parent[INIT_PROMISE] : Promise.resolve('root');
    }
  }, {
    key: "getParentPopstatePromise",
    value: function getParentPopstatePromise() {
      return this.parent ? this.parent[POPSTATE_PROMISE] : Promise.resolve('root');
    }
  }, {
    key: "runInit",
    value: function runInit(_ref9) {
      var _this2 = this;

      var request = _ref9.request;
      this[INIT_PROMISE] = Promise.all([this.getParentInitPromise({
        request: request
      }), this.getInitPromise({
        request: request
      })]).then(function (_ref10) {
        var _ref11 = _slicedToArray(_ref10, 2),
            parentResponse = _ref11[0],
            response = _ref11[1];

        if (_this2[INITIALIZED]) {
          return Promise.resolve(_this2.init({
            request: request,
            response: response,
            config: _this2.config
          }));
        }
      })["catch"](function (error) {
        return _this2.runCatch({
          request: request,
          error: error
        });
      });
      this[INIT_DONE] = Promise.all([this[INIT_PROMISE]].concat(_toConsumableArray(this.nodes.map(function (node) {
        return node.runInit({
          request: request
        });
      }))));
      return this[INIT_DONE];
    }
  }, {
    key: "runPopstate",
    value: function runPopstate(_ref12) {
      var _this3 = this;

      var request = _ref12.request;
      this[POPSTATE_PROMISE] = Promise.all([this.getParentPopstatePromise({
        request: request
      }), this.getPopstatePromise({
        request: request
      })]).then(function (_ref13) {
        var _ref14 = _slicedToArray(_ref13, 2),
            parentPopstateResult = _ref14[0],
            popstateResult = _ref14[1];

        if (_this3[INITIALIZED]) {
          return Promise.resolve(_this3.popstate({
            request: request,
            response: popstateResult,
            popstateResult: popstateResult,
            config: _this3.config
          }));
        }
      })["catch"](function (error) {
        return _this3.runCatch({
          request: request,
          error: error
        });
      });
      this[POPSTATE_DONE] = Promise.all([this[POPSTATE_PROMISE]].concat(_toConsumableArray(this.nodes.map(function (node) {
        return node.runPopstate({
          request: request
        });
      }))));
      return this[POPSTATE_DONE];
    }
  }, {
    key: "runDestroy",
    value: function runDestroy(_ref15) {
      var request = _ref15.request;

      if (this[INITIALIZED]) {
        this.info('destroy');
        this[INITIALIZED] = false;
        var resolved = this.nodes.map(function (node) {
          return node.runDestroy({
            request: request
          });
        });
        return Promise.all([this.destroy({
          request: request,
          config: this.config
        })].concat(_toConsumableArray(resolved)));
      }

      return Promise.resolve();
    }
  }, {
    key: "runCatch",
    value: function runCatch(_ref16) {
      var request = _ref16.request,
          error = _ref16.error;
      return this["catch"]({
        request: request,
        error: error
      });
    }
  }, {
    key: "catch",
    value: function _catch(_ref17) {
      var request = _ref17.request,
          error = _ref17.error;

      if (this[INITIALIZED]) {
        this[INITIALIZED] = false;

        switch (error.constructor) {
          case PropagateError:
            if (this.onPropagateError({
              request: request,
              error: error
            }) !== false) {
              this.nodes.forEach(function (node) {
                return node["catch"]({
                  request: request,
                  error: error,
                  stack: error.stack
                });
              });
            }

            break;

          case BubbleError:
            if (this.onBubbleError({
              request: request,
              error: error
            }) !== false) {
              this.parent["catch"]({
                request: request,
                error: error,
                stack: error.stack
              });
            }

            break;

          case Error:
            this.onCatch({
              request: request,
              error: error,
              stack: error.stack
            });
        }

        log("".concat(this.constructor.name, "::error"), '#e6194b', {
          self: this,
          error: error,
          stack: error.stack
        });
        throw error;
      }
    }
  }, {
    key: "onCatch",
    value: function onCatch(_ref18) {
      var request = _ref18.request,
          error = _ref18.error;
      this.log('onCatch', {
        request: request,
        error: error
      });
    }
  }, {
    key: "onPropagateError",
    value: function onPropagateError(_ref19) {
      var request = _ref19.request,
          error = _ref19.error;
    }
  }, {
    key: "onBubbleError",
    value: function onBubbleError(_ref20) {
      var request = _ref20.request,
          error = _ref20.error;
    }
  }, {
    key: "log",
    value: function log(method, message) {
      var plugin = this.constructor.plugin;

      if (this.magna.debug && (typeof plugin === 'undefined' || plugin.debug === true)) {
        plugin = plugin || {
          debug: true,
          color: '#777'
        };
        console.log("%c--> ".concat(this[Symbol.toStringTag], "::").concat(method), "color: ".concat(plugin.color || '#000'), message, this);
      }
    }
  }, {
    key: "info",
    value: function info(method) {
      var plugin = this.constructor.plugin;

      if (this.magna.debug && (typeof plugin === 'undefined' || plugin.debug === true)) {
        var _console;

        plugin = plugin || {
          debug: true,
          color: '#777'
        };
        console.groupCollapsed("%c%s %c%s", 'color:#aaa', pad(10, this[Symbol.toStringTag]), "color: ".concat(plugin.color), "".concat(this[Symbol.toStringTag] || this.constructor.name, "::").concat(method));

        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        (_console = console).log.apply(_console, [this].concat(args));

        console.groupEnd();
      }
    }
  }, {
    key: "setState",
    value: function setState(path, stateReducer) {
      this.magna.setState(path, stateReducer);
      return this.magna.getState(path);
    }
  }, {
    key: "subscribe",
    value: function subscribe(path, cb) {
      this.magna.subscribe(this, path, cb);
      return true;
    }
  }, {
    key: "unsubscribe",
    value: function unsubscribe(path, cb) {
      this.magna.unsubscribe(this, path, cb);
      return true;
    }
  }, {
    key: "loaderStart",
    value: function loaderStart() {}
  }, {
    key: "loaderStop",
    value: function loaderStop() {}
  }, {
    key: "parent",
    get: function get() {
      return PARENTS.get(this);
    },
    set: function set(parent) {
      return PARENTS.set(this, parent);
    }
  }, {
    key: "magna",
    get: function get() {
      return ROOT.has(this) ? ROOT.get(this) : ROOT.set(this, getRootNode(this)), ROOT.get(this);
    }
  }]);

  return Node;
}();

function path(list, obj){
  if (arguments.length === 1) return _obj => path(list, _obj)
  if (obj === null || obj === undefined){
    return undefined
  }
  let willReturn = obj;
  let counter = 0;
  const pathArrValue = typeof list === 'string' ? list.split('.') : list;
  while (counter < pathArrValue.length){
    if (willReturn === null || willReturn === undefined){
      return undefined
    }
    willReturn = willReturn[ pathArrValue[ counter ] ];
    counter++;
  }
  return willReturn
}

function always(x){
  return () => x
}

function clone(val){
  const out = Array.isArray(val) ? Array(val.length) : {};
  if (val && val.getTime) return new Date(val.getTime())
  for (const key in val){
    const v = val[ key ];
    out[ key ] =
      typeof v === 'object' && v !== null ?
        v.getTime ?
          new Date(v.getTime()) :
          clone(v) :
        v;
  }
  return out
}

function type(input){
  const typeOf = typeof input;
  if (input === null){
    return 'Null'
  } else if (input === undefined){
    return 'Undefined'
  } else if (typeOf === 'boolean'){
    return 'Boolean'
  } else if (typeOf === 'number'){
    return Number.isNaN(input) ? 'NaN' : 'Number'
  } else if (typeOf === 'string'){
    return 'String'
  } else if (Array.isArray(input)){
    return 'Array'
  } else if (input instanceof RegExp){
    return 'RegExp'
  }
  const asStr = input && input.toString ? input.toString() : '';
  if ([ 'true', 'false' ].includes(asStr)) return 'Boolean'
  if (!Number.isNaN(Number(asStr))) return 'Number'
  if (asStr.startsWith('async')) return 'Async'
  if (asStr === '[object Promise]') return 'Promise'
  if (typeOf === 'function') return 'Function'
  if (input instanceof String) return 'String'
  return 'Object'
}

function parseError(maybeError){
  const typeofError = maybeError.__proto__.toString();
  if (![ 'Error', 'TypeError' ].includes(typeofError)) return []
  return [ typeofError, maybeError.message ]
}
function parseDate(maybeDate){
  if (!maybeDate.toDateString) return [ false ]
  return [ true, maybeDate.getTime() ]
}
function parseRegex(maybeRegex){
  if (maybeRegex.constructor !== RegExp) return [ false ]
  return [ true, maybeRegex.toString() ]
}
function equals(a, b){
  if (arguments.length === 1) return _b => equals(a, _b)
  const aType = type(a);
  if (aType !== type(b)) return false
  if ([ 'NaN', 'Undefined', 'Null' ].includes(aType)) return true
  if ([ 'Boolean', 'Number', 'String' ].includes(aType)) return a.toString() === b.toString()
  if (aType === 'Array'){
    const aClone = Array.from(a);
    const bClone = Array.from(b);
    if (aClone.toString() !== bClone.toString()){
      return false
    }
    let loopArrayFlag = true;
    aClone.forEach((aCloneInstance, aCloneIndex) => {
      if (loopArrayFlag){
        if (
          aCloneInstance !== bClone[ aCloneIndex ] &&
          !equals(aCloneInstance, bClone[ aCloneIndex ])
        ){
          loopArrayFlag = false;
        }
      }
    });
    return loopArrayFlag
  }
  const aRegex = parseRegex(a);
  const bRegex = parseRegex(b);
  if (aRegex[ 0 ]){
    return bRegex[ 0 ] ? aRegex[ 1 ] === bRegex[ 1 ] : false
  } else if (bRegex[ 0 ]) return false
  const aDate = parseDate(a);
  const bDate = parseDate(b);
  if (aDate[ 0 ]){
    return bDate[ 0 ] ? aDate[ 1 ] === bDate[ 1 ] : false
  } else if (bDate[ 0 ]) return false
  const aError = parseError(a);
  const bError = parseError(b);
  if (
    aError[ 0 ]
  ){
    return bError[ 0 ] ?
      aError[ 0 ] === bError[ 0 ] && aError[ 1 ] === bError[ 1 ] :
      false
  }
  if (aType === 'Object'){
    const aKeys = Object.keys(a);
    if (aKeys.length !== Object.keys(b).length){
      return false
    }
    let loopObjectFlag = true;
    aKeys.forEach(aKeyInstance => {
      if (loopObjectFlag){
        const aValue = a[ aKeyInstance ];
        const bValue = b[ aKeyInstance ];
        if (aValue !== bValue && !equals(aValue, bValue)){
          loopObjectFlag = false;
        }
      }
    });
    return loopObjectFlag
  }
  return false
}

function curry(fn, args = []){
  return (..._args) =>
    (rest => rest.length >= fn.length ? fn(...rest) : curry(fn, rest))([
      ...args,
      ..._args,
    ])
}

function assocFn(
  prop, val, obj
){
  return Object.assign(
    {}, obj, { [ prop ] : val }
  )
}
const assoc = curry(assocFn);

function _isInteger(n){
  return n << 0 === n
}

function assocPathFn(
  list, val, input
){
  const pathArrValue = typeof list === 'string' ? list.split('.') : list;
  if (pathArrValue.length === 0){
    return val
  }
  const index = pathArrValue[ 0 ];
  if (pathArrValue.length > 1){
    const condition = typeof input !== 'object' ||
      input === null ||
      !input.hasOwnProperty(index);
    const nextinput = condition ?
      _isInteger(parseInt(pathArrValue[ 1 ], 10)) ? [] : {} :
      input[ index ];
    val = assocPathFn(
      Array.prototype.slice.call(pathArrValue, 1), val, nextinput
    );
  }
  if (_isInteger(parseInt(index, 10)) && Array.isArray(input)){
    const arr = input.slice();
    arr[ index ] = val;
    return arr
  }
  return assoc(
    index, val, input
  )
}
const assocPath = curry(assocPathFn);

function lens(getter, setter){
  if (arguments.length === 1)
    return _setter => lens(getter, _setter)
  return function(functor){
    return function(target){
      return functor(getter(target))
        .map(focus => setter(focus, target))
    }
  }
}

function lensPath(key){
  return lens(path(key), assocPath(key))
}

const Identity = x => ({
  x,
  map : fn => Identity(fn(x)),
});
function over(
  lens, fn, object
){
  if (arguments.length === 1)
    return (_fn, _object) => over(
      lens, _fn, _object
    )
  if (arguments.length === 2)
    return _object => over(
      lens, fn, _object
    )
  return lens(x => Identity(fn(x)))(object).x
}

const Const = x => ({
  x,
  map : fn => Const(x),
});
function view(lens, target){
  if (arguments.length === 1)
    return _target => view(lens, _target)
  return lens(Const)(target).x
}

function escapeRegexCharacters(string) {
  return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

var StateObserver = function StateObserver(target) {
  _classCallCheck(this, StateObserver);

  Object.setPrototypeOf(this, new Proxy(target, StateObserver.handler));
};

_defineProperty(StateObserver, "handler", {
  get: function get(obj, prop, receiver) {
    if (typeof obj[prop] === 'function') {
      return function proxied() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return obj[prop].apply(obj, args);
      };
    }

    if (_typeof(obj[prop]) === 'object' && typeof obj[prop] !== 'undefined') {
      return new StateObserver(obj[prop], StateObserver.handler);
    }

    return obj.get(prop);
  },
  set: function set(obj, prop, val) {
    return obj.set(prop, val);
  }
});

var State = /*#__PURE__*/function () {
  function State(state) {
    _classCallCheck(this, State);

    _triggerSubscribers.add(this);

    _defineProperty(this, "__subscribers", new Map());

    _defineProperty(this, "__state", {});

    this.__state = state;
    return new StateObserver(this);
  }

  _createClass(State, [{
    key: "get",
    value: function get(prop) {
      return this.__state[prop];
    }
  }, {
    key: "unsafeReplaceState",
    value: function unsafeReplaceState(newState) {
      var oldState = this.__state;
      this.__state = newState;

      _classPrivateMethodGet(this, _triggerSubscribers, _triggerSubscribers2).call(this, oldState, this.__state);

      return newState;
    }
  }, {
    key: "set",
    value: function set(prop, val) {
      return this.setState(prop, always(val));
    }
  }, {
    key: "setState",
    value: function setState(path, stateUpdater) {
      path = Array.isArray(path) ? path.join('.') : path;
      var oldState = this.__state;
      var lens = lensPath(path);
      this.__state = over(lens, stateUpdater, this.__state);

      _classPrivateMethodGet(this, _triggerSubscribers, _triggerSubscribers2).call(this, oldState, this.__state);

      return view(lens, this.__state);
    }
  }, {
    key: "subscribe",
    value: function subscribe(path, cb) {
      path = Array.isArray(path) ? path.join('.') : path;

      if (!this.__subscribers.has(path)) {
        this.__subscribers.set(path, new Set([]));
      }

      this.__subscribers.get(path).add(cb);
    }
  }, {
    key: "unsubscribe",
    value: function unsubscribe(path, cb) {
      path = Array.isArray(path) ? path.join('.') : path;
      if (this.__subscribers.has(prop)) this.__subscribers.get(prop)["delete"](cb);
    }
  }, {
    key: "trigger",
    value: function trigger(path) {
      var _this = this;

      if (path) {
        _toConsumableArray(this.__subscribers.entries()).filter(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              key = _ref2[0],
              value = _ref2[1];

          return new RegExp("^" + escapeRegexCharacters(key), 'gmi').test(key);
        }).forEach(function (_ref3) {
          var _ref4 = _slicedToArray(_ref3, 2),
              key = _ref4[0],
              cb = _ref4[1];

          var currentView = view(lensPath(key), _this.__state);
          var currentState = clone(_this.__state);
          cb(currentView, currentView, currentState, currentState);
        });
      } else {
        _classPrivateMethodGet(this, _triggerSubscribers, _triggerSubscribers2).call(this, {}, this.__state);
      }
    }
  }, {
    key: "getState",
    value: function getState() {
      return clone(this.__state);
    }
  }, {
    key: "getSubscribers",
    value: function getSubscribers() {
      return new Map(_toConsumableArray(this.__subscribers.entries()).map(function (_ref5) {
        var _ref6 = _slicedToArray(_ref5, 2),
            key = _ref6[0],
            value = _ref6[1];

        return [key, new Set(value)];
      }));
    }
  }, {
    key: "unsafeGetState",
    value: function unsafeGetState() {
      return this.__state;
    }
  }, {
    key: "unsafeGetSubscribers",
    value: function unsafeGetSubscribers() {
      return this.__subscribers;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.__subscribers = new Map();
      this.__state = {};
    }
  }]);

  return State;
}();

var _triggerSubscribers = new WeakSet();

var _triggerSubscribers2 = function _triggerSubscribers2(oldState, newState) {
  var _iterator = _createForOfIteratorHelper(this.__subscribers),
      _step;

  try {
    var _loop = function _loop() {
      var _step$value = _slicedToArray(_step.value, 2),
          subscribePath = _step$value[0],
          subscribers = _step$value[1];

      var subscribeLens = lensPath(subscribePath);
      var oldView = view(subscribeLens, oldState);
      var newView = view(subscribeLens, newState);

      if (!equals(oldView, newView)) {
        subscribers.forEach(function (cb) {
          if (cb.length === 3) cb(newView, oldView, clone(newState));else if (cb.length === 4) cb(newView, oldView, clone(newState), clone(oldState));else cb(newView, oldView);
        });
      }
    };

    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      _loop();
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var strictUriEncode = str => encodeURIComponent(str).replace(/[!'()*]/g, x => `%${x.charCodeAt(0).toString(16).toUpperCase()}`);

var token = '%[a-f0-9]{2}';
var singleMatcher = new RegExp(token, 'gi');
var multiMatcher = new RegExp('(' + token + ')+', 'gi');
function decodeComponents(components, split) {
	try {
		return decodeURIComponent(components.join(''));
	} catch (err) {
	}
	if (components.length === 1) {
		return components;
	}
	split = split || 1;
	var left = components.slice(0, split);
	var right = components.slice(split);
	return Array.prototype.concat.call([], decodeComponents(left), decodeComponents(right));
}
function decode(input) {
	try {
		return decodeURIComponent(input);
	} catch (err) {
		var tokens = input.match(singleMatcher);
		for (var i = 1; i < tokens.length; i++) {
			input = decodeComponents(tokens, i).join('');
			tokens = input.match(singleMatcher);
		}
		return input;
	}
}
function customDecodeURIComponent(input) {
	var replaceMap = {
		'%FE%FF': '\uFFFD\uFFFD',
		'%FF%FE': '\uFFFD\uFFFD'
	};
	var match = multiMatcher.exec(input);
	while (match) {
		try {
			replaceMap[match[0]] = decodeURIComponent(match[0]);
		} catch (err) {
			var result = decode(match[0]);
			if (result !== match[0]) {
				replaceMap[match[0]] = result;
			}
		}
		match = multiMatcher.exec(input);
	}
	replaceMap['%C2'] = '\uFFFD';
	var entries = Object.keys(replaceMap);
	for (var i = 0; i < entries.length; i++) {
		var key = entries[i];
		input = input.replace(new RegExp(key, 'g'), replaceMap[key]);
	}
	return input;
}
var decodeUriComponent = function (encodedURI) {
	if (typeof encodedURI !== 'string') {
		throw new TypeError('Expected `encodedURI` to be of type `string`, got `' + typeof encodedURI + '`');
	}
	try {
		encodedURI = encodedURI.replace(/\+/g, ' ');
		return decodeURIComponent(encodedURI);
	} catch (err) {
		return customDecodeURIComponent(encodedURI);
	}
};

var splitOnFirst = (string, separator) => {
	if (!(typeof string === 'string' && typeof separator === 'string')) {
		throw new TypeError('Expected the arguments to be of type `string`');
	}
	if (separator === '') {
		return [string];
	}
	const separatorIndex = string.indexOf(separator);
	if (separatorIndex === -1) {
		return [string];
	}
	return [
		string.slice(0, separatorIndex),
		string.slice(separatorIndex + separator.length)
	];
};

var queryString = createCommonjsModule(function (module, exports) {



function encoderForArrayFormat(options) {
	switch (options.arrayFormat) {
		case 'index':
			return key => (result, value) => {
				const index = result.length;
				if (value === undefined || (options.skipNull && value === null)) {
					return result;
				}
				if (value === null) {
					return [...result, [encode(key, options), '[', index, ']'].join('')];
				}
				return [
					...result,
					[encode(key, options), '[', encode(index, options), ']=', encode(value, options)].join('')
				];
			};
		case 'bracket':
			return key => (result, value) => {
				if (value === undefined || (options.skipNull && value === null)) {
					return result;
				}
				if (value === null) {
					return [...result, [encode(key, options), '[]'].join('')];
				}
				return [...result, [encode(key, options), '[]=', encode(value, options)].join('')];
			};
		case 'comma':
		case 'separator':
			return key => (result, value) => {
				if (value === null || value === undefined || value.length === 0) {
					return result;
				}
				if (result.length === 0) {
					return [[encode(key, options), '=', encode(value, options)].join('')];
				}
				return [[result, encode(value, options)].join(options.arrayFormatSeparator)];
			};
		default:
			return key => (result, value) => {
				if (value === undefined || (options.skipNull && value === null)) {
					return result;
				}
				if (value === null) {
					return [...result, encode(key, options)];
				}
				return [...result, [encode(key, options), '=', encode(value, options)].join('')];
			};
	}
}
function parserForArrayFormat(options) {
	let result;
	switch (options.arrayFormat) {
		case 'index':
			return (key, value, accumulator) => {
				result = /\[(\d*)\]$/.exec(key);
				key = key.replace(/\[\d*\]$/, '');
				if (!result) {
					accumulator[key] = value;
					return;
				}
				if (accumulator[key] === undefined) {
					accumulator[key] = {};
				}
				accumulator[key][result[1]] = value;
			};
		case 'bracket':
			return (key, value, accumulator) => {
				result = /(\[\])$/.exec(key);
				key = key.replace(/\[\]$/, '');
				if (!result) {
					accumulator[key] = value;
					return;
				}
				if (accumulator[key] === undefined) {
					accumulator[key] = [value];
					return;
				}
				accumulator[key] = [].concat(accumulator[key], value);
			};
		case 'comma':
		case 'separator':
			return (key, value, accumulator) => {
				const isArray = typeof value === 'string' && value.split('').indexOf(options.arrayFormatSeparator) > -1;
				const newValue = isArray ? value.split(options.arrayFormatSeparator).map(item => decode(item, options)) : value === null ? value : decode(value, options);
				accumulator[key] = newValue;
			};
		default:
			return (key, value, accumulator) => {
				if (accumulator[key] === undefined) {
					accumulator[key] = value;
					return;
				}
				accumulator[key] = [].concat(accumulator[key], value);
			};
	}
}
function validateArrayFormatSeparator(value) {
	if (typeof value !== 'string' || value.length !== 1) {
		throw new TypeError('arrayFormatSeparator must be single character string');
	}
}
function encode(value, options) {
	if (options.encode) {
		return options.strict ? strictUriEncode(value) : encodeURIComponent(value);
	}
	return value;
}
function decode(value, options) {
	if (options.decode) {
		return decodeUriComponent(value);
	}
	return value;
}
function keysSorter(input) {
	if (Array.isArray(input)) {
		return input.sort();
	}
	if (typeof input === 'object') {
		return keysSorter(Object.keys(input))
			.sort((a, b) => Number(a) - Number(b))
			.map(key => input[key]);
	}
	return input;
}
function removeHash(input) {
	const hashStart = input.indexOf('#');
	if (hashStart !== -1) {
		input = input.slice(0, hashStart);
	}
	return input;
}
function getHash(url) {
	let hash = '';
	const hashStart = url.indexOf('#');
	if (hashStart !== -1) {
		hash = url.slice(hashStart);
	}
	return hash;
}
function extract(input) {
	input = removeHash(input);
	const queryStart = input.indexOf('?');
	if (queryStart === -1) {
		return '';
	}
	return input.slice(queryStart + 1);
}
function parseValue(value, options) {
	if (options.parseNumbers && !Number.isNaN(Number(value)) && (typeof value === 'string' && value.trim() !== '')) {
		value = Number(value);
	} else if (options.parseBooleans && value !== null && (value.toLowerCase() === 'true' || value.toLowerCase() === 'false')) {
		value = value.toLowerCase() === 'true';
	}
	return value;
}
function parse(input, options) {
	options = Object.assign({
		decode: true,
		sort: true,
		arrayFormat: 'none',
		arrayFormatSeparator: ',',
		parseNumbers: false,
		parseBooleans: false
	}, options);
	validateArrayFormatSeparator(options.arrayFormatSeparator);
	const formatter = parserForArrayFormat(options);
	const ret = Object.create(null);
	if (typeof input !== 'string') {
		return ret;
	}
	input = input.trim().replace(/^[?#&]/, '');
	if (!input) {
		return ret;
	}
	for (const param of input.split('&')) {
		let [key, value] = splitOnFirst(options.decode ? param.replace(/\+/g, ' ') : param, '=');
		value = value === undefined ? null : options.arrayFormat === 'comma' ? value : decode(value, options);
		formatter(decode(key, options), value, ret);
	}
	for (const key of Object.keys(ret)) {
		const value = ret[key];
		if (typeof value === 'object' && value !== null) {
			for (const k of Object.keys(value)) {
				value[k] = parseValue(value[k], options);
			}
		} else {
			ret[key] = parseValue(value, options);
		}
	}
	if (options.sort === false) {
		return ret;
	}
	return (options.sort === true ? Object.keys(ret).sort() : Object.keys(ret).sort(options.sort)).reduce((result, key) => {
		const value = ret[key];
		if (Boolean(value) && typeof value === 'object' && !Array.isArray(value)) {
			result[key] = keysSorter(value);
		} else {
			result[key] = value;
		}
		return result;
	}, Object.create(null));
}
exports.extract = extract;
exports.parse = parse;
exports.stringify = (object, options) => {
	if (!object) {
		return '';
	}
	options = Object.assign({
		encode: true,
		strict: true,
		arrayFormat: 'none',
		arrayFormatSeparator: ','
	}, options);
	validateArrayFormatSeparator(options.arrayFormatSeparator);
	const formatter = encoderForArrayFormat(options);
	const objectCopy = Object.assign({}, object);
	if (options.skipNull) {
		for (const key of Object.keys(objectCopy)) {
			if (objectCopy[key] === undefined || objectCopy[key] === null) {
				delete objectCopy[key];
			}
		}
	}
	const keys = Object.keys(objectCopy);
	if (options.sort !== false) {
		keys.sort(options.sort);
	}
	return keys.map(key => {
		const value = object[key];
		if (value === undefined) {
			return '';
		}
		if (value === null) {
			return encode(key, options);
		}
		if (Array.isArray(value)) {
			return value
				.reduce(formatter(key), [])
				.join('&');
		}
		return encode(key, options) + '=' + encode(value, options);
	}).filter(x => x.length > 0).join('&');
};
exports.parseUrl = (input, options) => {
	return {
		url: removeHash(input).split('?')[0] || '',
		query: parse(extract(input), options)
	};
};
exports.stringifyUrl = (input, options) => {
	const url = removeHash(input.url).split('?')[0] || '';
	const queryFromUrl = exports.extract(input.url);
	const parsedQueryFromUrl = exports.parse(queryFromUrl);
	const hash = getHash(input.url);
	const query = Object.assign(parsedQueryFromUrl, input.query);
	let queryString = exports.stringify(query, options);
	if (queryString) {
		queryString = `?${queryString}`;
	}
	return `${url}${queryString}${hash}`;
};
});
var queryString_1 = queryString.extract;
var queryString_2 = queryString.parse;
var queryString_3 = queryString.stringify;
var queryString_4 = queryString.parseUrl;
var queryString_5 = queryString.stringifyUrl;

function combineUrlParams(url, params) {
  var queryIndex = url.indexOf('?');

  if (queryIndex > -1) {
    var urlSlug = url.slice(0, queryIndex);
    var urlParams = queryString.parse(url.slice(queryIndex));
    var newQueryParams = queryString.stringify(_objectSpread2({}, urlParams, {}, params), {
      encode: false,
      arrayFormat: 'brackets'
    });
    console.log({
      urlSlug: urlSlug,
      urlParams: urlParams,
      newQueryParams: newQueryParams
    });
    return urlSlug + (newQueryParams.length ? '?' + newQueryParams : '');
  }

  if (typeof params !== 'undefined' && Object.getOwnPropertyNames(params).length) {
    return url + '?' + queryString.stringify(params, {
      encode: false,
      arrayFormat: 'brackets'
    });
  }

  return url;
}

function debounce(timeout, callback) {
  var timer = null;
  return function (e) {
    var _this = this;

    var args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      callback.apply(_this, args);
    }, timeout);
  };
}

function logAction(action, instance) {
  var magna = instance.magna;

  if (magna.debug) {
    if (magna.env === 'development') {
      console.group("%c%s %c%s", 'color:#aaa', 'action', 'color:teal', action);
    } else if (magna.env === 'staging') {
      console.groupCollapsed("%c%s %c%s", 'color:#aaa', 'action', 'color:teal', action);
    }
  }
}

function logRoute(method, instance) {
  var magna = instance.magna;

  if (magna.debug) {
    if (magna.env === 'development') {
      console.group("%c%s %c%s %c%s %c%s", 'color:#aaa', 'route', 'color:purple', method, 'color:#111', location.pathname, 'color:#007bff;font-weight:normal', magna.request.type);
    } else if (magna.env === 'staging') {
      console.groupCollapsed("%c%s %c%s %c%s %c%s", 'color:#aaa', 'route', 'color:purple', method, 'color:#111', location.pathname, 'color:#007bff;font-weight:normal', magna.request.type);
    }
  }
}

var prettify = function prettify(str) {
  return str.replace('%20', ' ').replace(/([^a-z0-9]+)/gim, ' ');
};

function radioClass(classes, el) {
  return function _radioClass(clazz) {
    el = document.querySelector(el);
    classes.forEach(function (x) {
      return el.classList.remove(x);
    });
    el.classList.add(clazz);
  };
}

function regexify$1(str) {
  var index = [];
  var params = {};
  var string = str instanceof RegExp ? false : str.replace(/\//g, '\\/').replace(/\.?\*/, '.*').replace(/\{([^:]+)\:?([^}]*)(\?)?\}/g, function (_, param, type, skippable) {
    index.push(param);
    params[param] = {
      type: type
    };

    switch (type) {
      case 'char':
      case 'alpha':
      case 'string':
        return params[param].regex = "([a-zA-Z-_%&]".concat(skippable ? '*' : '+', ")");

      case 'int':
      case 'num':
      case 'number':
        return params[param].regex = "([0-9]".concat(skippable ? '*' : '+', ")");

      default:
        if (type) {
          params[param].type = 'regex';
          return params[param].regex = type;
        }

        params[param].type = 'mixed';
        return params[param].regex = "([a-zA-Z0-9-_%&]".concat(skippable ? '*' : '+', ")");
    }
  });
  return {
    params: params,
    string: string,
    index: index,
    regex: str instanceof RegExp ? str : new RegExp(string)
  };
}

function tap(fn) {
  return function (x) {
    fn.call(this, x);
    return x;
  };
}

function trace(log) {
  return function (val) {
    return console.log(log, val), val;
  };
}

var uglify = function uglify(str) {
  return str.toLowerCase().replace(/([^a-z0-9]+)/gim, '-');
};

var prev = null;

var createUUid = function (x) {
  return function () {
    return x++;
  };
}(0);

var Request = /*#__PURE__*/function () {
  function Request() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$type = _ref.type,
        type = _ref$type === void 0 ? 'http' : _ref$type,
        _ref$uuid = _ref.uuid,
        uuid = _ref$uuid === void 0 ? createUUid() : _ref$uuid,
        _ref$href = _ref.href,
        href = _ref$href === void 0 ? location.href : _ref$href,
        _ref$query = _ref.query,
        query = _ref$query === void 0 ? {} : _ref$query,
        _ref$scrollTop = _ref.scrollTop,
        scrollTop = _ref$scrollTop === void 0 ? 0 : _ref$scrollTop,
        _ref$title = _ref.title,
        title = _ref$title === void 0 ? document.title : _ref$title;

    _classCallCheck(this, Request);

    _defineProperty(this, "type", 'http');

    _defineProperty(this, "keywords", []);

    _defineProperty(this, "params", {});

    _defineProperty(this, "values", []);

    _defineProperty(this, "scrollTop", 0);

    _defineProperty(this, "query", {});

    this.prev = prev;
    this.type = type;
    this.uuid = uuid;

    if (~href.indexOf('http') && location.origin) {
      href = href.replace(location.origin, '');
    }

    var index = href.indexOf('?');
    var queryStringParams = index > -1 ? queryString.parse(href.slice(index + 1)) : {};
    this.query = mergeDeepRight(queryStringParams, query);
    this.search = queryString.stringify(this.query, {
      encode: false,
      arrayFormat: 'brackets'
    });
    this.pathname = location.pathname;
    this.href = this.pathname + (this.search ? "?".concat(this.search) : '');
    this.title = title;
    this.scrollTop = scrollTop;
    prev = this.pathname;
  }

  _createClass(Request, [{
    key: "combineParams",
    value: function combineParams(_ref2) {
      var params = _ref2.params;
      this.params = mergeDeepRight(this.params, params);
      return this;
    }
  }]);

  return Request;
}();

var _Symbol$toStringTag$1;
_Symbol$toStringTag$1 = Symbol.toStringTag;

var Magna = /*#__PURE__*/function (_Node) {
  _inherits(Magna, _Node);

  var _super = _createSuper(Magna);

  function Magna(nodes) {
    var _this;

    _classCallCheck(this, Magna);

    _this = _super.call(this, {}, nodes);

    _defineProperty(_assertThisInitialized(_this), "debug", true);

    _defineProperty(_assertThisInitialized(_this), "env", 'development');

    _defineProperty(_assertThisInitialized(_this), "setScrollOnPopstate", true);

    _defineProperty(_assertThisInitialized(_this), _Symbol$toStringTag$1, 'Magna');

    _this.__state = {};
    _this.__subscribers = new Map();
    _this[INITIALIZED] = false;

    _this.__setActiveUrl();

    window.addEventListener('popstate', function (e) {
      if (e.state === null) {
        e.preventDefault();
        return false;
      }

      var request = _this.request = new Request(e.state);

      _this.__setActiveUrl();

      logRoute('popstate', _assertThisInitialized(_this));
      return _this.runDestroy({
        request: request
      }).then(function (destroyResults) {
        console.groupEnd();
        logRoute('popstate', _assertThisInitialized(_this));
        return _this.runPopstate({
          request: request
        }).then(function (xs) {
          return console.groupEnd(), xs;
        }).then(function (xs) {
          return logRoute('init', _assertThisInitialized(_this)), xs;
        }).then(function (xs) {
          return _this.runInit({
            request: request
          });
        }).then(function (xs) {
          return console.groupEnd(), xs;
        }).then(function (xs) {
          window.dataLayer && window.dataLayer.push({
            event: 'Pageview',
            url: location.href
          });
          return xs;
        });
      });
    });
    return _this;
  }

  _createClass(Magna, [{
    key: "initChildren",
    value: function initChildren() {
      var _this2 = this;

      this.nodes.forEach(function (node) {
        node.parent = _this2;
      });
    }
  }, {
    key: "start",
    value: function start(_ref) {
      var _ref$debug = _ref.debug,
          debug = _ref$debug === void 0 ? false : _ref$debug,
          _ref$env = _ref.env,
          env = _ref$env === void 0 ? 'development' : _ref$env,
          _ref$setScrollOnPopst = _ref.setScrollOnPopstate,
          setScrollOnPopstate = _ref$setScrollOnPopst === void 0 ? true : _ref$setScrollOnPopst,
          _ref$request = _ref.request,
          request = _ref$request === void 0 ? null : _ref$request;
      this.debug = debug;
      this.env = env;
      this.setScrollOnPopstate = setScrollOnPopstate;
      this[INITIALIZED] = true;
      this.request = request !== null && request !== void 0 ? request : new Request();
      history.replaceState(_objectSpread2({}, history.state, {
        scrollTop: document.body.scrollTop
      }, this.request), document.title);
      logRoute('start', this);
      this.initChildren();
      this.runInit({
        request: this.request
      }).then(function (x) {
        return console.groupEnd(), x;
      });
      return this;
    }
  }, {
    key: "popstate",
    value: function popstate(_ref2) {
      var request = _ref2.request,
          response = _ref2.response;
      if (this.debug) console.log('popstate', response);
      window.dataLayer && window.dataLayer.push({
        event: 'Pageview',
        url: location.href
      });
      if (this.debug) console.groupEnd();
      return Promise.resolve();
    }
  }, {
    key: "pushState",
    value: function pushState(obj, title, href, params) {
      this.request = new Request({
        type: 'popstate',
        href: href,
        params: params,
        title: title
      });
      return this.pushStateWithRequest(this.request);
    }
  }, {
    key: "pushStateWithRequest",
    value: function pushStateWithRequest(request) {
      var _this3 = this;

      history.replaceState(_objectSpread2({}, history.state, {
        scrollTop: document.body.scrollTop
      }), document.title);
      history.pushState(request, request.title, request.href);

      this.__setActiveUrl();

      logRoute('pushState', this);
      return this.runDestroy({
        request: request
      }).then(function (destroyResults) {
        console.groupEnd();
        logRoute('popstate', _this3);
        return _this3.runPopstate({
          request: _this3.request
        }).then(function (xs) {
          return console.groupEnd(), xs;
        }).then(function (xs) {
          return logRoute('init', _this3), xs;
        }).then(function (xs) {
          return _this3.runInit({
            request: _this3.request
          });
        }).then(function (xs) {
          return console.groupEnd(), xs;
        }).then(function (xs) {
          window.dataLayer && window.dataLayer.push({
            event: 'Pageview',
            url: location.href
          });
          return xs;
        });
      });
    }
  }, {
    key: "use",
    value: function use(nodes) {
      this.nodes = [].concat(_toConsumableArray(this.nodes), _toConsumableArray(nodes));
      this.initChildren();
      return this;
    }
  }, {
    key: "rerun",
    value: function rerun() {
      var _this4 = this;

      this.destroy(this.request).then(function (responses) {
        _this4.request = new Request(_objectSpread2({
          type: 'manual'
        }, _this4.request));

        _this4.init(_this4.request);
      });
      return this;
    }
  }, {
    key: "__setActiveUrl",
    value: function __setActiveUrl() {
      var escapedPathname = location.pathname.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      document.querySelectorAll('.link--active').forEach(function (element) {
        return element.classList.remove('link--active');
      });

      _toConsumableArray(document.querySelectorAll('a[href]')).filter(function (element) {
        var href = element.href.replace(location.origin, '');
        return new RegExp("^" + escapedPathname + "$").test(href);
      }).forEach(function (element) {
        return element.classList.add('link--active');
      });
    }
  }, {
    key: "getState",
    value: function getState(path) {
      return _objectSpread2({}, this.__state);
    }
  }, {
    key: "setState",
    value: function setState(path, stateUpdater) {
      if (typeof path === 'string') path = path.split('.');
      path = path || ['global'];
      var oldState = this.__state;
      var lens = lensPath(path);
      var newState = over(lens, stateUpdater, this.__state);

      if (newState === this.__state) {
        throw new Error('Do not mutate the state, please return a new object for the state');
      }

      this.__state = newState;

      var _iterator = _createForOfIteratorHelper(this.__subscribers),
          _step;

      try {
        var _loop = function _loop() {
          var _step$value = _slicedToArray(_step.value, 2),
              subscribePath = _step$value[0],
              subscribers = _step$value[1];

          var subscribeLens = lensPath(subscribePath.split('.'));
          var a = view(subscribeLens, oldState);
          var b = view(subscribeLens, newState);

          if (!equals(a, b)) {
            subscribers.forEach(function (_ref3) {
              var instance = _ref3.instance,
                  cb = _ref3.cb;

              if (instance[INITIALIZED]) {
                over(subscribeLens, cb, newState);
              }
            });
          }
        };

        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          _loop();
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return this;
    }
  }, {
    key: "subscribe",
    value: function subscribe(instance, path, cb) {
      path = !path ? 'global' : Array.isArray(path) ? path.join('.') : path;
      var listeners = [];

      if (this.__subscribers.has(path)) {
        listeners = this.__subscribers.get(path);
      }

      var containsListener = listeners.some(function (listener) {
        return listener.cb === cb && listener.instance === instance;
      });

      if (!containsListener) {
        listeners.push({
          instance: instance,
          cb: cb,
          state: {}
        });
      }

      this.__subscribers.set(path, listeners);
    }
  }, {
    key: "unsubscribe",
    value: function unsubscribe(instance, path, cb) {
      path = Array.isArray(path) ? path.join('.') : String(path);

      var subscribers = this.__subscribers.get(path);

      var newEvents = subscribers.filter(function (subscriber) {
        return subscriber.instance !== instance && subscriber.cb !== cb;
      });

      this.__subscribers.set(path, newEvents);

      return true;
    }
  }, {
    key: "trigger",
    value: function trigger(path) {
      var _this5 = this;

      if (this.__subscribers.has(path)) {
        this.__subscribers.get(path).forEach(function (_ref4) {
          var cb = _ref4.cb,
              instance = _ref4.instance;

          if (instance[INITIALIZED]) {
            cb(_this5.getState());
            window.dispatchEvent(new CustomEvent(path, {
              detail: {
                state: view(lensPath(path), _this5.getState()),
                instance: instance
              }
            }));
          }
        });
      }
    }
  }]);

  return Magna;
}(Node);

var _Symbol$toStringTag$2;
_Symbol$toStringTag$2 = Symbol.toStringTag;

var ExtendablePlugin = /*#__PURE__*/function (_Node) {
  _inherits(ExtendablePlugin, _Node);

  var _super = _createSuper(ExtendablePlugin);

  function ExtendablePlugin(config) {
    var _this;

    _classCallCheck(this, ExtendablePlugin);

    _this = _super.call(this, config);

    _defineProperty(_assertThisInitialized(_this), _Symbol$toStringTag$2, 'ExtendablePlugin');

    _defineProperty(_assertThisInitialized(_this), "getters", []);

    var _loop = function _loop() {
      var key = _Object$keys[_i];
      Object.defineProperty(_assertThisInitialized(_this), key, {
        get: function get() {
          return _this.config[key];
        },
        set: function set(value) {
          return _this.config[key] = value;
        }
      });
    };

    for (var _i = 0, _Object$keys = Object.keys(_this.config); _i < _Object$keys.length; _i++) {
      _loop();
    }

    var _iterator = _createForOfIteratorHelper(_this.getters),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        key = _step.value;
        Object.defineProperty(_assertThisInitialized(_this), key, {
          get: function get() {
            return _this.config[key];
          },
          set: function set(value) {
            return _this.config[key] = value;
          }
        });
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    return _this;
  }

  _createClass(ExtendablePlugin, [{
    key: "init",
    value: function init(_ref) {
      var request = _ref.request;
      return request.url;
    }
  }]);

  return ExtendablePlugin;
}(Node);

var _Symbol$toStringTag$3;
_Symbol$toStringTag$3 = Symbol.toStringTag;

var Import = /*#__PURE__*/function (_Node) {
  _inherits(Import, _Node);

  var _super = _createSuper(Import);

  function Import(importer) {
    var _this;

    var nodes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    _classCallCheck(this, Import);

    _this = _super.call(this, {}, nodes);

    _defineProperty(_assertThisInitialized(_this), _Symbol$toStringTag$3, 'Import');

    _this.__promise = null;
    _this.importer = importer;
    return _this;
  }

  _createClass(Import, [{
    key: "initChildren",
    value: function initChildren() {
      var _this2 = this;

      this.nodes.forEach(function (node) {
        return node.parent = _this2;
      });
    }
  }, {
    key: "initPromise",
    value: function initPromise(_ref) {
      var request = _ref.request;
      return this.__promise = this.__promise || this.importer({
        request: request
      });
    }
  }, {
    key: "popstatePromise",
    value: function popstatePromise(_ref2) {
      var request = _ref2.request;
      return this.__promise = this.__promise || this.importer({
        request: request
      });
    }
  }, {
    key: "runInit",
    value: function runInit(_ref3) {
      var _this3 = this;

      var request = _ref3.request;
      return _get(_getPrototypeOf(Import.prototype), "runInit", this).call(this, {
        request: request
      }).then(function (result) {
        return _this3[INITIALIZED] && _this3.__promise && _this3.__promise.then(function (node) {
          node["default"].parent = _this3;
          return node["default"].runInit({
            request: request
          });
        });
      });
    }
  }, {
    key: "runPopstate",
    value: function runPopstate(_ref4) {
      var _this4 = this;

      var request = _ref4.request;
      return _get(_getPrototypeOf(Import.prototype), "runPopstate", this).call(this, {
        request: request
      }).then(function (result) {
        return _this4[INITIALIZED] && _this4.__promise && _this4.__promise.then(function (node) {
          return node["default"].runPopstate({
            request: request
          });
        });
      });
    }
  }, {
    key: "runDestroy",
    value: function runDestroy(_ref5) {
      var _this5 = this;

      var request = _ref5.request;
      return _get(_getPrototypeOf(Import.prototype), "runDestroy", this).call(this, {
        request: request
      }).then(function (result) {
        return _this5.__promise && _this5.__promise.then(function (node) {
          return node["default"].runDestroy({
            request: request
          });
        });
      });
    }
  }, {
    key: "init",
    value: function init(_ref6) {
      var request = _ref6.request;
      return this.url;
    }
  }]);

  return Import;
}(Node);

var _Symbol$toStringTag$4;
_Symbol$toStringTag$4 = Symbol.toStringTag;

var Lazy = /*#__PURE__*/function (_Node) {
  _inherits(Lazy, _Node);

  var _super = _createSuper(Lazy);

  function Lazy(importer, config) {
    var _this;

    var nodes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    _classCallCheck(this, Lazy);

    _this = _super.call(this, config, nodes);

    _defineProperty(_assertThisInitialized(_this), _Symbol$toStringTag$4, 'Lazy');

    _this.__promise = null;
    _this.importer = importer;
    _this.instance = null;
    return _this;
  }

  _createClass(Lazy, [{
    key: "initChildren",
    value: function initChildren() {}
  }, {
    key: "initPromise",
    value: function initPromise(_ref) {
      var request = _ref.request;
      return this.__promise = this.__promise || this.importer({
        request: request
      });
    }
  }, {
    key: "popstatePromise",
    value: function popstatePromise(_ref2) {
      var request = _ref2.request;
      return this.__promise = this.__promise || this.importer({
        request: request
      });
    }
  }, {
    key: "runInit",
    value: function runInit(_ref3) {
      var _this2 = this;

      var request = _ref3.request;
      return _get(_getPrototypeOf(Lazy.prototype), "runInit", this).call(this, {
        request: request
      }).then(function (result) {
        return _this2[INITIALIZED] && _this2.__promise && _this2.__promise.then(function (node) {
          _this2.instance = new node["default"](_this2.config);

          _this2.instance.runInit({
            request: request
          });

          return _this2.instance;
        });
      });
    }
  }, {
    key: "runPopstate",
    value: function runPopstate(_ref4) {
      var _this3 = this;

      var request = _ref4.request;
      return _get(_getPrototypeOf(Lazy.prototype), "runPopstate", this).call(this, {
        request: request
      }).then(function (result) {
        return _this3[INITIALIZED] && _this3.__promise && _this3.__promise.then(function (node) {
          return _this3.instance.runPopstate({
            request: request
          });
        });
      });
    }
  }, {
    key: "runDestroy",
    value: function runDestroy(_ref5) {
      var _this4 = this;

      var request = _ref5.request;
      return _get(_getPrototypeOf(Lazy.prototype), "runDestroy", this).call(this, {
        request: request
      }).then(function (result) {
        return _this4.__promise && _this4.__promise.then(function (node) {
          return _this4.instance.runDestroy({
            request: request
          });
        });
      });
    }
  }, {
    key: "init",
    value: function init(_ref6) {
      var request = _ref6.request;
      return this.url;
    }
  }]);

  return Lazy;
}(Node);

var _Symbol$toStringTag$5;
_Symbol$toStringTag$5 = Symbol.toStringTag;

var Module = /*#__PURE__*/function (_Node) {
  _inherits(Module, _Node);

  var _super = _createSuper(Module);

  function Module(nodes) {
    var _this;

    _classCallCheck(this, Module);

    _this = _super.call(this, {}, nodes);

    _defineProperty(_assertThisInitialized(_this), _Symbol$toStringTag$5, 'Module');

    return _this;
  }

  _createClass(Module, [{
    key: "init",
    value: function init(_ref) {
      var request = _ref.request;
      return request.url;
    }
  }]);

  return Module;
}(Node);

var _Symbol$toStringTag$6;
_Symbol$toStringTag$6 = Symbol.toStringTag;

var Plugin = /*#__PURE__*/function (_Node) {
  _inherits(Plugin, _Node);

  var _super = _createSuper(Plugin);

  function Plugin(options) {
    var _this;

    _classCallCheck(this, Plugin);

    _this = _super.call(this, options);

    _defineProperty(_assertThisInitialized(_this), _Symbol$toStringTag$6, 'Plugin');

    return _this;
  }

  _createClass(Plugin, [{
    key: "init",
    value: function init(_ref) {
      var request = _ref.request;
      return request.url;
    }
  }]);

  return Plugin;
}(Node);

var _Symbol$toStringTag$7;
_Symbol$toStringTag$7 = Symbol.toStringTag;

var Predicate = /*#__PURE__*/function (_Node) {
  _inherits(Predicate, _Node);

  var _super = _createSuper(Predicate);

  function Predicate() {
    var _this;

    _classCallCheck(this, Predicate);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), _Symbol$toStringTag$7, 'Predicate');

    return _this;
  }

  _createClass(Predicate, [{
    key: "shouldInitialize",
    value: function shouldInitialize(_ref) {
      var request = _ref.request;
      return !this.parent || this.parent[INITIALIZED] && this.predicate({
        request: request
      });
    }
  }, {
    key: "predicate",
    value: function predicate(_ref2) {
      var request = _ref2.request;
      throw new Error("Predicate class must contain a predicate method that returns a boolean");
    }
  }]);

  return Predicate;
}(Node);

var _Symbol$toStringTag$8;
_Symbol$toStringTag$8 = Symbol.toStringTag;

var Route = /*#__PURE__*/function (_Predicate) {
  _inherits(Route, _Predicate);

  var _super = _createSuper(Route);

  function Route(url) {
    var _this;

    var nodes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    _classCallCheck(this, Route);

    _this = _super.call(this, {
      url: url
    }, nodes);

    _defineProperty(_assertThisInitialized(_this), _Symbol$toStringTag$8, 'Route');

    return _this;
  }

  _createClass(Route, [{
    key: "predicate",
    value: function predicate(_ref) {
      var request = _ref.request;
      return this.parser.regex.test(request.pathname);
    }
  }, {
    key: "processHref",
    value: function processHref(_ref2) {
      var href = _ref2.href,
          regex = _ref2.regex,
          params = _ref2.params,
          keywords = _ref2.keywords,
          index = _ref2.index;
      var matches = href.match(regex);
      return !matches ? {} : index.reduce(function (acc, x, i) {
        return _objectSpread2({}, acc, _defineProperty({}, x, matches[i + 1]));
      }, {});
    }
  }, {
    key: "createNewRequest",
    value: function createNewRequest(_ref3) {
      var request = _ref3.request;
      var parser = regexify$1(this.config.url);
      var params = this.processHref(_objectSpread2({
        href: request.pathname
      }, parser));
      var search = queryString.parse(location.search.slice(1), {
        plainObjects: true
      });
      this.parser = parser;
      this.params = params;
      this.search = search;
      request.params = mergeDeepRight(request.params, params);
      return _objectSpread2({}, request, {
        params: _objectSpread2({}, request.params && request.params, {}, params),
        search: search
      });
    }
  }, {
    key: "decorateRequest",
    value: function decorateRequest(_ref4) {
      var request = _ref4.request;
      this.parser = regexify$1(this.config.url);
      this.params = this.processHref(_objectSpread2({
        href: request.pathname
      }, this.parser));
      request.combineParams({
        params: this.params
      });
      return request;
    }
  }, {
    key: "runInit",
    value: function runInit(_ref5) {
      var request = _ref5.request;
      return _get(_getPrototypeOf(Route.prototype), "runInit", this).call(this, {
        request: this.decorateRequest({
          request: request
        })
      });
    }
  }, {
    key: "runPopstate",
    value: function runPopstate(_ref6) {
      var request = _ref6.request;
      return _get(_getPrototypeOf(Route.prototype), "runPopstate", this).call(this, {
        request: this.decorateRequest({
          request: request
        })
      });
    }
  }, {
    key: "info",
    value: function info(method) {
      var plugin = this.constructor.plugin;

      if (this.magna.debug && (typeof plugin === 'undefined' || plugin.debug === true)) {
        var _console;

        plugin = plugin || {
          debug: true,
          color: '#777'
        };
        console.groupCollapsed("%c%s %c%s", 'color:#aaa', pad(10, this[Symbol.toStringTag]), "color: ".concat(plugin.color), "".concat(this.constructor.name, "::").concat(method), this.config.url);

        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        (_console = console).log.apply(_console, [this].concat(args));

        console.groupEnd();
      }
    }
  }]);

  return Route;
}(Predicate);

_defineProperty(Route, "plugin", {
  color: '#A82DFF',
  debug: true
});

var _Symbol$toStringTag$9;
_Symbol$toStringTag$9 = Symbol.toStringTag;

var Singleton = /*#__PURE__*/function (_Node) {
  _inherits(Singleton, _Node);

  var _super = _createSuper(Singleton);

  function Singleton(options) {
    var _this;

    _classCallCheck(this, Singleton);

    _this = _super.call(this, options);

    _defineProperty(_assertThisInitialized(_this), _Symbol$toStringTag$9, 'Singleton');

    _defineProperty(_assertThisInitialized(_this), "initialized", false);

    return _this;
  }

  _createClass(Singleton, [{
    key: "shouldInitialize",
    value: function shouldInitialize(_ref) {
      var request = _ref.request;
      if (this.initialized) return false;
      return this.initialized = true;
    }
  }, {
    key: "init",
    value: function init(_ref2) {
      var request = _ref2.request;
      return request.url;
    }
  }]);

  return Singleton;
}(Node);

var _Symbol$toStringTag$a;
_Symbol$toStringTag$a = Symbol.toStringTag;
var ElementExists = /*#__PURE__*/function (_Predicate) {
  _inherits(ElementExists, _Predicate);

  var _super = _createSuper(ElementExists);

  function ElementExists(selector, nodes) {
    var _this;

    _classCallCheck(this, ElementExists);

    _this = _super.call(this, {
      selector: selector
    }, nodes);

    _defineProperty(_assertThisInitialized(_this), _Symbol$toStringTag$a, 'ElementExists');

    return _this;
  }

  _createClass(ElementExists, [{
    key: "predicate",
    value: function predicate(_ref) {
      var request = _ref.request;
      return !!document.querySelector(this.config.selector);
    }
  }]);

  return ElementExists;
}(Predicate);
var elementExists = (function (selector, nodes) {
  return new ElementExists(selector, nodes);
});

var One = /*#__PURE__*/function (_Node) {
  _inherits(One, _Node);

  var _super = _createSuper(One);

  function One(event, target, nodes) {
    var _this;

    _classCallCheck(this, One);

    _this = _super.call(this, {
      event: event,
      target: target
    }, nodes);

    _target.set(_assertThisInitialized(_this), {
      writable: true,
      value: null
    });

    _callback.set(_assertThisInitialized(_this), {
      writable: true,
      value: null
    });

    return _this;
  }

  _createClass(One, [{
    key: "runInit",
    value: function runInit(_ref) {
      var _this2 = this;

      var request = _ref.request;
      this[INITIALIZED] = true;

      _classPrivateFieldSet(this, _target, document.querySelector(this.config.target));

      _classPrivateFieldGet(this, _target).addEventListener(this.config.event, _classPrivateFieldSet(this, _callback, function (e) {
        _classPrivateFieldGet(_this2, _target).removeEventListener(_this2.config.event, _classPrivateFieldGet(_this2, _callback));

        _get(_getPrototypeOf(One.prototype), "runInit", _this2).call(_this2, {
          request: request
        });
      }));
    }
  }, {
    key: "runDestroy",
    value: function runDestroy(_ref2) {
      var request = _ref2.request;

      _classPrivateFieldGet(this, _target).removeEventListener(this.config.event, _classPrivateFieldGet(this, _callback));

      return _get(_getPrototypeOf(One.prototype), "runDestroy", this).call(this, {
        request: request
      });
    }
  }]);

  return One;
}(Node);

var _target = new WeakMap();

var _callback = new WeakMap();

var one = (function (target, event, nodes) {
  return new One(target, event, nodes);
});

var OnlyOnRouteChange = /*#__PURE__*/function (_Node) {
  _inherits(OnlyOnRouteChange, _Node);

  var _super = _createSuper(OnlyOnRouteChange);

  function OnlyOnRouteChange(pattern, nodes) {
    var _this;

    _classCallCheck(this, OnlyOnRouteChange);

    _this = _super.call(this, pattern, nodes);
    _this.nodes = nodes;
    _this.pattern = pattern;
    _this.regex = regexify(pattern);
    return _this;
  }

  _createClass(OnlyOnRouteChange, [{
    key: "initNodes",
    value: function initNodes(_ref) {
      var request = _ref.request;

      if (this.regex.test(request.prev) !== this.regex.test(request.pathname)) {
        return _get(_getPrototypeOf(OnlyOnRouteChange.prototype), "initNodes", this).call(this, {
          request: request
        });
      }

      return Promise.resolve('OnlyOnRouteChange:same-url');
    }
  }, {
    key: "initDestroy",
    value: function initDestroy(_ref2) {
      var request = _ref2.request;

      if (this.regex.test(request.prev) !== this.regex.test(request.pathname)) {
        return _get(_getPrototypeOf(OnlyOnRouteChange.prototype), "initDestroy", this).call(this, {
          request: request
        });
      }

      return Promise.resolve('OnlyOnRouteChange:same-url');
    }
  }]);

  return OnlyOnRouteChange;
}(Node);
var onlyOnRouteChange = (function (url, nodes) {
  return new OnlyOnRouteChange(url, nodes);
});

var route = (function (url, nodes) {
  return new Route(url, nodes);
});

var Subscribe = /*#__PURE__*/function (_Node) {
  _inherits(Subscribe, _Node);

  var _super = _createSuper(Subscribe);

  function Subscribe(event, nodes) {
    _classCallCheck(this, Subscribe);

    return _super.call(this, {
      event: event
    }, nodes);
  }

  _createClass(Subscribe, [{
    key: "runInit",
    value: function runInit(_ref) {
      var _this = this;

      var request = _ref.request;
      this[INITIALIZED] = true;
      this.subscribe(this.config.event, this.__onEvent = function (e) {
        _this.unsubscribe(_this.config.event, _this.__onEvent);

        _get(_getPrototypeOf(Subscribe.prototype), "runInit", _this).call(_this, {
          request: request
        });
      });
    }
  }, {
    key: "runDestroy",
    value: function runDestroy(_ref2) {
      var request = _ref2.request;
      this.unsubscribe(this.config.event, this.__onEvent);

      _get(_getPrototypeOf(Subscribe.prototype), "runDestroy", this).call(this, {
        request: request
      });
    }
  }]);

  return Subscribe;
}(Node);
var subscribe = (function (target, event, nodes) {
  return new Subscribe(target, event, nodes);
});

console.log('test!!!!!!');

exports.ElementExists = ElementExists;
exports.ExtendablePlugin = ExtendablePlugin;
exports.Import = Import;
exports.Lazy = Lazy;
exports.Magna = Magna;
exports.Module = Module;
exports.Node = Node;
exports.One = One;
exports.OnlyOnRouteChange = OnlyOnRouteChange;
exports.Plugin = Plugin;
exports.Predicate = Predicate;
exports.Route = Route;
exports.Singleton = Singleton;
exports.State = State;
exports.Subscribe = Subscribe;
exports.combineUrlParams = combineUrlParams;
exports.debounce = debounce;
exports.default = Magna;
exports.elementExists = elementExists;
exports.log = log;
exports.logAction = logAction;
exports.logRoute = logRoute;
exports.mergeDeepRight = mergeDeepRight;
exports.one = one;
exports.onlyOnRouteChange = onlyOnRouteChange;
exports.pad = pad;
exports.prettify = prettify;
exports.radioClass = radioClass;
exports.regexify = regexify$1;
exports.route = route;
exports.subscribe = subscribe;
exports.tap = tap;
exports.trace = trace;
exports.uglify = uglify;
//# sourceMappingURL=magna.common.js.map
