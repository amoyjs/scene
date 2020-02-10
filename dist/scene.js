(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('pixi.js')) :
    typeof define === 'function' && define.amd ? define(['exports', 'pixi.js'], factory) :
    (global = global || self, factory(global.SceneKit = {}, global.PIXI));
}(this, function (exports, PIXI) { 'use strict';

    var Route = /** @class */ (function () {
        function Route(game) {
            this.game = game;
            this.scenes = {};
            this.query = {};
        }
        Route.create = function (game) {
            if (!this.instance)
                this.instance = new Route(game);
            return this.instance;
        };
        Route.prototype.push = function (scene) {
            this.scenes[scene.name] = scene;
        };
        Route.prototype.to = function (sceneName, query) {
            if (query === void 0) { query = {}; }
            if (this.currentSceneName === sceneName)
                return false;
            if (this.isScene(sceneName)) {
                this.pendingSceneName = sceneName;
                this.query = query;
            }
        };
        Route.prototype.update = function () {
            if (this.pendingSceneName)
                this.setCurrentScene(this.pendingSceneName);
            if (this.currentScene && this.currentScene.canUpdate) {
                this.currentScene.update && this.currentScene.update();
            }
        };
        Route.prototype.setCurrentScene = function (pendingSceneName) {
            if (!this.isScene(pendingSceneName)) {
                console.warn("\u573A\u666F " + pendingSceneName + " \u4E0D\u5B58\u5728");
                return false;
            }
            if (this.currentSceneName !== this.pendingSceneName) {
                this.currentScene = this.scenes[pendingSceneName];
                this.cleanStage();
                this.fetchNextScene();
                this.stateUpdate();
                this.onSceneChange();
            }
        };
        Route.prototype.cleanStage = function () {
            this.game.stage.removeChildren();
        };
        Route.prototype.fetchNextScene = function () {
            var _this = this;
            this.game.stage.addChild(this.currentScene.stage);
            this.currentScene.Load();
            PIXI.Loader.shared.load(function () { return _this.currentScene.create(); });
            PIXI.Loader.shared.on('progress', function (_, resource) { return _this.currentScene.onLoading(_.progress, resource.name, resource.url); });
            this.pendingSceneName = null;
        };
        Route.prototype.stateUpdate = function () {
            this.prevSceneName = this.currentSceneName;
            this.currentSceneName = this.currentScene.name;
        };
        Route.prototype.onSceneChange = function () {
            if (this.prevSceneName) {
                var preScene = this.scenes[this.prevSceneName];
                preScene.shutdown();
                this.game.stage.removeChild(preScene.stage);
            }
            this.currentScene.stage.onSceneChange();
        };
        Route.prototype.isScene = function (scene) {
            if (scene === void 0) { scene = ''; }
            var hasScene = this.scenes[scene] !== undefined;
            return hasScene;
        };
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
        Resource.useLoad = function (resourceGetter) {
            this.resourceGetters.push(resourceGetter);
        };
        Resource.getLoad = function () {
            var fromObject = this.resourceGetters.filter(function (getter) { return typeof getter === 'object'; }).reduce(function (prev, current) { return Object.assign(prev, current); }, {});
            var fromClosure = this.resourceGetters.filter(function (getter) { return typeof getter === 'function'; }).reduce(function (prev, current) { return Object.assign(prev, current()); }, {});
            return Object.assign(fromObject, fromClosure);
        };
        Resource.Load = function (onLoaded) {
            if (onLoaded === void 0) { onLoaded = function () { }; }
            ResourceLoader.Load(this.getLoad());
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
    var ScreenSize = {
        width: window.screen.width,
        height: window.screen.height,
    };

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
        Stage.prototype.shutdown = function () {
            remove(this);
        };
        return Stage;
    }(PIXI.Graphics));

    var Scene = /** @class */ (function () {
        function Scene(name) {
            this.Loader = ResourceLoader;
            this.name = name;
            this.canUpdate = false;
            this.ratio = this.game.PIXEL_RATIO;
            this.ratios = this.game.PIXEL_RATIOS;
            this.stage = new Stage(name);
            // @ts-ignore
            this.route.push(this);
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
        Scene.useLoad = function (cb) {
            console.warn("Scene.useLoad() will be deprecated, please update to version \"@amoy/scene@0.4.34\" or later and use \"Resource.useLoad()\" to instead.");
            Resource.useLoad(cb);
        };
        Scene.prototype.switchTo = function (sceneName, query) {
            if (query === void 0) { query = {}; }
            this.route.to(sceneName, query);
        };
        Scene.prototype.getQuery = function (name) {
            if (name)
                return this.route.query[name];
            return this.route.query;
        };
        Scene.prototype.create = function () { };
        Scene.prototype.useUpdate = function () {
            this.canUpdate = true;
        };
        Scene.prototype.update = function () {
            if (!this.canUpdate)
                return false;
        };
        Scene.prototype.shutdown = function (cleanUp) {
            if (cleanUp === void 0) { cleanUp = true; }
            this.canUpdate = false;
            if (cleanUp) {
                this.stage.shutdown();
            }
        };
        Scene.addons = [];
        return Scene;
    }());

    function getGame() {
        return Scene.prototype.game;
    }
    function getStage() {
        return getGame().stage.children.find(function (stage) { return stage.name === Route.create(getGame()).currentScene.name; });
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
            if (width === void 0) { width = window.innerWidth; }
            if (height === void 0) { height = window.innerHeight; }
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
        width: window.innerWidth,
        height: window.innerHeight,
        UIWidth: window.innerWidth,
        UIHeight: window.innerHeight,
        resolution: devicePixelRatio,
    };

    function extendGame(_a, _b) {
        var Loader = _a.Loader;
        var game = _b.game;
        game.Loader = Loader;
        game.resources = Loader.shared.resources;
        Scene.prototype.game = game;
        Scene.prototype.route = Route.create(game);
        var _c = game.configure, UIWidth = _c.UIWidth, UIHeight = _c.UIHeight, width = _c.width, height = _c.height;
        // 竖屏应用，以宽为准；横屏应用，以高为准
        game.PIXEL_RATIO = UIWidth < UIHeight ? width / UIWidth : height / UIHeight;
        game.PIXEL_RATIOS = {
            x: width / UIWidth,
            y: height / UIHeight,
        };
    }

    var Game = PIXI.Application;
    function createGame(configure) {
        var view = configure.view;
        configure = Object.assign(defaultConfigure, configure);
        configure.view = view || getView();
        extensions.map(function (extension) { return extension(PIXI, { Scene: Scene, Resource: Resource, ResourceLoader: ResourceLoader, Stage: Stage, Route: Route }); });
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
    exports.use = use;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=scene.js.map
