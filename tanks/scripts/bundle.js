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

	"use strict";
	var matrix_1 = __webpack_require__(1);
	var key_code_1 = __webpack_require__(2);
	var canvas = document.getElementById("main_canvas");
	var context = canvas.getContext("2d");
	var Tank = (function () {
	    function Tank() {
	        this.xPos = 0;
	        this.yPos = 0;
	        this.velosity = 0;
	        this.rotation = 0;
	        this.isRun = false;
	        this.rotateLeft = false;
	        this.rotateRight = false;
	        this.turret = new Turret();
	    }
	    return Tank;
	}());
	var Turret = (function () {
	    function Turret() {
	        this.rotation = 0;
	        this.rotateLeft = false;
	        this.rotateRight = false;
	    }
	    return Turret;
	}());
	function updateTransform(m) {
	    context.setTransform(m.m11, m.m12, m.m21, m.m22, m.dx, m.dy);
	}
	function DrawTank(tank) {
	    var m = matrix_1.Matrix.Multiply(matrix_1.Matrix.Rotation(tank.rotation), matrix_1.Matrix.Translation(tank.xPos, tank.yPos));
	    updateTransform(m);
	    context.strokeStyle = "#000";
	    context.fillStyle = "#fff";
	    context.strokeRect(-10, -20, 20, 40);
	    DrawTurret(tank.turret, m);
	}
	function DrawTurret(turret, tankTransform) {
	    var m = matrix_1.Matrix.Multiply(matrix_1.Matrix.Rotation(turret.rotation), matrix_1.Matrix.Translation(0, -5));
	    m = matrix_1.Matrix.Multiply(m, tankTransform);
	    updateTransform(m);
	    context.strokeStyle = "#000";
	    context.fillRect(-3, 0, 6, 30);
	    context.strokeRect(-3, 0, 6, 30);
	    context.fillRect(-8, -8, 16, 16);
	    context.strokeRect(-8, -8, 16, 16);
	}
	function Clear() {
	    context.setTransform(1, 0, 0, 1, 0, 0);
	    context.clearRect(0, 0, 600, 600);
	}
	var tank = new Tank();
	tank.xPos = 100;
	var timeout = 30;
	setInterval(function () {
	    var t = timeout / 1000;
	    var a = 3 - tank.velosity;
	    if (tank.isRun == false) {
	        a = -5 * tank.velosity;
	    }
	    if (tank.rotateLeft)
	        tank.rotation += 0.1;
	    if (tank.rotateRight)
	        tank.rotation -= 0.1;
	    if (tank.turret.rotateLeft)
	        tank.turret.rotation += 0.1;
	    if (tank.turret.rotateRight)
	        tank.turret.rotation -= 0.1;
	    tank.velosity = tank.velosity + a * t;
	    var deltaPos = tank.velosity + a * t * t / 2;
	    tank.yPos = tank.yPos + deltaPos * Math.cos(tank.rotation);
	    tank.xPos = tank.xPos + deltaPos * Math.sin(tank.rotation);
	    Clear();
	    DrawTank(tank);
	}, timeout);
	document.addEventListener("keydown", function (e) {
	    console.log(e.keyCode);
	    if (e.keyCode === key_code_1.KeyCode.UP_ARROW)
	        tank.isRun = true;
	    if (e.keyCode === key_code_1.KeyCode.LEFT_ARROW)
	        tank.rotateLeft = true;
	    if (e.keyCode === key_code_1.KeyCode.RIGHT_ARROW)
	        tank.rotateRight = true;
	    if (e.keyCode === key_code_1.KeyCode.KEY_A)
	        tank.turret.rotateLeft = true;
	    if (e.keyCode === key_code_1.KeyCode.KEY_D)
	        tank.turret.rotateRight = true;
	});
	document.addEventListener("keyup", function (e) {
	    if (e.keyCode === key_code_1.KeyCode.UP_ARROW)
	        tank.isRun = false;
	    if (e.keyCode === key_code_1.KeyCode.LEFT_ARROW)
	        tank.rotateLeft = false;
	    if (e.keyCode === key_code_1.KeyCode.RIGHT_ARROW)
	        tank.rotateRight = false;
	    if (e.keyCode === key_code_1.KeyCode.KEY_A)
	        tank.turret.rotateLeft = false;
	    if (e.keyCode === key_code_1.KeyCode.KEY_D)
	        tank.turret.rotateRight = false;
	});
	console.log(context);


/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	var Matrix = (function () {
	    function Matrix(m11, m12, m21, m22, dx, dy) {
	        this.m11 = m11;
	        this.m12 = m12;
	        this.m21 = m21;
	        this.m22 = m22;
	        this.dx = dx;
	        this.dy = dy;
	    }
	    Matrix.Identity = function () {
	        return new Matrix(1, 0, 0, 1, 0, 0);
	    };
	    Matrix.Rotation = function (angle) {
	        var cosAngle = Math.cos(angle);
	        var sinAngle = Math.sin(angle);
	        return new Matrix(cosAngle, -sinAngle, sinAngle, cosAngle, 0, 0);
	    };
	    Matrix.Translation = function (dx, dy) {
	        return new Matrix(1, 0, 0, 1, dx, dy);
	    };
	    Matrix.Multiply = function (a, b) {
	        return new Matrix(a.m11 * b.m11 + a.m12 * b.m21, a.m11 * b.m12 + a.m12 * b.m22, a.m21 * b.m11 + a.m22 * b.m21, a.m21 * b.m12 + a.m22 * b.m22, a.dx * b.m11 + a.dy * b.m21 + b.dx, a.dx * b.m12 + a.dy * b.m22 + b.dy);
	    };
	    return Matrix;
	}());
	exports.Matrix = Matrix;


/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	(function (KeyCode) {
	    KeyCode[KeyCode["BACKSPACE"] = 8] = "BACKSPACE";
	    KeyCode[KeyCode["TAB"] = 9] = "TAB";
	    KeyCode[KeyCode["ENTER"] = 13] = "ENTER";
	    KeyCode[KeyCode["SHIFT"] = 16] = "SHIFT";
	    KeyCode[KeyCode["CTRL"] = 17] = "CTRL";
	    KeyCode[KeyCode["ALT"] = 18] = "ALT";
	    KeyCode[KeyCode["PAUSE"] = 19] = "PAUSE";
	    KeyCode[KeyCode["CAPS_LOCK"] = 20] = "CAPS_LOCK";
	    KeyCode[KeyCode["ESCAPE"] = 27] = "ESCAPE";
	    KeyCode[KeyCode["SPACE"] = 32] = "SPACE";
	    KeyCode[KeyCode["PAGE_UP"] = 33] = "PAGE_UP";
	    KeyCode[KeyCode["PAGE_DOWN"] = 34] = "PAGE_DOWN";
	    KeyCode[KeyCode["END"] = 35] = "END";
	    KeyCode[KeyCode["HOME"] = 36] = "HOME";
	    KeyCode[KeyCode["LEFT_ARROW"] = 37] = "LEFT_ARROW";
	    KeyCode[KeyCode["UP_ARROW"] = 38] = "UP_ARROW";
	    KeyCode[KeyCode["RIGHT_ARROW"] = 39] = "RIGHT_ARROW";
	    KeyCode[KeyCode["DOWN_ARROW"] = 40] = "DOWN_ARROW";
	    KeyCode[KeyCode["INSERT"] = 45] = "INSERT";
	    KeyCode[KeyCode["DELETE"] = 46] = "DELETE";
	    KeyCode[KeyCode["KEY_0"] = 48] = "KEY_0";
	    KeyCode[KeyCode["KEY_1"] = 49] = "KEY_1";
	    KeyCode[KeyCode["KEY_2"] = 50] = "KEY_2";
	    KeyCode[KeyCode["KEY_3"] = 51] = "KEY_3";
	    KeyCode[KeyCode["KEY_4"] = 52] = "KEY_4";
	    KeyCode[KeyCode["KEY_5"] = 53] = "KEY_5";
	    KeyCode[KeyCode["KEY_6"] = 54] = "KEY_6";
	    KeyCode[KeyCode["KEY_7"] = 55] = "KEY_7";
	    KeyCode[KeyCode["KEY_8"] = 56] = "KEY_8";
	    KeyCode[KeyCode["KEY_9"] = 57] = "KEY_9";
	    KeyCode[KeyCode["KEY_A"] = 65] = "KEY_A";
	    KeyCode[KeyCode["KEY_B"] = 66] = "KEY_B";
	    KeyCode[KeyCode["KEY_C"] = 67] = "KEY_C";
	    KeyCode[KeyCode["KEY_D"] = 68] = "KEY_D";
	    KeyCode[KeyCode["KEY_E"] = 69] = "KEY_E";
	    KeyCode[KeyCode["KEY_F"] = 70] = "KEY_F";
	    KeyCode[KeyCode["KEY_G"] = 71] = "KEY_G";
	    KeyCode[KeyCode["KEY_H"] = 72] = "KEY_H";
	    KeyCode[KeyCode["KEY_I"] = 73] = "KEY_I";
	    KeyCode[KeyCode["KEY_J"] = 74] = "KEY_J";
	    KeyCode[KeyCode["KEY_K"] = 75] = "KEY_K";
	    KeyCode[KeyCode["KEY_L"] = 76] = "KEY_L";
	    KeyCode[KeyCode["KEY_M"] = 77] = "KEY_M";
	    KeyCode[KeyCode["KEY_N"] = 78] = "KEY_N";
	    KeyCode[KeyCode["KEY_O"] = 79] = "KEY_O";
	    KeyCode[KeyCode["KEY_P"] = 80] = "KEY_P";
	    KeyCode[KeyCode["KEY_Q"] = 81] = "KEY_Q";
	    KeyCode[KeyCode["KEY_R"] = 82] = "KEY_R";
	    KeyCode[KeyCode["KEY_S"] = 83] = "KEY_S";
	    KeyCode[KeyCode["KEY_T"] = 84] = "KEY_T";
	    KeyCode[KeyCode["KEY_U"] = 85] = "KEY_U";
	    KeyCode[KeyCode["KEY_V"] = 86] = "KEY_V";
	    KeyCode[KeyCode["KEY_W"] = 87] = "KEY_W";
	    KeyCode[KeyCode["KEY_X"] = 88] = "KEY_X";
	    KeyCode[KeyCode["KEY_Y"] = 89] = "KEY_Y";
	    KeyCode[KeyCode["KEY_Z"] = 90] = "KEY_Z";
	    KeyCode[KeyCode["LEFT_META"] = 91] = "LEFT_META";
	    KeyCode[KeyCode["RIGHT_META"] = 92] = "RIGHT_META";
	    KeyCode[KeyCode["SELECT"] = 93] = "SELECT";
	    KeyCode[KeyCode["NUMPAD_0"] = 96] = "NUMPAD_0";
	    KeyCode[KeyCode["NUMPAD_1"] = 97] = "NUMPAD_1";
	    KeyCode[KeyCode["NUMPAD_2"] = 98] = "NUMPAD_2";
	    KeyCode[KeyCode["NUMPAD_3"] = 99] = "NUMPAD_3";
	    KeyCode[KeyCode["NUMPAD_4"] = 100] = "NUMPAD_4";
	    KeyCode[KeyCode["NUMPAD_5"] = 101] = "NUMPAD_5";
	    KeyCode[KeyCode["NUMPAD_6"] = 102] = "NUMPAD_6";
	    KeyCode[KeyCode["NUMPAD_7"] = 103] = "NUMPAD_7";
	    KeyCode[KeyCode["NUMPAD_8"] = 104] = "NUMPAD_8";
	    KeyCode[KeyCode["NUMPAD_9"] = 105] = "NUMPAD_9";
	    KeyCode[KeyCode["MULTIPLY"] = 106] = "MULTIPLY";
	    KeyCode[KeyCode["ADD"] = 107] = "ADD";
	    KeyCode[KeyCode["SUBTRACT"] = 109] = "SUBTRACT";
	    KeyCode[KeyCode["DECIMAL"] = 110] = "DECIMAL";
	    KeyCode[KeyCode["DIVIDE"] = 111] = "DIVIDE";
	    KeyCode[KeyCode["F1"] = 112] = "F1";
	    KeyCode[KeyCode["F2"] = 113] = "F2";
	    KeyCode[KeyCode["F3"] = 114] = "F3";
	    KeyCode[KeyCode["F4"] = 115] = "F4";
	    KeyCode[KeyCode["F5"] = 116] = "F5";
	    KeyCode[KeyCode["F6"] = 117] = "F6";
	    KeyCode[KeyCode["F7"] = 118] = "F7";
	    KeyCode[KeyCode["F8"] = 119] = "F8";
	    KeyCode[KeyCode["F9"] = 120] = "F9";
	    KeyCode[KeyCode["F10"] = 121] = "F10";
	    KeyCode[KeyCode["F11"] = 122] = "F11";
	    KeyCode[KeyCode["F12"] = 123] = "F12";
	    KeyCode[KeyCode["NUM_LOCK"] = 144] = "NUM_LOCK";
	    KeyCode[KeyCode["SCROLL_LOCK"] = 145] = "SCROLL_LOCK";
	    KeyCode[KeyCode["SEMICOLON"] = 186] = "SEMICOLON";
	    KeyCode[KeyCode["EQUALS"] = 187] = "EQUALS";
	    KeyCode[KeyCode["COMMA"] = 188] = "COMMA";
	    KeyCode[KeyCode["DASH"] = 189] = "DASH";
	    KeyCode[KeyCode["PERIOD"] = 190] = "PERIOD";
	    KeyCode[KeyCode["FORWARD_SLASH"] = 191] = "FORWARD_SLASH";
	    KeyCode[KeyCode["GRAVE_ACCENT"] = 192] = "GRAVE_ACCENT";
	    KeyCode[KeyCode["OPEN_BRACKET"] = 219] = "OPEN_BRACKET";
	    KeyCode[KeyCode["BACK_SLASH"] = 220] = "BACK_SLASH";
	    KeyCode[KeyCode["CLOSE_BRACKET"] = 221] = "CLOSE_BRACKET";
	    KeyCode[KeyCode["SINGLE_QUOTE"] = 222] = "SINGLE_QUOTE";
	})(exports.KeyCode || (exports.KeyCode = {}));
	var KeyCode = exports.KeyCode;
	;


/***/ }
/******/ ]);