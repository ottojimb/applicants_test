(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
function getApi(url) {
    'use strict';

    var ajax = new XMLHttpRequest();

    //defined as promise - ES6
    return new Promise(function (res, rej) {
        ajax.onreadystatechange = function () {
            if (ajax.readyState === 4) {
                if (ajax.status === 200) {
                    //resolve the promise
                    res(JSON.parse(ajax.responseText));
                } else {
                    //reject the promise
                    rej(ajax.responseText);
                }
            }
            //else: readyState <> 4 is not functional as promise
        };
        //open the connection. By default it's async (used for multipart forms)
        ajax.open('GET', url);
        ajax.send();
    });
}

exports.getApi = getApi;

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var API_URL = exports.API_URL = 'http://localhost:3000/';

},{}],3:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ajax = require('./ajax');

var ajax = _interopRequireWildcard(_ajax);

var _config = require('./config');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** Class representing a Navigation Bar. */
var NavBar = function () {
    /**
     * Create a NavBar.
     * @param {string} selector - the DOM selector where the navBar will put.
     */
    function NavBar(selector) {
        _classCallCheck(this, NavBar);

        this.activeMenu = false;
        this.activeElement = false;
        this.selector = selector;
        this.getOptions();
        this._globalHelpers();
    }

    /**
     * Hide the active elements in the navBar
     */


    _createClass(NavBar, [{
        key: 'hideActives',
        value: function hideActives() {
            if (this.activeElement) {
                var nodes = document.querySelectorAll(this.selector + ' ul li.active');
                for (var i = 0; i < nodes.length; i++) {
                    nodes[i].classList.remove('active');
                }
                this.activeElement = false;
            }
        }

        /**
         * Private function for initialize the DOM event listeners
         */

    }, {
        key: '_globalHelpers',
        value: function _globalHelpers() {
            var _this = this;

            document.addEventListener('click', function (element) {
                _this.hideActives();
            });

            var menu = document.querySelector(this.selector);
            var hamburger = document.getElementById('hamburger');
            var img = document.querySelector('#hamburger img');

            hamburger.addEventListener('click', function (element) {
                if (_this.activeMenu) {
                    _this.activeMenu = false;
                    img.src = 'public/images/toggle-open.svg';
                    menu.classList.remove('active');
                } else {
                    _this.activeMenu = true;
                    img.src = 'public/images/toggle-close.svg';
                    menu.classList.add('active');
                }
            });
        }

        /**
         * Set the 'active'' css class to the li element given
         * @param {HTMLLIElement} selector - the DOM selector where the navBar will put. 
         */

    }, {
        key: 'showChild',
        value: function showChild(element) {
            element.classList.add('active');
        }

        /**
         * Recursive method for node scan at the JSON response
         * @param {array} items - the array item from json object
         */

    }, {
        key: 'nodeScan',
        value: function nodeScan(items) {
            var _this2 = this;

            var ul = document.createElement('ul');
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                var _loop = function _loop() {
                    var item = _step.value;

                    //list element
                    var li = document.createElement('li');

                    //link creation (a href)
                    var link = document.createElement('a');
                    link.setAttribute('href', item.url);

                    //span for text list
                    var span = document.createElement('span');
                    span.innerHTML = item.label;

                    //add span to link (a href)
                    link.appendChild(span);

                    //add span to li
                    li.appendChild(link);

                    if (item.items !== undefined && item.items.length) {
                        li.appendChild(_this2.nodeScan(item.items, false));
                        link.addEventListener('click', function (event) {
                            _this2.hideActives();
                            _this2.showChild(li);
                            _this2.activeElement = true;
                            var liElements = li.getElementsByTagName('li');
                            event.stopPropagation();
                        });
                    }

                    //add list to ul :)
                    ul.appendChild(li);
                };

                for (var _iterator = items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    _loop();
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return ul;
        }

        /**
         * Render the data give as parameter
         * @param {array} data - the array item from json object
         */

    }, {
        key: 'render',
        value: function render() {
            var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

            if (data !== undefined && data.items.length) {
                var root = document.querySelector(this.selector);
                var domElements = this.nodeScan(data.items);
                root.appendChild(domElements);
            }
        }

        /**
         * Method that load the initial data from 'api/nav.json'
         */

    }, {
        key: 'getOptions',
        value: function getOptions() {
            var _this3 = this;

            ajax.getApi(_config.API_URL + 'api/nav.json').then(function (data) {
                _this3.render(data);
            }).catch(function (error) {
                console.error(error);
            });
        }
    }]);

    return NavBar;
}();

/**
 * Function where the app start
 */


function main() {
    //put navbar into #navBar selector
    var navBar = new NavBar('#navBar');
}

//wait until the DOM is loaded, otherwise the container div couldn't exist
document.addEventListener('DOMContentLoaded', main());

},{"./ajax":1,"./config":2}]},{},[3,2,1]);
