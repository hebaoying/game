class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
    }
    setup() {
        this.enemies = []
        this.towers = []
        this.setupBg()
        this.setupHUD()
        this.setupTower()
        this.setupElements()
        this.setupInputs()
    }
    setupBg() {
        let bg = GuaImage.new(this.game, 'background')
        this.addElement(bg)
    }
    setupElements() {
        let e1 = Enemy.new(this.game)
        e1.y = 100
        this.addElement(e1)
        this.elements.push(e1)
        let e2 = Enemy.new(this.game)
        e2.y = 150
        this.addElement(e2)
        this.elements.push(e2)
        this.enemies.push(e1)
        this.enemies.push(e2)
    }
    setupHUD() {
        let gun = GuaImage.new(this.game, 'gun')
        gun.x = 500
        gun.y = 300
        this.addElement(gun)
    }
    setupTower() {
        let t1 = Tower.new(this.game)
        this.t1 = t1
        t1.x = 100
        t1.y = 150
        self.gun = t1
        this.addElement(t1)
        this.towers.push(t1)
    }
    setupInputs() {
        this.setupMouse()
    }
    setupMouse() {
        var self = this
        var game = this.game
        let startDrag = false
        game.registerMouse((event, status) => {
            let x = event.offsetX
            let y = event.offsetY
            if (status === 'down') {
                let pointed = self.gun.inside(x, y)
                if (pointed) {
                    startDrag = true
                    self.tower = self.gun.clone()
                    self.addElement(self.tower)
                }
            } else if (status === 'move') {
                this.tower.x = x
                this.tower.y = y
            } else if (status === 'up') {
                startDrag = false
                self.removeElement(self.tower)
            }
        })
    }
    draw() {
        super.draw()
    }
    update() {
        super.update()
        // tower search enemy
        for (let t of this.towers) {
            if (t.target == null) {
                t.findTarget(this.enemies)
            }
        }
        for (let e of this.enemies) {
            if (!e.alive) {
                this.enemies = this.enemies.filter(e => e.alive)
                // log('this.enemies', this.enemies)
                // this.removeElement(e)
            }
        }
    }
}
