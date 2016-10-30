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
/***/ function(module, exports) {

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
	    }
	    return Tank;
	}());
	function DrawTank(tank) {
	    context.setTransform(1, 0, 0, 1, 0, 0);
	    //context.translate(0, 600);
	    context.translate(tank.xPos, tank.yPos);
	    context.rotate(-tank.rotation);
	    //context.transform(1, 0, 0, -1, 0, 600);
	    context.strokeStyle = "#000";
	    context.strokeRect(-10, -20, 20, 40);
	    //context.rect(0, 0, 10, 10);
	    //context.fillRect(0, 0, 10, 10);
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
	    tank.velosity = tank.velosity + a * t;
	    var deltaPos = tank.velosity + a * t * t / 2;
	    tank.yPos = tank.yPos + deltaPos * Math.cos(tank.rotation);
	    tank.xPos = tank.xPos + deltaPos * Math.sin(tank.rotation);
	    Clear();
	    DrawTank(tank);
	}, timeout);
	document.addEventListener("keydown", function (e) {
	    if (e.keyCode === 87)
	        tank.isRun = true;
	    if (e.key === "a")
	        tank.rotateLeft = true;
	    if (e.key === "d")
	        tank.rotateRight = true;
	});
	document.addEventListener("keyup", function (e) {
	    if (e.keyCode === 87)
	        tank.isRun = false;
	    if (e.key === "a")
	        tank.rotateLeft = false;
	    if (e.key === "d")
	        tank.rotateRight = false;
	});
	console.log(context);


/***/ }
/******/ ]);