import { jquery as $ } from './custom_jquery.js';
import onTouchAction from './OnTouchAction.js';



export default class {
    constructor(loader) {
        this.loader = loader;
        this.curindex = 0;
        this.liscount = 0;
        this.ulLeft = 0;
        this.videoContainerUl = document.getElementById('videoContainerUl');
        this.gallerywidth = document.getElementById('videoContainer').offsetWidth;
    }
    
    init() {
        let applyAction = new onTouchAction(videoContainerUl, (evt, dir, phase, swipetype, distance) => {
            this.liscount = $('#videoContainerUl').children('li').length;
            switch (phase) {
                case 'start':
                    this.ulLeft = parseInt(this.videoContainerUl.style.left) || 0;
                    break;
                case 'move':
                    var totaldist = distance + this.ulLeft;
                    this.videoContainerUl.style.left = Math.min(totaldist, (this.curindex + 1) * this.gallerywidth) + 'px';
                    break;
                case 'end':
                    this.curindex = (swipetype == 'left') ? Math.min(this.curindex + 1, this.liscount - 1) : Math.max(this.curindex - 1, 0);
                    this.videoContainerUl.style.left = -this.curindex * this.gallerywidth + 'px';
                    break;
            }
        }, this.loader);
        applyAction.applyToTouchSurface(this);
    }
}
