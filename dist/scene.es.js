import * as PIXI from 'pixi.js';
import { Loader, Ticker, Graphics, Container, Application } from 'pixi.js';
import Event from 'eventemitter3';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var ResourceLoader = {
    add: function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!Loader.shared.resources[args[0]])
            (_a = Loader.shared).add.apply(_a, args);
    },
    Load: function (images, options) {
        var _this = this;
        Object.keys(images).map(function (key) {
            var isImage = /\.(svg|png|gif|jpe?g)/.test(images[key]);
            var isJSON = /\.(json)/.test(images[key]) || Array.isArray(images[key]);
            var args = [key, images[key]];
            var setting = __assign({}, options);
            if (Array.isArray(images[key])) {
                var image = images[key].find(function (item) { return /\.(svg|png|gif|jpe?g)/.test(item); });
                var json = images[key].find(function (item) { return /\.(json)/.test(item); });
                if (image && json) {
                    args[1] = json;
                    setting.metadata = {
                        jsonImage: image,
                    };
                }
            }
            if (isImage || isJSON)
                args.push(setting);
            _this.add.apply(_this, args);
        });
    },
    onLoaded: function (onLoaded) {
        if (onLoaded === void 0) { onLoaded = function () { }; }
        Loader.shared.load(function () { return onLoaded(Loader.shared.resources); });
    },
};
var Resource = (function () {
    function Resource() {
    }
    Resource.use = function (resourceGetter) {
        this.resourceGetters.push(resourceGetter);
    };
    Resource.useLoad = function (resourceGetter) {
        this.resourceGetters.push(resourceGetter);
        console.warn("'Resource.useLoad()' will be deprecated in next major version, use 'Resource.use()' to instead.");
    };
    Resource.getLoad = function () {
        var fromObject = this.resourceGetters.filter(function (getter) { return typeof getter === 'object'; }).reduce(function (prev, current) { return Object.assign(prev, current); }, {});
        var fromClosure = this.resourceGetters.filter(function (getter) { return typeof getter === 'function'; }).reduce(function (prev, current) { return Object.assign(prev, current()); }, {});
        return Object.assign(fromObject, fromClosure);
    };
    Resource.optionSetting = function (options) {
        this.options = options;
    };
    Resource.Load = function (onLoaded) {
        if (onLoaded === void 0) { onLoaded = function () { }; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                ResourceLoader.Load(this.getLoad(), this.options);
                this.resourceGetters = [];
                this.state = 'Loading';
                return [2, new Promise(function (resolve) { return Loader.shared.load(function () {
                        _this.state = 'Loaded';
                        resolve(Loader.shared.resources);
                        onLoaded(Loader.shared.resources);
                        _this._onLoaded(Loader.shared.resources);
                    }); })];
            });
        });
    };
    Resource.onLoading = function (onLoading) {
        if (onLoading === void 0) { onLoading = function (percent, name, url) { }; }
        Loader.shared.on('progress', function (_, resource) { return onLoading(_.progress, resource.name, resource.url); });
    };
    Resource.onLoaded = function (onLoaded) {
        if (onLoaded === void 0) { onLoaded = function (resources) { }; }
        this._onLoaded = onLoaded;
    };
    Resource._onLoaded = function (resources) { };
    Resource.state = 'Loading';
    Resource.resourceGetters = [];
    return Resource;
}());

var Route = (function () {
    function Route() {
    }
    Route.push = function (scene) {
        this.scenes[scene.name] = scene;
    };
    Route.to = function (sceneName, query) {
        if (query === void 0) { query = {}; }
        if (!this.isScene(sceneName) || this.currentSceneName === sceneName)
            return;
        this.pendingSceneName = sceneName;
        this.query = query;
        this.history.push(sceneName);
        this.setCurrentScene(this.pendingSceneName);
    };
    Route.back = function (query) {
        if (query === void 0) { query = {}; }
        if (this.history.length <= 1)
            return;
        this.history.pop();
        this.to(this.history.pop(), query);
    };
    Route.getQuery = function (name) {
        if (name)
            return this.query[name];
        return this.query;
    };
    Route.update = function () {
        if (this.currentScene && this.currentScene.canUpdate) {
            this.currentScene.update();
        }
    };
    Route.setCurrentScene = function (pendingSceneName) {
        if (!this.isScene(pendingSceneName))
            return console.warn("Scene " + pendingSceneName + " is not exist.");
        this.game.stage.children.map(function (stage) { return stage.visible = false; });
        this.currentScene = this.scenes[pendingSceneName];
        this.currentScene.stage.visible = true;
        this.fetchNextScene();
        this.stateUpdate();
        this.onSceneChange();
    };
    Route.fetchNextScene = function () {
        var _this = this;
        var isExist = this.game.stage.children.find(function (stage) { return stage === _this.currentScene.stage; });
        if (isExist) {
            this.currentScene.onShow();
        }
        else {
            var beforeCreate = this.currentScene.beforeCreate();
            var isPromise_1 = beforeCreate instanceof Promise;
            if (isPromise_1) {
                this.beforeCreated = false;
                beforeCreate.then(function () {
                    _this.beforeCreated = true;
                    if (Resource.state === 'Loaded')
                        _this.currentScene.create();
                });
            }
            this.currentScene.stage.visible = true;
            this.game.stage.addChild(this.currentScene.stage);
            Resource.Load(function () {
                _this.currentScene.onLoaded(Loader.shared.resources);
                var canCreate = !isPromise_1 || (isPromise_1 && _this.beforeCreated);
                if (canCreate)
                    _this.currentScene.create();
                _this.currentScene.onShow();
            });
            Resource.onLoading(function (percent, name, url) { return _this.currentScene.onLoading(percent, name, url); });
            this.pendingSceneName = '';
        }
    };
    Route.onSceneChange = function () {
        var preScene = this.scenes[this.prevSceneName];
        if (preScene) {
            if (preScene.cleanStage) {
                preScene.destory();
                this.game.stage.removeChild(preScene.stage);
            }
            else {
                preScene.onHide();
            }
        }
    };
    Route.stateUpdate = function () {
        this.prevSceneName = this.currentSceneName;
        this.currentSceneName = this.currentScene.name;
    };
    Route.isScene = function (scene) {
        if (scene === void 0) { scene = ''; }
        return this.scenes[scene] !== undefined;
    };
    Route.scenes = {};
    Route.query = {};
    Route.history = [];
    Route.beforeCreated = false;
    return Route;
}());
Ticker.shared.add(function () { return Route.update(); });

function getView() {
    if (typeof canvas !== 'undefined') {
        return canvas;
    }
    else {
        var view = document.createElement('canvas');
        document.body.appendChild(view);
        return view;
    }
}
function remove(display) {
    display.children.map(function (item) { return remove(item); });
    display.removeChildren();
}
var ScreenSize = (function () {
    function ScreenSize() {
    }
    Object.defineProperty(ScreenSize, "width", {
        get: function () {
            return window.innerWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScreenSize, "height", {
        get: function () {
            return window.innerHeight;
        },
        enumerable: true,
        configurable: true
    });
    return ScreenSize;
}());
var shared = {};
function getType(target) {
    if (target['text']) {
        return 'Text';
    }
    else if (target['fill']) {
        return 'Graphics';
    }
    else if (target['animationSpeed']) {
        return 'AnimatedSprite';
    }
    else if (target['isSprite']) {
        return 'Sprite';
    }
    else {
        return 'Container';
    }
}

var Stage = (function (_super) {
    __extends(Stage, _super);
    function Stage(name) {
        var _this = _super.call(this) || this;
        _this.name = name;
        _this.isStage = true;
        _this.sortableChildren = true;
        _this.init();
        return _this;
    }
    Stage.prototype.init = function () {
        this.x = 0;
        this.y = 0;
        this.setSize();
    };
    Stage.prototype.setSize = function () {
        this.beginFill(0xffffff, 0);
        this.drawRect(0, 0, ScreenSize.width, ScreenSize.height);
        this.endFill();
    };
    Stage.prototype.onSceneChange = function () {
        this.init();
    };
    Stage.prototype.destory = function () {
        remove(this);
    };
    return Stage;
}(Graphics));

var Scene = (function () {
    function Scene(name) {
        this.Loader = ResourceLoader;
        this.name = name;
        this.canUpdate = false;
        this.ratios = this.game.PIXEL_RATIOS;
        this.stage = new Stage(name);
        Route.push(this);
    }
    Object.defineProperty(Scene.prototype, "ratio", {
        get: function () {
            return this.game.PIXEL_RATIO;
        },
        enumerable: true,
        configurable: true
    });
    Scene.prototype.Load = function () {
        Resource.Load();
    };
    Scene.prototype.onLoading = function () { };
    Scene.prototype.onLoaded = function () { };
    Scene.prototype.beforeCreate = function () { };
    Scene.prototype.create = function () { };
    Scene.prototype.onShow = function () { };
    Scene.prototype.onHide = function () { };
    Scene.prototype.switchTo = function (sceneName, query) {
        if (query === void 0) { query = {}; }
        Route.to(sceneName, query);
    };
    Scene.prototype.getQuery = function (name) {
        return Route.getQuery(name);
    };
    Scene.prototype.useUpdate = function () {
        this.canUpdate = true;
    };
    Scene.prototype.update = function () {
        if (!this.canUpdate)
            return;
    };
    Scene.prototype.destory = function () {
        this.canUpdate = false;
        this.stage.destory();
    };
    return Scene;
}());

function getGame() {
    return Scene.prototype.game;
}
function getStage() {
    return getGame().stage.children.find(function (stage) { return stage.name === Route.currentScene.name; });
}
var Component = (function (_super) {
    __extends(Component, _super);
    function Component() {
        var _this = _super.call(this) || this;
        _this.game = getGame();
        _this.stage = getStage();
        _this.stage.addChild(_this);
        _this.ratios = _this.game.PIXEL_RATIOS;
        return _this;
    }
    Object.defineProperty(Component.prototype, "ratio", {
        get: function () {
            return this.game.PIXEL_RATIO;
        },
        enumerable: true,
        configurable: true
    });
    return Component;
}(Container));
var SizeComponent = (function (_super) {
    __extends(SizeComponent, _super);
    function SizeComponent(x, y, width, height, radius, color, opacity) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (width === void 0) { width = ScreenSize.width; }
        if (height === void 0) { height = ScreenSize.height; }
        if (radius === void 0) { radius = 0; }
        if (color === void 0) { color = 0xffffff; }
        if (opacity === void 0) { opacity = 0; }
        var _this = _super.call(this) || this;
        _this.game = getGame();
        _this.stage = getStage();
        _this.color = 0xffffff;
        _this.opacity = 0;
        _this.frame = {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            radius: 0,
        };
        _this.stage.addChild(_this);
        _this.ratios = _this.game.PIXEL_RATIOS;
        _this.color = color;
        _this.opacity = opacity;
        _this.frame = { x: x, y: y, width: width, height: height, radius: radius };
        _this.beginFill(_this.color, _this.opacity);
        _this.drawRoundedRect(x, y, width, height, radius);
        _this.endFill();
        return _this;
    }
    Object.defineProperty(SizeComponent.prototype, "ratio", {
        get: function () {
            return this.game.PIXEL_RATIO;
        },
        enumerable: true,
        configurable: true
    });
    SizeComponent.prototype.setSize = function (width, height, radius) {
        if (width === void 0) { width = 0; }
        if (height === void 0) { height = 0; }
        if (radius === void 0) { radius = this.frame.radius; }
        this.clear();
        this.frame.width = width;
        this.frame.height = height;
        this.frame.radius = radius;
        var _a = this.frame, x = _a.x, y = _a.y;
        this.beginFill(this.color, this.opacity);
        this.drawRoundedRect(x, y, width, height, radius);
        this.endFill();
    };
    return SizeComponent;
}(Graphics));

var event = new Event();

function createScene(game, scenes) {
    var keys = Object.keys(scenes).map(function (key) { return key.toLowerCase(); });
    var values = Object.values(scenes);
    event.emit('created', { game: game });
    values.map(function (Scene, index) { return new Scene(keys[index]); });
    Route.game = game;
    Route.to(keys[0]);
}

var defaultConfigure = {
    backgroundColor: 0x000000,
    autoResize: true,
    width: ScreenSize.width,
    height: ScreenSize.height,
    UIWidth: ScreenSize.width,
    UIHeight: ScreenSize.height,
    resolution: devicePixelRatio,
};

function extendGame(_a, _b) {
    var Loader = _a.Loader;
    var game = _b.game;
    game.Loader = Loader;
    game.resources = Loader.shared.resources;
    Scene.prototype.game = game;
    var _c = game.configure, UIWidth = _c.UIWidth, UIHeight = _c.UIHeight;
    var width = game.view.width / game.configure.resolution;
    var height = game.view.height / game.configure.resolution;
    game.PIXEL_RATIOS = shared.PIXEL_RATIOS = { x: width / UIWidth, y: height / UIHeight };
    Object.defineProperty(game, 'PIXEL_RATIO', {
        get: function () {
            return UIWidth < UIHeight ? game.PIXEL_RATIOS.x : game.PIXEL_RATIOS.y;
        },
    });
}

function createGame(configure) {
    var view = configure.view;
    configure = Object.assign(defaultConfigure, configure);
    configure.view = view || getView();
    event.emit('beforeCreate', { PIXI: PIXI, Scene: Scene, Resource: Resource, ResourceLoader: ResourceLoader, Stage: Stage, Route: Route, Component: Component });
    var game = new Application(configure);
    game.configure = configure;
    extendGame(PIXI, { game: game });
    createScene(game, configure.scenes);
    return game;
}

function use(extendsions) {
    if (Array.isArray(extendsions)) {
        extendsions.map(function (extendsion) { return extendsion(event); });
    }
    else {
        if (typeof extendsions === 'function') {
            extendsions(event);
        }
        else {
            console.error("extendsion " + extendsions + " must be a function");
        }
    }
}

window.PIXI = PIXI;

export { Component, Resource, ResourceLoader, Route, Scene, SizeComponent, createGame, createScene, event, getGame, getStage, getType, shared, use };
//# sourceMappingURL=scene.es.js.map
