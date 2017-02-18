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

	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	ctx.strokeRect(0, 0, canvas.width, canvas.height);
	var size = {
	    x: 10,
	    y: 8,
	    z: 6
	};
	var field = [];
	for (var x = 0; x < size.x * 2 + 1; ++x) {
	    var paneY = [];
	    for (var y = 0; y < size.y * 2 + 1; ++y) {
	        var lineZ = [];
	        for (var z = 0; z < size.z * 2 + 1; ++z) {
	            lineZ[z] = 0;
	        }
	        paneY[y] = lineZ;
	    }
	    field[x] = paneY;
	}
	var pos = { x: 0, y: 0, z: 0 };
	var directions = [
	    { x: 1, y: 0, z: 0 },
	    { x: -1, y: 0, z: 0 },
	    { x: 0, y: 1, z: 0 },
	    { x: 0, y: -1, z: 0 },
	    { x: 0, y: 0, z: -1 },
	    { x: 0, y: 0, z: 1 }
	];
	field[1][1][1] = 1;
	for (var i = 0; i < 1000; ++i) {
	    var d = directions[Math.floor(Math.random() * directions.length)];
	    var newPos = {
	        x: pos.x + d.x,
	        y: pos.y + d.y,
	        z: pos.z + d.z
	    };
	    if (newPos.x < 0 || newPos.x >= size.x ||
	        newPos.y < 0 || newPos.y >= size.y ||
	        newPos.z < 0 || newPos.z >= size.z)
	        continue;
	    if (field[newPos.x * 2 + 1][newPos.y * 2 + 1][newPos.z * 2 + 1] === 0) {
	        field[pos.x * 2 + 1 + d.x][pos.y * 2 + 1 + d.y][pos.z * 2 + 1 + d.z] = 1;
	        field[pos.x * 2 + 1 + 2 * d.x][pos.y * 2 + 1 + 2 * d.y][pos.z * 2 + 1 + 2 * d.z] = 1;
	    }
	    pos = newPos;
	}
	var playerPos = { x: 1, y: 1, z: 1, pane: "xy" };
	var offset = { x: 0, y: 0 };
	var Slice = (function () {
	    function Slice() {
	    }
	    Slice.move = {
	        xy: {
	            "w": { x: 0, y: -1, z: 0 },
	            "a": { x: -1, y: 0, z: 0 },
	            "s": { x: 0, y: 1, z: 0 },
	            "d": { x: 1, y: 0, z: 0 }
	        },
	        yx: {
	            "w": { x: -1, y: 0, z: 0 },
	            "a": { x: 0, y: -1, z: 0 },
	            "s": { x: 1, y: 0, z: 0 },
	            "d": { x: 0, y: 1, z: 0 }
	        },
	        yz: {
	            "w": { x: 0, y: 0, z: -1 },
	            "a": { x: 0, y: -1, z: 0 },
	            "s": { x: 0, y: 0, z: 1 },
	            "d": { x: 0, y: 1, z: 0 }
	        },
	        zy: {
	            "w": { x: 0, y: -1, z: 0 },
	            "a": { x: 0, y: 0, z: -1 },
	            "s": { x: 0, y: 1, z: 0 },
	            "d": { x: 0, y: 0, z: 1 }
	        },
	        zx: {
	            "w": { x: -1, y: 0, z: 0 },
	            "a": { x: 0, y: 0, z: -1 },
	            "s": { x: 1, y: 0, z: 0 },
	            "d": { x: 0, y: 0, z: 1 }
	        },
	        xz: {
	            "w": { x: 0, y: 0, z: -1 },
	            "a": { x: -1, y: 0, z: 0 },
	            "s": { x: 0, y: 0, z: 1 },
	            "d": { x: 1, y: 0, z: 0 }
	        }
	    };
	    Slice.xRotate = {
	        xy: "xz",
	        xz: "xy",
	        yx: "yz",
	        yz: "yx",
	        zx: "zy",
	        zy: "zx"
	    };
	    Slice.yRotate = {
	        xy: "zy",
	        zy: "xy",
	        yx: "zx",
	        zx: "yx",
	        xz: "yz",
	        yz: "xz"
	    };
	    Slice.xLength = {
	        xy: function () { return size.x; },
	        yx: function () { return size.y; },
	        yz: function () { return size.y; },
	        zy: function () { return size.z; },
	        zx: function () { return size.z; },
	        xz: function () { return size.x; }
	    };
	    Slice.yLength = {
	        xy: function () { return size.y; },
	        yx: function () { return size.x; },
	        yz: function () { return size.z; },
	        zy: function () { return size.y; },
	        zx: function () { return size.x; },
	        xz: function () { return size.z; }
	    };
	    Slice.slice = {
	        xy: function (x, y) { return field[x][y][playerPos.z]; },
	        yx: function (x, y) { return field[y][x][playerPos.z]; },
	        yz: function (x, y) { return field[playerPos.x][x][y]; },
	        zy: function (x, y) { return field[playerPos.x][y][x]; },
	        zx: function (x, y) { return field[y][playerPos.y][x]; },
	        xz: function (x, y) { return field[x][playerPos.y][y]; }
	    };
	    Slice.playerToStreen = {
	        xy: function () { return { x: playerPos.x, y: playerPos.y }; },
	        yx: function () { return { x: playerPos.y, y: playerPos.x }; },
	        yz: function () { return { x: playerPos.y, y: playerPos.z }; },
	        zy: function () { return { x: playerPos.z, y: playerPos.y }; },
	        zx: function () { return { x: playerPos.z, y: playerPos.x }; },
	        xz: function () { return { x: playerPos.x, y: playerPos.z }; }
	    };
	    return Slice;
	}());
	function draw() {
	    console.log(playerPos.pane);
	    ctx.clearRect(0, 0, canvas.width, canvas.height);
	    ctx.strokeRect(0, 0, canvas.width, canvas.height);
	    var cellSize = 20;
	    for (var x = 0; x < Slice.xLength[playerPos.pane]() * 2 + 1; ++x) {
	        var yLine = field[x];
	        for (var y = 0; y < Slice.yLength[playerPos.pane]() * 2 + 1; ++y) {
	            var color = Slice.slice[playerPos.pane](x, y) === 0 ? '#000' : '#aaa';
	            ctx.fillStyle = color;
	            ctx.fillRect((x + offset.x) * cellSize, (y + offset.y) * cellSize, cellSize, cellSize);
	        }
	    }
	    ctx.fillStyle = "red";
	    var pos = Slice.playerToStreen[playerPos.pane]();
	    ctx.fillRect((pos.x + offset.x) * cellSize, (pos.y + offset.y) * cellSize, cellSize, cellSize);
	}
	document.addEventListener("keypress", function (e) {
	    if (e.key === "q") {
	        var pos_1 = Slice.playerToStreen[playerPos.pane]();
	        playerPos.pane = Slice.xRotate[playerPos.pane];
	        var newPos = Slice.playerToStreen[playerPos.pane]();
	        offset.y += pos_1.y - newPos.y;
	    }
	    if (e.key === "e") {
	        var pos_2 = Slice.playerToStreen[playerPos.pane]();
	        playerPos.pane = Slice.yRotate[playerPos.pane];
	        var newPos = Slice.playerToStreen[playerPos.pane]();
	        offset.x += pos_2.x - newPos.x;
	    }
	    var m = Slice.move[playerPos.pane][e.key];
	    if (m != null && field[playerPos.x + m.x][playerPos.y + m.y][playerPos.z + m.z] === 1) {
	        playerPos.x += m.x;
	        playerPos.y += m.y;
	        playerPos.z += m.z;
	    }
	    draw();
	});
	draw();


/***/ }
/******/ ]);