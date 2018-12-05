class enemyBullet extends GuaImage {
    constructor(game) {
        super(game,'enemy_bullet')
        this.game = game
        this.setup()
    }
    setup(){
        this.speed = 10
        // this.speed = config.bullet_speed
    }
    update(){
        this.fire()
        this.die()
    }
    
    fire() {
        this.y += this.speed
        var canAttack = this.canDraw && rectIntersects(window.player, this) && window.player.alive
        if (canAttack){
            this.canDraw = false
            if (!this.scene.nut.show) {
                window.player.hp--
            }
        }
    }
    die(){
        if (this.y >= 600) {
            this.canDraw = false
        }
    }
}