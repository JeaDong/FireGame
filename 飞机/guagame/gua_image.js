class GuaImage {
    constructor(game,name) {
        this.game = game
        this.texture = game.textureByName(name)
        this.x = 0
        this.y = 0
        this.w = this.texture.width
        this.h = this.texture.height
        this.canDraw = true
    }
    static new(game,name) {
        var i = new this(game,name)
        return i
    }
    
    draw() {
        this.game.drawImage(this)
    }
    update() {

    }
}
//逻辑上不应该继承，暂时这么做，我也不知道为什么
// class Player extends GuaImage {
//     constructor(game,name) {
//         super(game,name)
//
//     }
// }
