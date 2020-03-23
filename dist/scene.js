(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('pixi.js')) :
    typeof define === 'function' && define.amd ? define(['exports', 'pixi.js'], factory) :
    (global = global || self, factory(global.SceneKit = {}, global.PIXI));
}(this, function (exports, PIXI) { 'use strict';

    var Route = /** @class */ (function () {
        function Route(game) {
            Route.game = game;
        }
        Route.create = function (game) {
            if (!this.instance)
                this.instance = new Route(game);
            return this.instance;
        };
        Route.push = function (scene) {
            Route.scenes[scene.name] = scene;
        };
        Route.to = function (sceneName, query) {
            if (query === void 0) { query = {}; }
            if (Route.currentSceneName === sceneName)
                return false;
            if (this.isScene(sceneName)) {
                Route.pendingSceneName = sceneName;
                this.query = query;
            }
        };
        Route.prototype.to = function (sceneName, query) {
            if (query === void 0) { query = {}; }
            if (Route.currentSceneName === sceneName)
                return false;
            if (Route.isScene(sceneName)) {
                Route.pendingSceneName = sceneName;
                Route.query = query;
            }
        };
        Route.prototype.update = function () {
            if (Route.pendingSceneName)
                this.setCurrentScene(Route.pendingSceneName);
            if (Route.currentScene && Route.currentScene.canUpdate) {
                Route.currentScene.update && Route.currentScene.update();
            }
        };
        Route.prototype.setCurrentScene = function (pendingSceneName) {
            if (!Route.isScene(pendingSceneName)) {
                console.warn("\u573A\u666F " + pendingSceneName + " \u4E0D\u5B58\u5728");
                return false;
            }
            if (Route.currentSceneName !== Route.pendingSceneName) {
                Route.currentScene = Route.scenes[pendingSceneName];
                this.cleanStage();
                this.fetchNextScene();
                this.stateUpdate();
                this.onSceneChange();
            }
        };
        Route.prototype.cleanStage = function () {
            Route.game.stage.removeChildren();
        };
        Route.prototype.fetchNextScene = function () {
            Route.game.stage.addChild(Route.currentScene.stage);
            Route.currentScene.Load();
            PIXI.Loader.shared.load(function () {
                Route.currentScene.onLoaded(PIXI.Loader.shared.resources);
                Route.currentScene.autoCreate && Route.currentScene.create();
            });
            PIXI.Loader.shared.on('progress', function (_, resource) { return Route.currentScene.onLoading(_.progress, resource.name, resource.url); });
            Route.pendingSceneName = null;
        };
        Route.prototype.stateUpdate = function () {
            Route.prevSceneName = Route.currentSceneName;
            Route.currentSceneName = Route.currentScene.name;
        };
        Route.prototype.onSceneChange = function () {
            if (Route.prevSceneName) {
                var preScene = Route.scenes[Route.prevSceneName];
                preScene.destory();
                Route.game.stage.removeChild(preScene.stage);
            }
            Route.currentScene.stage.onSceneChange();
        };
        Route.isScene = function (scene) {
            if (scene === void 0) { scene = ''; }
            var hasScene = Route.scenes[scene] !== undefined;
            return hasScene;
        };
        Route.scenes = {};
        Route.query = {};
        return Route;
    }());

    var ResourceLoader = {
        add: function () {
            var _a;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (!PIXI.Loader.shared.resources[args[0]])
                (_a = PIXI.Loader.shared).add.apply(_a, args);
        },
        Load: function (images) {
            var _this = this;
            Object.keys(images).map(function (key) { return _this.add(key, images[key]); });
        },
        onLoaded: function (onLoaded) {
            if (onLoaded === void 0) { onLoaded = function () { }; }
            PIXI.Loader.shared.load(function () { return onLoaded(PIXI.Loader.shared.resources); });
        },
    };
    var Resource = /** @class */ (function () {
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
        Resource.Load = function (onLoaded) {
            if (onLoaded === void 0) { onLoaded = function () { }; }
            ResourceLoader.Load(this.getLoad());
            // clean resource getters
            this.resourceGetters = [];
            PIXI.Loader.shared.load(function () { return onLoaded(PIXI.Loader.shared.resources); });
        };
        Resource.onLoading = function (onLoading) {
            if (onLoading === void 0) { onLoading = function (percent, name, url) { }; }
            PIXI.Loader.shared.on('progress', function (_, resource) { return onLoading(_.progress, resource.name, resource.url); });
        };
        Resource.resourceGetters = [];
        return Resource;
    }());

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
    var ScreenSize = /** @class */ (function () {
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

    var Stage = /** @class */ (function (_super) {
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
    }(PIXI.Graphics));

    var Scene = /** @class */ (function () {
        function Scene(name) {
            this.Loader = ResourceLoader;
            this.autoCreate = true;
            this.name = name;
            this.canUpdate = false;
            this.ratio = this.game.PIXEL_RATIO;
            this.ratios = this.game.PIXEL_RATIOS;
            this.stage = new Stage(name);
            // @ts-ignore
            Route.push(this);
        }
        Scene.use = function (addons) {
            var _this = this;
            if (Array.isArray(addons)) {
                addons.map(function (addon) { return _this.use(addon); });
            }
            else if (typeof addons === 'function') {
                this.addons.push(addons);
            }
            else {
                throw Error("Scene.use() expected a function.");
            }
        };
        Scene.prototype.Load = function () {
            Resource.Load();
        };
        Scene.prototype.onLoading = function () { };
        Scene.prototype.onLoaded = function () { };
        Scene.useLoad = function (cb) {
            console.warn("Scene.useLoad() will be deprecated, please update to version \"@amoy/scene@0.4.34\" or later and use \"Resource.useLoad()\" to instead.");
            Resource.useLoad(cb);
        };
        Scene.prototype.switchTo = function (sceneName, query) {
            if (query === void 0) { query = {}; }
            Route.to(sceneName, query);
        };
        Scene.prototype.getQuery = function (name) {
            if (name)
                return Route.query[name];
            return Route.query;
        };
        Scene.prototype.create = function () { };
        Scene.prototype.useUpdate = function () {
            this.canUpdate = true;
        };
        Scene.prototype.update = function () {
            if (!this.canUpdate)
                return false;
        };
        Scene.prototype.destory = function () {
            this.canUpdate = false;
            this.stage.destory();
        };
        Scene.addons = [];
        return Scene;
    }());

    function getGame() {
        return Scene.prototype.game;
    }
    function getStage() {
        return getGame().stage.children.find(function (stage) { return stage.name === Route.currentScene.name; });
    }
    var Component = /** @class */ (function (_super) {
        __extends(Component, _super);
        function Component() {
            var _this = _super.call(this) || this;
            _this.game = getGame();
            _this.stage = getStage();
            _this.stage.addChild(_this);
            _this.ratio = _this.game.PIXEL_RATIO;
            _this.ratios = _this.game.PIXEL_RATIOS;
            return _this;
        }
        return Component;
    }(PIXI.Container));
    var SizeComponent = /** @class */ (function (_super) {
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
            _this.ratio = _this.game.PIXEL_RATIO;
            _this.ratios = _this.game.PIXEL_RATIOS;
            _this.color = color;
            _this.opacity = opacity;
            _this.frame = { x: x, y: y, width: width, height: height, radius: radius };
            _this.beginFill(_this.color, _this.opacity);
            _this.drawRoundedRect(x, y, width, height, radius);
            _this.endFill();
            return _this;
        }
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
    }(PIXI.Graphics));

    var extensions = [];
    function use(extendsions) {
        if (Array.isArray(extendsions)) {
            extendsions.map(function (extendsion) { return extensions.push(extendsion); });
        }
        else {
            if (typeof extendsions === 'function') {
                extensions.push(extendsions);
            }
            else {
                console.error("extendsion " + extendsions + " must be a function");
            }
        }
    }

    function createScene(game, scenes) {
        var keys = Object.keys(scenes).map(function (key) { return key.toLowerCase(); });
        var values = Object.values(scenes);
        extensions.map(function (extension) { return extension(PIXI, { game: game, Scene: Scene, Resource: Resource, ResourceLoader: ResourceLoader, Stage: Stage, Route: Route }); });
        values.map(function (Scene, index) { return new Scene(keys[index]); });
        var route = Route.create(game);
        var name = keys[0];
        route.to(name);
        game.ticker.add(function () { return route.update(); });
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
        // 竖屏应用，以宽为准；横屏应用，以高为准
        game.PIXEL_RATIO = shared.PIXEL_RATIO = UIWidth < UIHeight ? width / UIWidth : height / UIHeight;
        game.PIXEL_RATIOS = shared.PIXEL_RATIOS = {
            x: width / UIWidth,
            y: height / UIHeight,
        };
    }

    var Game = PIXI.Application;
    function createGame(configure) {
        var view = configure.view;
        configure.width = ScreenSize.width;
        configure.height = ScreenSize.height;
        configure = Object.assign(defaultConfigure, configure);
        configure.view = view || getView();
        extensions.map(function (extension) { return extension(PIXI, { Scene: Scene, Resource: Resource, ResourceLoader: ResourceLoader, Stage: Stage, Route: Route, Component: Component }); });
        var game = new Game(configure);
        game.configure = configure;
        extendGame(PIXI, { game: game });
        createScene(game, configure.scenes);
        return game;
    }

    window.PIXI = PIXI;

    exports.Component = Component;
    exports.Resource = Resource;
    exports.ResourceLoader = ResourceLoader;
    exports.Route = Route;
    exports.Scene = Scene;
    exports.SizeComponent = SizeComponent;
    exports.createGame = createGame;
    exports.createScene = createScene;
    exports.getGame = getGame;
    exports.getStage = getStage;
    exports.shared = shared;
    exports.use = use;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=scene.js.map
