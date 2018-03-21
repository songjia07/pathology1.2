var OpenSeadragon = OpenSeadragon || {}; OpenSeadragon["Viewer"] = OpenSeadragon["Viewer"] || {}; OpenSeadragon["Viewer"]["prototype"] = OpenSeadragon["Viewer"]["prototype"] || {}; OpenSeadragon["Viewer"]["prototype"]["annotations"] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 25);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/* no static exports found */
/* all exports used */
/*!****************************!*\
  !*** ./src/store/Store.js ***!
  \****************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.erase = exports.Point = exports.circle = exports.shapesFactory = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _OpenSeadragon = __webpack_require__(/*! OpenSeadragon */ 3);

var _OpenSeadragon2 = _interopRequireDefault(_OpenSeadragon);

var _Dispatcher = __webpack_require__(/*! ../dispatcher/Dispatcher */ 1);

var _Dispatcher2 = _interopRequireDefault(_Dispatcher);

var _preact = __webpack_require__(/*! preact */ 2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var shapesFactory = {
	getPath: function getPath(x, y, color) {
		return ["path", {
			fill: 'none',
			d: 'M' + x + ' ' + y + ' z',
			stroke: color,
			'stroke-width': 2,
			'stroke-linejoin': 'round',
			'stroke-linecap': 'round',
			'vector-effect': 'non-scaling-stroke'
		}];
	},
	getCircle: function getCircle(x, y, rx, ry, color) {
		return ["ellipse", {
			fill: color,
			cx: x,
			cy: y,
			rx: rx,
			ry: ry,
			stroke: color,
			'stroke-width': 2,
			'stroke-linejoin': 'round',
			'stroke-linecap': 'round',
			'vector-effect': 'non-scaling-stroke'
		}];
	},
	getAnnoDiv: function getAnnoDiv(anno) {
		return ["text", {
			x: anno.maxX,
			y: anno.maxY,
			"font-size": "2px"
		}, [(0, _preact.h)("tspan", { dx: "0px", dy: "0px", "font-weight": 700 }, anno.Title), (0, _preact.h)("tspan", { dx: "0px", dy: "1px" }, anno.Content), (0, _preact.h)("tspan", { dx: "0px", dy: "30px" }, anno.TumorTypesDes.join(";")), (0, _preact.h)("tspan", { dx: "0px", dy: "45px", fill: "green" }, "关闭")]];
	}
};

//Point对象
var Point = function Point(x, y) {
	this.x = x;
	this.y = y;
};

var AnnotationData = function AnnotationData(type, id, username) {
	this.shapeType = type;
	this.id = id;
	this.color = '#F4FA58';
	this.coordinates = [];
	this.partOfGroup = 'None';
	this.tumorTypes = [];
	this.tumorTypesDes = [];
	this.title = '';
	this.content = '';

	this.createdBy = username;
	this.lastModifiedBy = username;
	this.editable = true;
	this.changed = false;
	this.minX = 100;
	this.minY = 100;
	this.maxX = 0;
	this.maxY = 0;

	this.initialized = false;
};

var Circle = function Circle(radius, color) {
	this.center = new Point(0, 0);
	this.radius = radius;
	this.color = color;
	this.radiusNormalizeX = 0;
	this.radiusNormalizeY = 0;
	this.visibility = true;
	this.updateNormalizeRadius = function (rectWidth, rectHeight) {
		this.radiusNormalizeX = (this.radius - 1) / rectWidth * 100;
		this.radiusNormalizeY = (this.radius - 1) / rectHeight * 100;
	};
	this.updatecenter = function (x, y) {
		this.center.x = x;
		this.center.y = y;
		var deltaX = this.radiusNormalizeX / (this.radius - 1) * 5;
		var deltaY = this.radiusNormalizeY / (this.radius - 1) * 5;
		this.visibility = x > deltaX && x < 100 - deltaX && y > deltaY && y < 100 - deltaY;
	};
};

var circle = new Circle(30, 'blue');

var erase = new Circle(15, 'green');

var data = {
	mode: 'MOVE',
	edittype: 'NUDGETOOL',
	width: 0,
	height: 0,
	activityInProgress: false,
	annotations: [], //path for rendering
	annotationsData: [], //points for calculating

	currentUserName: '',
	savehandler: function savehandler() {},
	mouseuphandler: function mouseuphandler() {},
	showAnnoInfo: function showAnnoInfo(bShow, anno) {},

	selectedIndex: -1
};

var AppStore = function (_OpenSeadragon$EventS) {
	_inherits(AppStore, _OpenSeadragon$EventS);

	function AppStore() {
		_classCallCheck(this, AppStore);

		return _possibleConstructorReturn(this, (AppStore.__proto__ || Object.getPrototypeOf(AppStore)).apply(this, arguments));
	}

	_createClass(AppStore, [{
		key: 'getAll',
		value: function getAll() {
			if (this.notInMoveMode() && data.selectedIndex != -1) {
				this.changeSelectedIndex(-1);
			}

			if (data.selectedIndex != -1) {
				//show infowindow
				data.showAnnoInfo(true, data.annotationsData[data.selectedIndex]);
				//var an = [shapesFactory.getAnnoDiv(data.annotationsData[data.selectedIndex])];
				//return data.annotations.concat(an);
			} else {
				//hide infowindow
				data.showAnnoInfo(false);
			}

			if (data.mode == 'EDIT' && data.activityInProgress) {
				var c = data.edittype == 'NUDGETOOL' ? circle : erase;
				if (c.visibility) {
					var circleShape = [shapesFactory.getCircle(c.center.x, c.center.y, c.radiusNormalizeX, c.radiusNormalizeY, c.color)];
					var allShapes = data.annotations.concat(circleShape);
					return allShapes;
				}
			}
			return data.annotations;
		}
	}, {
		key: 'getAnnotationsData',
		value: function getAnnotationsData() {
			return data.annotationsData;
		}
	}, {
		key: 'getSelectedIndex',
		value: function getSelectedIndex() {
			return data.selectedIndex;
		}
	}, {
		key: 'changeSelectedIndex',
		value: function changeSelectedIndex(newIndex) {
			if (data.selectedIndex != -1) {
				data.annotations[data.selectedIndex][1]['fill'] = 'none';
			}

			if (newIndex != -1) {
				data.annotations[newIndex][1]['fill'] = 'rgb(51,76,107)';
				data.annotations[newIndex][1]['fill-opacity'] = 0.2;
			}

			data.selectedIndex = newIndex;
		}
	}, {
		key: 'deleteSelectedIndex',
		value: function deleteSelectedIndex() {
			data.selectedIndex = -1;
		}
	}, {
		key: 'updateShapeRange',
		value: function updateShapeRange(anno) {
			anno.minX = anno.coordinates[0].x;
			anno.maxX = anno.coordinates[0].x;
			anno.minY = anno.coordinates[0].y;
			anno.maxY = anno.coordinates[0].y;
			for (var j = 1; j < anno.coordinates.length; ++j) {
				anno.minX = Math.min(anno.minX, anno.coordinates[j].x);
				anno.maxX = Math.max(anno.maxX, anno.coordinates[j].x);
				anno.minY = Math.min(anno.minY, anno.coordinates[j].y);
				anno.maxY = Math.max(anno.maxY, anno.coordinates[j].y);
			}
		}
	}, {
		key: 'setAnnotations',
		value: function setAnnotations(annotationsPoints, username) {
			var annotations = [];
			for (var i = 0; i < annotationsPoints.length; ++i) {
				var points = annotationsPoints[i]['coordinates'];
				var annotationColor = annotationsPoints[i]['lastModifiedBy'] == username ? 'red' : 'green';
				var annotation = shapesFactory.getPath(points[0].x, points[0].y, annotationColor);
				var d = 'M' + points[0].x + ' ' + points[0].y + ' ';
				for (var j = 1; j < points.length; ++j) {
					d += 'L' + points[j].x + ' ' + points[j].y + ' ';
				}

				d += 'z';
				annotation[1].d = d;
				annotations.push(annotation);
				console.log('setAnnotations:index = ' + i + '  pointsnum = ' + points.length / 2);
				this.updateShapeRange(annotationsPoints[i]);
			}
			data.annotations = annotations;
			data.annotationsData = annotationsPoints;
			data.currentUserName = username;
			console.log('setAnnotations:number = ' + data.annotations.length);
		}
		// multiplying the original width in pixels by the current
		// zoom level gives us the image width in pixels at the moment

	}, {
		key: 'getWidth',
		value: function getWidth() {
			return data.width;
		}

		// idem for the heigth

	}, {
		key: 'getHeight',
		value: function getHeight() {
			return data.height;
		}
	}, {
		key: 'getLast',
		value: function getLast() {
			return data.annotationsData[data.annotationsData.length - 1];
		}
	}, {
		key: 'getMode',
		value: function getMode() {
			return data.mode;
		}
	}, {
		key: 'inMoveMode',
		value: function inMoveMode() {
			return this.getMode() === 'MOVE';
		}
	}, {
		key: 'notInMoveMode',
		value: function notInMoveMode() {
			return !this.inMoveMode();
		}
	}, {
		key: 'isActivityInProgress',
		value: function isActivityInProgress() {
			return data.activityInProgress;
		}
	}]);

	return AppStore;
}(_OpenSeadragon2.default.EventSource);

var Store = new AppStore();

_Dispatcher2.default.register(function (action) {
	switch (action.type) {
		case 'MODE_UPDATE':
			data.mode = action.mode;
			break;

		case 'ACTIVITY_UPDATE':
			data.activityInProgress = action.inProgress;
			if ('popup' in action && action.popup) {
				data.mouseuphandler();
			}
			break;

		case 'ANNOTATIONS_CREATE':
			var annotationData = new AnnotationData('Polygon', -1, data.currentUserName);
			annotationData.coordinates.push(new Point(action.annotation[0], action.annotation[1]));
			data.annotationsData.push(annotationData);
			data.annotations.push(shapesFactory.getPath(action.annotation[0], action.annotation[1], 'red'));
			break;

		case 'ANNOTATIONS_UPDATE_LAST':
			var d = data.annotations[data.annotations.length - 1][1].d;
			var indexZ = d.lastIndexOf('z'); //sj modify
			var lastD = d.slice(0, indexZ - 1); //sj modify
			Store.getLast().coordinates.push(new Point(action.update[0], action.update[1]));
			data.annotations[data.annotations.length - 1][1].d = lastD + ' L' + action.update[0] + ' ' + action.update[1] + ' z';
			break;
		case 'ANNOTATIONS_UPDATE':
			data.edittype = action.edittype;
			var points = data.annotationsData[action.index].coordinates;
			if (points.length > 0) {
				var d = 'M' + points[0].x + ' ' + points[0].y + ' ';
				for (var j = 1; j < points.length; ++j) {
					d += 'L' + points[j].x + ' ' + points[j].y + ' ';
				}

				d += 'z';
				data.annotations[action.index][1].d = d;
				data.annotationsData[action.index].changed = true;
			} else {
				data.savehandler([data.annotationsData[action.index]], 'delete');
				data.annotationsData.splice(action.index, 1);
				data.annotations.splice(action.index, 1);
			}
			break;
		case 'ANNOTATIONS_RESET':
			Store.setAnnotations(action.annotations, action.username);
			data.savehandler = action.savehandler;
			data.mouseuphandler = action.mouseuphandler;
			data.showAnnoInfo = action.showAnnoInfo;
			break;

		case 'ZOOM_UPDATE':
			var svg = document.getElementsByTagName('svg');
			if (svg.length > 0) {
				var rect = svg[0].getBoundingClientRect();
				data.width = rect.width;
				data.height = rect.height;
				circle.updateNormalizeRadius(Store.getWidth(), Store.getHeight());
				erase.updateNormalizeRadius(Store.getWidth(), Store.getHeight());
			}
			break;

		case 'INITIALIZE':
			(0, _OpenSeadragon.extend)(data, action.options);
			break;
		case 'EDITRADIUS_UPDATE':
			var newRadius = circle.radius + action.delta;
			newRadius = Math.max(Math.min(newRadius, 100), 5);
			circle.radius = newRadius;
			circle.updateNormalizeRadius(data.width, data.height);
			break;
		case 'EDITTYPE_UPDATE':
			data.edittype = action.edittype;
			break;
		case 'ANNOTATIONS_SAVE':
			var a = data.annotationsData[data.annotationsData.length - 1];
			a.tumorTypes = action.aType;
			a.title = action.aTitle;
			a.content = action.aContent;
			a.tumorTypesDes = action.aTypeDes;
			a.initialized = true;
			Store.updateShapeRange(a);
			data.savehandler([a], 'add');
			return;
			break;
		case 'SELECTED_CHANGE':
			Store.changeSelectedIndex(action.index);
			break;
		case 'ANNOTATIONS_DELETE_SELECTED':
			if (Store.getSelectedIndex() != -1) {
				data.savehandler([data.annotationsData[data.selectedIndex]], 'delete');
				data.annotationsData.splice(data.selectedIndex, 1);
				data.annotations.splice(data.selectedIndex, 1);
				Store.deleteSelectedIndex();
			}
			break;
		case 'ANNOTATIONS_DELETE_LAST':
			data.annotationsData.splice(data.annotationsData.length - 1, 1);
			data.annotations.splice(data.annotations.length - 1, 1);
			break;
		case 'UPDATE_ALLCHANGED_ANNOTATIONS':
			var changedAnnotations = [];
			for (var i in data.annotationsData) {
				if (data.annotationsData[i].changed) {
					changedAnnotations.push(data.annotationsData[i]);
					data.annotationsData[i].changed = false;
					data.annotationsData[i].lastModifiedBy = data.currentUserName;
					Store.updateShapeRange(data.annotationsData[i]);
					data.annotations[i][1].stroke = 'red';
				}
			}
			if (changedAnnotations.length > 0) data.savehandler(changedAnnotations, 'edit');
			break;
		case "UPDATE_LASTANNO_ID":
			data.annotationsData[data.annotationsData.length - 1].id = action.id;
			break;
		default:
			break;
	}
	Store.raiseEvent('CHANGE_EVENT');
});

exports.default = Store;
exports.shapesFactory = shapesFactory;
exports.circle = circle;
exports.Point = Point;
exports.erase = erase;

/***/ }),
/* 1 */
/* no static exports found */
/* all exports used */
/*!**************************************!*\
  !*** ./src/dispatcher/Dispatcher.js ***!
  \**************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _flux = __webpack_require__(/*! flux */ 28);

var Dispatcher = new _flux.Dispatcher();

exports.default = Dispatcher;

/***/ }),
/* 2 */
/* no static exports found */
/* all exports used */
/*!*********************************!*\
  !*** ./~/preact/dist/preact.js ***!
  \*********************************/
/***/ (function(module, exports, __webpack_require__) {

!function(global, factory) {
     true ? factory(exports) : 'function' == typeof define && define.amd ? define([ 'exports' ], factory) : factory(global.preact = global.preact || {});
}(this, function(exports) {
    function VNode(nodeName, attributes, children) {
        this.nodeName = nodeName;
        this.attributes = attributes;
        this.children = children;
        this.key = attributes && attributes.key;
    }
    function extend(obj, props) {
        if (props) for (var i in props) if (void 0 !== props[i]) obj[i] = props[i];
        return obj;
    }
    function clone(obj) {
        return extend({}, obj);
    }
    function delve(obj, key) {
        for (var p = key.split('.'), i = 0; i < p.length && obj; i++) obj = obj[p[i]];
        return obj;
    }
    function toArray(obj, offset) {
        return [].slice.call(obj, offset);
    }
    function isFunction(obj) {
        return 'function' == typeof obj;
    }
    function isString(obj) {
        return 'string' == typeof obj;
    }
    function empty(x) {
        return void 0 === x || null === x;
    }
    function falsey(value) {
        return value === !1 || empty(value);
    }
    function hashToClassName(c) {
        var str = '';
        for (var prop in c) if (c[prop]) {
            if (str) str += ' ';
            str += prop;
        }
        return str;
    }
    function h(nodeName, attributes, firstChild) {
        var children, arr, lastSimple, len = arguments.length;
        if (len > 2) {
            var type = typeof firstChild;
            if (3 === len && 'object' !== type && 'function' !== type) {
                if (!falsey(firstChild)) children = [ String(firstChild) ];
            } else {
                children = [];
                for (var i = 2; i < len; i++) {
                    var _p = arguments[i];
                    if (!falsey(_p)) {
                        if (_p.join) arr = _p; else (arr = SHARED_TEMP_ARRAY)[0] = _p;
                        for (var j = 0; j < arr.length; j++) {
                            var child = arr[j], simple = !(falsey(child) || isFunction(child) || child instanceof VNode);
                            if (simple && !isString(child)) child = String(child);
                            if (simple && lastSimple) children[children.length - 1] += child; else if (!falsey(child)) {
                                children.push(child);
                                lastSimple = simple;
                            }
                        }
                    } else ;
                }
            }
        } else if (attributes && attributes.children) return h(nodeName, attributes, attributes.children);
        if (attributes) {
            if (attributes.children) delete attributes.children;
            if (!isFunction(nodeName)) {
                if ('className' in attributes) {
                    attributes.class = attributes.className;
                    delete attributes.className;
                }
                lastSimple = attributes.class;
                if (lastSimple && !isString(lastSimple)) attributes.class = hashToClassName(lastSimple);
            }
        }
        var p = new VNode(nodeName, attributes || void 0, children);
        if (options.vnode) options.vnode(p);
        return p;
    }
    function cloneElement(vnode, props) {
        return h(vnode.nodeName, extend(clone(vnode.attributes), props), arguments.length > 2 ? toArray(arguments, 2) : vnode.children);
    }
    function createLinkedState(component, key, eventPath) {
        var path = key.split('.'), p0 = path[0];
        return function(e) {
            var _component$setState;
            var v, i, t = e && e.currentTarget || this, s = component.state, obj = s;
            if (isString(eventPath)) {
                v = delve(e, eventPath);
                if (empty(v) && (t = t._component)) v = delve(t, eventPath);
            } else v = t.nodeName ? (t.nodeName + t.type).match(/^input(check|rad)/i) ? t.checked : t.value : e;
            if (isFunction(v)) v = v.call(t);
            if (path.length > 1) {
                for (i = 0; i < path.length - 1; i++) obj = obj[path[i]] || (obj[path[i]] = {});
                obj[path[i]] = v;
                v = s[p0];
            }
            component.setState((_component$setState = {}, _component$setState[p0] = v, _component$setState));
        };
    }
    function enqueueRender(component) {
        if (1 === items.push(component)) (options.debounceRendering || defer)(rerender);
    }
    function rerender() {
        if (items.length) {
            var p, currentItems = items;
            items = itemsOffline;
            itemsOffline = currentItems;
            while (p = currentItems.pop()) if (p._dirty) renderComponent(p);
        }
    }
    function isFunctionalComponent(vnode) {
        var nodeName = vnode && vnode.nodeName;
        return nodeName && isFunction(nodeName) && !(nodeName.prototype && nodeName.prototype.render);
    }
    function buildFunctionalComponent(vnode, context) {
        return vnode.nodeName(getNodeProps(vnode), context || EMPTY);
    }
    function ensureNodeData(node, data) {
        return node[ATTR_KEY] || (node[ATTR_KEY] = data || {});
    }
    function getNodeType(node) {
        if (node instanceof Text) return 3;
        if (node instanceof Element) return 1; else return 0;
    }
    function removeNode(node) {
        var p = node.parentNode;
        if (p) p.removeChild(node);
    }
    function setAccessor(node, name, value, old, isSvg) {
        ensureNodeData(node)[name] = value;
        if ('key' !== name && 'children' !== name && 'innerHTML' !== name) if ('class' === name && !isSvg) node.className = value || ''; else if ('style' === name) {
            if (!value || isString(value) || isString(old)) node.style.cssText = value || '';
            if (value && 'object' == typeof value) {
                if (!isString(old)) for (var i in old) if (!(i in value)) node.style[i] = '';
                for (var i in value) node.style[i] = 'number' == typeof value[i] && !NON_DIMENSION_PROPS[i] ? value[i] + 'px' : value[i];
            }
        } else if ('dangerouslySetInnerHTML' === name) {
            if (value) node.innerHTML = value.__html;
        } else if (name.match(/^on/i)) {
            var l = node._listeners || (node._listeners = {});
            name = toLowerCase(name.substring(2));
            if (value) {
                if (!l[name]) node.addEventListener(name, eventProxy);
            } else if (l[name]) node.removeEventListener(name, eventProxy);
            l[name] = value;
        } else if ('type' !== name && !isSvg && name in node) {
            setProperty(node, name, empty(value) ? '' : value);
            if (falsey(value)) node.removeAttribute(name);
        } else {
            var ns = isSvg && name.match(/^xlink\:?(.+)/);
            if (falsey(value)) if (ns) node.removeAttributeNS('http://www.w3.org/1999/xlink', toLowerCase(ns[1])); else node.removeAttribute(name); else if ('object' != typeof value && !isFunction(value)) if (ns) node.setAttributeNS('http://www.w3.org/1999/xlink', toLowerCase(ns[1]), value); else node.setAttribute(name, value);
        }
    }
    function setProperty(node, name, value) {
        try {
            node[name] = value;
        } catch (e) {}
    }
    function eventProxy(e) {
        return this._listeners[e.type](options.event && options.event(e) || e);
    }
    function getRawNodeAttributes(node) {
        var attrs = {};
        for (var i = node.attributes.length; i--; ) attrs[node.attributes[i].name] = node.attributes[i].value;
        return attrs;
    }
    function isSameNodeType(node, vnode) {
        if (isString(vnode)) return 3 === getNodeType(node);
        if (isString(vnode.nodeName)) return isNamedNode(node, vnode.nodeName);
        if (isFunction(vnode.nodeName)) return node._componentConstructor === vnode.nodeName || isFunctionalComponent(vnode); else ;
    }
    function isNamedNode(node, nodeName) {
        return node.normalizedNodeName === nodeName || toLowerCase(node.nodeName) === toLowerCase(nodeName);
    }
    function getNodeProps(vnode) {
        var defaultProps = vnode.nodeName.defaultProps, props = clone(defaultProps || vnode.attributes);
        if (defaultProps) extend(props, vnode.attributes);
        if (vnode.children) props.children = vnode.children;
        return props;
    }
    function collectNode(node) {
        cleanNode(node);
        var name = toLowerCase(node.nodeName), list = nodes[name];
        if (list) list.push(node); else nodes[name] = [ node ];
    }
    function createNode(nodeName, isSvg) {
        var name = toLowerCase(nodeName), node = nodes[name] && nodes[name].pop() || (isSvg ? document.createElementNS('http://www.w3.org/2000/svg', nodeName) : document.createElement(nodeName));
        ensureNodeData(node);
        node.normalizedNodeName = name;
        return node;
    }
    function cleanNode(node) {
        removeNode(node);
        if (1 === getNodeType(node)) {
            ensureNodeData(node, getRawNodeAttributes(node));
            node._component = node._componentConstructor = null;
        }
    }
    function flushMounts() {
        var c;
        while (c = mounts.pop()) if (c.componentDidMount) c.componentDidMount();
    }
    function diff(dom, vnode, context, mountAll, parent, rootComponent, nextSibling) {
        diffLevel++;
        var ret = idiff(dom, vnode, context, mountAll, rootComponent);
        if (parent && ret.parentNode !== parent) parent.insertBefore(ret, nextSibling || null);
        if (!--diffLevel) flushMounts();
        return ret;
    }
    function idiff(dom, vnode, context, mountAll, rootComponent) {
        var originalAttributes = vnode && vnode.attributes;
        while (isFunctionalComponent(vnode)) vnode = buildFunctionalComponent(vnode, context);
        if (empty(vnode)) {
            vnode = '';
            if (rootComponent) {
                if (dom) {
                    if (8 === dom.nodeType) return dom;
                    collectNode(dom);
                }
                return document.createComment(vnode);
            }
        }
        if (isString(vnode)) {
            if (dom) {
                if (3 === getNodeType(dom) && dom.parentNode) {
                    dom.nodeValue = vnode;
                    return dom;
                }
                collectNode(dom);
            }
            return document.createTextNode(vnode);
        }
        var svgMode, out = dom, nodeName = vnode.nodeName;
        if (isFunction(nodeName)) return buildComponentFromVNode(dom, vnode, context, mountAll);
        if (!isString(nodeName)) nodeName = String(nodeName);
        svgMode = 'svg' === toLowerCase(nodeName);
        if (svgMode) isSvgMode = !0;
        if (!dom) out = createNode(nodeName, isSvgMode); else if (!isNamedNode(dom, nodeName)) {
            out = createNode(nodeName, isSvgMode);
            while (dom.firstChild) out.appendChild(dom.firstChild);
            recollectNodeTree(dom);
        }
        if (vnode.children && 1 === vnode.children.length && 'string' == typeof vnode.children[0] && 1 === out.childNodes.length && out.firstChild instanceof Text) out.firstChild.nodeValue = vnode.children[0]; else if (vnode.children || out.firstChild) innerDiffNode(out, vnode.children, context, mountAll);
        diffAttributes(out, vnode.attributes);
        if (originalAttributes && originalAttributes.ref) (out[ATTR_KEY].ref = originalAttributes.ref)(out);
        if (svgMode) isSvgMode = !1;
        return out;
    }
    function innerDiffNode(dom, vchildren, context, mountAll) {
        var j, c, vchild, child, originalChildren = dom.childNodes, children = [], keyed = {}, keyedLen = 0, min = 0, len = originalChildren.length, childrenLen = 0, vlen = vchildren && vchildren.length;
        if (len) for (var i = 0; i < len; i++) {
            var _child = originalChildren[i], key = vlen ? (c = _child._component) ? c.__key : (c = _child[ATTR_KEY]) ? c.key : null : null;
            if (key || 0 === key) {
                keyedLen++;
                keyed[key] = _child;
            } else children[childrenLen++] = _child;
        }
        if (vlen) for (var i = 0; i < vlen; i++) {
            vchild = vchildren[i];
            child = null;
            if (keyedLen && vchild.attributes) {
                var key = vchild.key;
                if (!empty(key) && key in keyed) {
                    child = keyed[key];
                    keyed[key] = void 0;
                    keyedLen--;
                }
            }
            if (!child && min < childrenLen) for (j = min; j < childrenLen; j++) {
                c = children[j];
                if (c && isSameNodeType(c, vchild)) {
                    child = c;
                    children[j] = void 0;
                    if (j === childrenLen - 1) childrenLen--;
                    if (j === min) min++;
                    break;
                }
            }
            child = idiff(child, vchild, context, mountAll);
            if (child !== originalChildren[i]) dom.insertBefore(child, originalChildren[i] || null);
        }
        if (keyedLen) for (var i in keyed) if (keyed[i]) children[min = childrenLen++] = keyed[i];
        if (min < childrenLen) removeOrphanedChildren(children);
    }
    function removeOrphanedChildren(children, unmountOnly) {
        for (var i = children.length; i--; ) {
            var child = children[i];
            if (child) recollectNodeTree(child, unmountOnly);
        }
    }
    function recollectNodeTree(node, unmountOnly) {
        var component = node._component;
        if (component) unmountComponent(component, !unmountOnly); else {
            if (node[ATTR_KEY] && node[ATTR_KEY].ref) node[ATTR_KEY].ref(null);
            if (!unmountOnly) collectNode(node);
            if (node.childNodes && node.childNodes.length) removeOrphanedChildren(node.childNodes, unmountOnly);
        }
    }
    function diffAttributes(dom, attrs) {
        var old = dom[ATTR_KEY] || getRawNodeAttributes(dom);
        for (var _name in old) if (!(attrs && _name in attrs)) setAccessor(dom, _name, null, old[_name], isSvgMode);
        if (attrs) for (var _name2 in attrs) if (!(_name2 in old) || attrs[_name2] != old[_name2] || ('value' === _name2 || 'checked' === _name2) && attrs[_name2] != dom[_name2]) setAccessor(dom, _name2, attrs[_name2], old[_name2], isSvgMode);
    }
    function collectComponent(component) {
        var name = component.constructor.name, list = components[name];
        if (list) list.push(component); else components[name] = [ component ];
    }
    function createComponent(Ctor, props, context) {
        var inst = new Ctor(props, context), list = components[Ctor.name];
        inst.props = props;
        inst.context = context;
        if (list) for (var i = list.length; i--; ) if (list[i].constructor === Ctor) {
            inst.nextBase = list[i].nextBase;
            list.splice(i, 1);
            break;
        }
        return inst;
    }
    function triggerComponentRender(component) {
        if (!component._dirty) {
            component._dirty = !0;
            enqueueRender(component);
        }
    }
    function setComponentProps(component, props, opts, context, mountAll) {
        var b = component.base;
        if (!component._disableRendering) {
            component._disableRendering = !0;
            if (component.__ref = props.ref) delete props.ref;
            if (component.__key = props.key) delete props.key;
            if (empty(b) || mountAll) {
                if (component.componentWillMount) component.componentWillMount();
            } else if (component.componentWillReceiveProps) component.componentWillReceiveProps(props, context);
            if (context && context !== component.context) {
                if (!component.prevContext) component.prevContext = component.context;
                component.context = context;
            }
            if (!component.prevProps) component.prevProps = component.props;
            component.props = props;
            component._disableRendering = !1;
            if (0 !== opts) if (1 === opts || options.syncComponentUpdates !== !1 || !b) renderComponent(component, 1, mountAll); else triggerComponentRender(component);
            if (component.__ref) component.__ref(component);
        }
    }
    function renderComponent(component, opts, mountAll) {
        if (!component._disableRendering) {
            var skip, rendered, props = component.props, state = component.state, context = component.context, previousProps = component.prevProps || props, previousState = component.prevState || state, previousContext = component.prevContext || context, isUpdate = component.base, initialBase = isUpdate || component.nextBase, baseParent = initialBase && initialBase.parentNode, initialComponent = initialBase && initialBase._component, initialChildComponent = component._component;
            if (isUpdate) {
                component.props = previousProps;
                component.state = previousState;
                component.context = previousContext;
                if (2 !== opts && component.shouldComponentUpdate && component.shouldComponentUpdate(props, state, context) === !1) skip = !0; else if (component.componentWillUpdate) component.componentWillUpdate(props, state, context);
                component.props = props;
                component.state = state;
                component.context = context;
            }
            component.prevProps = component.prevState = component.prevContext = component.nextBase = null;
            component._dirty = !1;
            if (!skip) {
                if (component.render) rendered = component.render(props, state, context);
                if (component.getChildContext) context = extend(clone(context), component.getChildContext());
                while (isFunctionalComponent(rendered)) rendered = buildFunctionalComponent(rendered, context);
                var toUnmount, base, childComponent = rendered && rendered.nodeName;
                if (isFunction(childComponent) && childComponent.prototype.render) {
                    var inst = initialChildComponent, childProps = getNodeProps(rendered);
                    if (inst && inst.constructor === childComponent) setComponentProps(inst, childProps, 1, context); else {
                        toUnmount = inst;
                        inst = createComponent(childComponent, childProps, context);
                        inst._parentComponent = component;
                        component._component = inst;
                        setComponentProps(inst, childProps, 0, context);
                        renderComponent(inst, 1);
                    }
                    base = inst.base;
                } else {
                    var cbase = initialBase;
                    toUnmount = initialChildComponent;
                    if (toUnmount) cbase = component._component = null;
                    if (initialBase || 1 === opts) {
                        if (cbase) cbase._component = null;
                        base = diff(cbase, rendered, context, mountAll || !isUpdate, baseParent, !0, initialBase && initialBase.nextSibling);
                    }
                }
                if (initialBase && base !== initialBase) if (!toUnmount && initialComponent === component && !initialChildComponent && initialBase.parentNode) {
                    initialBase._component = null;
                    recollectNodeTree(initialBase);
                }
                if (toUnmount) unmountComponent(toUnmount, !0);
                component.base = base;
                if (base) {
                    var componentRef = component, t = component;
                    while (t = t._parentComponent) componentRef = t;
                    base._component = componentRef;
                    base._componentConstructor = componentRef.constructor;
                }
            }
            if (!isUpdate || mountAll) {
                mounts.unshift(component);
                if (!diffLevel) flushMounts();
            } else if (!skip && component.componentDidUpdate) component.componentDidUpdate(previousProps, previousState, previousContext);
            var fn, cb = component._renderCallbacks;
            if (cb) while (fn = cb.pop()) fn.call(component);
            return rendered;
        }
    }
    function buildComponentFromVNode(dom, vnode, context, mountAll) {
        var c = dom && dom._component, oldDom = dom, isDirectOwner = c && dom._componentConstructor === vnode.nodeName, isOwner = isDirectOwner, props = getNodeProps(vnode);
        while (c && !isOwner && (c = c._parentComponent)) isOwner = c.constructor === vnode.nodeName;
        if (isOwner && (!mountAll || c._component)) {
            setComponentProps(c, props, 3, context, mountAll);
            dom = c.base;
        } else {
            if (c && !isDirectOwner) {
                unmountComponent(c, !0);
                dom = oldDom = null;
            }
            c = createComponent(vnode.nodeName, props, context);
            if (dom && !c.nextBase) c.nextBase = dom;
            setComponentProps(c, props, 1, context, mountAll);
            dom = c.base;
            if (oldDom && dom !== oldDom) {
                oldDom._component = null;
                recollectNodeTree(oldDom);
            }
        }
        return dom;
    }
    function unmountComponent(component, remove) {
        var base = component.base;
        component._disableRendering = !0;
        if (component.componentWillUnmount) component.componentWillUnmount();
        component.base = null;
        var inner = component._component;
        if (inner) unmountComponent(inner, remove); else if (base) {
            if (base[ATTR_KEY] && base[ATTR_KEY].ref) base[ATTR_KEY].ref(null);
            component.nextBase = base;
            if (remove) {
                removeNode(base);
                collectComponent(component);
            }
            removeOrphanedChildren(base.childNodes, !remove);
        }
        if (component.__ref) component.__ref(null);
        if (component.componentDidUnmount) component.componentDidUnmount();
    }
    function Component(props, context) {
        this._dirty = !0;
        this._disableRendering = !1;
        this.prevState = this.prevProps = this.prevContext = this.base = this.nextBase = this._parentComponent = this._component = this.__ref = this.__key = this._linkedStates = this._renderCallbacks = null;
        this.context = context;
        this.props = props;
        this.state = this.getInitialState && this.getInitialState() || {};
    }
    function render(vnode, parent, merge) {
        return diff(merge, vnode, {}, !1, parent);
    }
    var lcCache = {};
    var toLowerCase = function(s) {
        return lcCache[s] || (lcCache[s] = s.toLowerCase());
    };
    var resolved = 'undefined' != typeof Promise && Promise.resolve();
    var defer = resolved ? function(f) {
        resolved.then(f);
    } : setTimeout;
    var options = {
        vnode: empty
    };
    var SHARED_TEMP_ARRAY = [];
    var EMPTY = {};
    var ATTR_KEY = 'undefined' != typeof Symbol ? Symbol.for('preactattr') : '__preactattr_';
    var NON_DIMENSION_PROPS = {
        boxFlex: 1,
        boxFlexGroup: 1,
        columnCount: 1,
        fillOpacity: 1,
        flex: 1,
        flexGrow: 1,
        flexPositive: 1,
        flexShrink: 1,
        flexNegative: 1,
        fontWeight: 1,
        lineClamp: 1,
        lineHeight: 1,
        opacity: 1,
        order: 1,
        orphans: 1,
        strokeOpacity: 1,
        widows: 1,
        zIndex: 1,
        zoom: 1
    };
    var items = [];
    var itemsOffline = [];
    var nodes = {};
    var mounts = [];
    var diffLevel = 0;
    var isSvgMode = !1;
    var components = {};
    extend(Component.prototype, {
        linkState: function(key, eventPath) {
            var c = this._linkedStates || (this._linkedStates = {}), cacheKey = key + '|' + eventPath;
            return c[cacheKey] || (c[cacheKey] = createLinkedState(this, key, eventPath));
        },
        setState: function(state, callback) {
            var s = this.state;
            if (!this.prevState) this.prevState = clone(s);
            extend(s, isFunction(state) ? state(s, this.props) : state);
            if (callback) (this._renderCallbacks = this._renderCallbacks || []).push(callback);
            triggerComponentRender(this);
        },
        forceUpdate: function() {
            renderComponent(this, 2);
        },
        render: function() {
            return null;
        }
    });
    exports.h = h;
    exports.cloneElement = cloneElement;
    exports.Component = Component;
    exports.render = render;
    exports.rerender = rerender;
    exports.options = options;
});
//# sourceMappingURL=preact.js.map

/***/ }),
/* 3 */
/* no static exports found */
/* all exports used */
/*!********************************!*\
  !*** external "OpenSeadragon" ***!
  \********************************/
/***/ (function(module, exports) {

module.exports = OpenSeadragon;

/***/ }),
/* 4 */
/* no static exports found */
/* all exports used */
/*!*********************************!*\
  !*** ./src/controls/Control.js ***!
  \*********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _OpenSeadragon = __webpack_require__(/*! OpenSeadragon */ 3);

var _selectMode = __webpack_require__(/*! ../actions/selectMode */ 6);

var _selectMode2 = _interopRequireDefault(_selectMode);

var _Store = __webpack_require__(/*! ../store/Store */ 0);

var _Store2 = _interopRequireDefault(_Store);

var _Dispatcher = __webpack_require__(/*! ../dispatcher/Dispatcher */ 1);

var _Dispatcher2 = _interopRequireDefault(_Dispatcher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Control = function () {
  function Control(options) {
    var _this = this;

    _classCallCheck(this, Control);

    this.mode = options.tooltip.toUpperCase();
    this.btn = new _OpenSeadragon.Button((0, _OpenSeadragon.extend)({
      onClick: this.onClick
    }, options));
    if (_Store2.default.getMode() === this.mode) {
      this.activate();
    }
    _Store2.default.addHandler('CHANGE_EVENT', function () {
      if (_Store2.default.getMode() === _this.mode) {
        _this.activate();
      } else {
        _this.deactivate();
      }
    });
  }

  _createClass(Control, [{
    key: 'activate',
    value: function activate() {
      this.btn.imgDown.style.visibility = 'visible';
    }
  }, {
    key: 'deactivate',
    value: function deactivate() {
      this.btn.imgDown.style.visibility = 'hidden';
    }
  }, {
    key: 'onClick',
    value: function onClick(e) {
      if (e.eventSource.tooltip) {
        (0, _selectMode2.default)(e.eventSource.tooltip.toUpperCase(), _Dispatcher2.default, _Store2.default);
      }
    }
  }]);

  return Control;
}();

exports.default = Control;

/***/ }),
/* 5 */
/* no static exports found */
/* all exports used */
/*!*********************************!*\
  !*** ./src/actions/keypress.js ***!
  \*********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = keyPress;
function keyPress(keyCode, Dispatcher, Store) {
  switch (Store.getMode()) {
    case 'EDIT':

      var deltaValue = keyCode == 45 ? -5 : 5;
      Dispatcher.dispatch({
        type: 'EDITRADIUS_UPDATE',
        delta: deltaValue
      });
      break;

    default:
      break;

  }
}

/***/ }),
/* 6 */
/* no static exports found */
/* all exports used */
/*!***********************************!*\
  !*** ./src/actions/selectMode.js ***!
  \***********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = selectMode;
function selectMode(mode, Dispatcher, Store) {
  Dispatcher.dispatch({
    type: 'ACTIVITY_UPDATE',
    inProgress: false
  });
  if (Store.getMode() !== mode) {
    Dispatcher.dispatch({
      type: 'MODE_UPDATE',
      mode: mode
    });
  }
}

/***/ }),
/* 7 */
/* no static exports found */
/* all exports used */
/*!*****************************!*\
  !*** ./src/utils/vector.js ***!
  \*****************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var VectorInPixel = function VectorInPixel(pointStart, pointEnd, rect) {
	this.x = (pointEnd.x - pointStart.x) / 100 * rect.width;
	this.y = (pointEnd.y - pointStart.y) / 100 * rect.height;
};

VectorInPixel.prototype = {
	getMagnitude: function getMagnitude() {
		return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
	},
	dotProduct: function dotProduct(anotherVector) {
		return this.x * anotherVector.x + this.y * anotherVector.y;
	},
	getAngle: function getAngle(v) {
		return Math.acos(this.dotProduct(v) / (this.getMagnitude() * v.getMagnitude())) * 180 / Math.PI;
	}
};

function pruneAnnotations(annotationVertexs, rect) {

	//1.遍历顶点，找出距离小于2个像素的点或者角度过小的折线
	var vertexIndex = [];
	var lastValidIndex = annotationVertexs.length - 1;
	for (var i = 0; i < annotationVertexs.length; i++) {
		var thisPoint = annotationVertexs[i];
		var lastPoint = annotationVertexs[lastValidIndex];

		var this2last = new VectorInPixel(thisPoint, lastPoint, rect);
		var distance = this2last.getMagnitude();
		if (distance < 2) {
			vertexIndex.push(i);
		} else {
			var nextIndex = i == annotationVertexs.length - 1 ? 0 : i + 1;
			var nextPoint = annotationVertexs[nextIndex];
			var this2Next = new VectorInPixel(thisPoint, nextPoint, rect);
			var angle = this2Next.getAngle(this2last);
			console.log('angle ' + angle);
			if (this2Next.getAngle(this2last) < 10) {
				vertexIndex.push(i);
			} else {
				lastValidIndex = i;
			}
		}
	}
	vertexIndex.sort();
	console.log('delete before ' + annotationVertexs.length);
	//2.删除顶点
	for (var i = vertexIndex.length - 1; i >= 0; --i) {
		annotationVertexs.splice(vertexIndex[i], 1);
	}
	console.log('delete after ' + annotationVertexs.length);
	return vertexIndex.length > 0;
}

exports.VectorInPixel = VectorInPixel;
exports.pruneAnnotations = pruneAnnotations;

/***/ }),
/* 8 */
/* no static exports found */
/* all exports used */
/*!******************************!*\
  !*** ./~/process/browser.js ***!
  \******************************/
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
/* 9 */
/* no static exports found */
/* all exports used */
/*!************************************!*\
  !*** ./src/actions/cleanCanvas.js ***!
  \************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = cleanCanvas;
function cleanCanvas(Dispatcher) {
  Dispatcher.dispatch({
    type: 'ACTIVITY_UPDATE',
    inProgress: false
  });
  Dispatcher.dispatch({
    type: 'ANNOTATIONS_RESET',
    annotations: []
  });
}

/***/ }),
/* 10 */
/* no static exports found */
/* all exports used */
/*!***************************************!*\
  !*** ./src/actions/fillCanvasWith.js ***!
  \***************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = fillCanvasWith;
function fillCanvasWith(annotations, username, savehandler, mouseuphandler, showAnnoInfo, Dispatcher) {
  Dispatcher.dispatch({
    type: 'ACTIVITY_UPDATE',
    inProgress: false
  });
  Dispatcher.dispatch({
    type: 'ANNOTATIONS_RESET',
    annotations: annotations,
    username: username,
    savehandler: savehandler,
    mouseuphandler: mouseuphandler,
    showAnnoInfo: showAnnoInfo
  });
}

/***/ }),
/* 11 */
/* no static exports found */
/* all exports used */
/*!****************************************!*\
  !*** ./src/actions/handleAnotation.js ***!
  \****************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
																								value: true
});
exports.default = HandleAnnotation;
function HandleAnnotation(aObject, Dispatcher) {
																								switch (aObject.type) {
																																																case "addAnnoInfo":
																																																																								Dispatcher.dispatch({
																																																																																																type: 'ANNOTATIONS_SAVE',
																																																																																																aTitle: aObject.title,
																																																																																																aContent: aObject.content,
																																																																																																aType: aObject.types,
																																																																																																aTypeDes: aObject.typesDes
																																																																								});
																																																																								break;
																																																case "deleteCurrentSelected":
																																																																								Dispatcher.dispatch({
																																																																																																type: 'ANNOTATIONS_DELETE_SELECTED' });
																																																																								break;
																																																case "setSelectedIndex":
																																																																								Dispatcher.dispatch({
																																																																																																type: 'SELECTED_CHANGE',
																																																																																																index: aObject.index });
																																																																								break;
																																																case "deleteLastAnno":
																																																																								Dispatcher.dispatch({
																																																																																																type: 'ANNOTATIONS_DELETE_LAST' });
																																																																								break;
																																																case "updateLastAnnoId":
																																																																								Dispatcher.dispatch({
																																																																																																type: 'UPDATE_LASTANNO_ID',
																																																																																																id: aObject.id });
																																																																								break;
																																																default:
																																																																								break;
																								}
}

/***/ }),
/* 12 */
/* no static exports found */
/* all exports used */
/*!***********************************!*\
  !*** ./src/actions/initialize.js ***!
  \***********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = initialize;
function initialize(options, Dispatcher) {
  Dispatcher.dispatch({
    type: 'INITIALIZE',
    options: options
  });
}

/***/ }),
/* 13 */
/* no static exports found */
/* all exports used */
/*!*****************************!*\
  !*** ./src/actions/zoom.js ***!
  \*****************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = zoom;
function zoom(zoomLevel, Dispatcher) {
  Dispatcher.dispatch({
    type: 'ZOOM_UPDATE',
    zoom: zoomLevel
  });
}

/***/ }),
/* 14 */
/* no static exports found */
/* all exports used */
/*!***************************************!*\
  !*** ./src/components/Annotations.js ***!
  \***************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(/*! preact */ 2);

var _Store = __webpack_require__(/*! ../store/Store */ 0);

var _Store2 = _interopRequireDefault(_Store);

var _Dispatcher = __webpack_require__(/*! ../dispatcher/Dispatcher */ 1);

var _Dispatcher2 = _interopRequireDefault(_Dispatcher);

var _leaveCanvas = __webpack_require__(/*! ../actions/leaveCanvas */ 16);

var _leaveCanvas2 = _interopRequireDefault(_leaveCanvas);

var _move = __webpack_require__(/*! ../actions/move */ 17);

var _move2 = _interopRequireDefault(_move);

var _movewithctrl = __webpack_require__(/*! ../actions/movewithctrl */ 18);

var _movewithctrl2 = _interopRequireDefault(_movewithctrl);

var _press = __webpack_require__(/*! ../actions/press */ 19);

var _press2 = _interopRequireDefault(_press);

var _keypress = __webpack_require__(/*! ../actions/keypress */ 5);

var _keypress2 = _interopRequireDefault(_keypress);

var _release = __webpack_require__(/*! ../actions/release */ 20);

var _release2 = _interopRequireDefault(_release);

var _selectAnno = __webpack_require__(/*! ../actions/selectAnno */ 21);

var _selectAnno2 = _interopRequireDefault(_selectAnno);

var _convert = __webpack_require__(/*! ../utils/convert */ 26);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var svgProperties = {
  xmlns: 'http://www.w3.org/2000/svg',
  version: '1.1',
  preserveAspectRatio: 'none',
  viewBox: '0 0 100 100',
  width: '100%',
  height: '100%'
};

// checks if we can use vector-effect="non-scaling-stroke" to
// maintain constant the witdh of the SVG strokes during zoom
function isVectorEffectSupported() {
  return document.documentElement.style.vectorEffect !== undefined;
}

var svgStyles = {
  cursor: 'default',
  // IE 9-10 fix
  'background-color': 'rgba(0,0,0,0)'
};

var createAnnotations = function () {
  var fn = function fn(el) {
    return _preact.h.apply(undefined, _toConsumableArray(el));
  };
  if (!isVectorEffectSupported()) {
    // IE and Edge fix
    fn = function fn(el) {
      var newEl = el;
      newEl[1]['stroke-width'] = _convert.convertWidth.toPercent(3);
      return _preact.h.apply(undefined, _toConsumableArray(newEl));
    };
  }
  return fn;
}();

var Annotations = function (_Component) {
  _inherits(Annotations, _Component);

  function Annotations() {
    _classCallCheck(this, Annotations);

    return _possibleConstructorReturn(this, (Annotations.__proto__ || Object.getPrototypeOf(Annotations)).apply(this, arguments));
  }

  _createClass(Annotations, [{
    key: 'getInitialState',
    value: function getInitialState() {
      return { annotations: _Store2.default.getAll() };
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      _Store2.default.addHandler('CHANGE_EVENT', function () {
        _this2.setState({ annotations: _Store2.default.getAll() });
      });
    }
  }, {
    key: 'handleMouseLeave',
    value: function handleMouseLeave(e) {
      if (_Store2.default.notInMoveMode()) {
        e.stopPropagation();
        (0, _leaveCanvas2.default)(_Dispatcher2.default, _Store2.default);
      }
    }
  }, {
    key: 'handleMouseUp',
    value: function handleMouseUp(e) {
      if (_Store2.default.notInMoveMode()) {
        e.stopPropagation();
        _release2.default.apply(undefined, _toConsumableArray(this.coords(e)).concat([_Dispatcher2.default, _Store2.default]));
      }
    }
  }, {
    key: 'coords',
    value: function coords(e) {
      var rect = this.base.getBoundingClientRect();
      var offsetX = e.clientX - rect.left;
      var offsetY = e.clientY - rect.top;
      var x = 100 * offsetX / rect.width;
      var y = 100 * offsetY / rect.height;
      return [Math.round(x * 10000) / 10000, Math.round(y * 10000) / 10000];
    }
  }, {
    key: 'handleMouseDown',
    value: function handleMouseDown(e) {
      if (_Store2.default.notInMoveMode()) {
        e.stopPropagation();
        _press2.default.apply(undefined, _toConsumableArray(this.coords(e)).concat([_Dispatcher2.default, _Store2.default, e.ctrlKey]));
      }
    }
  }, {
    key: 'handlePointerDown',
    value: function handlePointerDown(e) {
      if (_Store2.default.notInMoveMode()) {
        e.stopPropagation();
        //todo
      }
    }
  }, {
    key: 'handleClick',
    value: function handleClick(e) {
      if (_Store2.default.inMoveMode()) {
        e.stopPropagation();
        _selectAnno2.default.apply(undefined, _toConsumableArray(this.coords(e)).concat([_Dispatcher2.default, _Store2.default]));
      }
    }
  }, {
    key: 'handleMouseMove',
    value: function handleMouseMove(e) {
      if (_Store2.default.notInMoveMode()) {
        e.stopPropagation();
        var rect = this.base.getBoundingClientRect();
        if (e.ctrlKey) {
          _movewithctrl2.default.apply(undefined, _toConsumableArray(this.coords(e)).concat([_Dispatcher2.default, _Store2.default, rect]));
        } else {
          _move2.default.apply(undefined, _toConsumableArray(this.coords(e)).concat([_Dispatcher2.default, _Store2.default, rect]));
        }
      }
    }
  }, {
    key: 'handleKeyPress',
    value: function handleKeyPress(e) {
      if (_Store2.default.notInMoveMode()) {
        e.stopPropagation();
        (0, _keypress2.default)(e, _Dispatcher2.default, _Store2.default);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return (0, _preact.h)('svg', _extends({}, svgProperties, {
        style: svgStyles,
        onMouseDown: this.handleMouseDown.bind(this),
        onPointerDown: this.handlePointerDown.bind(this),
        onMouseLeave: this.handleMouseLeave.bind(this),
        onMouseMove: this.handleMouseMove.bind(this),
        onMouseUp: this.handleMouseUp.bind(this),
        onPointerUp: this.handleMouseUp.bind(this),
        onClick: this.handleClick.bind(this),
        onKeyPress: this.handleKeyPress.bind(this)
      }), this.state.annotations.map(createAnnotations));
    }
  }]);

  return Annotations;
}(_preact.Component);

exports.default = Annotations;

/***/ }),
/* 15 */
/* no static exports found */
/* all exports used */
/*!*******************************!*\
  !*** ./src/controls/index.js ***!
  \*******************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Move = __webpack_require__(/*! ./Move */ 24);

var _Move2 = _interopRequireDefault(_Move);

var _Draw = __webpack_require__(/*! ./Draw */ 22);

var _Draw2 = _interopRequireDefault(_Draw);

var _Edit = __webpack_require__(/*! ./Edit */ 23);

var _Edit2 = _interopRequireDefault(_Edit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [_Move2.default, _Draw2.default, _Edit2.default];

/***/ }),
/* 16 */
/* no static exports found */
/* all exports used */
/*!************************************!*\
  !*** ./src/actions/leaveCanvas.js ***!
  \************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = leaveCanvas;
function leaveCanvas(Dispatcher, Store) {
  switch (Store.getMode()) {

    case 'DRAW':
      Dispatcher.dispatch({
        type: 'ACTIVITY_UPDATE',
        inProgress: false
      });
      break;

    default:
      break;

  }
}

/***/ }),
/* 17 */
/* no static exports found */
/* all exports used */
/*!*****************************!*\
  !*** ./src/actions/move.js ***!
  \*****************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = move;

var _Store = __webpack_require__(/*! ../store/Store */ 0);

var _vector = __webpack_require__(/*! ../utils/vector */ 7);

function getNewPosition(ptOld, circle, rect) {
	var vector = new _vector.VectorInPixel(circle.center, ptOld, rect);
	var aa = circle.radius / vector.getMagnitude() - 1;
	var xOffset = vector.x * aa * 100 / rect.width;
	var yOffset = vector.y * aa * 100 / rect.height;
	return new _Store.Point(ptOld.x + xOffset, ptOld.y + yOffset);
}

function getIntersections(circle, annotationVertexs, rect) {

	//1.遍历顶点，找出相交的顶点
	var vertexIndex = [];
	for (var i = 0; i < annotationVertexs.length; i++) {
		var vectorInPixel = new _vector.VectorInPixel(annotationVertexs[i], circle.center, rect);
		var distance = vectorInPixel.getMagnitude();
		if (distance < circle.radius) {
			vertexIndex.push(i);
		}
	}
	//2.遍历多边形的边，找出与圆相交且最近的点,添加这些点作为顶点
	var insertnum = 0;
	var insertPoints = [];
	var insertIndex = [];
	for (var i = 0; i < annotationVertexs.length; i++) {

		var thisPoint = annotationVertexs[i];
		var nextIndex = i == annotationVertexs.length - 1 ? 0 : i + 1;
		var nextPoint = annotationVertexs[nextIndex];

		var this2Next = new _vector.VectorInPixel(thisPoint, nextPoint, rect);
		var circle2This = new _vector.VectorInPixel(circle.center, thisPoint, rect);
		var circle2Next = new _vector.VectorInPixel(circle.center, nextPoint, rect);
		var dotProduct = circle2This.dotProduct(this2Next) * circle2Next.dotProduct(this2Next);
		if (dotProduct < 0) //边的法向量方向距离最小
			{
				var a = circle2This.getMagnitude();
				var b = circle2Next.getMagnitude();
				var c = this2Next.getMagnitude();
				var x = (Math.pow(c, 2) + Math.pow(b, 2) - Math.pow(a, 2)) / (2 * c);
				var distance = Math.sqrt(Math.pow(b, 2) - Math.pow(x, 2));
				if (distance < circle.radius) {
					if (x >= c - x && c - x < 10) {
						//if(vertexIndex.indexOf(i) == -1)
						//{
						//	vertexIndex.push(i);
						//}
					} else if (x < c - x && x < 10) {
						//if(vertexIndex.indexOf(nextIndex) == -1)
						//{
						//	vertexIndex.push(nextindex);
						//}
					} else {
						var intersectionPoint = new _Store.Point(nextPoint.x - x / c * this2Next.x * 100 / rect.width, nextPoint.y - x / c * this2Next.y * 100 / rect.height);

						insertPoints.push(intersectionPoint);
						insertIndex.push(insertnum + i + 1);
						insertnum++;
					}
				}
			}
	};

	//3.更新顶点
	for (var k in vertexIndex) {
		console.log('vertex old' + vertexIndex[k] + ' x ' + annotationVertexs[vertexIndex[k]].x + ' y ' + annotationVertexs[vertexIndex[k]].y);
		annotationVertexs[vertexIndex[k]] = getNewPosition(annotationVertexs[vertexIndex[k]], circle, rect);
		console.log('vertex changed ' + vertexIndex[k] + ' x ' + annotationVertexs[vertexIndex[k]].x + ' y ' + annotationVertexs[vertexIndex[k]].y);
	}
	//4.更新插入点
	for (var j = 0; j < insertPoints.length; ++j) {
		console.log('insertpoint old' + insertIndex[j] + ' x ' + insertPoints[j].x + ' y ' + insertPoints[j].y);
		var newPoint = getNewPosition(insertPoints[j], circle, rect);
		annotationVertexs.splice(insertIndex[j], 0, newPoint);
		console.log('insertpoint ' + insertIndex[j] + ' x ' + newPoint.x + ' y ' + newPoint.y);
	}

	return vertexIndex.length > 0 || insertPoints.length > 0;
}

function move(x, y, Dispatcher, Store, rect) {
	switch (Store.getMode()) {

		case 'DRAW':
			if (Store.isActivityInProgress()) {
				var last = Store.getLast();
				if (last && last.coordinates.length > 0) {
					//ignoreCase  distance between currentPoint and lastPoint is less than 2 pixels
					var lastPoint = last.coordinates[last.coordinates.length - 1];
					var xOffsetInPixel = (x - lastPoint.x) / 100 * rect.width;
					var yOffsetInPixel = (y - lastPoint.y) / 100 * rect.height;
					var distanceInPixels = Math.sqrt(Math.pow(xOffsetInPixel, 2) + Math.pow(yOffsetInPixel, 2));
					if (distanceInPixels > 2) {
						Dispatcher.dispatch({
							type: 'ANNOTATIONS_UPDATE_LAST',
							update: [x, y]
						});
					}
				}
			}
			break;
		case 'EDIT':
			_Store.circle.updatecenter(x, y);
			_Store.circle.updateNormalizeRadius(rect.width, rect.height);
			_Store.erase.updatecenter(x, y);
			_Store.erase.updateNormalizeRadius(rect.width, rect.height);
			if (Store.isActivityInProgress()) {
				var annotationsData = Store.getAnnotationsData();
				for (var a in annotationsData) {
					if (!annotationsData[a].editable) continue;
					var bUpdate = getIntersections(_Store.circle, annotationsData[a].coordinates, rect);
					if (bUpdate) {

						var bNeedPrune = true;
						while (bNeedPrune) {
							bNeedPrune = (0, _vector.pruneAnnotations)(annotationsData[a].coordinates, rect);
						}
						Dispatcher.dispatch({
							type: 'ANNOTATIONS_UPDATE',
							index: a,
							edittype: 'NUDGETOOL'
						});
						return;
					}
				}
			}
			Dispatcher.dispatch({
				type: 'EDITTYPE_UPDATE',
				edittype: 'NUDGETOOL'
			});
			break;
		default:
			break;

	}
}

/***/ }),
/* 18 */
/* no static exports found */
/* all exports used */
/*!*************************************!*\
  !*** ./src/actions/movewithctrl.js ***!
  \*************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = movewithctrl;

var _Store = __webpack_require__(/*! ../store/Store */ 0);

var _vector = __webpack_require__(/*! ../utils/vector */ 7);

function deleteIntersections(circle, annotationVertexs, rect) {

	//1.遍历顶点，找出相交的顶点
	var vertexIndex = [];
	for (var i = 0; i < annotationVertexs.length; i++) {
		var vectorInPixel = new _vector.VectorInPixel(annotationVertexs[i], circle.center, rect);
		var distance = vectorInPixel.getMagnitude();
		if (distance < circle.radius) {
			vertexIndex.push(i);
		}
	}

	//2.删除顶点
	for (var i = vertexIndex.length - 1; i >= 0; --i) {
		annotationVertexs.splice(vertexIndex[i], 1);
	}
	console.log('delete after ' + annotationVertexs.length);
	return vertexIndex.length > 0;
}

function movewithctrl(x, y, Dispatcher, Store, rect) {
	switch (Store.getMode()) {
		case 'EDIT':
			_Store.circle.updatecenter(x, y);
			_Store.circle.updateNormalizeRadius(rect.width, rect.height);
			_Store.erase.updatecenter(x, y);
			_Store.erase.updateNormalizeRadius(rect.width, rect.height);
			if (Store.isActivityInProgress()) {
				var annotationsData = Store.getAnnotationsData();
				for (var a in annotationsData) {
					if (!annotationsData[a].editable) continue;
					var bUpdate = deleteIntersections(_Store.erase, annotationsData[a].coordinates, rect);
					if (bUpdate) {
						var bNeedPrune = true;
						while (bNeedPrune) {
							bNeedPrune = (0, _vector.pruneAnnotations)(annotationsData[a].coordinates, rect);
						}
						Dispatcher.dispatch({
							type: 'ANNOTATIONS_UPDATE',
							index: a,
							edittype: 'DELETE'
						});
						return;
					}
				}
			}
			Dispatcher.dispatch({
				type: 'EDITTYPE_UPDATE',
				edittype: 'DELETE'
			});
			break;
		default:
			break;

	}
}

/***/ }),
/* 19 */
/* no static exports found */
/* all exports used */
/*!******************************!*\
  !*** ./src/actions/press.js ***!
  \******************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = press;
function press(x, y, Dispatcher, Store, ctrlKey) {
  switch (Store.getMode()) {

    case 'DRAW':
      Dispatcher.dispatch({
        type: 'ACTIVITY_UPDATE',
        inProgress: true
      });
      Dispatcher.dispatch({
        type: 'ANNOTATIONS_CREATE',
        annotation: [x, y]
      });
      break;
    case 'EDIT':
      Dispatcher.dispatch({
        type: 'ACTIVITY_UPDATE',
        inProgress: true
      });

      var typevalue = ctrlKey ? 'DELETE' : 'NUDGETOOL';
      Dispatcher.dispatch({
        type: 'EDITTYPE_UPDATE',
        edittype: typevalue
      });
      break;

    default:
      break;

  }
}

/***/ }),
/* 20 */
/* no static exports found */
/* all exports used */
/*!********************************!*\
  !*** ./src/actions/release.js ***!
  \********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = release;
function release(x, y, Dispatcher, Store) {
  switch (Store.getMode()) {

    case 'DRAW':
      Dispatcher.dispatch({
        type: 'ACTIVITY_UPDATE',
        inProgress: false,
        popup: true
      });

      var mode = 'MOVE';
      Dispatcher.dispatch({
        type: 'MODE_UPDATE',
        mode: mode
      });
      break;
    case 'EDIT':
      Dispatcher.dispatch({
        type: 'ACTIVITY_UPDATE',
        inProgress: false
      });
      Dispatcher.dispatch({
        type: 'UPDATE_ALLCHANGED_ANNOTATIONS'
      });
      break;
    default:
      break;

  }
}

/***/ }),
/* 21 */
/* no static exports found */
/* all exports used */
/*!***********************************!*\
  !*** ./src/actions/selectAnno.js ***!
  \***********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
		value: true
});
exports.default = selectAnno;
function selectAnno(x, y, Dispatcher, Store) {
		switch (Store.getMode()) {
				case 'MOVE':
						var annotationsData = Store.getAnnotationsData();
						for (var a in annotationsData) {
								if ('initialized' in annotationsData[a] && annotationsData[a].initialized == false) {
										continue;
								}
								if (annotationsData[a].minX < x && annotationsData[a].maxX > x && annotationsData[a].minY < y && annotationsData[a].maxY > y) {
										Dispatcher.dispatch({
												type: 'SELECTED_CHANGE',
												index: a
										});
										break;
								}
						}
						break;
				default:
						break;

		}
}

/***/ }),
/* 22 */
/* no static exports found */
/* all exports used */
/*!******************************!*\
  !*** ./src/controls/Draw.js ***!
  \******************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Control2 = __webpack_require__(/*! ./Control */ 4);

var _Control3 = _interopRequireDefault(_Control2);

var _draw_grouphover = __webpack_require__(/*! ../../img/draw_grouphover.png */ 30);

var _draw_grouphover2 = _interopRequireDefault(_draw_grouphover);

var _draw_hover = __webpack_require__(/*! ../../img/draw_hover.png */ 31);

var _draw_hover2 = _interopRequireDefault(_draw_hover);

var _draw_pressed = __webpack_require__(/*! ../../img/draw_pressed.png */ 32);

var _draw_pressed2 = _interopRequireDefault(_draw_pressed);

var _draw_rest = __webpack_require__(/*! ../../img/draw_rest.png */ 33);

var _draw_rest2 = _interopRequireDefault(_draw_rest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Draw = function (_Control) {
  _inherits(Draw, _Control);

  function Draw() {
    _classCallCheck(this, Draw);

    return _possibleConstructorReturn(this, (Draw.__proto__ || Object.getPrototypeOf(Draw)).call(this, {
      tooltip: 'Draw',
      srcRest: _draw_rest2.default,
      srcGroup: _draw_grouphover2.default,
      srcHover: _draw_hover2.default,
      srcDown: _draw_pressed2.default
    }));
  }

  return Draw;
}(_Control3.default);

exports.default = Draw;

/***/ }),
/* 23 */
/* no static exports found */
/* all exports used */
/*!******************************!*\
  !*** ./src/controls/Edit.js ***!
  \******************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Control2 = __webpack_require__(/*! ./Control */ 4);

var _Control3 = _interopRequireDefault(_Control2);

var _edit_grouphover = __webpack_require__(/*! ../../img/edit_grouphover.png */ 34);

var _edit_grouphover2 = _interopRequireDefault(_edit_grouphover);

var _edit_hover = __webpack_require__(/*! ../../img/edit_hover.png */ 35);

var _edit_hover2 = _interopRequireDefault(_edit_hover);

var _edit_pressed = __webpack_require__(/*! ../../img/edit_pressed.png */ 36);

var _edit_pressed2 = _interopRequireDefault(_edit_pressed);

var _edit_rest = __webpack_require__(/*! ../../img/edit_rest.png */ 37);

var _edit_rest2 = _interopRequireDefault(_edit_rest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Edit = function (_Control) {
  _inherits(Edit, _Control);

  function Edit() {
    _classCallCheck(this, Edit);

    return _possibleConstructorReturn(this, (Edit.__proto__ || Object.getPrototypeOf(Edit)).call(this, {
      tooltip: 'Edit',
      srcRest: _edit_rest2.default,
      srcGroup: _edit_grouphover2.default,
      srcHover: _edit_hover2.default,
      srcDown: _edit_pressed2.default
    }));
  }

  return Edit;
}(_Control3.default);

exports.default = Edit;

/***/ }),
/* 24 */
/* no static exports found */
/* all exports used */
/*!******************************!*\
  !*** ./src/controls/Move.js ***!
  \******************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Control2 = __webpack_require__(/*! ./Control */ 4);

var _Control3 = _interopRequireDefault(_Control2);

var _move_grouphover = __webpack_require__(/*! ../../img/move_grouphover.png */ 38);

var _move_grouphover2 = _interopRequireDefault(_move_grouphover);

var _move_hover = __webpack_require__(/*! ../../img/move_hover.png */ 39);

var _move_hover2 = _interopRequireDefault(_move_hover);

var _move_pressed = __webpack_require__(/*! ../../img/move_pressed.png */ 40);

var _move_pressed2 = _interopRequireDefault(_move_pressed);

var _move_rest = __webpack_require__(/*! ../../img/move_rest.png */ 41);

var _move_rest2 = _interopRequireDefault(_move_rest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Move = function (_Control) {
  _inherits(Move, _Control);

  function Move() {
    _classCallCheck(this, Move);

    return _possibleConstructorReturn(this, (Move.__proto__ || Object.getPrototypeOf(Move)).call(this, {
      tooltip: 'Move',
      srcRest: _move_rest2.default,
      srcGroup: _move_grouphover2.default,
      srcHover: _move_hover2.default,
      srcDown: _move_pressed2.default
    }));
  }

  return Move;
}(_Control3.default);

exports.default = Move;

/***/ }),
/* 25 */
/* no static exports found */
/* all exports used */
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _OpenSeadragon = __webpack_require__(/*! OpenSeadragon */ 3);

var _OpenSeadragon2 = _interopRequireDefault(_OpenSeadragon);

var _preact = __webpack_require__(/*! preact */ 2);

var _Annotations = __webpack_require__(/*! ./components/Annotations */ 14);

var _Annotations2 = _interopRequireDefault(_Annotations);

var _Store = __webpack_require__(/*! ./store/Store */ 0);

var _Store2 = _interopRequireDefault(_Store);

var _Dispatcher = __webpack_require__(/*! ./dispatcher/Dispatcher */ 1);

var _Dispatcher2 = _interopRequireDefault(_Dispatcher);

var _controls = __webpack_require__(/*! ./controls */ 15);

var _controls2 = _interopRequireDefault(_controls);

var _initialize = __webpack_require__(/*! ./actions/initialize */ 12);

var _initialize2 = _interopRequireDefault(_initialize);

var _selectMode = __webpack_require__(/*! ./actions/selectMode */ 6);

var _selectMode2 = _interopRequireDefault(_selectMode);

var _cleanCanvas = __webpack_require__(/*! ./actions/cleanCanvas */ 9);

var _cleanCanvas2 = _interopRequireDefault(_cleanCanvas);

var _fillCanvasWith = __webpack_require__(/*! ./actions/fillCanvasWith */ 10);

var _fillCanvasWith2 = _interopRequireDefault(_fillCanvasWith);

var _zoom = __webpack_require__(/*! ./actions/zoom */ 13);

var _zoom2 = _interopRequireDefault(_zoom);

var _keypress = __webpack_require__(/*! ./actions/keypress */ 5);

var _keypress2 = _interopRequireDefault(_keypress);

var _handleAnotation = __webpack_require__(/*! ./actions/handleAnotation */ 11);

var _handleAnotation2 = _interopRequireDefault(_handleAnotation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var controls = _controls2.default.map(function (Control) {
  return new Control();
});

var isPluginActive = false;
var openHandler = null;
var zoomHandler = null;
var keypressHandler = null;
var overlay = null;

// modifies the passed function so it's only called when the
// plugin is active - otherwise it throws an error
function ifPluginIsActive(fn) {
  return function checkIfActive() {
    if (!isPluginActive) {
      throw new Error('The OpenSeadragon Annotations plugin is not running');
    } else {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return fn.apply(this, args);
    }
  };
}

// the viewer gains the following methods through its prototype,
// which are used to start and stop the plugin. The plugin waits
// for the 'open' event to start itself

_OpenSeadragon2.default.Viewer.prototype.initializeAnnotations = function init(cb) {
  var _this = this;

  // updateZoom notifies the plugin of changes in the zoom level
  var updateZoom = function updateZoom(e) {
    return (0, _zoom2.default)(e.zoom, _Dispatcher2.default);
  };
  var handleKeyPress = function handleKeyPress(e) {
    return (0, _keypress2.default)(e.keyCode, _Dispatcher2.default, _Store2.default);
  };
  // start is the function called once the 'open' event has been fired
  var start = function start() {
    zoomHandler = updateZoom;
    _this.addHandler('zoom', updateZoom);
    keypressHandler = handleKeyPress;
    _this.addHandler('keypress', handleKeyPress);

    var bounds = _this.world.getHomeBounds();
    var rect = new _OpenSeadragon.Rect(0, 0, bounds.width, bounds.height);
    overlay = (0, _preact.render)((0, _preact.h)(_Annotations2.default));
    _this.addOverlay(overlay, rect);

    var currentZoom = _this.viewport.getZoom();
    var boundingClientRect = overlay.getBoundingClientRect();
    (0, _initialize2.default)({
      zoom: currentZoom,
      width: boundingClientRect.width,
      height: boundingClientRect.height
    }, _Dispatcher2.default);

    controls.forEach(function (control) {
      _this.addControl(control.btn.element, {
        anchor: _OpenSeadragon.ControlAnchor.BOTTOM_RIGHT
      });
    });

    // clean up the listener that triggers this start
    if (openHandler) {
      _this.removeHandler('open', openHandler);
      openHandler = null;
    }
    isPluginActive = true;
    console.log('isPluginActive = true');
    if (cb) {
      cb();
    }
  };

  if (isPluginActive) {
    throw new Error('The OpenSeadragon Annotations plugin is already running');
  }
  if (overlay) {
    throw new Error('An existing overlay has been found');
  }

  if (this.isOpen()) {
    start();
  } else {
    if (openHandler) {
      // if there is a handler initializeAnnotations() has been
      // called before. Cancel that handler (with the previously
      // passed callback)...
      this.removeHandler('open', openHandler);
    }
    // ...and set a new one, which will use the new passed callback
    openHandler = start;
    this.addOnceHandler('open', start);
  }
};

_OpenSeadragon2.default.Viewer.prototype.areAnnotationsActive = function areActive() {
  return isPluginActive;
};

_OpenSeadragon2.default.Viewer.prototype.startDrawing = ifPluginIsActive(function draw() {
  (0, _selectMode2.default)('DRAW', _Dispatcher2.default, _Store2.default);
});

_OpenSeadragon2.default.Viewer.prototype.stopDrawing = ifPluginIsActive(function stopdraw() {
  (0, _selectMode2.default)('MOVE', _Dispatcher2.default, _Store2.default);
});

_OpenSeadragon2.default.Viewer.prototype.shutdownAnnotations = ifPluginIsActive(function shutdown() {
  if (openHandler !== null) {
    throw new Error('An untriggered handler for the \'open\' event has been found');
  }
  if (overlay === null) {
    throw new Error('Null reference to the SVG overlay');
  }
  this.removeHandler('zoom', zoomHandler);
  zoomHandler = null;
  this.removeHandler('keypress', keypressHandler);
  keypressHandler = null;
  this.removeOverlay(overlay);
  overlay = null;
  var ourControls = controls;
  var activeControls = this.controls;
  activeControls.forEach(function (viewportControl) {
    ourControls.forEach(function (control) {
      // destroys only the controls that we have added
      if (viewportControl.element === control.btn.element) {
        viewportControl.destroy();
      }
    });
  });
  (0, _selectMode2.default)('MOVE', _Dispatcher2.default, _Store2.default);
  (0, _cleanCanvas2.default)(_Dispatcher2.default);
  isPluginActive = false;
});

_OpenSeadragon2.default.Viewer.prototype.setAnnotations = ifPluginIsActive(function (annotations, username, savehandler, mouseuphandler, showAnnoInfo) {
  (0, _fillCanvasWith2.default)(annotations, username, savehandler, mouseuphandler, showAnnoInfo, _Dispatcher2.default);
});

_OpenSeadragon2.default.Viewer.prototype.HandleAnnotation = ifPluginIsActive(function (aObject) {
  (0, _handleAnotation2.default)(aObject, _Dispatcher2.default);
});

/***/ }),
/* 26 */
/* no static exports found */
/* all exports used */
/*!******************************!*\
  !*** ./src/utils/convert.js ***!
  \******************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertHeight = exports.convertWidth = undefined;

var _Store = __webpack_require__(/*! ../store/Store */ 0);

var _Store2 = _interopRequireDefault(_Store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var convertWidth = {
  toPercent: function toPercent(horizontalMeasureInPixels) {
    var totalImageWidthInPixels = _Store2.default.getWidth();
    if (totalImageWidthInPixels === 0) {
      return 0;
    } // image not yet initialized
    return horizontalMeasureInPixels * 100 / totalImageWidthInPixels;
  },
  toPixels: function toPixels(horizontalMeasureAsPercentage) {
    var totalImageWidthInPixels = _Store2.default.getWidth();
    if (totalImageWidthInPixels === 0) {
      return 0;
    } // image not yet initialized
    return horizontalMeasureAsPercentage * totalImageWidthInPixels / 100;
  }
};

var convertHeight = {
  toPercent: function toPercent(verticalMeasureInPixels) {
    var totalImageHeightInPixels = _Store2.default.getHeight();
    if (totalImageHeightInPixels === 0) {
      return 0;
    } // image not yet initialized
    return verticalMeasureInPixels * 100 / totalImageHeightInPixels;
  },
  toPixels: function toPixels(verticalMeasureAsPercentage) {
    var totalImageHeightInPixels = _Store2.default.getHeight();
    if (totalImageHeightInPixels === 0) {
      return 0;
    } // image not yet initialized
    return verticalMeasureAsPercentage * totalImageHeightInPixels / 100;
  }
};

exports.convertWidth = convertWidth;
exports.convertHeight = convertHeight;

/***/ }),
/* 27 */
/* no static exports found */
/* all exports used */
/*!*********************************!*\
  !*** ./~/fbjs/lib/invariant.js ***!
  \*********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule invariant
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function (condition, format, a, b, c, d, e, f) {
  if (process.env.NODE_ENV !== 'production') {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error('Invariant Violation: ' + format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../../process/browser.js */ 8)))

/***/ }),
/* 28 */
/* no static exports found */
/* all exports used */
/*!*************************!*\
  !*** ./~/flux/index.js ***!
  \*************************/
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

module.exports.Dispatcher = __webpack_require__(/*! ./lib/Dispatcher */ 29);


/***/ }),
/* 29 */
/* no static exports found */
/* all exports used */
/*!**********************************!*\
  !*** ./~/flux/lib/Dispatcher.js ***!
  \**********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule Dispatcher
 * 
 * @preventMunge
 */



exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var invariant = __webpack_require__(/*! fbjs/lib/invariant */ 27);

var _prefix = 'ID_';

/**
 * Dispatcher is used to broadcast payloads to registered callbacks. This is
 * different from generic pub-sub systems in two ways:
 *
 *   1) Callbacks are not subscribed to particular events. Every payload is
 *      dispatched to every registered callback.
 *   2) Callbacks can be deferred in whole or part until other callbacks have
 *      been executed.
 *
 * For example, consider this hypothetical flight destination form, which
 * selects a default city when a country is selected:
 *
 *   var flightDispatcher = new Dispatcher();
 *
 *   // Keeps track of which country is selected
 *   var CountryStore = {country: null};
 *
 *   // Keeps track of which city is selected
 *   var CityStore = {city: null};
 *
 *   // Keeps track of the base flight price of the selected city
 *   var FlightPriceStore = {price: null}
 *
 * When a user changes the selected city, we dispatch the payload:
 *
 *   flightDispatcher.dispatch({
 *     actionType: 'city-update',
 *     selectedCity: 'paris'
 *   });
 *
 * This payload is digested by `CityStore`:
 *
 *   flightDispatcher.register(function(payload) {
 *     if (payload.actionType === 'city-update') {
 *       CityStore.city = payload.selectedCity;
 *     }
 *   });
 *
 * When the user selects a country, we dispatch the payload:
 *
 *   flightDispatcher.dispatch({
 *     actionType: 'country-update',
 *     selectedCountry: 'australia'
 *   });
 *
 * This payload is digested by both stores:
 *
 *   CountryStore.dispatchToken = flightDispatcher.register(function(payload) {
 *     if (payload.actionType === 'country-update') {
 *       CountryStore.country = payload.selectedCountry;
 *     }
 *   });
 *
 * When the callback to update `CountryStore` is registered, we save a reference
 * to the returned token. Using this token with `waitFor()`, we can guarantee
 * that `CountryStore` is updated before the callback that updates `CityStore`
 * needs to query its data.
 *
 *   CityStore.dispatchToken = flightDispatcher.register(function(payload) {
 *     if (payload.actionType === 'country-update') {
 *       // `CountryStore.country` may not be updated.
 *       flightDispatcher.waitFor([CountryStore.dispatchToken]);
 *       // `CountryStore.country` is now guaranteed to be updated.
 *
 *       // Select the default city for the new country
 *       CityStore.city = getDefaultCityForCountry(CountryStore.country);
 *     }
 *   });
 *
 * The usage of `waitFor()` can be chained, for example:
 *
 *   FlightPriceStore.dispatchToken =
 *     flightDispatcher.register(function(payload) {
 *       switch (payload.actionType) {
 *         case 'country-update':
 *         case 'city-update':
 *           flightDispatcher.waitFor([CityStore.dispatchToken]);
 *           FlightPriceStore.price =
 *             getFlightPriceStore(CountryStore.country, CityStore.city);
 *           break;
 *     }
 *   });
 *
 * The `country-update` payload will be guaranteed to invoke the stores'
 * registered callbacks in order: `CountryStore`, `CityStore`, then
 * `FlightPriceStore`.
 */

var Dispatcher = (function () {
  function Dispatcher() {
    _classCallCheck(this, Dispatcher);

    this._callbacks = {};
    this._isDispatching = false;
    this._isHandled = {};
    this._isPending = {};
    this._lastID = 1;
  }

  /**
   * Registers a callback to be invoked with every dispatched payload. Returns
   * a token that can be used with `waitFor()`.
   */

  Dispatcher.prototype.register = function register(callback) {
    var id = _prefix + this._lastID++;
    this._callbacks[id] = callback;
    return id;
  };

  /**
   * Removes a callback based on its token.
   */

  Dispatcher.prototype.unregister = function unregister(id) {
    !this._callbacks[id] ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.unregister(...): `%s` does not map to a registered callback.', id) : invariant(false) : undefined;
    delete this._callbacks[id];
  };

  /**
   * Waits for the callbacks specified to be invoked before continuing execution
   * of the current callback. This method should only be used by a callback in
   * response to a dispatched payload.
   */

  Dispatcher.prototype.waitFor = function waitFor(ids) {
    !this._isDispatching ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.waitFor(...): Must be invoked while dispatching.') : invariant(false) : undefined;
    for (var ii = 0; ii < ids.length; ii++) {
      var id = ids[ii];
      if (this._isPending[id]) {
        !this._isHandled[id] ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.waitFor(...): Circular dependency detected while ' + 'waiting for `%s`.', id) : invariant(false) : undefined;
        continue;
      }
      !this._callbacks[id] ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.waitFor(...): `%s` does not map to a registered callback.', id) : invariant(false) : undefined;
      this._invokeCallback(id);
    }
  };

  /**
   * Dispatches a payload to all registered callbacks.
   */

  Dispatcher.prototype.dispatch = function dispatch(payload) {
    !!this._isDispatching ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch.') : invariant(false) : undefined;
    this._startDispatching(payload);
    try {
      for (var id in this._callbacks) {
        if (this._isPending[id]) {
          continue;
        }
        this._invokeCallback(id);
      }
    } finally {
      this._stopDispatching();
    }
  };

  /**
   * Is this Dispatcher currently dispatching.
   */

  Dispatcher.prototype.isDispatching = function isDispatching() {
    return this._isDispatching;
  };

  /**
   * Call the callback stored with the given id. Also do some internal
   * bookkeeping.
   *
   * @internal
   */

  Dispatcher.prototype._invokeCallback = function _invokeCallback(id) {
    this._isPending[id] = true;
    this._callbacks[id](this._pendingPayload);
    this._isHandled[id] = true;
  };

  /**
   * Set up bookkeeping needed when dispatching.
   *
   * @internal
   */

  Dispatcher.prototype._startDispatching = function _startDispatching(payload) {
    for (var id in this._callbacks) {
      this._isPending[id] = false;
      this._isHandled[id] = false;
    }
    this._pendingPayload = payload;
    this._isDispatching = true;
  };

  /**
   * Clear bookkeeping used for dispatching.
   *
   * @internal
   */

  Dispatcher.prototype._stopDispatching = function _stopDispatching() {
    delete this._pendingPayload;
    this._isDispatching = false;
  };

  return Dispatcher;
})();

module.exports = Dispatcher;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../../process/browser.js */ 8)))

/***/ }),
/* 30 */
/* no static exports found */
/* all exports used */
/*!*********************************!*\
  !*** ./img/draw_grouphover.png ***!
  \*********************************/
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAiCAYAAADVhWD8AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowMTgwMTE3NDA3MjA2ODExODIyQUEwM0FBMUQ5NUNBNSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDozRkRERTMzMkVGRDYxMUUzQTExNUI3MjM4QzI2QjRFRiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozRkRERTMzMUVGRDYxMUUzQTExNUI3MjM4QzI2QjRFRiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MjhBOTkxNUEwRTIwNjgxMTgyMkFBMDNBQTFEOTVDQTUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDE4MDExNzQwNzIwNjgxMTgyMkFBMDNBQTFEOTVDQTUiLz4gPC9yZGY6RGVzY3Jp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"

/***/ }),
/* 31 */
/* no static exports found */
/* all exports used */
/*!****************************!*\
  !*** ./img/draw_hover.png ***!
  \****************************/
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAiCAYAAADVhWD8AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowMTgwMTE3NDA3MjA2ODExODIyQUEwM0FBMUQ5NUNBNSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyMUZEMjkyNUVGRDYxMUUzQTExNUI3MjM4QzI2QjRFRiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyMUZEMjkyNEVGRDYxMUUzQTExNUI3MjM4QzI2QjRFRiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MjhBOTkxNUEwRTIwNjgxMTgyMkFBMDNBQTFEOTVDQTUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDE4MDExNzQwNzIwNjgxMTgyMkFBMDNBQTFEOTVDQTUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6AIujCAAAJf0lEQVR42qyYW5AUVxmAz6Wvc92dvcKyLLAkBIJaAVIhsYQyxiq0QiwkL5ZlRX3ASooq8ugDVfpsKfCghVD6YsqUllwMJIZLLMAYEiKwgciGLIG9zN5nd3anZ6bv5xz/HruX3tkBS2NX/dMzPd3/+c5//vNfGgsh0Oc5MBz118QDlAaX48I5XzgnEgkk/Q8DR4PjmES/RXifCL9HUMJ1XVEPEJ0DCQ7pv4QIhIDQ8Bx9xzGYQALtLH5WFKX2X6lUEhFAXP4jTAMIKRQ5kN27d2d27ty5AmZNGGP43Llz0ydPnpwPAXwQLxQ/FJ7NZmtQY2Njoh4GP8hnYiBxCPXVV1/tfOWVV15ob2/fqkl8JTKn8ILJ1RZRMtnE4ODghwcPHnz7xIkT0/CME5MFqABoYGBgAWjDhg2NYWIgNIRQ9u3b17F3797vdLUmv43HLhI88glBM4bgniIEIwIThoniYd6cxF7XI8LMPe1/PDBy5siRI28eP358DHSYIDaIGwIF1hPXr1+vAW3ZsuU+TOThlNJ6EPXy5cs7vvD4+h+TwbckfPNDahfTno1zrqelGJcVjgjliPmYeC6VnCrVeVFRc4ZU6V3P53LbvDPn3jkKFn0HdFVDKCcOdOnSJbF9+/b7PuN5XrR28aVRr1y5snttT+decfmA5nxickOstLxszkW6zpAkcUyJqLksPOWDAsdv8i27mUmzs0qmMKC09N5Tt219Yc+hQ4fSAHQ6tvtQ5OzValUs8plyuYwymUxklQBEO3bs2FNf3vrkzxOXD+jWbcqNZLcJHuhhRQEIikBEtKsxFQSmECARxBkWjoPFXImm5/OqtMqWbi3fVf3jsT8fOnz48PvwgBFayQkdvObUC5ZxHAfFlifYLeqaNWu+JfUdTZgfe2hOX+YhVUOYcQpmpMLnCBO/NktMa6GFYgkRogr4xQiXwUxY54bXIdJ3htBKfDqxcePG5+D2/pgjx7e/IBGMbdvR1+CafOrUqZ3N5r2vor5BZc7L+oxI4Kg+FZ4rC9uRhWMr3LJk4VkKEpaGJVuXUnZazlqZD8rT65QmP0WSviZSlJRYlqUGptR1SeOJl19++eugPx1YPpw0iQ9cO7q7u+MBTWlra3tev3E6bUylkEcUglxPRpajItNWkGnVhLi2SrijS5KTUJJuSsl5qTdvzXblh1z01sBct6zxBCFc8RSFGlNJvmbqamrVqlVfAf1JED0YJxZAManf1YG/7N+//1G1kn+UDM8qFgOrwy7BniNjsAL2LZUIW6PY0qhs60rC1cEKCbWdJ9+4Nt8yW/CRaXJkzDP0nmEvw8KVMfeoxSlJTlSUdmKsgG28NgYjRU5N6kBqu6i3t/dJdeKGbk1SylxOsGsH5mznLmtlttfqW24Lc9wWLtycUL1mkuXZE1fLmQDE8wSSZYwyTRQ9kyA24jSHTUv2HYatSYQ7rSEdrLMxXKYIpmaZ+nRQWyY4VpN8v2LnZwTL6VQCG4gQF0MYIgrGNEOw3CYRtUumv/+goBSmXOS6HCmwom0dCtq5rs11Rj3BbSGIY8u8XGVO0SDJZaYiyyuWBxskBImWaUluqlkHYk6TPDcj8+IcxSWX85lhRJJgnKe+tgTkl28PKBNjJuxGhlSVomVdCfTdrV2uM+Yxf97n4v1LQpQcSqYthP0qTZYl2fc7U3Ug+EEwGGJOMBuiO1WJYh9LEkXVTAfCt97FNJfAcneGqG05+pPfjSr5YQN2oo80TULdPRm094kW1333BvNHSpwXTcFNT6RKM9Q3faoJh1YdhVUqFdQg4zfO2vPz82UbAkeGmbJgHqGSJNSZPMbNKUxac4RmU+SHf+hTBu8WkWV5EIxltLo3h372TJPLrtxm9O4M1wplIaqOQB4LQppMA8tRj5Y5tWGyVqNx62FqkbBQKAxPKxm3R7Moq/gQ02QhZWWClykMr07j71+8q358cxTNzlShQlNgadrRa7vXuKJ/hJHRApfKhkDMhUQHIETIvuEJIgTWNY8M2k1usVicjge7qAgjDWB4f39/3020rKJ32lSWHInKLpDAWWXqS1dGtdd+tFkE+VGSGepcrqO//OBxjm/foySfV+jctCpZJU3yynogxDYkSiw50BPouzSnVyYnJ++GaSCKwA1hgj/8Cxcu3PuoJPePdmVtWXep0HyKVEZgpmR4aBZt3ncSXz3wPNq0pQf97aXHhbjxGRafDhExOknEXJEK04B0UaUC21RI8LziUQX0DDTL9uVxNw+WGYmVElF9swgmXi46w8PD51/HXxpPPMIw1gTmOsdCdnBrW7q2NN/7zTV0YkcbQmN5SIiTGPkljBQLoxTkqyaOUbPAogmey0LeSiCsr2X4F+MtEzMzM32x2saJW6eRz9TKxb/CgZ97btO29R0tm+l8zqQulBgVdPxp2JUKjMAdJGZggmYZ9gLoTsJE1cBZ/11RBB+QvJGwMUo0CXQ+rRdPvefdAJh/wL+VECgqSRcv065du+KWCUxoj4yMnPlp/7r8yGqlqukO4l4VMXsOBigg7haQ4EUAA71pmGAzQ6IVQFpBcw4j1oQR1wGkmaN7PcTc8046bxhGAFIKYaKqb8EyCzBQ4MT9JrjJghr1o6H8xG/3/L337u1OyUilTISdChRRZcRoBQazEMtCUdYMm6cFHgwgmkFSEKUhJaTbOerroMY3/5T6rFA0zluW9c8gcoQwVmgZviRrhzAiVtkH62kC0NlPB6d+9eLrbWd/XUyNSZ0WSwgLUcdFUFJA6gEQyDAcBhcEI/BalNRgV69k7MCEPP6No+rgWKHyBoBcAn2zoWXihRVb6LeiSm/Tpk0I2g108+bNeP0bJLNEUH9IktSWy+VebM2SZ/c8W27dsdbJrsv6Ce4CBK8VWAhKHnStQCvnB4hx+CydnSiya77vX4QxgrhSDK1Sjjmw3xDmscceq9XAd+7cibcocpjQgnQf5JM0JNF2XdefJYR8EZ7tWNflq00JQYtlwW6NIAcmNAHXB+F8He6fDgc3wnO0PE4dyGKYnp6ehYZqfHy8vkOQQyA9tFQkGkB1BsUS6An619nYEjuhBSKxGrUqsRb4PkxHR8eidhPyU307K4f1hxoTJbxOY+0tC33BrWvg3AZRd1HTtgADbeeSphzq4kbtbQQmxzrN+l7br2tvWbyTbASyCEbTtEUgcal740AaNP+kLqXwuub/oRBLYMAxFxrwh70LeMgrkSXZP/5K5GEQS17g/B8O/HkV/EuAAQBPhIfszxBGagAAAABJRU5ErkJggg=="

/***/ }),
/* 32 */
/* no static exports found */
/* all exports used */
/*!******************************!*\
  !*** ./img/draw_pressed.png ***!
  \******************************/
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAiCAYAAADVhWD8AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowMTgwMTE3NDA3MjA2ODExODIyQUEwM0FBMUQ5NUNBNSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDozRkRERTMzQUVGRDYxMUUzQTExNUI3MjM4QzI2QjRFRiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozRkRERTMzOUVGRDYxMUUzQTExNUI3MjM4QzI2QjRFRiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MjhBOTkxNUEwRTIwNjgxMTgyMkFBMDNBQTFEOTVDQTUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDE4MDExNzQwNzIwNjgxMTgyMkFBMDNBQTFEOTVDQTUiLz4gPC9yZGY6RGVzY3Jp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"

/***/ }),
/* 33 */
/* no static exports found */
/* all exports used */
/*!***************************!*\
  !*** ./img/draw_rest.png ***!
  \***************************/
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAiCAYAAADVhWD8AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowMTgwMTE3NDA3MjA2ODExODIyQUEwM0FBMUQ5NUNBNSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDowRUI0OEJGRUVGRDYxMUUzQTExNUI3MjM4QzI2QjRFRiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowRUI0OEJGREVGRDYxMUUzQTExNUI3MjM4QzI2QjRFRiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MjhBOTkxNUEwRTIwNjgxMTgyMkFBMDNBQTFEOTVDQTUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDE4MDExNzQwNzIwNjgxMTgyMkFBMDNBQTFEOTVDQTUiLz4gPC9yZGY6RGVzY3Jp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"

/***/ }),
/* 34 */
/* no static exports found */
/* all exports used */
/*!*********************************!*\
  !*** ./img/edit_grouphover.png ***!
  \*********************************/
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAiCAYAAADVhWD8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABvtJREFUeNrUmE1MFVcUx+fOzPPxLSII0SogK5PGalLRxGAtdUVjbFdNtNrEJZpobCJum2jSdXFRG6t1IxtqF4Vg6lehiYpoNDFGUERQiIDI99fjvbm3///1zuswfQhdNGknOZnHmzdnfvec/zn3DEIpZS12CBz+x8A5aOFDhcz/zlLveKBYDCYEYhtzzNn/LnxI83CePXOWiwG5SwDxzTEWMfdFQlAiEAkfIg5LmLNnTNFtKiB3CSB2ACJqLK2pqelQfn5+pQ6DlMlUDQ4OtuzevfusAYjBZs05FoCSqYBSpikEQuBlsPRz587t2rRp07e2ba/OzMy0s7KyJD4n7/M8z5qamrJhMpFI9F+9evXkiRMn/sClKdg0bAY2Z6IlTcbUgjApQBiJjLa2trqMjIyKlStXCgOhnSEq8+7l7YAikP3mzRtreHi4taKi4jAuj8MmDVQsFdA8mIVA7t2717p8+fK1hYWFnuM4XLXEAzXIX/rWXvXf+I3tuq7AbxykzQbQq/Ly8s/wk1HYxEJASZhA1QRBMgFyB9pYA/PwWzk3Nyd5n/m5Pttvc6UMYHJ10WjUxnVGyO7v7x/YunUrgUYM0FQI6G9lKQJiTb9161Zdbm7uewTBQwhCCjsSiTi0ZcuWaZuamrTj8TiZuDjBiNFmZ2cZQZmXlyfho+jatWu18JsLy6L/QEWKJEyKyomeOXNmFzViIsJVC4ReP9zzEk5n51PnypXf7Nra75za2lp7dHTUDoLQKGgC8YDWCPRhTU3NR/Cfw/Sb6CfbgzB59mGYnjRYNqLSWlxcvDo7OzuBVRPGuX37lt3T0yN6errnhbOwsMiqrj4kZ2ZmZCwWk8FU+dln9U1PT7udnZ2vd+zY8QW+GgqkjOWfcBdIURQRWA2TXBlhkXdx/fq1VK3fQiqtWGxWQLi6nHxx+zAwBT+K/gBVYNI0bWzW7z92qMtq8dbX1x+G+AQ04BGGjlatWiXLy7eqeDxhhe3BgwfWqVOnxOPHj3UVUTyEQdVZjCq0ZjFqFCr9Iq17jWaiJhs6TXYoMlozOTk5n0CgLGEFJwqh1+fKykqVnZ2lHxK2yclJ68KFn8SlSz9T3H6/IYw2LIh/K1xT69at22Ia6bwtJQyjgXCzgCD5AElHhEG+KQVZVfUp9JOwFrK7d9tEe/tjm72G0eH9XBRtYmJCjoyMKPo3EZm3t6XamwQdDA0NMe/xrq6ueHp6uotcOyhRVVJSaq1fX+Z0dHQIhNwqKMi3env75jlAmu3jx2vk+Pi4hNYkFuJxMWVlZREuEkUTDWRCvGujJIyuMm6AWBHLVo2NjXnopDodiI7V2NjoYkNU+/Z9KdFnrIsXL9oNDb8mHfOhiIRCJFhhuksyUtQPUjaXah5KBaMFB2N12Mw7e4wxhYhJiNQ7cOArsXHjRvXixQt2ZGvv3n0K+5Fz48Z17fz58y6RnZ3D3kPtUdSK4ob2dOpSDF+pYV6/ft2Mm99HWHXusTIfhhsfYWVRUVEcLZ67tGUqSKGxJZ0UF5eoV69eWf69FDU1wq1hYGDgfmDuScLYKUZFefTo0R8Y2t7eXgc9xPEjw2hxZdQTIqJevnxJcApTRxNn7QhNjSJV0AwjTPEK+unr63PYJtAGfjF7khcAUmGY5ISGiAw+efIkAtE6/gAVABLUDh/Ov/3poa3tjoDYrT17PlfYrRW1xus8EDXn6dOn7IojZqaZCw5bGsbMEsFxkcSxhw8fnoT4LDSyCNLlspcQhqtkuvgQ/zP3pI6OdsGUHTv2NduBRCoUgNmjRGlpqdve3u6yAJqbm380Q9ZMeIwIR8afW2Pnz5//He37HvYoF+F24dAxYrZ8CD9SqDToJoL0HkvEYnPy2bNnHlNJkJKSEhcRxL5224Gu2hsaGu6Ehqx4cjYObZS26YoZZmfNO3LkSBNCXlBVVZVAr5GPHj3iKJEsfZ6RUgvgFLJeFRscXW7YsIETn7h8+bKLNA2fPn26GpeHAzZuoOJ6Lg4NVyIw82YaoBUHDx5sxG6dv337dokByYOwLVQKtwgNZIZrvSlCMwqVJtauXStaW1vtmzdv2mj/I4h0tZn0hs1uPW4GLH8mXnzS4zhBoP3793+P8H+Ah4lt27bJzZs3a7kRyPfBa9yhsXEKpMXmfoYxpL2uru4bXB4zEAtOekuagQ1QLgbrjzFwHe/u7l6BEhVr1qwhQPJ+gqF8rbS0NPSZ4lH0lLOcnw3I2JJn4CUAZZm0ESxr586dB3DvFvoINc37LS0t9Sb8M0asE//47WCx9yYDlWnO6eZ7N9Q8/fbgw0wv9b0p5Rulejv+Bx3P60HGcTQ0jwRhvMXeKMMgi774/1vv2qlA/nP/hRD/q//PLABlLQCRCspaDMI//hRgALxeXQ5Prr0NAAAAAElFTkSuQmCC"

/***/ }),
/* 35 */
/* no static exports found */
/* all exports used */
/*!****************************!*\
  !*** ./img/edit_hover.png ***!
  \****************************/
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 36 */
/* no static exports found */
/* all exports used */
/*!******************************!*\
  !*** ./img/edit_pressed.png ***!
  \******************************/
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 37 */
/* no static exports found */
/* all exports used */
/*!***************************!*\
  !*** ./img/edit_rest.png ***!
  \***************************/
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 38 */
/* no static exports found */
/* all exports used */
/*!*********************************!*\
  !*** ./img/move_grouphover.png ***!
  \*********************************/
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAiCAYAAADVhWD8AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowMTgwMTE3NDA3MjA2ODExODIyQUEwM0FBMUQ5NUNBNSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyMUZEMjkyOUVGRDYxMUUzQTExNUI3MjM4QzI2QjRFRiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyMUZEMjkyOEVGRDYxMUUzQTExNUI3MjM4QzI2QjRFRiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MjhBOTkxNUEwRTIwNjgxMTgyMkFBMDNBQTFEOTVDQTUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDE4MDExNzQwNzIwNjgxMTgyMkFBMDNBQTFEOTVDQTUiLz4gPC9yZGY6RGVzY3Jp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"

/***/ }),
/* 39 */
/* no static exports found */
/* all exports used */
/*!****************************!*\
  !*** ./img/move_hover.png ***!
  \****************************/
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAiCAYAAADVhWD8AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowMTgwMTE3NDA3MjA2ODExODIyQUEwM0FBMUQ5NUNBNSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyMUZEMjkyMUVGRDYxMUUzQTExNUI3MjM4QzI2QjRFRiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyMUZEMjkyMEVGRDYxMUUzQTExNUI3MjM4QzI2QjRFRiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MjhBOTkxNUEwRTIwNjgxMTgyMkFBMDNBQTFEOTVDQTUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDE4MDExNzQwNzIwNjgxMTgyMkFBMDNBQTFEOTVDQTUiLz4gPC9yZGY6RGVzY3Jp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"

/***/ }),
/* 40 */
/* no static exports found */
/* all exports used */
/*!******************************!*\
  !*** ./img/move_pressed.png ***!
  \******************************/
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAiCAYAAADVhWD8AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowMTgwMTE3NDA3MjA2ODExODIyQUEwM0FBMUQ5NUNBNSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDozRkRERTMzNkVGRDYxMUUzQTExNUI3MjM4QzI2QjRFRiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozRkRERTMzNUVGRDYxMUUzQTExNUI3MjM4QzI2QjRFRiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MjhBOTkxNUEwRTIwNjgxMTgyMkFBMDNBQTFEOTVDQTUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDE4MDExNzQwNzIwNjgxMTgyMkFBMDNBQTFEOTVDQTUiLz4gPC9yZGY6RGVzY3Jp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"

/***/ }),
/* 41 */
/* no static exports found */
/* all exports used */
/*!***************************!*\
  !*** ./img/move_rest.png ***!
  \***************************/
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAiCAYAAADVhWD8AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowMTgwMTE3NDA3MjA2ODExODIyQUEwM0FBMUQ5NUNBNSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDowRUI0OEJGQUVGRDYxMUUzQTExNUI3MjM4QzI2QjRFRiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowRUI0OEJGOUVGRDYxMUUzQTExNUI3MjM4QzI2QjRFRiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MjhBOTkxNUEwRTIwNjgxMTgyMkFBMDNBQTFEOTVDQTUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDE4MDExNzQwNzIwNjgxMTgyMkFBMDNBQTFEOTVDQTUiLz4gPC9yZGY6RGVzY3Jp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"

/***/ })
/******/ ]);
//# sourceMappingURL=openseadragon-annotations.js.map