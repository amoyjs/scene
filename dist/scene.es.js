import * as PIXI from 'pixi.js';
import { Loader, Container, Application } from 'pixi.js';

var Scene = /** @class */ (function () {
    function Scene(name) {
        var _this = this;
        this.name = name;
        this.canUpdate = false;
        this.ratio = this.game.PIXEL_RATIO.x;
        this.ratios = this.game.PIXEL_RATIO;
        Scene.addons.map(function (addon) { return addon.call(_this); });
    }
    Scene.use = function (addons) {
        var _this = this;
        if (Array.isArray(addons)) {
            addons.map(function (addon) { return _this.use(addon); });
        }
        else {
            this.addons.push(addons);
        }
    };
    Object.defineProperty(Scene.prototype, "Loader", {
        get: function () {
            return {
                add: function () {
                    var _a;
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    if (!Loader.shared.resources[args[0]])
                        (_a = Loader.shared).add.apply(_a, args);
                },
                Load: function (images) {
                    var _this = this;
                    Object.keys(images).map(function (key) { return _this.add(key, images[key]); });
                },
                onLoaded: function (onLoaded) {
                    if (onLoaded === void 0) { onLoaded = function () { }; }
                    Loader.shared.load(function () { return onLoaded(); });
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    Scene.prototype.getLoad = function () {
        return Scene.resourceGetters.reduce(function (prev, current) {
            prev = Object.assign(prev, current());
            return prev;
        }, {});
    };
    Scene.useLoad = function (cb) {
        this.resourceGetters.push(cb);
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
    Scene.prototype.create = function () {
        // 
    };
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
    Scene.resourceGetters = [];
    return Scene;
}());

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
    Route.prototype.remove = function (scene) {
        if (typeof scene === 'string') {
            delete this.scenes[scene];
        }
        else if (scene instanceof Scene) {
            delete this.scenes[scene.name];
        }
        else {
            console.warn("\u9700\u8981\u79FB\u9664\u7684\u573A\u666F " + scene + " \u4E0D\u5B58\u5728");
        }
    };
    Route.prototype.start = function (sceneName, query) {
        if (sceneName === void 0) { sceneName = ''; }
        if (query === void 0) { query = {}; }
        this.to(sceneName, query);
    };
    Route.prototype.to = function (sceneName, query) {
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
        if (this.currentScene.Load && typeof this.currentScene.Load === 'function') {
            this.currentScene.Load(function () { return _this.currentScene.create(); });
        }
        else {
            this.currentScene.create();
        }
        // @ts-ignore
        if (this.currentScene.onLoading && typeof this.currentScene.onLoading === 'function') {
            Loader.shared.on('progress', function (_, resource) {
                // @ts-ignore
                _this.currentScene.onLoading(_.progress, resource.name, resource.url);
            });
        }
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
    Route.prototype.getCurrentScene = function () {
        return this.currentScene;
    };
    Route.prototype.getSceneByName = function (sceneName) {
        if (this.scenes[sceneName]) {
            return this.scenes[sceneName];
        }
        else {
            console.error("\u573A\u666F " + sceneName + " \u4E0D\u5B58\u5728");
        }
    };
    /**
     * 判断是否是合法的「场景」
     */
    Route.prototype.isScene = function (scene) {
        if (scene === void 0) { scene = ''; }
        var hasScene = this.scenes[scene] !== undefined;
        return hasScene;
    };
    Route.prototype.destroy = function () {
        this.game = null;
        this.scenes = {};
        this.pendingSceneName = null;
        this.currentSceneName = null;
        this.currentScene = null;
    };
    return Route;
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

var Stage = /** @class */ (function (_super) {
    __extends(Stage, _super);
    function Stage(scene) {
        var _this = _super.call(this) || this;
        _this.init();
        _this.scene = scene;
        _this.isWorld = true;
        _this.isStage = true;
        return _this;
    }
    Stage.prototype.init = function () {
        this.x = 0;
        this.y = 0;
    };
    Stage.prototype.onSceneChange = function () {
        this.init();
    };
    Stage.prototype.shutdown = function () {
        this.removeChildren();
    };
    return Stage;
}(Container));

Scene.use(function () {
    this.stage = new Stage(this);
    this.route = Route.create(this.game);
    this.route.push(this);
});
function useScene(game, scenes) {
    var keys = Object.keys(scenes);
    var values = Object.values(scenes);
    values.map(function (scene, index) {
        Scene.prototype.game = game;
        new scene(keys[index]);
    });
    var route = Route.create(game);
    route.start(keys[0]);
    game.ticker.add(function () { return route.update(); });
}

function getView() {
    // @ts-ignore
    if (typeof canvas !== 'undefined') {
        // @ts-ignore
        return canvas;
    }
    else {
        var view = document.createElement('canvas');
        document.body.appendChild(view);
        return view;
    }
}
function usesify(target) {
    return function use(addons) {
        if (Array.isArray(addons)) {
            addons.map(function (addon) { return use(addon); });
        }
        else {
            if (typeof addons === 'function') {
                addons(target);
            }
            else {
                console.error("addon " + addons + " must be a function");
            }
        }
    };
}

var defaultConfigure = {
    view: getView(),
    backgroundColor: 0x000000,
    autoResize: true,
    width: window.innerWidth,
    height: window.innerHeight
};

function createGame(configure) {
    configure = Object.assign(defaultConfigure, configure);
    var UIWidth = configure.UIWidth, UIHeight = configure.UIHeight, width = configure.width, height = configure.height, scenes = configure.scenes, beforeScene = configure.beforeScene, afterScene = configure.afterScene;
    var game = new Application(configure);
    game.renderer.resize(width, height);
    game.resources = Loader.shared.resources;
    // @ts-ignore
    game.Loader = Loader;
    if (UIWidth && UIHeight) {
        game.UI_DESIGN_RATIO = width / UIWidth;
        game.PIXEL_RATIO = {
            x: width / UIWidth,
            y: height / UIHeight
        };
    }
    else {
        console.warn("must specified both \"options.UIWidth\" and \"options.UIHeight\" in createGame(options), or you can not use \"game.PIXEL_RATIO\" correctly.");
    }
    useScene(game, scenes);
    return game;
}

var Component = /** @class */ (function (_super) {
    __extends(Component, _super);
    function Component() {
        var _this = _super.call(this) || this;
        _this.game = Scene.prototype.game;
        _this.stage = _this.game.stage;
        _this.stage.addChild(_this);
        _this.ratio = _this.game.PIXEL_RATIO.x;
        _this.ratios = _this.game.PIXEL_RATIO;
        return _this;
    }
    return Component;
}(Container));

function use(addons) {
    usesify(PIXI)(addons);
}

export { Component, Scene, createGame, use, useScene };
//# sourceMappingURL=scene.es.js.map
