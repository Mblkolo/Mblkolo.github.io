(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "../pkg/elementals.js":
/*!****************************!*\
  !*** ../pkg/elementals.js ***!
  \****************************/
/*! exports provided: __wbg_alert_1e0d59a2f8e0c23b, greet, Color, Game, World, Point, Enemy, __wbindgen_throw */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbg_alert_1e0d59a2f8e0c23b\", function() { return __wbg_alert_1e0d59a2f8e0c23b; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"greet\", function() { return greet; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Color\", function() { return Color; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Game\", function() { return Game; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"World\", function() { return World; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Point\", function() { return Point; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Enemy\", function() { return Enemy; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_throw\", function() { return __wbindgen_throw; });\n/* harmony import */ var _elementals_bg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./elementals_bg */ \"../pkg/elementals_bg.wasm\");\n/* tslint:disable */\n\n\nlet cachedTextDecoder = new TextDecoder('utf-8');\n\nlet cachegetUint8Memory = null;\nfunction getUint8Memory() {\n    if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== _elementals_bg__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer) {\n        cachegetUint8Memory = new Uint8Array(_elementals_bg__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer);\n    }\n    return cachegetUint8Memory;\n}\n\nfunction getStringFromWasm(ptr, len) {\n    return cachedTextDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));\n}\n\nfunction __wbg_alert_1e0d59a2f8e0c23b(arg0, arg1) {\n    let varg0 = getStringFromWasm(arg0, arg1);\n    alert(varg0);\n}\n/**\n* @returns {Point}\n*/\nfunction greet() {\n    return Point.__wrap(_elementals_bg__WEBPACK_IMPORTED_MODULE_0__[\"greet\"]());\n}\n\n/**\n*/\nconst Color = Object.freeze({ Green:1,Red:2,Blue:3, });\n\nlet cachedGlobalArgumentPtr = null;\nfunction globalArgumentPtr() {\n    if (cachedGlobalArgumentPtr === null) {\n        cachedGlobalArgumentPtr = _elementals_bg__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_global_argument_ptr\"]();\n    }\n    return cachedGlobalArgumentPtr;\n}\n\nlet cachegetUint32Memory = null;\nfunction getUint32Memory() {\n    if (cachegetUint32Memory === null || cachegetUint32Memory.buffer !== _elementals_bg__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer) {\n        cachegetUint32Memory = new Uint32Array(_elementals_bg__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer);\n    }\n    return cachegetUint32Memory;\n}\n\nfunction freeGame(ptr) {\n\n    _elementals_bg__WEBPACK_IMPORTED_MODULE_0__[\"__wbg_game_free\"](ptr);\n}\n/**\n*/\nclass Game {\n\n    free() {\n        const ptr = this.ptr;\n        this.ptr = 0;\n        freeGame(ptr);\n    }\n\n    /**\n    * @returns {}\n    */\n    constructor() {\n        this.ptr = _elementals_bg__WEBPACK_IMPORTED_MODULE_0__[\"game_new\"]();\n    }\n    /**\n    * @returns {void}\n    */\n    step() {\n        return _elementals_bg__WEBPACK_IMPORTED_MODULE_0__[\"game_step\"](this.ptr);\n    }\n    /**\n    * @param {number} arg0\n    * @param {number} arg1\n    * @returns {void}\n    */\n    set_player_direction(arg0, arg1) {\n        return _elementals_bg__WEBPACK_IMPORTED_MODULE_0__[\"game_set_player_direction\"](this.ptr, arg0, arg1);\n    }\n    /**\n    * @param {number} arg0\n    * @param {number} arg1\n    * @returns {void}\n    */\n    set_shoot_point(arg0, arg1) {\n        return _elementals_bg__WEBPACK_IMPORTED_MODULE_0__[\"game_set_shoot_point\"](this.ptr, arg0, arg1);\n    }\n    /**\n    * @param {boolean} arg0\n    * @returns {void}\n    */\n    set_shooting(arg0) {\n        return _elementals_bg__WEBPACK_IMPORTED_MODULE_0__[\"game_set_shooting\"](this.ptr, arg0);\n    }\n    /**\n    * @param {number} arg0\n    * @returns {void}\n    */\n    set_shoot_force(arg0) {\n        return _elementals_bg__WEBPACK_IMPORTED_MODULE_0__[\"game_set_shoot_force\"](this.ptr, arg0);\n    }\n    /**\n    * @returns {string}\n    */\n    get_player_pos() {\n        const retptr = globalArgumentPtr();\n        _elementals_bg__WEBPACK_IMPORTED_MODULE_0__[\"game_get_player_pos\"](retptr, this.ptr);\n        const mem = getUint32Memory();\n        const rustptr = mem[retptr / 4];\n        const rustlen = mem[retptr / 4 + 1];\n\n        const realRet = getStringFromWasm(rustptr, rustlen).slice();\n        _elementals_bg__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_free\"](rustptr, rustlen * 1);\n        return realRet;\n\n    }\n    /**\n    * @returns {string}\n    */\n    get_state() {\n        const retptr = globalArgumentPtr();\n        _elementals_bg__WEBPACK_IMPORTED_MODULE_0__[\"game_get_state\"](retptr, this.ptr);\n        const mem = getUint32Memory();\n        const rustptr = mem[retptr / 4];\n        const rustlen = mem[retptr / 4 + 1];\n\n        const realRet = getStringFromWasm(rustptr, rustlen).slice();\n        _elementals_bg__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_free\"](rustptr, rustlen * 1);\n        return realRet;\n\n    }\n}\n\nfunction freeWorld(ptr) {\n\n    _elementals_bg__WEBPACK_IMPORTED_MODULE_0__[\"__wbg_world_free\"](ptr);\n}\n/**\n*/\nclass World {\n\n    free() {\n        const ptr = this.ptr;\n        this.ptr = 0;\n        freeWorld(ptr);\n    }\n\n    /**\n    * @returns {}\n    */\n    constructor() {\n        this.ptr = _elementals_bg__WEBPACK_IMPORTED_MODULE_0__[\"world_new\"]();\n    }\n    /**\n    * @returns {void}\n    */\n    step() {\n        return _elementals_bg__WEBPACK_IMPORTED_MODULE_0__[\"world_step\"](this.ptr);\n    }\n    /**\n    * @param {number} arg0\n    * @param {number} arg1\n    * @returns {void}\n    */\n    set_player_pos(arg0, arg1) {\n        return _elementals_bg__WEBPACK_IMPORTED_MODULE_0__[\"world_set_player_pos\"](this.ptr, arg0, arg1);\n    }\n    /**\n    * @returns {Point}\n    */\n    get_player_pos() {\n        return Point.__wrap(_elementals_bg__WEBPACK_IMPORTED_MODULE_0__[\"world_get_player_pos\"](this.ptr));\n    }\n    /**\n    * @param {number} arg0\n    * @param {number} arg1\n    * @returns {void}\n    */\n    set_player_speed(arg0, arg1) {\n        return _elementals_bg__WEBPACK_IMPORTED_MODULE_0__[\"world_set_player_speed\"](this.ptr, arg0, arg1);\n    }\n    /**\n    * @param {number} arg0\n    * @param {number} arg1\n    * @returns {void}\n    */\n    set_gan_target(arg0, arg1) {\n        return _elementals_bg__WEBPACK_IMPORTED_MODULE_0__[\"world_set_gan_target\"](this.ptr, arg0, arg1);\n    }\n    /**\n    * @param {boolean} arg0\n    * @returns {void}\n    */\n    set_firing(arg0) {\n        return _elementals_bg__WEBPACK_IMPORTED_MODULE_0__[\"world_set_firing\"](this.ptr, arg0);\n    }\n    /**\n    * @returns {number}\n    */\n    enemies_count() {\n        return _elementals_bg__WEBPACK_IMPORTED_MODULE_0__[\"world_enemies_count\"](this.ptr);\n    }\n    /**\n    * @param {number} arg0\n    * @returns {Enemy}\n    */\n    enemy(arg0) {\n        return Enemy.__wrap(_elementals_bg__WEBPACK_IMPORTED_MODULE_0__[\"world_enemy\"](this.ptr, arg0));\n    }\n    /**\n    * @returns {Point}\n    */\n    latest_heat() {\n        return Point.__wrap(_elementals_bg__WEBPACK_IMPORTED_MODULE_0__[\"world_latest_heat\"](this.ptr));\n    }\n    /**\n    * @returns {number}\n    */\n    get_scope() {\n        return _elementals_bg__WEBPACK_IMPORTED_MODULE_0__[\"world_get_scope\"](this.ptr);\n    }\n}\n\nfunction freePoint(ptr) {\n\n    _elementals_bg__WEBPACK_IMPORTED_MODULE_0__[\"__wbg_point_free\"](ptr);\n}\n/**\n*/\nclass Point {\n\n    static __wrap(ptr) {\n        const obj = Object.create(Point.prototype);\n        obj.ptr = ptr;\n\n        return obj;\n    }\n\n    free() {\n        const ptr = this.ptr;\n        this.ptr = 0;\n        freePoint(ptr);\n    }\n\n    /**\n    * @returns {number}\n    */\n    get x() {\n        return _elementals_bg__WEBPACK_IMPORTED_MODULE_0__[\"__wbg_get_point_x\"](this.ptr);\n    }\n    set x(arg0) {\n        return _elementals_bg__WEBPACK_IMPORTED_MODULE_0__[\"__wbg_set_point_x\"](this.ptr, arg0);\n    }\n    /**\n    * @returns {number}\n    */\n    get y() {\n        return _elementals_bg__WEBPACK_IMPORTED_MODULE_0__[\"__wbg_get_point_y\"](this.ptr);\n    }\n    set y(arg0) {\n        return _elementals_bg__WEBPACK_IMPORTED_MODULE_0__[\"__wbg_set_point_y\"](this.ptr, arg0);\n    }\n}\n\nfunction freeEnemy(ptr) {\n\n    _elementals_bg__WEBPACK_IMPORTED_MODULE_0__[\"__wbg_enemy_free\"](ptr);\n}\n/**\n*/\nclass Enemy {\n\n    static __wrap(ptr) {\n        const obj = Object.create(Enemy.prototype);\n        obj.ptr = ptr;\n\n        return obj;\n    }\n\n    free() {\n        const ptr = this.ptr;\n        this.ptr = 0;\n        freeEnemy(ptr);\n    }\n\n    /**\n    * @returns {Point}\n    */\n    get pos() {\n        return Point.__wrap(_elementals_bg__WEBPACK_IMPORTED_MODULE_0__[\"__wbg_get_enemy_pos\"](this.ptr));\n    }\n    set pos(arg0) {\n        const ptr0 = arg0.ptr;\n        arg0.ptr = 0;\n        return _elementals_bg__WEBPACK_IMPORTED_MODULE_0__[\"__wbg_set_enemy_pos\"](this.ptr, ptr0);\n    }\n    /**\n    * @returns {number}\n    */\n    get color() {\n        return _elementals_bg__WEBPACK_IMPORTED_MODULE_0__[\"__wbg_get_enemy_color\"](this.ptr);\n    }\n    set color(arg0) {\n        return _elementals_bg__WEBPACK_IMPORTED_MODULE_0__[\"__wbg_set_enemy_color\"](this.ptr, arg0);\n    }\n}\n\nfunction __wbindgen_throw(ptr, len) {\n    throw new Error(getStringFromWasm(ptr, len));\n}\n\n\n\n//# sourceURL=webpack:///../pkg/elementals.js?");

/***/ }),

/***/ "../pkg/elementals_bg.wasm":
/*!*********************************!*\
  !*** ../pkg/elementals_bg.wasm ***!
  \*********************************/
/*! exports provided: memory, __wbindgen_global_argument_ptr, greet, __wbg_world_free, __wbg_enemy_free, __wbg_get_enemy_pos, __wbg_set_enemy_pos, __wbg_get_enemy_color, __wbg_set_enemy_color, __wbg_point_free, __wbg_get_point_x, __wbg_set_point_x, __wbg_get_point_y, __wbg_set_point_y, world_new, world_step, world_set_player_pos, world_get_player_pos, world_set_player_speed, world_set_gan_target, world_set_firing, world_enemies_count, world_enemy, world_latest_heat, world_get_scope, __wbg_game_free, game_new, game_step, game_set_player_direction, game_set_shoot_point, game_set_shooting, game_set_shoot_force, game_get_player_pos, game_get_state, __wbindgen_free */
/***/ (function(module, exports, __webpack_require__) {

eval("\"use strict\";\n// Instantiate WebAssembly module\nvar wasmExports = __webpack_require__.w[module.i];\n__webpack_require__.r(exports);\n// export exports from WebAssembly module\nfor(var name in wasmExports) if(name != \"__webpack_init__\") exports[name] = wasmExports[name];\n// exec imports from WebAssembly module (for esm order)\n/* harmony import */ var m0 = __webpack_require__(/*! ./elementals */ \"../pkg/elementals.js\");\n\n\n// exec wasm module\nwasmExports[\"__webpack_init__\"]()\n\n//# sourceURL=webpack:///../pkg/elementals_bg.wasm?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _pkg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../pkg */ \"../pkg/elementals.js\");\n/* harmony import */ var nipplejs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nipplejs */ \"./node_modules/nipplejs/dist/nipplejs.js\");\n/* harmony import */ var nipplejs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(nipplejs__WEBPACK_IMPORTED_MODULE_1__);\n\r\n\r\n\r\nconst game = new _pkg__WEBPACK_IMPORTED_MODULE_0__[\"Game\"]();\r\nconsole.log(game.get_state());\r\n\r\nconst CELL_SIZE = 20; // px\r\n\r\nconst canvas = document.getElementById(\"game-canvas\");\r\ncanvas.height = window.innerHeight;\r\ncanvas.width = window.innerWidth;\r\n\r\nconst debugEl = document.getElementById(\"debug\");\r\nfunction debug(info) {\r\n    debugEl.innerHTML = JSON.stringify(info, 0, 2);\r\n}\r\n\r\nvar isTouchDevice = \"ontouchstart\" in document.documentElement;\r\nif (isTouchDevice) {\r\n    // screen joysticks\r\n\r\n    const moveJoystick = nipplejs__WEBPACK_IMPORTED_MODULE_1___default.a.create({\r\n        zone: document.getElementById(\"left-joystick-zone\"),\r\n        color: \"blue\"\r\n    });\r\n\r\n    moveJoystick.on(\"end move\", (event, data) => {\r\n        if (event.type === \"end\") {\r\n            game.set_player_direction(0, 0);\r\n            return;\r\n        }\r\n\r\n        if (data.direction) {\r\n            let x = data.instance.frontPosition.x / 50;\r\n            let y = data.instance.frontPosition.y / 50;\r\n\r\n            game.set_player_direction(x, y);\r\n        }\r\n    });\r\n\r\n    const fireJoystick = nipplejs__WEBPACK_IMPORTED_MODULE_1___default.a.create({\r\n        zone: document.getElementById(\"right-joystick-zone\"),\r\n        color: \"red\"\r\n    });\r\n\r\n    const aimEl = document.getElementById(\"player-aim\");\r\n\r\n    fireJoystick.on(\"start end move\", (event, data) => {\r\n        switch (event.type) {\r\n            case \"start\":\r\n                game.set_shooting(true);\r\n                break;\r\n            case \"end\":\r\n                game.set_shooting(false);\r\n                break;\r\n            case \"move\":\r\n                if (data.direction) {\r\n                    const frontPosition = data.instance.frontPosition;\r\n\r\n                    const player = JSON.parse(game.get_player_pos());\r\n                    if (player == null) {\r\n                        break;\r\n                    }\r\n\r\n                    const aimPosX = player.x * CELL_SIZE + frontPosition.x;\r\n                    const aimPosY = player.y * CELL_SIZE + frontPosition.y;\r\n\r\n                    aimEl.style.left = `${aimPosX}px`;\r\n                    aimEl.style.top = `${aimPosY}px`;\r\n\r\n                    game.set_shoot_point(aimPosX / CELL_SIZE, aimPosY / CELL_SIZE);\r\n                }\r\n                break;\r\n\r\n            default:\r\n                break;\r\n        }\r\n    });\r\n}\r\n\r\n// mouse\r\n\r\ncanvas.addEventListener(\"mousemove\", event => {\r\n    game.set_shoot_point(event.offsetX / CELL_SIZE, event.offsetY / CELL_SIZE);\r\n});\r\n\r\ndocument.addEventListener(\"mousedown\", event => {\r\n    game.set_shooting(true);\r\n});\r\n\r\ndocument.addEventListener(\"mouseup\", event => {\r\n    game.set_shooting(false);\r\n});\r\n\r\n// keyboard\r\n\r\nconst player_speed = { x: 0, y: 0 };\r\n\r\ndocument.addEventListener(\"keydown\", event => {\r\n    if (event.code == \"KeyA\") player_speed.x = -1;\r\n    if (event.code == \"KeyD\") player_speed.x = +1;\r\n\r\n    if (event.code == \"KeyS\") player_speed.y = +1;\r\n    if (event.code == \"KeyW\") player_speed.y = -1;\r\n\r\n    game.set_player_direction(player_speed.x, player_speed.y);\r\n});\r\n\r\ndocument.addEventListener(\"keyup\", event => {\r\n    if (event.code == \"KeyA\" && player_speed.x == -1) player_speed.x = 0;\r\n    if (event.code == \"KeyD\" && player_speed.x == +1) player_speed.x = 0;\r\n\r\n    if (event.code == \"KeyS\" && player_speed.y == +1) player_speed.y = 0;\r\n    if (event.code == \"KeyW\" && player_speed.y == -1) player_speed.y = 0;\r\n\r\n    game.set_player_direction(player_speed.x, player_speed.y);\r\n});\r\n\r\nlet shoot_force = 1;\r\ngame.set_shoot_force(shoot_force);\r\n\r\ndocument.addEventListener(\"keypress\", event => {\r\n    if (event.code == \"Space\") {\r\n        shoot_force *= -1;\r\n        game.set_shoot_force(shoot_force);\r\n    }\r\n});\r\n\r\nconst ctx = canvas.getContext(\"2d\");\r\n\r\nfunction draw(state) {\r\n    ctx.clearRect(0, 0, canvas.width, canvas.height);\r\n    ctx.strokeRect(0, 0, 50 * CELL_SIZE, 40 * CELL_SIZE);\r\n\r\n    ctx.fillStyle = \"#000\";\r\n    console.log(state.scope);\r\n    ctx.fillText(state.scope.toString(), 50, 50);\r\n\r\n    ctx.strokeStyle = \"#000\";\r\n\r\n    for (let i = 0; i < state.enemies.length; ++i) {\r\n        const enemy = state.enemies[i];\r\n\r\n        ctx.fillStyle = \"#000\";\r\n        if (enemy.is_white) {\r\n            ctx.fillStyle = \"#fff\";\r\n        }\r\n\r\n        ctx.beginPath();\r\n        ctx.arc(enemy.x * CELL_SIZE, enemy.y * CELL_SIZE, CELL_SIZE * enemy.radius, 0, 2 * Math.PI);\r\n        ctx.fill();\r\n        ctx.stroke();\r\n    }\r\n\r\n    ctx.strokeStyle = \"#aaa\";\r\n    for (let i = 0; i < state.shots.length; ++i) {\r\n        const shot = state.shots[i];\r\n        ctx.beginPath();\r\n        ctx.moveTo(shot.from_x * CELL_SIZE, shot.from_y * CELL_SIZE);\r\n        ctx.lineTo(shot.to_x * CELL_SIZE, shot.to_y * CELL_SIZE);\r\n        ctx.stroke();\r\n    }\r\n\r\n    ctx.strokeStyle = \"#000\";\r\n\r\n    if (shoot_force > 0) ctx.fillStyle = \"#fff\";\r\n    else ctx.fillStyle = \"#000\";\r\n\r\n    const player = state.player;\r\n    if (player != null) {\r\n        ctx.beginPath();\r\n        ctx.arc(player.x * CELL_SIZE, player.y * CELL_SIZE, CELL_SIZE * player.radius, 0, 2 * Math.PI);\r\n        ctx.fill();\r\n        ctx.stroke();\r\n    }\r\n}\r\n\r\nsetInterval(() => {\r\n    const state = JSON.parse(game.get_state());\r\n    if (state.player == null) {\r\n        return;\r\n    }\r\n\r\n    draw(state);\r\n    game.step();\r\n}, 20);\r\n\n\n//# sourceURL=webpack:///./index.js?");

/***/ })

}]);