class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
    }
    setup() {
        // 初始化地图
        this.map = TDMap.new(this.game, 8, 5)
        this.towerSize = this.map.towerSize
        // 初始化属性
        this.enemies = []
        this.towers = []
        this.debugPath = []
        this.count = 0
        this.setupBg()
        this.setupHUD()
        this.setupElements()
        this.setupTower()
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
        e.towerSize = this.towerSize
        this.addElement(e)
        this.elements.push(e)
        this.enemies.push(e)
    }
    setupElements() {
        let offset = [0, 30]
        for (let i = 0; i < 1; i++) {
            let e = Enemy.new(this.game)
            e.towerSize = this.towerSize
            e.x = i * 50 + 10
            e.y += offset[i % 2]
            this.addElement(e)
            this.enemies.push(e)
        }
    }
    setupHUD() {
        let gun = GuaImage.new(this.game, 'gun')
        gun.x = 400
        gun.y = 200
        this.gun = gun
        this.addElement(gun)
    }
    addTower(x, y) {
        let towerSize = this.towerSize
        let t1 = Tower.new(this.game)
        // this.towerSize = towerSize
        // let imgWidth = 100
        let i = Math.floor(x / towerSize)
        let j = Math.floor(y / towerSize)
        // 设置地图属性
        // log('add tower', x, y, i, j, towerSize)
        this.map.addTower(i, j)
        x = i * towerSize
        y = j * towerSize
        t1.x = x
        t1.y = y
        this.addElement(t1)
        //
        this.towers.push(t1)
        //
        // this.findPathForEnemies()
    }
    findPathForEnemies() {
        // 为每一个敌人单独寻路
        let towerSize = this.towerSize
        for (let e of this.enemies) {
            let x = e.x
            let y = e.y
            let i = Math.floor(x / towerSize)
            let j = Math.floor(y / towerSize)
            let path = this.map.pathFinding(i, j)
            // log('path', path)
            e.resetPath(path)
            // debug path temp
            this.debugPath = path
        }
    }
    setupTower() {
        this.addTower(100, 150)
        // this.addTower(100, 50)
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
        let s = this.towerSize
        let context = this.game.context
        for (let p of this.debugPath) {
            context.fillStyle = 'rgba(200, 200, 200, 0.5'
            let x = p.x * s
            let y = p.y * s
            context.fillRect(x, y, s, s)
        }
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
        this.findPathForEnemies()
        // add enemy
        this.count++
        if (this.count > 60) {
            this.count = 0
            this.addEnemy(0, 0)
        }
    }
}
