/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _Load = __webpack_require__(1);
	
	var _Load2 = _interopRequireDefault(_Load);
	
	var _Touch = __webpack_require__(5);
	
	var _Touch2 = _interopRequireDefault(_Touch);
	
	var _custom_jquery = __webpack_require__(2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var loader = new _Load2.default();
	var touch = new _Touch2.default(loader);
	
	function run(request) {
	    (0, _custom_jquery.jquery)('#videoContainerUl').html('');
	    (0, _custom_jquery.jquery)('#videoContainerUl').css('width', 0);
	    loader.loadVideos(request);
	    touch.init();
	}
	
	(0, _custom_jquery.jquery)('#search').on('keypress', function (event) {
	    if (event.keyCode == 13) {
	        var request = document.getElementById("search").value;
	        run(request);
	    }
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _custom_jquery = __webpack_require__(2);
	
	var _VideoItem = __webpack_require__(3);
	
	var _VideoItem2 = _interopRequireDefault(_VideoItem);
	
	var _AppendVideoToDOM = __webpack_require__(4);
	
	var _AppendVideoToDOM2 = _interopRequireDefault(_AppendVideoToDOM);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var _class = function () {
	    function _class() {
	        _classCallCheck(this, _class);
	
	        this.request = '';
	        this.nextpage = '';
	        this.resultsPerPage = 15;
	        this.firstNodeNumber = 0;
	        this.nodesPerPage = 3;
	    }
	
	    _createClass(_class, [{
	        key: 'loadVideos',
	        value: function loadVideos(request) {
	            if (request !== '') {
	                this.request = request;
	            }
	            var count = 1;
	            var xhr = new XMLHttpRequest();
	            var mainURL = 'https://www.googleapis.com/youtube/v3/search?pageToken=' + this.nextpage + '&part=snippet&maxResults=' + this.resultsPerPage + '&q=' + this.request + '&key=AIzaSyBvXYBGOR9urz4Sa4coGtCqCMmGmPux7a8';
	            var videos = void 0;
	
	            xhr.open('GET', mainURL, true);
	            xhr.send();
	            var that = this;
	            xhr.onload = function () {
	                that.nextpage = JSON.parse(this.responseText).nextPageToken;
	                videos = JSON.parse(this.responseText)['items'];
	                videos.forEach(function (element, i) {
	                    var statURL = 'https://www.googleapis.com/youtube/v3/videos?part=statistics&id=' + element.id.videoId + '&key=AIzaSyBvXYBGOR9urz4Sa4coGtCqCMmGmPux7a8';
	                    var statisticXHR = new XMLHttpRequest();
	                    statisticXHR.open('GET', statURL, true);
	                    statisticXHR.send();
	                    var video = new _VideoItem2.default(element);
	                    (function (video, i) {
	                        statisticXHR.onload = function () {
	                            var statistic = JSON.parse(this.responseText)['items'];
	                            video.views = statistic[0].statistics.viewCount;
	                            (0, _AppendVideoToDOM2.default)(video);
	                        };
	                    })(video, i);
	                });
	            };
	        }
	    }]);

	    return _class;
	}();

	exports.default = _class;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	exports.jquery = jquery;
	function jquery(element) {
	    return new CustomJQuery(element);
	}
	
	function CustomJQuery(element) {
	    this.query = document.querySelectorAll(element);
	}
	
	CustomJQuery.prototype.addClass = function (argument) {
	    var isArgumentFunction = argument instanceof Function;
	    for (var i = 0; i < this.query.length; i++) {
	        var class_name = isArgumentFunction ? argument(i, this.query[i].className) : argument;
	        this.query[i].classList.add(class_name);
	    }
	    return this;
	};
	CustomJQuery.prototype.removeClass = function (argument) {
	    var isArgumentFunction = argument instanceof Function;
	    for (var i = 0; i < this.query.length; i++) {
	        var class_name = isArgumentFunction ? argument(i, this.query[i].className) : argument;
	        this.query[i].classList.remove(class_name);
	    }
	    return this;
	};
	
	CustomJQuery.prototype.append = function (argument) {
	    for (var i = 0; i < this.query.length; i++) {
	        if (typeof argument === 'string') {
	            this.query[i].innerHTML += argument;
	        } else {
	            this.query[i].appendChild(argument.cloneNode(true));
	        }
	    }
	    return this;
	};
	
	CustomJQuery.prototype.html = function (argument) {
	    if (arguments.length == 0) {
	        return this.query[0].innerHTML;
	    } else {
	        for (var i = 0; i < this.query.length; i++) {
	            this.query[i].innerHTML += argument;
	        }
	    }
	    return this;
	};
	
	CustomJQuery.prototype.attr = function (attributeName, value) {
	    if (value == undefined) {
	        return this.query[0].getAttribute(attributeName);
	    }
	    for (var i = 0; i < this.query.length; i++) {
	        this.query[i].setAttribute(attributeName, value);
	    }
	    return this;
	};
	
	CustomJQuery.prototype.children = function (argument) {
	    return this.query[0].querySelectorAll(argument);
	};
	
	CustomJQuery.prototype.css = function (key, value) {
	    if (typeof value == 'undefined') {
	        return this.query[0].style[key];
	    }
	    for (var i = 0; i < this.query.length; i++) {
	        this.query[i].style.cssText += key + ': ' + value;
	    }
	    return this;
	};
	
	CustomJQuery.prototype.data = function (key, value) {
	    for (var i = 0; i < this.query.length; i++) {
	        if (arguments.length == 0) {
	            return this.query[i].dataset;
	        }
	        if ((typeof key === 'undefined' ? 'undefined' : _typeof(key)) === 'object') {
	            for (var k in key) {
	                var v = key[k];
	                this.query[i].dataset[k] = v;
	            }
	            continue;
	        }
	        if (value === undefined) {
	            return this.query[i].dataset[key];
	        } else {
	            this.query[i].dataset[key] = value;
	        }
	    }
	    return this;
	};
	
	CustomJQuery.prototype.on = function (eventName, selector, eventHandler) {
	    if (arguments.length == 2) {
	        this.query[0].addEventListener(eventName, selector);
	    } else {
	        this.query[0].addEventListener(eventName, function (e) {
	            if (e.target.className == document.querySelector(selector).className) {
	                eventHandler();
	            }
	        });
	    }
	    return this;
	};
	
	CustomJQuery.prototype.one = function (events, handler) {
	    for (var i = 0; i < this.query.length; i++) {
	        this.query[i].addEventListener(events, function (event) {
	            event.target.removeEventListener(event.type, arguments.callee);
	            return handler(event);
	        });
	    }
	};
	
	CustomJQuery.prototype.each = function (f) {
	    for (var i = 0; i < this.query.length; i++) {
	        var node = this.query[i];
	        var res = f.call(node, i, node);
	        if (res === false) {
	            break;
	        }
	    }
	    return this;
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var _class = function _class(element) {
	    _classCallCheck(this, _class);
	
	    this.imgUrl = element.snippet.thumbnails.medium.url;
	    this.songUrl = 'https://www.youtube.com/watch?v=' + element.id.videoId;
	    this.songTitle = element.snippet.title;
	    this.channelTitle = element.snippet.channelTitle;
	    this.views = 0;
	    this.publishedAt = element.snippet.publishedAt.substring(0, 10);
	    this.description = element.snippet.description;
	};
	
	exports.default = _class;
	;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (video) {
	  var savedLeft = (0, _custom_jquery.jquery)('#videoContainerUl').css('left');
	  var str = '<li><div class="videoCard"><img src="' + video.imgUrl + '" class="videoCover"><a href = " ' + video.songUrl + '" target="_blank"><div class="infoDiv"><div class = "titleAndChanel"><h3>' + video.songTitle + '</h3><h4>' + video.channelTitle + '</h4></div><div class="views"><h4 >VIEWS</h4><h3>' + video.views + '</h3></div></div> </a><p class="publishDay">' + 'Published Day: ' + video.publishedAt + '</p><p class="description">' + video.description + '</p></div></li>';
	  (0, _custom_jquery.jquery)('#videoContainerUl').append(str);
	  var currentWidth = (0, _custom_jquery.jquery)('#videoContainerUl').css('width');
	  currentWidth = +currentWidth.slice(0, currentWidth.length - 2);
	  var childrenCount = (0, _custom_jquery.jquery)('#videoContainerUl').children('li').length;
	  var newWidth = currentWidth + 500 * childrenCount + 'px';
	  (0, _custom_jquery.jquery)('#videoContainerUl').css('width', newWidth);
	  (0, _custom_jquery.jquery)('#videoContainerUl').css('left', savedLeft + '');
	};
	
	var _custom_jquery = __webpack_require__(2);

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _custom_jquery = __webpack_require__(2);
	
	var _OnTouchAction = __webpack_require__(6);
	
	var _OnTouchAction2 = _interopRequireDefault(_OnTouchAction);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var _class = function () {
	    function _class(loader) {
	        _classCallCheck(this, _class);
	
	        this.loader = loader;
	        this.curindex = 0;
	        this.liscount = 0;
	        this.ulLeft = 0;
	        this.videoContainerUl = document.getElementById('videoContainerUl');
	        this.gallerywidth = document.getElementById('videoContainer').offsetWidth;
	    }
	
	    _createClass(_class, [{
	        key: 'init',
	        value: function init() {
	            var _this = this;
	
	            var applyAction = new _OnTouchAction2.default(videoContainerUl, function (evt, dir, phase, swipetype, distance) {
	                _this.liscount = (0, _custom_jquery.jquery)('#videoContainerUl').children('li').length;
	                switch (phase) {
	                    case 'start':
	                        _this.ulLeft = parseInt(_this.videoContainerUl.style.left) || 0;
	                        break;
	                    case 'move':
	                        var totaldist = distance + _this.ulLeft;
	                        _this.videoContainerUl.style.left = Math.min(totaldist, (_this.curindex + 1) * _this.gallerywidth) + 'px';
	                        break;
	                    case 'end':
	                        _this.curindex = swipetype == 'left' ? Math.min(_this.curindex + 1, _this.liscount - 1) : Math.max(_this.curindex - 1, 0);
	                        _this.videoContainerUl.style.left = -_this.curindex * _this.gallerywidth + 'px';
	                        break;
	                }
	            }, this.loader);
	            applyAction.applyToTouchSurface(this);
	        }
	    }]);

	    return _class;
	}();

	exports.default = _class;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _NavigationControll = __webpack_require__(7);
	
	var _NavigationControll2 = _interopRequireDefault(_NavigationControll);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var _class = function () {
	    function _class(targetElement, callback, loader) {
	        _classCallCheck(this, _class);
	
	        this.targetElement = targetElement;
	        this.handletouch = callback;
	        this.loader = loader;
	        this.dirrection = 'none';
	        this.swipeType = 'none';
	        this.startX;
	        this.startY;
	        this.distX;
	        this.distY;
	        this.threshold = 150;
	        this.elapsedTime;
	        this.startTime;
	        this.mouseisdown = false;
	        this.detecttouch = !!('ontouchstart' in window) || !!('ontouchstart' in document.documentElement) || !!window.ontouchstart || !!window.Touch || !!window.onmsgesturechange || window.DocumentTouch && window.document instanceof window.DocumentTouch;
	    }
	
	    _createClass(_class, [{
	        key: 'applyToTouchSurface',
	        value: function applyToTouchSurface(touch) {
	            var _this = this;
	
	            this.targetElement.addEventListener('mousedown', function (event) {
	                _this.startX = event.pageX;
	                _this.startY = event.pageY;
	                _this.startTime = new Date().getTime();
	                _this.handletouch(event, _this.dirrection, 'start', _this.swipeType, 0);
	                _this.mouseisdown = true;
	            });
	
	            this.targetElement.addEventListener('mousemove', function (event) {
	                if (_this.mouseisdown) {
	                    _this.distX = event.pageX - _this.startX;
	                    _this.distY = event.pageY - _this.startY;
	                    if (Math.abs(_this.distX) > Math.abs(_this.distY)) {
	                        _this.dirrection = _this.distX < 0 ? 'left' : 'right';
	                        _this.handletouch(event, _this.dirrection, 'move', _this.swipeType, _this.distX);
	                    }
	                    event.preventDefault();
	                }
	            });
	
	            this.targetElement.addEventListener('mouseup', function (event) {
	                if (_this.mouseisdown) {
	                    _this.elapsedTime = new Date().getTime() - _this.startTime;
	                    if (Math.abs(_this.distX) >= _this.threshold) {
	                        _this.swipeType = _this.dirrection;
	                    }
	                    _this.handletouch(event, _this.dirrection, 'end', _this.swipeType, _this.distX);
	                    _this.mouseisdown = false;
	                    event.preventDefault();
	                }
	
	                if (_this.loader.nodesPerPage * (touch.curindex + 2) >= touch.liscount) {
	                    _this.loader.loadVideos('');
	                }
	                _NavigationControll2.default.call(touch);
	            });
	
	            this.targetElement.addEventListener('touchstart', function (event) {
	                _this.startX = event.changedTouches[0].pageX;
	                _this.startY = event.changedTouches[0].pageY;
	                _this.startTime = new Date().getTime();
	                _this.handletouch(event, _this.dirrection, 'start', _this.swipeType, 0);
	                event.preventDefault();
	            });
	
	            this.targetElement.addEventListener('touchmove', function (event) {
	                _this.distX = event.changedTouches[0].pageX - _this.startX;
	                _this.distY = event.changedTouches[0].pageY - _this.startY;
	                if (Math.abs(_this.distX) > Math.abs(_this.distY)) {
	                    _this.dirrection = _this.distX < 0 ? 'left' : 'right';
	                    _this.handletouch(event, _this.dirrection, 'move', _this.swipeType, _this.distX);
	                }
	                event.preventDefault();
	            });
	
	            this.targetElement.addEventListener('touchend', function (event) {
	                _this.elapsedTime = new Date().getTime() - _this.startTime;
	                if (Math.abs(_this.distX) >= _this.threshold) {
	                    _this.swipeType = _this.dirrection;
	                }
	                _this.handletouch(event, _this.dirrection, 'end', _this.swipeType, _this.distX);
	                event.preventDefault();
	                if (_this.loader.nodesPerPage * (touch.curindex + 2) >= touch.liscount) {
	                    _this.loader.loadVideos('');
	                }
	                _NavigationControll2.default.call(touch);
	            });
	        }
	    }]);

	    return _class;
	}();

	exports.default = _class;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function () {
	    var amountOfDots = (0, _custom_jquery.jquery)('#navigation').children('p').length;
	    if (amountOfDots == this.curindex) {
	        var newIndex = this.curindex + 1;
	        var str = ' <p class="dot">' + newIndex + '</p>';
	        (0, _custom_jquery.jquery)('#navigation').append(str);
	    }
	    var allSons = document.getElementsByClassName("dot");
	
	    for (var i = 0; i < allSons.length; i++) {
	        allSons[i].classList.remove("active");
	    }
	    allSons[this.curindex].classList.add('active');
	};
	
	var _custom_jquery = __webpack_require__(2);

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map