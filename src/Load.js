import { jquery as $ } from './custom_jquery.js';
import VideoItem from './VideoItem.js';
import AppendVideoToDOM from './AppendVideoToDOM.js';

export default class {
    constructor() {
        this.request = '';
        this.nextpage = '';
        this.resultsPerPage = 15;
        this.firstNodeNumber = 0;
        this.nodesPerPage = 3;
    }

    loadVideos(request) {
        if (request !== '') {
            this.request = request;
        }
        let count = 1;
        let xhr = new XMLHttpRequest();
        let mainURL = 'https://www.googleapis.com/youtube/v3/search?pageToken=' + this.nextpage + '&part=snippet&maxResults=' + this.resultsPerPage + '&q=' + this.request + '&key=AIzaSyBvXYBGOR9urz4Sa4coGtCqCMmGmPux7a8';
        let videos;

        xhr.open('GET', mainURL, true);
        xhr.send();
        let that = this;
        xhr.onload = function() {
            that.nextpage = JSON.parse(this.responseText).nextPageToken;
            videos = JSON.parse(this.responseText)['items'];
            videos.forEach((element, i) => {
                var statURL = 'https://www.googleapis.com/youtube/v3/videos?part=statistics&id=' + element.id.videoId + '&key=AIzaSyBvXYBGOR9urz4Sa4coGtCqCMmGmPux7a8';
                var statisticXHR = new XMLHttpRequest();
                statisticXHR.open('GET', statURL, true);
                statisticXHR.send();
                var video = new VideoItem(element);
                (function(video, i) {
                    statisticXHR.onload = function() {
                        var statistic = JSON.parse(this.responseText)['items'];
                        video.views = statistic[0].statistics.viewCount;
                        AppendVideoToDOM(video);
                    }
                }(video, i));
            });
        };
    }
}
