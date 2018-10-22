const config = {
    player_speed: 20,
    cloud_speed: 1,
    enemy_speed: 1,
    bullet_speed: 20,
    fire_cooldown: 5
}
class Bullet extends GuaImage {
    constructor(game) {
        super(game,'bullet')
        this.game = game
        this.setup()
    }
    setup(){
        //this.speed = 10
        this.speed = config.bullet_speed
    }
    update(){
        if (this.y > 0){
            this.kill()
        }
        this.y -= this.speed
    }
    kill(){
        // log('调用了吗')
        for(let i = 0; i < elements.length; i++){
            // log('进入了循环',this.x,this.y)
            let e = elements[i]
            if (e.alive && rectIntersects(e,this)){
            // if (e.alive || rectIntersects(e,this)){ 迷之全屏秒杀，很灵性
                // log('发生了碰撞')
                e.alive = false
                let ps = GuaParticleSystem.new(this.game)
                ps.x = e.x
                ps.y = e.y
                this.scene.addElement(ps)
            }
        }
    }
}

class enemyBullet extends GuaImage {
    constructor(game) {
        super(game,'bullet')
        this.game = game
        this.setup()
    }
    setup(){
        this.speed = 10
        // this.speed = config.bullet_speed
    }
    update(){
        // if (this.y > 0){
        //     this.kill()
        // }
        this.y += this.speed
        if (rectIntersects(window.player, this)){
            log('shot it !')
            window.player.fire()
            var e = window.player
            let ps = GuaParticleSystem.new(this.game)
            ps.x = e.x
            ps.y = e.y
            this.scene.addElement(ps)
        }
    }
    kill(){
        // log('调用了吗')
        for(let i = 0; i < elements.length; i++){
            // log('进入了循环',this.x,this.y)
            let e = elements[i]
            if (e.alive && rectIntersects(e,this)){
            // if (e.alive || rectIntersects(e,this)){ 迷之全屏秒杀，很灵性
                // log('发生了碰撞')
                e.alive = false
                let ps = GuaParticleSystem.new(this.game)
                ps.x = e.x
                ps.y = e.y
                this.scene.addElement(ps)
            }
        }
    }
}

class Player extends GuaImage{
    constructor(game) {
        super(game,'player')

        this.setup()
    }
    setup(){
        this.speed = 20
        this.cooldown = 0
    }
    update(){
        this.speed = config.player_speed
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
            this.scene.addElement(b)
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
const randomBetween = function(start, end){
    var n = Math.random() * (end-start+1)
    return Math.floor(n+start)
}
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
        this.cooldown = 0
        this.alive = true
    }
    update(){
        this.y += this.speed
        if (this.y > 600) {
            this.setup()
        }
        if (this.cooldown > 0) {
            this.cooldown--
        }
        this.fire()
    }
    kill(){
        this.alive = false
    }
    draw(){
        if (this.alive){
            super.draw()
        }
    }
    fire(){
        if (this.alive && this.cooldown == 0) {
            this.cooldown = 30
            var x = this.x + this.w/2
            var y = this.y
            var b = enemyBullet.new(this.game)
            b.x = x
            b.y = y
            this.scene.addElement(b)
        }
    }
}
class Cloud extends GuaImage{
    constructor(game) {
        super(game,'cloud')
        this.setup()

    }
    setup(){
        this.speed = 1
        this.x = randomBetween(0,350)
        this.y = -randomBetween(0,200)
    }
    update(){

        this.y += config.cloud_speed
        if (this.y > 600) {
            this.setup()
        }
    }
}
class Scene extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
        this.setupInputs()
    }
    setup(){
        var game = this.game
        this.numberOfEnemies = 5
        this.bg = GuaImage.new(game,'sky')

        this.cloud = Cloud.new(game,'cloud')
        this.player =Player.new(game)
        window.player = this.player // convert to global var
        this.player.x = 100
        this.player.y = 150

        this.addElement(this.bg)
        this.addEnemies()
        this.addElement(this.player)
        this.addElement(this.cloud)
        //添加粒子效果
        // var ps = GuaParticleSystem.new(this.game)
        // this.addElement(ps)

    }
    addEnemies(){
        var es = []
        for (var i = 0; i < this.numberOfEnemies; i++) {
            var e = Enemy.new(this.game)
            es.push(e)
            this.addElement(e)
        }
        this.enemies = es
    }
    update(){
        // log('scence element is ',this.elements)
        super.update()
        // 自动发射子弹
        // this.player.fire()
        this.cloud.y += 1

    }
    setupInputs(){
        var g = this.game
        var s = this
        g.registerAction('a', function(){
            s.player.moveLeft()
        })
        g.registerAction('d', function(){
            s.player.moveRight()
        })
        g.registerAction('w', function(){
            s.player.moveUp()
        })
        g.registerAction('s', function(){
            s.player.moveDown()
        })
        g.registerAction('f', function(){
            s.player.fire()
            log('this element is',this.elements)
            // this.elements.pop(0)
        })
    }
    // draw() {
    //     // draw labels
    //     // this.game.drawImage(this.bg)
    //     // this.game.drawImage(this.player)
    // }
}

// var Scene = function(game) {
//     var s = {
//         game: game,
//     }
//     // 初始化
//     var paddle = Paddle(game)
//     var ball = Ball(game)
//
//     var score = 0
//
//     var blocks = loadLevel(game, 1)
//
//     game.registerAction('a', function(){
//         paddle.moveLeft()
//     })
//     game.registerAction('d', function(){
//         paddle.moveRight()
//     })
//     game.registerAction('f', function(){
//         ball.fire()
//     })
//
//     s.draw = function() {
//         // draw 背景
//         game.context.fillStyle = "#554"
//         game.context.fillRect(0, 0, 400, 300)
//         // draw
//         game.drawImage(paddle)
//         game.drawImage(ball)
//         // draw blocks
//         for (var i = 0; i < blocks.length; i++) {
//             var block = blocks[i]
//             if (block.alive) {
//                 game.drawImage(block)
//             }
//         }
//         // draw labels
//         game.context.fillText('分数: ' + score, 10, 290)
//     }
//     s.update = function() {
//         if (window.paused) {
//             return
//         }
//
//         ball.move()
//         // 判断游戏结束
//         if (ball.y > paddle.y) {
//             // 跳转到 游戏结束 的场景
//             var end = SceneEnd.new(game)
//             game.replaceScene(end)
//         }
//         // 判断相撞
//         if (paddle.collide(ball)) {
//             // 这里应该调用一个 ball.反弹() 来实现
//             ball.反弹()
//         }
//         // 判断 ball 和 blocks 相撞
//         for (var i = 0; i < blocks.length; i++) {
//             var block = blocks[i]
//             if (block.collide(ball)) {
//                 // log('block 相撞')
//                 block.kill()
//                 ball.反弹()
//                 // 更新分数
//                 score += 100
//             }
//         }
//     }
//
//     // mouse event
//     var enableDrag = false
//     game.canvas.addEventListener('mousedown', function(event) {
//         var x = event.offsetX
//         var y = event.offsetY
//         log(x, y, event)
//         // 检查是否点中了 ball
//         if (ball.hasPoint(x, y)) {
//             // 设置拖拽状态
//             enableDrag = true
//         }
//     })
//     game.canvas.addEventListener('mousemove', function(event) {
//         var x = event.offsetX
//         var y = event.offsetY
//         // log(x, y, 'move')
//         if (enableDrag) {
//             log(x, y, 'drag')
//             ball.x = x
//             ball.y = y
//         }
//     })
//     game.canvas.addEventListener('mouseup', function(event) {
//         var x = event.offsetX
//         var y = event.offsetY
//         log(x, y, 'up')
//         enableDrag = false
//     })
//
//     return s
// }
