class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
    }
    setup() {
        var w = Zombie.new(this.game)
        w.x = 100
        w.y = 100
        this.addElement(w)
    }
}
