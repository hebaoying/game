
var __main = function() {
    var images = {
        background: 'img/background.png',
        // b1: 'img/bird/b1.png',
        // b2: 'img/bird/b2.png',
        // b3: 'img/bird/b3.png',
        // t1: 'img/tile/1.png',
        // t2: 'img/tile/2.png',
        // t3: 'img/tile/3.png',
        // t4: 'img/tile/4.png',
        gun: 'img/gun.png',
    }
    var game = GuaGame.instance(30, images, function(g){
        // var s = Scene.new(g)
        var s = SceneTitle.new(g)
        // var s = GuaEditor.new(g)
        g.runWithScene(s)
    })


}

__main()
