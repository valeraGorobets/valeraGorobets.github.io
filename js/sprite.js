class Sprite {
    constructor(url, pos, size, speed, framesAmount, isDublicate = false, once = false, dir = 'normal') {
        this.url = url;
        this.pos = pos;
        this.size = size;
        this.speed =speed ;
        this.frames = Array.from(Array(framesAmount).keys());
        this._index = 0;
        this.isDublicate = isDublicate;
        this.dir = dir;
        this.once = once;
    }

    update(dt) {
        this._index += this.speed * dt;
    }

    render(ctx) {
        var frame;
        if (this.speed > 0) {
            var max = this.frames.length;
            var idx = Math.floor(this._index);
            frame = this.frames[idx % max];
            if (this.once && idx >= max) {
                this.done = true;
                return;
            }
        } else {
            frame = 0;
        }

        var x = this.pos[0];
        var y = this.pos[1];
        x += frame * this.size[0];

        ctx.drawImage(resources.get(this.url),
            x, y,
            this.size[0], this.size[1],
            0, 0,
            this.size[0], this.size[1]);
        if (this.isDublicate) {
            ctx.drawImage(resources.get(this.url),
                x, y,
                this.size[0], this.size[1],
                this.size[0], 0,
                this.size[0], this.size[1]);
        }

    }
}