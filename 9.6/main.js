
var __main = function() {
    let loader = imgLoader.new()
    var images = loader.exportImgs()
    var game = GuaGame.instance(30, images, function(g){
        // var s = Scene.new(g)
        var s = SceneTitle.new(g)
        // var s = GuaEditor.new(g)
        g.runWithScene(s)
    })


}

__main()
