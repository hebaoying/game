var loadLevel = function(game, n) {
    n = n - 1
    var level = levels[n]
    var blocks = []
    for (var i = 0; i < level.length; i++) {
        var p = level[i]
        var b = Block(game, p)
        blocks.push(b)
    }
    return blocks
}

var enableDebugMode = function(game, enable) {
    if(!enable) {
        return
    }
    window.paused = false
    window.addEventListener('keydown', function(event){
        var k = event.key
        if (k == 'p') {
            // 暂停功能
            window.paused = !window.paused
        } else if ('1234567'.includes(k)) {
            // 为了 debug 临时加的载入关卡功能
            // blocks = loadLevel(game, Number(k))
        }
    })
}

var __main = function() {
    var images = {
        ground: 'img/ground.png',
        pipe: 'img/pipe.png',
        background: 'img/background.png',
        b1: 'img/bird/b1.png',
        b2: 'img/bird/b2.png',
        b3: 'img/bird/b3.png',
    }
    var request = {
        url: 'mario.nes',
        callback(r) {
            window.bytesArray = new Uint8Array(r)
            var game = GuaGame.instance(30, images, function(g){
                // var s = Scene.new(g)
                var s = SceneTitle.new(g)
                g.runWithScene(s)
            })

            enableDebug = true

            // enableDebugMode(game, true)
        }
    }
    __ajax(request)

}

__main()
