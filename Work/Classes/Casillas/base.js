export default class Base{
    constructor(owner){
        this.owner = owner;
    }

    recieveDamage(){
        console.log("Vida base "+this.owner.color + " " + this.hp);
        this.owner.updateHealthBase();
    }
}