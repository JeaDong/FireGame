class Bullet extends GuaImage {
    constructor(game) {
        super(game,'bullet')
        this.game = game
        this.setup()
    }
    setup(){
        this.speed = config.bullet_speed
    }
    update(){
        this.fire()
        this.die()
    }
    fire(){
        for(let i = 0; i < elements.length; i++){
            // log('进入了循环',this.x,this.y)
            let e = elements[i]
            var canAttack = this.canDraw && e.alive && rectIntersects(e,this)
            if (canAttack){
                window.player.score += 100
                e.alive = false
                this.canDraw = false
            }
        }
        this.y -= this.speed
    }
    die(){
        if (this.y <= 0) {
            this.canDraw = false
        }
    }
}
