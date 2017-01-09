 import { jquery as $ } from './custom_jquery.js';

 export default function(video) {
 	let savedLeft =$('#videoContainerUl').css('left');
     let str = '<li><div class="videoCard"><img src="' + video.imgUrl + '" class="videoCover"><a href = " '+ video.songUrl+'" target="_blank"><div class="infoDiv"><div class = "titleAndChanel"><h3>' + video.songTitle + '</h3><h4>' + video.channelTitle + '</h4></div><div class="views"><h4 >VIEWS</h4><h3>' + video.views + '</h3></div></div> </a><p class="publishDay">' + 'Published Day: ' + video.publishedAt + '</p><p class="description">' + video.description + '</p></div></li>';
     $('#videoContainerUl').append(str);
     var currentWidth = $('#videoContainerUl').css('width');
     currentWidth = +currentWidth.slice(0, currentWidth.length - 2)
     var childrenCount = $('#videoContainerUl').children('li').length;
     var newWidth = (currentWidth + 500 * childrenCount) + 'px';
     $('#videoContainerUl').css('width', newWidth);
 	$('#videoContainerUl').css('left' ,savedLeft+'');
 }
