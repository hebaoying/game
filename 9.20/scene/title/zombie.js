class Zombie extends GuaAnimation{
    constructor(game) {
        let config = {
            zombie: {
                actions: [
                    {
                        name: 'walk',
                        number: 15,
                    },
                    {
                        name: 'attack',
                        number: 11,
                    },
                ],
            },
        }
        super(game, config)
        this.setup()
    }
    setup() {
        super.setup()
        this.row = -1
        this.speed = 1
        this.attack = 1
        this.hp = 3
        this.alive = true
    }
    update() {
        super.update()
        this.updateMove()
    }
    updateMove() {
        this.x -= this.speed
    }
    die() {
        // 播放动画

        this.alive = false
        this.removeThis()
    }
    removeThis() {
        this.game.scene.removeElement(this)
    }
    gethurt(attack) {
        this.hp -= attack
        if (this.hp < 1) {
            this.die()
        }
    }
}