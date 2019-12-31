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
        // bullet: 'img/bullet.png',
        // cloud: 'img/cloud.png',
        // player: 'img/player.png',
        background: 'img/background.png',
        // enemy0: 'img/enemy0.png',
        // enemy1: 'img/enemy1.png',
        // enemy2: 'img/enemy2.png',
        // enemy3: 'img/enemy3.png',
        // fire: 'img/fire.png',
        // w1: 'img/walkings/w1.png',
        // w2: 'img/walkings/w2.png',
        // w3: 'img/walkings/w3.png',
        // w4: 'img/walkings/w4.png',
        // w5: 'img/walkings/w5.png',
        // w6: 'img/walkings/w6.png',
        // w7: 'img/walkings/w7.png',
        // w8: 'img/walkings/w8.png',
        // w9: 'img/walkings/w9.png',
        idle1: 'img/player-idle/player-idle-1.png',
        idle2: 'img/player-idle/player-idle-2.png',
        idle3: 'img/player-idle/player-idle-3.png',
        idle4: 'img/player-idle/player-idle-4.png',
        idle5: 'img/player-idle/player-idle-5.png',
        idle6: 'img/player-idle/player-idle-6.png',
        idle7: 'img/player-idle/player-idle-7.png',
        idle8: 'img/player-idle/player-idle-8.png',
        idle9: 'img/player-idle/player-idle-9.png',
        run1: 'img/player-run/player-run-1.png',
        run2: 'img/player-run/player-run-2.png',
        run3: 'img/player-run/player-run-3.png',
        run4: 'img/player-run/player-run-4.png',
        run5: 'img/player-run/player-run-5.png',
        run6: 'img/player-run/player-run-6.png',
    }
    var game = GuaGame.instance(30, images, function(g){
        // var s = Scene.new(g)
        var s = SceneTitle.new(g)
        g.runWithScene(s)
    })

    enableDebugMode(game, true)
}

__main()
