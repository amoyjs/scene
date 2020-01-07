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

## Installation

```sh
$ npm i @amoy/scene
# or
$ yarn add @amoy/scene
```


## Usage

```js
// app.js
// use pixi `Application`
import { Application } from 'pixi.js'
import { useScene } from '@amoy/scene'
import SceneHome from 'path/to/SceneHome'
import SceneSomething from 'path/to/SceneSomething'

const game = new Application({
    width: window.innerWidth,
    height: window.innerHeight,
})

useScene(game, {
    home: SceneHome,
    something: SceneSomething,
})

document.body.appendChild(game.view)

// or use @amoy/scene `createGame`
import { createGame } from '@amoy/scene'

createGame({
    width: window.innerWidth, // defaults to `window.innerWidth`
    height: window.innerHeight, // defaults to `window.innerHeight`
    scenes: {
        home: SceneHome
        something: SceneSomething
    },
})

// path/to/SceneHome.ts
import { Sprite } from 'pixi.js'
import { Scene, Resource } from '@amoy/scene'

class SceneHome extends Scene {
    constructor(name) {
        super(name)
    }

    create() {
        const helloWorld = new Text('Hello World.', {
            fill: 0xffffff,
        })
        helloWorld.interactive = true
        helloWorld.x = 200
        helloWorld.y = 200
        helloWorld.on('tap', () => {
            this.switchTo('something', {
                from: 'SceneHome',
            })
        })
        this.stage.addChild(helloWorld)
    }
}

// path/to/SceneSomething.ts
import { Sprite } from 'pixi.js'
import { Scene } from '@amoy/scene'

Resource.useLoad(() => ({
    'bunny', require('./images/bunny'),
}))

class SceneSomething extends Scene {
    constructor(name) {
        super(name)
    }

    create() {
        const s1 = Sprite.from('bunny')
        this.stage.addChild(helloWorld)
    }
}
```
