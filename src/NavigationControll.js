import { jquery as $ } from './custom_jquery.js';

export default function() {
    let amountOfDots = $('#navigation').children('p').length;
    if (amountOfDots == this.curindex) {
        let newIndex = this.curindex + 1;
        let str = ' <p class="dot">' + newIndex + '</p>';
        $('#navigation').append(str);
    }
    var allSons = document.getElementsByClassName("dot");


    for (let i = 0; i < allSons.length; i++) {
        allSons[i].classList.remove("active");
    }
    allSons[this.curindex].classList.add('active');


}

