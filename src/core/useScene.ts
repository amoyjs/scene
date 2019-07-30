import Route from './Route'

export function useScene(game: any, scenes: object) {
    const route = new Route(game)
    const keys = Object.keys(scenes)
    const values = Object.values(scenes)
    values.map((Scene, index) => {
        Scene.__proto__.game = game
        Scene.__proto__.route = route
        new Scene(keys[index])
    })
    route.start(keys[0])
    game.ticker.add(() => route.update())
}