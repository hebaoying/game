class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
    }
    setup() {
        let bg = GuaImage.new(this.game, 'background')
        let gun = GuaImage.new(this.game, 'gun')
        this.gun = gun
        gun.x = 300
        gun.y = 220
        this.addElement(bg)
        this.addElement(gun)
        this.setupInputs()
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

    }
}
