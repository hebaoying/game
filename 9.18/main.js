
var __main = function() {
    let loader = imgLoader.new(null, imgConfig)
    var images = loader.images
    var game = GuaGame.instance(30, images, function(g){
        // var s = Scene.new(g)
        var s = SceneTitle.new(g)
        // var s = GuaEditor.new(g)
        g.runWithScene(s)
    })


}

__main()
