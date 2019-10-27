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

        //Se ocultan
        {
            this.up.visible = false;
            this.down.visible = false;
            this.left.visible = false;
            this.right.visible = false;
            this.upRight.visible = false;
            this.upLeft.visible = false;
            this.downRight.visible = false;
            this.downLeft.visible = false;
        }

        //se asignan las funciones a sus flechas
        {
        this.up.on('pointerdown', () => {if (this.scene.mouse.leftButtonDown()) scene.selection.moveWorker(scene.selection.position.x, scene.selection.position.y - 1);});
        this.down.on('pointerdown', () => {if (this.scene.mouse.leftButtonDown()) scene.selection.moveWorker(scene.selection.position.x, scene.selection.position.y + 1)});
        this.left.on('pointerdown', () => {if (this.scene.mouse.leftButtonDown()) scene.selection.moveWorker(scene.selection.position.x - 1, scene.selection.position.y)});
        this.right.on('pointerdown', () => {if (this.scene.mouse.leftButtonDown()) scene.selection.moveWorker(scene.selection.position.x + 1, scene.selection.position.y)});
        this.upRight.on('pointerdown', () => {if (this.scene.mouse.leftButtonDown()) scene.selection.moveWorker(scene.selection.position.x + 1, scene.selection.position.y - 1)});
        this.upLeft.on('pointerdown', () => {if (this.scene.mouse.leftButtonDown()) scene.selection.moveWorker(scene.selection.position.x - 1, scene.selection.position.y - 1)});
        this.downRight.on('pointerdown', () => {if (this.scene.mouse.leftButtonDown()) scene.selection.moveWorker(scene.selection.position.x + 1, scene.selection.position.y + 1)});
        this.downLeft.on('pointerdown', () => {if (this.scene.mouse.leftButtonDown()) scene.selection.moveWorker(scene.selection.position.x - 1, scene.selection.position.y + 1)});
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

        this.arrowVisible = undefined;
        this.visible = false;
        scene.add.existing(this);
    }

    updateMenu(){
        let x = Math.floor(this.scene.mouse.worldX/this.scene.squareSize - 1);
        let y = Math.floor(this.scene.mouse.worldY/this.scene.squareSize - 1);

        if (x >= 0 && x < this.scene.anchoMundo && y >= 0 && y < this.scene.altoMundo && 
            Math.abs(this.scene.selection.position.x - x) <= 1 && Math.abs(this.scene.selection.position.y - y) <= 1 &&
            this.scene.tablero.casillas[x][y] !== undefined && this.scene.tablero.casillas[x][y].OccupiedBy === undefined){
            if (this.arrowVisible !== undefined) this.arrowVisible.visible = false;
            
            let coord = {
                x : x - this.scene.selection.position.x,
                y : y - this.scene.selection.position.y
            }

            if (coord.x === 0){
                if (coord.y === 1) this.arrowVisible = this.down;
                else if (coord.y === -1) this.arrowVisible = this.up;
            } 
            else if(coord.x === 1){
                if(coord.y === 1) this.arrowVisible = this.downRight;
                else if (coord.y === 0) this.arrowVisible = this.right;
                else if (coord.y === -1) this.arrowVisible = this.upRight;
            }
            else if(coord.x === -1){
                if(coord.y === 1) this.arrowVisible = this.downLeft;
                else if (coord.y === 0) this.arrowVisible = this.left;
                else if (coord.y === -1) this.arrowVisible = this.upLeft;
            }

            if (this.arrowVisible !== undefined) this.arrowVisible.visible = true;
        }
    }
}