class Buff extends GuaImage{
    constructor(game, object) {
        super(game, 'add_hp')
        this.game = game
        this.object = object
        this.setup()

    }
    setup(){
        // log('创建buff')
        log(this.object.x, this.object.y)
        var e = this.object
        this.speed = 4
        this.x = e.x + e.w/2
        this.y = e.y + e.h/2
    }
    update(){
        // log('更新buff', this.y)
        this.y += this.speed
        // this.x += this.speed
        this.collide()
        // this.die()
    }
    collide() {
        // 敌机碰撞
        var canAttack = this.canDraw && rectIntersects(window.player, this) && window.player.alive
        if (canAttack){
            this.canDraw = false
            window.player.hp += 2
        }   
    }

    draw(){
        super.draw()
    }
}

class Nut extends GuaImage{
    constructor(game) {
        super(game, 'nut')
        this.game = game
        this.setup()

    }
    setup(){
        this.show = false
        this.x = window.player.x + window.player.w / 2
        this.y = window.player.y + window.player.h / 2
    }
    update(){
        this.canDraw = window.player.canDraw
        this.x = window.player.x - window.player.w / 2
        this.y = window.player.y - window.player.h / 2
    }
    
    draw(){
        if (!this.show){
            return
        }
        super.draw()
    }
}