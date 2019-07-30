import 'url';

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

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var isMobile = createCommonjsModule(function (module) {
(function(global) {
  var apple_phone = /iPhone/i,
    apple_ipod = /iPod/i,
    apple_tablet = /iPad/i,
    android_phone = /\bAndroid(?:.+)Mobile\b/i, // Match 'Android' AND 'Mobile'
    android_tablet = /Android/i,
    amazon_phone = /\bAndroid(?:.+)SD4930UR\b/i,
    amazon_tablet = /\bAndroid(?:.+)(?:KF[A-Z]{2,4})\b/i,
    windows_phone = /Windows Phone/i,
    windows_tablet = /\bWindows(?:.+)ARM\b/i, // Match 'Windows' AND 'ARM'
    other_blackberry = /BlackBerry/i,
    other_blackberry_10 = /BB10/i,
    other_opera = /Opera Mini/i,
    other_chrome = /\b(CriOS|Chrome)(?:.+)Mobile/i,
    other_firefox = /Mobile(?:.+)Firefox\b/i; // Match 'Mobile' AND 'Firefox'

  function match(regex, userAgent) {
    return regex.test(userAgent);
  }

  function isMobile(userAgent) {
    var ua =
      userAgent ||
      (typeof navigator !== 'undefined' ? navigator.userAgent : '');

    // Facebook mobile app's integrated browser adds a bunch of strings that
    // match everything. Strip it out if it exists.
    var tmp = ua.split('[FBAN');
    if (typeof tmp[1] !== 'undefined') {
      ua = tmp[0];
    }

    // Twitter mobile app's integrated browser on iPad adds a "Twitter for
    // iPhone" string. Same probably happens on other tablet platforms.
    // This will confuse detection so strip it out if it exists.
    tmp = ua.split('Twitter');
    if (typeof tmp[1] !== 'undefined') {
      ua = tmp[0];
    }

    var result = {
      apple: {
        phone: match(apple_phone, ua) && !match(windows_phone, ua),
        ipod: match(apple_ipod, ua),
        tablet:
          !match(apple_phone, ua) &&
          match(apple_tablet, ua) &&
          !match(windows_phone, ua),
        device:
          (match(apple_phone, ua) ||
            match(apple_ipod, ua) ||
            match(apple_tablet, ua)) &&
          !match(windows_phone, ua)
      },
      amazon: {
        phone: match(amazon_phone, ua),
        tablet: !match(amazon_phone, ua) && match(amazon_tablet, ua),
        device: match(amazon_phone, ua) || match(amazon_tablet, ua)
      },
      android: {
        phone:
          (!match(windows_phone, ua) && match(amazon_phone, ua)) ||
          (!match(windows_phone, ua) && match(android_phone, ua)),
        tablet:
          !match(windows_phone, ua) &&
          !match(amazon_phone, ua) &&
          !match(android_phone, ua) &&
          (match(amazon_tablet, ua) || match(android_tablet, ua)),
        device:
          (!match(windows_phone, ua) &&
            (match(amazon_phone, ua) ||
              match(amazon_tablet, ua) ||
              match(android_phone, ua) ||
              match(android_tablet, ua))) ||
          match(/\bokhttp\b/i, ua)
      },
      windows: {
        phone: match(windows_phone, ua),
        tablet: match(windows_tablet, ua),
        device: match(windows_phone, ua) || match(windows_tablet, ua)
      },
      other: {
        blackberry: match(other_blackberry, ua),
        blackberry10: match(other_blackberry_10, ua),
        opera: match(other_opera, ua),
        firefox: match(other_firefox, ua),
        chrome: match(other_chrome, ua),
        device:
          match(other_blackberry, ua) ||
          match(other_blackberry_10, ua) ||
          match(other_opera, ua) ||
          match(other_firefox, ua) ||
          match(other_chrome, ua)
      }
    };
    (result.any =
      result.apple.device ||
      result.android.device ||
      result.windows.device ||
      result.other.device),
      // excludes 'other' devices and ipods, targeting touchscreen phones
      (result.phone =
        result.apple.phone || result.android.phone || result.windows.phone),
      (result.tablet =
        result.apple.tablet || result.android.tablet || result.windows.tablet);

    return result;
  }

  if (
    
    module.exports &&
    typeof window === 'undefined'
  ) {
    // Node.js
    module.exports = isMobile;
  } else if (
    
    module.exports &&
    typeof window !== 'undefined'
  ) {
    // Browserify
    module.exports = isMobile();
    module.exports.isMobile = isMobile;
  } else {
    global.isMobile = isMobile();
  }
})(commonjsGlobal);
});
var isMobile_1 = isMobile.isMobile;

/*!
 * @pixi/settings - v5.1.0
 * Compiled Fri, 19 Jul 2019 21:54:36 UTC
 *
 * @pixi/settings is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */

/**
 * The maximum recommended texture units to use.
 * In theory the bigger the better, and for desktop we'll use as many as we can.
 * But some mobile devices slow down if there is to many branches in the shader.
 * So in practice there seems to be a sweet spot size that varies depending on the device.
 *
 * In v4, all mobile devices were limited to 4 texture units because for this.
 * In v5, we allow all texture units to be used on modern Apple or Android devices.
 *
 * @private
 * @param {number} max
 * @returns {number}
 */
function maxRecommendedTextures(max)
{
    var allowMax = true;

    if (isMobile.tablet || isMobile.phone)
    {
        allowMax = false;

        if (isMobile.apple.device)
        {
            var match = (navigator.userAgent).match(/OS (\d+)_(\d+)?/);

            if (match)
            {
                var majorVersion = parseInt(match[1], 10);

                // All texture units can be used on devices that support ios 11 or above
                if (majorVersion >= 11)
                {
                    allowMax = true;
                }
            }
        }
        if (isMobile.android.device)
        {
            var match$1 = (navigator.userAgent).match(/Android\s([0-9.]*)/);

            if (match$1)
            {
                var majorVersion$1 = parseInt(match$1[1], 10);

                // All texture units can be used on devices that support Android 7 (Nougat) or above
                if (majorVersion$1 >= 7)
                {
                    allowMax = true;
                }
            }
        }
    }

    return allowMax ? max : 4;
}

/**
 * Uploading the same buffer multiple times in a single frame can cause performance issues.
 * Apparent on iOS so only check for that at the moment
 * This check may become more complex if this issue pops up elsewhere.
 *
 * @private
 * @returns {boolean}
 */
function canUploadSameBuffer()
{
    return !isMobile.apple.device;
}

/**
 * User's customizable globals for overriding the default PIXI settings, such
 * as a renderer's default resolution, framerate, float precision, etc.
 * @example
 * // Use the native window resolution as the default resolution
 * // will support high-density displays when rendering
 * PIXI.settings.RESOLUTION = window.devicePixelRatio.
 *
 * // Disable interpolation when scaling, will make texture be pixelated
 * PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
 * @namespace PIXI.settings
 */
var settings = {

    /**
     * If set to true WebGL will attempt make textures mimpaped by default.
     * Mipmapping will only succeed if the base texture uploaded has power of two dimensions.
     *
     * @static
     * @name MIPMAP_TEXTURES
     * @memberof PIXI.settings
     * @type {PIXI.MIPMAP_MODES}
     * @default PIXI.MIPMAP_MODES.POW2
     */
    MIPMAP_TEXTURES: 1,

    /**
     * Default anisotropic filtering level of textures.
     * Usually from 0 to 16
     *
     * @static
     * @name ANISOTROPIC_LEVEL
     * @memberof PIXI.settings
     * @type {number}
     * @default 16
     */
    ANISOTROPIC_LEVEL: 0,

    /**
     * Default resolution / device pixel ratio of the renderer.
     *
     * @static
     * @name RESOLUTION
     * @memberof PIXI.settings
     * @type {number}
     * @default 1
     */
    RESOLUTION: 1,

    /**
     * Default filter resolution.
     *
     * @static
     * @name FILTER_RESOLUTION
     * @memberof PIXI.settings
     * @type {number}
     * @default 1
     */
    FILTER_RESOLUTION: 1,

    /**
     * The maximum textures that this device supports.
     *
     * @static
     * @name SPRITE_MAX_TEXTURES
     * @memberof PIXI.settings
     * @type {number}
     * @default 32
     */
    SPRITE_MAX_TEXTURES: maxRecommendedTextures(32),

    // TODO: maybe change to SPRITE.BATCH_SIZE: 2000
    // TODO: maybe add PARTICLE.BATCH_SIZE: 15000

    /**
     * The default sprite batch size.
     *
     * The default aims to balance desktop and mobile devices.
     *
     * @static
     * @name SPRITE_BATCH_SIZE
     * @memberof PIXI.settings
     * @type {number}
     * @default 4096
     */
    SPRITE_BATCH_SIZE: 4096,

    /**
     * The default render options if none are supplied to {@link PIXI.Renderer}
     * or {@link PIXI.CanvasRenderer}.
     *
     * @static
     * @name RENDER_OPTIONS
     * @memberof PIXI.settings
     * @type {object}
     * @property {HTMLCanvasElement} view=null
     * @property {number} resolution=1
     * @property {boolean} antialias=false
     * @property {boolean} forceFXAA=false
     * @property {boolean} autoDensity=false
     * @property {boolean} transparent=false
     * @property {number} backgroundColor=0x000000
     * @property {boolean} clearBeforeRender=true
     * @property {boolean} preserveDrawingBuffer=false
     * @property {number} width=800
     * @property {number} height=600
     * @property {boolean} legacy=false
     */
    RENDER_OPTIONS: {
        view: null,
        antialias: false,
        forceFXAA: false,
        autoDensity: false,
        transparent: false,
        backgroundColor: 0x000000,
        clearBeforeRender: true,
        preserveDrawingBuffer: false,
        width: 800,
        height: 600,
        legacy: false,
    },

    /**
     * Default Garbage Collection mode.
     *
     * @static
     * @name GC_MODE
     * @memberof PIXI.settings
     * @type {PIXI.GC_MODES}
     * @default PIXI.GC_MODES.AUTO
     */
    GC_MODE: 0,

    /**
     * Default Garbage Collection max idle.
     *
     * @static
     * @name GC_MAX_IDLE
     * @memberof PIXI.settings
     * @type {number}
     * @default 3600
     */
    GC_MAX_IDLE: 60 * 60,

    /**
     * Default Garbage Collection maximum check count.
     *
     * @static
     * @name GC_MAX_CHECK_COUNT
     * @memberof PIXI.settings
     * @type {number}
     * @default 600
     */
    GC_MAX_CHECK_COUNT: 60 * 10,

    /**
     * Default wrap modes that are supported by pixi.
     *
     * @static
     * @name WRAP_MODE
     * @memberof PIXI.settings
     * @type {PIXI.WRAP_MODES}
     * @default PIXI.WRAP_MODES.CLAMP
     */
    WRAP_MODE: 33071,

    /**
     * Default scale mode for textures.
     *
     * @static
     * @name SCALE_MODE
     * @memberof PIXI.settings
     * @type {PIXI.SCALE_MODES}
     * @default PIXI.SCALE_MODES.LINEAR
     */
    SCALE_MODE: 1,

    /**
     * Default specify float precision in vertex shader.
     *
     * @static
     * @name PRECISION_VERTEX
     * @memberof PIXI.settings
     * @type {PIXI.PRECISION}
     * @default PIXI.PRECISION.HIGH
     */
    PRECISION_VERTEX: 'highp',

    /**
     * Default specify float precision in fragment shader.
     * iOS is best set at highp due to https://github.com/pixijs/pixi.js/issues/3742
     *
     * @static
     * @name PRECISION_FRAGMENT
     * @memberof PIXI.settings
     * @type {PIXI.PRECISION}
     * @default PIXI.PRECISION.MEDIUM
     */
    PRECISION_FRAGMENT: isMobile.apple.device ? 'highp' : 'mediump',

    /**
     * Can we upload the same buffer in a single frame?
     *
     * @static
     * @name CAN_UPLOAD_SAME_BUFFER
     * @memberof PIXI.settings
     * @type {boolean}
     */
    CAN_UPLOAD_SAME_BUFFER: canUploadSameBuffer(),

    /**
     * Enables bitmap creation before image load. This feature is experimental.
     *
     * @static
     * @name CREATE_IMAGE_BITMAP
     * @memberof PIXI.settings
     * @type {boolean}
     * @default false
     */
    CREATE_IMAGE_BITMAP: false,

    /**
     * If true PixiJS will Math.floor() x/y values when rendering, stopping pixel interpolation.
     * Advantages can include sharper image quality (like text) and faster rendering on canvas.
     * The main disadvantage is movement of objects may appear less smooth.
     *
     * @static
     * @constant
     * @memberof PIXI.settings
     * @type {boolean}
     * @default false
     */
    ROUND_PIXELS: false,
};

/*!
 * @pixi/math - v5.1.0
 * Compiled Fri, 19 Jul 2019 21:54:36 UTC
 *
 * @pixi/math is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
/**
 * The Point object represents a location in a two-dimensional coordinate system, where x represents
 * the horizontal axis and y represents the vertical axis.
 *
 * @class
 * @memberof PIXI
 */
var Point = function Point(x, y)
{
    if ( x === void 0 ) x = 0;
    if ( y === void 0 ) y = 0;

    /**
     * @member {number}
     * @default 0
     */
    this.x = x;

    /**
     * @member {number}
     * @default 0
     */
    this.y = y;
};

/**
 * Creates a clone of this point
 *
 * @return {PIXI.Point} a copy of the point
 */
Point.prototype.clone = function clone ()
{
    return new Point(this.x, this.y);
};

/**
 * Copies x and y from the given point
 *
 * @param {PIXI.IPoint} p - The point to copy from
 * @returns {PIXI.IPoint} Returns itself.
 */
Point.prototype.copyFrom = function copyFrom (p)
{
    this.set(p.x, p.y);

    return this;
};

/**
 * Copies x and y into the given point
 *
 * @param {PIXI.IPoint} p - The point to copy.
 * @returns {PIXI.IPoint} Given point with values updated
 */
Point.prototype.copyTo = function copyTo (p)
{
    p.set(this.x, this.y);

    return p;
};

/**
 * Returns true if the given point is equal to this point
 *
 * @param {PIXI.IPoint} p - The point to check
 * @returns {boolean} Whether the given point equal to this point
 */
Point.prototype.equals = function equals (p)
{
    return (p.x === this.x) && (p.y === this.y);
};

/**
 * Sets the point to a new x and y position.
 * If y is omitted, both x and y will be set to x.
 *
 * @param {number} [x=0] - position of the point on the x axis
 * @param {number} [y=0] - position of the point on the y axis
 */
Point.prototype.set = function set (x, y)
{
    this.x = x || 0;
    this.y = y || ((y !== 0) ? this.x : 0);
};

/**
 * The Point object represents a location in a two-dimensional coordinate system, where x represents
 * the horizontal axis and y represents the vertical axis.
 *
 * An ObservablePoint is a point that triggers a callback when the point's position is changed.
 *
 * @class
 * @memberof PIXI
 */
var ObservablePoint = function ObservablePoint(cb, scope, x, y)
{
    if ( x === void 0 ) x = 0;
    if ( y === void 0 ) y = 0;

    this._x = x;
    this._y = y;

    this.cb = cb;
    this.scope = scope;
};

var prototypeAccessors = { x: { configurable: true },y: { configurable: true } };

/**
 * Creates a clone of this point.
 * The callback and scope params can be overidden otherwise they will default
 * to the clone object's values.
 *
 * @override
 * @param {Function} [cb=null] - callback when changed
 * @param {object} [scope=null] - owner of callback
 * @return {PIXI.ObservablePoint} a copy of the point
 */
ObservablePoint.prototype.clone = function clone (cb, scope)
{
        if ( cb === void 0 ) cb = null;
        if ( scope === void 0 ) scope = null;

    var _cb = cb || this.cb;
    var _scope = scope || this.scope;

    return new ObservablePoint(_cb, _scope, this._x, this._y);
};

/**
 * Sets the point to a new x and y position.
 * If y is omitted, both x and y will be set to x.
 *
 * @param {number} [x=0] - position of the point on the x axis
 * @param {number} [y=0] - position of the point on the y axis
 */
ObservablePoint.prototype.set = function set (x, y)
{
    var _x = x || 0;
    var _y = y || ((y !== 0) ? _x : 0);

    if (this._x !== _x || this._y !== _y)
    {
        this._x = _x;
        this._y = _y;
        this.cb.call(this.scope);
    }
};

/**
 * Copies x and y from the given point
 *
 * @param {PIXI.IPoint} p - The point to copy from.
 * @returns {PIXI.IPoint} Returns itself.
 */
ObservablePoint.prototype.copyFrom = function copyFrom (p)
{
    if (this._x !== p.x || this._y !== p.y)
    {
        this._x = p.x;
        this._y = p.y;
        this.cb.call(this.scope);
    }

    return this;
};

/**
 * Copies x and y into the given point
 *
 * @param {PIXI.IPoint} p - The point to copy.
 * @returns {PIXI.IPoint} Given point with values updated
 */
ObservablePoint.prototype.copyTo = function copyTo (p)
{
    p.set(this._x, this._y);

    return p;
};

/**
 * Returns true if the given point is equal to this point
 *
 * @param {PIXI.IPoint} p - The point to check
 * @returns {boolean} Whether the given point equal to this point
 */
ObservablePoint.prototype.equals = function equals (p)
{
    return (p.x === this._x) && (p.y === this._y);
};

/**
 * The position of the displayObject on the x axis relative to the local coordinates of the parent.
 *
 * @member {number}
 */
prototypeAccessors.x.get = function ()
{
    return this._x;
};

prototypeAccessors.x.set = function (value) // eslint-disable-line require-jsdoc
{
    if (this._x !== value)
    {
        this._x = value;
        this.cb.call(this.scope);
    }
};

/**
 * The position of the displayObject on the x axis relative to the local coordinates of the parent.
 *
 * @member {number}
 */
prototypeAccessors.y.get = function ()
{
    return this._y;
};

prototypeAccessors.y.set = function (value) // eslint-disable-line require-jsdoc
{
    if (this._y !== value)
    {
        this._y = value;
        this.cb.call(this.scope);
    }
};

Object.defineProperties( ObservablePoint.prototype, prototypeAccessors );

/**
 * A number, or a string containing a number.
 * @memberof PIXI
 * @typedef {(PIXI.Point|PIXI.ObservablePoint)} IPoint
 */

/**
 * Two Pi.
 *
 * @static
 * @constant {number} PI_2
 * @memberof PIXI
 */
var PI_2 = Math.PI * 2;

/**
 * Conversion factor for converting radians to degrees.
 *
 * @static
 * @constant {number} RAD_TO_DEG
 * @memberof PIXI
 */
var RAD_TO_DEG = 180 / Math.PI;

/**
 * Conversion factor for converting degrees to radians.
 *
 * @static
 * @constant {number} DEG_TO_RAD
 * @memberof PIXI
 */
var DEG_TO_RAD = Math.PI / 180;

/**
 * Constants that identify shapes, mainly to prevent `instanceof` calls.
 *
 * @static
 * @constant
 * @name SHAPES
 * @memberof PIXI
 * @type {object}
 * @property {number} POLY Polygon
 * @property {number} RECT Rectangle
 * @property {number} CIRC Circle
 * @property {number} ELIP Ellipse
 * @property {number} RREC Rounded Rectangle
 */
var SHAPES = {
    POLY: 0,
    RECT: 1,
    CIRC: 2,
    ELIP: 3,
    RREC: 4,
};

/**
 * The PixiJS Matrix as a class makes it a lot faster.
 *
 * Here is a representation of it:
 * ```js
 * | a | c | tx|
 * | b | d | ty|
 * | 0 | 0 | 1 |
 * ```
 * @class
 * @memberof PIXI
 */
var Matrix = function Matrix(a, b, c, d, tx, ty)
{
    if ( a === void 0 ) a = 1;
    if ( b === void 0 ) b = 0;
    if ( c === void 0 ) c = 0;
    if ( d === void 0 ) d = 1;
    if ( tx === void 0 ) tx = 0;
    if ( ty === void 0 ) ty = 0;

    /**
     * @member {number}
     * @default 1
     */
    this.a = a;

    /**
     * @member {number}
     * @default 0
     */
    this.b = b;

    /**
     * @member {number}
     * @default 0
     */
    this.c = c;

    /**
     * @member {number}
     * @default 1
     */
    this.d = d;

    /**
     * @member {number}
     * @default 0
     */
    this.tx = tx;

    /**
     * @member {number}
     * @default 0
     */
    this.ty = ty;

    this.array = null;
};

var staticAccessors = { IDENTITY: { configurable: true },TEMP_MATRIX: { configurable: true } };

/**
 * Creates a Matrix object based on the given array. The Element to Matrix mapping order is as follows:
 *
 * a = array[0]
 * b = array[1]
 * c = array[3]
 * d = array[4]
 * tx = array[2]
 * ty = array[5]
 *
 * @param {number[]} array - The array that the matrix will be populated from.
 */
Matrix.prototype.fromArray = function fromArray (array)
{
    this.a = array[0];
    this.b = array[1];
    this.c = array[3];
    this.d = array[4];
    this.tx = array[2];
    this.ty = array[5];
};

/**
 * sets the matrix properties
 *
 * @param {number} a - Matrix component
 * @param {number} b - Matrix component
 * @param {number} c - Matrix component
 * @param {number} d - Matrix component
 * @param {number} tx - Matrix component
 * @param {number} ty - Matrix component
 *
 * @return {PIXI.Matrix} This matrix. Good for chaining method calls.
 */
Matrix.prototype.set = function set (a, b, c, d, tx, ty)
{
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.tx = tx;
    this.ty = ty;

    return this;
};

/**
 * Creates an array from the current Matrix object.
 *
 * @param {boolean} transpose - Whether we need to transpose the matrix or not
 * @param {Float32Array} [out=new Float32Array(9)] - If provided the array will be assigned to out
 * @return {number[]} the newly created array which contains the matrix
 */
Matrix.prototype.toArray = function toArray (transpose, out)
{
    if (!this.array)
    {
        this.array = new Float32Array(9);
    }

    var array = out || this.array;

    if (transpose)
    {
        array[0] = this.a;
        array[1] = this.b;
        array[2] = 0;
        array[3] = this.c;
        array[4] = this.d;
        array[5] = 0;
        array[6] = this.tx;
        array[7] = this.ty;
        array[8] = 1;
    }
    else
    {
        array[0] = this.a;
        array[1] = this.c;
        array[2] = this.tx;
        array[3] = this.b;
        array[4] = this.d;
        array[5] = this.ty;
        array[6] = 0;
        array[7] = 0;
        array[8] = 1;
    }

    return array;
};

/**
 * Get a new position with the current transformation applied.
 * Can be used to go from a child's coordinate space to the world coordinate space. (e.g. rendering)
 *
 * @param {PIXI.Point} pos - The origin
 * @param {PIXI.Point} [newPos] - The point that the new position is assigned to (allowed to be same as input)
 * @return {PIXI.Point} The new point, transformed through this matrix
 */
Matrix.prototype.apply = function apply (pos, newPos)
{
    newPos = newPos || new Point();

    var x = pos.x;
    var y = pos.y;

    newPos.x = (this.a * x) + (this.c * y) + this.tx;
    newPos.y = (this.b * x) + (this.d * y) + this.ty;

    return newPos;
};

/**
 * Get a new position with the inverse of the current transformation applied.
 * Can be used to go from the world coordinate space to a child's coordinate space. (e.g. input)
 *
 * @param {PIXI.Point} pos - The origin
 * @param {PIXI.Point} [newPos] - The point that the new position is assigned to (allowed to be same as input)
 * @return {PIXI.Point} The new point, inverse-transformed through this matrix
 */
Matrix.prototype.applyInverse = function applyInverse (pos, newPos)
{
    newPos = newPos || new Point();

    var id = 1 / ((this.a * this.d) + (this.c * -this.b));

    var x = pos.x;
    var y = pos.y;

    newPos.x = (this.d * id * x) + (-this.c * id * y) + (((this.ty * this.c) - (this.tx * this.d)) * id);
    newPos.y = (this.a * id * y) + (-this.b * id * x) + (((-this.ty * this.a) + (this.tx * this.b)) * id);

    return newPos;
};

/**
 * Translates the matrix on the x and y.
 *
 * @param {number} x How much to translate x by
 * @param {number} y How much to translate y by
 * @return {PIXI.Matrix} This matrix. Good for chaining method calls.
 */
Matrix.prototype.translate = function translate (x, y)
{
    this.tx += x;
    this.ty += y;

    return this;
};

/**
 * Applies a scale transformation to the matrix.
 *
 * @param {number} x The amount to scale horizontally
 * @param {number} y The amount to scale vertically
 * @return {PIXI.Matrix} This matrix. Good for chaining method calls.
 */
Matrix.prototype.scale = function scale (x, y)
{
    this.a *= x;
    this.d *= y;
    this.c *= x;
    this.b *= y;
    this.tx *= x;
    this.ty *= y;

    return this;
};

/**
 * Applies a rotation transformation to the matrix.
 *
 * @param {number} angle - The angle in radians.
 * @return {PIXI.Matrix} This matrix. Good for chaining method calls.
 */
Matrix.prototype.rotate = function rotate (angle)
{
    var cos = Math.cos(angle);
    var sin = Math.sin(angle);

    var a1 = this.a;
    var c1 = this.c;
    var tx1 = this.tx;

    this.a = (a1 * cos) - (this.b * sin);
    this.b = (a1 * sin) + (this.b * cos);
    this.c = (c1 * cos) - (this.d * sin);
    this.d = (c1 * sin) + (this.d * cos);
    this.tx = (tx1 * cos) - (this.ty * sin);
    this.ty = (tx1 * sin) + (this.ty * cos);

    return this;
};

/**
 * Appends the given Matrix to this Matrix.
 *
 * @param {PIXI.Matrix} matrix - The matrix to append.
 * @return {PIXI.Matrix} This matrix. Good for chaining method calls.
 */
Matrix.prototype.append = function append (matrix)
{
    var a1 = this.a;
    var b1 = this.b;
    var c1 = this.c;
    var d1 = this.d;

    this.a = (matrix.a * a1) + (matrix.b * c1);
    this.b = (matrix.a * b1) + (matrix.b * d1);
    this.c = (matrix.c * a1) + (matrix.d * c1);
    this.d = (matrix.c * b1) + (matrix.d * d1);

    this.tx = (matrix.tx * a1) + (matrix.ty * c1) + this.tx;
    this.ty = (matrix.tx * b1) + (matrix.ty * d1) + this.ty;

    return this;
};

/**
 * Sets the matrix based on all the available properties
 *
 * @param {number} x - Position on the x axis
 * @param {number} y - Position on the y axis
 * @param {number} pivotX - Pivot on the x axis
 * @param {number} pivotY - Pivot on the y axis
 * @param {number} scaleX - Scale on the x axis
 * @param {number} scaleY - Scale on the y axis
 * @param {number} rotation - Rotation in radians
 * @param {number} skewX - Skew on the x axis
 * @param {number} skewY - Skew on the y axis
 * @return {PIXI.Matrix} This matrix. Good for chaining method calls.
 */
Matrix.prototype.setTransform = function setTransform (x, y, pivotX, pivotY, scaleX, scaleY, rotation, skewX, skewY)
{
    this.a = Math.cos(rotation + skewY) * scaleX;
    this.b = Math.sin(rotation + skewY) * scaleX;
    this.c = -Math.sin(rotation - skewX) * scaleY;
    this.d = Math.cos(rotation - skewX) * scaleY;

    this.tx = x - ((pivotX * this.a) + (pivotY * this.c));
    this.ty = y - ((pivotX * this.b) + (pivotY * this.d));

    return this;
};

/**
 * Prepends the given Matrix to this Matrix.
 *
 * @param {PIXI.Matrix} matrix - The matrix to prepend
 * @return {PIXI.Matrix} This matrix. Good for chaining method calls.
 */
Matrix.prototype.prepend = function prepend (matrix)
{
    var tx1 = this.tx;

    if (matrix.a !== 1 || matrix.b !== 0 || matrix.c !== 0 || matrix.d !== 1)
    {
        var a1 = this.a;
        var c1 = this.c;

        this.a = (a1 * matrix.a) + (this.b * matrix.c);
        this.b = (a1 * matrix.b) + (this.b * matrix.d);
        this.c = (c1 * matrix.a) + (this.d * matrix.c);
        this.d = (c1 * matrix.b) + (this.d * matrix.d);
    }

    this.tx = (tx1 * matrix.a) + (this.ty * matrix.c) + matrix.tx;
    this.ty = (tx1 * matrix.b) + (this.ty * matrix.d) + matrix.ty;

    return this;
};

/**
 * Decomposes the matrix (x, y, scaleX, scaleY, and rotation) and sets the properties on to a transform.
 *
 * @param {PIXI.Transform} transform - The transform to apply the properties to.
 * @return {PIXI.Transform} The transform with the newly applied properties
 */
Matrix.prototype.decompose = function decompose (transform)
{
    // sort out rotation / skew..
    var a = this.a;
    var b = this.b;
    var c = this.c;
    var d = this.d;

    var skewX = -Math.atan2(-c, d);
    var skewY = Math.atan2(b, a);

    var delta = Math.abs(skewX + skewY);

    if (delta < 0.00001 || Math.abs(PI_2 - delta) < 0.00001)
    {
        transform.rotation = skewY;
        transform.skew.x = transform.skew.y = 0;
    }
    else
    {
        transform.rotation = 0;
        transform.skew.x = skewX;
        transform.skew.y = skewY;
    }

    // next set scale
    transform.scale.x = Math.sqrt((a * a) + (b * b));
    transform.scale.y = Math.sqrt((c * c) + (d * d));

    // next set position
    transform.position.x = this.tx;
    transform.position.y = this.ty;

    return transform;
};

/**
 * Inverts this matrix
 *
 * @return {PIXI.Matrix} This matrix. Good for chaining method calls.
 */
Matrix.prototype.invert = function invert ()
{
    var a1 = this.a;
    var b1 = this.b;
    var c1 = this.c;
    var d1 = this.d;
    var tx1 = this.tx;
    var n = (a1 * d1) - (b1 * c1);

    this.a = d1 / n;
    this.b = -b1 / n;
    this.c = -c1 / n;
    this.d = a1 / n;
    this.tx = ((c1 * this.ty) - (d1 * tx1)) / n;
    this.ty = -((a1 * this.ty) - (b1 * tx1)) / n;

    return this;
};

/**
 * Resets this Matrix to an identity (default) matrix.
 *
 * @return {PIXI.Matrix} This matrix. Good for chaining method calls.
 */
Matrix.prototype.identity = function identity ()
{
    this.a = 1;
    this.b = 0;
    this.c = 0;
    this.d = 1;
    this.tx = 0;
    this.ty = 0;

    return this;
};

/**
 * Creates a new Matrix object with the same values as this one.
 *
 * @return {PIXI.Matrix} A copy of this matrix. Good for chaining method calls.
 */
Matrix.prototype.clone = function clone ()
{
    var matrix = new Matrix();

    matrix.a = this.a;
    matrix.b = this.b;
    matrix.c = this.c;
    matrix.d = this.d;
    matrix.tx = this.tx;
    matrix.ty = this.ty;

    return matrix;
};

/**
 * Changes the values of the given matrix to be the same as the ones in this matrix
 *
 * @param {PIXI.Matrix} matrix - The matrix to copy to.
 * @return {PIXI.Matrix} The matrix given in parameter with its values updated.
 */
Matrix.prototype.copyTo = function copyTo (matrix)
{
    matrix.a = this.a;
    matrix.b = this.b;
    matrix.c = this.c;
    matrix.d = this.d;
    matrix.tx = this.tx;
    matrix.ty = this.ty;

    return matrix;
};

/**
 * Changes the values of the matrix to be the same as the ones in given matrix
 *
 * @param {PIXI.Matrix} matrix - The matrix to copy from.
 * @return {PIXI.Matrix} this
 */
Matrix.prototype.copyFrom = function copyFrom (matrix)
{
    this.a = matrix.a;
    this.b = matrix.b;
    this.c = matrix.c;
    this.d = matrix.d;
    this.tx = matrix.tx;
    this.ty = matrix.ty;

    return this;
};

/**
 * A default (identity) matrix
 *
 * @static
 * @const
 * @member {PIXI.Matrix}
 */
staticAccessors.IDENTITY.get = function ()
{
    return new Matrix();
};

/**
 * A temp matrix
 *
 * @static
 * @const
 * @member {PIXI.Matrix}
 */
staticAccessors.TEMP_MATRIX.get = function ()
{
    return new Matrix();
};

Object.defineProperties( Matrix, staticAccessors );

// Your friendly neighbour https://en.wikipedia.org/wiki/Dihedral_group

/*
 * Transform matrix for operation n is:
 * | ux | vx |
 * | uy | vy |
 */

var ux = [1, 1, 0, -1, -1, -1, 0, 1, 1, 1, 0, -1, -1, -1, 0, 1];
var uy = [0, 1, 1, 1, 0, -1, -1, -1, 0, 1, 1, 1, 0, -1, -1, -1];
var vx = [0, -1, -1, -1, 0, 1, 1, 1, 0, 1, 1, 1, 0, -1, -1, -1];
var vy = [1, 1, 0, -1, -1, -1, 0, 1, -1, -1, 0, 1, 1, 1, 0, -1];

/*
 * Alias for {@code Math.sign}.
 */
var signum = Math.sign;

/*
 * Initializes `rotationCayley` and `rotationMatrices`. It is called
 * only once below.
 */
function init()
{
    for (var i = 0; i < 16; i++)
    {
        var row = [];

        for (var j = 0; j < 16; j++)
        {
            /* Multiplies rotation matrices i and j. */
            var _ux = signum((ux[i] * ux[j]) + (vx[i] * uy[j]));
            var _uy = signum((uy[i] * ux[j]) + (vy[i] * uy[j]));
            var _vx = signum((ux[i] * vx[j]) + (vx[i] * vy[j]));
            var _vy = signum((uy[i] * vx[j]) + (vy[i] * vy[j]));

            /* Finds rotation matrix matching the product and pushes it. */
            for (var k = 0; k < 16; k++)
            {
                if (ux[k] === _ux && uy[k] === _uy
                      && vx[k] === _vx && vy[k] === _vy)
                {
                    row.push(k);
                    break;
                }
            }
        }
    }

    for (var i$1 = 0; i$1 < 16; i$1++)
    {
        var mat = new Matrix();

        mat.set(ux[i$1], uy[i$1], vx[i$1], vy[i$1], 0, 0);
    }
}

init();

/**
 * Transform that takes care about its versions
 *
 * @class
 * @memberof PIXI
 */
var Transform = function Transform()
{
    /**
     * The world transformation matrix.
     *
     * @member {PIXI.Matrix}
     */
    this.worldTransform = new Matrix();

    /**
     * The local transformation matrix.
     *
     * @member {PIXI.Matrix}
     */
    this.localTransform = new Matrix();

    /**
     * The coordinate of the object relative to the local coordinates of the parent.
     *
     * @member {PIXI.ObservablePoint}
     */
    this.position = new ObservablePoint(this.onChange, this, 0, 0);

    /**
     * The scale factor of the object.
     *
     * @member {PIXI.ObservablePoint}
     */
    this.scale = new ObservablePoint(this.onChange, this, 1, 1);

    /**
     * The pivot point of the displayObject that it rotates around.
     *
     * @member {PIXI.ObservablePoint}
     */
    this.pivot = new ObservablePoint(this.onChange, this, 0, 0);

    /**
     * The skew amount, on the x and y axis.
     *
     * @member {PIXI.ObservablePoint}
     */
    this.skew = new ObservablePoint(this.updateSkew, this, 0, 0);

    /**
     * The rotation amount.
     *
     * @protected
     * @member {number}
     */
    this._rotation = 0;

    /**
     * The X-coordinate value of the normalized local X axis,
     * the first column of the local transformation matrix without a scale.
     *
     * @protected
     * @member {number}
     */
    this._cx = 1;

    /**
     * The Y-coordinate value of the normalized local X axis,
     * the first column of the local transformation matrix without a scale.
     *
     * @protected
     * @member {number}
     */
    this._sx = 0;

    /**
     * The X-coordinate value of the normalized local Y axis,
     * the second column of the local transformation matrix without a scale.
     *
     * @protected
     * @member {number}
     */
    this._cy = 0;

    /**
     * The Y-coordinate value of the normalized local Y axis,
     * the second column of the local transformation matrix without a scale.
     *
     * @protected
     * @member {number}
     */
    this._sy = 1;

    /**
     * The locally unique ID of the local transform.
     *
     * @protected
     * @member {number}
     */
    this._localID = 0;

    /**
     * The locally unique ID of the local transform
     * used to calculate the current local transformation matrix.
     *
     * @protected
     * @member {number}
     */
    this._currentLocalID = 0;

    /**
     * The locally unique ID of the world transform.
     *
     * @protected
     * @member {number}
     */
    this._worldID = 0;

    /**
     * The locally unique ID of the parent's world transform
     * used to calculate the current world transformation matrix.
     *
     * @protected
     * @member {number}
     */
    this._parentID = 0;
};

var prototypeAccessors$1 = { rotation: { configurable: true } };

/**
 * Called when a value changes.
 *
 * @protected
 */
Transform.prototype.onChange = function onChange ()
{
    this._localID++;
};

/**
 * Called when the skew or the rotation changes.
 *
 * @protected
 */
Transform.prototype.updateSkew = function updateSkew ()
{
    this._cx = Math.cos(this._rotation + this.skew._y);
    this._sx = Math.sin(this._rotation + this.skew._y);
    this._cy = -Math.sin(this._rotation - this.skew._x); // cos, added PI/2
    this._sy = Math.cos(this._rotation - this.skew._x); // sin, added PI/2

    this._localID++;
};

/**
 * Updates the local transformation matrix.
 */
Transform.prototype.updateLocalTransform = function updateLocalTransform ()
{
    var lt = this.localTransform;

    if (this._localID !== this._currentLocalID)
    {
        // get the matrix values of the displayobject based on its transform properties..
        lt.a = this._cx * this.scale._x;
        lt.b = this._sx * this.scale._x;
        lt.c = this._cy * this.scale._y;
        lt.d = this._sy * this.scale._y;

        lt.tx = this.position._x - ((this.pivot._x * lt.a) + (this.pivot._y * lt.c));
        lt.ty = this.position._y - ((this.pivot._x * lt.b) + (this.pivot._y * lt.d));
        this._currentLocalID = this._localID;

        // force an update..
        this._parentID = -1;
    }
};

/**
 * Updates the local and the world transformation matrices.
 *
 * @param {PIXI.Transform} parentTransform - The parent transform
 */
Transform.prototype.updateTransform = function updateTransform (parentTransform)
{
    var lt = this.localTransform;

    if (this._localID !== this._currentLocalID)
    {
        // get the matrix values of the displayobject based on its transform properties..
        lt.a = this._cx * this.scale._x;
        lt.b = this._sx * this.scale._x;
        lt.c = this._cy * this.scale._y;
        lt.d = this._sy * this.scale._y;

        lt.tx = this.position._x - ((this.pivot._x * lt.a) + (this.pivot._y * lt.c));
        lt.ty = this.position._y - ((this.pivot._x * lt.b) + (this.pivot._y * lt.d));
        this._currentLocalID = this._localID;

        // force an update..
        this._parentID = -1;
    }

    if (this._parentID !== parentTransform._worldID)
    {
        // concat the parent matrix with the objects transform.
        var pt = parentTransform.worldTransform;
        var wt = this.worldTransform;

        wt.a = (lt.a * pt.a) + (lt.b * pt.c);
        wt.b = (lt.a * pt.b) + (lt.b * pt.d);
        wt.c = (lt.c * pt.a) + (lt.d * pt.c);
        wt.d = (lt.c * pt.b) + (lt.d * pt.d);
        wt.tx = (lt.tx * pt.a) + (lt.ty * pt.c) + pt.tx;
        wt.ty = (lt.tx * pt.b) + (lt.ty * pt.d) + pt.ty;

        this._parentID = parentTransform._worldID;

        // update the id of the transform..
        this._worldID++;
    }
};

/**
 * Decomposes a matrix and sets the transforms properties based on it.
 *
 * @param {PIXI.Matrix} matrix - The matrix to decompose
 */
Transform.prototype.setFromMatrix = function setFromMatrix (matrix)
{
    matrix.decompose(this);
    this._localID++;
};

/**
 * The rotation of the object in radians.
 *
 * @member {number}
 */
prototypeAccessors$1.rotation.get = function ()
{
    return this._rotation;
};

prototypeAccessors$1.rotation.set = function (value) // eslint-disable-line require-jsdoc
{
    if (this._rotation !== value)
    {
        this._rotation = value;
        this.updateSkew();
    }
};

Object.defineProperties( Transform.prototype, prototypeAccessors$1 );

/**
 * A default (identity) transform
 *
 * @static
 * @constant
 * @member {PIXI.Transform}
 */
Transform.IDENTITY = new Transform();

/**
 * Size object, contains width and height
 *
 * @memberof PIXI
 * @typedef {object} ISize
 * @property {number} width - Width component
 * @property {number} height - Height component
 */

/**
 * Rectangle object is an area defined by its position, as indicated by its top-left corner
 * point (x, y) and by its width and its height.
 *
 * @class
 * @memberof PIXI
 */
var Rectangle = function Rectangle(x, y, width, height)
{
    if ( x === void 0 ) x = 0;
    if ( y === void 0 ) y = 0;
    if ( width === void 0 ) width = 0;
    if ( height === void 0 ) height = 0;

    /**
     * @member {number}
     * @default 0
     */
    this.x = Number(x);

    /**
     * @member {number}
     * @default 0
     */
    this.y = Number(y);

    /**
     * @member {number}
     * @default 0
     */
    this.width = Number(width);

    /**
     * @member {number}
     * @default 0
     */
    this.height = Number(height);

    /**
     * The type of the object, mainly used to avoid `instanceof` checks
     *
     * @member {number}
     * @readOnly
     * @default PIXI.SHAPES.RECT
     * @see PIXI.SHAPES
     */
    this.type = SHAPES.RECT;
};

var prototypeAccessors$2 = { left: { configurable: true },right: { configurable: true },top: { configurable: true },bottom: { configurable: true } };
var staticAccessors$1 = { EMPTY: { configurable: true } };

/**
 * returns the left edge of the rectangle
 *
 * @member {number}
 */
prototypeAccessors$2.left.get = function ()
{
    return this.x;
};

/**
 * returns the right edge of the rectangle
 *
 * @member {number}
 */
prototypeAccessors$2.right.get = function ()
{
    return this.x + this.width;
};

/**
 * returns the top edge of the rectangle
 *
 * @member {number}
 */
prototypeAccessors$2.top.get = function ()
{
    return this.y;
};

/**
 * returns the bottom edge of the rectangle
 *
 * @member {number}
 */
prototypeAccessors$2.bottom.get = function ()
{
    return this.y + this.height;
};

/**
 * A constant empty rectangle.
 *
 * @static
 * @constant
 * @member {PIXI.Rectangle}
 */
staticAccessors$1.EMPTY.get = function ()
{
    return new Rectangle(0, 0, 0, 0);
};

/**
 * Creates a clone of this Rectangle
 *
 * @return {PIXI.Rectangle} a copy of the rectangle
 */
Rectangle.prototype.clone = function clone ()
{
    return new Rectangle(this.x, this.y, this.width, this.height);
};

/**
 * Copies another rectangle to this one.
 *
 * @param {PIXI.Rectangle} rectangle - The rectangle to copy from.
 * @return {PIXI.Rectangle} Returns itself.
 */
Rectangle.prototype.copyFrom = function copyFrom (rectangle)
{
    this.x = rectangle.x;
    this.y = rectangle.y;
    this.width = rectangle.width;
    this.height = rectangle.height;

    return this;
};

/**
 * Copies this rectangle to another one.
 *
 * @param {PIXI.Rectangle} rectangle - The rectangle to copy to.
 * @return {PIXI.Rectangle} Returns given parameter.
 */
Rectangle.prototype.copyTo = function copyTo (rectangle)
{
    rectangle.x = this.x;
    rectangle.y = this.y;
    rectangle.width = this.width;
    rectangle.height = this.height;

    return rectangle;
};

/**
 * Checks whether the x and y coordinates given are contained within this Rectangle
 *
 * @param {number} x - The X coordinate of the point to test
 * @param {number} y - The Y coordinate of the point to test
 * @return {boolean} Whether the x/y coordinates are within this Rectangle
 */
Rectangle.prototype.contains = function contains (x, y)
{
    if (this.width <= 0 || this.height <= 0)
    {
        return false;
    }

    if (x >= this.x && x < this.x + this.width)
    {
        if (y >= this.y && y < this.y + this.height)
        {
            return true;
        }
    }

    return false;
};

/**
 * Pads the rectangle making it grow in all directions.
 *
 * @param {number} paddingX - The horizontal padding amount.
 * @param {number} paddingY - The vertical padding amount.
 */
Rectangle.prototype.pad = function pad (paddingX, paddingY)
{
    paddingX = paddingX || 0;
    paddingY = paddingY || ((paddingY !== 0) ? paddingX : 0);

    this.x -= paddingX;
    this.y -= paddingY;

    this.width += paddingX * 2;
    this.height += paddingY * 2;
};

/**
 * Fits this rectangle around the passed one.
 *
 * @param {PIXI.Rectangle} rectangle - The rectangle to fit.
 */
Rectangle.prototype.fit = function fit (rectangle)
{
    var x1 = Math.max(this.x, rectangle.x);
    var x2 = Math.min(this.x + this.width, rectangle.x + rectangle.width);
    var y1 = Math.max(this.y, rectangle.y);
    var y2 = Math.min(this.y + this.height, rectangle.y + rectangle.height);

    this.x = x1;
    this.width = Math.max(x2 - x1, 0);
    this.y = y1;
    this.height = Math.max(y2 - y1, 0);
};

/**
 * Enlarges rectangle that way its corners lie on grid
 *
 * @param {number} [resolution=1] resolution
 * @param {number} [eps=0.001] precision
 */
Rectangle.prototype.ceil = function ceil (resolution, eps)
{
        if ( resolution === void 0 ) resolution = 1;
        if ( eps === void 0 ) eps = 0.001;

    var x2 = Math.ceil((this.x + this.width - eps) * resolution) / resolution;
    var y2 = Math.ceil((this.y + this.height - eps) * resolution) / resolution;

    this.x = Math.floor((this.x + eps) * resolution) / resolution;
    this.y = Math.floor((this.y + eps) * resolution) / resolution;

    this.width = x2 - this.x;
    this.height = y2 - this.y;
};

/**
 * Enlarges this rectangle to include the passed rectangle.
 *
 * @param {PIXI.Rectangle} rectangle - The rectangle to include.
 */
Rectangle.prototype.enlarge = function enlarge (rectangle)
{
    var x1 = Math.min(this.x, rectangle.x);
    var x2 = Math.max(this.x + this.width, rectangle.x + rectangle.width);
    var y1 = Math.min(this.y, rectangle.y);
    var y2 = Math.max(this.y + this.height, rectangle.y + rectangle.height);

    this.x = x1;
    this.width = x2 - x1;
    this.y = y1;
    this.height = y2 - y1;
};

Object.defineProperties( Rectangle.prototype, prototypeAccessors$2 );
Object.defineProperties( Rectangle, staticAccessors$1 );

var eventemitter3 = createCommonjsModule(function (module) {

var has = Object.prototype.hasOwnProperty
  , prefix = '~';

/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @private
 */
function Events() {}

//
// We try to not inherit from `Object.prototype`. In some engines creating an
// instance in this way is faster than calling `Object.create(null)` directly.
// If `Object.create(null)` is not supported we prefix the event names with a
// character to make sure that the built-in object properties are not
// overridden or used as an attack vector.
//
if (Object.create) {
  Events.prototype = Object.create(null);

  //
  // This hack is needed because the `__proto__` property is still inherited in
  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
  //
  if (!new Events().__proto__) prefix = false;
}

/**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @private
 */
function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}

/**
 * Add a listener for a given event.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} once Specify if the listener is a one-time listener.
 * @returns {EventEmitter}
 * @private
 */
function addListener(emitter, event, fn, context, once) {
  if (typeof fn !== 'function') {
    throw new TypeError('The listener must be a function');
  }

  var listener = new EE(fn, context || emitter, once)
    , evt = prefix ? prefix + event : event;

  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
  else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
  else emitter._events[evt] = [emitter._events[evt], listener];

  return emitter;
}

/**
 * Clear event by name.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} evt The Event name.
 * @private
 */
function clearEvent(emitter, evt) {
  if (--emitter._eventsCount === 0) emitter._events = new Events();
  else delete emitter._events[evt];
}

/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @public
 */
function EventEmitter() {
  this._events = new Events();
  this._eventsCount = 0;
}

/**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @public
 */
EventEmitter.prototype.eventNames = function eventNames() {
  var names = []
    , events
    , name;

  if (this._eventsCount === 0) return names;

  for (name in (events = this._events)) {
    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
  }

  if (Object.getOwnPropertySymbols) {
    return names.concat(Object.getOwnPropertySymbols(events));
  }

  return names;
};

/**
 * Return the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Array} The registered listeners.
 * @public
 */
EventEmitter.prototype.listeners = function listeners(event) {
  var evt = prefix ? prefix + event : event
    , handlers = this._events[evt];

  if (!handlers) return [];
  if (handlers.fn) return [handlers.fn];

  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
    ee[i] = handlers[i].fn;
  }

  return ee;
};

/**
 * Return the number of listeners listening to a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Number} The number of listeners.
 * @public
 */
EventEmitter.prototype.listenerCount = function listenerCount(event) {
  var evt = prefix ? prefix + event : event
    , listeners = this._events[evt];

  if (!listeners) return 0;
  if (listeners.fn) return 1;
  return listeners.length;
};

/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @public
 */
EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return false;

  var listeners = this._events[evt]
    , len = arguments.length
    , args
    , i;

  if (listeners.fn) {
    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

    switch (len) {
      case 1: return listeners.fn.call(listeners.context), true;
      case 2: return listeners.fn.call(listeners.context, a1), true;
      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    }

    for (i = 1, args = new Array(len -1); i < len; i++) {
      args[i - 1] = arguments[i];
    }

    listeners.fn.apply(listeners.context, args);
  } else {
    var length = listeners.length
      , j;

    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

      switch (len) {
        case 1: listeners[i].fn.call(listeners[i].context); break;
        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
        default:
          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
            args[j - 1] = arguments[j];
          }

          listeners[i].fn.apply(listeners[i].context, args);
      }
    }
  }

  return true;
};

/**
 * Add a listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
  return addListener(this, event, fn, context, false);
};

/**
 * Add a one-time listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
  return addListener(this, event, fn, context, true);
};

/**
 * Remove the listeners of a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {*} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return this;
  if (!fn) {
    clearEvent(this, evt);
    return this;
  }

  var listeners = this._events[evt];

  if (listeners.fn) {
    if (
      listeners.fn === fn &&
      (!once || listeners.once) &&
      (!context || listeners.context === context)
    ) {
      clearEvent(this, evt);
    }
  } else {
    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
      if (
        listeners[i].fn !== fn ||
        (once && !listeners[i].once) ||
        (context && listeners[i].context !== context)
      ) {
        events.push(listeners[i]);
      }
    }

    //
    // Reset the array, or remove it completely if we have no more listeners.
    //
    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
    else clearEvent(this, evt);
  }

  return this;
};

/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {(String|Symbol)} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  var evt;

  if (event) {
    evt = prefix ? prefix + event : event;
    if (this._events[evt]) clearEvent(this, evt);
  } else {
    this._events = new Events();
    this._eventsCount = 0;
  }

  return this;
};

//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//
// Expose the prefix.
//
EventEmitter.prefixed = prefix;

//
// Allow `EventEmitter` to be imported as module namespace.
//
EventEmitter.EventEmitter = EventEmitter;

//
// Expose the module.
//
{
  module.exports = EventEmitter;
}
});

/*!
 * @pixi/constants - v5.1.0
 * Compiled Fri, 19 Jul 2019 21:54:36 UTC
 *
 * @pixi/constants is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */

/**
 * Various blend modes supported by PIXI.
 *
 * IMPORTANT - The WebGL renderer only supports the NORMAL, ADD, MULTIPLY and SCREEN blend modes.
 * Anything else will silently act like NORMAL.
 *
 * @memberof PIXI
 * @name BLEND_MODES
 * @enum {number}
 * @property {number} NORMAL
 * @property {number} ADD
 * @property {number} MULTIPLY
 * @property {number} SCREEN
 * @property {number} OVERLAY
 * @property {number} DARKEN
 * @property {number} LIGHTEN
 * @property {number} COLOR_DODGE
 * @property {number} COLOR_BURN
 * @property {number} HARD_LIGHT
 * @property {number} SOFT_LIGHT
 * @property {number} DIFFERENCE
 * @property {number} EXCLUSION
 * @property {number} HUE
 * @property {number} SATURATION
 * @property {number} COLOR
 * @property {number} LUMINOSITY
 * @property {number} NORMAL_NPM
 * @property {number} ADD_NPM
 * @property {number} SCREEN_NPM
 * @property {number} NONE
 * @property {number} SRC_IN
 * @property {number} SRC_OUT
 * @property {number} SRC_ATOP
 * @property {number} DST_OVER
 * @property {number} DST_IN
 * @property {number} DST_OUT
 * @property {number} DST_ATOP
 * @property {number} SUBTRACT
 * @property {number} SRC_OVER
 * @property {number} ERASE
 */
var BLEND_MODES = {
    NORMAL:         0,
    ADD:            1,
    MULTIPLY:       2,
    SCREEN:         3,
    OVERLAY:        4,
    DARKEN:         5,
    LIGHTEN:        6,
    COLOR_DODGE:    7,
    COLOR_BURN:     8,
    HARD_LIGHT:     9,
    SOFT_LIGHT:     10,
    DIFFERENCE:     11,
    EXCLUSION:      12,
    HUE:            13,
    SATURATION:     14,
    COLOR:          15,
    LUMINOSITY:     16,
    NORMAL_NPM:     17,
    ADD_NPM:        18,
    SCREEN_NPM:     19,
    NONE:           20,

    SRC_OVER:       0,
    SRC_IN:         21,
    SRC_OUT:        22,
    SRC_ATOP:       23,
    DST_OVER:       24,
    DST_IN:         25,
    DST_OUT:        26,
    DST_ATOP:       27,
    ERASE:          26,
    SUBTRACT:       28,
};

/*!
 * @pixi/utils - v5.1.0
 * Compiled Fri, 19 Jul 2019 21:54:36 UTC
 *
 * @pixi/utils is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */

/**
 * The prefix that denotes a URL is for a retina asset.
 *
 * @static
 * @name RETINA_PREFIX
 * @memberof PIXI.settings
 * @type {RegExp}
 * @default /@([0-9\.]+)x/
 * @example `@2x`
 */
settings.RETINA_PREFIX = /@([0-9\.]+)x/;

/**
 * Should the `failIfMajorPerformanceCaveat` flag be enabled as a context option used in the `isWebGLSupported` function.
 * For most scenarios this should be left as true, as otherwise the user may have a poor experience.
 * However, it can be useful to disable under certain scenarios, such as headless unit tests.
 *
 * @static
 * @name FAIL_IF_MAJOR_PERFORMANCE_CAVEAT
 * @memberof PIXI.settings
 * @type {boolean}
 * @default true
 */
settings.FAIL_IF_MAJOR_PERFORMANCE_CAVEAT = true;

/**
 * Corrects PixiJS blend, takes premultiplied alpha into account
 *
 * @memberof PIXI.utils
 * @function mapPremultipliedBlendModes
 * @private
 * @param {Array<number[]>} [array] - The array to output into.
 * @return {Array<number[]>} Mapped modes.
 */
function mapPremultipliedBlendModes()
{
    var pm = [];
    var npm = [];

    for (var i = 0; i < 32; i++)
    {
        pm[i] = i;
        npm[i] = i;
    }

    pm[BLEND_MODES.NORMAL_NPM] = BLEND_MODES.NORMAL;
    pm[BLEND_MODES.ADD_NPM] = BLEND_MODES.ADD;
    pm[BLEND_MODES.SCREEN_NPM] = BLEND_MODES.SCREEN;

    npm[BLEND_MODES.NORMAL] = BLEND_MODES.NORMAL_NPM;
    npm[BLEND_MODES.ADD] = BLEND_MODES.ADD_NPM;
    npm[BLEND_MODES.SCREEN] = BLEND_MODES.SCREEN_NPM;

    var array = [];

    array.push(npm);
    array.push(pm);

    return array;
}

/**
 * maps premultiply flag and blendMode to adjusted blendMode
 * @memberof PIXI.utils
 * @const premultiplyBlendMode
 * @type {Array<number[]>}
 */
var premultiplyBlendMode = mapPremultipliedBlendModes();

/**
 * Remove items from a javascript array without generating garbage
 *
 * @function removeItems
 * @memberof PIXI.utils
 * @param {Array<any>} arr Array to remove elements from
 * @param {number} startIdx starting index
 * @param {number} removeCount how many to remove
 */
function removeItems(arr, startIdx, removeCount)
{
    var length = arr.length;
    var i;

    if (startIdx >= length || removeCount === 0)
    {
        return;
    }

    removeCount = (startIdx + removeCount > length ? length - startIdx : removeCount);

    var len = length - removeCount;

    for (i = startIdx; i < len; ++i)
    {
        arr[i] = arr[i + removeCount];
    }

    arr.length = len;
}

/**
 * Creates a Canvas element of the given size to be used as a target for rendering to.
 *
 * @class
 * @memberof PIXI.utils
 */
var CanvasRenderTarget = function CanvasRenderTarget(width, height, resolution)
{
    /**
     * The Canvas object that belongs to this CanvasRenderTarget.
     *
     * @member {HTMLCanvasElement}
     */
    this.canvas = document.createElement('canvas');

    /**
     * A CanvasRenderingContext2D object representing a two-dimensional rendering context.
     *
     * @member {CanvasRenderingContext2D}
     */
    this.context = this.canvas.getContext('2d');

    this.resolution = resolution || settings.RESOLUTION;

    this.resize(width, height);
};

var prototypeAccessors$3 = { width: { configurable: true },height: { configurable: true } };

/**
 * Clears the canvas that was created by the CanvasRenderTarget class.
 *
 * @private
 */
CanvasRenderTarget.prototype.clear = function clear ()
{
    this.context.setTransform(1, 0, 0, 1, 0, 0);
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

/**
 * Resizes the canvas to the specified width and height.
 *
 * @param {number} width - the new width of the canvas
 * @param {number} height - the new height of the canvas
 */
CanvasRenderTarget.prototype.resize = function resize (width, height)
{
    this.canvas.width = width * this.resolution;
    this.canvas.height = height * this.resolution;
};

/**
 * Destroys this canvas.
 *
 */
CanvasRenderTarget.prototype.destroy = function destroy ()
{
    this.context = null;
    this.canvas = null;
};

/**
 * The width of the canvas buffer in pixels.
 *
 * @member {number}
 */
prototypeAccessors$3.width.get = function ()
{
    return this.canvas.width;
};

prototypeAccessors$3.width.set = function (val) // eslint-disable-line require-jsdoc
{
    this.canvas.width = val;
};

/**
 * The height of the canvas buffer in pixels.
 *
 * @member {number}
 */
prototypeAccessors$3.height.get = function ()
{
    return this.canvas.height;
};

prototypeAccessors$3.height.set = function (val) // eslint-disable-line require-jsdoc
{
    this.canvas.height = val;
};

Object.defineProperties( CanvasRenderTarget.prototype, prototypeAccessors$3 );

/*!
 * @pixi/display - v5.1.0
 * Compiled Fri, 19 Jul 2019 21:54:36 UTC
 *
 * @pixi/display is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */

/**
 * Sets the default value for the container property 'sortableChildren'.
 * If set to true, the container will sort its children by zIndex value
 * when updateTransform() is called, or manually if sortChildren() is called.
 *
 * This actually changes the order of elements in the array, so should be treated
 * as a basic solution that is not performant compared to other solutions,
 * such as @link https://github.com/pixijs/pixi-display
 *
 * Also be aware of that this may not work nicely with the addChildAt() function,
 * as the zIndex sorting may cause the child to automatically sorted to another position.
 *
 * @static
 * @constant
 * @name SORTABLE_CHILDREN
 * @memberof PIXI.settings
 * @type {boolean}
 * @default false
 */
settings.SORTABLE_CHILDREN = false;

/**
 * 'Builder' pattern for bounds rectangles.
 *
 * This could be called an Axis-Aligned Bounding Box.
 * It is not an actual shape. It is a mutable thing; no 'EMPTY' or those kind of problems.
 *
 * @class
 * @memberof PIXI
 */
var Bounds = function Bounds()
{
    /**
     * @member {number}
     * @default 0
     */
    this.minX = Infinity;

    /**
     * @member {number}
     * @default 0
     */
    this.minY = Infinity;

    /**
     * @member {number}
     * @default 0
     */
    this.maxX = -Infinity;

    /**
     * @member {number}
     * @default 0
     */
    this.maxY = -Infinity;

    this.rect = null;
};

/**
 * Checks if bounds are empty.
 *
 * @return {boolean} True if empty.
 */
Bounds.prototype.isEmpty = function isEmpty ()
{
    return this.minX > this.maxX || this.minY > this.maxY;
};

/**
 * Clears the bounds and resets.
 *
 */
Bounds.prototype.clear = function clear ()
{
    this.updateID++;

    this.minX = Infinity;
    this.minY = Infinity;
    this.maxX = -Infinity;
    this.maxY = -Infinity;
};

/**
 * Can return Rectangle.EMPTY constant, either construct new rectangle, either use your rectangle
 * It is not guaranteed that it will return tempRect
 *
 * @param {PIXI.Rectangle} rect - temporary object will be used if AABB is not empty
 * @returns {PIXI.Rectangle} A rectangle of the bounds
 */
Bounds.prototype.getRectangle = function getRectangle (rect)
{
    if (this.minX > this.maxX || this.minY > this.maxY)
    {
        return Rectangle.EMPTY;
    }

    rect = rect || new Rectangle(0, 0, 1, 1);

    rect.x = this.minX;
    rect.y = this.minY;
    rect.width = this.maxX - this.minX;
    rect.height = this.maxY - this.minY;

    return rect;
};

/**
 * This function should be inlined when its possible.
 *
 * @param {PIXI.Point} point - The point to add.
 */
Bounds.prototype.addPoint = function addPoint (point)
{
    this.minX = Math.min(this.minX, point.x);
    this.maxX = Math.max(this.maxX, point.x);
    this.minY = Math.min(this.minY, point.y);
    this.maxY = Math.max(this.maxY, point.y);
};

/**
 * Adds a quad, not transformed
 *
 * @param {Float32Array} vertices - The verts to add.
 */
Bounds.prototype.addQuad = function addQuad (vertices)
{
    var minX = this.minX;
    var minY = this.minY;
    var maxX = this.maxX;
    var maxY = this.maxY;

    var x = vertices[0];
    var y = vertices[1];

    minX = x < minX ? x : minX;
    minY = y < minY ? y : minY;
    maxX = x > maxX ? x : maxX;
    maxY = y > maxY ? y : maxY;

    x = vertices[2];
    y = vertices[3];
    minX = x < minX ? x : minX;
    minY = y < minY ? y : minY;
    maxX = x > maxX ? x : maxX;
    maxY = y > maxY ? y : maxY;

    x = vertices[4];
    y = vertices[5];
    minX = x < minX ? x : minX;
    minY = y < minY ? y : minY;
    maxX = x > maxX ? x : maxX;
    maxY = y > maxY ? y : maxY;

    x = vertices[6];
    y = vertices[7];
    minX = x < minX ? x : minX;
    minY = y < minY ? y : minY;
    maxX = x > maxX ? x : maxX;
    maxY = y > maxY ? y : maxY;

    this.minX = minX;
    this.minY = minY;
    this.maxX = maxX;
    this.maxY = maxY;
};

/**
 * Adds sprite frame, transformed.
 *
 * @param {PIXI.Transform} transform - TODO
 * @param {number} x0 - TODO
 * @param {number} y0 - TODO
 * @param {number} x1 - TODO
 * @param {number} y1 - TODO
 */
Bounds.prototype.addFrame = function addFrame (transform, x0, y0, x1, y1)
{
    var matrix = transform.worldTransform;
    var a = matrix.a;
    var b = matrix.b;
    var c = matrix.c;
    var d = matrix.d;
    var tx = matrix.tx;
    var ty = matrix.ty;

    var minX = this.minX;
    var minY = this.minY;
    var maxX = this.maxX;
    var maxY = this.maxY;

    var x = (a * x0) + (c * y0) + tx;
    var y = (b * x0) + (d * y0) + ty;

    minX = x < minX ? x : minX;
    minY = y < minY ? y : minY;
    maxX = x > maxX ? x : maxX;
    maxY = y > maxY ? y : maxY;

    x = (a * x1) + (c * y0) + tx;
    y = (b * x1) + (d * y0) + ty;
    minX = x < minX ? x : minX;
    minY = y < minY ? y : minY;
    maxX = x > maxX ? x : maxX;
    maxY = y > maxY ? y : maxY;

    x = (a * x0) + (c * y1) + tx;
    y = (b * x0) + (d * y1) + ty;
    minX = x < minX ? x : minX;
    minY = y < minY ? y : minY;
    maxX = x > maxX ? x : maxX;
    maxY = y > maxY ? y : maxY;

    x = (a * x1) + (c * y1) + tx;
    y = (b * x1) + (d * y1) + ty;
    minX = x < minX ? x : minX;
    minY = y < minY ? y : minY;
    maxX = x > maxX ? x : maxX;
    maxY = y > maxY ? y : maxY;

    this.minX = minX;
    this.minY = minY;
    this.maxX = maxX;
    this.maxY = maxY;
};

/**
 * Adds screen vertices from array
 *
 * @param {Float32Array} vertexData - calculated vertices
 * @param {number} beginOffset - begin offset
 * @param {number} endOffset - end offset, excluded
 */
Bounds.prototype.addVertexData = function addVertexData (vertexData, beginOffset, endOffset)
{
    var minX = this.minX;
    var minY = this.minY;
    var maxX = this.maxX;
    var maxY = this.maxY;

    for (var i = beginOffset; i < endOffset; i += 2)
    {
        var x = vertexData[i];
        var y = vertexData[i + 1];

        minX = x < minX ? x : minX;
        minY = y < minY ? y : minY;
        maxX = x > maxX ? x : maxX;
        maxY = y > maxY ? y : maxY;
    }

    this.minX = minX;
    this.minY = minY;
    this.maxX = maxX;
    this.maxY = maxY;
};

/**
 * Add an array of mesh vertices
 *
 * @param {PIXI.Transform} transform - mesh transform
 * @param {Float32Array} vertices - mesh coordinates in array
 * @param {number} beginOffset - begin offset
 * @param {number} endOffset - end offset, excluded
 */
Bounds.prototype.addVertices = function addVertices (transform, vertices, beginOffset, endOffset)
{
    var matrix = transform.worldTransform;
    var a = matrix.a;
    var b = matrix.b;
    var c = matrix.c;
    var d = matrix.d;
    var tx = matrix.tx;
    var ty = matrix.ty;

    var minX = this.minX;
    var minY = this.minY;
    var maxX = this.maxX;
    var maxY = this.maxY;

    for (var i = beginOffset; i < endOffset; i += 2)
    {
        var rawX = vertices[i];
        var rawY = vertices[i + 1];
        var x = (a * rawX) + (c * rawY) + tx;
        var y = (d * rawY) + (b * rawX) + ty;

        minX = x < minX ? x : minX;
        minY = y < minY ? y : minY;
        maxX = x > maxX ? x : maxX;
        maxY = y > maxY ? y : maxY;
    }

    this.minX = minX;
    this.minY = minY;
    this.maxX = maxX;
    this.maxY = maxY;
};

/**
 * Adds other Bounds
 *
 * @param {PIXI.Bounds} bounds - TODO
 */
Bounds.prototype.addBounds = function addBounds (bounds)
{
    var minX = this.minX;
    var minY = this.minY;
    var maxX = this.maxX;
    var maxY = this.maxY;

    this.minX = bounds.minX < minX ? bounds.minX : minX;
    this.minY = bounds.minY < minY ? bounds.minY : minY;
    this.maxX = bounds.maxX > maxX ? bounds.maxX : maxX;
    this.maxY = bounds.maxY > maxY ? bounds.maxY : maxY;
};

/**
 * Adds other Bounds, masked with Bounds
 *
 * @param {PIXI.Bounds} bounds - TODO
 * @param {PIXI.Bounds} mask - TODO
 */
Bounds.prototype.addBoundsMask = function addBoundsMask (bounds, mask)
{
    var _minX = bounds.minX > mask.minX ? bounds.minX : mask.minX;
    var _minY = bounds.minY > mask.minY ? bounds.minY : mask.minY;
    var _maxX = bounds.maxX < mask.maxX ? bounds.maxX : mask.maxX;
    var _maxY = bounds.maxY < mask.maxY ? bounds.maxY : mask.maxY;

    if (_minX <= _maxX && _minY <= _maxY)
    {
        var minX = this.minX;
        var minY = this.minY;
        var maxX = this.maxX;
        var maxY = this.maxY;

        this.minX = _minX < minX ? _minX : minX;
        this.minY = _minY < minY ? _minY : minY;
        this.maxX = _maxX > maxX ? _maxX : maxX;
        this.maxY = _maxY > maxY ? _maxY : maxY;
    }
};

/**
 * Adds other Bounds, masked with Rectangle
 *
 * @param {PIXI.Bounds} bounds - TODO
 * @param {PIXI.Rectangle} area - TODO
 */
Bounds.prototype.addBoundsArea = function addBoundsArea (bounds, area)
{
    var _minX = bounds.minX > area.x ? bounds.minX : area.x;
    var _minY = bounds.minY > area.y ? bounds.minY : area.y;
    var _maxX = bounds.maxX < area.x + area.width ? bounds.maxX : (area.x + area.width);
    var _maxY = bounds.maxY < area.y + area.height ? bounds.maxY : (area.y + area.height);

    if (_minX <= _maxX && _minY <= _maxY)
    {
        var minX = this.minX;
        var minY = this.minY;
        var maxX = this.maxX;
        var maxY = this.maxY;

        this.minX = _minX < minX ? _minX : minX;
        this.minY = _minY < minY ? _minY : minY;
        this.maxX = _maxX > maxX ? _maxX : maxX;
        this.maxY = _maxY > maxY ? _maxY : maxY;
    }
};

// _tempDisplayObjectParent = new DisplayObject();

/**
 * The base class for all objects that are rendered on the screen.
 *
 * This is an abstract class and should not be used on its own; rather it should be extended.
 *
 * @class
 * @extends PIXI.utils.EventEmitter
 * @memberof PIXI
 */
var DisplayObject = /*@__PURE__*/(function (EventEmitter) {
    function DisplayObject()
    {
        EventEmitter.call(this);

        this.tempDisplayObjectParent = null;

        // TODO: need to create Transform from factory
        /**
         * World transform and local transform of this object.
         * This will become read-only later, please do not assign anything there unless you know what are you doing.
         *
         * @member {PIXI.Transform}
         */
        this.transform = new Transform();

        /**
         * The opacity of the object.
         *
         * @member {number}
         */
        this.alpha = 1;

        /**
         * The visibility of the object. If false the object will not be drawn, and
         * the updateTransform function will not be called.
         *
         * Only affects recursive calls from parent. You can ask for bounds or call updateTransform manually.
         *
         * @member {boolean}
         */
        this.visible = true;

        /**
         * Can this object be rendered, if false the object will not be drawn but the updateTransform
         * methods will still be called.
         *
         * Only affects recursive calls from parent. You can ask for bounds manually.
         *
         * @member {boolean}
         */
        this.renderable = true;

        /**
         * The display object container that contains this display object.
         *
         * @member {PIXI.Container}
         * @readonly
         */
        this.parent = null;

        /**
         * The multiplied alpha of the displayObject.
         *
         * @member {number}
         * @readonly
         */
        this.worldAlpha = 1;

        /**
         * Which index in the children array the display component was before the previous zIndex sort.
         * Used by containers to help sort objects with the same zIndex, by using previous array index as the decider.
         *
         * @member {number}
         * @protected
         */
        this._lastSortedIndex = 0;

        /**
         * The zIndex of the displayObject.
         * A higher value will mean it will be rendered on top of other displayObjects within the same container.
         *
         * @member {number}
         * @protected
         */
        this._zIndex = 0;

        /**
         * The area the filter is applied to. This is used as more of an optimization
         * rather than figuring out the dimensions of the displayObject each frame you can set this rectangle.
         *
         * Also works as an interaction mask.
         *
         * @member {?PIXI.Rectangle}
         */
        this.filterArea = null;

        /**
         * Sets the filters for the displayObject.
         * * IMPORTANT: This is a WebGL only feature and will be ignored by the canvas renderer.
         * To remove filters simply set this property to `'null'`.
         *
         * @member {?PIXI.Filter[]}
         */
        this.filters = null;
        this._enabledFilters = null;

        /**
         * The bounds object, this is used to calculate and store the bounds of the displayObject.
         *
         * @member {PIXI.Bounds}
         * @protected
         */
        this._bounds = new Bounds();
        this._boundsID = 0;
        this._lastBoundsID = -1;
        this._boundsRect = null;
        this._localBoundsRect = null;

        /**
         * The original, cached mask of the object.
         *
         * @member {PIXI.Graphics|PIXI.Sprite|null}
         * @protected
         */
        this._mask = null;

        /**
         * Fired when this DisplayObject is added to a Container.
         *
         * @event PIXI.DisplayObject#added
         * @param {PIXI.Container} container - The container added to.
         */

        /**
         * Fired when this DisplayObject is removed from a Container.
         *
         * @event PIXI.DisplayObject#removed
         * @param {PIXI.Container} container - The container removed from.
         */

        /**
         * If the object has been destroyed via destroy(). If true, it should not be used.
         *
         * @member {boolean}
         * @protected
         */
        this._destroyed = false;

        /**
         * used to fast check if a sprite is.. a sprite!
         * @member {boolean}
         */
        this.isSprite = false;
    }

    if ( EventEmitter ) DisplayObject.__proto__ = EventEmitter;
    DisplayObject.prototype = Object.create( EventEmitter && EventEmitter.prototype );
    DisplayObject.prototype.constructor = DisplayObject;

    var prototypeAccessors = { _tempDisplayObjectParent: { configurable: true },x: { configurable: true },y: { configurable: true },worldTransform: { configurable: true },localTransform: { configurable: true },position: { configurable: true },scale: { configurable: true },pivot: { configurable: true },skew: { configurable: true },rotation: { configurable: true },angle: { configurable: true },zIndex: { configurable: true },worldVisible: { configurable: true },mask: { configurable: true } };

    /**
     * @protected
     * @member {PIXI.DisplayObject}
     */
    DisplayObject.mixin = function mixin (source)
    {
        // in ES8/ES2017, this would be really easy:
        // Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));

        // get all the enumerable property keys
        var keys = Object.keys(source);

        // loop through properties
        for (var i = 0; i < keys.length; ++i)
        {
            var propertyName = keys[i];

            // Set the property using the property descriptor - this works for accessors and normal value properties
            Object.defineProperty(
                DisplayObject.prototype,
                propertyName,
                Object.getOwnPropertyDescriptor(source, propertyName)
            );
        }
    };

    prototypeAccessors._tempDisplayObjectParent.get = function ()
    {
        if (this.tempDisplayObjectParent === null)
        {
            this.tempDisplayObjectParent = new DisplayObject();
        }

        return this.tempDisplayObjectParent;
    };

    /**
     * Updates the object transform for rendering.
     *
     * TODO - Optimization pass!
     */
    DisplayObject.prototype.updateTransform = function updateTransform ()
    {
        this.transform.updateTransform(this.parent.transform);
        // multiply the alphas..
        this.worldAlpha = this.alpha * this.parent.worldAlpha;

        this._bounds.updateID++;
    };

    /**
     * Recursively updates transform of all objects from the root to this one
     * internal function for toLocal()
     */
    DisplayObject.prototype._recursivePostUpdateTransform = function _recursivePostUpdateTransform ()
    {
        if (this.parent)
        {
            this.parent._recursivePostUpdateTransform();
            this.transform.updateTransform(this.parent.transform);
        }
        else
        {
            this.transform.updateTransform(this._tempDisplayObjectParent.transform);
        }
    };

    /**
     * Retrieves the bounds of the displayObject as a rectangle object.
     *
     * @param {boolean} [skipUpdate] - Setting to `true` will stop the transforms of the scene graph from
     *  being updated. This means the calculation returned MAY be out of date BUT will give you a
     *  nice performance boost.
     * @param {PIXI.Rectangle} [rect] - Optional rectangle to store the result of the bounds calculation.
     * @return {PIXI.Rectangle} The rectangular bounding area.
     */
    DisplayObject.prototype.getBounds = function getBounds (skipUpdate, rect)
    {
        if (!skipUpdate)
        {
            if (!this.parent)
            {
                this.parent = this._tempDisplayObjectParent;
                this.updateTransform();
                this.parent = null;
            }
            else
            {
                this._recursivePostUpdateTransform();
                this.updateTransform();
            }
        }

        if (this._boundsID !== this._lastBoundsID)
        {
            this.calculateBounds();
        }

        if (!rect)
        {
            if (!this._boundsRect)
            {
                this._boundsRect = new Rectangle();
            }

            rect = this._boundsRect;
        }

        return this._bounds.getRectangle(rect);
    };

    /**
     * Retrieves the local bounds of the displayObject as a rectangle object.
     *
     * @param {PIXI.Rectangle} [rect] - Optional rectangle to store the result of the bounds calculation.
     * @return {PIXI.Rectangle} The rectangular bounding area.
     */
    DisplayObject.prototype.getLocalBounds = function getLocalBounds (rect)
    {
        var transformRef = this.transform;
        var parentRef = this.parent;

        this.parent = null;
        this.transform = this._tempDisplayObjectParent.transform;

        if (!rect)
        {
            if (!this._localBoundsRect)
            {
                this._localBoundsRect = new Rectangle();
            }

            rect = this._localBoundsRect;
        }

        var bounds = this.getBounds(false, rect);

        this.parent = parentRef;
        this.transform = transformRef;

        return bounds;
    };

    /**
     * Calculates the global position of the display object.
     *
     * @param {PIXI.IPoint} position - The world origin to calculate from.
     * @param {PIXI.IPoint} [point] - A Point object in which to store the value, optional
     *  (otherwise will create a new Point).
     * @param {boolean} [skipUpdate=false] - Should we skip the update transform.
     * @return {PIXI.IPoint} A point object representing the position of this object.
     */
    DisplayObject.prototype.toGlobal = function toGlobal (position, point, skipUpdate)
    {
        if ( skipUpdate === void 0 ) skipUpdate = false;

        if (!skipUpdate)
        {
            this._recursivePostUpdateTransform();

            // this parent check is for just in case the item is a root object.
            // If it is we need to give it a temporary parent so that displayObjectUpdateTransform works correctly
            // this is mainly to avoid a parent check in the main loop. Every little helps for performance :)
            if (!this.parent)
            {
                this.parent = this._tempDisplayObjectParent;
                this.displayObjectUpdateTransform();
                this.parent = null;
            }
            else
            {
                this.displayObjectUpdateTransform();
            }
        }

        // don't need to update the lot
        return this.worldTransform.apply(position, point);
    };

    /**
     * Calculates the local position of the display object relative to another point.
     *
     * @param {PIXI.IPoint} position - The world origin to calculate from.
     * @param {PIXI.DisplayObject} [from] - The DisplayObject to calculate the global position from.
     * @param {PIXI.IPoint} [point] - A Point object in which to store the value, optional
     *  (otherwise will create a new Point).
     * @param {boolean} [skipUpdate=false] - Should we skip the update transform
     * @return {PIXI.IPoint} A point object representing the position of this object
     */
    DisplayObject.prototype.toLocal = function toLocal (position, from, point, skipUpdate)
    {
        if (from)
        {
            position = from.toGlobal(position, point, skipUpdate);
        }

        if (!skipUpdate)
        {
            this._recursivePostUpdateTransform();

            // this parent check is for just in case the item is a root object.
            // If it is we need to give it a temporary parent so that displayObjectUpdateTransform works correctly
            // this is mainly to avoid a parent check in the main loop. Every little helps for performance :)
            if (!this.parent)
            {
                this.parent = this._tempDisplayObjectParent;
                this.displayObjectUpdateTransform();
                this.parent = null;
            }
            else
            {
                this.displayObjectUpdateTransform();
            }
        }

        // simply apply the matrix..
        return this.worldTransform.applyInverse(position, point);
    };

    /**
     * Renders the object using the WebGL renderer.
     *
     * @param {PIXI.Renderer} renderer - The renderer.
     */
    DisplayObject.prototype.render = function render (renderer) // eslint-disable-line no-unused-vars
    {
        // OVERWRITE;
    };

    /**
     * Set the parent Container of this DisplayObject.
     *
     * @param {PIXI.Container} container - The Container to add this DisplayObject to.
     * @return {PIXI.Container} The Container that this DisplayObject was added to.
     */
    DisplayObject.prototype.setParent = function setParent (container)
    {
        if (!container || !container.addChild)
        {
            throw new Error('setParent: Argument must be a Container');
        }

        container.addChild(this);

        return container;
    };

    /**
     * Convenience function to set the position, scale, skew and pivot at once.
     *
     * @param {number} [x=0] - The X position
     * @param {number} [y=0] - The Y position
     * @param {number} [scaleX=1] - The X scale value
     * @param {number} [scaleY=1] - The Y scale value
     * @param {number} [rotation=0] - The rotation
     * @param {number} [skewX=0] - The X skew value
     * @param {number} [skewY=0] - The Y skew value
     * @param {number} [pivotX=0] - The X pivot value
     * @param {number} [pivotY=0] - The Y pivot value
     * @return {PIXI.DisplayObject} The DisplayObject instance
     */
    DisplayObject.prototype.setTransform = function setTransform (x, y, scaleX, scaleY, rotation, skewX, skewY, pivotX, pivotY)
    {
        if ( x === void 0 ) x = 0;
        if ( y === void 0 ) y = 0;
        if ( scaleX === void 0 ) scaleX = 1;
        if ( scaleY === void 0 ) scaleY = 1;
        if ( rotation === void 0 ) rotation = 0;
        if ( skewX === void 0 ) skewX = 0;
        if ( skewY === void 0 ) skewY = 0;
        if ( pivotX === void 0 ) pivotX = 0;
        if ( pivotY === void 0 ) pivotY = 0;

        this.position.x = x;
        this.position.y = y;
        this.scale.x = !scaleX ? 1 : scaleX;
        this.scale.y = !scaleY ? 1 : scaleY;
        this.rotation = rotation;
        this.skew.x = skewX;
        this.skew.y = skewY;
        this.pivot.x = pivotX;
        this.pivot.y = pivotY;

        return this;
    };

    /**
     * Base destroy method for generic display objects. This will automatically
     * remove the display object from its parent Container as well as remove
     * all current event listeners and internal references. Do not use a DisplayObject
     * after calling `destroy()`.
     *
     */
    DisplayObject.prototype.destroy = function destroy ()
    {
        this.removeAllListeners();
        if (this.parent)
        {
            this.parent.removeChild(this);
        }
        this.transform = null;

        this.parent = null;

        this._bounds = null;
        this._currentBounds = null;
        this._mask = null;

        this.filterArea = null;

        this.interactive = false;
        this.interactiveChildren = false;

        this._destroyed = true;
    };

    /**
     * The position of the displayObject on the x axis relative to the local coordinates of the parent.
     * An alias to position.x
     *
     * @member {number}
     */
    prototypeAccessors.x.get = function ()
    {
        return this.position.x;
    };

    prototypeAccessors.x.set = function (value) // eslint-disable-line require-jsdoc
    {
        this.transform.position.x = value;
    };

    /**
     * The position of the displayObject on the y axis relative to the local coordinates of the parent.
     * An alias to position.y
     *
     * @member {number}
     */
    prototypeAccessors.y.get = function ()
    {
        return this.position.y;
    };

    prototypeAccessors.y.set = function (value) // eslint-disable-line require-jsdoc
    {
        this.transform.position.y = value;
    };

    /**
     * Current transform of the object based on world (parent) factors.
     *
     * @member {PIXI.Matrix}
     * @readonly
     */
    prototypeAccessors.worldTransform.get = function ()
    {
        return this.transform.worldTransform;
    };

    /**
     * Current transform of the object based on local factors: position, scale, other stuff.
     *
     * @member {PIXI.Matrix}
     * @readonly
     */
    prototypeAccessors.localTransform.get = function ()
    {
        return this.transform.localTransform;
    };

    /**
     * The coordinate of the object relative to the local coordinates of the parent.
     * Assignment by value since pixi-v4.
     *
     * @member {PIXI.IPoint}
     */
    prototypeAccessors.position.get = function ()
    {
        return this.transform.position;
    };

    prototypeAccessors.position.set = function (value) // eslint-disable-line require-jsdoc
    {
        this.transform.position.copyFrom(value);
    };

    /**
     * The scale factor of the object.
     * Assignment by value since pixi-v4.
     *
     * @member {PIXI.IPoint}
     */
    prototypeAccessors.scale.get = function ()
    {
        return this.transform.scale;
    };

    prototypeAccessors.scale.set = function (value) // eslint-disable-line require-jsdoc
    {
        this.transform.scale.copyFrom(value);
    };

    /**
     * The pivot point of the displayObject that it rotates around.
     * Assignment by value since pixi-v4.
     *
     * @member {PIXI.IPoint}
     */
    prototypeAccessors.pivot.get = function ()
    {
        return this.transform.pivot;
    };

    prototypeAccessors.pivot.set = function (value) // eslint-disable-line require-jsdoc
    {
        this.transform.pivot.copyFrom(value);
    };

    /**
     * The skew factor for the object in radians.
     * Assignment by value since pixi-v4.
     *
     * @member {PIXI.ObservablePoint}
     */
    prototypeAccessors.skew.get = function ()
    {
        return this.transform.skew;
    };

    prototypeAccessors.skew.set = function (value) // eslint-disable-line require-jsdoc
    {
        this.transform.skew.copyFrom(value);
    };

    /**
     * The rotation of the object in radians.
     * 'rotation' and 'angle' have the same effect on a display object; rotation is in radians, angle is in degrees.
     *
     * @member {number}
     */
    prototypeAccessors.rotation.get = function ()
    {
        return this.transform.rotation;
    };

    prototypeAccessors.rotation.set = function (value) // eslint-disable-line require-jsdoc
    {
        this.transform.rotation = value;
    };

    /**
     * The angle of the object in degrees.
     * 'rotation' and 'angle' have the same effect on a display object; rotation is in radians, angle is in degrees.
     *
     * @member {number}
     */
    prototypeAccessors.angle.get = function ()
    {
        return this.transform.rotation * RAD_TO_DEG;
    };

    prototypeAccessors.angle.set = function (value) // eslint-disable-line require-jsdoc
    {
        this.transform.rotation = value * DEG_TO_RAD;
    };

    /**
     * The zIndex of the displayObject.
     * If a container has the sortableChildren property set to true, children will be automatically
     * sorted by zIndex value; a higher value will mean it will be moved towards the end of the array,
     * and thus rendered on top of other displayObjects within the same container.
     *
     * @member {number}
     */
    prototypeAccessors.zIndex.get = function ()
    {
        return this._zIndex;
    };

    prototypeAccessors.zIndex.set = function (value) // eslint-disable-line require-jsdoc
    {
        this._zIndex = value;
        if (this.parent)
        {
            this.parent.sortDirty = true;
        }
    };

    /**
     * Indicates if the object is globally visible.
     *
     * @member {boolean}
     * @readonly
     */
    prototypeAccessors.worldVisible.get = function ()
    {
        var item = this;

        do
        {
            if (!item.visible)
            {
                return false;
            }

            item = item.parent;
        } while (item);

        return true;
    };

    /**
     * Sets a mask for the displayObject. A mask is an object that limits the visibility of an
     * object to the shape of the mask applied to it. In PixiJS a regular mask must be a
     * {@link PIXI.Graphics} or a {@link PIXI.Sprite} object. This allows for much faster masking in canvas as it
     * utilities shape clipping. To remove a mask, set this property to `null`.
     *
     * For sprite mask both alpha and red channel are used. Black mask is the same as transparent mask.
     * @example
     * const graphics = new PIXI.Graphics();
     * graphics.beginFill(0xFF3300);
     * graphics.drawRect(50, 250, 100, 100);
     * graphics.endFill();
     *
     * const sprite = new PIXI.Sprite(texture);
     * sprite.mask = graphics;
     * @todo At the moment, PIXI.CanvasRenderer doesn't support PIXI.Sprite as mask.
     *
     * @member {PIXI.Graphics|PIXI.Sprite|null}
     */
    prototypeAccessors.mask.get = function ()
    {
        return this._mask;
    };

    prototypeAccessors.mask.set = function (value) // eslint-disable-line require-jsdoc
    {
        if (this._mask)
        {
            this._mask.renderable = true;
            this._mask.isMask = false;
        }

        this._mask = value;

        if (this._mask)
        {
            this._mask.renderable = false;
            this._mask.isMask = true;
        }
    };

    Object.defineProperties( DisplayObject.prototype, prototypeAccessors );

    return DisplayObject;
}(eventemitter3));

/**
 * DisplayObject default updateTransform, does not update children of container.
 * Will crash if there's no parent element.
 *
 * @memberof PIXI.DisplayObject#
 * @function displayObjectUpdateTransform
 */
DisplayObject.prototype.displayObjectUpdateTransform = DisplayObject.prototype.updateTransform;

function sortChildren(a, b)
{
    if (a.zIndex === b.zIndex)
    {
        return a._lastSortedIndex - b._lastSortedIndex;
    }

    return a.zIndex - b.zIndex;
}

/**
 * A Container represents a collection of display objects.
 *
 * It is the base class of all display objects that act as a container for other objects (like Sprites).
 *
 *```js
 * let container = new PIXI.Container();
 * container.addChild(sprite);
 * ```
 *
 * @class
 * @extends PIXI.DisplayObject
 * @memberof PIXI
 */
var Container = /*@__PURE__*/(function (DisplayObject) {
    function Container()
    {
        DisplayObject.call(this);

        /**
         * The array of children of this container.
         *
         * @member {PIXI.DisplayObject[]}
         * @readonly
         */
        this.children = [];

        /**
         * If set to true, the container will sort its children by zIndex value
         * when updateTransform() is called, or manually if sortChildren() is called.
         *
         * This actually changes the order of elements in the array, so should be treated
         * as a basic solution that is not performant compared to other solutions,
         * such as @link https://github.com/pixijs/pixi-display
         *
         * Also be aware of that this may not work nicely with the addChildAt() function,
         * as the zIndex sorting may cause the child to automatically sorted to another position.
         *
         * @see PIXI.settings.SORTABLE_CHILDREN
         *
         * @member {boolean}
         */
        this.sortableChildren = settings.SORTABLE_CHILDREN;

        /**
         * Should children be sorted by zIndex at the next updateTransform call.
         * Will get automatically set to true if a new child is added, or if a child's zIndex changes.
         *
         * @member {boolean}
         */
        this.sortDirty = false;

        /**
         * Fired when a DisplayObject is added to this Container.
         *
         * @event PIXI.Container#childAdded
         * @param {PIXI.DisplayObject} child - The child added to the Container.
         * @param {PIXI.Container} container - The container that added the child.
         * @param {number} index - The children's index of the added child.
         */

        /**
         * Fired when a DisplayObject is removed from this Container.
         *
         * @event PIXI.DisplayObject#removedFrom
         * @param {PIXI.DisplayObject} child - The child removed from the Container.
         * @param {PIXI.Container} container - The container that removed removed the child.
         * @param {number} index - The former children's index of the removed child
         */
    }

    if ( DisplayObject ) Container.__proto__ = DisplayObject;
    Container.prototype = Object.create( DisplayObject && DisplayObject.prototype );
    Container.prototype.constructor = Container;

    var prototypeAccessors = { width: { configurable: true },height: { configurable: true } };

    /**
     * Overridable method that can be used by Container subclasses whenever the children array is modified
     *
     * @protected
     */
    Container.prototype.onChildrenChange = function onChildrenChange ()
    {
        /* empty */
    };

    /**
     * Adds one or more children to the container.
     *
     * Multiple items can be added like so: `myContainer.addChild(thingOne, thingTwo, thingThree)`
     *
     * @param {...PIXI.DisplayObject} child - The DisplayObject(s) to add to the container
     * @return {PIXI.DisplayObject} The first child that was added.
     */
    Container.prototype.addChild = function addChild (child)
    {
        var arguments$1 = arguments;

        var argumentsLength = arguments.length;

        // if there is only one argument we can bypass looping through the them
        if (argumentsLength > 1)
        {
            // loop through the arguments property and add all children
            // use it the right way (.length and [i]) so that this function can still be optimized by JS runtimes
            for (var i = 0; i < argumentsLength; i++)
            {
                this.addChild(arguments$1[i]);
            }
        }
        else
        {
            // if the child has a parent then lets remove it as PixiJS objects can only exist in one place
            if (child.parent)
            {
                child.parent.removeChild(child);
            }

            child.parent = this;
            this.sortDirty = true;

            // ensure child transform will be recalculated
            child.transform._parentID = -1;

            this.children.push(child);

            // ensure bounds will be recalculated
            this._boundsID++;

            // TODO - lets either do all callbacks or all events.. not both!
            this.onChildrenChange(this.children.length - 1);
            this.emit('childAdded', child, this, this.children.length - 1);
            child.emit('added', this);
        }

        return child;
    };

    /**
     * Adds a child to the container at a specified index. If the index is out of bounds an error will be thrown
     *
     * @param {PIXI.DisplayObject} child - The child to add
     * @param {number} index - The index to place the child in
     * @return {PIXI.DisplayObject} The child that was added.
     */
    Container.prototype.addChildAt = function addChildAt (child, index)
    {
        if (index < 0 || index > this.children.length)
        {
            throw new Error((child + "addChildAt: The index " + index + " supplied is out of bounds " + (this.children.length)));
        }

        if (child.parent)
        {
            child.parent.removeChild(child);
        }

        child.parent = this;
        this.sortDirty = true;

        // ensure child transform will be recalculated
        child.transform._parentID = -1;

        this.children.splice(index, 0, child);

        // ensure bounds will be recalculated
        this._boundsID++;

        // TODO - lets either do all callbacks or all events.. not both!
        this.onChildrenChange(index);
        child.emit('added', this);
        this.emit('childAdded', child, this, index);

        return child;
    };

    /**
     * Swaps the position of 2 Display Objects within this container.
     *
     * @param {PIXI.DisplayObject} child - First display object to swap
     * @param {PIXI.DisplayObject} child2 - Second display object to swap
     */
    Container.prototype.swapChildren = function swapChildren (child, child2)
    {
        if (child === child2)
        {
            return;
        }

        var index1 = this.getChildIndex(child);
        var index2 = this.getChildIndex(child2);

        this.children[index1] = child2;
        this.children[index2] = child;
        this.onChildrenChange(index1 < index2 ? index1 : index2);
    };

    /**
     * Returns the index position of a child DisplayObject instance
     *
     * @param {PIXI.DisplayObject} child - The DisplayObject instance to identify
     * @return {number} The index position of the child display object to identify
     */
    Container.prototype.getChildIndex = function getChildIndex (child)
    {
        var index = this.children.indexOf(child);

        if (index === -1)
        {
            throw new Error('The supplied DisplayObject must be a child of the caller');
        }

        return index;
    };

    /**
     * Changes the position of an existing child in the display object container
     *
     * @param {PIXI.DisplayObject} child - The child DisplayObject instance for which you want to change the index number
     * @param {number} index - The resulting index number for the child display object
     */
    Container.prototype.setChildIndex = function setChildIndex (child, index)
    {
        if (index < 0 || index >= this.children.length)
        {
            throw new Error(("The index " + index + " supplied is out of bounds " + (this.children.length)));
        }

        var currentIndex = this.getChildIndex(child);

        removeItems(this.children, currentIndex, 1); // remove from old position
        this.children.splice(index, 0, child); // add at new position

        this.onChildrenChange(index);
    };

    /**
     * Returns the child at the specified index
     *
     * @param {number} index - The index to get the child at
     * @return {PIXI.DisplayObject} The child at the given index, if any.
     */
    Container.prototype.getChildAt = function getChildAt (index)
    {
        if (index < 0 || index >= this.children.length)
        {
            throw new Error(("getChildAt: Index (" + index + ") does not exist."));
        }

        return this.children[index];
    };

    /**
     * Removes one or more children from the container.
     *
     * @param {...PIXI.DisplayObject} child - The DisplayObject(s) to remove
     * @return {PIXI.DisplayObject} The first child that was removed.
     */
    Container.prototype.removeChild = function removeChild (child)
    {
        var arguments$1 = arguments;

        var argumentsLength = arguments.length;

        // if there is only one argument we can bypass looping through the them
        if (argumentsLength > 1)
        {
            // loop through the arguments property and add all children
            // use it the right way (.length and [i]) so that this function can still be optimized by JS runtimes
            for (var i = 0; i < argumentsLength; i++)
            {
                this.removeChild(arguments$1[i]);
            }
        }
        else
        {
            var index = this.children.indexOf(child);

            if (index === -1) { return null; }

            child.parent = null;
            // ensure child transform will be recalculated
            child.transform._parentID = -1;
            removeItems(this.children, index, 1);

            // ensure bounds will be recalculated
            this._boundsID++;

            // TODO - lets either do all callbacks or all events.. not both!
            this.onChildrenChange(index);
            child.emit('removed', this);
            this.emit('childRemoved', child, this, index);
        }

        return child;
    };

    /**
     * Removes a child from the specified index position.
     *
     * @param {number} index - The index to get the child from
     * @return {PIXI.DisplayObject} The child that was removed.
     */
    Container.prototype.removeChildAt = function removeChildAt (index)
    {
        var child = this.getChildAt(index);

        // ensure child transform will be recalculated..
        child.parent = null;
        child.transform._parentID = -1;
        removeItems(this.children, index, 1);

        // ensure bounds will be recalculated
        this._boundsID++;

        // TODO - lets either do all callbacks or all events.. not both!
        this.onChildrenChange(index);
        child.emit('removed', this);
        this.emit('childRemoved', child, this, index);

        return child;
    };

    /**
     * Removes all children from this container that are within the begin and end indexes.
     *
     * @param {number} [beginIndex=0] - The beginning position.
     * @param {number} [endIndex=this.children.length] - The ending position. Default value is size of the container.
     * @returns {PIXI.DisplayObject[]} List of removed children
     */
    Container.prototype.removeChildren = function removeChildren (beginIndex, endIndex)
    {
        if ( beginIndex === void 0 ) beginIndex = 0;

        var begin = beginIndex;
        var end = typeof endIndex === 'number' ? endIndex : this.children.length;
        var range = end - begin;
        var removed;

        if (range > 0 && range <= end)
        {
            removed = this.children.splice(begin, range);

            for (var i = 0; i < removed.length; ++i)
            {
                removed[i].parent = null;
                if (removed[i].transform)
                {
                    removed[i].transform._parentID = -1;
                }
            }

            this._boundsID++;

            this.onChildrenChange(beginIndex);

            for (var i$1 = 0; i$1 < removed.length; ++i$1)
            {
                removed[i$1].emit('removed', this);
                this.emit('childRemoved', removed[i$1], this, i$1);
            }

            return removed;
        }
        else if (range === 0 && this.children.length === 0)
        {
            return [];
        }

        throw new RangeError('removeChildren: numeric values are outside the acceptable range.');
    };

    /**
     * Sorts children by zIndex. Previous order is mantained for 2 children with the same zIndex.
     */
    Container.prototype.sortChildren = function sortChildren$1 ()
    {
        var sortRequired = false;

        for (var i = 0, j = this.children.length; i < j; ++i)
        {
            var child = this.children[i];

            child._lastSortedIndex = i;

            if (!sortRequired && child.zIndex !== 0)
            {
                sortRequired = true;
            }
        }

        if (sortRequired && this.children.length > 1)
        {
            this.children.sort(sortChildren);
        }

        this.sortDirty = false;
    };

    /**
     * Updates the transform on all children of this container for rendering
     */
    Container.prototype.updateTransform = function updateTransform ()
    {
        if (this.sortableChildren && this.sortDirty)
        {
            this.sortChildren();
        }

        this._boundsID++;

        this.transform.updateTransform(this.parent.transform);

        // TODO: check render flags, how to process stuff here
        this.worldAlpha = this.alpha * this.parent.worldAlpha;

        for (var i = 0, j = this.children.length; i < j; ++i)
        {
            var child = this.children[i];

            if (child.visible)
            {
                child.updateTransform();
            }
        }
    };

    /**
     * Recalculates the bounds of the container.
     *
     */
    Container.prototype.calculateBounds = function calculateBounds ()
    {
        this._bounds.clear();

        this._calculateBounds();

        for (var i = 0; i < this.children.length; i++)
        {
            var child = this.children[i];

            if (!child.visible || !child.renderable)
            {
                continue;
            }

            child.calculateBounds();

            // TODO: filter+mask, need to mask both somehow
            if (child._mask)
            {
                child._mask.calculateBounds();
                this._bounds.addBoundsMask(child._bounds, child._mask._bounds);
            }
            else if (child.filterArea)
            {
                this._bounds.addBoundsArea(child._bounds, child.filterArea);
            }
            else
            {
                this._bounds.addBounds(child._bounds);
            }
        }

        this._lastBoundsID = this._boundsID;
    };

    /**
     * Recalculates the bounds of the object. Override this to
     * calculate the bounds of the specific object (not including children).
     *
     * @protected
     */
    Container.prototype._calculateBounds = function _calculateBounds ()
    {
        // FILL IN//
    };

    /**
     * Renders the object using the WebGL renderer
     *
     * @param {PIXI.Renderer} renderer - The renderer
     */
    Container.prototype.render = function render (renderer)
    {
        // if the object is not visible or the alpha is 0 then no need to render this element
        if (!this.visible || this.worldAlpha <= 0 || !this.renderable)
        {
            return;
        }

        // do a quick check to see if this element has a mask or a filter.
        if (this._mask || this.filters)
        {
            this.renderAdvanced(renderer);
        }
        else
        {
            this._render(renderer);

            // simple render children!
            for (var i = 0, j = this.children.length; i < j; ++i)
            {
                this.children[i].render(renderer);
            }
        }
    };

    /**
     * Render the object using the WebGL renderer and advanced features.
     *
     * @protected
     * @param {PIXI.Renderer} renderer - The renderer
     */
    Container.prototype.renderAdvanced = function renderAdvanced (renderer)
    {
        renderer.batch.flush();

        var filters = this.filters;
        var mask = this._mask;

        // push filter first as we need to ensure the stencil buffer is correct for any masking
        if (filters)
        {
            if (!this._enabledFilters)
            {
                this._enabledFilters = [];
            }

            this._enabledFilters.length = 0;

            for (var i = 0; i < filters.length; i++)
            {
                if (filters[i].enabled)
                {
                    this._enabledFilters.push(filters[i]);
                }
            }

            if (this._enabledFilters.length)
            {
                renderer.filter.push(this, this._enabledFilters);
            }
        }

        if (mask)
        {
            renderer.mask.push(this, this._mask);
        }

        // add this object to the batch, only rendered if it has a texture.
        this._render(renderer);

        // now loop through the children and make sure they get rendered
        for (var i$1 = 0, j = this.children.length; i$1 < j; i$1++)
        {
            this.children[i$1].render(renderer);
        }

        renderer.batch.flush();

        if (mask)
        {
            renderer.mask.pop(this, this._mask);
        }

        if (filters && this._enabledFilters && this._enabledFilters.length)
        {
            renderer.filter.pop();
        }
    };

    /**
     * To be overridden by the subclasses.
     *
     * @protected
     * @param {PIXI.Renderer} renderer - The renderer
     */
    Container.prototype._render = function _render (renderer) // eslint-disable-line no-unused-vars
    {
        // this is where content itself gets rendered...
    };

    /**
     * Removes all internal references and listeners as well as removes children from the display list.
     * Do not use a Container after calling `destroy`.
     *
     * @param {object|boolean} [options] - Options parameter. A boolean will act as if all options
     *  have been set to that value
     * @param {boolean} [options.children=false] - if set to true, all the children will have their destroy
     *  method called as well. 'options' will be passed on to those calls.
     * @param {boolean} [options.texture=false] - Only used for child Sprites if options.children is set to true
     *  Should it destroy the texture of the child sprite
     * @param {boolean} [options.baseTexture=false] - Only used for child Sprites if options.children is set to true
     *  Should it destroy the base texture of the child sprite
     */
    Container.prototype.destroy = function destroy (options)
    {
        DisplayObject.prototype.destroy.call(this);

        this.sortDirty = false;

        var destroyChildren = typeof options === 'boolean' ? options : options && options.children;

        var oldChildren = this.removeChildren(0, this.children.length);

        if (destroyChildren)
        {
            for (var i = 0; i < oldChildren.length; ++i)
            {
                oldChildren[i].destroy(options);
            }
        }
    };

    /**
     * The width of the Container, setting this will actually modify the scale to achieve the value set
     *
     * @member {number}
     */
    prototypeAccessors.width.get = function ()
    {
        return this.scale.x * this.getLocalBounds().width;
    };

    prototypeAccessors.width.set = function (value) // eslint-disable-line require-jsdoc
    {
        var width = this.getLocalBounds().width;

        if (width !== 0)
        {
            this.scale.x = value / width;
        }
        else
        {
            this.scale.x = 1;
        }

        this._width = value;
    };

    /**
     * The height of the Container, setting this will actually modify the scale to achieve the value set
     *
     * @member {number}
     */
    prototypeAccessors.height.get = function ()
    {
        return this.scale.y * this.getLocalBounds().height;
    };

    prototypeAccessors.height.set = function (value) // eslint-disable-line require-jsdoc
    {
        var height = this.getLocalBounds().height;

        if (height !== 0)
        {
            this.scale.y = value / height;
        }
        else
        {
            this.scale.y = 1;
        }

        this._height = value;
    };

    Object.defineProperties( Container.prototype, prototypeAccessors );

    return Container;
}(DisplayObject));

// performance increase to avoid using call.. (10x faster)
Container.prototype.containerUpdateTransform = Container.prototype.updateTransform;

/**
 * @class
 * @property { Bumber } x - 世界坐标 `x` 值
 * @property { Bumber } y - 世界坐标 `y` 值
 */
var World = /** @class */ (function (_super) {
    __extends(World, _super);
    function World(scene) {
        var _this = _super.call(this) || this;
        _this.init();
        _this.scene = scene;
        return _this;
    }
    World.prototype.init = function () {
        this.x = 0;
        this.y = 0;
    };
    World.prototype.onSceneChange = function () {
        this.init();
    };
    World.prototype.shutdown = function () {
        // @ts-ignore
        this.removeChildren();
    };
    return World;
}(Container));

var Scene = /** @class */ (function () {
    function Scene(name) {
        this.name = name;
        this.canUpdate = false;
        this.world = new World(this);
        this.game = Scene.game;
        this.route = Scene.route;
        this.route.push(this);
    }
    /**
     * switchTo - 切换场景
     * @param { String } sceneName - 场景名
     * @param { Object } query - 场景参数
     *
     * @example
     *
     * import { Scene } from 'gamekit'
     * class SceneHome extends Scene {
     *     create() {
     *         this.switchTo('sceneTwo', {
     *             extra: 'data',
     *         })
     *     }
     * }
     */
    Scene.prototype.switchTo = function (sceneName, query) {
        if (query === void 0) { query = {}; }
        this.route.to(sceneName, query);
    };
    /**
     * getQuery - 获取场景参数
     * @param { String } name - 参数 key 值
     *
     * @example
     * import { Scene } from 'gamekit'
     * class SceneHome extends Scene {
     *     create() {
     *         this.getQuery() // { extra: 'data' }
     *         this.getQuery('extra') // 'data'
     *     }
     * }
     */
    Scene.prototype.getQuery = function (name) {
        if (name)
            return this.route.query[name];
        return this.route.query;
    };
    /**
     * create
     */
    Scene.prototype.create = function () {
    };
    /**
     * update
     */
    Scene.prototype.update = function () {
    };
    Scene.prototype.shutdown = function (cleanUp) {
        if (cleanUp === void 0) { cleanUp = true; }
        this.canUpdate = false;
        if (cleanUp) {
            this.world.shutdown();
        }
    };
    return Scene;
}());

var Route = /** @class */ (function () {
    function Route(game) {
        this.game = game;
        this.scenes = {};
        this.query = {};
        this.prevSceneName = null;
        this.currentSceneName = null;
        this.pendingSceneName = null;
        this.currentScene = null;
        this.instance = null;
    }
    /**
     * 把场景保存在 `this.scenes` 中
     * @param { Scene } scene - 场景实例
     * @ignore
     */
    Route.prototype.push = function (scene) {
        this.scenes[scene.name] = scene;
    };
    /**
     * 移除场景
     * @param { Scene | String } scene - 场景实例或场景名
     * @ignore
     */
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
    /**
     * 启动场景
     * @param { String } sceneName - 场景名
     * @param { Object } query - 场景参数
     * @ignore
     */
    Route.prototype.start = function (sceneName, query) {
        if (sceneName === void 0) { sceneName = ''; }
        if (query === void 0) { query = {}; }
        this.to(sceneName, query);
    };
    /**
     * 切换场景
     * @param { String } sceneName - 场景名
     * @param { Object } query - 场景参数
     * @ignore
     */
    Route.prototype.to = function (sceneName, query) {
        if (this.currentSceneName === sceneName)
            return false;
        if (this.isScene(sceneName)) {
            this.pendingSceneName = sceneName;
            this.query = query;
        }
    };
    /**
     * 场景更新
     * @ignore
     */
    Route.prototype.update = function () {
        if (this.pendingSceneName)
            this.setCurrentScene(this.pendingSceneName);
        if (this.currentScene && this.currentScene.canUpdate) {
            this.currentScene.update && this.currentScene.update();
        }
    };
    /**
     * 初始化当前成精
     * @ignore
     */
    Route.prototype.setCurrentScene = function (pendingSceneName) {
        if (!this.isScene(pendingSceneName)) {
            console.warn("\u573A\u666F " + pendingSceneName + " \u4E0D\u5B58\u5728");
            return false;
        }
        if (this.currentSceneName !== this.pendingSceneName) {
            this.currentScene = this.scenes[pendingSceneName];
            this.setGameWorld();
            this.cleanStage();
            this.fetchNextScene();
            this.stateUpdate();
            this.onSceneChange();
        }
    };
    Route.prototype.setGameWorld = function () {
        this.game.world = this.currentScene.world;
    };
    Route.prototype.cleanStage = function () {
        this.game.stage.removeChildren();
    };
    Route.prototype.fetchNextScene = function () {
        var _this = this;
        this.game.stage.addChild(this.currentScene.world);
        // @ts-ignore
        if (this.currentScene.Load && typeof this.currentScene.Load === 'function') {
            // @ts-ignore
            this.currentScene.Load(function () {
                _this.currentScene.create();
            });
        }
        else {
            this.currentScene.create();
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
            this.game.stage.removeChild(preScene.world);
        }
        this.currentScene.world.onSceneChange();
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

function useScene(game, scenes) {
    var route = new Route(game);
    var keys = Object.keys(scenes);
    var values = Object.values(scenes);
    values.map(function (Scene, index) {
        Scene.__proto__.game = game;
        Scene.__proto__.route = route;
        new Scene(keys[index]);
    });
    route.start(keys[0]);
    game.ticker.add(function () { return route.update(); });
}

export { Scene, useScene };
//# sourceMappingURL=scene.es.js.map
