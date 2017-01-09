import navigationControll from './NavigationControll.js';
export default class {

    constructor(targetElement, callback, loader) {
        this.targetElement = targetElement;
        this.handletouch = callback;
        this.loader = loader;
        this.dirrection = 'none';
        this.swipeType = 'none';
        this.startX;
        this.startY;
        this.distX;
        this.distY;
        this.threshold = 150;
        this.elapsedTime;
        this.startTime;
        this.mouseisdown = false;
        this.detecttouch = !!('ontouchstart' in window) ||
            !!('ontouchstart' in document.documentElement) ||
            !!window.ontouchstart ||
            !!window.Touch ||
            !!window.onmsgesturechange || (window.DocumentTouch && window.document instanceof window.DocumentTouch);
    }

    applyToTouchSurface(touch) {
        this.targetElement.addEventListener('mousedown', event => {
            this.startX = event.pageX;
            this.startY = event.pageY;
            this.startTime = new Date().getTime()
            this.handletouch(event, this.dirrection, 'start', this.swipeType, 0);
            this.mouseisdown = true;
        })

        this.targetElement.addEventListener('mousemove', event => {
            if (this.mouseisdown) {
                this.distX = event.pageX - this.startX;
                this.distY = event.pageY - this.startY;
                if (Math.abs(this.distX) > Math.abs(this.distY)) {
                    this.dirrection = (this.distX < 0) ? 'left' : 'right';
                    this.handletouch(event, this.dirrection, 'move', this.swipeType, this.distX);
                }
                event.preventDefault();
            }
        })

        this.targetElement.addEventListener('mouseup', event => {
            if (this.mouseisdown) {
                this.elapsedTime = new Date().getTime() - this.startTime;
                if (Math.abs(this.distX) >= this.threshold) {
                    this.swipeType = this.dirrection;
                }
                this.handletouch(event, this.dirrection, 'end', this.swipeType, this.distX);
                this.mouseisdown = false;
                event.preventDefault();
            }

            if (this.loader.nodesPerPage * (touch.curindex + 2) >= touch.liscount) {
                this.loader.loadVideos('');
            }
            navigationControll.call(touch);
        })

        this.targetElement.addEventListener('touchstart', event => {
            this.startX = event.changedTouches[0].pageX;
            this.startY = event.changedTouches[0].pageY;
            this.startTime = new Date().getTime();
            this.handletouch(event, this.dirrection, 'start', this.swipeType, 0);
            event.preventDefault();

        })

        this.targetElement.addEventListener('touchmove', event => {
            this.distX = event.changedTouches[0].pageX - this.startX;
            this.distY = event.changedTouches[0].pageY - this.startY;
            if (Math.abs(this.distX) > Math.abs(this.distY)) {
                this.dirrection = (this.distX < 0) ? 'left' : 'right';
                this.handletouch(event, this.dirrection, 'move', this.swipeType, this.distX);
            }
            event.preventDefault();
        })

        this.targetElement.addEventListener('touchend', event => {
            this.elapsedTime = new Date().getTime() - this.startTime;
            if (Math.abs(this.distX) >= this.threshold) {
                this.swipeType = this.dirrection;
            }
            this.handletouch(event, this.dirrection, 'end', this.swipeType, this.distX);
            event.preventDefault();
            if (this.loader.nodesPerPage * (touch.curindex + 2) >= touch.liscount) {
                this.loader.loadVideos('');
            }
            navigationControll.call(touch);
        })
    }
}
