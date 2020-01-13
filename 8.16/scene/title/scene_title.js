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
