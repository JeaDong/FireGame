class Enemy extends GuaImage{
    constructor(game) {
        var type = randomBetween(0,4)
        var name = 'enemy' + type
        super(game,name)
        this.setup()

    }
    setup(){
        this.speed = randomBetween(2,5)
        this.x = randomBetween(0,350)
        this.y = -randomBetween(0,200)
        this.cooldown = 20
        this.alive = true
        this.canDraw = true
    }
    update(){
        this.y += this.speed
        this.resetCooldown()
        this.resetPosition()
        this.fire()
        this.collide()
        this.die()
    }
    resetCooldown(){
        if (this.cooldown > 0) {
            this.cooldown--
        }
    }

    resetPosition(){
        if (this.y > 600) {
            this.setup()
        }
    }
    collide() {
        // 敌机碰撞
        var canAttack = rectIntersects(this, window.player) && window.player.alive
        if (canAttack){
            window.player.hp = 0
        }   
    }

    draw(){
        super.draw()
    }
    fire(){
        var canFire = this.alive && this.cooldown == 0
        if (canFire) {
            this.cooldown = 30
            var x = this.x + this.w/2
            var y = this.y
            var b = enemyBullet.new(this.game)
            b.x = x
            b.y = y
            this.scene.addElement(b)
        }
    }
    die(){
        var dead = !this.alive
        if (dead){
            var e = this
            e.alive = false
            this.canDraw = false
            let ps = GuaParticleSystem.new(this.game, e)
            this.scene.addElement(ps)
            if (Math.random(0,10) >= 0.55) {
                let b = Buff.new(this.game, e)
                this.scene.addElement(b)
            }
            this.setup()
        }
    }
}