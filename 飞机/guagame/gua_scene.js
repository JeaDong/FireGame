class GuaScene {
    constructor(game) {
        this.game = game
        this.debugModeEnable = true
        this.elements = []
        window.elements = this.elements
    }
    static new(game) {
        var i = new this(game)
        return i
    }
    addElement(img){
        img.scene = this
        this.elements.push(img)
    }
    draw() {
        for (var e of this.elements) {
            // 考虑在这里添加一个属性判断是不是要draw
            if (e.canDraw != false) {
                e.draw()
            }
        }
    }
    update() {
        if (this.debugModeEnable) {
            for (var i = 0; i < this.elements.length; i++) {
                var e = this.elements[i]
                e.debug && e.debug()
            }
        }
        this.elements = this.elements.filter(e => e.canDraw == true)
        for (var i = 0; i < this.elements.length; i++) {
            var e = this.elements[i]
            e.update()
        }
    }
}
