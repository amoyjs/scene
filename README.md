# Scene

Scene for pixi.js.

## Installation

```sh
$ npm i @amoy/scene
# or
$ yarn add @amoy/scene
```


## Usage

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Scene</title>
    <style>
        body {margin: 0;}
    </style>
</head>
<body>
    <script src="path/to/pixi.js"></script>
    <script src="path/to/scene.js"></script>
    <script>
    (function () {
        const { Application, Text } = PIXI
        const { useScene, Scene } = SceneKit

        const game = new Application({
            width: window.innerWidth,
            height: window.innerHeight,
        })

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
                    this.switchTo('about', {
                        from: 'SceneHome',
                    })
                })
                this.game.stage.addChild(helloWorld)
            }
        }

        class SceneAbout extends Scene {
            constructor(name) {
                super(name)
            }
            create() {
                const helloWorld = new Text('Hello World.', {
                    fill: 0xffffff,
                })
                helloWorld.interactive = true
                helloWorld.x = 300
                helloWorld.y = 300
                helloWorld.on('tap', () => {
                    this.switchTo('home', {
                        from: 'SceneAbout',
                    })
                })
                this.game.stage.addChild(helloWorld)
            }
        }

        useScene(game, {
            home: SceneHome,
            about: SceneAbout,
        })
        document.body.appendChild(game.view)
    })()
    </script>
</body>
</html>
```
