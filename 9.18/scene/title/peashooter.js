class Peashooter extends GuaAnimation{
    constructor(game) {
        let config = {
            peashooter: {
                actions: [
                    {
                        name: 'idle',
                        number: 13,
                    },
                ],
            },
        }
        super(game, config)
        this.setup()
    }
    setup() {
        super.setup()
        this.speed = 1
        this.row = -1
        this.bulletOffsetX = 45
        this.setupCooldown()
    }
    setupCooldown() {
        this.cooldown = 50
    }
    fire() {
        this.cooldown --
        if (this.cooldown === 0) {
            //
            this.setupCooldown()
            let b = PeaBullet.new(this.game)
            b.x = this.x + this.bulletOffsetX
            b.y = this.y
            b.row = this.row
            this.game.scene.addElement(b)
            this.game.scene.peabullets.push(b)
        }

        // this.scene = null
    }
    update() {
        super.update()
    }
}