/**
 * Created by lykovartem on 03.01.2017.
 */

const vars = require('./vars');
const resize = require('./resize');
const request = require('./request');

function pagination(videoList) {

    let pagesList = document.getElementById('pages-list');
    let videoUl = document.getElementById('video-list');
    let pagesCount = Math.round(videoUl.childElementCount / vars.videoPerPage);
    pagesList.innerHTML = '';

    for (let i = 0; i < pagesCount; i++) {
        let page = document.createElement('li');
        page.setAttribute('data-page', `${i + 1}`);
        page.innerHTML = `${i + 1}`;
        pagesList.appendChild(page);
    }

    let pageNumber = Math.floor(-(parseInt(videoUl.style.left, 10) / vars.videoBoardWidth) + 1);
    vars.pageNumber = pageNumber;

    let leftmostElement = videoList[(pageNumber - 1) * vars.videoPerPage];
    let offset = (Math.ceil((leftmostElement.dataset.el / vars.videoPerPage) - 1) * -vars.videoBoardWidth);
    document.getElementById('video-list').style.left = `${offset}px`;

    Array.from(pagesList.childNodes)[vars.pageNumber - 1].style.color = `red`;

    /*for (let i = vars.pageNumber - 3 > 0 ? vars.pageNumber - 3 : 1; i <= vars.pageNumber + 3; i++) {
     console.log(i);
     }*/

    pagesList.onclick = function (e) {
        if (e.target.nodeName == 'LI') {
            changePage(e.target);
        }
    };
}

function changePage(prevPage) {
    let pagesList = document.getElementById('pages-list');
    let videoUl = document.getElementById('video-list');
    let prevPageNumber = prevPage.dataset.page - 1;

    let leftOffset = -(prevPageNumber) * vars.videoBoardWidth;

    let pageNumber = -(leftOffset / vars.videoBoardWidth) + 1;
    vars.pageNumber = pageNumber;
    // console.log(pageNumber);

    videoUl.style.left = `${leftOffset}px`;

    Array.from(pagesList.childNodes).forEach(item => {
        item.style.color = 'black';
    });
    Array.from(pagesList.childNodes)[vars.pageNumber - 1].style.color = `red`;

    if (videoUl.childElementCount - pageNumber * vars.videoPerPage < vars.videoPerPage) {
        console.log('request');
        request(vars.query, vars.token)
            .then(() => {
                let pagesCount = Math.round(videoUl.childElementCount / vars.videoPerPage);
                pagesList.innerHTML = '';


                for (let i = 0; i < pagesCount; i++) {
                    let page = document.createElement('li');
                    page.setAttribute('data-page', `${i + 1}`);
                    page.innerHTML = `${i + 1}`;
                    pagesList.appendChild(page);
                }
                console.log('pN = ' + vars.pageNumber);
                Array.from(pagesList.childNodes)[vars.pageNumber - 1].style.color = `red`;

            })
    }
}

module.exports = {
    pagination,
    changePage
};