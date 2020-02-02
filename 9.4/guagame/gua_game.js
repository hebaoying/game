// 瓜
class GuaGame {
    constructor(fps, images, runCallback) {
        window.fps = fps
        this.images = images
        this.runCallback = runCallback
        //
        this.scene = null
        this.actions = {}
        this.keydowns = {}
        this.mouseActions = []
        this.canvas = document.querySelector('#id-canvas')
        this.context = this.canvas.getContext('2d')
        // events
        var self = this
        window.addEventListener('keydown', event => {
            this.keydowns[event.key] = 'down'
        })
        window.addEventListener('keyup', function(event){
            self.keydowns[event.key] = 'up'
        })
        let mouseDown = false
        window.addEventListener('mousedown', (event) => {
            mouseDown = true
            this.triggerMouse(event, 'down')
        })
        window.addEventListener('mousemove', (event) => {
            if (mouseDown) {
                this.triggerMouse(event, 'move')
            }
        })
        window.addEventListener('mouseup', (event) => {
            mouseDown = false
            this.triggerMouse(event, 'up')
        })
        this.init()
    }
    triggerMouse(event, type) {
        for (let a of this.mouseActions) {
            a(event, type)
        }
    }

    // 单例模式, guagame只能被初始化一次. 需要一个静态函数去初始化它
    static instance(...args) {
        this.i = this.i || new this(...args)
        return this.i
    }
    drawImage(img) {
        // img 是一个 guaImage
        this.context.drawImage(img.texture, img.x, img.y)
    }
    // update
    update() {
        this.scene.update()
    }
    // draw
    draw() {
        this.scene.draw()
    }
    // mouse
    registerMouse(callback) {
        this.mouseActions.push(callback)
        // log('register', this.mouseActions)
    }
    //
    registerAction(key, callback) {
        this.actions[key] = callback
    }
    runloop() {
        // log(window.fps)
        // events
        var g = this
        var actions = Object.keys(g.actions)
        for (var i = 0; i < actions.length; i++) {
            var key = actions[i]
            var status = g.keydowns[key]
            if(status == 'down') {
                // 如果按键被按下, 调用注册的 action
                g.actions[key](status)
            } else if (status == 'up') {
                g.actions[key](status)
                g.keydowns[key] = null
            }
        }
        // update
        g.update()
        // clear
        g.context.clearRect(0, 0, g.canvas.width, g.canvas.height)
        // draw
        g.draw()
        // next run loop
        setTimeout(function(){
            g.runloop()
        }, 1000/window.fps)
    }
    imageByName(name) {
        var g = this
        // log('image by name', g.images)
        var img = g.images[name]
        var image = {
            w: img.width,
            h: img.height,
            image: img,
        }
        return image
    }
    textureByName(name) {
        var g = this
        // log('texture by name', g.images)
        var img = g.images[name]
        // var image = {
        //     w: img.width,
        //     h: img.height,
        //     image: img,
        // }
        return img
    }
    runWithScene(scene) {
        var g = this
        g.scene = scene
        // 开始运行程序
        setTimeout(function(){
            g.runloop()
        }, 1000/window.fps)
    }
    replaceScene(scene) {
        this.scene = scene
    }
    __start(scene) {
        this.runCallback(this)
    }

    init() {
        var g = this
        var loads = []
        // 预先载入所有图片
        var names = Object.keys(g.images)
        for (var i = 0; i < names.length; i++) {
            let name = names[i]
            var path = g.images[name]
            let img = new Image()
            img.src = path
            img.onload = function() {
                // 存入 g.images 中
                g.images[name] = img
                // 所有图片都成功载入之后, 调用 run
                loads.push(1)
                log('load images', loads.length, names.length)
                if (loads.length == names.length) {
                    log('load images', g.images)
                    g.__start()
                }
            }
        }
    }
}
