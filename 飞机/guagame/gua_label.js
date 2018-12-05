class GuaLabel {
    constructor(game,text) {
        this.game = game
        this.text = text
        this.canDraw = true
        this.x = 0
        this.y = 0
    }
    static new(game,text) {
        var i = new this(game,text)
        return i
    }
    draw() {
        this.game.context.fillText(this.text, this.x, this.y)
    }
    update() {

    }
}