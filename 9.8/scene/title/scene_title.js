class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
    }
    setup() {
        this.setupBg()
        this.setupZombie()
        this.setupPeashooter()
    }
    setupBg() {
        let bg = GuaImage.new(this.game, 'bgmain0')
        this.addElement(bg)
    }
    setupPeashooter() {
        var w = Peashooter.new(this.game)
        w.x = 100
        w.y = 100
        this.addElement(w)
    }
    setupZombie() {
        var w = Zombie.new(this.game)
        w.x = 200
        w.y = 100
        this.addElement(w)
    }
}
