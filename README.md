<h1 align="center">Scene</h1>
<p align="center">Scene for pixi.js.</p>
<p align="center">
    <a href="https://www.npmjs.com/package/@amoy/scene">
        <img src="https://img.shields.io/npm/v/@amoy/scene.svg" alt="NPM Version">
    </a>
    <a href="https://www.npmjs.com/package/@amoy/scene">
        <img src="https://img.shields.io/npm/dt/@amoy/scene.svg" alt="NPM Downloads">
    </a>
    <a href="javascript:;">
        <img src="https://img.shields.io/github/size/amoyjs/query/dist/query.min.js.svg" alt="size">
    </a>
    <!-- <a href="https://github.com/amoyjs/query/blob/master/LICENSE">
        <img src="https://img.shields.io/github/license/amoyjs/query.svg" alt="MIT License">
    </a> -->
</p>

# Amoy Scene

`@amoy/scene` 是一个基于 `pixi.js` 封装的一个包，主要包含了以下几个功能：

- 场景管理
- 资源加载
- 属性方法等拓展

## Installation

```sh
$ npm i @amoy/scene
# or
$ yarn add @amoy/scene
```

## Usage

### Api List

- `use`
- `createGame`
- `Resource.use`
- `Resource.Load`
- `Resource.onLoading`
- `Route.to`
- `Route.back`
- `Route.getQuery`

### Entry 入口

```ts
// app.ts
import { createGame, use } from '@amoy/scene'
// scenes
import Home from '@scenes/home'
import Game from '@scenes/game'
// extenstions
import fixWeGame from '@amoy/fix-wegame'
import constraint from '@amoy/constraint'
import draggify from '@amoy/draggify'

// extenstions
use(fixWeGame) // 修复微信小游戏
use(constraint) // 拓展简单布局系统
use(draggify) // 元素拖拽功能

createGame({
    UIWidth: 750, // UI 设计稿的宽度， 默认为屏幕宽度
    UIHeight: 1334, // UI 设计稿的高度， 默认为屏幕高度
    width: 750, // canvas 的宽度， 默认为屏幕宽度
    height: 1334, // canvas 的高度， 默认为屏幕高度
    scenes: { // key 值为场景路由的标识
        Home, // key 值为 'home'
        Game, // key 值为 'game'
    },
})
```

### Scene 场景

```ts
// @scenes/home/index.ts
import { Sprite } from 'pixi.js'
import { Scene, Resource, Route } from '@amoy/scene'

// Resource.use 接受一个对象为参数，对象的 key 值为资源的 key 值（该 key 值可直接用于 Sprite.from, Texture.from 等 api），value 值为资源的 path
// eg: src/images/key.png
Resource.use({
    key: require('@src/images/key.png'),
})

// 利用工具函数简写资源配置(需要配合 webpack alias 功能)
function generateImages(imageNames: string[], path: string = '') {
    path = path === '' ? '' : (path.endsWith('/') ? path : `${path}/`)
    return imageNames.filter((name) => name.trim() !== '').reduce((prev: any, current: any) => {
        const [imageName, extenstion] = current.split('.')
        // 此处需要配合 webpack alias
        prev[imageName] = require(`@images/${path}${imageName}.${extenstion || 'png'}`)
        return prev
    }, {})
}
// 使用 `generateImages` 后 png 只需填写文件名即可，其他格式比如 jpg 则填写文件名和拓展名
Resource.use(generateImages([
    'key',
    'bg.jpg',
]))

export default class Home extends Scene {
    // create 函数会在 `Resource.use()` 的资源加载完毕后自动调用
    public create() {
        const bg = Sprite.from('bg')
        // 对于 UI 设计稿尺寸与屏幕尺寸不一致时，需要重新设置图片资源的大小以适应屏幕大小
        // 以背景图为例，有两种方式设置它的大小：
        //（不推荐）1. 计算背景图的长宽比
        const ratio = 1164 / 717
        bg.width = innerWidth // 以屏幕宽度为准
        bg.height = innerWidth * ratio // 按原比例计算高度
        //（推荐）2. 利用 createGame 通过计算传入的 `UIWidth` 和 `UIHeight` 计算出的 ratio 来 scale 图片资源
        bg.scale.set(this.ratio) // 可以在继承了 Scene 或者 Component 的类中通过 this.ratio 来获取 x 方向上的比例（this.ratios 可以获取 x 和 y 方向上的比例）
        // 以上两种方式完全等效，推荐提而终方式

        bg.interactive = true // 监听事件时，需要把该属性设置为 true
        bg.on('tap', () => {
            // 场景间的切换，可带参数
            Route.to('game', {
                from: 'home',
            })
        })
        this.stage.addChild(bg)
    }
}

// @scenes/game/index.ts
import { Sprite } from 'pixi.js'
import { Scene, Route } from '@amoy/scene'

export default class Game extends Scene {
    public create() {
        const query = Route.getQuery() // { from: 'home' }
        const from = Route.getQuery('from') // 'from'
        // Resource.use 中加载过的资源无需重复加载（key.png 在场景 Home 中加载过了）
        // 但是建议当前场景的 UI 资源仅在当前文件中加载，便于管理
        const key = Sprite.from('key')
        key.interactive = true
        key.on('tap', () => {
            Route.to('home', {
                from: 'game',
            })
        })
        this.stage.addChild(key)
    }
}

```

### Component 组件

`Component` 是继承自 `Container` 的类，上面挂载了一些可能会用到的额外信息：

- this.ratio(s): UI 像素比
- this.game: pixi application 实例
- this.game.resources: 等同于 PIXI.Loader.shared.resources

```ts
// 组件
// @components/Header.ts
import { Sprite } from 'pixi.js'
import { Component } from '@amoy/scene'
// components
import Button from '@components/Button'

export default class Header extends Component {
    constructor() {
        super()
    }
}
```

继承自 `Component` 的组件，在实例化时会自动添加到 `game.stage` 中，无需手动添加，例如：

```ts
class Home extends Scene {
    create() {
        // 会被自动添加到 `this.stage`，如果无需自动添加，可在组件内部调用 `this.parent.removeChild(this)
        new Header()
        // 或添加到指定容器
        const header = new Header()
        this.someContainer.addChild(header)
    }
}
```

## Extensions

### constraint

```js
import { Sprite } from 'pixi.js'
import { Scene } from '@amoy/scene'

export default class Game extends Scene {
    public create() {
        const key = Sprite.from('key')
        key.putCenter() // 基于父级居中
        // 在 app.ts 中 use(constraint) 后可以直接在继承了 `Container` 的类上，直接调用以下方法：
        // 注意：所有的布局方法默认都是基于父级的大小位置来定位的，具体用法看类型文件即可：

        // putCenter(offsetX?: number, offsetY?: number, global?: boolean): void
        // putCenterX(offsetX?: number, global?: boolean): void
        // putCenterY(offsetY?: number, global?: boolean): void
        // putLeft(offsetX?: number, global?: boolean): void
        // putTop(offsetY?: number, global?: boolean): void
        // putRight(offsetX?: number, global?: boolean): void
        // putBottom(offsetY?: number, global?: boolean): void

        // putCenter(global?: boolean): void
        // putCenterX(global?: boolean): void
        // putCenterY(global?: boolean): void
        // putLeft(global?: boolean): void
        // putTop(global?: boolean): void
        // putRight(global?: boolean): void
        // putBottom(global?: boolean): void
    }
}
```

> 注意：所有布局方法最后一个参数接受一个布尔类型的值 `global`，表示该元素将基于屏幕（默认是父级）来绝对定位。

### drag-drop

```js
const A = new Container()
A.addChild(Sprite.from('A'))
A.draggify()
const B = Sprite.from('A')
B.droppify()
B.on('drop', ({ target, currentTarget }) => {
    // 当 A 被拖拽到 B 所在区域时，该事件会被触发
    // target 为绑定 .draggify() 方法的元素，此处为 Container
    // currentTarget 为鼠标实际操作的元素，此处为 Sprite
})
```

## 其他

### 精灵图使用

使用在线 [texture packer](https://www.codeandweb.com/tp-online/index.html) 生成精灵图及 JSON，生成后在又上角下载 `spritesheet.json` 和 `spritesheet.png` 并重命名之：

以 numbers 精灵图为例，把重命名的 `numbers.json` 和 `numbers.png` 保存在 `src/sprites/` 文件夹中，并通过 `copy-webpack-plugin` 插件拷贝到 `dist/sprites/` 目录中：

```ts
// webpack.config.js
const Copy = require('copy-webpack-plugin')

module.exports = {
    // ...
    plugins: [
        new Copy([
            { from: 'src/sprites/**/*', to: 'sprites/[name].[ext]', }
        ]),
    ],
}
```

然后通过 `Resource.use()` 方法来加载资源：

```ts
Resource.use({
    numbers: 'sprites/numbers.json',
})
// JSON 格式大致如下
{
	"meta": {
        "image": "numbers.png",
    },
	"frames": {
		"0.png": {},
		"1.png": {},
        //...
		"9.png": {}
	}
}
// 建议把 frames 中的 `.png` 去掉，因为 pixi 在解析带有拓展名的 key 值时，可能会出错，也就是改成这样：
{
	"meta": {
        "image": "numbers.png",
    },
	"frames": {
		"0": {},
		"1": {},
        //...
		"9": {}
	}
}
```

加载完后可以这么使用：

```ts
import { Sprite, Loader } from 'pixi.js'
const textures = Loader.shared.resources['numbers'].textures
const numberOne = Sprite.from(textures['1'])
```