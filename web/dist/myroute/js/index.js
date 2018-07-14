webpackJsonp([1,7],[
/* 0 */
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
/* 1 */,
/* 2 */
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
/* 3 */
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
/* 4 */
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__i18next_js__ = __webpack_require__(10);


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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(19).default;


/***/ }),
/* 6 */
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
/* 7 */
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

//操作指令对应表
var operation_command = {
    "1": "Create New Route",
    "2": "Create Merge Route",
    "3": "Rename Route",
    "4": "Change Description",
    "5": "Add Language",
    "6": "Subside Language",
    "7": "Change Stops Translation",
    "8": "Clone Route",
    "9": "Download XML File",
    "10": "Delete Route",
    "11": "Add Company Stop",
    "12": "Add Route Stop",
    "13": "Delete Route Stop",
    "14": "Sortable Route Stop",
    "15": "Save Stop Information",
    "16": "Change Stop Information",
    "17": "Delete Company Stop"
};

module.exports = {
    login_url: login_url,
    countries: countries,
    server_ip: server_ip,
    operation_command: operation_command
};

/***/ }),
/* 8 */
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

/***/ }),
/* 9 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__logger_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__EventEmitter_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ResourceStore_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Translator_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__LanguageUtils_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__PluralResolver_js__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Interpolator_js__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__BackendConnector_js__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__CacheConnector_js__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__defaults_js__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__postProcessor_js__ = __webpack_require__(8);
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
/* 11 */
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
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__logger_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__EventEmitter_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__postProcessor_js__ = __webpack_require__(8);
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
/* 13 */
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
/* 14 */
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
/* 15 */
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
/* 16 */
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
/* 17 */
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
/* 18 */
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
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(20);

var utils = _interopRequireWildcard(_utils);

var _ajax = __webpack_require__(21);

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
/* 20 */
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
/* 21 */
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
/* 22 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 23 */
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
/* 24 */
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
/* 25 */
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

//时间格式转换

/**获取数据库xml数据
 * page 从第几页
 * nums_limit  每页限制多少数量
 * first_load  是否是第一次请求，第一次请求会返回磁盘信息
 * filename xml文件名
 * **/
//字节转换
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
//分页使用
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
        var route_name = $(this).parent().siblings('th.filename').find('span').text();
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
                        xml_id: xml_id,
                        route_name: route_name
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
        //$chosen_i.removeClass('route_icon-xuanzhong'); //删除选中样式
        var route_name = $('#language_table tbody tr:eq(0) th:eq(1)').text(); //路线名称
        $('#myModal').modal('hide'); //隐藏模态框
        var language_len = $('#choose_language .language_box ul.chosen li.language').length;
        $.ajax({
            url: '/myroute/delete/language',
            type: 'post',
            data: {
                xml_id: xml_id,
                jianchen: jianchen,
                stations: stations,
                route_name: route_name,
                language_num: language_len - 1, //语言数目
                languages_arr: languages_arr.join(',')
            },
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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(24)))

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = __webpack_require__(78);
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome
               && 'undefined' != typeof chrome.storage
                  ? chrome.storage.local
                  : localstorage();

/**
 * Colors.
 */

exports.colors = [
  '#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC',
  '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF',
  '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC',
  '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF',
  '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC',
  '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033',
  '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366',
  '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933',
  '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC',
  '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF',
  '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
    return true;
  }

  // Internet Explorer and Edge do not support colors.
  if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
    return false;
  }

  // is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
  return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
    // is firebug? http://stackoverflow.com/a/398120/376773
    (typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
    // is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
    // double check webkit in userAgent just in case we are in a worker
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function(v) {
  try {
    return JSON.stringify(v);
  } catch (err) {
    return '[UnexpectedJSONParseError]: ' + err.message;
  }
};


/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '')
    + this.namespace
    + (useColors ? ' %c' : ' ')
    + args[0]
    + (useColors ? '%c ' : ' ')
    + '+' + exports.humanize(this.diff);

  if (!useColors) return;

  var c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit')

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, function(match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === typeof console
    && console.log
    && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch(e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = exports.storage.debug;
  } catch(e) {}

  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = process.env.DEBUG;
  }

  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
  try {
    return window.localStorage;
  } catch (e) {}
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(42)))

/***/ }),
/* 27 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Expose `Emitter`.
 */

if (true) {
  module.exports = Emitter;
}

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  function on() {
    this.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks['$' + event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks['$' + event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1)
    , callbacks = this._callbacks['$' + event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks['$' + event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * Module dependencies.
 */

var keys = __webpack_require__(85);
var hasBinary = __webpack_require__(61);
var sliceBuffer = __webpack_require__(90);
var after = __webpack_require__(91);
var utf8 = __webpack_require__(92);

var base64encoder;
if (global && global.ArrayBuffer) {
  base64encoder = __webpack_require__(93);
}

/**
 * Check if we are running an android browser. That requires us to use
 * ArrayBuffer with polling transports...
 *
 * http://ghinda.net/jpeg-blob-ajax-android/
 */

var isAndroid = typeof navigator !== 'undefined' && /Android/i.test(navigator.userAgent);

/**
 * Check if we are running in PhantomJS.
 * Uploading a Blob with PhantomJS does not work correctly, as reported here:
 * https://github.com/ariya/phantomjs/issues/11395
 * @type boolean
 */
var isPhantomJS = typeof navigator !== 'undefined' && /PhantomJS/i.test(navigator.userAgent);

/**
 * When true, avoids using Blobs to encode payloads.
 * @type boolean
 */
var dontSendBlobs = isAndroid || isPhantomJS;

/**
 * Current protocol version.
 */

exports.protocol = 3;

/**
 * Packet types.
 */

var packets = exports.packets = {
    open:     0    // non-ws
  , close:    1    // non-ws
  , ping:     2
  , pong:     3
  , message:  4
  , upgrade:  5
  , noop:     6
};

var packetslist = keys(packets);

/**
 * Premade error packet.
 */

var err = { type: 'error', data: 'parser error' };

/**
 * Create a blob api even for blob builder when vendor prefixes exist
 */

var Blob = __webpack_require__(94);

/**
 * Encodes a packet.
 *
 *     <packet type id> [ <data> ]
 *
 * Example:
 *
 *     5hello world
 *     3
 *     4
 *
 * Binary is encoded in an identical principle
 *
 * @api private
 */

exports.encodePacket = function (packet, supportsBinary, utf8encode, callback) {
  if (typeof supportsBinary === 'function') {
    callback = supportsBinary;
    supportsBinary = false;
  }

  if (typeof utf8encode === 'function') {
    callback = utf8encode;
    utf8encode = null;
  }

  var data = (packet.data === undefined)
    ? undefined
    : packet.data.buffer || packet.data;

  if (global.ArrayBuffer && data instanceof ArrayBuffer) {
    return encodeArrayBuffer(packet, supportsBinary, callback);
  } else if (Blob && data instanceof global.Blob) {
    return encodeBlob(packet, supportsBinary, callback);
  }

  // might be an object with { base64: true, data: dataAsBase64String }
  if (data && data.base64) {
    return encodeBase64Object(packet, callback);
  }

  // Sending data as a utf-8 string
  var encoded = packets[packet.type];

  // data fragment is optional
  if (undefined !== packet.data) {
    encoded += utf8encode ? utf8.encode(String(packet.data), { strict: false }) : String(packet.data);
  }

  return callback('' + encoded);

};

function encodeBase64Object(packet, callback) {
  // packet data is an object { base64: true, data: dataAsBase64String }
  var message = 'b' + exports.packets[packet.type] + packet.data.data;
  return callback(message);
}

/**
 * Encode packet helpers for binary types
 */

function encodeArrayBuffer(packet, supportsBinary, callback) {
  if (!supportsBinary) {
    return exports.encodeBase64Packet(packet, callback);
  }

  var data = packet.data;
  var contentArray = new Uint8Array(data);
  var resultBuffer = new Uint8Array(1 + data.byteLength);

  resultBuffer[0] = packets[packet.type];
  for (var i = 0; i < contentArray.length; i++) {
    resultBuffer[i+1] = contentArray[i];
  }

  return callback(resultBuffer.buffer);
}

function encodeBlobAsArrayBuffer(packet, supportsBinary, callback) {
  if (!supportsBinary) {
    return exports.encodeBase64Packet(packet, callback);
  }

  var fr = new FileReader();
  fr.onload = function() {
    packet.data = fr.result;
    exports.encodePacket(packet, supportsBinary, true, callback);
  };
  return fr.readAsArrayBuffer(packet.data);
}

function encodeBlob(packet, supportsBinary, callback) {
  if (!supportsBinary) {
    return exports.encodeBase64Packet(packet, callback);
  }

  if (dontSendBlobs) {
    return encodeBlobAsArrayBuffer(packet, supportsBinary, callback);
  }

  var length = new Uint8Array(1);
  length[0] = packets[packet.type];
  var blob = new Blob([length.buffer, packet.data]);

  return callback(blob);
}

/**
 * Encodes a packet with binary data in a base64 string
 *
 * @param {Object} packet, has `type` and `data`
 * @return {String} base64 encoded message
 */

exports.encodeBase64Packet = function(packet, callback) {
  var message = 'b' + exports.packets[packet.type];
  if (Blob && packet.data instanceof global.Blob) {
    var fr = new FileReader();
    fr.onload = function() {
      var b64 = fr.result.split(',')[1];
      callback(message + b64);
    };
    return fr.readAsDataURL(packet.data);
  }

  var b64data;
  try {
    b64data = String.fromCharCode.apply(null, new Uint8Array(packet.data));
  } catch (e) {
    // iPhone Safari doesn't let you apply with typed arrays
    var typed = new Uint8Array(packet.data);
    var basic = new Array(typed.length);
    for (var i = 0; i < typed.length; i++) {
      basic[i] = typed[i];
    }
    b64data = String.fromCharCode.apply(null, basic);
  }
  message += global.btoa(b64data);
  return callback(message);
};

/**
 * Decodes a packet. Changes format to Blob if requested.
 *
 * @return {Object} with `type` and `data` (if any)
 * @api private
 */

exports.decodePacket = function (data, binaryType, utf8decode) {
  if (data === undefined) {
    return err;
  }
  // String data
  if (typeof data === 'string') {
    if (data.charAt(0) === 'b') {
      return exports.decodeBase64Packet(data.substr(1), binaryType);
    }

    if (utf8decode) {
      data = tryDecode(data);
      if (data === false) {
        return err;
      }
    }
    var type = data.charAt(0);

    if (Number(type) != type || !packetslist[type]) {
      return err;
    }

    if (data.length > 1) {
      return { type: packetslist[type], data: data.substring(1) };
    } else {
      return { type: packetslist[type] };
    }
  }

  var asArray = new Uint8Array(data);
  var type = asArray[0];
  var rest = sliceBuffer(data, 1);
  if (Blob && binaryType === 'blob') {
    rest = new Blob([rest]);
  }
  return { type: packetslist[type], data: rest };
};

function tryDecode(data) {
  try {
    data = utf8.decode(data, { strict: false });
  } catch (e) {
    return false;
  }
  return data;
}

/**
 * Decodes a packet encoded in a base64 string
 *
 * @param {String} base64 encoded message
 * @return {Object} with `type` and `data` (if any)
 */

exports.decodeBase64Packet = function(msg, binaryType) {
  var type = packetslist[msg.charAt(0)];
  if (!base64encoder) {
    return { type: type, data: { base64: true, data: msg.substr(1) } };
  }

  var data = base64encoder.decode(msg.substr(1));

  if (binaryType === 'blob' && Blob) {
    data = new Blob([data]);
  }

  return { type: type, data: data };
};

/**
 * Encodes multiple messages (payload).
 *
 *     <length>:data
 *
 * Example:
 *
 *     11:hello world2:hi
 *
 * If any contents are binary, they will be encoded as base64 strings. Base64
 * encoded strings are marked with a b before the length specifier
 *
 * @param {Array} packets
 * @api private
 */

exports.encodePayload = function (packets, supportsBinary, callback) {
  if (typeof supportsBinary === 'function') {
    callback = supportsBinary;
    supportsBinary = null;
  }

  var isBinary = hasBinary(packets);

  if (supportsBinary && isBinary) {
    if (Blob && !dontSendBlobs) {
      return exports.encodePayloadAsBlob(packets, callback);
    }

    return exports.encodePayloadAsArrayBuffer(packets, callback);
  }

  if (!packets.length) {
    return callback('0:');
  }

  function setLengthHeader(message) {
    return message.length + ':' + message;
  }

  function encodeOne(packet, doneCallback) {
    exports.encodePacket(packet, !isBinary ? false : supportsBinary, false, function(message) {
      doneCallback(null, setLengthHeader(message));
    });
  }

  map(packets, encodeOne, function(err, results) {
    return callback(results.join(''));
  });
};

/**
 * Async array map using after
 */

function map(ary, each, done) {
  var result = new Array(ary.length);
  var next = after(ary.length, done);

  var eachWithIndex = function(i, el, cb) {
    each(el, function(error, msg) {
      result[i] = msg;
      cb(error, result);
    });
  };

  for (var i = 0; i < ary.length; i++) {
    eachWithIndex(i, ary[i], next);
  }
}

/*
 * Decodes data when a payload is maybe expected. Possible binary contents are
 * decoded from their base64 representation
 *
 * @param {String} data, callback method
 * @api public
 */

exports.decodePayload = function (data, binaryType, callback) {
  if (typeof data !== 'string') {
    return exports.decodePayloadAsBinary(data, binaryType, callback);
  }

  if (typeof binaryType === 'function') {
    callback = binaryType;
    binaryType = null;
  }

  var packet;
  if (data === '') {
    // parser error - ignoring payload
    return callback(err, 0, 1);
  }

  var length = '', n, msg;

  for (var i = 0, l = data.length; i < l; i++) {
    var chr = data.charAt(i);

    if (chr !== ':') {
      length += chr;
      continue;
    }

    if (length === '' || (length != (n = Number(length)))) {
      // parser error - ignoring payload
      return callback(err, 0, 1);
    }

    msg = data.substr(i + 1, n);

    if (length != msg.length) {
      // parser error - ignoring payload
      return callback(err, 0, 1);
    }

    if (msg.length) {
      packet = exports.decodePacket(msg, binaryType, false);

      if (err.type === packet.type && err.data === packet.data) {
        // parser error in individual packet - ignoring payload
        return callback(err, 0, 1);
      }

      var ret = callback(packet, i + n, l);
      if (false === ret) return;
    }

    // advance cursor
    i += n;
    length = '';
  }

  if (length !== '') {
    // parser error - ignoring payload
    return callback(err, 0, 1);
  }

};

/**
 * Encodes multiple messages (payload) as binary.
 *
 * <1 = binary, 0 = string><number from 0-9><number from 0-9>[...]<number
 * 255><data>
 *
 * Example:
 * 1 3 255 1 2 3, if the binary contents are interpreted as 8 bit integers
 *
 * @param {Array} packets
 * @return {ArrayBuffer} encoded payload
 * @api private
 */

exports.encodePayloadAsArrayBuffer = function(packets, callback) {
  if (!packets.length) {
    return callback(new ArrayBuffer(0));
  }

  function encodeOne(packet, doneCallback) {
    exports.encodePacket(packet, true, true, function(data) {
      return doneCallback(null, data);
    });
  }

  map(packets, encodeOne, function(err, encodedPackets) {
    var totalLength = encodedPackets.reduce(function(acc, p) {
      var len;
      if (typeof p === 'string'){
        len = p.length;
      } else {
        len = p.byteLength;
      }
      return acc + len.toString().length + len + 2; // string/binary identifier + separator = 2
    }, 0);

    var resultArray = new Uint8Array(totalLength);

    var bufferIndex = 0;
    encodedPackets.forEach(function(p) {
      var isString = typeof p === 'string';
      var ab = p;
      if (isString) {
        var view = new Uint8Array(p.length);
        for (var i = 0; i < p.length; i++) {
          view[i] = p.charCodeAt(i);
        }
        ab = view.buffer;
      }

      if (isString) { // not true binary
        resultArray[bufferIndex++] = 0;
      } else { // true binary
        resultArray[bufferIndex++] = 1;
      }

      var lenStr = ab.byteLength.toString();
      for (var i = 0; i < lenStr.length; i++) {
        resultArray[bufferIndex++] = parseInt(lenStr[i]);
      }
      resultArray[bufferIndex++] = 255;

      var view = new Uint8Array(ab);
      for (var i = 0; i < view.length; i++) {
        resultArray[bufferIndex++] = view[i];
      }
    });

    return callback(resultArray.buffer);
  });
};

/**
 * Encode as Blob
 */

exports.encodePayloadAsBlob = function(packets, callback) {
  function encodeOne(packet, doneCallback) {
    exports.encodePacket(packet, true, true, function(encoded) {
      var binaryIdentifier = new Uint8Array(1);
      binaryIdentifier[0] = 1;
      if (typeof encoded === 'string') {
        var view = new Uint8Array(encoded.length);
        for (var i = 0; i < encoded.length; i++) {
          view[i] = encoded.charCodeAt(i);
        }
        encoded = view.buffer;
        binaryIdentifier[0] = 0;
      }

      var len = (encoded instanceof ArrayBuffer)
        ? encoded.byteLength
        : encoded.size;

      var lenStr = len.toString();
      var lengthAry = new Uint8Array(lenStr.length + 1);
      for (var i = 0; i < lenStr.length; i++) {
        lengthAry[i] = parseInt(lenStr[i]);
      }
      lengthAry[lenStr.length] = 255;

      if (Blob) {
        var blob = new Blob([binaryIdentifier.buffer, lengthAry.buffer, encoded]);
        doneCallback(null, blob);
      }
    });
  }

  map(packets, encodeOne, function(err, results) {
    return callback(new Blob(results));
  });
};

/*
 * Decodes data when a payload is maybe expected. Strings are decoded by
 * interpreting each byte as a key code for entries marked to start with 0. See
 * description of encodePayloadAsBinary
 *
 * @param {ArrayBuffer} data, callback method
 * @api public
 */

exports.decodePayloadAsBinary = function (data, binaryType, callback) {
  if (typeof binaryType === 'function') {
    callback = binaryType;
    binaryType = null;
  }

  var bufferTail = data;
  var buffers = [];

  while (bufferTail.byteLength > 0) {
    var tailArray = new Uint8Array(bufferTail);
    var isString = tailArray[0] === 0;
    var msgLength = '';

    for (var i = 1; ; i++) {
      if (tailArray[i] === 255) break;

      // 310 = char length of Number.MAX_VALUE
      if (msgLength.length > 310) {
        return callback(err, 0, 1);
      }

      msgLength += tailArray[i];
    }

    bufferTail = sliceBuffer(bufferTail, 2 + msgLength.length);
    msgLength = parseInt(msgLength);

    var msg = sliceBuffer(bufferTail, 0, msgLength);
    if (isString) {
      try {
        msg = String.fromCharCode.apply(null, new Uint8Array(msg));
      } catch (e) {
        // iPhone Safari doesn't let you apply to typed arrays
        var typed = new Uint8Array(msg);
        msg = '';
        for (var i = 0; i < typed.length; i++) {
          msg += String.fromCharCode(typed[i]);
        }
      }
    }

    buffers.push(msg);
    bufferTail = sliceBuffer(bufferTail, msgLength);
  }

  var total = buffers.length;
  buffers.forEach(function(buffer, i) {
    callback(exports.decodePacket(buffer, binaryType, true), i, total);
  });
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)))

/***/ }),
/* 30 */,
/* 31 */
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
/* 32 */,
/* 33 */,
/* 34 */
/***/ (function(module, exports) {

/**
 * Compiles a querystring
 * Returns string representation of the object
 *
 * @param {Object}
 * @api private
 */

exports.encode = function (obj) {
  var str = '';

  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      if (str.length) str += '&';
      str += encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]);
    }
  }

  return str;
};

/**
 * Parses a simple querystring into an object
 *
 * @param {String} qs
 * @api private
 */

exports.decode = function(qs){
  var qry = {};
  var pairs = qs.split('&');
  for (var i = 0, l = pairs.length; i < l; i++) {
    var pair = pairs[i].split('=');
    qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
  }
  return qry;
};


/***/ }),
/* 35 */
/***/ (function(module, exports) {


module.exports = function(a, b){
  var fn = function(){};
  fn.prototype = b.prototype;
  a.prototype = new fn;
  a.prototype.constructor = a;
};

/***/ }),
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Module dependencies.
 */

var debug = __webpack_require__(26)('socket.io-parser');
var Emitter = __webpack_require__(28);
var binary = __webpack_require__(80);
var isArray = __webpack_require__(44);
var isBuf = __webpack_require__(57);

/**
 * Protocol version.
 *
 * @api public
 */

exports.protocol = 4;

/**
 * Packet types.
 *
 * @api public
 */

exports.types = [
  'CONNECT',
  'DISCONNECT',
  'EVENT',
  'ACK',
  'ERROR',
  'BINARY_EVENT',
  'BINARY_ACK'
];

/**
 * Packet type `connect`.
 *
 * @api public
 */

exports.CONNECT = 0;

/**
 * Packet type `disconnect`.
 *
 * @api public
 */

exports.DISCONNECT = 1;

/**
 * Packet type `event`.
 *
 * @api public
 */

exports.EVENT = 2;

/**
 * Packet type `ack`.
 *
 * @api public
 */

exports.ACK = 3;

/**
 * Packet type `error`.
 *
 * @api public
 */

exports.ERROR = 4;

/**
 * Packet type 'binary event'
 *
 * @api public
 */

exports.BINARY_EVENT = 5;

/**
 * Packet type `binary ack`. For acks with binary arguments.
 *
 * @api public
 */

exports.BINARY_ACK = 6;

/**
 * Encoder constructor.
 *
 * @api public
 */

exports.Encoder = Encoder;

/**
 * Decoder constructor.
 *
 * @api public
 */

exports.Decoder = Decoder;

/**
 * A socket.io Encoder instance
 *
 * @api public
 */

function Encoder() {}

var ERROR_PACKET = exports.ERROR + '"encode error"';

/**
 * Encode a packet as a single string if non-binary, or as a
 * buffer sequence, depending on packet type.
 *
 * @param {Object} obj - packet object
 * @param {Function} callback - function to handle encodings (likely engine.write)
 * @return Calls callback with Array of encodings
 * @api public
 */

Encoder.prototype.encode = function(obj, callback){
  debug('encoding packet %j', obj);

  if (exports.BINARY_EVENT === obj.type || exports.BINARY_ACK === obj.type) {
    encodeAsBinary(obj, callback);
  } else {
    var encoding = encodeAsString(obj);
    callback([encoding]);
  }
};

/**
 * Encode packet as string.
 *
 * @param {Object} packet
 * @return {String} encoded
 * @api private
 */

function encodeAsString(obj) {

  // first is type
  var str = '' + obj.type;

  // attachments if we have them
  if (exports.BINARY_EVENT === obj.type || exports.BINARY_ACK === obj.type) {
    str += obj.attachments + '-';
  }

  // if we have a namespace other than `/`
  // we append it followed by a comma `,`
  if (obj.nsp && '/' !== obj.nsp) {
    str += obj.nsp + ',';
  }

  // immediately followed by the id
  if (null != obj.id) {
    str += obj.id;
  }

  // json data
  if (null != obj.data) {
    var payload = tryStringify(obj.data);
    if (payload !== false) {
      str += payload;
    } else {
      return ERROR_PACKET;
    }
  }

  debug('encoded %j as %s', obj, str);
  return str;
}

function tryStringify(str) {
  try {
    return JSON.stringify(str);
  } catch(e){
    return false;
  }
}

/**
 * Encode packet as 'buffer sequence' by removing blobs, and
 * deconstructing packet into object with placeholders and
 * a list of buffers.
 *
 * @param {Object} packet
 * @return {Buffer} encoded
 * @api private
 */

function encodeAsBinary(obj, callback) {

  function writeEncoding(bloblessData) {
    var deconstruction = binary.deconstructPacket(bloblessData);
    var pack = encodeAsString(deconstruction.packet);
    var buffers = deconstruction.buffers;

    buffers.unshift(pack); // add packet info to beginning of data list
    callback(buffers); // write all the buffers
  }

  binary.removeBlobs(obj, writeEncoding);
}

/**
 * A socket.io Decoder instance
 *
 * @return {Object} decoder
 * @api public
 */

function Decoder() {
  this.reconstructor = null;
}

/**
 * Mix in `Emitter` with Decoder.
 */

Emitter(Decoder.prototype);

/**
 * Decodes an ecoded packet string into packet JSON.
 *
 * @param {String} obj - encoded packet
 * @return {Object} packet
 * @api public
 */

Decoder.prototype.add = function(obj) {
  var packet;
  if (typeof obj === 'string') {
    packet = decodeString(obj);
    if (exports.BINARY_EVENT === packet.type || exports.BINARY_ACK === packet.type) { // binary packet's json
      this.reconstructor = new BinaryReconstructor(packet);

      // no attachments, labeled binary but no binary data to follow
      if (this.reconstructor.reconPack.attachments === 0) {
        this.emit('decoded', packet);
      }
    } else { // non-binary full packet
      this.emit('decoded', packet);
    }
  }
  else if (isBuf(obj) || obj.base64) { // raw binary data
    if (!this.reconstructor) {
      throw new Error('got binary data when not reconstructing a packet');
    } else {
      packet = this.reconstructor.takeBinaryData(obj);
      if (packet) { // received final buffer
        this.reconstructor = null;
        this.emit('decoded', packet);
      }
    }
  }
  else {
    throw new Error('Unknown type: ' + obj);
  }
};

/**
 * Decode a packet String (JSON data)
 *
 * @param {String} str
 * @return {Object} packet
 * @api private
 */

function decodeString(str) {
  var i = 0;
  // look up type
  var p = {
    type: Number(str.charAt(0))
  };

  if (null == exports.types[p.type]) {
    return error('unknown packet type ' + p.type);
  }

  // look up attachments if type binary
  if (exports.BINARY_EVENT === p.type || exports.BINARY_ACK === p.type) {
    var buf = '';
    while (str.charAt(++i) !== '-') {
      buf += str.charAt(i);
      if (i == str.length) break;
    }
    if (buf != Number(buf) || str.charAt(i) !== '-') {
      throw new Error('Illegal attachments');
    }
    p.attachments = Number(buf);
  }

  // look up namespace (if any)
  if ('/' === str.charAt(i + 1)) {
    p.nsp = '';
    while (++i) {
      var c = str.charAt(i);
      if (',' === c) break;
      p.nsp += c;
      if (i === str.length) break;
    }
  } else {
    p.nsp = '/';
  }

  // look up id
  var next = str.charAt(i + 1);
  if ('' !== next && Number(next) == next) {
    p.id = '';
    while (++i) {
      var c = str.charAt(i);
      if (null == c || Number(c) != c) {
        --i;
        break;
      }
      p.id += str.charAt(i);
      if (i === str.length) break;
    }
    p.id = Number(p.id);
  }

  // look up json data
  if (str.charAt(++i)) {
    var payload = tryParse(str.substr(i));
    var isPayloadValid = payload !== false && (p.type === exports.ERROR || isArray(payload));
    if (isPayloadValid) {
      p.data = payload;
    } else {
      return error('invalid payload');
    }
  }

  debug('decoded %s as %j', str, p);
  return p;
}

function tryParse(str) {
  try {
    return JSON.parse(str);
  } catch(e){
    return false;
  }
}

/**
 * Deallocates a parser's resources
 *
 * @api public
 */

Decoder.prototype.destroy = function() {
  if (this.reconstructor) {
    this.reconstructor.finishedReconstruction();
  }
};

/**
 * A manager of a binary event's 'buffer sequence'. Should
 * be constructed whenever a packet of type BINARY_EVENT is
 * decoded.
 *
 * @param {Object} packet
 * @return {BinaryReconstructor} initialized reconstructor
 * @api private
 */

function BinaryReconstructor(packet) {
  this.reconPack = packet;
  this.buffers = [];
}

/**
 * Method to be called when binary data received from connection
 * after a BINARY_EVENT packet.
 *
 * @param {Buffer | ArrayBuffer} binData - the raw binary data received
 * @return {null | Object} returns null if more binary data is expected or
 *   a reconstructed packet object if all buffers have been received.
 * @api private
 */

BinaryReconstructor.prototype.takeBinaryData = function(binData) {
  this.buffers.push(binData);
  if (this.buffers.length === this.reconPack.attachments) { // done with buffer list
    var packet = binary.reconstructPacket(this.reconPack, this.buffers);
    this.finishedReconstruction();
    return packet;
  }
  return null;
};

/**
 * Cleans up binary packet reconstruction variables.
 *
 * @api private
 */

BinaryReconstructor.prototype.finishedReconstruction = function() {
  this.reconPack = null;
  this.buffers = [];
};

function error(msg) {
  return {
    type: exports.ERROR,
    data: 'parser error: ' + msg
  };
}


/***/ }),
/* 44 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {// browser shim for xmlhttprequest module

var hasCORS = __webpack_require__(83);

module.exports = function (opts) {
  var xdomain = opts.xdomain;

  // scheme must be same when usign XDomainRequest
  // http://blogs.msdn.com/b/ieinternals/archive/2010/05/13/xdomainrequest-restrictions-limitations-and-workarounds.aspx
  var xscheme = opts.xscheme;

  // XDomainRequest has a flow of not sending cookie, therefore it should be disabled as a default.
  // https://github.com/Automattic/engine.io-client/pull/217
  var enablesXDR = opts.enablesXDR;

  // XMLHttpRequest can be disabled on IE
  try {
    if ('undefined' !== typeof XMLHttpRequest && (!xdomain || hasCORS)) {
      return new XMLHttpRequest();
    }
  } catch (e) { }

  // Use XDomainRequest for IE8 if enablesXDR is true
  // because loading bar keeps flashing when using jsonp-polling
  // https://github.com/yujiosaka/socke.io-ie8-loading-example
  try {
    if ('undefined' !== typeof XDomainRequest && !xscheme && enablesXDR) {
      return new XDomainRequest();
    }
  } catch (e) { }

  if (!xdomain) {
    try {
      return new global[['Active'].concat('Object').join('X')]('Microsoft.XMLHTTP');
    } catch (e) { }
  }
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)))

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */

var parser = __webpack_require__(29);
var Emitter = __webpack_require__(28);

/**
 * Module exports.
 */

module.exports = Transport;

/**
 * Transport abstract constructor.
 *
 * @param {Object} options.
 * @api private
 */

function Transport (opts) {
  this.path = opts.path;
  this.hostname = opts.hostname;
  this.port = opts.port;
  this.secure = opts.secure;
  this.query = opts.query;
  this.timestampParam = opts.timestampParam;
  this.timestampRequests = opts.timestampRequests;
  this.readyState = '';
  this.agent = opts.agent || false;
  this.socket = opts.socket;
  this.enablesXDR = opts.enablesXDR;

  // SSL options for Node.js client
  this.pfx = opts.pfx;
  this.key = opts.key;
  this.passphrase = opts.passphrase;
  this.cert = opts.cert;
  this.ca = opts.ca;
  this.ciphers = opts.ciphers;
  this.rejectUnauthorized = opts.rejectUnauthorized;
  this.forceNode = opts.forceNode;

  // other options for Node.js client
  this.extraHeaders = opts.extraHeaders;
  this.localAddress = opts.localAddress;
}

/**
 * Mix in `Emitter`.
 */

Emitter(Transport.prototype);

/**
 * Emits an error.
 *
 * @param {String} str
 * @return {Transport} for chaining
 * @api public
 */

Transport.prototype.onError = function (msg, desc) {
  var err = new Error(msg);
  err.type = 'TransportError';
  err.description = desc;
  this.emit('error', err);
  return this;
};

/**
 * Opens the transport.
 *
 * @api public
 */

Transport.prototype.open = function () {
  if ('closed' === this.readyState || '' === this.readyState) {
    this.readyState = 'opening';
    this.doOpen();
  }

  return this;
};

/**
 * Closes the transport.
 *
 * @api private
 */

Transport.prototype.close = function () {
  if ('opening' === this.readyState || 'open' === this.readyState) {
    this.doClose();
    this.onClose();
  }

  return this;
};

/**
 * Sends multiple packets.
 *
 * @param {Array} packets
 * @api private
 */

Transport.prototype.send = function (packets) {
  if ('open' === this.readyState) {
    this.write(packets);
  } else {
    throw new Error('Transport not open');
  }
};

/**
 * Called upon open
 *
 * @api private
 */

Transport.prototype.onOpen = function () {
  this.readyState = 'open';
  this.writable = true;
  this.emit('open');
};

/**
 * Called with data.
 *
 * @param {String} data
 * @api private
 */

Transport.prototype.onData = function (data) {
  var packet = parser.decodePacket(data, this.socket.binaryType);
  this.onPacket(packet);
};

/**
 * Called with a decoded packet.
 */

Transport.prototype.onPacket = function (packet) {
  this.emit('packet', packet);
};

/**
 * Called upon close.
 *
 * @api private
 */

Transport.prototype.onClose = function () {
  this.readyState = 'closed';
  this.emit('close');
};


/***/ }),
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */
/***/ (function(module, exports) {

/**
 * Parses an URI
 *
 * @author Steven Levithan <stevenlevithan.com> (MIT license)
 * @api private
 */

var re = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;

var parts = [
    'source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'
];

module.exports = function parseuri(str) {
    var src = str,
        b = str.indexOf('['),
        e = str.indexOf(']');

    if (b != -1 && e != -1) {
        str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ';') + str.substring(e, str.length);
    }

    var m = re.exec(str || ''),
        uri = {},
        i = 14;

    while (i--) {
        uri[parts[i]] = m[i] || '';
    }

    if (b != -1 && e != -1) {
        uri.source = src;
        uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ':');
        uri.authority = uri.authority.replace('[', '').replace(']', '').replace(/;/g, ':');
        uri.ipv6uri = true;
    }

    return uri;
};


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {
module.exports = isBuf;

var withNativeBuffer = typeof global.Buffer === 'function' && typeof global.Buffer.isBuffer === 'function';
var withNativeArrayBuffer = typeof global.ArrayBuffer === 'function';

var isView = (function () {
  if (withNativeArrayBuffer && typeof global.ArrayBuffer.isView === 'function') {
    return global.ArrayBuffer.isView;
  } else {
    return function (obj) { return obj.buffer instanceof global.ArrayBuffer; };
  }
})();

/**
 * Returns true if obj is a buffer or an arraybuffer.
 *
 * @api private
 */

function isBuf(obj) {
  return (withNativeBuffer && global.Buffer.isBuffer(obj)) ||
          (withNativeArrayBuffer && (obj instanceof global.ArrayBuffer || isView(obj)));
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)))

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Module dependencies.
 */

var eio = __webpack_require__(81);
var Socket = __webpack_require__(64);
var Emitter = __webpack_require__(28);
var parser = __webpack_require__(43);
var on = __webpack_require__(65);
var bind = __webpack_require__(66);
var debug = __webpack_require__(26)('socket.io-client:manager');
var indexOf = __webpack_require__(63);
var Backoff = __webpack_require__(99);

/**
 * IE6+ hasOwnProperty
 */

var has = Object.prototype.hasOwnProperty;

/**
 * Module exports
 */

module.exports = Manager;

/**
 * `Manager` constructor.
 *
 * @param {String} engine instance or engine uri/opts
 * @param {Object} options
 * @api public
 */

function Manager (uri, opts) {
  if (!(this instanceof Manager)) return new Manager(uri, opts);
  if (uri && ('object' === typeof uri)) {
    opts = uri;
    uri = undefined;
  }
  opts = opts || {};

  opts.path = opts.path || '/socket.io';
  this.nsps = {};
  this.subs = [];
  this.opts = opts;
  this.reconnection(opts.reconnection !== false);
  this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);
  this.reconnectionDelay(opts.reconnectionDelay || 1000);
  this.reconnectionDelayMax(opts.reconnectionDelayMax || 5000);
  this.randomizationFactor(opts.randomizationFactor || 0.5);
  this.backoff = new Backoff({
    min: this.reconnectionDelay(),
    max: this.reconnectionDelayMax(),
    jitter: this.randomizationFactor()
  });
  this.timeout(null == opts.timeout ? 20000 : opts.timeout);
  this.readyState = 'closed';
  this.uri = uri;
  this.connecting = [];
  this.lastPing = null;
  this.encoding = false;
  this.packetBuffer = [];
  var _parser = opts.parser || parser;
  this.encoder = new _parser.Encoder();
  this.decoder = new _parser.Decoder();
  this.autoConnect = opts.autoConnect !== false;
  if (this.autoConnect) this.open();
}

/**
 * Propagate given event to sockets and emit on `this`
 *
 * @api private
 */

Manager.prototype.emitAll = function () {
  this.emit.apply(this, arguments);
  for (var nsp in this.nsps) {
    if (has.call(this.nsps, nsp)) {
      this.nsps[nsp].emit.apply(this.nsps[nsp], arguments);
    }
  }
};

/**
 * Update `socket.id` of all sockets
 *
 * @api private
 */

Manager.prototype.updateSocketIds = function () {
  for (var nsp in this.nsps) {
    if (has.call(this.nsps, nsp)) {
      this.nsps[nsp].id = this.generateId(nsp);
    }
  }
};

/**
 * generate `socket.id` for the given `nsp`
 *
 * @param {String} nsp
 * @return {String}
 * @api private
 */

Manager.prototype.generateId = function (nsp) {
  return (nsp === '/' ? '' : (nsp + '#')) + this.engine.id;
};

/**
 * Mix in `Emitter`.
 */

Emitter(Manager.prototype);

/**
 * Sets the `reconnection` config.
 *
 * @param {Boolean} true/false if it should automatically reconnect
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.reconnection = function (v) {
  if (!arguments.length) return this._reconnection;
  this._reconnection = !!v;
  return this;
};

/**
 * Sets the reconnection attempts config.
 *
 * @param {Number} max reconnection attempts before giving up
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.reconnectionAttempts = function (v) {
  if (!arguments.length) return this._reconnectionAttempts;
  this._reconnectionAttempts = v;
  return this;
};

/**
 * Sets the delay between reconnections.
 *
 * @param {Number} delay
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.reconnectionDelay = function (v) {
  if (!arguments.length) return this._reconnectionDelay;
  this._reconnectionDelay = v;
  this.backoff && this.backoff.setMin(v);
  return this;
};

Manager.prototype.randomizationFactor = function (v) {
  if (!arguments.length) return this._randomizationFactor;
  this._randomizationFactor = v;
  this.backoff && this.backoff.setJitter(v);
  return this;
};

/**
 * Sets the maximum delay between reconnections.
 *
 * @param {Number} delay
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.reconnectionDelayMax = function (v) {
  if (!arguments.length) return this._reconnectionDelayMax;
  this._reconnectionDelayMax = v;
  this.backoff && this.backoff.setMax(v);
  return this;
};

/**
 * Sets the connection timeout. `false` to disable
 *
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.timeout = function (v) {
  if (!arguments.length) return this._timeout;
  this._timeout = v;
  return this;
};

/**
 * Starts trying to reconnect if reconnection is enabled and we have not
 * started reconnecting yet
 *
 * @api private
 */

Manager.prototype.maybeReconnectOnOpen = function () {
  // Only try to reconnect if it's the first time we're connecting
  if (!this.reconnecting && this._reconnection && this.backoff.attempts === 0) {
    // keeps reconnection from firing twice for the same reconnection loop
    this.reconnect();
  }
};

/**
 * Sets the current transport `socket`.
 *
 * @param {Function} optional, callback
 * @return {Manager} self
 * @api public
 */

Manager.prototype.open =
Manager.prototype.connect = function (fn, opts) {
  debug('readyState %s', this.readyState);
  if (~this.readyState.indexOf('open')) return this;

  debug('opening %s', this.uri);
  this.engine = eio(this.uri, this.opts);
  var socket = this.engine;
  var self = this;
  this.readyState = 'opening';
  this.skipReconnect = false;

  // emit `open`
  var openSub = on(socket, 'open', function () {
    self.onopen();
    fn && fn();
  });

  // emit `connect_error`
  var errorSub = on(socket, 'error', function (data) {
    debug('connect_error');
    self.cleanup();
    self.readyState = 'closed';
    self.emitAll('connect_error', data);
    if (fn) {
      var err = new Error('Connection error');
      err.data = data;
      fn(err);
    } else {
      // Only do this if there is no fn to handle the error
      self.maybeReconnectOnOpen();
    }
  });

  // emit `connect_timeout`
  if (false !== this._timeout) {
    var timeout = this._timeout;
    debug('connect attempt will timeout after %d', timeout);

    // set timer
    var timer = setTimeout(function () {
      debug('connect attempt timed out after %d', timeout);
      openSub.destroy();
      socket.close();
      socket.emit('error', 'timeout');
      self.emitAll('connect_timeout', timeout);
    }, timeout);

    this.subs.push({
      destroy: function () {
        clearTimeout(timer);
      }
    });
  }

  this.subs.push(openSub);
  this.subs.push(errorSub);

  return this;
};

/**
 * Called upon transport open.
 *
 * @api private
 */

Manager.prototype.onopen = function () {
  debug('open');

  // clear old subs
  this.cleanup();

  // mark as open
  this.readyState = 'open';
  this.emit('open');

  // add new subs
  var socket = this.engine;
  this.subs.push(on(socket, 'data', bind(this, 'ondata')));
  this.subs.push(on(socket, 'ping', bind(this, 'onping')));
  this.subs.push(on(socket, 'pong', bind(this, 'onpong')));
  this.subs.push(on(socket, 'error', bind(this, 'onerror')));
  this.subs.push(on(socket, 'close', bind(this, 'onclose')));
  this.subs.push(on(this.decoder, 'decoded', bind(this, 'ondecoded')));
};

/**
 * Called upon a ping.
 *
 * @api private
 */

Manager.prototype.onping = function () {
  this.lastPing = new Date();
  this.emitAll('ping');
};

/**
 * Called upon a packet.
 *
 * @api private
 */

Manager.prototype.onpong = function () {
  this.emitAll('pong', new Date() - this.lastPing);
};

/**
 * Called with data.
 *
 * @api private
 */

Manager.prototype.ondata = function (data) {
  this.decoder.add(data);
};

/**
 * Called when parser fully decodes a packet.
 *
 * @api private
 */

Manager.prototype.ondecoded = function (packet) {
  this.emit('packet', packet);
};

/**
 * Called upon socket error.
 *
 * @api private
 */

Manager.prototype.onerror = function (err) {
  debug('error', err);
  this.emitAll('error', err);
};

/**
 * Creates a new socket for the given `nsp`.
 *
 * @return {Socket}
 * @api public
 */

Manager.prototype.socket = function (nsp, opts) {
  var socket = this.nsps[nsp];
  if (!socket) {
    socket = new Socket(this, nsp, opts);
    this.nsps[nsp] = socket;
    var self = this;
    socket.on('connecting', onConnecting);
    socket.on('connect', function () {
      socket.id = self.generateId(nsp);
    });

    if (this.autoConnect) {
      // manually call here since connecting event is fired before listening
      onConnecting();
    }
  }

  function onConnecting () {
    if (!~indexOf(self.connecting, socket)) {
      self.connecting.push(socket);
    }
  }

  return socket;
};

/**
 * Called upon a socket close.
 *
 * @param {Socket} socket
 */

Manager.prototype.destroy = function (socket) {
  var index = indexOf(this.connecting, socket);
  if (~index) this.connecting.splice(index, 1);
  if (this.connecting.length) return;

  this.close();
};

/**
 * Writes a packet.
 *
 * @param {Object} packet
 * @api private
 */

Manager.prototype.packet = function (packet) {
  debug('writing packet %j', packet);
  var self = this;
  if (packet.query && packet.type === 0) packet.nsp += '?' + packet.query;

  if (!self.encoding) {
    // encode, then write to engine with result
    self.encoding = true;
    this.encoder.encode(packet, function (encodedPackets) {
      for (var i = 0; i < encodedPackets.length; i++) {
        self.engine.write(encodedPackets[i], packet.options);
      }
      self.encoding = false;
      self.processPacketQueue();
    });
  } else { // add packet to the queue
    self.packetBuffer.push(packet);
  }
};

/**
 * If packet buffer is non-empty, begins encoding the
 * next packet in line.
 *
 * @api private
 */

Manager.prototype.processPacketQueue = function () {
  if (this.packetBuffer.length > 0 && !this.encoding) {
    var pack = this.packetBuffer.shift();
    this.packet(pack);
  }
};

/**
 * Clean up transport subscriptions and packet buffer.
 *
 * @api private
 */

Manager.prototype.cleanup = function () {
  debug('cleanup');

  var subsLength = this.subs.length;
  for (var i = 0; i < subsLength; i++) {
    var sub = this.subs.shift();
    sub.destroy();
  }

  this.packetBuffer = [];
  this.encoding = false;
  this.lastPing = null;

  this.decoder.destroy();
};

/**
 * Close the current socket.
 *
 * @api private
 */

Manager.prototype.close =
Manager.prototype.disconnect = function () {
  debug('disconnect');
  this.skipReconnect = true;
  this.reconnecting = false;
  if ('opening' === this.readyState) {
    // `onclose` will not fire because
    // an open event never happened
    this.cleanup();
  }
  this.backoff.reset();
  this.readyState = 'closed';
  if (this.engine) this.engine.close();
};

/**
 * Called upon engine close.
 *
 * @api private
 */

Manager.prototype.onclose = function (reason) {
  debug('onclose');

  this.cleanup();
  this.backoff.reset();
  this.readyState = 'closed';
  this.emit('close', reason);

  if (this._reconnection && !this.skipReconnect) {
    this.reconnect();
  }
};

/**
 * Attempt a reconnection.
 *
 * @api private
 */

Manager.prototype.reconnect = function () {
  if (this.reconnecting || this.skipReconnect) return this;

  var self = this;

  if (this.backoff.attempts >= this._reconnectionAttempts) {
    debug('reconnect failed');
    this.backoff.reset();
    this.emitAll('reconnect_failed');
    this.reconnecting = false;
  } else {
    var delay = this.backoff.duration();
    debug('will wait %dms before reconnect attempt', delay);

    this.reconnecting = true;
    var timer = setTimeout(function () {
      if (self.skipReconnect) return;

      debug('attempting reconnect');
      self.emitAll('reconnect_attempt', self.backoff.attempts);
      self.emitAll('reconnecting', self.backoff.attempts);

      // check again for the case socket closed in above events
      if (self.skipReconnect) return;

      self.open(function (err) {
        if (err) {
          debug('reconnect attempt error');
          self.reconnecting = false;
          self.reconnect();
          self.emitAll('reconnect_error', err.data);
        } else {
          debug('reconnect success');
          self.onreconnect();
        }
      });
    }, delay);

    this.subs.push({
      destroy: function () {
        clearTimeout(timer);
      }
    });
  }
};

/**
 * Called upon successful reconnect.
 *
 * @api private
 */

Manager.prototype.onreconnect = function () {
  var attempt = this.backoff.attempts;
  this.reconnecting = false;
  this.backoff.reset();
  this.updateSocketIds();
  this.emitAll('reconnect', attempt);
};


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * Module dependencies
 */

var XMLHttpRequest = __webpack_require__(45);
var XHR = __webpack_require__(84);
var JSONP = __webpack_require__(95);
var websocket = __webpack_require__(96);

/**
 * Export transports.
 */

exports.polling = polling;
exports.websocket = websocket;

/**
 * Polling transport polymorphic constructor.
 * Decides on xhr vs jsonp based on feature detection.
 *
 * @api private
 */

function polling (opts) {
  var xhr;
  var xd = false;
  var xs = false;
  var jsonp = false !== opts.jsonp;

  if (global.location) {
    var isSSL = 'https:' === location.protocol;
    var port = location.port;

    // some user agents have empty `location.port`
    if (!port) {
      port = isSSL ? 443 : 80;
    }

    xd = opts.hostname !== location.hostname || port !== opts.port;
    xs = opts.secure !== isSSL;
  }

  opts.xdomain = xd;
  opts.xscheme = xs;
  xhr = new XMLHttpRequest(opts);

  if ('open' in xhr && !opts.forceJSONP) {
    return new XHR(opts);
  } else {
    if (!jsonp) throw new Error('JSONP disabled');
    return new JSONP(opts);
  }
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)))

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */

var Transport = __webpack_require__(46);
var parseqs = __webpack_require__(34);
var parser = __webpack_require__(29);
var inherit = __webpack_require__(35);
var yeast = __webpack_require__(62);
var debug = __webpack_require__(26)('engine.io-client:polling');

/**
 * Module exports.
 */

module.exports = Polling;

/**
 * Is XHR2 supported?
 */

var hasXHR2 = (function () {
  var XMLHttpRequest = __webpack_require__(45);
  var xhr = new XMLHttpRequest({ xdomain: false });
  return null != xhr.responseType;
})();

/**
 * Polling interface.
 *
 * @param {Object} opts
 * @api private
 */

function Polling (opts) {
  var forceBase64 = (opts && opts.forceBase64);
  if (!hasXHR2 || forceBase64) {
    this.supportsBinary = false;
  }
  Transport.call(this, opts);
}

/**
 * Inherits from Transport.
 */

inherit(Polling, Transport);

/**
 * Transport name.
 */

Polling.prototype.name = 'polling';

/**
 * Opens the socket (triggers polling). We write a PING message to determine
 * when the transport is open.
 *
 * @api private
 */

Polling.prototype.doOpen = function () {
  this.poll();
};

/**
 * Pauses polling.
 *
 * @param {Function} callback upon buffers are flushed and transport is paused
 * @api private
 */

Polling.prototype.pause = function (onPause) {
  var self = this;

  this.readyState = 'pausing';

  function pause () {
    debug('paused');
    self.readyState = 'paused';
    onPause();
  }

  if (this.polling || !this.writable) {
    var total = 0;

    if (this.polling) {
      debug('we are currently polling - waiting to pause');
      total++;
      this.once('pollComplete', function () {
        debug('pre-pause polling complete');
        --total || pause();
      });
    }

    if (!this.writable) {
      debug('we are currently writing - waiting to pause');
      total++;
      this.once('drain', function () {
        debug('pre-pause writing complete');
        --total || pause();
      });
    }
  } else {
    pause();
  }
};

/**
 * Starts polling cycle.
 *
 * @api public
 */

Polling.prototype.poll = function () {
  debug('polling');
  this.polling = true;
  this.doPoll();
  this.emit('poll');
};

/**
 * Overloads onData to detect payloads.
 *
 * @api private
 */

Polling.prototype.onData = function (data) {
  var self = this;
  debug('polling got data %s', data);
  var callback = function (packet, index, total) {
    // if its the first message we consider the transport open
    if ('opening' === self.readyState) {
      self.onOpen();
    }

    // if its a close packet, we close the ongoing requests
    if ('close' === packet.type) {
      self.onClose();
      return false;
    }

    // otherwise bypass onData and handle the message
    self.onPacket(packet);
  };

  // decode payload
  parser.decodePayload(data, this.socket.binaryType, callback);

  // if an event did not trigger closing
  if ('closed' !== this.readyState) {
    // if we got data we're not polling
    this.polling = false;
    this.emit('pollComplete');

    if ('open' === this.readyState) {
      this.poll();
    } else {
      debug('ignoring poll - transport state "%s"', this.readyState);
    }
  }
};

/**
 * For polling, send a close packet.
 *
 * @api private
 */

Polling.prototype.doClose = function () {
  var self = this;

  function close () {
    debug('writing close packet');
    self.write([{ type: 'close' }]);
  }

  if ('open' === this.readyState) {
    debug('transport open - closing');
    close();
  } else {
    // in case we're trying to close while
    // handshaking is in progress (GH-164)
    debug('transport not open - deferring close');
    this.once('open', close);
  }
};

/**
 * Writes a packets payload.
 *
 * @param {Array} data packets
 * @param {Function} drain callback
 * @api private
 */

Polling.prototype.write = function (packets) {
  var self = this;
  this.writable = false;
  var callbackfn = function () {
    self.writable = true;
    self.emit('drain');
  };

  parser.encodePayload(packets, this.supportsBinary, function (data) {
    self.doWrite(data, callbackfn);
  });
};

/**
 * Generates uri for connection.
 *
 * @api private
 */

Polling.prototype.uri = function () {
  var query = this.query || {};
  var schema = this.secure ? 'https' : 'http';
  var port = '';

  // cache busting is forced
  if (false !== this.timestampRequests) {
    query[this.timestampParam] = yeast();
  }

  if (!this.supportsBinary && !query.sid) {
    query.b64 = 1;
  }

  query = parseqs.encode(query);

  // avoid port if default for schema
  if (this.port && (('https' === schema && Number(this.port) !== 443) ||
     ('http' === schema && Number(this.port) !== 80))) {
    port = ':' + this.port;
  }

  // prepend ? to query
  if (query.length) {
    query = '?' + query;
  }

  var ipv6 = this.hostname.indexOf(':') !== -1;
  return schema + '://' + (ipv6 ? '[' + this.hostname + ']' : this.hostname) + port + this.path + query;
};


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {/* global Blob File */

/*
 * Module requirements.
 */

var isArray = __webpack_require__(44);

var toString = Object.prototype.toString;
var withNativeBlob = typeof Blob === 'function' ||
                        typeof Blob !== 'undefined' && toString.call(Blob) === '[object BlobConstructor]';
var withNativeFile = typeof File === 'function' ||
                        typeof File !== 'undefined' && toString.call(File) === '[object FileConstructor]';

/**
 * Module exports.
 */

module.exports = hasBinary;

/**
 * Checks for binary data.
 *
 * Supports Buffer, ArrayBuffer, Blob and File.
 *
 * @param {Object} anything
 * @api public
 */

function hasBinary (obj) {
  if (!obj || typeof obj !== 'object') {
    return false;
  }

  if (isArray(obj)) {
    for (var i = 0, l = obj.length; i < l; i++) {
      if (hasBinary(obj[i])) {
        return true;
      }
    }
    return false;
  }

  if ((typeof Buffer === 'function' && Buffer.isBuffer && Buffer.isBuffer(obj)) ||
    (typeof ArrayBuffer === 'function' && obj instanceof ArrayBuffer) ||
    (withNativeBlob && obj instanceof Blob) ||
    (withNativeFile && obj instanceof File)
  ) {
    return true;
  }

  // see: https://github.com/Automattic/has-binary/pull/4
  if (obj.toJSON && typeof obj.toJSON === 'function' && arguments.length === 1) {
    return hasBinary(obj.toJSON(), true);
  }

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && hasBinary(obj[key])) {
      return true;
    }
  }

  return false;
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(86).Buffer))

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_'.split('')
  , length = 64
  , map = {}
  , seed = 0
  , i = 0
  , prev;

/**
 * Return a string representing the specified number.
 *
 * @param {Number} num The number to convert.
 * @returns {String} The string representation of the number.
 * @api public
 */
function encode(num) {
  var encoded = '';

  do {
    encoded = alphabet[num % length] + encoded;
    num = Math.floor(num / length);
  } while (num > 0);

  return encoded;
}

/**
 * Return the integer value specified by the given string.
 *
 * @param {String} str The string to convert.
 * @returns {Number} The integer value represented by the string.
 * @api public
 */
function decode(str) {
  var decoded = 0;

  for (i = 0; i < str.length; i++) {
    decoded = decoded * length + map[str.charAt(i)];
  }

  return decoded;
}

/**
 * Yeast: A tiny growing id generator.
 *
 * @returns {String} A unique id.
 * @api public
 */
function yeast() {
  var now = encode(+new Date());

  if (now !== prev) return seed = 0, prev = now;
  return now +'.'+ encode(seed++);
}

//
// Map each character to its index.
//
for (; i < length; i++) map[alphabet[i]] = i;

//
// Expose the `yeast`, `encode` and `decode` functions.
//
yeast.encode = encode;
yeast.decode = decode;
module.exports = yeast;


/***/ }),
/* 63 */
/***/ (function(module, exports) {


var indexOf = [].indexOf;

module.exports = function(arr, obj){
  if (indexOf) return arr.indexOf(obj);
  for (var i = 0; i < arr.length; ++i) {
    if (arr[i] === obj) return i;
  }
  return -1;
};

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Module dependencies.
 */

var parser = __webpack_require__(43);
var Emitter = __webpack_require__(28);
var toArray = __webpack_require__(98);
var on = __webpack_require__(65);
var bind = __webpack_require__(66);
var debug = __webpack_require__(26)('socket.io-client:socket');
var parseqs = __webpack_require__(34);
var hasBin = __webpack_require__(61);

/**
 * Module exports.
 */

module.exports = exports = Socket;

/**
 * Internal events (blacklisted).
 * These events can't be emitted by the user.
 *
 * @api private
 */

var events = {
  connect: 1,
  connect_error: 1,
  connect_timeout: 1,
  connecting: 1,
  disconnect: 1,
  error: 1,
  reconnect: 1,
  reconnect_attempt: 1,
  reconnect_failed: 1,
  reconnect_error: 1,
  reconnecting: 1,
  ping: 1,
  pong: 1
};

/**
 * Shortcut to `Emitter#emit`.
 */

var emit = Emitter.prototype.emit;

/**
 * `Socket` constructor.
 *
 * @api public
 */

function Socket (io, nsp, opts) {
  this.io = io;
  this.nsp = nsp;
  this.json = this; // compat
  this.ids = 0;
  this.acks = {};
  this.receiveBuffer = [];
  this.sendBuffer = [];
  this.connected = false;
  this.disconnected = true;
  this.flags = {};
  if (opts && opts.query) {
    this.query = opts.query;
  }
  if (this.io.autoConnect) this.open();
}

/**
 * Mix in `Emitter`.
 */

Emitter(Socket.prototype);

/**
 * Subscribe to open, close and packet events
 *
 * @api private
 */

Socket.prototype.subEvents = function () {
  if (this.subs) return;

  var io = this.io;
  this.subs = [
    on(io, 'open', bind(this, 'onopen')),
    on(io, 'packet', bind(this, 'onpacket')),
    on(io, 'close', bind(this, 'onclose'))
  ];
};

/**
 * "Opens" the socket.
 *
 * @api public
 */

Socket.prototype.open =
Socket.prototype.connect = function () {
  if (this.connected) return this;

  this.subEvents();
  this.io.open(); // ensure open
  if ('open' === this.io.readyState) this.onopen();
  this.emit('connecting');
  return this;
};

/**
 * Sends a `message` event.
 *
 * @return {Socket} self
 * @api public
 */

Socket.prototype.send = function () {
  var args = toArray(arguments);
  args.unshift('message');
  this.emit.apply(this, args);
  return this;
};

/**
 * Override `emit`.
 * If the event is in `events`, it's emitted normally.
 *
 * @param {String} event name
 * @return {Socket} self
 * @api public
 */

Socket.prototype.emit = function (ev) {
  if (events.hasOwnProperty(ev)) {
    emit.apply(this, arguments);
    return this;
  }

  var args = toArray(arguments);
  var packet = {
    type: (this.flags.binary !== undefined ? this.flags.binary : hasBin(args)) ? parser.BINARY_EVENT : parser.EVENT,
    data: args
  };

  packet.options = {};
  packet.options.compress = !this.flags || false !== this.flags.compress;

  // event ack callback
  if ('function' === typeof args[args.length - 1]) {
    debug('emitting packet with ack id %d', this.ids);
    this.acks[this.ids] = args.pop();
    packet.id = this.ids++;
  }

  if (this.connected) {
    this.packet(packet);
  } else {
    this.sendBuffer.push(packet);
  }

  this.flags = {};

  return this;
};

/**
 * Sends a packet.
 *
 * @param {Object} packet
 * @api private
 */

Socket.prototype.packet = function (packet) {
  packet.nsp = this.nsp;
  this.io.packet(packet);
};

/**
 * Called upon engine `open`.
 *
 * @api private
 */

Socket.prototype.onopen = function () {
  debug('transport is open - connecting');

  // write connect packet if necessary
  if ('/' !== this.nsp) {
    if (this.query) {
      var query = typeof this.query === 'object' ? parseqs.encode(this.query) : this.query;
      debug('sending connect packet with query %s', query);
      this.packet({type: parser.CONNECT, query: query});
    } else {
      this.packet({type: parser.CONNECT});
    }
  }
};

/**
 * Called upon engine `close`.
 *
 * @param {String} reason
 * @api private
 */

Socket.prototype.onclose = function (reason) {
  debug('close (%s)', reason);
  this.connected = false;
  this.disconnected = true;
  delete this.id;
  this.emit('disconnect', reason);
};

/**
 * Called with socket packet.
 *
 * @param {Object} packet
 * @api private
 */

Socket.prototype.onpacket = function (packet) {
  var sameNamespace = packet.nsp === this.nsp;
  var rootNamespaceError = packet.type === parser.ERROR && packet.nsp === '/';

  if (!sameNamespace && !rootNamespaceError) return;

  switch (packet.type) {
    case parser.CONNECT:
      this.onconnect();
      break;

    case parser.EVENT:
      this.onevent(packet);
      break;

    case parser.BINARY_EVENT:
      this.onevent(packet);
      break;

    case parser.ACK:
      this.onack(packet);
      break;

    case parser.BINARY_ACK:
      this.onack(packet);
      break;

    case parser.DISCONNECT:
      this.ondisconnect();
      break;

    case parser.ERROR:
      this.emit('error', packet.data);
      break;
  }
};

/**
 * Called upon a server event.
 *
 * @param {Object} packet
 * @api private
 */

Socket.prototype.onevent = function (packet) {
  var args = packet.data || [];
  debug('emitting event %j', args);

  if (null != packet.id) {
    debug('attaching ack callback to event');
    args.push(this.ack(packet.id));
  }

  if (this.connected) {
    emit.apply(this, args);
  } else {
    this.receiveBuffer.push(args);
  }
};

/**
 * Produces an ack callback to emit with an event.
 *
 * @api private
 */

Socket.prototype.ack = function (id) {
  var self = this;
  var sent = false;
  return function () {
    // prevent double callbacks
    if (sent) return;
    sent = true;
    var args = toArray(arguments);
    debug('sending ack %j', args);

    self.packet({
      type: hasBin(args) ? parser.BINARY_ACK : parser.ACK,
      id: id,
      data: args
    });
  };
};

/**
 * Called upon a server acknowlegement.
 *
 * @param {Object} packet
 * @api private
 */

Socket.prototype.onack = function (packet) {
  var ack = this.acks[packet.id];
  if ('function' === typeof ack) {
    debug('calling ack %s with %j', packet.id, packet.data);
    ack.apply(this, packet.data);
    delete this.acks[packet.id];
  } else {
    debug('bad ack %s', packet.id);
  }
};

/**
 * Called upon server connect.
 *
 * @api private
 */

Socket.prototype.onconnect = function () {
  this.connected = true;
  this.disconnected = false;
  this.emit('connect');
  this.emitBuffered();
};

/**
 * Emit buffered events (received and emitted).
 *
 * @api private
 */

Socket.prototype.emitBuffered = function () {
  var i;
  for (i = 0; i < this.receiveBuffer.length; i++) {
    emit.apply(this, this.receiveBuffer[i]);
  }
  this.receiveBuffer = [];

  for (i = 0; i < this.sendBuffer.length; i++) {
    this.packet(this.sendBuffer[i]);
  }
  this.sendBuffer = [];
};

/**
 * Called upon server disconnect.
 *
 * @api private
 */

Socket.prototype.ondisconnect = function () {
  debug('server disconnect (%s)', this.nsp);
  this.destroy();
  this.onclose('io server disconnect');
};

/**
 * Called upon forced client/server side disconnections,
 * this method ensures the manager stops tracking us and
 * that reconnections don't get triggered for this.
 *
 * @api private.
 */

Socket.prototype.destroy = function () {
  if (this.subs) {
    // clean subscriptions to avoid reconnections
    for (var i = 0; i < this.subs.length; i++) {
      this.subs[i].destroy();
    }
    this.subs = null;
  }

  this.io.destroy(this);
};

/**
 * Disconnects the socket manually.
 *
 * @return {Socket} self
 * @api public
 */

Socket.prototype.close =
Socket.prototype.disconnect = function () {
  if (this.connected) {
    debug('performing disconnect (%s)', this.nsp);
    this.packet({ type: parser.DISCONNECT });
  }

  // remove socket from pool
  this.destroy();

  if (this.connected) {
    // fire events
    this.onclose('io client disconnect');
  }
  return this;
};

/**
 * Sets the compress flag.
 *
 * @param {Boolean} if `true`, compresses the sending data
 * @return {Socket} self
 * @api public
 */

Socket.prototype.compress = function (compress) {
  this.flags.compress = compress;
  return this;
};

/**
 * Sets the binary flag
 *
 * @param {Boolean} whether the emitted data contains binary
 * @return {Socket} self
 * @api public
 */

Socket.prototype.binary = function (binary) {
  this.flags.binary = binary;
  return this;
};


/***/ }),
/* 65 */
/***/ (function(module, exports) {


/**
 * Module exports.
 */

module.exports = on;

/**
 * Helper for subscriptions.
 *
 * @param {Object|EventEmitter} obj with `Emitter` mixin or `EventEmitter`
 * @param {String} event name
 * @param {Function} callback
 * @api public
 */

function on (obj, ev, fn) {
  obj.on(ev, fn);
  return {
    destroy: function () {
      obj.removeListener(ev, fn);
    }
  };
}


/***/ }),
/* 66 */
/***/ (function(module, exports) {

/**
 * Slice reference.
 */

var slice = [].slice;

/**
 * Bind `obj` to `fn`.
 *
 * @param {Object} obj
 * @param {Function|String} fn or string
 * @return {Function}
 * @api public
 */

module.exports = function(obj, fn){
  if ('string' == typeof fn) fn = obj[fn];
  if ('function' != typeof fn) throw new Error('bind() requires a function');
  var args = slice.call(arguments, 2);
  return function(){
    return fn.apply(obj, args.concat(slice.call(arguments)));
  }
};


/***/ }),
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($, XRegExp) {

var _i18next = __webpack_require__(4);

var _i18next2 = _interopRequireDefault(_i18next);

var _i18nextXhrBackend = __webpack_require__(5);

var _i18nextXhrBackend2 = _interopRequireDefault(_i18nextXhrBackend);

var _functions = __webpack_require__(6);

var _pagination = __webpack_require__(25);

var _setting = __webpack_require__(7);

var _merge_route = __webpack_require__(74);

var _authmyid = __webpack_require__(31);

var _socket_client = __webpack_require__(75);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//加载主样式文件
__webpack_require__(27);
__webpack_require__(22);
__webpack_require__(100);

//import io from 'socket_io';
__webpack_require__(23); //所有国家
//合并路线


var del_data = __webpack_require__(25); //分页
//验证用户是否登录了
(0, _authmyid.login_check)(_socket_client.client_socket, del_data.getDataTable);

var url_json = (0, _functions.parseQueryString)(window.location.href); //url json数据
(0, _authmyid.login_out)(); //登出按钮操作

window.all_routes = []; //合并路线时，所有添加的路线route_id集合
window.merge_routes_languages = []; //合并路线时，所选语言的集合
//公司站点管理页面跳转地址和历史操作记录跳转
$('.outerbox button.go_company a.go_company,.outerbox button.go_history a.go_history').click(function (e) {
    e.stopPropagation();
    if ($(this).hasClass('go_company')) {
        //点击的跳转公司
        var company_station_url = window.location.href.replace('index.html', 'html/companyStation.html');
        $(this).attr('href', company_station_url);
    } else {
        var history_url = window.location.href.replace('index.html', 'html/operationHistory.html');
        $(this).attr('href', history_url);
    }
});

//点击新建按钮
$('#getData p.info_tip button.new_route').click(function (e) {
    e.stopPropagation();
    $('#create_new_profile').fadeIn();
    $('#create_new_profile .my_inp').find('input.xml_name,textarea.xml_description').val('').fadeIn();
});
//监听输入文件名框
$('#create_new_profile .my_inp input.xml_name').get(0).oninput = function (e) {
    e.stopPropagation();
    (0, _pagination.input_check_fun)($(this));
};
//点击确定新建按钮
$('#create_new_profile .my_btn button').click(function (e) {
    e.stopPropagation();
    var _input = $('#create_new_profile .my_inp input.xml_name');
    var filename = _input.val().trim(); //文件名
    if (!(0, _pagination.input_check_fun)($('#create_new_profile .my_inp input.xml_name'))) return;
    //去点原文件名标点符号后的文件名,并转为大写
    var remove_sysm_filename = XRegExp.replace(filename, XRegExp('\\p{P}?\\p{S}?\\p{Zs}?', 'g'), function (match) {
        return '';
    }).toUpperCase();
    var description = $('#create_new_profile textarea.xml_description').val().trim();
    //请求后台创建...
    $('#zhezhao').fadeIn(1);
    $.ajax({
        url: '/myroute/create_new_profile',
        type: 'post',
        data: {
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
                $('#create_new_profile .my_inp p.err_tip').text('A similar route name exists:' + exist_filename).stop(true).fadeIn();
                setTimeout(function () {
                    $('#create_new_profile .my_inp p.err_tip').fadeOut();
                }, 3000);
            } else if (res.msg == 'ok') {
                //隐藏对话框
                $('#create_new_profile').fadeOut();
                //清空输入框内容
                $('#create_new_profile .my_inp input.xml_name').val('');
                $('#create_new_profile textarea.xml_description').val('');
                var show_num = $('#getData p.info_tip select.showpage').val();
                (0, _pagination.getDataTable)(1, show_num, true);
            }
        }
    });
});

//使块元素可以拖动
$('#create_new_profile,#show_detail,#merge_route').draggable({
    //containment:'.outerbox1'
});
$('#create_new_profile,#show_detail,#merge_route').find('p.myBg i.route_icon-chuyidong').click(function (e) {
    e.stopPropagation();
    $(this).parent().parent().fadeOut();
    if ($(this).parent().parent().attr('id') == 'merge_route') {
        //点击合并的关闭按钮
        $('#getData p.info_tip button.merge').removeClass('disabled');
        $('#getDataTable table tbody tr th.click_choose .border_box_check i.choose').removeClass('route_icon-xuanzhong'); //删除选中样式
        window.merge_routes_languages = []; //合并路线时，所选语言的集合
        window.all_routes = []; //所有添加的路线route_id集合
        $('#choose_stations_box ul.routes').html(''); //清空路线信息
        $('#merge_route .exist_languages ul.languages li.language').remove(); //清空语言
    }
});

//监听搜索输入框
$('#getData p.info_tip input.search').get(0).oninput = function (e) {
    e.preventDefault();
    var inp_val = $('#getData input.search').val().trim();
    var show_num = $('#getData p.info_tip select.showpage').val(); //显示多少条数据
    if (inp_val) {
        //有内容
        $('#getData i.fanhui').fadeIn(); //叉叉按钮显示
        if (inp_val.length >= 2) {
            //输入字符超过1个时进行搜索
            (0, _pagination.getDataTable)(1, show_num, false, inp_val);
        }
    } else {
        $('#getData i.fanhui').fadeOut();
        (0, _pagination.getDataTable)(1, show_num, false);
    }
};

//更改下拉列表每页显示页数
$('#getData p.info_tip select.showpage').change(function (e) {
    e.stopPropagation();
    var show_num = $(this).val();
    (0, _pagination.getDataTable)(1, show_num, false);
});

//点击搜索框里的叉叉按钮
$('#getData p.info_tip i.fanhui').click(function (e) {
    e.stopPropagation();
    $(this).fadeOut(); //隐藏自身
    $(this).siblings('input.search').val('');
    var show_num = $('#getData p.info_tip select.showpage').val();
    (0, _pagination.getDataTable)(1, show_num, false);
});
//点击搜索按钮
$('#getData p.info_tip i.route_icon-sousuo').click(function (e) {
    e.stopPropagation();
    var filename = $(this).siblings('input.search').val(); //文件名
    var show_num = $('#getData p.info_tip select.showpage').val();
    (0, _pagination.getDataTable)(1, show_num, false, filename);
});

//初始化模态框
$('#myModal').modal({
    show: false
});
$('#route_info,#merge_route_info').modal({
    show: false,
    backdrop: false //元素用于提供一个可点击的区域，点击此区域就即可关闭模态框。
});

//语言选择函数
language_event();
function language_event() {
    //语言选择框可以拖动
    $('#language_lists_box').draggable({
        "containment": '.outerbox1'
    });
    //点击语言选择的叉叉
    $('#language_lists_box p.title_info i').click(function (e) {
        e.stopPropagation();
        $('#language_lists_box').fadeOut(); //隐藏
    });
    //语言列表
    for (var key in _setting.countries) {
        var $li = '<li class="language">' + '<span class="this_country">' + key + '</span>' + '<i class="icon route_iconfont route_icon-you"></i>' + '<ul class="country">';
        for (var key1 in _setting.countries[key]) {
            $li += '<li class="country_text" callname="' + _setting.countries[key][key1] + '"><span>' + key1 + '</span><i class="icon route_iconfont"></i></li>';
        }
        $li += '</ul></li>';
        $('#language_lists_box ul.choose_my_language').append($li); //一次性选择多国语言
    }

    //点击列表语言
    $('#language_lists_box ul.choose_my_language li.language ul li.country_text').click(function (e) {
        e.stopPropagation();
        var jianchen = $(this).attr('callname'); //语言代码简称
        if (jianchen == 'en.US') //这个点击无效
            return;
        var $chosen_i = $(this).find('i.icon');
        //$chosen_i.toggleClass('route_icon-xuanzhong'); //添加选中样式
        //Route info 添加语言
        var xml_id = $('#route_info').attr('xml_id');
        var route_name = $('#language_table tbody tr:eq(0) th:eq(1)').text(); //路线名称
        var $stations_tb = $('#language_table tbody tr');
        var stations = [];
        for (var i = 1; i < $stations_tb.length; i++) {
            var station_id = $stations_tb.eq(i).attr('id');
            stations.push(station_id);
        }
        if (!$chosen_i.hasClass('route_icon-xuanzhong')) {
            //添加语言
            $chosen_i.addClass('route_icon-xuanzhong'); //添加选中样式
            var language_len = $('#choose_language .language_box ul.chosen li.language').length;
            $.ajax({
                url: '/myroute/add/language',
                type: 'post',
                data: {
                    xml_id: xml_id,
                    jianchen: jianchen,
                    stations: stations,
                    route_name: route_name,
                    language_num: language_len + 1 //语言数目
                },
                success: function success(res) {
                    if (res.msg == 'ok') {
                        var route_lang_id = res.route_lang_id; //该路线的对应语言id
                        var stations_data = res.stations_data; //站点的ID和station_id数组
                        //console.log(stations_data)
                        var li = '<li class="language">\n                                    <span>' + jianchen + '</span>\n                                    <i class="icon route_iconfont route_icon-shanchu"></i>\n                                </li>';
                        var $language_ul = $('#choose_language .language_box ul.chosen');
                        $language_ul.find('.clear').before($(li));
                        (0, _pagination.delete_language)(); //使点击删除图标有效
                        //表格中头部语言添加一列
                        $('#language_table thead tr').append($('<th route_lang_id=' + route_lang_id + '>' + jianchen + '</th>'));
                        var cols_len = $('#language_table thead tr th').length;
                        var $table_row = $('#language_table tbody tr'); //表格的行数
                        for (var i = 0; i < $table_row.length; i++) {
                            var th; //列内容
                            if (i == 0) {
                                th = '<th>\n                                        <input type="text" class="form-control" value=\'\'  origin_val=\'\'>\n                                    </th>';
                            } else {
                                var head_id = $table_row.eq(i).attr('id');
                                var station_lang_id;
                                var sta_transition = '';
                                for (var j = 0; j < stations_data.length; j++) {
                                    var ret_station_id = stations_data[j].station_id;
                                    var ID = stations_data[j].ID;
                                    var transition = stations_data[j].transition;
                                    if (ret_station_id === head_id) {
                                        station_lang_id = ID;
                                        sta_transition = transition;
                                        break;
                                    }
                                }
                                th = '<th station_lang_id=\'' + station_lang_id + '\'>\n                                        <input type="text" class="form-control" value="' + sta_transition + '"  origin_val=\'' + sta_transition + '\'>\n                                    </th>';
                            }
                            $('#language_table tbody tr').eq(i).append($(th));
                        }
                        //改变语言的数目
                        language_len = $('#choose_language .language_box ul.chosen li.language').length;
                        var $route_table = $('#getDataTable table tbody tr');
                        for (var i = 0; i < $route_table.length; i++) {
                            var route_id = $route_table.eq(i).attr('xml_id');
                            if (route_id == xml_id) {
                                var $language_list_ele = $route_table.eq(i).find('th.language_num span.language_list');
                                var languages_list = $language_list_ele.text();
                                languages_list = languages_list + ',' + jianchen;
                                $language_list_ele.text(languages_list);
                                languages_list = languages_list.split(',').join(' ');
                                $language_list_ele.attr('data-original-title', languages_list);
                                break;
                            }
                        }
                        //触发点击确定
                        $('#route_info .modal-footer button.confirm').trigger('click');
                    } else if (res.msg == 'err') {
                        window.location = _setting.login_url;
                    }
                }
            });
        } else {
            //删除语言
            (0, _pagination.request_delete_language)(jianchen);
        }
    });
}

//点击路线模态框Language按钮
$('#choose_language p.button_choose button.language').click(function (e) {
    e.stopPropagation();
    $('#language_lists_box').fadeIn();
});

//处理点击路线详情Comfirm按钮事件
(0, _merge_route.route_info_click_confirm)();

//点击合并按钮merge
$('#getData p.info_tip button.merge').click(function (e) {
    e.stopPropagation();
    if (all_routes.length < 2) {
        //至少选择一条以上的路线
        var tip = _i18next2.default.t('Merge_route_err'); //提示信息
        $('#save_success p.save_tip').text(tip);
        $('#save_success').stop(true).fadeIn(1);
        setTimeout(function () {
            $('#save_success').stop(true).fadeOut(1);
        }, 2000);
        return;
    }
    if ($(this).hasClass('disabled')) {
        //点击无效
        return;
    }
    $(this).addClass('disabled');
    $('#merge_route').fadeIn() //合并窗口显示
    .find('.routeFile input.filename').val('');

    (0, _merge_route.merge_routes)(url_json);
});

//警告提示框
$('.waring_info button.close').click(function (e) {
    e.stopPropagation();
    $(this).parent().slideUp();
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(24)))

/***/ }),
/* 73 */,
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($, XRegExp) {

var _i18next = __webpack_require__(4);

var _i18next2 = _interopRequireDefault(_i18next);

var _i18nextXhrBackend = __webpack_require__(5);

var _i18nextXhrBackend2 = _interopRequireDefault(_i18nextXhrBackend);

var _pagination = __webpack_require__(25);

var _setting = __webpack_require__(7);

var _functions = __webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***
 * 参数1 表示为url 的json对象
 * ***/
function merge_routes(url_json) {
    //点击合并的确定按钮
    $('#merge_route .btn_box button.comfirm').unbind('click');
    $('#merge_route .btn_box button.comfirm').bind('click', function (e) {
        e.stopPropagation();
        var route_name = $('#merge_route .routeFile input.filename').val().trim();
        if (!(0, _pagination.input_check_fun)($('#merge_route .routeFile input.filename'))) {
            return;
        }
        //路线名合法，继续往下走
        //判断选中了几条路线
        if (window.all_routes.length < 2) {
            //表示合并至少要选中两条路线
            return;
        }
        var new_route_name = XRegExp.replace(route_name, XRegExp('\\p{P}?\\p{S}?\\p{Zs}?', 'g'), function (match) {
            return '';
        }).toUpperCase();
        $('#zhezhao').fadeIn(1);
        $.ajax({
            url: '/myroute/merge_routes',
            type: 'post',
            data: {
                all_routes: window.all_routes,
                languages_arr: window.merge_routes_languages,
                route_name: route_name,
                new_route_name: new_route_name
            },
            success: function success(res) {
                $('#zhezhao').fadeOut(1);
                if (res.msg == 'err') {
                    window.location = _setting.login_url;
                } else if (res.msg == 'ok') {
                    $('#getData p.info_tip button.merge').removeClass('disabled'); //移除不能点击样式
                    $('#merge_route').fadeOut();
                    window.merge_routes_languages = [];
                    window.all_routes = []; //清空
                    $('#choose_stations_box ul.routes').html(''); //清空路线信息
                    $('#merge_route .exist_languages ul.languages li.language').remove(); //清空语言
                    (0, _pagination.getDataTable)();
                } else if (res.msg == 'has') {
                    // 路线名已有
                    $('#merge_route .routeFile p.err_tip').text(new_route_name + ' route name has been used.').fadeIn();
                    setTimeout(function () {
                        $('#merge_route .routeFile p.err_tip').fadeOut();
                    }, 3000);
                }
            },
            error: function error(err) {
                $('#zhezhao').fadeOut(1);
                if (err.status == 500) {
                    alert('server error,please try later.');
                }
            }
        });
    });
}

//处理点击路线详情Comfirm按钮事件
//合并路线
function route_info_click_confirm() {
    //点击单一路线模态框的确定Confirm按钮
    //operation_by_myself 表示是否是自己点击的Confirm按钮
    $('#route_info .modal-footer button.confirm').click(function (e) {
        var chuandi_obj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { operation_by_myself: true, save_operation: false };

        e.stopPropagation();
        var $this = $(this);
        var $table_head = $('#language_table thead tr th');
        var col_num = $table_head.length; //表格列数
        var $table_body = $('#language_table tbody tr');
        var row_num = $table_body.length; //表格行数
        var xml_id = $('#route_info').attr('xml_id'); //路线id
        var filename = $('#route_info').attr('filename'); //路线名称

        if ($('#route_info').hasClass('click_comfirm')) {
            //是否是点击的缺点触发的
            var tip_info = _i18next2.default.t('Can_download'); //提示信息
        } else {
            var tip_info = _i18next2.default.t('Save_success'); //提示信息
        }
        //遍历查看翻译是否有填写完整
        var is_compleate_transition = true;
        $('#route_info .modal-footer .submit_waring').fadeOut(1); //先隐藏
        for (var i = 0; i < row_num; i++) {
            if (!is_compleate_transition) {
                //有翻译未完成
                break;
            }
            for (var j = 1; j < col_num; j++) {
                var language = $table_head.eq(j).text();
                if (language == 'en.US') {
                    continue;
                }
                var input_val = $table_body.eq(i).find('th').eq(j).find('input').val().trim();
                if (input_val == '') {
                    is_compleate_transition = false;
                    $table_body.eq(i).find('th').eq(j).find('input').focus();
                    $('#route_info .modal-footer button.confirm').addClass('disabled').removeClass('btn-primary').addClass('noclick') //表示禁止点击
                    .css({ color: 'red' });
                    break;
                    /* var complate_tran= i18next.t('Complete_translation');
                    $table_body.eq(i).find('th').eq(j).find('input').focus();
                    $('#route_info .modal-footer button.download').addClass('disabled')
                    .attr('title',complate_tran)
                    .removeClass('btn-primary')
                    .find('a').removeAttr('download href')
                    .css({color:'red'});
                    if(operation_by_myself){ //如果是自己点击的
                        let Complete_translation = i18next.t('Complete_translation');
                        $('#route_info .modal-footer .submit_waring').stop(true)
                        .text(Complete_translation).slideDown(1000);
                    }
                    return; */
                }
            }
        }
        if (is_compleate_transition) {
            //如果翻译全部完成
            $('#route_info .modal-footer button.confirm').removeClass('disabled').addClass('btn-primary').removeClass('noclick') //表示禁止点击
            .css({ color: 'white' });
        }
        if (!chuandi_obj.operation_by_myself) {
            return;
        }
        if (!$this.hasClass('noclick')) {
            $('#zhezhao').fadeIn(1);
        }
        var languages = []; //语言列表
        var $language_box = $('#choose_language ul.chosen li.language');
        for (var i = 0; i < $language_box.length; i++) {
            var _language = $language_box.eq(i).find('span').text();
            languages.push(_language);
        }

        var Stop = { //站点对象
            StopInfo: []
        };
        var RouteInfo = { //路线对象
            Number: filename,
            ID: xml_id,
            NameTable: [],
            StopAttr: []
        };
        var transition_change = { //翻译改变过的记录
            route_id: xml_id,
            tran_change_route_id: '', //表示路线翻译改变了
            stations_id: [] //取站点的id
        };
        for (var i = 1; i < col_num; i++) {
            //路线
            var _language2 = $table_head.eq(i).text();
            var Name = '';
            var route_lang_id = Number($table_head.eq(i).attr('route_lang_id'));
            if (_language2 == 'en.US') {
                Name = $table_body.eq(0).find('th').eq(i).text();
            } else {
                var $table_th = $table_body.eq(0).find('th').eq(i).find('input');
                Name = $table_th.val().trim();
                var origin_tran = $table_th.attr('origin_val').trim();
                if (origin_tran != Name && !transition_change.tran_change_route_id) {
                    transition_change.tran_change_route_id = xml_id;
                }
            }
            Name = (0, _functions.htmlspecialchars)(Name);
            var tmp_obj = {
                LangCode: _language2,
                Name: Name,
                route_lang_id: route_lang_id
            };
            RouteInfo.NameTable.push(tmp_obj);
        }
        for (var i = 1; i < row_num; i++) {
            //站点
            var Station_id = $table_body.eq(i).attr('id');
            var lat = $table_body.eq(i).attr('lat');
            var lon = $table_body.eq(i).attr('lon');

            RouteInfo.StopAttr.push(Station_id);
            var _tmp_obj = {
                ID: Station_id,
                Lat: lat,
                Lon: lon,
                NameTable: []
            };

            for (var j = 1; j < col_num; j++) {
                var _language3 = languages[j - 1];
                var _Name = void 0;
                if (_language3 == 'en.US') {
                    _Name = $table_body.eq(i).find('th').eq(j).text();
                } else {
                    var _$table_th = $table_body.eq(i).find('th').eq(j);
                    _Name = _$table_th.find('input').val().trim();
                    var origin_tran = _$table_th.find('input').attr('origin_val').trim();
                    if (origin_tran != _Name && transition_change.stations_id.indexOf(Station_id) == -1) {
                        transition_change.stations_id.push(Station_id);
                    }
                }
                _Name = (0, _functions.htmlspecialchars)(_Name);
                var station_lang_id = Number($table_body.eq(i).find('th').eq(j).attr('station_lang_id'));
                var temp_obj1 = {
                    Name: _Name,
                    LangCode: _language3,
                    station_lang_id: station_lang_id
                };
                _tmp_obj.NameTable.push(temp_obj1);
            }
            Stop.StopInfo.push(_tmp_obj);
        }
        //console.log(transition_change)
        var languages_num = RouteInfo.NameTable.length; //语言数目
        //console.log(chuandi_obj.save_operation, typeof(chuandi_obj.save_operation))
        $.ajax({
            url: '/myroute/xml_change_language',
            type: 'post',
            data: {
                xml_id: xml_id,
                filename: filename,
                Stop: Stop,
                RouteInfo: RouteInfo,
                save_operation: chuandi_obj.save_operation,
                transition_change: transition_change
            },
            success: function success(res) {
                $('#zhezhao').fadeOut(1);
                if (res.msg == 'err') {
                    window.location.reload();
                } else if (res.msg == 'ok') {
                    var changed_routes = res.changed_routes; //所有需要更新的路线id
                    //console.log(changed_routes)
                    var $main_table_tr = $('#getDataTable table tbody tr');
                    if (changed_routes) {
                        for (var i = 0; i < $main_table_tr.length; i++) {
                            var route_id = $main_table_tr.eq(i).attr('xml_id');
                            if (changed_routes.indexOf(route_id) != -1) {
                                $main_table_tr.eq(i).find('th.action a.xiazai span.need_update').addClass('fadein');
                            }
                        }
                    }
                    if (res.addr) {
                        //更新下载地址
                        var addr = res.addr;
                        var download_filename = addr.split('\/')[addr.split('\/').length - 1];
                        for (var i = 0; i < $main_table_tr.length; i++) {
                            var _this_xml_id = $main_table_tr.eq(i).attr('xml_id');
                            if (xml_id == _this_xml_id) {
                                $main_table_tr.eq(i).find('th.action a.xiazai').attr({ 'href': addr, "download": download_filename }).find('i.download').removeClass('noclick').siblings('span.need_update').removeClass('fadein');
                                break;
                            }
                        }
                    }

                    if (is_compleate_transition) {
                        //如果翻译全部完成
                        $('#route_info .modal-footer button.confirm').removeClass('disabled').addClass('btn-primary').removeClass('noclick').css({ color: 'white' });
                        //保存成功的返回信息
                        if (chuandi_obj.operation_by_myself) {
                            var Complete_translation = void 0;
                            if (chuandi_obj.save_operation) {
                                //来自于save按钮触发的
                                Complete_translation = _i18next2.default.t('Save_success');
                            } else {
                                Complete_translation = _i18next2.default.t('Can_download');
                            }
                            $('#route_info .submit_waring').stop(false, true).slideUp(1000);
                            $('#route_info .submit_success').text(Complete_translation).slideDown(1000);
                            setTimeout(function () {
                                $('#route_info .submit_success').stop(true).slideUp();
                            }, 2500);
                        }
                    } else {
                        if (chuandi_obj.save_operation && chuandi_obj.operation_by_myself) {
                            var _Complete_translation = _i18next2.default.t('Complete_translation');
                            $('#route_info .modal-footer .submit_waring').stop(true).text(_Complete_translation).slideDown(1000);
                            setTimeout(function () {
                                $('#route_info .modal-footer .submit_waring').slideUp(500);
                            }, 3000);
                        }
                    }
                }
            }
        });
    });

    $('#route_info .modal-footer button.save').click(function (e) {
        var operation_by_myself = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        e.stopPropagation();
        $('#route_info .modal-footer button.confirm').trigger('click', { operation_by_myself: true, save_operation: true });
    });

    //点击合并的路线模态框的确定Comfirm按钮
    //operation_by_myself 表示是否是自己点击的Confirm按钮
    /**
     * 参数1 operation_by_myself表示为子集点击或者是触发的
     * 参数2 save_operation表示是否来自于save按钮触发
     * **/
    $('#merge_route_info .modal-footer button.confirm').click(function (e) {
        var chuandi_obj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { operation_by_myself: true, save_operation: false };

        e.stopPropagation();
        var all_data = []; //所有的表格数据
        var $table = $('#merge_route_info .modal-body .body_table table');
        if ($('#merge_route_info').hasClass('click_comfirm')) {
            //是否是点击的确定触发的
            var tip_info = _i18next2.default.t('Can_download'); //提示信息
        } else {
            var tip_info = _i18next2.default.t('Save_success'); //提示信息
        }
        //检测是否有空的
        var is_compleate_transition = true;
        $('#merge_route_info .submit_waring').fadeOut(1); //先隐藏
        for (var z = 0; z < $table.length; z++) {
            if (!is_compleate_transition) {
                break;
            }
            var $table_head = $table.eq(z).find('thead tr th');
            var $table_body = $table.eq(z).find('tbody tr');
            var col_num = $table_head.length; //表格列数
            var row_num = $table_body.length; //表格行数

            for (var i = 0; i < row_num; i++) {
                if (!is_compleate_transition) {
                    break;
                }
                for (var j = 1; j < col_num; j++) {
                    var language = $table_head.eq(j).text();
                    if (language == 'en.US') {
                        continue;
                    }
                    var input_val = $table_body.eq(i).find('th').eq(j).find('input').val().trim();
                    if (input_val == '') {
                        is_compleate_transition = false;
                        $table_body.eq(i).find('th').eq(j).find('input').focus();
                        $('#merge_route_info .modal-footer button.confirm').addClass('disabled').removeClass('btn-primary').addClass('noclick') //表示禁止点击
                        .css({ color: 'red' });
                        break;
                        /* var complate_tran= i18next.t('Complete_translation');
                        $table_body.eq(i).find('th').eq(j).find('input').focus();
                        $('#merge_route_info .modal-footer button.download').addClass('disabled')
                        .attr('title',complate_tran)
                        .removeClass('btn-primary')
                        .find('a').removeAttr('download href')
                        .css({color:'red'});
                        if(operation_by_myself){
                            let Complete_translation = i18next.t('Complete_translation');
                            $('#merge_route_info .modal-footer .submit_waring').stop(true)
                            .text(Complete_translation).slideDown(1000);
                        }
                        return; */
                    }
                }
            }
        }
        if (is_compleate_transition) {
            //如果翻译全部完成
            $('#merge_route_info .modal-footer button.confirm').removeClass('disabled').addClass('btn-primary').removeClass('noclick') //表示禁止点击
            .css({ color: 'white' });
        }
        if (!chuandi_obj.operation_by_myself) {
            return;
        }
        var transition_change = { //翻译改变过的记录
            routes_id: [],
            stations_id: [] //取站点的id

            //如果都有数据
        };for (var z = 0; z < $table.length; z++) {
            var $table_head = $table.eq(z).find('thead tr th');
            var $table_body = $table.eq(z).find('tbody tr');
            var col_num = $table_head.length; //表格列数
            var row_num = $table_body.length; //表格行数
            var xml_id = $table.eq(z).attr('route_id'); //路线id
            var _filename = $table.eq(z).attr('filename'); //路线名称

            var languages = []; //语言列表
            for (var i = 1; i < $table_head.length; i++) {
                var _language4 = $table_head.eq(i).text();
                languages.push(_language4);
            }

            var Stop = { //站点对象
                StopInfo: []
            };
            var RouteInfo = { //路线对象
                Number: _filename,
                ID: xml_id,
                NameTable: [],
                StopAttr: []
            };
            for (var i = 1; i < col_num; i++) {
                //路线
                var _language5 = $table_head.eq(i).text();
                var Name = '';
                var route_lang_id = Number($table_head.eq(i).attr('route_lang_id'));
                if (_language5 == 'en.US') {
                    Name = $table_body.eq(0).find('th').eq(i).text();
                } else {
                    var $table_body_inp = $table_body.eq(0).find('th').eq(i).find('input');
                    Name = $table_body_inp.val().trim();
                    var origin_val = $table_body_inp.attr('origin_val').trim();
                    if (Name != origin_val && transition_change.routes_id.indexOf(xml_id) == -1) {
                        transition_change.routes_id.push(xml_id);
                    }
                }
                Name = (0, _functions.htmlspecialchars)(Name);
                var _tmp_obj2 = {
                    LangCode: _language5,
                    Name: Name,
                    route_lang_id: route_lang_id
                };
                RouteInfo.NameTable.push(_tmp_obj2);
            }
            for (var i = 1; i < row_num; i++) {
                //站点
                var Station_id = $table_body.eq(i).attr('id');
                var lat = $table_body.eq(i).attr('lat');
                var lon = $table_body.eq(i).attr('lon');

                RouteInfo.StopAttr.push(Station_id);
                var _tmp_obj3 = {
                    ID: Station_id,
                    Lat: lat,
                    Lon: lon,
                    NameTable: []
                };

                for (var j = 1; j < col_num; j++) {
                    var _language6 = languages[j - 1];
                    var _Name2 = void 0;
                    if (_language6 == 'en.US') {
                        _Name2 = $table_body.eq(i).find('th').eq(j).text();
                    } else {
                        var $table_body_tr = $table_body.eq(i);
                        var station_id = $table_body_tr.attr('id');
                        _Name2 = $table_body_tr.find('th').eq(j).find('input').val().trim();
                        var _origin_val = $table_body_tr.find('th').eq(j).find('input').attr('origin_val').trim();
                        if (_Name2 != _origin_val && transition_change.stations_id.indexOf(station_id) == -1) {
                            transition_change.stations_id.push(station_id);
                        }
                    }
                    _Name2 = (0, _functions.htmlspecialchars)(_Name2);
                    var station_lang_id = Number($table_body.eq(i).find('th').eq(j).attr('station_lang_id'));
                    var temp_obj1 = {
                        Name: _Name2,
                        LangCode: _language6,
                        station_lang_id: station_lang_id
                    };
                    _tmp_obj3.NameTable.push(temp_obj1);
                }
                Stop.StopInfo.push(_tmp_obj3);
            }

            var tmp_obj = {
                Stop: Stop, RouteInfo: RouteInfo
            };
            all_data.push(tmp_obj);
        }
        //console.log(transition_change);
        var xml_id = $('#merge_route_info').attr('xml_id'); //路线id
        var filename = $('#merge_route_info').attr('filename'); //路线名称
        //console.log(all_data,xml_id,filename);
        if ($(this).hasClass('noclick')) {
            $('#zhezhao').fadeIn(1);
        }
        $.ajax({
            url: '/myroute/merge_routes_change_lang_xml',
            type: 'post',
            data: {
                xml_id: xml_id,
                filename: filename,
                all_data: all_data,
                save_operation: chuandi_obj.save_operation,
                transition_change: transition_change
            },
            success: function success(res) {
                $('#zhezhao').fadeOut(1);
                if (res.msg == 'ok') {
                    var changed_routes = res.changed_routes; //所有需要更新的路线id
                    //console.log('返回的',changed_routes)
                    var $main_table_tr = $('#getDataTable table tbody tr');
                    if (changed_routes) {
                        for (var i = 0; i < $main_table_tr.length; i++) {
                            var route_id = $main_table_tr.eq(i).attr('xml_id');
                            if (changed_routes.indexOf(route_id) != -1) {
                                $main_table_tr.eq(i).find('th.action a.xiazai span.need_update').addClass('fadein');
                            }
                        }
                    }

                    if (res.web_addr) {
                        //更新下载地址
                        var addr = res.web_addr;
                        var download_filename = addr.split('\/')[addr.split('\/').length - 1];
                        var $main_table_tr = $('#getDataTable table tbody tr');
                        for (var i = 0; i < $main_table_tr.length; i++) {
                            var _this_xml_id = $main_table_tr.eq(i).attr('xml_id');
                            if (xml_id == _this_xml_id) {
                                $main_table_tr.eq(i).find('th.action a.xiazai').attr({ 'href': addr, "download": download_filename }).find('i.download').removeClass('noclick').siblings('span.need_update').removeClass('fadein');
                                break;
                            }
                        }
                    }

                    if (is_compleate_transition) {
                        //如果翻译全部完成
                        $('#merge_route_info .modal-footer button.confirm').removeClass('disabled').addClass('btn-primary').removeClass('noclick') //表示禁止点击
                        .css({ color: 'white' });
                        //保存成功的返回信息
                        if (chuandi_obj.operation_by_myself) {
                            var Complete_translation = void 0;
                            if (chuandi_obj.save_operation) {
                                //来自于save按钮触发的
                                Complete_translation = _i18next2.default.t('Save_success');
                            } else {
                                Complete_translation = _i18next2.default.t('Can_download');
                            }
                            $('#merge_route_info .submit_waring').stop(false, true).slideUp(1000);
                            $('#merge_route_info .submit_success').text(Complete_translation).slideDown(1000);
                            setTimeout(function () {
                                $('#merge_route_info .submit_success').stop(true).slideUp();
                            }, 2500);
                        }
                    } else {
                        if (chuandi_obj.save_operation && chuandi_obj.operation_by_myself) {
                            var _Complete_translation2 = _i18next2.default.t('Complete_translation');
                            $('#merge_route_info .submit_waring').stop(true).text(_Complete_translation2).slideDown(1000);
                            setTimeout(function () {
                                $('#merge_route_info .modal-footer .submit_waring').slideUp(500);
                            }, 3000);
                        }
                    }
                } else if (res.msg == 'err') {
                    alert('Expiration of login information,login again.');
                    window.location = _setting.login_url;
                } else if (res.msg == 'no') {
                    alert('this route is not exists.');
                    window.location.reload();
                }
            },
            error: function error(err) {
                if (err.status == 500) {
                    alert('server error,please try again later.');
                }
            }
        });
    });
    //点击合并的save按钮，触发Comfirm按钮
    $('#merge_route_info .modal-footer button.save').click(function (e) {
        e.stopPropagation();
        $('#merge_route_info .modal-footer button.confirm').trigger('click', { operation_by_myself: true, save_operation: true });
    });
}

module.exports = {
    merge_routes: merge_routes,
    route_info_click_confirm: route_info_click_confirm
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(24)))

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

var _setting = __webpack_require__(7);

var _socket = __webpack_require__(76);

var _socket2 = _interopRequireDefault(_socket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//客户端连接服务器
function client_socket(sz, username, callback) {
    //建立socket连接
    var socket = _socket2.default.connect(_setting.server_ip);
    socket.on('connect', function () {
        socket.emit('login', { sz: sz, username: username });
    });

    //判断用户是否在线
    socket.on('isExist', function (status) {
        if (status == true) {
            //已经在线
            alert('this user is online.');
            window.location = _setting.login_url;
        } else {
            //不在线
            if (typeof callback == 'function') {
                callback();
            }
        }
    });
    //callback();

    //用户在线人数
    socket.on('online_num', function (nums) {
        //console.log(nums);
        $('#navigation .banben span.online_num').text(nums);
    });
} //cloud登录地址

module.exports = {
    client_socket: client_socket
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Module dependencies.
 */

var url = __webpack_require__(77);
var parser = __webpack_require__(43);
var Manager = __webpack_require__(58);
var debug = __webpack_require__(26)('socket.io-client');

/**
 * Module exports.
 */

module.exports = exports = lookup;

/**
 * Managers cache.
 */

var cache = exports.managers = {};

/**
 * Looks up an existing `Manager` for multiplexing.
 * If the user summons:
 *
 *   `io('http://localhost/a');`
 *   `io('http://localhost/b');`
 *
 * We reuse the existing instance based on same scheme/port/host,
 * and we initialize sockets for each namespace.
 *
 * @api public
 */

function lookup (uri, opts) {
  if (typeof uri === 'object') {
    opts = uri;
    uri = undefined;
  }

  opts = opts || {};

  var parsed = url(uri);
  var source = parsed.source;
  var id = parsed.id;
  var path = parsed.path;
  var sameNamespace = cache[id] && path in cache[id].nsps;
  var newConnection = opts.forceNew || opts['force new connection'] ||
                      false === opts.multiplex || sameNamespace;

  var io;

  if (newConnection) {
    debug('ignoring socket cache for %s', source);
    io = Manager(source, opts);
  } else {
    if (!cache[id]) {
      debug('new io instance for %s', source);
      cache[id] = Manager(source, opts);
    }
    io = cache[id];
  }
  if (parsed.query && !opts.query) {
    opts.query = parsed.query;
  }
  return io.socket(parsed.path, opts);
}

/**
 * Protocol version.
 *
 * @api public
 */

exports.protocol = parser.protocol;

/**
 * `connect`.
 *
 * @param {String} uri
 * @api public
 */

exports.connect = lookup;

/**
 * Expose constructors for standalone build.
 *
 * @api public
 */

exports.Manager = __webpack_require__(58);
exports.Socket = __webpack_require__(64);


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {
/**
 * Module dependencies.
 */

var parseuri = __webpack_require__(56);
var debug = __webpack_require__(26)('socket.io-client:url');

/**
 * Module exports.
 */

module.exports = url;

/**
 * URL parser.
 *
 * @param {String} url
 * @param {Object} An object meant to mimic window.location.
 *                 Defaults to window.location.
 * @api public
 */

function url (uri, loc) {
  var obj = uri;

  // default to window.location
  loc = loc || global.location;
  if (null == uri) uri = loc.protocol + '//' + loc.host;

  // relative path support
  if ('string' === typeof uri) {
    if ('/' === uri.charAt(0)) {
      if ('/' === uri.charAt(1)) {
        uri = loc.protocol + uri;
      } else {
        uri = loc.host + uri;
      }
    }

    if (!/^(https?|wss?):\/\//.test(uri)) {
      debug('protocol-less url %s', uri);
      if ('undefined' !== typeof loc) {
        uri = loc.protocol + '//' + uri;
      } else {
        uri = 'https://' + uri;
      }
    }

    // parse
    debug('parse %s', uri);
    obj = parseuri(uri);
  }

  // make sure we treat `localhost:80` and `localhost` equally
  if (!obj.port) {
    if (/^(http|ws)$/.test(obj.protocol)) {
      obj.port = '80';
    } else if (/^(http|ws)s$/.test(obj.protocol)) {
      obj.port = '443';
    }
  }

  obj.path = obj.path || '/';

  var ipv6 = obj.host.indexOf(':') !== -1;
  var host = ipv6 ? '[' + obj.host + ']' : obj.host;

  // define unique id
  obj.id = obj.protocol + '://' + host + ':' + obj.port;
  // define href
  obj.href = obj.protocol + '://' + host + (loc && loc.port === obj.port ? '' : (':' + obj.port));

  return obj;
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)))

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = __webpack_require__(79);

/**
 * Active `debug` instances.
 */
exports.instances = [];

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
 */

exports.formatters = {};

/**
 * Select a color.
 * @param {String} namespace
 * @return {Number}
 * @api private
 */

function selectColor(namespace) {
  var hash = 0, i;

  for (i in namespace) {
    hash  = ((hash << 5) - hash) + namespace.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  return exports.colors[Math.abs(hash) % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function createDebug(namespace) {

  var prevTime;

  function debug() {
    // disabled?
    if (!debug.enabled) return;

    var self = debug;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // turn the `arguments` into a proper Array
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %O
      args.unshift('%O');
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    // apply env-specific formatting (colors, etc.)
    exports.formatArgs.call(self, args);

    var logFn = debug.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }

  debug.namespace = namespace;
  debug.enabled = exports.enabled(namespace);
  debug.useColors = exports.useColors();
  debug.color = selectColor(namespace);
  debug.destroy = destroy;

  // env-specific initialization logic for debug instances
  if ('function' === typeof exports.init) {
    exports.init(debug);
  }

  exports.instances.push(debug);

  return debug;
}

function destroy () {
  var index = exports.instances.indexOf(this);
  if (index !== -1) {
    exports.instances.splice(index, 1);
    return true;
  } else {
    return false;
  }
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  exports.names = [];
  exports.skips = [];

  var i;
  var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
  var len = split.length;

  for (i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }

  for (i = 0; i < exports.instances.length; i++) {
    var instance = exports.instances[i];
    instance.enabled = exports.enabled(instance.namespace);
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  if (name[name.length - 1] === '*') {
    return true;
  }
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}


/***/ }),
/* 79 */
/***/ (function(module, exports) {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isNaN(val) === false) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  if (ms >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (ms >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (ms >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (ms >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  return plural(ms, d, 'day') ||
    plural(ms, h, 'hour') ||
    plural(ms, m, 'minute') ||
    plural(ms, s, 'second') ||
    ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, n, name) {
  if (ms < n) {
    return;
  }
  if (ms < n * 1.5) {
    return Math.floor(ms / n) + ' ' + name;
  }
  return Math.ceil(ms / n) + ' ' + name + 's';
}


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/*global Blob,File*/

/**
 * Module requirements
 */

var isArray = __webpack_require__(44);
var isBuf = __webpack_require__(57);
var toString = Object.prototype.toString;
var withNativeBlob = typeof global.Blob === 'function' || toString.call(global.Blob) === '[object BlobConstructor]';
var withNativeFile = typeof global.File === 'function' || toString.call(global.File) === '[object FileConstructor]';

/**
 * Replaces every Buffer | ArrayBuffer in packet with a numbered placeholder.
 * Anything with blobs or files should be fed through removeBlobs before coming
 * here.
 *
 * @param {Object} packet - socket.io event packet
 * @return {Object} with deconstructed packet and list of buffers
 * @api public
 */

exports.deconstructPacket = function(packet) {
  var buffers = [];
  var packetData = packet.data;
  var pack = packet;
  pack.data = _deconstructPacket(packetData, buffers);
  pack.attachments = buffers.length; // number of binary 'attachments'
  return {packet: pack, buffers: buffers};
};

function _deconstructPacket(data, buffers) {
  if (!data) return data;

  if (isBuf(data)) {
    var placeholder = { _placeholder: true, num: buffers.length };
    buffers.push(data);
    return placeholder;
  } else if (isArray(data)) {
    var newData = new Array(data.length);
    for (var i = 0; i < data.length; i++) {
      newData[i] = _deconstructPacket(data[i], buffers);
    }
    return newData;
  } else if (typeof data === 'object' && !(data instanceof Date)) {
    var newData = {};
    for (var key in data) {
      newData[key] = _deconstructPacket(data[key], buffers);
    }
    return newData;
  }
  return data;
}

/**
 * Reconstructs a binary packet from its placeholder packet and buffers
 *
 * @param {Object} packet - event packet with placeholders
 * @param {Array} buffers - binary buffers to put in placeholder positions
 * @return {Object} reconstructed packet
 * @api public
 */

exports.reconstructPacket = function(packet, buffers) {
  packet.data = _reconstructPacket(packet.data, buffers);
  packet.attachments = undefined; // no longer useful
  return packet;
};

function _reconstructPacket(data, buffers) {
  if (!data) return data;

  if (data && data._placeholder) {
    return buffers[data.num]; // appropriate buffer (should be natural order anyway)
  } else if (isArray(data)) {
    for (var i = 0; i < data.length; i++) {
      data[i] = _reconstructPacket(data[i], buffers);
    }
  } else if (typeof data === 'object') {
    for (var key in data) {
      data[key] = _reconstructPacket(data[key], buffers);
    }
  }

  return data;
}

/**
 * Asynchronously removes Blobs or Files from data via
 * FileReader's readAsArrayBuffer method. Used before encoding
 * data as msgpack. Calls callback with the blobless data.
 *
 * @param {Object} data
 * @param {Function} callback
 * @api private
 */

exports.removeBlobs = function(data, callback) {
  function _removeBlobs(obj, curKey, containingObject) {
    if (!obj) return obj;

    // convert any blob
    if ((withNativeBlob && obj instanceof Blob) ||
        (withNativeFile && obj instanceof File)) {
      pendingBlobs++;

      // async filereader
      var fileReader = new FileReader();
      fileReader.onload = function() { // this.result == arraybuffer
        if (containingObject) {
          containingObject[curKey] = this.result;
        }
        else {
          bloblessData = this.result;
        }

        // if nothing pending its callback time
        if(! --pendingBlobs) {
          callback(bloblessData);
        }
      };

      fileReader.readAsArrayBuffer(obj); // blob -> arraybuffer
    } else if (isArray(obj)) { // handle array
      for (var i = 0; i < obj.length; i++) {
        _removeBlobs(obj[i], i, obj);
      }
    } else if (typeof obj === 'object' && !isBuf(obj)) { // and object
      for (var key in obj) {
        _removeBlobs(obj[key], key, obj);
      }
    }
  }

  var pendingBlobs = 0;
  var bloblessData = data;
  _removeBlobs(bloblessData);
  if (!pendingBlobs) {
    callback(bloblessData);
  }
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)))

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {


module.exports = __webpack_require__(82);

/**
 * Exports parser
 *
 * @api public
 *
 */
module.exports.parser = __webpack_require__(29);


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * Module dependencies.
 */

var transports = __webpack_require__(59);
var Emitter = __webpack_require__(28);
var debug = __webpack_require__(26)('engine.io-client:socket');
var index = __webpack_require__(63);
var parser = __webpack_require__(29);
var parseuri = __webpack_require__(56);
var parseqs = __webpack_require__(34);

/**
 * Module exports.
 */

module.exports = Socket;

/**
 * Socket constructor.
 *
 * @param {String|Object} uri or options
 * @param {Object} options
 * @api public
 */

function Socket (uri, opts) {
  if (!(this instanceof Socket)) return new Socket(uri, opts);

  opts = opts || {};

  if (uri && 'object' === typeof uri) {
    opts = uri;
    uri = null;
  }

  if (uri) {
    uri = parseuri(uri);
    opts.hostname = uri.host;
    opts.secure = uri.protocol === 'https' || uri.protocol === 'wss';
    opts.port = uri.port;
    if (uri.query) opts.query = uri.query;
  } else if (opts.host) {
    opts.hostname = parseuri(opts.host).host;
  }

  this.secure = null != opts.secure ? opts.secure
    : (global.location && 'https:' === location.protocol);

  if (opts.hostname && !opts.port) {
    // if no port is specified manually, use the protocol default
    opts.port = this.secure ? '443' : '80';
  }

  this.agent = opts.agent || false;
  this.hostname = opts.hostname ||
    (global.location ? location.hostname : 'localhost');
  this.port = opts.port || (global.location && location.port
      ? location.port
      : (this.secure ? 443 : 80));
  this.query = opts.query || {};
  if ('string' === typeof this.query) this.query = parseqs.decode(this.query);
  this.upgrade = false !== opts.upgrade;
  this.path = (opts.path || '/engine.io').replace(/\/$/, '') + '/';
  this.forceJSONP = !!opts.forceJSONP;
  this.jsonp = false !== opts.jsonp;
  this.forceBase64 = !!opts.forceBase64;
  this.enablesXDR = !!opts.enablesXDR;
  this.timestampParam = opts.timestampParam || 't';
  this.timestampRequests = opts.timestampRequests;
  this.transports = opts.transports || ['polling', 'websocket'];
  this.transportOptions = opts.transportOptions || {};
  this.readyState = '';
  this.writeBuffer = [];
  this.prevBufferLen = 0;
  this.policyPort = opts.policyPort || 843;
  this.rememberUpgrade = opts.rememberUpgrade || false;
  this.binaryType = null;
  this.onlyBinaryUpgrades = opts.onlyBinaryUpgrades;
  this.perMessageDeflate = false !== opts.perMessageDeflate ? (opts.perMessageDeflate || {}) : false;

  if (true === this.perMessageDeflate) this.perMessageDeflate = {};
  if (this.perMessageDeflate && null == this.perMessageDeflate.threshold) {
    this.perMessageDeflate.threshold = 1024;
  }

  // SSL options for Node.js client
  this.pfx = opts.pfx || null;
  this.key = opts.key || null;
  this.passphrase = opts.passphrase || null;
  this.cert = opts.cert || null;
  this.ca = opts.ca || null;
  this.ciphers = opts.ciphers || null;
  this.rejectUnauthorized = opts.rejectUnauthorized === undefined ? true : opts.rejectUnauthorized;
  this.forceNode = !!opts.forceNode;

  // other options for Node.js client
  var freeGlobal = typeof global === 'object' && global;
  if (freeGlobal.global === freeGlobal) {
    if (opts.extraHeaders && Object.keys(opts.extraHeaders).length > 0) {
      this.extraHeaders = opts.extraHeaders;
    }

    if (opts.localAddress) {
      this.localAddress = opts.localAddress;
    }
  }

  // set on handshake
  this.id = null;
  this.upgrades = null;
  this.pingInterval = null;
  this.pingTimeout = null;

  // set on heartbeat
  this.pingIntervalTimer = null;
  this.pingTimeoutTimer = null;

  this.open();
}

Socket.priorWebsocketSuccess = false;

/**
 * Mix in `Emitter`.
 */

Emitter(Socket.prototype);

/**
 * Protocol version.
 *
 * @api public
 */

Socket.protocol = parser.protocol; // this is an int

/**
 * Expose deps for legacy compatibility
 * and standalone browser access.
 */

Socket.Socket = Socket;
Socket.Transport = __webpack_require__(46);
Socket.transports = __webpack_require__(59);
Socket.parser = __webpack_require__(29);

/**
 * Creates transport of the given type.
 *
 * @param {String} transport name
 * @return {Transport}
 * @api private
 */

Socket.prototype.createTransport = function (name) {
  debug('creating transport "%s"', name);
  var query = clone(this.query);

  // append engine.io protocol identifier
  query.EIO = parser.protocol;

  // transport name
  query.transport = name;

  // per-transport options
  var options = this.transportOptions[name] || {};

  // session id if we already have one
  if (this.id) query.sid = this.id;

  var transport = new transports[name]({
    query: query,
    socket: this,
    agent: options.agent || this.agent,
    hostname: options.hostname || this.hostname,
    port: options.port || this.port,
    secure: options.secure || this.secure,
    path: options.path || this.path,
    forceJSONP: options.forceJSONP || this.forceJSONP,
    jsonp: options.jsonp || this.jsonp,
    forceBase64: options.forceBase64 || this.forceBase64,
    enablesXDR: options.enablesXDR || this.enablesXDR,
    timestampRequests: options.timestampRequests || this.timestampRequests,
    timestampParam: options.timestampParam || this.timestampParam,
    policyPort: options.policyPort || this.policyPort,
    pfx: options.pfx || this.pfx,
    key: options.key || this.key,
    passphrase: options.passphrase || this.passphrase,
    cert: options.cert || this.cert,
    ca: options.ca || this.ca,
    ciphers: options.ciphers || this.ciphers,
    rejectUnauthorized: options.rejectUnauthorized || this.rejectUnauthorized,
    perMessageDeflate: options.perMessageDeflate || this.perMessageDeflate,
    extraHeaders: options.extraHeaders || this.extraHeaders,
    forceNode: options.forceNode || this.forceNode,
    localAddress: options.localAddress || this.localAddress,
    requestTimeout: options.requestTimeout || this.requestTimeout,
    protocols: options.protocols || void (0)
  });

  return transport;
};

function clone (obj) {
  var o = {};
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      o[i] = obj[i];
    }
  }
  return o;
}

/**
 * Initializes transport to use and starts probe.
 *
 * @api private
 */
Socket.prototype.open = function () {
  var transport;
  if (this.rememberUpgrade && Socket.priorWebsocketSuccess && this.transports.indexOf('websocket') !== -1) {
    transport = 'websocket';
  } else if (0 === this.transports.length) {
    // Emit error on next tick so it can be listened to
    var self = this;
    setTimeout(function () {
      self.emit('error', 'No transports available');
    }, 0);
    return;
  } else {
    transport = this.transports[0];
  }
  this.readyState = 'opening';

  // Retry with the next transport if the transport is disabled (jsonp: false)
  try {
    transport = this.createTransport(transport);
  } catch (e) {
    this.transports.shift();
    this.open();
    return;
  }

  transport.open();
  this.setTransport(transport);
};

/**
 * Sets the current transport. Disables the existing one (if any).
 *
 * @api private
 */

Socket.prototype.setTransport = function (transport) {
  debug('setting transport %s', transport.name);
  var self = this;

  if (this.transport) {
    debug('clearing existing transport %s', this.transport.name);
    this.transport.removeAllListeners();
  }

  // set up transport
  this.transport = transport;

  // set up transport listeners
  transport
  .on('drain', function () {
    self.onDrain();
  })
  .on('packet', function (packet) {
    self.onPacket(packet);
  })
  .on('error', function (e) {
    self.onError(e);
  })
  .on('close', function () {
    self.onClose('transport close');
  });
};

/**
 * Probes a transport.
 *
 * @param {String} transport name
 * @api private
 */

Socket.prototype.probe = function (name) {
  debug('probing transport "%s"', name);
  var transport = this.createTransport(name, { probe: 1 });
  var failed = false;
  var self = this;

  Socket.priorWebsocketSuccess = false;

  function onTransportOpen () {
    if (self.onlyBinaryUpgrades) {
      var upgradeLosesBinary = !this.supportsBinary && self.transport.supportsBinary;
      failed = failed || upgradeLosesBinary;
    }
    if (failed) return;

    debug('probe transport "%s" opened', name);
    transport.send([{ type: 'ping', data: 'probe' }]);
    transport.once('packet', function (msg) {
      if (failed) return;
      if ('pong' === msg.type && 'probe' === msg.data) {
        debug('probe transport "%s" pong', name);
        self.upgrading = true;
        self.emit('upgrading', transport);
        if (!transport) return;
        Socket.priorWebsocketSuccess = 'websocket' === transport.name;

        debug('pausing current transport "%s"', self.transport.name);
        self.transport.pause(function () {
          if (failed) return;
          if ('closed' === self.readyState) return;
          debug('changing transport and sending upgrade packet');

          cleanup();

          self.setTransport(transport);
          transport.send([{ type: 'upgrade' }]);
          self.emit('upgrade', transport);
          transport = null;
          self.upgrading = false;
          self.flush();
        });
      } else {
        debug('probe transport "%s" failed', name);
        var err = new Error('probe error');
        err.transport = transport.name;
        self.emit('upgradeError', err);
      }
    });
  }

  function freezeTransport () {
    if (failed) return;

    // Any callback called by transport should be ignored since now
    failed = true;

    cleanup();

    transport.close();
    transport = null;
  }

  // Handle any error that happens while probing
  function onerror (err) {
    var error = new Error('probe error: ' + err);
    error.transport = transport.name;

    freezeTransport();

    debug('probe transport "%s" failed because of error: %s', name, err);

    self.emit('upgradeError', error);
  }

  function onTransportClose () {
    onerror('transport closed');
  }

  // When the socket is closed while we're probing
  function onclose () {
    onerror('socket closed');
  }

  // When the socket is upgraded while we're probing
  function onupgrade (to) {
    if (transport && to.name !== transport.name) {
      debug('"%s" works - aborting "%s"', to.name, transport.name);
      freezeTransport();
    }
  }

  // Remove all listeners on the transport and on self
  function cleanup () {
    transport.removeListener('open', onTransportOpen);
    transport.removeListener('error', onerror);
    transport.removeListener('close', onTransportClose);
    self.removeListener('close', onclose);
    self.removeListener('upgrading', onupgrade);
  }

  transport.once('open', onTransportOpen);
  transport.once('error', onerror);
  transport.once('close', onTransportClose);

  this.once('close', onclose);
  this.once('upgrading', onupgrade);

  transport.open();
};

/**
 * Called when connection is deemed open.
 *
 * @api public
 */

Socket.prototype.onOpen = function () {
  debug('socket open');
  this.readyState = 'open';
  Socket.priorWebsocketSuccess = 'websocket' === this.transport.name;
  this.emit('open');
  this.flush();

  // we check for `readyState` in case an `open`
  // listener already closed the socket
  if ('open' === this.readyState && this.upgrade && this.transport.pause) {
    debug('starting upgrade probes');
    for (var i = 0, l = this.upgrades.length; i < l; i++) {
      this.probe(this.upgrades[i]);
    }
  }
};

/**
 * Handles a packet.
 *
 * @api private
 */

Socket.prototype.onPacket = function (packet) {
  if ('opening' === this.readyState || 'open' === this.readyState ||
      'closing' === this.readyState) {
    debug('socket receive: type "%s", data "%s"', packet.type, packet.data);

    this.emit('packet', packet);

    // Socket is live - any packet counts
    this.emit('heartbeat');

    switch (packet.type) {
      case 'open':
        this.onHandshake(JSON.parse(packet.data));
        break;

      case 'pong':
        this.setPing();
        this.emit('pong');
        break;

      case 'error':
        var err = new Error('server error');
        err.code = packet.data;
        this.onError(err);
        break;

      case 'message':
        this.emit('data', packet.data);
        this.emit('message', packet.data);
        break;
    }
  } else {
    debug('packet received with socket readyState "%s"', this.readyState);
  }
};

/**
 * Called upon handshake completion.
 *
 * @param {Object} handshake obj
 * @api private
 */

Socket.prototype.onHandshake = function (data) {
  this.emit('handshake', data);
  this.id = data.sid;
  this.transport.query.sid = data.sid;
  this.upgrades = this.filterUpgrades(data.upgrades);
  this.pingInterval = data.pingInterval;
  this.pingTimeout = data.pingTimeout;
  this.onOpen();
  // In case open handler closes socket
  if ('closed' === this.readyState) return;
  this.setPing();

  // Prolong liveness of socket on heartbeat
  this.removeListener('heartbeat', this.onHeartbeat);
  this.on('heartbeat', this.onHeartbeat);
};

/**
 * Resets ping timeout.
 *
 * @api private
 */

Socket.prototype.onHeartbeat = function (timeout) {
  clearTimeout(this.pingTimeoutTimer);
  var self = this;
  self.pingTimeoutTimer = setTimeout(function () {
    if ('closed' === self.readyState) return;
    self.onClose('ping timeout');
  }, timeout || (self.pingInterval + self.pingTimeout));
};

/**
 * Pings server every `this.pingInterval` and expects response
 * within `this.pingTimeout` or closes connection.
 *
 * @api private
 */

Socket.prototype.setPing = function () {
  var self = this;
  clearTimeout(self.pingIntervalTimer);
  self.pingIntervalTimer = setTimeout(function () {
    debug('writing ping packet - expecting pong within %sms', self.pingTimeout);
    self.ping();
    self.onHeartbeat(self.pingTimeout);
  }, self.pingInterval);
};

/**
* Sends a ping packet.
*
* @api private
*/

Socket.prototype.ping = function () {
  var self = this;
  this.sendPacket('ping', function () {
    self.emit('ping');
  });
};

/**
 * Called on `drain` event
 *
 * @api private
 */

Socket.prototype.onDrain = function () {
  this.writeBuffer.splice(0, this.prevBufferLen);

  // setting prevBufferLen = 0 is very important
  // for example, when upgrading, upgrade packet is sent over,
  // and a nonzero prevBufferLen could cause problems on `drain`
  this.prevBufferLen = 0;

  if (0 === this.writeBuffer.length) {
    this.emit('drain');
  } else {
    this.flush();
  }
};

/**
 * Flush write buffers.
 *
 * @api private
 */

Socket.prototype.flush = function () {
  if ('closed' !== this.readyState && this.transport.writable &&
    !this.upgrading && this.writeBuffer.length) {
    debug('flushing %d packets in socket', this.writeBuffer.length);
    this.transport.send(this.writeBuffer);
    // keep track of current length of writeBuffer
    // splice writeBuffer and callbackBuffer on `drain`
    this.prevBufferLen = this.writeBuffer.length;
    this.emit('flush');
  }
};

/**
 * Sends a message.
 *
 * @param {String} message.
 * @param {Function} callback function.
 * @param {Object} options.
 * @return {Socket} for chaining.
 * @api public
 */

Socket.prototype.write =
Socket.prototype.send = function (msg, options, fn) {
  this.sendPacket('message', msg, options, fn);
  return this;
};

/**
 * Sends a packet.
 *
 * @param {String} packet type.
 * @param {String} data.
 * @param {Object} options.
 * @param {Function} callback function.
 * @api private
 */

Socket.prototype.sendPacket = function (type, data, options, fn) {
  if ('function' === typeof data) {
    fn = data;
    data = undefined;
  }

  if ('function' === typeof options) {
    fn = options;
    options = null;
  }

  if ('closing' === this.readyState || 'closed' === this.readyState) {
    return;
  }

  options = options || {};
  options.compress = false !== options.compress;

  var packet = {
    type: type,
    data: data,
    options: options
  };
  this.emit('packetCreate', packet);
  this.writeBuffer.push(packet);
  if (fn) this.once('flush', fn);
  this.flush();
};

/**
 * Closes the connection.
 *
 * @api private
 */

Socket.prototype.close = function () {
  if ('opening' === this.readyState || 'open' === this.readyState) {
    this.readyState = 'closing';

    var self = this;

    if (this.writeBuffer.length) {
      this.once('drain', function () {
        if (this.upgrading) {
          waitForUpgrade();
        } else {
          close();
        }
      });
    } else if (this.upgrading) {
      waitForUpgrade();
    } else {
      close();
    }
  }

  function close () {
    self.onClose('forced close');
    debug('socket closing - telling transport to close');
    self.transport.close();
  }

  function cleanupAndClose () {
    self.removeListener('upgrade', cleanupAndClose);
    self.removeListener('upgradeError', cleanupAndClose);
    close();
  }

  function waitForUpgrade () {
    // wait for upgrade to finish since we can't send packets while pausing a transport
    self.once('upgrade', cleanupAndClose);
    self.once('upgradeError', cleanupAndClose);
  }

  return this;
};

/**
 * Called upon transport error
 *
 * @api private
 */

Socket.prototype.onError = function (err) {
  debug('socket error %j', err);
  Socket.priorWebsocketSuccess = false;
  this.emit('error', err);
  this.onClose('transport error', err);
};

/**
 * Called upon transport close.
 *
 * @api private
 */

Socket.prototype.onClose = function (reason, desc) {
  if ('opening' === this.readyState || 'open' === this.readyState || 'closing' === this.readyState) {
    debug('socket close with reason: "%s"', reason);
    var self = this;

    // clear timers
    clearTimeout(this.pingIntervalTimer);
    clearTimeout(this.pingTimeoutTimer);

    // stop event from firing again for transport
    this.transport.removeAllListeners('close');

    // ensure transport won't stay open
    this.transport.close();

    // ignore further transport communication
    this.transport.removeAllListeners();

    // set ready state
    this.readyState = 'closed';

    // clear session id
    this.id = null;

    // emit close event
    this.emit('close', reason, desc);

    // clean buffers after, so users can still
    // grab the buffers on `close` event
    self.writeBuffer = [];
    self.prevBufferLen = 0;
  }
};

/**
 * Filters upgrades, returning only those matching client transports.
 *
 * @param {Array} server upgrades
 * @api private
 *
 */

Socket.prototype.filterUpgrades = function (upgrades) {
  var filteredUpgrades = [];
  for (var i = 0, j = upgrades.length; i < j; i++) {
    if (~index(this.transports, upgrades[i])) filteredUpgrades.push(upgrades[i]);
  }
  return filteredUpgrades;
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)))

/***/ }),
/* 83 */
/***/ (function(module, exports) {


/**
 * Module exports.
 *
 * Logic borrowed from Modernizr:
 *
 *   - https://github.com/Modernizr/Modernizr/blob/master/feature-detects/cors.js
 */

try {
  module.exports = typeof XMLHttpRequest !== 'undefined' &&
    'withCredentials' in new XMLHttpRequest();
} catch (err) {
  // if XMLHttp support is disabled in IE then it will throw
  // when trying to create
  module.exports = false;
}


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * Module requirements.
 */

var XMLHttpRequest = __webpack_require__(45);
var Polling = __webpack_require__(60);
var Emitter = __webpack_require__(28);
var inherit = __webpack_require__(35);
var debug = __webpack_require__(26)('engine.io-client:polling-xhr');

/**
 * Module exports.
 */

module.exports = XHR;
module.exports.Request = Request;

/**
 * Empty function
 */

function empty () {}

/**
 * XHR Polling constructor.
 *
 * @param {Object} opts
 * @api public
 */

function XHR (opts) {
  Polling.call(this, opts);
  this.requestTimeout = opts.requestTimeout;
  this.extraHeaders = opts.extraHeaders;

  if (global.location) {
    var isSSL = 'https:' === location.protocol;
    var port = location.port;

    // some user agents have empty `location.port`
    if (!port) {
      port = isSSL ? 443 : 80;
    }

    this.xd = opts.hostname !== global.location.hostname ||
      port !== opts.port;
    this.xs = opts.secure !== isSSL;
  }
}

/**
 * Inherits from Polling.
 */

inherit(XHR, Polling);

/**
 * XHR supports binary
 */

XHR.prototype.supportsBinary = true;

/**
 * Creates a request.
 *
 * @param {String} method
 * @api private
 */

XHR.prototype.request = function (opts) {
  opts = opts || {};
  opts.uri = this.uri();
  opts.xd = this.xd;
  opts.xs = this.xs;
  opts.agent = this.agent || false;
  opts.supportsBinary = this.supportsBinary;
  opts.enablesXDR = this.enablesXDR;

  // SSL options for Node.js client
  opts.pfx = this.pfx;
  opts.key = this.key;
  opts.passphrase = this.passphrase;
  opts.cert = this.cert;
  opts.ca = this.ca;
  opts.ciphers = this.ciphers;
  opts.rejectUnauthorized = this.rejectUnauthorized;
  opts.requestTimeout = this.requestTimeout;

  // other options for Node.js client
  opts.extraHeaders = this.extraHeaders;

  return new Request(opts);
};

/**
 * Sends data.
 *
 * @param {String} data to send.
 * @param {Function} called upon flush.
 * @api private
 */

XHR.prototype.doWrite = function (data, fn) {
  var isBinary = typeof data !== 'string' && data !== undefined;
  var req = this.request({ method: 'POST', data: data, isBinary: isBinary });
  var self = this;
  req.on('success', fn);
  req.on('error', function (err) {
    self.onError('xhr post error', err);
  });
  this.sendXhr = req;
};

/**
 * Starts a poll cycle.
 *
 * @api private
 */

XHR.prototype.doPoll = function () {
  debug('xhr poll');
  var req = this.request();
  var self = this;
  req.on('data', function (data) {
    self.onData(data);
  });
  req.on('error', function (err) {
    self.onError('xhr poll error', err);
  });
  this.pollXhr = req;
};

/**
 * Request constructor
 *
 * @param {Object} options
 * @api public
 */

function Request (opts) {
  this.method = opts.method || 'GET';
  this.uri = opts.uri;
  this.xd = !!opts.xd;
  this.xs = !!opts.xs;
  this.async = false !== opts.async;
  this.data = undefined !== opts.data ? opts.data : null;
  this.agent = opts.agent;
  this.isBinary = opts.isBinary;
  this.supportsBinary = opts.supportsBinary;
  this.enablesXDR = opts.enablesXDR;
  this.requestTimeout = opts.requestTimeout;

  // SSL options for Node.js client
  this.pfx = opts.pfx;
  this.key = opts.key;
  this.passphrase = opts.passphrase;
  this.cert = opts.cert;
  this.ca = opts.ca;
  this.ciphers = opts.ciphers;
  this.rejectUnauthorized = opts.rejectUnauthorized;

  // other options for Node.js client
  this.extraHeaders = opts.extraHeaders;

  this.create();
}

/**
 * Mix in `Emitter`.
 */

Emitter(Request.prototype);

/**
 * Creates the XHR object and sends the request.
 *
 * @api private
 */

Request.prototype.create = function () {
  var opts = { agent: this.agent, xdomain: this.xd, xscheme: this.xs, enablesXDR: this.enablesXDR };

  // SSL options for Node.js client
  opts.pfx = this.pfx;
  opts.key = this.key;
  opts.passphrase = this.passphrase;
  opts.cert = this.cert;
  opts.ca = this.ca;
  opts.ciphers = this.ciphers;
  opts.rejectUnauthorized = this.rejectUnauthorized;

  var xhr = this.xhr = new XMLHttpRequest(opts);
  var self = this;

  try {
    debug('xhr open %s: %s', this.method, this.uri);
    xhr.open(this.method, this.uri, this.async);
    try {
      if (this.extraHeaders) {
        xhr.setDisableHeaderCheck && xhr.setDisableHeaderCheck(true);
        for (var i in this.extraHeaders) {
          if (this.extraHeaders.hasOwnProperty(i)) {
            xhr.setRequestHeader(i, this.extraHeaders[i]);
          }
        }
      }
    } catch (e) {}

    if ('POST' === this.method) {
      try {
        if (this.isBinary) {
          xhr.setRequestHeader('Content-type', 'application/octet-stream');
        } else {
          xhr.setRequestHeader('Content-type', 'text/plain;charset=UTF-8');
        }
      } catch (e) {}
    }

    try {
      xhr.setRequestHeader('Accept', '*/*');
    } catch (e) {}

    // ie6 check
    if ('withCredentials' in xhr) {
      xhr.withCredentials = true;
    }

    if (this.requestTimeout) {
      xhr.timeout = this.requestTimeout;
    }

    if (this.hasXDR()) {
      xhr.onload = function () {
        self.onLoad();
      };
      xhr.onerror = function () {
        self.onError(xhr.responseText);
      };
    } else {
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 2) {
          try {
            var contentType = xhr.getResponseHeader('Content-Type');
            if (self.supportsBinary && contentType === 'application/octet-stream') {
              xhr.responseType = 'arraybuffer';
            }
          } catch (e) {}
        }
        if (4 !== xhr.readyState) return;
        if (200 === xhr.status || 1223 === xhr.status) {
          self.onLoad();
        } else {
          // make sure the `error` event handler that's user-set
          // does not throw in the same tick and gets caught here
          setTimeout(function () {
            self.onError(xhr.status);
          }, 0);
        }
      };
    }

    debug('xhr data %s', this.data);
    xhr.send(this.data);
  } catch (e) {
    // Need to defer since .create() is called directly fhrom the constructor
    // and thus the 'error' event can only be only bound *after* this exception
    // occurs.  Therefore, also, we cannot throw here at all.
    setTimeout(function () {
      self.onError(e);
    }, 0);
    return;
  }

  if (global.document) {
    this.index = Request.requestsCount++;
    Request.requests[this.index] = this;
  }
};

/**
 * Called upon successful response.
 *
 * @api private
 */

Request.prototype.onSuccess = function () {
  this.emit('success');
  this.cleanup();
};

/**
 * Called if we have data.
 *
 * @api private
 */

Request.prototype.onData = function (data) {
  this.emit('data', data);
  this.onSuccess();
};

/**
 * Called upon error.
 *
 * @api private
 */

Request.prototype.onError = function (err) {
  this.emit('error', err);
  this.cleanup(true);
};

/**
 * Cleans up house.
 *
 * @api private
 */

Request.prototype.cleanup = function (fromError) {
  if ('undefined' === typeof this.xhr || null === this.xhr) {
    return;
  }
  // xmlhttprequest
  if (this.hasXDR()) {
    this.xhr.onload = this.xhr.onerror = empty;
  } else {
    this.xhr.onreadystatechange = empty;
  }

  if (fromError) {
    try {
      this.xhr.abort();
    } catch (e) {}
  }

  if (global.document) {
    delete Request.requests[this.index];
  }

  this.xhr = null;
};

/**
 * Called upon load.
 *
 * @api private
 */

Request.prototype.onLoad = function () {
  var data;
  try {
    var contentType;
    try {
      contentType = this.xhr.getResponseHeader('Content-Type');
    } catch (e) {}
    if (contentType === 'application/octet-stream') {
      data = this.xhr.response || this.xhr.responseText;
    } else {
      data = this.xhr.responseText;
    }
  } catch (e) {
    this.onError(e);
  }
  if (null != data) {
    this.onData(data);
  }
};

/**
 * Check if it has XDomainRequest.
 *
 * @api private
 */

Request.prototype.hasXDR = function () {
  return 'undefined' !== typeof global.XDomainRequest && !this.xs && this.enablesXDR;
};

/**
 * Aborts the request.
 *
 * @api public
 */

Request.prototype.abort = function () {
  this.cleanup();
};

/**
 * Aborts pending requests when unloading the window. This is needed to prevent
 * memory leaks (e.g. when using IE) and to ensure that no spurious error is
 * emitted.
 */

Request.requestsCount = 0;
Request.requests = {};

if (global.document) {
  if (global.attachEvent) {
    global.attachEvent('onunload', unloadHandler);
  } else if (global.addEventListener) {
    global.addEventListener('beforeunload', unloadHandler, false);
  }
}

function unloadHandler () {
  for (var i in Request.requests) {
    if (Request.requests.hasOwnProperty(i)) {
      Request.requests[i].abort();
    }
  }
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)))

/***/ }),
/* 85 */
/***/ (function(module, exports) {


/**
 * Gets the keys for an object.
 *
 * @return {Array} keys
 * @api private
 */

module.exports = Object.keys || function keys (obj){
  var arr = [];
  var has = Object.prototype.hasOwnProperty;

  for (var i in obj) {
    if (has.call(obj, i)) {
      arr.push(i);
    }
  }
  return arr;
};


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(87)
var ieee754 = __webpack_require__(88)
var isArray = __webpack_require__(89)

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)))

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  for (var i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(
      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
    ))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),
/* 88 */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),
/* 89 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 90 */
/***/ (function(module, exports) {

/**
 * An abstraction for slicing an arraybuffer even when
 * ArrayBuffer.prototype.slice is not supported
 *
 * @api public
 */

module.exports = function(arraybuffer, start, end) {
  var bytes = arraybuffer.byteLength;
  start = start || 0;
  end = end || bytes;

  if (arraybuffer.slice) { return arraybuffer.slice(start, end); }

  if (start < 0) { start += bytes; }
  if (end < 0) { end += bytes; }
  if (end > bytes) { end = bytes; }

  if (start >= bytes || start >= end || bytes === 0) {
    return new ArrayBuffer(0);
  }

  var abv = new Uint8Array(arraybuffer);
  var result = new Uint8Array(end - start);
  for (var i = start, ii = 0; i < end; i++, ii++) {
    result[ii] = abv[i];
  }
  return result.buffer;
};


/***/ }),
/* 91 */
/***/ (function(module, exports) {

module.exports = after

function after(count, callback, err_cb) {
    var bail = false
    err_cb = err_cb || noop
    proxy.count = count

    return (count === 0) ? callback() : proxy

    function proxy(err, result) {
        if (proxy.count <= 0) {
            throw new Error('after called too many times')
        }
        --proxy.count

        // after first error, rest are passed to err_cb
        if (err) {
            bail = true
            callback(err)
            // future error callbacks will go to error handler
            callback = err_cb
        } else if (proxy.count === 0 && !bail) {
            callback(null, result)
        }
    }
}

function noop() {}


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/utf8js v2.1.2 by @mathias */
;(function(root) {

	// Detect free variables `exports`
	var freeExports = typeof exports == 'object' && exports;

	// Detect free variable `module`
	var freeModule = typeof module == 'object' && module &&
		module.exports == freeExports && module;

	// Detect free variable `global`, from Node.js or Browserified code,
	// and use it as `root`
	var freeGlobal = typeof global == 'object' && global;
	if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
		root = freeGlobal;
	}

	/*--------------------------------------------------------------------------*/

	var stringFromCharCode = String.fromCharCode;

	// Taken from https://mths.be/punycode
	function ucs2decode(string) {
		var output = [];
		var counter = 0;
		var length = string.length;
		var value;
		var extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	// Taken from https://mths.be/punycode
	function ucs2encode(array) {
		var length = array.length;
		var index = -1;
		var value;
		var output = '';
		while (++index < length) {
			value = array[index];
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
		}
		return output;
	}

	function checkScalarValue(codePoint, strict) {
		if (codePoint >= 0xD800 && codePoint <= 0xDFFF) {
			if (strict) {
				throw Error(
					'Lone surrogate U+' + codePoint.toString(16).toUpperCase() +
					' is not a scalar value'
				);
			}
			return false;
		}
		return true;
	}
	/*--------------------------------------------------------------------------*/

	function createByte(codePoint, shift) {
		return stringFromCharCode(((codePoint >> shift) & 0x3F) | 0x80);
	}

	function encodeCodePoint(codePoint, strict) {
		if ((codePoint & 0xFFFFFF80) == 0) { // 1-byte sequence
			return stringFromCharCode(codePoint);
		}
		var symbol = '';
		if ((codePoint & 0xFFFFF800) == 0) { // 2-byte sequence
			symbol = stringFromCharCode(((codePoint >> 6) & 0x1F) | 0xC0);
		}
		else if ((codePoint & 0xFFFF0000) == 0) { // 3-byte sequence
			if (!checkScalarValue(codePoint, strict)) {
				codePoint = 0xFFFD;
			}
			symbol = stringFromCharCode(((codePoint >> 12) & 0x0F) | 0xE0);
			symbol += createByte(codePoint, 6);
		}
		else if ((codePoint & 0xFFE00000) == 0) { // 4-byte sequence
			symbol = stringFromCharCode(((codePoint >> 18) & 0x07) | 0xF0);
			symbol += createByte(codePoint, 12);
			symbol += createByte(codePoint, 6);
		}
		symbol += stringFromCharCode((codePoint & 0x3F) | 0x80);
		return symbol;
	}

	function utf8encode(string, opts) {
		opts = opts || {};
		var strict = false !== opts.strict;

		var codePoints = ucs2decode(string);
		var length = codePoints.length;
		var index = -1;
		var codePoint;
		var byteString = '';
		while (++index < length) {
			codePoint = codePoints[index];
			byteString += encodeCodePoint(codePoint, strict);
		}
		return byteString;
	}

	/*--------------------------------------------------------------------------*/

	function readContinuationByte() {
		if (byteIndex >= byteCount) {
			throw Error('Invalid byte index');
		}

		var continuationByte = byteArray[byteIndex] & 0xFF;
		byteIndex++;

		if ((continuationByte & 0xC0) == 0x80) {
			return continuationByte & 0x3F;
		}

		// If we end up here, it’s not a continuation byte
		throw Error('Invalid continuation byte');
	}

	function decodeSymbol(strict) {
		var byte1;
		var byte2;
		var byte3;
		var byte4;
		var codePoint;

		if (byteIndex > byteCount) {
			throw Error('Invalid byte index');
		}

		if (byteIndex == byteCount) {
			return false;
		}

		// Read first byte
		byte1 = byteArray[byteIndex] & 0xFF;
		byteIndex++;

		// 1-byte sequence (no continuation bytes)
		if ((byte1 & 0x80) == 0) {
			return byte1;
		}

		// 2-byte sequence
		if ((byte1 & 0xE0) == 0xC0) {
			byte2 = readContinuationByte();
			codePoint = ((byte1 & 0x1F) << 6) | byte2;
			if (codePoint >= 0x80) {
				return codePoint;
			} else {
				throw Error('Invalid continuation byte');
			}
		}

		// 3-byte sequence (may include unpaired surrogates)
		if ((byte1 & 0xF0) == 0xE0) {
			byte2 = readContinuationByte();
			byte3 = readContinuationByte();
			codePoint = ((byte1 & 0x0F) << 12) | (byte2 << 6) | byte3;
			if (codePoint >= 0x0800) {
				return checkScalarValue(codePoint, strict) ? codePoint : 0xFFFD;
			} else {
				throw Error('Invalid continuation byte');
			}
		}

		// 4-byte sequence
		if ((byte1 & 0xF8) == 0xF0) {
			byte2 = readContinuationByte();
			byte3 = readContinuationByte();
			byte4 = readContinuationByte();
			codePoint = ((byte1 & 0x07) << 0x12) | (byte2 << 0x0C) |
				(byte3 << 0x06) | byte4;
			if (codePoint >= 0x010000 && codePoint <= 0x10FFFF) {
				return codePoint;
			}
		}

		throw Error('Invalid UTF-8 detected');
	}

	var byteArray;
	var byteCount;
	var byteIndex;
	function utf8decode(byteString, opts) {
		opts = opts || {};
		var strict = false !== opts.strict;

		byteArray = ucs2decode(byteString);
		byteCount = byteArray.length;
		byteIndex = 0;
		var codePoints = [];
		var tmp;
		while ((tmp = decodeSymbol(strict)) !== false) {
			codePoints.push(tmp);
		}
		return ucs2encode(codePoints);
	}

	/*--------------------------------------------------------------------------*/

	var utf8 = {
		'version': '2.1.2',
		'encode': utf8encode,
		'decode': utf8decode
	};

	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		true
	) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
			return utf8;
		}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}	else if (freeExports && !freeExports.nodeType) {
		if (freeModule) { // in Node.js or RingoJS v0.8.0+
			freeModule.exports = utf8;
		} else { // in Narwhal or RingoJS v0.7.0-
			var object = {};
			var hasOwnProperty = object.hasOwnProperty;
			for (var key in utf8) {
				hasOwnProperty.call(utf8, key) && (freeExports[key] = utf8[key]);
			}
		}
	} else { // in Rhino or a web browser
		root.utf8 = utf8;
	}

}(this));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(55)(module), __webpack_require__(9)))

/***/ }),
/* 93 */
/***/ (function(module, exports) {

/*
 * base64-arraybuffer
 * https://github.com/niklasvh/base64-arraybuffer
 *
 * Copyright (c) 2012 Niklas von Hertzen
 * Licensed under the MIT license.
 */
(function(){
  "use strict";

  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

  // Use a lookup table to find the index.
  var lookup = new Uint8Array(256);
  for (var i = 0; i < chars.length; i++) {
    lookup[chars.charCodeAt(i)] = i;
  }

  exports.encode = function(arraybuffer) {
    var bytes = new Uint8Array(arraybuffer),
    i, len = bytes.length, base64 = "";

    for (i = 0; i < len; i+=3) {
      base64 += chars[bytes[i] >> 2];
      base64 += chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
      base64 += chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
      base64 += chars[bytes[i + 2] & 63];
    }

    if ((len % 3) === 2) {
      base64 = base64.substring(0, base64.length - 1) + "=";
    } else if (len % 3 === 1) {
      base64 = base64.substring(0, base64.length - 2) + "==";
    }

    return base64;
  };

  exports.decode =  function(base64) {
    var bufferLength = base64.length * 0.75,
    len = base64.length, i, p = 0,
    encoded1, encoded2, encoded3, encoded4;

    if (base64[base64.length - 1] === "=") {
      bufferLength--;
      if (base64[base64.length - 2] === "=") {
        bufferLength--;
      }
    }

    var arraybuffer = new ArrayBuffer(bufferLength),
    bytes = new Uint8Array(arraybuffer);

    for (i = 0; i < len; i+=4) {
      encoded1 = lookup[base64.charCodeAt(i)];
      encoded2 = lookup[base64.charCodeAt(i+1)];
      encoded3 = lookup[base64.charCodeAt(i+2)];
      encoded4 = lookup[base64.charCodeAt(i+3)];

      bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
      bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
      bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
    }

    return arraybuffer;
  };
})();


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * Create a blob builder even when vendor prefixes exist
 */

var BlobBuilder = global.BlobBuilder
  || global.WebKitBlobBuilder
  || global.MSBlobBuilder
  || global.MozBlobBuilder;

/**
 * Check if Blob constructor is supported
 */

var blobSupported = (function() {
  try {
    var a = new Blob(['hi']);
    return a.size === 2;
  } catch(e) {
    return false;
  }
})();

/**
 * Check if Blob constructor supports ArrayBufferViews
 * Fails in Safari 6, so we need to map to ArrayBuffers there.
 */

var blobSupportsArrayBufferView = blobSupported && (function() {
  try {
    var b = new Blob([new Uint8Array([1,2])]);
    return b.size === 2;
  } catch(e) {
    return false;
  }
})();

/**
 * Check if BlobBuilder is supported
 */

var blobBuilderSupported = BlobBuilder
  && BlobBuilder.prototype.append
  && BlobBuilder.prototype.getBlob;

/**
 * Helper function that maps ArrayBufferViews to ArrayBuffers
 * Used by BlobBuilder constructor and old browsers that didn't
 * support it in the Blob constructor.
 */

function mapArrayBufferViews(ary) {
  for (var i = 0; i < ary.length; i++) {
    var chunk = ary[i];
    if (chunk.buffer instanceof ArrayBuffer) {
      var buf = chunk.buffer;

      // if this is a subarray, make a copy so we only
      // include the subarray region from the underlying buffer
      if (chunk.byteLength !== buf.byteLength) {
        var copy = new Uint8Array(chunk.byteLength);
        copy.set(new Uint8Array(buf, chunk.byteOffset, chunk.byteLength));
        buf = copy.buffer;
      }

      ary[i] = buf;
    }
  }
}

function BlobBuilderConstructor(ary, options) {
  options = options || {};

  var bb = new BlobBuilder();
  mapArrayBufferViews(ary);

  for (var i = 0; i < ary.length; i++) {
    bb.append(ary[i]);
  }

  return (options.type) ? bb.getBlob(options.type) : bb.getBlob();
};

function BlobConstructor(ary, options) {
  mapArrayBufferViews(ary);
  return new Blob(ary, options || {});
};

module.exports = (function() {
  if (blobSupported) {
    return blobSupportsArrayBufferView ? global.Blob : BlobConstructor;
  } else if (blobBuilderSupported) {
    return BlobBuilderConstructor;
  } else {
    return undefined;
  }
})();

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)))

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {
/**
 * Module requirements.
 */

var Polling = __webpack_require__(60);
var inherit = __webpack_require__(35);

/**
 * Module exports.
 */

module.exports = JSONPPolling;

/**
 * Cached regular expressions.
 */

var rNewline = /\n/g;
var rEscapedNewline = /\\n/g;

/**
 * Global JSONP callbacks.
 */

var callbacks;

/**
 * Noop.
 */

function empty () { }

/**
 * JSONP Polling constructor.
 *
 * @param {Object} opts.
 * @api public
 */

function JSONPPolling (opts) {
  Polling.call(this, opts);

  this.query = this.query || {};

  // define global callbacks array if not present
  // we do this here (lazily) to avoid unneeded global pollution
  if (!callbacks) {
    // we need to consider multiple engines in the same page
    if (!global.___eio) global.___eio = [];
    callbacks = global.___eio;
  }

  // callback identifier
  this.index = callbacks.length;

  // add callback to jsonp global
  var self = this;
  callbacks.push(function (msg) {
    self.onData(msg);
  });

  // append to query string
  this.query.j = this.index;

  // prevent spurious errors from being emitted when the window is unloaded
  if (global.document && global.addEventListener) {
    global.addEventListener('beforeunload', function () {
      if (self.script) self.script.onerror = empty;
    }, false);
  }
}

/**
 * Inherits from Polling.
 */

inherit(JSONPPolling, Polling);

/*
 * JSONP only supports binary as base64 encoded strings
 */

JSONPPolling.prototype.supportsBinary = false;

/**
 * Closes the socket.
 *
 * @api private
 */

JSONPPolling.prototype.doClose = function () {
  if (this.script) {
    this.script.parentNode.removeChild(this.script);
    this.script = null;
  }

  if (this.form) {
    this.form.parentNode.removeChild(this.form);
    this.form = null;
    this.iframe = null;
  }

  Polling.prototype.doClose.call(this);
};

/**
 * Starts a poll cycle.
 *
 * @api private
 */

JSONPPolling.prototype.doPoll = function () {
  var self = this;
  var script = document.createElement('script');

  if (this.script) {
    this.script.parentNode.removeChild(this.script);
    this.script = null;
  }

  script.async = true;
  script.src = this.uri();
  script.onerror = function (e) {
    self.onError('jsonp poll error', e);
  };

  var insertAt = document.getElementsByTagName('script')[0];
  if (insertAt) {
    insertAt.parentNode.insertBefore(script, insertAt);
  } else {
    (document.head || document.body).appendChild(script);
  }
  this.script = script;

  var isUAgecko = 'undefined' !== typeof navigator && /gecko/i.test(navigator.userAgent);

  if (isUAgecko) {
    setTimeout(function () {
      var iframe = document.createElement('iframe');
      document.body.appendChild(iframe);
      document.body.removeChild(iframe);
    }, 100);
  }
};

/**
 * Writes with a hidden iframe.
 *
 * @param {String} data to send
 * @param {Function} called upon flush.
 * @api private
 */

JSONPPolling.prototype.doWrite = function (data, fn) {
  var self = this;

  if (!this.form) {
    var form = document.createElement('form');
    var area = document.createElement('textarea');
    var id = this.iframeId = 'eio_iframe_' + this.index;
    var iframe;

    form.className = 'socketio';
    form.style.position = 'absolute';
    form.style.top = '-1000px';
    form.style.left = '-1000px';
    form.target = id;
    form.method = 'POST';
    form.setAttribute('accept-charset', 'utf-8');
    area.name = 'd';
    form.appendChild(area);
    document.body.appendChild(form);

    this.form = form;
    this.area = area;
  }

  this.form.action = this.uri();

  function complete () {
    initIframe();
    fn();
  }

  function initIframe () {
    if (self.iframe) {
      try {
        self.form.removeChild(self.iframe);
      } catch (e) {
        self.onError('jsonp polling iframe removal error', e);
      }
    }

    try {
      // ie6 dynamic iframes with target="" support (thanks Chris Lambacher)
      var html = '<iframe src="javascript:0" name="' + self.iframeId + '">';
      iframe = document.createElement(html);
    } catch (e) {
      iframe = document.createElement('iframe');
      iframe.name = self.iframeId;
      iframe.src = 'javascript:0';
    }

    iframe.id = self.iframeId;

    self.form.appendChild(iframe);
    self.iframe = iframe;
  }

  initIframe();

  // escape \n to prevent it from being converted into \r\n by some UAs
  // double escaping is required for escaped new lines because unescaping of new lines can be done safely on server-side
  data = data.replace(rEscapedNewline, '\\\n');
  this.area.value = data.replace(rNewline, '\\n');

  try {
    this.form.submit();
  } catch (e) {}

  if (this.iframe.attachEvent) {
    this.iframe.onreadystatechange = function () {
      if (self.iframe.readyState === 'complete') {
        complete();
      }
    };
  } else {
    this.iframe.onload = complete;
  }
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)))

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * Module dependencies.
 */

var Transport = __webpack_require__(46);
var parser = __webpack_require__(29);
var parseqs = __webpack_require__(34);
var inherit = __webpack_require__(35);
var yeast = __webpack_require__(62);
var debug = __webpack_require__(26)('engine.io-client:websocket');
var BrowserWebSocket = global.WebSocket || global.MozWebSocket;
var NodeWebSocket;
if (typeof window === 'undefined') {
  try {
    NodeWebSocket = __webpack_require__(97);
  } catch (e) { }
}

/**
 * Get either the `WebSocket` or `MozWebSocket` globals
 * in the browser or try to resolve WebSocket-compatible
 * interface exposed by `ws` for Node-like environment.
 */

var WebSocket = BrowserWebSocket;
if (!WebSocket && typeof window === 'undefined') {
  WebSocket = NodeWebSocket;
}

/**
 * Module exports.
 */

module.exports = WS;

/**
 * WebSocket transport constructor.
 *
 * @api {Object} connection options
 * @api public
 */

function WS (opts) {
  var forceBase64 = (opts && opts.forceBase64);
  if (forceBase64) {
    this.supportsBinary = false;
  }
  this.perMessageDeflate = opts.perMessageDeflate;
  this.usingBrowserWebSocket = BrowserWebSocket && !opts.forceNode;
  this.protocols = opts.protocols;
  if (!this.usingBrowserWebSocket) {
    WebSocket = NodeWebSocket;
  }
  Transport.call(this, opts);
}

/**
 * Inherits from Transport.
 */

inherit(WS, Transport);

/**
 * Transport name.
 *
 * @api public
 */

WS.prototype.name = 'websocket';

/*
 * WebSockets support binary
 */

WS.prototype.supportsBinary = true;

/**
 * Opens socket.
 *
 * @api private
 */

WS.prototype.doOpen = function () {
  if (!this.check()) {
    // let probe timeout
    return;
  }

  var uri = this.uri();
  var protocols = this.protocols;
  var opts = {
    agent: this.agent,
    perMessageDeflate: this.perMessageDeflate
  };

  // SSL options for Node.js client
  opts.pfx = this.pfx;
  opts.key = this.key;
  opts.passphrase = this.passphrase;
  opts.cert = this.cert;
  opts.ca = this.ca;
  opts.ciphers = this.ciphers;
  opts.rejectUnauthorized = this.rejectUnauthorized;
  if (this.extraHeaders) {
    opts.headers = this.extraHeaders;
  }
  if (this.localAddress) {
    opts.localAddress = this.localAddress;
  }

  try {
    this.ws = this.usingBrowserWebSocket ? (protocols ? new WebSocket(uri, protocols) : new WebSocket(uri)) : new WebSocket(uri, protocols, opts);
  } catch (err) {
    return this.emit('error', err);
  }

  if (this.ws.binaryType === undefined) {
    this.supportsBinary = false;
  }

  if (this.ws.supports && this.ws.supports.binary) {
    this.supportsBinary = true;
    this.ws.binaryType = 'nodebuffer';
  } else {
    this.ws.binaryType = 'arraybuffer';
  }

  this.addEventListeners();
};

/**
 * Adds event listeners to the socket
 *
 * @api private
 */

WS.prototype.addEventListeners = function () {
  var self = this;

  this.ws.onopen = function () {
    self.onOpen();
  };
  this.ws.onclose = function () {
    self.onClose();
  };
  this.ws.onmessage = function (ev) {
    self.onData(ev.data);
  };
  this.ws.onerror = function (e) {
    self.onError('websocket error', e);
  };
};

/**
 * Writes data to socket.
 *
 * @param {Array} array of packets.
 * @api private
 */

WS.prototype.write = function (packets) {
  var self = this;
  this.writable = false;

  // encodePacket efficient as it uses WS framing
  // no need for encodePayload
  var total = packets.length;
  for (var i = 0, l = total; i < l; i++) {
    (function (packet) {
      parser.encodePacket(packet, self.supportsBinary, function (data) {
        if (!self.usingBrowserWebSocket) {
          // always create a new object (GH-437)
          var opts = {};
          if (packet.options) {
            opts.compress = packet.options.compress;
          }

          if (self.perMessageDeflate) {
            var len = 'string' === typeof data ? global.Buffer.byteLength(data) : data.length;
            if (len < self.perMessageDeflate.threshold) {
              opts.compress = false;
            }
          }
        }

        // Sometimes the websocket has already been closed but the browser didn't
        // have a chance of informing us about it yet, in that case send will
        // throw an error
        try {
          if (self.usingBrowserWebSocket) {
            // TypeError is thrown when passing the second argument on Safari
            self.ws.send(data);
          } else {
            self.ws.send(data, opts);
          }
        } catch (e) {
          debug('websocket closed before onclose event');
        }

        --total || done();
      });
    })(packets[i]);
  }

  function done () {
    self.emit('flush');

    // fake drain
    // defer to next tick to allow Socket to clear writeBuffer
    setTimeout(function () {
      self.writable = true;
      self.emit('drain');
    }, 0);
  }
};

/**
 * Called upon close
 *
 * @api private
 */

WS.prototype.onClose = function () {
  Transport.prototype.onClose.call(this);
};

/**
 * Closes socket.
 *
 * @api private
 */

WS.prototype.doClose = function () {
  if (typeof this.ws !== 'undefined') {
    this.ws.close();
  }
};

/**
 * Generates uri for connection.
 *
 * @api private
 */

WS.prototype.uri = function () {
  var query = this.query || {};
  var schema = this.secure ? 'wss' : 'ws';
  var port = '';

  // avoid port if default for schema
  if (this.port && (('wss' === schema && Number(this.port) !== 443) ||
    ('ws' === schema && Number(this.port) !== 80))) {
    port = ':' + this.port;
  }

  // append timestamp to URI
  if (this.timestampRequests) {
    query[this.timestampParam] = yeast();
  }

  // communicate binary support capabilities
  if (!this.supportsBinary) {
    query.b64 = 1;
  }

  query = parseqs.encode(query);

  // prepend ? to query
  if (query.length) {
    query = '?' + query;
  }

  var ipv6 = this.hostname.indexOf(':') !== -1;
  return schema + '://' + (ipv6 ? '[' + this.hostname + ']' : this.hostname) + port + this.path + query;
};

/**
 * Feature detection for WebSocket.
 *
 * @return {Boolean} whether this transport is available.
 * @api public
 */

WS.prototype.check = function () {
  return !!WebSocket && !('__initialize' in WebSocket && this.name === WS.prototype.name);
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)))

/***/ }),
/* 97 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 98 */
/***/ (function(module, exports) {

module.exports = toArray

function toArray(list, index) {
    var array = []

    index = index || 0

    for (var i = index || 0; i < list.length; i++) {
        array[i - index] = list[i]
    }

    return array
}


/***/ }),
/* 99 */
/***/ (function(module, exports) {


/**
 * Expose `Backoff`.
 */

module.exports = Backoff;

/**
 * Initialize backoff timer with `opts`.
 *
 * - `min` initial timeout in milliseconds [100]
 * - `max` max timeout [10000]
 * - `jitter` [0]
 * - `factor` [2]
 *
 * @param {Object} opts
 * @api public
 */

function Backoff(opts) {
  opts = opts || {};
  this.ms = opts.min || 100;
  this.max = opts.max || 10000;
  this.factor = opts.factor || 2;
  this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
  this.attempts = 0;
}

/**
 * Return the backoff duration.
 *
 * @return {Number}
 * @api public
 */

Backoff.prototype.duration = function(){
  var ms = this.ms * Math.pow(this.factor, this.attempts++);
  if (this.jitter) {
    var rand =  Math.random();
    var deviation = Math.floor(rand * this.jitter * ms);
    ms = (Math.floor(rand * 10) & 1) == 0  ? ms - deviation : ms + deviation;
  }
  return Math.min(ms, this.max) | 0;
};

/**
 * Reset the number of attempts.
 *
 * @api public
 */

Backoff.prototype.reset = function(){
  this.attempts = 0;
};

/**
 * Set the minimum duration
 *
 * @api public
 */

Backoff.prototype.setMin = function(min){
  this.ms = min;
};

/**
 * Set the maximum duration
 *
 * @api public
 */

Backoff.prototype.setMax = function(max){
  this.max = max;
};

/**
 * Set the jitter
 *
 * @api public
 */

Backoff.prototype.setJitter = function(jitter){
  this.jitter = jitter;
};



/***/ }),
/* 100 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
],[72]);