/**
 * Created by lykovartem on 31.12.2016.
 */

const vars = require('./vars');

function renderLayout() {
    let wrapper = document.createElement('div');
    wrapper.setAttribute('class', 'wrapper');
    document.body.appendChild(wrapper);

    let searchContainer = document.createElement('div');
    searchContainer.setAttribute('class', 'search-container');
    searchContainer.innerHTML =
        '<label><input id="search" placeholder="Enter a query..." value="" type="search"/>' +
        '<button id="search-button"><i class="fa fa-search" aria-hidden="true"></i></button></label>';
    wrapper.appendChild(searchContainer);

    let videoBoard = document.createElement('div');
    videoBoard.setAttribute('class', 'video-board');
    videoBoard.setAttribute('id', 'video-board');
    wrapper.appendChild(videoBoard);

    let videoList = document.createElement('ul');
    videoList.setAttribute('class', 'video-list');
    videoList.setAttribute('id', 'video-list');
    videoBoard.appendChild(videoList);

    let pages = document.createElement('ul');
    pages.setAttribute('class', 'pages');
    pages.setAttribute('id', 'pages-list');
    wrapper.appendChild(pages);
}

function setVideoListWidth() {
    let videoList = document.getElementById('video-list');
    videoList.style.width = `${2 * videoList.childElementCount * vars.VIDEO_ELEMENT_WIDTH_WITH_MARGINS}px`;
    return videoList.childNodes;
}

module.exports = {
    renderLayout,
    setVideoListWidth
};
