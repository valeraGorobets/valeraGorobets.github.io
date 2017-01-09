import Load from './Load.js';
import Touch from './Touch.js';
import { jquery as $ } from './custom_jquery.js';

var loader = new Load();
var touch = new Touch(loader);

function run(request) {
    $('#videoContainerUl').html('');
    $('#videoContainerUl').css('width', 0);
    loader.loadVideos(request);
    touch.init();
}

$('#search').on('keypress', function(event) {
    if (event.keyCode == 13) {
        let request = document.getElementById("search").value;
        run(request);
    }
});
