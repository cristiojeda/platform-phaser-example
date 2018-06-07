var game = new Phaser.Game(800, 600, Phaser.CANVAS, '', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('sky', 'assets/sprites/sky.png');
    game.load.image('star', 'assets/sprites/star.png');
    game.load.image('ground', 'assets/sprites/platform.png');
    game.load.spritesheet('dude', 'assets/sprites/dude.png', 32, 48);
}

function create() {

    //CONFIGURACIONES DE LA FISICA
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.add.sprite(0, 0, 'sky');
    /* game.add.sprite(100, 100, 'star');
     game.add.sprite(150, 150, 'star');
     game.add.sprite(180, 190, 'star');
    */

    //PLAFORMA DEL JUEGO
    platforms = game.add.group();
    platforms.enableBody = true; //habilitaremos la fisica
    var ground = platforms.create(0, game.world.height - 64, 'ground');
    ground.scale.setTo(2, 2);
    ground.body.immovable = true;

    var ledge = platforms.create(400, 400, 'ground');
    ledge.body.immovable = true;
    ledge = platforms.create(-150, 250, 'ground');
    ledge.body.immovable = true;



    //CREAR JUGADOR
    player = game.add.sprite(100, 100, 'dude'); //posicionar y pinta en el juego

    game.physics.arcade.enable(player);
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 100;
    player.body.collideWorldBounds = true;
    //ANIMACION DEL JUGADOR
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    //ACTIVAR EL TECLADO
    cursors = game.input.keyboard.createCursorKeys();

}

function update() {


    var hitPlatform = game.physics.arcade.collide(player, platforms);

    player.body.velocity.x = 0;
    if (cursors.left.isDown) {
        player.body.velocity.x = -150;
        player.animations.play('left');

    } else if (cursors.right.isDown) {
        player.body.velocity.x = 150;
        player.animations.play('right');

    } else {
        player.animations.stop();
        player.frame = 4;
    }

    if (cursors.up.isDown && player.body.touching.down && hitPlatform) {
        player.body.velocity.y = -350;


    }

}