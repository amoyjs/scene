(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('pixi.js')) :
    typeof define === 'function' && define.amd ? define(['exports', 'pixi.js'], factory) :
    (global = global || self, factory(global.SceneKit = {}, global.PIXI));
}(this, function (exports, PIXI) { 'use strict';

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
            PIXI.Loader.shared.load(function () { return onLoaded(); });
        }
    };
    var Resource = /** @class */ (function () {
        function Resource() {
        }
        Resource.useLoad = function (cb) {
            this.resourceGetters.push(cb);
        };
        Resource.getLoad = function () {
            return this.resourceGetters.reduce(function (prev, current) { return Object.assign(prev, current()); }, {});
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
        Route.prototype.destroy = function () {
            this.game = null;
            this.scenes = {};
            this.pendingSceneName = null;
            this.currentSceneName = null;
            this.currentScene = null;
        };
        return Route;
    }());

    var Scene = /** @class */ (function () {
        function Scene(name) {
            this.Loader = ResourceLoader;
            this.name = name;
            this.canUpdate = false;
            this.ratio = this.game.PIXEL_RATIO.x;
            this.ratios = this.game.PIXEL_RATIO;
            this.route.push(this);
        }
        Scene.use = function (addons) {
            var _this = this;
            if (Array.isArray(addons)) {
                addons.map(function (addon) { return _this.use(addon); });
            }
            else if (typeof addons === 'function') {
                addons.call(Scene.prototype);
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

    /*!
     * @pixi/unsafe-eval - v5.0.4
     * Compiled Fri, 07 Jun 2019 17:17:49 UTC
     *
     * @pixi/unsafe-eval is licensed under the MIT License.
     * http://www.opensource.org/licenses/mit-license
     */
    // cv = CachedValue
    // v = value
    // ud = uniformData
    // uv = uniformValue
    // l = location

    /* eslint-disable max-len */
    var GLSL_TO_SINGLE_SETTERS = {
        float: function float(gl, location, cv, v)
        {
            if (cv !== v)
            {
                cv.v = v;
                gl.uniform1f(location, v);
            }
        },
        vec2: function vec2(gl, location, cv, v)
        {
            if (cv[0] !== v[0] || cv[1] !== v[1])
            {
                cv[0] = v[0];
                cv[1] = v[1];
                gl.uniform2f(location, v[0], v[1]);
            }
        },
        vec3: function vec3(gl, location, cv, v)
        {
            if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2])
            {
                cv[0] = v[0];
                cv[1] = v[1];
                cv[2] = v[2];

                gl.uniform3f(location, v[0], v[1], v[2]);
            }
        },
        int: function int(gl, location, cv, value) { gl.uniform1i(location, value); },
        ivec2: function ivec2(gl, location, cv, value) { gl.uniform2i(location, value[0], value[1]); },
        ivec3: function ivec3(gl, location, cv, value) { gl.uniform3i(location, value[0], value[1], value[2]); },
        ivec4: function ivec4(gl, location, cv, value) { gl.uniform4i(location, value[0], value[1], value[2], value[3]); },

        bool: function bool(gl, location, cv, value) { gl.uniform1i(location, value); },
        bvec2: function bvec2(gl, location, cv, value) { gl.uniform2i(location, value[0], value[1]); },
        bvec3: function bvec3(gl, location, cv, value) { gl.uniform3i(location, value[0], value[1], value[2]); },
        bvec4: function bvec4(gl, location, cv, value) { gl.uniform4i(location, value[0], value[1], value[2], value[3]); },

        mat2: function mat2(gl, location, cv, value) { gl.uniformMatrix2fv(location, false, value); },
        mat3: function mat3(gl, location, cv, value) { gl.uniformMatrix3fv(location, false, value); },
        mat4: function mat4(gl, location, cv, value) { gl.uniformMatrix4fv(location, false, value); },

        sampler2D: function sampler2D(gl, location, cv, value) { gl.uniform1i(location, value); },
        samplerCube: function samplerCube(gl, location, cv, value) { gl.uniform1i(location, value); },
        sampler2DArray: function sampler2DArray(gl, location, cv, value) { gl.uniform1i(location, value); },
    };

    var GLSL_TO_ARRAY_SETTERS = {
        float: function float(gl, location, cv, value) { gl.uniform1fv(location, value); },
        vec2: function vec2(gl, location, cv, value) { gl.uniform2fv(location, value); },
        vec3: function vec3(gl, location, cv, value) { gl.uniform3fv(location, value); },
        vec4: function vec4(gl, location, cv, value) { gl.uniform4fv(location, value); },
        int: function int(gl, location, cv, value) { gl.uniform1iv(location, value); },
        ivec2: function ivec2(gl, location, cv, value) { gl.uniform2iv(location, value); },
        ivec3: function ivec3(gl, location, cv, value) { gl.uniform3iv(location, value); },
        ivec4: function ivec4(gl, location, cv, value) { gl.uniform4iv(location, value); },
        bool: function bool(gl, location, cv, value) { gl.uniform1iv(location, value); },
        bvec2: function bvec2(gl, location, cv, value) { gl.uniform2iv(location, value); },
        bvec3: function bvec3(gl, location, cv, value) { gl.uniform3iv(location, value); },
        bvec4: function bvec4(gl, location, cv, value) { gl.uniform4iv(location, value); },
        sampler2D: function sampler2D(gl, location, cv, value) { gl.uniform1iv(location, value); },
        samplerCube: function samplerCube(gl, location, cv, value) { gl.uniform1iv(location, value); },
        sampler2DArray: function sampler2DArray(gl, location, cv, value) { gl.uniform1iv(location, value); },
    };
    /* eslint-disable max-len */

    function syncUniforms(group, uniformData, ud, uv, renderer)
    {
        var textureCount = 0;
        var v = null;
        var cv = null;
        var gl = renderer.gl;

        for (var i in group.uniforms)
        {
            var data = uniformData[i];
            var uvi = uv[i];
            var udi = ud[i];
            var gu = group.uniforms[i];

            if (!data)
            {
                if (gu.group)
                {
                    renderer.shader.syncUniformGroup(uvi);
                }

                continue;
            }

            if (data.type === 'float' && data.size === 1)
            {
                if (uvi !== udi.value)
                {
                    udi.value = uvi;
                    gl.uniform1f(udi.location, uvi);
                }
            }
            /* eslint-disable max-len */
            else if ((data.type === 'sampler2D' || data.type === 'samplerCube' || data.type === 'sampler2DArray') && data.size === 1 && !data.isArray)
            /* eslint-disable max-len */
            {
                renderer.texture.bind(uvi, textureCount);

                if (udi.value !== textureCount)
                {
                    udi.value = textureCount;
                    gl.uniform1i(udi.location, textureCount);
                }

                textureCount++;
            }
            else if (data.type === 'mat3' && data.size === 1)
            {
                if (gu.a !== undefined)
                {
                    gl.uniformMatrix3fv(udi.location, false, uvi.toArray(true));
                }
                else
                {
                    gl.uniformMatrix3fv(udi.location, false, uvi);
                }
            }
            else if (data.type === 'vec2' && data.size === 1)
            {
                if (gu.x !== undefined)
                {
                    cv = udi.value;
                    v = uvi;

                    if (cv[0] !== v.x || cv[1] !== v.y)
                    {
                        cv[0] = v.x;
                        cv[1] = v.y;
                        gl.uniform2f(udi.location, v.x, v.y);
                    }
                }
                else
                {
                    cv = udi.value;
                    v = uvi;

                    if (cv[0] !== v[0] || cv[1] !== v[1])
                    {
                        cv[0] = v[0];
                        cv[1] = v[1];
                        gl.uniform2f(udi.location, v[0], v[1]);
                    }
                }
            }
            else if (data.type === 'vec4' && data.size === 1)
            {
                if (gu.width !== undefined)
                {
                    cv = udi.value;
                    v = uvi;

                    if (cv[0] !== v.x || cv[1] !== v.y || cv[2] !== v.width || cv[3] !== v.height)
                    {
                        cv[0] = v.x;
                        cv[1] = v.y;
                        cv[2] = v.width;
                        cv[3] = v.height;
                        gl.uniform4f(udi.location, v.x, v.y, v.width, v.height);
                    }
                }
                else
                {
                    cv = udi.value;
                    v = uvi;

                    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])
                    {
                        cv[0] = v[0];
                        cv[1] = v[1];
                        cv[2] = v[2];
                        cv[3] = v[3];

                        gl.uniform4f(udi.location, v[0], v[1], v[2], v[3]);
                    }
                }
            }
            else
            {
                var funcArray = (data.size === 1) ? GLSL_TO_SINGLE_SETTERS : GLSL_TO_ARRAY_SETTERS;

                funcArray[data.type].call(null, gl, udi.location, udi.value, uvi);
            }
        }
    }

    function install(PIXI)
    {
        if (!PIXI || !PIXI.systems || !PIXI.systems.ShaderSystem)
        {
            throw new Error('Unable to patch ShaderSystem, class not found.');
        }

        var ref = PIXI.systems;
        var ShaderSystem = ref.ShaderSystem;
        var proceed = false;

        // Do a quick check to see if the patch is needed
        // want to make sure we only apply if necessary!
        try
        {
            ShaderSystem.prototype.systemCheck.call(null);
            proceed = false;
        }
        catch (err)
        {
            proceed = true;
        }

        // Only apply if needed
        if (proceed)
        {
            Object.assign(ShaderSystem.prototype,
                {
                    systemCheck: function systemCheck()
                    {
                    // do nothing, don't throw error
                    },
                    syncUniforms: function syncUniforms$1(group, glProgram)
                    {
                        var ref = this;
                        var shader = ref.shader;
                        var renderer = ref.renderer;

                        /* eslint-disable max-len */
                        syncUniforms(
                            group,
                            shader.program.uniformData,
                            glProgram.uniformData,
                            group.uniforms,
                            renderer
                        );
                    /* eslint-disable max-len */
                    },
                }
            );
        }
    }

    function compatibleWeChatGame() {
        if (typeof eval !== 'function')
            install(PIXI);
        // @ts-ignore
        PIXI.Renderer.create = function (options) {
            return new PIXI.Renderer(options);
        };
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
    function remove(display) {
        display.children.map(function (item) { return remove(item); });
        display.removeChildren();
    }
    var ScreenSize = {
        width: window.innerWidth,
        height: window.innerHeight
    };

    var Stage = /** @class */ (function (_super) {
        __extends(Stage, _super);
        function Stage() {
            var _this = _super.call(this) || this;
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

    Scene.use(function () {
        this.stage = new Stage();
    });
    function useScene(game, scenes) {
        var keys = Object.keys(scenes).map(function (key) { return key.toLowerCase(); });
        var values = Object.values(scenes);
        var route = Route.create(game);
        Scene.prototype.game = game;
        Scene.prototype.route = route;
        values.map(function (scene, index) { return new scene(keys[index]); });
        var name = keys[0];
        route.to(name);
        game.ticker.add(function () { return route.update(); });
    }

    var defaultConfigure = {
        backgroundColor: 0x000000,
        autoResize: true,
        width: window.innerWidth,
        height: window.innerHeight
    };

    function createGame(configure) {
        var view = configure.view;
        configure = Object.assign(defaultConfigure, configure);
        var UIWidth = configure.UIWidth, UIHeight = configure.UIHeight, width = configure.width, height = configure.height, scenes = configure.scenes;
        configure.view = view || getView();
        var game = new PIXI.Application(configure);
        game.Loader = PIXI.Loader;
        game.resources = PIXI.Loader.shared.resources;
        game.stage.sortableChildren = true;
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
            _this.stage = Scene.prototype.stage;
            _this.stage.addChild(_this);
            _this.ratio = _this.game.PIXEL_RATIO.x;
            _this.ratios = _this.game.PIXEL_RATIO;
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
            _this.game = Scene.prototype.game;
            _this.stage = Scene.prototype.stage;
            _this.color = 0xffffff;
            _this.opacity = 0;
            _this.frame = {
                x: 0,
                y: 0,
                width: 0,
                height: 0,
                radius: 0
            };
            _this.stage.addChild(_this);
            _this.ratio = _this.game.PIXEL_RATIO.x;
            _this.ratios = _this.game.PIXEL_RATIO;
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

    var use = usesify(PIXI);
    compatibleWeChatGame();
    window.PIXI = PIXI;

    exports.Component = Component;
    exports.Resource = Resource;
    exports.ResourceLoader = ResourceLoader;
    exports.Scene = Scene;
    exports.SizeComponent = SizeComponent;
    exports.createGame = createGame;
    exports.use = use;
    exports.useScene = useScene;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=scene.js.map
