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
    addEnemy(x=0, y) {
        let e = Enemy.new(this.game)
        e.x = x
        e.y = y
        this.addElement(e)
        this.elements.push(e)
        this.enemies.push(e)
    }
    setupElements() {
        for (let i = 0; i < 3; i++) {
            let x = 0
            let y = i * 100 + 100
            this.addEnemy(x, y)
        }
    }
    setupHUD() {
        let gun = GuaImage.new(this.game, 'gun')
        gun.x = 500
        gun.y = 300
        this.gun = gun
        this.addElement(gun)
    }
    addTower(x, y) {
        let t1 = Tower.new(this.game)
        // let imgWidth = t1.texture.width + t1.range
        let imgWidth = 100
        x = Math.floor(x / imgWidth) * imgWidth
        y = Math.floor(y / imgWidth) * imgWidth
        t1.x = x
        t1.y = y
        self.gun = t1
        this.addElement(t1)
        this.towers.push(t1)
    }
    setupTower() {
        this.addTower(100, 150)
        this.addTower(100, 50)
    }
    setupInputs() {
        this.setupMouse()
    }
    setupMouse() {
        var self = this
        var game = this.game
        let startDrag = false
        let cloned = false
        let ox = 0
        let oy = 0
        game.registerMouse((event, status) => {
            let x = event.offsetX
            let y = event.offsetY
            if (status === 'down') {
                let pointed = self.gun.inside(x, y)
                if (pointed) {
                    startDrag = true
                    self.tower = self.gun.clone()
                    self.addElement(self.tower)
                    cloned = true
                    // offset x, y
                    ox = self.gun.x - x
                    oy = self.gun.y - y
                }
            } else if (status === 'move') {
                this.tower.x = x + ox
                this.tower.y = y + oy
            } else if (status === 'up') {
                startDrag = false
                self.removeElement(self.tower)
                // add a tower
                if (cloned) {
                    this.addTower(x, y)
                    cloned = false
                }
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
