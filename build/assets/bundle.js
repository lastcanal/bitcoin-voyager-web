/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(18);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(m) {'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _voyager_client = __webpack_require__(4);

	var _voyager_client2 = _interopRequireDefault(_voyager_client);

	var _viewsTop_page = __webpack_require__(5);

	var _viewsTop_page2 = _interopRequireDefault(_viewsTop_page);

	var _viewsBlock = __webpack_require__(11);

	var _viewsBlock2 = _interopRequireDefault(_viewsBlock);

	var _viewsTransaction = __webpack_require__(12);

	var _viewsTransaction2 = _interopRequireDefault(_viewsTransaction);

	var _viewsAddress = __webpack_require__(13);

	var _viewsAddress2 = _interopRequireDefault(_viewsAddress);

	__webpack_require__(14);
	__webpack_require__(15);
	__webpack_require__(16);
	__webpack_require__(17);

	var URI = "wss://voyager.cancoin.co/api/v1/websocket";

	{
	  var router;

	  (function () {
	    var view = {};
	    router = null;

	    var DEFAULT_RECONNECT_BACKOFF = 100;
	    var reconnect_backoff = DEFAULT_RECONNECT_BACKOFF;

	    var vm = {
	      last_height: m.prop('000000'),
	      socket_connected: m.prop(false),
	      socket_error: m.prop(null),
	      error: m.prop(null),
	      search: m.prop(''),
	      searchOpen: m.prop(false)
	    };

	    var onConnected = function onConnected(r) {
	      vm.socket_connected(true);
	      reconnect_backoff = DEFAULT_RECONNECT_BACKOFF;

	      view = {
	        top_page: new _viewsTop_page2['default'](state),
	        block: new _viewsBlock2['default'](state),
	        transaction: new _viewsTransaction2['default'](state),
	        address: new _viewsAddress2['default'](state)
	      };

	      client.fetchLastHeight().then(function (r) {
	        return vm.last_height(r.height);
	      }, function (r) {
	        return vm.error(r);
	      }).then(route);
	    };

	    var onError = function onError(event) {
	      vm.socket_connected(false);
	      vm.error(event.error);
	    };

	    var onClosed = function onClosed(_) {
	      vm.socket_connected(false);
	      m.redraw('full');
	      reconnect_backoff = Math.min(30 * 1000, reconnect_backoff * 2);
	      setTimeout(function () {
	        connectClient();
	      }, reconnect_backoff);
	    };

	    var connectClient = function connectClient() {
	      return new _voyager_client2['default'](URI, onConnected, onError, onClosed);
	    };

	    var client = connectClient();

	    client.onMessage = function (message) {};

	    var state = {
	      client: client,
	      vm: vm
	    };

	    var route = function route() {
	      m.route.mode = 'search';
	      router = router || m.route(document.getElementById('container'), "/", {
	        "/": view.top_page,
	        "/block/:hash": view.block,
	        "/tx/:hash": view.transaction,
	        "/address/:address": view.address
	      });
	    };
	  })();
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {/*
	Mithril v0.2.5
	http://mithril.js.org
	(c) 2014-2016 Leo Horie
	License: MIT
	*/
	!function(a,b){"use strict";var c=b(a);"object"==typeof module&&null!=module&&module.exports?module.exports=c: true?!(__WEBPACK_AMD_DEFINE_RESULT__ = function(){return c}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):a.m=c}("undefined"!=typeof window?window:this,function(a,b){"use strict";function c(a){return"function"==typeof a}function d(a){return"[object Object]"===Ca.call(a)}function e(a){return"[object String]"===Ca.call(a)}function f(){}function g(a){xa=a.document,ya=a.location,Aa=a.cancelAnimationFrame||a.clearTimeout,za=a.requestAnimationFrame||a.setTimeout}function h(a,b){for(var c,d=[],e=/(?:(^|#|\.)([^#\.\[\]]+))|(\[.+?\])/g;c=e.exec(b);)if(""===c[1]&&c[2])a.tag=c[2];else if("#"===c[1])a.attrs.id=c[2];else if("."===c[1])d.push(c[2]);else if("["===c[3][0]){var f=/\[(.+?)(?:=("|'|)(.*?)\2)?\]/.exec(c[3]);a.attrs[f[1]]=f[3]||""}return d}function i(a,b){var c=b?a.slice(1):a;return 1===c.length&&Da(c[0])?c[0]:c}function j(a,b,c){var d="class"in b?"class":"className";for(var e in b)Ba.call(b,e)&&(e===d&&null!=b[e]&&""!==b[e]?(c.push(b[e]),a[e]=""):a[e]=b[e]);c.length&&(a[d]=c.join(" "))}function k(a,b){for(var c=[],f=1,g=arguments.length;g>f;f++)c[f-1]=arguments[f];if(d(a))return da(a,c);if(!e(a))throw new Error("selector in m(selector, attrs, children) should be a string");var k=null!=b&&d(b)&&!("tag"in b||"view"in b||"subtree"in b),l=k?b:{},m={tag:"div",attrs:{},children:i(c,k)};return j(m.attrs,l,h(m,a)),m}function l(a,b){for(var c=0;c<a.length&&!b(a[c],c++););}function m(a,b){l(a,function(a,c){return(a=a&&a.attrs)&&null!=a.key&&b(a,c)})}function n(a){try{if(null!=a&&null!=a.toString())return a}catch(b){}return""}function o(a,b,c,d){try{q(a,b,c),b.nodeValue=d}catch(e){}}function p(a){for(var b=0;b<a.length;b++)Da(a[b])&&(a=a.concat.apply([],a),b--);return a}function q(a,b,c){a.insertBefore(b,a.childNodes[c]||null)}function r(a,b,c,d){m(a,function(a,d){b[a=a.key]=b[a]?{action:Ha,index:d,from:b[a].index,element:c.nodes[b[a].index]||xa.createElement("div")}:{action:Ga,index:d}});var e=[];for(var f in b)Ba.call(b,f)&&e.push(b[f]);var g=e.sort(R),h=new Array(c.length);return h.nodes=c.nodes.slice(),l(g,function(b){var e=b.index;if(b.action===Fa&&(W(c[e].nodes,c[e]),h.splice(e,1)),b.action===Ga){var f=xa.createElement("div");f.key=a[e].attrs.key,q(d,f,e),h.splice(e,0,{attrs:{key:a[e].attrs.key},nodes:[f]}),h.nodes[e]=f}if(b.action===Ha){var g=b.element,i=d.childNodes[e];i!==g&&null!==g&&d.insertBefore(g,i||null),h[e]=c[b.from],h.nodes[e]=g}}),h}function s(a,b,c,d){var e=a.length!==b.length;return e||m(a,function(a,c){var d=b[c];return e=d&&d.attrs&&d.attrs.key!==a.key}),e?r(a,c,b,d):b}function t(a,b,c){l(a,function(a,d){null!=b[d]&&c.push.apply(c,b[d].nodes)}),l(b.nodes,function(a,d){null!=a.parentNode&&c.indexOf(a)<0&&W([a],[b[d]])}),a.length<b.length&&(b.length=a.length),b.nodes=c}function u(a){var b=0;m(a,function(){return l(a,function(a){(a=a&&a.attrs)&&null==a.key&&(a.key="__mithril__"+b++)}),1})}function v(a,b,c){return a.tag!==b.tag?!0:c.sort().join()!==Object.keys(b.attrs).sort().join()?!0:a.attrs.id!==b.attrs.id?!0:a.attrs.key!==b.attrs.key?!0:"all"===k.redraw.strategy()?!b.configContext||b.configContext.retain!==!0:"diff"===k.redraw.strategy()?b.configContext&&b.configContext.retain===!1:!1}function w(a,b,d){v(a,b,d)&&(b.nodes.length&&W(b.nodes),b.configContext&&c(b.configContext.onunload)&&b.configContext.onunload(),b.controllers&&l(b.controllers,function(a){a.onunload&&a.onunload({preventDefault:f})}))}function x(a,b){return a.attrs.xmlns?a.attrs.xmlns:"svg"===a.tag?"http://www.w3.org/2000/svg":"math"===a.tag?"http://www.w3.org/1998/Math/MathML":b}function y(a,b,c){c.length&&(a.views=b,a.controllers=c,l(c,function(a){if(a.onunload&&a.onunload.$old&&(a.onunload=a.onunload.$old),Ia&&a.onunload){var b=a.onunload;a.onunload=f,a.onunload.$old=b}}))}function z(a,b,d,e,f){if(c(b.attrs.config)){var g=f.configContext=f.configContext||{};a.push(function(){return b.attrs.config.call(b,d,!e,g,f)})}}function A(a,c,d,e,f,g,h,i){var j=a.nodes[0];return e&&V(j,c.tag,c.attrs,a.attrs,f),a.children=Q(j,c.tag,b,b,c.children,a.children,!1,0,c.attrs.contenteditable?j:d,f,h),a.nodes.intact=!0,i.length&&(a.views=g,a.controllers=i),j}function B(a,b,c){var d;a.$trusted?d=_(b,c,a):(d=[xa.createTextNode(a)],b.nodeName in Ea||q(b,d[0],c));var e;return e="string"==typeof a||"number"==typeof a||"boolean"==typeof a?new a.constructor(a):a,e.nodes=d,e}function C(a,b,c,d,e,f){var g=b.nodes;return d&&d===xa.activeElement||(a.$trusted?(W(g,b),g=_(c,e,a)):"textarea"===f?c.value=a:d?d.innerHTML=a:((1===g[0].nodeType||g.length>1||g[0].nodeValue.trim&&!g[0].nodeValue.trim())&&(W(b.nodes,b),g=[xa.createTextNode(a)]),o(c,g[0],e,a))),b=new a.constructor(a),b.nodes=g,b}function D(a,b,c,d,e,f,g){return a.nodes.length?a.valueOf()!==b.valueOf()||e?C(b,a,d,f,c,g):(a.nodes.intact=!0,a):B(b,d,c)}function E(a){if(a.$trusted){var b=a.match(/<[^\/]|\>\s*[^<]/g);if(null!=b)return b.length}else if(Da(a))return a.length;return 1}function F(a,c,d,e,f,g,h,i,j){a=p(a);var k=[],l=c.length===a.length,n=0,o={},q=!1;m(c,function(a,b){q=!0,o[c[b].attrs.key]={action:Fa,index:b}}),u(a),q&&(c=s(a,c,o,d));for(var r=0,v=0,w=a.length;w>v;v++){var x=Q(d,f,c,e,a[v],c[r],g,e+n||n,h,i,j);x!==b&&(l=l&&x.nodes.intact,n+=E(x),c[r++]=x)}return l||t(a,c,k),c}function G(a,b,c,d,e){if(null!=b){if(Ca.call(b)===Ca.call(a))return b;if(e&&e.nodes){var f=c-d,g=f+(Da(a)?a:b.nodes).length;W(e.nodes.slice(f,g),e.slice(f,g))}else b.nodes&&W(b.nodes,b)}return b=new a.constructor,b.tag&&(b={}),b.nodes=[],b}function H(a,b){return a.attrs.is?null==b?xa.createElement(a.tag,a.attrs.is):xa.createElementNS(b,a.tag,a.attrs.is):null==b?xa.createElement(a.tag):xa.createElementNS(b,a.tag)}function I(a,b,c,d){return d?V(b,a.tag,a.attrs,{},c):a.attrs}function J(a,c,d,e,f,g){return null!=a.children&&a.children.length>0?Q(c,a.tag,b,b,a.children,d.children,!0,0,a.attrs.contenteditable?c:e,f,g):a.children}function K(a,b,c,d,e,f,g){var h={tag:a.tag,attrs:b,children:c,nodes:[d]};return y(h,f,g),h.children&&!h.children.nodes&&(h.children.nodes=[]),"select"===a.tag&&"value"in a.attrs&&V(d,a.tag,{value:a.attrs.value},{},e),h}function L(a,b,d,e){var f;return f="diff"===k.redraw.strategy()&&a?a.indexOf(b):-1,f>-1?d[f]:c(e)?new e:{}}function M(a,b,c,d){null!=d.onunload&&Ka.map(function(a){return a.handler}).indexOf(d.onunload)<0&&Ka.push({controller:d,handler:d.onunload}),a.push(c),b.push(d)}function N(a,b,c,d,e,f){var g=L(c.views,b,d,a.controller),h=a&&a.attrs&&a.attrs.key;return a=0===Ia||La||d&&d.indexOf(g)>-1?a.view(g):{tag:"placeholder"},"retain"===a.subtree?a:(a.attrs=a.attrs||{},a.attrs.key=h,M(f,e,b,g),a)}function O(a,b,c,d){for(var e=b&&b.controllers;null!=a.view;)a=N(a,a.view.$original||a.view,b,e,d,c);return a}function P(a,b,c,d,f,g,h,i){var j=[],k=[];if(a=O(a,b,j,k),"retain"===a.subtree)return b;if(!a.tag&&k.length)throw new Error("Component template must return a virtual element, not an array, string, etc.");a.attrs=a.attrs||{},b.attrs=b.attrs||{};var l=Object.keys(a.attrs),m=l.length>("key"in a.attrs?1:0);if(w(a,b,l),e(a.tag)){var n=0===b.nodes.length;h=x(a,h);var o;if(n){o=H(a,h);var p=I(a,o,h,m);q(d,o,f);var r=J(a,o,b,c,h,i);b=K(a,p,r,o,h,j,k)}else o=A(b,a,c,m,h,j,i,k);return n||g!==!0||null==o||q(d,o,f),z(i,a,o,n,b),b}}function Q(a,b,e,f,g,h,i,j,k,l,m){return g=n(g),"retain"===g.subtree?h:(h=G(g,h,j,f,e),Da(g)?F(g,h,a,j,b,i,k,l,m):null!=g&&d(g)?P(g,h,k,a,j,i,l,m):c(g)?h:D(h,g,j,a,i,k,b))}function R(a,b){return a.action-b.action||a.index-b.index}function S(a,b,c){for(var d in b)Ba.call(b,d)&&(null!=c&&c[d]===b[d]||(a.style[d]=b[d]));for(d in c)Ba.call(c,d)&&(Ba.call(b,d)||(a.style[d]=""))}function T(a,b,e,f,g,h){if("config"===b||"key"===b)return!0;if(c(e)&&"on"===b.slice(0,2))a[b]=aa(e,a);else if("style"===b&&null!=e&&d(e))S(a,e,f);else if(null!=h)"href"===b?a.setAttributeNS("http://www.w3.org/1999/xlink","href",e):a.setAttribute("className"===b?"class":b,e);else if(b in a&&!Ma[b])try{"input"===g&&a[b]===e||(a[b]=e)}catch(i){a.setAttribute(b,e)}else a.setAttribute(b,e)}function U(a,b,c,d,e,f,g){if(b in e&&d===c&&xa.activeElement!==a)"value"===b&&"input"===f&&a.value!==c&&(a.value=c);else{e[b]=c;try{return T(a,b,c,d,f,g)}catch(h){if(h.message.indexOf("Invalid argument")<0)throw h}}}function V(a,b,c,d,e){for(var f in c)!Ba.call(c,f)||!U(a,f,c[f],d[f],d,b,e);return d}function W(a,b){for(var c=a.length-1;c>-1;c--)if(a[c]&&a[c].parentNode){try{a[c].parentNode.removeChild(a[c])}catch(d){}b=[].concat(b),b[c]&&X(b[c])}a.length&&(a.length=0)}function X(a){a.configContext&&c(a.configContext.onunload)&&(a.configContext.onunload(),a.configContext.onunload=null),a.controllers&&l(a.controllers,function(a){c(a.onunload)&&a.onunload({preventDefault:f})}),a.children&&(Da(a.children)?l(a.children,X):a.children.tag&&X(a.children))}function Y(a,b){try{a.appendChild(xa.createRange().createContextualFragment(b))}catch(c){a.insertAdjacentHTML("beforeend",b),Z(a)}}function Z(a){if("SCRIPT"===a.tagName)a.parentNode.replaceChild($(a),a);else{var b=a.childNodes;if(b&&b.length)for(var c=0;c<b.length;c++)Z(b[c])}return a}function $(a){for(var b=document.createElement("script"),c=a.attributes,d=0;d<c.length;d++)b.setAttribute(c[d].name,c[d].value);return b.text=a.innerHTML,b}function _(a,b,c){var d=a.childNodes[b];if(d){var e=1!==d.nodeType,f=xa.createElement("span");e?(a.insertBefore(f,d||null),f.insertAdjacentHTML("beforebegin",c),a.removeChild(f)):d.insertAdjacentHTML("beforebegin",c)}else Y(a,c);for(var g=[];a.childNodes[b]!==d;)g.push(a.childNodes[b]),b++;return g}function aa(a,b){return function(c){c=c||event,k.redraw.strategy("diff"),k.startComputation();try{return a.call(b,c)}finally{ha()}}}function ba(a){var b=Oa.indexOf(a);return 0>b?Oa.push(a)-1:b}function ca(a){function b(){return arguments.length&&(a=arguments[0]),a}return b.toJSON=function(){return a},b}function da(a,b){function c(){return(a.controller||f).apply(this,b)||this}function d(c){for(var d=[c].concat(b),e=1;e<arguments.length;e++)d.push(arguments[e]);return a.view.apply(a,d)}a.controller&&(c.prototype=a.controller.prototype),d.$original=a.view;var e={controller:c,view:d};return b[0]&&null!=b[0].key&&(e.attrs={key:b[0].key}),e}function ea(a,b,c,d){if(!d){k.redraw.strategy("all"),k.startComputation(),Ra[c]=b;var e;e=Qa=a?a:a={controller:f};var g=new(a.controller||f);return e===Qa&&(Ta[c]=g,Sa[c]=a),ha(),null===a&&fa(b,c),Ta[c]}null==a&&fa(b,c)}function fa(a,b){Ra.splice(b,1),Ta.splice(b,1),Sa.splice(b,1),oa(a),Oa.splice(ba(a),1)}function ga(){Wa&&(Wa(),Wa=null),l(Ra,function(a,b){var c=Sa[b];if(Ta[b]){var d=[Ta[b]];k.render(a,c.view?c.view(Ta[b],d):"")}}),Xa&&(Xa(),Xa=null),Ua=null,Va=new Date,k.redraw.strategy("diff")}function ha(){"none"===k.redraw.strategy()?(Ia--,k.redraw.strategy("diff")):k.endComputation()}function ia(a){return a.slice(ab[k.route.mode].length)}function ja(a,b,c){$a={};var d=c.indexOf("?");-1!==d&&($a=na(c.substr(d+1,c.length)),c=c.substr(0,d));var e=Object.keys(b),f=e.indexOf(c);if(-1!==f)return k.mount(a,b[e[f]]),!0;for(var g in b)if(Ba.call(b,g)){if(g===c)return k.mount(a,b[g]),!0;var h=new RegExp("^"+g.replace(/:[^\/]+?\.{3}/g,"(.*?)").replace(/:[^\/]+/g,"([^\\/]+)")+"/?$");if(h.test(c))return c.replace(h,function(){var c=g.match(/:[^\/]+/g)||[],d=[].slice.call(arguments,1,-2);l(c,function(a,b){$a[a.replace(/:|\./g,"")]=decodeURIComponent(d[b])}),k.mount(a,b[g])}),!0}}function ka(a){if(a=a||event,!(a.ctrlKey||a.metaKey||a.shiftKey||2===a.which)){a.preventDefault?a.preventDefault():a.returnValue=!1;var b,c=a.currentTarget||a.srcElement;for(b="pathname"===k.route.mode&&c.search?na(c.search.slice(1)):{};c&&!/a/i.test(c.nodeName);)c=c.parentNode;Ia=0,k.route(c[k.route.mode].slice(ab[k.route.mode].length),b)}}function la(){"hash"!==k.route.mode&&ya.hash?ya.hash=ya.hash:a.scrollTo(0,0)}function ma(a,c){var e={},f=[];for(var g in a)if(Ba.call(a,g)){var h=c?c+"["+g+"]":g,i=a[g];if(null===i)f.push(encodeURIComponent(h));else if(d(i))f.push(ma(i,h));else if(Da(i)){var j=[];e[h]=e[h]||{},l(i,function(a){e[h][a]||(e[h][a]=!0,j.push(encodeURIComponent(h)+"="+encodeURIComponent(a)))}),f.push(j.join("&"))}else i!==b&&f.push(encodeURIComponent(h)+"="+encodeURIComponent(i))}return f.join("&")}function na(a){if(""===a||null==a)return{};"?"===a.charAt(0)&&(a=a.slice(1));var b=a.split("&"),c={};return l(b,function(a){var b=a.split("="),d=decodeURIComponent(b[0]),e=2===b.length?decodeURIComponent(b[1]):null;null!=c[d]?(Da(c[d])||(c[d]=[c[d]]),c[d].push(e)):c[d]=e}),c}function oa(a){var c=ba(a);W(a.childNodes,Pa[c]),Pa[c]=b}function pa(a,b){var c=k.prop(b);return a.then(c),c.then=function(c,d){return pa(a.then(c,d),b)},c["catch"]=c.then.bind(null,null),c}function qa(a,b){function e(a){i=a||gb,l.map(function(a){i===fb?a.resolve(j):a.reject(j)})}function f(a,b,e,f){if((null!=j&&d(j)||c(j))&&c(a))try{var g=0;a.call(j,function(a){g++||(j=a,b())},function(a){g++||(j=a,e())})}catch(h){k.deferred.onerror(h),j=h,e()}else f()}function g(){var d;try{d=j&&j.then}catch(l){return k.deferred.onerror(l),j=l,i=eb,g()}i===eb&&k.deferred.onerror(j),f(d,function(){i=db,g()},function(){i=eb,g()},function(){try{i===db&&c(a)?j=a(j):i===eb&&c(b)&&(j=b(j),i=db)}catch(g){return k.deferred.onerror(g),j=g,e()}j===h?(j=TypeError(),e()):f(d,function(){e(fb)},e,function(){e(i===db&&fb)})})}var h=this,i=0,j=0,l=[];h.promise={},h.resolve=function(a){return i||(j=a,i=db,g()),h},h.reject=function(a){return i||(j=a,i=eb,g()),h},h.promise.then=function(a,b){var c=new qa(a,b);return i===fb?c.resolve(j):i===gb?c.reject(j):l.push(c),c.promise}}function ra(a){return a}function sa(c){var d=c.callbackName||"mithril_callback_"+(new Date).getTime()+"_"+Math.round(1e16*Math.random()).toString(36),e=xa.createElement("script");a[d]=function(f){e.parentNode.removeChild(e),c.onload({type:"load",target:{responseText:f}}),a[d]=b},e.onerror=function(){return e.parentNode.removeChild(e),c.onerror({type:"error",target:{status:500,responseText:JSON.stringify({error:"Error making jsonp request"})}}),a[d]=b,!1},e.onload=function(){return!1},e.src=c.url+(c.url.indexOf("?")>0?"&":"?")+(c.callbackKey?c.callbackKey:"callback")+"="+d+"&"+ma(c.data||{}),xa.body.appendChild(e)}function ta(b){var d=new a.XMLHttpRequest;if(d.open(b.method,b.url,!0,b.user,b.password),d.onreadystatechange=function(){4===d.readyState&&(d.status>=200&&d.status<300?b.onload({type:"load",target:d}):b.onerror({type:"error",target:d}))},b.serialize===JSON.stringify&&b.data&&"GET"!==b.method&&d.setRequestHeader("Content-Type","application/json; charset=utf-8"),b.deserialize===JSON.parse&&d.setRequestHeader("Accept","application/json, text/*"),c(b.config)){var f=b.config(d,b);null!=f&&(d=f)}var g="GET"!==b.method&&b.data?b.data:"";if(g&&!e(g)&&g.constructor!==a.FormData)throw new Error("Request data should be either be a string or FormData. Check the `serialize` option in `m.request`");return d.send(g),d}function ua(a){return a.dataType&&"jsonp"===a.dataType.toLowerCase()?sa(a):ta(a)}function va(a,b,c){if("GET"===a.method&&"jsonp"!==a.dataType){var d=a.url.indexOf("?")<0?"?":"&",e=ma(b);a.url+=e?d+e:""}else a.data=c(b)}function wa(a,b){return b&&(a=a.replace(/:[a-z]\w+/gi,function(a){var c=a.slice(1),d=b[c]||a;return delete b[c],d})),a}k.version=function(){return"v0.2.5"};var xa,ya,za,Aa,Ba={}.hasOwnProperty,Ca={}.toString,Da=Array.isArray||function(a){return"[object Array]"===Ca.call(a)},Ea={AREA:1,BASE:1,BR:1,COL:1,COMMAND:1,EMBED:1,HR:1,IMG:1,INPUT:1,KEYGEN:1,LINK:1,META:1,PARAM:1,SOURCE:1,TRACK:1,WBR:1};k.deps=function(b){return g(a=b||window),a},k.deps(a);var Fa=1,Ga=2,Ha=3,Ia=0;k.startComputation=function(){Ia++},k.endComputation=function(){Ia>1?Ia--:(Ia=0,k.redraw())};var Ja,Ka=[],La=!1,Ma={list:1,style:1,form:1,type:1,width:1,height:1},Na={appendChild:function(a){Ja===b&&(Ja=xa.createElement("html")),xa.documentElement&&xa.documentElement!==a?xa.replaceChild(a,xa.documentElement):xa.appendChild(a),this.childNodes=xa.childNodes},insertBefore:function(a){this.appendChild(a)},childNodes:[]},Oa=[],Pa={};k.render=function(a,c,d){if(!a)throw new Error("Ensure the DOM element being passed to m.route/m.mount/m.render is not undefined.");var e,f=[],g=ba(a),h=a===xa;e=h||a===xa.documentElement?Na:a,h&&"html"!==c.tag&&(c={tag:"html",attrs:{},children:c}),Pa[g]===b&&W(e.childNodes),d===!0&&oa(a),Pa[g]=Q(e,null,b,b,c,Pa[g],!1,0,null,b,f),l(f,function(a){a()})},k.trust=function(a){return a=new String(a),a.$trusted=!0,a},k.prop=function(a){return(null!=a&&(d(a)||c(a))||"undefined"!=typeof Promise&&a instanceof Promise)&&c(a.then)?pa(a):ca(a)};var Qa,Ra=[],Sa=[],Ta=[],Ua=null,Va=0,Wa=null,Xa=null,Ya=16;k.component=function(a){for(var b=new Array(arguments.length-1),c=1;c<arguments.length;c++)b[c-1]=arguments[c];return da(a,b)},k.mount=k.module=function(a,b){if(!a)throw new Error("Please ensure the DOM element exists before rendering a template into it.");var d=Ra.indexOf(a);0>d&&(d=Ra.length);var e=!1,f={preventDefault:function(){e=!0,Wa=Xa=null}};return l(Ka,function(a){a.handler.call(a.controller,f),a.controller.onunload=null}),e?l(Ka,function(a){a.controller.onunload=a.handler}):Ka=[],Ta[d]&&c(Ta[d].onunload)&&Ta[d].onunload(f),ea(b,a,d,e)};var Za=!1;k.redraw=function(b){if(!Za){Za=!0,b&&(La=!0);try{Ua&&!b?(za===a.requestAnimationFrame||new Date-Va>Ya)&&(Ua>0&&Aa(Ua),Ua=za(ga,Ya)):(ga(),Ua=za(function(){Ua=null},Ya))}finally{Za=La=!1}}},k.redraw.strategy=k.prop(),k.withAttr=function(a,b,c){return function(d){d=d||window.event;var e=d.currentTarget||this,f=c||this,g=a in e?e[a]:e.getAttribute(a);b.call(f,g)}};var $a,_a,ab={pathname:"",hash:"#",search:"?"},bb=f,cb=!1;k.route=function(b,c,d,f){if(0===arguments.length)return _a;if(3===arguments.length&&e(c)){bb=function(a){var e=_a=ia(a);if(!ja(b,d,e)){if(cb)throw new Error("Ensure the default route matches one of the routes defined in m.route");cb=!0,k.route(c,!0),cb=!1}};var g="hash"===k.route.mode?"onhashchange":"onpopstate";return a[g]=function(){var a=ya[k.route.mode];"pathname"===k.route.mode&&(a+=ya.search),_a!==ia(a)&&bb(a)},Wa=la,void a[g]()}if(b.addEventListener||b.attachEvent){var h="pathname"!==k.route.mode?ya.pathname:"";return b.href=h+ab[k.route.mode]+f.attrs.href,void(b.addEventListener?(b.removeEventListener("click",ka),b.addEventListener("click",ka)):(b.detachEvent("onclick",ka),b.attachEvent("onclick",ka)))}if(e(b)){var i=_a;_a=b;var j,l=c||{},m=_a.indexOf("?");j=m>-1?na(_a.slice(m+1)):{};for(var n in l)Ba.call(l,n)&&(j[n]=l[n]);var o,p=ma(j);o=m>-1?_a.slice(0,m):_a,p&&(_a=o+(-1===o.indexOf("?")?"?":"&")+p);var q=(3===arguments.length?d:c)===!0||i===b;if(a.history.pushState){var r=q?"replaceState":"pushState";Wa=la,Xa=function(){try{a.history[r](null,xa.title,ab[k.route.mode]+_a)}catch(b){ya[k.route.mode]=_a}},bb(ab[k.route.mode]+_a)}else ya[k.route.mode]=_a,bb(ab[k.route.mode]+_a)}},k.route.param=function(a){if(!$a)throw new Error("You must call m.route(element, defaultRoute, routes) before calling m.route.param()");return a?$a[a]:$a},k.route.mode="search",k.route.buildQueryString=ma,k.route.parseQueryString=na,k.deferred=function(){var a=new qa;return a.promise=pa(a.promise),a};var db=1,eb=2,fb=3,gb=4;return k.deferred.onerror=function(a){if("[object Error]"===Ca.call(a)&&!/ Error/.test(a.constructor.toString()))throw Ia=0,a},k.sync=function(a){function b(a,b){return function(g){return e[a]=g,b||(f="reject"),0===--d&&(c.promise(e),c[f](e)),g}}var c=k.deferred(),d=a.length,e=[],f="resolve";return a.length>0?l(a,function(a,c){a.then(b(c,!0),b(c,!1))}):c.resolve([]),c.promise},k.request=function(a){a.background!==!0&&k.startComputation();var b,c,d,e=new qa,f=a.dataType&&"jsonp"===a.dataType.toLowerCase();return f?(b=a.serialize=c=a.deserialize=ra,d=function(a){return a.responseText}):(b=a.serialize=a.serialize||JSON.stringify,c=a.deserialize=a.deserialize||JSON.parse,d=a.extract||function(a){return a.responseText.length||c!==JSON.parse?a.responseText:null}),a.method=(a.method||"GET").toUpperCase(),a.url=wa(a.url,a.data),va(a,a.data,b),a.onload=a.onerror=function(b){try{b=b||event;var f=c(d(b.target,a));"load"===b.type?(a.unwrapSuccess&&(f=a.unwrapSuccess(f,b.target)),Da(f)&&a.type?l(f,function(b,c){f[c]=new a.type(b)}):a.type&&(f=new a.type(f)),e.resolve(f)):(a.unwrapError&&(f=a.unwrapError(f,b.target)),e.reject(f))}catch(g){e.reject(g),k.deferred.onerror(g)}finally{a.background!==!0&&k.endComputation()}},ua(a),e.promise=pa(e.promise,a.initialValue),e.promise},k});
	//# sourceMappingURL=mithril.min.js.map
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)(module)))

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var noop = function noop() {};

	var VoyagerClient = (function () {
	  function VoyagerClient(uri, onOpen, onDisconnect, onError) {
	    var _this = this;

	    _classCallCheck(this, VoyagerClient);

	    this.handlers = {};
	    this.connected = false;
	    this.socket = new WebSocket(uri);
	    this.socket.onopen = function (event) {
	      _this.connected = true;
	      onOpen(event);
	    };
	    this.socket.onclose = function (event) {
	      _this.connected = false;
	      _this.handlers = {};
	      _this.socket = null;
	      onDisconnect(event);
	    };
	    this.socket.onerror = function (event) {
	      _this.socket.close();
	      onError(event);
	    };
	    this.socket.onmessage = function (event) {
	      _this.handleMessage(event);
	    };
	  }

	  _createClass(VoyagerClient, [{
	    key: 'onMessage',
	    value: function onMessage(event) {}
	  }, {
	    key: 'subscribeBlocks',
	    value: function subscribeBlocks(resolve, reject) {
	      return this.sendSubscription('subscribe.block', [], resolve, reject);
	    }
	  }, {
	    key: 'subscribeTransactions',
	    value: function subscribeTransactions(resolve, reject) {
	      return this.sendSubscription('subscribe.transaction', [], resolve, reject);
	    }
	  }, {
	    key: 'subscribeHeartbeats',
	    value: function subscribeHeartbeats(resolve, reject) {
	      return this.sendSubscription('subscribe.heartbeat', [], resolve, reject);
	    }
	  }, {
	    key: 'fetchLastHeight',
	    value: function fetchLastHeight(cb) {
	      return this.sendRequest('blockchain.last_height', []);
	    }
	  }, {
	    key: 'fetchBlockHeader',
	    value: function fetchBlockHeader(height) {
	      return this.sendRequest('blockchain.block_header', { height: height });
	    }
	  }, {
	    key: 'fetchBlockHeight',
	    value: function fetchBlockHeight(hash) {
	      return this.sendRequest('blockchain.block_height', { hash: hash });
	    }
	  }, {
	    key: 'fetchBlockTransactionHashes',
	    value: function fetchBlockTransactionHashes(hash) {
	      return this.sendRequest('blockchain.block_transaction_hashes', { hash: hash });
	    }
	  }, {
	    key: 'fetchTransactionIndex',
	    value: function fetchTransactionIndex(hash) {
	      return this.sendRequest('blockchain.transaction_index', { hash: hash });
	    }
	  }, {
	    key: 'fetchBlockchainTransaction',
	    value: function fetchBlockchainTransaction(hash) {
	      return this.sendRequest('blockchain.transaction', { hash: hash });
	    }
	  }, {
	    key: 'fetchTransactionPoolTransaction',
	    value: function fetchTransactionPoolTransaction(hash) {
	      return this.sendRequest('transaction_pool.transaction', { hash: hash });
	    }
	  }, {
	    key: 'fetchAddressHistory2',
	    value: function fetchAddressHistory2(address, count) {
	      return this.sendRequest('address.history2', { address: address, count: count });
	    }
	  }, {
	    key: 'fetchBlockchainHistory',
	    value: function fetchBlockchainHistory() {
	      var address = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

	      return this.sendRequest('blockchain.history', { address: address });
	    }
	  }, {
	    key: 'fetchTotalConnections',
	    value: function fetchTotalConnections() {
	      return this.sendRequest('protocol.total_connections', {});
	    }
	  }, {
	    key: 'sendSubscription',
	    value: function sendSubscription(command, params) {
	      var resolve = arguments.length <= 2 || arguments[2] === undefined ? noop : arguments[2];
	      var reject = arguments.length <= 3 || arguments[3] === undefined ? noop : arguments[3];

	      var id = command;
	      var request = JSON.stringify({
	        id: id,
	        command: command,
	        params: params
	      });

	      this.socket.send(request);

	      return this.handlers[id] = { resolve: resolve, reject: reject };
	    }
	  }, {
	    key: 'sendRequest',
	    value: function sendRequest(command, params) {
	      var _this2 = this;

	      var id = arguments.length <= 2 || arguments[2] === undefined ? this.randomInteger() : arguments[2];

	      var request = JSON.stringify({
	        id: id,
	        command: command,
	        params: params
	      });

	      this.socket.send(request);

	      return new Promise(function (resolve, reject) {
	        _this2.handlers[id] = { resolve: resolve, reject: reject };
	      });
	    }
	  }, {
	    key: 'handleMessage',
	    value: function handleMessage(event) {
	      var response = JSON.parse(event.data);
	      this.onMessage(response);
	      var handler = this.handlers[response.id];
	      if (handler) {
	        if (response.error) {
	          handler.reject(response.error);
	        } else if (response.result) {
	          handler.resolve(response.result);
	        } else {
	          console && console.error(response);
	        }

	        if (!/^subscribe\./.test(response.id)) {
	          delete this.handlers[response.id];
	        }
	      }
	    }
	  }, {
	    key: 'randomInteger',
	    value: function randomInteger() {
	      return Math.floor(Math.random() * 4294967296);
	    }
	  }]);

	  return VoyagerClient;
	})();

	exports['default'] = VoyagerClient;
	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(m) {'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _component = __webpack_require__(6);

	var _component2 = _interopRequireDefault(_component);

	var _header = __webpack_require__(7);

	var _header2 = _interopRequireDefault(_header);

	var _footer = __webpack_require__(8);

	var _footer2 = _interopRequireDefault(_footer);

	var _modulesUtil = __webpack_require__(9);

	var Util = _interopRequireWildcard(_modulesUtil);

	/** @jsx m */

	var TopPage = (function (_Component) {
	  _inherits(TopPage, _Component);

	  function TopPage() {
	    _classCallCheck(this, TopPage);

	    _get(Object.getPrototypeOf(TopPage.prototype), 'constructor', this).apply(this, arguments);
	  }

	  _createClass(TopPage, [{
	    key: 'init',
	    value: function init(ctrl) {
	      Object.assign(ctrl, {
	        blocks: m.prop([]),
	        transactions: m.prop([]),
	        heartbeats: m.prop([])
	      });

	      ctrl.total_connections = m.prop();

	      this.getLastHeight(ctrl);
	      this.getTotalConnections(ctrl);
	      this.subscribe(ctrl);
	    }
	  }, {
	    key: 'onSubscription',
	    value: function onSubscription(prop) {
	      var size = arguments.length <= 1 || arguments[1] === undefined ? 12 : arguments[1];

	      return function (resp) {
	        var items = prop();
	        if (items[0] === resp || typeof items[0] === 'object' && items[0].hash === resp.hash) return;
	        items.unshift(resp);
	        prop(items.slice(0, size));
	        m.redraw('diff');
	      };
	    }
	  }, {
	    key: 'subscribe',
	    value: function subscribe(ctrl) {
	      this.client.subscribeTransactions(this.onSubscription(ctrl.transactions, 20));
	      this.client.subscribeBlocks(this.onSubscription(ctrl.blocks));
	      this.client.subscribeHeartbeats(this.onSubscription(ctrl.heartbeats));
	    }
	  }, {
	    key: 'getLastHeight',
	    value: function getLastHeight(ctrl) {
	      var _this = this;

	      m.startComputation();
	      this.client.fetchLastHeight().then(function (reply) {
	        _this.vm.last_height(reply.height);
	        m.endComputation();
	        _this.fetchBlocks(ctrl, reply.height, 12);
	      });
	    }
	  }, {
	    key: 'getTotalConnections',
	    value: function getTotalConnections(ctrl) {
	      m.startComputation();
	      this.client.fetchTotalConnections().then(function (reply) {
	        ctrl.total_connections(reply.total_connections);
	        m.endComputation();
	      });
	    }
	  }, {
	    key: 'fetchBlocks',
	    value: function fetchBlocks(ctrl, height, count) {
	      var _this2 = this;

	      if (count == 0) return;
	      m.startComputation();
	      this.client.fetchBlockHeader(height).then(function (reply) {
	        var blocks = ctrl.blocks();
	        var header = reply.block_header;
	        var next_block = blocks[blocks.length - 1];
	        if (next_block === undefined || next_block.previous_block_hash === header.hash) {
	          header.height = height;
	          header.time = Util.formatTime(header.timestamp);
	          blocks.push(header);
	          ctrl.blocks(blocks);
	          m.endComputation();
	          _this2.fetchBlocks(ctrl, height - 1, count - 1);
	        } else {
	          alert('There seems to be a fork in the chain..');
	        }
	      });
	    }
	  }, {
	    key: 'view',
	    value: function view(ctrl) {
	      var _this3 = this;

	      var blocks = ctrl.blocks();
	      var last_block = blocks[0];
	      var transactions = ctrl.transactions();

	      return m(
	        'div',
	        null,
	        (0, _header2['default'])(this),
	        m(
	          'div',
	          { 'class': 'container' },
	          m(
	            'div',
	            { 'class': 'row' },
	            m(
	              'div',
	              { 'class': 'body_head' },
	              m(
	                'div',
	                { 'class': 'body_head_icon' },
	                '1'
	              ),
	              'Latest ',
	              m(
	                'span',
	                null,
	                'bitcoin'
	              ),
	              ' blocks'
	            )
	          )
	        ),
	        m(
	          'div',
	          { 'class': 'container' },
	          m(
	            'div',
	            { 'class': 'row index_block_row' },
	            blocks.map(function (header) {
	              return m(
	                'a',
	                { href: '#', onclick: _this3.navigate('/block/' + header.height) },
	                m(
	                  'div',
	                  { 'class': 'index_block_shell pullDown' },
	                  m(
	                    'div',
	                    { 'class': 'index_block_height' },
	                    header.height,
	                    m('br', null),
	                    m(
	                      'span',
	                      null,
	                      header.hash.slice(0, 22)
	                    )
	                  ),
	                  m(
	                    'div',
	                    { 'class': 'index_block_time' },
	                    m(
	                      'div',
	                      { 'class': 'index_block_time_icon' },
	                      '7'
	                    ),
	                    header.time
	                  ),
	                  m(
	                    'div',
	                    { 'class': 'index_block_nonce' },
	                    m(
	                      'div',
	                      { 'class': 'index_block_nonce_tag' },
	                      'Nonce'
	                    ),
	                    '0x',
	                    header.nonce.toString(16)
	                  )
	                )
	              );
	            })
	          )
	        ),
	        m(
	          'div',
	          { 'class': 'container' },
	          m(
	            'div',
	            { 'class': 'row widg_pad' },
	            m(
	              'div',
	              { 'class': 'col-lg-4 col-md-4 col-sm-4 no_pad' },
	              m(
	                'div',
	                { 'class': 'widg_l' },
	                m(
	                  'div',
	                  { 'class': 'widg_icon' },
	                  '5'
	                ),
	                m(
	                  'div',
	                  { 'class': 'widg_content' },
	                  ctrl.total_connections()
	                ),
	                m(
	                  'div',
	                  { 'class': 'widg_label' },
	                  'Nodes Connected'
	                )
	              )
	            ),
	            m(
	              'div',
	              { 'class': 'col-lg-4 col-md-4 col-sm-4 no_pad' },
	              m(
	                'div',
	                { 'class': 'widg_c' },
	                m(
	                  'div',
	                  { 'class': 'widg_icon' },
	                  'H'
	                ),
	                m(
	                  'div',
	                  { 'class': 'widg_content' },
	                  ctrl.heartbeats()[0]
	                ),
	                m(
	                  'div',
	                  { 'class': 'widg_label' },
	                  'Heartbeat'
	                )
	              )
	            ),
	            m(
	              'div',
	              { 'class': 'col-lg-4 col-md-4 col-sm-4 no_pad' },
	              m(
	                'div',
	                { 'class': 'widg_r' },
	                m(
	                  'div',
	                  { 'class': 'widg_icon' },
	                  '4'
	                ),
	                m(
	                  'div',
	                  { 'class': 'widg_content' },
	                  last_block && last_block.time
	                ),
	                m(
	                  'div',
	                  { 'class': 'widg_label' },
	                  'Latest Block Time (GMT)'
	                )
	              )
	            )
	          )
	        ),
	        m(
	          'div',
	          { 'class': 'container' },
	          m(
	            'div',
	            { 'class': 'row' },
	            m(
	              'div',
	              { 'class': 'body_head' },
	              m(
	                'div',
	                { 'class': 'body_head_icon' },
	                '1'
	              ),
	              'Latest ',
	              m(
	                'span',
	                null,
	                'bitcoin'
	              ),
	              ' transactions'
	            )
	          )
	        ),
	        m(
	          'div',
	          { 'class': 'container' },
	          m(
	            'div',
	            { 'class': 'row' },
	            m(
	              'div',
	              { 'class': 'index_trans_shell' },
	              transactions.map(function (tx) {
	                return m(
	                  'div',
	                  { 'class': 'index_trans_line' },
	                  m(
	                    'div',
	                    { 'class': 'index_trans_amount' },
	                    m(
	                      'span',
	                      null,
	                      '1'
	                    ),
	                    Util.satoshiToBtc(tx.value)
	                  ),
	                  m('div', { style: 'background-color: #' + tx.hash.slice(0, 6) + '; float:left; width:8px; height:8px; border-radius:8px; margin-right:20px; margin-top:3px;' }),
	                  m(
	                    'div',
	                    { 'class': 'index_trans_address' },
	                    m(
	                      'a',
	                      { href: '#', onclick: _this3.navigate('/tx/' + tx.hash) },
	                      tx.hash
	                    )
	                  ),
	                  m('br', null)
	                );
	              })
	            )
	          )
	        ),
	        (0, _footer2['default'])(this)
	      );
	    }
	  }]);

	  return TopPage;
	})(_component2['default']);

	exports['default'] = TopPage;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(m) {"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Component = (function () {
	  function Component(state) {
	    _classCallCheck(this, Component);

	    this.state = state || {};
	    this.client = state.client;
	    this.vm = state.vm;

	    var component = this;
	    this.controller = function () {
	      var ctrl = { onunload: component.onUnload.bind(component) };
	      component.init(ctrl);
	      return ctrl;
	    };
	    this.controller.$original = this.init;
	  }

	  _createClass(Component, [{
	    key: "init",
	    value: function init(ctrl) {}
	  }, {
	    key: "onUnload",
	    value: function onUnload() {}
	  }, {
	    key: "navigate",
	    value: function navigate(route) {
	      return function (evt) {
	        m.route(route);
	        return false;
	      };
	    }
	  }, {
	    key: "instance",
	    value: function instance() {
	      var component = this;
	      var controller = new this.controller();
	      controller.render = function () {
	        return component.view(controller);
	      };
	      return controller;
	    }
	  }]);

	  return Component;
	})();

	exports["default"] = Component;
	module.exports = exports["default"];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = view;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var _mithril = __webpack_require__(2);

	var _mithril2 = _interopRequireDefault(_mithril);

	/** @jsx m */

	var toggleSearch = function toggleSearch() {
	  this.vm.searchOpen(!this.vm.searchOpen());
	};

	var searchSubmit = function searchSubmit(self) {
	  return function () {
	    _mithril2["default"].route(search.call(self, self.vm.search()));
	    return false;
	  };
	};

	var searchDrop = function searchDrop(self) {
	  return (0, _mithril2["default"])(
	    "div",
	    { "class": self.vm.searchOpen() ? "head_search_row" : "head_search_row closed" },
	    (0, _mithril2["default"])(
	      "div",
	      { "class": "head_search_shell" },
	      (0, _mithril2["default"])(
	        "form",
	        { action: "", id: "search-form", onsubmit: searchSubmit(self) },
	        (0, _mithril2["default"])(
	          "div",
	          { "class": "input-group" },
	          (0, _mithril2["default"])("input", { type: "submit", value: "A", "class": "head_search_btn" }),
	          (0, _mithril2["default"])("input", { type: "text", oninput: _mithril2["default"].withAttr('value', self.vm.search), "class": "head_search_form", placeholder: "Search by block hash, block height, transaction or address" }),
	          (0, _mithril2["default"])("div", { style: "clear:both;" })
	        )
	      )
	    )
	  );
	};

	var search = function search(value) {
	  if (value.length === 64) {
	    if (value.match(/^00000000/)) {
	      return "/block/" + value;
	    } else {
	      return "/tx/" + value;
	    }
	  } else if (Number(value) > 0) {
	    return "/block/" + value;
	  } else {
	    return "/address/" + value;
	  }
	};

	var showError = function showError(self) {
	  return (0, _mithril2["default"])(
	    "h1",
	    null,
	    "Error: ",
	    self.vm.error()
	  );
	};

	function view(self) {
	  return (0, _mithril2["default"])(
	    "div",
	    { "class": "head_shell" },
	    (0, _mithril2["default"])(
	      "div",
	      { "class": "container" },
	      (0, _mithril2["default"])(
	        "div",
	        { "class": "row" },
	        (0, _mithril2["default"])(
	          "div",
	          { "class": "head_search" },
	          (0, _mithril2["default"])(
	            "div",
	            { "class": "head_icon" },
	            "M"
	          ),
	          (0, _mithril2["default"])(
	            "a",
	            { role: "button", href: "#", onclick: toggleSearch.bind(self) },
	            "Search"
	          )
	        ),
	        (0, _mithril2["default"])(
	          "div",
	          { "class": "head_stat hide" },
	          (0, _mithril2["default"])(
	            "a",
	            { onclick: self.navigate('/'), "class": "head_icon" },
	            "8"
	          ),
	          self.vm.last_height()
	        ),
	        (0, _mithril2["default"])(
	          "div",
	          { "class": "head_stat hide" },
	          (0, _mithril2["default"])(
	            "div",
	            { "class": "head_icon" },
	            "G"
	          ),
	          self.vm.socket_connected() ? 'Connected' : 'Connecting'
	        ),
	        (0, _mithril2["default"])(
	          "a",
	          { href: "/?/" },
	          (0, _mithril2["default"])(
	            "div",
	            { "class": "head_logo" },
	            "2"
	          )
	        )
	      )
	    ),
	    (0, _mithril2["default"])(
	      "div",
	      { "class": "container" },
	      (0, _mithril2["default"])(
	        "div",
	        { "class": "row" },
	        searchDrop(self)
	      ),
	      (0, _mithril2["default"])(
	        "div",
	        { "class": "row" },
	        self.vm.error() ? showError(self) : ''
	      )
	    )
	  );
	}

	module.exports = exports["default"];

/***/ },
/* 8 */
/***/ function(module, exports) {

	/** @jsx m */

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = view;

	function view(ctrl) {
	  return;
	}

	module.exports = exports["default"];

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.formatTime = formatTime;
	exports.satoshiToBtc = satoshiToBtc;
	exports.elementViewed = elementViewed;
	exports.txHashId = txHashId;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _bigJs = __webpack_require__(10);

	var _bigJs2 = _interopRequireDefault(_bigJs);

	var SATOSHI = (0, _bigJs2['default'])(100000000);

	var timeOptions = {
	  hour: 'numeric', minute: 'numeric', second: 'numeric',
	  hour12: true
	};

	function formatTime(seconds) {
	  var options = arguments.length <= 1 || arguments[1] === undefined ? timeOptions : arguments[1];

	  if (+seconds === NaN) return;
	  return new Date(+seconds * 1000).toLocaleString('en-US', options);
	}

	function satoshiToBtc(satoshi) {
	  if (satoshi === undefined) return null;
	  return (0, _bigJs2['default'])(satoshi).div(SATOSHI).toString();
	}

	function elementViewed(el) {
	  var top = el.offsetTop;
	  var height = el.offsetHeight;

	  while (el.offsetParent) {
	    el = el.offsetParent;
	    top += el.offsetTop;
	  }

	  return top + height <= window.pageYOffset + window.innerHeight;
	}

	function txHashId(hash) {
	  return 'tx_' + hash.slice(0, 16);
	}

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* big.js v3.1.3 https://github.com/MikeMcl/big.js/LICENCE */
	;(function (global) {
	    'use strict';

	/*
	  big.js v3.1.3
	  A small, fast, easy-to-use library for arbitrary-precision decimal arithmetic.
	  https://github.com/MikeMcl/big.js/
	  Copyright (c) 2014 Michael Mclaughlin <M8ch88l@gmail.com>
	  MIT Expat Licence
	*/

	/***************************** EDITABLE DEFAULTS ******************************/

	    // The default values below must be integers within the stated ranges.

	    /*
	     * The maximum number of decimal places of the results of operations
	     * involving division: div and sqrt, and pow with negative exponents.
	     */
	    var DP = 20,                           // 0 to MAX_DP

	        /*
	         * The rounding mode used when rounding to the above decimal places.
	         *
	         * 0 Towards zero (i.e. truncate, no rounding).       (ROUND_DOWN)
	         * 1 To nearest neighbour. If equidistant, round up.  (ROUND_HALF_UP)
	         * 2 To nearest neighbour. If equidistant, to even.   (ROUND_HALF_EVEN)
	         * 3 Away from zero.                                  (ROUND_UP)
	         */
	        RM = 1,                            // 0, 1, 2 or 3

	        // The maximum value of DP and Big.DP.
	        MAX_DP = 1E6,                      // 0 to 1000000

	        // The maximum magnitude of the exponent argument to the pow method.
	        MAX_POWER = 1E6,                   // 1 to 1000000

	        /*
	         * The exponent value at and beneath which toString returns exponential
	         * notation.
	         * JavaScript's Number type: -7
	         * -1000000 is the minimum recommended exponent value of a Big.
	         */
	        E_NEG = -7,                   // 0 to -1000000

	        /*
	         * The exponent value at and above which toString returns exponential
	         * notation.
	         * JavaScript's Number type: 21
	         * 1000000 is the maximum recommended exponent value of a Big.
	         * (This limit is not enforced or checked.)
	         */
	        E_POS = 21,                   // 0 to 1000000

	/******************************************************************************/

	        // The shared prototype object.
	        P = {},
	        isValid = /^-?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,
	        Big;


	    /*
	     * Create and return a Big constructor.
	     *
	     */
	    function bigFactory() {

	        /*
	         * The Big constructor and exported function.
	         * Create and return a new instance of a Big number object.
	         *
	         * n {number|string|Big} A numeric value.
	         */
	        function Big(n) {
	            var x = this;

	            // Enable constructor usage without new.
	            if (!(x instanceof Big)) {
	                return n === void 0 ? bigFactory() : new Big(n);
	            }

	            // Duplicate.
	            if (n instanceof Big) {
	                x.s = n.s;
	                x.e = n.e;
	                x.c = n.c.slice();
	            } else {
	                parse(x, n);
	            }

	            /*
	             * Retain a reference to this Big constructor, and shadow
	             * Big.prototype.constructor which points to Object.
	             */
	            x.constructor = Big;
	        }

	        Big.prototype = P;
	        Big.DP = DP;
	        Big.RM = RM;
	        Big.E_NEG = E_NEG;
	        Big.E_POS = E_POS;

	        return Big;
	    }


	    // Private functions


	    /*
	     * Return a string representing the value of Big x in normal or exponential
	     * notation to dp fixed decimal places or significant digits.
	     *
	     * x {Big} The Big to format.
	     * dp {number} Integer, 0 to MAX_DP inclusive.
	     * toE {number} 1 (toExponential), 2 (toPrecision) or undefined (toFixed).
	     */
	    function format(x, dp, toE) {
	        var Big = x.constructor,

	            // The index (normal notation) of the digit that may be rounded up.
	            i = dp - (x = new Big(x)).e,
	            c = x.c;

	        // Round?
	        if (c.length > ++dp) {
	            rnd(x, i, Big.RM);
	        }

	        if (!c[0]) {
	            ++i;
	        } else if (toE) {
	            i = dp;

	        // toFixed
	        } else {
	            c = x.c;

	            // Recalculate i as x.e may have changed if value rounded up.
	            i = x.e + i + 1;
	        }

	        // Append zeros?
	        for (; c.length < i; c.push(0)) {
	        }
	        i = x.e;

	        /*
	         * toPrecision returns exponential notation if the number of
	         * significant digits specified is less than the number of digits
	         * necessary to represent the integer part of the value in normal
	         * notation.
	         */
	        return toE === 1 || toE && (dp <= i || i <= Big.E_NEG) ?

	          // Exponential notation.
	          (x.s < 0 && c[0] ? '-' : '') +
	            (c.length > 1 ? c[0] + '.' + c.join('').slice(1) : c[0]) +
	              (i < 0 ? 'e' : 'e+') + i

	          // Normal notation.
	          : x.toString();
	    }


	    /*
	     * Parse the number or string value passed to a Big constructor.
	     *
	     * x {Big} A Big number instance.
	     * n {number|string} A numeric value.
	     */
	    function parse(x, n) {
	        var e, i, nL;

	        // Minus zero?
	        if (n === 0 && 1 / n < 0) {
	            n = '-0';

	        // Ensure n is string and check validity.
	        } else if (!isValid.test(n += '')) {
	            throwErr(NaN);
	        }

	        // Determine sign.
	        x.s = n.charAt(0) == '-' ? (n = n.slice(1), -1) : 1;

	        // Decimal point?
	        if ((e = n.indexOf('.')) > -1) {
	            n = n.replace('.', '');
	        }

	        // Exponential form?
	        if ((i = n.search(/e/i)) > 0) {

	            // Determine exponent.
	            if (e < 0) {
	                e = i;
	            }
	            e += +n.slice(i + 1);
	            n = n.substring(0, i);

	        } else if (e < 0) {

	            // Integer.
	            e = n.length;
	        }

	        // Determine leading zeros.
	        for (i = 0; n.charAt(i) == '0'; i++) {
	        }

	        if (i == (nL = n.length)) {

	            // Zero.
	            x.c = [ x.e = 0 ];
	        } else {

	            // Determine trailing zeros.
	            for (; n.charAt(--nL) == '0';) {
	            }

	            x.e = e - i - 1;
	            x.c = [];

	            // Convert string to array of digits without leading/trailing zeros.
	            for (e = 0; i <= nL; x.c[e++] = +n.charAt(i++)) {
	            }
	        }

	        return x;
	    }


	    /*
	     * Round Big x to a maximum of dp decimal places using rounding mode rm.
	     * Called by div, sqrt and round.
	     *
	     * x {Big} The Big to round.
	     * dp {number} Integer, 0 to MAX_DP inclusive.
	     * rm {number} 0, 1, 2 or 3 (DOWN, HALF_UP, HALF_EVEN, UP)
	     * [more] {boolean} Whether the result of division was truncated.
	     */
	    function rnd(x, dp, rm, more) {
	        var u,
	            xc = x.c,
	            i = x.e + dp + 1;

	        if (rm === 1) {

	            // xc[i] is the digit after the digit that may be rounded up.
	            more = xc[i] >= 5;
	        } else if (rm === 2) {
	            more = xc[i] > 5 || xc[i] == 5 &&
	              (more || i < 0 || xc[i + 1] !== u || xc[i - 1] & 1);
	        } else if (rm === 3) {
	            more = more || xc[i] !== u || i < 0;
	        } else {
	            more = false;

	            if (rm !== 0) {
	                throwErr('!Big.RM!');
	            }
	        }

	        if (i < 1 || !xc[0]) {

	            if (more) {

	                // 1, 0.1, 0.01, 0.001, 0.0001 etc.
	                x.e = -dp;
	                x.c = [1];
	            } else {

	                // Zero.
	                x.c = [x.e = 0];
	            }
	        } else {

	            // Remove any digits after the required decimal places.
	            xc.length = i--;

	            // Round up?
	            if (more) {

	                // Rounding up may mean the previous digit has to be rounded up.
	                for (; ++xc[i] > 9;) {
	                    xc[i] = 0;

	                    if (!i--) {
	                        ++x.e;
	                        xc.unshift(1);
	                    }
	                }
	            }

	            // Remove trailing zeros.
	            for (i = xc.length; !xc[--i]; xc.pop()) {
	            }
	        }

	        return x;
	    }


	    /*
	     * Throw a BigError.
	     *
	     * message {string} The error message.
	     */
	    function throwErr(message) {
	        var err = new Error(message);
	        err.name = 'BigError';

	        throw err;
	    }


	    // Prototype/instance methods


	    /*
	     * Return a new Big whose value is the absolute value of this Big.
	     */
	    P.abs = function () {
	        var x = new this.constructor(this);
	        x.s = 1;

	        return x;
	    };


	    /*
	     * Return
	     * 1 if the value of this Big is greater than the value of Big y,
	     * -1 if the value of this Big is less than the value of Big y, or
	     * 0 if they have the same value.
	    */
	    P.cmp = function (y) {
	        var xNeg,
	            x = this,
	            xc = x.c,
	            yc = (y = new x.constructor(y)).c,
	            i = x.s,
	            j = y.s,
	            k = x.e,
	            l = y.e;

	        // Either zero?
	        if (!xc[0] || !yc[0]) {
	            return !xc[0] ? !yc[0] ? 0 : -j : i;
	        }

	        // Signs differ?
	        if (i != j) {
	            return i;
	        }
	        xNeg = i < 0;

	        // Compare exponents.
	        if (k != l) {
	            return k > l ^ xNeg ? 1 : -1;
	        }

	        i = -1;
	        j = (k = xc.length) < (l = yc.length) ? k : l;

	        // Compare digit by digit.
	        for (; ++i < j;) {

	            if (xc[i] != yc[i]) {
	                return xc[i] > yc[i] ^ xNeg ? 1 : -1;
	            }
	        }

	        // Compare lengths.
	        return k == l ? 0 : k > l ^ xNeg ? 1 : -1;
	    };


	    /*
	     * Return a new Big whose value is the value of this Big divided by the
	     * value of Big y, rounded, if necessary, to a maximum of Big.DP decimal
	     * places using rounding mode Big.RM.
	     */
	    P.div = function (y) {
	        var x = this,
	            Big = x.constructor,
	            // dividend
	            dvd = x.c,
	            //divisor
	            dvs = (y = new Big(y)).c,
	            s = x.s == y.s ? 1 : -1,
	            dp = Big.DP;

	        if (dp !== ~~dp || dp < 0 || dp > MAX_DP) {
	            throwErr('!Big.DP!');
	        }

	        // Either 0?
	        if (!dvd[0] || !dvs[0]) {

	            // If both are 0, throw NaN
	            if (dvd[0] == dvs[0]) {
	                throwErr(NaN);
	            }

	            // If dvs is 0, throw +-Infinity.
	            if (!dvs[0]) {
	                throwErr(s / 0);
	            }

	            // dvd is 0, return +-0.
	            return new Big(s * 0);
	        }

	        var dvsL, dvsT, next, cmp, remI, u,
	            dvsZ = dvs.slice(),
	            dvdI = dvsL = dvs.length,
	            dvdL = dvd.length,
	            // remainder
	            rem = dvd.slice(0, dvsL),
	            remL = rem.length,
	            // quotient
	            q = y,
	            qc = q.c = [],
	            qi = 0,
	            digits = dp + (q.e = x.e - y.e) + 1;

	        q.s = s;
	        s = digits < 0 ? 0 : digits;

	        // Create version of divisor with leading zero.
	        dvsZ.unshift(0);

	        // Add zeros to make remainder as long as divisor.
	        for (; remL++ < dvsL; rem.push(0)) {
	        }

	        do {

	            // 'next' is how many times the divisor goes into current remainder.
	            for (next = 0; next < 10; next++) {

	                // Compare divisor and remainder.
	                if (dvsL != (remL = rem.length)) {
	                    cmp = dvsL > remL ? 1 : -1;
	                } else {

	                    for (remI = -1, cmp = 0; ++remI < dvsL;) {

	                        if (dvs[remI] != rem[remI]) {
	                            cmp = dvs[remI] > rem[remI] ? 1 : -1;
	                            break;
	                        }
	                    }
	                }

	                // If divisor < remainder, subtract divisor from remainder.
	                if (cmp < 0) {

	                    // Remainder can't be more than 1 digit longer than divisor.
	                    // Equalise lengths using divisor with extra leading zero?
	                    for (dvsT = remL == dvsL ? dvs : dvsZ; remL;) {

	                        if (rem[--remL] < dvsT[remL]) {
	                            remI = remL;

	                            for (; remI && !rem[--remI]; rem[remI] = 9) {
	                            }
	                            --rem[remI];
	                            rem[remL] += 10;
	                        }
	                        rem[remL] -= dvsT[remL];
	                    }
	                    for (; !rem[0]; rem.shift()) {
	                    }
	                } else {
	                    break;
	                }
	            }

	            // Add the 'next' digit to the result array.
	            qc[qi++] = cmp ? next : ++next;

	            // Update the remainder.
	            if (rem[0] && cmp) {
	                rem[remL] = dvd[dvdI] || 0;
	            } else {
	                rem = [ dvd[dvdI] ];
	            }

	        } while ((dvdI++ < dvdL || rem[0] !== u) && s--);

	        // Leading zero? Do not remove if result is simply zero (qi == 1).
	        if (!qc[0] && qi != 1) {

	            // There can't be more than one zero.
	            qc.shift();
	            q.e--;
	        }

	        // Round?
	        if (qi > digits) {
	            rnd(q, dp, Big.RM, rem[0] !== u);
	        }

	        return q;
	    };


	    /*
	     * Return true if the value of this Big is equal to the value of Big y,
	     * otherwise returns false.
	     */
	    P.eq = function (y) {
	        return !this.cmp(y);
	    };


	    /*
	     * Return true if the value of this Big is greater than the value of Big y,
	     * otherwise returns false.
	     */
	    P.gt = function (y) {
	        return this.cmp(y) > 0;
	    };


	    /*
	     * Return true if the value of this Big is greater than or equal to the
	     * value of Big y, otherwise returns false.
	     */
	    P.gte = function (y) {
	        return this.cmp(y) > -1;
	    };


	    /*
	     * Return true if the value of this Big is less than the value of Big y,
	     * otherwise returns false.
	     */
	    P.lt = function (y) {
	        return this.cmp(y) < 0;
	    };


	    /*
	     * Return true if the value of this Big is less than or equal to the value
	     * of Big y, otherwise returns false.
	     */
	    P.lte = function (y) {
	         return this.cmp(y) < 1;
	    };


	    /*
	     * Return a new Big whose value is the value of this Big minus the value
	     * of Big y.
	     */
	    P.sub = P.minus = function (y) {
	        var i, j, t, xLTy,
	            x = this,
	            Big = x.constructor,
	            a = x.s,
	            b = (y = new Big(y)).s;

	        // Signs differ?
	        if (a != b) {
	            y.s = -b;
	            return x.plus(y);
	        }

	        var xc = x.c.slice(),
	            xe = x.e,
	            yc = y.c,
	            ye = y.e;

	        // Either zero?
	        if (!xc[0] || !yc[0]) {

	            // y is non-zero? x is non-zero? Or both are zero.
	            return yc[0] ? (y.s = -b, y) : new Big(xc[0] ? x : 0);
	        }

	        // Determine which is the bigger number.
	        // Prepend zeros to equalise exponents.
	        if (a = xe - ye) {

	            if (xLTy = a < 0) {
	                a = -a;
	                t = xc;
	            } else {
	                ye = xe;
	                t = yc;
	            }

	            t.reverse();
	            for (b = a; b--; t.push(0)) {
	            }
	            t.reverse();
	        } else {

	            // Exponents equal. Check digit by digit.
	            j = ((xLTy = xc.length < yc.length) ? xc : yc).length;

	            for (a = b = 0; b < j; b++) {

	                if (xc[b] != yc[b]) {
	                    xLTy = xc[b] < yc[b];
	                    break;
	                }
	            }
	        }

	        // x < y? Point xc to the array of the bigger number.
	        if (xLTy) {
	            t = xc;
	            xc = yc;
	            yc = t;
	            y.s = -y.s;
	        }

	        /*
	         * Append zeros to xc if shorter. No need to add zeros to yc if shorter
	         * as subtraction only needs to start at yc.length.
	         */
	        if (( b = (j = yc.length) - (i = xc.length) ) > 0) {

	            for (; b--; xc[i++] = 0) {
	            }
	        }

	        // Subtract yc from xc.
	        for (b = i; j > a;){

	            if (xc[--j] < yc[j]) {

	                for (i = j; i && !xc[--i]; xc[i] = 9) {
	                }
	                --xc[i];
	                xc[j] += 10;
	            }
	            xc[j] -= yc[j];
	        }

	        // Remove trailing zeros.
	        for (; xc[--b] === 0; xc.pop()) {
	        }

	        // Remove leading zeros and adjust exponent accordingly.
	        for (; xc[0] === 0;) {
	            xc.shift();
	            --ye;
	        }

	        if (!xc[0]) {

	            // n - n = +0
	            y.s = 1;

	            // Result must be zero.
	            xc = [ye = 0];
	        }

	        y.c = xc;
	        y.e = ye;

	        return y;
	    };


	    /*
	     * Return a new Big whose value is the value of this Big modulo the
	     * value of Big y.
	     */
	    P.mod = function (y) {
	        var yGTx,
	            x = this,
	            Big = x.constructor,
	            a = x.s,
	            b = (y = new Big(y)).s;

	        if (!y.c[0]) {
	            throwErr(NaN);
	        }

	        x.s = y.s = 1;
	        yGTx = y.cmp(x) == 1;
	        x.s = a;
	        y.s = b;

	        if (yGTx) {
	            return new Big(x);
	        }

	        a = Big.DP;
	        b = Big.RM;
	        Big.DP = Big.RM = 0;
	        x = x.div(y);
	        Big.DP = a;
	        Big.RM = b;

	        return this.minus( x.times(y) );
	    };


	    /*
	     * Return a new Big whose value is the value of this Big plus the value
	     * of Big y.
	     */
	    P.add = P.plus = function (y) {
	        var t,
	            x = this,
	            Big = x.constructor,
	            a = x.s,
	            b = (y = new Big(y)).s;

	        // Signs differ?
	        if (a != b) {
	            y.s = -b;
	            return x.minus(y);
	        }

	        var xe = x.e,
	            xc = x.c,
	            ye = y.e,
	            yc = y.c;

	        // Either zero?
	        if (!xc[0] || !yc[0]) {

	            // y is non-zero? x is non-zero? Or both are zero.
	            return yc[0] ? y : new Big(xc[0] ? x : a * 0);
	        }
	        xc = xc.slice();

	        // Prepend zeros to equalise exponents.
	        // Note: Faster to use reverse then do unshifts.
	        if (a = xe - ye) {

	            if (a > 0) {
	                ye = xe;
	                t = yc;
	            } else {
	                a = -a;
	                t = xc;
	            }

	            t.reverse();
	            for (; a--; t.push(0)) {
	            }
	            t.reverse();
	        }

	        // Point xc to the longer array.
	        if (xc.length - yc.length < 0) {
	            t = yc;
	            yc = xc;
	            xc = t;
	        }
	        a = yc.length;

	        /*
	         * Only start adding at yc.length - 1 as the further digits of xc can be
	         * left as they are.
	         */
	        for (b = 0; a;) {
	            b = (xc[--a] = xc[a] + yc[a] + b) / 10 | 0;
	            xc[a] %= 10;
	        }

	        // No need to check for zero, as +x + +y != 0 && -x + -y != 0

	        if (b) {
	            xc.unshift(b);
	            ++ye;
	        }

	         // Remove trailing zeros.
	        for (a = xc.length; xc[--a] === 0; xc.pop()) {
	        }

	        y.c = xc;
	        y.e = ye;

	        return y;
	    };


	    /*
	     * Return a Big whose value is the value of this Big raised to the power n.
	     * If n is negative, round, if necessary, to a maximum of Big.DP decimal
	     * places using rounding mode Big.RM.
	     *
	     * n {number} Integer, -MAX_POWER to MAX_POWER inclusive.
	     */
	    P.pow = function (n) {
	        var x = this,
	            one = new x.constructor(1),
	            y = one,
	            isNeg = n < 0;

	        if (n !== ~~n || n < -MAX_POWER || n > MAX_POWER) {
	            throwErr('!pow!');
	        }

	        n = isNeg ? -n : n;

	        for (;;) {

	            if (n & 1) {
	                y = y.times(x);
	            }
	            n >>= 1;

	            if (!n) {
	                break;
	            }
	            x = x.times(x);
	        }

	        return isNeg ? one.div(y) : y;
	    };


	    /*
	     * Return a new Big whose value is the value of this Big rounded to a
	     * maximum of dp decimal places using rounding mode rm.
	     * If dp is not specified, round to 0 decimal places.
	     * If rm is not specified, use Big.RM.
	     *
	     * [dp] {number} Integer, 0 to MAX_DP inclusive.
	     * [rm] 0, 1, 2 or 3 (ROUND_DOWN, ROUND_HALF_UP, ROUND_HALF_EVEN, ROUND_UP)
	     */
	    P.round = function (dp, rm) {
	        var x = this,
	            Big = x.constructor;

	        if (dp == null) {
	            dp = 0;
	        } else if (dp !== ~~dp || dp < 0 || dp > MAX_DP) {
	            throwErr('!round!');
	        }
	        rnd(x = new Big(x), dp, rm == null ? Big.RM : rm);

	        return x;
	    };


	    /*
	     * Return a new Big whose value is the square root of the value of this Big,
	     * rounded, if necessary, to a maximum of Big.DP decimal places using
	     * rounding mode Big.RM.
	     */
	    P.sqrt = function () {
	        var estimate, r, approx,
	            x = this,
	            Big = x.constructor,
	            xc = x.c,
	            i = x.s,
	            e = x.e,
	            half = new Big('0.5');

	        // Zero?
	        if (!xc[0]) {
	            return new Big(x);
	        }

	        // If negative, throw NaN.
	        if (i < 0) {
	            throwErr(NaN);
	        }

	        // Estimate.
	        i = Math.sqrt(x.toString());

	        // Math.sqrt underflow/overflow?
	        // Pass x to Math.sqrt as integer, then adjust the result exponent.
	        if (i === 0 || i === 1 / 0) {
	            estimate = xc.join('');

	            if (!(estimate.length + e & 1)) {
	                estimate += '0';
	            }

	            r = new Big( Math.sqrt(estimate).toString() );
	            r.e = ((e + 1) / 2 | 0) - (e < 0 || e & 1);
	        } else {
	            r = new Big(i.toString());
	        }

	        i = r.e + (Big.DP += 4);

	        // Newton-Raphson iteration.
	        do {
	            approx = r;
	            r = half.times( approx.plus( x.div(approx) ) );
	        } while ( approx.c.slice(0, i).join('') !==
	                       r.c.slice(0, i).join('') );

	        rnd(r, Big.DP -= 4, Big.RM);

	        return r;
	    };


	    /*
	     * Return a new Big whose value is the value of this Big times the value of
	     * Big y.
	     */
	    P.mul = P.times = function (y) {
	        var c,
	            x = this,
	            Big = x.constructor,
	            xc = x.c,
	            yc = (y = new Big(y)).c,
	            a = xc.length,
	            b = yc.length,
	            i = x.e,
	            j = y.e;

	        // Determine sign of result.
	        y.s = x.s == y.s ? 1 : -1;

	        // Return signed 0 if either 0.
	        if (!xc[0] || !yc[0]) {
	            return new Big(y.s * 0);
	        }

	        // Initialise exponent of result as x.e + y.e.
	        y.e = i + j;

	        // If array xc has fewer digits than yc, swap xc and yc, and lengths.
	        if (a < b) {
	            c = xc;
	            xc = yc;
	            yc = c;
	            j = a;
	            a = b;
	            b = j;
	        }

	        // Initialise coefficient array of result with zeros.
	        for (c = new Array(j = a + b); j--; c[j] = 0) {
	        }

	        // Multiply.

	        // i is initially xc.length.
	        for (i = b; i--;) {
	            b = 0;

	            // a is yc.length.
	            for (j = a + i; j > i;) {

	                // Current sum of products at this digit position, plus carry.
	                b = c[j] + yc[i] * xc[j - i - 1] + b;
	                c[j--] = b % 10;

	                // carry
	                b = b / 10 | 0;
	            }
	            c[j] = (c[j] + b) % 10;
	        }

	        // Increment result exponent if there is a final carry.
	        if (b) {
	            ++y.e;
	        }

	        // Remove any leading zero.
	        if (!c[0]) {
	            c.shift();
	        }

	        // Remove trailing zeros.
	        for (i = c.length; !c[--i]; c.pop()) {
	        }
	        y.c = c;

	        return y;
	    };


	    /*
	     * Return a string representing the value of this Big.
	     * Return exponential notation if this Big has a positive exponent equal to
	     * or greater than Big.E_POS, or a negative exponent equal to or less than
	     * Big.E_NEG.
	     */
	    P.toString = P.valueOf = P.toJSON = function () {
	        var x = this,
	            Big = x.constructor,
	            e = x.e,
	            str = x.c.join(''),
	            strL = str.length;

	        // Exponential notation?
	        if (e <= Big.E_NEG || e >= Big.E_POS) {
	            str = str.charAt(0) + (strL > 1 ? '.' + str.slice(1) : '') +
	              (e < 0 ? 'e' : 'e+') + e;

	        // Negative exponent?
	        } else if (e < 0) {

	            // Prepend zeros.
	            for (; ++e; str = '0' + str) {
	            }
	            str = '0.' + str;

	        // Positive exponent?
	        } else if (e > 0) {

	            if (++e > strL) {

	                // Append zeros.
	                for (e -= strL; e-- ; str += '0') {
	                }
	            } else if (e < strL) {
	                str = str.slice(0, e) + '.' + str.slice(e);
	            }

	        // Exponent zero.
	        } else if (strL > 1) {
	            str = str.charAt(0) + '.' + str.slice(1);
	        }

	        // Avoid '-0'
	        return x.s < 0 && x.c[0] ? '-' + str : str;
	    };


	    /*
	     ***************************************************************************
	     * If toExponential, toFixed, toPrecision and format are not required they
	     * can safely be commented-out or deleted. No redundant code will be left.
	     * format is used only by toExponential, toFixed and toPrecision.
	     ***************************************************************************
	     */


	    /*
	     * Return a string representing the value of this Big in exponential
	     * notation to dp fixed decimal places and rounded, if necessary, using
	     * Big.RM.
	     *
	     * [dp] {number} Integer, 0 to MAX_DP inclusive.
	     */
	    P.toExponential = function (dp) {

	        if (dp == null) {
	            dp = this.c.length - 1;
	        } else if (dp !== ~~dp || dp < 0 || dp > MAX_DP) {
	            throwErr('!toExp!');
	        }

	        return format(this, dp, 1);
	    };


	    /*
	     * Return a string representing the value of this Big in normal notation
	     * to dp fixed decimal places and rounded, if necessary, using Big.RM.
	     *
	     * [dp] {number} Integer, 0 to MAX_DP inclusive.
	     */
	    P.toFixed = function (dp) {
	        var str,
	            x = this,
	            Big = x.constructor,
	            neg = Big.E_NEG,
	            pos = Big.E_POS;

	        // Prevent the possibility of exponential notation.
	        Big.E_NEG = -(Big.E_POS = 1 / 0);

	        if (dp == null) {
	            str = x.toString();
	        } else if (dp === ~~dp && dp >= 0 && dp <= MAX_DP) {
	            str = format(x, x.e + dp);

	            // (-0).toFixed() is '0', but (-0.1).toFixed() is '-0'.
	            // (-0).toFixed(1) is '0.0', but (-0.01).toFixed(1) is '-0.0'.
	            if (x.s < 0 && x.c[0] && str.indexOf('-') < 0) {
	        //E.g. -0.5 if rounded to -0 will cause toString to omit the minus sign.
	                str = '-' + str;
	            }
	        }
	        Big.E_NEG = neg;
	        Big.E_POS = pos;

	        if (!str) {
	            throwErr('!toFix!');
	        }

	        return str;
	    };


	    /*
	     * Return a string representing the value of this Big rounded to sd
	     * significant digits using Big.RM. Use exponential notation if sd is less
	     * than the number of digits necessary to represent the integer part of the
	     * value in normal notation.
	     *
	     * sd {number} Integer, 1 to MAX_DP inclusive.
	     */
	    P.toPrecision = function (sd) {

	        if (sd == null) {
	            return this.toString();
	        } else if (sd !== ~~sd || sd < 1 || sd > MAX_DP) {
	            throwErr('!toPre!');
	        }

	        return format(this, sd - 1, 2);
	    };


	    // Export


	    Big = bigFactory();

	    //AMD.
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	            return Big;
	        }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

	    // Node and other CommonJS-like environments that support module.exports.
	    } else if (typeof module !== 'undefined' && module.exports) {
	        module.exports = Big;

	    //Browser.
	    } else {
	        global.Big = Big;
	    }
	})(this);


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(m) {'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _component = __webpack_require__(6);

	var _component2 = _interopRequireDefault(_component);

	var _header = __webpack_require__(7);

	var _header2 = _interopRequireDefault(_header);

	var _footer = __webpack_require__(8);

	var _footer2 = _interopRequireDefault(_footer);

	var _modulesUtil = __webpack_require__(9);

	var Util = _interopRequireWildcard(_modulesUtil);

	/** @jsx m */

	var Block = (function (_Component) {
	  _inherits(Block, _Component);

	  function Block() {
	    _classCallCheck(this, Block);

	    _get(Object.getPrototypeOf(Block.prototype), 'constructor', this).apply(this, arguments);
	  }

	  _createClass(Block, [{
	    key: 'init',
	    value: function init(ctrl) {
	      var hash = m.route.param('hash');

	      ctrl.height = m.prop(0);
	      ctrl.block = m.prop({});
	      ctrl.block_transactions = m.prop([]);
	      ctrl.transactions = m.prop([]);
	      ctrl.tx_cursor = m.prop(0);

	      window.onscroll = this.onScroll(ctrl);

	      this.getLastHeight(ctrl);

	      if (hash.length === 64) {
	        this.fetchByHash(ctrl, hash);
	      } else {
	        this.fetchByHeight(ctrl, parseInt(hash, 10));
	      }
	    }
	  }, {
	    key: 'onUnload',
	    value: function onUnload(event) {
	      window.onscroll = undefined;
	    }
	  }, {
	    key: 'onScroll',
	    value: function onScroll(ctrl) {
	      var _this = this;

	      return function (_event) {
	        _this.fetchSeenTransactions(ctrl);
	      };
	    }
	  }, {
	    key: 'getLastHeight',
	    value: function getLastHeight(ctrl) {
	      var _this2 = this;

	      this.client.fetchLastHeight().then(function (reply) {
	        _this2.vm.last_height(reply.height);
	      });
	    }
	  }, {
	    key: 'fetchByHash',
	    value: function fetchByHash(ctrl, hash) {
	      var _this3 = this;

	      m.startComputation();
	      this.client.fetchBlockHeight(hash).then(function (resp) {
	        _this3.fetchByHeight(ctrl, resp.height);
	        m.endComputation();
	      }, function (error) {
	        _this3.vm.error(error);
	        m.endComputation();
	      });
	    }
	  }, {
	    key: 'fetchByHeight',
	    value: function fetchByHeight(ctrl, height) {
	      var _this4 = this;

	      if (height < 0) height = this.vm.last_height() + height + 1;
	      m.startComputation();
	      this.client.fetchBlockHeader(height).then(function (resp) {
	        ctrl.height(height);
	        ctrl.block(resp.block_header);
	        m.endComputation();
	        _this4.fetchTransasctionHashes(ctrl);
	      }, function (error) {
	        _this4.fetchByHeight(ctrl, -1);
	        m.endComputation();
	      });
	    }
	  }, {
	    key: 'fetchTransasctionHashes',
	    value: function fetchTransasctionHashes(ctrl) {
	      var _this5 = this;

	      var block = ctrl.block();
	      if (!block) return;
	      this.client.fetchBlockTransactionHashes(block.hash).then(function (resp) {
	        m.startComputation();
	        ctrl.block_transactions(resp.transactions);
	        m.endComputation();
	      }, function (error) {
	        m.startComputation();
	        _this5.vm.error(error);
	        m.endComputation();
	      });
	    }
	  }, {
	    key: 'getTxCursor',
	    value: function getTxCursor(ctrl) {
	      var index = ctrl.tx_cursor();
	      return ctrl.block_transactions()[index];
	    }
	  }, {
	    key: 'fetchSeenTransactions',
	    value: function fetchSeenTransactions(ctrl) {
	      var hash = this.getTxCursor(ctrl);
	      if (!hash) return true;
	      var el = document.getElementById(Util.txHashId(hash));
	      if (!el) return true;
	      if (Util.elementViewed(el)) {
	        this.fetchTransaction(ctrl, ctrl.transactions(), hash);
	        ctrl.tx_cursor(ctrl.tx_cursor() + 1);
	        this.onScroll(ctrl)(event);
	        return true;
	      }
	    }
	  }, {
	    key: 'fetchTransaction',
	    value: function fetchTransaction(ctrl, transactions, hash) {
	      var _this6 = this;

	      if (!transactions[hash]) {
	        m.startComputation();
	        transactions[hash] = this.client.fetchBlockchainTransaction(hash).then(function (resp) {
	          transactions[resp.transaction.hash] = resp.transaction;
	          ctrl.transactions(transactions);
	          m.endComputation();
	        }, function (error) {
	          _this6.vm.error(error);
	          m.endComputation();
	        });
	      }
	    }
	  }, {
	    key: 'fetchAllTransactions',
	    value: function fetchAllTransactions(ctrl) {
	      var _this7 = this;

	      resp.transactions.forEach(function (hash) {
	        _this7.client.fetchBlockchainTransaction(hash).then(function (resp) {
	          var transactions = ctrl.transactions();
	          transactions[resp.transaction.hash] = resp.transaction;
	          ctrl.transactions(transactions);
	          m.redraw('diff');
	        }, function (error) {
	          throw error;
	          _this7.vm.error(error);
	        });
	      });
	    }
	  }, {
	    key: 'view',
	    value: function view(ctrl) {
	      var _this8 = this;

	      var transactions = ctrl.transactions();
	      var block = ctrl.block();

	      if (!block) {
	        return m(
	          'div',
	          null,
	          (0, _header2['default'])(this),
	          'not found',
	          (0, _footer2['default'])(this)
	        );
	      }

	      return m(
	        'div',
	        null,
	        (0, _header2['default'])(this),
	        m(
	          'div',
	          { 'class': 'container' },
	          m(
	            'div',
	            { 'class': 'row' },
	            m(
	              'div',
	              { 'class': 'body_head' },
	              m(
	                'div',
	                { 'class': 'block_next' },
	                ctrl.height() < this.vm.last_height() ? m('a', { onclick: this.navigate('/block/' + (ctrl.height() + 1)) }, 'O') : ''
	              ),
	              m(
	                'div',
	                { 'class': 'block_prev' },
	                m(
	                  'a',
	                  { href: '#', onclick: this.navigate('/block/' + (ctrl.height() - 1)) },
	                  'N'
	                )
	              ),
	              m(
	                'div',
	                { 'class': 'body_head_icon' },
	                '1'
	              ),
	              'Block ',
	              m(
	                'span',
	                null,
	                '#',
	                ctrl.height()
	              )
	            )
	          ),
	          m(
	            'div',
	            { 'class': 'row' },
	            m(
	              'div',
	              { 'class': 'block_shell' },
	              m(
	                'div',
	                { 'class': 'block_height' },
	                m(
	                  'div',
	                  { 'class': 'block_height_tag' },
	                  'Block Height'
	                ),
	                m(
	                  'div',
	                  { 'class': 'block_height_icon' },
	                  '4'
	                ),
	                ctrl.height(),
	                m('br', null)
	              ),
	              m(
	                'div',
	                { 'class': 'block_line' },
	                m(
	                  'div',
	                  { 'class': 'block_line_icon' },
	                  '7'
	                ),
	                block ? Util.formatTime(block.timestamp * 1000) : ''
	              ),
	              m(
	                'div',
	                { 'class': 'block_line' },
	                m(
	                  'div',
	                  { 'class': 'block_line_tag' },
	                  'BLOCK SIZE'
	                ),
	                block.size
	              ),
	              m(
	                'div',
	                { 'class': 'block_line' },
	                m(
	                  'div',
	                  { 'class': 'block_line_tag' },
	                  'BLOCK HASH'
	                ),
	                m(
	                  'a',
	                  { href: '#', onclick: this.navigate('/block/' + block.hash) },
	                  block.hash
	                )
	              ),
	              m(
	                'div',
	                { 'class': 'block_line' },
	                m(
	                  'div',
	                  { 'class': 'block_line_tag' },
	                  'MERKLE ROOT'
	                ),
	                block.merkle
	              ),
	              m(
	                'div',
	                { 'class': 'block_line' },
	                m(
	                  'div',
	                  { 'class': 'block_line_tag' },
	                  'NONCE'
	                ),
	                '0x',
	                block.nonce.toString(16)
	              ),
	              m(
	                'div',
	                { 'class': 'block_line' },
	                m(
	                  'div',
	                  { 'class': 'block_line_tag' },
	                  'BITS'
	                ),
	                '0x',
	                block.bits.toString(16)
	              ),
	              m(
	                'div',
	                { 'class': 'block_line' },
	                m(
	                  'div',
	                  { 'class': 'block_line_tag' },
	                  'BLOCK VERSION'
	                ),
	                block.version
	              ),
	              m(
	                'div',
	                { 'class': 'block_line' },
	                m(
	                  'div',
	                  { 'class': 'block_line_tag' },
	                  'PREVIOUS BLOCK HASH'
	                ),
	                m(
	                  'a',
	                  { href: '#', onclick: this.navigate('/block/' + block.previous_block_hash) },
	                  block.previous_block_hash
	                )
	              ),
	              m(
	                'div',
	                { 'class': 'block_line' },
	                m(
	                  'div',
	                  { 'class': 'block_line_tag' },
	                  'TRANSACTION COUNT'
	                ),
	                ctrl.block_transactions().length || '...'
	              )
	            )
	          )
	        ),
	        m(
	          'div',
	          { 'class': 'container' },
	          m(
	            'div',
	            { 'class': 'row' },
	            m(
	              'div',
	              { 'class': 'body_head' },
	              m(
	                'div',
	                { 'class': 'body_head_icon' },
	                '1'
	              ),
	              'Transactions in block ',
	              m(
	                'span',
	                null,
	                '#',
	                ctrl.height()
	              )
	            )
	          ),
	          m(
	            'div',
	            { 'class': 'row' },
	            ctrl.block_transactions().map(function (hash) {
	              var tx = transactions[hash];
	              return m(
	                'div',
	                { id: Util.txHashId(hash) },
	                m(
	                  'div',
	                  { 'class': 'block_line', style: 'text-align:left;' },
	                  m(
	                    'a',
	                    { href: '#', onclick: _this8.navigate('/tx/' + hash) },
	                    hash
	                  ),
	                  m(
	                    'div',
	                    { 'class': 'block_trans_amount' },
	                    tx && Util.satoshiToBtc(tx.value) || '',
	                    m(
	                      'span',
	                      null,
	                      '1'
	                    )
	                  ),
	                  m('div', { style: 'clear:both;' })
	                )
	              );
	            })
	          )
	        ),
	        (0, _footer2['default'])(this)
	      );
	    }
	  }]);

	  return Block;
	})(_component2['default']);

	exports['default'] = Block;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(m) {'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _component = __webpack_require__(6);

	var _component2 = _interopRequireDefault(_component);

	var _header = __webpack_require__(7);

	var _header2 = _interopRequireDefault(_header);

	var _footer = __webpack_require__(8);

	var _footer2 = _interopRequireDefault(_footer);

	var _modulesUtil = __webpack_require__(9);

	var Util = _interopRequireWildcard(_modulesUtil);

	var _bigJs = __webpack_require__(10);

	var _bigJs2 = _interopRequireDefault(_bigJs);

	/** @jsx m */

	var Transaction = (function (_Component) {
	  _inherits(Transaction, _Component);

	  function Transaction() {
	    _classCallCheck(this, Transaction);

	    _get(Object.getPrototypeOf(Transaction.prototype), 'constructor', this).apply(this, arguments);
	  }

	  _createClass(Transaction, [{
	    key: 'init',
	    value: function init(ctrl) {
	      var hash = m.route.param('hash');
	      ctrl.hash = m.prop(hash);
	      ctrl.height = m.prop(null);
	      ctrl.index = m.prop(null);
	      ctrl.tx = m.prop({});
	      ctrl.header = m.prop({});

	      this.fetchTransactionIndex(ctrl);
	    }
	  }, {
	    key: 'fetchTransactionIndex',
	    value: function fetchTransactionIndex(ctrl) {
	      var _this = this;

	      m.startComputation();
	      this.client.fetchTransactionIndex(ctrl.hash()).then(function (resp) {
	        ctrl.height(resp.height);
	        ctrl.index(resp.index);
	        _this.fetchBlock(ctrl);
	        _this.fetchTransaction(ctrl);
	        m.endComputation();
	      })['catch'](function (error) {
	        if (error === 'not_found') {
	          ctrl.height(0);
	          ctrl.index(null);
	          _this.fetchTransaction(ctrl);
	        }
	        m.endComputation();
	      });
	    }
	  }, {
	    key: 'fetchBlock',
	    value: function fetchBlock(ctrl) {
	      if (ctrl.height() > 0) {
	        m.startComputation();
	        this.client.fetchBlockHeader(ctrl.height()).then(function (resp) {
	          ctrl.header(resp.block_header);
	          m.endComputation();
	        });
	      }
	    }
	  }, {
	    key: 'fetchTransaction',
	    value: function fetchTransaction(ctrl) {
	      m.startComputation();
	      if (ctrl.height() > 0) {
	        this.client.fetchBlockchainTransaction(ctrl.hash()).then(function (resp) {
	          ctrl.tx(resp.transaction);
	          m.endComputation();
	        });
	      } else {
	        this.client.fetchTransactionPoolTransaction(ctrl.hash()).then(function (resp) {
	          ctrl.tx(resp.transaction);
	          m.endComputation();
	        });
	      }
	    }
	  }, {
	    key: 'inputView',
	    value: function inputView(ctrl) {
	      var _this2 = this;

	      return function (input) {
	        return m(
	          'div',
	          { 'class': 'inout_shell' },
	          m(
	            'div',
	            { 'class': 'block_line' },
	            m(
	              'div',
	              { 'class': 'block_line_tag' },
	              'INPUT ADDRESS'
	            ),
	            m(
	              'a',
	              { href: '#', onclick: _this2.navigate('/address/' + input.address) },
	              input.address
	            )
	          ),
	          m(
	            'div',
	            { 'class': 'block_line' },
	            m(
	              'div',
	              { 'class': 'block_line_tag alt' },
	              'PREVIOUS OUTPUT'
	            ),
	            m(
	              'a',
	              { href: '#', onclick: _this2.navigate('/tx/' + input.previous_output.hash) },
	              input.previous_output.hash
	            )
	          ),
	          m(
	            'div',
	            { 'class': 'block_line' },
	            m(
	              'div',
	              { 'class': 'block_line_tag alt' },
	              'PREVIOUS OUTPUT INDEX'
	            ),
	            input.previous_output.index
	          ),
	          m(
	            'div',
	            { 'class': 'block_line' },
	            m(
	              'div',
	              { 'class': 'block_line_tag alt' },
	              'SEQUENCE'
	            ),
	            '0x',
	            input.sequence.toString(16)
	          ),
	          m('div', { 'class': 'horline' })
	        );
	      };
	    }
	  }, {
	    key: 'outputView',
	    value: function outputView(ctrl) {
	      var _this3 = this;

	      return function (output) {
	        return m(
	          'div',
	          { 'class': 'inout_shell' },
	          m(
	            'div',
	            { 'class': 'block_line' },
	            m(
	              'div',
	              { 'class': 'block_line_tag' },
	              'OUTPUT ADDRESS'
	            ),
	            m(
	              'a',
	              { href: '#', onclick: _this3.navigate('/address/' + output.address) },
	              output.address
	            )
	          ),
	          m(
	            'div',
	            { 'class': 'block_line' },
	            m(
	              'div',
	              { 'class': 'block_line_tag alt' },
	              'OUTPUT VALUE'
	            ),
	            m(
	              'span',
	              null,
	              '1'
	            ),
	            Util.satoshiToBtc(output.value)
	          ),
	          m(
	            'div',
	            { 'class': 'block_line' },
	            m(
	              'div',
	              { 'class': 'block_line_tag alt' },
	              'SCRIPT'
	            ),
	            output.script_asm
	          ),
	          m('div', { 'class': 'horline' })
	        );
	      };
	    }
	  }, {
	    key: 'view',
	    value: function view(ctrl) {
	      var tx = ctrl.tx();
	      return m(
	        'div',
	        null,
	        (0, _header2['default'])(this),
	        m(
	          'div',
	          { 'class': 'container' },
	          m(
	            'div',
	            { 'class': 'row' },
	            m(
	              'div',
	              { 'class': 'body_head' },
	              m(
	                'div',
	                { 'class': 'body_head_icon' },
	                '1'
	              ),
	              'Bitcoin ',
	              m(
	                'span',
	                null,
	                'Transaction'
	              )
	            )
	          ),
	          m(
	            'div',
	            { 'class': 'row' },
	            m(
	              'div',
	              { 'class': 'block_shell nomarg' },
	              m(
	                'div',
	                { 'class': 'block_height mobile' },
	                m(
	                  'div',
	                  { 'class': 'block_height_tag' },
	                  'Amount'
	                ),
	                m(
	                  'div',
	                  { 'class': 'block_height_icon' },
	                  'J'
	                ),
	                Util.satoshiToBtc(ctrl.tx().value),
	                ' btc',
	                m('br', null)
	              ),
	              m(
	                'div',
	                { 'class': 'block_line' },
	                m(
	                  'div',
	                  { 'class': 'block_line_tag' },
	                  'TRANSACTION HASH'
	                ),
	                ctrl.tx().hash
	              ),
	              m(
	                'div',
	                { 'class': 'block_line' },
	                m(
	                  'div',
	                  { 'class': 'block_line_tag' },
	                  'BLOCK HASH'
	                ),
	                m(
	                  'a',
	                  { href: '#', onclick: this.navigate('/block/' + ctrl.header().hash) },
	                  ctrl.header().hash || 'Unconfirmed Transaction'
	                )
	              ),
	              m(
	                'div',
	                { 'class': 'block_line' },
	                m(
	                  'div',
	                  { 'class': 'block_line_tag' },
	                  'BLOCK NUMBER'
	                ),
	                m(
	                  'a',
	                  { href: '#', onclick: this.navigate('/block/' + ctrl.height()) },
	                  ctrl.height() || 'Unconfirmed Transaction'
	                )
	              )
	            )
	          ),
	          m(
	            'div',
	            { 'class': 'row' },
	            m('div', { 'class': 'inout_arrow_down' })
	          ),
	          m(
	            'div',
	            { 'class': 'row' },
	            m(
	              'div',
	              { 'class': 'block_shell' },
	              m(
	                'div',
	                { 'class': 'inout_head' },
	                m(
	                  'div',
	                  { 'class': 'inout_head_icon' },
	                  'L'
	                ),
	                'Transaction Inputs'
	              ),
	              tx.inputs && tx.inputs.map(this.inputView(ctrl))
	            )
	          ),
	          m(
	            'div',
	            { 'class': 'row' },
	            m(
	              'div',
	              { 'class': 'block_shell' },
	              m(
	                'div',
	                { 'class': 'inout_head' },
	                m(
	                  'div',
	                  { 'class': 'inout_head_icon' },
	                  'K'
	                ),
	                'Transaction Outputs'
	              ),
	              tx.outputs && tx.outputs.map(this.outputView(ctrl))
	            )
	          )
	        ),
	        (0, _footer2['default'])(this)
	      );
	    }
	  }]);

	  return Transaction;
	})(_component2['default']);

	exports['default'] = Transaction;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(m) {'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _component = __webpack_require__(6);

	var _component2 = _interopRequireDefault(_component);

	var _header = __webpack_require__(7);

	var _header2 = _interopRequireDefault(_header);

	var _footer = __webpack_require__(8);

	var _footer2 = _interopRequireDefault(_footer);

	var _modulesUtil = __webpack_require__(9);

	var Util = _interopRequireWildcard(_modulesUtil);

	/** @jsx m */

	var Address = (function (_Component) {
	  _inherits(Address, _Component);

	  function Address() {
	    _classCallCheck(this, Address);

	    _get(Object.getPrototypeOf(Address.prototype), 'constructor', this).apply(this, arguments);
	  }

	  _createClass(Address, [{
	    key: 'init',
	    value: function init(ctrl) {
	      ctrl.address = m.prop(m.route.param('address'));
	      ctrl.history = m.prop([]);
	      ctrl.count = m.prop(20);

	      this.fetchHistory(ctrl);
	    }
	  }, {
	    key: 'onUnload',
	    value: function onUnload() {}
	  }, {
	    key: 'fetchHistory',
	    value: function fetchHistory(ctrl) {
	      var _this = this;

	      this.client.fetchAddressHistory2(ctrl.address(), ctrl.count()).then(function (resp) {
	        ctrl.history(resp.history.sort(_this.historySort));
	        m.redraw('diff');
	      })['catch'](function (error) {
	        alert(error);
	      });
	    }
	  }, {
	    key: 'loadMoreHistory',
	    value: function loadMoreHistory(ctrl) {
	      var _this2 = this;

	      return function () {
	        ctrl.count(ctrl.count() + 20);
	        _this2.fetchHistory(ctrl);
	      };
	    }
	  }, {
	    key: 'oppositeRowType',
	    value: function oppositeRowType(type) {
	      return type == 'spend' ? 'output' : 'spend';
	    }
	  }, {
	    key: 'rowName',
	    value: function rowName(type) {
	      return type == 'spend' ? 'Input' : 'Output';
	    }
	  }, {
	    key: 'linkChecksum',
	    value: function linkChecksum(row) {
	      return this.checksumId({ type: this.oppositeRowType(row.type), checksum: row.checksum });
	    }
	  }, {
	    key: 'checksumId',
	    value: function checksumId(row) {
	      return 'history_' + row.type + '_' + row.checksum;
	    }
	  }, {
	    key: 'findPair',
	    value: function findPair(ctrl, row) {
	      var _this3 = this;

	      return ctrl.history().find(function (find_row) {
	        var type = _this3.oppositeRowType(row.type);
	        return find_row.type === _this3.oppositeRowType(row.type) && find_row.checksum === row.checksum;
	      });
	    }
	  }, {
	    key: 'historySort',
	    value: function historySort(row_a, row_b) {
	      var height_a = row_a.height || Infinity;
	      var height_b = row_b.height || Infinity;
	      if (height_a > height_b) return -1;
	      if (height_a < height_b) return 1;
	      if (row_a.hash > row_b.hash) return 1;
	      if (row_a.hash < row_b.hash) return -1;
	      return 0;
	    }
	  }, {
	    key: 'historyView',
	    value: function historyView(ctrl) {
	      var _this4 = this;

	      return function (row) {
	        var pair = _this4.findPair(ctrl, row);
	        return m(
	          'div',
	          { id: _this4.checksumId(row), 'class': 'inout_shell' },
	          m(
	            'div',
	            { 'class': 'block_line first solid' },
	            m(
	              'div',
	              { 'class': 'block_line_tag' },
	              'TYPE'
	            ),
	            _this4.rowName(row.type)
	          ),
	          m(
	            'div',
	            { 'class': 'block_line' },
	            m(
	              'div',
	              { 'class': 'block_line_tag alt' },
	              'AMOUNT'
	            ),
	            m(
	              'span',
	              null,
	              '1'
	            ),
	            Util.satoshiToBtc(row.value || pair && pair.value)
	          ),
	          m(
	            'div',
	            { 'class': 'block_line' },
	            m(
	              'div',
	              { 'class': 'block_line_tag alt' },
	              'BLOCK HEIGHT'
	            ),
	            m(
	              'a',
	              { href: '#', onclick: _this4.navigate('/block/' + row.height) },
	              row.height
	            )
	          ),
	          m(
	            'div',
	            { 'class': 'block_line' },
	            m(
	              'div',
	              { 'class': 'block_line_tag alt' },
	              'TRANSACTION'
	            ),
	            m(
	              'a',
	              { href: '#', onclick: _this4.navigate('/tx/' + row.hash) },
	              row.hash + ':' + row.index
	            )
	          ),
	          m(
	            'div',
	            { 'class': 'block_line' },
	            m(
	              'div',
	              { 'class': 'block_line_tag alt' },
	              row.type === 'output' ? 'SPEND' : 'PREVIOUS OUTPUT'
	            ),
	            m(
	              'a',
	              { href: '#' + _this4.linkChecksum(row) },
	              pair ? pair.hash + ':' + pair.index : 'Unspent'
	            )
	          ),
	          m('div', { 'class': 'horline' })
	        );
	      };
	    }
	  }, {
	    key: 'loadMoreHistoryView',
	    value: function loadMoreHistoryView(ctrl) {
	      if (ctrl.history().length < ctrl.count()) return;
	      return m(
	        'div',
	        { 'class': 'row' },
	        m(
	          'button',
	          { 'class': '', onclick: this.loadMoreHistory(ctrl) },
	          'Load More'
	        )
	      );
	    }
	  }, {
	    key: 'view',
	    value: function view(ctrl) {
	      return m(
	        'div',
	        null,
	        (0, _header2['default'])(this),
	        m(
	          'div',
	          { 'class': 'container' },
	          m(
	            'div',
	            { 'class': 'row' },
	            m(
	              'div',
	              { 'class': 'body_head' },
	              m(
	                'div',
	                { 'class': 'body_head_icon' },
	                '1'
	              ),
	              'Bitcoin ',
	              m(
	                'span',
	                null,
	                'Address'
	              )
	            )
	          ),
	          m(
	            'div',
	            { 'class': 'row' },
	            m(
	              'div',
	              { 'class': 'block_shell nomarg' },
	              m(
	                'div',
	                { 'class': 'address' },
	                m(
	                  'div',
	                  { 'class': 'address_tag' },
	                  'Address'
	                ),
	                m(
	                  'div',
	                  { 'class': 'address_icon' },
	                  'I'
	                ),
	                ctrl.address()
	              )
	            )
	          ),
	          m(
	            'div',
	            { 'class': 'row' },
	            m('div', { 'class': 'inout_arrow_down' })
	          ),
	          m(
	            'div',
	            { 'class': 'row' },
	            m(
	              'div',
	              { 'class': 'block_shell' },
	              m(
	                'div',
	                { 'class': 'inout_head' },
	                m(
	                  'div',
	                  { 'class': 'inout_head_icon' },
	                  'J'
	                ),
	                'Address Transactions'
	              ),
	              ctrl.history().map(this.historyView(ctrl))
	            )
	          ),
	          this.loadMoreHistoryView(ctrl)
	        ),
	        (0, _footer2['default'])(this)
	      );
	    }
	  }]);

	  return Address;
	})(_component2['default']);

	exports['default'] = Address;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 14 */
/***/ function(module, exports) {

	

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "spinner.svg";

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "favicon.png";

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "web_img.jpg";

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(19);
	__webpack_require__(20);

/***/ },
/* 19 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 20 */
/***/ function(module, exports) {

	

/***/ }
/******/ ]);