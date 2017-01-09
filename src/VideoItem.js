export default class {
    constructor(element) {
        this.imgUrl = element.snippet.thumbnails.medium.url;
        this.songUrl = 'https://www.youtube.com/watch?v=' + element.id.videoId;
        this.songTitle = element.snippet.title;
        this.channelTitle = element.snippet.channelTitle;
        this.views = 0;
        this.publishedAt = element.snippet.publishedAt.substring(0, 10);
        this.description = element.snippet.description;
    }
};
