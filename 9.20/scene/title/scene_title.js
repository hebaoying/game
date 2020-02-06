class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
    }
    setup() {
        this.offsetX = 250
        this.offsetY = 90
        this.widthOfRow = 85
        this.heightOfColumn = 100
        this.zombieOffsetY = 50
        this.bulletZombieOffset = config.bulletZombieOffset.value
        //
        this.zombies = []
        this.peabullets = []
        window.pbs = this.peabullets
        this.peashooters = []
        this.setupBg()
        this.setupZombie()
        this.setupPeashooter()
    }
    setupBg() {
        let bg = GuaImage.new(this.game, 'bg')
        this.bg = bg
        this.addElement(bg)
    }
    addPeashooter(column, row) {
        let i = column
        let j = row
        let x = this.offsetX + i * this.widthOfRow
        let y = this.offsetY + j * this.heightOfColumn
        var w = Peashooter.new(this.game)
        w.x = x
        w.y = y
        w.row = row
        this.addElement(w)
        this.peashooters.push(w)
    }
    setupPeashooter() {
        for (let i = 0; i < 5; i++) {
            this.addPeashooter(0, i)
        }
    }
    addZombie(row) {
        let y = this.offsetY + row * this.heightOfColumn - this.zombieOffsetY
        var w = Zombie.new(this.game)
        w.x = this.bg.w - 400
        w.y = y
        w.row = row
        this.addElement(w)
        this.zombies.push(w)
    }
    setupZombie() {
        this.addZombie(2)
    }
    updateFire() {
        for (let z of this.zombies) {
            let zRow = z.row
            for (let p of this.peashooters) {
                if (p.row === zRow) {
                    p.fire()
                }
            }
        }
    }
    updateHit() {
        for (let z of this.zombies) {
            for (let pb of this.peabullets) {
                // log('b row', b.row, zRow)
                if (pb.row === z.row) {
                    let gap = z.x - pb.x
                    if (gap < this.bulletZombieOffset) {
                        z.gethurt(pb.attack)
                        pb.gone()
                    }
                }
            }
        }
    }
    updateZombies() {
        this.zombies = this.zombies.filter(p => p.alive)
    }
    updatePeaBullets() {
        for (let pb of this.peabullets) {
            if (pb.x > this.bg.w) {
                pb.gone()
            }
        }
        this.peabullets = this.peabullets.filter(p => p.show)
    }
    update() {
        this.updatePeaBullets()
        this.updateZombies()
        this.updateFire()
        this.updateHit()
        super.update()
    }
}
