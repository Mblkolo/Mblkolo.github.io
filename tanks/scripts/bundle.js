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
	context.fillStyle = "#fff";
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
	        this.shot = false;
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
	//setInterval(() => {
	//    const t = timeout / 1000;
	//    let a = 3 - tank.velosity ;
	//    if (tank.isRun == false) {
	//        a = - 5*tank.velosity;
	//    }
	//    if (tank.rotateLeft)
	//        tank.rotation += 0.1;
	//    if (tank.rotateRight)
	//        tank.rotation -= 0.1;
	//    if (tank.turret.rotateLeft)
	//        tank.turret.rotation += 0.1;
	//    if (tank.turret.rotateRight)
	//        tank.turret.rotation -= 0.1;
	//    tank.velosity = tank.velosity + a * t;
	//    let deltaPos = tank.velosity + a * t * t / 2;
	//    tank.yPos = tank.yPos + deltaPos * Math.cos(tank.rotation);
	//    tank.xPos = tank.xPos + deltaPos * Math.sin(tank.rotation);
	//    Clear();
	//    DrawTank(tank);
	//}, timeout);
	document.addEventListener("keydown", function (e) {
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
	    if (e.keyCode === key_code_1.KeyCode.SPACE && e.repeat === false)
	        tank.turret.shot = true;
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
	var tankGroup = 2;
	var anotherGroup = 1;
	var world = new p2.World({
	    gravity: [0, 0]
	});
	var tankShape = new p2.Box({ width: 5, height: 10 });
	var gunpointShape = new p2.Box({ width: 1, height: 7 });
	tankShape.collisionGroup = tankGroup;
	var tankBody = new p2.Body({ mass: 1, position: [10, 5] });
	tankBody.angularDamping = 0.9;
	tankBody.damping = 0.8;
	tankBody.addShape(tankShape);
	tankBody.addShape(gunpointShape, [0, 3.5]);
	var wallShape = new p2.Box({ width: 50, height: 10 });
	wallShape.collisionMask = tankGroup | anotherGroup;
	var wallBody = new p2.Body({ mass: 0, position: [20, 40] });
	wallBody.addShape(wallShape);
	var enemyShape = new p2.Box({ width: 5, height: 10 });
	enemyShape.collisionMask = tankGroup | anotherGroup;
	var enemyBody = new p2.Body({ mass: 1, position: [100, 50] });
	enemyBody.angularDamping = 0.9;
	enemyBody.damping = 0.8;
	enemyBody.addShape(enemyShape);
	world.addBody(tankBody);
	world.addBody(wallBody);
	world.addBody(enemyBody);
	var ray = new p2.Ray({
	    mode: p2.Ray.ANY,
	    from: [10, 15],
	    to: [10, 355],
	});
	var result = new p2.RaycastResult();
	var timeStep = 30;
	setInterval(function () {
	    world.step(timeStep / 1000);
	    if (tank.turret.shot) {
	        tank.turret.shot = false;
	        tankBody.applyImpulseLocal([-gunpointShape.position[0] * 3, -gunpointShape.position[1] * 3]);
	        var out = [0, 0];
	        tankBody.vectorToWorldFrame(out, gunpointShape.position);
	        ray.from = [out[0] * 3 + tankBody.position[0], out[1] * 3 + tankBody.position[1]];
	        ray.to = [out[0] * 100 + tankBody.position[0], out[1] * 100 + tankBody.position[1]];
	        ray.update();
	        console.log(ray.direction);
	        result.reset();
	        if (world.raycast(result, ray)) {
	            var hitPoint = [0, 0];
	            result.getHitPoint(hitPoint, ray);
	            console.log(hitPoint);
	            result.body.applyImpulse(out); //, hitPoint);
	        }
	    }
	    if (tank.isRun) {
	        tankBody.applyForceLocal([0, 50]);
	    }
	    var rotationForce = 200;
	    var ratation = (tank.rotateLeft ? -1 : 0) + (tank.rotateRight ? 1 : 0);
	    tankBody.angularForce = ratation * 100;
	    if (tank.turret.rotateLeft) {
	        gunpointShape.angle += Math.PI / 1000 * timeStep;
	    }
	    if (tank.turret.rotateRight) {
	        gunpointShape.angle -= Math.PI / 1000 * timeStep;
	    }
	    gunpointShape.position[0] = Math.sin(gunpointShape.angle) * 3.5;
	    gunpointShape.position[1] = Math.cos(gunpointShape.angle) * 3.5;
	    var vel = tankBody.velocity;
	    var v = [0, 0];
	    tankBody.vectorToLocalFrame(v, vel);
	    tankBody.applyForceLocal([-v[0] * 10, 0]); //коэффициент бокового сопротивления
	    //tankBody.applyForceLocal([0, -v[1]]);
	    Clear();
	    drawBox(tankBody);
	    drawBox(wallBody);
	    drawBox(enemyBody);
	    drawRay(ray);
	}, timeStep);
	var scale = 4;
	function drawRay(ray) {
	    context.setTransform(1, 0, 0, 1, 0, 0);
	    context.beginPath();
	    context.moveTo(ray.from[0] * scale, ray.from[1] * scale);
	    context.lineTo(ray.to[0] * scale, ray.to[1] * scale);
	    context.stroke();
	}
	function drawBox(boxBody) {
	    var pos = boxBody.position;
	    var angle = -boxBody.angle;
	    var m = matrix_1.Matrix.Multiply(matrix_1.Matrix.Rotation(angle), matrix_1.Matrix.Translation(pos[0] * scale, pos[1] * scale));
	    for (var i = 0; i < boxBody.shapes.length; ++i) {
	        var shape = boxBody.shapes[i];
	        var width = shape.width;
	        var height = shape.height;
	        var m2 = matrix_1.Matrix.Multiply(matrix_1.Matrix.Rotation(shape.angle), matrix_1.Matrix.Translation(shape.position[0] * scale, shape.position[1] * scale));
	        updateTransform(matrix_1.Matrix.Multiply(m2, m));
	        context.fillRect(-width / 2 * scale, -height / 2 * scale, width * scale, height * scale);
	        context.beginPath();
	        context.rect(-width / 2 * scale, -height / 2 * scale, width * scale, height * scale);
	        context.stroke();
	    }
	}


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