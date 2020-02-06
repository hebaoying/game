class PeaBullet extends GuaImage {
    constructor(game) {
        super(game, 'peabullet0')
        this.setup()
    }
    setup() {
        this.speed = config.bulletSpeed.value
        this.attack = 1
        this.show = true
    }
    update() {
        super.update()
        this.speed = config.bulletSpeed.value
        this.x += this.speed
    }
    gone() {
        this.show = false
        this.game.scene.removeElement(this)
    }
}