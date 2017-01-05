/**
 * Created by lykovartem on 03.01.2017.
 */

const vars = require('./vars');
const pagination = require('./pagination');

function resize(videoList) {
    let videoPerPage = Math.floor(window.outerWidth / 330) || 1;
    let videoBoardWidth = videoPerPage * 330;
    let videoBoard = document.getElementById('video-board');

    videoBoard.style.width = `${videoBoardWidth}px`;

    vars.videoPerPage = videoPerPage;
    vars.videoBoardWidth = videoBoardWidth;
    pagination.pagination(videoList);
}

module.exports = resize;