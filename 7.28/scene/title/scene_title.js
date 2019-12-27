class GuaLabel {
    constructor(game, text) {
        this.game = game
        this.text = text
    }
    static new(game, text) {
        var i = new this(game, text)
        return i
    }
    draw() {
        this.game.context.fillText(this.text, 100, 190)
    }
    update() {

    }
}

class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        // game.registerAction('k', function(){
        //     var s = Scene.new(game)
        //     game.replaceScene(s)
        // })
        var text = '按 k 开始游戏'
        var label = GuaLabel.new(game, text)
        this.addElement(label)
    }
    draw() {
        super.draw()
    }
}
