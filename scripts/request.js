/**
 * Created by lykovartem on 31.12.2016.
 */

const slideRender = require('./slideRender');
const vars = require('./vars');


function request(query, pageToken) {
    return fetch(`https://www.googleapis.com/youtube/v3/search?pageToken=${pageToken || ''}&key=AIzaSyAyooU1ihXvK4FvCWPL0BELxO_aGlihvJg&type=video&part=snippet&maxResults=15&q=${vars.query}`)
        .then(response => response.json())
        .then(data => {
            vars.token = data.nextPageToken;
            return data.items.map(item => item.id.videoId)
        })
        .then(idArray => idArray.join(','))
        .then(idString => {
            return fetch(`https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=${idString}&key=AIzaSyAyooU1ihXvK4FvCWPL0BELxO_aGlihvJg`)
                .then(response => response.json())
                .then(data => {
                    let infoArray = [];
                    data.items.forEach(item => {
                        let videoInfo = {
                            href: `https://www.youtube.com/watch?v=${item.id}`,
                            title: item.snippet.title,
                            autor: item.snippet.channelTitle,
                            descr: item.snippet.description.substr(0, 140),
                            img: item.snippet.thumbnails.medium.url,
                            date: item.snippet.publishedAt.toString(),
                            views: item.statistics.viewCount,
                            hrefChannel: `https://www.youtube.com/channel/${item.snippet.channelId}`,
                            likeCount: item.statistics.likeCount,
                            dislikeCount: item.statistics.dislikeCount,
                        };
                        infoArray.push(videoInfo)
                    });
                    return infoArray
                });
        })
        .then(infoArray => {
            infoArray.forEach(item => {
                slideRender(item)
            });
            let videoList = document.getElementById('video-list');
            videoList.style.width = `${2 * videoList.childElementCount * 330}px`;
            return videoList.childNodes;
        })
        .then(videoList => {
            return videoList;
        })
}

module.exports = request;
