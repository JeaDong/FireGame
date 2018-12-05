class Player extends GuaImage{
    constructor(game) {
        super(game,'player')
        this.setup()
    }
    setup(){
        this.alive = true
        this.buff = false
        this.speed = config.player_speed
        this.cooldown = 0
        this.hp = config.player_hp
        this.score = 0
    }
    update(){
        // log('speed is', this.speed, config.player_speed)
        // 这里应该改成在debug里面调用来修改速度
        this.speed = Number(config.player_speed)
        this.resetCooldown()
        this.die()
    }
    resetCooldown(){
        if (this.cooldown > 0) {
            this.cooldown--
        }
    }
    fire(){
        if (this.cooldown == 0) {
            this.cooldown = config.fire_cooldown
            var x = this.x + this.w/2
            var y = this.y
            var b = Bullet.new(this.game)
            b.x = x
            b.y = y
            if (this.hp <= 10) {
                this.scene.nut.show = true
                var b2 = Bullet.new(this.game)
                b2.x = this.x + this.w / 2 / 2
                b2.y = y
                this.scene.addElement(b2)
            }
            this.scene.addElement(b)
        }
    }
    die() {
        var dead = this.hp <= 0 && this.canDraw
        if (dead) {
            this.alive = false
            this.canDraw = false
            let ps = GuaParticleSystem.new(this.game, this)
            this.scene.addElement(ps)
        }
    }
    moveLeft(){
        this.x -= this.speed
    }
    moveRight(){
        this.x += this.speed
    }
    moveUp(){
        this.y -= this.speed
        //log('up',this.y)
    }
    moveDown(){
        this.y += this.speed
        //log('down',this.y)
    }
}
