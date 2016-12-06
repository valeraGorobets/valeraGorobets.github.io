class Ninja {
    constructor(pos, sprite, isOnGround = true, health = 100) {
        this.pos= pos;
        this.isOnGround= isOnGround;
        this.health= health;
        this.sprite= sprite;
    }
}
