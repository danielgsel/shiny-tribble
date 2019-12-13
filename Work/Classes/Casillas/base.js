export default class Base{
    constructor(owner){
        this.owner = owner;
        //this.hp = 4;
    }

    recieveDamage(){
        this.hp--;
        console.log("Vida base "+this.owner.color + " " + this.hp);
        this.owner.updateHealthBase();
        // if(this.hp <= 0)  {
        //     console.log("Rip color " + this.owner.color);

        // }
    }
}