/**
 * Created by lykovartem on 03.01.2017.
 */

const vars = require('./vars');
const resize = require('./resize');
const request = require('./request');

function renderPages() {
    let pagesCount = Math.round(vars.videoUl.childElementCount / vars.videoPerPage);

    for (let i = 0; i < pagesCount; i++) {
        let page = document.createElement('li');
        page.setAttribute('data-page', `${i + 1}`);
        page.innerHTML = `${i + 1}`;
        vars.pagesList.appendChild(page);
    }
    Array.from(vars.pagesList.childNodes)[vars.pageNumber - 1].style.color = vars.ACTIVE_PAGE_COLOR;
}

function pagination(videoList) {

    let pagesList = document.getElementById('pages-list');
    let videoUl = document.getElementById('video-list');
    vars.pagesList = pagesList;
    vars.videoUl = videoUl;
    vars.pagesList.innerHTML = '';

    let pageNumber = Math.floor(-(parseInt(vars.videoUl.style.left, 10) / vars.videoBoardWidth) + 1);
    vars.pageNumber = pageNumber;

    let leftmostElement = videoList[(pageNumber - 1) * vars.videoPerPage];
    let offset = (Math.ceil((leftmostElement.dataset.el / vars.videoPerPage) - 1) * -vars.videoBoardWidth);
    document.getElementById('video-list').style.left = `${offset}px`;

    renderPages();

    vars.pagesList.onclick = function (e) {
        if (e.target.nodeName == 'LI') {
            changePage(e.target);
        }
    };
}

function changePage(prevPage) {
    let prevPageNumber = prevPage.dataset.page - 1;
    let leftOffset = -(prevPageNumber) * vars.videoBoardWidth;
    let pageNumber = -(leftOffset / vars.videoBoardWidth) + 1;
    vars.pageNumber = pageNumber;

    vars.videoUl.style.left = `${leftOffset}px`;

    Array.from(vars.pagesList.childNodes).forEach(item => {
        item.style.color = vars.DEFAULT_PAGE_COLOR;
    });
    Array.from(vars.pagesList.childNodes)[vars.pageNumber - 1].style.color = vars.ACTIVE_PAGE_COLOR;

    if (vars.videoUl.childElementCount - pageNumber * vars.videoPerPage < vars.videoPerPage) {
        request(vars.query, vars.token)
            .then(() => {
                vars.pagesList.innerHTML = '';
                renderPages();
            })
    }
}

module.exports = {
    pagination,
    changePage
};