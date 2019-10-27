export default class MenuMovimiento extends Phaser.GameObjects.Container{
    constructor(scene, x, y){
        super(scene,x,y);

        this.distance = scene.squareSize;

        //Se crean los sprites
        {
        this.up = scene.add.image(0, -this.distance, 'arrowup').setInteractive();
        this.down = scene.add.image(0, this.distance, 'arrowdown').setInteractive();
        this.left = scene.add.image(-this.distance, 0, 'arrowleft').setInteractive();
        this.right = scene.add.image(this.distance, 0, 'arrowright').setInteractive();
        this.upRight = scene.add.image(this.distance, -this.distance, 'arrowupright').setInteractive();
        this.upLeft = scene.add.image(-this.distance, -this.distance, 'arrowupleft').setInteractive();
        this.downRight = scene.add.image(this.distance, this.distance, 'arrowdownright').setInteractive();
        this.downLeft = scene.add.image(-this.distance, this.distance, 'arrowdownleft').setInteractive();
        }

        //se asignan las funciones a sus flechas
        {
        this.up.on('pointerdown', () => {scene.selection.moveWorker(scene.selection.position.x, scene.selection.position.y - 1);});
        this.down.on('pointerdown', () => {scene.selection.moveWorker(scene.selection.position.x, scene.selection.position.y + 1)});
        this.left.on('pointerdown', () => {scene.selection.moveWorker(scene.selection.position.x - 1, scene.selection.position.y)});
        this.right.on('pointerdown', () => {scene.selection.moveWorker(scene.selection.position.x + 1, scene.selection.position.y)});
        this.upRight.on('pointerdown', () => {scene.selection.moveWorker(scene.selection.position.x + 1, scene.selection.position.y - 1)});
        this.upLeft.on('pointerdown', () => {scene.selection.moveWorker(scene.selection.position.x - 1, scene.selection.position.y - 1)});
        this.downRight.on('pointerdown', () => {scene.selection.moveWorker(scene.selection.position.x + 1, scene.selection.position.y + 1)});
        this.downLeft.on('pointerdown', () => {scene.selection.moveWorker(scene.selection.position.x - 1, scene.selection.position.y + 1)});
        }

        //Se añaden al container
        {
        this.add(this.up);
        this.add(this.down);
        this.add(this.left);
        this.add(this.right);
        this.add(this.upRight);
        this.add(this.upLeft);
        this.add(this.downRight);
        this.add(this.downLeft);
        }

        this.visible = false;
        scene.add.existing(this);
    }
}