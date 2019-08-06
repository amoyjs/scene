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
import { Application } from 'pixi.js'
import { useScene } from '@amoy/scene'
import SceneHome from 'path/to/SceneHome'
import SceneAbout from 'path/to/SceneAbout'

const game = new Application({
    width: window.innerWidth,
    height: window.innerHeight,
})

useScene(game, {
    home: SceneHome,
    about: SceneAbout,
})

document.body.appendChild(game.view)

// path/to/SceneHome.ts
import { Sprite } from 'pixi.js'
import { Scene } from '@amoy/scene'

class SceneHome extends Scene {
    constructor(name) {
        super(name)
    }

    Load(done) {
        setTimeout(() => {
            // Load resources here...
            // and then call `done()` after resource loaded
            // and `create` method will call after `done()`
            done()
        }, 1000)
    }

    create() {
        const helloWorld = new Text('Hello World.', {
            fill: 0xffffff,
        })
        helloWorld.interactive = true
        helloWorld.x = 200
        helloWorld.y = 200
        helloWorld.on('tap', () => {
            this.switchTo('about', {
                from: 'SceneHome',
            })
        })
        this.game.stage.addChild(helloWorld)
    }
}

// path/to/SceneAbout.ts
import { Sprite } from 'pixi.js'
import { Scene } from '@amoy/scene'

class SceneAbout extends Scene {
    constructor(name) {
        super(name)
    }

    Load(done) {
        this.Loader.add('bunny', require('./images/bunny'))
        this.Loader.onLoaded(done)
    }

    create() {
        const s1 = Sprite.from('bunny')
        this.game.stage.addChild(helloWorld)
    }
}
```
