class PeaBullet extends GuaImage {
    constructor(game) {
        super(game, 'peabullet0')
        this.setup()
    }
    setup() {
        this.speed = 5
        this.attack = 1
        this.show = true
    }
    update() {
        super.update()
        this.x += this.speed
    }
    gone() {
        this.show = false
        this.game.scene.removeElement(this)
    }
}