class Grounds{
    constructor(game) {
        this.game = game
        this.setup()
    }
    static new(game) {
        var i = new this(game)
        return i
    }
    setup() {
        this.number = 30
        this.grounds = []
        this.skipCount = 5
        for (let i = 0; i < this.number; i++) {
            var g = GuaImage.new(this.game, 'ground')
            this.grounds.push(g)
            g.x = i * 7
            g.y = 250
        }
    }
    update() {
        // this.skipCount--
        // var offset = config.backforward_speed.value
        // if (this.skipCount == 0) {
        //     this.skipCount = 4
        //     offset = offset * 3 * -1
        // }
        // for (let i = 0; i < this.number; i++) {
        //     var g = this.grounds[i]
        //     g.x += offset
        // }
    }
    draw() {
        for (let p of this.grounds) {
            p.draw()
        }
    }
}


class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        // game.registerAction('k', function(){
        //     var s = Scene.new(game)
        //     game.replaceScene(s)
        // })
        // var text = '按 k 开始游戏'
        // var label = GuaLabel.new(game, text)
        // this.addElement(label)

        // var ps = GuaParticleSystem.new(game)
        // this.addElement(ps)

        var bg = GuaImage.new(game, 'background')
        this.addElement(bg)

        // var pipes = Pipes.new(game)
        // this.addElement(pipes)

        var ground = Grounds.new(game)
        this.addElement(ground)

        var mario = GuaNesSprite.new(game)
        mario.x = 100
        mario.y = 100
        this.addElement(mario)
        // var b = Mario.new(game)
        // b.x = 100
        // b.y = 100
        // this.addElement(b)

    }
    draw() {
        super.draw()
    }
    update() {
        super.update()

    }
}
